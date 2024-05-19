import React, { useState, useEffect } from 'react'
import '../styles/Watchlist.css'
import Homepage_body from './Homepage_body.js'
import '../styles/responsive/WatchList.css'
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
import findMatches from '../controllers/FindMatchesReview.js'
import DeleteConfirmation from './DeleteConfirmation.js'
import BriefView from './BriefView.js'
// import Cookies from 'js-cookie'
// 
// import Cookies from 'js-cookie'


export default function Watchlist() {
  const [userWatchLists, setUserWatchLists] = useState([])
  const [loader,setLoader] = useState(false)
  const navigate = useNavigate()
  const [searchAlert,setSearchAlert] = useState('')
  const [deleteConfirmationPopUp,setDeleteConfirmationPopUp] = useState('')
  const [briefView,setBriefView] = useState(null)

  useEffect(() => {
    if(Cookies.get('jwt')){
      fetchWatchListFromDB()
    }else{
      // alert('please login to your account')
      navigate('/401')
      // window.location.href = '/401'
    }
    
  }, [])
  async function fetchWatchListFromDB() {
    setLoader(true)
    try {
      const watchListReviews = await Get(`${process.env.REACT_APP_SERVER_URL}/user/watchlist`, Cookies.get('jwt'))
      if (watchListReviews.ok) {
        const jsonData = await watchListReviews.json()
        console.log('watch list has been fetched ')
        // console.log(jsonData.data)
        const modifiedWatchList = jsonData.data.map((item)=>{return item.reviewObject;})
        setUserWatchLists(modifiedWatchList)
        // console.log(modifiedWatchList)
      } else {
        console.log('unable to fetch reviews list')
      }
      setLoader(false)
    }catch(error){
      console.log("internal server error")
      console.log(error)
      setLoader(false)
      navigate('/500')
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
        // console.log(updatedWatchList)
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
  function handleSearchReviewInWatchList(by,value){
    console.log(by,value)
    const matches = findMatches(userWatchLists,value,by)
    if(matches.length>0){
      setUserWatchLists([...matches])
    }else{
      setSearchAlert('No Result Found :')
    }

  }
  function cancelSearchReviewInWatchList(){
    fetchWatchListFromDB()
    setSearchAlert('')


  }
  function handleDeleteConfirmation(confirm){
    if(confirm){
      console.log('deleted')
      deleteReviewFromWatchList(deleteConfirmationPopUp)
    }else{
      console.log('cancer the deletion ')
    }
    setDeleteConfirmationPopUp('')
  }

  
  return (
    <>
      <UserNav search={handleSearchReviewInWatchList} cancelSearch={cancelSearchReviewInWatchList}></UserNav>
      {briefView !== null ?<BriefView review={briefView} setBriefView={setBriefView}></BriefView>:''}
      {searchAlert?<div className='no-result-found' >{searchAlert} </div>:''}
     
      {deleteConfirmationPopUp !== ''?<DeleteConfirmation confirm={handleDeleteConfirmation}></DeleteConfirmation>:''}
      
      
     
      <div id="user_watchlist">
      {/* {loader? <div className="loader"></div>:''} */}
      {loader ?
          <div style={{ width: '100%', marginBottom: '0px', paddingBottom: "0px", height: 'fit-content', marginTop: '1%' }}>
            <div className='loader'></div><br />
          </div> : ''
        }
        {
          userWatchLists.map((item, index) => {
            return (
              <div key={index} className="watchlist_const">
                <div className='watchlist_movie_review_box'>

                  <img onClick={()=>{setBriefView(item)}} className='cursor-pointer' src={item.moviePosterUrl} alt={item.movieName} height='200px' />



                  <div className='watchlist_movie_details_box'>
                    <div className='movie_ref_box'>
                      <img className='cursor-pointer' title='check on TMDB' src={imdb} onClick={() => { window.open(item.movieTmdbReference, '_blank') }} alt="imdb" />
                      <img className='cursor-pointer' title='download' onClick={() => { window.open(item.downloadLink, '_blank') }} src={download_icon} alt="download" />
                    </div>

                    <p>{item.movieName}</p>
                    <p>{parseFloat(item.movieRating).toFixed(1)}  <span>{item.movieReleaseDate} </span></p>
                    <div className='watchlist_tags_cont'>
                      {item.tags.map((item, index) => {
                        return <span key={index}>{item}</span>
                      })}
                    </div>
                    {/* <p>{item.reviewObject.description}</p> */}
                    <p  id='watch-list-review-description'>{item.description.split(' ').slice(0, 35).join(' ')} {item.description.split(' ').length > 45 ? <span className='cursor-pointer' style={{color:'blue'}} onClick={() => { window.open(item.movieTmdbReference, '_blank') }}>Read more</span> : ''}</p>
                  </div>

                  <button className='cursor-pointer delete-watchList-review-btn'  onClick={() => { setDeleteConfirmationPopUp(item._id) }}><img src={deleteIcon} alt="delete" /></button>
                </div>

                <div className='watchlist_movie_review_box_child2'>
                  <div>
                    <span>{item.userName}</span>
                    <span>{item.commentCount} Comment</span>
                  </div>

                  <span>{dateFormat(item.date)}</span>
                </div>

              </div>
            )
          })}
      </div>
    </>


  )
}
