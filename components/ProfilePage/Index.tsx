"use client";
import React, { useEffect, useState } from "react";
import { getApiWithOutQuery } from "@/utils/endpoints/common";
import { API_CREATOR_PROFILE } from "@/utils/api/APIConstant";
import ProfileTab from "./ProfileTab";
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  userName: string;
  email: string;
  role: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface CreatorDetails {
  _id: string;
  userId: string;
  bodyType: string;
  sexualOrientation: string;
  age: string;
  eyeColor: string;
  hairColor: string;
  ethnicity: string;
  height: string;
  style: string;
  size: string;
  popularity: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiCreatorProfileResponse {
  user: User;
  creator: CreatorDetails;
}
const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<string>("posts");
  const [profile, setProfile] = useState<ApiCreatorProfileResponse | null>(
    null
  );
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [layoutTab, setLayoutTab] = useState("grid");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getApiWithOutQuery({
          url: API_CREATOR_PROFILE,
        });

        console.log("==============", response);

        if (response && response.user && response.creator) {
          setProfile(response);
        } else {
          setError("Failed to load profile - Invalid response structure");
          console.error("Invalid response structure:", response);
        }
      } catch (err: any) {
        setError("An error occurred while fetching profile");
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleLike = (id: number) => {
  setLikedItems((prev) =>
    prev.includes(id)
      ? prev.filter((item) => item !== id)
      : [...prev, id]
  );
}

  return (
    <div className="moneyboy-page-content-container">
      <main className="moneyboy-dynamic-content-layout">
        <div className="moneyboy-2x-1x-layout-container">
          <div className="creator-profile-page-container">
            <div className="creator-profile-front-content-container">
              <div className="creator-profile-card-container card">
                <div className="creator-profile-banner">
                  <img
                    src="/images/profile-banners/profile-banner-2.jpg"
                    alt="Creator Profile Banner Image"
                  />
                </div>
                <div className="creator-profile-info-container">
                  <div className="profile-card">
                    <div className="profile-info-buttons">
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
                              {/* Dynamic Name */}
                              {profile?.user?.displayName || "Unknown Creator"}
                            </div>
                            {/* Dynamic Badge - Only show if verified */}
                          </div>
                          <div className="profile-card__username">
                            {/* Dynamic Username */}@
                            {profile?.user?.userName || "unknown"}
                          </div>
                        </div>
                      </div>
                      <div className="creator-profile-buttons">
                        <ul>
                          <li>
                            <a href="#" className="save-btn">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                              >
                                <path
                                  d="M16.8203 2.5H7.18031C5.05031 2.5 3.32031 4.24 3.32031 6.36V20.45C3.32031 22.25 4.61031 23.01 6.19031 22.14L11.0703 19.43C11.5903 19.14 12.4303 19.14 12.9403 19.43L17.8203 22.14C19.4003 23.02 20.6903 22.26 20.6903 20.45V6.36C20.6803 4.24 18.9503 2.5 16.8203 2.5Z"
                                  stroke="none"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M16.8203 2.5H7.18031C5.05031 2.5 3.32031 4.24 3.32031 6.36V20.45C3.32031 22.25 4.61031 23.01 6.19031 22.14L11.0703 19.43C11.5903 19.14 12.4303 19.14 12.9403 19.43L17.8203 22.14C19.4003 23.02 20.6903 22.26 20.6903 20.45V6.36C20.6803 4.24 18.9503 2.5 16.8203 2.5Z"
                                  stroke="none"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9.25 9.54999C11.03 10.2 12.97 10.2 14.75 9.54999"
                                  stroke="none"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="tip-btn">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                              >
                                <path
                                  d="M9.99 18.48C14.4028 18.48 17.98 14.9028 17.98 10.49C17.98 6.07724 14.4028 2.5 9.99 2.5C5.57724 2.5 2 6.07724 2 10.49C2 14.9028 5.57724 18.48 9.99 18.48Z"
                                  stroke="none"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12.9805 20.38C13.8805 21.65 15.3505 22.48 17.0305 22.48C19.7605 22.48 21.9805 20.26 21.9805 17.53C21.9805 15.87 21.1605 14.4 19.9105 13.5"
                                  stroke="none"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M8 11.9C8 12.67 8.6 13.3 9.33 13.3H10.83C11.47 13.3 11.99 12.75 11.99 12.08C11.99 11.35 11.67 11.09 11.2 10.92L8.8 10.08C8.32 9.91001 8 9.65001 8 8.92001C8 8.25001 8.52 7.70001 9.16 7.70001H10.66C11.4 7.71001 12 8.33001 12 9.10001"
                                  stroke="none"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M10 13.35V14.09"
                                  stroke="none"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M10 6.91V7.69"
                                  stroke="none"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="share-btn">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                              >
                                <path
                                  d="M16.4405 9.39999C20.0405 9.70999 21.5105 11.56 21.5105 15.61V15.74C21.5105 20.21 19.7205 22 15.2505 22H8.74047C4.27047 22 2.48047 20.21 2.48047 15.74V15.61C2.48047 11.59 3.93047 9.73999 7.47047 9.40999"
                                  stroke="none"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12 15.5V4.12"
                                  stroke="none"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M15.3504 6.35L12.0004 3L8.65039 6.35"
                                  stroke="none"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="like-btn">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                              >
                                <path
                                  d="M12.62 21.31C12.28 21.43 11.72 21.43 11.38 21.31C8.48 20.32 2 16.19 2 9.19001C2 6.10001 4.49 3.60001 7.56 3.60001C9.38 3.60001 10.99 4.48001 12 5.84001C13.01 4.48001 14.63 3.60001 16.44 3.60001C19.51 3.60001 22 6.10001 22 9.19001C22 16.19 15.52 20.32 12.62 21.31Z"
                                  stroke="none"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="message-btn">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                              >
                                <path
                                  d="M22 10.5V13.5C22 17.5 20 19.5 16 19.5H15.5C15.19 19.5 14.89 19.65 14.7 19.9L13.2 21.9C12.54 22.78 11.46 22.78 10.8 21.9L9.3 19.9C9.14 19.68 8.77 19.5 8.5 19.5H8C4 19.5 2 18.5 2 13.5V8.5C2 4.5 4 2.5 8 2.5H14"
                                  stroke="none"
                                  strokeWidth="1.5"
                                  strokeMiterlimit="10"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M19.5 7.5C20.8807 7.5 22 6.38071 22 5C22 3.61929 20.8807 2.5 19.5 2.5C18.1193 2.5 17 3.61929 17 5C17 6.38071 18.1193 7.5 19.5 7.5Z"
                                  stroke="none"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M15.9965 11.5H16.0054"
                                  stroke="none"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M11.9945 11.5H12.0035"
                                  stroke="none"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M7.99451 11.5H8.00349"
                                  stroke="none"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <button className="btn-txt-gradient">
                              <span>Follow</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="profile-card__geo-details">
                      <div className="profile-card__geo-detail">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z"
                            stroke="none"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M11.9999 13.43C13.723 13.43 15.1199 12.0331 15.1199 10.31C15.1199 8.58687 13.723 7.19 11.9999 7.19C10.2768 7.19 8.87988 8.58687 8.87988 10.31C8.87988 12.0331 10.2768 13.43 11.9999 13.43Z"
                            stroke="none"
                            strokeWidth="1.5"
                          />
                        </svg>
                        <span>Ocala, Florida</span>
                      </div>
                      <div className="profile-card__geo-detail">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M8 2V5"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 2V5"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 11H16"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 16H12"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Joined March 2012</span>
                      </div>
                    </div>
                    <div className="creator-profile-stats-link">
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
                              ></path>
                              <path
                                d="M22 10.4286H18C15 10.4286 14 9.42856 14 6.42856V2.42856L22 10.4286Z"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M7 13.4286H13"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M7 17.4286H11"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                            <span>Posts</span>
                          </div>
                        </div>
                        <div className="profile-card__stats-item followers-stats">
                          <div className="profile-card__stats-num"> 253 </div>
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
                              ></path>
                              <path
                                d="M16.4098 4.42859C18.3498 4.42859 19.9098 5.99859 19.9098 7.92859C19.9098 9.81859 18.4098 11.3586 16.5398 11.4286C16.4598 11.4186 16.3698 11.4186 16.2798 11.4286"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M4.16021 14.9886C1.74021 16.6086 1.74021 19.2486 4.16021 20.8586C6.91021 22.6986 11.4202 22.6986 14.1702 20.8586C16.5902 19.2386 16.5902 16.5986 14.1702 14.9886C11.4302 13.1586 6.92021 13.1586 4.16021 14.9886Z"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M18.3398 20.4286C19.0598 20.2786 19.7398 19.9886 20.2998 19.5586C21.8598 18.3886 21.8598 16.4586 20.2998 15.2886C19.7498 14.8686 19.0798 14.5886 18.3698 14.4286"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
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
                              ></path>
                              <path
                                d="M7.16021 14.9886C4.74021 16.6086 4.74021 19.2486 7.16021 20.8586C9.91021 22.6986 14.4202 22.6986 17.1702 20.8586C19.5902 19.2386 19.5902 16.5986 17.1702 14.9886C14.4302 13.1586 9.92021 13.1586 7.16021 14.9886Z"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                            <span>Following</span>
                          </div>
                        </div>
                      </div>
                      <div className="creator-profile-link">
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M7.9407 14.51C7.3207 14.28 6.7707 13.83 6.4207 13.19C5.6207 11.73 6.1107 9.83001 7.5307 8.95001L9.8707 7.5C11.2807 6.62 13.1007 7.09999 13.9007 8.54999C14.7007 10.01 14.2107 11.91 12.7907 12.79L12.4807 13.01"
                              stroke="none"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16.1092 9.45001C16.7292 9.68001 17.2792 10.13 17.6292 10.77C18.4292 12.23 17.9392 14.13 16.5192 15.01L14.1792 16.46C12.7692 17.34 10.9492 16.86 10.1492 15.41C9.34921 13.95 9.83922 12.05 11.2592 11.17L11.5692 10.95"
                              stroke="none"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              stroke="none"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span> moneyboy.com/coreybergson </span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="creator-profile-description">
                    <p>
                      Today, I experienced the most blissful ride outside. The
                      air is fresh and It
                    </p>
                  </div>

                  <div className="creator-subscriptions-container">
                    <div className="subscriptions-container">
                      <ul>
                        <li>
                          <div className="subscription-info">
                            <div className="subscription-label">
                              Monthly Subscription
                            </div>
                            <div className="subscription-price">
                              <h3>$9.99</h3>
                              <span>/month</span>
                            </div>
                          </div>
                          <div className="subscripton-button">
                            <button className="btn-txt-gradient btn-outline p-sm">
                              <span>Subscribe</span>
                            </button>
                          </div>
                        </li>
                        <li>
                          <div className="subscription-info">
                            <div className="subscription-label">
                              Yearly Subscription
                            </div>
                            <div className="subscription-price">
                              <h3>$89.99</h3>
                              <span>/year</span>
                              <div className="save-txt">(Save 25%)</div>
                            </div>
                          </div>
                          <div className="subscripton-button">
                            <button className="btn-txt-gradient btn-outline p-sm">
                              <span>Subscribe</span>
                            </button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="creator-profile-page-multi-tab-section card">
                <div className="creator-profile-page-multi-tab-container">
                  <div className="multi-tab-section" data-multiple-tabs-section>
                    <div className="multi-tabs-layout-container">
                      <div className="multi-tabs-action-buttons">
                        {/* Posts Tab Button */}
                        <button
                          className={`multi-tab-switch-btn posts-btn ${
                            activeTab === "posts" ? "active" : ""
                          }`}
                          onClick={() => handleTabClick("posts")}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                          >
                            <path
                              d="M22 10.5V15.5C22 20.5 20 22.5 15 22.5H9C4 22.5 2 20.5 2 15.5V9.5C2 4.5 4 2.5 9 2.5H14"
                              stroke="none"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M22 10.5H18C15 10.5 14 9.5 14 6.5V2.5L22 10.5Z"
                              stroke="none"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7 13.5H13"
                              stroke="none"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7 17.5H11"
                              stroke="none"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>Posts</span>
                        </button>

                        {/* Videos Tab Button */}
                        <button
                          className={`multi-tab-switch-btn videos-btn ${
                            activeTab === "videos" ? "active" : ""
                          }`}
                          onClick={() => handleTabClick("videos")}
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
                              d="M8 11H16"
                              stroke="none"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 16H12"
                              stroke="none"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>Videos</span>
                        </button>

                        {/* Photos Tab Button */}
                        <button
                          className={`multi-tab-switch-btn photos-btn ${
                            activeTab === "photos" ? "active" : ""
                          }`}
                          onClick={() => handleTabClick("photos")}
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

                        <div className="">
                          <a href="#" className="premium-btn store-btn">
                            <img
                              src="/images/logo/profile-badge.png"
                              alt="Store Button Icon"
                            />
                            <span>Store</span>
                          </a>
                        </div>
                      </div>

                      <div className="multi-tabs-content-container content-creator-profile-tabs-layout-wrapper">
                        {activeTab === "posts" && (
                          <div
                            data-multi-tabs-content-tabdata__active
                            data-multi-dem-cards-layout
                          >
                            <div className="creator-content-filter-grid-container">
                              <ProfileTab
                                onChangeLayouts={(layout) =>
                                  setLayoutTab(layout)
                                }
                                onChangeTab={(tab) => console.log("Tab:", tab)}
                              />
                              <div
                                className="creator-content-cards-wrapper multi-dem-cards-wrapper-layout"
                                data-direct-cards-layout
                                data-layout-toggle-rows={
                                  layoutTab === "list" ? true : undefined
                                }
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
                                    </div>

                                    <div className="creator-content-card__description">
                                      <p>
                                        Today, I experienced the most blissful
                                        ride outside.
                                      </p>
                                    </div>

                                    <div className="creator-content-card__stats">
                                      <div className="creator-content-stat-box">
                                        <button
                                          className={`like-button ${
                                            likedItems.includes(1) ? "liked" : ""
                                          }`}
                                          onClick={() => toggleLike(1)}
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

                                    <div className="creator-content-card__description">
                                      <p>
                                        Today, I experienced the most blissful
                                        ride outside.
                                      </p>
                                    </div>

                                    <div className="creator-content-card__stats">
                                      <div className="creator-content-stat-box">
                                       <button
                                          className={`like-button ${
                                            likedItems.includes(2) ? "liked" : ""
                                          }`}
                                          onClick={() => toggleLike(2)}
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

                                        <span>12K</span>
                                      </div>
                                      <div className="creator-content-stat-box wishlist-btn">
                                        <button>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="25"
                                            viewBox="0 0 24 25"
                                            fill="none"
                                          >
                                            <path
                                              d="M16.8203 2.5H7.18031C5.05031 2.5 3.32031 4.24 3.32031 6.36V20.45C3.32031 22.25 4.61031 23.01 6.19031 22.14L11.0703 19.43C11.5903 19.14 12.4303 19.14 12.9403 19.43L17.8203 22.14C19.4003 23.02 20.6903 22.26 20.6903 20.45V6.36C20.6803 4.24 18.9503 2.5 16.8203 2.5Z"
                                              stroke="none"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            ></path>
                                            <path
                                              d="M16.8203 2.5H7.18031C5.05031 2.5 3.32031 4.24 3.32031 6.36V20.45C3.32031 22.25 4.61031 23.01 6.19031 22.14L11.0703 19.43C11.5903 19.14 12.4303 19.14 12.9403 19.43L17.8203 22.14C19.4003 23.02 20.6903 22.26 20.6903 20.45V6.36C20.6803 4.24 18.9503 2.5 16.8203 2.5Z"
                                              stroke="none"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            ></path>
                                            <path
                                              d="M9.25 9.54999C11.03 10.2 12.97 10.2 14.75 9.54999"
                                              stroke="none"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            ></path>
                                          </svg>
                                        </button>
                                        <span>10</span>
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

                                    <div className="creator-content-card__description">
                                      <p>
                                        Today, I experienced the most blissful
                                        ride outside.
                                      </p>
                                    </div>

                                    <div className="creator-content-card__stats">
                                      <div className="creator-content-stat-box">
                                        <button
                                          className={`like-button ${
                                            likedItems.includes(3) ? "liked" : ""
                                          }`}
                                          onClick={() => toggleLike(3)}
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

                                    <div className="creator-content-card__description">
                                      <p>
                                        Today, I experienced the most blissful
                                        ride outside.
                                      </p>
                                    </div>

                                    <div className="creator-content-card__stats">
                                      <div className="creator-content-stat-box">
                                       <button
                                          className={`like-button ${
                                            likedItems.includes(4) ? "liked" : ""
                                          }`}
                                          onClick={() => toggleLike(4)}
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

                                        <span>12K</span>
                                      </div>
                                      <div className="creator-content-stat-box wishlist-btn">
                                        <button>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="25"
                                            viewBox="0 0 24 25"
                                            fill="none"
                                          >
                                            <path
                                              d="M16.8203 2.5H7.18031C5.05031 2.5 3.32031 4.24 3.32031 6.36V20.45C3.32031 22.25 4.61031 23.01 6.19031 22.14L11.0703 19.43C11.5903 19.14 12.4303 19.14 12.9403 19.43L17.8203 22.14C19.4003 23.02 20.6903 22.26 20.6903 20.45V6.36C20.6803 4.24 18.9503 2.5 16.8203 2.5Z"
                                              stroke="none"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            ></path>
                                            <path
                                              d="M16.8203 2.5H7.18031C5.05031 2.5 3.32031 4.24 3.32031 6.36V20.45C3.32031 22.25 4.61031 23.01 6.19031 22.14L11.0703 19.43C11.5903 19.14 12.4303 19.14 12.9403 19.43L17.8203 22.14C19.4003 23.02 20.6903 22.26 20.6903 20.45V6.36C20.6803 4.24 18.9503 2.5 16.8203 2.5Z"
                                              stroke="none"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            ></path>
                                            <path
                                              d="M9.25 9.54999C11.03 10.2 12.97 10.2 14.75 9.54999"
                                              stroke="none"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            ></path>
                                          </svg>
                                        </button>
                                        <span>10</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeTab === "videos" && (
                          <div
                            data-multi-tabs-content-tab
                            data-multi-dem-cards-layout
                          >
                            <div className="creator-content-filter-grid-container">
                              <ProfileTab
                                onChangeLayouts={(layout) =>
                                  setLayoutTab(layout)
                                }
                                onChangeTab={(tab) => console.log("Tab:", tab)}
                              />
                              <div
                                className="creator-content-cards-wrapper multi-dem-cards-wrapper-layout"
                                data-direct-cards-layout
                                data-layout-toggle-rows={
                                  layoutTab === "list" ? true : undefined
                                }
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

                                    <div className="creator-content-card__description">
                                      <p>
                                        Today, I experienced the most blissful
                                        ride outside.
                                      </p>
                                    </div>

                                    <div className="creator-content-card__stats">
                                      <div className="creator-content-stat-box">
                                        <button
                                          className={`like-button ${
                                            likedItems.includes(1) ? "liked" : ""
                                          }`}
                                          onClick={() => toggleLike(1)}
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

                                    <div className="creator-content-card__description">
                                      <p>
                                        Today, I experienced the most blissful
                                        ride outside.
                                      </p>
                                    </div>

                                    <div className="creator-content-card__stats">
                                      <div className="creator-content-stat-box">
                                        <button
                                          className={`like-button ${
                                            likedItems.includes(5) ? "liked" : ""
                                          }`}
                                          onClick={() => toggleLike(5)}
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
                                <div className="creator-content-card-container">
                                  <div className="creator-content-card">
                                    <div className="creator-content-card__media">
                                      <div className="creator-card__img">
                                        <img
                                          src="/images/profile-avatars/profile-avatar-6.jpg"
                                          alt="Creator Content Image"
                                        />
                                      </div>
                                    </div>

                                    <div className="creator-content-card__description">
                                      <p>
                                        Today, I experienced the most blissful
                                        ride outside.
                                      </p>
                                    </div>

                                    <div className="creator-content-card__stats">
                                      <div className="creator-content-stat-box">
                                        <button
                                          className={`like-button ${
                                            likedItems.includes(6) ? "liked" : ""
                                          }`}
                                          onClick={() => toggleLike(6)}
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

                                        <span>12K</span>
                                      </div>
                                      <div className="creator-content-stat-box wishlist-btn">
                                        <button>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="25"
                                            viewBox="0 0 24 25"
                                            fill="none"
                                          >
                                            <path
                                              d="M16.8203 2.5H7.18031C5.05031 2.5 3.32031 4.24 3.32031 6.36V20.45C3.32031 22.25 4.61031 23.01 6.19031 22.14L11.0703 19.43C11.5903 19.14 12.4303 19.14 12.9403 19.43L17.8203 22.14C19.4003 23.02 20.6903 22.26 20.6903 20.45V6.36C20.6803 4.24 18.9503 2.5 16.8203 2.5Z"
                                              stroke="none"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            ></path>
                                            <path
                                              d="M16.8203 2.5H7.18031C5.05031 2.5 3.32031 4.24 3.32031 6.36V20.45C3.32031 22.25 4.61031 23.01 6.19031 22.14L11.0703 19.43C11.5903 19.14 12.4303 19.14 12.9403 19.43L17.8203 22.14C19.4003 23.02 20.6903 22.26 20.6903 20.45V6.36C20.6803 4.24 18.9503 2.5 16.8203 2.5Z"
                                              stroke="none"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            ></path>
                                            <path
                                              d="M9.25 9.54999C11.03 10.2 12.97 10.2 14.75 9.54999"
                                              stroke="none"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            ></path>
                                          </svg>
                                        </button>
                                        <span>13</span>
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

                                    <div className="creator-content-card__description">
                                      <p>
                                        Today, I experienced the most blissful
                                        ride outside.
                                      </p>
                                    </div>

                                    <div className="creator-content-card__stats">
                                      <div className="creator-content-stat-box">
                                      <button
                                          className={`like-button ${
                                            likedItems.includes(7) ? "liked" : ""
                                          }`}
                                          onClick={() => toggleLike(7)}
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

                                        <span>12K</span>
                                      </div>
                                      <div className="creator-content-stat-box wishlist-btn">
                                        <button>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="25"
                                            viewBox="0 0 24 25"
                                            fill="none"
                                          >
                                            <path
                                              d="M16.8203 2.5H7.18031C5.05031 2.5 3.32031 4.24 3.32031 6.36V20.45C3.32031 22.25 4.61031 23.01 6.19031 22.14L11.0703 19.43C11.5903 19.14 12.4303 19.14 12.9403 19.43L17.8203 22.14C19.4003 23.02 20.6903 22.26 20.6903 20.45V6.36C20.6803 4.24 18.9503 2.5 16.8203 2.5Z"
                                              stroke="none"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            ></path>
                                            <path
                                              d="M16.8203 2.5H7.18031C5.05031 2.5 3.32031 4.24 3.32031 6.36V20.45C3.32031 22.25 4.61031 23.01 6.19031 22.14L11.0703 19.43C11.5903 19.14 12.4303 19.14 12.9403 19.43L17.8203 22.14C19.4003 23.02 20.6903 22.26 20.6903 20.45V6.36C20.6803 4.24 18.9503 2.5 16.8203 2.5Z"
                                              stroke="none"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            ></path>
                                            <path
                                              d="M9.25 9.54999C11.03 10.2 12.97 10.2 14.75 9.54999"
                                              stroke="none"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            ></path>
                                          </svg>
                                        </button>
                                        <span>13</span>
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
                            data-multi-tabs-content-tab
                            data-multi-dem-cards-layout
                          >
                            <div className="creator-content-filter-grid-container">
                              <ProfileTab
                                onChangeLayouts={(layout) =>
                                  setLayoutTab(layout)
                                }
                                onChangeTab={(tab) => console.log("Tab:", tab)}
                              />
                              <div
                                className="creator-content-cards-wrapper multi-dem-cards-wrapper-layout"
                                data-direct-cards-layout
                                data-layout-toggle-rows={
                                  layoutTab === "list" ? true : undefined
                                }
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
                                      <div className="creator-content-stat-box wishlist-btn">
                                        <button>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="25"
                                            viewBox="0 0 24 25"
                                            fill="none"
                                          >
                                            <path
                                              d="M16.8203 2.5H7.18031C5.05031 2.5 3.32031 4.24 3.32031 6.36V20.45C3.32031 22.25 4.61031 23.01 6.19031 22.14L11.0703 19.43C11.5903 19.14 12.4303 19.14 12.9403 19.43L17.8203 22.14C19.4003 23.02 20.6903 22.26 20.6903 20.45V6.36C20.6803 4.24 18.9503 2.5 16.8203 2.5Z"
                                              stroke="none"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            ></path>
                                            <path
                                              d="M16.8203 2.5H7.18031C5.05031 2.5 3.32031 4.24 3.32031 6.36V20.45C3.32031 22.25 4.61031 23.01 6.19031 22.14L11.0703 19.43C11.5903 19.14 12.4303 19.14 12.9403 19.43L17.8203 22.14C19.4003 23.02 20.6903 22.26 20.6903 20.45V6.36C20.6803 4.24 18.9503 2.5 16.8203 2.5Z"
                                              stroke="none"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            ></path>
                                            <path
                                              d="M9.25 9.54999C11.03 10.2 12.97 10.2 14.75 9.54999"
                                              stroke="none"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            ></path>
                                          </svg>
                                        </button>
                                        <span>13</span>
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
                                    </div>

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
                                      <div className="creator-content-stat-box wishlist-btn">
                                        <button>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="25"
                                            viewBox="0 0 24 25"
                                            fill="none"
                                          >
                                            <path
                                              d="M16.8203 2.5H7.18031C5.05031 2.5 3.32031 4.24 3.32031 6.36V20.45C3.32031 22.25 4.61031 23.01 6.19031 22.14L11.0703 19.43C11.5903 19.14 12.4303 19.14 12.9403 19.43L17.8203 22.14C19.4003 23.02 20.6903 22.26 20.6903 20.45V6.36C20.6803 4.24 18.9503 2.5 16.8203 2.5Z"
                                              stroke="none"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            ></path>
                                            <path
                                              d="M16.8203 2.5H7.18031C5.05031 2.5 3.32031 4.24 3.32031 6.36V20.45C3.32031 22.25 4.61031 23.01 6.19031 22.14L11.0703 19.43C11.5903 19.14 12.4303 19.14 12.9403 19.43L17.8203 22.14C19.4003 23.02 20.6903 22.26 20.6903 20.45V6.36C20.6803 4.24 18.9503 2.5 16.8203 2.5Z"
                                              stroke="none"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            ></path>
                                            <path
                                              d="M9.25 9.54999C11.03 10.2 12.97 10.2 14.75 9.54999"
                                              stroke="none"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            ></path>
                                          </svg>
                                        </button>
                                        <span>13</span>
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
                                      <div className="creator-content-stat-box wishlist-btn">
                                        <button>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="25"
                                            viewBox="0 0 24 25"
                                            fill="none"
                                          >
                                            <path
                                              d="M16.8203 2.5H7.18031C5.05031 2.5 3.32031 4.24 3.32031 6.36V20.45C3.32031 22.25 4.61031 23.01 6.19031 22.14L11.0703 19.43C11.5903 19.14 12.4303 19.14 12.9403 19.43L17.8203 22.14C19.4003 23.02 20.6903 22.26 20.6903 20.45V6.36C20.6803 4.24 18.9503 2.5 16.8203 2.5Z"
                                              stroke="none"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            ></path>
                                            <path
                                              d="M16.8203 2.5H7.18031C5.05031 2.5 3.32031 4.24 3.32031 6.36V20.45C3.32031 22.25 4.61031 23.01 6.19031 22.14L11.0703 19.43C11.5903 19.14 12.4303 19.14 12.9403 19.43L17.8203 22.14C19.4003 23.02 20.6903 22.26 20.6903 20.45V6.36C20.6803 4.24 18.9503 2.5 16.8203 2.5Z"
                                              stroke="none"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            ></path>
                                            <path
                                              d="M9.25 9.54999C11.03 10.2 12.97 10.2 14.75 9.54999"
                                              stroke="none"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            ></path>
                                          </svg>
                                        </button>
                                        <span>13</span>
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

export default ProfilePage;
