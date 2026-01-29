"use client";
import { getDecryptedSession } from "@/libs/getDecryptedSession";
import React, { useEffect, useRef, useState } from "react";
import { getApi } from "@/utils/endpoints/common";
import { API_GET_DISCOVER_CREATORS } from "@/utils/api/APIConstant";
import { useQuery } from "@tanstack/react-query";
import Filter from "./Filter";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

const Dashboard = () => {
  const [session, setSession] = useState<any>(null);
  type FilterType =
    | "category"
    | "feature"
    | "country"
    | "city"
    | "bodyType"
    | "sexualOrientation"
    | "age"
    | "eyeColor"
    | "hairColor"
    | "ethnicity"
    | "height"
    | "style"
    | "size"
    | "popularity"
    | null;

  const [adavanceFilter, setAdavanceFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [creators, setCreators] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRefs = useRef<{
    [key in Exclude<FilterType, null>]?: HTMLDivElement | null;
  }>({});
  const getData = async () => {
    const get = await getDecryptedSession();
    return get;
  };
  useEffect(() => {
    const loadSession = async () => {
      const s = await getDecryptedSession();
      setSession(s); // 🔥 THIS WAS MISSING
    };
    loadSession();
  }, []);

  useEffect(() => {
    const likeButtons = document.querySelectorAll("[data-like-button]");

    const handleClick = (event: Event) => {
      const button = event.currentTarget as HTMLElement;
      button.classList.toggle("liked");
    };

    likeButtons.forEach((button) => {
      button.addEventListener("click", handleClick);
    });

    return () => {
      likeButtons.forEach((button) => {
        button.removeEventListener("click", handleClick);
      });
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickInsideDropdown = Object.values(dropdownRefs.current).some(
        (ref) => ref && ref.contains(event.target as Node),
      );

      const target = event.target as HTMLElement;
      const isDropdownTrigger = target.closest("[data-custom-select-triger]");

      if (!isClickInsideDropdown && !isDropdownTrigger) {
        setActiveFilter(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  console.log("=============", session);
const fetchCreators = async ({ queryKey }: any) => {
  const [_key, page, search, userPublicId, filtersString] = queryKey;
  const filters = JSON.parse(filtersString);

  const params = new URLSearchParams();

  // user
  if (userPublicId) {
    params.append("userPublicId", userPublicId);
  }

  // filters
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== "all") {
      params.append(key, value as string);
    }
  });

  // search
  if (search) {
    params.append("q", search);
  }

  // pagination
  params.append("page", String(page));
  params.append("rowsPerPage", "8");

  // ✅ FULL URL BUILT HERE
  const finalUrl = `${API_GET_DISCOVER_CREATORS}?${params.toString()}`;

  // 🚫 DO NOT pass page/search again
  return getApi({
    url: finalUrl,
  });
};







const { data, isLoading } = useQuery({
  queryKey: [
    "discover-creators",
    page,
    search,
    session?.user?.publicId,
    JSON.stringify(filterValues),
  ],
  queryFn: fetchCreators,
  enabled: !!session?.user?.publicId, // 🔥 THIS FIXES IT
});
  console.log("FILTER VALUES:", filterValues);
  // console.log("API URL:", `${API_GET_DISCOVER_CREATORS}?${params.toString()}`);

  useEffect(() => {
    setPage(1);
    setCreators([]); 
  }, [filterValues]);
  
useEffect(() => {
  setPage(1);
  setCreators([]);
}, [search]);

  useEffect(() => {
    if (data?.success) {
      setCreators(data.data);
      setTotalPages(data.meta.totalPages);
    }
  }, [data]);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages: (number | string)[] = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3);

      if (page > 4) pages.push("...");

      if (page > 3 && page < totalPages - 2) pages.push(page);

      if (page < totalPages - 3) pages.push("...");

      pages.push(totalPages - 1, totalPages);
    }

    return (
      <div className="pagination-container">
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={i} className="pagination-dots">
              ...
            </span>
          ) : (
            <button
              key={i}
              className={`pagination-btn ${page === p ? "active" : ""}`}
              onClick={() => setPage(p as number)}
            >
              {p}
            </button>
          ),
        )}

        <button
          className="pagination-btn next"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next »
        </button>
      </div>
    );
  };
  return (
    <>
      <div className="moneyboy-2x-1x-layout-container">
        <div className="discovery-page-container">
          <div className="discovery-page-content-container">
            <Filter
              search={search}
              setSearch={setSearch}
              setPage={setPage}
              filterValues={filterValues}
              setFilterValues={setFilterValues}
            />
            <div className="discovery-page-content-wrapper">
              <div className="discovery-page-cards-layouts">
                {creators.map((creator) => (
                  <div
                    key={creator._id}
                    className="user-profile-card-wrapper"
                    data-creator-profile-card
                  >
                    <div className="user-profile-card-container">
                      <div className="user-profile-card__img">
                        <img
                          src={
                            creator.profile ||
                            "/images/profile-avatars/profile-avatar-11.png"
                          }
                          alt={creator.displayName}
                        />
                      </div>
                      <div className="user-profile-content-overlay-container">
                        {/* actions unchanged */}
                        <div className="user-profile-card__action-btns">
                          {/* <div className="user-profile-card__like-btn">
                            <button className="like-button" data-like-button>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="21"
                                height="20"
                                viewBox="0 0 21 20"
                                fill="none"
                              >
                                <path
                                  d="M11.2665 17.3417C10.9832 17.4417 10.5165 17.4417 10.2332 17.3417C7.8165 16.5167 2.4165 13.075 2.4165 7.24166C2.4165 4.66666 4.4915 2.58333 7.04984 2.58333C8.5665 2.58333 9.90817 3.31666 10.7498 4.45C11.5915 3.31666 12.9415 2.58333 14.4498 2.58333C17.0082 2.58333 19.0832 4.66666 19.0832 7.24166C19.0832 13.075 13.6832 16.5167 11.2665 17.3417Z"
                                  stroke="none"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div> */}
                        </div>
                        <div className="user-profile-card__info-container">
                          <div className="user-profile-card__info">
                            <div className="user-profile-card__name-badge">
                              <div className="user-profile-card__name">
                                {creator.displayName}
                              </div>
                              <div className="user-profile-card__badge">
                                <img
                                  src="/images/logo/profile-badge.png"
                                  alt="Profile Badge"
                                />
                              </div>
                            </div>
                            <div className="user-profile-card__username">
                              @{creator.userName}
                            </div>
                          </div>
                          <div className="user-profile-card__wishlist-btn">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="21"
                              height="20"
                              viewBox="0 0 21 20"
                              fill="none"
                            >
                              <path
                                d="M14.7666 1.66687H6.73327C4.95827 1.66687 3.5166 3.11687 3.5166 4.88354V16.6252C3.5166 18.1252 4.5916 18.7585 5.90827 18.0335L9.97494 15.7752C10.4083 15.5335 11.1083 15.5335 11.5333 15.7752L15.5999 18.0335C16.9166 18.7669 17.9916 18.1335 17.9916 16.6252V4.88354C17.9833 3.11687 16.5416 1.66687 14.7666 1.66687Z"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M14.7666 1.66687H6.73327C4.95827 1.66687 3.5166 3.11687 3.5166 4.88354V16.6252C3.5166 18.1252 4.5916 18.7585 5.90827 18.0335L9.97494 15.7752C10.4083 15.5335 11.1083 15.5335 11.5333 15.7752L15.5999 18.0335C16.9166 18.7669 17.9916 18.1335 17.9916 16.6252V4.88354C17.9833 3.11687 16.5416 1.66687 14.7666 1.66687Z"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8.4585 7.5415C9.94183 8.08317 11.5585 8.08317 13.0418 7.5415"
                                stroke="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pagination_wrap">
                <button className="btn-prev"><CircleArrowLeft color="#000"/></button>
                <button className="premium-btn"><span>1</span></button>
                <button className="btn-primary"><span>2</span></button>
                <button className="btn-primary"><span>3</span></button>
                <button className="btn-next"><CircleArrowRight color="#000"/></button>
              </div>
              {renderPagination()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
