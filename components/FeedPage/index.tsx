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
import { fetchFeedPosts, fetchFollowingPosts, fetchPopularPosts, incrementFeedPostCommentCount, updateFeedPost } from "@/redux/other/feedPostsSlice";

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

useEffect(() => {
  if (activeTab === "feed" && feedPosts.length === 0) {
    dispatch(fetchFeedPosts({
      userId: (session?.user as any)?.id,
      page: 1,
      limit: LIMIT,
    }));
  }

  if (activeTab === "following" && followingPosts.length === 0 && isLoggedIn) {
    dispatch(fetchFollowingPosts({
      page: 1,
      limit: LIMIT,
    }));
  }

  if (activeTab === "popular" && popularPosts.length === 0) {
    dispatch(fetchPopularPosts({
      userId: (session?.user as any)?.id,
      page: 1,
      limit: LIMIT,
    }));
  }
}, [activeTab]);


  /* ================= INFINITE SCROLL ================= */

const fetchMoreHandler = () => {
  if (loading) return;

  if (activeTab === "feed" && hasMoreFeed) {
    dispatch(fetchFeedPosts({
      userId: (session?.user as any)?.id,
      page: feedPage + 1,
      limit: LIMIT,
    }));
  }

  if (activeTab === "following" && hasMoreFollowing) {
    dispatch(fetchFollowingPosts({
      page: followingPage + 1,
      limit: LIMIT,
    }));
  }

  if (activeTab === "popular" && hasMorePopular) {
    dispatch(fetchPopularPosts({
      userId: (session?.user as any)?.id,
      page: popularPage + 1,
      limit: LIMIT,
    }));
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
          likeCount: post.isLiked
            ? post.likeCount - 1
            : post.likeCount + 1,
        },
      })
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
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-modal-title"
      >
        <div className="modal-wrap report-modal">
          <button className="close-btn">
            <CgClose size={22} />
          </button>
          <h3 className="title">Report Pop-Up</h3>
          <div className="img_wrap">
            <img
              src="/images/profile-avatars/profile-avatar-1.png"
              alt="MoneyBoy Social Profile Avatar"
            />
          </div>
          <div>
            <label>
              Tital <span>*</span>
            </label>
            <CustomSelect
              searchable={false}
              label="Violent Or Repulsive Content"
              options={[
                {
                  label: "Violent or repulsive content",
                  value: "violent_or_repulsive",
                },
                {
                  label: "Hateful or abusive content",
                  value: "hateful_or_abusive",
                },
                {
                  label: "Harassment or bullying",
                  value: "harassment_or_bullying",
                },
                {
                  label: "Harmful or dangerous acts",
                  value: "harmful_or_dangerous",
                },
                { label: "Child abuse", value: "child_abuse" },
                { label: "Promotes terrorism", value: "promotes_terrorism" },
                { label: "Spam or misleading", value: "spam_or_misleading" },
                { label: "Infringes my rights", value: "infringes_my_rights" },
                { label: "Others", value: "others" },
              ]}
            />
          </div>
          <div className="input-wrap">
            <label>Description</label>
            <textarea rows={3} placeholder="Tell Us Whay You Report?" />
            <label className="right">0/300</label>
          </div>
          <div className="actions">
            <button className="premium-btn active-down-effect">
              <span>Submit</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedPage;
