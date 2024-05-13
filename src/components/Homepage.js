import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Homepage_body from './Homepage_body'
import Profile_Details from './Profile_Details'
import LoginSignup from './LoginSignup'
import Cookies from 'js-cookie';
import { Route, BrowserRouter as Router, Routes, useNavigate, Redirect } from "react-router-dom"

export default function Homepage(props) {
  const navigate = useNavigate();
  useEffect(() => {
   
    if (Cookies.get('jwt')) {
      navigate('/user')

    }
  }, [])

  return (
    <>
      <Navbar></Navbar>

      {/* <Profile_Details></Profile_Details> */}
      <Homepage_body reviews={props.reviews}></Homepage_body>
      {/* <LoginSignup></LoginSignup> */}

    </>

  )
}
