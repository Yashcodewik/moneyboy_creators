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

const AllCreators = () => {
  const [subActiveTab, setSubActiveTab] = useState<string>("videos");
  const playerRef = useRef<any>(null);
  const [open, setOpen] = useState(false);

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
                    className={`multi-tab-switch-btn active`}
                    onClick={() => setSubActiveTab("trending")}
                  >
                    <ChartNoAxesCombined size={18} /> <span>Trending</span>
                  </button>
                  <button
                    className={`multi-tab-switch-btn`}
                    onClick={() => setSubActiveTab("new")}
                  >
                    <Sparkles size={18} /> <span>New</span>
                  </button>
                  <button
                    className={`multi-tab-switch-btn`}
                    onClick={() => setSubActiveTab("photos")}
                  >
                    <Image size={18} /> <span>Photos</span>
                  </button>
                  <button
                    className={`multi-tab-switch-btn`}
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
                <div className="col-4-cards-layout">
                  {[...Array(8)].map((_, index) => (
                    <div className="creator-media-card card">
                      <div className="creator-media-card__media-wrapper">
                        <div className="creator-media-card__media">
                          <img
                            alt="Post Image"
                            src="/images/profile-avatars/profile-avatar-5.jpg"
                          />
                          <Link
                            href="#"
                            className="ply_btn"
                            onClick={handleOpenFullscreen}
                          >
                            <PlayCircle strokeWidth={1} size={32} />
                          </Link>
                          {/* <Plyr source={{type: "video", poster: "/images/profile-avatars/profile-avatar-5.jpg", sources: [{src: "https://res.cloudinary.com/drhj03nvv/video/upload/v1770026049/posts/69807440e60b526caa6da50c/1770026048286-screen-capture.webm.mkv", type: "video/mp4",},],}} options={{controls: ["play", "mute", "fullscreen"],}}/> */}
                        </div>
                        <div className="creator-media-card__overlay">
                          <div className="creator-media-card__stats">
                            <div className="creator-media-card__stats-btn">
                              <FlameIcon />
                              <span> Trending </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="creator-media-card__desc">
                        <h5>Exclusive Desert Shoot</h5>
                        <p>By Jaxson Geidt</p>
                      </div>
                      <div className="creator-media-card__btn">
                        <h5>
                          From <span>$12.00</span>
                        </h5>
                        <Link href="#" className="btn-txt-gradient btn-outline">
                          <span>Buy</span>
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
