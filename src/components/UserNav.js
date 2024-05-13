import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate,useLocation,useHistory } from 'react-router-dom'
import notification_icon from '../icons/notification-icon.png'
import avatar_icon from '../icons/avatar-icon.png'
import Notification from './Notification.js'
import Get from '../controllers/Get.js'
import Cookies from 'js-cookie'
import homeIcon from '../icons/homeIcon.png'

// import {} from 'react-router-dom'

export default function UserNav(props) {
    const [userOptionDropdown, setUserOptionDropdown] = useState(false)
    const [searchOption, setSearchOption] = useState('name');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showNotification,setShowNotification] = useState(false)
    const [userNotifications,setUserNotifications] = useState([])
    const dropdownRef = useRef(null);
    const navigate = useNavigate()

    async function getNotifications(){
        try {
            const notifications = await Get(`${process.env.REACT_APP_SERVER_URL}/user/notifications`,Cookies.get('jwt'))
            const jsonData = await notifications.json()
            if(notifications.ok){
                console.log(jsonData.data.notifications)
                setUserNotifications([...jsonData.data.notifications])
            }else{
                console.log('error in fetching notifications ')
            }
            
        } catch (error) {
            console.log(error)
            console.log(error.message)
            // navigate('/503')
            alert('unable to load notification')
            // navigate('/user/503')
            // redirect("/503");
        }
       
    }
    useEffect(()=>{
        getNotifications()
    },[])
    
   
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
    };
    const handleSearchSubmit = (event) => {
        event.preventDefault(); 
        props.search(searchOption,searchQuery)
    };
    
    return (
        <>
            <div id='navbar_cont'>
                <div id='website_name'><span style={{ cursor: 'pointer' }} onClick={() => { navigate('/user') }}>Website Name</span></div>

                <div id="searchCont">
                    <form onSubmit={handleSearchSubmit}>
                        <select value={searchOption} onChange={(event)=>{setSearchOption(event.target.value);}}>
                            <option value="name">Search by Name</option>
                            <option value="genre">Search by Genre</option>
                            {/* <option value="rating">Search by Rating</option> */}
                        </select>
                        <div className='searchInputCancelBtnCont' style={{display:'flex'}}>
                            <input type="text" value={searchQuery} onChange={(event)=>{setSearchQuery(event.target.value);}} placeholder="Enter search query" />
                            {searchQuery!== ''?<button onClick={()=>{props.cancelSearch();setSearchQuery('')}} className='clearSearchQuery'>X</button>:''
                            }
                        </div>
                        <button className='searchQueryBtn' type="submit">Search</button>
                    </form>
                </div>

                <div id='userNavOptionsBox' >
                    <button onClick={()=>{setShowNotification(true)}} id='notificationIconBtn'><img src={notification_icon} alt="notification" /></button>
                    <button onClick={() => { toggleDropdown() }} id='userProfileBtn'><img src={avatar_icon} alt="user" /></button>
                    <button onClick={() => { navigate('/user') }} id="homeBtn"><img width='35px' src={homeIcon} alt="" /></button>
                </div>
            </div>
            {userOptionDropdown ?
                <div className="userOptionDropdown" ref={dropdownRef}>
                    <ul>
                        <li > <Link to="/user/profile-details">Profile Details</Link></li>
                        <li > <Link to='/user/reviews'>My Reviews</Link></li>
                        <li ><Link to='/user/watch list'>WatchList</Link></li>
                        <li>Logout</li>
                    </ul>
                </div> : ''


            }
            {showNotification?<Notification userNotifications={userNotifications} showNotification={showNotification} setShowNotification={setShowNotification}></Notification>:''}
            

        </>
    )
}
