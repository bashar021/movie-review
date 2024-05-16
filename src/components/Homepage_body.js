import React, { useState } from 'react'
import '../styles/Homepage.css'
import img from '../images/MV5BNGZiMzBkZjMtNjE3Mi00MWNlLWIyYjItYTk3MjY0Yjg5ODZkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SX300.jpg'
import imdb from '../icons/imdb.png'
import download_icon from '../icons/download.png'
import like_icon from '../icons/like.png'
import save_icon from '../icons/save.png'
import Cookies from 'js-cookie'
import Get from '../controllers/Get.js'
import DateFormat from '../controllers/ConvertDate.js'
import '../styles/Homepage_body.css'
import '../styles/responsive/Homepage.css'
import CommentSection from './CommentSection.js'
const brokenImage = 'https://ih1.redbubble.net/image.5218811881.3250/flat,750x,075,f-pad,750x1000,f8f8f8.u19.jpg'

export default function Homepage_body(props) {
  // props.reviews  
  const [openComment, setOpenComment] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  async function addToWatchList(userId, reviewId) {
    // userId  = login user unique id
    // reviewId = reviewId unique id 
    if (Cookies.get('jwt')) {
      try {
        const response = await Get(`${process.env.REACT_APP_SERVER_URL}/user/watchlist/review/add/${userId}/${reviewId}`, Cookies.get('jwt'))
        // console.log(response)
        if (response.status === 201) {
          const jsonData = await response.json()
          setAlertMessage('Review has been added to watchList')
          console.log('review has been added to watchList')
        } else if (response.status === 204) {
          console.log('review is already saved')
          setAlertMessage('already saved in WatchList')
          // console.log(jsonData.message)
        } else if (response.status === 500) {
          setAlertMessage('server error for saving review')
          console.log('server error for saving review')
          // console.log(jsonData.error)
        }
        setTimeout(() => {
          setAlertMessage('')
        }, 2000);
      } catch (error) {
        console.log(error)
        console.log('error in adding the review into you watchList ')
      }
    } else {
      // alert('please login into your account ')
      setAlertMessage('log into your account to add into watch list')
      setTimeout(() => {
        setAlertMessage('')
      }, 4000);
    }
  }
  return (
    <>
      {props.searchAlert ? <div className='searchQueryAlert' style={{ color: 'white' }}> not result found</div> : ''}
      


        {
          [...props.reviews].reverse().map((item, index) => {
            return (
              <div key={index} className='movie_review_box'>
                <div className='movie_review_box_child'>
                  <img className='movie-review-box-child-poster' src={item.moviePosterUrl !== '' ? item.moviePosterUrl : brokenImage} alt="avengers" height='220px' width="200px" />
                  <div className='movie_details_box'>
                    <div className='movie_ref_box'>
                      {/* movieTmdbReference */}
                      <img className='cursor-pointer' title='check on TMDB' src={imdb} onClick={() => { window.open(item.movieTmdbReference, '_blank') }} alt="imdb" />
                      <img className='cursor-pointer' title='download' onClick={() => { window.open(item.downloadLink, '_blank') }} src={download_icon} alt="download" />

                    </div>
                    <p>{item.movieName}</p>
                    <p>{parseFloat(item.movieRating).toFixed(1)}  <span>{item.movieReleaseDate} </span></p>

                    <div className='tags_cont'>
                      {
                        item.tags.map((item, index) => {
                          return <span key={index}>{item}</span>
                        })
                      }
                    </div>
                    <p className='movie_details_box-description-p'>{item.description.split(' ').slice(0, 70).join(' ')} {item.description.split(' ').length > 90 ? <span onClick={() => { window.open(item.movieTmdbReference, '_blank') }}>Read more</span> : ''}</p>


                  </div>
                  <button className='cursor-pointer add-to-watchList-button' title='Add to WatchList' onClick={() => { addToWatchList(item.userId, item._id) }}><img src={save_icon} alt="save" /></button>
                </div>

                <div className='movie_review_box_child2'>
                  <div>
                    <span>{item.userName}</span>
                    <span className='cursor-pointer' onClick={() => { setOpenComment(item._id) }}>Comment</span>
                  </div>
                  <span>{DateFormat(item.date)}</span>
                </div>
                {openComment === item._id ? <CommentSection reviewId={item._id} setOpenComment={setOpenComment} ></CommentSection> : ''}


              </div>
            )
          })
        }

        {
          alertMessage !== '' ? <div className='addedToWatchListMessageBox'>
            <p>{alertMessage}</p>
          </div> : ''
        }
     

    </>
  )
}
