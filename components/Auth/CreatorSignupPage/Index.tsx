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
            <img src="/images/logo.svg" className="logo_wrap" />
            <div className="moneyboy-post__container card">
              <h3 className="heading">Creator Sign Up</h3>
              <p className="mb-10">
                Sign up to make money and interact with your fans!
              </p>
              <div className="creator_maingrid">
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
                  <div className="label-input one">
                    <div className="input-placeholder-icon">
                      <i className="icons message svg-icon"></i>
                    </div>
                    <input type="text" placeholder="Email Address *" />
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
                      placeholder="Confirm password *"
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
                  <div className="label-input">
                    <div className="input-placeholder-icon">
                      <i className="icons groupUser svg-icon"></i>
                    </div>
                    <input type="text" placeholder="Male" />
                  </div>
                  <div className="label-input">
                    <div className="input-placeholder-icon">
                      <i className="icons bookmarkIcon svg-icon"></i>
                    </div>
                    <input
                      type="text"
                      placeholder="Date of Birth (DD/MM/YYYY) *"
                    />
                  </div>
                  <div
                    className="custom-select-element"
                    data-custom-select-element=""
                    data-custom-select-value=""
                  >
                    <div
                      className="custom-select-label-wrapper"
                      data-custom-select-triger=""
                    >
                      <div className="custom-select-icon-txt">
                        <img
                          src="/images/united_flag.png"
                          className="svg-icon"
                        />
                        <span className="custom-select-label-txt">
                          United States of America *
                        </span>
                      </div>
                      <div className="custom-select-chevron">
                        <svg className="icons chevronDown svg-icon"></svg>
                      </div>
                    </div>
                    <div
                      className="custom-select-options-dropdown-wrapper"
                      data-custom-select-dropdown=""
                    >
                      <div className="custom-select-options-dropdown-container">
                        <div
                          className="custom-select-options-search"
                          data-custom-select-options-search=""
                        >
                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <svg className="icons searchAdd svg-icon"></svg>
                            </div>
                            <input type="text" placeholder="Search here" />
                          </div>
                        </div>
                        <div className="custom-select-options-lists-container">
                          <ul
                            className="custom-select-options-list"
                            data-custom-select-options-list=""
                          >
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
                  <div
                    className="custom-select-element"
                    data-custom-select-element=""
                    data-custom-select-value=""
                  >
                    <div
                      className="custom-select-label-wrapper"
                      data-custom-select-triger=""
                    >
                      <div className="custom-select-icon-txt">
                        <div className="input-placeholder-icon">
                          <svg className="icons handbody svg-icon"></svg>
                        </div>
                        <span className="custom-select-label-txt">
                          All Body Types
                        </span>
                      </div>
                      <div className="custom-select-chevron">
                        <svg className="icons chevronDown svg-icon"></svg>
                      </div>
                    </div>
                    <div
                      className="custom-select-options-dropdown-wrapper"
                      data-custom-select-dropdown=""
                    >
                      <div className="custom-select-options-dropdown-container">
                        <div
                          className="custom-select-options-search"
                          data-custom-select-options-search=""
                        >
                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <svg
                                className="svg-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M14 5H20"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M14 8H17"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                            </div>
                            <input type="text" placeholder="Search here" />
                          </div>
                        </div>
                        <div className="custom-select-options-lists-container">
                          <ul
                            className="custom-select-options-list"
                            data-custom-select-options-list=""
                          >
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
                  <div className="label-input">
                    <div className="input-placeholder-icon">
                      <svg className="icons timeIcon svg-icon"></svg>
                    </div>
                    <input type="text" placeholder="All Sexual Orientation *" />
                  </div>

                  <div
                    className="custom-select-element"
                    data-custom-select-element=""
                    data-custom-select-value=""
                  >
                    <div
                      className="custom-select-label-wrapper"
                      data-custom-select-triger=""
                    >
                      <div className="custom-select-icon-txt">
                        <svg className="icons calendarClock svg-icon"></svg>
                        <span className="custom-select-label-txt">
                          All Ages
                        </span>
                      </div>
                      <div className="custom-select-chevron">
                        <svg className="icons chevronDown svg-icon"></svg>
                      </div>
                    </div>
                    <div
                      className="custom-select-options-dropdown-wrapper"
                      data-custom-select-dropdown=""
                    >
                      <div className="custom-select-options-dropdown-container">
                        <div
                          className="custom-select-options-search"
                          data-custom-select-options-search=""
                        >
                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <svg
                                className="svg-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M14 5H20"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M14 8H17"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                            </div>
                            <input type="text" placeholder="Search here" />
                          </div>
                        </div>
                        <div className="custom-select-options-lists-container">
                          <ul
                            className="custom-select-options-list"
                            data-custom-select-options-list=""
                          >
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
                  <div className="label-input">
                    <div className="input-placeholder-icon">
                      <svg className="icons timeIcon svg-icon"></svg>
                    </div>
                    <input type="text" placeholder="All Sexual Orientation *" />
                  </div>
                  <CustomSelect
                    label="All Ages"
                    icon={<svg className="icons calendarClock svg-icon"></svg>}
                    options={[
                      { label: "18", value: "18" },
                      { label: "25", value: "25" },
                    ]}
                  />

                  <div
                    className="custom-select-element"
                    data-custom-select-element=""
                    data-custom-select-value=""
                  >
                    <div
                      className="custom-select-label-wrapper"
                      data-custom-select-triger=""
                    >
                      <div className="custom-select-icon-txt">
                        <svg className="icons cameraEye svg-icon"></svg>
                        <span className="custom-select-label-txt">
                          All Eye Colors
                        </span>
                      </div>
                      <div className="custom-select-chevron">
                        <svg className="icons chevronDown svg-icon"></svg>
                      </div>
                    </div>
                    <div
                      className="custom-select-options-dropdown-wrapper"
                      data-custom-select-dropdown=""
                    >
                      <div className="custom-select-options-dropdown-container">
                        <div
                          className="custom-select-options-search"
                          data-custom-select-options-search=""
                        >
                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <svg
                                className="svg-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M14 5H20"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M14 8H17"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                            </div>
                            <input type="text" placeholder="Search here" />
                          </div>
                        </div>
                        <div className="custom-select-options-lists-container">
                          <ul
                            className="custom-select-options-list"
                            data-custom-select-options-list=""
                          >
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
                  <div
                    className="custom-select-element"
                    data-custom-select-element=""
                    data-custom-select-value=""
                  >
                    <div
                      className="custom-select-label-wrapper"
                      data-custom-select-triger=""
                    >
                      <div className="custom-select-icon-txt">
                        <svg className="icons paintDrop svg-icon"></svg>
                        <span className="custom-select-label-txt">
                          All Hair Colors
                        </span>
                      </div>
                      <div className="custom-select-chevron">
                        <svg className="icons chevronDown svg-icon"></svg>
                      </div>
                    </div>
                    <div
                      className="custom-select-options-dropdown-wrapper"
                      data-custom-select-dropdown=""
                    >
                      <div className="custom-select-options-dropdown-container">
                        <div
                          className="custom-select-options-search"
                          data-custom-select-options-search=""
                        >
                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <svg
                                className="svg-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M14 5H20"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M14 8H17"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                            </div>
                            <input type="text" placeholder="Search here" />
                          </div>
                        </div>
                        <div className="custom-select-options-lists-container">
                          <ul
                            className="custom-select-options-list"
                            data-custom-select-options-list=""
                          >
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
                  <div
                    className="custom-select-element"
                    data-custom-select-element=""
                    data-custom-select-value=""
                  >
                    <div
                      className="custom-select-label-wrapper"
                      data-custom-select-triger=""
                    >
                      <div className="custom-select-icon-txt">
                        <svg className="icons multiUser svg-icon"></svg>
                        <span className="custom-select-label-txt">
                          All Ethnicities
                        </span>
                      </div>
                      <div className="custom-select-chevron">
                        <svg className="icons chevronDown svg-icon"></svg>
                      </div>
                    </div>
                    <div
                      className="custom-select-options-dropdown-wrapper"
                      data-custom-select-dropdown=""
                    >
                      <div className="custom-select-options-dropdown-container">
                        <div
                          className="custom-select-options-search"
                          data-custom-select-options-search=""
                        >
                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <svg
                                className="svg-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M14 5H20"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M14 8H17"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                            </div>
                            <input type="text" placeholder="Search here" />
                          </div>
                        </div>
                        <div className="custom-select-options-lists-container">
                          <ul
                            className="custom-select-options-list"
                            data-custom-select-options-list=""
                          >
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
                  <div
                    className="custom-select-element"
                    data-custom-select-element=""
                    data-custom-select-value=""
                  >
                    <div
                      className="custom-select-label-wrapper"
                      data-custom-select-triger=""
                    >
                      <div className="custom-select-icon-txt">
                        <svg className="icons uploadDownload svg-icon"></svg>
                        <span className="custom-select-label-txt">
                          All Heights
                        </span>
                      </div>
                      <div className="custom-select-chevron">
                        <svg className="icons chevronDown svg-icon"></svg>
                      </div>
                    </div>
                    <div
                      className="custom-select-options-dropdown-wrapper"
                      data-custom-select-dropdown=""
                    >
                      <div className="custom-select-options-dropdown-container">
                        <div
                          className="custom-select-options-search"
                          data-custom-select-options-search=""
                        >
                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <svg
                                className="svg-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M14 5H20"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M14 8H17"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                            </div>
                            <input type="text" placeholder="Search here" />
                          </div>
                        </div>
                        <div className="custom-select-options-lists-container">
                          <ul
                            className="custom-select-options-list"
                            data-custom-select-options-list=""
                          >
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
                  <div
                    className="custom-select-element"
                    data-custom-select-element=""
                    data-custom-select-value=""
                  >
                    <div
                      className="custom-select-label-wrapper"
                      data-custom-select-triger=""
                    >
                      <div className="custom-select-icon-txt">
                        <svg className="icons documentHeart svg-icon"></svg>
                        <span className="custom-select-label-txt">
                          All Styles
                        </span>
                      </div>
                      <div className="custom-select-chevron">
                        <svg className="icons chevronDown svg-icon"></svg>
                      </div>
                    </div>
                    <div
                      className="custom-select-options-dropdown-wrapper"
                      data-custom-select-dropdown=""
                    >
                      <div className="custom-select-options-dropdown-container">
                        <div
                          className="custom-select-options-search"
                          data-custom-select-options-search=""
                        >
                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <svg
                                className="svg-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M14 5H20"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M14 8H17"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                            </div>
                            <input type="text" placeholder="Search here" />
                          </div>
                        </div>
                        <div className="custom-select-options-lists-container">
                          <ul
                            className="custom-select-options-list"
                            data-custom-select-options-list=""
                          >
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
                  <div
                    className="custom-select-element"
                    data-custom-select-element=""
                    data-custom-select-value=""
                  >
                    <div
                      className="custom-select-label-wrapper"
                      data-custom-select-triger=""
                    >
                      <div className="custom-select-icon-txt">
                        <svg className="icons expanddiagonal svg-icon"></svg>
                        <span className="custom-select-label-txt">
                          All Sizes
                        </span>
                      </div>
                      <div className="custom-select-chevron">
                        <svg className="icons chevronDown svg-icon"></svg>
                      </div>
                    </div>
                    <div
                      className="custom-select-options-dropdown-wrapper"
                      data-custom-select-dropdown=""
                    >
                      <div className="custom-select-options-dropdown-container">
                        <div
                          className="custom-select-options-search"
                          data-custom-select-options-search=""
                        >
                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <svg
                                className="svg-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M14 5H20"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M14 8H17"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                            </div>
                            <input type="text" placeholder="Search here" />
                          </div>
                        </div>
                        <div className="custom-select-options-lists-container">
                          <ul
                            className="custom-select-options-list"
                            data-custom-select-options-list=""
                          >
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
                  <div
                    className="custom-select-element"
                    data-custom-select-element=""
                    data-custom-select-value=""
                  >
                    <div
                      className="custom-select-label-wrapper"
                      data-custom-select-triger=""
                    >
                      <div className="custom-select-icon-txt">
                        <svg className="icons zigzagchart svg-icon"></svg>
                        <span className="custom-select-label-txt">
                          All Popularity
                        </span>
                      </div>
                      <div className="custom-select-chevron">
                        <svg className="icons chevronDown svg-icon"></svg>
                      </div>
                    </div>
                    <div
                      className="custom-select-options-dropdown-wrapper"
                      data-custom-select-dropdown=""
                    >
                      <div className="custom-select-options-dropdown-container">
                        <div
                          className="custom-select-options-search"
                          data-custom-select-options-search=""
                        >
                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <svg
                                className="svg-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M14 5H20"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M14 8H17"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                            </div>
                            <input type="text" placeholder="Search here" />
                          </div>
                        </div>
                        <div className="custom-select-options-lists-container">
                          <ul
                            className="custom-select-options-list"
                            data-custom-select-options-list=""
                          >
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
                </div>
                <div className="right_wrap">
                  <div className="label-input one file-upload-wrapper">
                    <div className="input-placeholder-icon">
                      <svg className="icons idshape size-45"></svg>
                      <div className="imgicons">
                        <TbCamera size="16" />
                      </div>
                    </div>
                    <p>
                      Your government issued ID card, National ID card, Passport
                      or Driving license *
                    </p>
                    <input
                      type="file"
                      className="real-file-input"
                      accept="image/*,.pdf"
                    />
                  </div>
                  <div className="label-input one file-upload-wrapper">
                    <div className="input-placeholder-icon">
                      <svg className="icons profilecards size-45"></svg>
                      <div className="imgicons">
                        <TbCamera size="16" />
                      </div>
                    </div>
                    <p>Your selfie with your ID and handwritten note *</p>
                    <input
                      type="file"
                      className="real-file-input"
                      accept="image/*,.pdf"
                    />
                  </div>
                </div>
              </div>
              <button className="premium-btn">
                <span>Create your account</span>
              </button>
              <p>
                By signing up you agree to our{" "}
                <Link href="#">Terms of Service</Link> and{" "}
                <Link href="#">Privacy Policy</Link>, and confirm that you are
                at least 18 years old.
              </p>
              <p className="fs-18 login_with">
                Have an account already? <Link href="#">Log in here.</Link>
              </p>
            </div>
            <h4 className="account_login">
              Are you a fan? <a href="/signup">Sign up here.</a>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorSignupPage;
