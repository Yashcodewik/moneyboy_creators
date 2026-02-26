"use client";
import React, { memo, useEffect, useRef, useState } from "react";
import { Plyr } from "plyr-react";
import { PlayCircle } from "lucide-react";
import Link from "next/link";
const truncateText = (text: string, limit = 50) =>
  text?.length > limit ? text.slice(0, limit) : text;
const MediaCard = memo(function MediaCard({
  item,
  onOpen,
  onNavigate,
}: {
  item: any;
  onOpen: (item: any) => void;
  onNavigate?: (publicId: string) => void;
}) {
  //   console.log("🔁 MediaCard render:", item._id);

  //   useEffect(() => {
  //     console.log("🟢 MediaCard MOUNT:", item._id);
  //     return () => {
  //       console.log("🔴 MediaCard UNMOUNT:", item._id);
  //     };
  //   }, []);
  const plyrRef = useRef<any>(null);
  const mediaUrl = item.media[0]?.mediaFiles?.[0];
  const isVideo = item.media[0]?.type === "video";
  const [duration, setDuration] = useState<number | null>(null);

  const formatDuration = (seconds: number) => {
    if (!seconds || !isFinite(seconds)) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleMouseEnter = () => {
    const player = plyrRef.current?.plyr;
    if (player) {
      player.muted = true;
      player.currentTime = 0;
      player.play();
    }
  };

  const handleMouseLeave = () => {
    const player = plyrRef.current?.plyr;
    if (player) {
      player.pause();
      player.currentTime = 0;
    }
  };

  const handleLoadedMetadata = () => {
    const player = plyrRef.current?.plyr;
    if (player?.duration && isFinite(player.duration)) {
      setDuration(player.duration);
    }
  };

  const [imgError, setImgError] = useState(false);

  return (
    <div className="pm-page-content-card">
      <div className="pm-page-card-media-container">
        <div
          className="pm-page-card--img"
          onClick={() => onOpen(item)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isVideo ? (
            <>
              <Link href="#" className="ply_btn">
                <PlayCircle strokeWidth={1} size={32} />
              </Link>
              <Plyr
                ref={plyrRef}
                source={{
                  type: "video",
                  sources: [{ src: mediaUrl, type: "video/mp4" }],
                }}
                options={{
                  autoplay: false,
                  muted: true,
                  controls: [],
                  clickToPlay: false,
                  hideControls: true,
                }}
                onLoadedMetadata={handleLoadedMetadata}
              />
            </>
          ) : (
            <>
              {!imgError && mediaUrl ? (
                <img
                  src={mediaUrl}
                  alt={item.publicId}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="nomedia" />
              )}
            </>
          )}
        </div>
        <div className="pm-page-card-icons-wrapper">
          <div className="creator-content-card__stats">
            <div className="creator-content-stat-box mxw_50">
              <div className="eye-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={"24"}
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                    stroke="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              {item.viewCount > 0 ? (
                <span>{item.viewCount}</span>
              ) : (
                <span>0</span>
              )}
            </div>
            {isVideo && duration && (
              <div className="creator-content-stat-box mxw_50">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_4488_3963)">
                      <path
                        d="M6.99967 0C6.66608 0 6.33112 0.0236973 6.00391 0.070182L6.13561 0.994401C6.41931 0.953843 6.71006 0.933333 6.99967 0.933333V0Z"
                        fill="white"
                      />
                      <path
                        d="M5.02878 0.28125C4.71091 0.374219 4.39554 0.491796 4.0918 0.630793L4.48008 1.47936C4.74304 1.35905 5.01579 1.25742 5.29037 1.17721L5.02878 0.28125Z"
                        fill="white"
                      />
                      <path
                        d="M2.41602 1.70774L3.02715 2.41321C3.24407 2.225 3.47741 2.05045 3.72031 1.89323L3.21445 1.10938C2.93464 1.28984 2.66599 1.49128 2.41602 1.70774Z"
                        fill="white"
                      />
                      <path
                        d="M2.41562 3.02565L1.71061 2.41406C1.49277 2.66517 1.29111 2.93405 1.11133 3.21296L1.89609 3.71882C2.05195 3.47683 2.22673 3.24349 2.41562 3.02565Z"
                        fill="white"
                      />
                      <path
                        d="M0.28125 5.02682L1.17676 5.28932C1.25765 5.01361 1.35951 4.74062 1.47959 4.47812L0.630569 4.08984C0.492253 4.3929 0.374677 4.70827 0.28125 5.02682Z"
                        fill="white"
                      />
                      <path
                        d="M0 6.99967H0.933333C0.933333 6.71029 0.953843 6.41953 0.994401 6.13516L0.070182 6.00391C0.0236973 6.33112 0 6.66608 0 6.99967Z"
                        fill="white"
                      />
                      <path
                        d="M7.49896 0.0195312L7.43379 0.95013C10.5922 1.17207 13.0664 3.82943 13.0664 6.99948C13.0664 10.3445 10.345 13.0661 6.99971 13.0661C3.82943 13.0661 1.1723 10.592 0.950587 7.43333L0.0195312 7.49896C0.275423 11.1439 3.34157 13.9995 6.99971 13.9995C10.8595 13.9995 13.9997 10.8595 13.9997 6.99948C13.9997 3.34134 11.1443 0.275195 7.49896 0.0195312Z"
                        fill="white"
                      />
                      <path
                        d="M2.98633 4.57943L5.66886 6.58718C5.62774 6.71885 5.59925 6.85611 5.59925 7.00117C5.59925 7.77318 6.22724 8.40117 6.99925 8.40117C7.77126 8.40117 8.39925 7.77318 8.39925 7.00117C8.39925 6.22917 7.77126 5.60117 6.99925 5.60117C6.7126 5.60117 6.44619 5.68839 6.22403 5.83678L3.54551 3.83203L2.98633 4.57943ZM6.99925 6.53451C7.25651 6.53451 7.46592 6.74369 7.46592 7.00117C7.46592 7.25866 7.25651 7.46784 6.99925 7.46784C6.74199 7.46784 6.53258 7.25866 6.53258 7.00117C6.53258 6.74369 6.74199 6.53451 6.99925 6.53451Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_4488_3963">
                        <rect width="14" height="14" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <span>{formatDuration(duration)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pm-page-card-body lineclamp1">
        <h2>{`${truncateText(item.text)}${item.text?.length > 50 ? "..." : ""}`}</h2>
      </div>

      <div className="pm-page-card-footer">
        <div className="profile-card">
          <Link
            href={""}
            className="profile-card__main"
          >
            <div className="profile-card__avatar-settings">
              <div className="profile-card__avatar">
                {item.creator.profile ? (
                  <img
                    src={item.creator.profile}
                    alt={item.creator.displayName}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
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
                  {item.creator.displayName}
                </div>
                <div className="profile-card__badge">
                  <img
                    src="/images/logo/profile-badge.png"
                    alt="MoneyBoy Social Profile Badge"
                  />
                </div>
              </div>
              <div className="profile-card__username">
                @{item.creator.userName}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default MediaCard;
