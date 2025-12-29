"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";

const BenefitsPage = () => {
  const [activeTab, setActiveTab] = useState("fan");
  const router=useRouter()
  return (
    <div className="container login_wrap">
      <div className="img_wrap">
        <img src="/images/loginflowimg.png" className="login_imgwrap" />
        <div className="backicons">
          <button className="btn-txt-gradient btn-outline" onClick={() => router.push('/feed')}><IoArrowBackOutline className="icons"/></button>
        </div>
      </div>
      <div className="moneyboy-feed-page-container cont_wrap justify-center">
        <div className="main_cont">
          <img src="/images/logo.svg" className="logo_wrap" />
          <div
            className="moneyboy-feed-page-cate-buttons card"
            id="posts-tabs-btn-card"
          >
            <button
              className={`page-content-type-button active-down-effect ${
                activeTab === "fan" ? "active" : ""
              }`}
              onClick={() => setActiveTab("fan")}
            >
              Fan Signup
            </button>
            <button
              className={`page-content-type-button active-down-effect ${
                activeTab === "creator" ? "active" : ""
              }`}
              onClick={() => setActiveTab("creator")}
            >
              Creator Signup
            </button>
          </div>
          <div className="moneyboy-post__container card">
            {activeTab === "fan" && (
              <>
                <h3 className="heading">Fan Benefits</h3>
                <ul className="benefitspoint">
                  <li>
                    Discover free and exclusive content from verified creators
                  </li>
                  <li>
                    Subscribe monthly or yearly to your favorite MoneyBoys
                  </li>
                  <li>
                    Unlock paid posts and videos instantly (PPV – Pay Per View)
                  </li>
                  <li>Request custom content directly from creators</li>
                  <li>Chat privately and interact with your favorites</li>
                  <li>Save and organize your favorite videos for later</li>
                  <li>Enjoy smooth HD streaming and fast playback</li>
                  <li>Access creators’ personal shops for special offers</li>
                  <li>Explore public profiles and trending content</li>
                </ul>
                <Link href="/signup">
                  <button className="premium-btn">
                    <span>Fan Signup</span>
                  </button>
                </Link>
              </>
            )}
            {activeTab === "creator" && (
              <>
                <h3 className="heading">Creator Benefits</h3>
                <ul className="benefitspoint">
                  <li>Upload photos, videos, and stories instantly</li>
                  <li>
                    Earn from subscriptions, tips, and Pay-Per-View content
                  </li>
                  <li>Receive custom content requests directly from fans</li>
                  <li>Keep 80% of everything you earn — no hidden fees</li>
                  <li>
                    Access your wallet and analytics dashboard in real time
                  </li>
                  <li>Chat privately and build loyal fan relationships</li>
                  <li>
                    Promote your free feed publicly and gain more followers
                  </li>
                  <li>
                    Sell exclusive content and bundles in your personal store
                  </li>
                  <li>Collaborate with other verified creators</li>
                  <li>
                    Full ownership of your content and total payout transparency
                  </li>
                </ul>
                <Link href="/creator">
                  <button className="premium-btn">
                    <span>Creator Signup</span>
                  </button>
                </Link>
              </>
            )}
          </div>
          <h4 className="account_login">Have an account already? <Link href="/login">Login here</Link></h4>
        </div>
      </div>
    </div>
  );
};

export default BenefitsPage;
