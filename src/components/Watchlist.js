import React, { useState, useEffect } from 'react'
import '../styles/Watchlist.css'
import Homepage_body from './Homepage_body.js'
import img from '../images/MV5BNGZiMzBkZjMtNjE3Mi00MWNlLWIyYjItYTk3MjY0Yjg5ODZkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SX300.jpg'
import imdb from '../icons/imdb.png'
import download_icon from '../icons/download.png'
import like_icon from '../icons/like.png'
import save_icon from '../icons/save.png'
import Get from '../controllers/Get.js'
import Cookies from 'js-cookie'
import deleteIcon from '../icons/delete-icon.png'
import UserNav from './UserNav.js'
import dateFormat from '../controllers/ConvertDate.js'

export default function Watchlist() {
  const [userWatchLists, setUserWatchLists] = useState([])
  async function fetchWatchListFromDB() {
    try {
      const watchListReviews = await Get(`${process.env.REACT_APP_SERVER_URL}/user/watchlist`, Cookies.get('jwt'))
      if (watchListReviews.ok) {
        const jsonData = await watchListReviews.json()
        console.log('watch list has been fetched ')
        // console.log(jsonData.data)
        setUserWatchLists(jsonData.data)
      } else {
        console.log('unable to fetch reviews list')
      }
    }catch(error){
      console.log("internal server error")
      console.log(error)
    }
    

  }
  async function deleteReviewFromWatchList(reviewId) {
    // reviewId  is an unique id of the review added into watchlist 
    try {
      const updatedWatchList = await Get(`${process.env.REACT_APP_SERVER_URL}/user/watchlist/review/delete/${reviewId}`, Cookies.get('jwt'))
      if (updatedWatchList.status === 201) {
        const jsonData = await updatedWatchList.json()
        console.log('review removed ')
        console.log(updatedWatchList)
        fetchWatchListFromDB()
      } else if (updatedWatchList.status === 204) {
        console.log('unable to delete please try again')
      } else {
        console.log('internal server error please try again ')
      }

    } catch (error) {
      console.log('error in deleting the review from watch list ')
      console.log(error)
    }
  }

  useEffect(() => {
    fetchWatchListFromDB()
  }, [])
  return (
    <>
      <UserNav></UserNav>
      <div id="user_watchlist">
        {
          userWatchLists.map((item, index) => {
            return (
              <div key={index} className="watchlist_const">
                <div className='watchlist_movie_review_box'>

                  <img src={img} alt="avengers" height='200px' />



                  <div className='watchlist_movie_details_box'>

                    <div className='movie_ref_box'>
                      <img src={imdb} alt="imdb" />
                      <img src={download_icon} alt="download" />
                      <img src={like_icon} alt="like" />
                      <span>25</span>
                    </div>

                    <p>{item.reviewObject.movieName}</p>
                    <div className='watchlist_tags_cont'>
                      {item.reviewObject.tags.map((item, index) => {
                        return <span>xyz</span>
                      })}
                    </div>

                    <p>{item.reviewObject.description}</p>
                    <p>7.8</p>

                  </div>

                  <button onClick={() => { deleteReviewFromWatchList(item.reviewObject._id) }}><img src={deleteIcon} alt="save" /></button>
                </div>

                <div className='watchlist_movie_review_box_child2'>
                  <div>
                    <span>{item.reviewObject.userName}</span>
                    <span>Comment</span>
                  </div>

                  <span>{dateFormat(item.reviewObject.date)}</span>
                </div>

              </div>
            )
          })}
      </div>
    </>


  )
}
