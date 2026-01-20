"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { API_GET_FOLLOWING_POSTS, API_GET_POPULAR_POSTS, API_GET_POSTS, API_LIKE_POST, API_SAVE_POST, API_UNLIKE_POST, API_UNSAVE_POST,} from "@/utils/api/APIConstant";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";
import InfiniteScrollWrapper from "../common/InfiniteScrollWrapper";
import PostCard from "./PostCard";
import Featuredboys from "../Featuredboys";

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
  // const toggleExpand = (postId: string, tab: keyof typeof expandedPosts) => {setExpandedPosts((prev) => ({...prev, [tab]: { ...prev[tab], [postId]: !prev[tab][postId] },})); };

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
      <Featuredboys/>
    </div>
  );
};

export default FeedPage;