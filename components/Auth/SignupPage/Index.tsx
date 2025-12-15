"use client";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const SignupPage = () => {
  const [activeTab, setActiveTab] = useState("fan");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  return (
    <div className="container login_wrap">
      <div className="img_wrap">
        <img src="/images/loginflowimg.png" className="login_imgwrap"/>
      </div>
      <div className="moneyboy-feed-page-container cont_wrap">
        <div className="main_cont">
          <img src="/images/logo.svg" className="logo_wrap"/>
          <div className="moneyboy-post__container card">
            <h3 className="heading">Fan Sign up</h3>
            <p>Sign up to interact with your idols!</p>
            <div className="loginbtn_wrap">
             <button className="google-button active-down-effect "><FcGoogle size={18} /> Sign up with Google</button>
             <button className="x-button active-down-effect"><FaXTwitter size={18}/> Sign up with X</button>
            </div>
            <div className="or-divider"><span>Or</span></div>
            <div className="form_grid">
              <div className="label-input">
                <div className="input-placeholder-icon"><i className="icons user svg-icon"></i></div>
                <input type="text" placeholder="First Name *"/>
              </div>
              <div className="label-input">
                <div className="input-placeholder-icon"><i className="icons user svg-icon"></i></div>
                <input type="text" placeholder="Last name *"/>
              </div>
              <div className="label-input one">
                <div className="input-placeholder-icon"><i className="icons user2 svg-icon"></i></div>
                <input type="text" placeholder="Display name *"/>
              </div>
              <div className="label-input one">
                <div className="input-placeholder-icon"><i className="icons profile-check svg-icon"></i></div>
                <input type="text" placeholder="User name *"/>
              </div>
              <div className="label-input one">
                <div className="input-placeholder-icon"><i className="icons message svg-icon"></i></div>
                <input type="text" placeholder="Email Address *"/>
              </div>
              <div className="label-input password one">
                <div className="input-placeholder-icon"><i className="icons lock svg-icon"></i></div>
                <input type={showPass ? "text" : "password"} placeholder="Password *" />
                <span onClick={() => setShowPass(!showPass)} className="input-placeholder-icon eye-icon">{showPass ? (<i className="icons eye svg-icon"></i>) : (<i className="icons eye-slash svg-icon"></i>)}</span>
              </div>
              <div className="label-input password one">
                <div className="input-placeholder-icon"><i className="icons lock svg-icon"></i></div>
                <input type={showConfirmPass ? "text" : "password"} placeholder="Confirm password *" />
                <span onClick={() => setShowConfirmPass(!showConfirmPass)} className="input-placeholder-icon eye-icon">{showConfirmPass ? (<i className="icons eye svg-icon"></i>) : (<i className="icons eye-slash svg-icon"></i>)}</span>
              </div>
            </div>
            <Link href="/signup"><button className="premium-btn mb-10"><span>Sign up</span></button></Link>
            <p>By signing up you agree to our <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>, and confirm that you are at least 18 years old.</p>
            <p className="fs-18">Have an account already? <Link href="#">Log in here.</Link></p>
          </div>
          <h4 className="account_login">Are you a creator? <a href="/signup">Sign up here.</a></h4>
        </div>
      </div>
    </div>
  )
}

export default SignupPage;