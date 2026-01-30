"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useDeviceType } from "@/hooks/useDeviceType";

import "swiper/css";
import "swiper/css/navigation";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  addComment,
  dislikeComment,
  fetchComments,
  likeComment,
} from "../redux/other/commentSlice";

interface PostCardProps {
  post: any;
  onLike: (postId: string) => void;
  onSave: (postId: string) => void;
  onCommentAdded: (postId: string) => void;
}
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

const PostCard = ({ post, onLike, onSave ,onCommentAdded}: PostCardProps) => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [showComment, setShowComment] = useState(false);
  const isMobile = useDeviceType();
  const dispatch = useAppDispatch();
  const commentsState = useAppSelector((state) => state.comments);
  const postComments = commentsState.comments[post._id] || [];
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [newComment, setNewComment] = useState("");
  const desktopStyle: React.CSSProperties = {
    transform: open ? "translate(0px, 0px)" : "translate(0px, -10px)",
    height: open ? "auto" : "0px",
    opacity: open ? 1 : 0,
    display: open ? "block" : "none",
    overflow: "visible",
    left: "auto",
    transition: "all 0.2s ease",
  };
  const mobileStyle: React.CSSProperties = {
    position: "fixed",
    left: "0%",
    bottom: "25px",
    width: "100%",
    zIndex: 1000,
    transform: open ? "translate(0px, 0px)" : "translate(0px, 100%)",
    height: open ? "auto" : "0px",
    opacity: 1,
    display: open ? "block" : "none",
    overflow: "hidden",
    transition: "transform 0.25s ease",
  };

  const handleCopy = () => {
    const url = `${window.location.origin}/post?page&publicId=${post.publicId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  /* Close menu on outside click */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const overlay = document.querySelector(".mobile-popup-overlay");
    if (!overlay) return;

    if (open) {
      overlay.classList.add("active");
    } else {
      overlay.classList.remove("active");
    }

    // cleanup on unmount
    return () => {
      overlay.classList.remove("active");
    };
  }, [open, isMobile]);

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffMs = now.getTime() - postDate.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr ago`;
    if (days === 1) return "yesterday";
    if (days < 7) return `${days} days ago`;

    return postDate.toLocaleDateString();
  };

  useEffect(() => {
    if (showComment && post._id) {
      dispatch(fetchComments(post._id));
    }
  }, [showComment, post._id, dispatch]);

const handleAddComment = async () => {
  if (!newComment.trim()) return;

  const res = await dispatch(
    addComment({ postId: post._id, comment: newComment })
  );

  if (res?.meta?.requestStatus === "fulfilled") {
    onCommentAdded(post._id); // 🔥 update feed count instantly
    setNewComment("");
  }
};
  const handleLikeComment = (commentId: string) => {
    dispatch(likeComment({ commentId }));
  };

  const handleDislikeComment = (commentId: string) => {
    dispatch(dislikeComment({ commentId }));
  };
  const onEmojiClick = (emojiData: EmojiClickData) => {
    setNewComment((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <>
      <div className="moneyboy-post__container card">
        <div className="moneyboy-post__header">
          <Link href="#" className="profile-card">
            <div className="profile-card__main">
              <div className="profile-card__avatar-settings">
                <div className="profile-card__avatar">
                  <img
                    src={post.creatorInfo?.profile}
                    alt="MoneyBoy Social Profile Avatar"
                  />
                </div>
              </div>

              <div className="profile-card__info">
                <div className="profile-card__name-badge">
                  <div className="profile-card__name">
                    {post.creatorInfo?.userName}
                  </div>
                  <div className="profile-card__badge">
                    <img
                      src="/images/logo/profile-badge.png"
                      alt="MoneyBoy Social Profile Badge"
                    />
                  </div>
                </div>
                <div className="profile-card__username">
                  @{post.creatorInfo?.displayName}
                </div>
              </div>
            </div>
          </Link>
          <div className="moneyboy-post__upload-more-info">
            <div className="moneyboy-post__upload-time">
              {formatRelativeTime(post.createdAt)}
            </div>
            <div className="rel-user-more-opts-wrapper">
              <button
                ref={buttonRef}
                className="rel-user-more-opts-trigger-icon"
                onClick={() => setOpen((prev) => !prev)}
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
                style={isMobile ? mobileStyle : desktopStyle}
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
          {/* <p className={`post-text ${expanded ? "expanded" : ""}`}>{post.text} {!expanded && (<span className="active-down-effect-2x post-more" onClick={() => setExpanded(true)}>more</span>)}</p> */}
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
              {post.media?.[0]?.mediaFiles?.length > 0 ? (
                post.media[0].mediaFiles.map((file: string, i: number) => {
                  const isVideo = post.media?.[0]?.type === "video";
                  return (
                    <SwiperSlide key={i}>
                      {isVideo ? (
                        <video src={file} autoPlay muted loop playsInline />
                      ) : (
                        <img src={file} alt="MoneyBoy Post Image" />
                      )}
                    </SwiperSlide>
                  );
                })
              ) : (
                <SwiperSlide>
                  <div className="nomedia"></div>
                </SwiperSlide>
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
                    onLike(post._id);
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
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowComment((prev) => !prev);
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
                    onSave(post._id);
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
      {showComment && (
        <>
          <div className="moneyboy-comment-wrap">
            <div className="comment-wrap">
              {/* <div className="label-input">
  <textarea
    placeholder="Add a comment here"
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
  />

  <div
    className="input-placeholder-icon"
    onClick={() => setShowEmojiPicker((prev) => !prev)}
  >
    <i className="icons emojiSmile svg-icon"></i>
  </div>
</div>

{showEmojiPicker && (
  <div className="emoji-picker-wrapper">
    <EmojiPicker
      onEmojiClick={onEmojiClick}
      autoFocusSearch={false}
      height={350}
    />
  </div>
)} */}

              <div className="label-input">
                <textarea
                  placeholder="Add a comment here"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="input-placeholder-icon">
                  <i className="icons emojiSmile svg-icon"></i>
                </div>
              </div>
            </div>
            <button
              className="premium-btn active-down-effect"
              onClick={handleAddComment}
            >
              <svg
                width="40"
                height="35"
                viewBox="0 0 40 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M39.9728 1.42057C40.1678 0.51284 39.2779 -0.252543 38.4098 0.078704L0.753901 14.4536C0.300702 14.6266 0.000939696 15.061 2.20527e-06 15.5461C-0.000935286 16.0312 0.297109 16.4667 0.749682 16.6415L11.3279 20.727V33.5951C11.3279 34.1379 11.7007 34.6096 12.2288 34.7352C12.7534 34.8599 13.3004 34.6103 13.5464 34.1224L17.9214 25.4406L28.5982 33.3642C29.2476 33.8463 30.1811 33.5397 30.4174 32.7651C40.386 0.0812832 39.9551 1.50267 39.9728 1.42057ZM30.6775 5.53912L12.3337 18.603L4.44097 15.5547L30.6775 5.53912ZM13.6717 20.5274L29.6612 9.14025C15.9024 23.655 16.621 22.891 16.561 22.9718C16.4719 23.0917 16.7161 22.6243 13.6717 28.6656V20.5274ZM28.6604 30.4918L19.2624 23.5172L36.2553 5.59068L28.6604 30.4918Z"
                  fill="url(#paint0_linear_4464_314)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_4464_314"
                    x1="2.37044"
                    y1="-1.89024e-06"
                    x2="54.674"
                    y2="14.6715"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FECE26" />
                    <stop offset="1" stopColor="#E5741F" />
                  </linearGradient>
                </defs>
              </svg>
            </button>
          </div>

          {/* ================= Render Comments ================= */}
          {/* ================= Render Comments ================= */}
          {postComments.filter(Boolean).map((comment) => (
            <div
              key={comment._id}
              className="moneyboy-post__container card gap-15"
            >
              <div className="moneyboy-post__header">
                <a href="#" className="profile-card">
                  <div className="profile-card__main">
                    <div className="profile-card__avatar-settings">
                      <div className="profile-card__avatar">
                        <img
                          src={comment.userId?.profile}
                          alt={comment.userId?.userName}
                        />
                      </div>
                    </div>

                    <div className="profile-card__info">
                      <div className="profile-card__name-badge">
                        <div className="profile-card__name">
                          {comment.userId?.displayName}
                        </div>
                      </div>
                      <div className="profile-card__username">
                        @{comment.userId?.userName}
                      </div>
                    </div>
                  </div>
                </a>

                <div className="moneyboy-post__upload-more-info">
                  <div className="moneyboy-post__upload-time">
                    {formatRelativeTime(comment.createdAt)}
                  </div>
                </div>
              </div>

              <div className="moneyboy-post__desc">
                <p>{comment.comment}</p>
              </div>

              <div className="like-deslike-wrap">
                <ul>
                  <li>
                    <Link
                      href="#"
                      className={`comment-like-btn ${comment.isLiked ? "active" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(likeComment({ commentId: comment._id }));
                      }}
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M32 18.6929C32 19.9368 31.2769 21.0144 30.229 21.5288C30.5076 21.999 30.6682 22.5471 30.6682 23.1323C30.6682 24.4802 29.8188 25.6331 28.6272 26.085C28.865 26.5283 29.0002 27.0347 29.0002 27.5718C29.0002 29.3127 27.584 30.729 25.843 30.729H11.53L7.79907 29.3218V31H0V9.98413H7.79907V11.7739H8.87134L14.7607 4.96069L15.2668 2.17236C15.427 1.29077 16.1934 0.650879 17.0896 0.650879H18.1729C20.2585 0.650879 21.9556 2.3479 21.9556 4.43359C21.9556 5.74463 21.7034 7.02393 21.2058 8.23682L20.0818 11.0962H27.8955C29.6365 11.0962 31.053 12.5125 31.053 14.2534C31.053 14.9055 30.854 15.5122 30.5139 16.0159C31.4055 16.5745 32 17.5654 32 18.6929ZM1.875 29.125H5.92407V11.8591H1.875V29.125ZM27.8955 12.9712H17.3301L19.4634 7.54443L19.4688 7.53076C19.8748 6.54346 20.0806 5.50122 20.0806 4.43359C20.0806 3.38159 19.2249 2.52588 18.1729 2.52588H17.1084L16.5142 5.79932L9.729 13.6489H7.79907V27.3179L11.8718 28.854H25.843C26.55 28.854 27.1252 28.2788 27.1252 27.5718C27.1252 26.8647 26.55 26.2896 25.843 26.2896H21.1458V24.4146H27.511C28.218 24.4146 28.7932 23.8394 28.7932 23.1323C28.7932 22.4253 28.218 21.8501 27.511 21.8501H22.8137V19.9751H28.8428C29.5498 19.9751 30.125 19.3999 30.125 18.6929C30.125 17.9856 29.5498 17.4106 28.8428 17.4106H22.9639V15.5356H27.8955C28.6028 15.5356 29.178 14.9604 29.178 14.2534C29.178 13.5461 28.6028 12.9712 27.8955 12.9712Z"
                          fill="black"
                        />
                      </svg>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#"
                      className={`comment-dislike-btn ${comment.isDisliked ? "active" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(dislikeComment({ commentId: comment._id }));
                      }}
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M32 13.3071C32 12.0632 31.2769 10.9856 30.229 10.4712C30.5076 10.001 30.6682 9.45288 30.6682 8.86768C30.6682 7.51978 29.8188 6.36694 28.6272 5.91504C28.865 5.47168 29.0002 4.96533 29.0002 4.42822C29.0002 2.68726 27.584 1.271 25.843 1.271H11.53L7.79907 2.67822V1H0V22.0159H7.79907V20.2261H8.87134L14.7607 27.0393L15.2668 29.8276C15.427 30.7092 16.1934 31.3491 17.0896 31.3491H18.1729C20.2585 31.3491 21.9556 29.6521 21.9556 27.5664C21.9556 26.2554 21.7034 24.9761 21.2058 23.7632L20.0818 20.9038H27.8955C29.6365 20.9038 31.053 19.4875 31.053 17.7466C31.053 17.0945 30.854 16.4878 30.5139 15.9841C31.4055 15.4255 32 14.4346 32 13.3071ZM1.875 2.875H5.92407V20.1409H1.875V2.875ZM27.8955 19.0288H17.3301L19.4634 24.4556L19.4688 24.4692C19.8748 25.4565 20.0806 26.4988 20.0806 27.5664C20.0806 28.6184 19.2249 29.4741 18.1729 29.4741H17.1084L16.5142 26.2007L9.729 18.3511H7.79907V4.68213L11.8718 3.146H25.843C26.55 3.146 27.1252 3.72119 27.1252 4.42822C27.1252 5.13525 26.55 5.71045 25.843 5.71045H21.1458V7.58545H27.511C28.218 7.58545 28.7932 8.16064 28.7932 8.86768C28.7932 9.57471 28.218 10.1499 27.511 10.1499H22.8137V12.0249H28.8428C29.5498 12.0249 30.125 12.6001 30.125 13.3071C30.125 14.0144 29.5498 14.5894 28.8428 14.5894H22.9639V16.4644H27.8955C28.6028 16.4644 29.178 17.0396 29.178 17.7466C29.178 18.4539 28.6028 19.0288 27.8955 19.0288Z"
                          fill="black"
                        />
                      </svg>
                    </Link>
                  </li>

                  <li>
                    <Link href="#">
                      <span className="active-down-effect-2x">Reply</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default PostCard;
