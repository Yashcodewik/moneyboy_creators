"use client";
import React, { useEffect, useState } from "react";
import Featuredboys from "../Featuredboys";
import CustomSelect from "../CustomSelect";
import { timeOptions } from "../helper/creatorOptions";
import { apiPost, getApi } from "@/utils/endpoints/common";
import {
  API_GET_SAVED_CREATORS,
  API_GET_SAVED_ITEMS,
  API_SUBSCRIBE_CREATOR,
  API_UNLOCK_POST,
  API_UNSAVE_CREATOR,
  API_UNSAVE_FREE_CREATOR,
  API_UNSAVE_POST,
} from "@/utils/api/APIConstant";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSavedFreeCreators,
  removeSavedFreeCreator,
  updateSavedFreeCreatorState,
} from "@/redux/wishlist/savedFreeCreatorsSlice";
import { unsavePost } from "@/redux/other/savedPostsSlice";
import { updateCreatorSavedState } from "@/redux/discover/discoverCreatorsSlice";
import { useRouter } from "next/navigation";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import WishlistMediaCard from "./WishlistMediaCard";
import {
  fetchSavedLockedPosts,
  removeSavedLockedPost,
} from "@/redux/wishlist/savedLockedPostsSlice";
import UnlockContentModal from "../ProfilePage/UnlockContentModal";
import SubscriptionModal from "../ProfilePage/SubscriptionModal";

interface SavedCreator {
  creatorUserId: string;
  displayName: string;
  userName: string;
  profile?: string;
  isSaved: boolean;
  publicId: string;
}
const WishlistPage = () => {
  const router = useRouter();
  const [wishlist, setWishlist] = useState(false);
  const [allTime, setAllTime] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("moneyboys");
  const [subActiveTab, setSubActiveTab] = useState<string>("videos");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [time, setTime] = useState<string>("all");
  const [savedTime, setSavedTime] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showPPVModal, setShowPPVModal] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [unlockPost, setUnlockPost] = useState<any>(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [unlockLoading, setUnlockLoading] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
const [selectedPlan, setSelectedPlan] = useState<"MONTHLY" | "YEARLY">("MONTHLY");
const [modalAction, setModalAction] = useState<"subscribe" | "upgrade" | "renew">("subscribe");
const [selectedCreator, setSelectedCreator] = useState<any>(null);
  const [removedCreatorIds, setRemovedCreatorIds] = useState<Set<string>>(
    new Set(),
  );
  const dispatch = useDispatch();
  const savedCreators = useSelector(
    (state: {
      savedFreeCreators: {
        creators: SavedCreator[];
      };
    }) => state.savedFreeCreators.creators,
  );

  const {
    posts: savedMediaPosts,
    page: mediaPage,
    totalPages: mediaTotalPages,
    loading: mediaLoading,
  } = useSelector((state: any) => state.savedLockedPosts);
  const isSavedMediaTab = activeTab === "savedMedia";

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const toggleLike = (id: number) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };
  const handleUnlockClick = (post: any) => {
    setSelectedPost(post);
    setShowPPVModal(true);
  };

  useEffect(() => {
    if (activeTab === "moneyboys") {
      // 🔵 Saved Creators
      dispatch(
        fetchSavedFreeCreators({
          page,
          limit: 9,
          search: searchTerm,
          time,
        }) as any,
      ).then((res: any) => {
        if (res?.payload?.pagination?.totalPages) {
          setTotalPages(res.payload.pagination.totalPages);
        }
      });
    }

    if (activeTab === "savedMedia") {
      // 🟣 Saved Media
      dispatch(
        fetchSavedLockedPosts({
          page,
          limit: 9,
          search: searchTerm,
          type: subActiveTab === "videos" ? "video" : "photo",
        }) as any,
      );
    }
  }, [activeTab, subActiveTab, searchTerm, page, time]);

  const handleUnsaveCreator = (creatorUserId: string) => {
    // 1️⃣ Optimistic UI
    dispatch(removeSavedFreeCreator({ creatorUserId }));

    dispatch(
      updateCreatorSavedState({
        creatorId: creatorUserId,
        saved: false,
      }),
    );

    // 2️⃣ API call
    dispatch(unsavePost({ creatorUserId }) as any);

    // 3️⃣ 🔥 REFILL the page
    dispatch(
      fetchSavedFreeCreators({
        page: 1,
        limit: 9,
        search: searchTerm,
      }) as any,
    );
  };

  const handleUnsaveMedia = (postId: string) => {
    // 1️⃣ Optimistic UI (instant remove from grid)
    dispatch(removeSavedLockedPost({ postId }));

    // 2️⃣ Backend call (already shows toast)
    dispatch(unsavePost({ postId }) as any);
  };

  const confirmUnlockPost = async () => {
    if (!selectedPost) return;

    try {
      setUnlockLoading(true);

      console.log("Calling unlock API:", selectedPost.post._id);

      const res = await apiPost({
        url: API_UNLOCK_POST,
        values: {
          postId: selectedPost.post._id,
          creatorId: selectedPost.creator._id,
        },
      });

      if (res?.success) {
        setShowPPVModal(false);
        setSelectedPost(null);

        router.push(`/post?publicId=${selectedPost.post.publicId}`);
      } else {
        alert(res?.message || "Failed to unlock post");
      }
    } catch (err) {
      console.error("Unlock error:", err);
    } finally {
      setUnlockLoading(false);
    }
  };

  const handleProfileClick = (publicId: string) => {
    router.push(`/profile/${publicId}`);
  };

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
        <button
          className="btn-prev"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          <CircleArrowLeft color="#000" />
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <button key={i} className="premium-btn" disabled>
              <span>…</span>
            </button>
          ) : (
            <button
              key={i}
              className={page === p ? "premium-btn" : "btn-primary"}
              onClick={() => setPage(p as number)}
            >
              <span>{p}</span>
            </button>
          ),
        )}

        <button
          className="btn-next"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          <CircleArrowRight color="#000" />
        </button>
      </div>
    );
  };

  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
        <div
          className="moneyboy-feed-page-container moneyboy-diff-content-wrappers"
          data-multiple-tabs-section
          data-scroll-zero
          data-identifier="1"
        >
          <div
            className="moneyboy-feed-page-cate-buttons card"
            id="posts-tabs-btn-card"
          >
            <button
              className={`page-content-type-button active-down-effect ${activeTab === "moneyboys" ? "active" : ""}`}
              onClick={() => handleTabClick("moneyboys")}
            >
              Moneyboys
            </button>
            <button
              className={`page-content-type-button active-down-effect ${activeTab === "savedMedia" ? "active" : ""}`}
              onClick={() => handleTabClick("savedMedia")}
            >
              Saved Media
            </button>
          </div>
          {activeTab === "moneyboys" && (
            <div data-active data-identifier="1">
              <div>
                <div className="tabs-content-wrapper-layout">
                  <div data-multi-dem-cards-layout>
                    <div className="creator-content-filter-grid-container">
                      <div className="card filters-card-wrapper">
                        <div className="search-features-grid-btns">
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
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="creater-content-filters-layouts">
                            <div className="creator-content-select-filter">
                              <CustomSelect
                                className="bg-white p-sm size-sm"
                                label="All Time"
                                options={timeOptions}
                                value={time}
                                searchable={false}
                                onChange={(val) => {
                                  // Ensure val is a string
                                  setTime(Array.isArray(val) ? val[0] : val);
                                  setPage(1); // reset to first page when filter changes
                                }}
                              />
                            </div>
                            <div
                              className="creator-content-grid-layout-options"
                              data-multi-dem-cards-layout-btns
                            >
                              <button
                                className={`creator-content-grid-layout-btn ${
                                  layout === "grid" ? "active" : "inactive"
                                }`}
                                onClick={() => setLayout("grid")}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z"
                                    fill="none"
                                  />
                                  <path
                                    d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z"
                                    fill="none"
                                  />
                                  <path
                                    d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z"
                                    fill="none"
                                  />
                                  <path
                                    d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z"
                                    fill="none"
                                  />
                                </svg>
                              </button>
                              <button
                                className={`creator-content-grid-layout-btn ${
                                  layout === "list" ? "active" : "inactive"
                                }`}
                                onClick={() => setLayout("list")}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M19.9 13.5H4.1C2.6 13.5 2 14.14 2 15.73V19.77C2 21.36 2.6 22 4.1 22H19.9C21.4 22 22 21.36 22 19.77V15.73C22 14.14 21.4 13.5 19.9 13.5Z"
                                    stroke="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M19.9 2H4.1C2.6 2 2 2.64 2 4.23V8.27C2 9.86 2.6 10.5 4.1 10.5H19.9C21.4 10.5 22 9.86 22 8.27V4.23C22 2.64 21.4 2 19.9 2Z"
                                    stroke="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="creator-content-cards-wrapper multi-dem-cards-wrapper-layout"
                        data-multi-child-grid-layout-wishlist
                        data-layout-toggle-rows={
                          layout === "list" ? true : undefined
                        }
                      >
                        <div className="creator-content-type-container-wrapper">
                          {savedCreators.map((creator) => (
                            <div
                              key={creator.creatorUserId}
                              className="user-profile-card-wrapper user-profile-card-small"
                              data-creator-profile-card
                              onClick={() =>
                                handleProfileClick(creator.publicId)
                              }
                            >
                              <div className="user-profile-card-container">
                                <div className="user-profile-card__img">
                                  <img
                                    src={
                                      creator.profile ||
                                      "/images/profile-avatars/profile-avatar-11.png"
                                    }
                                    alt="Discover Profile Avatar"
                                  />
                                </div>

                                <div className="user-profile-content-overlay-container">
                                  <div className="user-profile-card__action-btns">
                                    <div className="user-profile-card__like-btn">
                                      {/* LEFT EXACTLY AS IS */}
                                    </div>
                                  </div>

                                  <div className="user-profile-card__info-container">
                                    <div className="user-profile-card__info">
                                      <div className="user-profile-card__name-badge">
                                        <div className="user-profile-card__name">
                                          {creator.displayName}
                                        </div>

                                        <div className="user-profile-card__badge">
                                          <img
                                            src="/images/logo/profile-badge.png"
                                            alt="MoneyBoy Social Profile Badge"
                                          />
                                        </div>
                                      </div>

                                      <div className="user-profile-card__username">
                                        @{creator.userName}
                                      </div>
                                    </div>

                                    {/* <div className="user-profile-card__wishlist-btn">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (creator.savedFrom === "CREATOR") {
                                            handleUnsaveCreator(creator.creatorId);
                                          }

                                          if (creator.savedFrom === "ITEM") {
                                            handleUnsaveFreeCreator(
                                              creator._id,
                                            ); // or itemId if backend expects itemId
                                          }
                                        }}
                                        className="focus:outline-none"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="21"
                                          height="20"
                                          viewBox="0 0 21 20"
                                          fill={
                                            creator.isSaved ? "#6c5ce7" : "none"
                                          }
                                        >
                                          <path d="M14.7666 1.66687H6.73327C4.95827 1.66687 3.5166 3.11687 3.5166 4.88354V16.6252C3.5166 18.1252 4.5916 18.7585 5.90827 18.0335L9.97494 15.7752C10.4083 15.5335 11.1083 15.5335 11.5333 15.7752L15.5999 18.0335C16.9166 18.7669 17.9916 18.1335 17.9916 16.6252V4.88354C17.9833 3.11687 16.5416 1.66687 14.7666 1.66687Z" />
                                        </svg>
                                      </button>
                                    </div> */}

                                    <div
                                      className={`user-profile-card__wishlist-btn ${
                                        creator.isSaved ? "active" : ""
                                      }`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleUnsaveCreator(
                                          creator.creatorUserId,
                                        );
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="21"
                                        height="20"
                                        viewBox="0 0 21 20"
                                        fill="none"
                                      >
                                        <path
                                          d="M14.7666 1.66687H6.73327C4.95827 1.66687 3.5166 3.11687 3.5166 4.88354V16.6252C3.5166 18.1252 4.5916 18.7585 5.90827 18.0335L9.97494 15.7752C10.4083 15.5335 11.1083 15.5335 11.5333 15.7752L15.5999 18.0335C16.9166 18.7669 17.9916 18.1335 17.9916 16.6252V4.88354C17.9833 3.11687 16.5416 1.66687 14.7666 1.66687Z"
                                          stroke="none"
                                          stroke-width="1.5"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        ></path>
                                        <path
                                          d="M14.7666 1.66687H6.73327C4.95827 1.66687 3.5166 3.11687 3.5166 4.88354V16.6252C3.5166 18.1252 4.5916 18.7585 5.90827 18.0335L9.97494 15.7752C10.4083 15.5335 11.1083 15.5335 11.5333 15.7752L15.5999 18.0335C16.9166 18.7669 17.9916 18.1335 17.9916 16.6252V4.88354C17.9833 3.11687 16.5416 1.66687 14.7666 1.66687Z"
                                          stroke="none"
                                          stroke-width="1.5"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        ></path>
                                        <path
                                          d="M8.4585 7.5415C9.94183 8.08317 11.5585 8.08317 13.0418 7.5415"
                                          stroke="none"
                                          stroke-width="1.5"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        ></path>
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {renderPagination()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "savedMedia" && (
            <div data-multi-tabs-content-tab data-identifier="1">
              <div className="card filters-card-layout-wrapper">
                <div className="tabs-content-wrapper-layout">
                  <div data-multi-dem-cards-layout>
                    <div
                      className="creator-content-filter-grid-container"
                      data-multiple-tabs-section
                    >
                      <div className="search-features-grid-btns has-multi-tabs-btns">
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
                            />
                          </div>
                        </div>
                        <div className="creator-content-tabs-btn-wrapper">
                          <div className="multi-tabs-action-buttons">
                            <button
                              className={`multi-tab-switch-btn videos-btn ${subActiveTab === "videos" ? "active" : ""}`}
                              data-multi-tabs-switch-btn
                              onClick={() => setSubActiveTab("videos")}
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
                                  d="M11.5 11.5C12.3284 11.5 13 10.8284 13 10C13 9.17157 12.3284 8.5 11.5 8.5C10.6716 8.5 10 9.17157 10 10C10 10.8284 10.6716 11.5 11.5 11.5Z"
                                  stroke="none"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>Videos</span>
                            </button>
                            <button
                              className={`multi-tab-switch-btn photos-btn ${subActiveTab === "photos" ? "active" : ""}`}
                              data-multi-tabs-switch-btn
                              onClick={() => setSubActiveTab("photos")}
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
                          </div>
                        </div>
                        <div className="creater-content-filters-layouts">
                          <div className="creator-content-select-filter">
                            <CustomSelect
                              className="bg-white p-sm size-sm"
                              label="All Time"
                              options={timeOptions}
                              value={time}
                              searchable={false}
                              // onChange={(val) => {
                              //   setTime(val);
                              //   fetchLikedPosts(1);
                              // }}
                            />
                          </div>
                          <div
                            className="creator-content-grid-layout-options"
                            data-multi-dem-cards-layout-btns
                          >
                            <button
                              className={`creator-content-grid-layout-btn ${
                                layout === "grid" ? "active" : "inactive"
                              }`}
                              onClick={() => setLayout("grid")}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z"
                                  fill="none"
                                />
                                <path
                                  d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z"
                                  fill="none"
                                />
                                <path
                                  d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z"
                                  fill="none"
                                />
                                <path
                                  d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z"
                                  fill="none"
                                />
                              </svg>
                            </button>
                            <button
                              className={`creator-content-grid-layout-btn ${
                                layout === "list" ? "active" : "inactive"
                              }`}
                              onClick={() => setLayout("list")}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M19.9 13.5H4.1C2.6 13.5 2 14.14 2 15.73V19.77C2 21.36 2.6 22 4.1 22H19.9C21.4 22 22 21.36 22 19.77V15.73C22 14.14 21.4 13.5 19.9 13.5Z"
                                  stroke="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M19.9 2H4.1C2.6 2 2 2.64 2 4.23V8.27C2 9.86 2.6 10.5 4.1 10.5H19.9C21.4 10.5 22 9.86 22 8.27V4.23C22 2.64 21.4 2 19.9 2Z"
                                  stroke="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div
                        className="creator-content-cards-wrapper multi-dem-cards-wrapper-layout"
                        data-multi-child-grid-layout-wishlist
                        data-layout-toggle-rows={
                          layout === "list" ? true : undefined
                        }
                      >
                        {subActiveTab === "videos" && (
                          <div
                            className="creator-content-type-container-wrapper"
                            data-multi-tabs-content-tab
                            data-active
                          >
                            {mediaLoading ? (
                              <p>Loading...</p>
                            ) : savedMediaPosts.length === 0 ? (
                              <p>No videos found</p>
                            ) : (
                              savedMediaPosts.map((item: any) => {
                                const image = item.media?.[0]?.mediaFiles?.[0];

                                const isSubscriberOnly =
                                  item.post.accessType?.toLowerCase() ===
                                  "subscriber";

                                const price =
                                  !isSubscriberOnly && item.post.price
                                    ? `$${item.post.price}`
                                    : undefined;

                                return (
                                  <WishlistMediaCard
                                    key={item.post._id}
                                    id={item.post._id}
                                    image={item.media?.[0]?.mediaFiles?.[0]}
                                    mediaType={item.media?.[0]?.type}
                                    description={item.post.text}
                                    price={price}
                                    likes={item.post.likeCount}
                                    views={item.post.viewCount}
                                    isSubscriberOnly={isSubscriberOnly}
                                    isSaved={item.isSaved}
                                    onToggleSave={() =>
                                      handleUnsaveMedia(item.post._id)
                                    }
                                    onUnlock={() =>
                                      handleUnlockClick({
                                        post: item.post,
                                        creator: item.creator,
                                      })
                                    }
                                      onSubscribe={() => {
    setSelectedCreator(item.creator);
    setModalAction("subscribe");
    setSelectedPlan("MONTHLY");
    setShowSubscriptionModal(true);
  }}
                                  />
                                );
                              })
                            )}
                          </div>
                        )}

                        {subActiveTab === "photos" && (
                          <div
                            className="creator-content-type-container-wrapper"
                            data-multi-tabs-content-tab
                          >
                            {mediaLoading ? (
                              <p>Loading...</p>
                            ) : savedMediaPosts.length === 0 ? (
                              <p>No photos found</p>
                            ) : (
                              savedMediaPosts.map((item: any) => {
                                const image =
                                  item.media?.[0]?.mediaFiles?.[0] ||
                                  item.post.thumbnail;

                                const isSubscriberOnly =
                                  item.post.accessType?.toLowerCase() ===
                                  "subscriber";

                                const price =
                                  !isSubscriberOnly && item.post.price
                                    ? `$${item.post.price}`
                                    : undefined;

                                return (
                                  <WishlistMediaCard
                                    key={item.post._id}
                                    id={item.post._id}
                                    image={item.media?.[0]?.mediaFiles?.[0]}
                                    mediaType={item.media?.[0]?.type}
                                    description={item.post.text}
                                    price={price}
                                    likes={item.post.likeCount}
                                    views={item.post.viewCount}
                                    isSubscriberOnly={isSubscriberOnly}
                                    isSaved={item.isSaved}
                                    onToggleSave={() =>
                                      handleUnsaveMedia(item.post._id)
                                    }
                                    onUnlock={() =>
                                      handleUnlockClick({
                                        post: item.post,
                                        creator: item.creator,
                                      })
                                    }
                                      onSubscribe={() => {
    setSelectedCreator(item.creator);
    setModalAction("subscribe");
    setSelectedPlan("MONTHLY");
    setShowSubscriptionModal(true);
  }}
                                  />
                                );
                              })
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showPPVModal && selectedPost && (
            <UnlockContentModal
              onClose={() => {
                setShowPPVModal(false);
                setSelectedPost(null);
              }}
              creator={{
                displayName: selectedPost.creator?.displayName,
                userName: selectedPost.creator?.userName,
                profile: selectedPost.creator?.profile,
              }}
              post={{
                publicId: selectedPost.post._id,
                text: selectedPost.post.text,
                price: selectedPost.post.price,
              }}
              onConfirm={confirmUnlockPost}
              loading={unlockLoading}
            />
          )}


          {showSubscriptionModal && selectedCreator && (
  <SubscriptionModal
    onClose={() => setShowSubscriptionModal(false)}
    plan={selectedPlan}
    action={modalAction}
    creator={{
      displayName: selectedCreator.displayName,
      userName: selectedCreator.userName,
      profile: selectedCreator.profile,
    }}
    subscription={selectedCreator.subscription}
    onConfirm={async () => {
      await apiPost({
        url: API_SUBSCRIBE_CREATOR,
        values: {
          creatorId: selectedCreator._id,
          planType: selectedPlan,
        },
      });
      setShowSubscriptionModal(false);
    }}
  />
)}

        </div>
      </div>
      <Featuredboys />
    </div>
  );
};

export default WishlistPage;