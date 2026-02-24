"use client";

import React, { useEffect, useRef, useState } from "react";
import Featuredboys from "../Featuredboys";
import { useDeviceType } from "@/hooks/useDeviceType";
import { Check, Eye, X } from "lucide-react";
import { CgClose } from "react-icons/cg";
import { getApiWithOutQuery } from "@/utils/endpoints/common";
import { API_GET_NOTIFICATIONS } from "@/utils/api/APIConstant";
import ShowToast from "../common/ShowToast";

const NotificationPage = () => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
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
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
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
      url: API_GET_NOTIFICATIONS,
    });

    if (res?.success) {
      setNotifications(res.notifications);
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
}

  return (
    <>
      <div className="moneyboy-2x-1x-layout-container">
        <div className="moneyboy-2x-1x-a-layout">
          <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers">
            <div className="noti-page-container card">
              <div className="noti-page-header">
                <div className="noti-page-title">
                  <h2>Notifications</h2>
                  <div className="noti-num-circle">
                    <span>{notifications.length}</span>
                  </div>
                </div>
              </div>
              <div className="noti-list-wrapper">
  {loading && <p>Loading...</p>}

  {!loading && notifications.length === 0 && (
    <p>No notifications</p>
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

          {noti.type === 3 && (
            <div className="noti-more-actions iconbtn">
              <button className="btn-gray viewbtn">
                <Eye size={16} />
              </button>
              <button className="btn-gray acceptbtn">
                <Check size={16} />
              </button>
              <button className="btn-gray declinebtn">
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="noti-desc">
          <p>
            {noti.type === 3
              ? "Collaboration request awaiting approval."
              : ""}
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
      <div className="modal" role="dialog">
      <form className="modal-wrap notipost-modal">
        <button type="button" className="close-btn"><CgClose size={22} /></button>
        <h3 className="title">Post Details</h3>
        <div className="post_wrap">
          <div className="img_wrap">
            <img src="/images/post-images/post-img-1.png" alt="Profile Avatar"/>
          </div>
          <div className="details_wrap">
            <div className="charge_wrap">
              <p>you earning</p>
              <div className="right_box"><span>35%</span></div>
            </div>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
            <ul>
              <li><img src="/images/post-images/post-img-2.png" alt="Profile Avatar" className="user_icons"/> <span>@Yashravel</span></li>
              <li><img src="/images/post-images/post-img-3.png" alt="Profile Avatar" className="user_icons"/> <span>@Hemilsolanki</span></li>
            </ul>
          </div>
        </div>
        <div className="actions mt-3">
          <button className="btn-danger active-down-effect" type="button"><span>Rejected</span></button>
          <button className="premium-btn active-down-effect" type="button"><span>Accepted</span></button>
        </div>
      </form>
    </div>
    </>
  );
};

export default NotificationPage;