"use client";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

const PostCard = () => {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(3);
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    setSaved((prev) => !prev);
  };

  return (
    <div className="moneyboy-post__container card">
      <div className="moneyboy-post__header">
        <a href="#" className="profile-card">
          <div className="profile-card__main">
            <div className="profile-card__avatar-settings">
              <div className="profile-card__avatar">
                <img alt="MoneyBoy Social Profile Avatar" src="https://res.cloudinary.com/drhj03nvv/image/upload/v1768307520/profile/1768307518783-post-img-13.jpg.jpg" />
              </div>
            </div>

            <div className="profile-card__info">
              <div className="profile-card__name-badge">
                <div className="profile-card__name">tulidev</div>
                <div className="profile-card__badge">
                  <img alt="MoneyBoy Social Profile Badge" src="/images/logo/profile-badge.png" />
                </div>
              </div>
              <div className="profile-card__username">@tulid123</div>
            </div>
          </div>
        </a>

        <div className="moneyboy-post__upload-more-info">
          <div className="moneyboy-post__upload-time">2 days ago</div>
          
          <div className="rel-user-more-opts-wrapper">
            <button className="rel-user-more-opts-trigger-icon" onClick={() => setOpen(!open)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path d="M5 10.5C3.9 10.5 3 11.4 3 12.5C3 13.6 3.9 14.5 5 14.5C6.1 14.5 7 13.6 7 12.5C7 11.4 6.1 10.5 5 10.5Z" stroke="none" stroke-width="1.5"></path>
                <path d="M19 10.5C17.9 10.5 17 11.4 17 12.5C17 13.6 17.9 14.5 19 14.5C20.1 14.5 21 13.6 21 12.5C21 11.4 20.1 10.5 19 10.5Z" stroke="none" stroke-width="1.5"></path>
                <path d="M12 10.5C10.9 10.5 10 11.4 10 12.5C10 13.6 10.9 14.5 12 14.5C13.1 14.5 14 13.6 14 12.5C14 11.4 13.1 10.5 12 10.5Z" stroke="none" stroke-width="1.5"></path>
              </svg>
            </button>

            <div className="rel-users-more-opts-popup-wrapper" style={{transform: open ? "translate(0px, 0px)" : "translate(0px, -10px)", height: open ? "auto" : "0px", opacity: open ? 1 : 0, display: open ? "block" : "none", overflow: "visible",left: "auto", transition: "all 0.2s ease",}}>
              <div className="rel-users-more-opts-popup-container">
                <ul>
                  <li data-copy-post-link="inset-post-link-here">
                    <div className="icon copy-link-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244">
                        </path>
                      </svg>
                    </div>
                    <span>Copy Link</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="moneyboy-post__desc">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien. Integer tortor tellus, aliquam... <span className="active-down-effect-2x">more </span></p>
      </div>

      <div className="moneyboy-post__media">
        <div className="moneyboy-post__img">
        <Swiper slidesPerView={1} spaceBetween={15} navigation={true} modules={[Navigation]} className="post_swiper">
          <SwiperSlide><img alt="MoneyBoy Post Image" src="/images/post-images/post-img-1.png"/></SwiperSlide>
          <SwiperSlide><img alt="MoneyBoy Post Image" src="/images/post-images/post-img-2.png"/></SwiperSlide>
          <SwiperSlide><img alt="MoneyBoy Post Image" src="/images/post-images/post-img-3.png"/></SwiperSlide>
        </Swiper>
        </div>

        <div className="moneyboy-post__actions">
          <ul>
            {/* Send Tip */}
            <li>
              <Link href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9.99 17.98C14.4028 17.98 17.98 14.4028 17.98 9.99C17.98 5.57724 14.4028 2 9.99 2C5.57724 2 2 5.57724 2 9.99C2 14.4028 5.57724 17.98 9.99 17.98Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M12.98 19.88C13.88 21.15 15.35 21.98 17.03 21.98C19.76 21.98 21.98 19.76 21.98 17.03C21.98 15.37 21.16 13.9 19.91 13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M8 11.4C8 12.17 8.6 12.8 9.33 12.8H10.83C11.47 12.8 11.99 12.25 11.99 11.58C11.99 10.85 11.67 10.59 11.2 10.42L8.8 9.58001C8.32 9.41001 8 9.15001 8 8.42001C8 7.75001 8.52 7.20001 9.16 7.20001H10.66C11.4 7.21001 12 7.83001 12 8.60001" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M10 12.85V13.59" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path className="dollar-sign" d="M10 6.40997V7.18997" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                <span>Send Tip</span>
              </Link>
            </li>

            {/* Like */}
            <li>
              <Link href="#" className="post-like-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>3</span>
              </Link>
            </li>

            {/* Comment */}
            <li>
              <Link href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M7 8H17" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M7 13H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                <span>0</span>
              </Link>
            </li>
          </ul>

          <ul>
            {/* Share */}
            <li>
              <Link href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5.15002 2V22" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M5.15002 4H16.35C19.05 4 19.65 5.5 17.75 7.4L16.55 8.6C15.75 9.4 15.75 10.7 16.55 11.4L17.75 12.6C19.65 14.5 18.95 16 16.35 16H5.15002" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </Link>
            </li>

            {/* Save */}
            <li>
              <Link href="#">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
