import React, { useState ,useEffect} from 'react'
import { useHistory,useNavigate  } from "react-router-dom";
import bg from '../images/loginsignupbg.jpg'
import '../styles/LoginSignup.css'
import user_profile_icon from '../icons/name.png'
import email_icon from '../icons/email-icon.png'
import phone_icon from '../icons/phone-icon.png'
import password_icon from '../icons/password-icon.png'
import Post from '../controllers/Post.js'
import Cookies from 'js-cookie';


export default function LoginSignup(props) {
    const [signUpForm, setSignupForm] = useState(false)
    const [loginForm, setLoginForm] = useState(true)
    const [name,setName] = useState('')
    const [userName,setUserName] = useState('')
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPass,setConfirmPass] =  useState('')
    const [serverMessage,setServerMessage] = useState('')
   
    const navigate = useNavigate();
    async function handleSignUP(){
        const data  = await Post(`${process.env.REACT_APP_SERVER_URL}/signup`,{name:name,userName:userName,email:email,phone:phone,password:password})
        // navigate('/user')
        // 201 status code for the sucess creation of the user account 
        const jsonData  = await data.json()
        if(data.ok){ 
            // console.log(jsonData)
            console.log('user has been created in the server ')
            // console.log(jsonData.data.email)
            // props.setUserDetails(jsonData)
            // const authToken = Cookies.get('jwt');
            Cookies.set('jwt',jsonData.jwt, { expires: 7 })
            console.log(Cookies.get('jwt'))
            Cookies.set('email',jsonData.data.email, { expires: 7 })
            Cookies.set('userName',jsonData.data.userName,{ expires: 7 })
            navigate('/user')
        }else{
            console.log(jsonData.error)
            setServerMessage(jsonData.error)

        }
    }
    
    async function handleLogin(){
        const data  = await Post(`${process.env.REACT_APP_SERVER_URL}/login`,{email:email,password:password})
        const jsonData  = await data.json()
        if(data.ok){ 
            // console.log(jsonData)
            // console.log(jsonData.data.email)
            // props.setUserDetails(jsonData)

            console.log('user has logged in ')
            // const authToken = Cookies.get('jwt');
            Cookies.set('jwt',jsonData.jwt, { expires: 7 })
            console.log(Cookies.get('jwt'))
            Cookies.set('email',jsonData.data.email, { expires: 7 })
            Cookies.set('userName',jsonData.data.userName,{ expires: 7 })

            navigate('/user')
        }else{
            console.log(jsonData.error)
            setServerMessage(jsonData.error)
        }
        // navigate('/user')
        // console.log('login')
    }

    useEffect(()=>{ 
        const url = window.location.href.split("/");
        if(url.slice(3).join("/") === 'signup'){
            setLoginForm(false)
            setSignupForm(true)
        }else{
            setLoginForm(true)
            setSignupForm(false)

        }
        // const authToken = Cookies.get('jwt');
        // console.log(authToken); // Do something with the coo

    },[])
    return (
        <>
            <div id='loginSignupCont' style={{ backgroundImage: `url(${bg})` }}>
                <div className='loginSignupBox'>
                    <div>
                        <h2>Movies Reviews</h2>
                        <button className={loginForm ? 'loginActive' : 'loginInActive'} onClick={() => { setSignupForm(false);setLoginForm(true) }}>Login</button>
                        <button className={signUpForm ? 'loginActive' : 'loginInActive'} onClick={() => { setSignupForm(true) ;setLoginForm(false)}}> Signup</button>



                        {signUpForm ?
                            <form onSubmit={(event)=>{event.preventDefault();handleSignUP()}}>
                                <div>
                                    <img src={user_profile_icon} alt="" />
                                    <input value={name} onChange={(event)=>{setName(event.target.value)}} type="text" placeholder='Name' required/>
                                </div>
                                <div>
                                    <img src={user_profile_icon} alt="" />
                                    <input value={userName}  onChange={(event)=>{setUserName(event.target.value)}} type="text" placeholder="UserName" required/>
                                </div>
                                <div>
                                    <img src={email_icon} alt="" />
                                    <input value={email} onChange={(event)=>{setEmail(event.target.value)}} type="text" placeholder="Email" required/>
                                </div>
                                <div>
                                    <img src={phone_icon} alt="" />
                                    <input value={phone} onChange={(event)=>{setPhone(event.target.value)}} type="text" placeholder='Phone' required/>
                                </div>
                                <div>
                                    <img src={password_icon} alt="" />
                                    <input value={password} onChange={(event)=>{setPassword(event.target.value)}} type="password" placeholder="Password" />
                                </div>
                                <div>
                                    <img src={password_icon} alt="" />
                                    <input value={confirmPass}  onChange={(event)=>{setConfirmPass(event.target.value)}} type="password" placeholder='Re Enter you Password' />
                                </div>
                                <button type='submit' >SignUp</button>
                            </form>



                            :


                        <form onSubmit={(event)=>{event.preventDefault();handleLogin()}}>
                            <div>
                                <img src={user_profile_icon} alt="name" />

                                <input value={email} onChange={(event)=>{setServerMessage('');setEmail(event.target.value)}} type="text" placeholder="Email" required />
                             </div>
                             <div>
                                <img src={password_icon} alt="password" />
                                <input value={password} onChange={(event)=>{setServerMessage('');setPassword(event.target.value)}} type="password" placeholder="Password"  required/>
                            </div>
                            <button >Login</button>

                        </form>
                        }
                        {serverMessage !== ''? <p style={{color:'red'}}>{serverMessage}</p>:''}
                       
                </div>
            </div>
        </div >
        </>
    )
}
