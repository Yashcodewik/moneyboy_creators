"use client";

import Link from "next/link";

interface PostCardProps {
  post: any;
  onLike: (id: string) => void;
  onSave: (id: string) => void;
}

const PostCard = ({ post, onLike, onSave }: PostCardProps) => {
  return (
    <div className="moneyboy-post__container card">
      {/* HEADER */}
      <div className="moneyboy-post__header">
        <a href="#" className="profile-card">
          <div className="profile-card__main">
            <div className="profile-card__avatar-settings">
              <div className="profile-card__avatar">
                <img src={ post.creatorInfo?.profile || "/images/profile-avatars/profile-avatar-1.png" } alt="Profile"/>
              </div>
            </div>

            <div className="profile-card__info">
              <div className="profile-card__name-badge">
                <div className="profile-card__name">{post.creatorInfo?.userName || "User"}</div>
                <div className="profile-card__badge">
                  <img src="/images/logo/profile-badge.png" />
                </div>
              </div>
              <div className="profile-card__username">@{post.creatorInfo?.displayName || "username"}</div>
            </div>
          </div>
        </a>
      </div>

      {/* DESCRIPTION */}
      <div className="moneyboy-post__desc">
        <p>{post.text}</p>
      </div>

      {/* MEDIA */}
      {post.thumbnail && (
        <div className="moneyboy-post__media">
          <div className="moneyboy-post__img">
            <img src={post.thumbnail} alt="Post" />
          </div>
        </div>
      )}

      {/* ACTIONS */}
      <div className="moneyboy-post__actions">
        <ul>
          <li>
            <Link href="#" className={`post-like-btn ${post.isLiked ? "active" : ""}`} onClick={(e) => {e.preventDefault(); onLike(post._id);}}>❤️ <span>{post.likeCount || 0}</span></Link>
          </li>
          <li>
            <Link href="#" onClick={(e) => {e.preventDefault(); onSave(post._id);}}>{post.isSaved ? "Saved" : "Save"}</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PostCard;
