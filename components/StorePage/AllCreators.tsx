import {
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
  FlameIcon,
  Image,
  PlayCircle,
  Sparkles,
  Video,
} from "lucide-react";
import React, { useRef, useState } from "react";
import CustomSelect from "../CustomSelect";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { fetchPaidContentFeed } from "@/redux/store/Action";
import { useRouter } from "next/navigation";

interface AllCreatorsProps {
  onUnlock: (post: any) => void;
  onSubscribe: (post: any) => void;
}

const AllCreators = ({ onUnlock, onSubscribe }: AllCreatorsProps) => {
  const router = useRouter();
  const [subActiveTab, setSubActiveTab] = useState<
    "trending" | "new" | "photos" | "videos"
  >("trending");
  const playerRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { paidContentFeed, loadingPaidContentFeed, paidContentFeedPagination } =
    useSelector((state: RootState) => state.creators);

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

  const handleClose = () => {
    const video: HTMLVideoElement | undefined = playerRef.current?.media;
    video?.pause();
    setOpen(false);
  };

  useEffect(() => {
    let tabParam: "trending" | "new" = "new";
    let typeParam: "photo" | "video" | "all" = "all";

    if (subActiveTab === "trending") {
      tabParam = "trending";
    }

    if (subActiveTab === "photos") {
      typeParam = "photo";
    }

    if (subActiveTab === "videos") {
      typeParam = "video";
    }

    dispatch(
      fetchPaidContentFeed({
        page: 1,
        limit: 8,
        tab: tabParam,
        type: typeParam,
      }),
    );
  }, [subActiveTab, dispatch]);

  const getPostLink = (post: any) => {
    if (
      (post.accessType === "subscriber" && post.isSubscribed === true) ||
      (post.accessType === "pay_per_view" && post.isUnlocked === true)
    ) {
      return `/post?publicId=${post.publicId}`;
    }

    return "#"; // no access
  };

  return (
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
                    <input type="text" placeholder="Enter keyword here" />
                  </div>
                </div>
                <div className="creater-content-filters-layouts gap-5">
                  <div className="creator-content-select-filter">
                    <CustomSelect
                      className="bg-white p-sm size-sm"
                      label="Filter By"
                      searchable={false}
                      options={[
                        { label: "options 1", value: "options1" },
                        { label: "options 2", value: "options2" },
                      ]}
                    />
                  </div>
                  <div className="creator-content-select-filter">
                    <CustomSelect
                      className="bg-white p-sm size-sm"
                      label="Sort By"
                      searchable={false}
                      options={[
                        { label: "options 1", value: "options1" },
                        { label: "options 2", value: "options2" },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className="creator-content-tabs-btn-wrapper">
                <div className="multi-tabs-action-buttons">
                  <button
                    className={`multi-tab-switch-btn ${
                      subActiveTab === "trending" ? "active" : ""
                    }`}
                    onClick={() => setSubActiveTab("trending")}
                  >
                    <ChartNoAxesCombined size={18} /> <span>Trending</span>
                  </button>

                  <button
                    className={`multi-tab-switch-btn ${
                      subActiveTab === "new" ? "active" : ""
                    }`}
                    onClick={() => setSubActiveTab("new")}
                  >
                    <Sparkles size={18} /> <span>New</span>
                  </button>

                  <button
                    className={`multi-tab-switch-btn ${
                      subActiveTab === "photos" ? "active" : ""
                    }`}
                    onClick={() => setSubActiveTab("photos")}
                  >
                    <Image size={18} /> <span>Photos</span>
                  </button>

                  <button
                    className={`multi-tab-switch-btn ${
                      subActiveTab === "videos" ? "active" : ""
                    }`}
                    onClick={() => setSubActiveTab("videos")}
                  >
                    <Video size={18} />
                    <span>Videos</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="creator-content-cards-wrapper multi-dem-cards-wrapper-layout">
              <div className="creator-content-type-container-wrapper">
                {loadingPaidContentFeed && (
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
                  {!loadingPaidContentFeed &&
                    paidContentFeed.map((post) => (
                      <div className="creator-media-card card" key={post._id}>
                        <div className="creator-media-card__media-wrapper">
                          <div className="creator-media-card__media">
                            {post.media?.type === "photo" ? (
                              <img
                                alt="Post Image"
                                src={post.media?.mediaFiles?.[0]}
                              />
                            ) : (
                              <video src={post.media?.mediaFiles?.[0]} muted />
                            )}

                            {post.media?.type === "video" && (
                              <Link
                                href="#"
                                className="ply_btn"
                                onClick={handleOpenFullscreen}
                              >
                                <PlayCircle strokeWidth={1} size={32} />
                              </Link>
                            )}
                          </div>

                          <div className="creator-media-card__overlay">
                            <div className="creator-media-card__stats">
                              {subActiveTab === "trending" && (
                                <div className="creator-media-card__stats-btn">
                                  <FlameIcon />
                                  <span> Trending </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="creator-media-card__desc">
                          <h5>
                            {post.text
                              ? post.text.slice(0, 30) +
                                (post.text.length > 30 ? "..." : "")
                              : "Untitled"}
                          </h5>
                          <p>By {post.creatorInfo?.displayName}</p>
                        </div>

                        <div className="creator-media-card__btn">
                          {post.accessType === "pay_per_view" &&
                            post.isUnlocked !== true && (
                              <h5>
                                From <span>${post.price}</span>
                              </h5>
                            )}

                          {/* <Link
                            href="#"
                            className="btn-txt-gradient btn-outline"
                          >
                            <span>
                              {post.accessType === "subscriber"
                                ? post.isSubscribed === true
                                  ? "Subscribed"
                                  : "Subscribe"
                                : post.isUnlocked === true
                                  ? "Purchased"
                                  : "Buy"}
                            </span>
                          </Link> */}

                      <Link
  href="#"
  className="btn-txt-gradient btn-outline"
  onClick={(e) => {
    e.preventDefault();

    // ✅ If already has access → redirect
    if (
      (post.accessType === "subscriber" && post.isSubscribed) ||
      (post.accessType === "pay_per_view" && post.isUnlocked)
    ) {
      router.push(`/post?publicId=${post.publicId}`);
      return;
    }

    // 🔓 Pay per view → open unlock modal
    if (post.accessType === "pay_per_view") {
      onUnlock(post);
      return;
    }

    // 💳 Subscriber only → open subscription modal
    if (post.accessType === "subscriber") {
      onSubscribe(post);
      return;
    }
  }}
>

                            <span>
                              {post.accessType === "subscriber"
                                ? post.isSubscribed === true
                                  ? "Subscribed"
                                  : "Subscribe"
                                : post.isUnlocked === true
                                  ? "Purchased"
                                  : "Buy"}
                            </span>
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCreators;
