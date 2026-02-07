"use client";
import Link from "next/link";
import React, { useState } from "react";
import UnlockContentModal from "../ProfilePage/UnlockContentModal";

interface WishlistMediaCardProps {
  id: number;
  image: string;
  mediaType?: "image" | "video";
  description: string;
  price?: string;
  likes: number;
  views: number;
  isSubscriberOnly?: boolean;
  isLiked?: boolean;
  onLike?: (id: number) => void;
  isSaved?: boolean;
  onToggleSave?: (id: number) => void;
  onUnlock?: () => void;
  onSubscribe?: () => void;
}
const WishlistMediaCard = ({
  id,
  image,
  description,
  price = "$10.00",
  mediaType,
  likes,
  views,
  isSubscriberOnly = false,
  isLiked = false,
  isSaved = false,
  onLike,
  onToggleSave,
  onUnlock,
  onSubscribe
}: WishlistMediaCardProps) => {
  const [liked, setLiked] = useState(isLiked);

    
  const handleLike = () => {
    setLiked((prev) => !prev);
    onLike?.(id);
  };
  
  return (
    <>
    <div className="creator-content-card-container profile_card wishlist_card">
      <div className="creator-content-card">
        <div className="creator-content-card__media">
          <div className="creator-card__img">
            {mediaType === "video" ? (
              <video
                src={image}
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <img src={image} alt="Creator Content" />
            )}
          </div>{" "}
          <div className="creator-media-card__overlay">
            <div className="creator-media-card__stats">
              <Link
                href="#"
                className={`creator-media-card__stats-btn wishlist-icon ${isSaved ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleSave?.(id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={isSaved ? "#6c5ce7" : "none"}
                >
                  <path
                    d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
          {isSubscriberOnly ? (
            <div className="content-locked-label"
               onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onSubscribe?.(); // ✅ OPEN MODAL
    }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  d="M14.5413 15.8167H6.70801C6.35801 15.8167 5.96634 15.5417 5.84968 15.2083L2.39968 5.55834C1.90801 4.17501 2.48301 3.75001 3.66634 4.60001L6.91634 6.92501C7.45801 7.30001 8.07468 7.10834 8.30801 6.50001L9.77468 2.59167C10.2413 1.34167 11.0163 1.34167 11.483 2.59167L12.9497 6.50001C13.183 7.10834 13.7997 7.30001 14.333 6.92501L17.383 4.75001C18.683 3.81667 19.308 4.29168 18.7747 5.80001L15.408 15.225C15.283 15.5417 14.8913 15.8167 14.5413 15.8167Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>For Subscribers</span>
            </div>
          ) : (
            <div className="content-locked-label"
     onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    onUnlock?.();
  }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  d="M5.375 8.33335V6.66669C5.375 3.90835 6.20833 1.66669 10.375 1.66669C14.5417 1.66669 15.375 3.90835 15.375 6.66669V8.33335"
                  stroke="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.3753 15.4167C11.5259 15.4167 12.4587 14.4839 12.4587 13.3333C12.4587 12.1827 11.5259 11.25 10.3753 11.25C9.22473 11.25 8.29199 12.1827 8.29199 13.3333C8.29199 14.4839 9.22473 15.4167 10.3753 15.4167Z"
                  stroke="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.542 18.3333H6.20866C2.87533 18.3333 2.04199 17.5 2.04199 14.1666V12.5C2.04199 9.16665 2.87533 8.33331 6.20866 8.33331H14.542C17.8753 8.33331 18.7087 9.16665 18.7087 12.5V14.1666C18.7087 17.5 17.8753 18.3333 14.542 18.3333Z"
                  stroke="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{price}</span>
            </div>
          )}
        </div>
        <div className="desc-btns">
          <div className="creator-content-card__description">
            <p>{description}</p>
          </div>
          <div className="creator-content-card__stats btm_btns">
            <div className="creator-content-stat-box thumup-btn active">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                  <path d="M7 10v12" />
                </svg>
              </button>
              <span>{likes}</span>
            </div>
            <div className="creator-content-stat-box views-btn active">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
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
                  />
                  <path
                    d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <span>{views}</span>
            </div>
          </div>
        </div>
      </div>
    </div>




    </>
  );
};

export default WishlistMediaCard;
