"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation"; // Add usePathname
import { useDecryptedSession } from "@/libs/useDecryptedSession";
import "./header.css";
import { signOut } from "next-auth/react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useDecryptedSession();
  const router = useRouter();
  const pathname = usePathname(); // Get current path

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    signOut({ callbackUrl: "/" });
  };

  // Handler for notification click
  const handleNotificationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/notifications");
  };

  const handleMessage = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/message");
  };

  // Check if current page is notifications page
  const isNotificationsPage = pathname === "/notifications";
  const isMessagePage = pathname === "/message";

  return (
    <>
      <header className="header-main">
        <div className="container">
          <div className="header-container">
            <div className="header-logo">
              <Link href="/">
                <Image
                  src="/images/logo/moneyboy-logo.png"
                  alt="MoneyBoy Logo"
                  width={150}
                  height={50}
                />
              </Link>
            </div>

            <div className="header-search-nav-profile-container">
              <div className="header-search-input">
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
                  <input type="text" placeholder="Search here" />
                </div>
              </div>

              {session?.isAuthenticated ? (
                <>
                  <div className="header-navigation">
                    <nav>
                      <ul>
                        <li className="message-btn">
                            <a 
                            href="#" 
                            className={`icon-link ${isMessagePage ? 'active' : ''}`} // Add active class conditionally
                            onClick={handleMessage}
                          >
                            <svg
                              className="svg-icon"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H12"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M15.2 4.62C14.87 3.63 15.26 2.41 16.34 2.07C16.9 1.9 17.6 2.04 18 2.57C18.38 2.02 19.1 1.9 19.66 2.07C20.74 2.4 21.13 3.63 20.8 4.62C20.29 6.19 18.5 7 18 7C17.5 7 15.73 6.2 15.2 4.62Z"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M15.9965 11H16.0054"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M11.9955 11H12.0045"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7.99451 11H8.00349"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </a>
                        </li>
                        <li>
                         <a 
                            href="#" 
                            className={`icon-link ${isNotificationsPage ? 'active' : ''}`} // Add active class conditionally
                            onClick={handleNotificationClick}
                          >
                            {/* SVG for another icon */}
                            <svg
                              className="svg-icon"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7 13H12"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7 17H16"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M14 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V10"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>

                  <div className="header-profile-avatar">
                    <button
                      data-floating-menu-triger
                      onClick={() => setIsOpen((prev) => !prev)}
                    >
                      <div className="profile-avatar">
                        <Image
                          src="/images/profile-avatars/profile-avatar-1.png"
                          alt="User Images"
                          width={40}
                          height={40}
                        />
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <div className="header-auth-buttons gap-10">
                  <Link href="/login" className="btn-txt-gradient btn-grey">{" "} <span>Sign In</span></Link>
                  <Link href="/benefits" className="btn-txt-gradient">{" "} <span>Sign Up</span></Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {isOpen && (
        <div className="floating-menu-container" data-floating-menu-main>
          <div className="menu-content-wrapper">
            <div className="menu-content-container">
              <div className="menu-close-btn" data-floating-menu-close-btn onClick={() => setIsOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                >
                  <path
                    d="M15.4998 0.916668C7.46442 0.916668 0.916504 7.46458 0.916504 15.5C0.916504 23.5354 7.46442 30.0833 15.4998 30.0833C23.5353 30.0833 30.0832 23.5354 30.0832 15.5C30.0832 7.46458 23.5353 0.916668 15.4998 0.916668ZM20.3998 18.8542C20.8228 19.2771 20.8228 19.9771 20.3998 20.4C20.1811 20.6188 19.904 20.7208 19.6269 20.7208C19.3498 20.7208 19.0728 20.6188 18.854 20.4L15.4998 17.0458L12.1457 20.4C11.9269 20.6188 11.6498 20.7208 11.3728 20.7208C11.0957 20.7208 10.8186 20.6188 10.5998 20.4C10.1769 19.9771 10.1769 19.2771 10.5998 18.8542L13.954 15.5L10.5998 12.1458C10.1769 11.7229 10.1769 11.0229 10.5998 10.6C11.0228 10.1771 11.7228 10.1771 12.1457 10.6L15.4998 13.9542L18.854 10.6C19.2769 10.1771 19.9769 10.1771 20.3998 10.6C20.8228 11.0229 20.8228 11.7229 20.3998 12.1458L17.0457 15.5L20.3998 18.8542Z"
                    fill="none"
                  />
                </svg>
              </div>
              <div className="menu-content">
                <div className="menu-profile-card">
                  <div className="profile-card">
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
                            {" "}
                            Corey Bergson{" "}
                          </div>
                          <div className="profile-card__badge">
                            <img
                              src="/images/logo/profile-badge.png"
                              alt="MoneyBoy Social Profile Badge"
                            />
                          </div>
                        </div>
                        <div className="profile-card__username">
                          {" "}
                          @coreybergson{" "}
                        </div>
                      </div>
                    </div>

                    <div className="menu-profile-stats">
                      <div className="menu-profile-stats-item">
                        <div className="icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 25"
                            fill="none"
                          >
                            <path
                              d="M18.04 14.05C17.62 14.46 17.38 15.05 17.44 15.68C17.53 16.76 18.52 17.55 19.6 17.55H21.5V18.74C21.5 20.81 19.81 22.5 17.74 22.5H6.26C4.19 22.5 2.5 20.81 2.5 18.74V12.01C2.5 9.94001 4.19 8.25 6.26 8.25H17.74C19.81 8.25 21.5 9.94001 21.5 12.01V13.45H19.48C18.92 13.45 18.41 13.67 18.04 14.05Z"
                              stroke="none"
                              strokeWidth="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2.5 12.91V8.34004C2.5 7.15004 3.23 6.09 4.34 5.67L12.28 2.67C13.52 2.2 14.85 3.12003 14.85 4.45003V8.25002"
                              stroke="none"
                              strokeWidth="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M22.5588 14.4702V16.5302C22.5588 17.0802 22.1188 17.5302 21.5588 17.5502H19.5988C18.5188 17.5502 17.5288 16.7602 17.4388 15.6802C17.3788 15.0502 17.6188 14.4602 18.0388 14.0502C18.4088 13.6702 18.9188 13.4502 19.4788 13.4502H21.5588C22.1188 13.4702 22.5588 13.9202 22.5588 14.4702Z"
                              stroke="none"
                              strokeWidth="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7 12.5H14"
                              stroke="none"
                              strokeWidth="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="menu-profile-stats-txt">
                          <div className="stats-label"> Wallet </div>
                          <div className="stats-value">
                            <span> $ 1429.43 </span>
                            <a href="#" className="load-wallet-btn">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M5.3335 8H10.6668"
                                  stroke="url(#paint0_linear_1510_49)"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M8 10.6667V5.33333"
                                  stroke="url(#paint1_linear_1510_49)"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M6.00016 14.6667H10.0002C13.3335 14.6667 14.6668 13.3333 14.6668 9.99999V5.99999C14.6668 2.66666 13.3335 1.33333 10.0002 1.33333H6.00016C2.66683 1.33333 1.3335 2.66666 1.3335 5.99999V9.99999C1.3335 13.3333 2.66683 14.6667 6.00016 14.6667Z"
                                  stroke="url(#paint2_linear_1510_49)"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <defs>
                                  <linearGradient
                                    id="paint0_linear_1510_49"
                                    x1="5.64956"
                                    y1="8"
                                    x2="8.44518"
                                    y2="11.6352"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stopColor="#FECE26" />
                                    <stop offset="1" stopColor="#E5741F" />
                                  </linearGradient>
                                  <linearGradient
                                    id="paint1_linear_1510_49"
                                    x1="8.05926"
                                    y1="5.33333"
                                    x2="9.4668"
                                    y2="5.39767"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stopColor="#FECE26" />
                                    <stop offset="1" stopColor="#E5741F" />
                                  </linearGradient>
                                  <linearGradient
                                    id="paint2_linear_1510_49"
                                    x1="2.12364"
                                    y1="1.33333"
                                    x2="19.8748"
                                    y2="5.66123"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stopColor="#FECE26" />
                                    <stop offset="1" stopColor="#E5741F" />
                                  </linearGradient>
                                </defs>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="menu-profile-stats-item">
                        <div className="icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 25"
                            fill="none"
                          >
                            <path
                              d="M15 2.5H9C4 2.5 2 4.5 2 9.5V15.5C2 19.28 3.14 21.35 5.86 22.12C6.08 19.52 8.75 17.47 12 17.47C15.25 17.47 17.92 19.52 18.14 22.12C20.86 21.35 22 19.28 22 15.5V9.5C22 4.5 20 2.5 15 2.5ZM12 14.67C10.02 14.67 8.42 13.06 8.42 11.08C8.42 9.10002 10.02 7.5 12 7.5C13.98 7.5 15.58 9.10002 15.58 11.08C15.58 13.06 13.98 14.67 12 14.67Z"
                              stroke="none"
                              strokeWidth="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M18.1399 22.12C17.2599 22.38 16.2199 22.5 14.9999 22.5H8.99986C7.77986 22.5 6.73986 22.38 5.85986 22.12C6.07986 19.52 8.74986 17.47 11.9999 17.47C15.2499 17.47 17.9199 19.52 18.1399 22.12Z"
                              stroke="none"
                              strokeWidth="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15.5799 11.08C15.5799 13.06 13.9799 14.67 11.9999 14.67C10.0199 14.67 8.41992 13.06 8.41992 11.08C8.41992 9.10002 10.0199 7.5 11.9999 7.5C13.9799 7.5 15.5799 9.10002 15.5799 11.08Z"
                              stroke="none"
                              strokeWidth="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="menu-profile-stats-txt">
                          <div className="stats-label"> Subscribers </div>
                          <div className="stats-value">
                            <span> 10K </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="menu-links-container">
                  <div className="links-block">
                    <div className="menu-links-wrapper">
                      <a href="#" className="menu-link my-profile-link">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M12 12.1429C14.7614 12.1429 17 9.90428 17 7.14285C17 4.38143 14.7614 2.14285 12 2.14285C9.23858 2.14285 7 4.38143 7 7.14285C7 9.90428 9.23858 12.1429 12 12.1429Z"
                            stroke="none"
                            strokeWidth="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M20.5901 22.1429C20.5901 18.2729 16.7402 15.1429 12.0002 15.1429C7.26015 15.1429 3.41016 18.2729 3.41016 22.1429"
                            stroke="none"
                            strokeWidth="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>My Profile</span>
                      </a>
                      <a href="#" className="menu-link edit-profile-link">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M12 12.1429C14.7614 12.1429 17 9.90428 17 7.14285C17 4.38143 14.7614 2.14285 12 2.14285C9.23858 2.14285 7 4.38143 7 7.14285C7 9.90428 9.23858 12.1429 12 12.1429Z"
                            stroke="none"
                            strokeWidth="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3.41016 22.1429C3.41016 18.2729 7.26018 15.1429 12.0002 15.1429C13.0402 15.1429 14.0402 15.2928 14.9702 15.5728"
                            stroke="none"
                            strokeWidth="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19.2101 15.8829L15.67 19.4229C15.53 19.5629 15.4 19.8229 15.37 20.0129L15.18 21.3629C15.11 21.8529 15.45 22.1929 15.94 22.1229L17.29 21.9329C17.48 21.9029 17.75 21.7729 17.88 21.6329L21.42 18.0929C22.03 17.4829 22.32 16.7729 21.42 15.8729C20.53 14.9829 19.8201 15.2729 19.2101 15.8829Z"
                            stroke="none"
                            strokeWidth="none"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.7002 16.3929C19.0002 17.4729 19.8402 18.3128 20.9202 18.6128"
                            stroke="none"
                            strokeWidth="none"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Edit Profile</span>
                      </a>
                      <a href="#" className="menu-link blacklist-link">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M12 12.1429C14.7614 12.1429 17 9.90428 17 7.14285C17 4.38143 14.7614 2.14285 12 2.14285C9.23858 2.14285 7 4.38143 7 7.14285C7 9.90428 9.23858 12.1429 12 12.1429Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3.41016 22.1429C3.41016 18.2729 7.26015 15.1429 12.0002 15.1429C12.9602 15.1429 13.8902 15.2728 14.7602 15.5128"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 18.1429C22 18.4629 21.96 18.7728 21.88 19.0728C21.79 19.4728 21.63 19.8629 21.42 20.2029C20.73 21.3629 19.46 22.1429 18 22.1429C16.97 22.1429 16.04 21.7528 15.34 21.1128C15.04 20.8528 14.78 20.5429 14.58 20.2029C14.21 19.6029 14 18.8929 14 18.1429C14 17.0629 14.43 16.0729 15.13 15.3529C15.86 14.6029 16.88 14.1429 18 14.1429C19.18 14.1429 20.25 14.6529 20.97 15.4729C21.61 16.1829 22 17.1229 22 18.1429Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.5 15.6429L20.5 20.1429"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Blacklist</span>
                      </a>
                      <a href="#" className="menu-link block-countries-link">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M12 22.1429C17.5 22.1429 22 17.6429 22 12.1429C22 6.64285 17.5 2.14285 12 2.14285C6.5 2.14285 2 6.64285 2 12.1429C2 17.6429 6.5 22.1429 12 22.1429Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.5 19.1428L5.5 4.64282"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Block Countries</span>
                      </a>
                      <a href="#" className="menu-link banking-to-earn-link">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M12.37 2.29288L21.37 5.89286C21.72 6.03286 22 6.45285 22 6.82285V10.1429C22 10.6929 21.55 11.1429 21 11.1429H3C2.45 11.1429 2 10.6929 2 10.1429V6.82285C2 6.45285 2.28 6.03286 2.63 5.89286L11.63 2.29288C11.83 2.21288 12.17 2.21288 12.37 2.29288Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 22.1429H2V19.1429C2 18.5929 2.45 18.1429 3 18.1429H21C21.55 18.1429 22 18.5929 22 19.1429V22.1429Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4 18.1429V11.1429"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 18.1429V11.1429"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 18.1429V11.1429"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 18.1429V11.1429"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M20 18.1429V11.1429"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M1 22.1429H23"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 8.64285C12.8284 8.64285 13.5 7.97128 13.5 7.14285C13.5 6.31443 12.8284 5.64285 12 5.64285C11.1716 5.64285 10.5 6.31443 10.5 7.14285C10.5 7.97128 11.1716 8.64285 12 8.64285Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Banking (to earn)</span>
                      </a>
                    </div>
                  </div>
                  <div className="links-block">
                    <div className="menu-links-wrapper">
                      <a href="#" className="menu-link posts-link">
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
                      </a>
                      <a href="#" className="menu-link videos-link">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M12.53 20.8485H6.21C3.05 20.8485 2 18.7485 2 16.6385V8.21854C2 5.05854 3.05 4.00854 6.21 4.00854H12.53C15.69 4.00854 16.74 5.05854 16.74 8.21854V16.6385C16.74 19.7985 15.68 20.8485 12.53 20.8485Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19.5202 17.5286L16.7402 15.5786V9.26857L19.5202 7.31857C20.8802 6.36857 22.0002 6.94857 22.0002 8.61857V16.2386C22.0002 17.9086 20.8802 18.4886 19.5202 17.5286Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11.5 11.4286C12.3284 11.4286 13 10.757 13 9.92856C13 9.10013 12.3284 8.42856 11.5 8.42856C10.6716 8.42856 10 9.10013 10 9.92856C10 10.757 10.6716 11.4286 11.5 11.4286Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Videos</span>
                      </a>
                      <a href="#" className="menu-link photos-link">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M9 22.4286H15C20 22.4286 22 20.4286 22 15.4286V9.42859C22 4.42859 20 2.42859 15 2.42859H9C4 2.42859 2 4.42859 2 9.42859V15.4286C2 20.4286 4 22.4286 9 22.4286Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 10.4286C10.1046 10.4286 11 9.53316 11 8.42859C11 7.32402 10.1046 6.42859 9 6.42859C7.89543 6.42859 7 7.32402 7 8.42859C7 9.53316 7.89543 10.4286 9 10.4286Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2.66992 19.3786L7.59992 16.0686C8.38992 15.5386 9.52992 15.5986 10.2399 16.2086L10.5699 16.4986C11.3499 17.1686 12.6099 17.1686 13.3899 16.4986L17.5499 12.9286C18.3299 12.2586 19.5899 12.2586 20.3699 12.9286L21.9999 14.3286"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Photos</span>
                      </a>
                      <a href="#" className="menu-link followers-link">
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
                      </a>
                      <a href="#" className="menu-link following-link">
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
                      </a>
                      <a href="#" className="menu-link wishlist-link">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M16.8198 2.42859H7.17982C5.04982 2.42859 3.31982 4.16859 3.31982 6.28859V20.3786C3.31982 22.1786 4.60982 22.9386 6.18982 22.0686L11.0698 19.3586C11.5898 19.0686 12.4298 19.0686 12.9398 19.3586L17.8198 22.0686C19.3998 22.9486 20.6898 22.1886 20.6898 20.3786V6.28859C20.6798 4.16859 18.9498 2.42859 16.8198 2.42859Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.8198 2.42859H7.17982C5.04982 2.42859 3.31982 4.16859 3.31982 6.28859V20.3786C3.31982 22.1786 4.60982 22.9386 6.18982 22.0686L11.0698 19.3586C11.5898 19.0686 12.4298 19.0686 12.9398 19.3586L17.8198 22.0686C19.3998 22.9486 20.6898 22.1886 20.6898 20.3786V6.28859C20.6798 4.16859 18.9498 2.42859 16.8198 2.42859Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9.25 9.47864C11.03 10.1286 12.97 10.1286 14.75 9.47864"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Wishlist</span>
                      </a>
                      <a href="#" className="menu-link purchased-media-link">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M15.59 12.6886C18.4232 12.6886 20.72 10.3918 20.72 7.55859C20.72 4.72537 18.4232 2.42859 15.59 2.42859C12.7567 2.42859 10.46 4.72537 10.46 7.55859C10.46 10.3918 12.7567 12.6886 15.59 12.6886Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                          />
                          <path
                            d="M6.35977 19.8686C8.06081 19.8686 9.43979 18.4897 9.43979 16.7886C9.43979 15.0876 8.06081 13.7086 6.35977 13.7086C4.65873 13.7086 3.27979 15.0876 3.27979 16.7886C3.27979 18.4897 4.65873 19.8686 6.35977 19.8686Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                          />
                          <path
                            d="M16.6201 22.4286C18.0339 22.4286 19.1801 21.2824 19.1801 19.8686C19.1801 18.4547 18.0339 17.3086 16.6201 17.3086C15.2062 17.3086 14.0601 18.4547 14.0601 19.8686C14.0601 21.2824 15.2062 22.4286 16.6201 22.4286Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                          />
                        </svg>
                        <span>Purchased Media</span>
                      </a>
                      <a href="#" className="menu-link store-link">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M3.00977 11.6486V16.1386C3.00977 20.6286 4.80977 22.4286 9.29977 22.4286H14.6898C19.1798 22.4286 20.9798 20.6286 20.9798 16.1386V11.6486"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 12.4286C13.83 12.4286 15.18 10.9386 15 9.10859L14.34 2.42859H9.66999L8.99999 9.10859C8.81999 10.9386 10.17 12.4286 12 12.4286Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.3098 12.4286C20.3298 12.4286 21.8098 10.7886 21.6098 8.77859L21.3298 6.02859C20.9698 3.42859 19.9698 2.42859 17.3498 2.42859H14.2998L14.9998 9.43859C15.1698 11.0886 16.6598 12.4286 18.3098 12.4286Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.63988 12.4286C7.28988 12.4286 8.77988 11.0886 8.93988 9.43859L9.15988 7.22859L9.63988 2.42859H6.58988C3.96988 2.42859 2.96988 3.42859 2.60988 6.02859L2.33988 8.77859C2.13988 10.7886 3.61988 12.4286 5.63988 12.4286Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 17.4286C10.33 17.4286 9.5 18.2586 9.5 19.9286V22.4286H14.5V19.9286C14.5 18.2586 13.67 17.4286 12 17.4286Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Store</span>
                      </a>
                    </div>
                  </div>
                  <div className="links-block">
                    <div className="menu-links-block-label">Wallet History</div>
                    <div className="menu-links-wrapper">
                      <a
                        href="#"
                        className="menu-link wallet-transactions-link"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M18.04 14.2643C17.62 14.6743 17.38 15.2643 17.44 15.8943C17.53 16.9743 18.52 17.7643 19.6 17.7643H21.5V18.9543C21.5 21.0243 19.81 22.7143 17.74 22.7143H6.26C4.19 22.7143 2.5 21.0243 2.5 18.9543V12.2243C2.5 10.1543 4.19 8.46429 6.26 8.46429H17.74C19.81 8.46429 21.5 10.1543 21.5 12.2243V13.6643H19.48C18.92 13.6643 18.41 13.8843 18.04 14.2643Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2.5 13.1243V8.55434C2.5 7.36434 3.23 6.30429 4.34 5.88429L12.28 2.88429C13.52 2.41429 14.85 3.33432 14.85 4.66432V8.46431"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22.5588 14.6844V16.7445C22.5588 17.2945 22.1188 17.7445 21.5588 17.7645H19.5988C18.5188 17.7645 17.5288 16.9745 17.4388 15.8945C17.3788 15.2645 17.6188 14.6745 18.0388 14.2645C18.4088 13.8845 18.9188 13.6645 19.4788 13.6645H21.5588C22.1188 13.6845 22.5588 14.1344 22.5588 14.6844Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7 12.7143H14"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Wallet Transactions</span>
                      </a>
                      <a href="#" className="menu-link order-history-link">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M7.5 8.3843V7.4143C7.5 5.1643 9.31 2.9543 11.56 2.7443C14.24 2.4843 16.5 4.5943 16.5 7.2243V8.6043"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.99983 22.7143H14.9998C19.0198 22.7143 19.7398 21.1043 19.9498 19.1443L20.6998 13.1443C20.9698 10.7043 20.2698 8.71429 15.9998 8.71429H7.99983C3.72983 8.71429 3.02983 10.7043 3.29983 13.1443L4.04983 19.1443C4.25983 21.1043 4.97983 22.7143 8.99983 22.7143Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.4955 12.7143H15.5045"
                            stroke="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.49451 12.7143H8.50349"
                            stroke="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Order History</span>
                      </a>
                      <a href="#" className="menu-link payment-history-link">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M22 6.71429V9.13429C22 10.7143 21 11.7143 19.42 11.7143H16V4.72429C16 3.61429 16.91 2.71429 18.02 2.71429C19.11 2.72429 20.11 3.16429 20.83 3.88429C21.55 4.61429 22 5.61429 22 6.71429Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 7.71429V21.7143C2 22.5443 2.93998 23.0143 3.59998 22.5143L5.31 21.2343C5.71 20.9343 6.27 20.9743 6.63 21.3343L8.28998 23.0043C8.67998 23.3943 9.32002 23.3943 9.71002 23.0043L11.39 21.3243C11.74 20.9743 12.3 20.9343 12.69 21.2343L14.4 22.5143C15.06 23.0043 16 22.5343 16 21.7143V4.71429C16 3.61429 16.9 2.71429 18 2.71429H7H6C3 2.71429 2 4.50429 2 6.71429V7.71429Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6 9.71429H12"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.75 13.7143H11.25"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Payment History</span>
                      </a>
                    </div>
                  </div>

                  <div className="links-block">
                    <div className="menu-links-wrapper">
                      <a href="#" className="menu-link payout-requests-link">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9.5 13.75C9.5 14.72 10.25 15.5 11.17 15.5H13.05C13.85 15.5 14.5 14.82 14.5 13.97C14.5 13.06 14.1 12.73 13.51 12.52L10.5 11.47C9.91 11.26 9.51001 10.94 9.51001 10.02C9.51001 9.17999 10.16 8.48999 10.96 8.48999H12.84C13.76 8.48999 14.51 9.26999 14.51 10.24"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 7.5V16.5"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />

                          <path
                            d="M22 6V2H18"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17 7L22 2"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Payout Requests</span>
                      </a>
                      <a href="#" className="menu-link premium-btn">
                        <svg
                          className="self-colored"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M18 18.86H17.24C16.44 18.86 15.68 19.17 15.12 19.73L13.41 21.42C12.63 22.19 11.36 22.19 10.58 21.42L8.87 19.73C8.31 19.17 7.54 18.86 6.75 18.86H6C4.34 18.86 3 17.53 3 15.89V4.97C3 3.33 4.34 2 6 2H18C19.66 2 21 3.33 21 4.97V15.88C21 17.52 19.66 18.86 18 18.86Z"
                            stroke="url(#paint0_linear_1469_2244)"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12.0701 8.94999C12.0301 8.94999 11.97 8.94999 11.92 8.94999C10.87 8.90999 10.04 8.05999 10.04 6.99999C10.04 5.91999 10.9101 5.04999 11.9901 5.04999C13.0701 5.04999 13.9401 5.92999 13.9401 6.99999C13.9501 8.05999 13.1201 8.91999 12.0701 8.94999Z"
                            stroke="url(#paint1_linear_1469_2244)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9.24994 11.96C7.91994 12.85 7.91994 14.3 9.24994 15.19C10.7599 16.2 13.2399 16.2 14.7499 15.19C16.0799 14.3 16.0799 12.85 14.7499 11.96C13.2399 10.96 10.7699 10.96 9.24994 11.96Z"
                            stroke="url(#paint2_linear_1469_2244)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_1469_2244"
                              x1="4.0667"
                              y1="2"
                              x2="28.2887"
                              y2="7.31567"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FECE26" />
                              <stop offset="1" stopColor="#E5741F" />
                            </linearGradient>
                            <linearGradient
                              id="paint1_linear_1469_2244"
                              x1="10.2712"
                              y1="5.04999"
                              x2="15.4635"
                              y2="6.31597"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FECE26" />
                              <stop offset="1" stopColor="#E5741F" />
                            </linearGradient>
                            <linearGradient
                              id="paint2_linear_1469_2244"
                              x1="8.6966"
                              y1="11.21"
                              x2="17.899"
                              y2="14.7595"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FECE26" />
                              <stop offset="1" stopColor="#E5741F" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <span>Promote Profile</span>
                        <svg
                          className="arrow-icon"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5 12H19"
                            stroke="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 5L19 12L12 19"
                            stroke="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                      <a href="#" className="menu-link sign-out-link" onClick={handleLogout}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M15.1001 7.55999C14.7901 3.95999 12.9401 2.48999 8.8901 2.48999H8.7601C4.2901 2.48999 2.5001 4.27999 2.5001 8.74999V15.27C2.5001 19.74 4.2901 21.53 8.7601 21.53H8.8901C12.9101 21.53 14.7601 20.08 15.0901 16.54"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.99988 12H20.3799"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.15 8.65002L21.5 12L18.15 15.35"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Sign Out</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
