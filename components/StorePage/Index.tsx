"use client";
import React, { useState, useRef, useEffect } from "react";
import FeaturedSlider from "./FeaturedSlider";
import CustomSelect from "../CustomSelect";
import { timeOptions } from "../helper/creatorOptions";
import { useDecryptedSession } from "@/libs/useDecryptedSession";
import Link from "next/link";
import {
  ShoppingCart,
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Image,
  Video,
  Flame,
  FlameIcon,
  PlayCircle,
} from "lucide-react";
import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";
import { Play } from "next/font/google";
import { CgClose } from "react-icons/cg";
import AllCreators from "./AllCreators";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchAllCreators,
  fetchFeaturedPosts,
  fetchMyPaidPosts,
  fetchPaidContentFeed,
} from "@/redux/store/Action";
import PPVRequestModal from "../ProfilePage/PPVRequestModal";
import { useRouter, useSearchParams } from "next/navigation";
import { savePost, unsavePost } from "@/redux/other/savedPostsSlice";
import { subscribeCreator, unlockPost } from "@/redux/Subscription/Action";
import UnlockContentModal from "../ProfilePage/UnlockContentModal";
import SubscriptionModal from "../ProfilePage/SubscriptionModal";
import FeaturedContentSlider from "./FeaturedSlider";
import { TbCamera } from "react-icons/tb";
import { apiPostWithMultiForm, getApiByParams } from "@/utils/endpoints/common";
import {
  API_GET_STORE_IMAGES,
  API_UPDATE_STORE_IMAGES,
} from "@/utils/api/APIConstant";
import ShowToast from "../common/ShowToast";

type TimeFilter =
  | "all_time"
  | "most_recent"
  | "today"
  | "last_7_days"
  | "last_30_days";

const StorePage = () => {
  const router = useRouter();
  const [store, setStore] = useState(false);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [subActiveTab, setSubActiveTab] = useState<string>("videos");
  const [showPPVModal, setShowPPVModal] = useState(false);
  const [search, setSearch] = useState("");
  const { session } = useDecryptedSession();
  const [localSubscribed, setLocalSubscribed] = useState(false);
  const userRole = session?.user?.role;
  const [subscriptionCreator, setSubscriptionCreator] = useState<any | null>(
    null,
  );
  const isCreator = userRole === 2;
  const loggedInUserId = session?.user?.id;
  const [activeMainTab, setActiveMainTab] = useState<"marketplace" | "mystore">(
    isCreator ? "mystore" : "marketplace",
  );
  const [selectedCreator, setSelectedCreator] = useState<any | null>(null);
  const activeStoreOwner = selectedCreator || session?.user;
  const activeSubscriptionCreator = subscriptionCreator || activeStoreOwner;
  const [time, setTime] = useState<TimeFilter>("all_time");
  const [unlockModalPost, setUnlockModalPost] = useState<any | null>(null);
  const playerRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState<
    "MONTHLY" | "YEARLY"
  >("MONTHLY");
  const [storeImages, setStoreImages] = useState({
    profileImage: "",
    coverImage: "",
  });
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const profilePublicId = activeStoreOwner?.publicId;
  const isOwnStore =
    isCreator && activeStoreOwner?.publicId === session?.user?.publicId;

  const creatorFromUrl = searchParams.get("creator");
  const handleOpenFullscreen = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(true);

    // Small delay so modal mounts before play
    setTimeout(() => {
      const video: HTMLVideoElement | undefined = playerRef.current?.media;
      if (!video) return;

      video.play();
    }, 100);
  };
  const [specialBannerError, setSpecialBannerError] = useState(false);
  const [videoErrors, setVideoErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!tabFromUrl) return;

    if (tabFromUrl === "marketplace" || tabFromUrl === "mystore") {
      setActiveMainTab(tabFromUrl as "marketplace" | "mystore");
    }
  }, [tabFromUrl]);

  const { featuredPosts, loadingFeaturedPosts } = useSelector(
    (state: RootState) => state.creators,
  );
  const handleClose = () => {
    const video: HTMLVideoElement | undefined = playerRef.current?.media;
    video?.pause();
    setOpen(false);
  };

  useEffect(() => {
    dispatch(
      fetchAllCreators({
        page: 1,
        creatorPublicId: creatorFromUrl || undefined,
      }),
    );
  }, [dispatch, creatorFromUrl]);

  const { items: creators, loadingCreators } = useSelector(
    (state: RootState) => state.creators,
  );
  useEffect(() => {
    if (!creatorFromUrl || !creators?.length) return;

    const creator = creators.find((c) => c.publicId === creatorFromUrl);

    if (creator) {
      console.log("MATCHED CREATOR:", creator);
      setSelectedCreator(creator);
      setActiveMainTab("marketplace");
    }
  }, [creatorFromUrl, creators]);

  const { paidPosts, loadingPaidPosts } = useSelector(
    (state: RootState) => state.creators,
  );

  const { creatorsPagination } = useSelector(
    (state: RootState) => state.creators,
  );

  const handleNext = () => {
    if (creatorsPagination.hasNextPage) {
      dispatch(fetchAllCreators({ page: creatorsPagination.page + 1 }));
    }
  };

  const handlePrev = () => {
    if (creatorsPagination.page > 1) {
      dispatch(fetchAllCreators({ page: creatorsPagination.page - 1 }));
    }
  };

  const { unlocking } = useSelector((state: RootState) => state.subscription);

  const handleConfirmUnlock = async () => {
    if (!unlockModalPost || !activeStoreOwner?.publicId) return;

    const res = await dispatch(
      unlockPost({
        postId: unlockModalPost._id,
        creatorId: unlockModalPost.userId,
      }),
    );

    if (unlockPost.fulfilled.match(res)) {
      // 🔁 REFRESH POSTS
      dispatch(
        fetchMyPaidPosts({
          page: 1,
          limit: 8,
          search,
          time,
          publicId: activeStoreOwner.publicId,
        }),
      );

      dispatch(
        fetchFeaturedPosts({
          publicId: activeStoreOwner.publicId,
          limit: 5,
        }),
      );
    }

    setUnlockModalPost(null);
  };

  useEffect(() => {
    if (!activeStoreOwner?.publicId) return;

    dispatch(
      fetchMyPaidPosts({
        page: 1,
        limit: 8,
        search,
        time,
        publicId: activeStoreOwner.publicId,
      }),
    );
  }, [dispatch, search, time, activeStoreOwner?.publicId]);

  console.log("-----", time);

  const getPostMedia = (post: any) => {
    const media = post.media?.[0];
    return {
      type: media?.type,
      url: media?.mediaFiles?.[0] || "",
    };
  };
  // const selectedCreator = creators?.[0];

  const handleCreatorClick = (creator: any) => {
    // SAME creator clicked → close store
    if (selectedCreator?.publicId === creator.publicId) {
      setSelectedCreator(null);
      return;
    }

    setSelectedCreator(creator);
  };
  const handlePostRedirect = (post: any, isOwnPost: boolean) => {
    if (post.isUnlocked || post.isSubscribed || isOwnPost) {
      router.push(`/post?page&publicId=${post.publicId}`);
    }
  };

  const handleSaveToggle = async (e: React.MouseEvent, post: any) => {
    e.stopPropagation();

    await dispatch(
      post.isSaved
        ? unsavePost({
            postId: post._id,
            creatorUserId: post.userId,
          })
        : savePost({
            postId: post._id,
            creatorUserId: post.userId,
          }),
    );
  };

  const handleConfirmSubscription = async () => {
    if (!activeSubscriptionCreator?._id) return;

    const res = await dispatch(
      subscribeCreator({
        creatorId: activeSubscriptionCreator._id,
        planType: subscriptionPlan,
      }),
    );

    if (subscribeCreator.fulfilled.match(res)) {
      setLocalSubscribed(true);
      dispatch(
        fetchMyPaidPosts({
          page: 1,
          limit: 8,
          search,
          time,
          publicId: activeStoreOwner.publicId,
        }),
      );

      dispatch(
        fetchPaidContentFeed({
          page: 1,
          limit: 8,
          tab: "new",
          // type: "all",
        }),
      );

      dispatch(
        fetchFeaturedPosts({
          publicId: activeStoreOwner.publicId,
          limit: 5,
        }),
      );
    }

    setShowSubscriptionModal(false);
    setSubscriptionCreator(null);
  };

  useEffect(() => {
    if (!profilePublicId) return;

    dispatch(
      fetchFeaturedPosts({
        publicId: profilePublicId,
        limit: 5,
      }),
    );
  }, [dispatch, profilePublicId]);

  const isSubscribed = localSubscribed || !!activeStoreOwner?.isSubscribed;

  useEffect(() => {
    if (!creatorFromUrl || !creators?.length) return;

    const creator = creators.find((c) => c.publicId === creatorFromUrl);

    if (creator) {
      setSelectedCreator(creator);
      setActiveMainTab("marketplace");
    }
  }, [creatorFromUrl, creators]);

  useEffect(() => {
    const userId =
      selectedCreator?._id || selectedCreator?.id || session?.user?.id;
    if (!userId) return;

    const fetchStoreImages = async () => {
      const res = await getApiByParams({
        url: API_GET_STORE_IMAGES,
        params: userId,
      });

      if (res?.success && res.data) {
        setStoreImages({
          profileImage: res.data.profileImage || "",
          coverImage: res.data.coverImage || "",
        });
      }
    };

    fetchStoreImages();
  }, [activeStoreOwner?._id, activeStoreOwner?.id]);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "cover",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();

    if (type === "profile") formData.append("profileImage", file);
    if (type === "cover") formData.append("coverImage", file);

    const res = await apiPostWithMultiForm({
      url: API_UPDATE_STORE_IMAGES,
      values: formData,
    });

    if (res?.success) {
      ShowToast("Image updated successfully", "success");

      setStoreImages((prev) => ({
        ...prev,
        ...(type === "profile"
          ? { profileImage: res.data.profileImage }
          : { coverImage: res.data.coverImage }),
      }));
    }
  };

  useEffect(() => {
    setStoreImages({
      profileImage: "",
      coverImage: "",
    });
  }, [selectedCreator?._id]);

  return (
    <>
      <div className="moneyboy-2x-1x-layout-container">
        <div className="moneyboy-2x-1x-a-layout">
          <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers">
            <div
              className="moneyboy-feed-page-cate-buttons card"
              id="posts-tabs-btn-card"
            >
              {isCreator && (
                <button
                  className={`page-content-type-button active-down-effect ${activeMainTab === "mystore" ? "active" : ""}`}
                  onClick={() => {
                    setSelectedCreator(null);
                    setActiveMainTab("mystore");
                  }}
                >
                  {" "}
                  <span className="flex items-end justify-center">
                    <img
                      src="/images/logo/profile-badge.png"
                      alt="M Icons"
                      className="max-w-22"
                    />{" "}
                    Store
                  </span>
                </button>
              )}
              <button
                className={`page-content-type-button active-down-effect ${activeMainTab === "marketplace" ? "active" : ""}`}
                onClick={() => setActiveMainTab("marketplace")}
              >
                Marketplace
              </button>
            </div>

            {activeMainTab === "marketplace" && (
              <div className="marketplace_wrap">
                <div className="story_wrap">
                  <div className="st_head">
                    <div className="head_text">
                      <h5 className="flex items-end justify-center">
                        <img
                          src="/images/logo/profile-badge.png"
                          alt="M Icons"
                          className="max-w-22"
                        />
                        Creators
                      </h5>
                      <div className="btn-controls">
                        <button
                          className="moneyboy-swiper-control-btn next-btn"
                          onClick={handlePrev}
                          disabled={
                            creatorsPagination.page === 1 || loadingCreators
                          }
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          className="moneyboy-swiper-control-btn next-btn"
                          onClick={handleNext}
                          disabled={
                            !creatorsPagination.hasNextPage || loadingCreators
                          }
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                    <ul>
                      {creators.map((creator, index) => (
                        <li
                          key={creator._id}
                          className={`${
                            selectedCreator?.publicId === creator.publicId
                              ? "active"
                              : ""
                          }`}
                        >
                          <div
                            className="icons_wrap"
                            onClick={() => handleCreatorClick(creator)}
                          >
                            {creator.profile ? (
                              <img
                                src={creator.profile}
                                alt={creator.displayName}
                                className="creator-avatar"
                              />
                            ) : (
                              <div className="noprofile">
                                <svg
                                  width="40"
                                  height="40"
                                  viewBox="0 0 66 54"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    className="animate-m"
                                    d="M65.4257 49.6477L64.1198 52.8674C64.0994 52.917 64.076 52.9665 64.0527 53.0132C63.6359 53.8294 62.6681 54.2083 61.8081 53.8848C61.7673 53.8731 61.7265 53.8556 61.6886 53.8381L60.2311 53.1764L57.9515 52.1416C57.0945 51.7509 56.3482 51.1446 55.8002 50.3779C48.1132 39.6156 42.1971 28.3066 38.0271 16.454C37.8551 16.1304 37.5287 15.9555 37.1993 15.9555C36.9631 15.9555 36.7241 16.0459 36.5375 16.2325L28.4395 24.3596C28.1684 24.6307 27.8099 24.7678 27.4542 24.7678C27.4076 24.7678 27.3609 24.7648 27.3143 24.7619C27.2239 24.7503 27.1307 24.7328 27.0432 24.7065C26.8217 24.6366 26.6118 24.5112 26.4427 24.3276C23.1676 20.8193 20.6053 17.1799 18.3097 15.7369C18.1698 15.6495 18.0153 15.6057 17.8608 15.6057C17.5634 15.6057 17.2719 15.7602 17.1029 16.0313C14.1572 20.7377 11.0702 24.8873 7.75721 28.1157C7.31121 28.5471 6.74277 28.8299 6.13061 28.9115L3.0013 29.3254L1.94022 29.4683L1.66912 29.5033C0.946189 29.5994 0.296133 29.0602 0.258237 28.3314L0.00754237 23.5493C-0.0274383 22.8701 0.191188 22.2025 0.610956 21.669C1.51171 20.5293 2.39789 19.3545 3.26512 18.152C5.90032 14.3304 9.52956 8.36475 13.1253 1.39631C13.548 0.498477 14.4283 0 15.3291 0C15.8479 0 16.3727 0.163246 16.8187 0.513052L27.3799 8.76557L39.285 0.521797C39.6931 0.206971 40.1711 0.0583046 40.6434 0.0583046C41.4683 0.0583046 42.2729 0.510134 42.6635 1.32052C50.16 18.2735 55.0282 34.2072 63.6378 47.3439C63.9584 47.8336 64.0197 48.4487 63.8039 48.9851L65.4257 49.6477Z"
                                    fill="url(#paint0_linear_4470_53804)"
                                  />
                                  <defs>
                                    <linearGradient
                                      id="paint0_linear_4470_53804"
                                      x1="0"
                                      y1="27"
                                      x2="66"
                                      y2="27"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#FDAB0A" />
                                      <stop offset="0.4" stopColor="#FECE26" />
                                      <stop offset="1" stopColor="#FE990B" />
                                    </linearGradient>
                                  </defs>
                                </svg>
                              </div>
                            )}

                            <button className="btn_close">
                              <img
                                alt="Profile Badge"
                                className="max-w-22"
                                src="/images/logo/profile-badge.png"
                              />
                            </button>
                          </div>

                          <span>{creator.displayName}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {!selectedCreator && (
                  <>
                    <div className="store-page-wrapper">
                      <div className="hero-type-card-wrapper">
                        <div className="hero-type-card-container">
                          <div className="hero-type-card--bg-img">
                            <img
                              src="/images/marketplace_posterfront.png"
                              alt="Store Banner Image"
                            />
                          </div>
                          <div className="hero-type-card--content-container">
                            <h2>Unlock exclusive content</h2>
                            <div className="hero-type-card--desc">
                              <p>
                                Discover Top Moneyboys, Trending & New Content
                                photos, videos.
                              </p>
                            </div>
                            <button className="btn-txt-gradient btn-outline p-sm">
                              <span>shop Now</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <AllCreators
                      onUnlock={(post) => setUnlockModalPost(post)}
                      onSubscribe={(post) => {
                        setSubscriptionCreator(post.creatorInfo); // 👈 IMPORTANT
                        setSubscriptionPlan("MONTHLY");
                        setShowSubscriptionModal(true);
                      }}
                    />
                  </>
                )}
              </div>
            )}

            {(activeMainTab === "mystore" || selectedCreator) && (
              <div
                className="moneyboy-feed-page-cate-buttons card store-page-header-wrapper"
                id="posts-tabs-btn-card"
              >
                <div className="store-page-header">
                  <div className="store-page-header-bg-img">
                    <img
                      src="/images/element-assets/store-page-header-bg.jpg"
                      alt="Store Header BG Image"
                    />
                  </div>
                  <div className="store-page-header-content-wrapper">
                    <div className="store-page-header--profile">
                      <div className="profile-card">
                        <Link href={`profile/${activeStoreOwner?.publicId}`}>
                          <div className="profile-card__main">
                            <div className="profile-card__avatar-settings">
                              <div className="profile-card__avatar">
                                {activeStoreOwner.profile ? (
                                  <img
                                    src={activeStoreOwner.profile}
                                    alt={activeStoreOwner.displayName || "User"}
                                  />
                                ) : (
                                  <div className="noprofile">
                                    {/* <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><text x="50%" y="50%">m</text></svg> */}
                                    <svg
                                      width="40"
                                      height="40"
                                      viewBox="0 0 66 54"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        className="animate-m"
                                        d="M65.4257 49.6477L64.1198 52.8674C64.0994 52.917 64.076 52.9665 64.0527 53.0132C63.6359 53.8294 62.6681 54.2083 61.8081 53.8848C61.7673 53.8731 61.7265 53.8556 61.6886 53.8381L60.2311 53.1764L57.9515 52.1416C57.0945 51.7509 56.3482 51.1446 55.8002 50.3779C48.1132 39.6156 42.1971 28.3066 38.0271 16.454C37.8551 16.1304 37.5287 15.9555 37.1993 15.9555C36.9631 15.9555 36.7241 16.0459 36.5375 16.2325L28.4395 24.3596C28.1684 24.6307 27.8099 24.7678 27.4542 24.7678C27.4076 24.7678 27.3609 24.7648 27.3143 24.7619C27.2239 24.7503 27.1307 24.7328 27.0432 24.7065C26.8217 24.6366 26.6118 24.5112 26.4427 24.3276C23.1676 20.8193 20.6053 17.1799 18.3097 15.7369C18.1698 15.6495 18.0153 15.6057 17.8608 15.6057C17.5634 15.6057 17.2719 15.7602 17.1029 16.0313C14.1572 20.7377 11.0702 24.8873 7.75721 28.1157C7.31121 28.5471 6.74277 28.8299 6.13061 28.9115L3.0013 29.3254L1.94022 29.4683L1.66912 29.5033C0.946189 29.5994 0.296133 29.0602 0.258237 28.3314L0.00754237 23.5493C-0.0274383 22.8701 0.191188 22.2025 0.610956 21.669C1.51171 20.5293 2.39789 19.3545 3.26512 18.152C5.90032 14.3304 9.52956 8.36475 13.1253 1.39631C13.548 0.498477 14.4283 0 15.3291 0C15.8479 0 16.3727 0.163246 16.8187 0.513052L27.3799 8.76557L39.285 0.521797C39.6931 0.206971 40.1711 0.0583046 40.6434 0.0583046C41.4683 0.0583046 42.2729 0.510134 42.6635 1.32052C50.16 18.2735 55.0282 34.2072 63.6378 47.3439C63.9584 47.8336 64.0197 48.4487 63.8039 48.9851L65.4257 49.6477Z"
                                        fill="url(#paint0_linear_4470_53804)"
                                      />
                                      <defs>
                                        <linearGradient
                                          id="paint0_linear_4470_53804"
                                          x1="0"
                                          y1="27"
                                          x2="66"
                                          y2="27"
                                          gradientUnits="userSpaceOnUse"
                                        >
                                          <stop stop-color="#FDAB0A" />
                                          <stop
                                            offset="0.4"
                                            stop-color="#FECE26"
                                          />
                                          <stop
                                            offset="1"
                                            stop-color="#FE990B"
                                          />
                                        </linearGradient>
                                      </defs>
                                    </svg>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="profile-card__info">
                              <div className="profile-card__name-badge">
                                <div className="profile-card__name">
                                  {activeStoreOwner?.displayName}
                                </div>
                                <div className="profile-card__badge">
                                  <img
                                    src="/images/logo/profile-badge.png"
                                    alt="MoneyBoy Social Profile Badge"
                                  />
                                </div>
                              </div>
                              <div className="profile-card__username">
                                @{activeStoreOwner?.userName}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="store-page-header-tag">
                      <img
                        src="/images/logo/profile-badge.png"
                        alt="Store Button Icon"
                      />
                      <span>Store</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(activeMainTab === "mystore" || selectedCreator) && (
              <div className="store-page-wrapper">
                <div className="hero-type-card-wrapper">
                  <div className="hero-type-card-container">
                    <div className="hero-type-card--bg-img">
                      {storeImages.coverImage || activeStoreOwner.coverImage ? (
                        <img
                          src={`${
                            storeImages.coverImage ||
                            activeStoreOwner.coverImage
                          }`}
                          alt={`${session?.user?.displayName || "User"} Cover Image`}
                        />
                      ) : (
                        <div className="nomedia"></div>
                      )}
                    </div>

                    <div className="hero-type-card--content-container">
                      {isOwnStore && (
                        <div className="edit_image">
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            id="coverUpload"
                            onChange={(e) => handleImageUpload(e, "cover")}
                          />
                          <label
                            htmlFor="coverUpload"
                            className="imgicons active-down-effect-2x"
                          >
                            <TbCamera size={16} />
                          </label>
                        </div>
                      )}
                      <h2>PPV Request</h2>
                      <h4>Want Something Special?</h4>
                      <div className="hero-type-card--cta-box">
                        <p>
                          {" "}
                          Request a custom photo or video directly from this
                          MoneyBoy
                        </p>
                        <div>
                          <button
                            disabled={isOwnStore}
                            className="btn-txt-gradient btn-outline p-sm"
                            onClick={() => setShowPPVModal(true)}
                          >
                            <span>Request PPV</span>
                          </button>
                        </div>
                      </div>
                      <div className="hero-type-card--desc">
                        <p>
                          Prices very based on your request. You’ll get a quote
                          before payment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {featuredPosts?.length > 0 && (
                  <div className="moneyboy-swiper-wrapper" data-moneyboy-swiper>
                    <div className="moneyboy-swiper-container w-full">
                      <div className="moneyboy-swiper-header">
                        <h3 className="section-heading-label">
                          Featured contents
                        </h3>
                        <div className="moneyboy-swiper-controls">
                          <button className="moneyboy-swiper-control-btn prev-btn">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75ZM13.7891 7.93848C13.4958 7.64639 13.0209 7.64736 12.7285 7.94043L9.20898 11.4697C8.91713 11.7624 8.91722 12.2366 9.20898 12.5293L12.7285 16.0596C13.021 16.3528 13.4958 16.353 13.7891 16.0605C14.0822 15.7681 14.0834 15.2933 13.791 15L10.7988 11.999L13.791 8.99902C14.0831 8.70569 14.0823 8.23084 13.7891 7.93848Z"
                                fill="url(#paint0_linear_792_43)"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_792_43"
                                  x1="21.4759"
                                  y1="1.25"
                                  x2="-7.14787"
                                  y2="8.22874"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stopColor="#FECE26" />
                                  <stop offset="1" stopColor="#E5741F" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </button>
                          <button className="moneyboy-swiper-control-btn next-btn">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM10.2109 7.93848C10.5042 7.64639 10.9791 7.64736 11.2715 7.94043L14.791 11.4697C15.0829 11.7624 15.0828 12.2366 14.791 12.5293L11.2715 16.0596C10.979 16.3528 10.5042 16.353 10.2109 16.0605C9.91775 15.7681 9.91656 15.2933 10.209 15L13.2012 11.999L10.209 8.99902C9.91685 8.70569 9.91774 8.23084 10.2109 7.93848Z"
                                fill="url(#paint0_linear_792_51)"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_792_51"
                                  x1="2.52411"
                                  y1="1.25"
                                  x2="31.1479"
                                  y2="8.22874"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stopColor="#FECE26" />
                                  <stop offset="1" stopColor="#E5741F" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="moneyboy-swiper-cards-wrapper">
                        <FeaturedContentSlider
                          publicId={profilePublicId}
                          loggedInUserId={loggedInUserId}
                          isCreator={isCreator}
                          onUnlock={(post) => setUnlockModalPost(post)}
                          onSubscribe={() => {
                            setSubscriptionPlan("MONTHLY");
                            setShowSubscriptionModal(true);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="moneyboy-special-content-banner-wrapper card">
                  <div className="moneyboy-special-content-banner-container">
                    <div className="moneyboy-special-content-banner--content">
                      <h2>Get exclusive access</h2>
                      <p>Subscribe to unlock everything from this creator.</p>

                      <a
                        href="#"
                        className="btn-txt-gradient btn-outline"
                        onClick={(e) => {
                          e.preventDefault();

                          if (isOwnStore || isSubscribed) return;

                          setSubscriptionPlan("MONTHLY");
                          setShowSubscriptionModal(true);
                        }}
                      >
                        <svg
                          className="only-fill-hover-effect"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M10.001 0.916992C12.2126 0.916992 13.7238 1.51554 14.6475 2.66211C15.5427 3.77366 15.751 5.24305 15.751 6.66699V7.66895C16.6879 7.79136 17.4627 8.06745 18.0312 8.63574C18.8947 9.49918 19.0849 10.8389 19.085 12.5V14.166C19.085 15.8272 18.8946 17.1668 18.0312 18.0303C17.1677 18.8935 15.8291 19.083 14.168 19.083H5.83496C4.17365 19.083 2.83421 18.8938 1.9707 18.0303C1.10735 17.1668 0.917969 15.8272 0.917969 14.166V12.5C0.917997 10.8389 1.10726 9.49918 1.9707 8.63574C2.53913 8.06742 3.31408 7.79232 4.25098 7.66992V6.66699C4.25098 5.24305 4.45925 3.77366 5.35449 2.66211C6.27812 1.51554 7.78932 0.916992 10.001 0.916992ZM5.83496 9.08301C4.1632 9.08301 3.4178 9.30991 3.03125 9.69629C2.64478 10.0828 2.418 10.8282 2.41797 12.5V14.166C2.41797 15.8378 2.64487 16.5832 3.03125 16.9697C3.41774 17.3562 4.16293 17.583 5.83496 17.583H14.168C15.8395 17.583 16.5841 17.356 16.9707 16.9697C17.3571 16.5832 17.585 15.8378 17.585 14.166V12.5C17.5849 10.8282 17.3572 10.0828 16.9707 9.69629C16.5841 9.3101 15.8393 9.08301 14.168 9.08301H5.83496ZM10.001 10.5C11.5657 10.5 12.8348 11.7684 12.835 13.333C12.835 14.8978 11.5658 16.167 10.001 16.167C8.43632 16.1668 7.16797 14.8977 7.16797 13.333C7.16814 11.7685 8.43643 10.5002 10.001 10.5ZM10.001 12C9.26486 12.0002 8.66814 12.5969 8.66797 13.333C8.66797 14.0693 9.26475 14.6668 10.001 14.667C10.7374 14.667 11.335 14.0694 11.335 13.333C11.3348 12.5968 10.7372 12 10.001 12ZM10.001 2.41699C8.04601 2.41699 7.05717 2.93971 6.52246 3.60352C5.95984 4.30235 5.75098 5.33302 5.75098 6.66699V7.58398C5.77888 7.58387 5.80687 7.58301 5.83496 7.58301H14.168C14.1957 7.58301 14.2234 7.58388 14.251 7.58398V6.66699C14.251 5.33302 14.0421 4.30235 13.4795 3.60352C12.9448 2.93971 11.9559 2.41699 10.001 2.41699Z"
                            fill="url(#paint0_linear_745_155)"
                          ></path>
                          <defs>
                            <linearGradient
                              id="paint0_linear_745_155"
                              x1="1.99456"
                              y1="0.916991"
                              x2="26.1808"
                              y2="6.81415"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FECE26"></stop>
                              <stop offset="1" stopColor="#E5741F"></stop>
                            </linearGradient>
                          </defs>
                        </svg>
                        <span>
                          {isOwnStore
                            ? "Your Store"
                            : isSubscribed
                              ? "Subscribed"
                              : "Subscribe Now"}
                        </span>
                      </a>
                    </div>
                    <div className="moneyboy-special-content-banner--img-wrapper">
                      {isOwnStore && (
                        <div className="edit_image">
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            id="profileUpload"
                            onChange={(e) => handleImageUpload(e, "profile")}
                          />
                          <label
                            htmlFor="profileUpload"
                            className="imgicons active-down-effect-2x"
                          >
                            <TbCamera size={16} />
                          </label>
                        </div>
                      )}
                      {(storeImages.profileImage ||
                        activeStoreOwner?.profile) &&
                      !specialBannerError ? (
                        <img
                          src={`${
                            storeImages.profileImage || activeStoreOwner.profile
                          }`}
                          alt={`${activeStoreOwner.displayName || "User"} Profile`}
                        />
                      ) : (
                        <div className="noprofile">
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 66 54"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="animate-m"
                              d="M65.4257 49.6477L64.1198 52.8674C64.0994 52.917 64.076 52.9665 64.0527 53.0132C63.6359 53.8294 62.6681 54.2083 61.8081 53.8848C61.7673 53.8731 61.7265 53.8556 61.6886 53.8381L60.2311 53.1764L57.9515 52.1416C57.0945 51.7509 56.3482 51.1446 55.8002 50.3779C48.1132 39.6156 42.1971 28.3066 38.0271 16.454C37.8551 16.1304 37.5287 15.9555 37.1993 15.9555C36.9631 15.9555 36.7241 16.0459 36.5375 16.2325L28.4395 24.3596C28.1684 24.6307 27.8099 24.7678 27.4542 24.7678C27.4076 24.7678 27.3609 24.7648 27.3143 24.7619C27.2239 24.7503 27.1307 24.7328 27.0432 24.7065C26.8217 24.6366 26.6118 24.5112 26.4427 24.3276C23.1676 20.8193 20.6053 17.1799 18.3097 15.7369C18.1698 15.6495 18.0153 15.6057 17.8608 15.6057C17.5634 15.6057 17.2719 15.7602 17.1029 16.0313C14.1572 20.7377 11.0702 24.8873 7.75721 28.1157C7.31121 28.5471 6.74277 28.8299 6.13061 28.9115L3.0013 29.3254L1.94022 29.4683L1.66912 29.5033C0.946189 29.5994 0.296133 29.0602 0.258237 28.3314L0.00754237 23.5493C-0.0274383 22.8701 0.191188 22.2025 0.610956 21.669C1.51171 20.5293 2.39789 19.3545 3.26512 18.152C5.90032 14.3304 9.52956 8.36475 13.1253 1.39631C13.548 0.498477 14.4283 0 15.3291 0C15.8479 0 16.3727 0.163246 16.8187 0.513052L27.3799 8.76557L39.285 0.521797C39.6931 0.206971 40.1711 0.0583046 40.6434 0.0583046C41.4683 0.0583046 42.2729 0.510134 42.6635 1.32052C50.16 18.2735 55.0282 34.2072 63.6378 47.3439C63.9584 47.8336 64.0197 48.4487 63.8039 48.9851L65.4257 49.6477Z"
                              fill="url(#paint0_linear_4470_53804)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_4470_53804"
                                x1="0"
                                y1="27"
                                x2="66"
                                y2="27"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#FDAB0A" />
                                <stop offset="0.4" stop-color="#FECE26" />
                                <stop offset="1" stop-color="#FE990B" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      )}
                      <div className="text-overlay">
                        <p>Unlock the full experience with a subscription</p>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="section-heading-label">All Contents</h3>
                <div>
                  <div className="tabs-content-wrapper-layout">
                    <div data-multi-dem-cards-layout>
                      <div
                        className="creator-content-filter-grid-container"
                        data-multiple-tabs-section
                      >
                        <div className="filters-card-wrapper card">
                          <div className="search-features-grid-btns has-multi-tabs-btns">
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
                                  value={search}
                                  onChange={(e) => setSearch(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="creator-content-tabs-btn-wrapper">
                              <div className="multi-tabs-action-buttons">
                                <button
                                  className={`multi-tab-switch-btn videos-btn ${
                                    subActiveTab === "videos" ? "active" : ""
                                  }`}
                                  data-multi-tabs-switch-btn
                                  onClick={() => setSubActiveTab("videos")}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="25"
                                    viewBox="0 0 24 25"
                                    fill="none"
                                  >
                                    <path
                                      d="M12.53 20.92H6.21C3.05 20.92 2 18.82 2 16.71V8.29002C2 5.13002 3.05 4.08002 6.21 4.08002H12.53C15.69 4.08002 16.74 5.13002 16.74 8.29002V16.71C16.74 19.87 15.68 20.92 12.53 20.92Z"
                                      stroke="none"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M19.5202 17.6L16.7402 15.65V9.34001L19.5202 7.39001C20.8802 6.44001 22.0002 7.02001 22.0002 8.69001V16.31C22.0002 17.98 20.8802 18.56 19.5202 17.6Z"
                                      stroke="none"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M11.5 11.5C12.3284 11.5 13 10.8284 13 10C13 9.17157 12.3284 8.5 11.5 8.5C10.6716 8.5 10 9.17157 10 10C10 10.8284 10.6716 11.5 11.5 11.5Z"
                                      stroke="none"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <span>Videos</span>
                                </button>
                                <button
                                  className={`multi-tab-switch-btn photos-btn ${
                                    subActiveTab === "photos" ? "active" : ""
                                  }`}
                                  data-multi-tabs-switch-btn
                                  onClick={() => setSubActiveTab("photos")}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    viewBox="0 0 25 25"
                                    fill="none"
                                  >
                                    <path
                                      d="M9.5 22.5H15.5C20.5 22.5 22.5 20.5 22.5 15.5V9.5C22.5 4.5 20.5 2.5 15.5 2.5H9.5C4.5 2.5 2.5 4.5 2.5 9.5V15.5C2.5 20.5 4.5 22.5 9.5 22.5Z"
                                      stroke="none"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M9.5 10.5C10.6046 10.5 11.5 9.60457 11.5 8.5C11.5 7.39543 10.6046 6.5 9.5 6.5C8.39543 6.5 7.5 7.39543 7.5 8.5C7.5 9.60457 8.39543 10.5 9.5 10.5Z"
                                      stroke="none"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M3.16992 19.45L8.09992 16.14C8.88992 15.61 10.0299 15.67 10.7399 16.28L11.0699 16.57C11.8499 17.24 13.1099 17.24 13.8899 16.57L18.0499 13C18.8299 12.33 20.0899 12.33 20.8699 13L22.4999 14.4"
                                      stroke="none"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <span>Photos</span>
                                </button>
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
                                  onChange={(value) => {
                                    if (typeof value === "string") {
                                      setTime(value as TimeFilter);
                                    }
                                  }}
                                />
                              </div>
                              <div
                                className="creator-content-grid-layout-options"
                                data-multi-dem-cards-layout-btns
                              >
                                <button
                                  className={`creator-content-grid-layout-btn ${
                                    layout === "grid" ? "active" : "inactive"
                                  }`}
                                  onClick={() => setLayout("grid")}
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
                                    layout === "list" ? "active" : "inactive"
                                  }`}
                                  onClick={() => setLayout("list")}
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
                          className="creator-content-cards-wrapper multi-dem-cards-wrapper-layout"
                          data-layout-toggle-rows={
                            layout === "list" ? true : undefined
                          }
                        >
                          {subActiveTab === "videos" && (
                            <div
                              className="creator-content-type-container-wrapper"
                              data-multi-tabs-content-tabdata__active
                            >
                              {loadingPaidPosts && (
                                <div className="loadingtext">
                                  {"Loading".split("").map((char, i) => (
                                    <span
                                      key={i}
                                      style={{
                                        animationDelay: `${(i + 1) * 0.1}s`,
                                      }}
                                    >
                                      {char}
                                    </span>
                                  ))}
                                </div>
                              )}
                              <div className="col-4-cards-layout">
                                {!loadingPaidPosts &&
                                  paidPosts

                                    .filter(
                                      (post) =>
                                        getPostMedia(post).type === "video",
                                    )

                                    .map((post) => {
                                      const media = getPostMedia(post);
                                      const isOwnPost =
                                        isCreator &&
                                        post.userId === loggedInUserId;
                                      const isSaved = post.isSaved;

                                      return (
                                        <div
                                          className="creator-media-card card"
                                          key={post._id}
                                        >
                                          <div className="creator-media-card__media-wrapper">
                                            <div className="creator-media-card__media">
                                              {media.url &&
                                              !videoErrors[post._id] ? (
                                                <video
                                                  src={media.url}
                                                  muted
                                                  playsInline
                                                  preload="metadata"
                                                  onError={() =>
                                                    setVideoErrors((prev) => ({
                                                      ...prev,
                                                      [post._id]: true,
                                                    }))
                                                  }
                                                />
                                              ) : (
                                                <div className="noprofile">
                                                  <svg
                                                    width="40"
                                                    height="40"
                                                    viewBox="0 0 66 54"
                                                    fill="none"
                                                  >
                                                    <path
                                                      className="animate-m"
                                                      d="M65.4257 49.6477L64.1198 52.8674..."
                                                      fill="url(#paint_video_fallback)"
                                                    />
                                                    <defs>
                                                      <linearGradient
                                                        id="paint_video_fallback"
                                                        x1="0"
                                                        y1="27"
                                                        x2="66"
                                                        y2="27"
                                                        gradientUnits="userSpaceOnUse"
                                                      >
                                                        <stop stopColor="#FDAB0A" />
                                                        <stop
                                                          offset="0.4"
                                                          stopColor="#FECE26"
                                                        />
                                                        <stop
                                                          offset="1"
                                                          stopColor="#FE990B"
                                                        />
                                                      </linearGradient>
                                                    </defs>
                                                  </svg>
                                                </div>
                                              )}
                                            </div>
                                            <div className="creator-media-card__overlay">
                                              <div className="creator-media-card__stats">
                                                {!isOwnPost &&
                                                  !post.isUnlocked &&
                                                  !post.isSubscribed && (
                                                    <div
                                                      className={`creator-media-card__stats-btn wishlist-icon ${
                                                        isSaved ? "active" : ""
                                                      }`}
                                                      onClick={(e) =>
                                                        handleSaveToggle(
                                                          e,
                                                          post,
                                                        )
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
                                                          d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                          stroke="white"
                                                          strokeWidth="1.5"
                                                          strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                        ></path>
                                                        <path
                                                          d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                          stroke="white"
                                                          strokeWidth="1.5"
                                                          strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                        ></path>
                                                        <path
                                                          d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                                          stroke="white"
                                                          strokeWidth="1.5"
                                                          strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                        ></path>
                                                      </svg>
                                                    </div>
                                                  )}
                                              </div>
                                            </div>
                                          </div>

                                          <div className="creator-media-card__desc">
                                            <p>{post.text}</p>
                                          </div>

                                          <div className="creator-media-card__btn">
                                            {/* OWN POST → NO BUTTON */}

                                            <>
                                              {/* PURCHASED */}
                                              {post.isUnlocked && (
                                                <a
                                                  className="btn-txt-gradient btn-outline grey-variant"
                                                  onClick={() =>
                                                    handlePostRedirect(
                                                      post,
                                                      isOwnPost,
                                                    )
                                                  }
                                                >
                                                  <span>Purchased</span>
                                                </a>
                                              )}

                                              {/* SUBSCRIBED */}
                                              {!post.isUnlocked &&
                                                post.isSubscribed &&
                                                post.accessType ===
                                                  "subscriber" && (
                                                  <a
                                                    className="btn-txt-gradient btn-outline grey-variant"
                                                    onClick={() =>
                                                      handlePostRedirect(
                                                        post,
                                                        isOwnPost,
                                                      )
                                                    }
                                                  >
                                                    <span>Subscribed</span>
                                                  </a>
                                                )}

                                              {/* PAY PER VIEW */}
                                              {!post.isUnlocked &&
                                                post.accessType ===
                                                  "pay_per_view" && (
                                                  <a
                                                    className="btn-txt-gradient btn-outline"
                                                    onClick={(e) => {
                                                      if (isOwnPost) {
                                                        e.preventDefault();
                                                        return;
                                                      }
                                                      setUnlockModalPost(post);
                                                    }}
                                                  >
                                                    <svg
                                                      className="only-fill-hover-effect"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      width="20"
                                                      height="20"
                                                      viewBox="0 0 20 20"
                                                      fill="none"
                                                    >
                                                      <path
                                                        d="M10.001 0.916992C12.2126 0.916992 13.7238 1.51554 14.6475 2.66211C15.5427 3.77366 15.751 5.24305 15.751 6.66699V7.66895C16.6879 7.79136 17.4627 8.06745 18.0312 8.63574C18.8947 9.49918 19.0849 10.8389 19.085 12.5V14.166C19.085 15.8272 18.8946 17.1668 18.0312 18.0303C17.1677 18.8935 15.8291 19.083 14.168 19.083H5.83496C4.17365 19.083 2.83421 18.8938 1.9707 18.0303C1.10735 17.1668 0.917969 15.8272 0.917969 14.166V12.5C0.917997 10.8389 1.10726 9.49918 1.9707 8.63574C2.53913 8.06742 3.31408 7.79232 4.25098 7.66992V6.66699C4.25098 5.24305 4.45925 3.77366 5.35449 2.66211C6.27812 1.51554 7.78932 0.916992 10.001 0.916992ZM5.83496 9.08301C4.1632 9.08301 3.4178 9.30991 3.03125 9.69629C2.64478 10.0828 2.418 10.8282 2.41797 12.5V14.166C2.41797 15.8378 2.64487 16.5832 3.03125 16.9697C3.41774 17.3562 4.16293 17.583 5.83496 17.583H14.168C15.8395 17.583 16.5841 17.356 16.9707 16.9697C17.3571 16.5832 17.585 15.8378 17.585 14.166V12.5C17.5849 10.8282 17.3572 10.0828 16.9707 9.69629C16.5841 9.3101 15.8393 9.08301 14.168 9.08301H5.83496ZM10.001 10.5C11.5657 10.5 12.8348 11.7684 12.835 13.333C12.835 14.8978 11.5658 16.167 10.001 16.167C8.43632 16.1668 7.16797 14.8977 7.16797 13.333C7.16814 11.7685 8.43643 10.5002 10.001 10.5ZM10.001 12C9.26486 12.0002 8.66814 12.5969 8.66797 13.333C8.66797 14.0693 9.26475 14.6668 10.001 14.667C10.7374 14.667 11.335 14.0694 11.335 13.333C11.3348 12.5968 10.7372 12 10.001 12ZM10.001 2.41699C8.04601 2.41699 7.05717 2.93971 6.52246 3.60352C5.95984 4.30235 5.75098 5.33302 5.75098 6.66699V7.58398C5.77888 7.58387 5.80687 7.58301 5.83496 7.58301H14.168C14.1957 7.58301 14.2234 7.58388 14.251 7.58398V6.66699C14.251 5.33302 14.0421 4.30235 13.4795 3.60352C12.9448 2.93971 11.9559 2.41699 10.001 2.41699Z"
                                                        fill="url(#paint0_linear_745_155)"
                                                      ></path>
                                                      <defs>
                                                        <linearGradient
                                                          id="paint0_linear_745_155"
                                                          x1="1.99456"
                                                          y1="0.916991"
                                                          x2="26.1808"
                                                          y2="6.81415"
                                                          gradientUnits="userSpaceOnUse"
                                                        >
                                                          <stop stopColor="#FECE26"></stop>
                                                          <stop
                                                            offset="1"
                                                            stopColor="#E5741F"
                                                          ></stop>
                                                        </linearGradient>
                                                      </defs>
                                                    </svg>
                                                    <span>${post.price}</span>
                                                  </a>
                                                )}

                                              {/* SUBSCRIBER ONLY */}
                                              {!post.isUnlocked &&
                                                !post.isSubscribed &&
                                                post.accessType ===
                                                  "subscriber" && (
                                                  <a
                                                    className="btn-txt-gradient btn-outline grey-variant"
                                                    onClick={(e) => {
                                                      if (isOwnPost) {
                                                        e.preventDefault();
                                                        return;
                                                      }

                                                      setSubscriptionPlan(
                                                        "MONTHLY",
                                                      );
                                                      setShowSubscriptionModal(
                                                        true,
                                                      );
                                                    }}
                                                  >
                                                    <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      width="20"
                                                      height="20"
                                                      viewBox="0 0 20 20"
                                                      fill="none"
                                                    >
                                                      <path
                                                        d="M13.9173 15.8167H6.08399C5.73399 15.8167 5.34232 15.5417 5.22565 15.2083L1.77565 5.55834C1.28399 4.17501 1.85899 3.75001 3.04232 4.60001L6.29232 6.92501C6.83399 7.30001 7.45065 7.10834 7.68399 6.50001L9.15065 2.59167C9.61732 1.34167 10.3923 1.34167 10.859 2.59167L12.3257 6.50001C12.559 7.10834 13.1757 7.30001 13.709 6.92501L16.759 4.75001C18.059 3.81667 18.684 4.29168 18.1507 5.80001L14.784 15.225C14.659 15.5417 14.2673 15.8167 13.9173 15.8167Z"
                                                        stroke="url(#paint0_linear_745_209)"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                      ></path>
                                                      <path
                                                        d="M5.41602 18.3333H14.5827"
                                                        stroke="url(#paint1_linear_745_209)"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                      ></path>
                                                      <path
                                                        d="M7.91602 11.6667H12.0827"
                                                        stroke="url(#paint2_linear_745_209)"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                      ></path>
                                                      <defs>
                                                        <linearGradient
                                                          id="paint0_linear_745_209"
                                                          x1="9.9704"
                                                          y1="1.65417"
                                                          x2="9.9704"
                                                          y2="15.8167"
                                                          gradientUnits="userSpaceOnUse"
                                                        >
                                                          <stop stopColor="#FFCD84"></stop>
                                                          <stop
                                                            offset="1"
                                                            stopColor="#FEA10A"
                                                          ></stop>
                                                        </linearGradient>
                                                        <linearGradient
                                                          id="paint1_linear_745_209"
                                                          x1="9.99935"
                                                          y1="18.3333"
                                                          x2="9.99935"
                                                          y2="19.3333"
                                                          gradientUnits="userSpaceOnUse"
                                                        >
                                                          <stop stopColor="#FFCD84"></stop>
                                                          <stop
                                                            offset="1"
                                                            stopColor="#FEA10A"
                                                          ></stop>
                                                        </linearGradient>
                                                        <linearGradient
                                                          id="paint2_linear_745_209"
                                                          x1="9.99935"
                                                          y1="11.6667"
                                                          x2="9.99935"
                                                          y2="12.6667"
                                                          gradientUnits="userSpaceOnUse"
                                                        >
                                                          <stop stopColor="#FFCD84"></stop>
                                                          <stop
                                                            offset="1"
                                                            stopColor="#FEA10A"
                                                          ></stop>
                                                        </linearGradient>
                                                      </defs>
                                                    </svg>
                                                    <span>For Subscribers</span>
                                                  </a>
                                                )}
                                            </>
                                          </div>
                                        </div>
                                      );
                                    })}
                              </div>
                            </div>
                          )}

                          <div
                            className="creator-content-type-container-wrapper"
                            data-multi-tabs-content-tab
                          >
                            {subActiveTab === "photos" && (
                              <div className="col-4-cards-layout">
                                {paidPosts
                                  .filter(
                                    (post) =>
                                      getPostMedia(post).type === "photo",
                                  )
                                  .map((post) => {
                                    const media = getPostMedia(post);

                                    const isOwnPost =
                                      isCreator &&
                                      post.userId === loggedInUserId;
                                    const isSaved = post.isSaved;
                                    return (
                                      <div
                                        className="creator-media-card card"
                                        key={post._id}
                                      >
                                        <div className="creator-media-card__media-wrapper">
                                          <div className="creator-media-card__media">
                                            <img
                                              src={media.url}
                                              alt="Post Image"
                                            />
                                          </div>

                                          <div className="creator-media-card__overlay">
                                            <div className="creator-media-card__stats">
                                              {!isOwnPost &&
                                                !post.isUnlocked &&
                                                !post.isSubscribed && (
                                                  <div
                                                    className={`creator-media-card__stats-btn wishlist-icon ${
                                                      isSaved ? "active" : ""
                                                    }`}
                                                    onClick={(e) =>
                                                      handleSaveToggle(e, post)
                                                    }
                                                  >
                                                    <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      width="21"
                                                      height="20"
                                                      viewBox="0 0 21 20"
                                                      fill="none"
                                                    >
                                                      <path
                                                        d="M14.7666 1.66687H6.73327C4.95827 1.66687 3.5166 3.11687 3.5166 4.88354V16.6252C3.5166 18.1252 4.5916 18.7585 5.90827 18.0335L9.97494 15.7752C10.4083 15.5335 11.1083 15.5335 11.5333 15.7752L15.5999 18.0335C16.9166 18.7669 17.9916 18.1335 17.9916 16.6252V4.88354C17.9833 3.11687 16.5416 1.66687 14.7666 1.66687Z"
                                                        stroke="none"
                                                        stroke-width="1.5"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                      ></path>
                                                      <path
                                                        d="M14.7666 1.66687H6.73327C4.95827 1.66687 3.5166 3.11687 3.5166 4.88354V16.6252C3.5166 18.1252 4.5916 18.7585 5.90827 18.0335L9.97494 15.7752C10.4083 15.5335 11.1083 15.5335 11.5333 15.7752L15.5999 18.0335C16.9166 18.7669 17.9916 18.1335 17.9916 16.6252V4.88354C17.9833 3.11687 16.5416 1.66687 14.7666 1.66687Z"
                                                        stroke="none"
                                                        stroke-width="1.5"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                      ></path>
                                                      <path
                                                        d="M8.4585 7.5415C9.94183 8.08317 11.5585 8.08317 13.0418 7.5415"
                                                        stroke="none"
                                                        stroke-width="1.5"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                      ></path>
                                                    </svg>
                                                  </div>
                                                )}
                                            </div>
                                          </div>
                                        </div>

                                        <div className="creator-media-card__desc">
                                          <p>{post.text}</p>
                                        </div>

                                        <div className="creator-media-card__btn mt-auto">
                                          {/* OWN POST → NO BUTTON */}

                                          <>
                                            {/* PURCHASED */}
                                            {post.isUnlocked && (
                                              <a
                                                className="btn-txt-gradient btn-outline grey-variant"
                                                onClick={() =>
                                                  handlePostRedirect(
                                                    post,
                                                    isOwnPost,
                                                  )
                                                }
                                              >
                                                <span>Purchased</span>
                                              </a>
                                            )}

                                            {/* SUBSCRIBED */}
                                            {!post.isUnlocked &&
                                              post.isSubscribed &&
                                              post.accessType ===
                                                "subscriber" && (
                                                <a
                                                  className="btn-txt-gradient btn-outline grey-variant"
                                                  onClick={() =>
                                                    handlePostRedirect(
                                                      post,
                                                      isOwnPost,
                                                    )
                                                  }
                                                >
                                                  <span>Subscribed</span>
                                                </a>
                                              )}

                                            {/* PAY PER VIEW */}
                                            {!post.isUnlocked &&
                                              post.accessType ===
                                                "pay_per_view" && (
                                                <a
                                                  className="btn-txt-gradient btn-outline"
                                                  onClick={(e) => {
                                                    if (isOwnPost) {
                                                      e.preventDefault();
                                                      return;
                                                    }
                                                    setUnlockModalPost(post);
                                                  }}
                                                >
                                                  <svg
                                                    className="only-fill-hover-effect"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                  >
                                                    <path
                                                      d="M10.001 0.916992C12.2126 0.916992 13.7238 1.51554 14.6475 2.66211C15.5427 3.77366 15.751 5.24305 15.751 6.66699V7.66895C16.6879 7.79136 17.4627 8.06745 18.0312 8.63574C18.8947 9.49918 19.0849 10.8389 19.085 12.5V14.166C19.085 15.8272 18.8946 17.1668 18.0312 18.0303C17.1677 18.8935 15.8291 19.083 14.168 19.083H5.83496C4.17365 19.083 2.83421 18.8938 1.9707 18.0303C1.10735 17.1668 0.917969 15.8272 0.917969 14.166V12.5C0.917997 10.8389 1.10726 9.49918 1.9707 8.63574C2.53913 8.06742 3.31408 7.79232 4.25098 7.66992V6.66699C4.25098 5.24305 4.45925 3.77366 5.35449 2.66211C6.27812 1.51554 7.78932 0.916992 10.001 0.916992ZM5.83496 9.08301C4.1632 9.08301 3.4178 9.30991 3.03125 9.69629C2.64478 10.0828 2.418 10.8282 2.41797 12.5V14.166C2.41797 15.8378 2.64487 16.5832 3.03125 16.9697C3.41774 17.3562 4.16293 17.583 5.83496 17.583H14.168C15.8395 17.583 16.5841 17.356 16.9707 16.9697C17.3571 16.5832 17.585 15.8378 17.585 14.166V12.5C17.5849 10.8282 17.3572 10.0828 16.9707 9.69629C16.5841 9.3101 15.8393 9.08301 14.168 9.08301H5.83496ZM10.001 10.5C11.5657 10.5 12.8348 11.7684 12.835 13.333C12.835 14.8978 11.5658 16.167 10.001 16.167C8.43632 16.1668 7.16797 14.8977 7.16797 13.333C7.16814 11.7685 8.43643 10.5002 10.001 10.5ZM10.001 12C9.26486 12.0002 8.66814 12.5969 8.66797 13.333C8.66797 14.0693 9.26475 14.6668 10.001 14.667C10.7374 14.667 11.335 14.0694 11.335 13.333C11.3348 12.5968 10.7372 12 10.001 12ZM10.001 2.41699C8.04601 2.41699 7.05717 2.93971 6.52246 3.60352C5.95984 4.30235 5.75098 5.33302 5.75098 6.66699V7.58398C5.77888 7.58387 5.80687 7.58301 5.83496 7.58301H14.168C14.1957 7.58301 14.2234 7.58388 14.251 7.58398V6.66699C14.251 5.33302 14.0421 4.30235 13.4795 3.60352C12.9448 2.93971 11.9559 2.41699 10.001 2.41699Z"
                                                      fill="url(#paint0_linear_745_155)"
                                                    ></path>
                                                    <defs>
                                                      <linearGradient
                                                        id="paint0_linear_745_155"
                                                        x1="1.99456"
                                                        y1="0.916991"
                                                        x2="26.1808"
                                                        y2="6.81415"
                                                        gradientUnits="userSpaceOnUse"
                                                      >
                                                        <stop stopColor="#FECE26"></stop>
                                                        <stop
                                                          offset="1"
                                                          stopColor="#E5741F"
                                                        ></stop>
                                                      </linearGradient>
                                                    </defs>
                                                  </svg>
                                                  <span>${post.price}</span>
                                                </a>
                                              )}

                                            {/* SUBSCRIBER ONLY */}
                                            {!post.isUnlocked &&
                                              !post.isSubscribed &&
                                              post.accessType ===
                                                "subscriber" && (
                                                <a
                                                  className="btn-txt-gradient btn-outline grey-variant"
                                                  onClick={(e) => {
                                                    if (isOwnPost) {
                                                      e.preventDefault();
                                                      return;
                                                    }

                                                    setSubscriptionPlan(
                                                      "MONTHLY",
                                                    );
                                                    setShowSubscriptionModal(
                                                      true,
                                                    );
                                                  }}
                                                >
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                  >
                                                    <path
                                                      d="M13.9173 15.8167H6.08399C5.73399 15.8167 5.34232 15.5417 5.22565 15.2083L1.77565 5.55834C1.28399 4.17501 1.85899 3.75001 3.04232 4.60001L6.29232 6.92501C6.83399 7.30001 7.45065 7.10834 7.68399 6.50001L9.15065 2.59167C9.61732 1.34167 10.3923 1.34167 10.859 2.59167L12.3257 6.50001C12.559 7.10834 13.1757 7.30001 13.709 6.92501L16.759 4.75001C18.059 3.81667 18.684 4.29168 18.1507 5.80001L14.784 15.225C14.659 15.5417 14.2673 15.8167 13.9173 15.8167Z"
                                                      stroke="url(#paint0_linear_745_209)"
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    ></path>
                                                    <path
                                                      d="M5.41602 18.3333H14.5827"
                                                      stroke="url(#paint1_linear_745_209)"
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    ></path>
                                                    <path
                                                      d="M7.91602 11.6667H12.0827"
                                                      stroke="url(#paint2_linear_745_209)"
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    ></path>
                                                    <defs>
                                                      <linearGradient
                                                        id="paint0_linear_745_209"
                                                        x1="9.9704"
                                                        y1="1.65417"
                                                        x2="9.9704"
                                                        y2="15.8167"
                                                        gradientUnits="userSpaceOnUse"
                                                      >
                                                        <stop stopColor="#FFCD84"></stop>
                                                        <stop
                                                          offset="1"
                                                          stopColor="#FEA10A"
                                                        ></stop>
                                                      </linearGradient>
                                                      <linearGradient
                                                        id="paint1_linear_745_209"
                                                        x1="9.99935"
                                                        y1="18.3333"
                                                        x2="9.99935"
                                                        y2="19.3333"
                                                        gradientUnits="userSpaceOnUse"
                                                      >
                                                        <stop stopColor="#FFCD84"></stop>
                                                        <stop
                                                          offset="1"
                                                          stopColor="#FEA10A"
                                                        ></stop>
                                                      </linearGradient>
                                                      <linearGradient
                                                        id="paint2_linear_745_209"
                                                        x1="9.99935"
                                                        y1="11.6667"
                                                        x2="9.99935"
                                                        y2="12.6667"
                                                        gradientUnits="userSpaceOnUse"
                                                      >
                                                        <stop stopColor="#FFCD84"></stop>
                                                        <stop
                                                          offset="1"
                                                          stopColor="#FEA10A"
                                                        ></stop>
                                                      </linearGradient>
                                                    </defs>
                                                  </svg>
                                                  <span>For Subscribers</span>
                                                </a>
                                              )}
                                          </>
                                        </div>
                                      </div>
                                    );
                                  })}
                              </div>
                            )}
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
      </div>

      {showSubscriptionModal && (
        <SubscriptionModal
          onClose={() => setShowSubscriptionModal(false)}
          onConfirm={handleConfirmSubscription}
          plan={subscriptionPlan}
          action="subscribe"
          creator={{
            displayName: activeSubscriptionCreator?.displayName,
            userName: activeSubscriptionCreator?.userName,
            profile: activeSubscriptionCreator?.profile,
          }}
          subscription={{
            monthlyPrice: activeStoreOwner?.subscription?.monthlyPrice,
            yearlyPrice: activeStoreOwner?.subscription?.yearlyPrice,
          }}
        />
      )}

 {unlockModalPost && (
  <UnlockContentModal
    onClose={() => setUnlockModalPost(null)}
    creator={{
      displayName:
        unlockModalPost.creatorInfo?.displayName ||
        unlockModalPost.user?.displayName,
      userName:
        unlockModalPost.creatorInfo?.userName ||
        unlockModalPost.user?.userName,
      profile:
        unlockModalPost.creatorInfo?.profile ||
        unlockModalPost.user?.profile,
    }}
    post={{
      publicId: unlockModalPost.publicId,
      text: unlockModalPost.text,
      price: unlockModalPost.price,
    }}
    onConfirm={handleConfirmUnlock}
    loading={unlocking}
  />
)}

      {showPPVModal && activeStoreOwner && (
        <PPVRequestModal
          onClose={() => setShowPPVModal(false)}
          creator={{
            userId: activeStoreOwner?._id,
            displayName: activeStoreOwner?.displayName,
            userName: activeStoreOwner?.userName,
            profile: activeStoreOwner?.profile,
          }}
          post={{ _id: "" }}
          onSuccess={({ amount }) => {
            setShowPPVModal(false);
            // alert(`PPV request sent: €${amount}`);
          }}
        />
      )}

      <div
        className={`modal ${open ? "show" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-wrap video_modal">
          <button className="close-btn" onClick={handleClose}>
            <CgClose size={22} />
          </button>
          <Plyr
            options={{
              controls: [
                "play-large",
                "play",
                "progress",
                "current-time",
                "mute",
                "fullscreen",
              ],
            }}
            source={{
              type: "video",
              sources: [
                {
                  src: "https://res.cloudinary.com/drhj03nvv/video/upload/v1770026049/posts/69807440e60b526caa6da50c/1770026048286-screen-capture.webm.mkv",
                  type: "video/mp4",
                },
              ],
            }}
          />
        </div>
      </div>
    </>
  );
};

export default StorePage;
