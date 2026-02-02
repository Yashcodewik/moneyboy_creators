"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  API_GET_POSTS,
  API_GET_FOLLOWING_POSTS,
  API_GET_POPULAR_POSTS,
  API_LIKE_POST,
  API_UNLIKE_POST,
  // API_SAVE_POST,
  API_UNSAVE_POST,
} from "@/utils/api/APIConstant";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";
import InfiniteScrollWrapper from "../common/InfiniteScrollWrapper";
import PostCard from "./PostCard";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import Featuredboys from "../Featuredboys";
import { CgClose } from "react-icons/cg";
import CustomSelect from "../CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { savePost, unsavePost } from "@/redux/other/savedPostsSlice";

/* ===================================================== */

type TabType = "feed" | "following" | "popular";
const LIMIT = 4;

/* ===================================================== */

const FeedPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
   const dispatch = useDispatch<AppDispatch>(); 
  const savedPostsState = useSelector((state: any) => state.savedPosts.savedPosts);
  const saveLoadingState = useSelector((state: any) => state.savedPosts.loading);

  /* ================= TAB ================= */
  const [activeTab, setActiveTab] = useState<TabType>("feed");

  /* ================= ACTION STATES ================= */
  const [likeLoading, setLikeLoading] = useState<Record<string, boolean>>({});
  const [saveLoading, setSaveLoading] = useState<Record<string, boolean>>({});

  /* ================= FEED ================= */
const queryClient = useQueryClient();
  const {
    data: feedData,
    fetchNextPage: fetchNextFeedPage,
    hasNextPage: hasNextFeedPage,
  } = useInfiniteQuery({
    queryKey: ["feedPosts", (session?.user as any)?.id ?? null],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await apiPost({
        url: API_GET_POSTS,
        values: {
          userId: (session?.user as any)?.id || "",
          page: pageParam,
          limit: LIMIT,
        },
      });

      return {
        posts: Array.isArray(res) ? res : [],
        nextPage:
          Array.isArray(res) && res.length === LIMIT
            ? pageParam + 1
            : undefined,
      };
    },
    initialPageParam: 1,
    // enabled: activeTab === "feed" && isLoggedIn,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const feedPosts =
    feedData?.pages.flatMap((page) => page.posts) || [];

  /* ================= FOLLOWING ================= */

  const {
    data: followingData,
    fetchNextPage: fetchNextFollowingPage,
    hasNextPage: hasNextFollowingPage,
  } = useInfiniteQuery({
    queryKey: ["followingPosts"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getApiWithOutQuery({
        url: `${API_GET_FOLLOWING_POSTS}?page=${pageParam}&limit=${LIMIT}`,
      });

      const posts = Array.isArray(res?.posts)
        ? res.posts.map((p: any) => ({
            ...p,
            media: Array.isArray(p.media)
              ? p.media
              : p.media
              ? [p.media]
              : [],
          }))
        : [];

      return {
        posts,
        nextPage: res?.pagination?.hasNextPage
          ? pageParam + 1
          : undefined,
      };
    },
    initialPageParam: 1,
    enabled: activeTab === "following" && isLoggedIn,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const followingPosts =
    followingData?.pages.flatMap((page) => page.posts) || [];

  /* ================= POPULAR ================= */

  const {
    data: popularData,
    fetchNextPage: fetchNextPopularPage,
    hasNextPage: hasNextPopularPage,
  } = useInfiniteQuery({
    queryKey: ["popularPosts"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await apiPost({
        url: API_GET_POPULAR_POSTS,
        values: {
          userId: (session?.user as any)?.id || "",
          page: pageParam,
          limit: LIMIT,
        },
      });

      return {
        posts: Array.isArray(res) ? res : [],
        nextPage:
          Array.isArray(res) && res.length === LIMIT
            ? pageParam + 1
            : undefined,
      };
    },
    initialPageParam: 1,
    enabled: activeTab === "popular",
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const popularPosts =
    popularData?.pages.flatMap((page) => page.posts) || [];

  /* ================= HELPERS ================= */

  const resolveList = () => {
    if (activeTab === "following") return followingPosts;
    if (activeTab === "popular") return popularPosts;
    return feedPosts;
  };

  const updatePost = (
    list: any[],
    postId: string,
    updater: (post: any) => any,
  ) => list.map((p) => (p._id === postId ? updater(p) : p));

  /* ================= LIKE ================= */

const handleLike = async (postId: string) => {
  if (!isLoggedIn) return router.push("/login");
  if (likeLoading[postId]) return;

  setLikeLoading((p) => ({ ...p, [postId]: true }));

  // Optimistic update: update React Query cache immediately
  const queryKey =
    activeTab === "feed"
      ? ["feedPosts", (session?.user as any)?.id ?? null]
      : activeTab === "following"
      ? ["followingPosts"]
      : ["popularPosts"];

  const oldData = queryClient.getQueryData<any>(queryKey);

  queryClient.setQueryData(queryKey, (data: any) => {
    if (!data) return data;

    const updatedPages = data.pages.map((page: any) => ({
      ...page,
      posts: page.posts.map((p: any) =>
        p._id === postId
          ? {
              ...p,
              isLiked: !p.isLiked,
              likeCount: p.isLiked ? p.likeCount - 1 : p.likeCount + 1,
            }
          : p
      ),
    }));

    return { ...data, pages: updatedPages };
  });

  // Call API in background
  const post = oldData?.pages
    .flatMap((page: any) => page.posts)
    .find((p: any) => p._id === postId);

  const res = await apiPost({
    url: post?.isLiked ? API_UNLIKE_POST : API_LIKE_POST,
    values: { postId },
  });

  if (!res?.success) {
    // Rollback if API failed
    queryClient.setQueryData(queryKey, oldData);
  }

  setLikeLoading((p) => ({ ...p, [postId]: false }));
};


  /* ================= SAVE ================= */
// In FeedPage.tsx - Update handleSave function
const handleSave = async (postId: string) => {
  if (!isLoggedIn) return router.push("/login");
  if (saveLoading[postId]) return;

  setSaveLoading((p) => ({ ...p, [postId]: true }));

  // 🔥 source of truth: Redux - check if post is currently saved
  const isCurrentlySaved = !!savedPostsState[postId]?.saved;

  // Decide query key
  const queryKey =
    activeTab === "feed"
      ? ["feedPosts", (session?.user as any)?.id ?? null]
      : activeTab === "following"
      ? ["followingPosts"]
      : ["popularPosts"];

  // Optimistic update
  queryClient.setQueryData(queryKey, (data: any) => {
    if (!data) return data;

    return {
      ...data,
      pages: data.pages.map((page: any) => ({
        ...page,
        posts: page.posts.map((p: any) =>
          p._id === postId ? { ...p, isSaved: !isCurrentlySaved } : p
        ),
      })),
    };
  });

  // API call
  try {
    if (isCurrentlySaved) {
      await dispatch(unsavePost({ postId })).unwrap();
    } else {
      await dispatch(savePost({ postId })).unwrap();
    }
  } catch (error) {
    // Rollback on error
    queryClient.setQueryData(queryKey, (data: any) => {
      if (!data) return data;
      return {
        ...data,
        pages: data.pages.map((page: any) => ({
          ...page,
          posts: page.posts.map((p: any) =>
            p._id === postId ? { ...p, isSaved: isCurrentlySaved } : p
          ),
        })),
      };
    });
    console.error("Save/Unsave failed:", error);
  } finally {
    setSaveLoading((p) => ({ ...p, [postId]: false }));
  }
};


  /* ================= SCROLL ================= */

  const fetchMoreHandler = () => {
    if (activeTab === "feed") fetchNextFeedPage();
    if (activeTab === "following") fetchNextFollowingPage();
    if (activeTab === "popular") fetchNextPopularPage();
  };

  const activeList =
    activeTab === "feed"
      ? feedPosts
      : activeTab === "following"
      ? followingPosts
      : popularPosts;

  const activeHasMore =
    activeTab === "feed"
      ? hasNextFeedPage
      : activeTab === "following"
      ? hasNextFollowingPage
      : hasNextPopularPage;
  /* ================= TAB SWITCH ================= */

  const handleTabClick = (tab: TabType) => {
    if (!isLoggedIn && tab === "following") {
      router.push("/discover");
      return;
    }
    setActiveTab(tab);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);


  const incrementCommentCount = (postId: string) => {
  const queryKey =
    activeTab === "feed"
      ? ["feedPosts", (session?.user as any)?.id ?? null]
      : activeTab === "following"
      ? ["followingPosts"]
      : ["popularPosts"];

  queryClient.setQueryData(queryKey, (data: any) => {
    if (!data) return data;

    return {
      ...data,
      pages: data.pages.map((page: any) => ({
        ...page,
        posts: page.posts.map((p: any) =>
          p._id === postId
            ? { ...p, commentCount: (p.commentCount || 0) + 1 }
            : p
        ),
      })),
    };
  });
};

  /* ================= RENDER ================= */

  return (
    <>
      <div className="moneyboy-2x-1x-layout-container">
        <div className="moneyboy-2x-1x-a-layout">
          <div className="moneyboy-feed-page-container">
            {/* TABS */}
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
            <div id="feed-scroll-container" className="moneyboy-posts-scroll-container">
              <InfiniteScrollWrapper className="moneyboy-posts-wrapper" scrollableTarget="feed-scroll-container" dataLength={activeList.length} fetchMore={fetchMoreHandler} hasMore={activeHasMore ?? false}>
                {activeList.map((post) => (
                  <PostCard key={post._id} post={post} onLike={handleLike} onSave={handleSave} onCommentAdded={incrementCommentCount}/>
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
        <aside className="moneyboy-2x-1x-b-layout scrolling">
          <Featuredboys />
        </aside>
      </div>

      {/* ================= MODALS ================= */}
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-modal-title"
      >
        <div className="modal-wrap tip-modal">
          <button className="close-btn">
            <CgClose size={22} />
          </button>
          <div className="profile-card">
            <div className="profile-card__main justify-center">
              <div className="profile-card__avatar-settings">
                <div className="profile-card__avatar">
                  <img
                    src="/images/profile-avatars/profile-avatar-1.png"
                    alt="MoneyBoy Social Profile Avatar"
                  />
                </div>
              </div>
              <div className="profile-card__info">
                <div className="profile-card__name-badge">
                  <div className="profile-card__name"> Addisonraee </div>
                  <div className="profile-card__badge">
                    <img
                      src="/images/logo/profile-badge.png"
                      alt="MoneyBoy Social Profile Badge"
                    />
                  </div>
                </div>
                <div className="profile-card__username">@rae</div>
              </div>
            </div>
          </div>
          <h3 className="title">Thanks for the Tip</h3>
          <div className="text-center">
            <label className="orange">Enter The Amount</label>
            <input
              className="form-input number-input"
              type="number"
              placeholder="Question"
              name="firstName"
            />
          </div>
          <div className="actions">
            <button className="premium-btn active-down-effect">
              <span>Sent Tip</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-modal-title"
      >
        <div className="modal-wrap subscription-modal">
          <button className="close-btn">
            <CgClose size={22} />
          </button>
          <div className="profile-card">
            <div className="profile-card__main justify-center">
              <div className="profile-card__avatar-settings">
                <div className="profile-card__avatar">
                  <img
                    src="/images/profile-avatars/profile-avatar-1.png"
                    alt="MoneyBoy Social Profile Avatar"
                  />
                </div>
              </div>
              <div className="profile-card__info">
                <div className="profile-card__name-badge">
                  <div className="profile-card__name">Corey Bergson</div>
                  <div className="profile-card__badge">
                    <img
                      src="/images/logo/profile-badge.png"
                      alt="MoneyBoy Social Profile Badge"
                    />
                  </div>
                </div>
                <div className="profile-card__username">@coreybergson</div>
              </div>
            </div>
          </div>
          <h3 className="title">
            Monthly Subscription <span className="gradinttext">$9.99</span>{" "}
            <sub>
              /month <span>(Save 25%)</span>
            </sub>
          </h3>
          <ul className="points">
            <li>Full access to this creator’s exclusive content</li>
            <li>Direct message with this creator</li>
            <li>Requested personalised Pay Per view contaent </li>
            <li>Cancel your subscription at any time</li>
          </ul>
          <div className="actions">
            <CustomSelect
              label="Select  a payment card"
              searchable={false}
              options={[
                { label: "Visa Credit Card", value: "visa" },
                { label: "Mastercard Credit Card", value: "mastercard" },
                { label: "RuPay Debit Card", value: "rupay" },
                { label: "American Express", value: "amex" },
                { label: "Discover Card", value: "discover" },
              ]}
            />
            <button className="premium-btn active-down-effect">
              <span>Subscribe</span>
            </button>
          </div>
          <p className="note">
            Clicking “Subscribe” will take you to the payment screen to finalize
            you subscription
          </p>
        </div>
      </div>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-modal-title"
      >
        <div className="modal-wrap tip-modal unlockmodal">
          <button className="close-btn">
            <CgClose size={22} />
          </button>
          <div className="profile-card">
            <div className="profile-card__main justify-center">
              <div className="profile-card__avatar-settings">
                <div className="profile-card__avatar">
                  <img
                    src="/images/profile-avatars/profile-avatar-1.png"
                    alt="MoneyBoy Social Profile Avatar"
                  />
                </div>
              </div>
              <div className="profile-card__info">
                <div className="profile-card__name-badge">
                  <div className="profile-card__name"> Romanatwood</div>
                  <div className="profile-card__badge">
                    <img
                      src="/images/logo/profile-badge.png"
                      alt="MoneyBoy Social Profile Badge"
                    />
                  </div>
                </div>
                <div className="profile-card__username">@atwood</div>
              </div>
            </div>
          </div>
          <h3 className="title">Unlock Content</h3>
          <h4>
            <span className="textorange">4.99</span> USD
          </h4>
          <p>
            My man hates spiders!!{" "}
            <img src="/images/icons/spider_icons.svg" className="icons" />{" "}
            <img src="/images/icons/smiling-faceicons.svg" className="icons" />
          </p>
          <div className="actions">
            <button className="premium-btn active-down-effect">
              <span>Confirm to unlock</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-modal-title"
      >
        <div className="modal-wrap promote-modal">
          <button className="close-btn">
            <CgClose size={22} />
          </button>
          <h3 className="title">Promote Your Profile</h3>
          <p>
            Increase your visibility on MoneyBoy! Promote your profile to appear
            in the Featured MoneyBoys section and attract more fans.
          </p>
          <div className="note">
            <p>
              Choose your promotion plan and pay easily with your Wallet or
              credit card.”
            </p>
          </div>
          <div className="select_wrap grid2">
            <label className="radio_wrap box_select">
              <input type="radio" name="access" />
              <h3>3 Days</h3>
              <p>$9.99 /day</p>
            </label>
            <label className="radio_wrap box_select">
              <input type="radio" name="access" />
              <h3>7 Days</h3>
              <p>$7.99 /day</p>
            </label>
            <label className="radio_wrap box_select">
              <input type="radio" name="access" />
              <h3>14 Days</h3>
              <p>$5.99 /day</p>
            </label>
            <label className="radio_wrap box_select">
              <input type="radio" name="access" />
              <h3>30 Days</h3>
              <p>$3.99 /day</p>
            </label>
          </div>
          <div className="total_wrap">
            <div>
              <h3>Total Price</h3>
              <p>7 Days at $7.99 /day</p>
            </div>
            <div>
              <h2>$55.99</h2>
            </div>
          </div>
          <h4>Payment Method</h4>
          <div className="select_wrap">
            <label className="radio_wrap">
              <input type="radio" name="access" />{" "}
              <img src="/images/icons/wallet_icons.svg" className="icons" />{" "}
              <p>Pay with wallet</p>
            </label>
            <label className="radio_wrap">
              <input type="radio" name="access" />{" "}
              <img src="/images/icons/card_icons.svg" className="icons" />{" "}
              <p>Pay with credit/debit card</p>
            </label>
          </div>
          <div className="actions">
            <button className="premium-btn active-down-effect">
              <span>Confirm & Promote</span>
            </button>
            <button className="active-down-effect">
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-modal-title"
      >
        <div className="modal-wrap request-modal">
          <button className="close-btn">
            <CgClose size={22} />
          </button>
          <h3 className="title">PPV - Request Custom Content</h3>
          <div className="profile-card">
            <div className="profile-card__main justify-center">
              <div className="profile-card__avatar-settings">
                <div className="profile-card__avatar">
                  <img
                    src="/images/profile-avatars/profile-avatar-1.png"
                    alt="MoneyBoy Social Profile Avatar"
                  />
                </div>
              </div>
              <div className="profile-card__info">
                <div className="profile-card__name-badge">
                  <div className="profile-card__name">Gogo</div>
                  <div className="profile-card__badge">
                    <img
                      src="/images/logo/profile-badge.png"
                      alt="MoneyBoy Social Profile Badge"
                    />
                  </div>
                </div>
                <div className="profile-card__username">@gogo</div>
              </div>
            </div>
          </div>
          <p className="small">
            Request a personalized video or photo directly from this MoneyBoy.
          </p>
          <div>
            <label>Request type</label>
            <CustomSelect
              searchable={false}
              label="Custom video"
              options={[
                { label: "Select One", value: "select1" },
                { label: "Select Two", value: "select1" },
                { label: "Select Three", value: "select1" },
              ]}
            />
          </div>
          <div>
            <label>Request type</label>
            <textarea
              rows={3}
              placeholder="Describe what you’d like (tone, outfit, duration, etc.)"
            />
          </div>
          <div>
            <label>Upload reference file</label>
            <div className="upload-wrapper">
              <div className="img_wrap">
                <svg className="icons idshape size-45"></svg>
                {/* <div className="imgicons"><TbCamera size="16" /></div> */}
              </div>
            </div>
          </div>
          <div>
            <label>Offer your price</label>
            <input className="form-input" type="number" placeholder="10.99" />
          </div>
          <div className="">
            <p className="boldblack">Minimum request price: 20€</p>
            <p>Final price will be confirmed by the creator before payment.</p>
          </div>
          <div className="actions">
            <button className="premium-btn active-down-effect">
              <span>Send Request</span>
            </button>
            <button className="active-down-effect">
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedPage;