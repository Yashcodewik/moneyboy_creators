"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useDeviceType } from "@/hooks/useDeviceType";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, X, CircleQuestionMark, } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addComment, dislikeComment, fetchComments, likeComment, } from "../../redux/other/commentSlice";
import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";

interface PostCardProps {
    post: any;
    onLike: (postId: string) => void;
    onSave: (postId: string, isSaved: boolean) => void;
    onCommentAdded?: (postId: string) => void;
}
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { ArrowUpRight, ThumbsDown, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDecryptedSession } from "@/libs/useDecryptedSession";
import CustomSelect from "../CustomSelect";
import { CgClose } from "react-icons/cg";
import ReportModal from "../ReportModal";
import TipModal from "../ProfilePage/TipModal";
import { sendTip } from "@/redux/Subscription/Action";
import ShowToast from "../common/ShowToast";

const moreUsers = ["alex", "rohan", "meera", "sam", "disha"];

const PostCard = ({ post, onLike, onSave, onCommentAdded }: PostCardProps) => {
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [copied, setCopied] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [showComment, setShowComment] = useState(false);
    const [showTipModal, setShowTipModal] = useState(false);
    const isMobile = useDeviceType();
    const playerRefs = useRef<Record<string, any>>({});
    const dispatch = useAppDispatch();
    const commentsState = useAppSelector((state) => state.comments);
    const postComments = commentsState.comments[post._id] || [];
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [newComment, setNewComment] = useState("");
    const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
    const [showReportModal, setShowReportModal] = useState(false);
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const firstMedia = post?.media?.[0]?.mediaFiles?.[0] || "/images/profile-avatars/profile-avatar-6.jpg";
    const router = useRouter();
    const [avatarErrorMap, setAvatarErrorMap] = useState<Record<string, boolean>>({},);
    const { session } = useDecryptedSession();
    const desktopStyle: React.CSSProperties = {
        transform: open ? "translate(0px, 0px)" : "translate(0px, -10px)",
        height: open ? "auto" : "0px",
        opacity: open ? 1 : 0,
        display: open ? "block" : "none",
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
        transform: open ? "translate(0px, 0px)" : "translate(0px, 100%)",
        height: open ? "auto" : "0px",
        opacity: 1,
        display: open ? "block" : "none",
        overflow: "hidden",
        transition: "transform 0.25s ease",
    };
    const handleCopy = () => {
        const url = `${window.location.origin}/post?page&publicId=${post.publicId}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    };
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const emojiRef = useRef<HTMLDivElement | null>(null);
    const emojiButtonRef = useRef<HTMLDivElement | null>(null);
    const [isReported, setIsReported] = useState(post.isReported);

    /* Close menu on outside click */
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (emojiRef.current && !emojiRef.current.contains(target) && !textareaRef.current?.contains(target) && !emojiButtonRef.current?.contains(target)
            ) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (!isMobile) return;

        const overlay = document.querySelector(".mobile-popup-overlay");
        if (!overlay) return;

        if (open) {
            overlay.classList.add("active");
        } else {
            overlay.classList.remove("active");
        }

        // cleanup on unmount
        return () => {
            overlay.classList.remove("active");
        };
    }, [open, isMobile]);

    const formatRelativeTime = (dateString: string) => {
        const postDate = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - postDate.getTime();

        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) return "just now";
        if (minutes < 60) return `${minutes} min ago`;
        if (hours < 24) return `${hours} hr ago`;
        if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
        if (days < 30)
            return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? "s" : ""} ago`;
        if (days < 365)
            return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? "s" : ""} ago`;

        return `${Math.floor(days / 365)} year${Math.floor(days / 365) > 1 ? "s" : ""} ago`;
    };

    useEffect(() => {
        if (showComment && post._id) {
            dispatch(fetchComments(post._id));
        }
    }, [showComment, post._id, dispatch]);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        const res = await dispatch(
            addComment({ postId: post._id, comment: newComment }),
        );

        if (res?.meta?.requestStatus === "fulfilled") {
            onCommentAdded?.(post._id); // ✅ only runs if provided
            setNewComment("");
        }
    };
    const handleLikeComment = (commentId: string) => {
        dispatch(likeComment({ commentId }));
    };

    const handleDislikeComment = (commentId: string) => {
        dispatch(dislikeComment({ commentId }));
    };
    const onEmojiClick = (emojiData: EmojiClickData) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const updatedText =
            newComment.substring(0, start) +
            emojiData.emoji +
            newComment.substring(end);

        setNewComment(updatedText);

        requestAnimationFrame(() => {
            textarea.focus();
            textarea.selectionStart = textarea.selectionEnd =
                start + emojiData.emoji.length;
        });

        setShowEmojiPicker(false);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        Object.values(playerRefs.current).forEach((ref: any) => {
            if (!ref?.plyr) return;

            const player = ref.plyr;

            const onEnter = () => {
                player.muted = true;
                player.play();
            };

            const onExit = () => {
                player.pause();
            };

            player.on("enterfullscreen", onEnter);
            player.on("exitfullscreen", onExit);

            return () => {
                player.off("enterfullscreen", onEnter);
                player.off("exitfullscreen", onExit);
            };
        });
    }, []);

    const handleVideoClick = (
        e: React.MouseEvent<HTMLVideoElement>,
        videoId: string,
    ) => {
        const video = videoRefs.current[videoId];
        if (!video) return;

        if ((e.target as HTMLElement).tagName !== "VIDEO") return;

        Object.entries(videoRefs.current).forEach(([id, v]) => {
            if (!v) return;

            if (id === videoId) {
                if (v.paused) {
                    v.play();
                    setActiveVideo(videoId);
                } else {
                    v.pause();
                }
            } else {
                v.pause();
            }
        });
    };

    const handleProfileClick = (publicId: string) => {
        if (!session?.user?.id) {
            router.push("/login");
            return;
        }

        router.push(`/profile/${publicId}`);
    };

    const handlePostRedirect = () => {
        router.push(`/post?page&publicId=${post.publicId}`);
    };

    const sortedComments = [...postComments].filter(Boolean).sort((a, b) => {
        const aLikes = a.likeCount ?? a.likes?.length ?? 0;
        const bLikes = b.likeCount ?? b.likes?.length ?? 0;
        return bLikes - aLikes;
    });

    const topComment = sortedComments[0];
    const hasMoreComments = sortedComments.length > 1;

    useEffect(() => {
        const handleScroll = () => {
            if (showComment) {
                setShowComment(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [showComment]);

    const handleSendTip = async (amount: number) => {
        if (!session?.user?.id) {
            router.push("/login");
            return;
        }

        if (session.user.id === post.userId) {
            ShowToast("You cannot send tip to yourself", "error");
            return;
        }

        try {
            await dispatch(
                sendTip({
                    creatorId: post.userId,
                    amount,
                }),
            ).unwrap();

            ShowToast("Tip sent successfully ", "success");

            setShowTipModal(false);
        } catch (err) {
            console.error("Tip failed:", err);
        }
    };


    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            const target = e.target as Node;

            if (
                open &&
                menuRef.current &&
                !menuRef.current.contains(target) &&
                buttonRef.current &&
                !buttonRef.current.contains(target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [open]);
    return (
        <>
            <div className="moneyboy-post__container card">
                <div className="moneyboy-post__header">
                    <div className="profile-card" onClick={() => handleProfileClick(post.creatorInfo?.publicId)} style={{ cursor: "pointer" }}>
                        <div className="profile-card__main">
                            <div className="profile-card__avatar-settings">
                                <div className="profile-card__avatar">
                                    {post.creatorInfo?.profile &&
                                        !avatarErrorMap[post.creatorInfo.publicId] ? (
                                        <img src={post.creatorInfo.profile} alt="MoneyBoy Social Profile Avatar" onError={() => setAvatarErrorMap((prev) => ({ ...prev, [post.creatorInfo.publicId]: true, }))} />
                                    ) : (
                                        <div className="noprofile">
                                            <svg width="40" height="40" viewBox="0 0 66 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path className="animate-m" d="M65.4257 49.6477L64.1198 52.8674C64.0994 52.917 64.076 52.9665 64.0527 53.0132C63.6359 53.8294 62.6681 54.2083 61.8081 53.8848C61.7673 53.8731 61.7265 53.8556 61.6886 53.8381L60.2311 53.1764L57.9515 52.1416C57.0945 51.7509 56.3482 51.1446 55.8002 50.3779C48.1132 39.6156 42.1971 28.3066 38.0271 16.454C37.8551 16.1304 37.5287 15.9555 37.1993 15.9555C36.9631 15.9555 36.7241 16.0459 36.5375 16.2325L28.4395 24.3596C28.1684 24.6307 27.8099 24.7678 27.4542 24.7678C27.4076 24.7678 27.3609 24.7648 27.3143 24.7619C27.2239 24.7503 27.1307 24.7328 27.0432 24.7065C26.8217 24.6366 26.6118 24.5112 26.4427 24.3276C23.1676 20.8193 20.6053 17.1799 18.3097 15.7369C18.1698 15.6495 18.0153 15.6057 17.8608 15.6057C17.5634 15.6057 17.2719 15.7602 17.1029 16.0313C14.1572 20.7377 11.0702 24.8873 7.75721 28.1157C7.31121 28.5471 6.74277 28.8299 6.13061 28.9115L3.0013 29.3254L1.94022 29.4683L1.66912 29.5033C0.946189 29.5994 0.296133 29.0602 0.258237 28.3314L0.00754237 23.5493C-0.0274383 22.8701 0.191188 22.2025 0.610956 21.669C1.51171 20.5293 2.39789 19.3545 3.26512 18.152C5.90032 14.3304 9.52956 8.36475 13.1253 1.39631C13.548 0.498477 14.4283 0 15.3291 0C15.8479 0 16.3727 0.163246 16.8187 0.513052L27.3799 8.76557L39.285 0.521797C39.6931 0.206971 40.1711 0.0583046 40.6434 0.0583046C41.4683 0.0583046 42.2729 0.510134 42.6635 1.32052C50.16 18.2735 55.0282 34.2072 63.6378 47.3439C63.9584 47.8336 64.0197 48.4487 63.8039 48.9851L65.4257 49.6477Z" fill="url(#paint0_linear_4470_53804)" />
                                                <defs>
                                                    <linearGradient id="paint0_linear_4470_53804" x1="0" y1="27" x2="66" y2="27" gradientUnits="userSpaceOnUse">
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
                                    <div className="profile-card__name">{post.creatorInfo?.userName}</div>
                                    <div className="profile-card__badge">
                                        <img src="/images/logo/profile-badge.png" alt="MoneyBoy Social Profile Badge" />
                                    </div>
                                </div>
                                <div className="profile-card__username btntooltip_wrapper">
                                  @{post.creatorInfo?.displayName}
                                  <button type="button" className="active-down-effect" data-position="right" data-tooltip={moreUsers.map(u => `@${u}`).join('\n')}><CircleQuestionMark size={15}/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="moneyboy-post__upload-more-info">
                        <div className="moneyboy-post__upload-time">
                            {formatRelativeTime(post.createdAt)}
                        </div>
                        <div className="rel-user-more-opts-wrapper">
                            <button ref={buttonRef} className="rel-user-more-opts-trigger-icon" onClick={() => setOpen((prev) => !prev)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                    <path d="M5 10.5C3.9 10.5 3 11.4 3 12.5C3 13.6 3.9 14.5 5 14.5C6.1 14.5 7 13.6 7 12.5C7 11.4 6.1 10.5 5 10.5Z" stroke="none" stroke-width="1.5"></path>
                                    <path d="M19 10.5C17.9 10.5 17 11.4 17 12.5C17 13.6 17.9 14.5 19 14.5C20.1 14.5 21 13.6 21 12.5C21 11.4 20.1 10.5 19 10.5Z" stroke="none" stroke-width="1.5"></path>
                                    <path d="M12 10.5C10.9 10.5 10 11.4 10 12.5C10 13.6 10.9 14.5 12 14.5C13.1 14.5 14 13.6 14 12.5C14 11.4 13.1 10.5 12 10.5Z" stroke="none" stroke-width="1.5"></path>
                                </svg>
                            </button>
                            <div ref={menuRef} className="rel-users-more-opts-popup-wrapper" style={isMobile ? mobileStyle : desktopStyle}>
                                <div className="rel-users-more-opts-popup-container">
                                    <ul>
                                        <li onClick={handleCopy} className="copy-post-link" data-copy-post-link="inset-post-link-here">
                                            <div className="icon copy-link-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"></path>
                                                </svg>
                                            </div>
                                            <span>{copied ? "Copied!" : "Copy Link"}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="moneyboy-post__desc" onClick={handlePostRedirect} style={{ cursor: "pointer" }}>
                    {/* <p className={`post-text ${expanded ? "expanded" : ""}`}>{post.text} {!expanded && (<span className="active-down-effect-2x post-more" onClick={() => setExpanded(true)}>more</span>)}</p> */}
                    <p className="post-text">
                        {post?.text ? (
                            <>
                                {expanded || post.text.length <= 150 ? post.text : `${post.text.substring(0, 150)}...`}
                                {post.text.length > 150 && (
                                    <span className="active-down-effect-2x post-more" onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}>{expanded ? " less" : " more"}</span>
                                )}
                            </>
                        ) : (
                            " "
                        )}
                    </p>
                </div>
                <div className="moneyboy-post__media">
                    <div className="moneyboy-post__img">
                        {/* <PhotoProvider
                            toolbarRender={({ images, index, onIndexChange, onClose, rotate, onRotate, scale, onScale, visible }) => {
                                if (!visible) return null;
                                return (
                                    <div className="toolbar_controller">
                                        <button className="btn_icons" onClick={() => index > 0 && onIndexChange(index - 1)}><ChevronLeft size={20} /></button>
                                        <span>{index + 1} / {images.length}</span>
                                        <button className="btn_icons" onClick={() => index < images.length - 1 && onIndexChange(index + 1)}><ChevronRight size={20} /></button>
                                        <button className="btn_icons" onClick={() => onScale(scale + 0.2)}><ZoomIn size={20} /></button>
                                        <button className="btn_icons" onClick={() => onScale(Math.max(0.5, scale - 0.2))}><ZoomOut size={20} /></button>
                                        <button className="btn_icons" onClick={() => onRotate(rotate + 90)}><RotateCw size={20} /></button>
                                        <button className="btn_icons" onClick={onClose}><X size={20} /></button>
                                    </div>
                                );
                            }}> */}
                        <Swiper slidesPerView={1} spaceBetween={15} navigation modules={[Navigation]} className="post_swiper">
                            {post.media?.[0]?.mediaFiles?.length > 0 ? (post.media[0].mediaFiles.map((file: string, i: number) => {
                                const isVideo = post.media?.[0]?.type === "video";
                                return (
                                    <SwiperSlide key={i}>
                                        {isVideo ? (
                                            <Plyr source={{ type: "video", sources: [{ src: file, type: "video/mp4" }], }} options={{ controls: ["play", "progress", "current-time", "mute", "volume", "fullscreen",], }} />
                                        ) : (
                                            <PhotoView src={file}><img src={file} alt="Post" /></PhotoView>
                                        )}
                                    </SwiperSlide>
                                );
                            })
                            ) : (
                                <SwiperSlide><div className="nomedia"></div></SwiperSlide>
                            )}
                        </Swiper>
                        {/* </PhotoProvider> */}
                    </div>
                    <div className="moneyboy-post__actions">
                        <ul>
                            {/* Send Tip */}
                            <li>
                                <Link
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); if (!session?.user?.id) { router.push("/login"); return; } setShowTipModal(true); }}>
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
                                <Link href="#" className={`post-like-btn ${post.isLiked ? "active" : ""}`} onClick={(e) => { e.preventDefault(); onLike(post._id); }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>{post.likeCount || 0}</span>
                                </Link>
                            </li>
                            {/* Comment */}
                            <li>
                                <Link
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (!session?.user?.id) {
                                            router.push("/login"); // ⬅ redirect if not logged in
                                            return;
                                        }
                                        setShowComment((prev) => !prev);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                        <path
                                            d="M7 8H17"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                        <path
                                            d="M7 13H13"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                    </svg>
                                    <span>{post.commentCount || 0}</span>
                                </Link>
                            </li>
                        </ul>
                        <ul>
                            {/* Share */}
                            <li>
                                <Link
                                    href="#"
                                    className={isReported ? "active" : ""}
                                    onClick={(e) => {
                                        e.preventDefault();

                                        if (!session?.user?.id) {
                                            router.push("/login"); // ⬅ redirect if not logged in
                                            return;
                                        }

                                        if (post.isReported) return;

                                        setShowReportModal(true);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M5.15002 2V22"
                                            stroke="white"
                                            stroke-width="1.5"
                                            stroke-miterlimit="10"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        ></path>
                                        <path
                                            d="M5.15002 4H16.35C19.05 4 19.65 5.5 17.75 7.4L16.55 8.6C15.75 9.4 15.75 10.7 16.55 11.4L17.75 12.6C19.65 14.5 18.95 16 16.35 16H5.15002"
                                            stroke="white"
                                            stroke-width="1.5"
                                            stroke-miterlimit="10"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        ></path>
                                    </svg>
                                </Link>
                            </li>
                            {/* Save */}
                            <li>
                                <Link
                                    href="#"
                                    className={`post-save-btn ${post.isSaved ? "active" : ""}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onSave(post._id, post.isSaved);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
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
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {showReportModal && (
                <ReportModal
                    postId={post._id}
                    imageUrl={
                        post.media?.[0]?.mediaFiles?.[0] || post.creatorInfo?.profile
                    }
                    onClose={(reported = false) => {
                        if (reported) {
                            setIsReported(true); // 🔥 instant UI update
                        }
                        setShowReportModal(false);
                    }}
                />
            )}

            {showTipModal && (
                <TipModal
                    onClose={() => setShowTipModal(false)}
                    onConfirm={handleSendTip}
                    creator={{
                        displayName: post?.creatorInfo?.displayName,
                        userName: post?.creatorInfo?.userName,
                        profile: post?.creatorInfo?.profile,
                    }}
                />
            )}
            {showComment && (
                <div className="flex flex-column gap-20">
                    <div className="moneyboy-comment-wrap">
                        <div className="comment-wrap">
                            <div className="label-input">
                                <textarea
                                    ref={textareaRef}
                                    placeholder="Add a comment here"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <div
                                    ref={emojiButtonRef}
                                    className="input-placeholder-icon"
                                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                                >
                                    <i className="icons emojiSmile svg-icon"></i>
                                </div>
                            </div>
                            {showEmojiPicker && (
                                <div ref={emojiRef} className="emoji-picker-wrapper">
                                    <EmojiPicker
                                        onEmojiClick={onEmojiClick}
                                        autoFocusSearch={false}
                                        skinTonesDisabled
                                        previewConfig={{ showPreview: false }}
                                        height={360}
                                        width={340}
                                    />
                                </div>
                            )}
                        </div>
                        <button
                            className="premium-btn active-down-effect"
                            onClick={handleAddComment}
                        >
                            <svg
                                width="40"
                                height="35"
                                viewBox="0 0 40 35"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M39.9728 1.42057C40.1678 0.51284 39.2779 -0.252543 38.4098 0.078704L0.753901 14.4536C0.300702 14.6266 0.000939696 15.061 2.20527e-06 15.5461C-0.000935286 16.0312 0.297109 16.4667 0.749682 16.6415L11.3279 20.727V33.5951C11.3279 34.1379 11.7007 34.6096 12.2288 34.7352C12.7534 34.8599 13.3004 34.6103 13.5464 34.1224L17.9214 25.4406L28.5982 33.3642C29.2476 33.8463 30.1811 33.5397 30.4174 32.7651C40.386 0.0812832 39.9551 1.50267 39.9728 1.42057ZM30.6775 5.53912L12.3337 18.603L4.44097 15.5547L30.6775 5.53912ZM13.6717 20.5274L29.6612 9.14025C15.9024 23.655 16.621 22.891 16.561 22.9718C16.4719 23.0917 16.7161 22.6243 13.6717 28.6656V20.5274ZM28.6604 30.4918L19.2624 23.5172L36.2553 5.59068L28.6604 30.4918Z"
                                    fill="url(#paint0_linear_4464_314)"
                                />
                                <defs>
                                    <linearGradient
                                        id="paint0_linear_4464_314"
                                        x1="2.37044"
                                        y1="-1.89024e-06"
                                        x2="54.674"
                                        y2="14.6715"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#FECE26" />
                                        <stop offset="1" stopColor="#E5741F" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </button>
                    </div>

                    {/* ================= Render Top Comment Only ================= */}
                    {topComment && (
                        <div className="moneyboy-post__container card gap-15">
                            <div className="moneyboy-post__header">
                                <a href="#" className="profile-card">
                                    <div className="profile-card__main">
                                        <div className="profile-card__avatar-settings">
                                            <div className="profile-card__avatar">
                                                {topComment.userId?.profile &&
                                                    !avatarErrorMap[topComment.userId._id] ? (
                                                    <img
                                                        src={topComment.userId.profile}
                                                        alt={topComment.userId?.userName || "User profile"}
                                                        onError={() =>
                                                            setAvatarErrorMap((prev) => ({
                                                                ...prev,
                                                                [topComment.userId._id]: true,
                                                            }))
                                                        }
                                                    />
                                                ) : (
                                                    <div className="noprofile">
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
                                                    {topComment.userId?.displayName}
                                                </div>
                                            </div>
                                            <div className="profile-card__username">@{topComment.userId?.userName}</div>
                                        </div>
                                    </div>
                                </a>
                                <div className="moneyboy-post__upload-more-info">
                                    <div className="moneyboy-post__upload-time">
                                        {formatRelativeTime(topComment.createdAt)}
                                    </div>
                                </div>
                            </div>
                            <div className="moneyboy-post__desc">
                                <p>{topComment.comment}</p>
                            </div>
                            <div className="like-deslike-wrap">
                                <ul>
                                    <li className={topComment.isLiked ? "active" : ""}>
                                        <Link
                                            href="#"
                                            className={`comment-like-btn ${topComment.isLiked ? "active" : ""}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleLikeComment(topComment._id);
                                            }}
                                        >
                                            <ThumbsUp color="black" strokeWidth={2} />
                                        </Link>
                                    </li>
                                    <li className={topComment.isDisliked ? "active" : ""}>
                                        <Link
                                            href="#"
                                            className={`comment-dislike-btn ${topComment.isDisliked ? "active" : ""}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleDislikeComment(topComment._id);
                                            }}
                                        >
                                            <ThumbsDown color="black" strokeWidth={2} />
                                        </Link>
                                    </li>
                                </ul>
                                {hasMoreComments && (
                                    <button
                                        onClick={handlePostRedirect}
                                        className="btn-primary active-down-effect-2x"
                                    >
                                        See more <ArrowUpRight size={14} />
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default PostCard;