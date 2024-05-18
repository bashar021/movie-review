
import NotificationContext from "./NotificationsContext";
import React,{ useState } from "react";
const NotificationId = function(props){
    const [notificationReviewId,setNotificationReviewId] = useState('')
    return(
        // <Userdatacontext.Provider value={{updateuser,usernotes,update_user_notes_arr,userdetails,userauth,}}>
        //     {props.children}
        // </Userdatacontext.Provider>
        <NotificationContext.Provider value={{notificationReviewId,setNotificationReviewId}}>
              {props.children}
        </NotificationContext.Provider>
    )

}
export default NotificationId;