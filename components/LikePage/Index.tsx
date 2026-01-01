"use client";
import React, { useEffect, useState } from "react";

const Likepage = () => {
  const [like, setlike] = useState(false);
  const [video, setVideo] = useState(false);
  const [photos, setPhotos] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("posts");
  useEffect(() => {
    const likeButtons = document.querySelectorAll("[data-like-button]");

    const handleClick = (event: Event) => {
      const button = event.currentTarget as HTMLElement;
      button.classList.toggle("liked");
    };

    likeButtons.forEach((button) => {
      button.addEventListener("click", handleClick);
    });

    // Cleanup function
    return () => {
      likeButtons.forEach((button) => {
        button.removeEventListener("click", handleClick);
      });
    };
  }, []);
  const toggleMenu = (id: number) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  return (
    <div className="moneyboy-page-content-container">
      <main className="moneyboy-dynamic-content-layout">
        <div className="moneyboy-2x-1x-layout-container">
          <div className="moneyboy-2x-1x-a-layout">
            <div
              className="moneyboy-feed-page-container"
              data-multiple-tabs-section
              data-scroll-zero
            >
              <div
                className="moneyboy-feed-page-cate-buttons card"
                id="posts-tabs-btn-card"
              >
                <button
                  className={`page-content-type-button active-down-effect ${
                    activeTab === "posts" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("posts")}
                >
                  Posts
                </button>
                <button
                  className={`page-content-type-button active-down-effect ${
                    activeTab === "videos" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("videos")}
                >
                  Videos
                </button>
                <button
                  className={`page-content-type-button active-down-effect ${
                    activeTab === "photos" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("photos")}
                >
                  Photos
                </button>
              </div>
              {activeTab === "posts" && (
                <div
                  className="moneyboy-posts-wrapper moneyboy-diff-content-wrappers"
                  data-multi-tabs-content-tabdata__active
                >
                  <div className="creator-content-filter-grid-container">
                    <div className="card filters-card-wrapper">
                      <div className="search-features-grid-btns">
                        <div className="creator-content-search-input">
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
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M14 5H20"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M14 8H17"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>

                            <input
                              type="text"
                              placeholder="Enter keyword here"
                            />
                          </div>
                        </div>
                        <div className="creater-content-filters-layouts">
                          <div className="creator-content-select-filter">
                            <div
                              className="custom-select-element bg-white p-sm size-sm"
                              data-custom-select-element
                              data-custom-select-value
                            >
                              <div
                                className="custom-select-label-wrapper"
                                data-custom-select-triger
                                onClick={() => setlike((prev) => !prev)}
                              >
                                <div className="custom-select-icon-txt">
                                  <span className="custom-select-label-txt">
                                    All Time
                                  </span>
                                </div>
                                <div className="custom-select-chevron">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="24"
                                    viewBox="0 0 25 24"
                                    fill="none"
                                  >
                                    <path
                                      d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95"
                                      stroke="none"
                                      strokeWidth="1.5"
                                      strokeMiterlimit="10"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                              {like && (
                                <div
                                  className="custom-select-options-dropdown-wrapper"
                                  data-custom-select-dropdown
                                >
                                  <div className="custom-select-options-dropdown-container">
                                    <div className="custom-select-options-lists-container">
                                      <ul
                                        className="custom-select-options-list"
                                        data-custom-select-options-list
                                      >
                                        <li className="custom-select-option">
                                          <span> Option 1</span>
                                        </li>
                                        <li className="custom-select-option">
                                          <span> Option 2</span>
                                        </li>
                                        <li className="custom-select-option">
                                          <span> Option 3</span>
                                        </li>
                                        <li className="custom-select-option">
                                          <span> Option 4</span>
                                        </li>
                                      </ul>
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

                  <div className="moneyboy-post__container card">
                    <div className="moneyboy-post__header">
                      <a href="#" className="profile-card">
                        <div className="profile-card__main">
                          <div className="profile-card__avatar-settings">
                            <div className="profile-card__avatar">
                              <img
                                src="/images/profile-avatars/profile-avatar-1.png"
                                alt="MoneyBoy Social Profile Avatar"
                              />
                            </div>
                          </div>
                          <div className="profile-card__info">
                            <div className="profile-card__name-badge">
                              <div className="profile-card__name">
                                Corey Bergson
                              </div>
                              <div className="profile-card__badge">
                                <img
                                  src="/images/logo/profile-badge.png"
                                  alt="MoneyBoy Social Profile Badge"
                                />
                              </div>
                            </div>
                            <div className="profile-card__username">
                              @coreybergson
                            </div>
                          </div>
                        </div>
                      </a>

                      <div className="moneyboy-post__upload-more-info">
                        <div className="moneyboy-post__upload-time">
                          1 Hour ago
                        </div>
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
                                strokeWidth="1.5"
                              ></path>
                              <path
                                d="M19 10.5C17.9 10.5 17 11.4 17 12.5C17 13.6 17.9 14.5 19 14.5C20.1 14.5 21 13.6 21 12.5C21 11.4 20.1 10.5 19 10.5Z"
                                stroke="none"
                                strokeWidth="1.5"
                              ></path>
                              <path
                                d="M12 10.5C10.9 10.5 10 11.4 10 12.5C10 13.6 10.9 14.5 12 14.5C13.1 14.5 14 13.6 14 12.5C14 11.4 13.1 10.5 12 10.5Z"
                                stroke="none"
                                strokeWidth="1.5"
                              ></path>
                            </svg>
                          </button>
                          {openMenuId === 1 && (
                            <div className="rel-users-more-opts-popup-wrapper">
                              <div className="rel-users-more-opts-popup-container">
                                <ul>
                                  <li data-copy-post-link="inset-post-link-here">
                                    <div className="icon copy-link-icon">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                                        ></path>
                                      </svg>
                                    </div>
                                    <span>Copy Link</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="moneyboy-post__desc">
                      <p>
                        Today, I experienced the most blissful ride outside. The
                        air is fresh and It ...
                        <span className="active-down-effect-2x">more</span>
                      </p>
                    </div>

                    <div className="moneyboy-post__media">
                      <div className="moneyboy-post__img">
                        <img
                          src="/images/post-images/post-img-6.jpg"
                          alt="MoneyBoy Post Image"
                        />
                      </div>
                      <div className="moneyboy-post__actions">
                        <ul>
                          <li>
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M9.99 17.98C14.4028 17.98 17.98 14.4028 17.98 9.99C17.98 5.57724 14.4028 2 9.99 2C5.57724 2 2 5.57724 2 9.99C2 14.4028 5.57724 17.98 9.99 17.98Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12.98 19.88C13.88 21.15 15.35 21.98 17.03 21.98C19.76 21.98 21.98 19.76 21.98 17.03C21.98 15.37 21.16 13.9 19.91 13"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M8 11.4C8 12.17 8.6 12.8 9.33 12.8H10.83C11.47 12.8 11.99 12.25 11.99 11.58C11.99 10.85 11.67 10.59 11.2 10.42L8.8 9.58001C8.32 9.41001 8 9.15001 8 8.42001C8 7.75001 8.52 7.20001 9.16 7.20001H10.66C11.4 7.21001 12 7.83001 12 8.60001"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M10 12.85V13.59"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="dollar-sign"
                                  d="M10 6.40997V7.18997"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>Send Tip</span>
                            </a>
                          </li>

                          <li>
                            <a href="#" className="post-like-btn">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>12K</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeMiterlimit="10"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M7 8H17"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M7 13H13"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>15</span>
                            </a>
                          </li>
                        </ul>
                        <ul>
                          <li>
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M5.15002 2V22"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeMiterlimit="10"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M5.15002 4H16.35C19.05 4 19.65 5.5 17.75 7.4L16.55 8.6C15.75 9.4 15.75 10.7 16.55 11.4L17.75 12.6C19.65 14.5 18.95 16 16.35 16H5.15002"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeMiterlimit="10"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </a>
                          </li>

                          <li>
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="moneyboy-post__container card">
                    <div className="moneyboy-post__header">
                      <a href="#" className="profile-card">
                        <div className="profile-card__main">
                          <div className="profile-card__avatar-settings">
                            <div className="profile-card__avatar">
                              <img
                                src="/images/profile-avatars/profile-avatar-4.jpg"
                                alt="MoneyBoy Social Profile Avatar"
                              />
                            </div>
                          </div>
                          <div className="profile-card__info">
                            <div className="profile-card__name-badge">
                              <div className="profile-card__name">
                                Lincoln Westervelt
                              </div>
                              <div className="profile-card__badge">
                                <img
                                  src="/images/logo/profile-badge.png"
                                  alt="MoneyBoy Social Profile Badge"
                                />
                              </div>
                            </div>
                            <div className="profile-card__username">
                              @lincolnwestervelt
                            </div>
                          </div>
                        </div>
                      </a>

                      <div className="moneyboy-post__upload-more-info">
                        <div className="moneyboy-post__upload-time">
                          1 Hour ago
                        </div>
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
                                strokeWidth="1.5"
                              ></path>
                              <path
                                d="M19 10.5C17.9 10.5 17 11.4 17 12.5C17 13.6 17.9 14.5 19 14.5C20.1 14.5 21 13.6 21 12.5C21 11.4 20.1 10.5 19 10.5Z"
                                stroke="none"
                                strokeWidth="1.5"
                              ></path>
                              <path
                                d="M12 10.5C10.9 10.5 10 11.4 10 12.5C10 13.6 10.9 14.5 12 14.5C13.1 14.5 14 13.6 14 12.5C14 11.4 13.1 10.5 12 10.5Z"
                                stroke="none"
                                strokeWidth="1.5"
                              ></path>
                            </svg>
                          </button>
                          {openMenuId === 2 && (
                            <div className="rel-users-more-opts-popup-wrapper">
                              <div className="rel-users-more-opts-popup-container">
                                <ul>
                                  <li data-copy-post-link="inset-post-link-here">
                                    <div className="icon copy-link-icon">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                                        ></path>
                                      </svg>
                                    </div>
                                    <span>Copy Link</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="moneyboy-post__desc">
                      <p>
                        Today, I experienced the most blissful ride outside. The
                        air is fresh and It ...
                        <span className="active-down-effect-2x">more</span>
                      </p>
                    </div>

                    <div className="moneyboy-post__media">
                      <div className="moneyboy-post__img">
                        <img
                          src="/images/post-images/post-img-5.jpg"
                          alt="MoneyBoy Post Image"
                        />
                      </div>
                      <div className="moneyboy-post__actions">
                        <ul>
                          <li>
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M9.99 17.98C14.4028 17.98 17.98 14.4028 17.98 9.99C17.98 5.57724 14.4028 2 9.99 2C5.57724 2 2 5.57724 2 9.99C2 14.4028 5.57724 17.98 9.99 17.98Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12.98 19.88C13.88 21.15 15.35 21.98 17.03 21.98C19.76 21.98 21.98 19.76 21.98 17.03C21.98 15.37 21.16 13.9 19.91 13"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M8 11.4C8 12.17 8.6 12.8 9.33 12.8H10.83C11.47 12.8 11.99 12.25 11.99 11.58C11.99 10.85 11.67 10.59 11.2 10.42L8.8 9.58001C8.32 9.41001 8 9.15001 8 8.42001C8 7.75001 8.52 7.20001 9.16 7.20001H10.66C11.4 7.21001 12 7.83001 12 8.60001"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M10 12.85V13.59"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="dollar-sign"
                                  d="M10 6.40997V7.18997"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>Send Tip</span>
                            </a>
                          </li>

                          <li>
                            <a href="#" className="post-like-btn">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>12K</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeMiterlimit="10"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M7 8H17"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M7 13H13"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>15</span>
                            </a>
                          </li>
                        </ul>
                        <ul>
                          <li>
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M5.15002 2V22"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeMiterlimit="10"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M5.15002 4H16.35C19.05 4 19.65 5.5 17.75 7.4L16.55 8.6C15.75 9.4 15.75 10.7 16.55 11.4L17.75 12.6C19.65 14.5 18.95 16 16.35 16H5.15002"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeMiterlimit="10"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </a>
                          </li>

                          <li>
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="moneyboy-post__container card">
                    <div className="moneyboy-post__header">
                      <a href="#" className="profile-card">
                        <div className="profile-card__main">
                          <div className="profile-card__avatar-settings">
                            <div className="profile-card__avatar">
                              <img
                                src="/images/profile-avatars/profile-avatar-2.jpg"
                                alt="MoneyBoy Social Profile Avatar"
                              />
                            </div>
                          </div>
                          <div className="profile-card__info">
                            <div className="profile-card__name-badge">
                              <div className="profile-card__name">
                                Marcus Botosh
                              </div>
                              <div className="profile-card__badge">
                                <img
                                  src="/images/logo/profile-badge.png"
                                  alt="MoneyBoy Social Profile Badge"
                                />
                              </div>
                            </div>
                            <div className="profile-card__username">
                              @marcusbotosh
                            </div>
                          </div>
                        </div>
                      </a>

                      <div className="moneyboy-post__upload-more-info">
                        <div className="moneyboy-post__upload-time">
                          1 Hour ago
                        </div>
                        <div
                          className="rel-user-more-opts-wrapper"
                          data-more-actions-toggle-element
                        >
                          <button
                            className="rel-user-more-opts-trigger-icon"
                            onClick={() => toggleMenu(3)}
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
                                strokeWidth="1.5"
                              ></path>
                              <path
                                d="M19 10.5C17.9 10.5 17 11.4 17 12.5C17 13.6 17.9 14.5 19 14.5C20.1 14.5 21 13.6 21 12.5C21 11.4 20.1 10.5 19 10.5Z"
                                stroke="none"
                                strokeWidth="1.5"
                              ></path>
                              <path
                                d="M12 10.5C10.9 10.5 10 11.4 10 12.5C10 13.6 10.9 14.5 12 14.5C13.1 14.5 14 13.6 14 12.5C14 11.4 13.1 10.5 12 10.5Z"
                                stroke="none"
                                strokeWidth="1.5"
                              ></path>
                            </svg>
                          </button>

                          {openMenuId === 3 && (
                            <div className="rel-users-more-opts-popup-wrapper">
                              <div className="rel-users-more-opts-popup-container">
                                <ul>
                                  <li data-copy-post-link="inset-post-link-here">
                                    <div className="icon copy-link-icon">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                                        ></path>
                                      </svg>
                                    </div>
                                    <span>Copy Link</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="moneyboy-post__desc">
                      <p>
                        Today, I experienced the most blissful ride outside. The
                        air is fresh and It ...
                        <span className="active-down-effect-2x">more</span>
                      </p>
                    </div>

                    <div className="moneyboy-post__media">
                      <div className="moneyboy-post__img">
                        <img
                          src="/images/post-images/post-img-4.jpg"
                          alt="MoneyBoy Post Image"
                        />
                      </div>
                      <div className="moneyboy-post__actions">
                        <ul>
                          <li>
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M9.99 17.98C14.4028 17.98 17.98 14.4028 17.98 9.99C17.98 5.57724 14.4028 2 9.99 2C5.57724 2 2 5.57724 2 9.99C2 14.4028 5.57724 17.98 9.99 17.98Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12.98 19.88C13.88 21.15 15.35 21.98 17.03 21.98C19.76 21.98 21.98 19.76 21.98 17.03C21.98 15.37 21.16 13.9 19.91 13"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M8 11.4C8 12.17 8.6 12.8 9.33 12.8H10.83C11.47 12.8 11.99 12.25 11.99 11.58C11.99 10.85 11.67 10.59 11.2 10.42L8.8 9.58001C8.32 9.41001 8 9.15001 8 8.42001C8 7.75001 8.52 7.20001 9.16 7.20001H10.66C11.4 7.21001 12 7.83001 12 8.60001"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M10 12.85V13.59"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="dollar-sign"
                                  d="M10 6.40997V7.18997"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>Send Tip</span>
                            </a>
                          </li>

                          <li>
                            <a href="#" className="post-like-btn">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>12K</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeMiterlimit="10"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M7 8H17"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M7 13H13"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>15</span>
                            </a>
                          </li>
                        </ul>
                        <ul>
                          <li>
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M5.15002 2V22"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeMiterlimit="10"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M5.15002 4H16.35C19.05 4 19.65 5.5 17.75 7.4L16.55 8.6C15.75 9.4 15.75 10.7 16.55 11.4L17.75 12.6C19.65 14.5 18.95 16 16.35 16H5.15002"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeMiterlimit="10"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </a>
                          </li>

                          <li>
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "videos" && (
                <div
                  className="moneyboy-diff-content-wrappers"
                  data-multi-tabs-content-tab
                >
                  <div>
                    <div className="tabs-content-wrapper-layout">
                      <div data-multi-dem-cards-layout>
                        <div className="creator-content-filter-grid-container">
                          <div className="card filters-card-wrapper">
                            <div className="search-features-grid-btns">
                              <div className="creator-content-search-input">
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
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M14 5H20"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M14 8H17"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>

                                  <input
                                    type="text"
                                    placeholder="Enter keyword here"
                                  />
                                </div>
                              </div>
                              <div className="creater-content-filters-layouts">
                                <div className="creator-content-select-filter">
                                  <div
                                    className="custom-select-element bg-white p-sm size-sm"
                                    data-custom-select-element
                                    data-custom-select-value
                                  >
                                    <div
                                      className="custom-select-label-wrapper"
                                      data-custom-select-triger
                                      onClick={() => setVideo((prev) => !prev)}
                                    >
                                      <div className="custom-select-icon-txt">
                                        <span className="custom-select-label-txt">
                                          All Time
                                        </span>
                                      </div>
                                      <div className="custom-select-chevron">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="25"
                                          height="24"
                                          viewBox="0 0 25 24"
                                          fill="none"
                                        >
                                          <path
                                            d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95"
                                            stroke="none"
                                            strokeWidth="1.5"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </div>
                                    </div>
                                    {video && (
                                    <div
                                      className="custom-select-options-dropdown-wrapper"
                                      data-custom-select-dropdown
                                    >
                                      <div className="custom-select-options-dropdown-container">
                                        <div className="custom-select-options-lists-container">
                                          <ul
                                            className="custom-select-options-list"
                                            data-custom-select-options-list
                                          >
                                            <li className="custom-select-option">
                                              <span> Option 1</span>
                                            </li>
                                            <li className="custom-select-option">
                                              <span> Option 2</span>
                                            </li>
                                            <li className="custom-select-option">
                                              <span> Option 3</span>
                                            </li>
                                            <li className="custom-select-option">
                                              <span> Option 4</span>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    )}
                                  </div>
                                </div>
                                <div
                                  className="creator-content-grid-layout-options"
                                  data-multi-dem-cards-layout-btns
                                >
                                  {/* data__active */}
                                  <button className="creator-content-grid-layout-btn">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <path
                                        d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z"
                                        fill="none"
                                      />
                                      <path
                                        d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z"
                                        fill="none"
                                      />
                                      <path
                                        d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z"
                                        fill="none"
                                      />
                                      <path
                                        d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z"
                                        fill="none"
                                      />
                                    </svg>
                                  </button>
                                  <button className="creator-content-grid-layout-btn">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <path
                                        d="M19.9 13.5H4.1C2.6 13.5 2 14.14 2 15.73V19.77C2 21.36 2.6 22 4.1 22H19.9C21.4 22 22 21.36 22 19.77V15.73C22 14.14 21.4 13.5 19.9 13.5Z"
                                        stroke="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M19.9 2H4.1C2.6 2 2 2.64 2 4.23V8.27C2 9.86 2.6 10.5 4.1 10.5H19.9C21.4 10.5 22 9.86 22 8.27V4.23C22 2.64 21.4 2 19.9 2Z"
                                        stroke="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="creator-content-cards-wrapper multi-dem-cards-wrapper-layout"
                            data-multi-child-grid-layout-wishlist
                            data-2-cols
                          >
                            <div className="creator-content-type-container-wrapper">
                              <div className="creator-media-card card">
                                <div className="creator-media-card__media-wrapper">
                                  <div className="creator-media-card__media">
                                    <img
                                      src="/images/post-images/post-img-10.jpg"
                                      alt="Post Image"
                                    />
                                  </div>
                                  <div className="creator-media-card__overlay">
                                    <div className="creator-media-card__stats">
                                      <div className="creator-media-card__stats-btn wishlist-icon">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                        >
                                          <path
                                            d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                        <span> 13 </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="creator-media-card__stats-overlay">
                                    <div className="creator-media-card__post-stats">
                                      <ul>
                                        <li>
                                          <a href="#" className="post-like-btn">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                            </svg>
                                            <span>12K</span>
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            href="#"
                                            className="post-comment-btn"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                              <path
                                                d="M7 8H17"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                              <path
                                                d="M7 13H13"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                            </svg>
                                            <span>15</span>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="creator-media-card__overlay-profile-wrapper">
                                      <a href="#" className="profile-card">
                                        <div className="profile-card__main">
                                          <div className="profile-card__avatar-settings">
                                            <div className="profile-card__avatar">
                                              <img
                                                src="/images/profile-avatars/profile-avatar-1.png"
                                                alt="MoneyBoy Social Profile Avatar"
                                              />
                                            </div>
                                          </div>
                                          <div className="profile-card__info">
                                            <div className="profile-card__name-badge">
                                              <div className="profile-card__name">
                                                Corey Bergson
                                              </div>
                                              <div className="profile-card__badge">
                                                <img
                                                  src="/images/logo/profile-badge.png"
                                                  alt="MoneyBoy Social Profile Badge"
                                                />
                                              </div>
                                            </div>
                                            <div className="profile-card__username">
                                              @coreybergson
                                            </div>
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="creator-media-card__desc">
                                  <p>
                                    Today, I experienced the most blissful ride
                                    outside.
                                  </p>
                                </div>
                              </div>
                              <div className="creator-media-card card">
                                <div className="creator-media-card__media-wrapper">
                                  <div className="creator-media-card__media">
                                    <img
                                      src="/images/post-images/post-img-7.jpg"
                                      alt="Post Image"
                                    />
                                  </div>
                                  <div className="creator-media-card__overlay">
                                    <div className="creator-media-card__stats">
                                      <div className="creator-media-card__stats-btn wishlist-icon">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                        >
                                          <path
                                            d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                        <span> 13 </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="creator-media-card__stats-overlay">
                                    <div className="creator-media-card__post-stats">
                                      <ul>
                                        <li>
                                          <a href="#" className="post-like-btn">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                            </svg>
                                            <span>12K</span>
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            href="#"
                                            className="post-comment-btn"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                              <path
                                                d="M7 8H17"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                              <path
                                                d="M7 13H13"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                            </svg>
                                            <span>15</span>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="creator-media-card__overlay-profile-wrapper">
                                      <a href="#" className="profile-card">
                                        <div className="profile-card__main">
                                          <div className="profile-card__avatar-settings">
                                            <div className="profile-card__avatar">
                                              <img
                                                src="/images/profile-avatars/profile-avatar-1.png"
                                                alt="MoneyBoy Social Profile Avatar"
                                              />
                                            </div>
                                          </div>
                                          <div className="profile-card__info">
                                            <div className="profile-card__name-badge">
                                              <div className="profile-card__name">
                                                Corey Bergson
                                              </div>
                                              <div className="profile-card__badge">
                                                <img
                                                  src="/images/logo/profile-badge.png"
                                                  alt="MoneyBoy Social Profile Badge"
                                                />
                                              </div>
                                            </div>
                                            <div className="profile-card__username">
                                              @coreybergson
                                            </div>
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="creator-media-card__desc">
                                  <p>
                                    Today, I experienced the most blissful ride
                                    outside.
                                  </p>
                                </div>
                              </div>
                              <div className="creator-media-card card">
                                <div className="creator-media-card__media-wrapper">
                                  <div className="creator-media-card__media">
                                    <img
                                      src="/images/post-images/post-img-9.jpg"
                                      alt="Post Image"
                                    />
                                  </div>
                                  <div className="creator-media-card__overlay">
                                    <div className="creator-media-card__stats">
                                      <div className="creator-media-card__stats-btn wishlist-icon">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                        >
                                          <path
                                            d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                        <span> 13 </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="creator-media-card__stats-overlay">
                                    <div className="creator-media-card__post-stats">
                                      <ul>
                                        <li>
                                          <a href="#" className="post-like-btn">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                            </svg>
                                            <span>12K</span>
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            href="#"
                                            className="post-comment-btn"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                              <path
                                                d="M7 8H17"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                              <path
                                                d="M7 13H13"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                            </svg>
                                            <span>15</span>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="creator-media-card__overlay-profile-wrapper">
                                      <a href="#" className="profile-card">
                                        <div className="profile-card__main">
                                          <div className="profile-card__avatar-settings">
                                            <div className="profile-card__avatar">
                                              <img
                                                src="/images/profile-avatars/profile-avatar-1.png"
                                                alt="MoneyBoy Social Profile Avatar"
                                              />
                                            </div>
                                          </div>
                                          <div className="profile-card__info">
                                            <div className="profile-card__name-badge">
                                              <div className="profile-card__name">
                                                Corey Bergson
                                              </div>
                                              <div className="profile-card__badge">
                                                <img
                                                  src="/images/logo/profile-badge.png"
                                                  alt="MoneyBoy Social Profile Badge"
                                                />
                                              </div>
                                            </div>
                                            <div className="profile-card__username">
                                              @coreybergson
                                            </div>
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="creator-media-card__desc">
                                  <p>
                                    Today, I experienced the most blissful ride
                                    outside.
                                  </p>
                                </div>
                              </div>
                              <div className="creator-media-card card">
                                <div className="creator-media-card__media-wrapper">
                                  <div className="creator-media-card__media">
                                    <img
                                      src="/images/post-images/post-img-8.jpg"
                                      alt="Post Image"
                                    />
                                  </div>
                                  <div className="creator-media-card__overlay">
                                    <div className="creator-media-card__stats">
                                      <div className="creator-media-card__stats-btn wishlist-icon">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                        >
                                          <path
                                            d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                        <span> 13 </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="creator-media-card__stats-overlay">
                                    <div className="creator-media-card__post-stats">
                                      <ul>
                                        <li>
                                          <a href="#" className="post-like-btn">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                            </svg>
                                            <span>12K</span>
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            href="#"
                                            className="post-comment-btn"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                              <path
                                                d="M7 8H17"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                              <path
                                                d="M7 13H13"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                            </svg>
                                            <span>15</span>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="creator-media-card__overlay-profile-wrapper">
                                      <a href="#" className="profile-card">
                                        <div className="profile-card__main">
                                          <div className="profile-card__avatar-settings">
                                            <div className="profile-card__avatar">
                                              <img
                                                src="/images/profile-avatars/profile-avatar-1.png"
                                                alt="MoneyBoy Social Profile Avatar"
                                              />
                                            </div>
                                          </div>
                                          <div className="profile-card__info">
                                            <div className="profile-card__name-badge">
                                              <div className="profile-card__name">
                                                Corey Bergson
                                              </div>
                                              <div className="profile-card__badge">
                                                <img
                                                  src="/images/logo/profile-badge.png"
                                                  alt="MoneyBoy Social Profile Badge"
                                                />
                                              </div>
                                            </div>
                                            <div className="profile-card__username">
                                              @coreybergson
                                            </div>
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="creator-media-card__desc">
                                  <p>
                                    Today, I experienced the most blissful ride
                                    outside.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "photos" && (
                <div
                  className="moneyboy-diff-content-wrappers"
                  data-multi-tabs-content-tab
                >
                  <div>
                    <div className="tabs-content-wrapper-layout">
                      <div data-multi-dem-cards-layout>
                        <div className="creator-content-filter-grid-container">
                          <div className="card filters-card-wrapper">
                            <div className="search-features-grid-btns">
                              <div className="creator-content-search-input">
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
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M14 5H20"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M14 8H17"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>

                                  <input
                                    type="text"
                                    placeholder="Enter keyword here"
                                  />
                                </div>
                              </div>
                              <div className="creater-content-filters-layouts">
                                <div className="creator-content-select-filter">
                                  <div
                                    className="custom-select-element bg-white p-sm size-sm"
                                    data-custom-select-element
                                    data-custom-select-value
                                  >
                                    <div
                                      className="custom-select-label-wrapper"
                                      data-custom-select-triger
                                      onClick={() => setPhotos((prev) => !prev)}
                                    >
                                      <div className="custom-select-icon-txt">
                                        <span className="custom-select-label-txt">
                                          All Time
                                        </span>
                                      </div>
                                      <div className="custom-select-chevron">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="25"
                                          height="24"
                                          viewBox="0 0 25 24"
                                          fill="none"
                                        >
                                          <path
                                            d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95"
                                            stroke="none"
                                            strokeWidth="1.5"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </div>
                                    </div>
                                    {photos && (
                                    <div
                                      className="custom-select-options-dropdown-wrapper"
                                      data-custom-select-dropdown
                                    >
                                      <div className="custom-select-options-dropdown-container">
                                        <div className="custom-select-options-lists-container">
                                          <ul
                                            className="custom-select-options-list"
                                            data-custom-select-options-list
                                          >
                                            <li className="custom-select-option">
                                              <span> Option 1</span>
                                            </li>
                                            <li className="custom-select-option">
                                              <span> Option 2</span>
                                            </li>
                                            <li className="custom-select-option">
                                              <span> Option 3</span>
                                            </li>
                                            <li className="custom-select-option">
                                              <span> Option 4</span>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    )}
                                  </div>
                                </div>
                                <div
                                  className="creator-content-grid-layout-options"
                                  data-multi-dem-cards-layout-btns
                                >
                                  {/* data__active */}
                                  <button className="creator-content-grid-layout-btn">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <path
                                        d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z"
                                        fill="none"
                                      />
                                      <path
                                        d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z"
                                        fill="none"
                                      />
                                      <path
                                        d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z"
                                        fill="none"
                                      />
                                      <path
                                        d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z"
                                        fill="none"
                                      />
                                    </svg>
                                  </button>
                                  <button className="creator-content-grid-layout-btn">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <path
                                        d="M19.9 13.5H4.1C2.6 13.5 2 14.14 2 15.73V19.77C2 21.36 2.6 22 4.1 22H19.9C21.4 22 22 21.36 22 19.77V15.73C22 14.14 21.4 13.5 19.9 13.5Z"
                                        stroke="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M19.9 2H4.1C2.6 2 2 2.64 2 4.23V8.27C2 9.86 2.6 10.5 4.1 10.5H19.9C21.4 10.5 22 9.86 22 8.27V4.23C22 2.64 21.4 2 19.9 2Z"
                                        stroke="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="creator-content-cards-wrapper multi-dem-cards-wrapper-layout"
                            data-multi-child-grid-layout-wishlist
                            data-2-cols
                          >
                            <div className="creator-content-type-container-wrapper">
                              <div className="creator-media-card card">
                                <div className="creator-media-card__media-wrapper">
                                  <div className="creator-media-card__media">
                                    <img
                                      src="/images/post-images/post-img-8.jpg"
                                      alt="Post Image"
                                    />
                                  </div>
                                  <div className="creator-media-card__overlay">
                                    <div className="creator-media-card__stats">
                                      <div className="creator-media-card__stats-btn wishlist-icon">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                        >
                                          <path
                                            d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                        <span> 13 </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="creator-media-card__stats-overlay">
                                    <div className="creator-media-card__post-stats">
                                      <ul>
                                        <li>
                                          <a href="#" className="post-like-btn">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                            </svg>
                                            <span>12K</span>
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            href="#"
                                            className="post-comment-btn"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                              <path
                                                d="M7 8H17"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                              <path
                                                d="M7 13H13"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                            </svg>
                                            <span>15</span>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="creator-media-card__overlay-profile-wrapper">
                                      <a href="#" className="profile-card">
                                        <div className="profile-card__main">
                                          <div className="profile-card__avatar-settings">
                                            <div className="profile-card__avatar">
                                              <img
                                                src="/images/profile-avatars/profile-avatar-1.png"
                                                alt="MoneyBoy Social Profile Avatar"
                                              />
                                            </div>
                                          </div>
                                          <div className="profile-card__info">
                                            <div className="profile-card__name-badge">
                                              <div className="profile-card__name">
                                                Corey Bergson
                                              </div>
                                              <div className="profile-card__badge">
                                                <img
                                                  src="/images/logo/profile-badge.png"
                                                  alt="MoneyBoy Social Profile Badge"
                                                />
                                              </div>
                                            </div>
                                            <div className="profile-card__username">
                                              @coreybergson
                                            </div>
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="creator-media-card__desc">
                                  <p>
                                    Today, I experienced the most blissful ride
                                    outside.
                                  </p>
                                </div>
                              </div>
                              <div className="creator-media-card card">
                                <div className="creator-media-card__media-wrapper">
                                  <div className="creator-media-card__media">
                                    <img
                                      src="/images/post-images/post-img-9.jpg"
                                      alt="Post Image"
                                    />
                                  </div>
                                  <div className="creator-media-card__overlay">
                                    <div className="creator-media-card__stats">
                                      <div className="creator-media-card__stats-btn wishlist-icon">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                        >
                                          <path
                                            d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                        <span> 13 </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="creator-media-card__stats-overlay">
                                    <div className="creator-media-card__post-stats">
                                      <ul>
                                        <li>
                                          <a href="#" className="post-like-btn">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                            </svg>
                                            <span>12K</span>
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            href="#"
                                            className="post-comment-btn"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                              <path
                                                d="M7 8H17"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                              <path
                                                d="M7 13H13"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                            </svg>
                                            <span>15</span>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="creator-media-card__overlay-profile-wrapper">
                                      <a href="#" className="profile-card">
                                        <div className="profile-card__main">
                                          <div className="profile-card__avatar-settings">
                                            <div className="profile-card__avatar">
                                              <img
                                                src="/images/profile-avatars/profile-avatar-1.png"
                                                alt="MoneyBoy Social Profile Avatar"
                                              />
                                            </div>
                                          </div>
                                          <div className="profile-card__info">
                                            <div className="profile-card__name-badge">
                                              <div className="profile-card__name">
                                                Corey Bergson
                                              </div>
                                              <div className="profile-card__badge">
                                                <img
                                                  src="/images/logo/profile-badge.png"
                                                  alt="MoneyBoy Social Profile Badge"
                                                />
                                              </div>
                                            </div>
                                            <div className="profile-card__username">
                                              @coreybergson
                                            </div>
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="creator-media-card__desc">
                                  <p>
                                    Today, I experienced the most blissful ride
                                    outside.
                                  </p>
                                </div>
                              </div>
                              <div className="creator-media-card card">
                                <div className="creator-media-card__media-wrapper">
                                  <div className="creator-media-card__media">
                                    <img
                                      src="/images/post-images/post-img-10.jpg"
                                      alt="Post Image"
                                    />
                                  </div>
                                  <div className="creator-media-card__overlay">
                                    <div className="creator-media-card__stats">
                                      <div className="creator-media-card__stats-btn wishlist-icon">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                        >
                                          <path
                                            d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                        <span> 13 </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="creator-media-card__stats-overlay">
                                    <div className="creator-media-card__post-stats">
                                      <ul>
                                        <li>
                                          <a href="#" className="post-like-btn">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                            </svg>
                                            <span>12K</span>
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            href="#"
                                            className="post-comment-btn"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                              <path
                                                d="M7 8H17"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                              <path
                                                d="M7 13H13"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                            </svg>
                                            <span>15</span>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="creator-media-card__overlay-profile-wrapper">
                                      <a href="#" className="profile-card">
                                        <div className="profile-card__main">
                                          <div className="profile-card__avatar-settings">
                                            <div className="profile-card__avatar">
                                              <img
                                                src="/images/profile-avatars/profile-avatar-1.png"
                                                alt="MoneyBoy Social Profile Avatar"
                                              />
                                            </div>
                                          </div>
                                          <div className="profile-card__info">
                                            <div className="profile-card__name-badge">
                                              <div className="profile-card__name">
                                                Corey Bergson
                                              </div>
                                              <div className="profile-card__badge">
                                                <img
                                                  src="/images/logo/profile-badge.png"
                                                  alt="MoneyBoy Social Profile Badge"
                                                />
                                              </div>
                                            </div>
                                            <div className="profile-card__username">
                                              @coreybergson
                                            </div>
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="creator-media-card__desc">
                                  <p>
                                    Today, I experienced the most blissful ride
                                    outside.
                                  </p>
                                </div>
                              </div>
                              <div className="creator-media-card card">
                                <div className="creator-media-card__media-wrapper">
                                  <div className="creator-media-card__media">
                                    <img
                                      src="/images/post-images/post-img-7.jpg"
                                      alt="Post Image"
                                    />
                                  </div>
                                  <div className="creator-media-card__overlay">
                                    <div className="creator-media-card__stats">
                                      <div className="creator-media-card__stats-btn wishlist-icon">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                        >
                                          <path
                                            d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                        <span> 13 </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="creator-media-card__stats-overlay">
                                    <div className="creator-media-card__post-stats">
                                      <ul>
                                        <li>
                                          <a href="#" className="post-like-btn">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                            </svg>
                                            <span>12K</span>
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            href="#"
                                            className="post-comment-btn"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                              <path
                                                d="M7 8H17"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                              <path
                                                d="M7 13H13"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></path>
                                            </svg>
                                            <span>15</span>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="creator-media-card__overlay-profile-wrapper">
                                      <a href="#" className="profile-card">
                                        <div className="profile-card__main">
                                          <div className="profile-card__avatar-settings">
                                            <div className="profile-card__avatar">
                                              <img
                                                src="/images/profile-avatars/profile-avatar-1.png"
                                                alt="MoneyBoy Social Profile Avatar"
                                              />
                                            </div>
                                          </div>
                                          <div className="profile-card__info">
                                            <div className="profile-card__name-badge">
                                              <div className="profile-card__name">
                                                Corey Bergson
                                              </div>
                                              <div className="profile-card__badge">
                                                <img
                                                  src="/images/logo/profile-badge.png"
                                                  alt="MoneyBoy Social Profile Badge"
                                                />
                                              </div>
                                            </div>
                                            <div className="profile-card__username">
                                              @coreybergson
                                            </div>
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="creator-media-card__desc">
                                  <p>
                                    Today, I experienced the most blissful ride
                                    outside.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <aside className="moneyboy-2x-1x-b-layout">
            <div className="moneyboy-feed-sidebar-container">
              <div className="featured-profiles-card-container card">
                <div className="featured-profiles-header">
                  <div className="featured-card-heading">
                    <h3 className="card-heading">Featured Moneyboys</h3>
                  </div>

                  <div className="featured-card-opts">
                    <button className="icon-btn hover-scale-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                      >
                        <path
                          d="M22 12.5C22 18.02 17.52 22.5 12 22.5C6.48 22.5 3.11 16.94 3.11 16.94M3.11 16.94H7.63M3.11 16.94V21.94M2 12.5C2 6.98 6.44 2.5 12 2.5C18.67 2.5 22 8.06 22 8.06M22 8.06V3.06M22 8.06H17.56"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <button className="icon-btn hover-scale-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                      >
                        <path
                          d="M12 22.5C6.47715 22.5 2 18.0228 2 12.5C2 6.97715 6.47715 2.5 12 2.5C17.5228 2.5 22 6.97715 22 12.5C22 18.0228 17.5228 22.5 12 22.5Z"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.26 16.03L9.74001 12.5L13.26 8.97"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <button className="icon-btn hover-scale-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                      >
                        <path
                          d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.74 16.03L14.26 12.5L10.74 8.97"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="featured-profiles-wrapper">
                  <div className="featured-profile__card">
                    <div className="featured-profile__info-wrapper">
                      <div className="profile-card featured-profile-card">
                        <div className="profile-card__bg-img">
                          <img
                            src="/images/profile-banners/profile-banner-7.png"
                            alt="Featured Profile Background Image"
                          />
                        </div>
                        <div className="profile-card__main">
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
                                Zain Schleifer
                              </div>
                              <div className="profile-card__badge">
                                <img
                                  src="/images/logo/profile-badge.png"
                                  alt="MoneyBoy Social Profile Badge"
                                />
                              </div>
                            </div>
                            <div className="profile-card__username">
                              @coreybergson
                            </div>
                          </div>
                          <div className="profile-card__icon">
                            <div className="profile-card__blur-icon">
                              <button className="like-button" data-like-button>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="21"
                                  viewBox="0 0 20 21"
                                  fill="none"
                                >
                                  <path
                                    d="M10.5166 17.8417C10.2333 17.9417 9.76663 17.9417 9.48329 17.8417C7.06663 17.0167 1.66663 13.575 1.66663 7.74166C1.66663 5.16666 3.74163 3.08333 6.29996 3.08333C7.81663 3.08333 9.15829 3.81666 9.99996 4.95C10.8416 3.81666 12.1916 3.08333 13.7 3.08333C16.2583 3.08333 18.3333 5.16666 18.3333 7.74166C18.3333 13.575 12.9333 17.0167 10.5166 17.8417Z"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="profile-card__desc">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="featured-profile__card">
                    <div className="featured-profile__info-wrapper">
                      <div className="profile-card featured-profile-card">
                        <div className="profile-card__bg-img">
                          <img
                            src="/images/profile-banners/profile-banner-4.jpg"
                            alt="Featured Profile Background Image"
                          />
                        </div>
                        <div className="profile-card__main">
                          <div className="profile-card__avatar-settings">
                            <div className="profile-card__avatar">
                              <img
                                src="/images/profile-avatars/profile-avatar-5.jpg"
                                alt="MoneyBoy Social Profile Avatar"
                              />
                            </div>
                          </div>
                          <div className="profile-card__info">
                            <div className="profile-card__name-badge">
                              <div className="profile-card__name">
                                Gustavo Stanton
                              </div>
                              <div className="profile-card__badge">
                                <img
                                  src="/images/logo/profile-badge.png"
                                  alt="MoneyBoy Social Profile Badge"
                                />
                              </div>
                            </div>
                            <div className="profile-card__username">
                              @gustavostanton
                            </div>
                          </div>
                          <div className="profile-card__icon">
                            <div className="profile-card__blur-icon">
                              <button className="like-button" data-like-button>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="21"
                                  viewBox="0 0 20 21"
                                  fill="none"
                                >
                                  <path
                                    d="M10.5166 17.8417C10.2333 17.9417 9.76663 17.9417 9.48329 17.8417C7.06663 17.0167 1.66663 13.575 1.66663 7.74166C1.66663 5.16666 3.74163 3.08333 6.29996 3.08333C7.81663 3.08333 9.15829 3.81666 9.99996 4.95C10.8416 3.81666 12.1916 3.08333 13.7 3.08333C16.2583 3.08333 18.3333 5.16666 18.3333 7.74166C18.3333 13.575 12.9333 17.0167 10.5166 17.8417Z"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="profile-card__desc">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="featured-profile__card">
                    <div className="featured-profile__info-wrapper">
                      <div className="profile-card featured-profile-card">
                        <div className="profile-card__bg-img">
                          <img
                            src="/images/profile-banners/profile-banner-3.jpg"
                            alt="Featured Profile Background Image"
                          />
                        </div>
                        <div className="profile-card__main">
                          <div className="profile-card__avatar-settings">
                            <div className="profile-card__avatar">
                              <img
                                src="/images/profile-avatars/profile-avatar-3.jpg"
                                alt="MoneyBoy Social Profile Avatar"
                              />
                            </div>
                          </div>
                          <div className="profile-card__info">
                            <div className="profile-card__name-badge">
                              <div className="profile-card__name">
                                Emerson Bator
                              </div>
                              <div className="profile-card__badge">
                                <img
                                  src="/images/logo/profile-badge.png"
                                  alt="MoneyBoy Social Profile Badge"
                                />
                              </div>
                            </div>
                            <div className="profile-card__username">
                              @emersonbator
                            </div>
                          </div>
                          <div className="profile-card__icon">
                            <div className="profile-card__blur-icon">
                              <button className="like-button" data-like-button>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="21"
                                  viewBox="0 0 20 21"
                                  fill="none"
                                >
                                  <path
                                    d="M10.5166 17.8417C10.2333 17.9417 9.76663 17.9417 9.48329 17.8417C7.06663 17.0167 1.66663 13.575 1.66663 7.74166C1.66663 5.16666 3.74163 3.08333 6.29996 3.08333C7.81663 3.08333 9.15829 3.81666 9.99996 4.95C10.8416 3.81666 12.1916 3.08333 13.7 3.08333C16.2583 3.08333 18.3333 5.16666 18.3333 7.74166C18.3333 13.575 12.9333 17.0167 10.5166 17.8417Z"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="profile-card__desc">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="featured-profile__card">
                    <div className="featured-profile__info-wrapper">
                      <div className="profile-card featured-profile-card">
                        <div className="profile-card__bg-img">
                          <img
                            src="/images/profile-banners/profile-banner-2.jpg"
                            alt="Featured Profile Background Image"
                          />
                        </div>
                        <div className="profile-card__main">
                          <div className="profile-card__avatar-settings">
                            <div className="profile-card__avatar">
                              <img
                                src="/images/profile-avatars/profile-avatar-7.jpg"
                                alt="MoneyBoy Social Profile Avatar"
                              />
                            </div>
                          </div>
                          <div className="profile-card__info">
                            <div className="profile-card__name-badge">
                              <div className="profile-card__name">
                                Omar Dokidis
                              </div>
                              <div className="profile-card__badge">
                                <img
                                  src="/images/logo/profile-badge.png"
                                  alt="MoneyBoy Social Profile Badge"
                                />
                              </div>
                            </div>
                            <div className="profile-card__username">
                              @omardokidis
                            </div>
                          </div>
                          <div className="profile-card__icon">
                            <div className="profile-card__blur-icon">
                              <button className="like-button" data-like-button>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="21"
                                  viewBox="0 0 20 21"
                                  fill="none"
                                >
                                  <path
                                    d="M10.5166 17.8417C10.2333 17.9417 9.76663 17.9417 9.48329 17.8417C7.06663 17.0167 1.66663 13.575 1.66663 7.74166C1.66663 5.16666 3.74163 3.08333 6.29996 3.08333C7.81663 3.08333 9.15829 3.81666 9.99996 4.95C10.8416 3.81666 12.1916 3.08333 13.7 3.08333C16.2583 3.08333 18.3333 5.16666 18.3333 7.74166C18.3333 13.575 12.9333 17.0167 10.5166 17.8417Z"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="profile-card__desc">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="featured-profile__card">
                    <div className="featured-profile__info-wrapper">
                      <div className="profile-card featured-profile-card">
                        <div className="profile-card__bg-img">
                          <img
                            src="/images/profile-banners/profile-banner-1.jpg"
                            alt="Featured Profile Background Image"
                          />
                        </div>
                        <div className="profile-card__main">
                          <div className="profile-card__avatar-settings">
                            <div className="profile-card__avatar">
                              <img
                                src="/images/profile-avatars/profile-avatar-2.jpg"
                                alt="MoneyBoy Social Profile Avatar"
                              />
                            </div>
                          </div>
                          <div className="profile-card__info">
                            <div className="profile-card__name-badge">
                              <div className="profile-card__name">
                                Wilson Septimus
                              </div>
                              <div className="profile-card__badge">
                                <img
                                  src="/images/logo/profile-badge.png"
                                  alt="MoneyBoy Social Profile Badge"
                                />
                              </div>
                            </div>
                            <div className="profile-card__username">
                              @wilsonseptimus
                            </div>
                          </div>
                          <div className="profile-card__icon">
                            <div className="profile-card__blur-icon">
                              <button className="like-button" data-like-button>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="21"
                                  viewBox="0 0 20 21"
                                  fill="none"
                                >
                                  <path
                                    d="M10.5166 17.8417C10.2333 17.9417 9.76663 17.9417 9.48329 17.8417C7.06663 17.0167 1.66663 13.575 1.66663 7.74166C1.66663 5.16666 3.74163 3.08333 6.29996 3.08333C7.81663 3.08333 9.15829 3.81666 9.99996 4.95C10.8416 3.81666 12.1916 3.08333 13.7 3.08333C16.2583 3.08333 18.3333 5.16666 18.3333 7.74166C18.3333 13.575 12.9333 17.0167 10.5166 17.8417Z"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="profile-card__desc">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="featured-profile__card">
                    <div className="featured-profile__info-wrapper">
                      <div className="profile-card featured-profile-card">
                        <div className="profile-card__bg-img">
                          <img
                            src="/images/profile-banners/profile-banner-5.jpg"
                            alt="Featured Profile Background Image"
                          />
                        </div>
                        <div className="profile-card__main">
                          <div className="profile-card__avatar-settings">
                            <div className="profile-card__avatar">
                              <img
                                src="/images/profile-avatars/profile-avatar-8.jpg"
                                alt="MoneyBoy Social Profile Avatar"
                              />
                            </div>
                          </div>
                          <div className="profile-card__info">
                            <div className="profile-card__name-badge">
                              <div className="profile-card__name">
                                Ruben Kenter
                              </div>
                              <div className="profile-card__badge">
                                <img
                                  src="/images/logo/profile-badge.png"
                                  alt="MoneyBoy Social Profile Badge"
                                />
                              </div>
                            </div>
                            <div className="profile-card__username">
                              @rubenkenter
                            </div>
                          </div>
                          <div className="profile-card__icon">
                            <div className="profile-card__blur-icon">
                              <button className="like-button" data-like-button>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="21"
                                  viewBox="0 0 20 21"
                                  fill="none"
                                >
                                  <path
                                    d="M10.5166 17.8417C10.2333 17.9417 9.76663 17.9417 9.48329 17.8417C7.06663 17.0167 1.66663 13.575 1.66663 7.74166C1.66663 5.16666 3.74163 3.08333 6.29996 3.08333C7.81663 3.08333 9.15829 3.81666 9.99996 4.95C10.8416 3.81666 12.1916 3.08333 13.7 3.08333C16.2583 3.08333 18.3333 5.16666 18.3333 7.74166C18.3333 13.575 12.9333 17.0167 10.5166 17.8417Z"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="profile-card__desc">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="moneyboy-network-grow-card-wrapper card">
                <a href="#" className="moneyboy-network-grow-card card">
                  <div className="bg-img">
                    <img
                      src="/images/grow-network-bg-image.png"
                      alt="Grow Network By MoneyBoy Social"
                    />
                  </div>
                  <div className="text-logo">
                    <h3>Network</h3>
                    <img
                      src="/images/logo/moneyboy-logo.png"
                      alt="MoneyBoy Social Logo"
                    />
                  </div>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Likepage;
