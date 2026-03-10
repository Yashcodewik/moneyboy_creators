"use client";
import React, { useEffect, useState, useRef } from "react";
import Featuredboys from "../Featuredboys";
import CustomSelect from "../CustomSelect";
import { timeOptions } from "../helper/creatorOptions";
import { apiPost } from "@/utils/endpoints/common";
import {
  API_SUBSCRIBE_CREATOR,
  API_UNLOCK_POST,
} from "@/utils/api/APIConstant";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchSavedFreeCreators,
  updateSavedFreeCreatorState,
} from "@/redux/wishlist/savedFreeCreatorsSlice";

import { savePost, unsavePost } from "@/redux/other/savedPostsSlice";
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
import NoProfileSvg from "../common/NoProfileSvg";
import BtnGroupTabs from "../BtnGroupTabs";
import { useAppDispatch } from "@/redux/store";

interface SavedCreator {
  creatorUserId: string;
  displayName: string;
  userName: string;
  profile?: string;
  isSaved: boolean;
  publicId: string;
}

type TopTab = "moneyboys" | "savedMedia";

const WishlistPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] =
    useState<"moneyboys" | "savedMedia">("moneyboys");

  const [layout, setLayout] =
    useState<"grid" | "list">("grid");

  const [subActiveTab, setSubActiveTab] =
    useState<"videos" | "photos">("videos");

  const [time, setTime] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const [showPPVModal, setShowPPVModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [unlockLoading, setUnlockLoading] = useState(false);

  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] =
    useState<"MONTHLY" | "YEARLY">("MONTHLY");

  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const savedCreators = useSelector(
    (state: any) => state.savedFreeCreators.creators
  );

const handleProfileClick = (userName: string) => {
  router.push(`/${userName}`);
};
  const [modalAction, setModalAction] =
    useState<"subscribe" | "upgrade" | "renew">("subscribe");

  const {
    posts: savedMediaPosts,
    totalPages,
    loading: mediaLoading,
  } = useSelector((state: any) => state.savedLockedPosts);

  /* ========== FETCH ========== */

  useEffect(() => {
    if (activeTab === "moneyboys") {
      dispatch(
        fetchSavedFreeCreators({
          page,
          limit: 9,
          search: searchTerm,
          time,
        }) as any
      );
    }

    if (activeTab === "savedMedia") {
      dispatch(
        fetchSavedLockedPosts({
          page,
          limit: 9,
          search: searchTerm,
          type: subActiveTab === "videos" ? "video" : "photo",
          time,
        }) as any
      );
    }
  }, [activeTab, subActiveTab, searchTerm, page, time, dispatch]);

  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  /* ========== HANDLERS ========== */

  const handleSearchChange = (value: string) => {
    setSearchInput(value);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      setPage(1);
      setSearchTerm(value);
    }, 500);
  };

const handleToggleSaveCreator = async (creator: SavedCreator) => {
  const creatorFromState = savedCreators.find(
    (c: any) => c.creatorUserId === creator.creatorUserId
  );

  const currentState = creatorFromState?.isSaved ?? false;
  const nextSavedState = !currentState;

  // update wishlist creators
  dispatch(
    updateSavedFreeCreatorState({
      creatorUserId: creator.creatorUserId,
      isSaved: nextSavedState,
    })
  );

  // update discover page creators
  dispatch(
    updateCreatorSavedState({
      creatorId: creator.creatorUserId,
      saved: nextSavedState,
    })
  );

  try {
    if (nextSavedState) {
      await dispatch(
        savePost({ creatorUserId: creator.creatorUserId })
      ).unwrap();
    } else {
      await dispatch(
        unsavePost({ creatorUserId: creator.creatorUserId })
      ).unwrap();
    }
  } catch {
    // rollback
    dispatch(
      updateSavedFreeCreatorState({
        creatorUserId: creator.creatorUserId,
        isSaved: currentState,
      })
    );

    dispatch(
      updateCreatorSavedState({
        creatorId: creator.creatorUserId,
        saved: currentState,
      })
    );
  }
};

  const handleUnsaveMedia = (postId: string) => {
    dispatch(removeSavedLockedPost({ postId }));
    dispatch(unsavePost({ postId }) as any);
  };

  const handleUnlockClick = (post: any) => {
    setSelectedPost(post);
    setShowPPVModal(true);
  };

  const confirmUnlockPost = async () => {
    if (!selectedPost) return;

    try {
      setUnlockLoading(true);

      const res = await apiPost({
        url: API_UNLOCK_POST,
        values: {
          postId: selectedPost.post._id,
          creatorId: selectedPost.creator._id,
        },
      });

      if (res?.success) {
        setShowPPVModal(false);
        router.push(`/post?publicId=${selectedPost.post.publicId}`);
      }
    } finally {
      setUnlockLoading(false);
    }
  };

  /* ========== PAGINATION ========== */

  const renderPagination = () => {
    if (!totalPages || totalPages <= 1) return null;

    return (
      <div className="pagination_wrap">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}><CircleArrowLeft /></button>
        <span>{page} / {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}><CircleArrowRight /></button>
      </div>
    );
  };


  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
        <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers" data-multiple-tabs-section data-scroll-zero data-identifier="1">
          <BtnGroupTabs activeTab={activeTab} onChange={(value) => { setActiveTab(value as TopTab); setPage(1); setSearchInput(""); setSearchTerm(""); }}
            tabs={[
              { key: "moneyboys", label: "Moneyboys" },
              { key: "savedMedia", label: "Saved Media" },
            ]}
          />
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
                                className={`creator-content-grid-layout-btn ${layout === "grid" ? "active" : "inactive"
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
                                className={`creator-content-grid-layout-btn ${layout === "list" ? "active" : "inactive"
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
                          {savedCreators.map((creator: any) => (
                            <div
                              key={creator.creatorUserId}
                              className="user-profile-card-wrapper user-profile-card-small"
                              data-creator-profile-card
                              onClick={() =>
                                handleProfileClick(creator.userName)
                              }
                            >
                              <div className="user-profile-card-container">
                                {/* <div className="user-profile-card__img">
                                  <img
                                    src={
                                      creator.profile ||
                                      "/images/profile-avatars/profile-avatar-11.png"
                                    }
                                    alt="Discover Profile Avatar"
                                  />
                                </div> */}

                                <div className="user-profile-card__img">
                                  {creator?.profile ? (
                                    <img
                                      src={creator.profile}
                                      alt="Discover Profile Avatar"
                                    />
                                  ) : (
                                    <NoProfileSvg />
                                  )}
                                </div>

                                <div className="user-profile-content-overlay-container">
                                  <div className="user-profile-card__action-btns">
                                    <div className="user-profile-card__like-btn">
                                      {/* LEFT EXACTLY AS IS */}
                                    </div>
                                  </div>

                                  <div className="user-profile-card__info-container">
                                    <div className="user-profile-card__info">
                                      <div className="user-profile-card__name-badge w-fit">
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
                                    <div className={`user-profile-card__wishlist-btn ${creator.isSaved ? "active" : ""}`} onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggleSaveCreator(
                                          creator,
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
                                    {/* <div className="btntooltip_wrapper">
                                      <button data-tooltip="Wishlist" className={`user-profile-card__wishlist-btn ${creator.isSaved ? "active" : ""}`} onClick={(e) => {e.stopPropagation(); handleToggleSaveCreator(creator);}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                        <path d="M14.7666 1.66687H6.73327C4.95827 1.66687 3.5166 3.11687 3.5166 4.88354V16.6252C3.5166 18.1252 4.5916 18.7585 5.90827 18.0335L9.97494 15.7752C10.4083 15.5335 11.1083 15.5335 11.5333 15.7752L15.5999 18.0335C16.9166 18.7669 17.9916 18.1335 17.9916 16.6252V4.88354C17.9833 3.11687 16.5416 1.66687 14.7666 1.66687Z" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M14.7666 1.66687H6.73327C4.95827 1.66687 3.5166 3.11687 3.5166 4.88354V16.6252C3.5166 18.1252 4.5916 18.7585 5.90827 18.0335L9.97494 15.7752C10.4083 15.5335 11.1083 15.5335 11.5333 15.7752L15.5999 18.0335C16.9166 18.7669 17.9916 18.1335 17.9916 16.6252V4.88354C17.9833 3.11687 16.5416 1.66687 14.7666 1.66687Z" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M8.4585 7.5415C9.94183 8.08317 11.5585 8.08317 13.0418 7.5415" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                      </svg>
                                      </button>
                                    </div> */}
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
                              value={searchInput}
                              onChange={(e) =>
                                handleSearchChange(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="creator-content-tabs-btn-wrapper">
                          <div className="multi-tabs-action-buttons">
                            <button
                              className={`multi-tab-switch-btn videos-btn ${subActiveTab === "videos" ? "active" : ""}`}
                              data-multi-tabs-switch-btn
                              onClick={() => {
                                setSubActiveTab("videos");
                                setPage(1);
                                setSearchInput(""); // 🔥 clear input
                                setSearchTerm(""); // 🔥 clear actual search
                              }}
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
                              onClick={() => {
                                setSubActiveTab("photos");
                                setPage(1);
                                setSearchInput("");
                                setSearchTerm("");
                              }}
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
                              onChange={(val) => {
                                const selected = Array.isArray(val)
                                  ? val[0]
                                  : val;
                                setTime(selected);
                                setPage(1); // reset page
                              }}
                            />
                          </div>
                          <div
                            className="creator-content-grid-layout-options"
                            data-multi-dem-cards-layout-btns
                          >
                            <button
                              className={`creator-content-grid-layout-btn ${layout === "grid" ? "active" : "inactive"}`}
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
                              className={`creator-content-grid-layout-btn ${layout === "list" ? "active" : "inactive"}`}
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
                          <>
                            {mediaLoading ? (
                              <div className="loadingtext">
                                {"Loading".split("").map((char, i) => (
                                  <span
                                    key={i}
                                    style={{
                                      animationDelay: `${(i + 1) * 0.1}s`,
                                    }}
                                  >
                                    {char}
                                  </span>
                                ))}
                              </div>
                            ) : savedMediaPosts.length === 0 ? (
                              <div className="nofound small">
                                <h3 className="first">No media found</h3>
                                <h3 className="second">No media found</h3>
                              </div>
                            ) : (
                              <div
                                className="creator-content-type-container-wrapper"
                                data-multi-tabs-content-tab
                                data-active
                              >
                                {savedMediaPosts.map((item: any) => {
                                  const media = item.media?.[0];
                                  const mediaFile = media?.mediaFiles?.[0];
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
                                      image={mediaFile}
                                      mediaType={media?.type}
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
                                })}
                              </div>
                            )}
                          </>
                        )}
                        {subActiveTab === "photos" && (
                          <>
                            {mediaLoading ? (
                              <div className="loadingtext">
                                {"Loading".split("").map((char, i) => (
                                  <span
                                    key={i}
                                    style={{
                                      animationDelay: `${(i + 1) * 0.1}s`,
                                    }}
                                  >
                                    {char}
                                  </span>
                                ))}
                              </div>
                            ) : savedMediaPosts.length === 0 ? (
                              <div className="nofound small">
                                <h3 className="first">No media found</h3>
                                <h3 className="second">No media found</h3>
                              </div>
                            ) : (
                              <div
                                className="creator-content-type-container-wrapper"
                                data-multi-tabs-content-tab
                              >
                                {savedMediaPosts.map((item: any) => {
                                  const media = item.media?.[0];
                                  const image =
                                    media?.mediaFiles?.[0] ||
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
                                      image={image}
                                      mediaType={media?.type}
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
                                })}
                              </div>
                            )}
                          </>
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
              creator={selectedPost.creator}
              post={selectedPost.post}
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
