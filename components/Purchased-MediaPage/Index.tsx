"use client";

import React, { useEffect, useRef, useState } from "react";

const PurchasedMediaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("favorites");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [openDropdown, setOpenDropdown] = useState<
    "status" | "type" | "creator" | "time" | null
  >(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const toggleDropdown = (key: "status" | "type" | "creator" | "time") => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  return (
    <div className="moneyboy-page-content-container">
      <main className="moneyboy-dynamic-content-layout">
        <div className="moneyboy-2x-1x-layout-container">
          <div className="moneyboy-2x-1x-a-layout">
            <div className="pm-page-content-wrapper">
              <div className="pm-page-content-container">
                <div className="pm-page-header-wrapper">
                  <div className="pm-page-header-container card">
                    <div className="pm-page-header-title">
                      <h1>Purchased Media</h1>
                    </div>

                    <div className="pm-page-filters-wrapper">
                      <div className="pm-page-filters-container">
                        <div className="pm-page-filters-search-bar">
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
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M14 5H20"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M14 8H17"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </div>

                              <input
                                type="text"
                                placeholder="Enter keyword here"
                              />
                            </div>
                          </div>
                        </div>

                        <div
                          className="pm-page-select-filters-wrapper"
                          ref={dropdownRef}
                        >
                          <div className="pm-page-select">
                            <div
                              className="custom-select-element"
                              data-custom-select-element
                              data-custom-select-value
                            >
                              <div
                                className="custom-select-label-wrapper"
                                data-custom-select-triger
                                onClick={() => toggleDropdown("status")}
                              >
                                <div className="custom-select-icon-txt">
                                  <span className="custom-select-label-txt">
                                    All Status
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
                                      stroke-width="1.5"
                                      stroke-miterlimit="10"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                              {openDropdown === "status" && (
                                <div
                                  className="custom-select-options-dropdown-wrapper"
                                  data-custom-select-dropdown
                                >
                                  <div className="custom-select-options-dropdown-container">
                                    <div
                                      className="custom-select-options-search"
                                      data-custom-select-options-search
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
                                        <input
                                          type="text"
                                          placeholder="Search here"
                                        />
                                      </div>
                                    </div>
                                    <div className="custom-select-options-lists-container">
                                      <ul
                                        className="custom-select-options-list"
                                        data-custom-select-options-list
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
                              )}
                            </div>
                          </div>
                          <div className="pm-page-select">
                            <div
                              className="custom-select-element"
                              data-custom-select-element
                              data-custom-select-value
                            >
                              <div
                                className="custom-select-label-wrapper"
                                data-custom-select-triger
                                onClick={() => toggleDropdown("type")}
                              >
                                <div className="custom-select-icon-txt">
                                  <span className="custom-select-label-txt">
                                    All Types
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
                                      stroke-width="1.5"
                                      stroke-miterlimit="10"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                              {openDropdown === "type" && (
                                <div
                                  className="custom-select-options-dropdown-wrapper"
                                  data-custom-select-dropdown
                                >
                                  <div className="custom-select-options-dropdown-container">
                                    <div
                                      className="custom-select-options-search"
                                      data-custom-select-options-search
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
                                        <input
                                          type="text"
                                          placeholder="Search here"
                                        />
                                      </div>
                                    </div>
                                    <div className="custom-select-options-lists-container">
                                      <ul
                                        className="custom-select-options-list"
                                        data-custom-select-options-list
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
                              )}
                            </div>
                          </div>
                          <div className="pm-page-select">
                            <div
                              className="custom-select-element"
                              data-custom-select-element
                              data-custom-select-value
                            >
                              <div
                                className="custom-select-label-wrapper"
                                data-custom-select-triger
                                onClick={() => toggleDropdown("creator")}
                              >
                                <div className="custom-select-icon-txt">
                                  <span className="custom-select-label-txt">
                                    All Creators
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
                                      stroke-width="1.5"
                                      stroke-miterlimit="10"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                              {openDropdown === "creator" && (
                                <div
                                  className="custom-select-options-dropdown-wrapper"
                                  data-custom-select-dropdown
                                >
                                  <div className="custom-select-options-dropdown-container">
                                    <div
                                      className="custom-select-options-search"
                                      data-custom-select-options-search
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
                                        <input
                                          type="text"
                                          placeholder="Search here"
                                        />
                                      </div>
                                    </div>
                                    <div className="custom-select-options-lists-container">
                                      <ul
                                        className="custom-select-options-list"
                                        data-custom-select-options-list
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
                              )}
                            </div>
                          </div>
                          <div className="pm-page-select">
                            <div
                              className="custom-select-element"
                              data-custom-select-element
                              data-custom-select-value
                            >
                              <div
                                className="custom-select-label-wrapper"
                                data-custom-select-triger
                                onClick={() => toggleDropdown("time")}
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
                                      stroke-width="1.5"
                                      stroke-miterlimit="10"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                              {openDropdown === "time" && (
                                <div
                                  className="custom-select-options-dropdown-wrapper"
                                  data-custom-select-dropdown
                                >
                                  <div className="custom-select-options-dropdown-container">
                                    <div
                                      className="custom-select-options-search"
                                      data-custom-select-options-search
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
                                        <input
                                          type="text"
                                          placeholder="Search here"
                                        />
                                      </div>
                                    </div>
                                    <div className="custom-select-options-lists-container">
                                      <ul
                                        className="custom-select-options-list"
                                        data-custom-select-options-list
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
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pm-page-hero-wrapper">
                  <div className="pm-page-hero-container ">
                    <div className="hero-type-card-wrapper ">
                      <div className="hero-type-card-container card">
                        <div className="hero-type-card--bg-img">
                          <img
                            src="/images/purchased-media-hero-bg-image.jpg"
                            alt="Store Banner Image"
                          />
                        </div>

                        <div className="hero-type-icons-wrapper">
                          <div className="creator-content-card__stats">
                            <div className="creator-content-stat-box">
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                    stroke="#fff"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                    stroke="#fff"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </svg>
                              </div>

                              <span>12k</span>
                            </div>
                            <div className="creator-content-stat-box ">
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                >
                                  <g clip-path="url(#clip0_4488_3963)">
                                    <path
                                      d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                      fill="white"
                                    ></path>
                                    <path
                                      d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                      fill="white"
                                    ></path>
                                    <path
                                      d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                      fill="white"
                                    ></path>
                                    <path
                                      d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                      fill="white"
                                    ></path>
                                    <path
                                      d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                      fill="white"
                                    ></path>
                                    <path
                                      d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                      fill="white"
                                    ></path>
                                    <path
                                      d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                      fill="white"
                                    ></path>
                                    <path
                                      d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                      fill="white"
                                    ></path>
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_4488_3963">
                                      <rect
                                        width="14"
                                        height="14"
                                        fill="white"
                                      ></rect>
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <span>00:10</span>
                            </div>
                          </div>
                        </div>

                        <div className="hero-type-card--content-container">
                          <h2>Legends Never Miss</h2>

                          <div className="hero-type-card--desc">
                            <p>
                              Step into the arena where precision, teamwork, and
                              reflex decide the next champion.
                            </p>
                          </div>
                          <a href="#" className="btn-txt-gradient btn-outline">
                            <span>Watch Now</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pm-page-multi-tab-content-wrapper">
                  <div className="pm-page-multi-tab-content-container">
                    <div
                      className="multi-tab-section"
                      data-multiple-tabs-section
                    >
                      <div className="multi-tabs-layout-container">
                        <div className="pm-multi-tabs-buttons-wrapper">
                          <div className="multi-tabs-action-buttons">
                            <button
                              className={`multi-tab-switch-btn ${
                                activeTab === "favorites" ? "active" : ""
                              }`}
                              onClick={() => handleTabClick("favorites")}
                            >
                              <span>Favorites</span>
                            </button>
                            <button
                              className={`multi-tab-switch-btn ${
                                activeTab === "continue-watching"
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() =>
                                handleTabClick("continue-watching")
                              }
                            >
                              <span>Continue Watching</span>
                            </button>
                            <button
                              className={`multi-tab-switch-btn ${
                                activeTab === "watch-later" ? "active" : ""
                              }`}
                              onClick={() => handleTabClick("watch-later")}
                            >
                              <span>Watch Later</span>
                            </button>
                            <button
                              className={`multi-tab-switch-btn ${
                                activeTab === "all-media" ? "active" : ""
                              }`}
                              onClick={() => handleTabClick("all-media")}
                            >
                              <span>All Media</span>
                            </button>
                            <button
                              className={`multi-tab-switch-btn ${
                                activeTab === "recently-purchased"
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() =>
                                handleTabClick("recently-purchased")
                              }
                            >
                              <span>Recently Purchased</span>
                            </button>
                            <button
                              className={`multi-tab-switch-btn ${
                                activeTab === "recently-added" ? "active" : ""
                              }`}
                              onClick={() => handleTabClick("recently-added")}
                            >
                              <span>Recently Added Form Subscriptions</span>
                            </button>
                          </div>

                          <a href="#" className="btn-txt-gradient">
                            <span>View All Collection</span>
                          </a>
                        </div>

                        <div className="multi-tabs-content-container content-creator-profile-tabs-layout-wrapper">
                          {activeTab === "favorites" && (
                            <div data-multi-tabs-content-tabdata__active>
                              <div className="pm-page-content-cards-wrapper">
                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-4.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
                                </div>
                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-3.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
                                </div>
                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-2.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
                                </div>
                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-1.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
                                </div>
                              </div>
                            </div>
                          )}
                          {activeTab === "continue-watching" && (
                            <div data-multi-tabs-content-tab>
                              <div className="pm-page-content-cards-wrapper">
                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-2.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
                                </div>
                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-1.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
                                </div>
                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-4.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
                                </div>
                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-3.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
                                </div>
                              </div>
                            </div>
                          )}
                          {activeTab === "watch-later" && (
                            <div data-multi-tabs-content-tab>
                              <div className="pm-page-content-cards-wrapper">
                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-1.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
                                </div>
                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-4.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
                                </div>
                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-3.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
                                </div>
                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-2.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
                                </div>
                              </div>
                            </div>
                          )}
                          {activeTab === "all-media" && (
                            <div data-multi-tabs-content-tab>
                              <div className="pm-page-content-cards-wrapper">
                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-1.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
                                </div>

                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-2.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
                                </div>
                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-4.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
                                </div>

                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-3.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
                                </div>
                              </div>
                            </div>
                          )}
                          {activeTab === "recently-purchased" && (
                            <div data-multi-tabs-content-tab>
                              <div className="pm-page-content-cards-wrapper">
                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-2.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
                                </div>
                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-4.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
                                </div>
                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-3.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
                                </div>
                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-1.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
                                </div>
                              </div>
                            </div>
                          )}
                          {activeTab === "recently-added" && (
                            <div data-multi-tabs-content-tab>
                              <div className="pm-page-content-cards-wrapper">
                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-2.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
                                </div>

                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-3.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
                                </div>
                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-1.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
                                </div>

                                <div className="pm-page-content-card">
                                  <div className="pm-page-card-media-container">
                                    <div className="pm-page-card--img">
                                      <img
                                        src="/images/purchased-media/purchased-media-post-img-4.jpg"
                                        alt="#"
                                      />
                                    </div>

                                    <div className="pm-page-card-icons-wrapper">
                                      <div className="creator-content-card__stats">
                                        <div className="creator-content-stat-box">
                                          <div className="eye-icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                            >
                                              <path
                                                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                                                stroke="none"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                              <path
                                                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              ></path>
                                            </svg>
                                          </div>

                                          <span>12k</span>
                                        </div>
                                        <div className="creator-content-stat-box">
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                            >
                                              <g clip-path="url(#clip0_4488_3963)">
                                                <path
                                                  d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                                                  fill="white"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_4488_3963">
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <span>00:35</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pm-page-card-body">
                                    <h2>Shazam Radiant Ranked – Season 16</h2>
                                  </div>

                                  <div className="pm-page-card-footer">
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PurchasedMediaPage;
