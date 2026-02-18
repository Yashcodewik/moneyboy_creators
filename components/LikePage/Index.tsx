  "use client";

  import React, { useEffect, useMemo, useRef, useState } from "react";
  import { useRouter, useSearchParams } from "next/navigation";

  import {
    API_LIKE_POST,
    API_UNLIKE_POST,
    API_SAVE_POST,
    API_UNSAVE_POST,
  } from "@/utils/api/APIConstant";
  import { apiPost } from "@/utils/endpoints/common";

  import { useAppDispatch, useAppSelector } from "../../redux/store";
  import { addComment, fetchComments } from "../../redux/other/commentSlice";
  import { fetchLikedPosts } from "../../redux/likedPosts/Action";

  import CustomSelect from "../CustomSelect";
  import Featuredboys from "../Featuredboys";
  import InfiniteScrollWrapper from "../common/InfiniteScrollWrapper";
  import PostCard from "./PostCard";
  import {
    removeLikedPost,
    resetLikedPosts,
    updateLikedPost,
  } from "@/redux/likedPosts/Slice";
  import { useSession } from "next-auth/react";
  import {
    incrementFeedPostCommentCount,
    updateFeedPost,
  } from "@/redux/other/feedPostsSlice";
  import { savePost, unsavePost } from "@/redux/other/savedPostsSlice";
  import { timeOptions } from "../helper/creatorOptions";

  const getRelativeTime = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hr ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
    return `${Math.floor(days / 7)} week ago`;
  };

  const LikePage = () => {
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { data: session, status } = useSession();
    const isLoggedIn = status === "authenticated";

    const [activeTab, setActiveTab] = useState<"posts" | "videos" | "photos">(
      "posts",
    );
    const [time, setTime] = useState("all_time");
    const [searchText, setSearchText] = useState("");

    const [currentPost, setCurrentPost] = useState<any>(null);
    const [newComment, setNewComment] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [likeLoading, setLikeLoading] = useState<Record<string, boolean>>({});
    const [saveLoading, setSaveLoading] = useState<Record<string, boolean>>({});

    const {
      items: posts,
      pagination,
      loading,
    } = useAppSelector((state) => state.likedPosts);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const emojiRef = useRef<HTMLDivElement>(null);
    const emojiButtonRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tab: "posts" | "videos" | "photos") => {
  setActiveTab(tab);

  // 🔥 CLEAR FILTERS WHEN TAB CHANGES
  setSearchText("");
  setTime("all_time");

  // 🔥 Reset list before new fetch
  dispatch(resetLikedPosts());

  dispatch(
    fetchLikedPosts({
      page: 1,
      limit: 10,
      search: "",
      time: "all_time",
      type:
        tab === "videos"
          ? "video"
          : tab === "photos"
          ? "photo"
          : "all",
    })
  );
};


    const type =
      activeTab === "videos" ? "video" : activeTab === "photos" ? "photo" : "all";

    useEffect(() => {
      dispatch(resetLikedPosts());
      dispatch(
        fetchLikedPosts({
          page: 1,
          limit: 10,
          search: searchText,
          time,
          type,
        }),
      );
    }, [activeTab, time, searchText]);

    useEffect(() => {
      const tab = searchParams.get("tab");
      if (tab === "posts" || tab === "videos" || tab === "photos") {
        setActiveTab(tab);
      }
    }, [searchParams]);

    const fetchMore = () => {
      if (!pagination.hasNextPage || loading) return;

      dispatch(
        fetchLikedPosts({
          page: pagination.page + 1,
          limit: pagination.limit,
          search: searchText,
          time,
          type,
        }),
      );
    };

    const toggleLike = async (postId: string, liked: boolean) => {
      const url = liked ? API_UNLIKE_POST : API_LIKE_POST;
      await apiPost({ url, values: { postId } });
    };

    const toggleSave = async (postId: string, saved: boolean) => {
      const url = saved ? API_UNSAVE_POST : API_SAVE_POST;
      await apiPost({ url, values: { postId } });
    };

    const handleAddComment = async () => {
      if (!newComment.trim() || !currentPost?._id) return;
      const res = await dispatch(
        addComment({ postId: currentPost._id, comment: newComment }),
      );
      if (res.meta.requestStatus === "fulfilled") {
        setNewComment("");
        dispatch(fetchComments(currentPost._id));
      }
    };

    const handleLike = async (postId: string) => {
      if (loading) return;
      if (!isLoggedIn) return router.push("/login");
      if (likeLoading[postId]) return;

      const post = posts.find((p: any) => p._id === postId);
      if (!post) return;

      const isCurrentlyLiked = post.isLiked;

      setLikeLoading((p) => ({ ...p, [postId]: true }));

      // ✅ Optimistic UI toggle
      dispatch(
        updateLikedPost({
          postId,
          data: {
            isLiked: !isCurrentlyLiked,
            likeCount: isCurrentlyLiked
              ? Math.max((post.likeCount || 1) - 1, 0)
              : (post.likeCount || 0) + 1,
          },
        }),
      );

      const res = await apiPost({
        url: isCurrentlyLiked ? API_UNLIKE_POST : API_LIKE_POST,
        values: { postId },
      });

      if (!res?.success) {
        // 🔁 rollback if API fails
        dispatch(
          updateLikedPost({
            postId,
            data: {
              isLiked: isCurrentlyLiked,
              likeCount: post.likeCount,
            },
          }),
        );
      }

      setLikeLoading((p) => ({ ...p, [postId]: false }));
    };

    const handleSave = async (postId: string, isSaved: boolean) => {
      if (!isLoggedIn) return router.push("/login");
      if (saveLoading[postId]) return;

      setSaveLoading((p) => ({ ...p, [postId]: true }));

      dispatch(updateFeedPost({ postId, data: { isSaved: !isSaved } }));

      try {
        if (isSaved) {
          await dispatch(unsavePost({ postId })).unwrap();
        } else {
          await dispatch(savePost({ postId })).unwrap();
        }
      } catch {
        dispatch(updateFeedPost({ postId, data: { isSaved } }));
      } finally {
        setSaveLoading((p) => ({ ...p, [postId]: false }));
      }
    };

    const incrementCommentCount = (postId: string) => {
      dispatch(incrementFeedPostCommentCount(postId));
    };

    const filteredPosts = useMemo(() => {
      if (activeTab === "videos") {
        return posts.filter((post: any) => post.media?.[0]?.type === "video");
      }

      if (activeTab === "photos") {
        return posts.filter((post: any) => post.media?.[0]?.type === "photo");
      }

      return posts; // posts tab → show all
    }, [posts, activeTab]);

    return (
      <div className="moneyboy-2x-1x-layout-container">
        <div className="moneyboy-2x-1x-a-layout">
          <div className="moneyboy-feed-page-container">
            <div className="moneyboy-feed-page-cate-buttons card">
              {(["posts", "videos", "photos"] as const).map((tab) => (
                <button
                  key={tab}
                  className={`page-content-type-button active-down-effect ${
                    activeTab === tab ? "active" : ""
                  }`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="moneyboy-posts-wrapper">
              <div id="feed-scroll-container" className="moneyboy-posts-scroll-container">
              
                <InfiniteScrollWrapper
                  className="moneyboy-posts-wrapper"
                  scrollableTarget="feed-scroll-container"
                  dataLength={posts.length}
                  hasMore={pagination.hasNextPage}
                  fetchMore={fetchMore}
                >
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
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M14 5H20"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M14 8H17"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                            </div>

                            <input
                              type="text"
                              placeholder="Enter keyword here"
                              value={searchText}
                              onChange={(e) => setSearchText(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="creater-content-filters-layouts">
                          <div className="creator-content-select-filter">
                            <CustomSelect
                              className="bg-white p-sm size-sm optionsright"
                              label="All Time"
                              value={time}   
                              searchable={false}
                              options={timeOptions}
                              onChange={(option: any) => {
                                console.log("SELECTED TIME:", option); 
                                setTime(option);
                              }}
                            />
                          </div>
                            {/* <div className="creator-content-grid-layout-options">
                              <button className="creator-content-grid-layout-btn active">
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
                                  ></path>
                                  <path
                                    d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z"
                                    fill="none"
                                  ></path>
                                  <path
                                    d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z"
                                    fill="none"
                                  ></path>
                                  <path
                                    d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z"
                                    fill="none"
                                  ></path>
                                </svg>
                              </button>
                              <button className="creator-content-grid-layout-btn">
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
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M19.9 2H4.1C2.6 2 2 2.64 2 4.23V8.27C2 9.86 2.6 10.5 4.1 10.5H19.9C21.4 10.5 22 9.86 22 8.27V4.23C22 2.64 21.4 2 19.9 2Z"
                                    stroke="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </svg>
                              </button>
                            </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {filteredPosts.map((post: any) => (
                    <PostCard
                      key={post._id}
                      post={post}
                      onLike={handleLike}
                      onSave={handleSave}
                      onCommentAdded={incrementCommentCount}
                    />
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
    );
  };

  export default LikePage;
