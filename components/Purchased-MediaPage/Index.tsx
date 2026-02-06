"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaEye,
  FaThumbsUp,
  FaThumbsDown,
  FaHeart,
  FaCommentAlt,
  FaFlag,
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaRegFlag,
} from "react-icons/fa";
import CustomSelect from "../CustomSelect";
import {
  creatorsOptions,
  statusOptions,
  timeOptions,
  typeOptions,
} from "../helper/creatorOptions";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchasedMedia } from "@/redux/purchasedMedia/Action";
import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Clock, PlayCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { dislikePostAction, likePostAction, removeReactionAction, toggleFavoriteAction } from "@/redux/feed/feedAction";
import MediaCard from "./MediaCard";
import VideoPlayer from "./VideoPlayer";
import ReportModal from "../FeedPage/ReportModal";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";

// Define types for the API response
interface MediaItem {
  _id: string;
  accessType: string;
  publicId: string;
  createdAt: string;
  text: string;
  likeCount: string;
  commentCount: string;
  watchedSeconds: number;
  videoDuration: number;
  userReaction?: "LIKE" | "DISLIKE" | null;
  media: Array<{
    type: "video" | "photo";
    mediaFiles: string[];
  }>;
  creator: {
    _id: string;
    displayName: string;
    userName: string;
  };
  isUnlocked: boolean;
}

const PurchasedMediaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all-media");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [time, setTime] = useState<string>("all_time");
 const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const router = useRouter();
  const [imgError, setImgError] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
const [reportPostId, setReportPostId] = useState<string | null>(null);
const [reportPost, setReportPost] = useState<MediaItem | null>(null);
const [showComments, setShowComments] = useState<boolean>(false);
const [showEmojiPicker, setShowEmojiPicker] = useState(false);
const textareaRef = useRef<HTMLTextAreaElement | null>(null);
const emojiBtnRef = useRef<HTMLDivElement | null>(null);

  // const [openDropdown, setOpenDropdown] = useState
  //   "status" | "type" | "creator" | "time" | null
  // >(null);
  const [showVideo, setShowVideo] = useState<boolean>(false);

  const reactionLoading = useSelector(
    (state: RootState) => state.feed.loading
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(
      fetchPurchasedMedia({
        page: 1,
        limit: 12,
        tab: activeTab,
      })
    );
  }, [activeTab, dispatch]);

  const refetchPurchasedMedia = () => {
    dispatch(
      fetchPurchasedMedia({
        page: 1,
        limit: 12,
        tab: activeTab,
      })
    );
  };

  const { items, loading } = useSelector(
    (state: RootState) => state.purchasedMedia
  );
  console.log("📦 Purchased items IDs:", items.map(i => i._id));
  const selectedItem = useMemo(
  () => items.find((i) => i._id === selectedItemId),
  [items, selectedItemId]
);
const selectedVideoUrl = useMemo(() => {
  if (!selectedItem) return null;
  return selectedItem.media[0]?.mediaFiles?.[0];
}, [selectedItem]);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  // const toggleDropdown = (key: "status" | "type" | "creator" | "time") => {
  //   setOpenDropdown((prev) => (prev === key ? null : key));
  // };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    }
    const years = Math.floor(diffDays / 365);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  };

  const handleLike = (item: MediaItem) => {
    if (reactionLoading[item._id]) return;

    if (item.userReaction === "LIKE") {
      dispatch(removeReactionAction(item._id));
    } else {
      dispatch(likePostAction(item._id));
    }
    refetchPurchasedMedia();
  };

  const handleDislike = (item: MediaItem) => {
    if (reactionLoading[item._id]) return;

    if (item.userReaction === "DISLIKE") {
      dispatch(removeReactionAction(item._id));
    } else {
      dispatch(dislikePostAction(item._id));
    }
    refetchPurchasedMedia();
  };
  const handleFavorite = (item: MediaItem) => {
  if (reactionLoading[item._id]) return;
  dispatch(toggleFavoriteAction(item._id));
  refetchPurchasedMedia();
};


  return (
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

                          <input type="text" placeholder="Enter keyword here" />
                        </div>
                      </div>
                    </div>

                    <div
                      className="pm-page-select-filters-wrapper"
                      ref={dropdownRef}
                    >
                      {/* <div className="pm-page-select">
                        <CustomSelect
                          label="All Status"
                          options={statusOptions}
                          value={status}
                          placeholder="Search status"
                        />
                      </div> */}

                      <div className="pm-page-select">
                        <CustomSelect
                          label="All Types"
                          options={typeOptions}
                          value={type}
                          placeholder="Search type"
                        />
                      </div>
                      <div className="pm-page-select">
                        <CustomSelect
                          label="All Creators"
                          options={creatorsOptions}
                          value={type}
                          placeholder="Search type"
                        />
                      </div>
                      <div className="pm-page-select">
                        <CustomSelect
                          label="All Time"
                          options={timeOptions}
                          value={time}
                          placeholder="Search time"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {showVideo && selectedVideoUrl && (
              <div className="video_wrap">
                
                <VideoPlayer
                  src={selectedVideoUrl}
                  publicId={selectedItem.publicId} // 👁 views
                  postId={selectedItem._id}        // ▶️ progress
                  watchedSeconds={selectedItem.watchedSeconds}
                  duration={selectedItem.videoDuration}
                />

                {/* optional close */}
                {/* <button
                  onClick={closeVideo}
                  style={{ position: "absolute", top: 10, right: 10 }}
                >
                  ✕
                </button> */}
                {selectedItem && (
                  <div className="pm-page-card-footer vdocard-footer">
                    <div className="profile-card">
                      <Link href={`/profile/${selectedItem.publicId}`} className="profile-card__main">
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
                              {selectedItem.creator.displayName}
                            </div>
                            <div className="profile-card__badge">
                              <img
                                src="/images/logo/profile-badge.png"
                                alt="MoneyBoy Social Profile Badge"
                              />
                            </div>
                          </div>
                          <div className="profile-card__username">
                            @{selectedItem.creator.userName}
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="meta-bar">
                      {selectedItem.viewCount > 0 && (
                        <div className="meta-item view">
                          <FaEye /> <span>{selectedItem.viewCount}</span>
                        </div>
                      )}
                      <div className="meta-item">
                        <span>{formatDate(selectedItem.createdAt)}</span>
                      </div>
                      <div className="meta-actions">
                        <Link href="#"
                         
                          onClick={(e) => {
                            e.preventDefault();
                            handleLike(selectedItem);
                          }}>
                            {selectedItem.isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
                           <span>{selectedItem.likeCount}</span>
                        </Link>
                        <Link href="#"
                          
                          onClick={(e) => {
                            e.preventDefault();
                            handleDislike(selectedItem);
                          }}>
                          {selectedItem.isDisliked ? <FaThumbsDown /> : <FaRegThumbsDown />}
                        </Link>
                        <Link href="#" className="favorite"
                          onClick={(e) => {
                            e.preventDefault();
                            handleFavorite(selectedItem);
                          }}
                        >
                          {selectedItem.isFavorite ? (
                            <FaStar color="#e5741f" />
                          ) : (
                            <FaRegStar />
                          )}
                          {/* <FaStar color="#e5741f" /> */}
                        </Link>
                        <Link href="#" className="watch">
                          <Clock/>
                        </Link>
                        <Link href="#"  onClick={(e) => {e.preventDefault(); setShowComments((prev) => !prev);}}>
                          <FaCommentAlt /> <span>{selectedItem.commentCount}</span>
                        </Link>
                       <Link
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (!selectedItem) return;
                          if (selectedItem.isReported) {
                            toast.success("You already reported this post");
                            return;
                          }
                          setReportPost(selectedItem);
                          setShowReportModal(true);
                        }}
                      >
                        {selectedItem.isReported ? <FaFlag /> : <FaRegFlag />}
                      </Link>

                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {showComments && (
              <div className="flex flex-column gap-15 purchased_commentwrap">
                <div className="moneyboy-comment-wrap">
                <div className="comment-wrap">
                  <div className="label-input">
                    <textarea ref={textareaRef} placeholder="Add a comment here"/>
                    <div className="input-placeholder-icon" ref={emojiBtnRef} onClick={() => setShowEmojiPicker((prev) => !prev)}><i className="icons emojiSmile svg-icon"></i></div>
                  </div>
                  {showEmojiPicker && (
                    <div className="emoji-picker-wrapper">
                      <EmojiPicker
                        autoFocusSearch={false}
                        skinTonesDisabled
                        previewConfig={{ showPreview: false }}
                        height={360}
                        width={340}
                      />
                    </div>
                  )}
                </div>
                <button className="premium-btn active-down-effect">
                  <svg width="40" height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M39.9728 1.42057C40.1678 0.51284 39.2779 -0.252543 38.4098 0.078704L0.753901 14.4536C0.300702 14.6266 0.000939696 15.061 2.20527e-06 15.5461C-0.000935286 16.0312 0.297109 16.4667 0.749682 16.6415L11.3279 20.727V33.5951C11.3279 34.1379 11.7007 34.6096 12.2288 34.7352C12.7534 34.8599 13.3004 34.6103 13.5464 34.1224L17.9214 25.4406L28.5982 33.3642C29.2476 33.8463 30.1811 33.5397 30.4174 32.7651C40.386 0.0812832 39.9551 1.50267 39.9728 1.42057ZM30.6775 5.53912L12.3337 18.603L4.44097 15.5547L30.6775 5.53912ZM13.6717 20.5274L29.6612 9.14025C15.9024 23.655 16.621 22.891 16.561 22.9718C16.4719 23.0917 16.7161 22.6243 13.6717 28.6656V20.5274ZM28.6604 30.4918L19.2624 23.5172L36.2553 5.59068L28.6604 30.4918Z" fill="url(#paint0_linear_4464_314)"/>
                    <defs>
                      <linearGradient id="paint0_linear_4464_314" x1="2.37044" y1="-1.89024e-06" x2="54.674" y2="14.6715" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FECE26" />
                        <stop offset="1" stopColor="#E5741F" />
                      </linearGradient>
                    </defs>
                  </svg>
                </button>
                </div>
        
              {/* ================= Render Top Comment Only ================= */}
              <div className="scrollbar">
                <div className="card gap-15 comment_show">
                  <div className="moneyboy-post__header">
                    <a href="#" className="profile-card">
                      <div className="profile-card__main">
                        <div className="profile-card__avatar-settings">
                          <div className="profile-card__avatar">
                            <img src="/images/profile-avatars/profile-avatar-6.jpg" alt="User profile"/>
                          </div>
                        </div>
                        <div className="profile-card__info">
                          <div className="profile-card__name-badge">
                            <div className="profile-card__name">johntalor3</div>
                          </div>
                          <div className="profile-card__username">@johntaylor</div>
                        </div>
                      </div>
                    </a>
                    <div className="moneyboy-post__upload-more-info">
                      <div className="moneyboy-post__upload-time">6 hr ago</div>
                    </div>
                  </div>
                  <div className="moneyboy-post__desc">
                    <p>Loream text </p>
                  </div>
                  <div className="like-deslike-wrap">
                    <ul>
                      <li>
                        <Link href="#" className={`comment-like-btn`}>
                          <ThumbsUp color="black" strokeWidth={2} />
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className={`comment-dislike-btn`}>
                          <ThumbsDown color="black" strokeWidth={2} />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card gap-15 comment_show">
                  <div className="moneyboy-post__header">
                    <a href="#" className="profile-card">
                      <div className="profile-card__main">
                        <div className="profile-card__avatar-settings">
                          <div className="profile-card__avatar">
                            <img src="/images/profile-avatars/profile-avatar-6.jpg" alt="User profile"/>
                          </div>
                        </div>
                        <div className="profile-card__info">
                          <div className="profile-card__name-badge">
                            <div className="profile-card__name">johntalor3</div>
                          </div>
                          <div className="profile-card__username">@johntaylor</div>
                        </div>
                      </div>
                    </a>
                    <div className="moneyboy-post__upload-more-info">
                      <div className="moneyboy-post__upload-time">6 hr ago</div>
                    </div>
                  </div>
                  <div className="moneyboy-post__desc">
                    <p>Loream text </p>
                  </div>
                  <div className="like-deslike-wrap">
                    <ul>
                      <li>
                        <Link href="#" className={`comment-like-btn`}>
                          <ThumbsUp color="black" strokeWidth={2} />
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className={`comment-dislike-btn`}>
                          <ThumbsDown color="black" strokeWidth={2} />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
             </div>
            )}

            {!selectedVideoUrl && (
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
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                                  stroke="#fff"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
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
                                <g clipPath="url(#clip0_4488_3963)">
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

                        <a
                          href="#"
                          className="btn-txt-gradient btn-outline"
                        // onClick={toggleVideo} 
                        >
                          <span>Watch Now</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="pm-page-multi-tab-content-wrapper">
              <div className="pm-page-multi-tab-content-container">
                <div className="multi-tab-section" data-multiple-tabs-section>
                  <div className="multi-tabs-layout-container">
                    <div className="pm-multi-tabs-buttons-wrapper">
                      <div className="multi-tabs-action-buttons">
                        <button
                          className={`multi-tab-switch-btn ${activeTab === "favorites" ? "active" : ""
                            }`}
                          onClick={() => handleTabClick("favorites")}
                        >
                          <span>Favorites</span>
                        </button>
                        <button
                          className={`multi-tab-switch-btn ${activeTab === "continue-watching" ? "active" : ""
                            }`}
                          onClick={() => handleTabClick("continue-watching")}
                        >
                          <span>Continue Watching</span>
                        </button>
                        <button
                          className={`multi-tab-switch-btn ${activeTab === "watch-later" ? "active" : ""
                            }`}
                          onClick={() => handleTabClick("watch-later")}
                        >
                          <span>Watch Later</span>
                        </button>
                        <button
                          className={`multi-tab-switch-btn ${activeTab === "all-media" ? "active" : ""
                            }`}
                          onClick={() => handleTabClick("all-media")}
                        >
                          <span>All Media</span>
                        </button>
                        <button
                          className={`multi-tab-switch-btn ${activeTab === "recently-purchased" ? "active" : ""
                            }`}
                          onClick={() => handleTabClick("recently-purchased")}
                        >
                          <span>Recently Purchased</span>
                        </button>
                        <button
                          className={`multi-tab-switch-btn ${activeTab === "recently-added" ? "active" : ""
                            }`}
                          onClick={() => handleTabClick("recently-added")}
                        >
                          <span>Recently Added From Subscriptions</span>
                        </button>
                      </div>

                      <a href="#" className="btn-txt-gradient">
                        <span>View All Collection</span>
                      </a>
                    </div>

                    <div className="multi-tabs-content-container content-creator-profile-tabs-layout-wrapper">
                      <div data-multi-tabs-content-tabdata__active>
                        {loading && items.length === 0 && (
                          <div className="loadingtext">
                            {"Loading".split("").map((char, i) => (
                              <span
                                key={i}
                                style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                              >
                                {char}
                              </span>
                            ))}
                          </div>
                        )}

                        {!loading && items.length === 0 && (
                          <div className="nofound">
                            <h3 className="first">No media found</h3>
                            <h3 className="second">No media found</h3>
                          </div>
                        )}

                        <div className="pm-page-content-cards-wrapper">
                          {items.map((item: MediaItem) => (
                            
                            <MediaCard
                              key={item._id}
                              item={item}
                              
                              onOpen={(item) => {
                                setSelectedItemId(item._id);
                                setShowVideo(true);
                              }}
                              onNavigate={(publicId) => {
                                router.push(`/post?page&publicId=${publicId}`);
                              }}
                            />
                          ))}
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
      {showReportModal && reportPost && (
      <ReportModal
        post={reportPost}
        onClose={() => {
          setShowReportModal(false);
          setReportPost(null);
        }}
        onReported={refetchPurchasedMedia}
      />
    )}
    </div>
    
  );
};

export default PurchasedMediaPage;