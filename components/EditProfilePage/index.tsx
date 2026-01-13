"use client";
import { useState } from "react";
import CustomSelect from "../CustomSelect";
import { TbCamera } from "react-icons/tb";
import { GoDotFill } from "react-icons/go";

const EditProfilePage = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [tab, setTab] = useState(0);
  return (
    <>
      <div className="moneyboy-2x-1x-layout-container">
        <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
          <div
            className="moneyboy-feed-page-container moneyboy-diff-content-wrappers"
            data-scroll-zero
            data-multiple-tabs-section
            data-identifier="1"
          >
            <div
              className="moneyboy-feed-page-cate-buttons card show_mobail"
              id="posts-tabs-btn-card"
            >
              <button className="cate-back-btn active-down-effect">
                <span className="icons arrowLeft"></span>
              </button>
              <button className="page-content-type-button active">
                Edit Profile
              </button>
            </div>
            <div
              className="moneyboy-feed-page-cate-buttons card"
              id="posts-tabs-btn-card"
            >
              {/* <button className="cate-back-btn active-down-effect hide_mobail">
                <span className="icons arrowLeft"></span>
              </button> */}
              <button
                className={`page-content-type-button active-down-effect ${
                  tab === 0 ? "active" : ""
                }`}
                onClick={() => setTab(0)}
              >
                Basic information
              </button>
              <button
                className={`page-content-type-button active-down-effect ${
                  tab === 1 ? "active" : ""
                }`}
                onClick={() => setTab(1)}
              >
                Pricing settings
              </button>
              <button
                className={`page-content-type-button active-down-effect ${
                  tab === 2 ? "active" : ""
                }`}
                onClick={() => setTab(2)}
              >
                Account and security
              </button>
            </div>

            <div className="creator-profile-page-container">
              <div className="creator-profile-front-content-container">
                {/* ========== Basic information ========== */}
                {tab === 0 && (
                  <div className="creator-profile-card-container card">
                    <div className="creator-profile-banner">
                      <img
                        src="/images/profile-banners/profile-banner-2.jpg"
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
                                  src="/images/profile-avatars/profile-avatar-1.png"
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
                          <CustomSelect
                            label="All Body Types"
                            icon={<svg className="icons handbody svg-icon" />}
                            options={[
                              { label: "All Body Types", value: "all" },
                              { label: "18-24", value: "18-24" },
                              { label: "25-34", value: "25-34" },
                              { label: "35-44", value: "35-44" },
                              { label: "45+", value: "45plus" },
                            ]}
                          />
                          <CustomSelect
                            label="All Sexual Orientation *"
                            icon={
                              <svg className="icons timeIcon svg-icon"></svg>
                            }
                            options={[
                              { label: "options 1", value: "options 2" },
                              { label: "options 2", value: "options 2" },
                            ]}
                          />
                          <CustomSelect
                            label="All Ages"
                            icon={
                              <svg className="icons calendarClock svg-icon"></svg>
                            }
                            options={[
                              { label: "options 1", value: "options 2" },
                              { label: "options 2", value: "options 2" },
                            ]}
                          />
                          <CustomSelect
                            label="All Eye Colors"
                            icon={
                              <svg className="icons cameraEye svg-icon"></svg>
                            }
                            options={[
                              { label: "options 1", value: "options 2" },
                              { label: "options 2", value: "options 2" },
                            ]}
                          />
                          <CustomSelect
                            label="All Hair Colors"
                            icon={
                              <svg className="icons paintDrop svg-icon"></svg>
                            }
                            options={[
                              { label: "options 1", value: "options 2" },
                              { label: "options 2", value: "options 2" },
                            ]}
                          />
                          <CustomSelect
                            label="All Ethnicities"
                            icon={
                              <svg className="icons multiUser svg-icon"></svg>
                            }
                            options={[
                              { label: "options 1", value: "options 2" },
                              { label: "options 2", value: "options 2" },
                            ]}
                          />
                          <CustomSelect
                            label="All Heights"
                            icon={
                              <svg className="icons uploadDownload svg-icon"></svg>
                            }
                            options={[
                              { label: "options 1", value: "options 2" },
                              { label: "options 2", value: "options 2" },
                            ]}
                          />
                          <CustomSelect
                            label="All Styles"
                            icon={
                              <svg className="icons documentHeart svg-icon"></svg>
                            }
                            options={[
                              { label: "options 1", value: "options 2" },
                              { label: "options 2", value: "options 2" },
                            ]}
                          />
                          <CustomSelect
                            label="All Sizes"
                            icon={
                              <svg className="icons expanddiagonal svg-icon"></svg>
                            }
                            options={[
                              { label: "options 1", value: "options 2" },
                              { label: "options 2", value: "options 2" },
                            ]}
                          />
                          <CustomSelect
                            label="All Popularity"
                            icon={
                              <svg className="icons zigzagchart svg-icon"></svg>
                            }
                            options={[
                              { label: "options 1", value: "options 2" },
                              { label: "options 2", value: "options 2" },
                            ]}
                          />
                          <div className="btm_btn one">
                            <button className="premium-btn active-down-effect">
                              <span>Update Profile</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* ========== Pricing settings ========== */}
                {tab === 1 && (
                  <div className="creator-profile-card-container">
                    <div className="card filters-card-wrapper">
                      <div className="creator-content-cards-wrapper pricing_account_wrap">
                        <div className="subtop_cont">
                          <h3>Subscription</h3>
                          <button className="btn-primary">
                            <GoDotFill size={20} />{" "}
                            <span>Paid Subscriptions</span>
                          </button>
                        </div>
                        <div className="accordion">
                          <div className="accordion_head">
                            <div className="head_cont">
                              <span>
                                Monthly Subscription Price
                                <span className="star">*</span>
                              </span>
                              <p>9.99</p>
                            </div>
                            <svg className="icons chevronDownRounded" />
                          </div>
                          <div className="accordion_body">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </div>
                        </div>
                        <p className="worn_text">
                          User can <b>9 Days</b> of free subscription before
                          subscribe to a subscription.
                        </p>
                        <div className="accordion">
                          <div className="accordion_head">
                            <div className="head_cont">
                              <span>
                                Yearly Subscription Price
                                <span className="star">*</span>
                              </span>
                              <p>9.99</p>
                            </div>
                            <svg className="icons chevronDownRounded" />
                          </div>
                          <div className="accordion_body">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </div>
                        </div>
                        <div className="accordion">
                          <div className="accordion_head">
                            <div className="head_cont">
                              <span>
                                PPV Request - Custom video
                                <span className="star">*</span>
                              </span>
                              <p>9.99</p>
                            </div>
                            <svg className="icons chevronDownRounded" />
                          </div>
                          <div className="accordion_body">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </div>
                        </div>
                        <div className="accordion">
                          <div className="accordion_head">
                            <div className="head_cont">
                              <span>
                                PPV Request - Custom Photo
                                <span className="star">*</span>
                              </span>
                              <p>9.99</p>
                            </div>
                            <svg className="icons chevronDownRounded" />
                          </div>
                          <div className="accordion_body">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </div>
                        </div>
                        <div className="btm_btn">
                          <button className="premium-btn active-down-effect">
                            <span>Save Changes</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* ========== Account and security ========== */}
                {tab === 2 && (
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
                              onClick={() =>
                                setShowConfirmPass(!showConfirmPass)
                              }
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
                      <div className="creator-content-cards-wrapper pricing_account_wrap select">
                        <div className="select_countries_wrap">
                          <h5>Block Countries</h5>
                          <p>Select countries you want to block</p>
                          <div className="form_grid">
                            <div className="one">
                              <CustomSelect
                                label="Select"
                                options={[
                                  { label: "options 1", value: "options 2" },
                                  { label: "options 2", value: "options 2" },
                                ]}
                              />
                            </div>
                          </div>
                          <div className="btm_btn">
                            <button className="premium-btn active-down-effect">
                              <span>Save Changes</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfilePage;
