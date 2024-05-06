import React from 'react'
import '../styles/Navbar.css'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <div id='navbar_cont'>
      <div id='website_name'><span>Website Name</span></div>
      <div id="login_signup_btn_box"><Link to="/login">Login</Link> <Link to='/signup'>SignUp</Link></div>
    </div>
  )
}
