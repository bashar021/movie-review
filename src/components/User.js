import React, { useState, useRef, useEffect } from 'react'
import notification_icon from '../icons/notification-icon.png'
import avatar_icon from '../icons/avatar-icon.png'
import '../styles/User.css'
import Homepage_body from './Homepage_body.js'
import Profile_Details from './Profile_Details.js'
import Watchlist from './Watchlist.js'
import My_reviews from './My_reviews.js'

export default function User() {
    const [userOptionDropdown, setUserOptionDropdown] = useState(false)
    const dropdownRef = useRef(null);
    const [selectedUserOption,setSelectedUserOption] = useState('homepage')

    useEffect(() => {
        function handleClickOutside(event) {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setUserOptionDropdown(false);
          }
        }
        if (userOptionDropdown) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [userOptionDropdown]);
    
      const toggleDropdown = () => {
        setUserOptionDropdown(!userOptionDropdown);
        // setUserOptionDropdown(false);
      };
    

    return (
        <>
            <div id='navbar_cont'>
                <div id='website_name'><span style={{cursor:'pointer'}}  onClick={()=>{setSelectedUserOption('homepage')}}>Website Name</span></div>
                <div id='userNavOptionsBox' >
                    <button id='notificationIconBtn'><img src={notification_icon} alt="notification" /></button>
                    <button onClick={() => { toggleDropdown() }} id='userProfileBtn'><img src={avatar_icon} alt="user" /></button>
                </div>
            </div>

            {userOptionDropdown ?
                <div className="userOptionDropdown" ref={dropdownRef}>
                    <ul>
                    {/* <li onClick={()=>{setSelectedUserOption('profile')}}>P</li> */}
                        <li onClick={()=>{setSelectedUserOption('profile')}}>Profile</li>
                        <li onClick={()=>{setSelectedUserOption('my reviews')}}>My Reviews</li>
                        <li onClick={()=>{setSelectedUserOption('watchlist')}}>Watchlist</li>
                        <li>Logout</li>
                    </ul>
                </div> : ''

            }
            {selectedUserOption === 'homepage'? <Homepage_body></Homepage_body>:''}
            {selectedUserOption === 'profile'? <Profile_Details></Profile_Details>:''}
            {selectedUserOption === 'my reviews'?<My_reviews></My_reviews>:''}
            {selectedUserOption === 'watchlist'?<Watchlist></Watchlist>:''}

           
            
        </>
    )
}
