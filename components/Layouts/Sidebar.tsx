"use client";
import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="moneyboy-global-sidebar-wrapper" id="leftSidebar">
      <aside className="global-sidebar-container">
        {/* ####### */}
        {/* Sidebar Responsive Toggle Button */}

        {/* ############ */}
        {/* Profile Card */}
        <div className="sidebar-profile-card card">
          <div className="profile-card">
            <a href="#" className="profile-card__main">
              <div className="profile-card__avatar-settings">
                <div className="profile-card__avatar">
                  <img
                    src="/images/profile-avatars/profile-avatar-1.png"
                    alt="MoneyBoy Social Profile Avatar"
                  />
                </div>
                <div className="profile-card__settings active-down-effect-2x">
                  <svg
                    className="svg-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1.66666 10.7333V9.26666C1.66666 8.4 2.37499 7.68333 3.24999 7.68333C4.75832 7.68333 5.37499 6.61666 4.61666 5.30833C4.18332 4.55833 4.44166 3.58333 5.19999 3.15L6.64166 2.325C7.29999 1.93333 8.14999 2.16666 8.54166 2.825L8.63332 2.98333C9.38332 4.29166 10.6167 4.29166 11.375 2.98333L11.4667 2.825C11.8583 2.16666 12.7083 1.93333 13.3667 2.325L14.8083 3.15C15.5667 3.58333 15.825 4.55833 15.3917 5.30833C14.6333 6.61666 15.25 7.68333 16.7583 7.68333C17.625 7.68333 18.3417 8.39166 18.3417 9.26666V10.7333C18.3417 11.6 17.6333 12.3167 16.7583 12.3167C15.25 12.3167 14.6333 13.3833 15.3917 14.6917C15.825 15.45 15.5667 16.4167 14.8083 16.85L13.3667 17.675C12.7083 18.0667 11.8583 17.8333 11.4667 17.175L11.375 17.0167C10.625 15.7083 9.39166 15.7083 8.63332 17.0167L8.54166 17.175C8.14999 17.8333 7.29999 18.0667 6.64166 17.675L5.19999 16.85C4.44166 16.4167 4.18332 15.4417 4.61666 14.6917C5.37499 13.3833 4.75832 12.3167 3.24999 12.3167C2.37499 12.3167 1.66666 11.6 1.66666 10.7333Z"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="profile-card__info">
                <div className="profile-card__name-badge">
                  <div className="profile-card__name">Corey Bergson</div>
                  <div className="profile-card__badge">
                    <img
                      src="/images/logo/profile-badge.png"
                      alt="MoneyBoy Social Profile Badge"
                    />
                  </div>
                </div>
                <div className="profile-card__username">@coreybergson</div>
              </div>
            </a>
            <div className="profile-card__stats">
              <div className="profile-card__stats-item posts-stats">
                <div className="profile-card__stats-num">2,880</div>
                <div className="profile-card__stats-label">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M22 10.4286V15.4286C22 20.4286 20 22.4286 15 22.4286H9C4 22.4286 2 20.4286 2 15.4286V9.42856C2 4.42856 4 2.42856 9 2.42856H14"
                      stroke="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 10.4286H18C15 10.4286 14 9.42856 14 6.42856V2.42856L22 10.4286Z"
                      stroke="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 13.4286H13"
                      stroke="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 17.4286H11"
                      stroke="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Posts</span>
                </div>
              </div>
              <div className="profile-card__stats-item followers-stats">
                <div className="profile-card__stats-num">253</div>
                <div className="profile-card__stats-label">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M9.16006 11.2986C9.06006 11.2886 8.94006 11.2886 8.83006 11.2986C6.45006 11.2186 4.56006 9.26859 4.56006 6.86859C4.56006 4.41859 6.54006 2.42859 9.00006 2.42859C11.4501 2.42859 13.4401 4.41859 13.4401 6.86859C13.4301 9.26859 11.5401 11.2186 9.16006 11.2986Z"
                      stroke="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.4098 4.42859C18.3498 4.42859 19.9098 5.99859 19.9098 7.92859C19.9098 9.81859 18.4098 11.3586 16.5398 11.4286C16.4598 11.4186 16.3698 11.4186 16.2798 11.4286"
                      stroke="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.16021 14.9886C1.74021 16.6086 1.74021 19.2486 4.16021 20.8586C6.91021 22.6986 11.4202 22.6986 14.1702 20.8586C16.5902 19.2386 16.5902 16.5986 14.1702 14.9886C11.4302 13.1586 6.92021 13.1586 4.16021 14.9886Z"
                      stroke="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.3398 20.4286C19.0598 20.2786 19.7398 19.9886 20.2998 19.5586C21.8598 18.3886 21.8598 16.4586 20.2998 15.2886C19.7498 14.8686 19.0798 14.5886 18.3698 14.4286"
                      stroke="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Followers</span>
                </div>
              </div>
              <div className="profile-card__stats-item following-stats">
                <div className="profile-card__stats-num">1,920</div>
                <div className="profile-card__stats-label">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M12.1601 11.2986C12.0601 11.2886 11.9401 11.2886 11.8301 11.2986C9.45006 11.2186 7.56006 9.26859 7.56006 6.86859C7.56006 4.41859 9.54006 2.42859 12.0001 2.42859C14.4501 2.42859 16.4401 4.41859 16.4401 6.86859C16.4301 9.26859 14.5401 11.2186 12.1601 11.2986Z"
                      stroke="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.16021 14.9886C4.74021 16.6086 4.74021 19.2486 7.16021 20.8586C9.91021 22.6986 14.4202 22.6986 17.1702 20.8586C19.5902 19.2386 19.5902 16.5986 17.1702 14.9886C14.4302 13.1586 9.92021 13.1586 7.16021 14.9886Z"
                      stroke="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Following</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ################## */}
        {/* Create Post Button */}
        <div className="sidebar-post-button card active-down-effect">
          <a href="#" className="btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M22 12V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H12"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.96 17.84L19.33 18.39C18.88 18.54 18.52 18.89 18.37 19.35L17.82 20.98C17.35 22.39 15.37 22.36 14.93 20.95L13.08 15C12.72 13.82 13.81 12.72 14.98 13.09L20.94 14.94C22.34 15.38 22.36 17.37 20.96 17.84Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Create a Post</span>
          </a>
        </div>

        {/* ########## */}
        {/* Navigation */}
        <div className="sidebar-navigation-container card">
          <nav className="sidbar-navigation">
            <ul>
              {/* Navigation Button */}
              <li>
                <a href="#" className="active-down-effect">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M13.4266 3.76005L4.18661 11.16C3.14661 11.9867 2.47995 13.7334 2.70661 15.0401L4.47995 25.6534C4.79995 27.5467 6.61327 29.08 8.53327 29.08H23.4666C25.3733 29.08 27.1999 27.5334 27.5199 25.6534L29.2933 15.0401C29.5066 13.7334 28.84 11.9867 27.8133 11.16L18.5733 3.77339C17.1466 2.62673 14.84 2.62671 13.4266 3.76005Z"
                        stroke="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.0001 20.6667C17.841 20.6667 19.3334 19.1743 19.3334 17.3333C19.3334 15.4924 17.841 14 16.0001 14C14.1591 14 12.6667 15.4924 12.6667 17.3333C12.6667 19.1743 14.1591 20.6667 16.0001 20.6667Z"
                        stroke="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Feed</span>
                  </div>
                </a>
              </li>

              {/* Navigation Button */}
              <li>
                <a href="#" className="active-down-effect active">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M23.7333 2.79998L10.4933 6.11998C8.55999 6.59998 6.59999 8.55998 6.11999 10.4933L2.79999 23.7333C1.79999 27.7333 4.25332 30.2 8.26666 29.2L21.5067 25.8933C23.4267 25.4133 25.4 23.44 25.88 21.52L29.2 8.26665C30.2 4.26665 27.7333 1.79998 23.7333 2.79998Z"
                        stroke="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 20.6666C18.5773 20.6666 20.6667 18.5773 20.6667 16C20.6667 13.4227 18.5773 11.3333 16 11.3333C13.4227 11.3333 11.3333 13.4227 11.3333 16C11.3333 18.5773 13.4227 20.6666 16 20.6666Z"
                        stroke="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Discover</span>
                  </div>
                </a>
              </li>

              {/* Navigation Button */}
              <li>
                <a href="#" className="active-down-effect">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M16.8267 27.7467C16.3733 27.9067 15.6267 27.9067 15.1733 27.7467C11.3067 26.4267 2.66666 20.92 2.66666 11.5867C2.66666 7.46669 5.98666 4.13336 10.08 4.13336C12.5067 4.13336 14.6533 5.3067 16 7.12003C17.3467 5.3067 19.5067 4.13336 21.92 4.13336C26.0133 4.13336 29.3333 7.46669 29.3333 11.5867C29.3333 20.92 20.6933 26.4267 16.8267 27.7467Z"
                        stroke="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Likes</span>
                  </div>
                </a>
              </li>

              {/* Navigation Button */}
              <li>
                <a href="#" className="active-down-effect">
                  <div>
                    <svg
                      className="wishlist-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M22.4266 2.66669H9.57327C6.73327 2.66669 4.42661 4.98669 4.42661 7.81335V26.6C4.42661 29 6.14661 30.0134 8.25327 28.8534L14.7599 25.24C15.4533 24.8534 16.5733 24.8534 17.2533 25.24L23.7599 28.8534C25.8666 30.0267 27.5866 29.0134 27.5866 26.6V7.81335C27.5733 4.98669 25.2666 2.66669 22.4266 2.66669Z"
                        stroke="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22.4266 2.66669H9.57327C6.73327 2.66669 4.42661 4.98669 4.42661 7.81335V26.6C4.42661 29 6.14661 30.0134 8.25327 28.8534L14.7599 25.24C15.4533 24.8534 16.5733 24.8534 17.2533 25.24L23.7599 28.8534C25.8666 30.0267 27.5866 29.0134 27.5866 26.6V7.81335C27.5733 4.98669 25.2666 2.66669 22.4266 2.66669Z"
                        stroke="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.3333 12.0667C14.7067 12.9334 17.2933 12.9334 19.6667 12.0667"
                        stroke="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Wishlist</span>
                  </div>
                </a>
              </li>

              {/* Navigation Button */}
              <li>
                <a href="#" className="active-down-effect">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M29.3333 20V12C29.3333 5.33335 26.6667 2.66669 20 2.66669H12C5.33332 2.66669 2.66666 5.33335 2.66666 12V20C2.66666 26.6667 5.33332 29.3334 12 29.3334H20C26.6667 29.3334 29.3333 26.6667 29.3333 20Z"
                        stroke="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.35999 9.47998H28.64"
                        stroke="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.36 2.81335V9.29335"
                        stroke="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20.64 2.81335V8.69336"
                        stroke="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13 19.2667V17.6667C13 15.6133 14.4533 14.7733 16.2267 15.8L17.6133 16.6L19 17.4C20.7733 18.4267 20.7733 20.1067 19 21.1333L17.6133 21.9333L16.2267 22.7333C14.4533 23.76 13 22.92 13 20.8667V19.2667V19.2667Z"
                        stroke="none"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Subscriptions</span>
                  </div>
                </a>
              </li>

              {/* Navigation Button */}
              <li>
                <a href="#" className="active-down-effect">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M20.7867 16.3467C24.5643 16.3467 27.6267 13.2843 27.6267 9.50669C27.6267 5.72907 24.5643 2.66669 20.7867 2.66669C17.009 2.66669 13.9467 5.72907 13.9467 9.50669C13.9467 13.2843 17.009 16.3467 20.7867 16.3467Z"
                        stroke="none"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                      />
                      <path
                        d="M8.47997 25.92C10.748 25.92 12.5867 24.0814 12.5867 21.8133C12.5867 19.5453 10.748 17.7067 8.47997 17.7067C6.21192 17.7067 4.37332 19.5453 4.37332 21.8133C4.37332 24.0814 6.21192 25.92 8.47997 25.92Z"
                        stroke="none"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                      />
                      <path
                        d="M22.16 29.3333C24.0451 29.3333 25.5733 27.8051 25.5733 25.92C25.5733 24.0349 24.0451 22.5067 22.16 22.5067C20.2749 22.5067 18.7467 24.0349 18.7467 25.92C18.7467 27.8051 20.2749 29.3333 22.16 29.3333Z"
                        stroke="none"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                      />
                    </svg>
                    <span>Purchased Media</span>
                  </div>
                </a>
              </li>

              {/* Navigation Button */}
              <li>
                <a href="#" className="active-down-effect">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M4.01334 14.96V20.9467C4.01334 26.9334 6.41334 29.3334 12.4 29.3334H19.5867C25.5733 29.3334 27.9733 26.9334 27.9733 20.9467V14.96"
                        stroke="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 16C18.44 16 20.24 14.0134 20 11.5734L19.12 2.66669H12.8933L12 11.5734C11.76 14.0134 13.56 16 16 16Z"
                        stroke="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M24.4133 16C27.1067 16 29.08 13.8134 28.8133 11.1334L28.44 7.46669C27.96 4.00002 26.6267 2.66669 23.1333 2.66669H19.0667L20 12.0134C20.2267 14.2134 22.2133 16 24.4133 16Z"
                        stroke="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.52 16C9.72 16 11.7067 14.2134 11.92 12.0134L12.2133 9.06669L12.8533 2.66669H8.78666C5.29333 2.66669 3.96 4.00002 3.48 7.46669L3.12 11.1334C2.85333 13.8134 4.82666 16 7.52 16Z"
                        stroke="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 22.6667C13.7733 22.6667 12.6667 23.7734 12.6667 26V29.3334H19.3333V26C19.3333 23.7734 18.2267 22.6667 16 22.6667Z"
                        stroke="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Store</span>
                  </div>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* ###### */}
        {/* Footer */}
        <div className="sidebar-footer-card card">
          <footer className="sidebar-footer">
            {/* Footer Navigations */}
            <nav>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Creator</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Help &amp; Support</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
                <li>
                  <a href="#">Privacy</a>
                </li>
                <li>
                  <a href="#">DMCA</a>
                </li>
              </ul>
            </nav>
            {/* Footer Payment Card logos */}
            <div className="footer-logos">
              <a href="#" className="footer-logo">
                <img
                  src="/images/debit-cards-logo/dmca-logo.svg"
                  alt="DMCA Logo"
                />
              </a>
              <a href="#" className="footer-logo">
                <img
                  src="/images/debit-cards-logo/master-card-logo.svg"
                  alt="Master Logo"
                />
              </a>
              <a href="#" className="footer-logo">
                <img
                  src="/images/debit-cards-logo/visa-card-logo.svg"
                  alt="Visa Logo"
                />
              </a>
            </div>
          </footer>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;