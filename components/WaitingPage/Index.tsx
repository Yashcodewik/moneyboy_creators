"use client";
import { useState } from "react";
import Footer from "../Layouts/Footer";

const WaitingPage = () => {
  return (
    <>
      <div className="container login_wrap waiting_wrap">
        <div className="moneyboy-feed-page-container cont_wrap">
          <div className="main_cont">
            <img src="/images/logo.svg" className="logo_wrap" />
            <img src="/images/waiting.gif" className="Waitinggif" />
            <h3>Please Waiting !!!</h3>
            <p>Until Admin Approve Your Profile</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default WaitingPage;