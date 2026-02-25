"use client";

import React, { useEffect, useRef, useState } from "react";
import Featuredboys from "../Featuredboys";
import { useDeviceType } from "@/hooks/useDeviceType";
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
import {
  showAcceptPostConsent,
  showSuccess,
  showError,
  showDeclineReason,
} from "@/utils/alert";

const NotificationPage = () => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [countdownTo, setCountdownTo] = useState<number>(Date.now());
  const isMobile = useDeviceType();
  const desktopStyle: React.CSSProperties = {
    transform: "translate(0px, 0px)",
    opacity: 1,
    display: "block",
    overflow: "visible",
    left: "auto",
    transition: "all 0.2s ease",
  };
  const mobileStyle: React.CSSProperties = {
    position: "fixed",
    left: "0%",
    bottom: "25px",
    width: "100%",
    zIndex: 1000,
    transform: "translate(0px, 0px)",
    display: "block",
    overflow: "hidden",
    transition: "transform 0.25s ease",
  };
  useEffect(() => {
    if (!isMobile) return;
    const overlay = document.querySelector(".mobile-popup-overlay");
    if (!overlay) return;
    if (openMenuId !== null) {
      overlay.classList.add("active");
    } else {
      overlay.classList.remove("active");
    }
    return () => {
      overlay.classList.remove("active");
    };
  }, [openMenuId, isMobile]);
  const toggleMenu = (id: number) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const res = await getApiWithOutQuery({
        url: `${API_GET_NOTIFICATIONS}?page=1&limit=20`,
      });

      if (res?.success) {
        setNotifications(res.notifications || []);
      } else {
        ShowToast("Failed to load notifications", "error");
      }
    } catch (err) {
      ShowToast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handlePublish = async () => {
    const accepted = await showAcceptPostConsent();
    if (!accepted) return;
    showSuccess("Post published successfully!");
  };

  // const endTime = new Date().getTime() + 24 * 60 * 60 * 1000;

  const getCountdownEndTime = () => {
    if (!selectedPost?.createdAt) return Date.now();

    const createdTime = new Date(selectedPost.createdAt).getTime();

    // 24 hours validity window
    const expiryTime = createdTime + 24 * 60 * 60 * 1000;

    return expiryTime;
  };

  useEffect(() => {
    if (!selectedPost?.createdAt) return;

    const created = new Date(selectedPost.createdAt).getTime();

    // expiry after 24 hours
    const expiry = created + 24 * 60 * 60 * 1000;

    const now = Date.now();

    // if expired → show finished
    if (expiry <= now) {
      setCountdownTo(now + 1000); // triggers "Finished"
    } else {
      setCountdownTo(expiry);
    }
  }, [selectedPost]);

  const handleAcceptPost = async (noti: any) => {
    const ok = await showAcceptPostConsent();
    if (!ok) return;

    const res = await apiPost({
      url: API_APPROVE_POST,
      values: { postId: noti.referenceId },
    });

    if (res?.success) {
      ShowToast(res.message, "success");

      // update UI instantly
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === noti._id
            ? { ...n, postTag: { ...n.postTag, myStatus: "approved" } }
            : n,
        ),
      );

      setShowModal(false);
    } else {
      ShowToast(res?.message || "Failed", "error");
    }
  };

  const handleRejectPost = async (noti: any) => {
    const reason = await showDeclineReason();
    if (!reason) return;

    const res = await apiPost({
      url: API_REJECT_POST,
      values: {
        postId: noti.referenceId,
        reason,
      },
    });

    if (res?.success) {
      ShowToast(res.message, "success");

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === noti._id
            ? { ...n, postTag: { ...n.postTag, myStatus: "rejected" } }
            : n,
        ),
      );

      setShowModal(false);
    } else {
      ShowToast(res?.message || "Failed", "error");
    }
  };
  return (
    <>
      <div className="moneyboy-2x-1x-layout-container">
        <div className="moneyboy-2x-1x-a-layout">
          <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers">
            <div className="noti-page-container card">
              <div className="noti-page-header">
                <div className="noti-page-title">
                  <h2>Notifications</h2>
                  {notifications.length > 0 && (
                    <div className="noti-num-circle">
                      <span>{notifications.length}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="noti-list-wrapper">
                {loading && (
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

                {!loading && notifications.length === 0 && (
                  <div className="nofound small">
                    <h3 className="first">No Notifications Found</h3>
                    <h3 className="second">No Notifications Found</h3>
                  </div>
                )}

                {notifications.map((noti) => (
                  <div className="noti-item" key={noti._id}>
                    <div className="noti-item--icon">
                      <img
                        src={
                          noti.senderId?.profile ||
                          "/images/logo/black-logo-square.png"
                        }
                        alt="#"
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
                        {noti.postPreview && (
                          <div className="noti-more-actions iconbtn">
                            <button
                              className="btn-gray viewbtn"
                              onClick={() => {
                                setSelectedPost(noti);
                                setShowModal(true);
                              }}
                            >
                              <Eye size={16} />
                            </button>

                            {noti.postTag?.myStatus === "pending" && (
                              <>
                                <button
                                  className="btn-gray acceptbtn"
                                  onClick={() => handleAcceptPost(noti)}
                                >
                                  <Check size={16} />
                                </button>
                                <button
                                  className="btn-gray declinebtn"
                                  onClick={() => handleRejectPost(noti)}
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
                          {noti.type === 3 &&
                            "Collaboration request awaiting approval."}
                          {noti.type === 4 &&
                            "Collaboration response received."}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Featuredboys />
      </div>
      {showModal && (
        <div className="modal show" role="dialog">
          <form className="modal-wrap notipost-modal">
            <button type="button" className="close-btn" onClick={() => setShowModal(false)}><CgClose size={22} /></button>
            <h3 className="title">Post Details</h3>
            <div className="post_wrap">
              {/* POST IMAGES */}
              <div className="img_wrap">
                <Swiper modules={[Navigation, Pagination, Autoplay]} spaceBetween={20} slidesPerView={1} navigation pagination={{ clickable: true }} autoplay={{ delay: 3000 }} loop={true}>
                  {selectedPost?.postPreview?.media?.map(
                    (img: string, i: number) => (
                      <SwiperSlide key={i}><img src={img} alt="post media" /></SwiperSlide>
                    ),
                  )}
                </Swiper>
              </div>
              {/* DETAILS */}
              <div className="details_wrap">
                {/* earning */}
                <div className="charge_wrap">
                  <p>you earning</p>
                  <div className="right_box"><span>{selectedPost?.postTag?.myPercentage ?? 0}%</span></div>
                </div>
                <p>{selectedPost?.postPreview?.text}</p>
                <ul>
                  {selectedPost?.postTag?.taggedBy && (
                    <li key={selectedPost.postTag.taggedBy._id}>
                      <img src={selectedPost.postTag.taggedBy.profile || "/images/logo/black-logo-square.png"} alt="Profile Avatar" className="user_icons" />
                      <span>@{selectedPost.postTag.taggedBy.userName}</span>
                    </li>
                  )}
                  {selectedPost?.postTag?.taggedUsers?.map((u: any) => (
                    <li key={u.user._id}>
                      <img src={u.user.profile || "/images/logo/black-logo-square.png"} alt="Profile Avatar" className="user_icons" />
                      <span>@{u.user.userName}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={`approval_wrap ${selectedPost?.postTag?.myStatus === "approved" ? "approved" : selectedPost?.postTag?.myStatus === "rejected" ? "rejected" : "pending"}`}>
              {selectedPost?.postTag?.myStatus === "approved" && (
                <div className="head"><h3>Post Approved</h3> <BadgeCheck /></div>
              )}
              {selectedPost?.postTag?.myStatus === "rejected" && (
                <>
                  <div className="head"><h3>Post Rejected</h3> <CircleX color="#c62828" /></div>
                  {selectedPost?.postTag?.myRejectReason && (
                    <p className="reject_reason">Reason: {selectedPost.postTag.myRejectReason}</p>
                  )}
                </>
              )}
              {selectedPost?.postTag?.myStatus === "pending" && (
                <>
                  <div className="head"> <h3>Pending Review</h3> <Clock /></div>
                  <p className="pending_text">This post is awaiting moderation. Please review and take action.</p>
                </>
              )}
            </div>
            {/* TIMER */}
            <div className="timer_wrap mt-3">
              <p>You Have To View This Post Times</p>
              <FlipClockCountdown key={countdownTo} to={countdownTo} labels={["", "", "", ""]} renderMap={[false, true, true, true]} showSeparators={true} labelStyle={{ display: "none" }} digitBlockStyle={{ width: 26, height: 34, fontSize: 18 }}>Finished</FlipClockCountdown>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default NotificationPage;
