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
import { useAppDispatch } from "../redux/store";
import { fetchFollowerCounts, followUserAction, unfollowUserAction } from "../redux/other/followActions";

interface Creator {
  _id: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  userName: string;
  bio?: string;
  isFollowing: boolean;
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
}

const FollowersPage = () => {
  const [follow, setFollow] = useState<"Following" | "Followers">("Followers");
  const [openMoreId, setOpenMoreId] = useState<string | null>(null);
  const moreRef = useRef<HTMLDivElement | null>(null);
  const [selectedOption, setSelectedOption] = useState("All Time");
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
          fetchFollowing()
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
      }));
      setFollowers(followersWithStatus);
      setFollowersPage(pageNo);
      setFollowersTotalPages(res.meta?.totalPages || 1);
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
      }));
      setFollowing(followingWithStatus);
      setFollowingPage(pageNo);
      setFollowingTotalPages(res.meta?.totalPages || 1);
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
    if (followers.length === 0 || following.length === 0) return;
    
    const followingIds = new Set(following.map(user => user._id));
    const followerIds = new Set(followers.map(user => user._id));
    
    const updatedFollowers = followers.map(follower => ({
      ...follower,
      isFollowing: followingIds.has(follower._id) 
    }));
    
    const updatedFollowing = following.map(follow => ({
      ...follow,
      isFollowingYou: followerIds.has(follow._id) 
    }));
    
    setFollowers(updatedFollowers);
    setFollowing(updatedFollowing);
  };

  const handleFollowToggle = async (
    userId: string,
    isFollowing: boolean,
    listType: "followers" | "following" | "creators"
  ) => {
    let originalFollowingUser: Follower | undefined;

    if (listType === "following") {
      originalFollowingUser = following.find((user) => user._id === userId);
    }

    if (listType === "followers") {
      if (isFollowing) {
        setFollowers(prev =>
          prev.map(user =>
            user._id === userId
              ? {
                  ...user,
                  isFollowing: false, 
                  isFollowingYou: true,
                }
              : user
          )
        );
        
        setFollowing(prev => prev.filter(user => user._id !== userId));

      } else {
        setFollowers(prev =>
          prev.map(user =>
            user._id === userId
              ? {
                  ...user,
                  isFollowing: true,
                  isFollowingYou: true,
                }
              : user
          )
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
          creator._id === userId ? { ...creator, isFollowing: !isFollowing } : creator
        )
      );
      
    } else if (listType === "following") {
      if (isFollowing) {
        const userToUnfollow = following.find((user) => user._id === userId);
        
        setFollowing((prev) => prev.filter((user) => user._id !== userId));

        setFollowers(prev =>
          prev.map(user =>
            user._id === userId
              ? {
                  ...user,
                  isFollowing: false,
                  isFollowingYou: user.isFollowingYou,
                }
              : user
          )
        );
      }

      setCreators((prev) =>
        prev.map((creator) =>
          creator._id === userId ? { ...creator, isFollowing: false } : creator
        )
      );
    } else if (listType === "creators") {
      setCreators((prev) =>
        prev.map((creator) =>
          creator._id === userId
            ? { ...creator, isFollowing: !isFollowing }
            : creator
        )
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
          setFollowers(prev =>
            prev.map(user =>
              user._id === userId
                ? {
                    ...user,
                    isFollowing: true, 
                    isFollowingYou: true,
                  }
                : user
            )
          );
        } else {
          setFollowers(prev =>
            prev.map(user =>
              user._id === userId
                ? {
                    ...user,
                    isFollowing: false, 
                    isFollowingYou: true,
                  }
                : user
            )
          );
        }
      } else if (listType === "following") {
        if (originalFollowingUser) {
          setFollowing((prev) => [...prev, originalFollowingUser]);
        }
      } else if (listType === "creators") {
        setCreators((prev) =>
          prev.map((creator) =>
            creator._id === userId ? { ...creator, isFollowing } : creator
          )
        );
      }

      // ShowToast(err?.response?.data?.error || "Something went wrong", "error");
    }
  };

  useEffect(() => {
    if (followers.length > 0 && following.length > 0) {
      syncRelationships();
    }
  }, [followers.length, following.length]);

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


    const renderFollowersList = () => {
      if (loading && followers.length === 0) {
        return <div className="nodeta">Loading followers...</div>;
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
                        <img
                          src="/images/profile-avatars/profile-avatar-6.jpg"
                          alt={`${follower.firstName}'s profile`}
                        />
                      </div>
                    </div>
                    <div className="profile-card__info">
                      <div className="profile-card__name-badge">
                        <div className="profile-card__name">
                          {follower.displayName ||
                            `${follower.firstName} ${follower.lastName}`}
                        </div>
                        <div className="profile-card__badge">
                          <img
                            src="/images/logo/profile-badge.png"
                            alt="MoneyBoy Social Profile Badge"
                          />
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
                        "followers"
                      )
                    }
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
                                "followers"
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
        return <div className="text-center">Not following anyone yet</div>;
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
                        <img
                          src="/images/profile-avatars/profile-avatar-6.jpg"
                          alt={`${follow.firstName}'s profile`}
                        />
                      </div>
                    </div>
                    <div className="profile-card__info">
                      <div className="profile-card__name-badge">
                        <div className="profile-card__name">
                          {follow.displayName ||
                            `${follow.firstName} ${follow.lastName}`}
                        </div>
                        {follow.isFollowingYou && (
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
              <div className="rel-user-actions">
                <div className="rel-user-action-btn">
                  <button
                    className={buttonProps.className}
                    onClick={() =>
                      handleFollowToggle(
                        follow._id,
                        follow.isFollowing,
                        "following"
                      )
                    }
                  >
                    <span>{buttonProps.text}</span>
                  </button>
                </div>
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
              <button
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
              </button>
              <button
                className={`page-content-type-button active-down-effect ${
                  follow === "Followers" ? "active" : ""
                }`}
                data-multi-tabs-switch-btndata__active
                data-identifier="1"
                onClick={() => setFollow("Followers")}
              >
                Followers
              </button>
              <button
                className={`page-content-type-button active-down-effect ${
                  follow === "Following" ? "active" : ""
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
                              <div
                                className="custom-select-element bg-white p-sm size-sm"
                                data-custom-select-element
                                data-custom-select-value
                              >
                                <div
                                  className="custom-select-label-wrapper"
                                  data-custom-select-triger
                                  onClick={() => setTab((prev) => !prev)}
                                >
                                  <div className="custom-select-icon-txt">
                                    <span className="custom-select-label-txt">
                                      {selectedOption}
                                    </span>
                                  </div>
                                  <div className="custom-select-chevron">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="25"
                                      height="24"
                                      viewBox="0 0 25 24"
                                      fill="none"
                                    >
                                      <path
                                        d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                </div>
                                {tab && (
                                  <div
                                    className="custom-select-options-dropdown-wrapper"
                                    data-custom-select-dropdown
                                  >
                                    <div className="custom-select-options-dropdown-container">
                                      <div className="custom-select-options-lists-container">
                                        <ul
                                          className="custom-select-options-list"
                                          data-custom-select-options-list
                                        >
                                          <li
                                            className="custom-select-option"
                                            // onClick={() =>
                                            //   handleTabChange("All Time")
                                            // }
                                          >
                                            <span>option 1</span>
                                          </li>
                                          <li
                                            className="custom-select-option"
                                            // onClick={() =>
                                            //   handleTabChange("This Month")
                                            // }
                                          >
                                            <span>option 2</span>
                                          </li>
                                          <li
                                            className="custom-select-option"
                                            // onClick={() =>
                                            //   handleTabChange("This Week")
                                            // }
                                          >
                                            <span>option 3</span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="creator-content-cards-wrapper">
                          <div className="rel-users-wrapper" ref={moreRef}>
                            {renderFollowersList()}
                          </div>
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
  />                      </div>
                          </div>

                          <div className="creater-content-filters-layouts">
                            <div className="creator-content-select-filter">
                              <div
                                className="custom-select-element bg-white p-sm size-sm"
                                data-custom-select-element
                                data-custom-select-value
                              >
                                <div
                                  className="custom-select-label-wrapper"
                                  data-custom-select-triger
                                >
                                  <div className="custom-select-icon-txt">
                                    <span className="custom-select-label-txt">
                                      All Time
                                    </span>
                                  </div>
                                  <div className="custom-select-chevron">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="25"
                                      height="24"
                                      viewBox="0 0 25 24"
                                      fill="none"
                                    >
                                      <path
                                        d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95"
                                        stroke="none"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="creator-content-cards-wrapper ">
                          <div className="rel-users-wrapper">
                            {renderFollowingList()}
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
                                <img
                                  src="/images/profile-avatars/profile-avatar-16.jpg"
                                  alt="MoneyBoy Social Profile Avatar"
                                />
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
                            className={`btn-txt-gradient ${
                              creator.isFollowing ? "btn-grey" : ""
                            }`}
                            onClick={() =>
                              handleFollowToggle(
                                creator._id,
                                creator.isFollowing,
                                "creators"
                              )
                            }
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

            <div className="featured-profiles-card-container card">
              <div className="featured-profiles-header">
                <div className="featured-card-heading">
                  <h3 className="card-heading">Featured Moneyboys</h3>
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
                      />
                    </svg>
                  </button>

                  <button className="icon-btn hover-scale-icon">
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
                      />
                      <path
                        d="M13.26 16.03L9.74001 12.5L13.26 8.97"
                        stroke="none"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <button className="icon-btn hover-scale-icon">
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
                      />
                      <path
                        d="M10.74 16.03L14.26 12.5L10.74 8.97"
                        stroke="none"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="featured-profiles-wrapper">
                <div className="featured-profile__card">
                  <div className="featured-profile__info-wrapper">
                    <div className="profile-card featured-profile-card">
                      <div className="profile-card__bg-img">
                        <img
                          src="/images/profile-banners/profile-banner-7.png"
                          alt="Featured Profile Background Image"
                        />
                      </div>
                      <div className="profile-card__main">
                        <div className="profile-card__avatar-settings">
                          <div className="profile-card__avatar">
                            <img
                              src="/images/profile-avatars/profile-avatar-6.jpg"
                              alt="MoneyBoy Social Profile Avatar"
                            />
                          </div>
                        </div>
                        <div className="profile-card__info">
                          <div className="profile-card__name-badge">
                            <div className="profile-card__name">
                              Zain Schleifer
                            </div>
                            <div className="profile-card__badge">
                              <img
                                src="/images/logo/profile-badge.png"
                                alt="MoneyBoy Social Profile Badge"
                              />
                            </div>
                          </div>
                          <div className="profile-card__username">
                            @coreybergson
                          </div>
                        </div>
                        <div className="profile-card__icon">
                          <div className="profile-card__blur-icon">
                            <button className="like-button" data-like-button>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="21"
                                viewBox="0 0 20 21"
                                fill="none"
                              >
                                <path
                                  d="M10.5166 17.8417C10.2333 17.9417 9.76663 17.9417 9.48329 17.8417C7.06663 17.0167 1.66663 13.575 1.66663 7.74166C1.66663 5.16666 3.74163 3.08333 6.29996 3.08333C7.81663 3.08333 9.15829 3.81666 9.99996 4.95C10.8416 3.81666 12.1916 3.08333 13.7 3.08333C16.2583 3.08333 18.3333 5.16666 18.3333 7.74166C18.3333 13.575 12.9333 17.0167 10.5166 17.8417Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="profile-card__desc">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="featured-profile__card">
                  <div className="featured-profile__info-wrapper">
                    <div className="profile-card featured-profile-card">
                      <div className="profile-card__bg-img">
                        <img
                          src="/images/profile-banners/profile-banner-4.jpg"
                          alt="Featured Profile Background Image"
                        />
                      </div>
                      <div className="profile-card__main">
                        <div className="profile-card__avatar-settings">
                          <div className="profile-card__avatar">
                            <img
                              src="/images/profile-avatars/profile-avatar-5.jpg"
                              alt="MoneyBoy Social Profile Avatar"
                            />
                          </div>
                        </div>
                        <div className="profile-card__info">
                          <div className="profile-card__name-badge">
                            <div className="profile-card__name">
                              Gustavo Stanton
                            </div>
                            <div className="profile-card__badge">
                              <img
                                src="/images/logo/profile-badge.png"
                                alt="MoneyBoy Social Profile Badge"
                              />
                            </div>
                          </div>
                          <div className="profile-card__username">
                            @gustavostanton
                          </div>
                        </div>
                        <div className="profile-card__icon">
                          <div className="profile-card__blur-icon">
                            <button className="like-button" data-like-button>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="21"
                                viewBox="0 0 20 21"
                                fill="none"
                              >
                                <path
                                  d="M10.5166 17.8417C10.2333 17.9417 9.76663 17.9417 9.48329 17.8417C7.06663 17.0167 1.66663 13.575 1.66663 7.74166C1.66663 5.16666 3.74163 3.08333 6.29996 3.08333C7.81663 3.08333 9.15829 3.81666 9.99996 4.95C10.8416 3.81666 12.1916 3.08333 13.7 3.08333C16.2583 3.08333 18.3333 5.16666 18.3333 7.74166C18.3333 13.575 12.9333 17.0167 10.5166 17.8417Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="profile-card__desc">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="featured-profile__card">
                  <div className="featured-profile__info-wrapper">
                    <div className="profile-card featured-profile-card">
                      <div className="profile-card__bg-img">
                        <img
                          src="/images/profile-banners/profile-banner-3.jpg"
                          alt="Featured Profile Background Image"
                        />
                      </div>
                      <div className="profile-card__main">
                        <div className="profile-card__avatar-settings">
                          <div className="profile-card__avatar">
                            <img
                              src="/images/profile-avatars/profile-avatar-3.jpg"
                              alt="MoneyBoy Social Profile Avatar"
                            />
                          </div>
                        </div>
                        <div className="profile-card__info">
                          <div className="profile-card__name-badge">
                            <div className="profile-card__name">
                              Emerson Bator
                            </div>
                            <div className="profile-card__badge">
                              <img
                                src="/images/logo/profile-badge.png"
                                alt="MoneyBoy Social Profile Badge"
                              />
                            </div>
                          </div>
                          <div className="profile-card__username">
                            @emersonbator
                          </div>
                        </div>
                        <div className="profile-card__icon">
                          <div className="profile-card__blur-icon">
                            <button className="like-button" data-like-button>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="21"
                                viewBox="0 0 20 21"
                                fill="none"
                              >
                                <path
                                  d="M10.5166 17.8417C10.2333 17.9417 9.76663 17.9417 9.48329 17.8417C7.06663 17.0167 1.66663 13.575 1.66663 7.74166C1.66663 5.16666 3.74163 3.08333 6.29996 3.08333C7.81663 3.08333 9.15829 3.81666 9.99996 4.95C10.8416 3.81666 12.1916 3.08333 13.7 3.08333C16.2583 3.08333 18.3333 5.16666 18.3333 7.74166C18.3333 13.575 12.9333 17.0167 10.5166 17.8417Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="profile-card__desc">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="featured-profile__card">
                  <div className="featured-profile__info-wrapper">
                    <div className="profile-card featured-profile-card">
                      <div className="profile-card__bg-img">
                        <img
                          src="/images/profile-banners/profile-banner-2.jpg"
                          alt="Featured Profile Background Image"
                        />
                      </div>
                      <div className="profile-card__main">
                        <div className="profile-card__avatar-settings">
                          <div className="profile-card__avatar">
                            <img
                              src="/images/profile-avatars/profile-avatar-7.jpg"
                              alt="MoneyBoy Social Profile Avatar"
                            />
                          </div>
                        </div>
                        <div className="profile-card__info">
                          <div className="profile-card__name-badge">
                            <div className="profile-card__name">Omar Dokidis</div>
                            <div className="profile-card__badge">
                              <img
                                src="/images/logo/profile-badge.png"
                                alt="MoneyBoy Social Profile Badge"
                              />
                            </div>
                          </div>
                          <div className="profile-card__username">
                            @omardokidis
                          </div>
                        </div>
                        <div className="profile-card__icon">
                          <div className="profile-card__blur-icon">
                            <button className="like-button" data-like-button>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="21"
                                viewBox="0 0 20 21"
                                fill="none"
                              >
                                <path
                                  d="M10.5166 17.8417C10.2333 17.9417 9.76663 17.9417 9.48329 17.8417C7.06663 17.0167 1.66663 13.575 1.66663 7.74166C1.66663 5.16666 3.74163 3.08333 6.29996 3.08333C7.81663 3.08333 9.15829 3.81666 9.99996 4.95C10.8416 3.81666 12.1916 3.08333 13.7 3.08333C16.2583 3.08333 18.3333 5.16666 18.3333 7.74166C18.3333 13.575 12.9333 17.0167 10.5166 17.8417Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="profile-card__desc">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="featured-profile__card">
                  <div className="featured-profile__info-wrapper">
                    <div className="profile-card featured-profile-card">
                      <div className="profile-card__bg-img">
                        <img
                          src="/images/profile-banners/profile-banner-1.jpg"
                          alt="Featured Profile Background Image"
                        />
                      </div>
                      <div className="profile-card__main">
                        <div className="profile-card__avatar-settings">
                          <div className="profile-card__avatar">
                            <img
                              src="/images/profile-avatars/profile-avatar-2.jpg"
                              alt="MoneyBoy Social Profile Avatar"
                            />
                          </div>
                        </div>
                        <div className="profile-card__info">
                          <div className="profile-card__name-badge">
                            <div className="profile-card__name">
                              Wilson Septimus
                            </div>
                            <div className="profile-card__badge">
                              <img
                                src="/images/logo/profile-badge.png"
                                alt="MoneyBoy Social Profile Badge"
                              />
                            </div>
                          </div>
                          <div className="profile-card__username">
                            @wilsonseptimus
                          </div>
                        </div>
                        <div className="profile-card__icon">
                          <div className="profile-card__blur-icon">
                            <button className="like-button" data-like-button>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="21"
                                viewBox="0 0 20 21"
                                fill="none"
                              >
                                <path
                                  d="M10.5166 17.8417C10.2333 17.9417 9.76663 17.9417 9.48329 17.8417C7.06663 17.0167 1.66663 13.575 1.66663 7.74166C1.66663 5.16666 3.74163 3.08333 6.29996 3.08333C7.81663 3.08333 9.15829 3.81666 9.99996 4.95C10.8416 3.81666 12.1916 3.08333 13.7 3.08333C16.2583 3.08333 18.3333 5.16666 18.3333 7.74166C18.3333 13.575 12.9333 17.0167 10.5166 17.8417Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="profile-card__desc">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="featured-profile__card">
                  <div className="featured-profile__info-wrapper">
                    <div className="profile-card featured-profile-card">
                      <div className="profile-card__bg-img">
                        <img
                          src="/images/profile-banners/profile-banner-5.jpg"
                          alt="Featured Profile Background Image"
                        />
                      </div>
                      <div className="profile-card__main">
                        <div className="profile-card__avatar-settings">
                          <div className="profile-card__avatar">
                            <img
                              src="/images/profile-avatars/profile-avatar-8.jpg"
                              alt="MoneyBoy Social Profile Avatar"
                            />
                          </div>
                        </div>
                        <div className="profile-card__info">
                          <div className="profile-card__name-badge">
                            <div className="profile-card__name">Ruben Kenter</div>
                            <div className="profile-card__badge">
                              <img
                                src="/images/logo/profile-badge.png"
                                alt="MoneyBoy Social Profile Badge"
                              />
                            </div>
                          </div>
                          <div className="profile-card__username">
                            @rubenkenter
                          </div>
                        </div>
                        <div className="profile-card__icon">
                          <div className="profile-card__blur-icon">
                            <button className="like-button" data-like-button>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="21"
                                viewBox="0 0 20 21"
                                fill="none"
                              >
                                <path
                                  d="M10.5166 17.8417C10.2333 17.9417 9.76663 17.9417 9.48329 17.8417C7.06663 17.0167 1.66663 13.575 1.66663 7.74166C1.66663 5.16666 3.74163 3.08333 6.29996 3.08333C7.81663 3.08333 9.15829 3.81666 9.99996 4.95C10.8416 3.81666 12.1916 3.08333 13.7 3.08333C16.2583 3.08333 18.3333 5.16666 18.3333 7.74166C18.3333 13.575 12.9333 17.0167 10.5166 17.8417Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="profile-card__desc">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="moneyboy-network-grow-card-wrapper card">
              <a href="#" className="moneyboy-network-grow-card card">
                <div className="bg-img">
                  <img
                    src="/images/grow-network-bg-image.png"
                    alt="Grow Network By MoneyBoy Social"
                  />
                </div>
                <div className="text-logo">
                  <h3>Network</h3>
                  <img
                    src="/images/logo/moneyboy-logo.png"
                    alt="MoneyBoy Social Logo"
                  />
                </div>
              </a>
            </div>
          </div>
        </aside>
      </div>
    );
  };

  export default FollowersPage;