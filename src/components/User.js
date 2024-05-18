import React, { useState, useRef, useEffect, useContext } from 'react'
import '../styles/User.css'
import '../styles/responsive/User.css'
import Homepage_body from './Homepage_body.js'
import Profile_Details from './Profile_Details.js'
import { useHistory, useNavigate, Link, json } from "react-router-dom";
import Cookies from 'js-cookie';
import Get from '../controllers/Get.js'
import NotificationContext from '../contexts/notifications/NotificationsContext.js'
import UserNav from './UserNav.js';
const stringSimilarity = require('string-similarity')

export default function User(props) {
  const navigate = useNavigate();
  const [searchReviews, setSearchReviews] = useState([])
  const [FetchedReviews, setFetchedReviews] = useState([])
  const [spinner, setSpinner] = useState(false)
  const [searchAlert, setSearchAlert] = useState(false)
  const NotificationId = useContext(NotificationContext)
  const [notificationId,setNotificationId] = useState('')
  useEffect(() => {
    if (NotificationId.notificationReviewId !== '') {
      setNotificationId(NotificationId.notificationReviewId)
    }
  }, [NotificationId.notificationReviewId])
  function moveToTop(reviews,id){
    const index = reviews.findIndex((review) => {
       return review._id === id ;
    });
    if (index !== -1) {
      const [movie] = reviews.splice(index, 1);
      reviews.push(movie);
      NotificationId.setNotificationReviewId('')
      // setNotificationId('')
      return reviews
    }
    return []
  }

  async function fetchReviews() {
    try {
      const data = await Get(`${process.env.REACT_APP_SERVER_URL}/reviews`, Cookies.get('jwt'))
      const jsonData = await data.json()
      if (data) {
       
        if (notificationId !== '') {
          console.log('this is the filter rives apart from notification :' ,NotificationId.notificationReviewId)
          moveToTop(jsonData.data,NotificationId.notificationReviewId )
        }
        setFetchedReviews(jsonData.data)
        setSpinner(false)

      }

    } catch (error) {
      console.log('server is not responding')
      console.log(error)
      navigate('/500')
      // throw new Error('Failed to fetch data');

    }
  }
  useEffect(() => {
    if (!Cookies.get('jwt')) {
      alert('session expired')
      navigate('/login')

    } else {
      setSpinner(true)
      fetchReviews();
      // fetchUserData()
    }

  }, [notificationId])
  function findSimilarMatches(reviews, searchTerm) {
    const matchingReviews = [];
    reviews.forEach(review => {
      const searchTermWords = searchTerm.toLowerCase().split(/\s+/);
      const words = review.movieName.toLowerCase().split(/\s+/);
      searchTermWords.forEach(searchWord => {
        const relatedReviews = words.filter(word => word.includes(searchWord));
        if (relatedReviews.length > 0) {
          matchingReviews.push(review);
        }
      });
    });
    // console.log(matchingReviews)
    return matchingReviews;
  }

  function findSimilarMatchesByGenre(reviews, searchTerm) {
    const matchingReviews = [];
    reviews.forEach(review => {
      const tags = review.tags.map(tag => tag.toLowerCase());
      const searchTermWords = searchTerm.toLowerCase().split(/\s+/);
      searchTermWords.forEach(searchWord => {
        const relatedTags = tags.filter(tag => tag.includes(searchWord));
        if (relatedTags.length > 0) {
          matchingReviews.push(review);
        }
      });
    });
    return matchingReviews;
  }
  function performSearchQuery(by, value) {
    // console.log(props.reviews)
    // setSearchReviews([])

    setSpinner(true)
    if (by === 'name') {
      const filteredReviews = findSimilarMatches(FetchedReviews, value)
      console.log("filtered review", filteredReviews)
      setSearchReviews(filteredReviews)
      setSpinner(false)
      if (filteredReviews.length <= 0) {
        setSearchAlert(true)
      } else {
        setSearchAlert(false)
      }
    }
    if (by === 'genre') {
      const filteredReviews = findSimilarMatchesByGenre(FetchedReviews, value)
      console.log(filteredReviews)
      setSearchReviews(filteredReviews)
      setSpinner(false)
      if (filteredReviews.length <= 0) {
        setSearchAlert(true)
      } else {
        setSearchAlert(false)
      }
    }

    console.log(by, value)
  }
  function cancelSearch() {
    setSearchReviews([])
    setSearchAlert(false)
  }
  return (
    <>
      <UserNav cancelSearch={cancelSearch} search={performSearchQuery}></UserNav>
      <div id="homepage-review-cont" >
        {spinner ? <div className='loader'></div> : ''}
        <Homepage_body searchAlert={searchAlert} reviews={searchReviews.length > 0 ? searchReviews : FetchedReviews}></Homepage_body>

      </div>



    </>
  )
}
