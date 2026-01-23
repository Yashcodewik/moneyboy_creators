"use client";
import React, { useState } from "react";
import SideBar from "./SideBar";
import { Smile, Mic } from "lucide-react";
import "@/public/styles/small-components/small-components.css"

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
             <div className="msg-chats-rooms-container" msg-chat-rooms-wrapper="">
             <div className="msg-chat-room-layout" msg-chat-room="" data-active="">
              <div className="msg-chat-room-container">
                <div className="chat-room-header-layout">
                  <div className="chat-room-header-container">

                    <div className="chat-room-header-profile">
                      <div className="profile-card">
                        <a href="#" className="profile-card__main">
                          <div className="profile-card__avatar-settings">
                            <div className="profile-card__avatar">
                              <img src="/images/profile-avatars/profile-avatar-27.jpg" alt="MoneyBoy Social Profile Avatar" />
                            </div>
                          </div>

                          <div className="profile-card__info">
                            <div className="profile-card__name-badge">
                              <div className="profile-card__name">Madagascar Silver</div>
                              <div className="profile-card__badge">
                                <img src="/images/logo/profile-badge.png" alt="MoneyBoy Social Profile Badge" />
                              </div>
                            </div>
                            <div className="profile-card__username">@madagascarsilver</div>
                          </div>
                        </a>
                      </div>
                    </div>

                    <div className="chat-room-header-btns">
                      <a href="#" className="btn-txt-gradient"><span>View Profile</span></a>

                      <div className="rel-user-more-opts-wrapper" data-more-actions-toggle-element="">
                        <button className="rel-user-more-opts-trigger-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25">
                            <path d="M5 10.5C3.9 10.5 3 11.4 3 12.5C3 13.6 3.9 14.5 5 14.5C6.1 14.5 7 13.6 7 12.5C7 11.4 6.1 10.5 5 10.5Z" />
                            <path d="M19 10.5C17.9 10.5 17 11.4 17 12.5C17 13.6 17.9 14.5 19 14.5C20.1 14.5 21 13.6 21 12.5C21 11.4 20.1 10.5 19 10.5Z" />
                            <path d="M12 10.5C10.9 10.5 10 11.4 10 12.5C10 13.6 10.9 14.5 12 14.5C13.1 14.5 14 13.6 14 12.5C14 11.4 13.1 10.5 12 10.5Z" />
                          </svg>
                        </button>
                      </div>
                      <div className="rel-users-more-opts-popup-wrapper" style={{translate: "none", rotate: "none", scale: "none", transform: "translate(0px, -10px)", height: "0px", opacity: 0, display: "none", overflow: "hidden", left: "auto", bottom: "auto", width: "auto",}}>
                        <div className="rel-users-more-opts-popup-container">
                          <ul>
                            <li className="chat-msg-search">
                              <div>
                                <div className="label-input">
                                  <div className="input-placeholder-icon">
                                    <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                      <path d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M14 5H20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M14 8H17" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                  <input type="text" placeholder="Search Message" />
                                </div>
                              </div>
                            </li>

                            <li>
                              <div className="icon mute-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                  <path d="M22 2L2 22" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                              </div>
                              <span>Mute Conversation</span>
                            </li>

                            <li>
                              <div className="icon hide-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                  <path d="M22 2L2 22" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                              </div>
                              <span>Hide Conversation</span>
                            </li>

                            <li>
                              <div className="icon block-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                  <path d="M20.5 15.5L15.5 20.5" strokeWidth="1.5" />
                                </svg>
                              </div>
                              <span>Block Messages</span>
                            </li>

                            <li>
                              <div className="icon report-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                  <path d="M5 2V22" strokeWidth="1.5" />
                                </svg>
                              </div>
                              <span>Report Conversation</span>
                            </li>

                            <li>
                              <div className="icon delete-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                  <path d="M5 6L19 6" strokeWidth="1.5" />
                                </svg>
                              </div>
                              <span>Delete Conversation</span>
                            </li>
                          </ul>
                        </div>
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
                        <img src="/images/profile-avatars/profile-avatar-27.jpg" alt="#" />
                      </div>
                      <div className="chat-msg-txt-wrapper">
                        <div className="chat-msg-txt">
                          <p>Hello my dear sir, I’m here do deliver the design requirement document for our next projects.</p>
                        </div>
                        <div className="chat-msg-details">
                          <div className="chat-msg-time">
                            <span>10:25</span>
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
                        <input type="file" hidden />
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12.3297 12.1499L9.85969 14.6199C8.48969 15.9899 8.48969 18.1999 9.85969 19.5699C11.2297 20.9399 13.4397 20.9399 14.8097 19.5699L18.6997 15.6799C21.4297 12.9499 21.4297 8.50992 18.6997 5.77992C15.9697 3.04992 11.5297 3.04992 8.79969 5.77992L4.55969 10.0199C2.21969 12.3599 2.21969 16.1599 4.55969 18.5099" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                        </span>
                      </label>
                    </div>
                    <div className="chat-msg-typing-input">
                      <input type="text" placeholder="Send a message..." />
                    </div>
                    <div className="chat-msg-action-btns">
                      <button className="emojis-icon-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                          <rect x="0.5" y="0.5" width="34" height="34" rx="17" stroke="none"></rect>
                          <path d="M15.1257 25.4173H19.8756C23.834 25.4173 25.4173 23.834 25.4173 19.8756V15.1257C25.4173 11.1673 23.834 9.58398 19.8756 9.58398H15.1257C11.1673 9.58398 9.58398 11.1673 9.58398 15.1257V19.8756C9.58398 23.834 11.1673 25.4173 15.1257 25.4173Z" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          <path d="M20.2715 15.7188C20.9273 15.7188 21.459 15.1871 21.459 14.5312C21.459 13.8754 20.9273 13.3438 20.2715 13.3438C19.6156 13.3438 19.084 13.8754 19.084 14.5312C19.084 15.1871 19.6156 15.7188 20.2715 15.7188Z" stroke="none" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                          <path d="M14.7285 15.7188C15.3844 15.7188 15.916 15.1871 15.916 14.5312C15.916 13.8754 15.3844 13.3438 14.7285 13.3438C14.0727 13.3438 13.541 13.8754 13.541 14.5312C13.541 15.1871 14.0727 15.7188 14.7285 15.7188Z" stroke="none" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                          <path d="M14.65 18.5293H20.35C20.7458 18.5293 21.0625 18.846 21.0625 19.2418C21.0625 21.213 19.4713 22.8043 17.5 22.8043C15.5288 22.8043 13.9375 21.213 13.9375 19.2418C13.9375 18.846 14.2542 18.5293 14.65 18.5293Z" stroke="none" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                      </button>
                      <button className="voice-recorder-icon-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                          <rect x="0.5" y="0.5" width="34" height="34" rx="17" stroke="none"></rect>
                          <path d="M11.4434 15.6387V16.9845C11.4434 20.3253 14.1588 23.0408 17.4996 23.0408C20.8404 23.0408 23.5559 20.3253 23.5559 16.9845V15.6387" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          <path d="M17.5007 20.2715C19.2502 20.2715 20.6673 18.8544 20.6673 17.1048V12.7507C20.6673 11.0011 19.2502 9.58398 17.5007 9.58398C15.7511 9.58398 14.334 11.0011 14.334 12.7507V17.1048C14.334 18.8544 15.7511 20.2715 17.5007 20.2715Z" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          <path d="M16.4004 13.0905C17.1129 12.8292 17.8887 12.8292 18.6012 13.0905" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          <path d="M16.8672 14.7687C17.2868 14.6578 17.7222 14.6578 18.1418 14.7687" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          <path d="M17.5 23.041V25.416" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                      </button>
                      <button className="btn-txt-simple send-msg-btn">
                        <span>Send</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M7.39969 6.32015L15.8897 3.49015C19.6997 2.22015 21.7697 4.30015 20.5097 8.11015L17.6797 16.6002C15.7797 22.3102 12.6597 22.3102 10.7597 16.6002L9.91969 14.0802L7.39969 13.2402C1.68969 11.3402 1.68969 8.23015 7.39969 6.32015Z" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          <path d="M10.1094 13.6505L13.6894 10.0605" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
             </div>

              {/* <div className="msg-chat-room-layout" msg-chat-room="" data-active="">
                <div className="msg-chat-room-container">
                  <div className="chat-room-header-layout">
                    <div className="chat-room-header-container">
                      <div className="chat-room-header-profile">
                        <div className="profile-card">
                          <a href="#" className="profile-card__main">
                            <div className="profile-card__avatar-settings">
                              <div className="profile-card__avatar">
                                <img src="/images/profile-avatars/profile-avatar-6.jpg" alt="MoneyBoy Social Profile Avatar" />
                              </div>
                            </div>
                            <div className="profile-card__info">
                              <div className="profile-card__name-badge">
                                <div className="profile-card__name">James Baptista</div>
                                <div className="profile-card__badge">
                                  <img src="/images/logo/profile-badge.png" alt="MoneyBoy Social Profile Badge" />
                                </div>
                              </div>
                              <div className="profile-card__username">@jamesbaptista</div>
                            </div>
                          </a>
                        </div>
                      </div>

                      <div className="chat-room-header-btns">
                        <a href="#" className="btn-txt-gradient"><span>View Profile</span></a>

                        <div className="rel-user-more-opts-wrapper" data-more-actions-toggle-element="">
                          <button className="rel-user-more-opts-trigger-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25">
                              <path d="M5 10.5C3.9 10.5 3 11.4 3 12.5C3 13.6 3.9 14.5 5 14.5C6.1 14.5 7 13.6 7 12.5C7 11.4 6.1 10.5 5 10.5Z" />
                              <path d="M19 10.5C17.9 10.5 17 11.4 17 12.5C17 13.6 17.9 14.5 19 14.5C20.1 14.5 21 13.6 21 12.5C21 11.4 20.1 10.5 19 10.5Z" />
                              <path d="M12 10.5C10.9 10.5 10 11.4 10 12.5C10 13.6 10.9 14.5 12 14.5C13.1 14.5 14 13.6 14 12.5C14 11.4 13.1 10.5 12 10.5Z" />
                            </svg>
                          </button>

                          <div className="rel-users-more-opts-popup-wrapper">
                            <div className="rel-users-more-opts-popup-container">
                              <ul>
                                <li className="chat-msg-search">
                                  <div className="label-input">
                                    <div className="input-placeholder-icon">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2" />
                                        <path d="M18.93 20.69C19.46 22.29 20.67 22.45 21.6 21.05" />
                                        <path d="M14 5H20" />
                                        <path d="M14 8H17" />
                                      </svg>
                                    </div>
                                    <input type="text" placeholder="Search Message" />
                                  </div>
                                </li>

                                <li><span>Mute Conversation</span></li>
                                <li><span>Hide Conversation</span></li>
                                <li><span>Block Messages</span></li>
                                <li><span>Report Conversation</span></li>
                                <li><span>Delete Conversation</span></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="chat-room-body-layout">
                    <div className="chat-room-body-container">
                      <div className="chat-date-divider"><span>19 August</span></div>

                      <div className="chat-msg-wrapper incoming-message">
                        <div className="chat-msg-profile">
                          <img src="/images/profile-avatars/profile-avatar-6.jpg" alt="#" />
                        </div>
                        <div className="chat-msg-txt-wrapper">
                          <div className="chat-msg-txt">
                            <p>Hello my dear sir, I’m here do deliver the design requirement document for our next projects.</p>
                          </div>
                          <div className="chat-msg-details">
                            <div className="chat-msg-time"><span>10:25</span></div>
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
                        <label> <input type="file" /> <span></span> </label>
                      </div>

                      <div className="chat-msg-typing-input">
                        <input type="text" placeholder="Send a message..." />
                      </div>

                      <div className="chat-msg-action-btns">
                        <button className="btn-txt-simple send-msg-btn">
                          <span>Send</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
             </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
