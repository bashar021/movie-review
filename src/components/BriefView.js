import React,{useState,useEffect} from 'react'
import '../styles/BriefView.css'
import DateFormat from '../controllers/ConvertDate.js'
import CommentSection from './CommentSection.js'
export default function BriefView(props) {
  const [openComment,setOpenComment] = useState('')
  useEffect(()=>{
    console.log(props.review)
  },[])
  return (
    <>
      <div id='brief-view-cont' >
        <button className='cursor-pointer' onClick={() => { props.setBriefView(null) }} types='button' id='brief-view-close-btn'>X</button>
        <div id='brief-view-review-box'>
          <div id='brief-view-review-img-box'>
            <img src={props.review.moviePosterUrl} alt={props.review.moviewame} />
          </div>
          <div id="brief-view-review-details-box">
            <p>{props.review.movieName}</p>
            <p>{parseFloat(props.review.movieRating).toFixed(1)}  <span>{props.review.movieReleaseDate} </span></p>
            <div className='tags_cont brief-review-tags-cont'>
              {
                props.review.tags.map((tag, key) => {
                  return <span key={key} >{tag} </span>
                })
              }

            </div>
            <p className='brief-review-myReviewDiscription'>{props.review.description}{props.review.description.split(' ').length > 400 ? <span className='cursor-pointer' style={{ color: 'blue' }} onClick={() => { window.open(props.review.movieTmdbReference, '_blank') }}>Read more</span> : ''}</p>
          </div>


          {/* <div className='brief-review-comment-line'>
            <div>
              <span>{props.review.userName}</span>
              <span className='cursor-pointer' onClick={() => { setOpenComment(props.review._id) }}>Comment</span>
            </div>
            <span>{DateFormat(props.review.date)}</span>
          </div> */}
          {/* {openComment === props.review._id ?  : ''} */}
          <CommentSection openComment={openComment} review={props.review}  reviewId={props.review._id} setOpenComment={setOpenComment} ></CommentSection>

        </div>



      </div>
    </>
  )
}
