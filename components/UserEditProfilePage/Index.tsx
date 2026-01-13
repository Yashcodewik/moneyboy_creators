"use client";
import { useState } from "react";
import Featuredboys from "../Featuredboys";
import CustomSelect from "../CustomSelect";
import Link from "next/link";
import { TbCamera } from "react-icons/tb";
import { GoDotFill } from "react-icons/go";

const UserEditProfilePage = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [tab, setTab] = useState(0);

  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
        <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers">
          <div
            className="moneyboy-feed-page-cate-buttons card"
            id="posts-tabs-btn-card"
          >
            <button className="cate-back-btn active-down-effect">
              <span className="icons arrowLeft hwhite"></span>
            </button>
            <button
              className={`page-content-type-button active-down-effect ${
                tab === 0 ? "active" : ""
              }`}
              onClick={() => setTab(0)}
            >
              basic information
            </button>
            <button
              className={`page-content-type-button active-down-effect ${
                tab === 1 ? "active" : ""
              }`}
              onClick={() => setTab(1)}
            >
              Account and security
            </button>
          </div>
          <div className="creator-profile-page-container">
            <div className="creator-profile-front-content-container">
              {/* ========== basic information ========== */}
              {tab === 0 && (
                <>
                  <div className="creator-profile-card-container card">
                    <div className="creator-profile-banner">
                      <img
                        src="/images/profile-banners/profile-banner-10.png"
                        alt="Creator Profile Banner Image"
                      />
                      <div className="imgicons">
                        <TbCamera size="16" />
                      </div>
                    </div>
                    <div className="creator-profile-info-container">
                      <div className="profile-card">
                        <div className="profile-info-buttons">
                          <div className="profile-card__main">
                            <div className="profile-card__avatar-settings">
                              <div className="profile-card__avatar">
                                <img
                                  src="/images/profile-avatars/profile-avatar-13.jpg"
                                  alt="MoneyBoy Social Profile Avatar"
                                />
                                <div className="imgicons">
                                  <TbCamera size="16" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="creator-subscriptions-container">
                        <div className="form_grid">
                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <i className="icons user svg-icon"></i>
                            </div>
                            <input type="text" placeholder="First Name *" />
                          </div>
                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <i className="icons user svg-icon"></i>
                            </div>
                            <input type="text" placeholder="Last name *" />
                          </div>
                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <i className="icons user2 svg-icon"></i>
                            </div>
                            <input type="text" placeholder="Display name *" />
                          </div>
                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <i className="icons profile-check svg-icon"></i>
                            </div>
                            <input type="text" placeholder="User name *" />
                          </div>
                          <CustomSelect
                            label="Select Your Gender"
                            icon={<svg className="icons groupUser svg-icon" />}
                            options={[
                              { label: "Male", value: "Male" },
                              { label: "Female", value: "Female" },
                              { label: "Non-binary", value: "Non-binary" },
                            ]}
                          />
                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <i className="icons bookmarkIcon svg-icon"></i>
                            </div>
                            <input
                              type="text"
                              placeholder="Date of Birth (DD/MM/YYYY) *"
                            />
                          </div>
                          <CustomSelect
                            label="United States of America *"
                            icon={
                              <img
                                src="/images/united_flag.png"
                                className="svg-icon"
                              />
                            }
                            options={[
                              { label: "options 1", value: "options 2" },
                              { label: "options 2", value: "options 2" },
                            ]}
                          />
                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <svg className="icons locationIcon svg-icon"></svg>
                            </div>
                            <input type="text" placeholder="City *" />
                          </div>
                          <div className="label-input textarea one">
                            <div className="input-placeholder-icon">
                              <svg className="icons messageUser svg-icon"></svg>
                            </div>
                            <textarea rows={4} placeholder="Bio"></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btm_btn one">
                    <button className="premium-btn active-down-effect">
                      <span>Save changes</span>
                    </button>
                  </div>
                </>
              )}
              {/* ========== Account and security ========== */}
              {tab === 1 && (
                <div className="creator-profile-card-container">
                  <div className="card filters-card-wrapper">
                    <div className="creator-content-cards-wrapper mb-10 pricing_account_wrap">
                      <div className="form_grid">
                        <div className="label-input one">
                          <div className="input-placeholder-icon">
                            <i className="icons message svg-icon"></i>
                          </div>
                          <input
                            type="text"
                            placeholder="coreybergson@email.com"
                          />
                          <span className="righttext">Verified</span>
                        </div>
                        <div className="label-input password">
                          <div className="input-placeholder-icon">
                            <i className="icons lock svg-icon"></i>
                          </div>
                          <input
                            type={showPass ? "text" : "password"}
                            placeholder="Password *"
                          />
                          <span
                            onClick={() => setShowPass(!showPass)}
                            className="input-placeholder-icon eye-icon"
                          >
                            {showPass ? (
                              <i className="icons eye-slash svg-icon"></i>
                            ) : (
                              <i className="icons eye svg-icon"></i>
                            )}
                          </span>
                        </div>
                        <div className="label-input password">
                          <div className="input-placeholder-icon">
                            <i className="icons lock svg-icon"></i>
                          </div>
                          <input
                            type={showConfirmPass ? "text" : "password"}
                            placeholder="Confirm password*"
                          />
                          <span
                            onClick={() => setShowConfirmPass(!showConfirmPass)}
                            className="input-placeholder-icon eye-icon"
                          >
                            {showConfirmPass ? (
                              <i className="icons eye-slash svg-icon"></i>
                            ) : (
                              <i className="icons eye svg-icon"></i>
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="btm_btn">
                        <button className="premium-btn active-down-effect">
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </div>
                    <div className="creator-content-cards-wrapper mb-10 pricing_account_wrap">
                      <div className="deactivate_wrap">
                        <div className="">
                          <h5>Deactivate account</h5>
                          <p>
                            Hides the profile temporarily (Does not delete it)
                          </p>
                        </div>
                        <button className="btn-danger">
                          Deactivate account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Featuredboys />
    </div>
  );
};

export default UserEditProfilePage;
