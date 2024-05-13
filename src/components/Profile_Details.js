import React, { useState, useEffect } from 'react';
import '../styles/Profile.css'; // Import CSS file for styling
import edit_icon from '../icons/edit.png'
import avatar from '../icons/avatar.png'
import Post from '../controllers/Post.js'
import Cookies from 'js-cookie';
import UserNav from './UserNav.js'
import Get from '../controllers/Get.js'
const Profile = (props) => {
  const [userName, setUserName] = useState('')
  const [editUserName, setEditUserName] = useState(true)
  const [name, setName] = useState('')
  const [editName, setEditName] = useState(true)
  const [email, setEmail] = useState('')
  const [editEmail, setEditEmail] = useState(true)
  const [phone, setPhone] = useState('');
  const [editPhone, setEditPhone] = useState(true)
  const [password, setPassword] = useState('')
  const [editPassword, setEditPassword] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [saveDetailsBtn, setSaveDetailsBtn] = useState(true)


  const updateNewPassword = function () {

  }
  const updateDetails = async function () {
    const data = await Post(`${process.env.REACT_APP_SERVER_URL}/update-details`, { userName: userName, name: name, email: email, phone: phone }, Cookies.get('jwt'))
    const jsonData = await data.json()
    if (data.ok) {
      console.log('user details has been updated ')
      props.setUserDetails(jsonData.data)
      setDetails(jsonData.data)
      closeDetailsEditOption()

    } else {
      console.log(jsonData.error)

      // setServerMessage(jsonData.error)
    }
  }
  async function fetchUserData() {
    const data = await Get(`${process.env.REACT_APP_SERVER_URL}/details`, Cookies.get('jwt'))
    const jsonData = await data.json()
    if (data.ok) {
      console.log('user details has been fetched from server  :',jsonData.data.userDetails)
      props.setUserDetails(jsonData.data)
      setDetails(jsonData.data.userDetails)
      // setUserName('Bashar alam')
    } else {
      console.log(jsonData.error)
    }
  }
  useEffect(() => {
    fetchUserData()

  }, [])

  function closeDetailsEditOption() {
    setEditUserName(true)
    setEditName(true)
    setEditEmail(true)
    setEditPhone(true)
    setEditPassword(false)
    setSaveDetailsBtn(true)

  }
  function setDetails(data) {
    setUserName(data.userName)
    // console.log(data.userDetails)
    setName(data.name)
    setEmail(data.email)
    setPhone(data.number)
    setPassword(data.password)



  }


  return (
    <>
      <UserNav></UserNav>
      <div id='user_detail_cont'>

        <div id='profile_avatar_cont'>
          <div>
            <img src={avatar} alt="avatar" />
          </div>
          <p>45</p>

        </div>

        <div className="profile-container">
          <button id='save_details_btn' onClick={() => { updateDetails() }} disabled={saveDetailsBtn}>save</button>
          <div className='details_field'>
            <label className='general_details_labels' htmlFor="userName">UserName :</label>
            <div className='editable_detail_box'>
              <input className='general_details ' id='userName' type="text" value={userName} onChange={(event) => { setUserName(event.target.value) }} disabled={editUserName} />
              <button onClick={() => { setEditUserName(false); setSaveDetailsBtn(false) }}> <img src={edit_icon} alt="edit" /></button>
            </div>

          </div>


          <div className='details_field'>
            <label className='general_details_labels' htmlFor="name">Name :</label>
            <div className='editable_detail_box'>
              <input className='general_details' id='name' type="text" value={name} onChange={(event) => { setName(event.target.value) }} disabled={editName} />
              <button onClick={() => { setEditName(false); setSaveDetailsBtn(false) }}> <img src={edit_icon} alt="edit" /> </button></div>
          </div>

          <div className='details_field'>
            <label className='general_details_labels' htmlFor="userEmail">Email :</label>
            <div className='editable_detail_box'>
              <input className='general_details' id='userEmail' type="email" value={email} onChange={(event) => { setEmail(event.target.value) }} disabled={editEmail} />
              <button onClick={() => { setEditEmail(false); setSaveDetailsBtn(false) }}> <img src={edit_icon} alt="edit" /> </button></div>

          </div>

          <div className='details_field'>
            <label className='general_details_labels' htmlFor="userPhone">Phone :</label>
            <div className='editable_detail_box'>
              <input className='general_details' type="number" id='userPhone' value={phone} onChange={(event) => { setPhone(event.target.value) }} disabled={editPhone} />
              <button onClick={() => { setEditPhone(false); setSaveDetailsBtn(false) }}> <img src={edit_icon} alt="edit" /> </button></div>

          </div>

          <div className='details_field'>
            <label className='general_details_labels' htmlFor="userPassword">Password :</label>
            <div className='editable_detail_box'>
              <input className='general_details' id='userPassword' type="password" value={password} onChange={(event) => { setPassword(event.target.value) }} disabled />
              <button onClick={() => { setEditPassword(true); setSaveDetailsBtn(false) }}><img src={edit_icon} alt="edit" /> </button>
            </div>

          </div>
          {editPassword === true ? <div className='change_password_box'>
            <input type="password" placeholder='Old password' />
            <input type="password" placeholder='New password' />
            <button onClick={() => { updateNewPassword() }}>Reset</button>
            <button onClick={() => { setEditPassword(false) }}>Cancel</button>
          </div> : ''}


        </div>

      </div>
    </>
  );
};

export default Profile;
