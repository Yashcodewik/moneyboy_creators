"use client";
import {
  API_FOLLOW_USER,
  API_GET_CREATORS,
  API_GET_FOLLOWERS,
  API_GET_FOLLOWING,
  API_UNFOLLOW_USER,
} from "@/utils/api/APIConstant";
import { apiPost, getApi, getApiWithOutQuery } from "@/utils/endpoints/common";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../redux/store";
import {
  fetchFollowerCounts,
  followUserAction,
  unfollowUserAction,
} from "../../redux/other/followActions";
import Featuredboys from "../Featuredboys";
import CustomSelect from "../CustomSelect";
import { timeOptions } from "../helper/creatorOptions";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

interface Creator {
  _id: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  userName: string;
  bio?: string;
  isFollowing: boolean;
  profileImage: string;
  coverImage: string;
  role: number;
}

interface Follower {
  _id: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  userName: string;
  bio?: string;
  isFollowing: boolean;
  isFollowingYou: boolean;
  profileImage?: string;
  role: number;
}

const FollowersPage = () => {
  const [follow, setFollow] = useState<"Following" | "Followers">("Followers");
  const [openMoreId, setOpenMoreId] = useState<string | null>(null);
  const moreRef = useRef<HTMLDivElement | null>(null);
  const [selectedOption, setSelectedOption] = useState("All Time");
  const [time, setTime] = useState<string>("all_time");
  const [tab, setTab] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [followers, setFollowers] = useState<Follower[]>([]);
  const [following, setFollowing] = useState<Follower[]>([]);
  const [creators, setCreators] = useState<Creator[]>([]);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [followersPage, setFollowersPage] = useState(1);
  const [followingPage, setFollowingPage] = useState(1);
  const [followersTotalPages, setFollowersTotalPages] = useState(1);
  const [followingTotalPages, setFollowingTotalPages] = useState(1);
  const [followersTotal, setFollowersTotal] = useState(0);
  const [followingTotal, setFollowingTotal] = useState(0);
  const [followersSearchQuery, setFollowersSearchQuery] = useState("");
  const [followingSearchQuery, setFollowingSearchQuery] = useState("");
  const followersSearchTimeout = useRef<NodeJS.Timeout | null>(null);
  const followingSearchTimeout = useRef<NodeJS.Timeout | null>(null);
  const [avatarErrorMap, setAvatarErrorMap] = useState<Record<string, boolean>>({});

  const toggleMore = (id: string) => {
    setOpenMoreId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "followers") {
      setFollow("Followers");
    } else if (tabParam === "following") {
      setFollow("Following");
    }
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setOpenMoreId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTabChange = (value: string) => {
    setSelectedOption(value);
    setTab(false);
  };

  useEffect(() => {
    const likeButtons = document.querySelectorAll("[data-like-button]");

    const handleClick = (event: Event) => {
      const button = event.currentTarget as HTMLElement;
      button.classList.toggle("liked");
    };

    likeButtons.forEach((button) => {
      button.addEventListener("click", handleClick);
    });

    return () => {
      likeButtons.forEach((button) => {
        button.removeEventListener("click", handleClick);
      });
    };
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchCreators(),
          fetchFollowers(),
          fetchFollowing(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const fetchCreators = async (pageNo = 1) => {
    setLoading(true);

    const res = await getApi({
      url: API_GET_CREATORS,
      page: pageNo,
      rowsPerPage: 5,
    });

    if (res?.success) {
      setCreators(res.data || []);
      setPage(pageNo);
      setTotalPages(res.pagination?.totalPages || 1);
    }

    setLoading(false);
  };

  const fetchFollowers = async (pageNo = 1, search = "") => {
    setLoading(true);
    try {
      const res = await getApi({
        url: API_GET_FOLLOWERS,
        page: pageNo,
        rowsPerPage: 10,
        searchText: search,
      });

      if (res?.success) {
        const followersWithStatus = res.data.map((follower: any) => ({
          ...follower,
          isFollowingYou: true,
          isFollowing: false, // 👈 force default, sync will fix it
        }));
        setFollowers(followersWithStatus);
        setFollowersPage(pageNo);
        const total = res.meta?.total || 0;
        const limit = res.meta?.limit || 10;

        setFollowersTotalPages(Math.ceil(total / limit));
        setFollowersPage(page);
        setFollowersTotal(res.meta?.total || 0);
      }
    } catch (error) {
      console.error("Error fetching followers:", error);
      // ShowToast("Failed to load followers", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowing = async (pageNo = 1, search = "") => {
    setLoading(true);
    try {
      const res = await getApi({
        url: API_GET_FOLLOWING,
        page: pageNo,
        rowsPerPage: 10,
        searchText: search,
      });

      if (res?.success) {
        const followingWithStatus = res.data.map((follow: any) => ({
          ...follow,
          isFollowing: true,
          isFollowingYou: false, // 👈 default
        }));

        setFollowing(followingWithStatus);
        setFollowingPage(pageNo);
        const total = res.meta?.total || 0;
        const limit = res.meta?.limit || 10;

        setFollowingTotalPages(Math.ceil(total / limit));
        setFollowingPage(page);

        setFollowingTotal(res.meta?.total || 0);
      }
    } catch (error) {
      console.error("Error fetching following:", error);
      // ShowToast("Failed to load following", "error");
    } finally {
      setLoading(false);
    }
  };

  // Add this function
  const handleFollowersSearch = (value: string) => {
    setFollowersSearchQuery(value);

    if (followersSearchTimeout.current) {
      clearTimeout(followersSearchTimeout.current);
    }

    followersSearchTimeout.current = setTimeout(() => {
      fetchFollowers(1, value);
    }, 500);
  };

  const handleFollowingSearch = (value: string) => {
    setFollowingSearchQuery(value);

    if (followingSearchTimeout.current) {
      clearTimeout(followingSearchTimeout.current);
    }

    followingSearchTimeout.current = setTimeout(() => {
      fetchFollowing(1, value);
    }, 500);
  };

  const syncRelationships = () => {
    const followingIds = new Set(following.map((u) => u._id));
    const followerIds = new Set(followers.map((u) => u._id));

    setFollowers((prev) =>
      prev.map((u) => ({
        ...u,
        isFollowing: followingIds.has(u._id),
      })),
    );

    setFollowing((prev) =>
      prev.map((u) => ({
        ...u,
        isFollowingYou: followerIds.has(u._id),
      })),
    );
  };

  const handleFollowToggle = async (
    userId: string,
    isFollowing: boolean,
    listType: "followers" | "following" | "creators",
  ) => {
    let originalFollowingUser: Follower | undefined;

    if (listType === "following") {
      originalFollowingUser = following.find((user) => user._id === userId);
    }

    if (listType === "followers") {
      if (isFollowing) {
        setFollowers((prev) =>
          prev.map((user) =>
            user._id === userId
              ? {
                ...user,
                isFollowing: false,
                isFollowingYou: true,
              }
              : user,
          ),
        );

        setFollowing((prev) => prev.filter((user) => user._id !== userId));
      } else {
        setFollowers((prev) =>
          prev.map((user) =>
            user._id === userId
              ? {
                ...user,
                isFollowing: true,
                isFollowingYou: true,
              }
              : user,
          ),
        );

        const followerUser = followers.find((u) => u._id === userId);
        if (followerUser) {
          setFollowing((prev) => {
            if (prev.some((u) => u._id === userId)) return prev;
            return [
              ...prev,
              {
                ...followerUser,
                isFollowing: true,
                isFollowingYou: true,
              },
            ];
          });
        }
      }

      setCreators((prev) =>
        prev.map((creator) =>
          creator._id === userId
            ? { ...creator, isFollowing: !isFollowing }
            : creator,
        ),
      );
    } else if (listType === "following") {
      if (isFollowing) {
        const userToUnfollow = following.find((user) => user._id === userId);

        setFollowing((prev) => prev.filter((user) => user._id !== userId));

        setFollowers((prev) =>
          prev.map((user) =>
            user._id === userId
              ? {
                ...user,
                isFollowing: false,
                isFollowingYou: user.isFollowingYou,
              }
              : user,
          ),
        );
      }

      setCreators((prev) =>
        prev.map((creator) =>
          creator._id === userId ? { ...creator, isFollowing: false } : creator,
        ),
      );
    } else if (listType === "creators") {
      setCreators((prev) =>
        prev.map((creator) =>
          creator._id === userId
            ? { ...creator, isFollowing: !isFollowing }
            : creator,
        ),
      );

      if (!isFollowing) {
        const creatorToAdd = creators.find((c) => c._id === userId);
        if (creatorToAdd) {
          setFollowing((prev) => {
            if (prev.some((user) => user._id === userId)) return prev;
            return [
              ...prev,
              {
                ...creatorToAdd,
                isFollowing: true,
                isFollowingYou: false,
              } as Follower,
            ];
          });
        }
      } else {
        setFollowing((prev) => prev.filter((user) => user._id !== userId));
      }
    }

    try {
      if (isFollowing) {
        await dispatch(unfollowUserAction(userId)).unwrap();
      } else {
        await dispatch(followUserAction(userId)).unwrap();
      }

      dispatch(fetchFollowerCounts());

      // ShowToast("Success", "success");
    } catch (err: any) {
      if (listType === "followers") {
        if (isFollowing) {
          setFollowers((prev) =>
            prev.map((user) =>
              user._id === userId
                ? {
                  ...user,
                  isFollowing: true,
                  isFollowingYou: true,
                }
                : user,
            ),
          );
        } else {
          setFollowers((prev) =>
            prev.map((user) =>
              user._id === userId
                ? {
                  ...user,
                  isFollowing: false,
                  isFollowingYou: true,
                }
                : user,
            ),
          );
        }
      } else if (listType === "following") {
        if (originalFollowingUser) {
          setFollowing((prev) => [...prev, originalFollowingUser]);
        }
      } else if (listType === "creators") {
        setCreators((prev) =>
          prev.map((creator) =>
            creator._id === userId ? { ...creator, isFollowing } : creator,
          ),
        );
      }

      // ShowToast(err?.response?.data?.error || "Something went wrong", "error");
    }
  };

  useEffect(() => {
    if (followers.length > 0 && following.length > 0) {
      syncRelationships();
    }
  }, []);

  const getFollowButtonProps = (user: Follower | Creator) => {
    if (user.isFollowing) {
      return {
        text: "Following",
        className: "btn-txt-gradient btn-grey",
      };
    }
    if ("isFollowingYou" in user && user.isFollowingYou && !user.isFollowing) {
      return {
        text: "Follow Back",
        className: "btn-txt-gradient",
      };
    }
    return {
      text: "Follow",
      className: "btn-txt-gradient",
    };
  };

  const renderFollowersPagination = () => {
    if (followersTotalPages <= 1) return null;

    const pages: (number | string)[] = [];
    const page = followersPage;
    const totalPages = followersTotalPages;

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3);
      if (page > 4) pages.push("...");
      if (page > 3 && page < totalPages - 2) pages.push(page);
      if (page < totalPages - 3) pages.push("...");
      pages.push(totalPages - 1, totalPages);
    }

    return (
      <div className="pagination_wrap">
        <button
          className="btn-prev"
          disabled={page === 1}
          onClick={() => fetchFollowers(page - 1, followersSearchQuery)}
        >
          ‹
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
              onClick={() => fetchFollowers(p as number, followersSearchQuery)}
            >
              <span>{p}</span>
            </button>
          ),
        )}

        <button
          className="btn-next"
          disabled={page === totalPages}
          onClick={() => fetchFollowers(page + 1, followersSearchQuery)}
        >
          ›
        </button>
      </div>
    );
  };

  const renderFollowingPagination = () => {
    if (followingTotalPages <= 1) return null;

    const pages: (number | string)[] = [];
    const page = followingPage;
    const totalPages = followingTotalPages;

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3);
      if (page > 4) pages.push("...");
      if (page > 3 && page < totalPages - 2) pages.push(page);
      if (page < totalPages - 3) pages.push("...");
      pages.push(totalPages - 1, totalPages);
    }

    return (
      <div className="pagination_wrap">
        <button
          className="btn-prev"
          disabled={page === 1}
          onClick={() => fetchFollowing(page - 1, followingSearchQuery)}
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
              onClick={() => fetchFollowing(p as number, followingSearchQuery)}
            >
              <span>{p}</span>
            </button>
          ),
        )}

        <button
          className="btn-next"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          <CircleArrowRight color="#000" />
        </button>
      </div>
    );
  };

  const renderFollowersList = () => {
    if (loading && followers.length === 0) {
      return (
        <div className="loadingtext">
          {"Loading".split("").map((char, i) => (
            <span key={i} style={{ animationDelay: `${(i + 1) * 0.1}s` }}>
              {char}
            </span>
          ))}
        </div>
      );
    }

    if (followers.length === 0) {
      return <div className="nodeta">No followers yet</div>;
    }

    return followers.map((follower, index) => {
      const buttonProps = getFollowButtonProps(follower);

      return (
        <div className="rel-user-box" key={follower._id}>
          <div className="rel-user-profile-action">
            <div className="rel-user-profile">
              <div className="profile-card">
                <a
                  href={`/profile/${follower.userName}`}
                  className="profile-card__main"
                >
                  <div className="profile-card__avatar-settings">
                    <div className="profile-card__avatar">
                      {follower.profileImage && !avatarErrorMap[follower._id] ? (
                        <img
                          src={follower.profileImage}
                          alt={`${follower.firstName}'s profile`}
                          onError={() =>
                            setAvatarErrorMap((prev) => ({
                              ...prev,
                              [follower._id]: true,
                            }))
                          }
                        />
                      ) : (
                        <div className="noprofile">
                          <svg width="40" height="40" viewBox="0 0 66 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="animate-m" d="M65.4257 49.6477L64.1198 52.8674C64.0994 52.917 64.076 52.9665 64.0527 53.0132C63.6359 53.8294 62.6681 54.2083 61.8081 53.8848C61.7673 53.8731 61.7265 53.8556 61.6886 53.8381L60.2311 53.1764L57.9515 52.1416C57.0945 51.7509 56.3482 51.1446 55.8002 50.3779C48.1132 39.6156 42.1971 28.3066 38.0271 16.454C37.8551 16.1304 37.5287 15.9555 37.1993 15.9555C36.9631 15.9555 36.7241 16.0459 36.5375 16.2325L28.4395 24.3596C28.1684 24.6307 27.8099 24.7678 27.4542 24.7678C27.4076 24.7678 27.3609 24.7648 27.3143 24.7619C27.2239 24.7503 27.1307 24.7328 27.0432 24.7065C26.8217 24.6366 26.6118 24.5112 26.4427 24.3276C23.1676 20.8193 20.6053 17.1799 18.3097 15.7369C18.1698 15.6495 18.0153 15.6057 17.8608 15.6057C17.5634 15.6057 17.2719 15.7602 17.1029 16.0313C14.1572 20.7377 11.0702 24.8873 7.75721 28.1157C7.31121 28.5471 6.74277 28.8299 6.13061 28.9115L3.0013 29.3254L1.94022 29.4683L1.66912 29.5033C0.946189 29.5994 0.296133 29.0602 0.258237 28.3314L0.00754237 23.5493C-0.0274383 22.8701 0.191188 22.2025 0.610956 21.669C1.51171 20.5293 2.39789 19.3545 3.26512 18.152C5.90032 14.3304 9.52956 8.36475 13.1253 1.39631C13.548 0.498477 14.4283 0 15.3291 0C15.8479 0 16.3727 0.163246 16.8187 0.513052L27.3799 8.76557L39.285 0.521797C39.6931 0.206971 40.1711 0.0583046 40.6434 0.0583046C41.4683 0.0583046 42.2729 0.510134 42.6635 1.32052C50.16 18.2735 55.0282 34.2072 63.6378 47.3439C63.9584 47.8336 64.0197 48.4487 63.8039 48.9851L65.4257 49.6477Z" fill="url(#paint0_linear_4470_53804)" />
                            <defs>
                              <linearGradient id="paint0_linear_4470_53804" x1="0" y1="27" x2="66" y2="27" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#FDAB0A" />
                                <stop offset="0.4" stop-color="#FECE26" />
                                <stop offset="1" stop-color="#FE990B" />
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
                        {follower.displayName ||
                          `${follower.firstName} ${follower.lastName}`}
                      </div>
                      <div className="profile-card__badge">
                        {follower.role === 2 && (
                          <img
                            src="/images/logo/profile-badge.png"
                            alt="MoneyBoy Social Profile Badge"
                          />
                        )}
                      </div>
                    </div>
                    <div className="profile-card__username">
                      @{follower.userName}
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="rel-user-actions">
              <div className="rel-user-action-btn">
                <button
                  className={buttonProps.className}
                  onClick={() =>
                    handleFollowToggle(
                      follower._id,
                      follower.isFollowing,
                      "followers",
                    )
                  }
                  onMouseEnter={(e) => {
                    if (follower.isFollowing) {
                      e.currentTarget.querySelector("span")!.textContent =
                        "Unfollow";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (follower.isFollowing) {
                      e.currentTarget.querySelector("span")!.textContent =
                        "Following";
                    }
                  }}
                >
                  <span>{buttonProps.text}</span>
                </button>
              </div>
              <div
                className="rel-user-more-opts-wrapper"
                data-more-actions-toggle-element
              >
                <button
                  className="rel-user-more-opts-trigger-icon"
                  onClick={() => toggleMore(follower._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M5 10.5C3.9 10.5 3 11.4 3 12.5C3 13.6 3.9 14.5 5 14.5C6.1 14.5 7 13.6 7 12.5C7 11.4 6.1 10.5 5 10.5Z"
                      stroke="none"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M19 10.5C17.9 10.5 17 11.4 17 12.5C17 13.6 17.9 14.5 19 14.5C20.1 14.5 21 13.6 21 12.5C21 11.4 20.1 10.5 19 10.5Z"
                      stroke="none"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M12 10.5C10.9 10.5 10 11.4 10 12.5C10 13.6 10.9 14.5 12 14.5C13.1 14.5 14 13.6 14 12.5C14 11.4 13.1 10.5 12 10.5Z"
                      stroke="none"
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>
                {openMoreId === follower._id && (
                  <div className="rel-users-more-opts-popup-wrapper">
                    <div className="rel-users-more-opts-popup-container">
                      <ul>
                        <li
                          onClick={() =>
                            handleFollowToggle(
                              follower._id,
                              follower.isFollowing,
                              "followers",
                            )
                          }
                        >
                          <div className="icon share-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M16.4405 8.90002C20.0405 9.21002 21.5105 11.06 21.5105 15.11V15.24C21.5105 19.71 19.7205 21.5 15.2505 21.5H8.74047C4.27047 21.5 2.48047 19.71 2.48047 15.24V15.11C2.48047 11.09 3.93047 9.24002 7.47047 8.91002"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12 15V3.62"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M15.3484 5.85L11.9984 2.5L8.64844 5.85"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <span>Share @{follower.userName}</span>
                        </li>
                        <li>
                          <div className="icon mute-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M15 8.36997V7.40997C15 4.42997 12.93 3.28997 10.41 4.86997L7.49 6.69997C7.17 6.88997 6.8 6.99997 6.43 6.99997H5C3 6.99997 2 7.99997 2 9.99997V14C2 16 3 17 5 17H7"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M10.4102 19.13C12.9302 20.71 15.0002 19.56 15.0002 16.59V12.95"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M18.81 9.41998C19.71 11.57 19.44 14.08 18 16"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M21.1481 7.79999C22.6181 11.29 22.1781 15.37 19.8281 18.5"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M22 2L2 22"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <span>Mute</span>
                        </li>
                        <li>
                          <div className="icon remove-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M3.41016 22C3.41016 18.13 7.26015 15 12.0002 15C12.9602 15 13.8902 15.13 14.7602 15.37"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M22 18C22 18.32 21.96 18.63 21.88 18.93C21.79 19.33 21.63 19.72 21.42 20.06C20.73 21.22 19.46 22 18 22C16.97 22 16.04 21.61 15.34 20.97C15.04 20.71 14.78 20.4 14.58 20.06C14.21 19.46 14 18.75 14 18C14 16.92 14.43 15.93 15.13 15.21C15.86 14.46 16.88 14 18 14C19.18 14 20.25 14.51 20.97 15.33C21.61 16.04 22 16.98 22 18Z"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M19.0319 16.94L16.9219 19.05"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M16.9414 16.96L19.0614 19.07"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <span>Remove this follower</span>
                        </li>
                        <li>
                          <div className="icon block-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M3.41016 22C3.41016 18.13 7.26015 15 12.0002 15C12.9602 15 13.8902 15.13 14.7602 15.37"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M22 18C22 18.32 21.96 18.63 21.88 18.93C21.79 19.33 21.63 19.72 21.42 20.06C20.73 21.22 19.46 22 18 22C16.97 22 16.04 21.61 15.34 20.97C15.04 20.71 14.78 20.4 14.58 20.06C14.21 19.46 14 18.75 14 18C14 16.92 14.43 15.93 15.13 15.21C15.86 14.46 16.88 14 18 14C19.18 14 20.25 14.51 20.97 15.33C21.61 16.04 22 16.98 22 18Z"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M20.5 15.5001L15.5 20.5001"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <span>Block @{follower.userName}</span>
                        </li>
                        <li>
                          <div className="icon report-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M5.14844 2V22"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M5.14844 4H16.3484C19.0484 4 19.6484 5.5 17.7484 7.4L16.5484 8.6C15.7484 9.4 15.7484 10.7 16.5484 11.4L17.7484 12.6C19.6484 14.5 18.9484 16 16.3484 16H5.14844"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <span>Report @{follower.userName}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* {follower.bio && (
              <div className="rel-user-desc">
                <p>{follower.bio}</p>
              </div>
            )} */}
        </div>
      );
    });
  };

  const renderFollowingList = () => {
    if (loading && following.length === 0) {
      return <div className="text-center">Loading following...</div>;
    }

    if (following.length === 0) {
      return <div className="nodeta">Not following anyone yet</div>;
    }

    return following.map((follow) => {
      const buttonProps = getFollowButtonProps(follow);

      return (
        <div className="rel-user-box" key={follow._id}>
          <div className="rel-user-profile-action">
            <div className="rel-user-profile">
              <div className="profile-card">
                <a
                  href={`/profile/${follow.userName}`}
                  className="profile-card__main"
                >
                  <div className="profile-card__avatar-settings">
                    <div className="profile-card__avatar">
                      {follow.profileImage && !avatarErrorMap[follow._id] ? (
                        <img
                          src={follow.profileImage}
                          alt={`${follow.firstName}'s profile`}
                          onError={() =>
                            setAvatarErrorMap((prev) => ({
                              ...prev,
                              [follow._id]: true,
                            }))
                          }
                        />
                      ) : (
                        <div className="noprofile">
                          <svg width="40" height="40" viewBox="0 0 66 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="animate-m" d="M65.4257 49.6477L64.1198 52.8674C64.0994 52.917 64.076 52.9665 64.0527 53.0132C63.6359 53.8294 62.6681 54.2083 61.8081 53.8848C61.7673 53.8731 61.7265 53.8556 61.6886 53.8381L60.2311 53.1764L57.9515 52.1416C57.0945 51.7509 56.3482 51.1446 55.8002 50.3779C48.1132 39.6156 42.1971 28.3066 38.0271 16.454C37.8551 16.1304 37.5287 15.9555 37.1993 15.9555C36.9631 15.9555 36.7241 16.0459 36.5375 16.2325L28.4395 24.3596C28.1684 24.6307 27.8099 24.7678 27.4542 24.7678C27.4076 24.7678 27.3609 24.7648 27.3143 24.7619C27.2239 24.7503 27.1307 24.7328 27.0432 24.7065C26.8217 24.6366 26.6118 24.5112 26.4427 24.3276C23.1676 20.8193 20.6053 17.1799 18.3097 15.7369C18.1698 15.6495 18.0153 15.6057 17.8608 15.6057C17.5634 15.6057 17.2719 15.7602 17.1029 16.0313C14.1572 20.7377 11.0702 24.8873 7.75721 28.1157C7.31121 28.5471 6.74277 28.8299 6.13061 28.9115L3.0013 29.3254L1.94022 29.4683L1.66912 29.5033C0.946189 29.5994 0.296133 29.0602 0.258237 28.3314L0.00754237 23.5493C-0.0274383 22.8701 0.191188 22.2025 0.610956 21.669C1.51171 20.5293 2.39789 19.3545 3.26512 18.152C5.90032 14.3304 9.52956 8.36475 13.1253 1.39631C13.548 0.498477 14.4283 0 15.3291 0C15.8479 0 16.3727 0.163246 16.8187 0.513052L27.3799 8.76557L39.285 0.521797C39.6931 0.206971 40.1711 0.0583046 40.6434 0.0583046C41.4683 0.0583046 42.2729 0.510134 42.6635 1.32052C50.16 18.2735 55.0282 34.2072 63.6378 47.3439C63.9584 47.8336 64.0197 48.4487 63.8039 48.9851L65.4257 49.6477Z" fill="url(#paint0_linear_4470_53804)" />
                            <defs>
                              <linearGradient id="paint0_linear_4470_53804" x1="0" y1="27" x2="66" y2="27" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#FDAB0A" />
                                <stop offset="0.4" stop-color="#FECE26" />
                                <stop offset="1" stop-color="#FE990B" />
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
                        {follow.displayName ||
                          `${follow.firstName} ${follow.lastName}`}
                      </div>
                      {follow.role === 2 && (
                        <div className="profile-card__badge">
                          <img
                            src="/images/logo/profile-badge.png"
                            alt="MoneyBoy Social Profile Badge"
                          />
                        </div>
                      )}
                    </div>
                    <div className="profile-card__username">
                      @{follow.userName}
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="rel-user-action-btn">
              <button
                className={buttonProps.className}
                onClick={() =>
                  handleFollowToggle(
                    follow._id,
                    follow.isFollowing,
                    "following",
                  )
                }
                onMouseEnter={(e) => {
                  if (follow.isFollowing) {
                    e.currentTarget.querySelector("span")!.textContent =
                      "Unfollow";
                  }
                }}
                onMouseLeave={(e) => {
                  if (follow.isFollowing) {
                    e.currentTarget.querySelector("span")!.textContent =
                      "Following";
                  }
                }}
              >
                <span>{buttonProps.text}</span>
              </button>
            </div>
          </div>
          {/* {follow.bio && (
              <div className="rel-user-desc">
                <p>{follow.bio}</p>
              </div>
            )} */}
        </div>
      );
    });
  };

  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="moneyboy-2x-1x-a-layout">
        <div
          className="moneyboy-feed-page-container moneyboy-diff-content-wrappers"
          data-multiple-tabs-section
          data-scroll-zero
          data-identifier="1"
        >
          <div
            className="moneyboy-feed-page-cate-buttons card"
            id="posts-tabs-btn-card"
          >
            {/* <button
              className="cate-back-btn active-down-effect"
              onClick={() => router.push("/feed")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9.57 5.92999L3.5 12L9.57 18.07"
                  stroke="none"
                  strokeWidth="2.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.4999 12H3.66992"
                  stroke="none"
                  strokeWidth="2.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button> */}
            <button
              className={`page-content-type-button active-down-effect ${follow === "Followers" ? "active" : ""
                }`}
              data-multi-tabs-switch-btndata__active
              data-identifier="1"
              onClick={() => setFollow("Followers")}
            >
              Followers
            </button>
            <button
              className={`page-content-type-button active-down-effect ${follow === "Following" ? "active" : ""
                }`}
              data-multi-tabs-switch-btn
              data-identifier="1"
              onClick={() => setFollow("Following")}
            >
              Following
            </button>
          </div>

          {follow === "Followers" && (
            <div data-multi-tabs-content-tabdata__active data-identifier="1">
              <div className="card filters-card-layout-wrapper">
                <div className="tabs-content-wrapper-layout">
                  <div>
                    <div className="creator-content-filter-grid-container">
                      <div className="search-features-grid-btns has-multi-tabs-btns one-row-content-wrapper">
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
                              placeholder="Search followers..."
                              value={followersSearchQuery}
                              onChange={(e) => {
                                setFollowersSearchQuery(e.target.value);
                                handleFollowersSearch(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="creater-content-filters-layouts">
                          <div className="creator-content-select-filter">
                            <CustomSelect
                              className="bg-white p-sm size-sm"
                              label="All Time"
                              options={timeOptions}
                              value={selectedOption}
                              searchable={false}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="creator-content-cards-wrapper">
                        <div className="rel-users-wrapper" ref={moreRef}>
                          {renderFollowersList()}
                        </div>
                        {renderFollowersPagination()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {follow === "Following" && (
            <div data-multi-tabs-content-tab data-identifier="1">
              <div className="card filters-card-layout-wrapper">
                <div className="tabs-content-wrapper-layout">
                  <div>
                    <div className="creator-content-filter-grid-container">
                      <div className="search-features-grid-btns has-multi-tabs-btns one-row-content-wrapper">
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
                              placeholder="Search following..."
                              value={followingSearchQuery}
                              onChange={(e) => {
                                setFollowingSearchQuery(e.target.value);
                                handleFollowingSearch(e.target.value);
                              }}
                            />{" "}
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
                            // onChange={(val) => {
                            //   setTime(val);
                            //   fetchLikedPosts(1);
                            // }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="creator-content-cards-wrapper ">
                        <div className="rel-users-wrapper">
                          {renderFollowingList()}
                        </div>
                        {renderFollowingPagination()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <aside className="moneyboy-2x-1x-b-layout">
        <div className="moneyboy-feed-sidebar-container">
          <div className="featured-profiles-card-container trending-profiles-card-container card">
            <div className="featured-profiles-header">
              <div className="featured-card-heading">
                <h3 className="card-heading">Trending Moneyboys</h3>
              </div>
              <div className="featured-card-opts">
                <button className="icon-btn hover-scale-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M22 12.5C22 18.02 17.52 22.5 12 22.5C6.48 22.5 3.11 16.94 3.11 16.94M3.11 16.94H7.63M3.11 16.94V21.94M2 12.5C2 6.98 6.44 2.5 12 2.5C18.67 2.5 22 8.06 22 8.06M22 8.06V3.06M22 8.06H17.56"
                      stroke="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>

                <button
                  className="icon-btn hover-scale-icon"
                  disabled={page === 1}
                  onClick={() => fetchCreators(page - 1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M12 22.5C6.47715 22.5 2 18.0228 2 12.5C2 6.97715 6.47715 2.5 12 2.5C17.5228 2.5 22 6.97715 22 12.5C22 18.0228 17.5228 22.5 12 22.5Z"
                      stroke="none"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M13.26 16.03L9.74001 12.5L13.26 8.97"
                      stroke="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>

                <button
                  className="icon-btn hover-scale-icon"
                  disabled={page === totalPages}
                  onClick={() => fetchCreators(page + 1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z"
                      stroke="none"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M10.74 16.03L14.26 12.5L10.74 8.97"
                      stroke="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="featured-profiles-wrapper rel-users-wrapper">
              {creators.map((creator) => (
                <div className="rel-user-box" key={creator._id}>
                  <div className="rel-user-profile-action">
                    <div className="rel-user-profile">
                      <div className="profile-card">
                        <a href="#" className="profile-card__main">
                          <div className="profile-card__avatar-settings">
                            <div className="profile-card__avatar">
                              {creator.profileImage && !avatarErrorMap[creator._id] ? (
                                <img
                                  src={creator.profileImage}
                                  alt={`${creator.displayName} profile avatar`}
                                  onError={() =>
                                    setAvatarErrorMap((prev) => ({
                                      ...prev,
                                      [creator._id]: true,
                                    }))
                                  }
                                />
                              ) : (
                                <div className="noprofile">
                                  <svg width="40" height="40" viewBox="0 0 66 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="animate-m" d="M65.4257 49.6477L64.1198 52.8674C64.0994 52.917 64.076 52.9665 64.0527 53.0132C63.6359 53.8294 62.6681 54.2083 61.8081 53.8848C61.7673 53.8731 61.7265 53.8556 61.6886 53.8381L60.2311 53.1764L57.9515 52.1416C57.0945 51.7509 56.3482 51.1446 55.8002 50.3779C48.1132 39.6156 42.1971 28.3066 38.0271 16.454C37.8551 16.1304 37.5287 15.9555 37.1993 15.9555C36.9631 15.9555 36.7241 16.0459 36.5375 16.2325L28.4395 24.3596C28.1684 24.6307 27.8099 24.7678 27.4542 24.7678C27.4076 24.7678 27.3609 24.7648 27.3143 24.7619C27.2239 24.7503 27.1307 24.7328 27.0432 24.7065C26.8217 24.6366 26.6118 24.5112 26.4427 24.3276C23.1676 20.8193 20.6053 17.1799 18.3097 15.7369C18.1698 15.6495 18.0153 15.6057 17.8608 15.6057C17.5634 15.6057 17.2719 15.7602 17.1029 16.0313C14.1572 20.7377 11.0702 24.8873 7.75721 28.1157C7.31121 28.5471 6.74277 28.8299 6.13061 28.9115L3.0013 29.3254L1.94022 29.4683L1.66912 29.5033C0.946189 29.5994 0.296133 29.0602 0.258237 28.3314L0.00754237 23.5493C-0.0274383 22.8701 0.191188 22.2025 0.610956 21.669C1.51171 20.5293 2.39789 19.3545 3.26512 18.152C5.90032 14.3304 9.52956 8.36475 13.1253 1.39631C13.548 0.498477 14.4283 0 15.3291 0C15.8479 0 16.3727 0.163246 16.8187 0.513052L27.3799 8.76557L39.285 0.521797C39.6931 0.206971 40.1711 0.0583046 40.6434 0.0583046C41.4683 0.0583046 42.2729 0.510134 42.6635 1.32052C50.16 18.2735 55.0282 34.2072 63.6378 47.3439C63.9584 47.8336 64.0197 48.4487 63.8039 48.9851L65.4257 49.6477Z" fill="url(#paint0_linear_4470_53804)" />
                                    <defs>
                                      <linearGradient id="paint0_linear_4470_53804" x1="0" y1="27" x2="66" y2="27" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#FDAB0A" />
                                        <stop offset="0.4" stop-color="#FECE26" />
                                        <stop offset="1" stop-color="#FE990B" />
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
                                {creator.displayName ||
                                  `${creator.firstName} ${creator.lastName}`}
                              </div>
                              <div className="profile-card__badge">
                                <img
                                  src="/images/logo/profile-badge.png"
                                  alt="MoneyBoy Social Profile Badge"
                                />
                              </div>
                            </div>

                            <div className="profile-card__username">
                              @{creator.userName}
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>

                    <div className="rel-user-actions">
                      <div className="rel-user-action-btn">
                        <button
                          className={`btn-txt-gradient ${creator.isFollowing ? "btn-grey" : ""
                            }`}
                          onClick={() =>
                            handleFollowToggle(
                              creator._id,
                              creator.isFollowing,
                              "creators",
                            )
                          }
                          onMouseEnter={(e) => {
                            if (creator.isFollowing) {
                              e.currentTarget.querySelector(
                                "span",
                              )!.textContent = "Unfollow";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (creator.isFollowing) {
                              e.currentTarget.querySelector(
                                "span",
                              )!.textContent = "Following";
                            }
                          }}
                        >
                          <span>
                            {creator.isFollowing ? "Following" : "Follow"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {!loading && creators.length === 0 && (
                <p className="text-center">No creators found</p>
              )}
            </div>
          </div>

          <Featuredboys />
        </div>
      </aside>
    </div>
  );
};

export default FollowersPage;
