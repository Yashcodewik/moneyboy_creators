"use client";
import React, { useEffect, useState } from "react";

const WishlistPage = () => {
   const [wishlist, setWishlist] = useState(false);

       useEffect(() => {
         const likeButtons = document.querySelectorAll("[data-like-button]");
         
         const handleClick = (event: Event) => {
           const button = event.currentTarget as HTMLElement;
           button.classList.toggle("liked");
         };
         
         likeButtons.forEach(button => {
           button.addEventListener('click', handleClick);
         });
         
         // Cleanup function
         return () => {
           likeButtons.forEach(button => {
             button.removeEventListener('click', handleClick);
           });
         };
       }, []);
  return (
    <div className="moneyboy-page-content-container">
      <main className="moneyboy-dynamic-content-layout">
        <div className="moneyboy-2x-1x-layout-container">
          <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
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
                  className="page-content-type-button active-down-effect"
                  data-multi-tabs-switch-btn
                  data-identifier="1"
                >
                  Moneyboys
                </button>
                <button
                  className="page-content-type-button active-down-effect"
                  data-multi-tabs-switch-btn
                  data-identifier="1"
                >
                  Saved Media
                </button>
              </div>

              <div data-active data-identifier="1">
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
                                    onClick={() => setWishlist((prev) => !prev)}
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
                                  {wishlist && (
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
                                <button
                                  className="creator-content-grid-layout-btn"
                                  data-active
                                >
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
                        >
                          <div className="creator-content-type-container-wrapper">
                            <div
                              className="user-profile-card-wrapper user-profile-card-small"
                              data-creator-profile-card
                            >
                              <div className="user-profile-card-container">
                                <div className="user-profile-card__img">
                                  <img
                                    src="/images/profile-avatars/profile-avatar-11.png"
                                    alt="Discover Profile Avatar"
                                  />
                                </div>

                                <div className="user-profile-content-overlay-container">
                                  <div className="user-profile-card__action-btns">
                                    <div className="user-profile-card__like-btn">
                                      <button
                                        className="like-button"
                                        data-like-button
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="21"
                                          height="20"
                                          viewBox="0 0 21 20"
                                          fill="none"
                                        >
                                          <path
                                            d="M11.2665 17.3417C10.9832 17.4417 10.5165 17.4417 10.2332 17.3417C7.8165 16.5167 2.4165 13.075 2.4165 7.24166C2.4165 4.66666 4.4915 2.58333 7.04984 2.58333C8.5665 2.58333 9.90817 3.31666 10.7498 4.45C11.5915 3.31666 12.9415 2.58333 14.4498 2.58333C17.0082 2.58333 19.0832 4.66666 19.0832 7.24166C19.0832 13.075 13.6832 16.5167 11.2665 17.3417Z"
                                            stroke="none"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>

                                  <div className="user-profile-card__info-container">
                                    <div className="user-profile-card__info">
                                      <div className="user-profile-card__name-badge">
                                        <div className="user-profile-card__name">
                                          Zain Schleifer
                                        </div>
                                        <div className="user-profile-card__badge">
                                          <img
                                            src="/images/logo/profile-badge.png"
                                            alt="MoneyBoy Social Profile Badge"
                                          />
                                        </div>
                                      </div>
                                      <div className="user-profile-card__username">
                                        @zainschleifer
                                      </div>
                                    </div>
                                    <div className="user-profile-card__wishlist-btn">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="21"
                                        height="20"
                                        viewBox="0 0 21 20"
                                        fill="none"
                                      >
                                        <path
                                          d="M14.7666 1.66687H6.73327C4.95827 1.66687 3.5166 3.11687 3.5166 4.88354V16.6252C3.5166 18.1252 4.5916 18.7585 5.90827 18.0335L9.97494 15.7752C10.4083 15.5335 11.1083 15.5335 11.5333 15.7752L15.5999 18.0335C16.9166 18.7669 17.9916 18.1335 17.9916 16.6252V4.88354C17.9833 3.11687 16.5416 1.66687 14.7666 1.66687Z"
                                          stroke="none"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M14.7666 1.66687H6.73327C4.95827 1.66687 3.5166 3.11687 3.5166 4.88354V16.6252C3.5166 18.1252 4.5916 18.7585 5.90827 18.0335L9.97494 15.7752C10.4083 15.5335 11.1083 15.5335 11.5333 15.7752L15.5999 18.0335C16.9166 18.7669 17.9916 18.1335 17.9916 16.6252V4.88354C17.9833 3.11687 16.5416 1.66687 14.7666 1.66687Z"
                                          stroke="none"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M8.4585 7.5415C9.94183 8.08317 11.5585 8.08317 13.0418 7.5415"
                                          stroke="none"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div
                              className="user-profile-card-wrapper user-profile-card-small"
                              data-creator-profile-card
                            >
                              <div className="user-profile-card-container">
                                <div className="user-profile-card__img">
                                  <img
                                    src="/images/profile-avatars/profile-avatar-6.jpg"
                                    alt="Discover Profile Avatar"
                                  />
                                </div>

                                <div className="user-profile-content-overlay-container">
                                  <div className="user-profile-card__action-btns">
                                    <div className="user-profile-card__like-btn">
                                      <button
                                        className="like-button"
                                        data-like-button
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="21"
                                          height="20"
                                          viewBox="0 0 21 20"
                                          fill="none"
                                        >
                                          <path
                                            d="M11.2665 17.3417C10.9832 17.4417 10.5165 17.4417 10.2332 17.3417C7.8165 16.5167 2.4165 13.075 2.4165 7.24166C2.4165 4.66666 4.4915 2.58333 7.04984 2.58333C8.5665 2.58333 9.90817 3.31666 10.7498 4.45C11.5915 3.31666 12.9415 2.58333 14.4498 2.58333C17.0082 2.58333 19.0832 4.66666 19.0832 7.24166C19.0832 13.075 13.6832 16.5167 11.2665 17.3417Z"
                                            stroke="none"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>

                                  <div className="user-profile-card__info-container">
                                    <div className="user-profile-card__info">
                                      <div className="user-profile-card__name-badge">
                                        <div className="user-profile-card__name">
                                          James Baptista
                                        </div>
                                        <div className="user-profile-card__badge">
                                          <img
                                            src="/images/logo/profile-badge.png"
                                            alt="MoneyBoy Social Profile Badge"
                                          />
                                        </div>
                                      </div>
                                      <div className="user-profile-card__username">
                                        @jamesbaptista
                                      </div>
                                    </div>
                                    <div className="user-profile-card__wishlist-btn">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="21"
                                        height="20"
                                        viewBox="0 0 21 20"
                                        fill="none"
                                      >
                                        <path
                                          d="M14.7666 1.66687H6.73327C4.95827 1.66687 3.5166 3.11687 3.5166 4.88354V16.6252C3.5166 18.1252 4.5916 18.7585 5.90827 18.0335L9.97494 15.7752C10.4083 15.5335 11.1083 15.5335 11.5333 15.7752L15.5999 18.0335C16.9166 18.7669 17.9916 18.1335 17.9916 16.6252V4.88354C17.9833 3.11687 16.5416 1.66687 14.7666 1.66687Z"
                                          stroke="none"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M14.7666 1.66687H6.73327C4.95827 1.66687 3.5166 3.11687 3.5166 4.88354V16.6252C3.5166 18.1252 4.5916 18.7585 5.90827 18.0335L9.97494 15.7752C10.4083 15.5335 11.1083 15.5335 11.5333 15.7752L15.5999 18.0335C16.9166 18.7669 17.9916 18.1335 17.9916 16.6252V4.88354C17.9833 3.11687 16.5416 1.66687 14.7666 1.66687Z"
                                          stroke="none"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M8.4585 7.5415C9.94183 8.08317 11.5585 8.08317 13.0418 7.5415"
                                          stroke="none"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="user-profile-card-wrapper user-profile-card-small"
                              data-creator-profile-card
                            >
                              <div className="user-profile-card-container">
                                <div className="user-profile-card__img">
                                  <img
                                    src="/images/profile-avatars/profile-avatar-5.jpg"
                                    alt="Discover Profile Avatar"
                                  />
                                </div>

                                <div className="user-profile-content-overlay-container">
                                  <div className="user-profile-card__action-btns">
                                    <div className="user-profile-card__like-btn">
                                      <button
                                        className="like-button"
                                        data-like-button
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="21"
                                          height="20"
                                          viewBox="0 0 21 20"
                                          fill="none"
                                        >
                                          <path
                                            d="M11.2665 17.3417C10.9832 17.4417 10.5165 17.4417 10.2332 17.3417C7.8165 16.5167 2.4165 13.075 2.4165 7.24166C2.4165 4.66666 4.4915 2.58333 7.04984 2.58333C8.5665 2.58333 9.90817 3.31666 10.7498 4.45C11.5915 3.31666 12.9415 2.58333 14.4498 2.58333C17.0082 2.58333 19.0832 4.66666 19.0832 7.24166C19.0832 13.075 13.6832 16.5167 11.2665 17.3417Z"
                                            stroke="none"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>

                                  <div className="user-profile-card__info-container">
                                    <div className="user-profile-card__info">
                                      <div className="user-profile-card__name-badge">
                                        <div className="user-profile-card__name">
                                          Jaxson Geidt
                                        </div>
                                        <div className="user-profile-card__badge">
                                          <img
                                            src="/images/logo/profile-badge.png"
                                            alt="MoneyBoy Social Profile Badge"
                                          />
                                        </div>
                                      </div>
                                      <div className="user-profile-card__username">
                                        @jaxsongeidt
                                      </div>
                                    </div>
                                    <div className="user-profile-card__wishlist-btn">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="21"
                                        height="20"
                                        viewBox="0 0 21 20"
                                        fill="none"
                                      >
                                        <path
                                          d="M14.7666 1.66687H6.73327C4.95827 1.66687 3.5166 3.11687 3.5166 4.88354V16.6252C3.5166 18.1252 4.5916 18.7585 5.90827 18.0335L9.97494 15.7752C10.4083 15.5335 11.1083 15.5335 11.5333 15.7752L15.5999 18.0335C16.9166 18.7669 17.9916 18.1335 17.9916 16.6252V4.88354C17.9833 3.11687 16.5416 1.66687 14.7666 1.66687Z"
                                          stroke="none"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M14.7666 1.66687H6.73327C4.95827 1.66687 3.5166 3.11687 3.5166 4.88354V16.6252C3.5166 18.1252 4.5916 18.7585 5.90827 18.0335L9.97494 15.7752C10.4083 15.5335 11.1083 15.5335 11.5333 15.7752L15.5999 18.0335C16.9166 18.7669 17.9916 18.1335 17.9916 16.6252V4.88354C17.9833 3.11687 16.5416 1.66687 14.7666 1.66687Z"
                                          stroke="none"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M8.4585 7.5415C9.94183 8.08317 11.5585 8.08317 13.0418 7.5415"
                                          stroke="none"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="user-profile-card-wrapper user-profile-card-small"
                              data-creator-profile-card
                            >
                              <div className="user-profile-card-container">
                                <div className="user-profile-card__img">
                                  <img
                                    src="/images/profile-avatars/profile-avatar-3.jpg"
                                    alt="Discover Profile Avatar"
                                  />
                                </div>

                                <div className="user-profile-content-overlay-container">
                                  <div className="user-profile-card__action-btns">
                                    <div className="user-profile-card__like-btn">
                                      <button
                                        className="like-button"
                                        data-like-button
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="21"
                                          height="20"
                                          viewBox="0 0 21 20"
                                          fill="none"
                                        >
                                          <path
                                            d="M11.2665 17.3417C10.9832 17.4417 10.5165 17.4417 10.2332 17.3417C7.8165 16.5167 2.4165 13.075 2.4165 7.24166C2.4165 4.66666 4.4915 2.58333 7.04984 2.58333C8.5665 2.58333 9.90817 3.31666 10.7498 4.45C11.5915 3.31666 12.9415 2.58333 14.4498 2.58333C17.0082 2.58333 19.0832 4.66666 19.0832 7.24166C19.0832 13.075 13.6832 16.5167 11.2665 17.3417Z"
                                            stroke="none"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>

                                  <div className="user-profile-card__info-container">
                                    <div className="user-profile-card__info">
                                      <div className="user-profile-card__name-badge">
                                        <div className="user-profile-card__name">
                                          Kadin Septimus
                                        </div>
                                        <div className="user-profile-card__badge">
                                          <img
                                            src="/images/logo/profile-badge.png"
                                            alt="MoneyBoy Social Profile Badge"
                                          />
                                        </div>
                                      </div>
                                      <div className="user-profile-card__username">
                                        @kadinseptimus
                                      </div>
                                    </div>
                                    <div className="user-profile-card__wishlist-btn">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="21"
                                        height="20"
                                        viewBox="0 0 21 20"
                                        fill="none"
                                      >
                                        <path
                                          d="M14.7666 1.66687H6.73327C4.95827 1.66687 3.5166 3.11687 3.5166 4.88354V16.6252C3.5166 18.1252 4.5916 18.7585 5.90827 18.0335L9.97494 15.7752C10.4083 15.5335 11.1083 15.5335 11.5333 15.7752L15.5999 18.0335C16.9166 18.7669 17.9916 18.1335 17.9916 16.6252V4.88354C17.9833 3.11687 16.5416 1.66687 14.7666 1.66687Z"
                                          stroke="none"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M14.7666 1.66687H6.73327C4.95827 1.66687 3.5166 3.11687 3.5166 4.88354V16.6252C3.5166 18.1252 4.5916 18.7585 5.90827 18.0335L9.97494 15.7752C10.4083 15.5335 11.1083 15.5335 11.5333 15.7752L15.5999 18.0335C16.9166 18.7669 17.9916 18.1335 17.9916 16.6252V4.88354C17.9833 3.11687 16.5416 1.66687 14.7666 1.66687Z"
                                          stroke="none"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M8.4585 7.5415C9.94183 8.08317 11.5585 8.08317 13.0418 7.5415"
                                          stroke="none"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
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
              </div>

              <div data-multi-tabs-content-tab data-identifier="1">
                <div className="card filters-card-layout-wrapper">
                  <div className="tabs-content-wrapper-layout">
                    <div data-multi-dem-cards-layout>
                      <div
                        className="creator-content-filter-grid-container"
                        data-multiple-tabs-section
                      >
                        <div className="search-features-grid-btns has-multi-tabs-btns">
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
                          <div className="  creator-content-tabs-btn-wrapper">
                            <div className="multi-tabs-action-buttons">
                              <button
                                className="multi-tab-switch-btn videos-btn"
                                data-multi-tabs-switch-btn
                                data-active
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="25"
                                  viewBox="0 0 24 25"
                                  fill="none"
                                >
                                  <path
                                    d="M12.53 20.92H6.21C3.05 20.92 2 18.82 2 16.71V8.29002C2 5.13002 3.05 4.08002 6.21 4.08002H12.53C15.69 4.08002 16.74 5.13002 16.74 8.29002V16.71C16.74 19.87 15.68 20.92 12.53 20.92Z"
                                    stroke="none"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M19.5202 17.6L16.7402 15.65V9.34001L19.5202 7.39001C20.8802 6.44001 22.0002 7.02001 22.0002 8.69001V16.31C22.0002 17.98 20.8802 18.56 19.5202 17.6Z"
                                    stroke="none"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M11.5 11.5C12.3284 11.5 13 10.8284 13 10C13 9.17157 12.3284 8.5 11.5 8.5C10.6716 8.5 10 9.17157 10 10C10 10.8284 10.6716 11.5 11.5 11.5Z"
                                    stroke="none"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span>Videos</span>
                              </button>
                              <button
                                className="multi-tab-switch-btn photos-btn"
                                data-multi-tabs-switch-btn
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25"
                                  height="25"
                                  viewBox="0 0 25 25"
                                  fill="none"
                                >
                                  <path
                                    d="M9.5 22.5H15.5C20.5 22.5 22.5 20.5 22.5 15.5V9.5C22.5 4.5 20.5 2.5 15.5 2.5H9.5C4.5 2.5 2.5 4.5 2.5 9.5V15.5C2.5 20.5 4.5 22.5 9.5 22.5Z"
                                    stroke="none"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M9.5 10.5C10.6046 10.5 11.5 9.60457 11.5 8.5C11.5 7.39543 10.6046 6.5 9.5 6.5C8.39543 6.5 7.5 7.39543 7.5 8.5C7.5 9.60457 8.39543 10.5 9.5 10.5Z"
                                    stroke="none"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3.16992 19.45L8.09992 16.14C8.88992 15.61 10.0299 15.67 10.7399 16.28L11.0699 16.57C11.8499 17.24 13.1099 17.24 13.8899 16.57L18.0499 13C18.8299 12.33 20.0899 12.33 20.8699 13L22.4999 14.4"
                                    stroke="none"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span>Photos</span>
                              </button>
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
                              </div>
                            </div>
                            <div
                              className="creator-content-grid-layout-options"
                              data-multi-dem-cards-layout-btns
                            >
                              <button
                                className="creator-content-grid-layout-btn"
                                data-active
                              >
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
                        <div
                          className="creator-content-cards-wrapper multi-dem-cards-wrapper-layout"
                          data-multi-child-grid-layout-wishlist
                        >
                          <div
                            className="creator-content-type-container-wrapper"
                            data-multi-tabs-content-tab
                            data-active
                          >
                            <div className="creator-content-card-container">
                              <div className="creator-content-card">
                                <div className="creator-content-card__media">
                                  <div className="creator-card__img">
                                    <img
                                      src="/images/profile-banners/profile-banner-8.jpg"
                                      alt="Creator Content Image"
                                    />
                                  </div>
                                  <div className="content-locked-label">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="21"
                                      height="20"
                                      viewBox="0 0 21 20"
                                      fill="none"
                                    >
                                      <path
                                        d="M5.375 8.33335V6.66669C5.375 3.90835 6.20833 1.66669 10.375 1.66669C14.5417 1.66669 15.375 3.90835 15.375 6.66669V8.33335"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M10.3753 15.4167C11.5259 15.4167 12.4587 14.4839 12.4587 13.3333C12.4587 12.1827 11.5259 11.25 10.3753 11.25C9.22473 11.25 8.29199 12.1827 8.29199 13.3333C8.29199 14.4839 9.22473 15.4167 10.3753 15.4167Z"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M14.542 18.3333H6.20866C2.87533 18.3333 2.04199 17.5 2.04199 14.1666V12.5C2.04199 9.16665 2.87533 8.33331 6.20866 8.33331H14.542C17.8753 8.33331 18.7087 9.16665 18.7087 12.5V14.1666C18.7087 17.5 17.8753 18.3333 14.542 18.3333Z"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <span> $10.00 </span>
                                  </div>
                                </div>

                                <div className="desc-btns">
                                  <div className="creator-content-card__description">
                                    <p>
                                      Today, I experienced the most blissful
                                      ride outside.
                                    </p>
                                  </div>

                                  <div className="creator-content-card__stats">
                                    <div className="creator-content-stat-box">
                                      <button
                                        className="like-button"
                                        data-like-button=""
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="21"
                                          height="20"
                                          viewBox="0 0 21 20"
                                          fill="none"
                                        >
                                          <path
                                            d="M11.2665 17.3417C10.9832 17.4417 10.5165 17.4417 10.2332 17.3417C7.8165 16.5167 2.4165 13.075 2.4165 7.24166C2.4165 4.66666 4.4915 2.58333 7.04984 2.58333C8.5665 2.58333 9.90817 3.31666 10.7498 4.45C11.5915 3.31666 12.9415 2.58333 14.4498 2.58333C17.0082 2.58333 19.0832 4.66666 19.0832 7.24166C19.0832 13.075 13.6832 16.5167 11.2665 17.3417Z"
                                            stroke="none"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                      </button>

                                      <span>12K</span>
                                    </div>
                                    <div className="creator-content-stat-box views-btn">
                                      <button>
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
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </button>
                                      <span>13</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="creator-content-card-container">
                              <div className="creator-content-card">
                                <div className="creator-content-card__media">
                                  <div className="creator-card__img">
                                    <img
                                      src="/images/profile-avatars/profile-avatar-9.jpg"
                                      alt="Creator Content Image"
                                    />
                                  </div>
                                  <div className="content-locked-label">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="21"
                                      height="20"
                                      viewBox="0 0 21 20"
                                      fill="none"
                                    >
                                      <path
                                        d="M14.5413 15.8167H6.70801C6.35801 15.8167 5.96634 15.5417 5.84968 15.2083L2.39968 5.55834C1.90801 4.17501 2.48301 3.75001 3.66634 4.60001L6.91634 6.92501C7.45801 7.30001 8.07468 7.10834 8.30801 6.50001L9.77468 2.59167C10.2413 1.34167 11.0163 1.34167 11.483 2.59167L12.9497 6.50001C13.183 7.10834 13.7997 7.30001 14.333 6.92501L17.383 4.75001C18.683 3.81667 19.308 4.29168 18.7747 5.80001L15.408 15.225C15.283 15.5417 14.8913 15.8167 14.5413 15.8167Z"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M6.04199 18.3333H15.2087"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M8.54199 11.6667H12.7087"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <span> For Subscribers </span>
                                  </div>
                                </div>

                                <div className="desc-btns">
                                  <div className="creator-content-card__description">
                                    <p>
                                      Today, I experienced the most blissful
                                      ride outside.
                                    </p>
                                  </div>

                                  <div className="creator-content-card__stats">
                                    <div className="creator-content-stat-box">
                                      <button
                                        className="like-button"
                                        data-like-button=""
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="21"
                                          height="20"
                                          viewBox="0 0 21 20"
                                          fill="none"
                                        >
                                          <path
                                            d="M11.2665 17.3417C10.9832 17.4417 10.5165 17.4417 10.2332 17.3417C7.8165 16.5167 2.4165 13.075 2.4165 7.24166C2.4165 4.66666 4.4915 2.58333 7.04984 2.58333C8.5665 2.58333 9.90817 3.31666 10.7498 4.45C11.5915 3.31666 12.9415 2.58333 14.4498 2.58333C17.0082 2.58333 19.0832 4.66666 19.0832 7.24166C19.0832 13.075 13.6832 16.5167 11.2665 17.3417Z"
                                            stroke="none"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                      </button>

                                      <span>12K</span>
                                    </div>
                                    <div className="creator-content-stat-box views-btn">
                                      <button>
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
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </button>
                                      <span>13</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="creator-content-card-container">
                              <div className="creator-content-card">
                                <div className="creator-content-card__media">
                                  <div className="creator-card__img">
                                    <img
                                      src="/images/profile-avatars/profile-avatar-6.jpg"
                                      alt="Creator Content Image"
                                    />
                                  </div>
                                  <div className="content-locked-label">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="21"
                                      height="20"
                                      viewBox="0 0 21 20"
                                      fill="none"
                                    >
                                      <path
                                        d="M5.375 8.33335V6.66669C5.375 3.90835 6.20833 1.66669 10.375 1.66669C14.5417 1.66669 15.375 3.90835 15.375 6.66669V8.33335"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>
                                      <path
                                        d="M10.3753 15.4167C11.5259 15.4167 12.4587 14.4839 12.4587 13.3333C12.4587 12.1827 11.5259 11.25 10.3753 11.25C9.22473 11.25 8.29199 12.1827 8.29199 13.3333C8.29199 14.4839 9.22473 15.4167 10.3753 15.4167Z"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>
                                      <path
                                        d="M14.542 18.3333H6.20866C2.87533 18.3333 2.04199 17.5 2.04199 14.1666V12.5C2.04199 9.16665 2.87533 8.33331 6.20866 8.33331H14.542C17.8753 8.33331 18.7087 9.16665 18.7087 12.5V14.1666C18.7087 17.5 17.8753 18.3333 14.542 18.3333Z"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>
                                    </svg>
                                    <span> $10.00 </span>
                                  </div>
                                </div>

                                <div className="desc-btns">
                                  <div className="creator-content-card__description">
                                    <p>
                                      Today, I experienced the most blissful
                                      ride outside.
                                    </p>
                                  </div>

                                  <div className="creator-content-card__stats">
                                    <div className="creator-content-stat-box">
                                      <button
                                        className="like-button"
                                        data-like-button=""
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="21"
                                          height="20"
                                          viewBox="0 0 21 20"
                                          fill="none"
                                        >
                                          <path
                                            d="M11.2665 17.3417C10.9832 17.4417 10.5165 17.4417 10.2332 17.3417C7.8165 16.5167 2.4165 13.075 2.4165 7.24166C2.4165 4.66666 4.4915 2.58333 7.04984 2.58333C8.5665 2.58333 9.90817 3.31666 10.7498 4.45C11.5915 3.31666 12.9415 2.58333 14.4498 2.58333C17.0082 2.58333 19.0832 4.66666 19.0832 7.24166C19.0832 13.075 13.6832 16.5167 11.2665 17.3417Z"
                                            stroke="none"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                      </button>

                                      <span>12K</span>
                                    </div>
                                    <div className="creator-content-stat-box views-btn">
                                      <button>
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
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </button>
                                      <span>13</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="creator-content-card-container">
                              <div className="creator-content-card">
                                <div className="creator-content-card__media">
                                  <div className="creator-card__img">
                                    <img
                                      src="/images/post-images/post-img-2.png"
                                      alt="Creator Content Image"
                                    />
                                  </div>
                                  <div className="content-locked-label">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="21"
                                      height="20"
                                      viewBox="0 0 21 20"
                                      fill="none"
                                    >
                                      <path
                                        d="M14.5413 15.8167H6.70801C6.35801 15.8167 5.96634 15.5417 5.84968 15.2083L2.39968 5.55834C1.90801 4.17501 2.48301 3.75001 3.66634 4.60001L6.91634 6.92501C7.45801 7.30001 8.07468 7.10834 8.30801 6.50001L9.77468 2.59167C10.2413 1.34167 11.0163 1.34167 11.483 2.59167L12.9497 6.50001C13.183 7.10834 13.7997 7.30001 14.333 6.92501L17.383 4.75001C18.683 3.81667 19.308 4.29168 18.7747 5.80001L15.408 15.225C15.283 15.5417 14.8913 15.8167 14.5413 15.8167Z"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M6.04199 18.3333H15.2087"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M8.54199 11.6667H12.7087"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <span> For Subscribers </span>
                                  </div>
                                </div>

                                <div className="desc-btns">
                                  <div className="creator-content-card__description">
                                    <p>
                                      Today, I experienced the most blissful
                                      ride outside.
                                    </p>
                                  </div>

                                  <div className="creator-content-card__stats">
                                    <div className="creator-content-stat-box">
                                      <button
                                        className="like-button"
                                        data-like-button=""
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="21"
                                          height="20"
                                          viewBox="0 0 21 20"
                                          fill="none"
                                        >
                                          <path
                                            d="M11.2665 17.3417C10.9832 17.4417 10.5165 17.4417 10.2332 17.3417C7.8165 16.5167 2.4165 13.075 2.4165 7.24166C2.4165 4.66666 4.4915 2.58333 7.04984 2.58333C8.5665 2.58333 9.90817 3.31666 10.7498 4.45C11.5915 3.31666 12.9415 2.58333 14.4498 2.58333C17.0082 2.58333 19.0832 4.66666 19.0832 7.24166C19.0832 13.075 13.6832 16.5167 11.2665 17.3417Z"
                                            stroke="none"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                      </button>

                                      <span>12K</span>
                                    </div>
                                    <div className="creator-content-stat-box views-btn">
                                      <button>
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
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </button>
                                      <span>13</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="creator-content-type-container-wrapper"
                            data-multi-tabs-content-tab
                          >
                            <div className="creator-content-card-container">
                              <div className="creator-content-card">
                                <div className="creator-content-card__media">
                                  <div className="creator-card__img">
                                    <img
                                      src="/images/profile-avatars/profile-avatar-6.jpg"
                                      alt="Creator Content Image"
                                    />
                                  </div>
                                  <div className="content-locked-label">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="21"
                                      height="20"
                                      viewBox="0 0 21 20"
                                      fill="none"
                                    >
                                      <path
                                        d="M5.375 8.33335V6.66669C5.375 3.90835 6.20833 1.66669 10.375 1.66669C14.5417 1.66669 15.375 3.90835 15.375 6.66669V8.33335"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>
                                      <path
                                        d="M10.3753 15.4167C11.5259 15.4167 12.4587 14.4839 12.4587 13.3333C12.4587 12.1827 11.5259 11.25 10.3753 11.25C9.22473 11.25 8.29199 12.1827 8.29199 13.3333C8.29199 14.4839 9.22473 15.4167 10.3753 15.4167Z"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>
                                      <path
                                        d="M14.542 18.3333H6.20866C2.87533 18.3333 2.04199 17.5 2.04199 14.1666V12.5C2.04199 9.16665 2.87533 8.33331 6.20866 8.33331H14.542C17.8753 8.33331 18.7087 9.16665 18.7087 12.5V14.1666C18.7087 17.5 17.8753 18.3333 14.542 18.3333Z"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>
                                    </svg>
                                    <span> $10.00 </span>
                                  </div>
                                </div>

                                <div className="desc-btns">
                                  <div className="creator-content-card__description">
                                    <p>
                                      Today, I experienced the most blissful
                                      ride outside.
                                    </p>
                                  </div>

                                  <div className="creator-content-card__stats">
                                    <div className="creator-content-stat-box">
                                      <button
                                        className="like-button"
                                        data-like-button=""
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="21"
                                          height="20"
                                          viewBox="0 0 21 20"
                                          fill="none"
                                        >
                                          <path
                                            d="M11.2665 17.3417C10.9832 17.4417 10.5165 17.4417 10.2332 17.3417C7.8165 16.5167 2.4165 13.075 2.4165 7.24166C2.4165 4.66666 4.4915 2.58333 7.04984 2.58333C8.5665 2.58333 9.90817 3.31666 10.7498 4.45C11.5915 3.31666 12.9415 2.58333 14.4498 2.58333C17.0082 2.58333 19.0832 4.66666 19.0832 7.24166C19.0832 13.075 13.6832 16.5167 11.2665 17.3417Z"
                                            stroke="none"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                      </button>

                                      <span>12K</span>
                                    </div>
                                    <div className="creator-content-stat-box views-btn">
                                      <button>
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
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </button>
                                      <span>12K</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="creator-content-card-container">
                              <div className="creator-content-card">
                                <div className="creator-content-card__media">
                                  <div className="creator-card__img">
                                    <img
                                      src="/images/post-images/post-img-2.png"
                                      alt="Creator Content Image"
                                    />
                                  </div>
                                  <div className="content-locked-label">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="21"
                                      height="20"
                                      viewBox="0 0 21 20"
                                      fill="none"
                                    >
                                      <path
                                        d="M14.5413 15.8167H6.70801C6.35801 15.8167 5.96634 15.5417 5.84968 15.2083L2.39968 5.55834C1.90801 4.17501 2.48301 3.75001 3.66634 4.60001L6.91634 6.92501C7.45801 7.30001 8.07468 7.10834 8.30801 6.50001L9.77468 2.59167C10.2413 1.34167 11.0163 1.34167 11.483 2.59167L12.9497 6.50001C13.183 7.10834 13.7997 7.30001 14.333 6.92501L17.383 4.75001C18.683 3.81667 19.308 4.29168 18.7747 5.80001L15.408 15.225C15.283 15.5417 14.8913 15.8167 14.5413 15.8167Z"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M6.04199 18.3333H15.2087"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M8.54199 11.6667H12.7087"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <span> For Subscribers </span>
                                  </div>
                                </div>

                                <div className="desc-btns">
                                  <div className="creator-content-card__description">
                                    <p>
                                      Today, I experienced the most blissful
                                      ride outside.
                                    </p>
                                  </div>

                                  <div className="creator-content-card__stats">
                                    <div className="creator-content-stat-box">
                                      <button
                                        className="like-button"
                                        data-like-button=""
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="21"
                                          height="20"
                                          viewBox="0 0 21 20"
                                          fill="none"
                                        >
                                          <path
                                            d="M11.2665 17.3417C10.9832 17.4417 10.5165 17.4417 10.2332 17.3417C7.8165 16.5167 2.4165 13.075 2.4165 7.24166C2.4165 4.66666 4.4915 2.58333 7.04984 2.58333C8.5665 2.58333 9.90817 3.31666 10.7498 4.45C11.5915 3.31666 12.9415 2.58333 14.4498 2.58333C17.0082 2.58333 19.0832 4.66666 19.0832 7.24166C19.0832 13.075 13.6832 16.5167 11.2665 17.3417Z"
                                            stroke="none"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                      </button>

                                      <span>12K</span>
                                    </div>
                                    <div className="creator-content-stat-box views-btn">
                                      <button>
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
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </button>
                                      <span>12K</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="creator-content-card-container">
                              <div className="creator-content-card">
                                <div className="creator-content-card__media">
                                  <div className="creator-card__img">
                                    <img
                                      src="/images/profile-banners/profile-banner-8.jpg"
                                      alt="Creator Content Image"
                                    />
                                  </div>
                                  <div className="content-locked-label">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="21"
                                      height="20"
                                      viewBox="0 0 21 20"
                                      fill="none"
                                    >
                                      <path
                                        d="M5.375 8.33335V6.66669C5.375 3.90835 6.20833 1.66669 10.375 1.66669C14.5417 1.66669 15.375 3.90835 15.375 6.66669V8.33335"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M10.3753 15.4167C11.5259 15.4167 12.4587 14.4839 12.4587 13.3333C12.4587 12.1827 11.5259 11.25 10.3753 11.25C9.22473 11.25 8.29199 12.1827 8.29199 13.3333C8.29199 14.4839 9.22473 15.4167 10.3753 15.4167Z"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M14.542 18.3333H6.20866C2.87533 18.3333 2.04199 17.5 2.04199 14.1666V12.5C2.04199 9.16665 2.87533 8.33331 6.20866 8.33331H14.542C17.8753 8.33331 18.7087 9.16665 18.7087 12.5V14.1666C18.7087 17.5 17.8753 18.3333 14.542 18.3333Z"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <span> $10.00 </span>
                                  </div>
                                </div>

                                <div className="desc-btns">
                                  <div className="creator-content-card__description">
                                    <p>
                                      Today, I experienced the most blissful
                                      ride outside.
                                    </p>
                                  </div>

                                  <div className="creator-content-card__stats">
                                    <div className="creator-content-stat-box">
                                      <button
                                        className="like-button"
                                        data-like-button=""
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="21"
                                          height="20"
                                          viewBox="0 0 21 20"
                                          fill="none"
                                        >
                                          <path
                                            d="M11.2665 17.3417C10.9832 17.4417 10.5165 17.4417 10.2332 17.3417C7.8165 16.5167 2.4165 13.075 2.4165 7.24166C2.4165 4.66666 4.4915 2.58333 7.04984 2.58333C8.5665 2.58333 9.90817 3.31666 10.7498 4.45C11.5915 3.31666 12.9415 2.58333 14.4498 2.58333C17.0082 2.58333 19.0832 4.66666 19.0832 7.24166C19.0832 13.075 13.6832 16.5167 11.2665 17.3417Z"
                                            stroke="none"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                      </button>

                                      <span>12K</span>
                                    </div>
                                    <div className="creator-content-stat-box views-btn">
                                      <button>
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
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </button>
                                      <span>12K</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="creator-content-card-container">
                              <div className="creator-content-card">
                                <div className="creator-content-card__media">
                                  <div className="creator-card__img">
                                    <img
                                      src="/images/profile-avatars/profile-avatar-9.jpg"
                                      alt="Creator Content Image"
                                    />
                                  </div>
                                  <div className="content-locked-label">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="21"
                                      height="20"
                                      viewBox="0 0 21 20"
                                      fill="none"
                                    >
                                      <path
                                        d="M14.5413 15.8167H6.70801C6.35801 15.8167 5.96634 15.5417 5.84968 15.2083L2.39968 5.55834C1.90801 4.17501 2.48301 3.75001 3.66634 4.60001L6.91634 6.92501C7.45801 7.30001 8.07468 7.10834 8.30801 6.50001L9.77468 2.59167C10.2413 1.34167 11.0163 1.34167 11.483 2.59167L12.9497 6.50001C13.183 7.10834 13.7997 7.30001 14.333 6.92501L17.383 4.75001C18.683 3.81667 19.308 4.29168 18.7747 5.80001L15.408 15.225C15.283 15.5417 14.8913 15.8167 14.5413 15.8167Z"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M6.04199 18.3333H15.2087"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M8.54199 11.6667H12.7087"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <span> For Subscribers </span>
                                  </div>
                                </div>

                                <div className="desc-btns">
                                  <div className="creator-content-card__description">
                                    <p>
                                      Today, I experienced the most blissful
                                      ride outside.
                                    </p>
                                  </div>

                                  <div className="creator-content-card__stats">
                                    <div className="creator-content-stat-box">
                                      <button
                                        className="like-button"
                                        data-like-button=""
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="21"
                                          height="20"
                                          viewBox="0 0 21 20"
                                          fill="none"
                                        >
                                          <path
                                            d="M11.2665 17.3417C10.9832 17.4417 10.5165 17.4417 10.2332 17.3417C7.8165 16.5167 2.4165 13.075 2.4165 7.24166C2.4165 4.66666 4.4915 2.58333 7.04984 2.58333C8.5665 2.58333 9.90817 3.31666 10.7498 4.45C11.5915 3.31666 12.9415 2.58333 14.4498 2.58333C17.0082 2.58333 19.0832 4.66666 19.0832 7.24166C19.0832 13.075 13.6832 16.5167 11.2665 17.3417Z"
                                            stroke="none"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                      </button>

                                      <span>12K</span>
                                    </div>
                                    <div className="creator-content-stat-box views-btn">
                                      <button>
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
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </button>
                                      <span>12K</span>
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
              </div>
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

export default WishlistPage;
