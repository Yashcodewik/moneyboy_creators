"use client";
import { useRouter } from "next/navigation";
import Footer from "../Layouts/Footer";
import { IoArrowBackOutline } from "react-icons/io5";

const WaitingPage = () => {
  const router = useRouter();
  return (
    <>
      <div className="container login_wrap waiting_wrap">
        <div className="backicons"><button className="btn-txt-gradient btn-outline" onClick={() => router.push("/feed")}><IoArrowBackOutline className="icons" /></button></div>
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