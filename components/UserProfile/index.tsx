"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ShowToast from "../common/ShowToast";
import InfiniteScrollWrapper from "../common/InfiniteScrollWrapper";
import {
  API_USER_PROFILE,
  API_FOLLOWER_COUNT,
  API_GET_FOLLOWING_POSTS,
  API_GET_POPULAR_POSTS,
  API_GET_POSTS,
  API_LIKE_POST,
  API_SAVE_POST,
  API_UNLIKE_POST,
  API_UNSAVE_POST,
} from "@/utils/api/APIConstant";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";
import Featuredboys from "../Featuredboys";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchFeedPosts, fetchFollowingPosts, fetchPopularPosts, incrementFeedPostCommentCount, updateFeedPost } from "@/redux/other/feedPostsSlice";
import { savePost, unsavePost } from "@/redux/other/savedPostsSlice";
import PostCard from "../FeedPage/PostCard";

interface UserProfile {
  id: number;
  userName: string;
  displayName: string;
  avatarUrl: string;
  bannerUrl: string;
  location: string;
  joinDate: string;
  followersCount: number;
  followingCount: number;
  bio: string;
  isFollowing?: boolean;
  followers?: number;
  following?: number;
  profile?: string;
  createdAt?: string;
  city?: string;
  country?: string;
  coverImage?: string;
}
type TabType = "feed" | "following" | "popular";
const LIMIT = 4;

const UserProfilepage = () => {
  const router = useRouter();
  const { data: session, status }: any = useSession();
  const isLoggedIn = status === "authenticated";

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [followerStats, setFollowerStats] = useState({
    followerCount: 0,
    followingCount: 0,
  });

  const dispatch = useDispatch<AppDispatch>();


  const {
    posts,
    feedPage,
    followingPage,
    popularPage,
    hasMoreFeed,
    hasMoreFollowing,
    hasMorePopular,
    loading,
  } = useSelector((state: any) => state.feedPosts);

  const allPosts = Object.values(posts);

  const feedPosts = allPosts.filter((p: any) => p.source === "feed");
  const followingPosts = allPosts.filter((p: any) => p.source === "following");
  const popularPosts = allPosts.filter((p: any) => p.source === "popular");



  const [activeTab, setActiveTab] = useState<string>("feed");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());
  const buttonRefs = useRef<Map<number, HTMLButtonElement | null>>(new Map());

  const setMenuRef = (id: number, element: HTMLDivElement | null) => {
    menuRefs.current.set(id, element);
  };

  const setButtonRef = (id: number, element: HTMLButtonElement | null) => {
    buttonRefs.current.set(id, element);
  };

  const toggleMenu = (id: number) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };


  const [likeLoading, setLikeLoading] = useState<Record<string, boolean>>({});
  const [saveLoading, setSaveLoading] = useState<Record<string, boolean>>({});
  const [followingHasMore, setFollowingHasMore] = useState(true);
  const [followingLoadingMore, setFollowingLoadingMore] = useState(false);

  const [popularHasMore, setPopularHasMore] = useState(true);
  const [popularLoadingMore, setPopularLoadingMore] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [expandedPosts, setExpandedPosts] = useState<
    Record<string, Record<string, boolean>>
  >({
    feed: {},
    following: {},
    popular: {},
  });

  const hasFetchedRef = useRef(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoadingProfile(true);
        setError(null);

        const response = await getApiWithOutQuery({ url: API_USER_PROFILE });

        if (response && response.success) {
          setUserProfile(response.data);
          if (response.data.followerStats) {
            setFollowerStats(response.data.followerStats);
          }
        } else {
          setError(response?.message || "Failed to load profile");
          ShowToast(response?.message || "Failed to load profile", "error");
        }
      } catch (err: any) {
        setError("An error occurred while fetching profile");
        ShowToast("An error occurred while fetching profile", "error");
        console.error("Error fetching user profile:", err);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchFollowerCounts = async () => {
      try {
        const response = await getApiWithOutQuery({ url: API_FOLLOWER_COUNT });
        if (response?.success) {
          setFollowerStats({
            followerCount: response.data.followerCount,
            followingCount: response.data.followingCount,
          });
        }
      } catch (err: any) {
        console.error("Error fetching follower counts:", err);
      }
    };
    fetchFollowerCounts();
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  useEffect(() => {
    const likeButtons = document.querySelectorAll("[data-like-button]");
    const handleClick = (event: Event) => {
      const button = event.currentTarget as HTMLElement;
      button.classList.toggle("liked");
    };
    likeButtons.forEach((button) =>
      button.addEventListener("click", handleClick),
    );
    return () =>
      likeButtons.forEach((button) =>
        button.removeEventListener("click", handleClick),
      );
  }, []);

  const formatJoinedDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `Joined ${date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    })}`;
  };

  const getTimeAgo = (dateString: string) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - postDate.getTime()) / 1000,
    );

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInSeconds < 60) return "Just now";
    if (diffInMinutes < 60)
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    if (diffInDays < 7)
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    if (diffInWeeks < 4)
      return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
    if (diffInMonths < 12)
      return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  };

  const updatePostInList = (
    list: any[],
    postId: string,
    updater: (post: any) => any,
  ) => list.map((p) => (p._id === postId ? updater(p) : p));

  useEffect(() => {
    if (activeTab === "feed" && feedPosts.length === 0) {
      dispatch(
        fetchFeedPosts({
          userId: (session?.user as any)?.id,
          page: 1,
          limit: LIMIT,
        }),
      );
    }

    if (
      activeTab === "following" &&
      followingPosts.length === 0 &&
      isLoggedIn
    ) {
      dispatch(
        fetchFollowingPosts({
          page: 1,
          limit: LIMIT,
        }),
      );
    }

    if (activeTab === "popular" && popularPosts.length === 0) {
      dispatch(
        fetchPopularPosts({
          userId: (session?.user as any)?.id,
          page: 1,
          limit: LIMIT,
        }),
      );
    }
  }, [activeTab]);

  /* ================= INFINITE SCROLL ================= */

  const fetchMoreHandler = () => {
    if (loading) return;

    if (activeTab === "feed" && hasMoreFeed) {
      dispatch(
        fetchFeedPosts({
          userId: (session?.user as any)?.id,
          page: feedPage + 1,
          limit: LIMIT,
        }),
      );
    }

    if (activeTab === "following" && hasMoreFollowing) {
      dispatch(
        fetchFollowingPosts({
          page: followingPage + 1,
          limit: LIMIT,
        }),
      );
    }

    if (activeTab === "popular" && hasMorePopular) {
      dispatch(
        fetchPopularPosts({
          userId: (session?.user as any)?.id,
          page: popularPage + 1,
          limit: LIMIT,
        }),
      );
    }
  };

  /* ================= LIKE ================= */

  const handleLike = async (postId: string) => {
    if (!isLoggedIn) return router.push("/login");
    if (likeLoading[postId]) return;

    const post = posts[postId];
    setLikeLoading((p) => ({ ...p, [postId]: true }));

    // optimistic update
    dispatch(
      updateFeedPost({
        postId,
        data: {
          isLiked: !post.isLiked,
          likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1,
        },
      }),
    );

    const res = await apiPost({
      url: post.isLiked ? API_UNLIKE_POST : API_LIKE_POST,
      values: { postId },
    });

    if (!res?.success) {
      dispatch(updateFeedPost({ postId, data: post }));
    }

    setLikeLoading((p) => ({ ...p, [postId]: false }));
  };

  /* ================= SAVE / UNSAVE ================= */

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

  /* ================= COMMENTS ================= */

  const incrementCommentCount = (postId: string) => {
    dispatch(incrementFeedPostCommentCount(postId));
  };

  /* ================= UI HELPERS ================= */

  const activeList =
    activeTab === "feed"
      ? feedPosts
      : activeTab === "following"
        ? followingPosts
        : popularPosts;

  const activeHasMore =
    activeTab === "feed"
      ? hasMoreFeed
      : activeTab === "following"
        ? hasMoreFollowing
        : hasMorePopular;

  const handleTabClick = (tab: TabType) => {
    if (!isLoggedIn && tab === "following") {
      router.push("/discover");
      return;
    }
    setActiveTab(tab);
  };


  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="moneyboy-2x-1x-a-layout">
        <div
          className="moneyboy-feed-page-container"
          data-multiple-tabs-section
        >
          <div className="creator-profile-card-container user-profile-card card">
            <div className="creator-profile-banner">
              <img
                src={
                  userProfile?.coverImage ||
                  "/images/profile-banners/profile-banner-9.jpg"
                }
                alt="Creator Profile Banner Image"
              />
            </div>

            <div className="creator-profile-info-container">
              <div className="profile-card">
                <div className="profile-info-buttons">
                  <div className="profile-card__main">
                    <div className="profile-card__avatar-settings">
                      <div className="profile-card__avatar">
                        <img
                          src={
                            userProfile?.profile
                              ? userProfile.profile
                              : "/images/profile-avatars/profile-avatar-13.jpg"
                          }
                          alt="MoneyBoy Social Profile Avatar"
                        />
                      </div>
                    </div>
                    <div className="profile-card__info">
                      <div className="profile-card__name-badge">
                        <div className="profile-card__name">
                          {userProfile?.displayName || "Charlie Mango"}
                        </div>
                      </div>
                      <div className="profile-card__username">
                        @{userProfile?.userName || "charliemango"}
                      </div>
                    </div>
                  </div>
                  <div className="creator-profile-buttons">
                    <ul>
                      <li>
                        <a href="#" className="message-btn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                          >
                            <path
                              d="M22 10.5V13.5C22 17.5 20 19.5 16 19.5H15.5C15.19 19.5 14.89 19.65 14.7 19.9L13.2 21.9C12.54 22.78 11.46 22.78 10.8 21.9L9.3 19.9C9.14 19.68 8.77 19.5 8.5 19.5H8C4 19.5 2 18.5 2 13.5V8.5C2 4.5 4 2.5 8 2.5H14"
                              stroke="none"
                              stroke-width="1.5"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M19.5 7.5C20.8807 7.5 22 6.38071 22 5C22 3.61929 20.8807 2.5 19.5 2.5C18.1193 2.5 17 3.61929 17 5C17 6.38071 18.1193 7.5 19.5 7.5Z"
                              stroke="none"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M15.9965 11.5H16.0054"
                              stroke="none"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M11.9945 11.5H12.0035"
                              stroke="none"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M7.99451 11.5H8.00349"
                              stroke="none"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <button className="btn-txt-gradient">
                          <span>Follow</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="profile-card__geo-details">
                  <div className="profile-card__geo-detail">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z"
                        stroke="none"
                        stroke-width="1.5"
                      />
                      <path
                        d="M11.9999 13.43C13.723 13.43 15.1199 12.0331 15.1199 10.31C15.1199 8.58687 13.723 7.19 11.9999 7.19C10.2768 7.19 8.87988 8.58687 8.87988 10.31C8.87988 12.0331 10.2768 13.43 11.9999 13.43Z"
                        stroke="none"
                        stroke-width="1.5"
                      />
                    </svg>
                    <span>
                      {userProfile?.city
                        ? `${userProfile.city}${userProfile.country ? `, ${userProfile.country}` : ""}`
                        : "Location not set"}
                    </span>
                  </div>
                  <div className="profile-card__geo-detail">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M8 2V5"
                        stroke="none"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16 2V5"
                        stroke="none"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                        stroke="none"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8 11H16"
                        stroke="none"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8 16H12"
                        stroke="none"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span>{formatJoinedDate(userProfile?.createdAt)}</span>
                  </div>
                </div>
                <div className="creator-profile-stats-link">
                  <div className="profile-card__stats">
                    <div className="profile-card__stats-item followers-stats">
                      <div className="profile-card__stats-num">
                        {" "}
                        {followerStats.followerCount}{" "}
                      </div>
                      <div className="profile-card__stats-label">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M9.16006 11.2986C9.06006 11.2886 8.94006 11.2886 8.83006 11.2986C6.45006 11.2186 4.56006 9.26859 4.56006 6.86859C4.56006 4.41859 6.54006 2.42859 9.00006 2.42859C11.4501 2.42859 13.4401 4.41859 13.4401 6.86859C13.4301 9.26859 11.5401 11.2186 9.16006 11.2986Z"
                            stroke="none"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M16.4098 4.42859C18.3498 4.42859 19.9098 5.99859 19.9098 7.92859C19.9098 9.81859 18.4098 11.3586 16.5398 11.4286C16.4598 11.4186 16.3698 11.4186 16.2798 11.4286"
                            stroke="none"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M4.16021 14.9886C1.74021 16.6086 1.74021 19.2486 4.16021 20.8586C6.91021 22.6986 11.4202 22.6986 14.1702 20.8586C16.5902 19.2386 16.5902 16.5986 14.1702 14.9886C11.4302 13.1586 6.92021 13.1586 4.16021 14.9886Z"
                            stroke="none"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M18.3398 20.4286C19.0598 20.2786 19.7398 19.9886 20.2998 19.5586C21.8598 18.3886 21.8598 16.4586 20.2998 15.2886C19.7498 14.8686 19.0798 14.5886 18.3698 14.4286"
                            stroke="none"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                        <span>Followers</span>
                      </div>
                    </div>
                    <div className="profile-card__stats-item following-stats">
                      <div className="profile-card__stats-num">
                        {followerStats.followingCount}
                      </div>
                      <div className="profile-card__stats-label">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M12.1601 11.2986C12.0601 11.2886 11.9401 11.2886 11.8301 11.2986C9.45006 11.2186 7.56006 9.26859 7.56006 6.86859C7.56006 4.41859 9.54006 2.42859 12.0001 2.42859C14.4501 2.42859 16.4401 4.41859 16.4401 6.86859C16.4301 9.26859 14.5401 11.2186 12.1601 11.2986Z"
                            stroke="none"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M7.16021 14.9886C4.74021 16.6086 4.74021 19.2486 7.16021 20.8586C9.91021 22.6986 14.4202 22.6986 17.1702 20.8586C19.5902 19.2386 19.5902 16.5986 17.1702 14.9886C14.4302 13.1586 9.92021 13.1586 7.16021 14.9886Z"
                            stroke="none"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                        <span>Following</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="creator-profile-description">
                <p>{userProfile?.bio || "No bio added yet."}</p>
              </div>
            </div>
          </div>

                <div className="moneyboy-feed-page-cate-buttons card">
              <button
                className={`page-content-type-button ${activeTab === "feed" ? "active" : ""}`}
                onClick={() => handleTabClick("feed")}
              >
                Feed
              </button>
              <button
                className={`page-content-type-button ${activeTab === "following" ? "active" : ""}`}
                onClick={() => handleTabClick("following")}
              >
                {isLoggedIn ? "Following" : "Discover"}
              </button>
              <button
                className={`page-content-type-button ${activeTab === "popular" ? "active" : ""}`}
                onClick={() => handleTabClick("popular")}
              >
                Popular
              </button>
            </div>
        <div
              id="feed-scroll-container"
              className="moneyboy-posts-scroll-container"
            >
              <InfiniteScrollWrapper
                className="moneyboy-posts-wrapper"
                scrollableTarget="feed-scroll-container"
                dataLength={activeList.length}
                fetchMore={fetchMoreHandler}
                hasMore={activeHasMore}
              >
                {activeList.map((post: any) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    onLike={handleLike}
                    onSave={handleSave}
                    onCommentAdded={incrementCommentCount}
                  />
                ))}
              </InfiniteScrollWrapper>
              {/* <InfiniteScrollWrapper className="moneyboy-posts-wrapper"  scrollableTarget="feed-scroll-container" dataLength={activeTab === "feed" ? posts.length : activeTab === "following" ? followingPosts.length : popularPosts.length}
                fetchMore={() => {if (activeTab === "feed") fetchPosts(); if (activeTab === "following") fetchFollowingPosts(); if (activeTab === "popular") fetchPopularPosts();}}
                hasMore={activeTab === "feed" ? hasMore : activeTab === "following" ? followingHasMore : popularHasMore }>
                  {(activeTab === "feed" ? posts :
                    activeTab === "following" ? followingPosts : popularPosts
                  ).map((post) => (
                    <PostCard key={post._id} post={post} onLike={handleLike} onSave={handleSave}/>
                  ))}
              </InfiniteScrollWrapper> */}
            </div>
        </div>
      </div>

      <Featuredboys />
    </div>
  );
};

export default UserProfilepage;
