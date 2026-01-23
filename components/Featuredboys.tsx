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
            {loading && <p>Loading...</p>}

            {!loading &&
              featured.map((item) => (
                <div className="featured-profile__card" key={item._id}  onClick={() => handleProfileClick(item.publicId)}>
                  <div className="featured-profile__info-wrapper">
                    <div className="profile-card featured-profile-card">
                      <div className="profile-card__bg-img">
                        <img
                          src={
                            item.coverImage ||
                            "/images/profile-banners/profile-banner-1.jpg"
                          }
                          alt="Featured Profile Background Image"
                        />
                      </div>

                      <div className="profile-card__main">
                        <div className="profile-card__avatar-settings">
                          <div className="profile-card__avatar">
                            <img
                              src={
                                item.profileImage ||
                                "/images/profile-avatars/profile-avatar-6.jpg"
                              }
                              alt="MoneyBoy Avatar"
                            />
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
