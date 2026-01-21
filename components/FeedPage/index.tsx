"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { API_GET_FOLLOWING_POSTS, API_GET_POPULAR_POSTS, API_GET_POSTS, API_LIKE_POST, API_SAVE_POST, API_UNLIKE_POST, API_UNSAVE_POST,} from "@/utils/api/APIConstant";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";
import InfiniteScrollWrapper from "../common/InfiniteScrollWrapper";
import PostCard from "./PostCard";
import Featuredboys from "../Featuredboys";
import { CgClose } from "react-icons/cg";
import Link from "next/link";
import CustomSelect from "../CustomSelect";
import { TbCamera } from "react-icons/tb";

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
    // Normalize media field
    const normalizedPosts = res.posts.map((p: any) => ({
      ...p,
      media: Array.isArray(p.media) ? p.media : p.media ? [p.media] : [],
    }));

    setFollowingPosts((prev) => {
      const ids = new Set(prev.map((p: any) => p._id));
      return [...prev, ...normalizedPosts.filter((p: any) => !ids.has(p._id))];
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
    <>
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
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="age-modal-title">
      <div className="modal-wrap tip-modal">
        <button className="close-btn"><CgClose size={22}/></button>
        <div className="profile-card">
          <div className="profile-card__main justify-center">
            <div className="profile-card__avatar-settings">
              <div className="profile-card__avatar">
                <img src="/images/profile-avatars/profile-avatar-1.png" alt="MoneyBoy Social Profile Avatar" />
              </div>
            </div>
            <div className="profile-card__info">
              <div className="profile-card__name-badge">
                <div className="profile-card__name"> Addisonraee </div>
                <div className="profile-card__badge">
                  <img src="/images/logo/profile-badge.png" alt="MoneyBoy Social Profile Badge" />
                </div>
              </div>
              <div className="profile-card__username">@rae</div>
            </div>
          </div>
        </div>
        <h3 className="title">Thanks for the Tip</h3>
        <div className="text-center">
          <label className="orange">Enter The Amount</label>
          <input className="form-input number-input" type="number" placeholder="Question" name="firstName"/>
        </div>
        <div className="actions">
          <button className="premium-btn active-down-effect"><span>Sent Tip</span></button>
        </div>
      </div>
    </div>
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="age-modal-title">
      <div className="modal-wrap subscription-modal">
        <button className="close-btn"><CgClose size={22}/></button>
        <div className="profile-card">
          <div className="profile-card__main justify-center">
            <div className="profile-card__avatar-settings">
              <div className="profile-card__avatar">
                <img src="/images/profile-avatars/profile-avatar-1.png" alt="MoneyBoy Social Profile Avatar" />
              </div>
            </div>
            <div className="profile-card__info">
              <div className="profile-card__name-badge">
                <div className="profile-card__name">Corey Bergson</div>
                <div className="profile-card__badge">
                  <img src="/images/logo/profile-badge.png" alt="MoneyBoy Social Profile Badge" />
                </div>
              </div>
              <div className="profile-card__username">@coreybergson</div>
            </div>
          </div>
        </div>
        <h3 className="title">Monthly Subscription <span className="gradinttext">$9.99</span> <sub>/month <span>(Save 25%)</span></sub></h3>
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
          <button className="premium-btn active-down-effect"><span>Subscribe</span></button>
        </div>
        <p className="note">Clicking “Subscribe” will take you to the payment screen to finalize you subscription</p>
      </div>
    </div>
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="age-modal-title">
      <div className="modal-wrap tip-modal unlockmodal">
        <button className="close-btn"><CgClose size={22}/></button>
        <div className="profile-card">
          <div className="profile-card__main justify-center">
            <div className="profile-card__avatar-settings">
              <div className="profile-card__avatar">
                <img src="/images/profile-avatars/profile-avatar-1.png" alt="MoneyBoy Social Profile Avatar" />
              </div>
            </div>
            <div className="profile-card__info">
              <div className="profile-card__name-badge">
                <div className="profile-card__name"> Romanatwood</div>
                <div className="profile-card__badge">
                  <img src="/images/logo/profile-badge.png" alt="MoneyBoy Social Profile Badge" />
                </div>
              </div>
              <div className="profile-card__username">@atwood</div>
            </div>
          </div>
        </div>
        <h3 className="title">Unlock Content</h3>
        <h4><span className="textorange">4.99</span> USD</h4>
        <p>My man hates spiders!! <img src="/images/icons/spider_icons.svg" className="icons"/> <img src="/images/icons/smiling-faceicons.svg" className="icons"/></p>
        <div className="actions">
          <button className="premium-btn active-down-effect"><span>Confirm to unlock</span></button>
        </div>
      </div>
    </div>
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="age-modal-title">
      <div className="modal-wrap promote-modal">
        <button className="close-btn"><CgClose size={22}/></button>
        <h3 className="title">Promote Your Profile</h3>
        <p>Increase your visibility on MoneyBoy! Promote your profile to appear in the Featured MoneyBoys section and attract more fans.</p>
        <div className="note">
          <p>Choose your promotion plan and pay easily with your Wallet or credit card.”</p>
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
            <p>7 Days  at  $7.99 /day</p>
          </div>
          <div>
            <h2>$55.99</h2>
          </div>
        </div>
        <h4>Payment Method</h4>
        <div className="select_wrap">
          <label className="radio_wrap">
            <input type="radio" name="access" /> <img src="/images/icons/wallet_icons.svg" className="icons"/> <p>Pay with wallet</p>
          </label>
          <label className="radio_wrap">
            <input type="radio" name="access" /> <img src="/images/icons/card_icons.svg" className="icons"/> <p>Pay with credit/debit card</p>
          </label>
        </div>
        <div className="actions">
          <button className="premium-btn active-down-effect"><span>Confirm & Promote</span></button>
          <button className="active-down-effect"><span>Cancel</span></button>
        </div>
      </div>
    </div>
    <div className="modal show" role="dialog" aria-modal="true" aria-labelledby="age-modal-title">
      <div className="modal-wrap request-modal">
        <button className="close-btn"><CgClose size={22}/></button>
        <h3 className="title">PPV - Request Custom Content</h3>
        <div className="profile-card">
          <div className="profile-card__main justify-center">
            <div className="profile-card__avatar-settings">
              <div className="profile-card__avatar">
                <img src="/images/profile-avatars/profile-avatar-1.png" alt="MoneyBoy Social Profile Avatar" />
              </div>
            </div>
            <div className="profile-card__info">
              <div className="profile-card__name-badge">
                <div className="profile-card__name">Gogo</div>
                <div className="profile-card__badge">
                  <img src="/images/logo/profile-badge.png" alt="MoneyBoy Social Profile Badge" />
                </div>
              </div>
              <div className="profile-card__username">@gogo</div>
            </div>
          </div>
        </div>
        <p className="small">Request a personalized video or photo directly from this MoneyBoy.</p>
        <div>
          <label>Request type</label>
          <CustomSelect searchable={false} label="Custom video"
            options={[
              { label: "Select One", value: "select1" },
              { label: "Select Two", value: "select1" },
              { label: "Select Three", value: "select1" },
            ]}/>
        </div>
        <div>
          <label>Request type</label>
          <textarea rows={3} placeholder="Describe what you’d like (tone, outfit, duration, etc.)" />
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
          <input className="form-input" type="number" placeholder="10.99"/>
        </div>
        <div className="">
         <p className="boldblack">Minimum request price: 20€</p>
         <p>Final price will be confirmed by the creator before payment.</p>
        </div>
        <div className="actions">
          <button className="premium-btn active-down-effect"><span>Send Request</span></button>
          <button className="active-down-effect"><span>Cancel</span></button>
        </div>
      </div>
    </div>
    </>
  );
};

export default FeedPage;