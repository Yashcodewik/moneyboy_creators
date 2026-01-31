"use client";
import React, { useEffect, useRef, useState } from "react";
import Featuredboys from "../Featuredboys";
import Link from "next/link";
import CustomSelect from "../CustomSelect";
import { useRouter, useSearchParams } from "next/navigation";
import { apiPost, getApiByParams } from "@/utils/endpoints/common";
import {
  API_GET_POST_BY_PUBLIC_ID,
  API_LIKE_POST,
  API_SAVE_POST,
  API_UNLIKE_POST,
  API_UNSAVE_POST,
} from "@/utils/api/APIConstant";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useSession } from "next-auth/react";

const PostPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const publicId = searchParams.get("publicId");
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const [likeLoading, setLikeLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (!publicId) return;

    const fetchPost = async () => {
      try {
        const data = await getApiByParams({
          url: API_GET_POST_BY_PUBLIC_ID,
          params: publicId as string, // send publicId as param
        });

        if (data.success) setPost(data.post);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [publicId]);

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffMs = now.getTime() - postDate.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "just now";
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (days === 1) return "yesterday";
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
    // Optional: show date for older posts
    return postDate.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleLike = async () => {
    if (!isLoggedIn) return router.push("/login");
    if (likeLoading) return;

    setLikeLoading(true);

    // optimistic UI
    setPost((prev: any) => ({
      ...prev,
      isLiked: !prev.isLiked,
      likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
    }));

    const res = await apiPost({
      url: post.isLiked ? API_UNLIKE_POST : API_LIKE_POST,
      values: { postId: post._id },
    });

    if (!res?.success) {
      // rollback
      setPost((prev: any) => ({
        ...prev,
        isLiked: !prev.isLiked,
        likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
      }));
    }

    setLikeLoading(false);
  };

  const handleSave = async () => {
    if (!isLoggedIn) return router.push("/login");
    if (saveLoading) return;

    setSaveLoading(true);

    setPost((prev: any) => ({
      ...prev,
      isSaved: !prev.isSaved,
    }));

    const res = await apiPost({
      url: post.isSaved ? API_UNSAVE_POST : API_SAVE_POST,
      values: { postId: post._id },
    });

    if (!res?.success) {
      setPost((prev: any) => ({
        ...prev,
        isSaved: !prev.isSaved,
      }));
    }

    setSaveLoading(false);
  };

  const handleCopy = () => {
    const url = `${window.location.origin}/post?page&publicId=${post.publicId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  if (loading) {
    return (
      <div className="loadingtext">
        {"Loading".split("").map((char, i) => (
          <span key={i} style={{ animationDelay: `${(i + 1) * 0.1}s` }}>
            {char}
          </span>
        ))}
      </div>
    );
  }

  if (!post) {
    return <div className="nodeta">Post not found</div>;
  }
  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
        <div className="moneyboy-feed-page-container">
          <div
            className="moneyboy-feed-page-cate-buttons card"
            id="posts-tabs-btn-card"
          >
            <button className="page-content-type-button active-down-effect active">
              Feed
            </button>
            <button className="page-content-type-button active-down-effect">
              Following
            </button>
            <button className="page-content-type-button active-down-effect">
              Popular
            </button>
          </div>
          <div className="moneyboy-posts-wrapper">
            {/* ================= Post ================= */}
            <div className="moneyboy-post__container card">
              <div className="moneyboy-post__header">
                <a href="#" className="profile-card">
                  <div className="profile-card__main">
                    <div className="profile-card__avatar-settings">
                      <div className="profile-card__avatar">
                        <img
                          src={
                            post?.creatorInfo?.profile ||
                            "/images/profile-avatars/profile-avatar-1.png"
                          }
                          alt={
                            post?.creatorInfo?.displayName || "Profile Avatar"
                          }
                        />
                      </div>
                    </div>
                    <div className="profile-card__info">
                      <div className="profile-card__name-badge">
                        <div className="profile-card__name">
                          {post.creatorInfo?.displayName || "User"}
                        </div>
                        <div className="profile-card__badge">
                          <img
                            src="/images/logo/profile-badge.png"
                            alt="MoneyBoy Social Profile Badge"
                          />
                        </div>
                      </div>
                      <div className="profile-card__username">
                        @{post.creatorInfo?.userName || "username"}
                      </div>
                    </div>
                  </div>
                </a>
                <div className="moneyboy-post__upload-more-info">
                  <div className="moneyboy-post__upload-time">
                    {formatRelativeTime(post.createdAt)}
                  </div>
                  <div className="rel-user-more-opts-wrapper">
                    <button
                      ref={buttonRef}
                      className="rel-user-more-opts-trigger-icon"
                      onClick={() => setOpen(!open)}
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

                    <div
                      ref={menuRef}
                      className="rel-users-more-opts-popup-wrapper"
                      style={{
                        transform: open
                          ? "translate(0px, 0px)"
                          : "translate(0px, -10px)",
                        height: open ? "auto" : "0px",
                        opacity: open ? 1 : 0,
                        display: open ? "block" : "none",
                        overflow: "visible",
                        left: "auto",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div className="rel-users-more-opts-popup-container">
                        <ul>
                          <li
                            onClick={handleCopy}
                            className="copy-post-link"
                            data-copy-post-link="inset-post-link-here"
                          >
                            <div className="icon copy-link-icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                                ></path>
                              </svg>
                            </div>
                            <span>{copied ? "Copied!" : "Copy Link"}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="moneyboy-post__desc">
                <p className="post-text">
                  {post?.text ? (
                    <>
                      {expanded || post.text.length <= 150
                        ? post.text
                        : `${post.text.substring(0, 150)}...`}

                      {post.text.length > 150 && (
                        <span
                          className="active-down-effect-2x post-more"
                          onClick={() => setExpanded(!expanded)}
                        >
                          {expanded ? " less" : " more"}
                        </span>
                      )}
                    </>
                  ) : (
                    "Today, I experienced the most blissful ride outside. The air is fresh and it feels amazing..."
                  )}
                </p>
              </div>
              <div className="moneyboy-post__media">
                <div className="moneyboy-post__img">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={15}
                    navigation
                    modules={[Navigation]}
                    className="post_swiper"
                  >
                    {post.media?.[0]?.mediaFiles?.map(
                      (file: string, i: number) => {
                        const isVideo = post.media?.[0]?.type === "video";

                        return (
                          <SwiperSlide key={i}>
                            {isVideo ? (
                              <video
                                src={file}
                                autoPlay
                                muted
                                loop
                                playsInline
                              />
                            ) : (
                              <img src={file} alt="MoneyBoy Post Image" />
                            )}
                          </SwiperSlide>
                        );
                      },
                    )}
                  </Swiper>
                </div>

                <div className="moneyboy-post__actions">
                  <ul>
                    {/* Send Tip */}
                    <li>
                      <Link href="#">
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
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M12.98 19.88C13.88 21.15 15.35 21.98 17.03 21.98C19.76 21.98 21.98 19.76 21.98 17.03C21.98 15.37 21.16 13.9 19.91 13"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M8 11.4C8 12.17 8.6 12.8 9.33 12.8H10.83C11.47 12.8 11.99 12.25 11.99 11.58C11.99 10.85 11.67 10.59 11.2 10.42L8.8 9.58001C8.32 9.41001 8 9.15001 8 8.42001C8 7.75001 8.52 7.20001 9.16 7.20001H10.66C11.4 7.21001 12 7.83001 12 8.60001"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M10 12.85V13.59"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            className="dollar-sign"
                            d="M10 6.40997V7.18997"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                        <span>Send Tip</span>
                      </Link>
                    </li>

                    {/* Like */}
                    <li>
                      <Link
                        href="#"
                        className={`post-like-btn ${post.isLiked ? "active" : ""}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLike();
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
                      </Link>
                    </li>

                    {/* Comment */}
                    <li>
                      <Link href="#">
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
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M7 8H17"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M7 13H13"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                        <span>{post.commentCount || 0}</span>
                      </Link>
                    </li>
                  </ul>

                  <ul>
                    {/* Share */}
                    <li>
                      <Link href="#">
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
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M5.15002 4H16.35C19.05 4 19.65 5.5 17.75 7.4L16.55 8.6C15.75 9.4 15.75 10.7 16.55 11.4L17.75 12.6C19.65 14.5 18.95 16 16.35 16H5.15002"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </Link>
                    </li>

                    {/* Save */}
                    <li>
                      <Link
                        href="#"
                        className={`post-save-btn ${post.isSaved ? "active" : ""}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSave();
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
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Featuredboys />
    </div>
  );
};

export default PostPage;
