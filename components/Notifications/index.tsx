"use client";
import React, { useEffect, useState } from "react";
import Featuredboys from "../Featuredboys";
import { useDeviceType } from "@/hooks/useDeviceType";

const NotificationPage = () => {
  const [open, setOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const isMobile = useDeviceType();
  const desktopStyle: React.CSSProperties = {
    transform: open ? "translate(0px, 0px)" : "translate(0px, -10px)",
    height: open ? "auto" : "0px",
    opacity: open ? 1 : 0,
    display: open ? "block" : "none",
    overflow: "visible",
    left: "auto",
    transition: "all 0.2s ease",
  };
  const mobileStyle: React.CSSProperties = {
    position: "fixed",
    left: "0%",
    bottom: "25px",
    width: "100%",
    zIndex: 1000,
    transform: open ? "translate(0px, 0px)" : "translate(0px, 100%)",
    height: open ? "auto" : "0px",
    opacity: 1,
    display: open ? "block" : "none",
    overflow: "hidden",
    transition: "transform 0.25s ease",
  };
  useEffect(() => {
    const likeButtons = document.querySelectorAll("[data-like-button]");

    const handleClick = (event: Event) => {
      const button = event.currentTarget as HTMLElement;
      button.classList.toggle("liked");
    };

    likeButtons.forEach((button) => {
      button.addEventListener("click", handleClick);
    });

    return () => {
      likeButtons.forEach((button) => {
        button.removeEventListener("click", handleClick);
      });
    };
  }, []);
  const toggleMenu = (id: number) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };
  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="moneyboy-2x-1x-a-layout">
        <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers">
          <div className="noti-page-container card">
            <div className="noti-page-header">
              <div className="noti-page-title">
                <h2>Notifications</h2>
                <div className="noti-num-circle">
                  <span>29</span>
                </div>
              </div>
            </div>
            <div className="noti-list-wrapper">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
                <div className="noti-item">
                  <div className="noti-item--icon">
                    <img src="/images/logo/black-logo-square.png" alt="#" />
                  </div>
                  <div className="noti-details-container">
                    <div className="noti-title-time-wrapper">
                      <div className="noti-title">
                        <h4>
                          Meg Griffin has left you a review. Both of your reviews
                          from this trip are now public.
                        </h4>
                      </div>
                      <div className="noti-time">
                        <span>12:25</span>
                      </div>
                      <div className="noti-more-actions">
                        <div className="rel-user-more-opts-wrapper" data-more-actions-toggle-element>
                          <button className="rel-user-more-opts-trigger-icon" onClick={() => toggleMenu(1)}>
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
                            <div ref={menuRef} className="rel-users-more-opts-popup-wrapper" style={isMobile ? mobileStyle : desktopStyle}>
                              <div className="rel-users-more-opts-popup-container">
                                <ul>
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
                                    <span> Mute Notifications </span>
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
                                        />
                                        <path
                                          d="M3.41016 22C3.41016 18.13 7.26015 15 12.0002 15C12.9602 15 13.8902 15.13 14.7602 15.37"
                                          stroke="none"
                                          stroke-width="1.5"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                        <path
                                          d="M22 18C22 18.32 21.96 18.63 21.88 18.93C21.79 19.33 21.63 19.72 21.42 20.06C20.73 21.22 19.46 22 18 22C16.97 22 16.04 21.61 15.34 20.97C15.04 20.71 14.78 20.4 14.58 20.06C14.21 19.46 14 18.75 14 18C14 16.92 14.43 15.93 15.13 15.21C15.86 14.46 16.88 14 18 14C19.18 14 20.25 14.51 20.97 15.33C21.61 16.04 22 16.98 22 18Z"
                                          stroke="none"
                                          stroke-width="1.5"
                                          stroke-miterlimit="10"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                        <path
                                          d="M20.5 15.5001L15.5 20.5001"
                                          stroke="none"
                                          stroke-width="1.5"
                                          stroke-miterlimit="10"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </svg>
                                    </div>
                                    <span>Block User</span>
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
                                    <span>Report User</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="noti-desc">
                      <p>Enter your message description here...</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Featuredboys />
    </div>
  );
};

export default NotificationPage;
  