"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchFeaturedPosts } from "@/redux/store/Action";
import { useDecryptedSession } from "@/libs/useDecryptedSession";
import { savePost, unsavePost } from "@/redux/other/savedPostsSlice";
import { useRouter } from "next/navigation";

type FeaturedContentSliderProps = {
  publicId?: string;
  loggedInUserId?: string;
  isCreator?: boolean;
  onUnlock: (post: any) => void; // ✅ required
  onSubscribe: () => void;
};

export default function FeaturedContentSlider({
  publicId,
  isCreator,
  onUnlock,
  onSubscribe,
}: FeaturedContentSliderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { session } = useDecryptedSession();
  const router = useRouter();
  const loggedInUserId = session?.user?.id;
  const [mediaErrors, setMediaErrors] = useState<Record<string, boolean>>({});

  const { featuredPosts, loadingFeaturedPosts } = useSelector(
    (state: RootState) => state.creators,
  );

  if (!featuredPosts || featuredPosts.length === 0) {
    return null;
  }

  const handleSaveToggle = (e: React.MouseEvent, post: any) => {
    e.stopPropagation(); // 🚫 don’t slide / redirect

    const isSaved = post.isSaved;


    if (isSaved) {
      dispatch(
        unsavePost({
          postId: post._id,
          creatorUserId: post.userId,
        }),
      );
    } else {
      dispatch(
        savePost({
          postId: post._id,
          creatorUserId: post.userId,
        }),
      );
    }
  };

  const handlePostRedirect = (post: any) => {
    const isOwnPost = post.userId === loggedInUserId;

    if (post.isUnlocked || post.isSubscribed || isOwnPost) {
      router.push(`/post?page&publicId=${post.publicId}`);
    }
  };

  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={2}
    >
      {featuredPosts?.map((post: any) => {
        const image =
          post.media?.[0]?.mediaFiles?.[0] ||
          "/images/profile-avatars/profile-avatar-21.jpg";

        const isPaid = post.accessType === "pay_per_view";
        const isUnlocked = post.isUnlocked || post.isSubscribed;
        const isSaved = post.isSaved;
        const isOwnPost = post.userId === loggedInUserId;

        return (
          <SwiperSlide key={post._id}>
            <div className="featured-content-premium-card">
              <div className="featured-content-premium-card-container">
                <div className="featured-content-bg-img">
                  {post.media?.[0]?.type === "video" &&
                    post.media?.[0]?.mediaFiles?.[0] &&
                    !mediaErrors[post._id] ? (
                    <video
                      src={post.media[0].mediaFiles[0]}
                      muted
                      playsInline
                      preload="metadata"
                      onError={() =>
                        setMediaErrors((prev) => ({
                          ...prev,
                          [post._id]: true,
                        }))
                      }
                    />
                  ) : post.media?.[0]?.mediaFiles?.[0] &&
                    !mediaErrors[post._id] ? (
                    <img
                      src={post.media[0].mediaFiles[0]}
                      alt="Featured Content"
                      onError={() =>
                        setMediaErrors((prev) => ({
                          ...prev,
                          [post._id]: true,
                        }))
                      }
                    />
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


                {/* <div className="featured-content-bg-img">
                  {post.media?.[0]?.type === "video" ? (
                    <video
                      src={post.media?.[0]?.mediaFiles?.[0]}
                      muted
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <img
                      src={
                        post.media?.[0]?.mediaFiles?.[0] ||
                        "/images/profile-avatars/profile-avatar-21.jpg"
                      }
                      alt="Featured Content BG Image"
                    />
                  )}
                </div> */}

                <div className="featured-premium-card-content-container">
                  <div className="featured-premium-card-content">
                    <div className="featured-premium-card-icons">
                      {!isOwnPost && (
                        <div className={`featured-premium-card-icon wishlist-icon ${isSaved ? "active" : ""}`} onClick={(e) => handleSaveToggle(e, post)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                            <path d="M14.7666 1.66687H6.73327C4.95827 1.66687 3.5166 3.11687 3.5166 4.88354V16.6252C3.5166 18.1252 4.5916 18.7585 5.90827 18.0335L9.97494 15.7752C10.4083 15.5335 11.1083 15.5335 11.5333 15.7752L15.5999 18.0335C16.9166 18.7669 17.9916 18.1335 17.9916 16.6252V4.88354C17.9833 3.11687 16.5416 1.66687 14.7666 1.66687Z" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M14.7666 1.66687H6.73327C4.95827 1.66687 3.5166 3.11687 3.5166 4.88354V16.6252C3.5166 18.1252 4.5916 18.7585 5.90827 18.0335L9.97494 15.7752C10.4083 15.5335 11.1083 15.5335 11.5333 15.7752L15.5999 18.0335C16.9166 18.7669 17.9916 18.1335 17.9916 16.6252V4.88354C17.9833 3.11687 16.5416 1.66687 14.7666 1.66687Z" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M8.4585 7.5415C9.94183 8.08317 11.5585 8.08317 13.0418 7.5415" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                          {/* <span>{post.likeCount ?? 0}</span> */}
                        </div>
                      )}
                    </div>

                    <h5>Featured contents</h5>

                    <p>{post.text}</p>

                    {post.isUnlocked && (
                      <button className="btn-txt-gradient btn-outline grey-variant"
                        onClick={() => handlePostRedirect(post)}>
                        <span>Purchased</span>
                      </button>
                    )}

                    {/* SUBSCRIBED */}

                    {!post.isUnlocked &&
                      post.isSubscribed &&
                      post.accessType === "subscriber" && (
                        <button className="btn-txt-gradient btn-outline grey-variant"
                          onClick={() => handlePostRedirect(post)}>
                          <span>Subscribed</span>
                        </button>
                      )}

                    {/* PAY PER VIEW */}


                    {!post.isUnlocked && post.accessType === "pay_per_view" && (
                      <button
                        className="btn-txt-gradient btn-outline"
                        onClick={() => onUnlock(post)}
                        disabled={isOwnPost}
                      >
                        <svg
                          className="only-fill-hover-effect"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M10.001 0.916992C12.2126 0.916992 13.7238 1.51554 14.6475 2.66211C15.5427 3.77366 15.751 5.24305 15.751 6.66699V7.66895C16.6879 7.79136 17.4627 8.06745 18.0312 8.63574C18.8947 9.49918 19.0849 10.8389 19.085 12.5V14.166C19.085 15.8272 18.8946 17.1668 18.0312 18.0303C17.1677 18.8935 15.8291 19.083 14.168 19.083H5.83496C4.17365 19.083 2.83421 18.8938 1.9707 18.0303C1.10735 17.1668 0.917969 15.8272 0.917969 14.166V12.5C0.917997 10.8389 1.10726 9.49918 1.9707 8.63574C2.53913 8.06742 3.31408 7.79232 4.25098 7.66992V6.66699C4.25098 5.24305 4.45925 3.77366 5.35449 2.66211C6.27812 1.51554 7.78932 0.916992 10.001 0.916992ZM5.83496 9.08301C4.1632 9.08301 3.4178 9.30991 3.03125 9.69629C2.64478 10.0828 2.418 10.8282 2.41797 12.5V14.166C2.41797 15.8378 2.64487 16.5832 3.03125 16.9697C3.41774 17.3562 4.16293 17.583 5.83496 17.583H14.168C15.8395 17.583 16.5841 17.356 16.9707 16.9697C17.3571 16.5832 17.585 15.8378 17.585 14.166V12.5C17.5849 10.8282 17.3572 10.0828 16.9707 9.69629C16.5841 9.3101 15.8393 9.08301 14.168 9.08301H5.83496ZM10.001 10.5C11.5657 10.5 12.8348 11.7684 12.835 13.333C12.835 14.8978 11.5658 16.167 10.001 16.167C8.43632 16.1668 7.16797 14.8977 7.16797 13.333C7.16814 11.7685 8.43643 10.5002 10.001 10.5ZM10.001 12C9.26486 12.0002 8.66814 12.5969 8.66797 13.333C8.66797 14.0693 9.26475 14.6668 10.001 14.667C10.7374 14.667 11.335 14.0694 11.335 13.333C11.3348 12.5968 10.7372 12 10.001 12ZM10.001 2.41699C8.04601 2.41699 7.05717 2.93971 6.52246 3.60352C5.95984 4.30235 5.75098 5.33302 5.75098 6.66699V7.58398C5.77888 7.58387 5.80687 7.58301 5.83496 7.58301H14.168C14.1957 7.58301 14.2234 7.58388 14.251 7.58398V6.66699C14.251 5.33302 14.0421 4.30235 13.4795 3.60352C12.9448 2.93971 11.9559 2.41699 10.001 2.41699Z"
                            fill="url(#paint0_linear_745_155)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_745_155"
                              x1="1.99456"
                              y1="0.916991"
                              x2="26.1808"
                              y2="6.81415"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FECE26" />
                              <stop offset="1" stopColor="#E5741F" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <span>${post.price}</span>
                      </button>
                    )}

                    {/* SUBSCRIBER ONLY */}
                    {!post.isUnlocked &&
                      !post.isSubscribed &&
                      post.accessType === "subscriber" && (
                        <button
                          className="btn-txt-gradient btn-outline grey-variant"
                          onClick={onSubscribe}
                          disabled={isOwnPost}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M13.9173 15.8167H6.08399C5.73399 15.8167 5.34232 15.5417 5.22565 15.2083L1.77565 5.55834C1.28399 4.17501 1.85899 3.75001 3.04232 4.60001L6.29232 6.92501C6.83399 7.30001 7.45065 7.10834 7.68399 6.50001L9.15065 2.59167C9.61732 1.34167 10.3923 1.34167 10.859 2.59167L12.3257 6.50001C12.559 7.10834 13.1757 7.30001 13.709 6.92501L16.759 4.75001C18.059 3.81667 18.684 4.29168 18.1507 5.80001L14.784 15.225C14.659 15.5417 14.2673 15.8167 13.9173 15.8167Z"
                              stroke="url(#paint0_linear_745_209)"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M5.41602 18.3333H14.5827"
                              stroke="url(#paint1_linear_745_209)"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M7.91602 11.6667H12.0827"
                              stroke="url(#paint2_linear_745_209)"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <defs>
                              <linearGradient
                                id="paint0_linear_745_209"
                                x1="9.9704"
                                y1="1.65417"
                                x2="9.9704"
                                y2="15.8167"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#FFCD84"></stop>{" "}
                                <stop offset="1" stop-color="#FEA10A"></stop>
                              </linearGradient>
                              <linearGradient
                                id="paint1_linear_745_209"
                                x1="9.99935"
                                y1="18.3333"
                                x2="9.99935"
                                y2="19.3333"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#FFCD84"></stop>{" "}
                                <stop offset="1" stop-color="#FEA10A"></stop>
                              </linearGradient>
                              <linearGradient
                                id="paint2_linear_745_209"
                                x1="9.99935"
                                y1="11.6667"
                                x2="9.99935"
                                y2="12.6667"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#FFCD84"></stop>{" "}
                                <stop offset="1" stop-color="#FEA10A"></stop>
                              </linearGradient>
                            </defs>
                          </svg>
                          <span>For Subscribers</span>
                        </button>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
