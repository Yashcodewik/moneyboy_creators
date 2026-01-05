"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const FollowersPage = () => {
  const [follow, setFollow] = useState<"Following" | "Followers">("Followers");
  const [openMoreId, setOpenMoreId] = useState<number | null>(null);
  const moreRef = useRef<HTMLDivElement | null>(null);
  const [selectedOption, setSelectedOption] = useState("All Time");
  const [tab, setTab] = useState(false);
  const router = useRouter();
  const toggleMore = (id: number) => {
    setOpenMoreId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setOpenMoreId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTabChange = (value: string) => {
    setSelectedOption(value);
    setTab(false);
  };

  return (
    <div className="moneyboy-page-content-container">
      <main className="moneyboy-dynamic-content-layout">
        <div className="moneyboy-2x-1x-layout-container">
          <div className="moneyboy-2x-1x-a-layout">
            <div
              className="moneyboy-feed-page-container moneyboy-diff-content-wrappers"
              data-multiple-tabs-section
              data-scroll-zero
              data-identifier="1"
            >
              <div
                className="moneyboy-feed-page-cate-buttons card"
                id="posts-tabs-btn-card"
              >
                <button
                  className="cate-back-btn active-down-effect"
                  onClick={() => router.push("/feed")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9.57 5.92999L3.5 12L9.57 18.07"
                      stroke="none"
                      strokeWidth="2.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.4999 12H3.66992"
                      stroke="none"
                      strokeWidth="2.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  className={`page-content-type-button active-down-effect ${
                    follow === "Followers" ? "active" : ""
                  }`}
                  data-multi-tabs-switch-btndata__active
                  data-identifier="1"
                  onClick={() => setFollow("Followers")}
                >
                  Followers
                </button>
                <button
                  className={`page-content-type-button active-down-effect ${
                    follow === "Following" ? "active" : ""
                  }`}
                  data-multi-tabs-switch-btn
                  data-identifier="1"
                  onClick={() => setFollow("Following")}
                >
                  Following
                </button>
              </div>

              {follow === "Followers" && (
                <div
                  data-multi-tabs-content-tabdata__active
                  data-identifier="1"
                >
                  <div className="card filters-card-layout-wrapper">
                    <div className="tabs-content-wrapper-layout">
                      <div>
                        <div className="creator-content-filter-grid-container">
                          <div className="search-features-grid-btns has-multi-tabs-btns one-row-content-wrapper">
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
                                    onClick={() => setTab((prev) => !prev)}
                                  >
                                    <div className="custom-select-icon-txt">
                                      <span className="custom-select-label-txt">
                                        {selectedOption}
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
                                  {tab && (
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
                                            <li
                                              className="custom-select-option"
                                              onClick={() => {
                                                handleTabChange("Option 1");
                                              }}
                                            >
                                              <span> Option 1</span>
                                            </li>
                                            <li
                                              className="custom-select-option"
                                              onClick={() => {
                                                handleTabChange("Option 2");
                                              }}
                                            >
                                              <span> Option 2</span>
                                            </li>
                                            <li
                                              className="custom-select-option"
                                              onClick={() => {
                                                handleTabChange("Option 3");
                                              }}
                                            >
                                              <span> Option 3</span>
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
                          <div className="creator-content-cards-wrapper  ">
                            <div className="rel-users-wrapper" ref={moreRef}>
                              <div className="rel-user-box">
                                <div className="rel-user-profile-action">
                                  <div className="rel-user-profile">
                                    <div className="profile-card">
                                      <a
                                        href="#"
                                        className="profile-card__main"
                                      >
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
                                            @zainschleifer
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                  <div className="rel-user-actions">
                                    <div className="rel-user-action-btn">
                                      <button className="btn-txt-gradient">
                                        <span>Follow Back</span>
                                      </button>
                                    </div>
                                    <div
                                      className="rel-user-more-opts-wrapper"
                                      data-more-actions-toggle-element
                                    >
                                      <button
                                        className="rel-user-more-opts-trigger-icon"
                                        onClick={() => toggleMore(1)}
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
                                      {openMoreId === 1 && (
                                        <div className="rel-users-more-opts-popup-wrapper">
                                          <div className="rel-users-more-opts-popup-container">
                                            <ul>
                                              <li>
                                                <div className="icon share-icon">
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                  >
                                                    <path
                                                      d="M16.4405 8.90002C20.0405 9.21002 21.5105 11.06 21.5105 15.11V15.24C21.5105 19.71 19.7205 21.5 15.2505 21.5H8.74047C4.27047 21.5 2.48047 19.71 2.48047 15.24V15.11C2.48047 11.09 3.93047 9.24002 7.47047 8.91002"
                                                      stroke="none"
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                    <path
                                                      d="M12 15V3.62"
                                                      stroke="none"
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                    <path
                                                      d="M15.3484 5.85L11.9984 2.5L8.64844 5.85"
                                                      stroke="none"
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                  </svg>
                                                </div>
                                                <span>Share @rubenkenter</span>
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
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                    <path
                                                      d="M10.4102 19.13C12.9302 20.71 15.0002 19.56 15.0002 16.59V12.95"
                                                      stroke="none"
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                    <path
                                                      d="M18.81 9.41998C19.71 11.57 19.44 14.08 18 16"
                                                      stroke="none"
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                    <path
                                                      d="M21.1481 7.79999C22.6181 11.29 22.1781 15.37 19.8281 18.5"
                                                      stroke="none"
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                    <path
                                                      d="M22 2L2 22"
                                                      stroke="none"
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                  </svg>
                                                </div>
                                                <span> Mute </span>
                                              </li>
                                              <li>
                                                <div className="icon remove-icon">
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
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                    <path
                                                      d="M3.41016 22C3.41016 18.13 7.26015 15 12.0002 15C12.9602 15 13.8902 15.13 14.7602 15.37"
                                                      stroke="none"
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                    <path
                                                      d="M22 18C22 18.32 21.96 18.63 21.88 18.93C21.79 19.33 21.63 19.72 21.42 20.06C20.73 21.22 19.46 22 18 22C16.97 22 16.04 21.61 15.34 20.97C15.04 20.71 14.78 20.4 14.58 20.06C14.21 19.46 14 18.75 14 18C14 16.92 14.43 15.93 15.13 15.21C15.86 14.46 16.88 14 18 14C19.18 14 20.25 14.51 20.97 15.33C21.61 16.04 22 16.98 22 18Z"
                                                      stroke="none"
                                                      strokeWidth="1.5"
                                                      strokeMiterlimit="10"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                    <path
                                                      d="M19.0319 16.94L16.9219 19.05"
                                                      stroke="none"
                                                      strokeWidth="1.5"
                                                      strokeMiterlimit="10"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                    <path
                                                      d="M16.9414 16.96L19.0614 19.07"
                                                      stroke="none"
                                                      strokeWidth="1.5"
                                                      strokeMiterlimit="10"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                  </svg>
                                                </div>
                                                <span>
                                                  Remove this follower
                                                </span>
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
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                    <path
                                                      d="M3.41016 22C3.41016 18.13 7.26015 15 12.0002 15C12.9602 15 13.8902 15.13 14.7602 15.37"
                                                      stroke="none"
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                    <path
                                                      d="M22 18C22 18.32 21.96 18.63 21.88 18.93C21.79 19.33 21.63 19.72 21.42 20.06C20.73 21.22 19.46 22 18 22C16.97 22 16.04 21.61 15.34 20.97C15.04 20.71 14.78 20.4 14.58 20.06C14.21 19.46 14 18.75 14 18C14 16.92 14.43 15.93 15.13 15.21C15.86 14.46 16.88 14 18 14C19.18 14 20.25 14.51 20.97 15.33C21.61 16.04 22 16.98 22 18Z"
                                                      stroke="none"
                                                      strokeWidth="1.5"
                                                      strokeMiterlimit="10"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                    <path
                                                      d="M20.5 15.5001L15.5 20.5001"
                                                      stroke="none"
                                                      strokeWidth="1.5"
                                                      strokeMiterlimit="10"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                  </svg>
                                                </div>
                                                <span>Block @rubenkenter</span>
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
                                                      strokeWidth="1.5"
                                                      strokeMiterlimit="10"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                    <path
                                                      d="M5.14844 4H16.3484C19.0484 4 19.6484 5.5 17.7484 7.4L16.5484 8.6C15.7484 9.4 15.7484 10.7 16.5484 11.4L17.7484 12.6C19.6484 14.5 18.9484 16 16.3484 16H5.14844"
                                                      stroke="none"
                                                      strokeWidth="1.5"
                                                      strokeMiterlimit="10"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                  </svg>
                                                </div>
                                                <span>Report @rubenkenter</span>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="rel-user-desc">
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua
                                  </p>
                                </div>
                              </div>

                              <div className="rel-user-box">
                                <div className="rel-user-profile-action">
                                  <div className="rel-user-profile">
                                    <div className="profile-card">
                                      <a
                                        href="#"
                                        className="profile-card__main"
                                      >
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
                                          </div>
                                          <div className="profile-card__username">
                                            @gustavostanton
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                  <div className="rel-user-actions">
                                    <div className="rel-user-action-btn">
                                      <button className="btn-txt-gradient btn-grey">
                                        <span>Following</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="rel-user-box">
                                <div className="rel-user-profile-action">
                                  <div className="rel-user-profile">
                                    <div className="profile-card">
                                      <a
                                        href="#"
                                        className="profile-card__main"
                                      >
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
                                      </a>
                                    </div>
                                  </div>
                                  <div className="rel-user-actions">
                                    <div className="rel-user-action-btn">
                                      <button className="btn-txt-gradient">
                                        <span>Follow Back</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="rel-user-desc">
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do
                                  </p>
                                </div>
                              </div>
                              <div className="rel-user-box">
                                <div className="rel-user-profile-action">
                                  <div className="rel-user-profile">
                                    <div className="profile-card">
                                      <a
                                        href="#"
                                        className="profile-card__main"
                                      >
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
                                      </a>
                                    </div>
                                  </div>
                                  <div className="rel-user-actions">
                                    <div className="rel-user-action-btn">
                                      <button className="btn-txt-gradient btn-grey">
                                        <span>Following</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="rel-user-box">
                                <div className="rel-user-profile-action">
                                  <div className="rel-user-profile">
                                    <div className="profile-card">
                                      <a
                                        href="#"
                                        className="profile-card__main"
                                      >
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
                                          </div>
                                          <div className="profile-card__username">
                                            @wilsonseptimus
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                  <div className="rel-user-actions">
                                    <div className="rel-user-action-btn">
                                      <button className="btn-txt-gradient">
                                        <span>Follow Back</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="rel-user-box">
                                <div className="rel-user-profile-action">
                                  <div className="rel-user-profile">
                                    <div className="profile-card">
                                      <a
                                        href="#"
                                        className="profile-card__main"
                                      >
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
                                      </a>
                                    </div>
                                  </div>
                                  <div className="rel-user-actions">
                                    <div className="rel-user-action-btn">
                                      <button className="btn-txt-gradient">
                                        <span>Follow Back</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="rel-user-box">
                                <div className="rel-user-profile-action">
                                  <div className="rel-user-profile">
                                    <div className="profile-card">
                                      <a
                                        href="#"
                                        className="profile-card__main"
                                      >
                                        <div className="profile-card__avatar-settings">
                                          <div className="profile-card__avatar">
                                            <img
                                              src="/images/profile-avatars/profile-avatar-13.jpg"
                                              alt="MoneyBoy Social Profile Avatar"
                                            />
                                          </div>
                                        </div>
                                        <div className="profile-card__info">
                                          <div className="profile-card__name-badge">
                                            <div className="profile-card__name">
                                              Dorian F. Gray
                                            </div>
                                          </div>
                                          <div className="profile-card__username">
                                            @doriangray
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="rel-user-desc">
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do
                                  </p>
                                </div>
                              </div>
                              <div className="rel-user-box">
                                <div className="rel-user-profile-action">
                                  <div className="rel-user-profile">
                                    <div className="profile-card">
                                      <a
                                        href="#"
                                        className="profile-card__main"
                                      >
                                        <div className="profile-card__avatar-settings">
                                          <div className="profile-card__avatar">
                                            <img
                                              src="/images/profile-avatars/profile-avatar-15.jpg"
                                              alt="MoneyBoy Social Profile Avatar"
                                            />
                                          </div>
                                        </div>
                                        <div className="profile-card__info">
                                          <div className="profile-card__name-badge">
                                            <div className="profile-card__name">
                                              Pippins McGray
                                            </div>
                                            <div className="profile-card__badge">
                                              <img
                                                src="/images/logo/profile-badge.png"
                                                alt="MoneyBoy Social Profile Badge"
                                              />
                                            </div>
                                          </div>
                                          <div className="profile-card__username">
                                            @pippinsmcGray
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                  <div className="rel-user-actions">
                                    <div className="rel-user-action-btn">
                                      <button className="btn-txt-gradient">
                                        <span>Follow Back</span>
                                      </button>
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
              )}

              {follow === "Following" && (
                <div data-multi-tabs-content-tab data-identifier="1">
                  <div className="card filters-card-layout-wrapper">
                    <div className="tabs-content-wrapper-layout">
                      <div>
                        <div className="creator-content-filter-grid-container">
                          <div className="search-features-grid-btns has-multi-tabs-btns one-row-content-wrapper">
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
                                  {/* <div className="custom-select-options-dropdown-wrapper" data-custom-select-dropdown>
                                      <div className="custom-select-options-dropdown-container">
                                        <div className="custom-select-options-lists-container">
                                          <ul className="custom-select-options-list" data-custom-select-options-list>
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
                                    </div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="creator-content-cards-wrapper ">
                            <div className="rel-users-wrapper">
                              <div className="rel-user-box">
                                <div className="rel-user-profile-action">
                                  <div className="rel-user-profile">
                                    <div className="profile-card">
                                      <a
                                        href="#"
                                        className="profile-card__main"
                                      >
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
                                          </div>
                                          <div className="profile-card__username">
                                            @wilsonseptimus
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                  <div className="rel-user-actions">
                                    <div className="rel-user-action-btn">
                                      <button
                                        className="btn-txt-gradient btn-grey"
                                        data-following-btn
                                      >
                                        <span>Following</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="rel-user-box">
                                <div className="rel-user-profile-action">
                                  <div className="rel-user-profile">
                                    <div className="profile-card">
                                      <a
                                        href="#"
                                        className="profile-card__main"
                                      >
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
                                          </div>
                                          <div className="profile-card__username">
                                            @rubenkenter
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                  <div className="rel-user-actions">
                                    <div className="rel-user-action-btn">
                                      <button
                                        className="btn-txt-gradient btn-grey"
                                        data-following-btn
                                      >
                                        <span>Following</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="rel-user-box">
                                <div className="rel-user-profile-action">
                                  <div className="rel-user-profile">
                                    <div className="profile-card">
                                      <a
                                        href="#"
                                        className="profile-card__main"
                                      >
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
                                      </a>
                                    </div>
                                  </div>
                                  <div className="rel-user-actions">
                                    <div className="rel-user-action-btn">
                                      <button
                                        className="btn-txt-gradient btn-grey"
                                        data-following-btn
                                      >
                                        <span>Following</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="rel-user-desc">
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do
                                  </p>
                                </div>
                              </div>
                              <div className="rel-user-box">
                                <div className="rel-user-profile-action">
                                  <div className="rel-user-profile">
                                    <div className="profile-card">
                                      <a
                                        href="#"
                                        className="profile-card__main"
                                      >
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
                                          </div>
                                          <div className="profile-card__username">
                                            @omardokidis
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                  <div className="rel-user-actions">
                                    <div className="rel-user-action-btn">
                                      <button
                                        className="btn-txt-gradient btn-grey"
                                        data-following-btn
                                      >
                                        <span>Following</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="rel-user-box">
                                <div className="rel-user-profile-action">
                                  <div className="rel-user-profile">
                                    <div className="profile-card">
                                      <a
                                        href="#"
                                        className="profile-card__main"
                                      >
                                        <div className="profile-card__avatar-settings">
                                          <div className="profile-card__avatar">
                                            <img
                                              src="/images/profile-avatars/profile-avatar-13.jpg"
                                              alt="MoneyBoy Social Profile Avatar"
                                            />
                                          </div>
                                        </div>
                                        <div className="profile-card__info">
                                          <div className="profile-card__name-badge">
                                            <div className="profile-card__name">
                                              Dorian F. Gray
                                            </div>
                                            <div className="profile-card__badge">
                                              <img
                                                src="/images/logo/profile-badge.png"
                                                alt="MoneyBoy Social Profile Badge"
                                              />
                                            </div>
                                          </div>
                                          <div className="profile-card__username">
                                            @doriangray
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                  <div className="rel-user-actions">
                                    <div className="rel-user-action-btn">
                                      <button
                                        className="btn-txt-gradient btn-grey"
                                        data-following-btn
                                      >
                                        <span>Following</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="rel-user-desc">
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do
                                  </p>
                                </div>
                              </div>
                              <div className="rel-user-box">
                                <div className="rel-user-profile-action">
                                  <div className="rel-user-profile">
                                    <div className="profile-card">
                                      <a
                                        href="#"
                                        className="profile-card__main"
                                      >
                                        <div className="profile-card__avatar-settings">
                                          <div className="profile-card__avatar">
                                            <img
                                              src="/images/profile-avatars/profile-avatar-15.jpg"
                                              alt="MoneyBoy Social Profile Avatar"
                                            />
                                          </div>
                                        </div>
                                        <div className="profile-card__info">
                                          <div className="profile-card__name-badge">
                                            <div className="profile-card__name">
                                              Pippins McGray
                                            </div>
                                            <div className="profile-card__badge">
                                              <img
                                                src="/images/logo/profile-badge.png"
                                                alt="MoneyBoy Social Profile Badge"
                                              />
                                            </div>
                                          </div>
                                          <div className="profile-card__username">
                                            @pippinsmcGray
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                  <div className="rel-user-actions">
                                    <div className="rel-user-action-btn">
                                      <button
                                        className="btn-txt-gradient btn-grey"
                                        data-following-btn
                                      >
                                        <span>Following</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="rel-user-box">
                                <div className="rel-user-profile-action">
                                  <div className="rel-user-profile">
                                    <div className="profile-card">
                                      <a
                                        href="#"
                                        className="profile-card__main"
                                      >
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
                                          </div>
                                          <div className="profile-card__username">
                                            @zainschleifer
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                  <div className="rel-user-actions">
                                    <div className="rel-user-action-btn">
                                      <button
                                        className="btn-txt-gradient btn-grey"
                                        data-following-btn
                                      >
                                        <span>Following</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="rel-user-desc">
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua
                                  </p>
                                </div>
                              </div>
                              <div className="rel-user-box">
                                <div className="rel-user-profile-action">
                                  <div className="rel-user-profile">
                                    <div className="profile-card">
                                      <a
                                        href="#"
                                        className="profile-card__main"
                                      >
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
                                      </a>
                                    </div>
                                  </div>
                                  <div className="rel-user-actions">
                                    <div className="rel-user-action-btn">
                                      <button
                                        className="btn-txt-gradient btn-grey"
                                        data-following-btn
                                      >
                                        <span>Following</span>
                                      </button>
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
              )}
            </div>
          </div>

          <aside className="moneyboy-2x-1x-b-layout">
            <div className="moneyboy-feed-sidebar-container">
              <div className="featured-profiles-card-container trending-profiles-card-container card">
                <div className="featured-profiles-header">
                  <div className="featured-card-heading">
                    <h3 className="card-heading">Trending Moneyboys</h3>
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
                        ></path>
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
                        ></path>
                        <path
                          d="M13.26 16.03L9.74001 12.5L13.26 8.97"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
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
                        ></path>
                        <path
                          d="M10.74 16.03L14.26 12.5L10.74 8.97"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="featured-profiles-wrapper rel-users-wrapper">
                  <div className="rel-user-box">
                    <div className="rel-user-profile-action">
                      <div className="rel-user-profile">
                        <div className="profile-card">
                          <a href="#" className="profile-card__main">
                            <div className="profile-card__avatar-settings">
                              <div className="profile-card__avatar">
                                <img
                                  src="/images/profile-avatars/profile-avatar-16.jpg"
                                  alt="MoneyBoy Social Profile Avatar"
                                />
                              </div>
                            </div>
                            <div className="profile-card__info">
                              <div className="profile-card__name-badge">
                                <div className="profile-card__name">
                                  Jamir Lewis
                                </div>
                                <div className="profile-card__badge">
                                  <img
                                    src="/images/logo/profile-badge.png"
                                    alt="MoneyBoy Social Profile Badge"
                                  />
                                </div>
                              </div>
                              <div className="profile-card__username">
                                @jamirlewis
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="rel-user-actions">
                        <div className="rel-user-action-btn">
                          <button className="btn-txt-gradient">
                            <span>Follow</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rel-user-box">
                    <div className="rel-user-profile-action">
                      <div className="rel-user-profile">
                        <div className="profile-card">
                          <a href="#" className="profile-card__main">
                            <div className="profile-card__avatar-settings">
                              <div className="profile-card__avatar">
                                <img
                                  src="/images/profile-avatars/profile-avatar-17.jpg"
                                  alt="MoneyBoy Social Profile Avatar"
                                />
                              </div>
                            </div>
                            <div className="profile-card__info">
                              <div className="profile-card__name-badge">
                                <div className="profile-card__name">
                                  Karsyn Snow
                                </div>
                                <div className="profile-card__badge">
                                  <img
                                    src="/images/logo/profile-badge.png"
                                    alt="MoneyBoy Social Profile Badge"
                                  />
                                </div>
                              </div>
                              <div className="profile-card__username">
                                @karsynsnow
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="rel-user-actions">
                        <div className="rel-user-action-btn">
                          <button className="btn-txt-gradient">
                            <span>Follow</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rel-user-box">
                    <div className="rel-user-profile-action">
                      <div className="rel-user-profile">
                        <div className="profile-card">
                          <a href="#" className="profile-card__main">
                            <div className="profile-card__avatar-settings">
                              <div className="profile-card__avatar">
                                <img
                                  src="/images/profile-avatars/profile-avatar-19.jpg"
                                  alt="MoneyBoy Social Profile Avatar"
                                />
                              </div>
                            </div>
                            <div className="profile-card__info">
                              <div className="profile-card__name-badge">
                                <div className="profile-card__name">
                                  Trenton Shah
                                </div>
                                <div className="profile-card__badge">
                                  <img
                                    src="/images/logo/profile-badge.png"
                                    alt="MoneyBoy Social Profile Badge"
                                  />
                                </div>
                              </div>
                              <div className="profile-card__username">
                                @trentonshah
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="rel-user-actions">
                        <div className="rel-user-action-btn">
                          <button className="btn-txt-gradient">
                            <span>Follow</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rel-user-box">
                    <div className="rel-user-profile-action">
                      <div className="rel-user-profile">
                        <div className="profile-card">
                          <a href="#" className="profile-card__main">
                            <div className="profile-card__avatar-settings">
                              <div className="profile-card__avatar">
                                <img
                                  src="/images/profile-avatars/profile-avatar-20.jpg"
                                  alt="MoneyBoy Social Profile Avatar"
                                />
                              </div>
                            </div>
                            <div className="profile-card__info">
                              <div className="profile-card__name-badge">
                                <div className="profile-card__name">
                                  Rylee Lowe
                                </div>
                                <div className="profile-card__badge">
                                  <img
                                    src="/images/logo/profile-badge.png"
                                    alt="MoneyBoy Social Profile Badge"
                                  />
                                </div>
                              </div>
                              <div className="profile-card__username">
                                @ryleelowe
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="rel-user-actions">
                        <div className="rel-user-action-btn">
                          <button className="btn-txt-gradient">
                            <span>Follow</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rel-user-box">
                    <div className="rel-user-profile-action">
                      <div className="rel-user-profile">
                        <div className="profile-card">
                          <a href="#" className="profile-card__main">
                            <div className="profile-card__avatar-settings">
                              <div className="profile-card__avatar">
                                <img
                                  src="/images/profile-avatars/profile-avatar-18.jpg"
                                  alt="MoneyBoy Social Profile Avatar"
                                />
                              </div>
                            </div>
                            <div className="profile-card__info">
                              <div className="profile-card__name-badge">
                                <div className="profile-card__name">
                                  Leila Beard
                                </div>
                                <div className="profile-card__badge">
                                  <img
                                    src="/images/logo/profile-badge.png"
                                    alt="MoneyBoy Social Profile Badge"
                                  />
                                </div>
                              </div>
                              <div className="profile-card__username">
                                @leilabeard
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="rel-user-actions">
                        <div className="rel-user-action-btn">
                          <button className="btn-txt-gradient">
                            <span>Follow</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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

export default FollowersPage;
