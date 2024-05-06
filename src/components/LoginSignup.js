import React, { useState ,useEffect} from 'react'
import bg from '../images/loginsignupbg.jpg'
import '../styles/LoginSignup.css'
import name from '../icons/name.png'
import email_icon from '../icons/email-icon.png'
import phone_icon from '../icons/phone-icon.png'
import password_icon from '../icons/password-icon.png'

export default function LoginSignup(props) {
    const [signUpForm, setSignupForm] = useState(false)
    const [loginForm, setLoginForm] = useState(true)
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
                            <form action="">
                                <div>
                                    <img src={name} alt="" />
                                    <input type="text" placeholder='Name' />
                                </div>
                                <div>
                                    <img src={name} alt="" />
                                    <input type="text" placeholder="UserName" />
                                </div>
                                <div>
                                    <img src={email_icon} alt="" />
                                    <input type="text" placeholder="Email" />
                                </div>
                                <div>
                                    <img src={phone_icon} alt="" />
                                    <input type="text" placeholder='Phone' />
                                </div>
                                <div>
                                    <img src={password_icon} alt="" />
                                    <input type="password" placeholder="Password" />
                                </div>
                                <div>
                                    <img src={password_icon} alt="" />
                                    <input type="password" placeholder='Re Enter you Password' />
                                </div>
                                <button>SignUp</button>
                            </form>



                            :


                        <form action="">
                            <div>
                                <img src={name} alt="" />
                                <input type="text" placeholder="UserName" />
                             </div>
                             <div>
                                <img src={password_icon} alt="" />
                                <input type="password" placeholder="Password" />
                            </div>
                            <button>Login</button>

                        </form>
                        }

                </div>
            </div>
        </div >
        </>
    )
}
