"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Featuredboys from "../Featuredboys";
import InfiniteScrollWrapper from "../common/InfiniteScrollWrapper";
import ShowToast from "../common/ShowToast";
import PostCard from "../LikePage/PostCard";

import {
  API_USER_PROFILE,
  API_FOLLOWER_COUNT,
  API_GET_POSTS,
  API_GET_FOLLOWING_POSTS,
  API_GET_POPULAR_POSTS,
} from "@/utils/api/APIConstant";

import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";

/* ================= TYPES ================= */

interface UserProfile {
  userName: string;
  displayName: string;
  bio?: string;
  profile?: string;
  coverImage?: string;
  city?: string;
  country?: string;
  createdAt?: string;
}

/* ================= COMPONENT ================= */

const UserProfilePage = () => {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const [activeTab, setActiveTab] =
    useState<"feed" | "following" | "popular">("feed");

  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5;

  const [loading, setLoading] = useState(true);

  /* ================= HELPERS ================= */

  const formatJoinedDate = (date?: string) => {
    if (!date) return "";
    return `Joined ${new Date(date).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    })}`;
  };

  const handleTabClick = (tab: "feed" | "following" | "popular") => {
    setActiveTab(tab);
  };

  /* ================= API CALLS ================= */

  useEffect(() => {
    fetchProfile();
    fetchFollowerStats();
  }, []);

  useEffect(() => {
    resetAndLoadPosts();
  }, [activeTab]);

  const fetchProfile = async () => {
    try {
      const res = await getApiWithOutQuery({ url: API_USER_PROFILE });
      if (res?.success) setProfile(res.data);
      else ShowToast("Failed to load profile", "error");
    } catch {
      ShowToast("Profile load error", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowerStats = async () => {
    try {
      const res = await getApiWithOutQuery({ url: API_FOLLOWER_COUNT });
      if (res?.success) {
        setFollowers(res.data.followerCount);
        setFollowing(res.data.followingCount);
      }
    } catch {}
  };

  const resetAndLoadPosts = () => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
    loadPosts(1, true);
  };

  const loadPosts = async (currentPage = page, reset = false) => {
    if (!hasMore && !reset) return;

    let res: any[] = [];

    if (activeTab === "feed") {
      res = await apiPost({
        url: API_GET_POSTS,
        values: { page: currentPage, limit },
      });
    }

    if (activeTab === "following" && isLoggedIn) {
      const response = await getApiWithOutQuery({
        url: `${API_GET_FOLLOWING_POSTS}?page=${currentPage}&limit=${limit}`,
      });
      res = response?.success ? response.posts : [];
    }

    if (activeTab === "popular") {
      res = await apiPost({
        url: API_GET_POPULAR_POSTS,
        values: { page: currentPage, limit },
      });
    }

    if (Array.isArray(res) && res.length > 0) {
      setPosts((prev) => (currentPage === 1 ? res : [...prev, ...res]));
      setPage(currentPage + 1);
    } else {
      setHasMore(false);
    }
  };

  /* ================= UI ================= */

  if (loading) return null;

  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="moneyboy-2x-1x-a-layout">
        <div className="moneyboy-feed-page-container">
        <div className="moneyboy-posts-wrapper moneyboy-diff-content-wrappers">
          <InfiniteScrollWrapper className="moneyboy-posts-wrapper notabes" scrollableTarget="feed-scroll-container" dataLength={posts.length} hasMore={hasMore} next={() => loadPosts(page)}>
          {/* ================= PROFILE HEADER ================= */}
          <div className="creator-profile-card-container user-profile-card card">
            <div className="creator-profile-banner">
              <img src={profile?.coverImage || "/images/profile-banners/profile-banner-9.jpg"} alt="Creator Profile Banner Image" />
            </div>
            <div className="creator-profile-info-container">
              <div className="profile-card">
                <div className="profile-info-buttons">
                  <div className="profile-card__main">
                    <div className="profile-card__avatar-settings">
                      <div className="profile-card__avatar">
                       <img src={profile?.profile || "/images/profile-avatars/profile-avatar-13.jpg"} />
                      </div>
                    </div>
                    <div className="profile-card__info">
                      <div className="profile-card__name-badge">
                        <div className="profile-card__name">
                        {profile?.displayName || "Charlie Mango"}
                        </div>
                      </div>
                      <div className="profile-card__username">
                        @{profile?.userName || "charliemango"}
                      </div>
                    </div>
                  </div>
                  <div className="creator-profile-buttons">
                    <ul>
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
                              stroke-width="1.5"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M19.5 7.5C20.8807 7.5 22 6.38071 22 5C22 3.61929 20.8807 2.5 19.5 2.5C18.1193 2.5 17 3.61929 17 5C17 6.38071 18.1193 7.5 19.5 7.5Z"
                              stroke="none"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M15.9965 11.5H16.0054"
                              stroke="none"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M11.9945 11.5H12.0035"
                              stroke="none"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M7.99451 11.5H8.00349"
                              stroke="none"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
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
                        stroke-width="1.5"
                      />
                      <path
                        d="M11.9999 13.43C13.723 13.43 15.1199 12.0331 15.1199 10.31C15.1199 8.58687 13.723 7.19 11.9999 7.19C10.2768 7.19 8.87988 8.58687 8.87988 10.31C8.87988 12.0331 10.2768 13.43 11.9999 13.43Z"
                        stroke="none"
                        stroke-width="1.5"
                      />
                    </svg>
                    <span>
                    {profile?.city
                      ? `${profile.city}${profile.country ? `, ${profile.country}` : ""}`
                      : "Location not set"}
                  </span>
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
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16 2V5"
                        stroke="none"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                        stroke="none"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8 11H16"
                        stroke="none"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8 16H12"
                        stroke="none"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span>{formatJoinedDate(profile?.createdAt)}</span>
                  </div>
                </div>
                <div className="creator-profile-stats-link">
                  <div className="profile-card__stats">
                    <div className="profile-card__stats-item followers-stats">
                      <div className="profile-card__stats-num">
                        {" "}
                        {following}
                      </div>
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
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M16.4098 4.42859C18.3498 4.42859 19.9098 5.99859 19.9098 7.92859C19.9098 9.81859 18.4098 11.3586 16.5398 11.4286C16.4598 11.4186 16.3698 11.4186 16.2798 11.4286"
                            stroke="none"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M4.16021 14.9886C1.74021 16.6086 1.74021 19.2486 4.16021 20.8586C6.91021 22.6986 11.4202 22.6986 14.1702 20.8586C16.5902 19.2386 16.5902 16.5986 14.1702 14.9886C11.4302 13.1586 6.92021 13.1586 4.16021 14.9886Z"
                            stroke="none"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M18.3398 20.4286C19.0598 20.2786 19.7398 19.9886 20.2998 19.5586C21.8598 18.3886 21.8598 16.4586 20.2998 15.2886C19.7498 14.8686 19.0798 14.5886 18.3698 14.4286"
                            stroke="none"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                        <span>Followers</span>
                      </div>
                    </div>
                    <div className="profile-card__stats-item following-stats">
                      <div className="profile-card__stats-num">
                      {following}
                      </div>
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
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M7.16021 14.9886C4.74021 16.6086 4.74021 19.2486 7.16021 20.8586C9.91021 22.6986 14.4202 22.6986 17.1702 20.8586C19.5902 19.2386 19.5902 16.5986 17.1702 14.9886C14.4302 13.1586 9.92021 13.1586 7.16021 14.9886Z"
                            stroke="none"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                        <span>Following</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="creator-profile-description">
                <p>{profile?.bio || "No bio added yet."}</p>
              </div>
            </div>
          </div>
          {/* ================= TABS ================= */}
          <div className="moneyboy-feed-page-cate-buttons card" id="posts-tabs-btn-card">
            <button className={`page-content-type-button active-down-effect ${activeTab === "feed" ? "active" : ""}`} onClick={() => handleTabClick("feed")}>Feed</button>
            <button className={`page-content-type-button active-down-effect ${activeTab === "following" ? "active" : ""}`} onClick={() => handleTabClick("following")}>Following</button>
            <button className={`page-content-type-button active-down-effect ${activeTab === "popular" ? "active" : ""}`} onClick={() => handleTabClick("popular")}>Popular</button>
          </div>
          {/* ================= POSTS ================= */}
            {activeTab === "feed" && (
              <PostCard
                post={{
                  id: "1",
                  user: {
                    name: "Corey Bergson",
                    username: "coreybergson",
                    avatar: "/images/profile-avatars/profile-avatar-1.png",
                    badge: "/images/logo/profile-badge.png",
                  },
                  description:"Today, I experienced the most blissful ride outside...",
                  createdAt: "1 Hour ago",
                  media: [
                    { type: "image", url: "/images/profile-avatars/profile-avatar-1.png" },
                    {type: "video",url: "https://res.cloudinary.com/...mp4",},
                  ],
                  likes: 12000,
                  comments: 15,
                  isLiked: false,
                  isSaved: false,
                }}
              />
              )}
              {activeTab === "following" && (
                <>following</>
              )}
              {activeTab === "popular" && (
                <>Popular Containt</>
              )}
          </InfiniteScrollWrapper>
        </div>
        </div>
      </div>

      {/* ================= RIGHT SIDEBAR ================= */}
      <aside className="moneyboy-2x-1x-b-layout scrolling">
        <Featuredboys />
      </aside>
    </div>
  );
};

export default UserProfilePage;