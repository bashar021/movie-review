import React from 'react'
import Navbar from './Navbar'
import Homepage_body from './Homepage_body'
import Profile_Details from './Profile_Details'
import LoginSignup from './LoginSignup'

export default function Homepage() {
  return (
    <>
    <Navbar></Navbar>
   
    {/* <Profile_Details></Profile_Details> */}
    <Homepage_body></Homepage_body>
    {/* <LoginSignup></LoginSignup> */}
    
    </>
    
  )
}
