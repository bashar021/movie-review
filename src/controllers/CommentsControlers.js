
import Get from './Get'
import Post from './Post'
import Cookies from 'js-cookie'
const findObjectById = function(dataArray, id){
    for (const obj of dataArray) {
        if (obj._id === id) {
            return obj;
        }
        if (obj.replies && obj.replies.length > 0) {
            const foundInReplies = findObjectById(obj.replies, id);
            if (foundInReplies) {
                return foundInReplies;
            }
        }
    }
    return null;
}

const findObjectAndParentById = function(dataArray, id, parent = null) {
    for (const obj of dataArray) {
        if (obj._id === id) {
            return { obj, parent };
        }
        if (obj.replies && obj.replies.length > 0) {
            const result = findObjectAndParentById(obj.replies, id, obj);
            if (result) {
                return result;
            }
        }
    }
    return null;
}
const insertUpdateOnCommentsArray = function(reviewComments,commentId, updatedComment) {
    const { obj: parentObject, parent: parentParent } = findObjectAndParentById(reviewComments, commentId);
    if (parentObject, parentParent) {
        parentObject.commentDescription = updatedComment;
        const parentIndex = parentParent.replies.findIndex(obj => obj._id === parentObject._id);
        if (parentIndex !== -1) {
            parentParent.replies[parentIndex] = parentObject;
            const commentIndex = reviewComments.findIndex(obj => obj._id === parentParent._id);
            const newReviewComment = [...reviewComments]
            newReviewComment[commentIndex] = parentParent
            return newReviewComment
        }
    } else if (parentObject) {
        const commentIndex = reviewComments.findIndex(obj => obj._id === parentObject._id);
        const newReviewComment = [...reviewComments]
        newReviewComment[commentIndex].commentDescription = updatedComment
        return newReviewComment
        // setReviewComments(newReviewComment)
    }

}
export async function updateCommentDescription (reviewComments,commentId,updatedCommentValue){
   try{
    const array = insertUpdateOnCommentsArray(reviewComments,commentId,updatedCommentValue)
    const data = {commentId:commentId,commentDescription:updatedCommentValue}
    const result = await Post(`${process.env.REACT_APP_SERVER_URL}/user/comment/update`,data,Cookies.get('jwt'))
    if(result.ok){
        // console.log('updated successfully')
        return array
    }
   }catch(error){
    console.log(error)
   }
    return null
}


// module.exports = {updateCommentDescription}