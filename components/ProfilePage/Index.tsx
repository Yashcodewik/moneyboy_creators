"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiPost, getApiByParams, getApiWithOutQuery } from "@/utils/endpoints/common";
import {
  API_CREATOR_PROFILE,
  API_CREATOR_PROFILE_BY_ID,
  API_DELETE_POST,
  API_FOLLOWER_COUNT,
  API_GET_POSTS_BY_CREATOR,
  API_SAVE_POST,
  API_SEND_TIP,
  API_SUBSCRIBE_CREATOR,
  API_UNLOCK_POST,
  API_UNSAVE_POST,
  API_UPGRADE_SUBSCRIPTION,
} from "@/utils/api/APIConstant";
import ProfileTab from "./ProfileTab";
import { useDecryptedSession } from "@/libs/useDecryptedSession";
import { useParams, useRouter } from "next/navigation";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchFollowerCounts,
  followUserAction,
  unfollowUserAction,
} from "../../redux/other/followActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SubscriptionModal from "./SubscriptionModal";
import TipModal from "./TipModal";
import PPVRequestModal from "./PPVRequestModal";
import UnlockContentModal from "./UnlockContentModal";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { savePost, unsavePost } from "@/redux/other/savedPostsSlice";

interface User {
  _id: string;
  userId: string;
  publicId: string;
  firstName: string;
  lastName: string;
  displayName: string;
  userName: string;
  email: string;
  role: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  profile: string;
  coverImage: string;
}

interface CreatorDetails {
  _id: string;
  userId: string;
  city: string;
  country: string;
  bio: string;
  bodyType: string;
  sexualOrientation: string;
  age: string;
  eyeColor: string;
  hairColor: string;
  ethnicity: string;
  height: string;
  style: string;
  size: string;
  popularity: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface SubscriptionStatus {
  isSubscribed: boolean;
  currentPlan: "MONTHLY" | "YEARLY" | null;
  expiresAt: string | null;
  daysRemaining: number | null;
  isExpiringSoon: boolean;
}

interface ApiCreatorProfileResponse {
  user: User;
  creator: CreatorDetails;
  subscription?: {
    id: string;
    userId: string;
    monthlyPrice: number;
    yearlyPrice: number;
    ppvVideoPrice?: number;
    ppvPhotoPrice?: number;
    createdAt: string;
    updatedAt: string;
  };
  subscriptionStatus?: SubscriptionStatus;
  isFollowing?: boolean;
  followerCount?: number;
  followingCount?: number;
  postCount?: number;
}

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<string>("posts");
  const [profile, setProfile] = useState<ApiCreatorProfileResponse | null>(null);
  // const [postCount, setPostCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [layoutTab, setLayoutTab] = useState("grid");
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isFollowLoading, setIsFollowLoading] = useState<boolean>(false);
  const [subLoading, setSubLoading] = useState(false);
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({});
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"MONTHLY" | "YEARLY" | null>(null);
  const [modalAction, setModalAction] = useState<"subscribe" | "upgrade" | "renew" | null>(null);
  const [showTipModal, setShowTipModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [showPPVRequestModal, setShowPPVRequestModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [unlockLoading, setUnlockLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState<string>("all_time");

  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [unlockPost, setUnlockPost] = useState<any>(null);
  const router = useRouter();
  const params = useParams();
  const profilePublicId = params.id as string;
  const { session, status } = useDecryptedSession();
  const sessionPublicId = session?.user?.publicId;

  const copyProfileLink = async () => {
    const profileLink = `${window.location.origin}/profile/${profilePublicId}`;
    try {
      await navigator.clipboard.writeText(profileLink);
      toast.success("Profile link copied!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const [profileStats, setProfileStats] = useState({
    followerCount: 0,
    followingCount: 0,
  });

  const dispatch = useDispatch<AppDispatch>();
  const followState = useSelector((state: RootState) => state.follow);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  const isOwnProfile = sessionPublicId === profilePublicId;
  useEffect(() => {
    if (!profilePublicId || status !== "authenticated") return;
    if (!sessionPublicId) return;

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        const isOwnProfile = sessionPublicId === profilePublicId;

        const response = isOwnProfile
          ? await getApiWithOutQuery({ url: API_CREATOR_PROFILE })
          : await getApiByParams({
            url: API_CREATOR_PROFILE_BY_ID,
            params: profilePublicId,
          });

        if (response?.user && response?.creator) {
          setProfile(response);
          setIsFollowing(Boolean(response.isFollowing));
          setIsSaved(Boolean(response.isSaved));
          // setPostCount(response.postCount ?? 0);
        }
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        setError(err?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [profilePublicId, status, sessionPublicId]);

  const subStatus = profile?.subscriptionStatus;

  useEffect(() => {
    if (profile) {
      // setPostCount(profile.postCount || 0);
      setProfileStats({
        followerCount: profile.followerCount || 0,
        followingCount: profile.followingCount || 0,
      });
    }
  }, [profile]);

  useEffect(() => {
    if (!profilePublicId) return;
    dispatch(fetchFollowerCounts());
  }, [dispatch, profilePublicId]);

  const handleFollowToggle = async () => {
    const targetUserId = profile?.user?._id;
    const sessionUserId = session?.user?.id;

    if (!targetUserId || !sessionUserId || isFollowLoading) return;
    if (targetUserId === sessionUserId) return;

    setIsFollowLoading(true);

    const previousState = {
      isFollowing,
      followerCount: profileStats.followerCount,
    };

    const newFollowingState = !isFollowing;
    setIsFollowing(newFollowingState);
    setProfileStats((prev) => ({
      ...prev,
      followerCount: newFollowingState
        ? prev.followerCount + 1
        : prev.followerCount - 1,
    }));

    try {
      let result;

      if (isFollowing) {
        result = await dispatch(
          unfollowUserAction(targetUserId)
        ).unwrap();
      } else {
        result = await dispatch(
          followUserAction(targetUserId)
        ).unwrap();
      }

      // Sync count from backend if returned
      if (result?.followerCount !== undefined) {
        setProfileStats((prev) => ({
          ...prev,
          followerCount: result.followerCount,
        }));
      }

      dispatch(fetchFollowerCounts());
    } catch (error) {
      console.error("Error toggling follow:", error);

      // Rollback optimistic UI on failure
      setIsFollowing(previousState.isFollowing);
      setProfileStats((prev) => ({
        ...prev,
        followerCount: previousState.followerCount,
      }));
    } finally {
      setIsFollowLoading(false);
    }
  };


  const handleSubscribe = async (planType: "MONTHLY" | "YEARLY") => {
    if (!profile?.user?._id || subLoading) return;

    setSubLoading(true);

    const res = await apiPost({
      url: API_SUBSCRIBE_CREATOR,
      values: {
        creatorId: profile.user._id,
        planType,
      },
    });

    if (!res?.success) {
      alert(res?.message || "Subscription failed");
    }

    setSubLoading(false);
  };

  const { data: postsData, isLoading: postsLoading } = useQuery({
    queryKey: ["creator-posts", profilePublicId, search, timeFilter],
    queryFn: () =>
      getApiByParams({
        url: API_GET_POSTS_BY_CREATOR,
        params: `${profilePublicId}?search=${encodeURIComponent(
          search || ""
        )}&time=${timeFilter}`,
      }),
    enabled: !!profilePublicId,
  });




  const posts = postsData?.posts || [];
  const photoPosts = posts?.filter((post: any) =>
    post?.media?.some((m: any) => m.type === "photo")
  );
  const videoPosts = posts?.filter((post: any) =>
    post?.media?.some((m: any) => m.type === "video")
  );

  const saveCreatorMutation = useMutation({
    mutationFn: () =>
      apiPost({
        url: API_SAVE_POST,
        values: {
          creatorId: profile?.creator?._id,
        },
      }),
    onSuccess: () => {
      setIsSaved(true);
    },
  });

  const unSaveCreatorMutation = useMutation({
    mutationFn: () =>
      apiPost({
        url: API_UNSAVE_POST,
        values: {
          creatorId: profile?.creator?._id,
        },
      }),
    onSuccess: () => {
      setIsSaved(false);
    },
  });

  const handleSaveToggle = () => {
    if (!profile?.creator?._id) return;

    if (isSaved) {
      unSaveCreatorMutation.mutate();
    } else {
      saveCreatorMutation.mutate();
    }
  };

  const openTipModal = () => {
    setShowTipModal(true);
  };
  const confirmUnlockPost = async () => {
    if (!unlockPost) return;

    try {
      setUnlockLoading(true);

      const res = await apiPost({
        url: API_UNLOCK_POST,
        values: {
          postId: unlockPost._id,
          creatorId: profile?.user?._id,
        },
      });

      if (res?.success) {
        // update local post
        unlockPost.isUnlocked = true;

        setShowUnlockModal(false);
        setUnlockPost(null);

        // redirect to post
        router.push(`/post?page&publicId=${unlockPost.publicId}`);
      } else {
        alert(res?.message || "Failed to unlock post");
      }
    } finally {
      setUnlockLoading(false);
    }
  };

  


  const handleUpgrade = async (planType: "MONTHLY" | "YEARLY") => {
    if (!profile?.user?._id || subLoading) return;

    setSubLoading(true);

    const res = await apiPost({
      url: API_UPGRADE_SUBSCRIPTION,
      values: {
        creatorId: profile.user._id,
        planType,
      },
    });

    if (!res?.success) {
      alert(res?.message || "Upgrade failed");
    }

    setSubLoading(false);
  };

  const handleSendTip = async (amount: number) => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    await apiPost({
      url: API_SEND_TIP,
      values: {
        creatorId: profile?.user?._id,
        amount,
      },
    });
    setShowTipModal(false);
  };

  const openSubscriptionModal = (
    plan: "MONTHLY" | "YEARLY",
    action: "subscribe" | "upgrade" | "renew"
  ) => {
    console.log("Opening modal with:", { plan, action });
    setSelectedPlan(plan);
    setModalAction(action);
    setShowSubscriptionModal(true);
  };
  const postCount = posts.length;

  const renderSubscriptionButton = (targetPlan: "MONTHLY" | "YEARLY") => {
    if (!subStatus) return null;

    const { isSubscribed, currentPlan, isExpiringSoon } = subStatus;

    if (!isSubscribed) {
      return (
        <button
          className="btn-txt-gradient btn-outline p-sm"
          disabled={subLoading}
          onClick={() => openSubscriptionModal(targetPlan, "subscribe")}
        >
          <span>{subLoading ? "Processing..." : "Subscribe"}</span>
        </button>
      );
    }

    if (currentPlan === targetPlan) {
      if (isExpiringSoon) {
        return (
          <button
            className="btn-txt-gradient btn-outline p-sm"
            disabled={subLoading}
            onClick={() => openSubscriptionModal(targetPlan, "renew")}
          >
            <span>{subLoading ? "Processing..." : "Renew"}</span>
          </button>
        );
      }

      return (
        <button className="btn-txt-gradient btn-outline p-sm" disabled>
          <span>Subscribed</span>
        </button>
      );
    }

    if (currentPlan === "YEARLY" && targetPlan === "MONTHLY") {
      return (
        <button className="btn-txt-gradient btn-outline p-sm" disabled>
          <span>Subscribed</span>
        </button>
      );
    }

    if (currentPlan === "MONTHLY" && targetPlan === "YEARLY") {
      return (
        <button
          className="btn-txt-gradient btn-outline p-sm"
          disabled={subLoading}
          onClick={() => openSubscriptionModal(targetPlan, "upgrade")}
        >
          <span>{subLoading ? "Processing..." : "Upgrade"}</span>
        </button>
      );
    }

    return null;
  };

  const truncateText = (text: string, limit = 50) =>
    text?.length > limit ? text.slice(0, limit) : text;

  const PostCard = ({ post }: { post: any }) => {
    const isOwner =
      session?.user?.publicId === profile?.user?.publicId;

    // const isSubscribed =
    //   !!profile?.subscriptionStatus?.isSubscribed;

      const isSubscribed =
  Boolean(profile?.subscriptionStatus?.isSubscribed);
  

    const isFree = post.accessType === "free";
    const isSubscriberPost = post.accessType === "subscriber";
    const isPPVPost = post.accessType === "pay_per_view";
    

    const canViewSubscriberPost =
      isSubscriberPost && isSubscribed;

      const hideSaveBtn =
  (isPPVPost && post.isUnlocked) ||
  (isSubscriberPost && isSubscribed);

    const canViewPPVPost =
      isPPVPost && post.isUnlocked;

    const canViewContent =
      isOwner ||
      isFree ||
      canViewSubscriberPost ||
      canViewPPVPost;
    const mediaType = post?.media?.[0]?.type;

    const realMedia = post?.media?.[0]?.mediaFiles?.[0] || null;
    const firstMedia =
      realMedia || "/images/profile-avatars/profile-avatar-6.jpg";

    const hasMedia = Boolean(realMedia);
    const handlePostClick = (post: any) => {
      if (isOwner || isFree) {
        router.push(`/post?page&publicId=${post.publicId}`);
        return;
      }
      if (isSubscriberPost) {
        if (isSubscribed) {
          router.push(`/post?page&publicId=${post.publicId}`);
        }
        return;
      }
      if (isPPVPost) {
        if (post.isUnlocked) {
          router.push(`/post?page&publicId=${post.publicId}`);
        }
        return;
      }
    };
    const queryClient = useQueryClient();
    const handleDeletePost = async (postId: string) => {
      if (!postId) return;

      if (!window.confirm("Are you sure you want to delete this post?")) {
        return;
      }

      try {
        const res = await apiPost({
          url: API_DELETE_POST,
          values: { postId },
        });

        if (res?.success) {
          toast.success("Post deleted successfully");
          const updatedPosts = posts.filter((p: any) => p._id !== postId);
          queryClient.setQueryData(
            ["creator-posts", profilePublicId],
            (oldData: any) => {
              if (!oldData) return oldData;
              return {
                ...oldData,
                posts: oldData.posts.filter(
                  (p: any) => p._id !== postId
                ),
              };
            }
          );
        } else {
          toast.error(res?.message || "Failed to delete post");
        }
      } catch (err) {
        console.error("Delete post error:", err);
        toast.error("Something went wrong");
      }
    };


    const dispatch = useDispatch<AppDispatch>();

    const savedPosts = useSelector(
  (state: RootState) => state.savedPosts.savedPosts
);

const isPostSaved =
  savedPosts[post._id]?.saved ?? post.isSaved;
const saveLoading = useSelector(
  (state: RootState) => state.savedPosts.loading
);

const handleSavePost = (e: React.MouseEvent) => {
  e.stopPropagation();

  // if (saveLoading) return;

  if (isPostSaved) {
    dispatch(
      unsavePost({
        postId: post._id,
        creatorUserId: profile?.user?._id,
      })
    );
  } else {
    dispatch(
      savePost({
        postId: post._id,
        creatorUserId: profile?.user?._id,
      })
    );
  }
};
    return (
      <div className="creator-content-card-container profile_card flex_card" key={post?.publicId}>
        <div className="creator-content-card">
          <div className="creator-content-card__media" onClick={() => handlePostClick(post)}>
            <div className={`creator-card__img ${!hasMedia ? "nomedia" : ""}`}>
              {mediaType === "photo" && firstMedia && (<img src={firstMedia} alt="Creator Content" />)}
              {mediaType === "video" && firstMedia && (
                <video preload="metadata" controls={canViewContent} onClick={(e) => { if (!canViewContent) e.preventDefault(); }} style={{ width: "100%" }}>
                  <source src={firstMedia} />
                </video>
              )}
            </div>
            {!canViewContent && (
              <div className="content-locked-label" onClick={() => {
                // ONLY PPV opens modal
                if (isPPVPost && !post.isUnlocked) {
                  setUnlockPost(post);
                  setShowUnlockModal(true);
                }
              }}>
                {isSubscriberPost && !isSubscribed && (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                      <path d="M14.5413 15.8167H6.70801C6.35801 15.8167 5.96634 15.5417 5.84968 15.2083L2.39968 5.55834C1.90801 4.17501 2.48301 3.75001 3.66634 4.60001L6.91634 6.92501C7.45801 7.30001 8.07468 7.10834 8.30801 6.50001L9.77468 2.59167C10.2413 1.34167 11.0163 1.34167 11.483 2.59167L12.9497 6.50001C13.183 7.10834 13.7997 7.30001 14.333 6.92501L17.383 4.75001C18.683 3.81667 19.308 4.29168 18.7747 5.80001L15.408 15.225C15.283 15.5417 14.8913 15.8167 14.5413 15.8167Z" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6.04199 18.3333H15.2087" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8.54199 11.6667H12.7087" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span> For Subscribers </span>
                  </>
                )}
                {isPPVPost && !post.isUnlocked && (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                      <path d="M5.375 8.33335V6.66669C5.375 3.90835 6.20833 1.66669 10.375 1.66669C14.5417 1.66669 15.375 3.90835 15.375 6.66669V8.33335" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10.3753 15.4167C11.5259 15.4167 12.4587 14.4839 12.4587 13.3333C12.4587 12.1827 11.5259 11.25 10.3753 11.25C9.22473 11.25 8.29199 12.1827 8.29199 13.3333C8.29199 14.4839 9.22473 15.4167 10.3753 15.4167Z" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M14.542 18.3333H6.20866C2.87533 18.3333 2.04199 17.5 2.04199 14.1666V12.5C2.04199 9.16665 2.87533 8.33331 6.20866 8.33331H14.542C17.8753 8.33331 18.7087 9.16665 18.7087 12.5V14.1666C18.7087 17.5 17.8753 18.3333 14.542 18.3333Z" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span> ${post?.price?.toFixed(2)} </span>
                  </>
                )}
              </div>
            )}
            <div className="creator-media-card__overlay">
              <div className="creator-media-card__stats">
                {!isOwnProfile && !hideSaveBtn && (
                  <div    className={`creator-media-card__stats-btn wishlist-icon ${
      isPostSaved ? "active" : ""
    }`}
    onClick={handleSavePost}
    // disabled={saveLoading}
  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"fill={isPostSaved ? "#6c5ce7" : "none"}>
                      <path d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    {/* <span> 13 </span> */}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="creator-content-card__description">
            <p>{expandedPosts[post.publicId] ? post.text : `${truncateText(post.text)}${post.text?.length > 50 ? "..." : ""}`}</p>
          </div>
          <div className="creator-content-card__stats">
            <div className="creator-content-stat-box">
              <button className="like-button" data-like-button="">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <path d="M11.2665 17.3417C10.9832 17.4417 10.5165 17.4417 10.2332 17.3417C7.8165 16.5167 2.4165 13.075 2.4165 7.24166C2.4165 4.66666 4.4915 2.58333 7.04984 2.58333C8.5665 2.58333 9.90817 3.31666 10.7498 4.45C11.5915 3.31666 12.9415 2.58333 14.4498 2.58333C17.0082 2.58333 19.0832 4.66666 19.0832 7.24166C19.0832 13.075 13.6832 16.5167 11.2665 17.3417Z" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </button>
              <span>{post?.likeCount}</span>
            </div>
            <div className="creator-content-stat-box views-btn">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </button>
              <span>{post?.commentCount}</span>
            </div>
            {isOwner && (
              <button className="btn-danger icons" onClick={() => handleDeletePost(post._id)}><Trash2 size={28} color="#FFF" /></button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Tab content renderer
  const renderTabContent = (filterType: "all" | "video" | "photo") => {
    let filteredPosts = posts;

    if (filterType === "video") {
      filteredPosts = videoPosts;
    } else if (filterType === "photo") {
      filteredPosts = photoPosts;
    }

    return (
      <div data-multi-tabs-content-tabdata__active data-multi-dem-cards-layout>
        <div className="creator-content-filter-grid-container">
          <ProfileTab onChangeLayouts={(layout) => setLayoutTab(layout)} onSearchChange={setSearch} onTimeChange={setTimeFilter} />
          {loading && posts.length === 0 && <div className="loadingtext">{"Loading".split("").map((char, i) => (<span key={i} style={{ animationDelay: `${(i + 1) * 0.1}s` }}>{char}</span>))}</div>}
          <div className={`creator-content-cards-wrapper multi-dem-cards-wrapper-layout ${layoutTab === "list" ? "layout-list" : "layout-grid"}`} data-direct-cards-layout data-layout-toggle-rows={layoutTab === "list" ? true : undefined}>
            {!postsLoading && filteredPosts?.map((post: any) => <PostCard key={post.publicId} post={post} />)}
          </div>
        </div>
      </div>
    );
  };

  const calculateYearlySavings = (
    monthly?: number,
    yearly?: number
  ): number | null => {
    if (!monthly || !yearly) return null;

    const yearlyFromMonthly = monthly * 12;
    if (yearly >= yearlyFromMonthly) return null;

    const savingsPercent =
      ((yearlyFromMonthly - yearly) / yearlyFromMonthly) * 100;

    return Math.round(savingsPercent);
  };


  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="creator-profile-page-container">
        <div className="creator-profile-front-content-container">
          <div className="creator-profile-card-container card">
            <div className="creator-profile-banner">
              <img
                src={
                  profile?.user?.coverImage
                    ? profile.user.coverImage
                    : "/images/profile-banners/profile-banner-2.jpg"
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
                            profile?.user?.profile
                              ? profile.user.profile
                              : "/images/profile-avatars/profile-avatar-1.png"
                          }
                          alt={`${profile?.user?.displayName || "User"} Avatar`}
                        />
                      </div>
                    </div>
                    <div className="profile-card__info">
                      <div className="profile-card__name-badge">
                        <div className="profile-card__name">{profile?.user?.displayName || "Unknown Creator"}</div>
                        <div className="profile-card__badge">
                          <img src="/images/logo/profile-badge.png" alt="MoneyBoy Social Profile Badge" />
                        </div>
                      </div>
                      <div className="profile-card__username">
                        @{profile?.user?.userName || "unknown"}
                      </div>
                    </div>
                  </div>
                  <div className="creator-profile-buttons tooltip_wrapper">
                    <ul>
                      {!isOwnProfile && (
                        <li>
                          <a href="#" className={`save-btn ${isSaved ? "active" : ""}`} data-tooltip="Save profile">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                              <path d="M16.8203 2.5H7.18031C5.05031 2.5 3.32031 4.24 3.32031 6.36V20.45C3.32031 22.25 4.61031 23.01 6.19031 22.14L11.0703 19.43C11.5903 19.14 12.4303 19.14 12.9403 19.43L17.8203 22.14C19.4003 23.02 20.6903 22.26 20.6903 20.45V6.36C20.6803 4.24 18.9503 2.5 16.8203 2.5Z" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M16.8203 2.5H7.18031C5.05031 2.5 3.32031 4.24 3.32031 6.36V20.45C3.32031 22.25 4.61031 23.01 6.19031 22.14L11.0703 19.43C11.5903 19.14 12.4303 19.14 12.9403 19.43L17.8203 22.14C19.4003 23.02 20.6903 22.26 20.6903 20.45V6.36C20.6803 4.24 18.9503 2.5 16.8203 2.5Z" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M9.25 9.54999C11.03 10.2 12.97 10.2 14.75 9.54999" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </a>
                        </li>
                      )}
                      {!isOwnProfile && (
                        <li>
                          <a href="#" className="tip-btn" onClick={openTipModal} data-tooltip="Send tip">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                              <path d="M9.99 18.48C14.4028 18.48 17.98 14.9028 17.98 10.49C17.98 6.07724 14.4028 2.5 9.99 2.5C5.57724 2.5 2 6.07724 2 10.49C2 14.9028 5.57724 18.48 9.99 18.48Z" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M12.9805 20.38C13.8805 21.65 15.3505 22.48 17.0305 22.48C19.7605 22.48 21.9805 20.26 21.9805 17.53C21.9805 15.87 21.1605 14.4 19.9105 13.5" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M8 11.9C8 12.67 8.6 13.3 9.33 13.3H10.83C11.47 13.3 11.99 12.75 11.99 12.08C11.99 11.35 11.67 11.09 11.2 10.92L8.8 10.08C8.32 9.91001 8 9.65001 8 8.92001C8 8.25001 8.52 7.70001 9.16 7.70001H10.66C11.4 7.71001 12 8.33001 12 9.10001" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M10 13.35V14.09" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M10 6.91V7.69" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </a>
                        </li>
                      )}
                      <li>
                        <a href="#" className="share-btn" onClick={(e) => { e.preventDefault(); copyProfileLink(); }} data-tooltip="Share profile">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path d="M16.4405 9.39999C20.0405 9.70999 21.5105 11.56 21.5105 15.61V15.74C21.5105 20.21 19.7205 22 15.2505 22H8.74047C4.27047 22 2.48047 20.21 2.48047 15.74V15.61C2.48047 11.59 3.93047 9.73999 7.47047 9.40999" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 15.5V4.12" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15.3504 6.35L12.0004 3L8.65039 6.35" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="message-btn" data-tooltip="Message">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path d="M22 10.5V13.5C22 17.5 20 19.5 16 19.5H15.5C15.19 19.5 14.89 19.65 14.7 19.9L13.2 21.9C12.54 22.78 11.46 22.78 10.8 21.9L9.3 19.9C9.14 19.68 8.77 19.5 8.5 19.5H8C4 19.5 2 18.5 2 13.5V8.5C2 4.5 4 2.5 8 2.5H14" stroke="none" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19.5 7.5C20.8807 7.5 22 6.38071 22 5C22 3.61929 20.8807 2.5 19.5 2.5C18.1193 2.5 17 3.61929 17 5C17 6.38071 18.1193 7.5 19.5 7.5Z" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15.9965 11.5H16.0054" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11.9945 11.5H12.0035" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7.99451 11.5H8.00349" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      </li>
                      {profile && session?.user?.id && profile?.user?._id && session.user.id !== profile.user._id && (
                        <li>
                          <button className="btn-txt-gradient" onClick={handleFollowToggle} disabled={isFollowLoading} data-tooltip={isFollowing ? "Following" : "Follow"}>
                            <span> {isFollowLoading ? "Processing..." : isFollowing ? "Following" : "Follow"}</span>
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                {profile && (
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
                          strokeWidth="1.5"
                        />
                        <path
                          d="M11.9999 13.43C13.723 13.43 15.1199 12.0331 15.1199 10.31C15.1199 8.58687 13.723 7.19 11.9999 7.19C10.2768 7.19 8.87988 8.58687 8.87988 10.31C8.87988 12.0331 10.2768 13.43 11.9999 13.43Z"
                          stroke="none"
                          strokeWidth="1.5"
                        />
                      </svg>
                      <span>
                        {profile?.creator?.city || "Unknown City"},{" "}
                        {profile?.creator?.country || "Unknown Country"}
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
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 2V5"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 11H16"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 16H12"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>
                        Joined{" "}
                        {new Date(profile?.user?.createdAt || "").toLocaleString("default", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                )}
                <div className="creator-profile-stats-link">
                  <div className="profile-card__stats">
                    <div className="profile-card__stats-item posts-stats">
                      <div className="profile-card__stats-num">{postCount.toLocaleString()}</div>
                      <div className="profile-card__stats-label">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M22 10.4286V15.4286C22 20.4286 20 22.4286 15 22.4286H9C4 22.4286 2 20.4286 2 15.4286V9.42856C2 4.42856 4 2.42856 9 2.42856H14"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M22 10.4286H18C15 10.4286 14 9.42856 14 6.42856V2.42856L22 10.4286Z"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M7 13.4286H13"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M7 17.4286H11"
                            stroke="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                        <span>Posts</span>
                      </div>
                    </div>
                    <Link href={`/follower?tab=followers`}>
                      <div className="profile-card__stats-item followers-stats">
                        <div className="profile-card__stats-num">
                          {profileStats.followerCount.toLocaleString()}
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
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M16.4098 4.42859C18.3498 4.42859 19.9098 5.99859 19.9098 7.92859C19.9098 9.81859 18.4098 11.3586 16.5398 11.4286C16.4598 11.4186 16.3698 11.4186 16.2798 11.4286"
                              stroke="none"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M4.16021 14.9886C1.74021 16.6086 1.74021 19.2486 4.16021 20.8586C6.91021 22.6986 11.4202 22.6986 14.1702 20.8586C16.5902 19.2386 16.5902 16.5986 14.1702 14.9886C11.4302 13.1586 6.92021 13.1586 4.16021 14.9886Z"
                              stroke="none"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M18.3398 20.4286C19.0598 20.2786 19.7398 19.9886 20.2998 19.5586C21.8598 18.3886 21.8598 16.4586 20.2998 15.2886C19.7498 14.8686 19.0798 14.5886 18.3698 14.4286"
                              stroke="none"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                          <span>Followers</span>
                        </div>
                      </div>
                    </Link>
                    <Link href={`/follower?tab=followers`}>
                      <div className="profile-card__stats-item following-stats">
                        <div className="profile-card__stats-num">
                          {profileStats.followingCount.toLocaleString()}
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
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M7.16021 14.9886C4.74021 16.6086 4.74021 19.2486 7.16021 20.8586C9.91021 22.6986 14.4202 22.6986 17.1702 20.8586C19.5902 19.2386 19.5902 16.5986 17.1702 14.9886C14.4302 13.1586 9.92021 13.1586 7.16021 14.9886Z"
                              stroke="none"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                          <span>Following</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="creator-profile-link">
                    <a href="#" onClick={(e) => { e.preventDefault(); copyProfileLink(); }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M7.9407 14.51C7.3207 14.28 6.7707 13.83 6.4207 13.19C5.6207 11.73 6.1107 9.83001 7.5307 8.95001L9.8707 7.5C11.2807 6.62 13.1007 7.09999 13.9007 8.54999C14.7007 10.01 14.2107 11.91 12.7907 12.79L12.4807 13.01"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.1092 9.45001C16.7292 9.68001 17.2792 10.13 17.6292 10.77C18.4292 12.23 17.9392 14.13 16.5192 15.01L14.1792 16.46C12.7692 17.34 10.9492 16.86 10.1492 15.41C9.34921 13.95 9.83922 12.05 11.2592 11.17L11.5692 10.95"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span> {`${window.location.origin}/profile/${profile?.user?.userName}`} </span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="creator-profile-description">
                <p>{profile?.creator?.bio || "No bio available."}</p>
              </div>
              {profile?.subscription?.monthlyPrice && (
                <div className="creator-subscriptions-container">
                  <div className="subscriptions-container">
                    <ul>
                      <li>
                        <div className="subscription-info">
                          <div className="subscription-label">Monthly Subscription</div>
                          <div className="subscription-price">
                            <h3>${profile?.subscription?.monthlyPrice || "Not Updated yet"}</h3>
                            <span>/month</span>
                          </div>
                        </div>
                        <div className="subscripton-button">{renderSubscriptionButton("MONTHLY")}</div>
                      </li>
                      <li>
                        <div className="subscription-info">
                          <div className="subscription-label">Yearly Subscription</div>
                          <div className="subscription-price">
                            <h3>${profile?.subscription?.yearlyPrice || "Not Updated yet"}</h3>
                            <span>/year</span>
                            <div className="save-txt">
                              {(() => {
                                const savings = calculateYearlySavings(
                                  profile?.subscription?.monthlyPrice,
                                  profile?.subscription?.yearlyPrice
                                );

                                return savings ? (
                                  <>
                                    (Save {savings}%)
                                  </>
                                ) : null;
                              })()}</div>
                          </div>
                        </div>
                        <div className="subscripton-button">{renderSubscriptionButton("YEARLY")}</div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="creator-profile-page-multi-tab-section card">
            <div className="creator-profile-page-multi-tab-container">
              <div className="multi-tab-section" data-multiple-tabs-section>
                <div className="multi-tabs-layout-container">
                  <div className="multi-tabs-action-buttons">
                    <button
                      className={`multi-tab-switch-btn posts-btn ${activeTab === "posts" ? "active" : ""}`}
                      onClick={() => handleTabClick("posts")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                      >
                        <path
                          d="M22 10.5V15.5C22 20.5 20 22.5 15 22.5H9C4 22.5 2 20.5 2 15.5V9.5C2 4.5 4 2.5 9 2.5H14"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22 10.5H18C15 10.5 14 9.5 14 6.5V2.5L22 10.5Z"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 13.5H13"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 17.5H11"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Posts</span>
                    </button>

                    <button
                      className={`multi-tab-switch-btn videos-btn ${activeTab === "videos" ? "active" : ""}`}
                      onClick={() => handleTabClick("videos")}
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
                          d="M8 11H16"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 16H12"
                          stroke="none"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Videos</span>
                    </button>

                    <button
                      className={`multi-tab-switch-btn photos-btn ${activeTab === "photos" ? "active" : ""}`}
                      onClick={() => handleTabClick("photos")}
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

                    <div className="">
                      <a href="/store" className="premium-btn store-btn">
                        <img src="/images/logo/profile-badge.png" alt="Store Button Icon" />
                        <span>Store</span>
                      </a>
                    </div>
                  </div>

                  <div className="multi-tabs-content-container content-creator-profile-tabs-layout-wrapper">
                    {activeTab === "posts" && renderTabContent("all")}
                    {activeTab === "videos" && renderTabContent("video")}
                    {activeTab === "photos" && renderTabContent("photo")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSubscriptionModal && selectedPlan && modalAction && (
        <SubscriptionModal
          onClose={() => setShowSubscriptionModal(false)}
          plan={selectedPlan}
          action={modalAction}
          creator={{
            displayName: profile?.user?.displayName,
            userName: profile?.user?.userName,
            profile: profile?.user?.profile,
          }}
          subscription={profile?.subscription}
          onConfirm={async () => {
            if (modalAction === "subscribe") {
              await handleSubscribe(selectedPlan);
            } else if (modalAction === "upgrade" || modalAction === "renew") {
              await handleUpgrade(selectedPlan);
            }
            setShowSubscriptionModal(false);
          }}
        />
      )}
      {showTipModal && (
        <TipModal
          onClose={() => setShowTipModal(false)}
          onConfirm={handleSendTip}
          creator={{
            displayName: profile?.user?.displayName,
            userName: profile?.user?.userName,
            profile: profile?.user?.profile,
          }}
        />
      )}
      {showUnlockModal && unlockPost && (
        <UnlockContentModal
          onClose={() => {
            setShowUnlockModal(false);
            setUnlockPost(null);
          }}
          creator={{
            displayName: profile?.user?.displayName,
            userName: profile?.user?.userName,
            profile: profile?.user?.profile,
          }}
          post={unlockPost}
          onConfirm={confirmUnlockPost}
          loading={unlockLoading}
        />
      )}
    </div>
  );
};

export default ProfilePage;