"use client";
import {
  API_GET_LIKED_POSTS,
  API_LIKE_POST,
  API_SAVE_POST,
  API_UNLIKE_POST,
  API_UNSAVE_POST,
} from "@/utils/api/APIConstant";
import { apiPost, getApi, getApiWithOutQuery } from "@/utils/endpoints/common";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import CustomSelect from "../CustomSelect";
import { timeOptions } from "../helper/creatorOptions";
import Featuredboys from "../Featuredboys";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRouter } from "next/navigation";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Link } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import {
  addComment,
  dislikeComment,
  fetchComments,
  likeComment,
} from "../../redux/other/commentSlice";
import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";

const LikePage = () => {
  type FilterType = "like" | "video" | "photos" | null;
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("posts");
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [time, setTime] = useState<string>("all_time");
  const [post, setPost] = useState<any>(null);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(
    null,
  );

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>(
    {},
  );
  const dispatch = useAppDispatch();

  const menuRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());
  const buttonRefs = useRef<Map<number, HTMLButtonElement | null>>(new Map());
  const setMenuRef = (id: number, element: HTMLDivElement | null) => {
    menuRefs.current.set(id, element);
  };
  const commentsState = useAppSelector((state) => state.comments);
  const postComments = commentsState.comments[post?._id] || [];

  const [newComment, setNewComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojiRef = useRef<HTMLDivElement | null>(null);
  const emojiButtonRef = useRef<HTMLDivElement | null>(null);

  const setButtonRef = (id: number, element: HTMLButtonElement | null) => {
    buttonRefs.current.set(id, element);
  };
  const [gridLayoutMode, setGridLayoutMode] = useState<{
    videos: "grid" | "list";
    photos: "grid" | "list";
  }>({
    videos: "grid",
    photos: "grid",
  });
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handlePostRedirect = (publicId: string) => {
    router.push(`/post?page&publicId=${publicId}`);
  };

  const toggleMenu = (id: number) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };
  const handleTabClick = (tabName: string) => {
    console.log("Tab clicked:", tabName);
    setActiveTab(tabName);
  };

  useEffect(() => {
    if (searchParams) {
      const tabFromQuery = searchParams.get("tab");
      console.log("Tab from query:", tabFromQuery);
      if (
        tabFromQuery &&
        ["posts", "videos", "photos"].includes(tabFromQuery)
      ) {
        setActiveTab(tabFromQuery);
      }
    }
  }, [searchParams]);

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter((current) => (current === filter ? null : filter));
  };

  const handleGridLayoutChange = (
    tab: "videos" | "photos",
    mode: "grid" | "list",
  ) => {
    setGridLayoutMode((prev) => ({
      ...prev,
      [tab]: mode,
    }));
  };

  useEffect(() => {
    const likeButtons = document.querySelectorAll("[data-like-button]");

    const handleClick = (event: Event) => {
      const button = event.currentTarget as HTMLElement;
      button.classList.toggle("liked");
    };

    likeButtons.forEach((button) => {
      button.addEventListener("click", handleClick);
    });

    return () => {
      likeButtons.forEach((button) => {
        button.removeEventListener("click", handleClick);
      });
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId === null) return;

      const menuElement = menuRefs.current.get(openMenuId);
      const buttonElement = buttonRefs.current.get(openMenuId);

      const target = event.target as Node;

      if (
        menuElement &&
        !menuElement.contains(target) &&
        buttonElement &&
        !buttonElement.contains(target)
      ) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours} Hour ago`;
    return `${Math.floor(hours / 24)} Day ago`;
  };

  const handleLikeClick = async (
    postId: string,
    isLiked: boolean,
    index: number,
  ) => {
    try {
      const url = isLiked ? API_UNLIKE_POST : API_LIKE_POST;
      const res = await apiPost({ url, values: { postId } });

      if (res?.success) {
        setPosts((prev) =>
          prev.map((post, i) =>
            post._id === postId
              ? {
                  ...post,
                  liked: !isLiked,
                  likeCount: isLiked
                    ? Math.max(0, post.likeCount - 1)
                    : post.likeCount + 1,
                }
              : post,
          ),
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveClick = async (postId: string, isSaved: boolean) => {
    try {
      const url = isSaved ? API_UNSAVE_POST : API_SAVE_POST;
      const res = await apiPost({ url, values: { postId } });

      if (res?.success) {
        setPosts((prev) =>
          prev.map((p) => (p._id === postId ? { ...p, saved: !isSaved } : p)),
        );

        // ShowToast(res.message, "success");
      }
    } catch (err) {
      console.error(err);
      // ShowToast("Failed to update save status", "error");
    }
  };

  const toggleMore = (postId: string) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };
  

  const fetchLikedPostsApi = async ({
    page,
    type,
    searchText,
    time,
  }: {
    page: number;
    type: "all" | "video" | "photo";
    searchText: string;
    time: string;
  }) => {
    const baseUrl = API_GET_LIKED_POSTS.split("?")[0];

    const url = `${baseUrl}?page=${page}&rowsPerPage=10&q=${searchText}&type=${type}&time=${time}`;

    const res = await getApiWithOutQuery({ url });

    if (!res?.success) {
      throw new Error("Failed to fetch liked posts");
    }

    return res;
  };
  const type =
    activeTab === "videos" ? "video" : activeTab === "photos" ? "photo" : "all";

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["likedPosts", activeTab, time, searchText, page],
    queryFn: () =>
      fetchLikedPostsApi({
        page,
        type,
        searchText,
        time,
      }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setPage(1);
  }, [activeTab, time, searchText]);

  useEffect(() => {
    if (data?.success) {
      const mappedPosts = data.posts.map((post: any) => ({
        ...post,
        liked: post.isLiked,
        saved: post.isSaved,
      }));

      setPosts(mappedPosts);
      setHasNextPage(data.pagination.hasNextPage);
    }
  }, [data]);

  const handleCopy = (publicId: string) => {
    const url = `${window.location.origin}/post?page&publicId=${publicId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  const handleProfileClick = (publicId: string) => {
    router.push(`/profile/${publicId}`);
  };

  const videoPosts = posts.filter((p) => p.media?.[0]?.type === "video");

  const photoPosts = posts.filter((p) => p.media?.[0]?.type === "photo");

  const sortedComments = [...postComments].filter(Boolean).sort((a, b) => {
    const aLikes = a.likeCount ?? a.likes?.length ?? 0;
    const bLikes = b.likeCount ?? b.likes?.length ?? 0;
    return bLikes - aLikes;
  });

  const formatRelativeTime = (dateString: string) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - postDate.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr ago`;
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (days < 30)
      return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? "s" : ""} ago`;
    if (days < 365)
      return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? "s" : ""} ago`;

    return `${Math.floor(days / 365)} year${Math.floor(days / 365) > 1 ? "s" : ""} ago`;
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const updatedText =
      newComment.substring(0, start) +
      emojiData.emoji +
      newComment.substring(end);

    setNewComment(updatedText);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd =
        start + emojiData.emoji.length;
    });

    setShowEmojiPicker(false);
  };
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    if (!post?._id) return;

    const res = await dispatch(
      addComment({ postId: post._id, comment: newComment }),
    );

    if (res?.meta?.requestStatus === "fulfilled") {
      setNewComment("");
      dispatch(fetchComments(post._id)); // refresh list
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        emojiRef.current &&
        !emojiRef.current.contains(target) &&
        !textareaRef.current?.contains(target) &&
        !emojiButtonRef.current?.contains(target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const topComment = sortedComments[0];
  const hasMoreComments = sortedComments.length > 1;

  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="moneyboy-2x-1x-a-layout">
        <div className="moneyboy-feed-page-container" data-multiple-tabs-section data-scroll-zero>
          <div className="moneyboy-feed-page-cate-buttons card" id="posts-tabs-btn-card">
            <button className={`page-content-type-button active-down-effect ${
                activeTab === "posts" ? "active" : ""
              }`}
              onClick={() => handleTabClick("posts")}
            >
              Posts
            </button>
            <button
              className={`page-content-type-button active-down-effect ${
                activeTab === "videos" ? "active" : ""
              }`}
              onClick={() => handleTabClick("videos")}
            >
              Videos
            </button>
            <button
              className={`page-content-type-button active-down-effect ${
                activeTab === "photos" ? "active" : ""
              }`}
              onClick={() => handleTabClick("photos")}
            >
              Photos
            </button>
          </div>
          {activeTab === "posts" && (
            <div className="moneyboy-posts-wrapper moneyboy-diff-content-wrappers" data-multi-tabs-content-tabdata__active >
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
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
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
                          // onChange={(val) => {
                          //   setTime(val as string);
                          //   fetchLikedPosts(1);
                          // }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {posts.map((post, index) => (
                <div key={post._id || index} className="moneyboy-post__container card" >
                  <div className="moneyboy-post__header">
                    <a
                      href="#"
                      className="profile-card"
                      onClick={() =>
                        handleProfileClick(post.creatorInfo?.publicId)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <div className="profile-card__main">
                        <div className="profile-card__avatar-settings">
                          <div className="profile-card__avatar">
                            <img
                              src={
                                post.creatorInfo?.profile ||
                                "/images/post-images/post-img-10.jpg"
                              }
                              alt=""
                            />
                          </div>
                        </div>

                        <div className="profile-card__info">
                          <div className="profile-card__name-badge">
                            <div className="profile-card__name">
                              {post.creatorInfo?.displayName}
                            </div>
                            {post.badge && (
                              <div className="profile-card__badge">
                                <img src={post.badge} alt="Badge" />
                              </div>
                            )}
                          </div>
                          <div className="profile-card__username">
                            @{post.creatorInfo.userName}
                          </div>
                        </div>
                      </div>
                    </a>

                    <div className="moneyboy-post__upload-more-info">
                      <div className="moneyboy-post__upload-time">
                        {timeAgo(post.createdAt)}
                      </div>

                      <div
                        className={`rel-user-more-opts-wrapper ${
                          openMenuId === index ? "active" : ""
                        }`}
                        ref={(el) => setMenuRef(index, el)}
                      >
                        <button
                          className="rel-user-more-opts-trigger-icon"
                          onClick={() => toggleMenu(index)}
                          ref={(el) => setButtonRef(index, el)}
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
                              strokeWidth="1.5"
                            ></path>
                            <path
                              d="M19 10.5C17.9 10.5 17 11.4 17 12.5C17 13.6 17.9 14.5 19 14.5C20.1 14.5 21 13.6 21 12.5C21 11.4 20.1 10.5 19 10.5Z"
                              stroke="none"
                              strokeWidth="1.5"
                            ></path>
                            <path
                              d="M12 10.5C10.9 10.5 10 11.4 10 12.5C10 13.6 10.9 14.5 12 14.5C13.1 14.5 14 13.6 14 12.5C14 11.4 13.1 10.5 12 10.5Z"
                              stroke="none"
                              strokeWidth="1.5"
                            ></path>
                          </svg>
                        </button>

                        {openMenuId === index && (
                          <div className="rel-users-more-opts-popup-wrapper">
                            <div className="rel-users-more-opts-popup-container">
                              <ul>
                                <li
                                  data-copy-post-link={post._id}
                                  onClick={() => handleCopy(post.publicId)}
                                >
                                  <div className="icon copy-link-icon">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="size-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                                      />
                                    </svg>
                                  </div>
                                  <span>
                                    {copied ? "Copied!" : "Copy Link"}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    className="moneyboy-post__desc"
                    onClick={() => handlePostRedirect(post.publicId)}
                    style={{ cursor: "pointer" }}
                  >
                    <p>
                      {expandedPosts[post._id]
                        ? post.text
                        : post.text?.slice(0, 150)}

                      {post.text?.length > 150 && (
                        <span
                          className="active-down-effect-2x"
                          onClick={() => toggleMore(post._id)}
                          style={{ cursor: "pointer", marginLeft: "6px" }}
                        >
                          {expandedPosts[post._id] ? "less" : "more"}
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="moneyboy-post__media">
                    <div
                      className="moneyboy-post__img"
                      // onClick={() => handlePostRedirect(post.publicId)}
                      // style={{ cursor: "pointer" }}
                    >
                      <Swiper
                        slidesPerView={1}
                        spaceBetween={15}
                        navigation
                        modules={[Navigation]}
                        className="post_swiper"
                      >
                        {post.media?.[0]?.mediaFiles?.length > 0 ? (
                          post.media[0].mediaFiles.map(
                            (file: string, i: number) => {
                              const isVideo = post.media?.[0]?.type === "video";

                              return (
                                <SwiperSlide key={i}>
                                  {isVideo ? (
                                    <Plyr source={{ type: "video", sources: [{ src: file, type: "video/mp4", },], }} options={{ controls: ["play", "progress", "current-time", "mute", "volume", "fullscreen",], }} />
                                    
                                  ) : (
                                    <img src={file} alt="MoneyBoy Post Image" />
                                  )}
                                </SwiperSlide>
                              );
                            },
                          )
                        ) : (
                          <SwiperSlide>
                            <div className="nomedia"></div>
                          </SwiperSlide>
                        )}
                      </Swiper>
                    </div>

                    <div className="moneyboy-post__actions">
                      <ul>
                        <li>
                          <a href="#">
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
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12.98 19.88C13.88 21.15 15.35 21.98 17.03 21.98C19.76 21.98 21.98 19.76 21.98 17.03C21.98 15.37 21.16 13.9 19.91 13"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8 11.4C8 12.17 8.6 12.8 9.33 12.8H10.83C11.47 12.8 11.99 12.25 11.99 11.58C11.99 10.85 11.67 10.59 11.2 10.42L8.8 9.58001C8.32 9.41001 8 9.15001 8 8.42001C8 7.75001 8.52 7.20001 9.16 7.20001H10.66C11.4 7.21001 12 7.83001 12 8.60001"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M10 12.85V13.59"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                className="dollar-sign"
                                d="M10 6.40997V7.18997"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span>Send Tip</span>
                          </a>
                        </li>

                        <li>
                          <a
                            href="#"
                            className={`post-like-btn ${post.liked ? "liked" : ""}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleLikeClick(post._id, !!post.liked, index);
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
                            <span>{post.likeCount}</span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setPost(post); // 🔥 SET CURRENT POST
                              setActiveCommentPostId(
                                activeCommentPostId === post._id
                                  ? null
                                  : post._id,
                              );
                              dispatch(fetchComments(post._id)); // 🔥 LOAD COMMENTS
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
                              />
                              <path
                                d="M7 8H17"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7 13H13"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span>{post.commentCount || 0}</span>
                          </a>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <a href="#">
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
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M5.15002 4H16.35C19.05 4 19.65 5.5 17.75 7.4L16.55 8.6C15.75 9.4 15.75 10.7 16.55 11.4L17.75 12.6C19.65 14.5 18.95 16 16.35 16H5.15002"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </a>
                        </li>

                        <li>
                          <a
                            href="#"
                            className={`post-save-btn ${post.saved ? "saved" : ""}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleSaveClick(post._id, post.saved);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill={post.saved ? "white" : "none"}
                            >
                              <path
                                d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {activeCommentPostId === post._id && (
                    <div className="flex flex-column gap-20">
                      <div className="moneyboy-comment-wrap">
                        <div className="comment-wrap">
                          <div className="label-input">
                            <textarea
                              ref={textareaRef}
                              placeholder="Add a comment here"
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                            />
                            <div
                              ref={emojiButtonRef}
                              className="input-placeholder-icon"
                              onClick={() =>
                                setShowEmojiPicker((prev) => !prev)
                              }
                            >
                              <i className="icons emojiSmile svg-icon"></i>
                            </div>
                          </div>
                          {showEmojiPicker && (
                            <div
                              ref={emojiRef}
                              className="emoji-picker-wrapper"
                            >
                              <EmojiPicker
                                onEmojiClick={onEmojiClick}
                                autoFocusSearch={false}
                                skinTonesDisabled
                                previewConfig={{ showPreview: false }}
                                height={360}
                                width={340}
                              />
                            </div>
                          )}
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
                      {topComment && (
                        <div className="moneyboy-post__container card gap-15">
                          <div className="moneyboy-post__header">
                            <a href="#" className="profile-card">
                              <div className="profile-card__main">
                                <div className="profile-card__avatar-settings">
                                  <div className="profile-card__avatar">
                                    <img
                                      src={
                                        topComment.userId?.profile?.trim()
                                          ? topComment.userId.profile
                                          : "/images/profile-avatars/profile-avatar-6.jpg"
                                      }
                                      alt={
                                        topComment.userId?.userName ||
                                        "User profile"
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="profile-card__info">
                                  <div className="profile-card__name-badge">
                                    <div className="profile-card__name">
                                      {topComment.userId?.displayName}
                                    </div>
                                  </div>
                                  <div className="profile-card__username">
                                    @{topComment.userId?.userName}
                                  </div>
                                </div>
                              </div>
                            </a>
                            <div className="moneyboy-post__upload-more-info">
                              <div className="moneyboy-post__upload-time">
                                {formatRelativeTime(topComment.createdAt)}
                              </div>
                            </div>
                          </div>
                          <div className="moneyboy-post__desc">
                            <p>{topComment.comment}</p>
                          </div>
                          <div className="like-deslike-wrap">
                            <ul>
                              <li>
                                <Link href="#" className={`comment-like-btn ${topComment.isLiked ? "active" : ""}`} onClick={(e) => {e.preventDefault(); dispatch(likeComment({commentId: topComment._id,}),);}}>
                                  <ThumbsUp color="black" />
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="#"
                                  className={`comment-dislike-btn ${topComment.isDisliked ? "active" : ""}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(
                                      dislikeComment({
                                        commentId: topComment._id,
                                      }),
                                    );
                                  }}
                                >
                                  <ThumbsDown color="black" strokeWidth={2} />
                                </Link>
                              </li>
                            </ul>
                            {hasMoreComments && (
                              <button onClick={() => handlePostRedirect(post.publicId)} className="active-down-effect-2x">See more</button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "videos" && (
            <div
              className="moneyboy-diff-content-wrappers"
              data-multi-tabs-content-tab
            >
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
                              {/* data__active */}

                              <button
                                className={`creator-content-grid-layout-btn ${
                                  gridLayoutMode.videos === "grid"
                                    ? "active"
                                    : "inactive"
                                }`}
                                onClick={() =>
                                  handleGridLayoutChange("videos", "grid")
                                }
                              >
                                {/* <button
                                {...({
                                  className:
                                    "creator-content-grid-layout-btn",
                                  onClick: () =>
                                    handleGridLayoutChange(
                                      "videos",
                                      "grid"
                                    ),
                                  data__active:
                                    gridLayoutMode.videos === "grid"
                                      ? "true"
                                      : undefined,
                                } as any)}
                              > */}
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
                                  gridLayoutMode.videos === "list"
                                    ? "active"
                                    : "inactive"
                                }`}
                                onClick={() =>
                                  handleGridLayoutChange("videos", "list")
                                }
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
                        className={`creator-content-cards-wrapper multi-dem-cards-wrapper-layout ${
                          gridLayoutMode.videos === "list"
                            ? "list-view-layout"
                            : ""
                        } ${
                          gridLayoutMode.videos === "grid"
                            ? "grid-view-layout"
                            : ""
                        }`}
                        data-multi-child-grid-layout-wishlist
                        data-2-cols
                        data-layout-toggle-rows={
                          gridLayoutMode.videos === "list" ? "true" : undefined
                        }
                      >
                        <div className="creator-content-type-container-wrapper">
                          {videoPosts.map((post: any, index: number) => (
                            <div
                              key={post._id || index}
                              className="creator-media-card card"
                              onClick={() => handlePostRedirect(post.publicId)}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="creator-media-card__media-wrapper">
                                <div className="creator-media-card__media">
                                  <video
                                    src={post.media?.[0]?.mediaFiles?.[0]}
                                    muted
                                    controls
                                    playsInline
                                  />
                                </div>

                                <div className="creator-media-card__overlay"></div>

                                <div className="creator-media-card__stats-overlay">
                                  <div className="creator-media-card__post-stats">
                                    <ul>
                                      <li>
                                        <a href="#" className="post-like-btn">
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
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          href="#"
                                          className="post-comment-btn"
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
                                            />
                                            <path
                                              d="M7 8H17"
                                              stroke="white"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                            <path
                                              d="M7 13H13"
                                              stroke="white"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                          <span>{post.commentCount || 0}</span>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>

                                  <div className="creator-media-card__overlay-profile-wrapper">
                                    <a href="#" className="profile-card">
                                      <div className="profile-card__main">
                                        <div className="profile-card__avatar-settings">
                                          <div className="profile-card__avatar">
                                            <img
                                              src={
                                                post.creatorInfo?.profile ||
                                                "/images/profile-avatars/profile-avatar-1.png"
                                              }
                                              alt="Profile"
                                            />
                                          </div>
                                        </div>
                                        <div className="profile-card__info">
                                          <div className="profile-card__name">
                                            {post.creatorInfo?.displayName}
                                          </div>
                                          <div className="profile-card__username">
                                            @{post.creatorInfo?.userName}
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              </div>

                              <div className="creator-media-card__desc">
                                <p
                                  style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                  }}
                                >
                                  {post.text}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "photos" && (
            <div
              className="moneyboy-diff-content-wrappers"
              data-multi-tabs-content-tab
            >
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
                              {/* data__active */}
                              <button
                                className={`creator-content-grid-layout-btn ${
                                  gridLayoutMode.photos === "grid"
                                    ? "active"
                                    : "inactive"
                                }`}
                                onClick={() =>
                                  handleGridLayoutChange("photos", "grid")
                                }
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
                                  gridLayoutMode.photos === "list"
                                    ? "active"
                                    : "inactive"
                                }`}
                                onClick={() =>
                                  handleGridLayoutChange("photos", "list")
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path d="M19.9 13.5H4.1C2.6 13.5 2 14.14 2 15.73V19.77C2 21.36 2.6 22 4.1 22H19.9C21.4 22 22 21.36 22 19.77V15.73C22 14.14 21.4 13.5 19.9 13.5Z" />
                                  <path d="M19.9 2H4.1C2.6 2 2 2.64 2 4.23V8.27C2 9.86 2.6 10.5 4.1 10.5H19.9C21.4 10.5 22 9.86 22 8.27V4.23C22 2.64 21.4 2 19.9 2Z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`creator-content-cards-wrapper multi-dem-cards-wrapper-layout ${
                          gridLayoutMode.photos === "list"
                            ? "list-view-layout"
                            : ""
                        } ${
                          gridLayoutMode.photos === "grid"
                            ? "grid-view-layout"
                            : ""
                        }`}
                        data-multi-child-grid-layout-wishlist
                        data-2-cols
                        data-layout-toggle-rows={
                          gridLayoutMode.photos === "list" ? "true" : undefined
                        }
                      >
                        <div className="creator-content-type-container-wrapper">
                          {photoPosts.map((post: any, index: number) => (
                            <div
                              key={post._id || index}
                              className="creator-media-card card"
                              onClick={() => handlePostRedirect(post.publicId)}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="creator-media-card__media-wrapper">
                                <div className="creator-media-card__media">
                                  <img
                                    src={
                                      post.thumbnail?.trim()
                                        ? post.thumbnail
                                        : post.media?.[0]?.mediaFiles?.[0]
                                    }
                                    alt="Post Image"
                                  />
                                </div>

                                <div className="creator-media-card__overlay"></div>

                                <div className="creator-media-card__stats-overlay">
                                  <div className="creator-media-card__post-stats">
                                    <ul>
                                      <li>
                                        <a href="#" className="post-like-btn">
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
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          href="#"
                                          className="post-comment-btn"
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
                                            />
                                            <path
                                              d="M7 8H17"
                                              stroke="white"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                            <path
                                              d="M7 13H13"
                                              stroke="white"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                          <span>{post.commentCount || 0}</span>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>

                                  <div className="creator-media-card__overlay-profile-wrapper">
                                    <a href="#" className="profile-card">
                                      <div className="profile-card__main">
                                        <div className="profile-card__avatar-settings">
                                          <div className="profile-card__avatar">
                                            <img
                                              src={
                                                post.creatorInfo?.profile ||
                                                "/images/profile-avatars/profile-avatar-1.png"
                                              }
                                              alt="Profile"
                                            />
                                          </div>
                                        </div>
                                        <div className="profile-card__info">
                                          <div className="profile-card__name">
                                            {post.creatorInfo?.displayName}
                                          </div>
                                          <div className="profile-card__username">
                                            @{post.creatorInfo?.userName}
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              </div>

                              <div className="creator-media-card__desc">
                                <p
                                  style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                  }}
                                >
                                  {post.text}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Featuredboys />
    </div>
  );
};

export default LikePage;
