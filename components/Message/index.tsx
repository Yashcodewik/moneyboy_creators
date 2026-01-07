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
                        <input type="file" />
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
                      <button className="btn-txt-simple send-msg-btn">
                        <span>Send</span>
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
