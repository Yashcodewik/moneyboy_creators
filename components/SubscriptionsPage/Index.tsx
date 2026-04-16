"use client";
import { useState, useEffect, useRef } from "react";
import Featuredboys from "../Featuredboys";
import CustomSelect from "../CustomSelect";
import Link from "next/link";
import { useDecryptedSession } from "@/libs/useDecryptedSession";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCancelSubscription,
  useMySubscribers,
  useMySubscriptions,
} from "@/redux/SubscriptionList/Action";
import { useDispatch, useSelector } from "react-redux";
import { apiPost } from "@/utils/endpoints/common";
import BtnGroupTabs from "../BtnGroupTabs";
import { CircleX } from "lucide-react";
import SubscriptionModal from "../ProfilePage/SubscriptionModal";
import toast from "react-hot-toast";
import { subscribeCreator } from "@/redux/Subscription/Action";
import { API_SUBSCRIBE_CREATOR } from "@/utils/api/APIConstant";
import { useQueryClient } from "@tanstack/react-query";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

export const timeOptions = [
  { label: "All Time", value: "all" },
  { label: "Today", value: "today" },
  { label: "This Week", value: "this_week" },
  { label: "This Month", value: "this_month" },
];

export const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Queued", value: "queued" },
  { label: "Expired", value: "expired" },
];

const SubscriptionsPage = () => {
  const { session } = useDecryptedSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<"subscribers" | "subscriptions">(
    "subscribers"
  );
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("all");
  const [time, setTime] = useState("all");
  const [page, setPage] = useState(1);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const rowsPerPage = 10;
  const tabFromUrl = searchParams.get("tab");

  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<"MONTHLY" | "YEARLY" | null>(
      null,
    );
    const [selectedItem, setSelectedItem] = useState<any>(null);
      const queryClient = useQueryClient();
      const [subLoading, setSubLoading] = useState(false);
   
  const isCreator =
    session?.isAuthenticated && session?.user?.role === 2;

  useEffect(() => {
    if (!isCreator) {
      setActiveTab("subscriptions");
      return;
    }

    setActiveTab(
      tabFromUrl === "subscriptions" ? "subscriptions" : "subscribers"
    );
  }, [tabFromUrl, isCreator]);

  const buildQuery = () => {
    let q = searchText || "";

    if (status !== "all") q += `|status:${status}`;
    if (time !== "all") q += `|time:${time}`;

    return q;
  };

  useMySubscriptions(
    { page, rowsPerPage, searchText: buildQuery() },
    activeTab === "subscriptions"
  );

  useMySubscribers(
    { page, rowsPerPage, searchText: buildQuery() },
    activeTab === "subscribers"
  );

  const { mutate: cancelSubscription } = useCancelSubscription();

  const { subscriptions, subscribers, loading } = useSelector(
    (state: any) => state.SubscriptionList
  );

const getSubscriptionState = (item: any) => {
  const now = new Date();

  // ✅ FIRST: respect backend status
  if (item.status === "EXPIRE_SOON") return "EXPIRE_SOON";
  if (item.status === "ACTIVE") return "ACTIVE";
  if (item.status === "EXPIRED") return "EXPIRED";
  if (item.status === "PENDING") return "QUEUED";

  // ✅ fallback (safety)
  if (item.startsAt && new Date(item.startsAt) > now) return "QUEUED";
  if (item.expiresAt && new Date(item.expiresAt) < now) return "EXPIRED";

  return "INACTIVE";
};

  const handleTabChange = (value: string) => {
    const newTab = value as "subscribers" | "subscriptions";

    setActiveTab(newTab);
    setPage(1);
    setSearchText("");
    setStatus("all");
    setTime("all");

    if (newTab === "subscriptions") {
      router.replace("/subscriptions?tab=subscriptions");
    } else {
      router.replace("/subscriptions");
    }
  };

  const [debouncedSearch, setDebouncedSearch] = useState(searchText);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchText]);

const openSubscriptionModal = (item: any) => {
  setSelectedItem(item);
  setSelectedPlan(item.planType);
  setShowSubscriptionModal(true);
};
const handleSubscribe = async (planType: "MONTHLY" | "YEARLY") => {
  if (!selectedItem?.creatorId || subLoading) return;

  setSubLoading(true);

  const res = await apiPost({
    url: API_SUBSCRIBE_CREATOR,
    values: {
      creatorId: selectedItem.creatorId, // 🔥 FIXED
      planType,
    },
  });

  if (res?.success) {
    toast.success("Subscribed successfully");

    // ✅ refresh subscription list
    queryClient.invalidateQueries({
      queryKey: ["subscriptions"], // 🔥 your list query
    });
    return true;
  } else {
    toast.error(res?.message || "Subscription failed");
  }

  setSubLoading(false);
};
  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
        <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers common-cntwrap" data-scroll-zero data-multiple-tabs-section data-identifier="1">

          <BtnGroupTabs
            activeTab={activeTab}
            onChange={(value) => {
              const newTab = value as "subscribers" | "subscriptions"; setActiveTab(newTab); setPage(1); setSearchText(""); setStatus("all"); setTime("all");
              if (newTab === "subscriptions") {
                router.replace("/subscriptions?tab=subscriptions");
              } else { router.replace("/subscriptions"); }
            }}
            tabs={isCreator ? [{ key: "subscribers", label: "Subscribers" }, { key: "subscriptions", label: "Subscriptions" },] : [{ key: "subscriptions", label: "Subscriptions" }]}
          />
          <div className="tabs-content-wrapper-layout">
            <div data-multi-dem-cards-layout>
              <div className="creator-content-filter-grid-container">
                <div className="card filters-card-wrapper">
                  {/* Search and Filters Section */}
                  <div className="search-features-grid-btns has-multi-tabs-btns one-row-content-wrapper">
                    <div className={`creator-content-search-input ${isSearchActive ? "w-full" : ""}`}>
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
                        <input ref={searchInputRef} type="text" placeholder="Enter keyword here" value={searchText} onChange={(e) => setSearchText(e.target.value)} onFocus={() => setIsSearchActive(true)} onBlur={() => { setTimeout(() => { if (!searchText) setIsSearchActive(false); }, 100); }} />
                        {isSearchActive && (
                          <button style={{marginLeft: "5px"}} className="btn-danger icon" onMouseDown={(e) => { e.preventDefault(); setSearchText(""); setIsSearchActive(false); searchInputRef.current?.blur(); setPage(1); }}><CircleX size={18} /></button>
                        )}
                      </div>
                    </div>
                    {!isSearchActive && (
                      <div className="creater-content-filters-layouts w-fit">
                        <div className="creator-content-select-filter group_select">
                          <CustomSelect className="bg-white p-sm size-sm"
                            label="All Status"
                            options={statusOptions}
                            value={status}
                            onChange={(val: any) => {
                              setStatus(val);
                              setPage(1);
                            }}
                            searchable={false}
                          />

                          <CustomSelect
                            className="bg-white p-sm size-sm"
                            label="All Time"
                            options={timeOptions}
                            value={time}
                            onChange={(val: any) => {
                              setTime(val);
                              setPage(1);
                            }}
                            searchable={false}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tab Content */}
                  <div className="creator-content-cards-wrapper subscriptions_containt">
                    {loading && subscribers.length === 0 && <div className="loadingtext">{"Loading".split("").map((char, i) => (<span key={i} style={{ animationDelay: `${(i + 1) * 0.1}s` }}>{char}</span>))}</div>}
                    {!loading &&
                      ((activeTab === "subscribers" && subscribers.length === 0) ||
                        (activeTab === "subscriptions" && subscriptions.length === 0)) && (
                        <div className="nofound">
                          <h3 className="first">No media found</h3>
                          <h3 className="second">No media found</h3>
                        </div>
                      )}
                    {activeTab === "subscribers" && (
                      <div className="rel-users-wrapper">
                        {subscribers?.map((item: any) => {
                          const state = getSubscriptionState(item);
                          return (
                            <div className="user-subbox" key={item._id}>
                              <div className="rel-user-profile">
                                <div className="profile-card">
                                  <Link
                                    href={
                                      item?.subscriber?.role === 2
                                        ? `/${item?.subscriber?.userName}`
                                        : `/userprofile/${item?.subscriber?.publicId}`
                                    }
                                    className="profile-card__main"
                                  >
                                    <div className="profile-card__avatar-settings">
                                      <div className="profile-card__avatar">
                                        {item?.subscriber?.profile ? (
                                          <img src={item?.subscriber?.profile || "/images/profile-avatars/profile-avatar-1.png"} alt="Avatar" />
                                        ) : (
                                          <div className="noprofile">
                                            {/* <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><text x="50%" y="50%">m</text></svg> */}
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
                                        <div className="profile-card__name">{item?.subscriber?.displayName || "Unknown"}</div>
                                        {item?.subscriber?.role === 2 && (
                                          <div className="profile-card__badge">
                                            <img src="/images/logo/profile-badge.png" alt="MoneyBoy Social Profile Badge" />
                                          </div>
                                        )}
                                      </div>
                                      <div className="profile-card__username">
                                        <ul>
                                          <li className="yrly">{item?.planType === "YEARLY" ? "Yearly" : "Monthly"}</li>
                                          {state === "ACTIVE" && <li className="active">Active</li>}
                                          {state === "QUEUED" && <li className="saspnd">Queued</li>}
                                          {state === "EXPIRED" && <li className="saspnd">Expired</li>}
                                          {state === "EXPIRE_SOON" && <li className="saspnd">Expiring Soon</li>}

                                        </ul>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                              <div className="date_box">
                                <div className="date_wrap">
                                  <svg className="icons calendarNote" />
                                  <div className="containt">
                                    <span>Start Date</span>
                                    <p>{formatDate(item.startsAt)}</p>
                                  </div>
                                </div>
                                <div className="date_wrap">
                                  <svg className="icons calendarNote" />
                                  <div className="containt">
                                    <span>End Date</span>
                                    <p>{formatDate(item.expiresAt)}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="rel-user-action-btn">
                                <button className="btn-txt-gradient shimmer"
                                  onClick={async (e) => {
                                    e.preventDefault();
                                    if (!item?.subscriber?._id) return;
                                    const res = await apiPost({
                                      url: "messages/thread",
                                      values: {
                                        receiverId: item.subscriber._id,
                                      },
                                    });
                                    if (res?.threadId) {
                                      router.push(
                                        `/message?threadId=${res.threadId}`,
                                      );
                                    }
                                  }}
                                ><span>Message</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {activeTab === "subscriptions" && (
                      <div className="rel-users-wrapper">
                        {subscriptions?.map((item: any) => {
                          const state = getSubscriptionState(item);
                          return (
                            <div className="user-subbox" key={item._id}>
                              <div className="rel-user-profile">
                                <div className="profile-card">
                                  <Link href={`/${item.creator.userName}`} className="profile-card__main">
                                    <div className="profile-card__avatar-settings">
                                      <div className="profile-card__avatar">
                                        {item.creator.profile ? (
                                          <img src={item.creator.profile || "/images/profile-banners/profile-banner-1.jpg"} alt="Avatar" />
                                        ) : (
                                          <div className="noprofile">
                                            {/* <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><text x="50%" y="50%">m</text></svg> */}
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
                                        <div className="profile-card__name">{item.creator.displayName || "Unknown"}</div>
                                        <div className="profile-card__badge">
                                          <img src="/images/logo/profile-badge.png" alt="MoneyBoy Social Profile Badge" />
                                        </div>
                                      </div>
                                      <div className="profile-card__username">
                                        <ul>
                                          <li className="yrly">{item.planType === "YEARLY" ? "Yearly" : "Monthly"}</li>
                                          {state === "ACTIVE" && <li className="active">Active</li>}
                                          {state === "QUEUED" && <li className="saspnd">Queued</li>}
                                          {state === "EXPIRED" && <li className="saspnd">Expired</li>}
                                          {state === "EXPIRE_SOON" && <li className="saspnd">Expiring Soon</li>}
                                        </ul>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                              <div className="date_box">
                                <div className="date_wrap">
                                  <svg className="icons calendarNote" />
                                  <div className="containt">
                                    <span>Start Date</span>
                                    <p>{formatDate(item.startsAt)}</p>
                                  </div>
                                </div>
                                <div className="date_wrap">
                                  <svg className="icons calendarNote" />
                                  <div className="containt">
                                    <span>End Date</span>
                                    <p>{formatDate(item.expiresAt)}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="rel-user-action-btn">
                                {state === "ACTIVE" && (
                                  <button
                                    className="btn-danger shimmer"
                                    onClick={() => {
                                      setCancellingId(item._id);
                                      cancelSubscription(item._id, {
                                        onSettled: () => {
                                          setCancellingId(null);
                                        },
                                      });
                                    }}
                                    disabled={cancellingId === item._id}
                                  >
                                    <span>
                                      {cancellingId === item._id ? "Cancelling..." : "Cancel"}
                                    </span>
                                  </button>
                                )}

                                {state === "QUEUED" && (
                                  <button className="btn-danger" disabled>
                                    <span>Queued</span>
                                  </button>
                                )}

                                {state === "EXPIRED" && (
                                  <button className="btn-txt-gradient shimmer"  onClick={() => openSubscriptionModal(item)}>
                                    <span>Activate</span>
                                  </button>
                                )}

                                {state === "EXPIRE_SOON" && (
                                  <button className="btn-danger" disabled>
                                    <span>Cancelled</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                 {showSubscriptionModal && selectedPlan && selectedItem && (
                      <SubscriptionModal
                        onClose={() => setShowSubscriptionModal(false)}
                        plan={selectedPlan}
                        setPlan={setSelectedPlan}
                        action="subscribe"
                        creator={{
                          displayName: selectedItem?.creator?.displayName,
                          userName: selectedItem?.creator?.userName,
                          profile: selectedItem?.creator?.profile,
                        }}
                        subscription={{
                          monthlyPrice: selectedItem?.amount,
                          yearlyPrice: selectedItem?.amount * 12,
                        }}
                        onConfirm={async () => {
                          const success = await handleSubscribe(selectedPlan);
                          if (success) {
                            setShowSubscriptionModal(false);
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Featuredboys />
    </div>
  )
}

export default SubscriptionsPage;