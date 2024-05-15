import React, { useState, useRef, useEffect } from 'react'
import '../styles/User.css'
import Homepage_body from './Homepage_body.js'
import Profile_Details from './Profile_Details.js'
import { useHistory, useNavigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';
import Get from '../controllers/Get.js'
import UserNav from './UserNav.js';
const stringSimilarity = require('string-similarity')

export default function User(props) {
  const navigate = useNavigate();
  const [searchReviews, setSearchReviews] = useState([])
  const [FetchedReviews, setFetchedReviews] = useState([])
  const [spinner, setSpinner] = useState(false)
  const [searchAlert, setSearchAlert] = useState(false)
  async function fetchReviews() {
    try {
      const data = await Get(`${process.env.REACT_APP_SERVER_URL}/reviews`, Cookies.get('jwt'))
      const jsonData = await data.json()
      if (data) {
        // setReviews(jsonData.data)
        setFetchedReviews(jsonData.data)
        setSpinner(false)
        // console.log(jsonData.data)
        console.log('review has been fetched')
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

  }, [])
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
      {spinner ? <div className='loader'></div> : ''}
      <Homepage_body searchAlert={searchAlert} reviews={searchReviews.length > 0 ? searchReviews : FetchedReviews}></Homepage_body>


    </>
  )
}
