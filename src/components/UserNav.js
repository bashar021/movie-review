import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate,useLocation,useHistory } from 'react-router-dom'
import notification_icon from '../icons/notification-icon.png'
import avatar_icon from '../icons/avatar-icon.png'
import Notification from './Notification.js'
import Get from '../controllers/Get.js'
import Cookies from 'js-cookie'
import homeIcon from '../icons/homeIcon.png'
// import from '../styles/responsive/HomepageNavbar.css'
import '../styles/responsive/HomepageNavbar.css'

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
            // alert('unable to load notification')
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
    function handleLogout(){
        Cookies.remove('jwt')
        Cookies.remove('email')
        Cookies.remove('userName')
        
        // window.location.reload()
        // navigate('/')
        window.location.href = '/'
        // window.href('/')

    }
    
    return (
        <>
            <div id='navbar_cont'>
                <div id='website_name'><span style={{ cursor: 'pointer' }} onClick={() => { navigate('/user') }}>Website Name</span></div>

                <div className='searchCont' id="searchCont">
                    <form id='searchCont-form' onSubmit={handleSearchSubmit}>
                        <select id='genre-select-field-on-homepage' value={searchOption} onChange={(event)=>{setSearchOption(event.target.value);}}>
                            <option value="name">Search by Name</option>
                            <option value="genre">Search by Genre</option>
                            {/* <option value="rating">Search by Rating</option> */}
                        </select>
                        <div id='searchInputCancelBtnCont' className='searchInputCancelBtnCont' style={{display:'flex'}}>
                            <input type="text" value={searchQuery} onChange={(event)=>{setSearchQuery(event.target.value);}} placeholder="search" />
                            {searchQuery!== ''?<button onClick={()=>{props.cancelSearch();setSearchQuery('')}} type='button' className='clearSearchQuery'>X</button>:''
                            }
                        </div>
                        <button className='searchQueryBtn' id='searchQueryBtn' type="submit">Search</button>
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
                        <li > <Link style={{color:"white",textDecoration:'none'}} to="/user/profile-details">Profile Details</Link></li>
                        <li > <Link style={{color:"white",textDecoration:'none'}} to='/user/reviews'>My Reviews</Link></li>
                        <li ><Link style={{color:"white",textDecoration:'none'}} to='/user/watch list'>WatchList</Link></li>
                        <li onClick={()=>{handleLogout()}} >Logout</li>
                    </ul>
                </div> : ''


            }
            {showNotification?<Notification userNotifications={userNotifications} showNotification={showNotification} setShowNotification={setShowNotification}></Notification>:''}
            

        </>
    )
}
