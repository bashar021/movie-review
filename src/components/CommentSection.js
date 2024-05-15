import React, { useState, useEffect, useRef } from 'react'
import userAvatar from '../icons/userAvatar.png'
import TextareaAutosize from 'react-textarea-autosize';
import Cookies from 'js-cookie'
import Get from '../controllers/Get.js'
import Post from '../controllers/Post.js'
import dateFormat from '../controllers/ConvertDate.js'
import {updateCommentDescription} from '../controllers/CommentsControlers.js'

export default function CommentSection(props) {
    const [userComment, setUserComment] = useState('')
    const [showRepliesOnComment, setShowRepliesOnComment] = useState([])
    const [reviewComments, setReviewComments] = useState([])
    const [showCommentEditOption, setShowCommentEditOption] = useState('')
    const editCommentOptionRef = useRef(null);
    const [replyOnCommentArea, setReplyOnCommentArea] = useState('')
    const [replyOnCommentInputValue, setReplyOnCommentInputValue] = useState('')
    const [updateComment,setUpdateComment] = useState(false)
    const [loader,setLoader] = useState(false)
    // const commentOpenOnPos = window.pageYOffset || document.documentElement.scrollTop;
    async function fetchReviewComments() {
        // console.log('fetching comments for :', props.reviewId)
        const reviewComments = await Get(`${process.env.REACT_APP_SERVER_URL}/user/comment/review/${props.reviewId}`, Cookies.get('jwt'))
        const jsonData = await reviewComments.json()
        if (reviewComments.ok) {
            // console.log(jsonData.data)
            setReviewComments(jsonData.data)
        } else {
            console.log('can not fetch comments')
        }

    }

    async function uploadReviewComments() {
        setLoader(true)
        try{
            const data = { reviewId: props.reviewId, comment: userComment }
            const updatedComment = await Post(`${process.env.REACT_APP_SERVER_URL}/user/comment/add`, data, Cookies.get('jwt'))
            const jsonData = await updatedComment.json()
            if (updatedComment.status === 201) {
                setReviewComments([...reviewComments, jsonData.data])
                setUserComment('')
            } else {
                console.log('comment not done ')
                console.log(jsonData.error)
            }
        }catch(error){
            console.log(error)
        }
        setLoader(false)
    }


    async function replyOnComment() {
        setLoader(true)
        try{
            const data = { reviewId: props.reviewId, commentId: replyOnCommentArea, comment: replyOnCommentInputValue }
            const repliedReview = await Post(`${process.env.REACT_APP_SERVER_URL}/user/comment/reply/add`, data, Cookies.get('jwt'))
            const jsonData = await repliedReview.json()
            if (repliedReview.ok) {
                const updatedComments = insertRepliesOnCommentsArray(replyOnCommentArea, jsonData.data.replies)
                setReviewComments(updatedComments)
                setReplyOnCommentInputValue('')
            } else {
                console.log('can not reply to the comment')
            }

        }catch(error){
            console.log(error)
        }
        setLoader(false)
    }
    // Function to recursively search for an object by its _id
    
    // Function to recursively search for an object by its _id and return its parent object
    function findObjectAndParentById(dataArray, id, parent = null) {
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
    function insertRepliesOnCommentsArray(commentId, replies) {
        const { obj: parentObject, parent: parentParent } = findObjectAndParentById(reviewComments, commentId);
        if (parentObject, parentParent) {
            parentObject.replies = replies;
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
            newReviewComment[commentIndex].replies = replies
            return newReviewComment
            // setReviewComments(newReviewComment)
        }

    }
    async function fetchMoreRepliesOfComment(commentId, repliesLength) {
        if (repliesLength >= 0) {
            try{
                const moreReplies = await Get(`${process.env.REACT_APP_SERVER_URL}/user/comment/reply/more/${props.reviewId}/${commentId}`, Cookies.get('jwt'))
                const jsonData = await moreReplies.json()
                if (moreReplies.ok) {
                    setReviewComments(insertRepliesOnCommentsArray(commentId, jsonData.data.replies))
                } else {
                    console.log('can not fetch more replies')
                }

            }catch(error){
                console.log(error)
            }
           
        }
    }
    async function deleteComment(parentCommentId, commentId) {
        try{
            const { obj: parentObject, parent: parentParent } = findObjectAndParentById(reviewComments, commentId);
            const url = parentParent !== null?`${process.env.REACT_APP_SERVER_URL}/user/comment/delete/${commentId}/${parentParent._id}`:`http://localhost:500/user/comment/delete/${commentId}/${'none'}`
            const result = await Get(url,Cookies.get('jwt'))
            if(!result.ok){
                // console.log('comment has been deleted ')
                return
            }
            deleteCommentFromArray(reviewComments,commentId)
        }catch(error){
            console.log(error)
        }
    }
    function deleteCommentFromArray(commentsArray,commentId) {
        const { obj: parentObject, parent: parentParent } = findObjectAndParentById(commentsArray, commentId);
        if (parentObject && parentParent) {
            // Delete the comment and its replies
            const parentIndex = parentParent.replies.findIndex(obj => obj._id === parentObject._id);
            if (parentIndex !== -1) {
                parentParent.replies.splice(parentIndex, 1);
                const commentIndex = commentsArray.findIndex(obj => obj._id === parentParent._id);
                if (commentIndex !== -1) {
                    commentsArray[commentIndex] = parentParent;
                }
            }
        } else if (parentObject) {
            // Delete the comment if it's a top-level comment
            const commentIndex = commentsArray.findIndex(obj => obj._id === parentObject._id);
            if (commentIndex !== -1) {
                commentsArray.splice(commentIndex, 1);
            }
        }
        // console.log(reviewComments)
        setReviewComments([...commentsArray])
        // return commentsArray;

    }
    async function handleUpdateCommentButton(commentId){
        setLoader(true)
        const data = await updateCommentDescription(reviewComments,commentId,replyOnCommentInputValue)
        if(data){
            setReviewComments([...data])
            setReplyOnCommentInputValue('')
            setUpdateComment(false)
            setReplyOnCommentArea('')
        }
        setLoader(false)
        

    }
    useEffect(() => {
        fetchReviewComments()

    }, []); //
    useEffect(() => {
        function handleClickOutside(event) {
            if (editCommentOptionRef.current && !editCommentOptionRef.current.contains(event.target)) {
                setShowCommentEditOption('');
            }
        }
        if (showCommentEditOption) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCommentEditOption]);

    function returnCommentBody(item, index) {
        // console.log(item)
        return (
            <div key={index} className='commentBox'>
                <img width={35} height={35} src={userAvatar} alt="user avatar" />
                <div className="commentDetailsBox">
                    <div className="commentDetailsBoxChild1">
                        <p><strong>{item.commentUserName}</strong></p>
                        <p>{item.commentDescription}</p>
                        <div className='editCommentOptionCont'>

                            {Cookies.get('userName') === item.commentUserName ? <button onClick={() => { setShowCommentEditOption(item._id) }} className="editCommentOptionContBtn">&#10247;</button> : ''}
                            {showCommentEditOption === item._id ? <div ref={editCommentOptionRef} className='editCommentOptions'>
                                <p onClick={()=>{setUpdateComment(true);setReplyOnCommentArea(item._id);setReplyOnCommentInputValue(item.commentDescription)}} >edit</p>
                                <p onClick={() => { deleteComment(index, item._id);setShowCommentEditOption('') }}>delete</p>
                            </div> : ''}
                        </div>

                    </div>
                    <div className="commentDetailsBoxChild2">
                        <div>
                            <button onClick={() => { setReplyOnCommentArea(item._id) }}>Reply</button>
                            {item.replies.length > 0 ? <button onClick={() => { fetchMoreRepliesOfComment(item._id, item.replies.length); setShowRepliesOnComment([...showRepliesOnComment, item._id]) }}> <span>{item.replies.length}</span> Replies</button> : ''}
                        </div>
                        <p>{dateFormat(item.date)}</p>
                    </div>

                    {replyOnCommentArea === item._id ?
                        <div className='addCommentBox'>
                            <img src={userAvatar} alt='user' />
                            <form>
                                <TextareaAutosize value={replyOnCommentInputValue} onChange={(event) => {if(Cookies.get('jwt')){ setReplyOnCommentInputValue(event.target.value)}else{alert('for comment you have to login' )} }} className='commentTextArea' placeholder='Add a Comment'></TextareaAutosize>
                            </form>
                            {replyOnCommentInputValue !== '' ? (updateComment?<button onClick={()=>{handleUpdateCommentButton(item._id)}}>Update</button>:<button onClick={() => { replyOnComment() }}>Post</button>) : ''}
                            {loader && replyOnCommentInputValue !== ''?<span className='commentLoader' ></span>:''}
                        </div> : ''
                    }



                    {showRepliesOnComment.includes(item._id) && item.replies !== undefined && item.replies.length > 0 && item.replies[item.replies.length - 1].commentUserName !== undefined ? [...item.replies].reverse().map((child, childKey) => { return (returnCommentBody(child, child._id)) }) :

                        (item.replies !== undefined && item.replies.length > 0 && item.replies[item.replies.length - 1].commentUserName !== undefined ? (returnCommentBody(item.replies[item.replies.length - 1], item.replies[item.replies.length - 1]._id)) : '')

                    }
                </div>
            </div>
        )
    }
    return (
        <div className='commentCont'>
            <div className='addCommentBox'>
                <img src={userAvatar} alt='user' />
                <form>
                    <TextareaAutosize value={userComment} onChange={(event) => { if(Cookies.get('jwt')){setUserComment(event.target.value)}else{alert(' for comment you have to login ')}}} className='commentTextArea' placeholder='Add a Comment'></TextareaAutosize>
                </form>
                {userComment !== '' ? <button onClick={() => { uploadReviewComments() }}>Post</button> : ''}
                {loader && userComment !== ''?<span className='commentLoader'></span>:''}
            </div>

            <div className='commentBoxesCont'>
                {
                    [...reviewComments].reverse().map((item, index) => {
                        return (returnCommentBody(item, item._id))
                    })
                }
            </div>

        </div>
    )
}
