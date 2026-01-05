"use client";
import React, { useState } from "react";
import SideBar from "./SideBar";

const MessagePage = () => {
  const [activeChat, setActiveChat] = useState<string | null>("james");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const toggleMenu = (id: number) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };
  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="moneyboy-2x-1x-a-layout">
        <div className="msg-page-wrapper card">
          <div className="msg-page-container" msg-page-wrapper={true}>
            <SideBar />

            <div className="msg-chats-layout">
              <div className="msg-chats-rooms-container" msg-chat-rooms-wrapper>
                {activeChat === "james" && (
                  <div className="msg-chat-room-layout" msg-chat-room>
                    <div className="msg-chat-room-container">
                      <div className="chat-room-header-layout">
                        <div className="chat-room-header-container">
                          <div className="chat-room-header-profile">
                            <div className="profile-card">
                              <a href="#" className="profile-card__main">
                                <div className="profile-card__avatar-settings">
                                  <div className="profile-card__avatar">
                                    <img
                                      src="/images/profile-avatars/profile-avatar-6.jpg"
                                      alt="MoneyBoy Social Profile Avatar"
                                    />
                                  </div>
                                </div>
                                <div className="profile-card__info">
                                  <div className="profile-card__name-badge">
                                    <div className="profile-card__name">
                                      James Baptista
                                    </div>
                                    <div className="profile-card__badge">
                                      <img
                                        src="/images/logo/profile-badge.png"
                                        alt="MoneyBoy Social Profile Badge"
                                      />
                                    </div>
                                  </div>
                                  <div className="profile-card__username">
                                    @jamesbaptista
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>

                          <div className="chat-room-header-btns">
                            <a href="#" className="btn-txt-gradient">
                              <span>View Profile</span>
                            </a>

                            <div
                              className="rel-user-more-opts-wrapper"
                              data-more-actions-toggle-element
                            >
                              <button
                                className="rel-user-more-opts-trigger-icon"
                                onClick={() => toggleMenu(1)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="25"
                                  viewBox="0 0 24 25"
                                  fill="none"
                                >
                                  <path
                                    d="M5 10.5C3.9 10.5 3 11.4 3 12.5C3 13.6 3.9 14.5 5 14.5C6.1 14.5 7 13.6 7 12.5C7 11.4 6.1 10.5 5 10.5Z"
                                    stroke="none"
                                    stroke-width="1.5"
                                  ></path>
                                  <path
                                    d="M19 10.5C17.9 10.5 17 11.4 17 12.5C17 13.6 17.9 14.5 19 14.5C20.1 14.5 21 13.6 21 12.5C21 11.4 20.1 10.5 19 10.5Z"
                                    stroke="none"
                                    stroke-width="1.5"
                                  ></path>
                                  <path
                                    d="M12 10.5C10.9 10.5 10 11.4 10 12.5C10 13.6 10.9 14.5 12 14.5C13.1 14.5 14 13.6 14 12.5C14 11.4 13.1 10.5 12 10.5Z"
                                    stroke="none"
                                    stroke-width="1.5"
                                  ></path>
                                </svg>
                              </button>
                              {openMenuId === 1 && (
                                <div className="rel-users-more-opts-popup-wrapper">
                                  <div className="rel-users-more-opts-popup-container">
                                    <ul>
                                      <li className="chat-msg-search">
                                        <div>
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
                                            {/* <label for="header-search-input">Search here</label> */}
                                            <input
                                              type="text"
                                              placeholder="Search Message"
                                            />
                                          </div>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="icon mute-icon">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                          >
                                            <path
                                              d="M15 8.36997V7.40997C15 4.42997 12.93 3.28997 10.41 4.86997L7.49 6.69997C7.17 6.88997 6.8 6.99997 6.43 6.99997H5C3 6.99997 2 7.99997 2 9.99997V14C2 16 3 17 5 17H7"
                                              stroke="none"
                                              stroke-width="1.5"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                            <path
                                              d="M10.4102 19.13C12.9302 20.71 15.0002 19.56 15.0002 16.59V12.95"
                                              stroke="none"
                                              stroke-width="1.5"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                            <path
                                              d="M18.81 9.41998C19.71 11.57 19.44 14.08 18 16"
                                              stroke="none"
                                              stroke-width="1.5"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                            <path
                                              d="M21.1481 7.79999C22.6181 11.29 22.1781 15.37 19.8281 18.5"
                                              stroke="none"
                                              stroke-width="1.5"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                            <path
                                              d="M22 2L2 22"
                                              stroke="none"
                                              stroke-width="1.5"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                          </svg>
                                        </div>
                                        <span>Mute Conversation</span>
                                      </li>
                                      <li>
                                        <div className="icon hide-icon">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                          >
                                            <g>
                                              <path
                                                d="M17.8201 5.77047C16.0701 4.45047 14.0701 3.73047 12.0001 3.73047C8.47009 3.73047 5.18009 5.81047 2.89009 9.41047C1.99009 10.8205 1.99009 13.1905 2.89009 14.6005C3.68009 15.8405 4.60009 16.9105 5.60009 17.7705"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              />
                                              <path
                                                d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              />
                                              <path
                                                d="M8.41992 19.5297C9.55992 20.0097 10.7699 20.2697 11.9999 20.2697C15.5299 20.2697 18.8199 18.1897 21.1099 14.5897C22.0099 13.1797 22.0099 10.8097 21.1099 9.39969C20.7799 8.87969 20.4199 8.38969 20.0499 7.92969"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              />
                                              <path
                                                d="M15.5099 12.6992C15.2499 14.1092 14.0999 15.2592 12.6899 15.5192"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              />
                                              <path
                                                d="M9.47 14.5293L2 21.9993"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              />
                                              <path
                                                d="M22 2L14.53 9.47"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              />
                                            </g>
                                          </svg>
                                        </div>
                                        <span> Hide Conversation </span>
                                      </li>
                                      <li>
                                        <div className="icon block-icon">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                          >
                                            <path
                                              d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                                              stroke="none"
                                              stroke-width="1.5"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            ></path>
                                            <path
                                              d="M3.41016 22C3.41016 18.13 7.26015 15 12.0002 15C12.9602 15 13.8902 15.13 14.7602 15.37"
                                              stroke="none"
                                              stroke-width="1.5"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            ></path>
                                            <path
                                              d="M22 18C22 18.32 21.96 18.63 21.88 18.93C21.79 19.33 21.63 19.72 21.42 20.06C20.73 21.22 19.46 22 18 22C16.97 22 16.04 21.61 15.34 20.97C15.04 20.71 14.78 20.4 14.58 20.06C14.21 19.46 14 18.75 14 18C14 16.92 14.43 15.93 15.13 15.21C15.86 14.46 16.88 14 18 14C19.18 14 20.25 14.51 20.97 15.33C21.61 16.04 22 16.98 22 18Z"
                                              stroke="none"
                                              stroke-width="1.5"
                                              stroke-miterlimit="10"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            ></path>
                                            <path
                                              d="M20.5 15.5001L15.5 20.5001"
                                              stroke="none"
                                              stroke-width="1.5"
                                              stroke-miterlimit="10"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            ></path>
                                          </svg>
                                        </div>
                                        <span>Block Messages</span>
                                      </li>
                                      <li>
                                        <div className="icon report-icon">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                          >
                                            <path
                                              d="M5.14844 2V22"
                                              stroke="none"
                                              stroke-width="1.5"
                                              stroke-miterlimit="10"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                            <path
                                              d="M5.14844 4H16.3484C19.0484 4 19.6484 5.5 17.7484 7.4L16.5484 8.6C15.7484 9.4 15.7484 10.7 16.5484 11.4L17.7484 12.6C19.6484 14.5 18.9484 16 16.3484 16H5.14844"
                                              stroke="none"
                                              stroke-width="1.5"
                                              stroke-miterlimit="10"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                          </svg>
                                        </div>
                                        <span>Report Conversation</span>
                                      </li>
                                      <li>
                                        <div className="icon delete-icon">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                          >
                                            <g clip-path="url(#clip0_6001_200)">
                                              <mask
                                                id="mask0_6001_200"
                                                maskUnits="userSpaceOnUse"
                                                x="0"
                                                y="0"
                                                width="24"
                                                height="24"
                                              >
                                                <path
                                                  d="M24 0H0V24H24V0Z"
                                                  fill="white"
                                                />
                                              </mask>
                                              <g mask="url(#mask0_6001_200)">
                                                <path
                                                  d="M21 5.98047C17.67 5.65047 14.32 5.48047 10.98 5.48047C9 5.48047 7.02 5.58047 5.04 5.78047L3 5.98047"
                                                  stroke="none"
                                                  stroke-width="1.5"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                />
                                                <path
                                                  d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                                                  stroke="none"
                                                  stroke-width="1.5"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                />
                                                <path
                                                  d="M19 6L18.3358 18.5288C18.2234 20.4821 18.1314 22 15.2803 22H8.71971C5.86861 22 5.77664 20.4821 5.66423 18.5288L5 6"
                                                  stroke="none"
                                                  stroke-width="1.5"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                />
                                                <path
                                                  d="M10.3301 16.5H13.6601"
                                                  stroke="none"
                                                  stroke-width="1.5"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                />
                                                <path
                                                  d="M9.5 12.5H14.5"
                                                  stroke="none"
                                                  stroke-width="1.5"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                />
                                              </g>
                                            </g>
                                            <defs>
                                              <clipPath id="clip0_6001_200">
                                                <rect
                                                  width="24"
                                                  height="24"
                                                  fill="white"
                                                />
                                              </clipPath>
                                            </defs>
                                          </svg>
                                        </div>
                                        <span>Delete Conversation</span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="chat-room-body-layout">
                        <div className="chat-room-body-container">
                          <div className="chat-date-divider">
                            <span>19 August</span>
                          </div>

                          <div className="chat-msg-wrapper incoming-message">
                            <div className="chat-msg-profile">
                              <img
                                src="/images/profile-avatars/profile-avatar-6.jpg"
                                alt="#"
                              />
                            </div>
                            <div className="chat-msg-txt-wrapper">
                              <div className="chat-msg-txt">
                                <p>
                                  Hello my dear sir, I’m here do deliver the
                                  design requirement document for our next
                                  projects.
                                </p>
                              </div>
                              <div className="chat-msg-details">
                                <div className="chat-msg-time">
                                  <span>10:25</span>
                                </div>
                                <div className="chat-msg-check-icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M9.52585 5.53587L3.92585 11.0359C3.7856 11.1737 3.59685 11.2509 3.40023 11.2509C3.20361 11.2509 3.01485 11.1737 2.8746 11.0359L0.474602 8.67899C0.404304 8.60997 0.34829 8.52777 0.309758 8.4371C0.271226 8.34642 0.250931 8.24905 0.250031 8.15053C0.248215 7.95157 0.325511 7.76003 0.464915 7.61805C0.533941 7.54776 0.616137 7.49174 0.706811 7.45321C0.797485 7.41468 0.89486 7.39438 0.993377 7.39348C1.19234 7.39167 1.38388 7.46896 1.52585 7.60837L3.40085 9.44962L8.47523 4.46587C8.61712 4.32646 8.80858 4.24913 9.00748 4.25089C9.20639 4.25265 9.39645 4.33335 9.53585 4.47524C9.67526 4.61713 9.75258 4.80859 9.75083 5.0075C9.74907 5.2064 9.66837 5.39646 9.52648 5.53587H9.52585ZM15.5352 4.47337C15.4662 4.40283 15.3839 4.34662 15.293 4.30796C15.2022 4.2693 15.1046 4.24895 15.0059 4.24808C14.9072 4.24721 14.8093 4.26583 14.7178 4.30288C14.6263 4.33993 14.543 4.39468 14.4727 4.46399L9.40023 9.44962L8.90773 8.96587C8.76584 8.82646 8.57438 8.74913 8.37547 8.75089C8.17657 8.75265 7.98651 8.83335 7.8471 8.97524C7.7077 9.11713 7.63037 9.30859 7.63213 9.5075C7.63389 9.7064 7.71459 9.89646 7.85648 10.0359L8.8746 11.0359C9.01485 11.1737 9.20361 11.2509 9.40023 11.2509C9.59684 11.2509 9.7856 11.1737 9.92585 11.0359L15.5259 5.53587C15.5961 5.46684 15.6521 5.38465 15.6906 5.294C15.7291 5.20334 15.7493 5.10598 15.7502 5.0075C15.7511 4.90901 15.7325 4.81131 15.6957 4.71999C15.6588 4.62866 15.6043 4.5455 15.5352 4.47524V4.47337Z"
                                      fill="none"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="chat-msg-wrapper outcoming-message">
                            <div className="chat-msg-profile">
                              <img
                                src="/images/profile-avatars/profile-avatar-1.png"
                                alt="#"
                              />
                            </div>
                            <div className="chat-msg-txt-wrapper">
                              <div className="chat-msg-txt">
                                <p>
                                  Do androids truly dream of electric sheeps?
                                </p>
                              </div>
                              <div className="chat-msg-details">
                                <div className="chat-msg-time">
                                  <span>12:30</span>
                                </div>
                                <div className="chat-msg-check-icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M9.52585 5.53587L3.92585 11.0359C3.7856 11.1737 3.59685 11.2509 3.40023 11.2509C3.20361 11.2509 3.01485 11.1737 2.8746 11.0359L0.474602 8.67899C0.404304 8.60997 0.34829 8.52777 0.309758 8.4371C0.271226 8.34642 0.250931 8.24905 0.250031 8.15053C0.248215 7.95157 0.325511 7.76003 0.464915 7.61805C0.533941 7.54776 0.616137 7.49174 0.706811 7.45321C0.797485 7.41468 0.89486 7.39438 0.993377 7.39348C1.19234 7.39167 1.38388 7.46896 1.52585 7.60837L3.40085 9.44962L8.47523 4.46587C8.61712 4.32646 8.80858 4.24913 9.00748 4.25089C9.20639 4.25265 9.39645 4.33335 9.53585 4.47524C9.67526 4.61713 9.75258 4.80859 9.75083 5.0075C9.74907 5.2064 9.66837 5.39646 9.52648 5.53587H9.52585ZM15.5352 4.47337C15.4662 4.40283 15.3839 4.34662 15.293 4.30796C15.2022 4.2693 15.1046 4.24895 15.0059 4.24808C14.9072 4.24721 14.8093 4.26583 14.7178 4.30288C14.6263 4.33993 14.543 4.39468 14.4727 4.46399L9.40023 9.44962L8.90773 8.96587C8.76584 8.82646 8.57438 8.74913 8.37547 8.75089C8.17657 8.75265 7.98651 8.83335 7.8471 8.97524C7.7077 9.11713 7.63037 9.30859 7.63213 9.5075C7.63389 9.7064 7.71459 9.89646 7.85648 10.0359L8.8746 11.0359C9.01485 11.1737 9.20361 11.2509 9.40023 11.2509C9.59684 11.2509 9.7856 11.1737 9.92585 11.0359L15.5259 5.53587C15.5961 5.46684 15.6521 5.38465 15.6906 5.294C15.7291 5.20334 15.7493 5.10598 15.7502 5.0075C15.7511 4.90901 15.7325 4.81131 15.6957 4.71999C15.6588 4.62866 15.6043 4.5455 15.5352 4.47524V4.47337Z"
                                      fill="none"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="chat-msg-wrapper incoming-message">
                            <div className="chat-msg-profile">
                              <img
                                src="/images/profile-avatars/profile-avatar-6.jpg"
                                alt="#"
                              />
                            </div>
                            <div className="chat-msg-txt-wrapper">
                              <div className="chat-msg-txt">
                                <p>Do androids dream of electric sheeps?</p>
                              </div>
                              <div className="chat-msg-details">
                                <div className="chat-msg-time">
                                  <span>12:30</span>
                                </div>
                                <div className="chat-msg-check-icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M9.52585 5.53587L3.92585 11.0359C3.7856 11.1737 3.59685 11.2509 3.40023 11.2509C3.20361 11.2509 3.01485 11.1737 2.8746 11.0359L0.474602 8.67899C0.404304 8.60997 0.34829 8.52777 0.309758 8.4371C0.271226 8.34642 0.250931 8.24905 0.250031 8.15053C0.248215 7.95157 0.325511 7.76003 0.464915 7.61805C0.533941 7.54776 0.616137 7.49174 0.706811 7.45321C0.797485 7.41468 0.89486 7.39438 0.993377 7.39348C1.19234 7.39167 1.38388 7.46896 1.52585 7.60837L3.40085 9.44962L8.47523 4.46587C8.61712 4.32646 8.80858 4.24913 9.00748 4.25089C9.20639 4.25265 9.39645 4.33335 9.53585 4.47524C9.67526 4.61713 9.75258 4.80859 9.75083 5.0075C9.74907 5.2064 9.66837 5.39646 9.52648 5.53587H9.52585ZM15.5352 4.47337C15.4662 4.40283 15.3839 4.34662 15.293 4.30796C15.2022 4.2693 15.1046 4.24895 15.0059 4.24808C14.9072 4.24721 14.8093 4.26583 14.7178 4.30288C14.6263 4.33993 14.543 4.39468 14.4727 4.46399L9.40023 9.44962L8.90773 8.96587C8.76584 8.82646 8.57438 8.74913 8.37547 8.75089C8.17657 8.75265 7.98651 8.83335 7.8471 8.97524C7.7077 9.11713 7.63037 9.30859 7.63213 9.5075C7.63389 9.7064 7.71459 9.89646 7.85648 10.0359L8.8746 11.0359C9.01485 11.1737 9.20361 11.2509 9.40023 11.2509C9.59684 11.2509 9.7856 11.1737 9.92585 11.0359L15.5259 5.53587C15.5961 5.46684 15.6521 5.38465 15.6906 5.294C15.7291 5.20334 15.7493 5.10598 15.7502 5.0075C15.7511 4.90901 15.7325 4.81131 15.6957 4.71999C15.6588 4.62866 15.6043 4.5455 15.5352 4.47524V4.47337Z"
                                      fill="none"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="chat-msg-wrapper incoming-message">
                            <div className="chat-msg-profile">
                              <img
                                src="/images/profile-avatars/profile-avatar-6.jpg"
                                alt="#"
                              />
                            </div>
                            <div className="chat-msg-txt-wrapper">
                              <div className="chat-msg-txt">
                                <p>What do you think?</p>
                              </div>
                              <div className="chat-msg-details">
                                <div className="chat-msg-time">
                                  <span>12:30</span>
                                </div>
                                <div className="chat-msg-check-icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M9.52585 5.53587L3.92585 11.0359C3.7856 11.1737 3.59685 11.2509 3.40023 11.2509C3.20361 11.2509 3.01485 11.1737 2.8746 11.0359L0.474602 8.67899C0.404304 8.60997 0.34829 8.52777 0.309758 8.4371C0.271226 8.34642 0.250931 8.24905 0.250031 8.15053C0.248215 7.95157 0.325511 7.76003 0.464915 7.61805C0.533941 7.54776 0.616137 7.49174 0.706811 7.45321C0.797485 7.41468 0.89486 7.39438 0.993377 7.39348C1.19234 7.39167 1.38388 7.46896 1.52585 7.60837L3.40085 9.44962L8.47523 4.46587C8.61712 4.32646 8.80858 4.24913 9.00748 4.25089C9.20639 4.25265 9.39645 4.33335 9.53585 4.47524C9.67526 4.61713 9.75258 4.80859 9.75083 5.0075C9.74907 5.2064 9.66837 5.39646 9.52648 5.53587H9.52585ZM15.5352 4.47337C15.4662 4.40283 15.3839 4.34662 15.293 4.30796C15.2022 4.2693 15.1046 4.24895 15.0059 4.24808C14.9072 4.24721 14.8093 4.26583 14.7178 4.30288C14.6263 4.33993 14.543 4.39468 14.4727 4.46399L9.40023 9.44962L8.90773 8.96587C8.76584 8.82646 8.57438 8.74913 8.37547 8.75089C8.17657 8.75265 7.98651 8.83335 7.8471 8.97524C7.7077 9.11713 7.63037 9.30859 7.63213 9.5075C7.63389 9.7064 7.71459 9.89646 7.85648 10.0359L8.8746 11.0359C9.01485 11.1737 9.20361 11.2509 9.40023 11.2509C9.59684 11.2509 9.7856 11.1737 9.92585 11.0359L15.5259 5.53587C15.5961 5.46684 15.6521 5.38465 15.6906 5.294C15.7291 5.20334 15.7493 5.10598 15.7502 5.0075C15.7511 4.90901 15.7325 4.81131 15.6957 4.71999C15.6588 4.62866 15.6043 4.5455 15.5352 4.47524V4.47337Z"
                                      fill="none"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="chat-msg-wrapper outcoming-message">
                            <div className="chat-msg-profile">
                              <img
                                src="/images/profile-avatars/profile-avatar-1.png"
                                alt="#"
                              />
                            </div>
                            <div className="chat-msg-txt-wrapper">
                              <div className="chat-msg-txt">
                                <p>
                                  Hello my dear sir, I’m here do deliver the
                                  design requirement document for our next
                                  projects.
                                </p>
                              </div>
                              <div className="chat-msg-details">
                                <div className="chat-msg-time">
                                  <span>10:25</span>
                                </div>
                                <div className="chat-msg-check-icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M9.52585 5.53587L3.92585 11.0359C3.7856 11.1737 3.59685 11.2509 3.40023 11.2509C3.20361 11.2509 3.01485 11.1737 2.8746 11.0359L0.474602 8.67899C0.404304 8.60997 0.34829 8.52777 0.309758 8.4371C0.271226 8.34642 0.250931 8.24905 0.250031 8.15053C0.248215 7.95157 0.325511 7.76003 0.464915 7.61805C0.533941 7.54776 0.616137 7.49174 0.706811 7.45321C0.797485 7.41468 0.89486 7.39438 0.993377 7.39348C1.19234 7.39167 1.38388 7.46896 1.52585 7.60837L3.40085 9.44962L8.47523 4.46587C8.61712 4.32646 8.80858 4.24913 9.00748 4.25089C9.20639 4.25265 9.39645 4.33335 9.53585 4.47524C9.67526 4.61713 9.75258 4.80859 9.75083 5.0075C9.74907 5.2064 9.66837 5.39646 9.52648 5.53587H9.52585ZM15.5352 4.47337C15.4662 4.40283 15.3839 4.34662 15.293 4.30796C15.2022 4.2693 15.1046 4.24895 15.0059 4.24808C14.9072 4.24721 14.8093 4.26583 14.7178 4.30288C14.6263 4.33993 14.543 4.39468 14.4727 4.46399L9.40023 9.44962L8.90773 8.96587C8.76584 8.82646 8.57438 8.74913 8.37547 8.75089C8.17657 8.75265 7.98651 8.83335 7.8471 8.97524C7.7077 9.11713 7.63037 9.30859 7.63213 9.5075C7.63389 9.7064 7.71459 9.89646 7.85648 10.0359L8.8746 11.0359C9.01485 11.1737 9.20361 11.2509 9.40023 11.2509C9.59684 11.2509 9.7856 11.1737 9.92585 11.0359L15.5259 5.53587C15.5961 5.46684 15.6521 5.38465 15.6906 5.294C15.7291 5.20334 15.7493 5.10598 15.7502 5.0075C15.7511 4.90901 15.7325 4.81131 15.6957 4.71999C15.6588 4.62866 15.6043 4.5455 15.5352 4.47524V4.47337Z"
                                      fill="none"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="chat-date-divider divider-line">
                            <span>Today</span>
                          </div>

                          <div className="chat-msg-wrapper incoming-message">
                            <div className="chat-msg-profile">
                              <img
                                src="/images/profile-avatars/profile-avatar-6.jpg"
                                alt="#"
                              />
                            </div>
                            <div className="chat-msg-txt-wrapper">
                              <div className="chat-msg-txt">
                                <p>
                                  Hello my dear sir, I’m here do deliver the
                                  design requirement document for our next
                                  projects.
                                </p>
                              </div>
                              <div className="chat-msg-details">
                                <div className="chat-msg-time">
                                  <span>10:25</span>
                                </div>
                                <div className="chat-msg-check-icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M9.52585 5.53587L3.92585 11.0359C3.7856 11.1737 3.59685 11.2509 3.40023 11.2509C3.20361 11.2509 3.01485 11.1737 2.8746 11.0359L0.474602 8.67899C0.404304 8.60997 0.34829 8.52777 0.309758 8.4371C0.271226 8.34642 0.250931 8.24905 0.250031 8.15053C0.248215 7.95157 0.325511 7.76003 0.464915 7.61805C0.533941 7.54776 0.616137 7.49174 0.706811 7.45321C0.797485 7.41468 0.89486 7.39438 0.993377 7.39348C1.19234 7.39167 1.38388 7.46896 1.52585 7.60837L3.40085 9.44962L8.47523 4.46587C8.61712 4.32646 8.80858 4.24913 9.00748 4.25089C9.20639 4.25265 9.39645 4.33335 9.53585 4.47524C9.67526 4.61713 9.75258 4.80859 9.75083 5.0075C9.74907 5.2064 9.66837 5.39646 9.52648 5.53587H9.52585ZM15.5352 4.47337C15.4662 4.40283 15.3839 4.34662 15.293 4.30796C15.2022 4.2693 15.1046 4.24895 15.0059 4.24808C14.9072 4.24721 14.8093 4.26583 14.7178 4.30288C14.6263 4.33993 14.543 4.39468 14.4727 4.46399L9.40023 9.44962L8.90773 8.96587C8.76584 8.82646 8.57438 8.74913 8.37547 8.75089C8.17657 8.75265 7.98651 8.83335 7.8471 8.97524C7.7077 9.11713 7.63037 9.30859 7.63213 9.5075C7.63389 9.7064 7.71459 9.89646 7.85648 10.0359L8.8746 11.0359C9.01485 11.1737 9.20361 11.2509 9.40023 11.2509C9.59684 11.2509 9.7856 11.1737 9.92585 11.0359L15.5259 5.53587C15.5961 5.46684 15.6521 5.38465 15.6906 5.294C15.7291 5.20334 15.7493 5.10598 15.7502 5.0075C15.7511 4.90901 15.7325 4.81131 15.6957 4.71999C15.6588 4.62866 15.6043 4.5455 15.5352 4.47524V4.47337Z"
                                      fill="none"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="chat-msg-wrapper outcoming-message">
                            <div className="chat-msg-profile">
                              <img
                                src="/images/profile-avatars/profile-avatar-1.png"
                                alt="#"
                              />
                            </div>
                            <div className="chat-msg-txt-wrapper">
                              <div className="chat-msg-txt">
                                <p>
                                  Do androids truly dream of electric sheeps?
                                </p>
                              </div>
                              <div className="chat-msg-details">
                                <div className="chat-msg-time">
                                  <span>12:30</span>
                                </div>
                                <div className="chat-msg-check-icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M9.52585 5.53587L3.92585 11.0359C3.7856 11.1737 3.59685 11.2509 3.40023 11.2509C3.20361 11.2509 3.01485 11.1737 2.8746 11.0359L0.474602 8.67899C0.404304 8.60997 0.34829 8.52777 0.309758 8.4371C0.271226 8.34642 0.250931 8.24905 0.250031 8.15053C0.248215 7.95157 0.325511 7.76003 0.464915 7.61805C0.533941 7.54776 0.616137 7.49174 0.706811 7.45321C0.797485 7.41468 0.89486 7.39438 0.993377 7.39348C1.19234 7.39167 1.38388 7.46896 1.52585 7.60837L3.40085 9.44962L8.47523 4.46587C8.61712 4.32646 8.80858 4.24913 9.00748 4.25089C9.20639 4.25265 9.39645 4.33335 9.53585 4.47524C9.67526 4.61713 9.75258 4.80859 9.75083 5.0075C9.74907 5.2064 9.66837 5.39646 9.52648 5.53587H9.52585ZM15.5352 4.47337C15.4662 4.40283 15.3839 4.34662 15.293 4.30796C15.2022 4.2693 15.1046 4.24895 15.0059 4.24808C14.9072 4.24721 14.8093 4.26583 14.7178 4.30288C14.6263 4.33993 14.543 4.39468 14.4727 4.46399L9.40023 9.44962L8.90773 8.96587C8.76584 8.82646 8.57438 8.74913 8.37547 8.75089C8.17657 8.75265 7.98651 8.83335 7.8471 8.97524C7.7077 9.11713 7.63037 9.30859 7.63213 9.5075C7.63389 9.7064 7.71459 9.89646 7.85648 10.0359L8.8746 11.0359C9.01485 11.1737 9.20361 11.2509 9.40023 11.2509C9.59684 11.2509 9.7856 11.1737 9.92585 11.0359L15.5259 5.53587C15.5961 5.46684 15.6521 5.38465 15.6906 5.294C15.7291 5.20334 15.7493 5.10598 15.7502 5.0075C15.7511 4.90901 15.7325 4.81131 15.6957 4.71999C15.6588 4.62866 15.6043 4.5455 15.5352 4.47524V4.47337Z"
                                      fill="none"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="chat-msg-wrapper incoming-message">
                            <div className="chat-msg-profile">
                              <img
                                src="/images/profile-avatars/profile-avatar-6.jpg"
                                alt="#"
                              />
                            </div>
                            <div className="chat-msg-txt-wrapper">
                              <div className="chat-msg-image">
                                <img
                                  src="/images/shared-media/image-1.jpg"
                                  alt="#"
                                />
                              </div>
                              <div className="chat-msg-details">
                                <div className="chat-msg-time">
                                  <span>12:30</span>
                                </div>
                                <div className="chat-msg-check-icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M9.52585 5.53587L3.92585 11.0359C3.7856 11.1737 3.59685 11.2509 3.40023 11.2509C3.20361 11.2509 3.01485 11.1737 2.8746 11.0359L0.474602 8.67899C0.404304 8.60997 0.34829 8.52777 0.309758 8.4371C0.271226 8.34642 0.250931 8.24905 0.250031 8.15053C0.248215 7.95157 0.325511 7.76003 0.464915 7.61805C0.533941 7.54776 0.616137 7.49174 0.706811 7.45321C0.797485 7.41468 0.89486 7.39438 0.993377 7.39348C1.19234 7.39167 1.38388 7.46896 1.52585 7.60837L3.40085 9.44962L8.47523 4.46587C8.61712 4.32646 8.80858 4.24913 9.00748 4.25089C9.20639 4.25265 9.39645 4.33335 9.53585 4.47524C9.67526 4.61713 9.75258 4.80859 9.75083 5.0075C9.74907 5.2064 9.66837 5.39646 9.52648 5.53587H9.52585ZM15.5352 4.47337C15.4662 4.40283 15.3839 4.34662 15.293 4.30796C15.2022 4.2693 15.1046 4.24895 15.0059 4.24808C14.9072 4.24721 14.8093 4.26583 14.7178 4.30288C14.6263 4.33993 14.543 4.39468 14.4727 4.46399L9.40023 9.44962L8.90773 8.96587C8.76584 8.82646 8.57438 8.74913 8.37547 8.75089C8.17657 8.75265 7.98651 8.83335 7.8471 8.97524C7.7077 9.11713 7.63037 9.30859 7.63213 9.5075C7.63389 9.7064 7.71459 9.89646 7.85648 10.0359L8.8746 11.0359C9.01485 11.1737 9.20361 11.2509 9.40023 11.2509C9.59684 11.2509 9.7856 11.1737 9.92585 11.0359L15.5259 5.53587C15.5961 5.46684 15.6521 5.38465 15.6906 5.294C15.7291 5.20334 15.7493 5.10598 15.7502 5.0075C15.7511 4.90901 15.7325 4.81131 15.6957 4.71999C15.6588 4.62866 15.6043 4.5455 15.5352 4.47524V4.47337Z"
                                      fill="none"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="chat-msg-typing-anim-elem">
                            <div className="loading">
                              <span className="loading__dot"></span>
                              <span className="loading__dot"></span>
                              <span className="loading__dot"></span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="chat-room-footer-layout">
                        <div className="chat-room-footer-container">
                          <div className="chat-file-upload-btn">
                            <label>
                              <input type="file" />
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M12.3297 12.1499L9.85969 14.6199C8.48969 15.9899 8.48969 18.1999 9.85969 19.5699C11.2297 20.9399 13.4397 20.9399 14.8097 19.5699L18.6997 15.6799C21.4297 12.9499 21.4297 8.50992 18.6997 5.77992C15.9697 3.04992 11.5297 3.04992 8.79969 5.77992L4.55969 10.0199C2.21969 12.3599 2.21969 16.1599 4.55969 18.5099"
                                    stroke="none"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </span>
                            </label>
                          </div>

                          <div className="chat-msg-typing-input">
                            <input
                              type="text"
                              placeholder="Send a message..."
                            />
                          </div>

                          <div className="chat-msg-action-btns">
                            <button className="emojis-icon-btn">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="35"
                                height="35"
                                viewBox="0 0 35 35"
                                fill="none"
                              >
                                <rect
                                  x="0.5"
                                  y="0.5"
                                  width="34"
                                  height="34"
                                  rx="17"
                                  stroke="none"
                                />
                                <path
                                  d="M15.1257 25.4173H19.8756C23.834 25.4173 25.4173 23.834 25.4173 19.8756V15.1257C25.4173 11.1673 23.834 9.58398 19.8756 9.58398H15.1257C11.1673 9.58398 9.58398 11.1673 9.58398 15.1257V19.8756C9.58398 23.834 11.1673 25.4173 15.1257 25.4173Z"
                                  stroke="none"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M20.2715 15.7188C20.9273 15.7188 21.459 15.1871 21.459 14.5312C21.459 13.8754 20.9273 13.3438 20.2715 13.3438C19.6156 13.3438 19.084 13.8754 19.084 14.5312C19.084 15.1871 19.6156 15.7188 20.2715 15.7188Z"
                                  stroke="none"
                                  stroke-width="1.5"
                                  stroke-miterlimit="10"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M14.7285 15.7188C15.3844 15.7188 15.916 15.1871 15.916 14.5312C15.916 13.8754 15.3844 13.3438 14.7285 13.3438C14.0727 13.3438 13.541 13.8754 13.541 14.5312C13.541 15.1871 14.0727 15.7188 14.7285 15.7188Z"
                                  stroke="none"
                                  stroke-width="1.5"
                                  stroke-miterlimit="10"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M14.65 18.5293H20.35C20.7458 18.5293 21.0625 18.846 21.0625 19.2418C21.0625 21.213 19.4713 22.8043 17.5 22.8043C15.5288 22.8043 13.9375 21.213 13.9375 19.2418C13.9375 18.846 14.2542 18.5293 14.65 18.5293Z"
                                  stroke="none"
                                  stroke-width="1.5"
                                  stroke-miterlimit="10"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>

                            <button className="voice-recorder-icon-btn">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="35"
                                height="35"
                                viewBox="0 0 35 35"
                                fill="none"
                              >
                                <rect
                                  x="0.5"
                                  y="0.5"
                                  width="34"
                                  height="34"
                                  rx="17"
                                  stroke="none"
                                />

                                <path
                                  d="M11.4434 15.6387V16.9845C11.4434 20.3253 14.1588 23.0408 17.4996 23.0408C20.8404 23.0408 23.5559 20.3253 23.5559 16.9845V15.6387"
                                  stroke="none"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M17.5007 20.2715C19.2502 20.2715 20.6673 18.8544 20.6673 17.1048V12.7507C20.6673 11.0011 19.2502 9.58398 17.5007 9.58398C15.7511 9.58398 14.334 11.0011 14.334 12.7507V17.1048C14.334 18.8544 15.7511 20.2715 17.5007 20.2715Z"
                                  stroke="none"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M16.4004 13.0905C17.1129 12.8292 17.8887 12.8292 18.6012 13.0905"
                                  stroke="none"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M16.8672 14.7687C17.2868 14.6578 17.7222 14.6578 18.1418 14.7687"
                                  stroke="none"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M17.5 23.041V25.416"
                                  stroke="none"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>

                            <button className="btn-txt-simple send-msg-btn">
                              <span>Send</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M7.39969 6.32015L15.8897 3.49015C19.6997 2.22015 21.7697 4.30015 20.5097 8.11015L17.6797 16.6002C15.7797 22.3102 12.6597 22.3102 10.7597 16.6002L9.91969 14.0802L7.39969 13.2402C1.68969 11.3402 1.68969 8.23015 7.39969 6.32015Z"
                                  stroke="none"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M10.1094 13.6505L13.6894 10.0605"
                                  stroke="none"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeChat === "jerome" && (
                  <div className="msg-chat-room-layout" msg-chat-room>
                    <div className="msg-chat-room-container">
                      <div className="chat-room-header-layout">
                        <div className="chat-room-header-container">
                          <div className="chat-room-header-profile">
                            <div className="profile-card">
                              <a href="#" className="profile-card__main">
                                <div className="profile-card__avatar-settings">
                                  <div className="profile-card__avatar">
                                    <img
                                      src="/images/profile-avatars/profile-avatar-28.jpg"
                                      alt="MoneyBoy Social Profile Avatar"
                                    />
                                  </div>
                                </div>
                                <div className="profile-card__info">
                                  <div className="profile-card__name-badge">
                                    <div className="profile-card__name">
                                      Jerome White
                                    </div>
                                    <div className="profile-card__badge">
                                      <img
                                        src="/images/logo/profile-badge.png"
                                        alt="MoneyBoy Social Profile Badge"
                                      />
                                    </div>
                                  </div>
                                  <div className="profile-card__username">
                                    @jeromewhite
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>

                          <div className="chat-room-header-btns">
                            <a href="#" className="btn-txt-gradient">
                              <span>View Profile</span>
                            </a>

                            <div
                              className="rel-user-more-opts-wrapper"
                              data-more-actions-toggle-element
                            >
                              <button
                                className="rel-user-more-opts-trigger-icon"
                                onClick={() => toggleMenu(2)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="25"
                                  viewBox="0 0 24 25"
                                  fill="none"
                                >
                                  <path
                                    d="M5 10.5C3.9 10.5 3 11.4 3 12.5C3 13.6 3.9 14.5 5 14.5C6.1 14.5 7 13.6 7 12.5C7 11.4 6.1 10.5 5 10.5Z"
                                    stroke="none"
                                    stroke-width="1.5"
                                  ></path>
                                  <path
                                    d="M19 10.5C17.9 10.5 17 11.4 17 12.5C17 13.6 17.9 14.5 19 14.5C20.1 14.5 21 13.6 21 12.5C21 11.4 20.1 10.5 19 10.5Z"
                                    stroke="none"
                                    stroke-width="1.5"
                                  ></path>
                                  <path
                                    d="M12 10.5C10.9 10.5 10 11.4 10 12.5C10 13.6 10.9 14.5 12 14.5C13.1 14.5 14 13.6 14 12.5C14 11.4 13.1 10.5 12 10.5Z"
                                    stroke="none"
                                    stroke-width="1.5"
                                  ></path>
                                </svg>
                              </button>
                              {openMenuId === 2 && (
                                <div className="rel-users-more-opts-popup-wrapper">
                                  <div className="rel-users-more-opts-popup-container">
                                    <ul>
                                      <li className="chat-msg-search">
                                        <div>
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
                                            {/* <!-- <label for="header-search-input">Search here</label> --> */}
                                            <input
                                              type="text"
                                              placeholder="Search Message"
                                            />
                                          </div>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="icon mute-icon">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                          >
                                            <path
                                              d="M15 8.36997V7.40997C15 4.42997 12.93 3.28997 10.41 4.86997L7.49 6.69997C7.17 6.88997 6.8 6.99997 6.43 6.99997H5C3 6.99997 2 7.99997 2 9.99997V14C2 16 3 17 5 17H7"
                                              stroke="none"
                                              stroke-width="1.5"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                            <path
                                              d="M10.4102 19.13C12.9302 20.71 15.0002 19.56 15.0002 16.59V12.95"
                                              stroke="none"
                                              stroke-width="1.5"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                            <path
                                              d="M18.81 9.41998C19.71 11.57 19.44 14.08 18 16"
                                              stroke="none"
                                              stroke-width="1.5"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                            <path
                                              d="M21.1481 7.79999C22.6181 11.29 22.1781 15.37 19.8281 18.5"
                                              stroke="none"
                                              stroke-width="1.5"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                            <path
                                              d="M22 2L2 22"
                                              stroke="none"
                                              stroke-width="1.5"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                          </svg>
                                        </div>
                                        <span>Mute Conversation</span>
                                      </li>
                                      <li>
                                        <div className="icon hide-icon">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                          >
                                            <g>
                                              <path
                                                d="M17.8201 5.77047C16.0701 4.45047 14.0701 3.73047 12.0001 3.73047C8.47009 3.73047 5.18009 5.81047 2.89009 9.41047C1.99009 10.8205 1.99009 13.1905 2.89009 14.6005C3.68009 15.8405 4.60009 16.9105 5.60009 17.7705"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              />
                                              <path
                                                d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              />
                                              <path
                                                d="M8.41992 19.5297C9.55992 20.0097 10.7699 20.2697 11.9999 20.2697C15.5299 20.2697 18.8199 18.1897 21.1099 14.5897C22.0099 13.1797 22.0099 10.8097 21.1099 9.39969C20.7799 8.87969 20.4199 8.38969 20.0499 7.92969"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              />
                                              <path
                                                d="M15.5099 12.6992C15.2499 14.1092 14.0999 15.2592 12.6899 15.5192"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              />
                                              <path
                                                d="M9.47 14.5293L2 21.9993"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              />
                                              <path
                                                d="M22 2L14.53 9.47"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              />
                                            </g>
                                          </svg>
                                        </div>
                                        <span> Hide Conversation </span>
                                      </li>
                                      <li>
                                        <div className="icon block-icon">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                          >
                                            <path
                                              d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                                              stroke="none"
                                              stroke-width="1.5"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            ></path>
                                            <path
                                              d="M3.41016 22C3.41016 18.13 7.26015 15 12.0002 15C12.9602 15 13.8902 15.13 14.7602 15.37"
                                              stroke="none"
                                              stroke-width="1.5"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            ></path>
                                            <path
                                              d="M22 18C22 18.32 21.96 18.63 21.88 18.93C21.79 19.33 21.63 19.72 21.42 20.06C20.73 21.22 19.46 22 18 22C16.97 22 16.04 21.61 15.34 20.97C15.04 20.71 14.78 20.4 14.58 20.06C14.21 19.46 14 18.75 14 18C14 16.92 14.43 15.93 15.13 15.21C15.86 14.46 16.88 14 18 14C19.18 14 20.25 14.51 20.97 15.33C21.61 16.04 22 16.98 22 18Z"
                                              stroke="none"
                                              stroke-width="1.5"
                                              stroke-miterlimit="10"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            ></path>
                                            <path
                                              d="M20.5 15.5001L15.5 20.5001"
                                              stroke="none"
                                              stroke-width="1.5"
                                              stroke-miterlimit="10"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            ></path>
                                          </svg>
                                        </div>
                                        <span>Block Messages</span>
                                      </li>
                                      <li>
                                        <div className="icon report-icon">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                          >
                                            <path
                                              d="M5.14844 2V22"
                                              stroke="none"
                                              stroke-width="1.5"
                                              stroke-miterlimit="10"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                            <path
                                              d="M5.14844 4H16.3484C19.0484 4 19.6484 5.5 17.7484 7.4L16.5484 8.6C15.7484 9.4 15.7484 10.7 16.5484 11.4L17.7484 12.6C19.6484 14.5 18.9484 16 16.3484 16H5.14844"
                                              stroke="none"
                                              stroke-width="1.5"
                                              stroke-miterlimit="10"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                          </svg>
                                        </div>
                                        <span>Report Conversation</span>
                                      </li>
                                      <li>
                                        <div className="icon delete-icon">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                          >
                                            <g clip-path="url(#clip0_6001_200)">
                                              <mask
                                                id="mask0_6001_200"
                                                maskUnits="userSpaceOnUse"
                                                x="0"
                                                y="0"
                                                width="24"
                                                height="24"
                                              >
                                                <path
                                                  d="M24 0H0V24H24V0Z"
                                                  fill="white"
                                                />
                                              </mask>
                                              <g mask="url(#mask0_6001_200)">
                                                <path
                                                  d="M21 5.98047C17.67 5.65047 14.32 5.48047 10.98 5.48047C9 5.48047 7.02 5.58047 5.04 5.78047L3 5.98047"
                                                  stroke="none"
                                                  stroke-width="1.5"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                />
                                                <path
                                                  d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                                                  stroke="none"
                                                  stroke-width="1.5"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                />
                                                <path
                                                  d="M19 6L18.3358 18.5288C18.2234 20.4821 18.1314 22 15.2803 22H8.71971C5.86861 22 5.77664 20.4821 5.66423 18.5288L5 6"
                                                  stroke="none"
                                                  stroke-width="1.5"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                />
                                                <path
                                                  d="M10.3301 16.5H13.6601"
                                                  stroke="none"
                                                  stroke-width="1.5"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                />
                                                <path
                                                  d="M9.5 12.5H14.5"
                                                  stroke="none"
                                                  stroke-width="1.5"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                />
                                              </g>
                                            </g>
                                            <defs>
                                              <clipPath id="clip0_6001_200">
                                                <rect
                                                  width="24"
                                                  height="24"
                                                  fill="white"
                                                />
                                              </clipPath>
                                            </defs>
                                          </svg>
                                        </div>
                                        <span>Delete Conversation</span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="chat-room-body-layout">
                        <div className="chat-room-body-container">
                          <div className="chat-date-divider">
                            <span>19 August</span>
                          </div>

                          <div className="chat-msg-wrapper incoming-message">
                            <div className="chat-msg-profile">
                              <img
                                src="/images/profile-avatars/profile-avatar-28.jpg"
                                alt="#"
                              />
                            </div>
                            <div className="chat-msg-txt-wrapper">
                              <div className="chat-msg-txt">
                                <p>
                                  Hello my dear sir, I’m here do deliver the
                                  design requirement document for our next
                                  projects.
                                </p>
                              </div>
                              <div className="chat-msg-details">
                                <div className="chat-msg-time">
                                  <span>10:25</span>
                                </div>
                                <div className="chat-msg-check-icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M9.52585 5.53587L3.92585 11.0359C3.7856 11.1737 3.59685 11.2509 3.40023 11.2509C3.20361 11.2509 3.01485 11.1737 2.8746 11.0359L0.474602 8.67899C0.404304 8.60997 0.34829 8.52777 0.309758 8.4371C0.271226 8.34642 0.250931 8.24905 0.250031 8.15053C0.248215 7.95157 0.325511 7.76003 0.464915 7.61805C0.533941 7.54776 0.616137 7.49174 0.706811 7.45321C0.797485 7.41468 0.89486 7.39438 0.993377 7.39348C1.19234 7.39167 1.38388 7.46896 1.52585 7.60837L3.40085 9.44962L8.47523 4.46587C8.61712 4.32646 8.80858 4.24913 9.00748 4.25089C9.20639 4.25265 9.39645 4.33335 9.53585 4.47524C9.67526 4.61713 9.75258 4.80859 9.75083 5.0075C9.74907 5.2064 9.66837 5.39646 9.52648 5.53587H9.52585ZM15.5352 4.47337C15.4662 4.40283 15.3839 4.34662 15.293 4.30796C15.2022 4.2693 15.1046 4.24895 15.0059 4.24808C14.9072 4.24721 14.8093 4.26583 14.7178 4.30288C14.6263 4.33993 14.543 4.39468 14.4727 4.46399L9.40023 9.44962L8.90773 8.96587C8.76584 8.82646 8.57438 8.74913 8.37547 8.75089C8.17657 8.75265 7.98651 8.83335 7.8471 8.97524C7.7077 9.11713 7.63037 9.30859 7.63213 9.5075C7.63389 9.7064 7.71459 9.89646 7.85648 10.0359L8.8746 11.0359C9.01485 11.1737 9.20361 11.2509 9.40023 11.2509C9.59684 11.2509 9.7856 11.1737 9.92585 11.0359L15.5259 5.53587C15.5961 5.46684 15.6521 5.38465 15.6906 5.294C15.7291 5.20334 15.7493 5.10598 15.7502 5.0075C15.7511 4.90901 15.7325 4.81131 15.6957 4.71999C15.6588 4.62866 15.6043 4.5455 15.5352 4.47524V4.47337Z"
                                      fill="none"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="chat-msg-wrapper outcoming-message">
                            <div className="chat-msg-profile">
                              <img
                                src="/images/profile-avatars/profile-avatar-1.png"
                                alt="#"
                              />
                            </div>
                            <div className="chat-msg-txt-wrapper">
                              <div className="chat-msg-txt">
                                <p>
                                  Do androids truly dream of electric sheeps?
                                </p>
                              </div>
                              <div className="chat-msg-details">
                                <div className="chat-msg-time">
                                  <span>12:30</span>
                                </div>
                                <div className="chat-msg-check-icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M9.52585 5.53587L3.92585 11.0359C3.7856 11.1737 3.59685 11.2509 3.40023 11.2509C3.20361 11.2509 3.01485 11.1737 2.8746 11.0359L0.474602 8.67899C0.404304 8.60997 0.34829 8.52777 0.309758 8.4371C0.271226 8.34642 0.250931 8.24905 0.250031 8.15053C0.248215 7.95157 0.325511 7.76003 0.464915 7.61805C0.533941 7.54776 0.616137 7.49174 0.706811 7.45321C0.797485 7.41468 0.89486 7.39438 0.993377 7.39348C1.19234 7.39167 1.38388 7.46896 1.52585 7.60837L3.40085 9.44962L8.47523 4.46587C8.61712 4.32646 8.80858 4.24913 9.00748 4.25089C9.20639 4.25265 9.39645 4.33335 9.53585 4.47524C9.67526 4.61713 9.75258 4.80859 9.75083 5.0075C9.74907 5.2064 9.66837 5.39646 9.52648 5.53587H9.52585ZM15.5352 4.47337C15.4662 4.40283 15.3839 4.34662 15.293 4.30796C15.2022 4.2693 15.1046 4.24895 15.0059 4.24808C14.9072 4.24721 14.8093 4.26583 14.7178 4.30288C14.6263 4.33993 14.543 4.39468 14.4727 4.46399L9.40023 9.44962L8.90773 8.96587C8.76584 8.82646 8.57438 8.74913 8.37547 8.75089C8.17657 8.75265 7.98651 8.83335 7.8471 8.97524C7.7077 9.11713 7.63037 9.30859 7.63213 9.5075C7.63389 9.7064 7.71459 9.89646 7.85648 10.0359L8.8746 11.0359C9.01485 11.1737 9.20361 11.2509 9.40023 11.2509C9.59684 11.2509 9.7856 11.1737 9.92585 11.0359L15.5259 5.53587C15.5961 5.46684 15.6521 5.38465 15.6906 5.294C15.7291 5.20334 15.7493 5.10598 15.7502 5.0075C15.7511 4.90901 15.7325 4.81131 15.6957 4.71999C15.6588 4.62866 15.6043 4.5455 15.5352 4.47524V4.47337Z"
                                      fill="none"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="chat-msg-wrapper incoming-message">
                            <div className="chat-msg-profile">
                              <img
                                src="/images/profile-avatars/profile-avatar-28.jpg"
                                alt="#"
                              />
                            </div>
                            <div className="chat-msg-txt-wrapper">
                              <div className="chat-msg-txt">
                                <p>Do androids dream of electric sheeps?</p>
                              </div>
                              <div className="chat-msg-details">
                                <div className="chat-msg-time">
                                  <span>12:30</span>
                                </div>
                                <div className="chat-msg-check-icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M9.52585 5.53587L3.92585 11.0359C3.7856 11.1737 3.59685 11.2509 3.40023 11.2509C3.20361 11.2509 3.01485 11.1737 2.8746 11.0359L0.474602 8.67899C0.404304 8.60997 0.34829 8.52777 0.309758 8.4371C0.271226 8.34642 0.250931 8.24905 0.250031 8.15053C0.248215 7.95157 0.325511 7.76003 0.464915 7.61805C0.533941 7.54776 0.616137 7.49174 0.706811 7.45321C0.797485 7.41468 0.89486 7.39438 0.993377 7.39348C1.19234 7.39167 1.38388 7.46896 1.52585 7.60837L3.40085 9.44962L8.47523 4.46587C8.61712 4.32646 8.80858 4.24913 9.00748 4.25089C9.20639 4.25265 9.39645 4.33335 9.53585 4.47524C9.67526 4.61713 9.75258 4.80859 9.75083 5.0075C9.74907 5.2064 9.66837 5.39646 9.52648 5.53587H9.52585ZM15.5352 4.47337C15.4662 4.40283 15.3839 4.34662 15.293 4.30796C15.2022 4.2693 15.1046 4.24895 15.0059 4.24808C14.9072 4.24721 14.8093 4.26583 14.7178 4.30288C14.6263 4.33993 14.543 4.39468 14.4727 4.46399L9.40023 9.44962L8.90773 8.96587C8.76584 8.82646 8.57438 8.74913 8.37547 8.75089C8.17657 8.75265 7.98651 8.83335 7.8471 8.97524C7.7077 9.11713 7.63037 9.30859 7.63213 9.5075C7.63389 9.7064 7.71459 9.89646 7.85648 10.0359L8.8746 11.0359C9.01485 11.1737 9.20361 11.2509 9.40023 11.2509C9.59684 11.2509 9.7856 11.1737 9.92585 11.0359L15.5259 5.53587C15.5961 5.46684 15.6521 5.38465 15.6906 5.294C15.7291 5.20334 15.7493 5.10598 15.7502 5.0075C15.7511 4.90901 15.7325 4.81131 15.6957 4.71999C15.6588 4.62866 15.6043 4.5455 15.5352 4.47524V4.47337Z"
                                      fill="none"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="chat-msg-wrapper incoming-message">
                            <div className="chat-msg-profile">
                              <img
                                src="/images/profile-avatars/profile-avatar-28.jpg"
                                alt="#"
                              />
                            </div>
                            <div className="chat-msg-txt-wrapper">
                              <div className="chat-msg-txt">
                                <p>What do you think?</p>
                              </div>
                              <div className="chat-msg-details">
                                <div className="chat-msg-time">
                                  <span>12:30</span>
                                </div>
                                <div className="chat-msg-check-icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M9.52585 5.53587L3.92585 11.0359C3.7856 11.1737 3.59685 11.2509 3.40023 11.2509C3.20361 11.2509 3.01485 11.1737 2.8746 11.0359L0.474602 8.67899C0.404304 8.60997 0.34829 8.52777 0.309758 8.4371C0.271226 8.34642 0.250931 8.24905 0.250031 8.15053C0.248215 7.95157 0.325511 7.76003 0.464915 7.61805C0.533941 7.54776 0.616137 7.49174 0.706811 7.45321C0.797485 7.41468 0.89486 7.39438 0.993377 7.39348C1.19234 7.39167 1.38388 7.46896 1.52585 7.60837L3.40085 9.44962L8.47523 4.46587C8.61712 4.32646 8.80858 4.24913 9.00748 4.25089C9.20639 4.25265 9.39645 4.33335 9.53585 4.47524C9.67526 4.61713 9.75258 4.80859 9.75083 5.0075C9.74907 5.2064 9.66837 5.39646 9.52648 5.53587H9.52585ZM15.5352 4.47337C15.4662 4.40283 15.3839 4.34662 15.293 4.30796C15.2022 4.2693 15.1046 4.24895 15.0059 4.24808C14.9072 4.24721 14.8093 4.26583 14.7178 4.30288C14.6263 4.33993 14.543 4.39468 14.4727 4.46399L9.40023 9.44962L8.90773 8.96587C8.76584 8.82646 8.57438 8.74913 8.37547 8.75089C8.17657 8.75265 7.98651 8.83335 7.8471 8.97524C7.7077 9.11713 7.63037 9.30859 7.63213 9.5075C7.63389 9.7064 7.71459 9.89646 7.85648 10.0359L8.8746 11.0359C9.01485 11.1737 9.20361 11.2509 9.40023 11.2509C9.59684 11.2509 9.7856 11.1737 9.92585 11.0359L15.5259 5.53587C15.5961 5.46684 15.6521 5.38465 15.6906 5.294C15.7291 5.20334 15.7493 5.10598 15.7502 5.0075C15.7511 4.90901 15.7325 4.81131 15.6957 4.71999C15.6588 4.62866 15.6043 4.5455 15.5352 4.47524V4.47337Z"
                                      fill="none"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="chat-msg-wrapper outcoming-message">
                            <div className="chat-msg-profile">
                              <img
                                src="/images/profile-avatars/profile-avatar-1.png"
                                alt="#"
                              />
                            </div>
                            <div className="chat-msg-txt-wrapper">
                              <div className="chat-msg-txt">
                                <p>
                                  Hello my dear sir, I’m here do deliver the
                                  design requirement document for our next
                                  projects.
                                </p>
                              </div>
                              <div className="chat-msg-details">
                                <div className="chat-msg-time">
                                  <span>10:25</span>
                                </div>
                                <div className="chat-msg-check-icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M9.52585 5.53587L3.92585 11.0359C3.7856 11.1737 3.59685 11.2509 3.40023 11.2509C3.20361 11.2509 3.01485 11.1737 2.8746 11.0359L0.474602 8.67899C0.404304 8.60997 0.34829 8.52777 0.309758 8.4371C0.271226 8.34642 0.250931 8.24905 0.250031 8.15053C0.248215 7.95157 0.325511 7.76003 0.464915 7.61805C0.533941 7.54776 0.616137 7.49174 0.706811 7.45321C0.797485 7.41468 0.89486 7.39438 0.993377 7.39348C1.19234 7.39167 1.38388 7.46896 1.52585 7.60837L3.40085 9.44962L8.47523 4.46587C8.61712 4.32646 8.80858 4.24913 9.00748 4.25089C9.20639 4.25265 9.39645 4.33335 9.53585 4.47524C9.67526 4.61713 9.75258 4.80859 9.75083 5.0075C9.74907 5.2064 9.66837 5.39646 9.52648 5.53587H9.52585ZM15.5352 4.47337C15.4662 4.40283 15.3839 4.34662 15.293 4.30796C15.2022 4.2693 15.1046 4.24895 15.0059 4.24808C14.9072 4.24721 14.8093 4.26583 14.7178 4.30288C14.6263 4.33993 14.543 4.39468 14.4727 4.46399L9.40023 9.44962L8.90773 8.96587C8.76584 8.82646 8.57438 8.74913 8.37547 8.75089C8.17657 8.75265 7.98651 8.83335 7.8471 8.97524C7.7077 9.11713 7.63037 9.30859 7.63213 9.5075C7.63389 9.7064 7.71459 9.89646 7.85648 10.0359L8.8746 11.0359C9.01485 11.1737 9.20361 11.2509 9.40023 11.2509C9.59684 11.2509 9.7856 11.1737 9.92585 11.0359L15.5259 5.53587C15.5961 5.46684 15.6521 5.38465 15.6906 5.294C15.7291 5.20334 15.7493 5.10598 15.7502 5.0075C15.7511 4.90901 15.7325 4.81131 15.6957 4.71999C15.6588 4.62866 15.6043 4.5455 15.5352 4.47524V4.47337Z"
                                      fill="none"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="chat-date-divider divider-line">
                            <span>Today</span>
                          </div>

                          <div className="chat-msg-wrapper incoming-message">
                            <div className="chat-msg-profile">
                              <img
                                src="/images/profile-avatars/profile-avatar-28.jpg"
                                alt="#"
                              />
                            </div>
                            <div className="chat-msg-txt-wrapper">
                              <div className="chat-msg-txt">
                                <p>
                                  Hello my dear sir, I’m here do deliver the
                                  design requirement document for our next
                                  projects.
                                </p>
                              </div>
                              <div className="chat-msg-details">
                                <div className="chat-msg-time">
                                  <span>10:25</span>
                                </div>
                                <div className="chat-msg-check-icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M9.52585 5.53587L3.92585 11.0359C3.7856 11.1737 3.59685 11.2509 3.40023 11.2509C3.20361 11.2509 3.01485 11.1737 2.8746 11.0359L0.474602 8.67899C0.404304 8.60997 0.34829 8.52777 0.309758 8.4371C0.271226 8.34642 0.250931 8.24905 0.250031 8.15053C0.248215 7.95157 0.325511 7.76003 0.464915 7.61805C0.533941 7.54776 0.616137 7.49174 0.706811 7.45321C0.797485 7.41468 0.89486 7.39438 0.993377 7.39348C1.19234 7.39167 1.38388 7.46896 1.52585 7.60837L3.40085 9.44962L8.47523 4.46587C8.61712 4.32646 8.80858 4.24913 9.00748 4.25089C9.20639 4.25265 9.39645 4.33335 9.53585 4.47524C9.67526 4.61713 9.75258 4.80859 9.75083 5.0075C9.74907 5.2064 9.66837 5.39646 9.52648 5.53587H9.52585ZM15.5352 4.47337C15.4662 4.40283 15.3839 4.34662 15.293 4.30796C15.2022 4.2693 15.1046 4.24895 15.0059 4.24808C14.9072 4.24721 14.8093 4.26583 14.7178 4.30288C14.6263 4.33993 14.543 4.39468 14.4727 4.46399L9.40023 9.44962L8.90773 8.96587C8.76584 8.82646 8.57438 8.74913 8.37547 8.75089C8.17657 8.75265 7.98651 8.83335 7.8471 8.97524C7.7077 9.11713 7.63037 9.30859 7.63213 9.5075C7.63389 9.7064 7.71459 9.89646 7.85648 10.0359L8.8746 11.0359C9.01485 11.1737 9.20361 11.2509 9.40023 11.2509C9.59684 11.2509 9.7856 11.1737 9.92585 11.0359L15.5259 5.53587C15.5961 5.46684 15.6521 5.38465 15.6906 5.294C15.7291 5.20334 15.7493 5.10598 15.7502 5.0075C15.7511 4.90901 15.7325 4.81131 15.6957 4.71999C15.6588 4.62866 15.6043 4.5455 15.5352 4.47524V4.47337Z"
                                      fill="none"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="chat-msg-wrapper outcoming-message">
                            <div className="chat-msg-profile">
                              <img
                                src="/images/profile-avatars/profile-avatar-1.png"
                                alt="#"
                              />
                            </div>
                            <div className="chat-msg-txt-wrapper">
                              <div className="chat-msg-txt">
                                <p>
                                  Do androids truly dream of electric sheeps?
                                </p>
                              </div>
                              <div className="chat-msg-details">
                                <div className="chat-msg-time">
                                  <span>12:30</span>
                                </div>
                                <div className="chat-msg-check-icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M9.52585 5.53587L3.92585 11.0359C3.7856 11.1737 3.59685 11.2509 3.40023 11.2509C3.20361 11.2509 3.01485 11.1737 2.8746 11.0359L0.474602 8.67899C0.404304 8.60997 0.34829 8.52777 0.309758 8.4371C0.271226 8.34642 0.250931 8.24905 0.250031 8.15053C0.248215 7.95157 0.325511 7.76003 0.464915 7.61805C0.533941 7.54776 0.616137 7.49174 0.706811 7.45321C0.797485 7.41468 0.89486 7.39438 0.993377 7.39348C1.19234 7.39167 1.38388 7.46896 1.52585 7.60837L3.40085 9.44962L8.47523 4.46587C8.61712 4.32646 8.80858 4.24913 9.00748 4.25089C9.20639 4.25265 9.39645 4.33335 9.53585 4.47524C9.67526 4.61713 9.75258 4.80859 9.75083 5.0075C9.74907 5.2064 9.66837 5.39646 9.52648 5.53587H9.52585ZM15.5352 4.47337C15.4662 4.40283 15.3839 4.34662 15.293 4.30796C15.2022 4.2693 15.1046 4.24895 15.0059 4.24808C14.9072 4.24721 14.8093 4.26583 14.7178 4.30288C14.6263 4.33993 14.543 4.39468 14.4727 4.46399L9.40023 9.44962L8.90773 8.96587C8.76584 8.82646 8.57438 8.74913 8.37547 8.75089C8.17657 8.75265 7.98651 8.83335 7.8471 8.97524C7.7077 9.11713 7.63037 9.30859 7.63213 9.5075C7.63389 9.7064 7.71459 9.89646 7.85648 10.0359L8.8746 11.0359C9.01485 11.1737 9.20361 11.2509 9.40023 11.2509C9.59684 11.2509 9.7856 11.1737 9.92585 11.0359L15.5259 5.53587C15.5961 5.46684 15.6521 5.38465 15.6906 5.294C15.7291 5.20334 15.7493 5.10598 15.7502 5.0075C15.7511 4.90901 15.7325 4.81131 15.6957 4.71999C15.6588 4.62866 15.6043 4.5455 15.5352 4.47524V4.47337Z"
                                      fill="none"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="chat-msg-wrapper incoming-message">
                            <div className="chat-msg-profile">
                              <img
                                src="/images/profile-avatars/profile-avatar-28.jpg"
                                alt="#"
                              />
                            </div>
                            <div className="chat-msg-txt-wrapper">
                              <div className="chat-msg-image">
                                <img
                                  src="/images/shared-media/image-1.jpg"
                                  alt="#"
                                />
                              </div>
                              <div className="chat-msg-details">
                                <div className="chat-msg-time">
                                  <span>12:30</span>
                                </div>
                                <div className="chat-msg-check-icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M9.52585 5.53587L3.92585 11.0359C3.7856 11.1737 3.59685 11.2509 3.40023 11.2509C3.20361 11.2509 3.01485 11.1737 2.8746 11.0359L0.474602 8.67899C0.404304 8.60997 0.34829 8.52777 0.309758 8.4371C0.271226 8.34642 0.250931 8.24905 0.250031 8.15053C0.248215 7.95157 0.325511 7.76003 0.464915 7.61805C0.533941 7.54776 0.616137 7.49174 0.706811 7.45321C0.797485 7.41468 0.89486 7.39438 0.993377 7.39348C1.19234 7.39167 1.38388 7.46896 1.52585 7.60837L3.40085 9.44962L8.47523 4.46587C8.61712 4.32646 8.80858 4.24913 9.00748 4.25089C9.20639 4.25265 9.39645 4.33335 9.53585 4.47524C9.67526 4.61713 9.75258 4.80859 9.75083 5.0075C9.74907 5.2064 9.66837 5.39646 9.52648 5.53587H9.52585ZM15.5352 4.47337C15.4662 4.40283 15.3839 4.34662 15.293 4.30796C15.2022 4.2693 15.1046 4.24895 15.0059 4.24808C14.9072 4.24721 14.8093 4.26583 14.7178 4.30288C14.6263 4.33993 14.543 4.39468 14.4727 4.46399L9.40023 9.44962L8.90773 8.96587C8.76584 8.82646 8.57438 8.74913 8.37547 8.75089C8.17657 8.75265 7.98651 8.83335 7.8471 8.97524C7.7077 9.11713 7.63037 9.30859 7.63213 9.5075C7.63389 9.7064 7.71459 9.89646 7.85648 10.0359L8.8746 11.0359C9.01485 11.1737 9.20361 11.2509 9.40023 11.2509C9.59684 11.2509 9.7856 11.1737 9.92585 11.0359L15.5259 5.53587C15.5961 5.46684 15.6521 5.38465 15.6906 5.294C15.7291 5.20334 15.7493 5.10598 15.7502 5.0075C15.7511 4.90901 15.7325 4.81131 15.6957 4.71999C15.6588 4.62866 15.6043 4.5455 15.5352 4.47524V4.47337Z"
                                      fill="none"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="chat-msg-typing-anim-elem">
                            <div className="loading">
                              <span className="loading__dot"></span>
                              <span className="loading__dot"></span>
                              <span className="loading__dot"></span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="chat-room-footer-layout">
                        <div className="chat-room-footer-container">
                          <div className="chat-file-upload-btn">
                            <label>
                              <input type="file" />
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M12.3297 12.1499L9.85969 14.6199C8.48969 15.9899 8.48969 18.1999 9.85969 19.5699C11.2297 20.9399 13.4397 20.9399 14.8097 19.5699L18.6997 15.6799C21.4297 12.9499 21.4297 8.50992 18.6997 5.77992C15.9697 3.04992 11.5297 3.04992 8.79969 5.77992L4.55969 10.0199C2.21969 12.3599 2.21969 16.1599 4.55969 18.5099"
                                    stroke="none"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </span>
                            </label>
                          </div>

                          <div className="chat-msg-typing-input">
                            <input
                              type="text"
                              placeholder="Send a message..."
                            />
                          </div>

                          <div className="chat-msg-action-btns">
                            <button className="emojis-icon-btn">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="35"
                                height="35"
                                viewBox="0 0 35 35"
                                fill="none"
                              >
                                <rect
                                  x="0.5"
                                  y="0.5"
                                  width="34"
                                  height="34"
                                  rx="17"
                                  stroke="none"
                                />
                                <path
                                  d="M15.1257 25.4173H19.8756C23.834 25.4173 25.4173 23.834 25.4173 19.8756V15.1257C25.4173 11.1673 23.834 9.58398 19.8756 9.58398H15.1257C11.1673 9.58398 9.58398 11.1673 9.58398 15.1257V19.8756C9.58398 23.834 11.1673 25.4173 15.1257 25.4173Z"
                                  stroke="none"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M20.2715 15.7188C20.9273 15.7188 21.459 15.1871 21.459 14.5312C21.459 13.8754 20.9273 13.3438 20.2715 13.3438C19.6156 13.3438 19.084 13.8754 19.084 14.5312C19.084 15.1871 19.6156 15.7188 20.2715 15.7188Z"
                                  stroke="none"
                                  stroke-width="1.5"
                                  stroke-miterlimit="10"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M14.7285 15.7188C15.3844 15.7188 15.916 15.1871 15.916 14.5312C15.916 13.8754 15.3844 13.3438 14.7285 13.3438C14.0727 13.3438 13.541 13.8754 13.541 14.5312C13.541 15.1871 14.0727 15.7188 14.7285 15.7188Z"
                                  stroke="none"
                                  stroke-width="1.5"
                                  stroke-miterlimit="10"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M14.65 18.5293H20.35C20.7458 18.5293 21.0625 18.846 21.0625 19.2418C21.0625 21.213 19.4713 22.8043 17.5 22.8043C15.5288 22.8043 13.9375 21.213 13.9375 19.2418C13.9375 18.846 14.2542 18.5293 14.65 18.5293Z"
                                  stroke="none"
                                  stroke-width="1.5"
                                  stroke-miterlimit="10"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>

                            <button className="voice-recorder-icon-btn">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="35"
                                height="35"
                                viewBox="0 0 35 35"
                                fill="none"
                              >
                                <rect
                                  x="0.5"
                                  y="0.5"
                                  width="34"
                                  height="34"
                                  rx="17"
                                  stroke="none"
                                />

                                <path
                                  d="M11.4434 15.6387V16.9845C11.4434 20.3253 14.1588 23.0408 17.4996 23.0408C20.8404 23.0408 23.5559 20.3253 23.5559 16.9845V15.6387"
                                  stroke="none"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M17.5007 20.2715C19.2502 20.2715 20.6673 18.8544 20.6673 17.1048V12.7507C20.6673 11.0011 19.2502 9.58398 17.5007 9.58398C15.7511 9.58398 14.334 11.0011 14.334 12.7507V17.1048C14.334 18.8544 15.7511 20.2715 17.5007 20.2715Z"
                                  stroke="none"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M16.4004 13.0905C17.1129 12.8292 17.8887 12.8292 18.6012 13.0905"
                                  stroke="none"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M16.8672 14.7687C17.2868 14.6578 17.7222 14.6578 18.1418 14.7687"
                                  stroke="none"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M17.5 23.041V25.416"
                                  stroke="none"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>

                            <button className="btn-txt-simple send-msg-btn">
                              <span>Send</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M7.39969 6.32015L15.8897 3.49015C19.6997 2.22015 21.7697 4.30015 20.5097 8.11015L17.6797 16.6002C15.7797 22.3102 12.6597 22.3102 10.7597 16.6002L9.91969 14.0802L7.39969 13.2402C1.68969 11.3402 1.68969 8.23015 7.39969 6.32015Z"
                                  stroke="none"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M10.1094 13.6505L13.6894 10.0605"
                                  stroke="none"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
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
    </div>
  );
};

export default MessagePage;
