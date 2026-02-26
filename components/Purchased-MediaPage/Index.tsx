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
  FaRegClock,
  FaClock,
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
import {
  fetchPurchasedMedia,
  fetchPurchasedMediaCreators,
  toggleWatchLater,
} from "@/redux/purchasedMedia/Action";
import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowUpRight,
  CircleArrowLeft,
  CircleArrowRight,
  Clock,
  PlayCircle,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import {
  dislikePostAction,
  likePostAction,
  removeReactionAction,
  toggleFavoriteAction,
} from "@/redux/feed/feedAction";
import MediaCard from "./MediaCard";
import VideoPlayer from "./VideoPlayer";
import ReportModal from "../FeedPage/ReportModal";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";
import CommentsSection from "./Comment";
import { PhotoProvider, PhotoView } from "react-photo-view";
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import "react-photo-view/dist/react-photo-view.css";
import { setPage } from "@/redux/purchasedMedia/Slice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

type MediaBlock = {
  type: "video" | "photo" | "image";
  mediaFiles: string[];
};

const PurchasedMediaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("collection");
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
  const [selectedCreator, setSelectedCreator] = useState<string>("all");
  const [mediaType, setMediaType] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<string>("all_time");
  const [search, setSearch] = useState("");
  const layoutRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const publicIdFromUrl = searchParams.get("publicId");
  const { items, loading, pagination } = useSelector(
    (state: RootState) => state.purchasedMedia,
  );

  const { page, limit, total } = pagination;
  const totalPages = Math.ceil(total / limit);

  // const [openDropdown, setOpenDropdown] = useState
  //   "status" | "type" | "creator" | "time" | null
  // >(null);
  const [showVideo, setShowVideo] = useState<boolean>(false);

  const reactionLoading = useSelector((state: RootState) => state.feed.loading);

  const dispatch = useDispatch<AppDispatch>();

  const videoWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showVideo && videoWrapRef.current) {
      const headerOffset = 90;

      const elementPosition = videoWrapRef.current.getBoundingClientRect().top;

      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, [showVideo, selectedItemId]);

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
    refetchPurchasedMedia();
  }, [activeTab, selectedCreator, mediaType, timeFilter, search]);

  useEffect(() => {
    dispatch(fetchPurchasedMediaCreators());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchPurchasedMedia({
        page, // ✅ dynamic page
        limit: 12,
        publicId: publicIdFromUrl || undefined,
        tab: activeTab === "collection" ? "all-media" : activeTab,
        creatorId: selectedCreator !== "all" ? selectedCreator : undefined,
        type: mediaType !== "all" ? mediaType : undefined,
        time: timeFilter !== "all_time" ? timeFilter : undefined,
        search,
      }),
    );
  }, [page, activeTab, selectedCreator, mediaType, timeFilter, search]);

  const refetchPurchasedMedia = () => {
    dispatch(
      fetchPurchasedMedia({
        page, // ✅ use current page
        limit: 12,
        publicId: publicIdFromUrl || undefined,
        tab: activeTab === "collection" ? "all-media" : activeTab,
        creatorId: selectedCreator !== "all" ? selectedCreator : undefined,
        type: mediaType !== "all" ? mediaType : undefined,
        time: timeFilter !== "all_time" ? timeFilter : undefined,
        search,
      }),
    );
  };

  useEffect(() => {
    dispatch(setPage(1));
  }, [activeTab, selectedCreator, mediaType, timeFilter, search]);

  const creators = useSelector(
    (state: RootState) => state.purchasedMedia.creators.items,
  );

  const creatorDropdownOptions = useMemo(() => {
    return [
      { label: "All Creators", value: "all" },
      ...creators.map((c) => ({
        label: c.displayName, // ✅ displayName only
        value: c._id, // ✅ used for filtering
      })),
    ];
  }, [creators]);

  console.log(
    "📦 Purchased items IDs:",
    items.map((i) => i._id),
  );
  const selectedItem = useMemo(
    () => items.find((i) => i._id === selectedItemId),
    [items, selectedItemId],
  );
  const mediaItems: MediaBlock[] = selectedItem?.media ?? [];

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

  const handleLike = async (item: MediaItem) => {
    if (reactionLoading[item._id]) return;

    if (item.userReaction === "LIKE") {
      await dispatch(removeReactionAction(item._id));
    } else {
      await dispatch(likePostAction(item._id));
    }

    refetchPurchasedMedia();
  };

  const handleDislike = async (item: MediaItem) => {
    if (reactionLoading[item._id]) return;

    if (item.userReaction === "DISLIKE") {
      await dispatch(removeReactionAction(item._id));
    } else {
      await dispatch(dislikePostAction(item._id));
    }

    refetchPurchasedMedia();
  };
  const handleFavorite = (item: MediaItem) => {
    if (reactionLoading[item._id]) return;
    dispatch(toggleFavoriteAction(item._id));
    refetchPurchasedMedia();
  };
  const handleWatchLater = (item: MediaItem) => {
    dispatch(toggleWatchLater({ postId: item._id }));
    refetchPurchasedMedia();
  };

  useEffect(() => {
    if (publicIdFromUrl && items.length) {
      const matchedItem = items.find(
        (item) => item.publicId === publicIdFromUrl,
      );

      if (matchedItem) {
        setSelectedItemId(matchedItem._id);
        setShowVideo(true);

        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }, 150);
      }
    }
  }, [publicIdFromUrl, items]);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages: (number | string)[] = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3);
      if (page > 4) pages.push("...");
      if (page > 3 && page < totalPages - 2) pages.push(page);
      if (page < totalPages - 3) pages.push("...");
      pages.push(totalPages - 1, totalPages);
    }

    return (
      <div className="pagination_wrap">
        {/* PREVIOUS */}
        <button
          className="btn-prev"
          disabled={page === 1}
          onClick={() => dispatch(setPage(page - 1))}
        >
          <CircleArrowLeft color="#000" />
        </button>

        {/* PAGE NUMBERS */}
        {pages.map((p, i) =>
          p === "..." ? (
            <button key={i} className="premium-btn" disabled>
              <span>…</span>
            </button>
          ) : (
            <button
              key={i}
              className={page === p ? "premium-btn" : "btn-primary"}
              onClick={() => dispatch(setPage(p as number))}
            >
              <span>{p}</span>
            </button>
          ),
        )}

        {/* NEXT */}
        <button
          className="btn-next"
          disabled={page === totalPages}
          onClick={() => dispatch(setPage(page + 1))}
        >
          <CircleArrowRight color="#000" />
        </button>
      </div>
    );
  };

  return (
    <div className="moneyboy-2x-1x-layout-container" ref={layoutRef}>
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

                          <input
                            type="text"
                            placeholder="Enter keyword here"
                            onChange={(e) => setSearch(e.target.value)}
                          />
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
                          onChange={(value) => setMediaType(value as any)}
                          placeholder="Search type"
                        />
                      </div>
                      <div className="pm-page-select">
                        <CustomSelect
                          label="All Creators"
                          options={creatorDropdownOptions}
                          value={selectedCreator}
                          onChange={(value) => setSelectedCreator(value as any)}
                          placeholder="Search creator"
                        />
                      </div>
                      <div className="pm-page-select">
                        <CustomSelect
                          label="All Time"
                          options={timeOptions}
                          value={time}
                          onChange={(value) => setTimeFilter(value as any)}
                          placeholder="Search time"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {showVideo && selectedItem && (
              <div ref={videoWrapRef} className="video_wrap">
                {/* <VideoPlayer src={selectedVideoUrl} publicId={selectedItem.publicId} postId={selectedItem._id} watchedSeconds={selectedItem.watchedSeconds} duration={selectedItem.videoDuration}/> */}
                <div className="posterimg">
                  <PhotoProvider
                    toolbarRender={({
                      images,
                      index,
                      onIndexChange,
                      onClose,
                      rotate,
                      onRotate,
                      scale,
                      onScale,
                      visible,
                    }) => {
                      if (!visible) return null;
                      return (
                        <div className="toolbar_controller">
                          <button
                            className="btn_icons"
                            onClick={() =>
                              index > 0 && onIndexChange(index - 1)
                            }
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <span>
                            {index + 1} / {images.length}
                          </span>
                          <button
                            className="btn_icons"
                            onClick={() =>
                              index < images.length - 1 &&
                              onIndexChange(index + 1)
                            }
                          >
                            <ChevronRight size={20} />
                          </button>
                          <button
                            className="btn_icons"
                            onClick={() => onScale(scale + 0.2)}
                          >
                            <ZoomIn size={20} />
                          </button>

                          <button
                            className="btn_icons"
                            onClick={() => onScale(Math.max(0.5, scale - 0.2))}
                          >
                            <ZoomOut size={20} />
                          </button>

                          <button
                            className="btn_icons"
                            onClick={() => onRotate(rotate + 90)}
                          >
                            <RotateCw size={20} />
                          </button>

                          <button className="btn_icons" onClick={onClose}>
                            <X size={20} />
                          </button>
                        </div>
                      );
                    }}
                  >
                    <Swiper
                      key={selectedItemId}
                      modules={[Navigation, Pagination]}
                      navigation
                      pagination={{ clickable: true }}
                      spaceBetween={10}
                    >
                      {mediaItems.map((media: MediaBlock, idx: number) => (
                        <SwiperSlide key={media.mediaFiles?.[0] || idx}>
                          {/* VIDEO */}
                          {media.type === "video" && media.mediaFiles?.[0] && (
                            <VideoPlayer
                              src={media.mediaFiles[0]}
                              publicId={selectedItem.publicId}
                              postId={selectedItem._id}
                              watchedSeconds={selectedItem.watchedSeconds}
                              duration={selectedItem.videoDuration}
                            />
                          )}

                          {/* PHOTO */}
                          {(media.type === "photo" || media.type === "image") &&
                            media.mediaFiles?.[0] && (
                              <PhotoView src={media.mediaFiles[0]}>
                                <img
                                  src={media.mediaFiles[0]}
                                  alt="media"
                                  className="posterimg"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </PhotoView>
                            )}
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </PhotoProvider>
                </div>
                {selectedItem && (
                  <>
                    <div className="pm-page-card-footer vdocard-footer">
                      <div className="profile-card">
                        <Link
                          href={`/profile/${selectedItem.publicId}`}
                          className="profile-card__main"
                        >
                          <div className="profile-card__avatar-settings">
                            <div className="profile-card__avatar">
                              {selectedItem?.creator?.profile ? (
                                <img
                                  src={selectedItem.creator.profile}
                                  alt={
                                    selectedItem.creator.displayName ||
                                    "profile"
                                  }
                                />
                              ) : (
                                <div className="noprofile">
                                  <svg
                                    width="40"
                                    height="40"
                                    viewBox="0 0 66 54"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      className="animate-m"
                                      d="M65.4257 49.6477L64.1198 52.8674C64.0994 52.917 64.076 52.9665 64.0527 53.0132C63.6359 53.8294 62.6681 54.2083 61.8081 53.8848C61.7673 53.8731 61.7265 53.8556 61.6886 53.8381L60.2311 53.1764L57.9515 52.1416C57.0945 51.7509 56.3482 51.1446 55.8002 50.3779C48.1132 39.6156 42.1971 28.3066 38.0271 16.454C37.8551 16.1304 37.5287 15.9555 37.1993 15.9555C36.9631 15.9555 36.7241 16.0459 36.5375 16.2325L28.4395 24.3596C28.1684 24.6307 27.8099 24.7678 27.4542 24.7678C27.4076 24.7678 27.3609 24.7648 27.3143 24.7619C27.2239 24.7503 27.1307 24.7328 27.0432 24.7065C26.8217 24.6366 26.6118 24.5112 26.4427 24.3276C23.1676 20.8193 20.6053 17.1799 18.3097 15.7369C18.1698 15.6495 18.0153 15.6057 17.8608 15.6057C17.5634 15.6057 17.2719 15.7602 17.1029 16.0313C14.1572 20.7377 11.0702 24.8873 7.75721 28.1157C7.31121 28.5471 6.74277 28.8299 6.13061 28.9115L3.0013 29.3254L1.94022 29.4683L1.66912 29.5033C0.946189 29.5994 0.296133 29.0602 0.258237 28.3314L0.00754237 23.5493C-0.0274383 22.8701 0.191188 22.2025 0.610956 21.669C1.51171 20.5293 2.39789 19.3545 3.26512 18.152C5.90032 14.3304 9.52956 8.36475 13.1253 1.39631C13.548 0.498477 14.4283 0 15.3291 0C15.8479 0 16.3727 0.163246 16.8187 0.513052L27.3799 8.76557L39.285 0.521797C39.6931 0.206971 40.1711 0.0583046 40.6434 0.0583046C41.4683 0.0583046 42.2729 0.510134 42.6635 1.32052C50.16 18.2735 55.0282 34.2072 63.6378 47.3439C63.9584 47.8336 64.0197 48.4487 63.8039 48.9851L65.4257 49.6477Z"
                                      fill="url(#paint0_linear_4470_53804)"
                                    />
                                    <defs>
                                      <linearGradient
                                        id="paint0_linear_4470_53804"
                                        x1="0"
                                        y1="27"
                                        x2="66"
                                        y2="27"
                                        gradientUnits="userSpaceOnUse"
                                      >
                                        <stop stop-color="#FDAB0A" />
                                        <stop
                                          offset="0.4"
                                          stop-color="#FECE26"
                                        />
                                        <stop offset="1" stop-color="#FE990B" />
                                      </linearGradient>
                                    </defs>
                                  </svg>
                                </div>
                              )}
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
                          <Link
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleLike(selectedItem);
                            }}
                          >
                            {selectedItem.isLiked ? (
                              <FaThumbsUp />
                            ) : (
                              <FaRegThumbsUp />
                            )}
                            <span>{selectedItem.likeCount}</span>
                          </Link>
                          <Link
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDislike(selectedItem);
                            }}
                          >
                            {selectedItem.isDisliked ? (
                              <FaThumbsDown />
                            ) : (
                              <FaRegThumbsDown />
                            )}
                          </Link>
                          <Link
                            href="#"
                            className="favorite"
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
                          <Link
                            href="#"
                            className="watch"
                            onClick={(e) => {
                              e.preventDefault();
                              handleWatchLater(selectedItem);
                            }}
                          >
                            {selectedItem.isWatchLater ? (
                              <FaClock />
                            ) : (
                              <FaRegClock />
                            )}
                          </Link>
                          <Link
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowComments((prev) => !prev);
                            }}
                          >
                            <FaCommentAlt />{" "}
                            <span>{selectedItem.commentCount}</span>
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
                            {selectedItem.isReported ? (
                              <FaFlag />
                            ) : (
                              <FaRegFlag />
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="pm-page-card-footer vdocard-footer description">
                      <p className="lineclamp4">
                        {selectedItem?.text || "No description available"}
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
            {showComments && <CommentsSection item={selectedItem} />}

            {!selectedItem && (
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
                          className={`multi-tab-switch-btn ${
                            activeTab === "favorites" ? "active" : ""
                          }`}
                          onClick={() => handleTabClick("favorites")}
                        >
                          <span>Favorites</span>
                        </button>
                        <button
                          className={`multi-tab-switch-btn ${
                            activeTab === "continue-watching" ? "active" : ""
                          }`}
                          onClick={() => handleTabClick("continue-watching")}
                        >
                          <span>Continue Watching</span>
                        </button>
                        <button
                          className={`multi-tab-switch-btn ${
                            activeTab === "watch-later" ? "active" : ""
                          }`}
                          onClick={() => handleTabClick("watch-later")}
                        >
                          <span>Watch Later</span>
                        </button>
                        {/* <button
                          className={`multi-tab-switch-btn ${
                            activeTab === "all-media" ? "active" : ""
                          }`}
                          onClick={() => handleTabClick("all-media")}
                        >
                          <span>All Media</span>
                        </button> */}
                        <button
                          className={`multi-tab-switch-btn ${
                            activeTab === "recently-purchased" ? "active" : ""
                          }`}
                          onClick={() => handleTabClick("recently-purchased")}
                        >
                          <span>Recently Purchased</span>
                        </button>
                        <button
                          className={`multi-tab-switch-btn ${
                            activeTab === "recently-added" ? "active" : ""
                          }`}
                          onClick={() => handleTabClick("recently-added")}
                        >
                          <span>Recently Added From Subscriptions</span>
                        </button>
                      </div>

                      <button
                        className="btn-txt-gradient"
                        onClick={() => handleTabClick("collection")}
                      >
                        <span>View All Collection</span>
                      </button>
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
                                setShowVideo(false);

                                setTimeout(() => {
                                  setSelectedItemId(item._id);
                                  setShowVideo(true);
                                }, 80);
                              }}
                            />
                          ))}
                        </div>
                        {renderPagination()}
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