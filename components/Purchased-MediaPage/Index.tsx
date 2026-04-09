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
  addPostViewAction,
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
import { access } from "node:fs";

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
    publicId: string;
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
    if (!showVideo || !selectedItemId) return;

    const timer = setTimeout(() => {
      // Scroll everything that has scrolled
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Walk up from video_wrap and scroll every parent
      let el: HTMLElement | null = videoWrapRef.current;
      while (el) {
        if (el.scrollTop > 0) {
          el.scrollTo({ top: 0, behavior: "smooth" });
        }
        el = el.parentElement;
      }
    }, 150);

    return () => clearTimeout(timer);
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
    dispatch(fetchPurchasedMediaCreators());
  }, [dispatch]);

useEffect(() => {
  // if page is already 1, setPage won't trigger fetch useEffect
  // so we fetch directly here when filters change
  if (page !== 1) {
    dispatch(setPage(1)); // this will trigger the page useEffect above
  } else {
    // page is already 1, fetch directly
    dispatch(
      fetchPurchasedMedia({
        page: 1,
        limit: 12,
        publicId: publicIdFromUrl || undefined,
        tab: activeTab === "collection" ? "all-media" : activeTab,
        creatorId: selectedCreator !== "all" ? selectedCreator : undefined,
        type: mediaType !== "all" ? mediaType : undefined,
        time: timeFilter !== "all_time" ? timeFilter : undefined,
        search,
      }),
    );
  }
}, [activeTab, selectedCreator, mediaType, timeFilter, search]);


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
  const hasCountedRef = useRef(false);
  useEffect(() => {
    if (!publicIdFromUrl || !items.length) return;

    const matchedItem = items.find(
      (item) => item.publicId === publicIdFromUrl
    );

    if (!matchedItem) return;

    setSelectedItemId(matchedItem._id);
    setShowVideo(true);

    if (!hasCountedRef.current) {
      hasCountedRef.current = true;

      dispatch(addPostViewAction(matchedItem.publicId));
    }

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 150);

  }, [publicIdFromUrl, items]);

  useEffect(() => {
    setSelectedItemId(null);
    setShowVideo(false);
    setShowComments(false);
    setReportPost(null);
    setShowReportModal(false);
  }, [activeTab]);

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

  const totalMediaFiles = mediaItems.reduce(
    (acc, media) => acc + (media.mediaFiles?.length || 0),
    0,
  );

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
                            onChange={(e) => {
                              const val = e.target.value;
                              clearTimeout((window as any)._searchTimer);
                              (window as any)._searchTimer = setTimeout(() => setSearch(val), 400);
                            }}
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
                          value={mediaType}
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
                          value={timeFilter}
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
              <div
                ref={videoWrapRef}
                className="video_wrap"
                style={{ scrollMarginTop: "90px" }}
              >
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
                      navigation={totalMediaFiles > 1}
                      pagination={
                        totalMediaFiles > 1 ? { clickable: true } : false
                      }
                      spaceBetween={10}
                    >
                      {mediaItems.map((media: MediaBlock, idx: number) =>
                        media.mediaFiles.map((file, fileIndex) => (
                          <SwiperSlide key={`${idx}-${fileIndex}`}>
                            {/* VIDEO */}
                            {media.type === "video" && (
                              <VideoPlayer
                                src={file}
                                publicId={selectedItem.publicId}
                                postId={selectedItem._id}
                                watchedSeconds={selectedItem.watchedSeconds}
                                duration={selectedItem.videoDuration}
                              />
                            )}

                            {/* IMAGE */}
                            {(media.type === "photo" ||
                              media.type === "image") && (
                                <PhotoView src={file}>
                                  <img
                                    src={file}
                                    alt="media"
                                    className="posterimg"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </PhotoView>
                              )}
                          </SwiperSlide>
                        )),
                      )}
                    </Swiper>
                  </PhotoProvider>
                </div>
                {selectedItem && (
                  <>
                    <div className="pm-page-card-footer vdocard-footer">
                      <div className="profile-card">
                        <Link
                          href={`/${selectedItem.creator.userName}`}
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
                      {selectedItem?.accessType !== "PPV Request" && (
                        <div className="meta-bar">

                          <div className="meta-item view">
                            <FaEye /> <span>{selectedItem.viewCount}</span>
                          </div>

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
                      )}
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
                        {/* <button
                          className={`multi-tab-switch-btn ${
                            activeTab === "all-media" ? "active" : ""
                          }`}
                          onClick={() => handleTabClick("all-media")}
                        >
                          <span>All Media</span>
                        </button> */}
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
                      <button
                        className="btn-txt-gradient shimmer"
                        onClick={() => {
                          setSelectedItemId(null);
                          setShowVideo(false);
                          setShowComments(false);
                          handleTabClick("collection");
                        }}
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
                              onOpen={async (item) => {
                                await dispatch(addPostViewAction(item.publicId));
                                refetchPurchasedMedia();
                                setShowVideo(false);

                                setTimeout(() => {
                                  setSelectedItemId(item._id);
                                  setShowVideo(true);

                                  // Scroll ALL possible containers to top
                                  setTimeout(() => {
                                    // Window
                                    window.scrollTo({
                                      top: 0,
                                      behavior: "smooth",
                                    });

                                    // Document
                                    document.documentElement.scrollTop = 0;
                                    document.body.scrollTop = 0;

                                    // Find and scroll the ACTUAL scrollable parent
                                    const allScrollable =
                                      document.querySelectorAll("*");
                                    allScrollable.forEach((el) => {
                                      if (el.scrollTop > 0) {
                                        el.scrollTo({
                                          top: 0,
                                          behavior: "smooth",
                                        });
                                      }
                                    });
                                  }, 100);
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
          show={showReportModal}
          post={reportPost}
          onClose={() => { setShowReportModal(false); setReportPost(null); }}
          onReported={refetchPurchasedMedia}
        />
      )}
    </div>
  );
};

export default PurchasedMediaPage;
