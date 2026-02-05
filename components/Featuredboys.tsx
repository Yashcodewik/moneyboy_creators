"use client";
import { useDecryptedSession } from "@/libs/useDecryptedSession";
import { API_GET_FEATURED_MONEYBOYS } from "@/utils/api/APIConstant";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Featuredboys = () => {
  const [featured, setFeatured] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { session } = useDecryptedSession();
  const limit = 6;
  const router = useRouter();
  const fetchFeatured = async (pageNumber = 1) => {
    setLoading(true);

    try {
      const res = await apiPost({
        url: API_GET_FEATURED_MONEYBOYS,
        values: {
          page: pageNumber,
          limit,
          ...(session?.user?.publicId && {
            userPublicId: session.user.publicId,
          }),
        },
      });

      if (res?.success) {
        setFeatured(res.data || []);
        setPage(res.pagination?.page || 1);
        setTotalPages(res.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatured(page);
  }, [page, session?.user?.publicId]);

  const handleRefresh = () => {
    fetchFeatured(page);
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handleProfileClick = (publicId  : string) => {
  if (!session?.user?.id) {
    router.push("/login"); // or "/auth/login"
    return;
  }

 router.push(`/profile/${publicId}`);
};

  return (
    <aside className="moneyboy-2x-1x-b-layout">
      <div className="moneyboy-feed-sidebar-container">
        <div className="featured-profiles-card-container card">
          <div className="featured-profiles-header">
            <div className="featured-card-heading">
              <h3 className="card-heading">Featured Moneyboys</h3>
            </div>

            <div className="featured-card-opts">
              <button
                className="icon-btn hover-scale-icon"
                onClick={handleRefresh}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M22 12.5C22 18.02 17.52 22.5 12 22.5C6.48 22.5 3.11 16.94 3.11 16.94M3.11 16.94H7.63M3.11 16.94V21.94M2 12.5C2 6.98 6.44 2.5 12 2.5C18.67 2.5 22 8.06 22 8.06M22 8.06V3.06M22 8.06H17.56"
                    stroke="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                className="icon-btn hover-scale-icon"
                onClick={handlePrev}
                disabled={page === 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M12 22.5C6.47715 22.5 2 18.0228 2 12.5C2 6.97715 6.47715 2.5 12 2.5C17.5228 2.5 22 6.97715 22 12.5C22 18.0228 17.5228 22.5 12 22.5Z"
                    stroke="none"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.26 16.03L9.74001 12.5L13.26 8.97"
                    stroke="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                className="icon-btn hover-scale-icon"
                onClick={handleNext}
                disabled={page === totalPages}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z"
                    stroke="none"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.74 16.03L14.26 12.5L10.74 8.97"
                    stroke="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="featured-profiles-wrapper">
            {loading && <div className="loadingtext">{"Loading".split("").map((char, i) => (<span key={i} style={{ animationDelay: `${(i + 1) * 0.1}s` }}>{char}</span>))}</div>}

            {!loading &&
              featured.map((item) => (
                <div className="featured-profile__card" key={item._id}  onClick={() => handleProfileClick(item.publicId)}>
                  <div className="featured-profile__info-wrapper">
                    <div className="profile-card featured-profile-card">
                      <div className="profile-card__bg-img">
                      {item.coverImage ? (
                        <img src={ item.coverImage || "/images/profile-banners/profile-banner-1.jpg"} alt="Featured Profile Background Image"/>
                      ) : (
                        <div className="nomedia"></div>
                      )}
                      </div>

                      <div className="profile-card__main">
                        <div className="profile-card__avatar-settings">
                          
                          <div className="profile-card__avatar">
                            {item.profileImage ? (
                              <img src={item.profileImage || "/images/profile-avatars/profile-avatar-6.jpg"} alt="MoneyBoy Avatar" />
                              ) : (
                              <div className="noprofile">
                                {/* <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><text x="50%" y="50%">m</text></svg> */}
                                <svg width="40" height="40" viewBox="0 0 66 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="animate-m" d="M65.4257 49.6477L64.1198 52.8674C64.0994 52.917 64.076 52.9665 64.0527 53.0132C63.6359 53.8294 62.6681 54.2083 61.8081 53.8848C61.7673 53.8731 61.7265 53.8556 61.6886 53.8381L60.2311 53.1764L57.9515 52.1416C57.0945 51.7509 56.3482 51.1446 55.8002 50.3779C48.1132 39.6156 42.1971 28.3066 38.0271 16.454C37.8551 16.1304 37.5287 15.9555 37.1993 15.9555C36.9631 15.9555 36.7241 16.0459 36.5375 16.2325L28.4395 24.3596C28.1684 24.6307 27.8099 24.7678 27.4542 24.7678C27.4076 24.7678 27.3609 24.7648 27.3143 24.7619C27.2239 24.7503 27.1307 24.7328 27.0432 24.7065C26.8217 24.6366 26.6118 24.5112 26.4427 24.3276C23.1676 20.8193 20.6053 17.1799 18.3097 15.7369C18.1698 15.6495 18.0153 15.6057 17.8608 15.6057C17.5634 15.6057 17.2719 15.7602 17.1029 16.0313C14.1572 20.7377 11.0702 24.8873 7.75721 28.1157C7.31121 28.5471 6.74277 28.8299 6.13061 28.9115L3.0013 29.3254L1.94022 29.4683L1.66912 29.5033C0.946189 29.5994 0.296133 29.0602 0.258237 28.3314L0.00754237 23.5493C-0.0274383 22.8701 0.191188 22.2025 0.610956 21.669C1.51171 20.5293 2.39789 19.3545 3.26512 18.152C5.90032 14.3304 9.52956 8.36475 13.1253 1.39631C13.548 0.498477 14.4283 0 15.3291 0C15.8479 0 16.3727 0.163246 16.8187 0.513052L27.3799 8.76557L39.285 0.521797C39.6931 0.206971 40.1711 0.0583046 40.6434 0.0583046C41.4683 0.0583046 42.2729 0.510134 42.6635 1.32052C50.16 18.2735 55.0282 34.2072 63.6378 47.3439C63.9584 47.8336 64.0197 48.4487 63.8039 48.9851L65.4257 49.6477Z" fill="url(#paint0_linear_4470_53804)"/>
                                  <defs>
                                    <linearGradient id="paint0_linear_4470_53804" x1="0" y1="27" x2="66" y2="27" gradientUnits="userSpaceOnUse">
                                      <stop stop-color="#FDAB0A"/>
                                      <stop offset="0.4" stop-color="#FECE26"/>
                                      <stop offset="1" stop-color="#FE990B"/>
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
                              {item.displayName ||
                                `${item.firstName} ${item.lastName}`}
                            </div>
                            <div className="profile-card__badge">
                              <img
                                src="/images/logo/profile-badge.png"
                                alt="Badge"
                              />
                            </div>
                          </div>

                          <div className="profile-card__username">
                            @{item.userName}
                          </div>
                        </div>
                      </div>

                      <div className="profile-card__desc">
                        <p>{item.bio || "No bio available"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="moneyboy-network-grow-card-wrapper card">
          <a href="#" className="moneyboy-network-grow-card card">
            <div className="bg-img">
              <img
                src="/images/grow-network-bg-image.png"
                alt="Grow Network By MoneyBoy Social"
              />
            </div>
            <div className="text-logo">
              <h3>Network</h3>
              <img
                src="/images/logo/moneyboy-logo.png"
                alt="MoneyBoy Social Logo"
              />
            </div>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Featuredboys;