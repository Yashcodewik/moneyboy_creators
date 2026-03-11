import {
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
  CircleArrowLeft,
  CircleArrowRight,
  FlameIcon,
  Image,
  PlayCircle,
  Sparkle,
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
import { Plyr } from "plyr-react";
import { useDecryptedSession } from "@/libs/useDecryptedSession";
import { showTaggedUserList } from "@/utils/alert";

interface AllCreatorsProps {
  onUnlock: (post: any) => void;
  onSubscribe: (post: any) => void;
}

const AllCreators = ({ onUnlock, onSubscribe }: AllCreatorsProps) => {
  const router = useRouter();
  const { session } = useDecryptedSession();
  const loggedInUserId = session?.user?.id;
  const [subActiveTab, setSubActiveTab] = useState<
    "trending" | "new" | "photos" | "videos"
  >("trending");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { paidContentFeed, loadingPaidContentFeed, paidContentFeedPagination } =
    useSelector((state: RootState) => state.creators);
  const [filter, setFilter] = useState<"subscriber" | "pay_per_view" | "">();

  const [sort, setSort] = useState<"price_low" | "price_high" | "">();
  const { page, totalPages } = paidContentFeedPagination;

  useEffect(() => {
    let tabParam: "trending" | "new" | "photo" | "video" = "new";

    if (subActiveTab === "trending") {
      tabParam = "trending";
    }

    if (subActiveTab === "photos") {
      tabParam = "photo";
    }

    if (subActiveTab === "videos") {
      tabParam = "video";
    }

    dispatch(
      fetchPaidContentFeed({
        page: 1,
        limit: 8,
        tab: tabParam,
        search: search.trim(),
        filter: filter || undefined,
        sort: sort || undefined,
      }),
    );
  }, [subActiveTab, search, filter, sort, dispatch]);
  console.log("API CALLING WITH:", {
    subActiveTab,
    filter,
    sort,
    search,
  });

  const getPostLink = (post: any) => {
    if (
      (post.accessType === "subscriber" && post.isSubscribed === true) ||
      (post.accessType === "pay_per_view" && post.isUnlocked === true)
    ) {
      return `/post?publicId=${post.publicId}`;
    }

    return "#"; // no access
  };

  // const renderPagination = () => {
  //   if (!totalPages || totalPages <= 1) return null;

  //   const pages: (number | string)[] = [];

  //   if (totalPages <= 6) {
  //     for (let i = 1; i <= totalPages; i++) pages.push(i);
  //   } else {
  //     pages.push(1, 2, 3);

  //     if (page > 4) pages.push("...");
  //     if (page > 3 && page < totalPages - 2) pages.push(page);
  //     if (page < totalPages - 3) pages.push("...");

  //     pages.push(totalPages - 1, totalPages);
  //   }

  //   const handlePageChange = (newPage: number) => {
  //     let tabParam: "trending" | "new" | "photo" | "video" = "new";

  //     if (subActiveTab === "trending") tabParam = "trending";
  //     if (subActiveTab === "photos") tabParam = "photo";
  //     if (subActiveTab === "videos") tabParam = "video";

  //     dispatch(
  //       fetchPaidContentFeed({
  //         page: newPage,
  //         limit: 8,
  //         tab: tabParam,
  //         search: search.trim(),
  //         filter: filter || undefined,
  //         sort: sort || undefined,
  //       }),
  //     );
  //   };

  //   return (
  //     <div className="pagination_wrap">
  //       <button
  //         className="btn-prev"
  //         disabled={page === 1}
  //         onClick={() => handlePageChange(page - 1)}
  //       >
  //         <CircleArrowLeft color="#000" />
  //       </button>
  //       {pages.map((p, i) =>
  //         p === "..." ? (
  //           <button key={i} className="premium-btn" disabled>
  //             <span>…</span>
  //           </button>
  //         ) : (
  //           <button
  //             key={i}
  //             className={page === p ? "premium-btn" : "btn-primary"}
  //             onClick={() => handlePageChange(p as number)}
  //           >
  //             <span>{p}</span>
  //           </button>
  //         ),
  //       )}
  //       <button
  //         className="btn-next"
  //         disabled={page === totalPages}
  //         onClick={() => handlePageChange(page + 1)}
  //       >
  //         <CircleArrowRight color="#000" />
  //       </button>
  //     </div>
  //   );
  // };

  const renderPagination = () => {
    if (!totalPages || totalPages <= 1) return null;

    const pages: (number | string)[] = [];

    const start = Math.max(1, page - 1);
    const end = Math.min(totalPages, page + 1);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    const handlePageChange = (newPage: number) => {
      let tabParam: "trending" | "new" | "photo" | "video" = "new";

      if (subActiveTab === "trending") tabParam = "trending";
      if (subActiveTab === "photos") tabParam = "photo";
      if (subActiveTab === "videos") tabParam = "video";

      dispatch(
        fetchPaidContentFeed({
          page: newPage,
          limit: 8,
          tab: tabParam,
          search: search.trim(),
          filter: filter || undefined,
          sort: sort || undefined,
        }),
      );
    };

    return (
      <div className="pagination_wrap">
        <button
          className="btn-prev"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          <CircleArrowLeft color="#000" />
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <button key={i} className="premium-btn" disabled>
              <span>…</span>
            </button>
          ) : (
            <button
              key={i}
              className={page === p ? "premium-btn" : "btn-primary"}
              onClick={() => handlePageChange(p as number)}
            >
              <span>{p}</span>
            </button>
          )
        )}

        <button
          className="btn-next"
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          <CircleArrowRight color="#000" />
        </button>
      </div>
    );
  };
  const playersRef = useRef<{ [key: string]: any }>({});

  const playPreview = (id: string) => {
    // pause other videos
    Object.values(playersRef.current).forEach((p: any) => {
      if (p && !p.paused) {
        p.pause();
        p.currentTime = 0;
      }
    });

    const player = playersRef.current[id];
    if (!player) return;

    player.muted = true;
    player.currentTime = 0;
    player.play().catch(() => { });
  };

  const stopPreview = (id: string) => {
    const player = playersRef.current[id];
    if (!player) return;

    player.pause();
    player.currentTime = 0;
  };

  const openFullscreen = (e: React.MouseEvent, id: string) => {
    e.preventDefault();

    const player = playersRef.current[id];
    if (!player) return;

    player.muted = false;
    player.play();
    player.fullscreen.enter();
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
                    <input
                      type="text"
                      placeholder="Search by creator or price..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div className="creater-content-filters-layouts gap-5">
                  <div className="creator-content-select-filter">
                    <CustomSelect
                      className="bg-white p-sm size-sm"
                      label="Filter By"
                      searchable={false}
                      options={[
                        { label: "All", value: "" },
                        { label: "Subscriber", value: "subscriber" },
                        { label: "Pay Per View", value: "pay_per_view" },
                      ]}
                      onChange={(option: any) => {
                        console.log("FILTER CHANGED:", option);
                        setFilter(option);
                      }}
                    />
                  </div>
                  <div className="creator-content-select-filter">
                    <CustomSelect
                      className="bg-white p-sm size-sm"
                      label="Sort By"
                      searchable={false}
                      options={[
                        { label: "All", value: "" },
                        { label: "Price Low → High", value: "price_low" },
                        { label: "Price High → Low", value: "price_high" },
                      ]}
                      onChange={(option: any) => {
                        console.log("SORT CHANGED:", option);
                        setSort(option);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="creator-content-tabs-btn-wrapper">
                <div className="multi-tabs-action-buttons">
                  <button
                    className={`multi-tab-switch-btn ${subActiveTab === "trending" ? "active" : ""}`}
                    onClick={() => setSubActiveTab("trending")}
                  >
                    <ChartNoAxesCombined size={18} /> <span>Trending</span>
                  </button>
                  <button
                    className={`multi-tab-switch-btn ${subActiveTab === "new" ? "active" : ""}`}
                    onClick={() => setSubActiveTab("new")}
                  >
                    <Sparkles size={18} /> <span>New</span>
                  </button>
                  <button
                    className={`multi-tab-switch-btn ${subActiveTab === "photos" ? "active" : ""}`}
                    onClick={() => setSubActiveTab("photos")}
                  >
                    <Image size={18} /> <span>Photos</span>
                  </button>
                  <button
                    className={`multi-tab-switch-btn ${subActiveTab === "videos" ? "active" : ""}`}
                    onClick={() => setSubActiveTab("videos")}
                  >
                    <Video size={18} /> <span>Videos</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="creator-content-cards-wrapper multi-dem-cards-wrapper-layout store_card">
              <div className="creator-content-type-container-wrapper">
                {loadingPaidContentFeed && (
                  <div className="loadingtext">
                    {"Loading".split("").map((char, i) => (
                      <span
                        key={i}
                        style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                )}

                <div className="col-4-cards-layout">
                  {!loadingPaidContentFeed &&
                    paidContentFeed.map((post) => {
                      const isOwnPost =
                        post.creatorInfo?._id === loggedInUserId;
                      const taggedUsers =
                        post?.collaboration?.taggedUsers ?? [];

                      return (
                        <div className="creator-media-card card" key={post._id}>
                          <div className="creator-media-card__media-wrapper">
                            <div className="creator-media-card__media">
                              {post.media?.type === "photo" ? (
                                <img
                                  alt="Post Image"
                                  src={post.media?.mediaFiles?.[0]}
                                />
                              ) : (
                                <video
                                  ref={(el) => {
                                    if (el) playersRef.current[post._id] = el;
                                  }}
                                  src={post.media?.mediaFiles?.[0]}
                                  muted
                                  loop
                                  playsInline
                                  onMouseEnter={() => playPreview(post._id)}
                                  onMouseLeave={() => stopPreview(post._id)}

                                />
                                // <div className="h-full" onMouseEnter={() => playPreview(post._id)} onMouseLeave={() => stopPreview(post._id)}>
                                //   <Plyr ref={(ref) => {if (ref?.plyr) {playersRef.current[post._id] = ref.plyr;}}} source={{type: "video", sources: [{src: post.media?.mediaFiles?.[0], type: "video/mp4",},],}} options={{muted: true, controls: [], clickToPlay: false, autoplay: false,}}/>
                                // </div>
                              )}
                              {post.media?.type === "video" && (
                                <Link href="#" className="ply_btn">
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
                                {subActiveTab === "new" && (
                                  <div className="creator-media-card__stats-btn">
                                    <Sparkle fill="none" stroke="white" />
                                    <span> New </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="creator-media-card__desc">
                            <h5 className="lineclamp1">{post.text}</h5>
                            <div className="profile-card">
                              <Link
                                href={`/${post.creatorInfo?.userName}`}
                                className="profile-card__main"
                              >
                                <div className="profile-card__avatar-settings">
                                  <div className="profile-card__avatar">
                                    <img
                                      src="https://res.cloudinary.com/drhj03nvv/image/upload/v1772686652/profile/1772686649940-cropped.jpg.jpg"
                                      alt="MoneyBoy Social Profile Avatar"
                                    />
                                  </div>
                                </div>
                                <div className="profile-card__info">
                                  <div className="profile-card__name-badge">
                                    <div className="profile-card__name">
                                      {post.creatorInfo?.displayName}
                                    </div>
                                    <div className="profile-card__badge">
                                      <img
                                        src="/images/logo/profile-badge.png"
                                        alt="MoneyBoy Social Profile Badge"
                                      />
                                    </div>

                                    {taggedUsers.length > 0 && (
                                      <div className="tagview" onClick={(e) => { e.stopPropagation(); e.preventDefault(); showTaggedUserList(taggedUsers); }}>
                                        <ul className="taglist"> {taggedUsers.slice(0, 2).map((tag, index) => {
                                          const username = tag?.user?.userName || "U";
                                          return (
                                            <li key={index}>{tag?.user?.profile ? (
                                              <img className="user_icons" src={tag.user.profile} alt={username} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                                            ) : (
                                              <div className="nomedia">
                                                <span>{username.charAt(0).toUpperCase()}</span>
                                              </div>
                                            )}
                                            </li>
                                          );
                                        })}
                                          {taggedUsers.length > 2 && (
                                            <li className="more-count">+{taggedUsers.length - 2}</li>
                                          )}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                          <div className="creator-media-card__btn mt-auto">
                            {!isOwnPost && post.accessType === "pay_per_view" && post.isUnlocked !== true && (<h5>From <span>${post.price}</span></h5>)}
                            <Link href="#" className={`btn-txt-gradient shimmer btn-outline ${isOwnPost ? "opacity-50 cursor-not-allowed" : ""}`} onClick={(e) => {
                              e.preventDefault(); if (isOwnPost) return;
                              if ((post.accessType === "subscriber" && post.isSubscribed) || (post.accessType === "pay_per_view" && post.isUnlocked)) { router.push(`/purchased-media?publicId=${post.publicId}`,); return; }
                              if (post.accessType === "pay_per_view") { onUnlock(post); return; }
                              if (post.accessType === "subscriber") { onSubscribe(post); return; }
                            }}>
                              <span>
                                {isOwnPost
                                  ? "Your Post"
                                  : post.accessType === "subscriber"
                                    ? post.isSubscribed
                                      ? "Subscribed"
                                      : "Subscribe"
                                    : post.isUnlocked
                                      ? "Purchased"
                                      : "Buy"}
                              </span>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                </div>
                {renderPagination()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCreators;
