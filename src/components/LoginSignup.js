import React, { useState } from 'react'
import bg from '../images/loginsignupbg.jpg'
import '../styles/LoginSignup.css'
import name from '../icons/name.png'
import email_icon from '../icons/email-icon.png'
import phone_icon from '../icons/phone-icon.png'
import password_icon from '../icons/password-icon.png'

export default function LoginSignup() {
    const [signUpForm, setSignupForm] = useState(false)
    const [loginForm, setLoginForm] = useState(true)
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
