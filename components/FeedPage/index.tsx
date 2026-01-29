"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  API_GET_POSTS,
  API_GET_FOLLOWING_POSTS,
  API_GET_POPULAR_POSTS,
  API_LIKE_POST,
  API_UNLIKE_POST,
  API_SAVE_POST,
  API_UNSAVE_POST,
} from "@/utils/api/APIConstant";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";
import InfiniteScrollWrapper from "../common/InfiniteScrollWrapper";
import PostCard from "./PostCard";
import Featuredboys from "../Featuredboys";
import CustomSelect from "../CustomSelect";
import { CgClose } from "react-icons/cg";

/* ===================================================== */

type TabType = "feed" | "following" | "popular";
const LIMIT = 4;

/* ===================================================== */

const FeedPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const firstFetchRef = useRef(false);

  /* ================= TAB ================= */
  const [activeTab, setActiveTab] = useState<TabType>("feed");

  /* ================= FEED ================= */
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  /* ================= FOLLOWING ================= */
  const [followingPosts, setFollowingPosts] = useState<any[]>([]);
  const [followingPage, setFollowingPage] = useState(1);
  const [followingHasMore, setFollowingHasMore] = useState(true);
  const [followingLoadingMore, setFollowingLoadingMore] = useState(false);

  /* ================= POPULAR ================= */
  const [popularPosts, setPopularPosts] = useState<any[]>([]);
  const [popularPage, setPopularPage] = useState(1);
  const [popularHasMore, setPopularHasMore] = useState(true);
  const [popularLoadingMore, setPopularLoadingMore] = useState(false);

  /* ================= ACTION STATES ================= */
  const [likeLoading, setLikeLoading] = useState<Record<string, boolean>>({});
  const [saveLoading, setSaveLoading] = useState<Record<string, boolean>>({});

  /* ================= HELPERS ================= */

  const resolveList = () => {
    if (activeTab === "following") {
      return { list: followingPosts, setList: setFollowingPosts };
    }
    if (activeTab === "popular") {
      return { list: popularPosts, setList: setPopularPosts };
    }
    return { list: posts, setList: setPosts };
  };

  const updatePost = (
    list: any[],
    postId: string,
    updater: (post: any) => any,
  ) => list.map((p) => (p._id === postId ? updater(p) : p));

  /* ================= FETCH FEED ================= */

  const fetchPosts = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    const res = await apiPost({
      url: API_GET_POSTS,
      values: {
        userId: (session?.user as any)?.id || "",
        page,
        limit: LIMIT,
      },
    });

    console.log("--------------", session);
    if (Array.isArray(res) && res.length) {
      setPosts((prev) => {
        const ids = new Set(prev.map((p) => p._id));
        return [...prev, ...res.filter((p) => !ids.has(p._id))];
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

  /* ================= FETCH FOLLOWING ================= */

  const fetchFollowingPosts = async () => {
    if (followingLoadingMore || !followingHasMore) return;

    setFollowingLoadingMore(true);

    const res = await getApiWithOutQuery({
      url: `${API_GET_FOLLOWING_POSTS}?page=${followingPage}&limit=${LIMIT}`,
    });

    if (res?.success && Array.isArray(res.posts)) {
      setFollowingPosts((prev) => {
        const ids = new Set(prev.map((p) => p._id));
        return [
          ...prev,
          ...res.posts
            .map((p: any) => ({
              ...p,
              media: Array.isArray(p.media)
                ? p.media
                : p.media
                  ? [p.media]
                  : [],
            }))
            .filter((p: any) => !ids.has(p._id)),
        ];
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

  /* ================= FETCH POPULAR ================= */

  const fetchPopularPosts = async () => {
    if (popularLoadingMore || !popularHasMore) return;

    setPopularLoadingMore(true);

    const res = await apiPost({
      url: API_GET_POPULAR_POSTS,
      values: {
        userId: (session?.user as any)?.id || "",
        page: popularPage,
        limit: LIMIT,
      },
    });

    if (Array.isArray(res) && res.length) {
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

  /* ================= LIKE / SAVE ================= */

  const handleLike = async (postId: string) => {
    if (!isLoggedIn) {
      router.push("/login"); // or "/auth/login"
      return;
    }
    if (likeLoading[postId]) return;

    const { list, setList } = resolveList();
    const post = list.find((p) => p._id === postId);
    if (!post) return;

    setLikeLoading((p) => ({ ...p, [postId]: true }));

    setList((prev) =>
      updatePost(prev, postId, (p) => ({
        ...p,
        isLiked: !p.isLiked,
        likeCount: p.isLiked ? p.likeCount - 1 : p.likeCount + 1,
      })),
    );

    const res = await apiPost({
      url: post.isLiked ? API_UNLIKE_POST : API_LIKE_POST,
      values: { postId },
    });

    if (!res?.success) {
      setList((prev) => updatePost(prev, postId, () => post));
    }

    setLikeLoading((p) => ({ ...p, [postId]: false }));
  };
  const handleSave = async (postId: string) => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (saveLoading[postId]) return;

    setSaveLoading((p) => ({ ...p, [postId]: true }));

    const { list, setList } = resolveList();

    const toggleSave = (p: any) => {
      if (p._id === postId) {
        return { ...p, isSaved: !p.isSaved }; // toggle based on current state
      }
      return p;
    };

    // Update all lists safely
    setPosts((prev) => prev.map(toggleSave));
    setFollowingPosts((prev) => prev.map(toggleSave));
    setPopularPosts((prev) => prev.map(toggleSave));

    const res = await apiPost({
      url: list.find((p) => p._id === postId)?.isSaved
        ? API_UNSAVE_POST
        : API_SAVE_POST,
      values: { postId },
    });

    if (!res?.success) {
      // rollback on error
      setPosts((prev) => prev.map(toggleSave));
      setFollowingPosts((prev) => prev.map(toggleSave));
      setPopularPosts((prev) => prev.map(toggleSave));
    }

    setSaveLoading((p) => ({ ...p, [postId]: false }));
  };

  /* ================= TAB SWITCH ================= */

  const handleTabClick = (tab: TabType) => {
    if (!isLoggedIn && tab === "following") {
      router.push("/discover");
      return;
    }
    setActiveTab(tab);
  };

  useEffect(() => {
    const container = document.getElementById("feed-scroll-container");
    if (container) {
      container.scrollTop = 0; // reset scroll for tab change
    } else {
      window.scrollTo(0, 0);
    }
  }, [activeTab]); // <-- run when tab changes

  /* ================= RENDER ================= */

  return (
    <>
      <div className="moneyboy-2x-1x-layout-container">
        <div className="moneyboy-2x-1x-a-layout">
          <div className="moneyboy-feed-page-container">
            {/* TABS */}
            <div className="moneyboy-feed-page-cate-buttons card">
              <button className={`page-content-type-button ${activeTab === "feed" ? "active" : ""}`} onClick={() => handleTabClick("feed")}>Feed</button>
              <button className={`page-content-type-button ${activeTab === "following" ? "active" : ""}`} onClick={() => handleTabClick("following")}>{isLoggedIn ? "Following" : "Discover"}</button>
              <button className={`page-content-type-button ${activeTab === "popular" ? "active" : ""}`} onClick={() => handleTabClick("popular")}>Popular</button>
            </div>
            <InfiniteScrollWrapper dataLength={activeTab === "feed" ? posts.length : activeTab === "following" ? followingPosts.length : popularPosts.length}
              fetchMore={() => {if (activeTab === "feed") fetchPosts(); if (activeTab === "following") fetchFollowingPosts(); if (activeTab === "popular") fetchPopularPosts();}}
              hasMore={activeTab === "feed" ? hasMore : activeTab === "following" ? followingHasMore : popularHasMore } scrollableTarget="moneyboy-scroll-container">
              <div className="moneyboy-posts-wrapper" id="moneyboy-scroll-container">
                {(activeTab === "feed" ? posts :
                  activeTab === "following" ? followingPosts : popularPosts
                ).map((post) => (
                  <PostCard key={post._id} post={post} onLike={handleLike} onSave={handleSave}/>
                ))}
              </div>
            </InfiniteScrollWrapper>
          </div>
        </div>
        <Featuredboys />
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
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="age-modal-title">
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
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="age-modal-title">
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
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="age-modal-title">
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
