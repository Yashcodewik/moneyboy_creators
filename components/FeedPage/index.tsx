"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  API_GET_FOLLOWING_POSTS,
  API_GET_POPULAR_POSTS,
  API_GET_POSTS,
  API_LIKE_POST,
  API_SAVE_POST,
  API_UNLIKE_POST,
  API_UNSAVE_POST,
} from "@/utils/api/APIConstant";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";
import ShowToast from "../common/ShowToast";

const FeedPage = () => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("feed");
  const menuRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());
  const buttonRefs = useRef<Map<number, HTMLButtonElement | null>>(new Map());
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [likeLoading, setLikeLoading] = useState<Record<string, boolean>>({});
  const [saveLoading, setSaveLoading] = useState<Record<string, boolean>>({});
  const [followingPosts, setFollowingPosts] = useState<any[]>([]);
  const [followingLoading, setFollowingLoading] = useState<boolean>(false);
  const [popularPosts, setPopularPosts] = useState<any[]>([]);
  const [popularLoading, setPopularLoading] = useState(false);

  const updatePostInList = (
    list: any[],
    postId: string,
    updater: (post: any) => any
  ) => {
    return list.map((p) => (p._id === postId ? updater(p) : p));
  };

  const setMenuRef = (id: number, element: HTMLDivElement | null) => {
    menuRefs.current.set(id, element);
  };

  const setButtonRef = (id: number, element: HTMLButtonElement | null) => {
    buttonRefs.current.set(id, element);
  };

  // Use NextAuth session
  const { data: session, status }:any = useSession();
  const isLoggedIn = status === "authenticated";
  // useEffect(() => {
  //   const likeButtons = document.querySelectorAll("[data-like-button]");

  //   const handleClick = (event: Event) => {
  //     const button = event.currentTarget as HTMLElement;
  //     button.classList.toggle("liked");
  //   };

  //   likeButtons.forEach((button) => {
  //     button.addEventListener("click", handleClick);
  //   });

  //   // Cleanup function
  //   return () => {
  //     likeButtons.forEach((button) => {
  //       button.removeEventListener("click", handleClick);
  //     });
  //   };
  // }, []);
  // const toggleMenu = (id: number) => {
  //   setOpenMenuId((prev) => (prev === id ? null : id));
  // };
  const toggleMenu = (id: number) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };
  const handleTabClick = (tabName: string) => {
    if (!isLoggedIn && tabName === "discover") {
      router.push("/discover");
      return;
    }
    setActiveTab(tabName);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId === null) return;

      const menuElement = menuRefs.current.get(openMenuId);
      const buttonElement = buttonRefs.current.get(openMenuId);

      const target = event.target as Node;

      if (
        menuElement &&
        !menuElement.contains(target) &&
        buttonElement &&
        !buttonElement.contains(target)
      ) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  console.log("========",session)
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await apiPost({ url: API_GET_POSTS , values:{
        userId : session?.user?.id || ""
      }});

      if (Array.isArray(res)) {
        setPosts(res);
      } else {
        setPosts([]);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  const getTimeAgo = (dateString: string) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - postDate.getTime()) / 1000
    );

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else if (diffInWeeks < 4) {
      return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
    } else {
      return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
    }
  };

  const handleLike = async (postId: string) => {
    if (likeLoading[postId]) return;

    const isFollowingTab = activeTab === "following";

    const list = isFollowingTab ? followingPosts : posts;
    const setList = isFollowingTab ? setFollowingPosts : setPosts;

    const post = list.find((p) => p._id === postId);
    if (!post) return;

    const currentLikeCount = post.likeCount || 0;
    const isCurrentlyLiked = post.isLiked || false;

    try {
      setLikeLoading((prev) => ({ ...prev, [postId]: true }));

      setList((prev) =>
        updatePostInList(prev, postId, (p) => ({
          ...p,
          likeCount: isCurrentlyLiked ? p.likeCount - 1 : p.likeCount + 1,
          isLiked: !isCurrentlyLiked,
        }))
      );

      const endpoint = isCurrentlyLiked ? API_UNLIKE_POST : API_LIKE_POST;
      const res = await apiPost({ url: endpoint, values: { postId } });

      if (!res?.success) {
        setList((prev) =>
          updatePostInList(prev, postId, (p) => ({
            ...p,
            likeCount: currentLikeCount,
            isLiked: isCurrentlyLiked,
          }))
        );
      }
    } catch (err) {
      setList((prev) =>
        updatePostInList(prev, postId, (p) => ({
          ...p,
          likeCount: currentLikeCount,
          isLiked: isCurrentlyLiked,
        }))
      );
    } finally {
      setLikeLoading((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleSave = async (postId: string) => {
    if (saveLoading[postId]) return;

    const isFollowingTab = activeTab === "following";

    const list = isFollowingTab ? followingPosts : posts;
    const setList = isFollowingTab ? setFollowingPosts : setPosts;

    const post = list.find((p) => p._id === postId);
    if (!post) return;

    const isCurrentlySaved = post.isSaved || false;

    try {
      setSaveLoading((prev) => ({ ...prev, [postId]: true }));

      setList((prev) =>
        updatePostInList(prev, postId, (p) => ({
          ...p,
          isSaved: !isCurrentlySaved,
        }))
      );

      const endpoint = isCurrentlySaved ? API_UNSAVE_POST : API_SAVE_POST;
      const res = await apiPost({ url: endpoint, values: { postId } });

      if (!res?.success) {
        setList((prev) =>
          updatePostInList(prev, postId, (p) => ({
            ...p,
            isSaved: isCurrentlySaved,
          }))
        );
      }
    } catch (err) {
      setList((prev) =>
        updatePostInList(prev, postId, (p) => ({
          ...p,
          isSaved: isCurrentlySaved,
        }))
      );
    } finally {
      setSaveLoading((prev) => ({ ...prev, [postId]: false }));
    }
  };

  useEffect(() => {
    if (activeTab !== "following") return;
    if (!isLoggedIn) return;

    const fetchFollowingPosts = async () => {
      setFollowingLoading(true);

      const res = await getApiWithOutQuery({
        url: API_GET_FOLLOWING_POSTS,
      });

      if (res?.success && Array.isArray(res.posts)) {
        setFollowingPosts(res.posts);
      } else {
        setFollowingPosts([]);
      }

      setFollowingLoading(false);
    };

    fetchFollowingPosts();
  }, [activeTab, isLoggedIn]);

  useEffect(() => {
    if (activeTab !== "popular") return;

    const fetchPopularPosts = async () => {
      setPopularLoading(true);

      const res = await apiPost({
        url: API_GET_POPULAR_POSTS,values:{
           userId : session?.user?.id || ""
        }
      });

      if (Array.isArray(res)) {
        setPopularPosts(res);
      } else {
        setPopularPosts([]);
      }

      setPopularLoading(false);
    };

    fetchPopularPosts();
  }, [activeTab]);



  return (
    <>
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
                  activeTab === "feed" ? "active" : ""
                }`}
                onClick={() => handleTabClick("feed")}
              >
                Feed
              </button>
              <button
                className={`page-content-type-button active-down-effect ${
                  activeTab === (isLoggedIn ? "following" : "discover")
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleTabClick(isLoggedIn ? "following" : "discover")
                }
              >
                {isLoggedIn ? "Following" : "Discover"}
              </button>
              <button
                className={`page-content-type-button active-down-effect ${
                  activeTab === "popular" ? "active" : ""
                }`}
                onClick={() => handleTabClick("popular")}
              >
                Popular
              </button>
            </div>
            <div className="moneyboy-posts-wrapper">
              {activeTab === "feed" && (
                <div
                  className="moneyboy-posts-wrapper"
                  data-multi-tabs-content-tabdata__active
                >
                  {posts.map((post, index) => (
                    <div
                      key={post._id || index}
                      className="moneyboy-post__container card"
                    >
                      <div className="moneyboy-post__header">
                        <a href="#" className="profile-card">
                          <div className="profile-card__main">
                            <div className="profile-card__avatar-settings">
                              <div className="profile-card__avatar">
                                <img
                                  src={
                                    post.creatorInfo?.profile ||
                                    "/images/profile-avatars/profile-avatar-1.png"
                                  }
                                  alt="MoneyBoy Social Profile Avatar"
                                />
                              </div>
                            </div>
                            <div className="profile-card__info">
                              <div className="profile-card__name-badge">
                                <div className="profile-card__name">
                                  {post.creatorInfo?.userName || "User"}
                                </div>
                                <div className="profile-card__badge">
                                  <img
                                    src="/images/logo/profile-badge.png"
                                    alt="MoneyBoy Social Profile Badge"
                                  />
                                </div>
                              </div>
                              <div className="profile-card__username">
                                @{post.creatorInfo?.displayName || "username"}
                              </div>
                            </div>
                          </div>
                        </a>

                        <div className="moneyboy-post__upload-more-info">
                          <div className="moneyboy-post__upload-time">
                            {post.createdAt
                              ? getTimeAgo(post.createdAt)
                              : "1 Hour ago"}
                          </div>
                          <div
                            className={`rel-user-more-opts-wrapper ${
                              openMenuId === index + 1 ? "active" : ""
                            }`}
                            data-more-actions-toggle-element
                            ref={(el) => setMenuRef(index + 1, el)}
                          >
                            <button
                              className="rel-user-more-opts-trigger-icon"
                              onClick={() => toggleMenu(index + 1)}
                              ref={(el) => setButtonRef(index + 1, el)}
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
                            {openMenuId === index + 1 && (
                              <div className="rel-users-more-opts-popup-wrapper">
                                <div className="rel-users-more-opts-popup-container">
                                  <ul>
                                    <li
                                      data-copy-post-link={`post-link-${post._id}`}
                                    >
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
                          {post.text ||
                            "Today, I experienced the most blissful ride outside. The air is fresh and It ..."}
                          {post.text && post.text.length > 100 && (
                            <span className="active-down-effect-2x">more</span>
                          )}
                        </p>
                      </div>

                      <div className="moneyboy-post__media">
                        {post.thumbnail ? (
                          <div className="moneyboy-post__img">
                            <img
                              src={post.thumbnail}
                              alt="MoneyBoy Post Image"
                            />
                          </div>
                        ) : post.media?.mediaFiles &&
                          post.media.mediaFiles.length > 0 ? (
                          <div className="moneyboy-post__img">
                            <img
                              src={post.media.mediaFiles[0]}
                              alt="MoneyBoy Post Image"
                            />
                          </div>
                        ) : null}

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
                              <a
                                href="#"
                                className={`post-like-btn ${
                                  post.isLiked ? "active" : ""
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleLike(post._id);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill={post.isLiked ? "red" : "none"}
                                >
                                  <path
                                    d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                                    stroke={post.isLiked ? "red" : "white"}
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span>{post.likeCount || 0}</span>
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
                                <span>{post.commentCount || 0}</span>
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
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleSave(post._id);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill={post.isSaved ? "white" : "none"}
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
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
                  ))}
                </div>
              )}
              {activeTab === "following" && (
                <div
                  className="moneyboy-posts-wrapper"
                  data-multi-tabs-content-tab
                >
                  {followingPosts.map((post, index) => {
                    const menuId = index + 1000;

                    return (
                      <div
                        key={post._id || index}
                        className="moneyboy-post__container card"
                      >
                        <div className="moneyboy-post__header">
                          <a href="#" className="profile-card">
                            <div className="profile-card__main">
                              <div className="profile-card__avatar-settings">
                                <div className="profile-card__avatar">
                                  <img
                                    src={
                                      post.creatorInfo?.profile ||
                                      "/images/profile-avatars/profile-avatar-1.png"
                                    }
                                    alt="MoneyBoy Social Profile Avatar"
                                  />
                                </div>
                              </div>

                              <div className="profile-card__info">
                                <div className="profile-card__name-badge">
                                  <div className="profile-card__name">
                                    {post.creatorInfo?.userName || "User"}
                                  </div>
                                  <div className="profile-card__badge">
                                    <img
                                      src="/images/logo/profile-badge.png"
                                      alt="MoneyBoy Social Profile Badge"
                                    />
                                  </div>
                                </div>
                                <div className="profile-card__username">
                                  @{post.creatorInfo?.displayName || "username"}
                                </div>
                              </div>
                            </div>
                          </a>

                          <div className="moneyboy-post__upload-more-info">
                            <div className="moneyboy-post__upload-time">
                              {post.createdAt
                                ? getTimeAgo(post.createdAt)
                                : "1 Hour ago"}
                            </div>

                            <div
                              className={`rel-user-more-opts-wrapper ${
                                openMenuId === menuId ? "active" : ""
                              }`}
                              ref={(el) => setMenuRef(menuId, el)}
                            >
                              <button
                                className="rel-user-more-opts-trigger-icon"
                                onClick={() => toggleMenu(menuId)}
                                ref={(el) => setButtonRef(menuId, el)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="25"
                                  viewBox="0 0 24 25"
                                  fill="none"
                                >
                                  <path d="M5 10.5C3.9 10.5 3 11.4 3 12.5C3 13.6 3.9 14.5 5 14.5C6.1 14.5 7 13.6 7 12.5C7 11.4 6.1 10.5 5 10.5Z" />
                                  <path d="M19 10.5C17.9 10.5 17 11.4 17 12.5C17 13.6 17.9 14.5 19 14.5C20.1 14.5 21 13.6 21 12.5C21 11.4 20.1 10.5 19 10.5Z" />
                                  <path d="M12 10.5C10.9 10.5 10 11.4 10 12.5C10 13.6 10.9 14.5 12 14.5C13.1 14.5 14 13.6 14 12.5C14 11.4 13.1 10.5 12 10.5Z" />
                                </svg>
                              </button>

                              {openMenuId === menuId && (
                                <div className="rel-users-more-opts-popup-wrapper">
                                  <div className="rel-users-more-opts-popup-container">
                                    <ul>
                                      <li
                                        data-copy-post-link={`post-link-${post._id}`}
                                      >
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
                                            />
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
                            {post.text}
                            <span className="active-down-effect-2x">more</span>
                          </p>
                        </div>

                        <div className="moneyboy-post__media">
                          {post.thumbnail ? (
                            <div className="moneyboy-post__img">
                              <img
                                src={post.thumbnail}
                                alt="MoneyBoy Post Image"
                              />
                            </div>
                          ) : post.media?.mediaFiles &&
                            post.media.mediaFiles.length > 0 ? (
                            <div className="moneyboy-post__img">
                              <img
                                src={post.media.mediaFiles[0]}
                                alt="MoneyBoy Post Image"
                              />
                            </div>
                          ) : null}

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
                                <a
                                  href="#"
                                  className={`post-like-btn ${
                                    post.isLiked ? "active" : ""
                                  }`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleLike(post._id);
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill={post.isLiked ? "red" : "none"}
                                  >
                                    <path
                                      d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                                      stroke={post.isLiked ? "red" : "white"}
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <span>{post.likeCount || 0}</span>
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
                                  <span>{post.commentCount || 0}</span>
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
                                <a
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleSave(post._id);
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill={post.isSaved ? "white" : "none"}
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
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
                    );
                  })}
                </div>
              )}

              {activeTab === "popular" && (
                <div
                  className="moneyboy-posts-wrapper"
                  data-multi-tabs-content-tab
                >
                  {popularPosts.map((post, index) => (
                    <div
                      key={post._id || index}
                      className="moneyboy-post__container card"
                    >
                      {/* HEADER */}
                      <div className="moneyboy-post__header">
                        <a href="#" className="profile-card">
                          <div className="profile-card__main">
                            <div className="profile-card__avatar-settings">
                              <div className="profile-card__avatar">
                                <img
                                  src={
                                    post.creatorInfo?.profile ||
                                    "/images/profile-avatars/profile-avatar-1.png"
                                  }
                                  alt="MoneyBoy Social Profile Avatar"
                                />
                              </div>
                            </div>
                            <div className="profile-card__info">
                              <div className="profile-card__name-badge">
                                <div className="profile-card__name">
                                  {post.creatorInfo?.userName || "User"}
                                </div>
                                <div className="profile-card__badge">
                                  <img
                                    src="/images/logo/profile-badge.png"
                                    alt="MoneyBoy Social Profile Badge"
                                  />
                                </div>
                              </div>
                              <div className="profile-card__username">
                                @{post.creatorInfo?.displayName || "username"}
                              </div>
                            </div>
                          </div>
                        </a>

                        <div className="moneyboy-post__upload-more-info">
                          <div className="moneyboy-post__upload-time">
                            {post.createdAt
                              ? getTimeAgo(post.createdAt)
                              : "1 Hour ago"}
                          </div>

                          <div
                            className={`rel-user-more-opts-wrapper ${
                              openMenuId === index ? "active" : ""
                            }`}
                            data-more-actions-toggle-element
                            ref={(el) => setMenuRef(index, el)}
                          >
                            <button
                              className="rel-user-more-opts-trigger-icon"
                              onClick={() => toggleMenu(index)}
                              ref={(el) => setButtonRef(index, el)}
                            >
                              {/* SVG UNCHANGED */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                              >
                                <path d="M5 10.5C3.9 10.5 3 11.4 3 12.5C3 13.6 3.9 14.5 5 14.5C6.1 14.5 7 13.6 7 12.5C7 11.4 6.1 10.5 5 10.5Z" />
                                <path d="M19 10.5C17.9 10.5 17 11.4 17 12.5C17 13.6 17.9 14.5 19 14.5C20.1 14.5 21 13.6 21 12.5C21 11.4 20.1 10.5 19 10.5Z" />
                                <path d="M12 10.5C10.9 10.5 10 11.4 10 12.5C10 13.6 10.9 14.5 12 14.5C13.1 14.5 14 13.6 14 12.5C14 11.4 13.1 10.5 12 10.5Z" />
                              </svg>
                            </button>

                            {openMenuId === index && (
                              <div className="rel-users-more-opts-popup-wrapper">
                                <div className="rel-users-more-opts-popup-container">
                                  <ul>
                                    <li>
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

                      {/* DESCRIPTION */}
                      <div className="moneyboy-post__desc">
                        <p>
                          {post.text ||
                            "Today, I experienced the most blissful ride outside. The air is fresh and It ..."}
                          {post.text && post.text.length > 100 && (
                            <span className="active-down-effect-2x">more</span>
                          )}
                        </p>
                      </div>

                      {/* MEDIA */}
                      <div className="moneyboy-post__media">
                        {post.thumbnail ? (
                          <div className="moneyboy-post__img">
                            <img
                              src={post.thumbnail}
                              alt="MoneyBoy Post Image"
                            />
                          </div>
                        ) : post.media?.mediaFiles &&
                          post.media.mediaFiles.length > 0 ? (
                          <div className="moneyboy-post__img">
                            <img
                              src={post.media.mediaFiles[0]}
                              alt="MoneyBoy Post Image"
                            />
                          </div>
                        ) : null}

                        {/* ACTIONS */}
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
                              <a
                                href="#"
                                className={`post-like-btn ${
                                  post.isLiked ? "active" : ""
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleLike(post._id);
                                }}
                              >
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
                                <span>{post.likeCount || 0}</span>
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
                                <span>{post.commentCount || 0}</span>
                              </a>
                            </li>
                          </ul>

                          <ul>
                            <li>
                              <a href="#">
                                {" "}
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
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleSave(post._id);
                                }}
                              >
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
                  ))}
                </div>
              )}
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
    </>
  );
};

export default FeedPage;
