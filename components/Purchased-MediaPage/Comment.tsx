"use client";
import React, { memo, useEffect, useRef, useState } from "react";
import { Plyr } from "plyr-react";
import { PlayCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import Link from "next/link";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addComment, dislikeComment, fetchComments, likeComment } from "@/redux/other/commentSlice";
import { useDecryptedSession } from "@/libs/useDecryptedSession";
const timeAgo = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} days ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} weeks ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} months ago`;

  const years = Math.floor(days / 365);
  return `${years} years ago`;
};

const CommentsSection = memo(function CommentsSection({
    item,
}: {
    item: any;

}) {
    const [showComments, setShowComments] = useState<boolean>(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const emojiBtnRef = useRef<HTMLDivElement | null>(null);
    const [commentText, setCommentText] = useState("");

    const { session } = useDecryptedSession();

const currentUserId = session?.user?.id;


    const dispatch = useDispatch<AppDispatch>();
    const postId = item?._id;

    const comments = useSelector(
        (state: RootState) => state.comments.comments[postId] || []
    );

    const loading = useSelector(
        (state: RootState) => state.comments.loading
    );
    useEffect(() => {
        if (postId) {
            dispatch(fetchComments(postId));
        }
    }, [postId]);

    const handleSubmit = () => {
        if (!commentText.trim()) return;

        dispatch(addComment({ postId, comment: commentText }));
        setCommentText("");
        setShowEmojiPicker(false);
    };
    const canSend = commentText.trim().length > 0;



    return (
        <div className="flex flex-column gap-15 purchased_commentwrap">
            <div className="moneyboy-comment-wrap">
                <div className="comment-wrap">
                    <div className="label-input">
                        <textarea
                            ref={textareaRef}
                            placeholder="Add a comment here"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <div className="input-placeholder-icon" ref={emojiBtnRef} onClick={() => setShowEmojiPicker((prev) => !prev)}><i className="icons emojiSmile svg-icon"></i></div>
                    </div>
                    {showEmojiPicker && (
                        <div className="emoji-picker-wrapper">
                            <EmojiPicker
                                autoFocusSearch={false}
                                skinTonesDisabled
                                previewConfig={{ showPreview: false }}
                                height={360}
                                width={340}
                                 onEmojiClick={(emojiData) => {
                                const emoji = emojiData.emoji;
                                

                                if (!textareaRef.current) return;

                                const textarea = textareaRef.current;
                                const start = textarea.selectionStart;
                                const end = textarea.selectionEnd;

                                const newText =
                                commentText.substring(0, start) +
                                emoji +
                                commentText.substring(end);

                                setCommentText(newText);

                                // move cursor after emoji
                                setTimeout(() => {
                                textarea.focus();
                                textarea.selectionStart = textarea.selectionEnd =
                                    start + emoji.length;
                                }, 0);
                            }}
                            />
                        </div>
                    )}
                </div>
                <button className="premium-btn active-down-effect"
                    onClick={handleSubmit}
                    disabled={!canSend}
                >
                    <svg width="40" height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M39.9728 1.42057C40.1678 0.51284 39.2779 -0.252543 38.4098 0.078704L0.753901 14.4536C0.300702 14.6266 0.000939696 15.061 2.20527e-06 15.5461C-0.000935286 16.0312 0.297109 16.4667 0.749682 16.6415L11.3279 20.727V33.5951C11.3279 34.1379 11.7007 34.6096 12.2288 34.7352C12.7534 34.8599 13.3004 34.6103 13.5464 34.1224L17.9214 25.4406L28.5982 33.3642C29.2476 33.8463 30.1811 33.5397 30.4174 32.7651C40.386 0.0812832 39.9551 1.50267 39.9728 1.42057ZM30.6775 5.53912L12.3337 18.603L4.44097 15.5547L30.6775 5.53912ZM13.6717 20.5274L29.6612 9.14025C15.9024 23.655 16.621 22.891 16.561 22.9718C16.4719 23.0917 16.7161 22.6243 13.6717 28.6656V20.5274ZM28.6604 30.4918L19.2624 23.5172L36.2553 5.59068L28.6604 30.4918Z" fill="url(#paint0_linear_4464_314)" />
                        <defs>
                            <linearGradient id="paint0_linear_4464_314" x1="2.37044" y1="-1.89024e-06" x2="54.674" y2="14.6715" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FECE26" />
                                <stop offset="1" stopColor="#E5741F" />
                            </linearGradient>
                        </defs>
                    </svg>
                </button>
            </div>

            {/* ================= Render Top Comment Only ================= */}
            <div className="scrollbar">
            {loading && comments.length === 0 && (
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
                {!loading && comments.length === 0 && (
                    <p>No comments yet</p>
                )}
                {comments.map((comment) => {
                    const isLikedByMe = comment.likes?.some(
                        (u: any) => u._id === currentUserId
                    );

                    const isDislikedByMe = comment.dislikes?.some(
                        (u: any) => u._id === currentUserId
                    );

                    return (
                    <div key={comment._id} className="card gap-15 comment_show">
                        <div className="moneyboy-post__header">
                            <a href="#" className="profile-card">
                                <div className="profile-card__main">
                                    <div className="profile-card__avatar-settings">
                                        <div className="profile-card__avatar">
                                            <img src={comment.userId?.profile || "/images/profile-avatars/profile-avatar-6.jpg"} alt="User profile" />
                                        </div>
                                    </div>
                                    <div className="profile-card__info">
                                        <div className="profile-card__name-badge">
                                            <div className="profile-card__name">{comment.userId?.displayName || "User"}</div>
                                        </div>
                                        <div className="profile-card__username">@{comment.userId?.username || "User"}</div>
                                    </div>
                                </div>
                            </a>
                            <div className="moneyboy-post__upload-more-info">
                                <div className="moneyboy-post__upload-time">{timeAgo(comment.createdAt)}</div>
                            </div>
                        </div>
                        <div className="moneyboy-post__desc">
                            <p>{comment.comment}</p>
                        </div>
                        <div className="like-deslike-wrap">
                            <ul>
                                <li>
                                    <Link href="#" className={`comment-like-btn`} onClick={(e) => {e.preventDefault(); dispatch(likeComment({ commentId: comment._id }));}}><ThumbsUp  strokeWidth={2} /> {comment.likeCount}</Link>
                                </li>
                                <li>
                                    <Link href="#" className={`comment-dislike-btn`} onClick={(e) => {e.preventDefault(); dispatch(dislikeComment({ commentId: comment._id }));}}><ThumbsDown strokeWidth={2} /> {comment.dislikeCount}</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
})
        }

            </div>
        </div>
    );
});

export default CommentsSection;
