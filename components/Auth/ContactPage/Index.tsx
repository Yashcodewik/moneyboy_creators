"use client";
import { useState } from "react";
import Link from "next/link";
import { TbCamera } from "react-icons/tb";

const ContactPage = () => {
  
  return (
    <div className="container login_wrap">
      <div className="img_wrap">
        <img src="/images/loginflowimg.png" className="login_imgwrap"/>
      </div>
      <div className="moneyboy-feed-page-container cont_wrap">
        <div className="main_cont">
          <img src="/images/logo.svg" className="logo_wrap"/>
          <div className="moneyboy-post__container card">
            <h3 className="heading">Contact Us</h3>
            <p> <b>MoneyBoy.com</b> is operated by DNA Global Media B.V. (KvK No. 97379654). Use the form below to contact our team for support, billing, or legal inquiries. We’ll respond within 24–48 hours.</p>
            <div className="form_grid">
              <div className="label-input one">
                <div className="input-placeholder-icon"><i className="icons user svg-icon"></i></div>
                <input type="text" placeholder="First Name *"/>
              </div>
              <div className="label-input one">
                <div className="input-placeholder-icon"><i className="icons message svg-icon"></i></div>
                <input type="text" placeholder="Email Address *"/>
              </div>
              <div className="custom-select-element one" data-custom-select-element="" data-custom-select-value="">
                <div className="custom-select-label-wrapper" data-custom-select-triger="">
                  <div className="custom-select-icon-txt">                   
                    <i className="icons lockBox svg-icon"></i>
                    <span className="custom-select-label-txt">Subject *</span>
                  </div>
                  <div className="custom-select-chevron">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                      <path d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95" stroke="none" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </div>
                </div>
                <div className="custom-select-options-dropdown-wrapper" data-custom-select-dropdown="">
                  <div className="custom-select-options-dropdown-container">
                    <div className="custom-select-options-search" data-custom-select-options-search="">
                      <div className="label-input">
                        <div className="input-placeholder-icon">
                          <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                            <path d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                            <path d="M14 5H20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M14 8H17" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                        </div>
                        <input type="text" placeholder="Search here"/>
                      </div>
                    </div>
                    <div className="custom-select-options-lists-container">
                      <ul className="custom-select-options-list" data-custom-select-options-list="">
                        <li className="custom-select-option">
                          <span>Option 1</span>
                        </li>
                        <li className="custom-select-option">
                          <span>Option 2</span>
                        </li>
                        <li className="custom-select-option">
                          <span>Option 3</span>
                        </li>
                        <li className="custom-select-option">
                          <span>Option 4</span>
                        </li>
                        <li className="custom-select-option">
                          <span>Option 5</span>
                        </li>
                        <li className="custom-select-option">
                          <span>Option 6</span>
                        </li>
                        <li className="custom-select-option">
                          <span>Option 7</span>
                        </li>
                        <li className="custom-select-option">
                          <span>Option 8</span>
                        </li>
                        <li className="custom-select-option">
                          <span>Option 9</span>
                        </li>
                        <li className="custom-select-option">
                          <span>Option 10</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="label-input one file-upload-wrapper">
                <div className="input-placeholder-icon">
                  <i className="icons idshape size-45"></i>
                  <div className="imgicons"><TbCamera size="16"/></div>
                </div>
                <p>Your government issued ID card (Optional)</p>
                <input type="file" className="real-file-input" accept="image/*,.pdf"/>
              </div>
              <div className="label-input textarea one">
                <div className="input-placeholder-icon"><i className="icons documentIcon svg-icon"></i></div>
                <textarea rows={2} placeholder="Message *"></textarea>
              </div>
            </div>
            <button className="premium-btn"><span>Send</span></button>
            <p>Official contact: <Link href="#">support@moneyboy.com</Link></p>
            <p className="fs-18">Please don’t send sensitive data or personal content through this form.</p>
          </div>
          <h4 className="account_login">Are you a creator? <a href="/signup">Sign up here.</a></h4>
        </div>
      </div>
    </div>
  )
}

export default ContactPage;