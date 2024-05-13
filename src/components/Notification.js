import React, { useRef ,useEffect} from 'react'
import Get from '../controllers/Get.js'
import Cookies from 'js-cookie'
import '../styles/Notification.css'

export default function Notification(props) {
    // const notification = [1, 2, 3, 22, 2, 2, 2, 2, 2, 2, 2, 2, 22, , 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    const notificationRef = useRef();
    
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
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [props.showNotification]);
    return (
        <>
        
        <div className={props.showNotification?'notificationTabShow':'notificationTabShow'} ref={notificationRef} id="notificationTab">
            <div id="notificationCont">
                {props.userNotifications.map((item, key) => {
                    return (
                        <div key={key} className='notificationBox'>
                            <p><strong>{item.senderUserName}</strong>
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
