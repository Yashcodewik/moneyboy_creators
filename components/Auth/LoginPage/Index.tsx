"use client";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("fan");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  return (
    <div className="container login_wrap">
      <div className="img_wrap">
        <img src="/images/loginflowimg.png" className="login_imgwrap"/>
      </div>
      <div className="moneyboy-feed-page-container cont_wrap justify-center">
        <div className="main_cont">
          <img src="/images/logo.svg" className="logo_wrap"/>
          <div className="moneyboy-post__container card">
            <h3 className="heading">Fan Login</h3>
            <p>Welcome back! Sign in to your account</p>
            <div className="loginbtn_wrap">
             <button className="google-button active-down-effect "><FcGoogle size={18} /> Sign up with Google</button>
             <button className="x-button active-down-effect"><FaXTwitter size={18}/> Sign up with X</button>
            </div>
            <div className="or-divider"><span>Or</span></div>
            <div className="form_grid">
              <div className="one">
               <div className="label-input">
                <div className="input-placeholder-icon"><i className="icons message svg-icon"></i></div>
                <input type="text" placeholder="Email Address *"/>
               </div>
               <span className="error-message">Enter valide Email</span>
              </div>
              <div className="one">
               <div className="label-input password">
                <div className="input-placeholder-icon"><i className="icons lock svg-icon"></i></div>
                <input type={showPass ? "text" : "password"} placeholder="Password *" />
                <span onClick={() => setShowPass(!showPass)} className="input-placeholder-icon eye-icon">{showPass ? (<i className="icons eye svg-icon"></i>) : (<i className="icons eye-slash svg-icon"></i>)}</span>
               </div>
               <span className="error-message">Enter Valid Password</span>
              </div>
              <div className="one text-right"><Link href="#" className="forget_link">Forgot password?</Link></div>
            </div>
            <Link href="/feed"><button className="premium-btn mb-10"><span>Sign up</span></button></Link>
            <p className="fs-18 mb-0">Don’t have an account? <Link href="/signup">Sign up</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;