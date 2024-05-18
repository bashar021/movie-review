import React, { useRef ,useEffect,useContext} from 'react'
import Get from '../controllers/Get.js'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import '../styles/Notification.css'
import '../styles/responsive/Notification.css'
import NotificationContext from '../contexts/notifications/NotificationsContext.js'

export default function Notification(props) {
    // const notification = [1, 2, 3, 22, 2, 2, 2, 2, 2, 2, 2, 2, 22, , 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    const notificationRef = useRef();
    const notificationBox = useRef();
    const notificationReview = useContext(NotificationContext)
    const navigate = useNavigate()
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                // setUserOptionDropdown(false);
                props.setShowNotification(false)
            }
        }
        
        if (props.showNotification) {
            document.addEventListener('mousedown', handleClickOutside);
          
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
           
        }
        return () => {
           
        };
    }, [props.showNotification]);
    return (
        <>
        
        <div   className={props.showNotification?'notificationTabShow':'notificationTabShow'}  id="notificationTab">
            <div   ref={notificationRef} id="notificationCont">
                {[...props.userNotifications].reverse().map((item, key) => {
                    return (
                        <div  onClick={()=>{notificationReview.setNotificationReviewId(item.reviewId); props.setShowNotification(false);navigate('/user')}}  key={key} className='cursor-pointer notificationBox'>
                            {/* <p></p> */}
                            <p><strong>{ item.senderUserName }</strong> 
                            { item.message }     
                            {item.commentedOnComment?<strong>{item.commentedOnComment}</strong>:''}
                            {item.commentedOnComment?<span>on</span>:''}

                            <strong>{item.reviewName}</strong>
                            </p>
                        </div>
                    )
                })}

            </div>
        </div>
        </>
    )
}
