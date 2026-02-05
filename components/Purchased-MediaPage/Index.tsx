"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  FaEye,
  FaThumbsUp,
  FaThumbsDown,
  FaHeart,
  FaCommentAlt,
  FaFlag,
} from "react-icons/fa";
import CustomSelect from "../CustomSelect";
import {
  creatorsOptions,
  statusOptions,
  timeOptions,
  typeOptions,
} from "../helper/creatorOptions";
import { FaStar } from "react-icons/fa6";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchasedMedia } from "@/redux/purchasedMedia/Action";
import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";
import { useRouter } from "next/navigation";
import { PlayCircle } from "lucide-react";

const getVideoDuration = (url: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = url;

    video.onloadedmetadata = () => {
      resolve(video.duration);
      video.remove();
    };

    video.onerror = () => reject("Failed to load video metadata");
  });
};


// Define types for the API response
interface MediaItem {
  _id: string;
  accessType: string;
  publicId: string;
  createdAt: string;
  text: string;
  likeCount: string;
  commentCount: string;
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
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const router = useRouter();
  const [imgError, setImgError] = useState(false);

  // const [openDropdown, setOpenDropdown] = useState
  //   "status" | "type" | "creator" | "time" | null
  // >(null);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<string>("");


  const toggleVideo = (videoUrl: string, item: MediaItem) => {
    setSelectedVideo(videoUrl);
    setSelectedItem(item);
    setShowVideo(true);
  };
  const closeVideo = () => {
    setShowVideo(false);
    setSelectedVideo("");
  };


  const dispatch = useDispatch<AppDispatch>();

  const { items, loading } = useSelector(
    (state: RootState) => state.purchasedMedia
  );

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

  const MediaCard = ({ item }: { item: MediaItem }) => {
    const mediaUrl = item.media[0]?.mediaFiles?.[0];
    const isVideo = item.media[0]?.type === "video";
    const [duration, setDuration] = useState<number | null>(null);

    useEffect(() => {
      if (isVideo && mediaUrl) {
        getVideoDuration(mediaUrl)
          .then(setDuration)
          .catch(console.error);
      }
    }, [mediaUrl, isVideo]);

    const formatDuration = (seconds: number) => {
      if (!seconds || !isFinite(seconds)) return "00:00";
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${m}:${s.toString().padStart(2, "0")}`;
    };


    const plyrRef = useRef<any>(null);

    const handleMouseEnter = () => {
      const player = plyrRef.current?.plyr;
      if (player) {
        player.muted = true;
        player.currentTime = 0;
        player.play();
      }
    };

    const handleMouseLeave = () => {
      const player = plyrRef.current?.plyr;
      if (player) {
        player.pause();
        player.currentTime = 0;
      }
    };

    const handleLoadedMetadata = () => {
      const player = plyrRef.current?.plyr;
      if (player?.duration && isFinite(player.duration)) {
        setDuration(player.duration);
      }
    };

    return (
      <div className="pm-page-content-card">
        <div className="pm-page-card-media-container">
          <div
            className="pm-page-card--img"
            onClick={() => {
              if (isVideo) {
                toggleVideo(mediaUrl, item);
              } else {
                router.push(`/post?page&publicId=${item.publicId}`);
              }
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {isVideo ? (
              <>
                <Link href="#" className="ply_btn">
                  <PlayCircle strokeWidth={1} size={32} />
                </Link>
                <Plyr
                  ref={plyrRef}
                  source={{
                    type: "video",
                    sources: [{ src: mediaUrl, type: "video/mp4" }],
                  }}
                  options={{
                    autoplay: false,
                    muted: true,
                    controls: [],
                    clickToPlay: false,
                    hideControls: true,
                  }}
                  onLoadedMetadata={handleLoadedMetadata}
                />
              </>
            ) : (
              <>
                {!imgError && mediaUrl ? (
                  <img
                    src={mediaUrl}
                    alt={item.publicId}
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="nomedia"/>
                )}
              </>
            )}
          </div>
          <div className="pm-page-card-icons-wrapper">
            <div className="creator-content-card__stats">
              <div className="creator-content-stat-box mxw_50">
                <div className="eye-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={"24"}
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
                    ></path>
                    <path
                      d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <span>12k</span>
              </div>
              {isVideo && duration && (
                <div className="creator-content-stat-box mxw_50">
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
                          <rect width="14" height="14" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <span>{formatDuration(duration)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pm-page-card-body">
          <h2>{`${truncateText(item.text)}${item.text?.length > 50 ? "..." : ""}`}</h2>
        </div>

        <div className="pm-page-card-footer">
          <div className="profile-card">
            <Link href={`/@${item.creator.userName}`} className="profile-card__main">
              <div className="profile-card__avatar-settings">
                <div className="profile-card__avatar">
                  <img
                    src="/images/profile-avatars/profile-avatar-6.jpg"
                    alt={item.creator.displayName}
                  />
                </div>
              </div>
              <div className="profile-card__info">
                <div className="profile-card__name-badge">
                  <div className="profile-card__name">
                    {item.creator.displayName}
                  </div>
                  <div className="profile-card__badge">
                    <img
                      src="/images/logo/profile-badge.png"
                      alt="MoneyBoy Social Profile Badge"
                    />
                  </div>
                </div>
                <div className="profile-card__username">
                  @{item.creator.userName}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  };
  const truncateText = (text: string, limit = 50) =>
    text?.length > limit ? text.slice(0, limit) : text;
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
                      <div className="pm-page-select">
                        <CustomSelect
                          label="All Status"
                          options={statusOptions}
                          value={status}
                          placeholder="Search status"
                        />
                      </div>

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

            {showVideo && selectedVideo && (
              <div className="video_wrap">
                <Plyr
                  source={{
                    type: "video",
                    sources: [
                      {
                        src: selectedVideo,
                        type: "video/mp4",
                      },
                    ],
                  }}
                  options={{
                    autoplay: true,
                    controls: [
                      "play",
                      "progress",
                      "current-time",
                      "mute",
                      "volume",
                      "fullscreen",
                    ],
                  }}
                />

                {/* optional close */}
                <button
                  onClick={closeVideo}
                  style={{ position: "absolute", top: 10, right: 10 }}
                >
                  ✕
                </button>
                {selectedItem && (
                  <div className="pm-page-card-footer vdocard-footer">
                    <div className="profile-card">
                      <Link href="#" className="profile-card__main">
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
                      <div className="meta-item view">
                        <FaEye /> <span>12K</span>
                      </div>
                      <div className="meta-item">
                        <span>{formatDate(selectedItem.createdAt)}</span>
                      </div>
                      <div className="meta-actions">
                        <Link href="#">
                          <FaThumbsUp /> <span>{selectedItem.likeCount}</span>
                        </Link>
                        <Link href="#">
                          <FaThumbsDown />
                        </Link>
                        <Link href="#" className="favorite">
                          <FaStar color="#e5741f" />
                        </Link>
                        <Link href="#">
                          <FaCommentAlt /> <span>{selectedItem.commentCount}</span>
                        </Link>
                        <Link href="#">
                          <FaFlag />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {!selectedVideo && (
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
                            <MediaCard key={item._id} item={item} />
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
    </div>
  );
};

export default PurchasedMediaPage;