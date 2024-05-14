import React, { useEffect,useState } from 'react'
import Navbar from './Navbar'
import Homepage_body from './Homepage_body'
import Profile_Details from './Profile_Details'
import LoginSignup from './LoginSignup'
import Cookies from 'js-cookie';
import { Route, BrowserRouter as Router, Routes, useNavigate, Redirect } from "react-router-dom"
import Get from '../controllers/Get.js'
import findMatches from '../controllers/FindMatchesReview.js'

export default function Homepage(props) {
  const [reviews, setReviews] = useState([])
  const [loader,setLoader] = useState(false)
  const [searchAlert,setSearchAlert] = useState('')
  const navigate = useNavigate();
  useEffect(() => {
    if (Cookies.get('jwt')) {
      navigate('/user')
    }
  }, [])
  async function fetchGuestReviews(){
    setLoader(true)
    try {
      const data = await Get(`${process.env.REACT_APP_SERVER_URL}/reviews`, Cookies.get('jwt'))
      const jsonData = await data.json()
      if (data) {setReviews(jsonData.data)}
    } catch (error) {
      // console.log('server is not responding')
      console.log(error)
      window.location.href = '/503'
    }
    setLoader(false)
  }
  useEffect(() => {
    (async ()=>{
      fetchGuestReviews()
    })()
    
  }, [])
  function handleReviewSearch(by,value){
    const matches = findMatches(reviews,value,by)
    // console.log(matches)
    if(matches.length >0){
      setReviews([...matches])

    }else{
      setSearchAlert('No Result Found :')
    }
  }
  function cancelReviewSearch(){
    setSearchAlert('')
    fetchGuestReviews()

  }

  return (
    <>
      <Navbar search={handleReviewSearch} cancelSearch={cancelReviewSearch}></Navbar>
      {loader?<div className='loader'></div>:''}
      {searchAlert?<div className='no-result-found'></div>:""}
      <Homepage_body reviews={reviews} ></Homepage_body>

    </>

  )
}
