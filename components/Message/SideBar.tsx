import React, { useState } from "react";

const SideBar = () => {
  const [activeChat, setActiveChat] = useState<string | null>("james");

  return (
    <div className="msg-profiles-layout">
      <div className="msg-profiles-header">
        <div className="msg-profiles-header-container">
          <div className="msg-layout-title">
            <h2>Messages</h2>
            <div className="msg-num-circle">
              <span>29</span>
            </div>
          </div>

          <div className="msg-profiles-search-input">
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
              <input type="text" placeholder="Search Contact" />
            </div>
          </div>
        </div>
      </div>

      <div className="msg-profiles-wrapper">
        <div className="msg-profiles-container" msg-chat-contacts-wrapper>
          <div
            className={`msg-contact-box ${
              activeChat === "james" ? "active" : ""
            }`}
            msg-chat-contact
            onClick={() => setActiveChat("james")}
          >
            <div className="contact-item">
              <div className="contact-avatar-wrapper">
                <img
                  className="contact-avatar"
                  src="/images/profile-avatars/profile-avatar-6.jpg"
                  alt="#"
                />
                <div className="contact-status-indicator online"></div>
              </div>

              <div className="contact-content">
                <div className="contact-header">
                  <h4 className="contact-name">James Baptista</h4>
                  <span className="contact-time">12:25</span>
                </div>

                <div className="contact-preview">
                  <div className="contact-message">
                    <p>Lorem ipsum, dolor sit a consectetur adipisicing eli</p>
                  </div>
                  <div className="contact-unread-count">
                    <span>8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`msg-contact-box ${
              activeChat === "jerome" ? "active" : ""
            }`}
            msg-chat-contact
            onClick={() => setActiveChat("jerome")}
          >
            <div className="contact-item">
              <div className="contact-avatar-wrapper">
                <img
                  className="contact-avatar"
                  src="/images/profile-avatars/profile-avatar-28.jpg"
                  alt="#"
                />
                <div className="contact-status-indicator online"></div>
              </div>

              <div className="contact-content">
                <div className="contact-header">
                  <h4 className="contact-name">Jerome White</h4>
                  <span className="contact-time">12:25</span>
                </div>

                <div className="contact-preview">
                  <div className="contact-message">
                    <p>Lorem ipsum, dolor sit a consectetur adipisicing eli</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
