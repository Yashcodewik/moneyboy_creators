"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { API_LIKE_POST, API_UNLIKE_POST } from "@/utils/api/APIConstant";
import { apiPost } from "@/utils/endpoints/common";
import InfiniteScrollWrapper from "../common/InfiniteScrollWrapper";
import PostCard from "./PostCard";
import Featuredboys from "../Featuredboys";
import { CgClose } from "react-icons/cg";
import CustomSelect from "../CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { savePost, unsavePost } from "@/redux/other/savedPostsSlice";
import {
  fetchFeedPosts,
  fetchFollowingPosts,
  fetchPopularPosts,
  incrementFeedPostCommentCount,
  updateFeedPost,
} from "@/redux/other/feedPostsSlice";
import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import {
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showQuestion,
} from "@/utils/alert";
import {
  ChevronLeft,
  ChevronRight,
  CircleChevronDown,
  CircleChevronUp,
  RotateCw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import BtnGroupTabs from "../BtnGroupTabs";
import { useDeviceType } from "@/hooks/useDeviceType";

type TabType = "feed" | "following" | "popular";
const LIMIT = 4;

const FeedPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const dispatch = useDispatch<AppDispatch>();

  const [activeTab, setActiveTab] = useState<TabType>("feed");
  const [likeLoading, setLikeLoading] = useState<Record<string, boolean>>({});
  const [saveLoading, setSaveLoading] = useState<Record<string, boolean>>({});

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
  /* ================= INITIAL LOAD / TAB CHANGE ================= */
  const userId = (session?.user as any)?.id;
  const isMobile = useDeviceType();
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  console.log(allPosts ,"allPosts==============================");

  useEffect(() => {
    const container = document.getElementById("feed-scroll-container");
    if (!container) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const nearBottom = scrollTop + clientHeight >= scrollHeight - 150;
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowSidebarMobile(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  useEffect(() => {
    if (activeTab === "feed" && feedPosts.length === 0) {
      dispatch(fetchFeedPosts({ userId, page: 1, limit: LIMIT }));
    }
    if (
      activeTab === "following" &&
      followingPosts.length === 0 &&
      isLoggedIn
    ) {
      dispatch(fetchFollowingPosts({ page: 1, limit: LIMIT }));
    }
    if (activeTab === "popular" && popularPosts.length === 0) {
      dispatch(fetchPopularPosts({ userId, page: 1, limit: LIMIT }));
    }
  }, [
    activeTab,
    isLoggedIn,
    userId,
    feedPosts.length,
    followingPosts.length,
    popularPosts.length,
  ]);

  /* ================= INFINITE SCROLL ================= */
  const fetchMoreHandler = () => {
    if (loading || !activeHasMore) return;
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

  return (
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
              onClick={() => index > 0 && onIndexChange(index - 1)}
            >
              <ChevronLeft size={20} />
            </button>
            <span>
              {index + 1} / {images.length}
            </span>
            <button
              className="btn_icons"
              onClick={() =>
                index < images.length - 1 && onIndexChange(index + 1)
              }
            >
              <ChevronRight size={20} />
            </button>
            <button className="btn_icons" onClick={() => onScale(scale + 0.2)}>
              <ZoomIn size={20} />
            </button>
            <button
              className="btn_icons"
              onClick={() => onScale(Math.max(0.5, scale - 0.2))}
            >
              <ZoomOut size={20} />
            </button>
            <button className="btn_icons" onClick={() => onRotate(rotate + 90)}>
              <RotateCw size={20} />
            </button>
            <button className="btn_icons" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        );
      }}
    >
      <>
        <div className="moneyboy-2x-1x-layout-container">
          <div className="moneyboy-2x-1x-a-layout">
            <div className="moneyboy-feed-page-container">
              <BtnGroupTabs
                activeTab={activeTab}
                onChange={(value) => {
                  if (!isLoggedIn && value === "following") {
                    router.push("/discover");
                    return;
                  }
                  setActiveTab(value as TabType);
                }}
                tabs={[
                  { key: "feed", label: "Feed" },
                  {
                    key: "following",
                    label: isLoggedIn ? "Following" : "Discover",
                  },
                  { key: "popular", label: "Popular" },
                ]}
              />
              {!(isMobile && showSidebarMobile) && (
                <div
                  id="feed-scroll-container"
                  className="moneyboy-posts-scroll-container"
                >
                  <InfiniteScrollWrapper
                    className="moneyboy-posts-wrapper"
                    scrollableTarget="feed-scroll-container"
                    dataLength={activeList?.length}
                    fetchMore={fetchMoreHandler}
                    hasMore={activeHasMore}
                  >
                    {loading && activeList.length === 0
                      ? Array.from({ length: 4 }).map((_, i) => (
                          <div
                            key={i}
                            className="moneyboy-post__container card skloading"
                          >
                            <div className="post_header">
                              <div className="post_header-left">
                                <div className="post_avatar"></div>
                                <div className="post_text">
                                  <div className="line medium"></div>
                                  <div className="line short"></div>
                                </div>
                              </div>
                              <div className="post__time"></div>
                            </div>
                            <div>
                              <div className="line long"></div>
                              <div className="line medium"></div>
                              <div className="line short"></div>
                            </div>
                            <div className="moneyboy-post__media">
                              <div className="moneyboy-post__img"></div>
                              <div className="moneyboy-post__actions">
                                <ul>
                                  <li></li>
                                  <li></li>
                                  <li></li>
                                </ul>
                                <ul>
                                  <li></li>
                                  <li></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))
                      : activeList?.map((post: any) => (
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
              )}
            </div>
          </div>
          {(!isMobile || showSidebarMobile) && (
            <aside
              className={`moneyboy-2x-1x-b-layout scrolling ${isMobile ? "mobile-sidebar" : ""}`}
              ref={sidebarRef}
            >
              <Featuredboys />
            </aside>
          )}
        </div>

        {isMobile && (
          <div className="updownarrow active-down-effect">
            <button
              type="button"
              className="premium-btn"
              onClick={() => setShowSidebarMobile((prev) => !prev)}
            >
              {showSidebarMobile ? (
                <CircleChevronUp size={24} color="#fece26" />
              ) : (
                <CircleChevronDown size={24} color="#fece26" />
              )}
            </button>
          </div>
        )}
      </>
    </PhotoProvider>
  );
};

export default FeedPage;
