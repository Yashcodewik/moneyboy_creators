"use client";
import { useState } from "react";
import Link from "next/link";
import { TbCamera } from "react-icons/tb";
import CustomSelect from "@/components/CustomSelect";
import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

const ContactPage = () => {
  const router=useRouter()
  
  return (
    <div className="container login_wrap">
      <div className="img_wrap">
        <img src="/images/loginflowimg.png" className="login_imgwrap"/>
        <div className="backicons">
          <button className="btn-txt-gradient btn-outline" onClick={() => router.push('/feed')}><IoArrowBackOutline className="icons"/></button>
        </div>
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
              <div className="one">
                <CustomSelect
                  label="Subject *"
                  icon={<svg className="icons lockBox svg-icon" />}
                  options={[
                    { label: "Subject 01", value: "Subject 01" },
                    { label: "Subject 02", value: "Subject 02" },
                    { label: "Subject 03", value: "Subject 03" },
                  ]}/>
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
          <h4 className="account_login">Are you a creator? <Link href="/signup">Sign up here.</Link></h4>
          <h4 className="account_login"><Link href="#">Help & Support</Link></h4>
        </div>
      </div>
    </div>
  )
}

export default ContactPage;