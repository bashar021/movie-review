
import './App.css';
import React, { useState, useEffect } from 'react'
import Homepage from './components/Homepage.js'
// import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import { Route, BrowserRouter as Router, Routes, useNavigate, Redirect } from "react-router-dom"
import LoginSignup from './components/LoginSignup.js';
import User from './components/User.js'
import Cookies from 'js-cookie';
import Get from './controllers/Get.js'
import Profile_Details from './components/Profile_Details.js'
// import Cookies from 'js-cookie'
import My_reviews from './components/My_reviews.js';
import Watchlist from './components/Watchlist.js';
import socketIOClient from 'socket.io-client';
import { NotFoundPage, BadRequest, RequestTimeOut, ForBidden, ServiceUnavailable, InternalServerError } from './controllers/ErrorPages.js'

const ENDPOINT = process.env.REACT_APP_SERVER_URL
// const socket = socketIOClient.connect(ENDPOINT);
// const socket = socketIOClient.connect('http://localhost:500');
// const socket = socketIOClient(ENDPOINT,{withCredentials: true});

// ,{
//   withCredentials: true,
//   extraHeaders: {
//     "my-custom-header": "abcd"
//   }
// }

function App() {
  const [userDetails, setUserDetails] = useState('')
  const [reviews, setReviews] = useState([])



  useEffect(async () => {
    try {
      const data = await Get(`${process.env.REACT_APP_SERVER_URL}/reviews`, Cookies.get('jwt'))
      const jsonData = await data.json()
      if (data) {
        setReviews(jsonData.data)
        // console.log(jsonData.data)
      }

    } catch (error) {
      console.log('server is not responding')
      console.log(error)
      // throw new Error('Failed to fetch data');

    }





  }, [])

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Homepage reviews={reviews} ></Homepage>}></Route>
        <Route path='/signup' element={<LoginSignup setUserDetails={setUserDetails} ></LoginSignup>} ></Route>
        <Route path='/login' element={<LoginSignup setUserDetails={setUserDetails} ></LoginSignup>} ></Route>
        <Route path='/user' element={<User reviews={reviews} userDetails={userDetails} setUserDetails={setUserDetails}></User>}></Route>
        <Route path='/user/profile-details' element={<Profile_Details userDetails={userDetails} setUserDetails={setUserDetails}></Profile_Details>}></Route>
        <Route path="/user/reviews" element={<My_reviews userReviews={userDetails.reviews}></My_reviews>}></Route>
        <Route path='user/watch list' element={<Watchlist></Watchlist>}></Route>
        <Route path='/user/404' Component={NotFoundPage}></Route>
        <Route path='/403' Component={ForBidden}></Route>
        <Route path='/400' Component={BadRequest}></Route>
        <Route path='/408' Component={RequestTimeOut}></Route>
        <Route path='/500' Component={InternalServerError}></Route>
        <Route path='/503' Component={ServiceUnavailable}></Route>
        <Route path='*' Component={NotFoundPage}></Route>
      </Routes>

    </Router>
  );
}

export default App;
