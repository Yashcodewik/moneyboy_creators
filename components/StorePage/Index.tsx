"use client";
import React, { useState, useRef, useEffect } from "react";
import CustomSelect from "../CustomSelect";
import { timeOptions } from "../helper/creatorOptions";
import { useDecryptedSession } from "@/libs/useDecryptedSession";
import Link from "next/link";
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";
import { CgClose } from "react-icons/cg";
import AllCreators from "./AllCreators";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchAllCreators, fetchFeaturedPosts, fetchMyPaidPosts, fetchPaidContentFeed, } from "@/redux/store/Action";
import PPVRequestModal from "../ProfilePage/PPVRequestModal";
import { useRouter, useSearchParams } from "next/navigation";
import { savePost, unsavePost } from "@/redux/other/savedPostsSlice";
import { subscribeCreator, unlockPost } from "@/redux/Subscription/Action";
import UnlockContentModal from "../ProfilePage/UnlockContentModal";
import SubscriptionModal from "../ProfilePage/SubscriptionModal";
import FeaturedContentSlider from "./FeaturedSlider";
import { TbCamera } from "react-icons/tb";
import { apiPostWithMultiForm, getApiByParams } from "@/utils/endpoints/common";
import { API_GET_STORE_IMAGES, API_UPDATE_STORE_IMAGES } from "@/utils/api/APIConstant";
import ShowToast from "../common/ShowToast";
import ImageCropModal from "./ImageCropModal";
import BtnGroupTabs from "../BtnGroupTabs";
import { showTaggedUserList } from "@/utils/alert";
import { fetchWallet } from "@/redux/wallet/Action";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

// ========== Types ==========
type TimeFilter = "all_time" | "most_recent" | "today" | "last_7_days" | "last_30_days";
type SubTab = "all" | "videos" | "photos";
type MainTab = "marketplace" | "mystore";
type LayoutType = "grid" | "list";

// ========== Shared SVG Assets ==========
const MLogoSVG = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 66 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className="animate-m" d="M65.4257 49.6477L64.1198 52.8674C64.0994 52.917 64.076 52.9665 64.0527 53.0132C63.6359 53.8294 62.6681 54.2083 61.8081 53.8848C61.7673 53.8731 61.7265 53.8556 61.6886 53.8381L60.2311 53.1764L57.9515 52.1416C57.0945 51.7509 56.3482 51.1446 55.8002 50.3779C48.1132 39.6156 42.1971 28.3066 38.0271 16.454C37.8551 16.1304 37.5287 15.9555 37.1993 15.9555C36.9631 15.9555 36.7241 16.0459 36.5375 16.2325L28.4395 24.3596C28.1684 24.6307 27.8099 24.7678 27.4542 24.7678C27.4076 24.7678 27.3609 24.7648 27.3143 24.7619C27.2239 24.7503 27.1307 24.7328 27.0432 24.7065C26.8217 24.6366 26.6118 24.5112 26.4427 24.3276C23.1676 20.8193 20.6053 17.1799 18.3097 15.7369C18.1698 15.6495 18.0153 15.6057 17.8608 15.6057C17.5634 15.6057 17.2719 15.7602 17.1029 16.0313C14.1572 20.7377 11.0702 24.8873 7.75721 28.1157C7.31121 28.5471 6.74277 28.8299 6.13061 28.9115L3.0013 29.3254L1.94022 29.4683L1.66912 29.5033C0.946189 29.5994 0.296133 29.0602 0.258237 28.3314L0.00754237 23.5493C-0.0274383 22.8701 0.191188 22.2025 0.610956 21.669C1.51171 20.5293 2.39789 19.3545 3.26512 18.152C5.90032 14.3304 9.52956 8.36475 13.1253 1.39631C13.548 0.498477 14.4283 0 15.3291 0C15.8479 0 16.3727 0.163246 16.8187 0.513052L27.3799 8.76557L39.285 0.521797C39.6931 0.206971 40.1711 0.0583046 40.6434 0.0583046C41.4683 0.0583046 42.2729 0.510134 42.6635 1.32052C50.16 18.2735 55.0282 34.2072 63.6378 47.3439C63.9584 47.8336 64.0197 48.4487 63.8039 48.9851L65.4257 49.6477Z" fill="url(#mlogo_gradient)" />
    <defs>
      <linearGradient id="mlogo_gradient" x1="0" y1="27" x2="66" y2="27" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDAB0A" />
        <stop offset="0.4" stopColor="#FECE26" />
        <stop offset="1" stopColor="#FE990B" />
      </linearGradient>
    </defs>
  </svg>
);

const NoProfilePlaceholder = () => (
  <div className="noprofile">
    <MLogoSVG size={40} />
  </div>
);

const LockIcon = () => (
  <svg className="only-fill-hover-effect" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10.001 0.916992C12.2126 0.916992 13.7238 1.51554 14.6475 2.66211C15.5427 3.77366 15.751 5.24305 15.751 6.66699V7.66895C16.6879 7.79136 17.4627 8.06745 18.0312 8.63574C18.8947 9.49918 19.0849 10.8389 19.085 12.5V14.166C19.085 15.8272 18.8946 17.1668 18.0312 18.0303C17.1677 18.8935 15.8291 19.083 14.168 19.083H5.83496C4.17365 19.083 2.83421 18.8938 1.9707 18.0303C1.10735 17.1668 0.917969 15.8272 0.917969 14.166V12.5C0.917997 10.8389 1.10726 9.49918 1.9707 8.63574C2.53913 8.06742 3.31408 7.79232 4.25098 7.66992V6.66699C4.25098 5.24305 4.45925 3.77366 5.35449 2.66211C6.27812 1.51554 7.78932 0.916992 10.001 0.916992ZM5.83496 9.08301C4.1632 9.08301 3.4178 9.30991 3.03125 9.69629C2.64478 10.0828 2.418 10.8282 2.41797 12.5V14.166C2.41797 15.8378 2.64487 16.5832 3.03125 16.9697C3.41774 17.3562 4.16293 17.583 5.83496 17.583H14.168C15.8395 17.583 16.5841 17.356 16.9707 16.9697C17.3571 16.5832 17.585 15.8378 17.585 14.166V12.5C17.5849 10.8282 17.3572 10.0828 16.9707 9.69629C16.5841 9.3101 15.8393 9.08301 14.168 9.08301H5.83496ZM10.001 10.5C11.5657 10.5 12.8348 11.7684 12.835 13.333C12.835 14.8978 11.5658 16.167 10.001 16.167C8.43632 16.1668 7.16797 14.8977 7.16797 13.333C7.16814 11.7685 8.43643 10.5002 10.001 10.5ZM10.001 12C9.26486 12.0002 8.66814 12.5969 8.66797 13.333C8.66797 14.0693 9.26475 14.6668 10.001 14.667C10.7374 14.667 11.335 14.0694 11.335 13.333C11.3348 12.5968 10.7372 12 10.001 12ZM10.001 2.41699C8.04601 2.41699 7.05717 2.93971 6.52246 3.60352C5.95984 4.30235 5.75098 5.33302 5.75098 6.66699V7.58398C5.77888 7.58387 5.80687 7.58301 5.83496 7.58301H14.168C14.1957 7.58301 14.2234 7.58388 14.251 7.58398V6.66699C14.251 5.33302 14.0421 4.30235 13.4795 3.60352C12.9448 2.93971 11.9559 2.41699 10.001 2.41699Z" fill="url(#lock_gradient)" />
    <defs>
      <linearGradient id="lock_gradient" x1="1.99456" y1="0.916991" x2="26.1808" y2="6.81415" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FECE26" />
        <stop offset="1" stopColor="#E5741F" />
      </linearGradient>
    </defs>
  </svg>
);

const CrownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M13.9173 15.8167H6.08399C5.73399 15.8167 5.34232 15.5417 5.22565 15.2083L1.77565 5.55834C1.28399 4.17501 1.85899 3.75001 3.04232 4.60001L6.29232 6.92501C6.83399 7.30001 7.45065 7.10834 7.68399 6.50001L9.15065 2.59167C9.61732 1.34167 10.3923 1.34167 10.859 2.59167L12.3257 6.50001C12.559 7.10834 13.1757 7.30001 13.709 6.92501L16.759 4.75001C18.059 3.81667 18.684 4.29168 18.1507 5.80001L14.784 15.225C14.659 15.5417 14.2673 15.8167 13.9173 15.8167Z" stroke="url(#crown_g1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.41602 18.3333H14.5827" stroke="url(#crown_g2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.91602 11.6667H12.0827" stroke="url(#crown_g3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="crown_g1" x1="9.9704" y1="1.65417" x2="9.9704" y2="15.8167" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFCD84" /><stop offset="1" stopColor="#FEA10A" />
      </linearGradient>
      <linearGradient id="crown_g2" x1="9.99935" y1="18.3333" x2="9.99935" y2="19.3333" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFCD84" /><stop offset="1" stopColor="#FEA10A" />
      </linearGradient>
      <linearGradient id="crown_g3" x1="9.99935" y1="11.6667" x2="9.99935" y2="12.6667" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFCD84" /><stop offset="1" stopColor="#FEA10A" />
      </linearGradient>
    </defs>
  </svg>
);

const BookmarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LoadingText = () => (
  <div className="loadingtext">
    {"Loading".split("").map((char, i) => (
      <span key={i} style={{ animationDelay: `${(i + 1) * 0.1}s` }}>{char}</span>
    ))}
  </div>
);

const tabConfig = {
  all: {
    label: "All",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
        <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
        <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
      </svg>
    ),
  },
  videos: {
    label: "Videos",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
        <path d="M12.53 20.92H6.21C3.05 20.92 2 18.82 2 16.71V8.29002C2 5.13002 3.05 4.08002 6.21 4.08002H12.53C15.69 4.08002 16.74 5.13002 16.74 8.29002V16.71C16.74 19.87 15.68 20.92 12.53 20.92Z" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M19.5202 17.6L16.7402 15.65V9.34001L19.5202 7.39001C20.8802 6.44001 22.0002 7.02001 22.0002 8.69001V16.31C22.0002 17.98 20.8802 18.56 19.5202 17.6Z" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M11.5 11.5C12.3284 11.5 13 10.8284 13 10C13 9.17157 12.3284 8.5 11.5 8.5C10.6716 8.5 10 9.17157 10 10C10 10.8284 10.6716 11.5 11.5 11.5Z" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    ),
  },
  photos: {
    label: "Photos",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
        <path d="M9.5 22.5H15.5C20.5 22.5 22.5 20.5 22.5 15.5V9.5C22.5 4.5 20.5 2.5 15.5 2.5H9.5C4.5 2.5 2.5 4.5 2.5 9.5V15.5C2.5 20.5 4.5 22.5 9.5 22.5Z" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M9.5 10.5C10.6046 10.5 11.5 9.60457 11.5 8.5C11.5 7.39543 10.6046 6.5 9.5 6.5C8.39543 6.5 7.5 7.39543 7.5 8.5C7.5 9.60457 8.39543 10.5 9.5 10.5Z" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M3.16992 19.45L8.09992 16.14C8.88992 15.61 10.0299 15.67 10.7399 16.28L11.0699 16.57C11.8499 17.24 13.1099 17.24 13.8899 16.57L18.0499 13C18.8299 12.33 20.0899 12.33 20.8699 13L22.4999 14.4" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    ),
  },
};

// ========== Sub-components ==========
interface TaggedUsersProps {
  post: any;
}

const TaggedUsers = ({ post }: TaggedUsersProps) => {
  const taggedUsers = post?.collaboration?.taggedUsers ?? []; if (taggedUsers.length === 0) return null;
  return (
    <div className="tagview" onClick={(e) => { e.stopPropagation(); e.preventDefault(); showTaggedUserList([...(post?.collaboration?.taggedBy ? [{ user: post.collaboration.taggedBy }] : []), ...(post?.collaboration?.taggedUsers || []),]); }}>
      <ul className="taglist">
        {taggedUsers.slice(0, 2).map((tag: any, index: number) => (
          <li key={index}>
            {tag?.user?.profile ? (
              <img className="user_icons" src={tag.user.profile} alt={tag?.user?.userName || "user"} onError={(e: any) => { e.currentTarget.style.display = "none"; }} />
            ) : (
              <div className="nomedia"><span>{(tag?.user?.userName || "U").charAt(0).toUpperCase()}</span></div>
            )}
          </li>
        ))}
        {taggedUsers.length > 2 && (
          <li className="more-count">+{taggedUsers.length - 2}</li>
        )}
      </ul>
    </div>
  );
};

interface PostCardProps { post: any; isCreator: boolean; loggedInUserId: string | undefined; videoRefs: React.MutableRefObject<{ [key: string]: HTMLVideoElement }>; playingId: string | null; videoErrors: Record<string, boolean>; onPlayClick: (e: React.MouseEvent, id: string) => void; onSaveToggle: (e: React.MouseEvent, post: any) => void; onUnlock: (post: any) => void; onSubscribe: () => void; onRedirect: (post: any, isOwnPost: boolean) => void; }
const PostCard = ({ post, isCreator, loggedInUserId, videoRefs, playingId, videoErrors, onPlayClick, onSaveToggle, onUnlock, onSubscribe, onRedirect, }: PostCardProps) => {
  const media = post.media?.[0];
  const mediaType = media?.type;
  const mediaUrl = media?.mediaFiles?.[0] || "";
  const isOwnPost = isCreator && post.userId === loggedInUserId;
  const isSaved = post.isSaved;
  const isTouchDevice = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  const previewTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const playPreview = async (id: string) => {
    const video = videoRefs.current[id];
    if (!video) return;

    try {
      video.muted = true;
      video.currentTime = 0;

      await video.play();

      // ⛔ stop after 3 sec
      previewTimeouts.current[id] = setTimeout(() => {
        video.pause();
        video.currentTime = 0;
      }, 3000); // 👉 change to 2000 if you want 2 sec

    } catch (err) {
      console.log("Play blocked:", err);
    }
  };

  const stopPreview = (id: string) => {
    const video = videoRefs.current[id];
    if (!video) return;

    // clear timeout
    if (previewTimeouts.current[id]) {
      clearTimeout(previewTimeouts.current[id]);
    }

    video.pause();
    video.currentTime = 0;
  };

  useEffect(() => {
    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        video.pause();
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              video.pause();
            })
            .catch(() => { });
        }
      }
    });
  }, [mediaUrl]);

  const renderMedia = () => {
    if (mediaType === "video") {
      if (mediaUrl && !videoErrors[post._id]) {
        return (
          <div className="creator-media-card__media post_playbtn" onContextMenu={(e) => e.preventDefault()} >
            <video ref={(el) => { if (el) videoRefs.current[post._id] = el; }} src={mediaUrl} muted playsInline webkit-playsinline="true" preload="auto" onContextMenu={(e) => e.preventDefault()} // ✅ ADD HERE on video
            controlsList="nodownload"   onMouseEnter={() => { if (!isTouchDevice) playPreview(post._id); }} onMouseLeave={() => { if (!isTouchDevice) stopPreview(post._id); }} onClick={(e) => { if (!isTouchDevice) return; const video = videoRefs.current[post._id]; if (!video) return; Object.values(videoRefs.current).forEach((v) => { if (v && v !== video) { v.pause(); v.currentTime = 0; } }); video.muted = true; video.currentTime = 0; video.play().catch(() => { }); }} />
            {playingId !== post._id && (
              <Link href="#" className="ply_btn" onClick={(e) => onPlayClick(e, post._id)}><PlayCircle strokeWidth={1} size={32} /></Link>
            )}
          </div>
        );
      }
      return <div className="creator-media-card__media"><NoProfilePlaceholder /></div>;
    }

    if (mediaType === "photo") {
      return (
        <div className="creator-media-card__media"><img src={mediaUrl} alt="Post" onContextMenu={(e) => e.preventDefault()}  /></div>
      );
    }
    return <div className="creator-media-card__media"><NoProfilePlaceholder /></div>;
  };

  const renderCTA = () => {
    if (post.isUnlocked) {
      return (
        <Link href="#" className="btn-txt-gradient shimmer btn-outline grey-variant" onClick={() => onRedirect(post, isOwnPost)}><span>Purchased</span></Link>
      );
    }

    if (!post.isUnlocked && post.isSubscribed && post.accessType === "subscriber") {
      return (
        <Link href="#" className="btn-txt-gradient shimmer btn-outline grey-variant" onClick={() => onRedirect(post, isOwnPost)}><span>Subscribed</span></Link>
      );
    }

    if (!post.isUnlocked && post.accessType === "pay_per_view") {
      return (
        <Link href="#" className="btn-txt-gradient shimmer btn-outline" onClick={(e) => { if (isOwnPost) { e.preventDefault(); return; } onUnlock(post); }}><LockIcon /><span>${post.price}</span></Link>
      );
    }

    if (!post.isUnlocked && !post.isSubscribed && post.accessType === "subscriber") {
      return (
        <Link href="#" className="btn-txt-gradient shimmer btn-outline grey-variant" onClick={(e) => { if (isOwnPost) { e.preventDefault(); return; } onSubscribe(); }}>
          <CrownIcon />
          <span>For Subscribers</span>
        </Link>
      );
    }
    return null;
  };

  return (
    <div className="creator-media-card card" key={post._id}>
      <div className="creator-media-card__media-wrapper">
        {renderMedia()}
        <div className="creator-media-card__overlay">
          <div className="creator-media-card__stats">
            {!isOwnPost && !post.isUnlocked && !post.isSubscribed && (
              <div className={`creator-media-card__stats-btn wishlist-icon ${isSaved ? "active" : ""}`} onClick={(e) => onSaveToggle(e, post)}><BookmarkIcon /></div>
            )}
          </div>
        </div>
      </div>
      <div className="profile-card">
        <Link href="#" className="profile-card__main">
          <div className="profile-card__info">
            <div className="profile-card__name-badge">
              <div className="profile-card__name">{post.text}</div>
              <TaggedUsers post={post} />
            </div>
          </div>
        </Link>
      </div>
      <div className="creator-media-card__btn">{renderCTA()}</div>
    </div>
  );
};

const StorePage = () => {
  const router = useRouter();
  const { session } = useDecryptedSession();
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();

  // ========== Session & Role ==========
  const userRole = session?.user?.role;
  const isCreator = userRole === 2;
  const loggedInUserId = session?.user?.id;

  // ========== URL Params ==========
  const tabFromUrl = searchParams.get("tab") as MainTab | null;
  const creatorFromUrl = searchParams.get("creator");

  // ========== UI State ==========
  const [layout, setLayout] = useState<LayoutType>("grid");
  const [subActiveTab, setSubActiveTab] = useState<SubTab>("all");
  const [activeMainTab, setActiveMainTab] = useState<MainTab>("marketplace");
  const [search, setSearch] = useState("");
  const [time, setTime] = useState<TimeFilter>("all_time");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [creatorPage, setCreatorPage] = useState(1);

  // ========== Creator / Store State ==========
  const [selectedCreator, setSelectedCreator] = useState<any | null>(null);
  const [localSubscribed, setLocalSubscribed] = useState(false);
  const [subscriptionCreator, setSubscriptionCreator] = useState<any | null>(null);

  // ========== Modal State ==========
  const [showPPVModal, setShowPPVModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState<"MONTHLY" | "YEARLY">("MONTHLY");
  const [unlockModalPost, setUnlockModalPost] = useState<any | null>(null);

  // ========== Image State ==========
  const [storeImages, setStoreImages] = useState({ profileImage: "", coverImage: "" });
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [cropType, setCropType] = useState<"profile" | "cover" | null>(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [specialBannerError, setSpecialBannerError] = useState(false);

  // ========== Video State ==========
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [videoErrors, setVideoErrors] = useState<Record<string, boolean>>({});

  // ========== Swiper State ==========
  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // ========== Player Ref ==========
  const playerRef = useRef<any>(null);

  // ========== Derived Values ==========
  const activeStoreOwner = selectedCreator || session?.user;
  const activeSubscriptionCreator = subscriptionCreator || activeStoreOwner;
  const profilePublicId = activeStoreOwner?.publicId;
  const isOwnStore = isCreator && activeStoreOwner?.publicId === session?.user?.publicId;
  const isSubscribed = localSubscribed || !!activeStoreOwner?.isSubscribed;

  // ========== Redux State ==========
  const { featuredPosts } = useSelector((state: RootState) => state.creators);
  const { items: creators } = useSelector((state: RootState) => state.creators);
  const { paidPosts, loadingPaidPosts, paidPostsPagination } = useSelector((state: RootState) => state.creators);
  const { creatorsPagination } = useSelector((state: RootState) => state.creators);
  const { unlocking } = useSelector((state: RootState) => state.subscription);

  const totalPages = paidPostsPagination?.totalPages || 1;

  // ========== Effects ==========
  useEffect(() => {
    if (tabFromUrl === "marketplace" || tabFromUrl === "mystore") { setActiveMainTab(tabFromUrl); return; }
    if (creatorFromUrl) { setActiveMainTab("marketplace"); return; }
    setActiveMainTab(isCreator ? "mystore" : "marketplace");
  }, [tabFromUrl, creatorFromUrl, isCreator]);
  useEffect(() => {
    dispatch(fetchAllCreators({
      page: creatorPage,
      creatorPublicId: creatorFromUrl || undefined
    }));
  }, [dispatch, creatorPage, creatorFromUrl]);
  useEffect(() => {
    if (!creatorFromUrl || !creators?.length) return;
    const creator = creators.find((c) => c.publicId === creatorFromUrl);
    if (creator) setSelectedCreator(creator);
  }, [creatorFromUrl, creators]);
  useEffect(() => {
    if (!activeStoreOwner?.publicId) return;
    dispatch(fetchMyPaidPosts({ page, limit: 8, search, time, publicId: activeStoreOwner.publicId, type: subActiveTab === "videos" ? "video" : subActiveTab === "photos" ? "photo" : "all", }));
  }, [dispatch, page, search, time, activeStoreOwner?.publicId, subActiveTab]);
  useEffect(() => {
    if (!profilePublicId) return;
    dispatch(fetchFeaturedPosts({ publicId: profilePublicId, limit: 5 }));
  }, [dispatch, profilePublicId]);
  useEffect(() => {
    const userId = selectedCreator?._id || selectedCreator?.id || session?.user?.id;
    if (!userId) return;
    const fetchStoreImages = async () => {
      const res = await getApiByParams({ url: API_GET_STORE_IMAGES, params: userId });
      if (res?.success && res.data) { setStoreImages({ profileImage: res.data.profileImage || "", coverImage: res.data.coverImage || "" }); }
    };
    fetchStoreImages();
  }, [activeStoreOwner?._id, activeStoreOwner?.id]);
  useEffect(() => { setStoreImages({ profileImage: "", coverImage: "" }); }, [activeStoreOwner?._id]);
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, [creators]);

  // ========== Handlers ==========
  const handleClose = () => {
    const video: HTMLVideoElement | undefined = playerRef.current?.media;
    video?.pause();
    setOpen(false);
  };
  const handlePlayClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const video = videoRefs.current[id];
    if (!video) return;
    Object.entries(videoRefs.current).forEach(([key, v]) => { if (v && key !== id) { v.pause(); v.currentTime = 0; } });
    if (video.paused) {
      video.muted = false; video.play(); setPlayingId(id);
    } else { video.pause(); setPlayingId(null); }
  };
  const handleCreatorClick = (creator: any) => { setSelectedCreator(selectedCreator?.publicId === creator.publicId ? null : creator); };
  const handlePostRedirect = (post: any, isOwnPost: boolean) => {
    if (post.isUnlocked || post.isSubscribed || isOwnPost) { router.push(`/purchased-media?publicId=${post.publicId}`); }
  };
  const handleSaveToggle = async (e: React.MouseEvent, post: any) => {
    e.stopPropagation();
    await dispatch(post.isSaved ? unsavePost({ postId: post._id, creatorUserId: post.userId }) : savePost({ postId: post._id, creatorUserId: post.userId }));
  };

  const refreshPosts = () => {
    if (!activeStoreOwner?.publicId) return;
    dispatch(fetchMyPaidPosts({
      page: 1,
      limit: 8,
      search,
      time,
      publicId: activeStoreOwner.publicId,
      type: subActiveTab === "videos" ? "video" : subActiveTab === "photos" ? "photo" : "all",
    }));
    dispatch(fetchFeaturedPosts({ publicId: activeStoreOwner.publicId, limit: 5 }));
  };

  const handleConfirmUnlock = async (paymentMethod: "wallet" | "card") => {
    if (!unlockModalPost || !activeStoreOwner?.publicId) return;
    const res = await dispatch(unlockPost({
      postId: unlockModalPost._id,
      creatorId: unlockModalPost.userId,
      paymentMethod,
    }));
    if (unlockPost.fulfilled.match(res)) {
      router.push(`/purchased-media?publicId=${unlockModalPost.publicId}`);
      refreshPosts();
      if (paymentMethod === "wallet") dispatch(fetchWallet());
    }
    setUnlockModalPost(null);
  };

  const handleConfirmSubscription = async () => {
    if (!activeSubscriptionCreator?._id) return;
    const res = await dispatch(subscribeCreator({
      creatorId: activeSubscriptionCreator._id,
      planType: subscriptionPlan,
    }));
    if (subscribeCreator.fulfilled.match(res)) {
      setLocalSubscribed(true);
      refreshPosts();
      dispatch(fetchPaidContentFeed({ page: 1, limit: 8, tab: "new" }));
    }
    setShowSubscriptionModal(false);
    setSubscriptionCreator(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "profile" | "cover") => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCropImageSrc(reader.result as string);
      setCropType(type);
      setShowCropModal(true);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleCropSave = async (croppedBase64: string) => {
    if (!cropType) return;
    const res = await fetch(croppedBase64);
    const blob = await res.blob();
    const file = new File([blob], "cropped-image.jpg", { type: blob.type });
    const formData = new FormData();
    if (cropType === "profile") formData.append("profileImage", file);
    if (cropType === "cover") formData.append("coverImage", file);
    const uploadRes = await apiPostWithMultiForm({ url: API_UPDATE_STORE_IMAGES, values: formData });
    if (uploadRes?.success) {
      ShowToast("Image updated successfully", "success");
      setStoreImages((prev) => ({
        ...prev,
        ...(cropType === "profile" ? { profileImage: uploadRes.data.profileImage } : { coverImage: uploadRes.data.coverImage }),
      }));
    }
    setShowCropModal(false);
    setCropImageSrc(null);
    setCropType(null);
  };

  const handleSubscribeClick = (post?: any) => {
    if (post?.creatorInfo) setSubscriptionCreator(post.creatorInfo);
    setSubscriptionPlan("MONTHLY");
    setShowSubscriptionModal(true);
  };

  // ========== Filtered Posts ==========
  const getFilteredPosts = () => {
    if (subActiveTab === "videos") return paidPosts.filter((p) => p.media?.[0]?.type === "video");
    if (subActiveTab === "photos") return paidPosts.filter((p) => p.media?.[0]?.type === "photo");
    return paidPosts;
  };

  // ========== Pagination ==========
  const renderPagination = () => {
    if (!totalPages || totalPages <= 1) return null;
    const pages: (number | string)[] = [];
    const start = Math.max(1, page - 1);
    const end = Math.min(totalPages, page + 1);
    if (start > 1) { pages.push(1); if (start > 2) pages.push("..."); }
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages) { if (end < totalPages - 1) pages.push("..."); pages.push(totalPages); }

    return (
      <div className="pagination_wrap">
        <button className="btn-prev" disabled={page === 1 || loadingPaidPosts} onClick={() => !loadingPaidPosts && setPage(page - 1)}><ChevronLeft size={18} /></button>
        {pages.map((p, i) =>
          p === "..." ? (
            <button key={i} className="premium-btn shimmer" disabled><span>…</span></button>
          ) : (
            <button key={i} className={page === p ? "premium-btn shimmer" : "btn-primary"} onClick={() => !loadingPaidPosts && p !== page && setPage(p as number)}><span>{p}</span></button>
          )
        )}
        <button className="btn-next" disabled={page === totalPages || loadingPaidPosts} onClick={() => !loadingPaidPosts && setPage(page + 1)}><ChevronRight size={18} /></button>
      </div>
    );
  };

  // ========== Post Card Shared Props ==========
  const sharedCardProps = { isCreator, loggedInUserId, videoRefs, playingId, videoErrors, onPlayClick: handlePlayClick, onSaveToggle: handleSaveToggle, onUnlock: (post: any) => setUnlockModalPost(post), onSubscribe: () => handleSubscribeClick(), onRedirect: handlePostRedirect, };

  return (
    <>
      <div className="moneyboy-2x-1x-layout-container">
        <div className="moneyboy-2x-1x-a-layout">
          <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers">
            {/* ========== Tab Switcher ========== */}
            <BtnGroupTabs activeTab={activeMainTab} onChange={(value) => {
              setActiveMainTab(value as MainTab); setSelectedCreator(null); const params = new URLSearchParams(searchParams.toString()); params.set("tab", value); router.push(`/store?${params.toString()}`);
            }}
              tabs={isCreator ? [{ key: "mystore", label: "My store", img: "/images/logo/profile-badge.png" }, { key: "marketplace", label: "Marketplace" },] : [{ key: "marketplace", label: "Marketplace" }]} />

            {/* ========== Marketplace Tab ========== */}
            {activeMainTab === "marketplace" && (
              <div className="marketplace_wrap">
                {/* Creators Swiper */}
                <div className="story_wrap">
                  <div className="st_head">
                    <div className="head_text">
                      <h5 className="flex items-end justify-center"><img src="/images/logo/profile-badge.png" alt="M Icons" className="max-w-22" />{" "}Creators</h5>
                      <div className="btn-controls">
                        <button
                          className="moneyboy-swiper-control-btn"
                          disabled={isBeginning && creatorPage === 1}
                          onClick={() => {
                            if (isBeginning && creatorPage > 1) {
                              setCreatorPage((prev) => prev - 1);
                            } else {
                              swiperRef.current?.slidePrev();
                            }
                          }}
                        >
                          <ChevronLeft size={18} />
                        </button>

                        <button
                          className="moneyboy-swiper-control-btn"
                          disabled={isEnd && creatorPage === creatorsPagination?.totalPages}
                          onClick={() => {
                            if (isEnd && creatorPage < creatorsPagination?.totalPages) {
                              setCreatorPage((prev) => prev + 1);
                            } else {
                              swiperRef.current?.slideNext();
                            }
                          }}
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                    <Swiper
                      onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                      }}
                      onSlideChange={(swiper) => {
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                      }}
                      onReachEnd={() => {
  if (creatorPage < creatorsPagination?.totalPages) {
    setCreatorPage((prev) => prev + 1);
  }
}}
                      onReachBeginning={() => setIsBeginning(true)}
                      slidesPerView="auto"
                      spaceBetween={0}
                      watchOverflow={true}
                      observer={true}
                      observeParents={true}
                      className="creators-swiper"
                    >
                      {creators.map((creator) => (
                        <SwiperSlide key={creator._id} style={{ width: "auto" }}>
                          <div
                            className={`creator-item ${selectedCreator?.publicId === creator.publicId ? "active" : ""
                              }`}
                            onClick={() => handleCreatorClick(creator)}
                          >
                            <div className="icons_wrap">
                              {creator.profile ? (
                                <img
                                  src={creator.profile}
                                  alt={creator.displayName}
                                  className="creator-avatar"
                                />
                              ) : (
                                <NoProfilePlaceholder />
                              )}
                            </div>
                            <span>{creator.displayName}</span>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
                {!selectedCreator && (
                  <>
                    <div className="store-page-wrapper">
                      <div className="hero-type-card-wrapper">
                        <div className="hero-type-card-container">
                          <div className="hero-type-card--bg-img"><img src="/images/marketplace_posterfront.png" alt="Store Banner" /></div>
                          <div className="hero-type-card--content-container">
                            <h2>Unlock exclusive content</h2>
                            <div className="hero-type-card--desc"><p>Discover Top Moneyboys, Trending & New Content photos, videos.</p></div>
                            {/* <button className="btn-txt-gradient shimmer btn-outline p-sm"><span>Shop Now</span></button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <AllCreators onUnlock={(post) => setUnlockModalPost(post)} onSubscribe={(post) => handleSubscribeClick(post)} />
                  </>
                )}
              </div>
            )}

            {/* ========== Store Header (My Store or Selected Creator) ========== */}
            {(activeMainTab === "mystore" || selectedCreator) && (
              <div className="moneyboy-feed-page-cate-buttons card store-page-header-wrapper" id="posts-tabs-btn-card">
                <div className="store-page-header">
                  <div className="store-page-header-bg-img">
                    <img src="/images/element-assets/store-page-header-bg.jpg" alt="Store Header BG" />
                  </div>
                  <div className="store-page-header-content-wrapper">
                    <div className="store-page-header--profile">
                      <div className="profile-card">
                        <Link href={`/${activeStoreOwner?.userName}`}>
                          <div className="profile-card__main">
                            <div className="profile-card__avatar-settings">
                              <div className="profile-card__avatar">
                                {activeStoreOwner.profile ? (
                                  <img src={activeStoreOwner.profile} alt={activeStoreOwner.displayName || "User"} />
                                ) : (
                                  <NoProfilePlaceholder />
                                )}
                              </div>
                            </div>
                            <div className="profile-card__info">
                              <div className="profile-card__name-badge">
                                <div className="profile-card__name">{activeStoreOwner?.displayName}</div>
                                <div className="profile-card__badge"><img src="/images/logo/profile-badge.png" alt="MoneyBoy Badge" /></div>
                              </div>
                              <div className="profile-card__username">@{activeStoreOwner?.userName}</div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="store-page-header-tag">
                      <img src="/images/logo/profile-badge.png" alt="Store Icon" />
                      <span>My Store</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========== Store Body ========== */}
            {(activeMainTab === "mystore" || selectedCreator) && (
              <div className="store-page-wrapper">

                {/* PPV Hero Card */}
                <div className="hero-type-card-wrapper">
                  <div className="hero-type-card-container">
                    <div className="hero-type-card--bg-img">
                      {storeImages.coverImage || activeStoreOwner.coverImage ? (
                        <img
                          src={storeImages.coverImage || activeStoreOwner.coverImage}
                          alt={`${session?.user?.displayName || "User"} Cover`}
                        />
                      ) : (
                        <div className="nomedia" />
                      )}
                    </div>
                    <div className="hero-type-card--content-container">
                      {isOwnStore && (
                        <div className="edit_image">
                          <input type="file" hidden accept="image/*" id="coverUpload" onChange={(e) => handleImageUpload(e, "cover")} />
                          <label htmlFor="coverUpload" className="imgicons active-down-effect-2x">
                            <TbCamera size={16} />
                          </label>
                        </div>
                      )}
                      <h2>PPV Request</h2>
                      <h4>Want Something Special?</h4>
                      <div className="hero-type-card--cta-box">
                        <p>Request a custom photo or video directly from this MoneyBoy</p>
                        <div>
                          <button
                            disabled={isOwnStore}
                            className="btn-txt-gradient shimmer btn-outline p-sm"
                            onClick={() => setShowPPVModal(true)}
                          >
                            <span>Request PPV</span>
                          </button>
                        </div>
                      </div>
                      <div className="hero-type-card--desc">
                        <p>Prices Vary Based on Your Request.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Featured Content */}
                {featuredPosts?.length > 0 && (
                  <div className="moneyboy-swiper-wrapper" data-moneyboy-swiper>
                    <div className="moneyboy-swiper-container w-full">
                      <div className="moneyboy-swiper-header">
                        <h3 className="section-heading-label">Featured contents</h3>
                        <div className="moneyboy-swiper-controls">
                          <button className="moneyboy-swiper-control-btn prev-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75ZM13.7891 7.93848C13.4958 7.64639 13.0209 7.64736 12.7285 7.94043L9.20898 11.4697C8.91713 11.7624 8.91722 12.2366 9.20898 12.5293L12.7285 16.0596C13.021 16.3528 13.4958 16.353 13.7891 16.0605C14.0822 15.7681 14.0834 15.2933 13.791 15L10.7988 11.999L13.791 8.99902C14.0831 8.70569 14.0823 8.23084 13.7891 7.93848Z" fill="url(#prev_gradient)" />
                              <defs>
                                <linearGradient id="prev_gradient" x1="21.4759" y1="1.25" x2="-7.14787" y2="8.22874" gradientUnits="userSpaceOnUse">
                                  <stop stopColor="#FECE26" /><stop offset="1" stopColor="#E5741F" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </button>
                          <button className="moneyboy-swiper-control-btn next-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path d="M12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM10.2109 7.93848C10.5042 7.64639 10.9791 7.64736 11.2715 7.94043L14.791 11.4697C15.0829 11.7624 15.0828 12.2366 14.791 12.5293L11.2715 16.0596C10.979 16.3528 10.5042 16.353 10.2109 16.0605C9.91775 15.7681 9.91656 15.2933 10.209 15L13.2012 11.999L10.209 8.99902C9.91685 8.70569 9.91774 8.23084 10.2109 7.93848Z" fill="url(#next_gradient)" />
                              <defs>
                                <linearGradient id="next_gradient" x1="2.52411" y1="1.25" x2="31.1479" y2="8.22874" gradientUnits="userSpaceOnUse">
                                  <stop stopColor="#FECE26" /><stop offset="1" stopColor="#E5741F" />
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
                          onSubscribe={() => handleSubscribeClick()}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Subscribe Banner */}
                <div className="moneyboy-special-content-banner-wrapper card">
                  <div className="moneyboy-special-content-banner-container">
                    <div className="moneyboy-special-content-banner--content">
                      <h2>Get exclusive access</h2>
                      <p>Subscribe to unlock everything from this creator.</p>
                      <a
                        href="#"
                        className="btn-txt-gradient shimmer btn-outline"
                        onClick={(e) => {
                          e.preventDefault();
                          if (isOwnStore || isSubscribed) return;
                          handleSubscribeClick();
                        }}
                      >
                        <LockIcon />
                        <span>{isOwnStore ? "Your Store" : isSubscribed ? "Subscribed" : "Subscribe Now"}</span>
                      </a>
                    </div>
                    <div className="moneyboy-special-content-banner--img-wrapper">
                      {isOwnStore && (
                        <div className="edit_image">
                          <input type="file" hidden accept="image/*" id="profileUpload" onChange={(e) => handleImageUpload(e, "profile")} />
                          <label htmlFor="profileUpload" className="imgicons active-down-effect-2x">
                            <TbCamera size={16} />
                          </label>
                        </div>
                      )}
                      {(storeImages.profileImage || activeStoreOwner?.profile) && !specialBannerError ? (
                        <img
                          src={storeImages.profileImage || activeStoreOwner.profile}
                          alt={`${activeStoreOwner.displayName || "User"} Profile`}
                          onError={() => setSpecialBannerError(true)}
                        />
                      ) : (
                        <NoProfilePlaceholder />
                      )}
                      <div className="text-overlay">
                        <p>Unlock the full experience with a subscription</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* All Contents */}
                <h3 className="section-heading-label">All Contents</h3>
                <div>
                  <div className="tabs-content-wrapper-layout">
                    <div data-multi-dem-cards-layout>
                      <div className="creator-content-filter-grid-container" data-multiple-tabs-section>

                        {/* Filters */}
                        <div className="filters-card-wrapper card">
                          <div className="search-features-grid-btns has-multi-tabs-btns">
                            {/* Search */}
                            <div className="creator-content-search-input">
                              <div className="label-input">
                                <div className="input-placeholder-icon">
                                  <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14 5H20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14 8H17" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                                {(Object.keys(tabConfig) as SubTab[]).map((tab) => {
                                  const config = tabConfig[tab]; return (
                                    <button key={tab} className={`multi-tab-switch-btn ${tab}-btn ${subActiveTab === tab ? "active" : ""}`} onClick={() => setSubActiveTab(tab)}>
                                      {config.icon} <span>{config.label}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Time Filter + Layout Toggle */}
                            <div className="creater-content-filters-layouts">
                              <div className="creator-content-select-filter">
                                <CustomSelect className="bg-white p-sm size-sm" label="All Time" options={timeOptions} value={time} searchable={false} onChange={(value) => { if (typeof value === "string") setTime(value as TimeFilter); }} />
                              </div>
                              <div className="creator-content-grid-layout-options" data-multi-dem-cards-layout-btns>
                                <button className={`creator-content-grid-layout-btn ${layout === "grid" ? "active" : "inactive"}`} onClick={() => setLayout("grid")}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z" fill="none" />
                                    <path d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z" fill="none" />
                                    <path d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z" fill="none" />
                                    <path d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z" fill="none" />
                                  </svg>
                                </button>
                                <button className={`creator-content-grid-layout-btn ${layout === "list" ? "active" : "inactive"}`} onClick={() => setLayout("list")}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M19.9 13.5H4.1C2.6 13.5 2 14.14 2 15.73V19.77C2 21.36 2.6 22 4.1 22H19.9C21.4 22 22 21.36 22 19.77V15.73C22 14.14 21.4 13.5 19.9 13.5Z" stroke="none" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M19.9 2H4.1C2.6 2 2 2.64 2 4.23V8.27C2 9.86 2.6 10.5 4.1 10.5H19.9C21.4 10.5 22 9.86 22 8.27V4.23C22 2.64 21.4 2 19.9 2Z" stroke="none" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Cards Grid */}
                        <div className="creator-content-cards-wrapper multi-dem-cards-wrapper-layout store_card" data-layout-toggle-rows={layout === "list" ? true : undefined}>
                          <div className="creator-content-type-container-wrapper" data-multi-tabs-content-tabdata__active>
                            {loadingPaidPosts && <LoadingText />}
                            <div className="col-4-cards-layout">
                              {!loadingPaidPosts && getFilteredPosts().map((post) => (
                                <PostCard key={post._id} post={post} {...sharedCardProps} />
                              ))}
                              {!loadingPaidPosts && getFilteredPosts().length === 0 && (
                                <div className="nofound grid-span-4">
                                  <h3 className="first">No media found</h3>
                                  <h3 className="second">No media found</h3>
                                </div>
                              )}
                            </div>
                            {renderPagination()}
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

      {/* ========== Modals ========== */}
      {showSubscriptionModal && (
        <SubscriptionModal onClose={() => setShowSubscriptionModal(false)} onConfirm={handleConfirmSubscription} plan={subscriptionPlan} setPlan={setSubscriptionPlan} action="subscribe" creator={{ displayName: activeSubscriptionCreator?.displayName, userName: activeSubscriptionCreator?.userName, profile: activeSubscriptionCreator?.profile, }} subscription={{ monthlyPrice: activeSubscriptionCreator?.subscription?.monthlyPrice, yearlyPrice: activeSubscriptionCreator?.subscription?.yearlyPrice, }} />
      )}
      {unlockModalPost && (
        <UnlockContentModal onClose={() => setUnlockModalPost(null)} creator={{ displayName: unlockModalPost.creatorInfo?.displayName || unlockModalPost.user?.displayName, userName: unlockModalPost.creatorInfo?.userName || unlockModalPost.user?.userName, profile: unlockModalPost.creatorInfo?.profile || unlockModalPost.user?.profile, }}
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
          show={showPPVModal}
          onClose={() => setShowPPVModal(false)}
          creator={{
            userId: activeStoreOwner?._id,
            displayName: activeStoreOwner?.displayName,
            userName: activeStoreOwner?.userName,
            profile: activeStoreOwner?.profile,
          }}
          post={{ _id: "" }}
          onSuccess={() => setShowPPVModal(false)}
        />
      )}
      {/* Video Modal */}
      <div className={`modal ${open ? "show" : ""}`} role="dialog" aria-modal="true">
        <div className="modal-wrap video_modal">
          <button className="close-btn" onClick={handleClose}>
            <CgClose size={22} />
          </button>
          <Plyr
            ref={playerRef}
            options={{ controls: ["play-large", "play", "progress", "current-time", "mute", "fullscreen"] }}
            source={{
              type: "video",
              sources: [
                {
                  src: "https://res.cloudinary.com/drhj03nvv/video/upload/v1770026049/posts/69807440e60b526caa6da50c/1770026048286-screen-capture.webm.mkv",
                  type: "video/webm",
                },
              ],
            }}
          />
        </div>
      </div>
      {/* Crop Modal */}
      {showCropModal && cropImageSrc && (
        <ImageCropModal
          show={showCropModal}
          image={cropImageSrc}
          aspect={cropType === "profile" ? 1 : 16 / 9}
          onClose={() => {
            setShowCropModal(false);
            setCropImageSrc(null);
            setCropType(null);
          }}
          onSave={handleCropSave}
        />
      )}
    </>
  );
};

export default StorePage;