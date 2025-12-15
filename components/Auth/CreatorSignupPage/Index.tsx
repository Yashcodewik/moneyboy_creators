"use client";
import CustomSelect from "@/components/CustomSelect";
import Link from "next/link";
import { useState } from "react";
import { TbCamera } from "react-icons/tb";

const CreatorSignupPage = () => {
  const [activeTab, setActiveTab] = useState("fan");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  return (
    <div className="bg-off-white">
     <div className="container login_wrap creator_wrap">
      <div className="moneyboy-feed-page-container cont_wrap">
        <div className="main_cont">
          <img src="/images/logo.svg" className="logo_wrap"/>
          <div className="moneyboy-post__container card">
            <h3 className="heading">Creator Sign Up</h3>
            <p className="mb-10">Sign up to make money and interact with your fans!</p>
            <div className="creator_maingrid">
              <div className="form_grid">
                <div className="label-input">
                  <div className="input-placeholder-icon"><i className="icons user svg-icon"></i></div>
                  <input type="text" placeholder="First Name *"/>
                </div>
                <div className="label-input">
                  <div className="input-placeholder-icon"><i className="icons user svg-icon"></i></div>
                  <input type="text" placeholder="Last name *"/>
                </div>
                <div className="label-input">
                  <div className="input-placeholder-icon"><i className="icons user2 svg-icon"></i></div>
                  <input type="text" placeholder="Display name *"/>
                </div>
                <div className="label-input">
                  <div className="input-placeholder-icon"><i className="icons profile-check svg-icon"></i></div>
                  <input type="text" placeholder="User name *"/>
                </div>
                <div className="label-input one">
                  <div className="input-placeholder-icon"><i className="icons message svg-icon"></i></div>
                  <input type="text" placeholder="Email Address *"/>
                </div>
                <div className="label-input password">
                  <div className="input-placeholder-icon"><i className="icons lock svg-icon"></i></div>
                  <input type={showPass ? "text" : "password"} placeholder="Password *" />
                  <span onClick={() => setShowPass(!showPass)} className="input-placeholder-icon eye-icon">{showPass ? <i className="icons eye-slash svg-icon"></i> : <i className="icons eye svg-icon"></i>}</span>
                </div>
                <div className="label-input password">
                  <div className="input-placeholder-icon"><i className="icons lock svg-icon"></i></div>
                  <input type={showConfirmPass ? "text" : "password"} placeholder="Confirm password *" />
                  <span onClick={() => setShowConfirmPass(!showConfirmPass)} className="input-placeholder-icon eye-icon">{showConfirmPass ? <i className="icons eye-slash svg-icon"></i> : <i className="icons eye svg-icon"></i>}</span>
                </div>
                <div className="label-input">
                  <div className="input-placeholder-icon"><i className="icons groupUser svg-icon"></i></div>
                  <input type="text" placeholder="Male"/>
                </div>
                <div className="label-input">
                  <div className="input-placeholder-icon"><i className="icons bookmarkIcon svg-icon"></i></div>
                  <input type="text" placeholder="Date of Birth (DD/MM/YYYY) *"/>
                </div>
                <CustomSelect label="United States of America *" icon={<img src="/images/united_flag.png" className="svg-icon"/>}
                  options={[
                    { label: "options 1", value: "options 2" },
                    { label: "options 2", value: "options 2" },
                ]}/>
                <div className="label-input">
                  <div className="input-placeholder-icon"><svg className="icons locationIcon svg-icon"></svg></div>
                  <input type="text" placeholder="City *"/>
                </div>
                <div className="label-input textarea one">
                  <div className="input-placeholder-icon"><svg className="icons messageUser svg-icon"></svg></div>
                  <textarea rows={4}  placeholder="Bio"></textarea>
                </div>
                <CustomSelect label="All Body Types" icon={<svg className="icons handbody svg-icon" />}
                  options={[
                  { label: "All Body Types", value: "all" },
                  { label: "18-24", value: "18-24" },
                  { label: "25-34", value: "25-34" },
                  { label: "35-44", value: "35-44" },
                  { label: "45+", value: "45plus" },
                ]}/>
                <CustomSelect label="All Sexual Orientation *" icon={<svg className="icons timeIcon svg-icon"></svg>}
                  options={[
                    { label: "options 1", value: "options 2" },
                    { label: "options 2", value: "options 2" },
                ]}/>
                <CustomSelect label="All Ages" icon={<svg className="icons calendarClock svg-icon"></svg>}
                  options={[
                    { label: "options 1", value: "options 2" },
                    { label: "options 2", value: "options 2" },
                ]}/>
                <CustomSelect label="All Eye Colors" icon={<svg className="icons cameraEye svg-icon"></svg>}
                  options={[
                    { label: "options 1", value: "options 2" },
                    { label: "options 2", value: "options 2" },
                ]}/>
                <CustomSelect label="All Hair Colors" icon={<svg className="icons paintDrop svg-icon"></svg>}
                  options={[
                    { label: "options 1", value: "options 2" },
                    { label: "options 2", value: "options 2" },
                ]}/>
                <CustomSelect label="All Ethnicities" icon={<svg className="icons multiUser svg-icon"></svg>}
                  options={[
                    { label: "options 1", value: "options 2" },
                    { label: "options 2", value: "options 2" },
                ]}/>
                <CustomSelect label="All Heights" icon={<svg className="icons uploadDownload svg-icon"></svg>}
                  options={[
                    { label: "options 1", value: "options 2" },
                    { label: "options 2", value: "options 2" },
                ]}/>
                <CustomSelect label="All Styles" icon={<svg className="icons documentHeart svg-icon"></svg>}
                  options={[
                    { label: "options 1", value: "options 2" },
                    { label: "options 2", value: "options 2" },
                ]}/>
                <CustomSelect label="All Sizes" icon={<svg className="icons expanddiagonal svg-icon"></svg>}
                  options={[
                    { label: "options 1", value: "options 2" },
                    { label: "options 2", value: "options 2" },
                ]}/>
                <CustomSelect label="All Popularity" icon={<svg className="icons zigzagchart svg-icon"></svg>}
                  options={[
                    { label: "options 1", value: "options 2" },
                    { label: "options 2", value: "options 2" },
                ]}/>
                <CustomSelect label="All Popularity" icon={<svg className="icons zigzagchart svg-icon"></svg>}
                  options={[
                    { label: "options 1", value: "options 2" },
                    { label: "options 2", value: "options 2" },
                ]}/>
              </div>
              <div className="right_wrap">
                <div className="label-input one file-upload-wrapper">
                <div className="input-placeholder-icon">
                  <svg className="icons idshape size-45"></svg>
                  <div className="imgicons"><TbCamera size="16"/></div>
                </div>
                <p>Your government issued ID card, National ID card, Passport or Driving license *</p>
                <input type="file" className="real-file-input" accept="image/*,.pdf"/>
                </div>
                <div className="label-input one file-upload-wrapper">
                <div className="input-placeholder-icon">
                  <svg className="icons profilecards size-45"></svg>
                  <div className="imgicons"><TbCamera size="16"/></div>
                </div>
                <p>Your selfie with your ID and handwritten note *</p>
                <input type="file" className="real-file-input" accept="image/*,.pdf"/>
                </div>
              </div>
            </div>
            <button className="premium-btn"><span>Create your account</span></button>
            <p>By signing up you agree to our <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>, and confirm that you are at least 18 years old.</p>
            <p className="fs-18">Have an account already? <Link href="#">Log in here.</Link></p>
          </div>
          <h4 className="account_login">Are you a fan? <a href="/signup">Sign up here.</a></h4>
        </div>
      </div>
     </div>
    </div>
  )
}

export default CreatorSignupPage;