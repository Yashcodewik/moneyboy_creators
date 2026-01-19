"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { API_GET_FOLLOWING_POSTS, API_GET_POPULAR_POSTS, API_GET_POSTS, API_LIKE_POST, API_SAVE_POST, API_UNLIKE_POST, API_UNSAVE_POST,} from "@/utils/api/APIConstant";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";
import InfiniteScrollWrapper from "../common/InfiniteScrollWrapper";
import PostCard from "./PostCard";

const FeedPage = () => {
  const router = useRouter();
  const { data: session, status }: any = useSession();
  const isLoggedIn = status === "authenticated";

  /* ========== UI STATE ========== */
  const [activeTab, setActiveTab] = useState<"feed" | "following" | "popular">("feed");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const menuRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());
  const buttonRefs = useRef<Map<number, HTMLButtonElement | null>>(new Map());

  /* ========== FEED STATE ========== */
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  /* ========== FOLLOWING STATE ========== */
  const [followingPosts, setFollowingPosts] = useState<any[]>([]);
  const [followingPage, setFollowingPage] = useState(1);
  const [followingHasMore, setFollowingHasMore] = useState(true);
  const [followingLoadingMore, setFollowingLoadingMore] = useState(false);

  /* ========== POPULAR STATE ========== */
  const [popularPosts, setPopularPosts] = useState<any[]>([]);
  const [popularPage, setPopularPage] = useState(1);
  const [popularHasMore, setPopularHasMore] = useState(true);
  const [popularLoadingMore, setPopularLoadingMore] = useState(false);

  /* ========== LIKE / SAVE STATE ========== */
  const [likeLoading, setLikeLoading] = useState<Record<string, boolean>>({});
  const [saveLoading, setSaveLoading] = useState<Record<string, boolean>>({});

  /* ========== TEXT EXPAND STATE ========== */
  const [expandedPosts, setExpandedPosts] = useState({feed: {}, following: {}, popular: {},});
  const limit = 4;
  const firstFetchRef = useRef(false);

  /* ========== HELPERS ========== */
  const setMenuRef = (id: number, el: HTMLDivElement | null) => menuRefs.current.set(id, el);
  const setButtonRef = (id: number, el: HTMLButtonElement | null) => buttonRefs.current.set(id, el);
  const toggleMenu = (id: number) => setOpenMenuId((prev) => (prev === id ? null : id));
  const toggleExpand = (postId: string, tab: keyof typeof expandedPosts) => {setExpandedPosts((prev) => ({...prev, [tab]: { ...prev[tab], [postId]: !prev[tab][postId] },})); };

  const updatePostInList = (
    list: any[],
    postId: string,
    updater: (p: any) => any
  ) => list.map((p) => (p._id === postId ? updater(p) : p));

  /* ========== FETCH FEED ========== */
  const fetchPosts = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);

    const res = await apiPost({
      url: API_GET_POSTS,
      values: { userId: session?.user?.id || "", page, limit },
    });

    if (Array.isArray(res) && res.length > 0) {
      setPosts((prev) => {
        const ids = new Set(prev.map((p) => p._id));
        const unique = res.filter((p) => !ids.has(p._id));
        return [...prev, ...unique];
      });
      setPage((p) => p + 1);
    } else {
      setHasMore(false);
    }

    setLoadingMore(false);
  };

  useEffect(() => {
    if (firstFetchRef.current) return;
    firstFetchRef.current = true;
    fetchPosts();
  }, []);

  /* ========== FETCH FOLLOWING ========== */
  const fetchFollowingPosts = async () => {
    if (followingLoadingMore || !followingHasMore) return;
    setFollowingLoadingMore(true);

    const res = await getApiWithOutQuery({
      url: `${API_GET_FOLLOWING_POSTS}?page=${followingPage}&limit=${limit}`,
    });

    if (res?.success && Array.isArray(res.posts)) {
      setFollowingPosts((prev) => {
        const ids = new Set(prev.map((p: any) => p._id));
        return [...prev, ...res.posts.filter((p: any) => !ids.has(p._id))];
      });
      setFollowingPage((p) => p + 1);
      setFollowingHasMore(res.pagination?.hasNextPage);
    } else {
      setFollowingHasMore(false);
    }

    setFollowingLoadingMore(false);
  };

  useEffect(() => {
    if (activeTab !== "following" || !isLoggedIn) return;
    setFollowingPosts([]);
    setFollowingPage(1);
    setFollowingHasMore(true);
    fetchFollowingPosts();
  }, [activeTab, isLoggedIn]);

  /* ========== FETCH POPULAR ========== */
  const fetchPopularPosts = async () => {
    if (popularLoadingMore || !popularHasMore) return;
    setPopularLoadingMore(true);

    const res = await apiPost({
      url: API_GET_POPULAR_POSTS,
      values: { userId: session?.user?.id || "", page: popularPage, limit },
    });

    if (Array.isArray(res) && res.length > 0) {
      setPopularPosts((prev) => {
        const ids = new Set(prev.map((p) => p._id));
        return [...prev, ...res.filter((p) => !ids.has(p._id))];
      });
      setPopularPage((p) => p + 1);
    } else {
      setPopularHasMore(false);
    }

    setPopularLoadingMore(false);
  };

  useEffect(() => {
    if (activeTab !== "popular") return;
    setPopularPosts([]);
    setPopularPage(1);
    setPopularHasMore(true);
    fetchPopularPosts();
  }, [activeTab]);

  /* ========== LIKE / SAVE ========== */
  const handleLike = async (postId: string) => {
    if (likeLoading[postId]) return;

    const list =
      activeTab === "following"
        ? followingPosts
        : activeTab === "popular"
        ? popularPosts
        : posts;

    const setList =
      activeTab === "following"
        ? setFollowingPosts
        : activeTab === "popular"
        ? setPopularPosts
        : setPosts;

    const post = list.find((p) => p._id === postId);
    if (!post) return;

    const prevLiked = post.isLiked;
    const prevCount = post.likeCount || 0;

    setLikeLoading((p) => ({ ...p, [postId]: true }));

    setList((prev) =>
      updatePostInList(prev, postId, (p) => ({
        ...p,
        isLiked: !prevLiked,
        likeCount: prevLiked ? prevCount - 1 : prevCount + 1,
      }))
    );

    const endpoint = prevLiked ? API_UNLIKE_POST : API_LIKE_POST;
    const res = await apiPost({ url: endpoint, values: { postId } });

    if (!res?.success) {
      setList((prev) =>
        updatePostInList(prev, postId, (p) => ({
          ...p,
          isLiked: prevLiked,
          likeCount: prevCount,
        }))
      );
    }

    setLikeLoading((p) => ({ ...p, [postId]: false }));
  };

  const handleSave = async (postId: string) => {
    if (saveLoading[postId]) return;

    const list =
      activeTab === "following"
        ? followingPosts
        : activeTab === "popular"
        ? popularPosts
        : posts;

    const setList =
      activeTab === "following"
        ? setFollowingPosts
        : activeTab === "popular"
        ? setPopularPosts
        : setPosts;

    const post = list.find((p) => p._id === postId);
    if (!post) return;

    const prevSaved = post.isSaved;

    setSaveLoading((p) => ({ ...p, [postId]: true }));

    setList((prev) =>
      updatePostInList(prev, postId, (p) => ({
        ...p,
        isSaved: !prevSaved,
      }))
    );

    const endpoint = prevSaved ? API_UNSAVE_POST : API_SAVE_POST;
    const res = await apiPost({ url: endpoint, values: { postId } });

    if (!res?.success) {
      setList((prev) =>
        updatePostInList(prev, postId, (p) => ({
          ...p,
          isSaved: prevSaved,
        }))
      );
    }

    setSaveLoading((p) => ({ ...p, [postId]: false }));
  };

  /* ========== TAB SWITCH ========== */
  const handleTabClick = (tab: any) => {
    if (!isLoggedIn && tab === "following") {
      router.push("/discover");
      return;
    }
    setActiveTab(tab);
  };

  /* ========== RENDER ========== */
  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="moneyboy-2x-1x-a-layout">
        <div className="moneyboy-feed-page-container">
          {/* TABS */}
          <div className="moneyboy-feed-page-cate-buttons card">
            <button className={`page-content-type-button ${ activeTab === "feed" ? "active" : "" }`} onClick={() => handleTabClick("feed")}>Feed</button>
            <button className={`page-content-type-button ${activeTab === "following" ? "active" : ""}`} onClick={() => handleTabClick("following")}>{isLoggedIn ? "Following" : "Discover"}</button>
            <button className={`page-content-type-button ${activeTab === "popular" ? "active" : ""}`} onClick={() => handleTabClick("popular")}>Popular</button>
          </div>
          {/* FEED */}
          {activeTab === "feed" && (
            <InfiniteScrollWrapper dataLength={posts.length} fetchMore={fetchPosts} hasMore={hasMore}>
              <div className="moneyboy-posts-wrapper">
                {posts.map((post) => (<PostCard key={post._id} post={post} onLike={handleLike} onSave={handleSave}/>))}
              </div>
            </InfiniteScrollWrapper>
          )}
          {/* FOLLOWING */}
          {activeTab === "following" && (
            <InfiniteScrollWrapper dataLength={followingPosts.length} fetchMore={fetchFollowingPosts} hasMore={followingHasMore}>
              <div className="moneyboy-posts-wrapper">
                {followingPosts.map((post) => (
                  <PostCard key={post._id} post={post} onLike={handleLike} onSave={handleSave}/>
                ))}
              </div>
            </InfiniteScrollWrapper>
          )}
          {/* POPULAR */}
          {activeTab === "popular" && (
            <InfiniteScrollWrapper dataLength={popularPosts.length} fetchMore={fetchPopularPosts} hasMore={popularHasMore}>
              <div className="moneyboy-posts-wrapper">
                {popularPosts.map((post) => (<PostCard key={post._id} post={post} onLike={handleLike} onSave={handleSave}/>))}
              </div>
            </InfiniteScrollWrapper>
          )}
        </div>
      </div>
      <aside className="moneyboy-2x-1x-b-layout">
        <div className="moneyboy-feed-sidebar-container">
            <div className="featured-profiles-card-container card">
              <div className="featured-profiles-header">
                  <div className="featured-card-heading">
                    <h3 className="card-heading">Featured Moneyboys</h3>
                  </div>
                  <div className="featured-card-opts">
                    <button className="icon-btn hover-scale-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                          >
                          <path
                              d="M22 12.5C22 18.02 17.52 22.5 12 22.5C6.48 22.5 3.11 16.94 3.11 16.94M3.11 16.94H7.63M3.11 16.94V21.94M2 12.5C2 6.98 6.44 2.5 12 2.5C18.67 2.5 22 8.06 22 8.06M22 8.06V3.06M22 8.06H17.56"
                              stroke="none"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              />
                        </svg>
                    </button>
                    <button className="icon-btn hover-scale-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                          >
                          <path
                              d="M12 22.5C6.47715 22.5 2 18.0228 2 12.5C2 6.97715 6.47715 2.5 12 2.5C17.5228 2.5 22 6.97715 22 12.5C22 18.0228 17.5228 22.5 12 22.5Z"
                              stroke="none"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              />
                          <path
                              d="M13.26 16.03L9.74001 12.5L13.26 8.97"
                              stroke="none"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              />
                        </svg>
                    </button>
                    <button className="icon-btn hover-scale-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                          >
                          <path
                              d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z"
                              stroke="none"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              />
                          <path
                              d="M10.74 16.03L14.26 12.5L10.74 8.97"
                              stroke="none"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              />
                        </svg>
                    </button>
                  </div>
              </div>
              <div className="featured-profiles-wrapper">
                  <div className="featured-profile__card">
                    <div className="featured-profile__info-wrapper">
                        <div className="profile-card featured-profile-card">
                          <div className="profile-card__bg-img">
                              <img
                                src="/images/profile-banners/profile-banner-7.png"
                                alt="Featured Profile Background Image"
                                />
                          </div>
                          <div className="profile-card__main">
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
                                      Zain Schleifer
                                    </div>
                                    <div className="profile-card__badge">
                                      <img
                                          src="/images/logo/profile-badge.png"
                                          alt="MoneyBoy Social Profile Badge"
                                          />
                                    </div>
                                </div>
                                <div className="profile-card__username">
                                    @coreybergson
                                </div>
                              </div>
                              <div className="profile-card__icon">
                                {/* 
                                <div className="profile-card__blur-icon">
                                    <button className="like-button" data-like-button>
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          height="21"
                                          viewBox="0 0 20 21"
                                          fill="none"
                                          >
                                          <path
                                            d="M10.5166 17.8417C10.2333 17.9417 9.76663 17.9417 9.48329 17.8417C7.06663 17.0167 1.66663 13.575 1.66663 7.74166C1.66663 5.16666 3.74163 3.08333 6.29996 3.08333C7.81663 3.08333 9.15829 3.81666 9.99996 4.95C10.8416 3.81666 12.1916 3.08333 13.7 3.08333C16.2583 3.08333 18.3333 5.16666 18.3333 7.74166C18.3333 13.575 12.9333 17.0167 10.5166 17.8417Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            />
                                      </svg>
                                    </button>
                                </div>
                                */}
                              </div>
                          </div>
                          <div className="profile-card__desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit
                              </p>
                          </div>
                        </div>
                    </div>
                  </div>
                  <div className="featured-profile__card">
                    <div className="featured-profile__info-wrapper">
                        <div className="profile-card featured-profile-card">
                          <div className="profile-card__bg-img">
                              <img
                                src="/images/profile-banners/profile-banner-4.jpg"
                                alt="Featured Profile Background Image"
                                />
                          </div>
                          <div className="profile-card__main">
                              <div className="profile-card__avatar-settings">
                                <div className="profile-card__avatar">
                                    <img
                                      src="/images/profile-avatars/profile-avatar-5.jpg"
                                      alt="MoneyBoy Social Profile Avatar"
                                      />
                                </div>
                              </div>
                              <div className="profile-card__info">
                                <div className="profile-card__name-badge">
                                    <div className="profile-card__name">
                                      Gustavo Stanton
                                    </div>
                                    <div className="profile-card__badge">
                                      <img
                                          src="/images/logo/profile-badge.png"
                                          alt="MoneyBoy Social Profile Badge"
                                          />
                                    </div>
                                </div>
                                <div className="profile-card__username">
                                    @gustavostanton
                                </div>
                              </div>
                              <div className="profile-card__icon">
                                {/* 
                                <div className="profile-card__blur-icon">
                                    <button className="like-button" data-like-button>
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          height="21"
                                          viewBox="0 0 20 21"
                                          fill="none"
                                          >
                                          <path
                                            d="M10.5166 17.8417C10.2333 17.9417 9.76663 17.9417 9.48329 17.8417C7.06663 17.0167 1.66663 13.575 1.66663 7.74166C1.66663 5.16666 3.74163 3.08333 6.29996 3.08333C7.81663 3.08333 9.15829 3.81666 9.99996 4.95C10.8416 3.81666 12.1916 3.08333 13.7 3.08333C16.2583 3.08333 18.3333 5.16666 18.3333 7.74166C18.3333 13.575 12.9333 17.0167 10.5166 17.8417Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            />
                                      </svg>
                                    </button>
                                </div>
                                */}
                              </div>
                          </div>
                          <div className="profile-card__desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit
                              </p>
                          </div>
                        </div>
                    </div>
                  </div>
                  <div className="featured-profile__card">
                    <div className="featured-profile__info-wrapper">
                        <div className="profile-card featured-profile-card">
                          <div className="profile-card__bg-img">
                              <img
                                src="/images/profile-banners/profile-banner-3.jpg"
                                alt="Featured Profile Background Image"
                                />
                          </div>
                          <div className="profile-card__main">
                              <div className="profile-card__avatar-settings">
                                <div className="profile-card__avatar">
                                    <img
                                      src="/images/profile-avatars/profile-avatar-3.jpg"
                                      alt="MoneyBoy Social Profile Avatar"
                                      />
                                </div>
                              </div>
                              <div className="profile-card__info">
                                <div className="profile-card__name-badge">
                                    <div className="profile-card__name">
                                      Emerson Bator
                                    </div>
                                    <div className="profile-card__badge">
                                      <img
                                          src="/images/logo/profile-badge.png"
                                          alt="MoneyBoy Social Profile Badge"
                                          />
                                    </div>
                                </div>
                                <div className="profile-card__username">
                                    @emersonbator
                                </div>
                              </div>
                              <div className="profile-card__icon">
                                {/* 
                                <div className="profile-card__blur-icon">
                                    <button className="like-button" data-like-button>
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          height="21"
                                          viewBox="0 0 20 21"
                                          fill="none"
                                          >
                                          <path
                                            d="M10.5166 17.8417C10.2333 17.9417 9.76663 17.9417 9.48329 17.8417C7.06663 17.0167 1.66663 13.575 1.66663 7.74166C1.66663 5.16666 3.74163 3.08333 6.29996 3.08333C7.81663 3.08333 9.15829 3.81666 9.99996 4.95C10.8416 3.81666 12.1916 3.08333 13.7 3.08333C16.2583 3.08333 18.3333 5.16666 18.3333 7.74166C18.3333 13.575 12.9333 17.0167 10.5166 17.8417Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            />
                                      </svg>
                                    </button>
                                </div>
                                */}
                              </div>
                          </div>
                          <div className="profile-card__desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit
                              </p>
                          </div>
                        </div>
                    </div>
                  </div>
                  <div className="featured-profile__card">
                    <div className="featured-profile__info-wrapper">
                        <div className="profile-card featured-profile-card">
                          <div className="profile-card__bg-img">
                              <img
                                src="/images/profile-banners/profile-banner-2.jpg"
                                alt="Featured Profile Background Image"
                                />
                          </div>
                          <div className="profile-card__main">
                              <div className="profile-card__avatar-settings">
                                <div className="profile-card__avatar">
                                    <img
                                      src="/images/profile-avatars/profile-avatar-7.jpg"
                                      alt="MoneyBoy Social Profile Avatar"
                                      />
                                </div>
                              </div>
                              <div className="profile-card__info">
                                <div className="profile-card__name-badge">
                                    <div className="profile-card__name">
                                      Omar Dokidis
                                    </div>
                                    <div className="profile-card__badge">
                                      <img
                                          src="/images/logo/profile-badge.png"
                                          alt="MoneyBoy Social Profile Badge"
                                          />
                                    </div>
                                </div>
                                <div className="profile-card__username">
                                    @omardokidis
                                </div>
                              </div>
                              <div className="profile-card__icon">
                                {/* 
                                <div className="profile-card__blur-icon">
                                    <button className="like-button" data-like-button>
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          height="21"
                                          viewBox="0 0 20 21"
                                          fill="none"
                                          >
                                          <path
                                            d="M10.5166 17.8417C10.2333 17.9417 9.76663 17.9417 9.48329 17.8417C7.06663 17.0167 1.66663 13.575 1.66663 7.74166C1.66663 5.16666 3.74163 3.08333 6.29996 3.08333C7.81663 3.08333 9.15829 3.81666 9.99996 4.95C10.8416 3.81666 12.1916 3.08333 13.7 3.08333C16.2583 3.08333 18.3333 5.16666 18.3333 7.74166C18.3333 13.575 12.9333 17.0167 10.5166 17.8417Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            />
                                      </svg>
                                    </button>
                                </div>
                                */}
                              </div>
                          </div>
                          <div className="profile-card__desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit
                              </p>
                          </div>
                        </div>
                    </div>
                  </div>
                  <div className="featured-profile__card">
                    <div className="featured-profile__info-wrapper">
                        <div className="profile-card featured-profile-card">
                          <div className="profile-card__bg-img">
                              <img
                                src="/images/profile-banners/profile-banner-1.jpg"
                                alt="Featured Profile Background Image"
                                />
                          </div>
                          <div className="profile-card__main">
                              <div className="profile-card__avatar-settings">
                                <div className="profile-card__avatar">
                                    <img
                                      src="/images/profile-avatars/profile-avatar-2.jpg"
                                      alt="MoneyBoy Social Profile Avatar"
                                      />
                                </div>
                              </div>
                              <div className="profile-card__info">
                                <div className="profile-card__name-badge">
                                    <div className="profile-card__name">
                                      Wilson Septimus
                                    </div>
                                    <div className="profile-card__badge">
                                      <img
                                          src="/images/logo/profile-badge.png"
                                          alt="MoneyBoy Social Profile Badge"
                                          />
                                    </div>
                                </div>
                                <div className="profile-card__username">
                                    @wilsonseptimus
                                </div>
                              </div>
                              <div className="profile-card__icon">
                                {/* 
                                <div className="profile-card__blur-icon">
                                    <button className="like-button" data-like-button>
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          height="21"
                                          viewBox="0 0 20 21"
                                          fill="none"
                                          >
                                          <path
                                            d="M10.5166 17.8417C10.2333 17.9417 9.76663 17.9417 9.48329 17.8417C7.06663 17.0167 1.66663 13.575 1.66663 7.74166C1.66663 5.16666 3.74163 3.08333 6.29996 3.08333C7.81663 3.08333 9.15829 3.81666 9.99996 4.95C10.8416 3.81666 12.1916 3.08333 13.7 3.08333C16.2583 3.08333 18.3333 5.16666 18.3333 7.74166C18.3333 13.575 12.9333 17.0167 10.5166 17.8417Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            />
                                      </svg>
                                    </button>
                                </div>
                                */}
                              </div>
                          </div>
                          <div className="profile-card__desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit
                              </p>
                          </div>
                        </div>
                    </div>
                  </div>
                  <div className="featured-profile__card">
                    <div className="featured-profile__info-wrapper">
                        <div className="profile-card featured-profile-card">
                          <div className="profile-card__bg-img">
                              <img
                                src="/images/profile-banners/profile-banner-5.jpg"
                                alt="Featured Profile Background Image"
                                />
                          </div>
                          <div className="profile-card__main">
                              <div className="profile-card__avatar-settings">
                                <div className="profile-card__avatar">
                                    <img
                                      src="/images/profile-avatars/profile-avatar-8.jpg"
                                      alt="MoneyBoy Social Profile Avatar"
                                      />
                                </div>
                              </div>
                              <div className="profile-card__info">
                                <div className="profile-card__name-badge">
                                    <div className="profile-card__name">
                                      Ruben Kenter
                                    </div>
                                    <div className="profile-card__badge">
                                      <img src="/images/logo/profile-badge.png" alt="MoneyBoy Social Profile Badge" />
                                    </div>
                                </div>
                                <div className="profile-card__username">@rubenkenter</div>
                              </div>
                          </div>
                          <div className="profile-card__desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit
                              </p>
                          </div>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
            <div className="moneyboy-network-grow-card-wrapper card">
              <a href="#" className="moneyboy-network-grow-card card">
                  <div className="bg-img">
                    <img src="/images/grow-network-bg-image.png" alt="Grow Network By MoneyBoy Social" />
                  </div>
                  <div className="text-logo">
                    <h3>Network</h3>
                    <img src="/images/logo/moneyboy-logo.png" alt="MoneyBoy Social Logo"/>
                  </div>
              </a>
            </div>
        </div>
      </aside>
    </div>
  );
};

export default FeedPage;