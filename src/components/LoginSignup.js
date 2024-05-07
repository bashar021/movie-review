import React, { useState ,useEffect} from 'react'
import { useHistory,useNavigate  } from "react-router-dom";
import bg from '../images/loginsignupbg.jpg'
import '../styles/LoginSignup.css'
import name from '../icons/name.png'
import email_icon from '../icons/email-icon.png'
import phone_icon from '../icons/phone-icon.png'
import password_icon from '../icons/password-icon.png'

export default function LoginSignup(props) {
    const [signUpForm, setSignupForm] = useState(false)
    const [loginForm, setLoginForm] = useState(true)
    const [name,setName] = useState('')
    const [userName,setUserName] = useState('')
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPass,setConfirmPass] =  useState('')
    const navigate = useNavigate();
    function handleSignUP(){
        navigate('/user')
        console.log('signUp')

    }
    function handleLogin(){
        navigate('/user')
        console.log('login')

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
        // console.log(url.slice(3).join("/"))

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
                                    <img src={name} alt="" />
                                    <input value={name} onChange={(event)=>{setName(event.target.value)}} type="text" placeholder='Name' required/>
                                </div>
                                <div>
                                    <img src={name} alt="" />
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
                                <button  >SignUp</button>
                            </form>



                            :


                        <form onSubmit={(event)=>{event.preventDefault();handleLogin()}}>
                            <div>
                                <img src={name} alt="name" />

                                <input value={userName} onChange={(event)=>{setUserName(event.target.value)}} type="text" placeholder="UserName" required />
                             </div>
                             <div>
                                <img src={password_icon} alt="password" />
                                <input value={password} onChange={(event)=>{setPassword(event.target.value)}} type="password" placeholder="Password"  required/>
                            </div>
                            <button >Login</button>

                        </form>
                        }

                </div>
            </div>
        </div >
        </>
    )
}
