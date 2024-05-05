import React from 'react'
import '../styles/Navbar.css'
export default function Navbar() {
  return (
    <div id='navbar_cont'>
      <div id='website_name'><span>Website Name</span></div>
      <div id="login_signup_btn_box"><a href="/">Login</a> <a href='/'>SignUp</a></div>
    </div>
  )
}
