"use client";
import React, { useEffect, useState } from "react";
import Featuredboys from "../Featuredboys";
import { BadgeCheck, Check, CircleX, Clock, Eye, X } from "lucide-react";
import { CgClose } from "react-icons/cg";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";
import {
  API_APPROVE_POST,
  API_GET_NOTIFICATIONS,
  API_REJECT_POST,
} from "@/utils/api/APIConstant";
import ShowToast from "../common/ShowToast";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { showAcceptPostConsent, showDeclineReason } from "@/utils/alert";
import { useRouter } from "next/navigation";
import socket from "@/libs/socket";
import InfiniteScrollWrapper from "../common/InfiniteScrollWrapper";
import { useDispatch } from "react-redux";
import { updatePostCount } from "@/redux/other/followSlice";
import Modal from "../Modal";
import { useSession } from "next-auth/react";

const NotificationPage = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [countdownTo, setCountdownTo] = useState<number>(Date.now());
  const [isExpired, setIsExpired] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const fetchNotifications = async (pageNumber = 1) => {
    try {
      if (pageNumber === 1) setLoading(true);
      const res = await getApiWithOutQuery({
        url: `${API_GET_NOTIFICATIONS}?page=${pageNumber}&limit=15`,
      });
      if (res?.success) {
        const newData = res.notifications || [];
        if (pageNumber === 1) {
          setNotifications(newData);
          socket.emit("markNotificationsRead");
        } else {
          setNotifications((prev) => {
            const map = new Map(
              [...prev, ...newData].map((item) => [item._id, item])
            );
            return Array.from(map.values());
          });
        }
        setHasMore(pageNumber < (res.pagination?.totalPages || 1));
      }
    } catch (err) {
      ShowToast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNotifications(1);
  }, []);

  useEffect(() => {
  if (!socket) return;

  const handleNewNotification = () => {
    fetchNotifications(1);
  };

  socket.on("newNotification", handleNewNotification);

  return () => {
    socket.off("newNotification", handleNewNotification);
  };
}, []);

  const fetchMoreNotifications = () => {
    if (!hasMore) return;
    setPage((prev) => {
      const next = prev + 1;
      fetchNotifications(next);
      return next;
    });
  };
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleAcceptPost = async (noti: any) => {
    const ok = await showAcceptPostConsent();
    if (!ok) return;

    const res = await apiPost({
      url: API_APPROVE_POST,
      values: { postId: noti.referenceId },
    });

    if (res?.success) {
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === noti._id
            ? { ...n, postTag: { ...n.postTag, myStatus: "approved" } }
            : n
        )
      );

      dispatch(updatePostCount(1));

      setShowModal(false);
    }
  };

  const handleRejectPost = async (noti: any) => {
    const reason = await showDeclineReason();
    if (!reason) return;

    const res = await apiPost({
      url: API_REJECT_POST,
      values: { postId: noti.referenceId, reason },
    });

    if (res?.success) {
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === noti._id
            ? { ...n, postTag: { ...n.postTag, myStatus: "rejected" } }
            : n
        )
      );

      setShowModal(false);
    }
  };

  const goToProfile = (user?: any) => {
    if (!user) return;

    const role = user?.role;
    const publicId = user?.publicId;
    const userName = user?.userName;

    console.log("NAV USER:", user);

    if (role === 1) {
      // 👤 normal user
      router.push(`/userprofile/${publicId}`);
    } else if (role === 2) {
      // ⭐ creator
      router.push(`/${userName}`);
    } else {
      // fallback
      router.push(`/${userName}`);
    }
  };

  const isOwner =
    session?.user?.publicId === selectedPost?.postTag?.taggedBy?.publicId;

  // useEffect(() => {
  //   if (!selectedPost?.createdAt) return;

  //   const created = new Date(selectedPost.createdAt).getTime();
  //   const expiry = created + 24 * 60 * 60 * 1000;
  //   const now = Date.now();

  //   setCountdownTo(expiry <= now ? now + 1000 : expiry);
  // }, [selectedPost]);

  useEffect(() => {
    if (!selectedPost) return;

    if ([9, 10, 11].includes(selectedPost?.type) && selectedPost?.expiresAt) {
      const expiry = new Date(selectedPost.expiresAt).getTime();
      const now = Date.now();
      setCountdownTo(expiry <= now ? now + 1000 : expiry);
      setIsExpired(now >= expiry);
      return;
    }

    if (!selectedPost?.createdAt) return;
    const created = new Date(selectedPost.createdAt).getTime();
    const expiry = created + 24 * 60 * 60 * 1000;
    const now = Date.now();
    setCountdownTo(expiry <= now ? now + 1000 : expiry);
    setIsExpired(now >= expiry);
  }, [selectedPost]);
  return (
    <>
      <div className="moneyboy-2x-1x-layout-container">
        <div className="moneyboy-2x-1x-a-layout">
          <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers">
            <div className="noti-page-container card">
              <div className="noti-page-header">
                <div className="noti-page-title">
                  <h2>Notifications</h2>
                  {/* {notifications.length > 0 && (
                    <div className="noti-num-circle">
                      <span>{notifications.length}</span>
                    </div>
                  )} */}
                </div>
              </div>
              <div
                id="feed-scroll-container"
                className="moneyboy-posts-scroll-container noti-list-wrapper"
              >
                <InfiniteScrollWrapper
                  dataLength={notifications.length}
                  fetchMore={fetchMoreNotifications}
                  hasMore={hasMore}
                  scrollableTarget="feed-scroll-container"
                >
                  {notifications.map((noti) => (
                    <div className="noti-item" key={noti._id}   onClick={() => {
    if ([3, 4, 9, 10, 11,8].includes(noti.type)) {
      setSelectedPost(noti);
      setShowModal(true);
    }
  }}
  style={{
    cursor: [3, 4, 9, 10, 11,8].includes(noti.type)
      ? "pointer"
      : "default",
  }}
                    >
                      <div
                        className="noti-item--icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            [9, 10, 11].includes(noti.type) &&
                            noti.referenceId
                          ) {
                            router.push(
                              `/message?threadId=${noti.referenceId}`
                            );
                          } else {
                            goToProfile(
                              noti.senderId || noti.postTag?.taggedBy
                            );
                          }
                        }}
                      >
                        <img
                          src={
                            noti.senderId?.profile ||
                            "/images/logo/black-logo-square.png"
                          }
                          alt="profile"
                          onError={(e: any) => {
                            e.currentTarget.src =
                              "/images/logo/black-logo-square.png";
                          }}
                        />
                      </div>
                      <div className="noti-details-container">
                        <div className="noti-title-time-wrapper">
                          <div className="noti-title">
                            <h4>
                              @{noti.senderId?.userName} {noti.title}
                            </h4>
                          </div>
                          <div className="noti-time">
                            <span>{formatTime(noti.createdAt)}</span>
                          </div>
                          {(noti.postPreview ||
                            [9, 10, 11].includes(noti.type)) && (
                              <div className="noti-more-actions iconbtn btntooltip_wrapper">
                                <button
                                  className="btn-gray viewbtn"
                                  data-tooltip="View Details"
                                  onClick={() => {
                                    setSelectedPost(noti);
                                    setShowModal(true);
                                  }}
                                >
                                  <Eye size={16} />
                                </button>
                                {noti.postTag?.myStatus === "pending" &&
                                  noti.type === 3 &&
                                  Date.now() <
                                  new Date(noti.createdAt).getTime() +
                                  24 * 60 * 60 * 1000 && (
                                    <>
                                      <button
                                        className="btn-gray acceptbtn"
                                        data-tooltip="Accept"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleAcceptPost(noti);
                                        }}
                                      >
                                        {" "}
                                        <Check size={16} />
                                      </button>
                                      <button
                                        className="btn-gray declinebtn"
                                        data-tooltip="Decline"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleRejectPost(noti);
                                        }}
                                      >
                                        <X size={16} />
                                      </button>
                                    </>
                                  )}
                              </div>
                            )}
                        </div>
                        <div className="noti-desc">
                          <p>
                            {" "}
                            {noti.type === 3 &&
                              (noti.postTag?.myStatus === "pending"
                                ? "Review this collaboration request and choose to accept or decline."
                                : noti.postTag?.myStatus === "approved"
                                  ? "Collaboration request accepted"
                                  : noti.postTag?.myStatus === "rejected"
                                    ? "Collaboration request declined"
                                    : "")}
                            {noti.type === 4 &&
                              "Collaboration response received."}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </InfiniteScrollWrapper>
              </div>
            </div>
          </div>
        </div>
        <aside className="moneyboy-2x-1x-b-layout scrolling">
          <Featuredboys />
        </aside>
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        size="lg"
        title="Post Details"
        className="notipost_wrap"
      >
        <form className="modal_containt notipost-modal">
          <div
            className="post_wrap"
            style={{
              display: [9, 10, 11].includes(selectedPost?.type)
                ? "none"
                : "block",
            }}
          >
            {/* POST IMAGES */}
            <div className="img_wrap">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation={selectedPost?.postPreview?.media?.length > 1}
                pagination={{ clickable: true }}
                autoplay={
                  selectedPost?.postPreview?.media?.length > 1
                    ? { delay: 3000 }
                    : false
                }
                loop={selectedPost?.postPreview?.media?.length > 1}
              >
                {selectedPost?.postPreview?.media?.length > 0 &&
                  selectedPost.postPreview.media.map(
                    (mediaUrl: string, i: number) => (
                      <SwiperSlide key={i}>
                        {selectedPost?.postPreview?.mediaType === "video" ? (
                          <video src={mediaUrl} controls />
                        ) : (
                          <img src={mediaUrl} alt="post media" />
                        )}
                      </SwiperSlide>
                    )
                  )}
              </Swiper>
            </div>
            {/* DETAILS */}
            <div className="details_wrap">
              {/* earning */}
              <div className="charge_wrap">
                <p>Earnings From This Post</p>
                <div className="right_box">
                  {selectedPost?.postPreview?.accessType === "pay_per_view" && (
                    <span className="premium-btn">
                      <span>{selectedPost?.postTag?.myPercentage ?? 0}%</span>
                    </span>
                  )}
                  {selectedPost?.postPreview?.accessType === "subscriber" && (
                    <span className="premium-btn success">
                      <span>Subscription</span>
                    </span>
                  )}
                  {selectedPost?.postPreview?.accessType === "free" && (
                    <span className="premium-btn gray">
                      <span>Free</span>
                    </span>
                  )}
                </div>
              </div>
              <p>{selectedPost?.postPreview?.text}</p>
              <ul>
                {selectedPost?.postTag?.taggedBy && (
                  <li
                    key={selectedPost.postTag.taggedBy._id}
                    onClick={() => goToProfile(selectedPost.postTag.taggedBy)}
                  >
                    <img
                      src={
                        selectedPost.postTag.taggedBy.profile ||
                        "/images/logo/black-logo-square.png"
                      }
                      alt="Profile Avatar"
                      className="user_icons"
                    />
                    <span>@{selectedPost.postTag.taggedBy.userName}</span>
                  </li>
                )}
                {selectedPost?.postTag?.taggedUsers
                  ?.filter((u: any) => u?.user)
                  .map((u: any) => (
                    <li key={u.user?._id} onClick={() => goToProfile(u.user)}>
                      <img
                        src={
                          u.user?.profile ||
                          "/images/logo/black-logo-square.png"
                        }
                        alt="Profile Avatar"
                        className="user_icons"
                      />
                      <span>@{u.user?.userName}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          {selectedPost?.postTag && ![9, 10, 11].includes(selectedPost?.type) && (
            <div
              className={`approval_wrap ${selectedPost?.postTag?.myStatus === "approved"
                  ? "approved"
                  : selectedPost?.postTag?.myStatus === "rejected"
                    ? "rejected"
                    : "pending"
                }`}
            >
              {selectedPost?.postTag?.myStatus === "approved" && (
                <div className="head">
                  <h3>Post Approved</h3> <BadgeCheck />
                </div>
              )}
              {selectedPost?.postTag?.myStatus === "rejected" && (
                <>
                  <div className="head">
                    <h3>Post Rejected</h3> <CircleX color="#c62828" />
                  </div>
                  {selectedPost?.postTag?.myRejectReason && (
                    <p className="reject_reason">
                      Reason: {selectedPost.postTag.myRejectReason}
                    </p>
                  )}
                </>
              )}
              {selectedPost?.postTag?.myStatus === "pending" && (
                <>
                  <div className="head">
                    <h3>
                      {isOwner
                        ? "Waiting for approvals"
                        : "Collaboration Request Pending"}
                    </h3>
                    <Clock />
                  </div>

                  <p className="pending_text">
                    {isOwner
                      ? "You have invited creators to collaborate. Waiting for their response."
                      : "You have been tagged in this post and invited to collaborate. Please review and accept or decline."}
                  </p>
                </>
              )}
              {/* PPV Notification Modal Content */}

            </div>
          )}
          {[9, 10, 11].includes(selectedPost?.type) && (
            <>
              <div
                className={`approval_wrap ${selectedPost?.type === 10
                    ? "approved"
                    : selectedPost?.type === 11
                      ? "rejected"
                      : "pending"
                  }`}
              >
                <div className="head">
                  <h3>
                    {selectedPost?.type === 9 && "PPV Request Received"}
                    {selectedPost?.type === 10 && "PPV Request Accepted"}
                    {selectedPost?.type === 11 && "PPV Request Declined"}
                  </h3>
                  {selectedPost?.type === 10 && <BadgeCheck />}
                  {selectedPost?.type === 11 && <CircleX color="#c62828" />}
                  {selectedPost?.type === 9 && <Clock />}
                </div>
                <p className="pending_text">
                  {selectedPost?.type === 9 &&
                    "You received a new PPV request. Click below to view it in chat."}
                  {selectedPost?.type === 10 &&
                    "Your PPV request has been accepted."}
                  {selectedPost?.type === 11 &&
                    "Your PPV request has been declined."}
                </p>
              </div>

              {/* Countdown for type 9 only */}
              {selectedPost?.type === 9 && !isExpired && (
                <div className="timer_wrap mt-3">
                  <p>Expires In</p>
                  <FlipClockCountdown
                    key={selectedPost._id}
                    to={countdownTo}
                    labels={["", "", "", ""]}
                    renderMap={[false, true, true, true]}
                    showSeparators={true}
                    labelStyle={{ display: "none" }}
                    digitBlockStyle={{ width: 26, height: 34, fontSize: 18 }}
                  >
                    Finished
                  </FlipClockCountdown>
                </div>
              )}

              {/* Go to chat button */}
              <div className="actions">
                <button
                  type="button"
                  className="premium-btn active-down-effect"
                  onClick={() => {
                    setShowModal(false);
                    router.push(
                      `/message?threadId=${selectedPost?.referenceId}`
                    );
                  }}
                >
                  <span>View in Chat</span>
                </button>
              </div>
            </>
          )}
          {/* TIMER */}
          {selectedPost?.postTag?.myStatus === "pending" && !isOwner && (
            <div className="timer_wrap mt-3">
              <p>Response Deadline</p>
              <FlipClockCountdown
                key={countdownTo}
                to={countdownTo}
                labels={["", "", "", ""]}
                renderMap={[false, true, true, true]}
                showSeparators={true}
                labelStyle={{ display: "none" }}
                digitBlockStyle={{ width: 26, height: 34, fontSize: 18 }}
              >
                Finished
              </FlipClockCountdown>
            </div>
          )}
          {selectedPost?.postTag?.myStatus === "pending" &&
            !isExpired &&
            !isOwner && (
              <div className="actions">
                <button
                  type="button"
                  className="btn-danger active-down-effect"
                  onClick={() => handleRejectPost(selectedPost)}
                >
                  Decline
                </button>
                <button
                  type="button"
                  className="premium-btn active-down-effect"
                  onClick={() => handleAcceptPost(selectedPost)}
                >
                  <span>Accept</span>
                </button>
              </div>
            )}
        </form>
      </Modal>
    </>
  );
};

export default NotificationPage;
