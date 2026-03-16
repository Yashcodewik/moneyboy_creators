"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { API_LIKE_POST, API_UNLIKE_POST, } from "@/utils/api/APIConstant";
import { apiPost } from "@/utils/endpoints/common";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchLikedPosts } from "../../redux/likedPosts/Action";
import { resetLikedPosts, updateLikedPost, } from "@/redux/likedPosts/Slice";
import { useSession } from "next-auth/react";
import { incrementFeedPostCommentCount, updateFeedPost, } from "@/redux/other/feedPostsSlice";
import { savePost, unsavePost } from "@/redux/other/savedPostsSlice";
import CustomSelect from "../CustomSelect";
import Featuredboys from "../Featuredboys";
import InfiniteScrollWrapper from "../common/InfiniteScrollWrapper";
import PostCard from "./PostCard";
import BtnGroupTabs from "../BtnGroupTabs";
import { timeOptions } from "../helper/creatorOptions";
import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { ChevronLeft, ChevronRight, RotateCw, X, ZoomIn, ZoomOut } from "lucide-react";

/* ========== TYPES ========== */
type ContentTab = "posts" | "videos" | "photos";

/* ========== COMPONENT ========== */
const LikePage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const [contentTab, setContentTab] = useState<ContentTab>("posts");
  const [time, setTime] = useState("all_time");
  const [searchText, setSearchText] = useState("");
  const [likeLoading, setLikeLoading] = useState<Record<string, boolean>>({});
  const [saveLoading, setSaveLoading] = useState<Record<string, boolean>>({});
  const { items: posts, pagination, loading } = useAppSelector(
    (state) => state.likedPosts
  );

  /* ========== API TYPE ========== */
  const apiType =
    contentTab === "videos"
      ? "video"
      : contentTab === "photos"
        ? "photo"
        : "all";

  /* ========== FETCH DATA ========== */
  useEffect(() => {
    dispatch(resetLikedPosts());

    dispatch(
      fetchLikedPosts({
        page: 1,
        limit: 10,
        search: searchText,
        time,
        type: apiType,
      })
    );
  }, [contentTab, time, searchText, apiType]);

  /* ========== URL SYNC ========== */
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "posts" || tab === "videos" || tab === "photos") {
      setContentTab(tab);
    }
  }, [searchParams]);

  /* ========== INFINITE SCROLL ========== */
  const fetchMore = () => {
    if (!pagination.hasNextPage || loading) return;
    dispatch(
      fetchLikedPosts({
        page: pagination.page + 1,
        limit: pagination.limit,
        search: searchText,
        time,
        type: apiType,
      })
    );
  };

  /* ========== LIKE HANDLER ========== */
  const handleLike = async (postId: string) => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (likeLoading[postId]) return;

    const post = posts.find((p: any) => p._id === postId);
    if (!post) return;

    const isCurrentlyLiked = post.isLiked;

    setLikeLoading((prev) => ({ ...prev, [postId]: true }));

    // Optimistic update
    dispatch(
      updateLikedPost({
        postId,
        data: {
          isLiked: !isCurrentlyLiked,
          likeCount: isCurrentlyLiked
            ? Math.max((post.likeCount || 1) - 1, 0)
            : (post.likeCount || 0) + 1,
        },
      })
    );

    const res = await apiPost({
      url: isCurrentlyLiked ? API_UNLIKE_POST : API_LIKE_POST,
      values: { postId },
    });

    // rollback
    if (!res?.success) {
      dispatch(
        updateLikedPost({
          postId,
          data: {
            isLiked: isCurrentlyLiked,
            likeCount: post.likeCount,
          },
        })
      );
    }

    setLikeLoading((prev) => ({ ...prev, [postId]: false }));
  };

  /* ========== SAVE HANDLER ========== */
  const handleSave = async (postId: string, isSaved: boolean) => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (saveLoading[postId]) return;

    setSaveLoading((prev) => ({ ...prev, [postId]: true }));

    dispatch(updateFeedPost({ postId, data: { isSaved: !isSaved } }));

    try {
      if (isSaved) {
        await dispatch(unsavePost({ postId })).unwrap();
      } else {
        await dispatch(savePost({ postId })).unwrap();
      }
    } catch {
      dispatch(updateFeedPost({ postId, data: { isSaved } }));
    }

    setSaveLoading((prev) => ({ ...prev, [postId]: false }));
  };

  /* ========== COMMENT COUNT ========== */
  const incrementCommentCount = (postId: string) => {
    dispatch(incrementFeedPostCommentCount(postId));
  };

  /* ========== FILTER POSTS ========== */
  const filteredPosts = useMemo(() => {
    if (contentTab === "videos") {
      return posts.filter((p: any) => p.media?.[0]?.type === "video");
    }
    if (contentTab === "photos") {
      return posts.filter((p: any) => p.media?.[0]?.type === "photo");
    }
    return posts;
  }, [posts, contentTab]);


  return (
    <PhotoProvider
      toolbarRender={({ images, index, onIndexChange, onClose, rotate, onRotate, scale, onScale, visible, }) => {
        if (!visible) return null;
        return (
          <div className="toolbar_controller">
            <button className="btn_icons" onClick={() => index > 0 && onIndexChange(index - 1)}><ChevronLeft size={20} /></button>
            <span>{index + 1} / {images.length}</span>
            <button className="btn_icons" onClick={() => index < images.length - 1 && onIndexChange(index + 1)}><ChevronRight size={20} /></button>
            <button className="btn_icons" onClick={() => onScale(scale + 0.2)}><ZoomIn size={20} /></button>
            <button className="btn_icons" onClick={() => onScale(Math.max(0.5, scale - 0.2))}><ZoomOut size={20} /></button>
            <button className="btn_icons" onClick={() => onRotate(rotate + 90)}><RotateCw size={20} /></button>
            <button className="btn_icons" onClick={onClose}><X size={20} /></button>
          </div>
        );
      }}>
      <div className="moneyboy-2x-1x-layout-container">
        <div className="moneyboy-2x-1x-a-layout">
          <div className="moneyboy-feed-page-container">
            <BtnGroupTabs activeTab={contentTab} onChange={(value) => { const tab = value as ContentTab; if (!isLoggedIn && tab === "videos") { router.push("/discover"); return; } setContentTab(tab); setSearchText(""); setTime("all_time"); dispatch(resetLikedPosts()); }} tabs={[{ key: "posts", label: "Posts" }, { key: "videos", label: isLoggedIn ? "Videos" : "Discover" }, { key: "photos", label: "Photos" },]} />
            <div className="moneyboy-posts-wrapper">
              <div id="feed-scroll-container" className="moneyboy-posts-scroll-container">
                <InfiniteScrollWrapper className="moneyboy-posts-wrapper" scrollableTarget="feed-scroll-container" dataLength={filteredPosts.length} hasMore={pagination.hasNextPage} fetchMore={fetchMore}>
                  <div className="creator-content-filter-grid-container">
                    <div className="card filters-card-wrapper">
                      <div className="search-features-grid-btns">
                        <div className="creator-content-search-input">
                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M14 5H20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M14 8H17" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                              </svg>
                            </div>
                            <input type="text" placeholder="Enter keyword here" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                          </div>
                        </div>
                        <div className="creater-content-filters-layouts">
                          <div className="creator-content-select-filter">
                            <CustomSelect className="bg-white p-sm size-sm optionsright" label="All Time" value={time} searchable={false} options={timeOptions} onChange={(option: any) => { console.log("SELECTED TIME:", option); setTime(option); }} />
                          </div>
                          {/* <div className="creator-content-grid-layout-options">
                            <button className="creator-content-grid-layout-btn active">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z" fill="none"></path>
                                <path d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z" fill="none"></path>
                                <path d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z" fill="none"></path>
                                <path d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z" fill="none"></path>
                              </svg>
                            </button>
                            <button className="creator-content-grid-layout-btn">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M19.9 13.5H4.1C2.6 13.5 2 14.14 2 15.73V19.77C2 21.36 2.6 22 4.1 22H19.9C21.4 22 22 21.36 22 19.77V15.73C22 14.14 21.4 13.5 19.9 13.5Z" stroke="none" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M19.9 2H4.1C2.6 2 2 2.64 2 4.23V8.27C2 9.86 2.6 10.5 4.1 10.5H19.9C21.4 10.5 22 9.86 22 8.27V4.23C22 2.64 21.4 2 19.9 2Z" stroke="none" stroke-linecap="round" stroke-linejoin="round"></path>
                              </svg>
                            </button>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {loading && posts.length === 0 && (
                    <div className="loadingtext"><img src="/images/micons.png" alt="M" className="loading-letter-img" /> {"oneyBoy".split("").map((char, i) => (<span key={i} style={{ animationDelay: `${(i + 2) * 0.1}s` }}>{char}</span>))}</div>
                  )}
                  {!loading && filteredPosts.length === 0 && (
                    <div className="nofound"><h3 className="first">No media found</h3><h3 className="second">No media found</h3></div>
                  )}
                  {!loading && filteredPosts.map((post: any) => (
                    <PostCard key={post._id} post={post} onLike={handleLike} onSave={handleSave} onCommentAdded={incrementCommentCount} />
                  ))}
                </InfiniteScrollWrapper>
              </div>
            </div>
          </div>
        </div>
        <aside className="moneyboy-2x-1x-b-layout scrolling">
          <Featuredboys />
        </aside>
      </div>
    </PhotoProvider>
  );
};

export default LikePage;