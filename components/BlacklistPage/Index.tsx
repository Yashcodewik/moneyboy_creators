"use client";
import { useState } from "react";
import Featuredboys from '../Featuredboys';
import CustomSelect from '../CustomSelect';
import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { useRouter } from "next/navigation";

const BlacklistPage = () => {
  const router = useRouter();
  return (
    <>
      <div className="moneyboy-2x-1x-layout-container">
        <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
          <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers" data-scroll-zero data-multiple-tabs-section data-identifier="1">
            <div className="moneyboy-feed-page-cate-buttons card" id="posts-tabs-btn-card">
              <button className="cate-back-btn active-down-effect"  onClick={() => router.push("/feed")}><span className="icons arrowLeft hwhite"></span></button>
              <button className="page-content-type-button active-down-effect active max-w-50">Blacklist</button>
            </div>
            <div className="tabs-content-wrapper-layout">
              <div data-multi-dem-cards-layout>
                <div className="creator-content-filter-grid-container">
                  <div className="card filters-card-wrapper">
                    <Link href="#" className="btn-txt-gradient btn-outline link-gradint rounded"><span>Want to block someone, click here !</span></Link>
                    <div className="creator-content-cards-wrapper wtransactions_containt">
                      <div className="rel-users-wrapper">
                        <div className="rel-user-box blacklist_box">
                          <div className="rel-user-profile-action">
                            <div className="rel-user-profile">
                              <div className="profile-card">
                                <Link href="#" className="profile-card__main">
                                  <div className="profile-card__avatar-settings">
                                    <div className="profile-card__avatar">
                                      <img src="/images/profile-avatars/profile-avatar-6.jpg" alt="User profile avatar" />
                                    </div>
                                  </div>
                                  <div className="profile-card__info">
                                    <div className="profile-card__name-badge">
                                      <div className="profile-card__name">Zain Schleifer</div>
                                      <div className="profile-card__badge"><img src="/images/logo/profile-badge.png" alt="Verified badge" /></div>
                                    </div>
                                    <div className="profile-card__username">@zainschleifer</div>
                                  </div>
                                </Link>
                              </div>
                            </div>
                            <div className="date_box">
                              <div className="date_wrap">
                                <svg className="icons calendarNote"/>
                                <div className="containt">
                                  <span>Date</span>
                                  <p>30/09/2025</p>
                                  <p>19:06:28</p>
                                </div>
                              </div>
                            </div>
                            <div className="rel-user-actions">
                              <button className="btn-txt-gradient btn-outline" type="button"><span>View</span> </button>
                            </div>
                          </div>
                          <div className="rel-user-desc">
                            <div className="">
                              <p className="heading">Reason</p>
                              <p>A jazzy lofi/neo soul-esque guitar part as shown in my video.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Featuredboys />
      </div>
      {/* ========== Blacklist User Modal Start ========== */}
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="age-modal-title">
        <div className="modal-wrap blacklist">
          <button className="close-btn"><CgClose size={22}/></button>
          <h3>Blacklist user</h3>
          <div className="containt_wrap">
            <div className="">
              <label>Please enter the username you want to block</label>
              <CustomSelect label="Select Status" searchable={false}
                options={[
                  { label: "Block", value: "block01" },
                  { label: "Unblock", value: "block02" },
                ]}/>
            </div>
            <div className="">
              <label>Reason *</label>
              <textarea rows={2} name="reason" placeholder="Enter your reason" />
            </div>
          </div>
          <div className="actions">
            <button className="premium-btn"><span>Submit</span></button>
            <button className="cate-back-btn active-down-effect">Close</button>
          </div>
        </div>
      </div> 
    </>
  )
}

export default BlacklistPage;
