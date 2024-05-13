import React, { useState, useEffect } from 'react'
import '../styles/Watchlist.css'
import Homepage_body from './Homepage_body.js'
import img from '../images/MV5BNGZiMzBkZjMtNjE3Mi00MWNlLWIyYjItYTk3MjY0Yjg5ODZkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SX300.jpg'
import imdb from '../icons/imdb.png'
import download_icon from '../icons/download.png'
import {useNavigate} from 'react-router-dom'
import like_icon from '../icons/like.png'
import save_icon from '../icons/save.png'
import Get from '../controllers/Get.js'
import Cookies from 'js-cookie'
import deleteIcon from '../icons/delete-icon.png'
import UserNav from './UserNav.js'
import dateFormat from '../controllers/ConvertDate.js'
// import Cookies from 'js-cookie'
// 
// import Cookies from 'js-cookie'


export default function Watchlist() {
  const [userWatchLists, setUserWatchLists] = useState([])
  const [loader,setLoader] = useState(false)
  const navigate = useNavigate()

  async function fetchWatchListFromDB() {
    setLoader(true)
    try {
      const watchListReviews = await Get(`${process.env.REACT_APP_SERVER_URL}/user/watchlist`, Cookies.get('jwt'))
      if (watchListReviews.ok) {
        const jsonData = await watchListReviews.json()
        console.log('watch list has been fetched ')
        console.log(jsonData.data)
        setUserWatchLists(jsonData.data)
      } else {
        console.log('unable to fetch reviews list')
      }
      setLoader(false)
    }catch(error){
      console.log("internal server error")
      console.log(error)
      setLoader(false)
    }
    

  }
  async function deleteReviewFromWatchList(reviewId) {
    setLoader(true)
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
      setLoader(false)

    } catch (error) {
      console.log('error in deleting the review from watch list ')
      console.log(error)
      setLoader(false)
    }
  }

  useEffect(() => {
    if(Cookies.get('jwt')){
      fetchWatchListFromDB()
    }else{
      // alert('please login to your account')
      navigate('/401')
    }
    
  }, [])
  return (
    <>
      <UserNav></UserNav>
      {loader? <div className="loader"></div>:''}
     
      <div id="user_watchlist">
        {
          userWatchLists.map((item, index) => {
            return (
              <div key={index} className="watchlist_const">
                <div className='watchlist_movie_review_box'>

                  <img src={item.reviewObject.moviePosterUrl} alt={item.reviewObject.movieName} height='200px' />



                  <div className='watchlist_movie_details_box'>
                    <div className='movie_ref_box'>
                      <img className='cursor-pointer' title='check on TMDB' src={imdb} onClick={() => { window.open(item.reviewObject.movieTmdbReference, '_blank') }} alt="imdb" />
                      <img className='cursor-pointer' title='download' onClick={() => { window.open(item.reviewObject.downloadLink, '_blank') }} src={download_icon} alt="download" />
                    </div>

                    <p>{item.reviewObject.movieName}</p>
                    <p>{parseFloat(item.reviewObject.movieRating).toFixed(1)}  <span>{item.reviewObject.movieReleaseDate} </span></p>
                    <div className='watchlist_tags_cont'>
                      {item.reviewObject.tags.map((item, index) => {
                        return <span key={index}>{item}</span>
                      })}
                    </div>
                    {/* <p>{item.reviewObject.description}</p> */}
                    <p>{item.reviewObject.description.split(' ').slice(0, 35).join(' ')} {item.reviewObject.description.split(' ').length > 45 ? <span className='cursor-pointer' style={{color:'blue'}} onClick={() => { window.open(item.reviewObject.movieTmdbReference, '_blank') }}>Read more</span> : ''}</p>
                  </div>

                  <button className='cursor-pointer' onClick={() => { deleteReviewFromWatchList(item.reviewObject._id) }}><img src={deleteIcon} alt="save" /></button>
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
