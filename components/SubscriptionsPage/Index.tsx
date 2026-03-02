"use client";
import { useState, useEffect } from "react";
import Featuredboys from '../Featuredboys';
import CustomSelect from '../CustomSelect';
import Link from "next/link";
import { useDecryptedSession } from "@/libs/useDecryptedSession";
import { useRouter, useSearchParams } from "next/navigation";
import { useCancelSubscription, useMySubscribers, useMySubscriptions } from "@/redux/SubscriptionList/Action";
import { useSelector } from "react-redux";
import { apiPost } from "@/utils/endpoints/common";
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
  const [time, setTime] = useState("all");
  const [activeTab, setActiveTab] = useState("subscribers"); // "subscribers" or "subscriptions"
  const { session } = useDecryptedSession();
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
const router =  useRouter();
  const rowsPerPage = 10;



const isCreator = session?.isAuthenticated && session?.user?.role === 2;
const searchParams = useSearchParams();

const tabFromUrl = searchParams.get("tab");

// ✅ Allow subscriptions tab ONLY when opened explicitly
const allowSubscriptionsTab = !isCreator || tabFromUrl === "subscriptions";

useEffect(() => {
  if (!isCreator) {
    setActiveTab("subscriptions");
    return;
  }

  if (tabFromUrl === "subscriptions") {
    setActiveTab("subscriptions");
  } else {
    setActiveTab("subscribers");
  }
}, [tabFromUrl, isCreator]);


    const buildQuery = () => {
      let q = searchText || "";

      if (status !== "all") {
        q += `|status:${status}`;
      }

      if (time !== "all") {
        q += `|time:${time}`;
      }

      return q;
    };

  useMySubscriptions(
    {
      page,
      rowsPerPage,
      searchText: buildQuery(),
    },
    activeTab === "subscriptions"
  );

  useMySubscribers(
    {
      page,
      rowsPerPage,
      searchText: buildQuery(),
    },
    activeTab === "subscribers"
  );
  const {
  mutate: cancelSubscription,
  isPending: isCancelling,
} = useCancelSubscription();


  const { subscriptions, subscribers, loading } = useSelector(
    (state: any) => state.SubscriptionList
  );

  const getSubscriptionState = (item: any) => {
  const now = new Date();

  if (item.isActive) {
    return "ACTIVE";
  }

  if (item.startsAt && new Date(item.startsAt) > now) {
    return "QUEUED";
  }

  if (item.expiresAt && new Date(item.expiresAt) < now) {
    return "EXPIRED";
  }

  return "INACTIVE";
};



  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
        <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers common-cntwrap" data-scroll-zero data-multiple-tabs-section data-identifier="1">
          
          {/* Tabs */}
          <div className="moneyboy-feed-page-cate-buttons card" id="posts-tabs-btn-card">
            {/* <button className="cate-back-btn active-down-effect"><span className="icons arrowLeft hwhite"></span></button> */}
          {isCreator ? (
            <>
              <button
                className={`page-content-type-button active-down-effect max-50 ${
                  activeTab === "subscribers" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab("subscribers");
                  window.history.replaceState(null, "", "/subscriptions");
                }}
              >
                Subscribers
              </button>
                <button
                  className={`page-content-type-button active-down-effect max-50 ${
                    activeTab === "subscriptions" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("subscriptions")}
                >
                  Subscriptions
                </button>
              {/* )} */}
            </>
          ) : (
            <button className="page-content-type-button active-down-effect max-50 active">
              Subscriptions
            </button>
          )}
          </div>
          <div className="tabs-content-wrapper-layout">
            <div data-multi-dem-cards-layout>
              <div className="creator-content-filter-grid-container">
                <div className="card filters-card-wrapper">
                  
                  {/* Search and Filters Section */}
                  <div className="search-features-grid-btns has-multi-tabs-btns one-row-content-wrapper">
                    <div className="creator-content-search-input">
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
                       <input
                          type="text"
                          placeholder="Enter keyword here"
                          value={searchText}
                          onChange={(e) => {
                            setSearchText(e.target.value);
                            setPage(1);
                          }}
                        />
                      </div>
                    </div>

                    <div className="creater-content-filters-layouts">
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
                        {/* <div className="custom-select-element bg-white p-sm size-sm">
                          <div className="custom-select-label-wrapper">
                            <div className="custom-select-icon-txt">
                              <span className="custom-select-label-txt">All Creators</span>
                            </div>
                            <div className="custom-select-chevron">
                              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                <path d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95" stroke="none" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                          <div className="custom-select-options-dropdown-wrapper" data-custom-select-dropdown style={{translate: "none", rotate: "none", scale: "none", overflow: "hidden", display: "none", opacity: 0, transform: "translate(0px, -10px)", height: "0px",}}>
                            <div className="custom-select-options-dropdown-container">
                              <div className="custom-select-options-lists-container">
                                <ul className="custom-select-options-list" data-custom-select-options-list>
                                  <li className="custom-select-option"><span> Option 1</span></li>
                                  <li className="custom-select-option"><span> Option 2</span></li>
                                  <li className="custom-select-option"><span> Option 3</span></li>
                                  <li className="custom-select-option"><span> Option 4</span></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>

                  {/* Tab Content */}
                  <div className="creator-content-cards-wrapper subscriptions_containt">
                   {loading && subscribers.length === 0 && <div className="loadingtext">{"Loading".split("").map((char, i) => (<span key={i} style={{ animationDelay: `${(i + 1) * 0.1}s` }}>{char}</span>))}</div>}
 
                    {activeTab === "subscribers" && (
                      <div className="rel-users-wrapper">
                        {subscribers?.map((item:any) => {
                          const state = getSubscriptionState(item);
                          return (
                        <div className="user-subbox" key={item._id}>
                          <div className="rel-user-profile">
                            <div className="profile-card">
                              <Link
  href={
    item?.subscriber?.role === 2
      ? `/profile/${item?.subscriber?.publicId}`
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
                                    </ul>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                          <div className="date_box">
                            <div className="date_wrap">
                              <svg className="icons calendarNote"/>
                              <div className="containt">
                                <span>Start Date</span>
                                <p>{formatDate(item.createdAt)}</p>
                              </div>
                            </div>
                            <div className="date_wrap">
                              <svg className="icons calendarNote"/>
                              <div className="containt">
                                <span>End Date</span>
                                <p>{formatDate(item.expiresAt)}</p>
                              </div>
                            </div>
                          </div>
                          <div className="rel-user-action-btn">
                            <button className="btn-txt-gradient"
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
                        {subscriptions?.map((item:any) => {
                          const state = getSubscriptionState(item);
                          return (
                        <div className="user-subbox" key={item._id}>
                          <div className="rel-user-profile">
                            <div className="profile-card">
                              <Link href={`/profile/${item.creator.publicId}`} className="profile-card__main">
                                <div className="profile-card__avatar-settings">
                                  <div className="profile-card__avatar">
                                    {item.creator.profile ? (
                                      <img src={item.creator.profile || "/images/profile-banners/profile-banner-1.jpg"} alt="Avatar" />
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
                                    </ul>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                          <div className="date_box">
                            <div className="date_wrap">
                              <svg className="icons calendarNote"/>
                              <div className="containt">
                                <span>Start Date</span>
                                <p>{formatDate(item.createdAt)}</p>
                              </div>
                            </div>
                            <div className="date_wrap">
                              <svg className="icons calendarNote"/>
                              <div className="containt">
                                <span>End Date</span>
                                <p>{formatDate(item.expiresAt)}</p>
                              </div>
                            </div>
                          </div>
                            <div className="rel-user-action-btn">
                             {state === "ACTIVE" && (
                                <button
                                  className="btn-danger"
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
                                <button className="btn-txt-gradient">
                                  <span>Activate</span>
                                </button>
                              )}
                            </div>
                        </div>
                         );
                        })}
                      </div>
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







// "use client";
// import { useState } from "react";
// import Featuredboys from '../Featuredboys';
// import CustomSelect from '../CustomSelect';
// import Link from "next/link";

// const SubscriptionsPage = () => {
//   const [time, setTime] = useState("all");
//   return (
//     <div className="moneyboy-2x-1x-layout-container">
//       <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
//         <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers common-cntwrap" data-scroll-zero data-multiple-tabs-section data-identifier="1">
//           <div className="moneyboy-feed-page-cate-buttons card" id="posts-tabs-btn-card">
//             {/* <button className="cate-back-btn active-down-effect"><span className="icons arrowLeft hwhite"></span></button> */}
//             <button className="page-content-type-button active-down-effect max-50 active">Subscribers</button>
//           </div>
//           <div className="tabs-content-wrapper-layout">
//             <div data-multi-dem-cards-layout>
//               <div className="creator-content-filter-grid-container">
//                 <div className="card filters-card-wrapper">
//                   <div className="search-features-grid-btns has-multi-tabs-btns one-row-content-wrapper">
//                   <div className="creator-content-search-input">
//                     <div className="label-input">
//                       <div className="input-placeholder-icon">
//                         <svg
//                           className="svg-icon"
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="24"
//                           height="24"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                         >
//                           <path
//                             d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2"
//                             strokeWidth="1.5"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <path
//                             d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
//                             strokeWidth="1.5"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <path
//                             d="M14 5H20"
//                             strokeWidth="1.5"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <path
//                             d="M14 8H17"
//                             strokeWidth="1.5"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                         </svg>
//                       </div>

//                       <input type="text" placeholder="Enter keyword here" />
//                     </div>
//                   </div>

//                   <div className="creater-content-filters-layouts">
//                     <div className="creator-content-select-filter group_select">
//                       {/* <CustomSelect searchable={false}
//                         label="All Time"
//                         className="custom-select-sm"
//                         value={time}
//                         onChange={setTime}
//                         options={[
//                           { label: "Option 1", value: "1" },
//                           { label: "Option 2", value: "2" },
//                           { label: "Option 3", value: "3" },
//                           { label: "Option 4", value: "4" },
//                         ]}
//                       /> */}

//                       <div className="custom-select-element bg-white p-sm size-sm">
//                         <div className="custom-select-label-wrapper">
//                           <div className="custom-select-icon-txt">
//                             <span className="custom-select-label-txt">All Status</span>
//                           </div>
//                           <div className="custom-select-chevron">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
//                               <path d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95" stroke="none" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
//                             </svg>
//                           </div>
//                         </div>
//                         <div className="custom-select-options-dropdown-wrapper" data-custom-select-dropdown style={{translate: "none", rotate: "none", scale: "none", overflow: "hidden", display: "none", opacity: 0, transform: "translate(0px, -10px)", height: "0px",}}>
//                           <div className="custom-select-options-dropdown-container">
//                             <div className="custom-select-options-lists-container">
//                               <ul className="custom-select-options-list" data-custom-select-options-list>
//                                 <li className="custom-select-option"><span> Option 1</span></li>
//                                 <li className="custom-select-option"><span> Option 2</span></li>
//                                 <li className="custom-select-option"><span> Option 3</span></li>
//                                 <li className="custom-select-option"><span> Option 4</span></li>
//                               </ul>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="custom-select-element bg-white p-sm size-sm">
//                         <div className="custom-select-label-wrapper">
//                           <div className="custom-select-icon-txt">
//                             <span className="custom-select-label-txt">All Time</span>
//                           </div>
//                           <div className="custom-select-chevron">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
//                               <path d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95" stroke="none" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
//                             </svg>
//                           </div>
//                         </div>
//                         <div className="custom-select-options-dropdown-wrapper" data-custom-select-dropdown style={{translate: "none", rotate: "none", scale: "none", overflow: "hidden", display: "none", opacity: 0, transform: "translate(0px, -10px)", height: "0px",}}>
//                           <div className="custom-select-options-dropdown-container">
//                             <div className="custom-select-options-lists-container">
//                               <ul className="custom-select-options-list" data-custom-select-options-list>
//                                 <li className="custom-select-option"><span> Option 1</span></li>
//                                 <li className="custom-select-option"><span> Option 2</span></li>
//                                 <li className="custom-select-option"><span> Option 3</span></li>
//                                 <li className="custom-select-option"><span> Option 4</span></li>
//                               </ul>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="custom-select-element bg-white p-sm size-sm">
//                         <div className="custom-select-label-wrapper">
//                           <div className="custom-select-icon-txt">
//                             <span className="custom-select-label-txt">All Creators</span>
//                           </div>
//                           <div className="custom-select-chevron">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
//                               <path d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95" stroke="none" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
//                             </svg>
//                           </div>
//                         </div>
//                         <div className="custom-select-options-dropdown-wrapper" data-custom-select-dropdown style={{translate: "none", rotate: "none", scale: "none", overflow: "hidden", display: "none", opacity: 0, transform: "translate(0px, -10px)", height: "0px",}}>
//                           <div className="custom-select-options-dropdown-container">
//                             <div className="custom-select-options-lists-container">
//                               <ul className="custom-select-options-list" data-custom-select-options-list>
//                                 <li className="custom-select-option"><span> Option 1</span></li>
//                                 <li className="custom-select-option"><span> Option 2</span></li>
//                                 <li className="custom-select-option"><span> Option 3</span></li>
//                                 <li className="custom-select-option"><span> Option 4</span></li>
//                               </ul>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   </div>
//                   <div className="creator-content-cards-wrapper subscriptions_containt">
//                     <div className="rel-users-wrapper">
//                     <div className="user-subbox">
//                       <div className="rel-user-profile">
//                         <div className="profile-card">
//                           <Link href="#" className="profile-card__main">
//                             <div className="profile-card__avatar-settings">
//                               <div className="profile-card__avatar">
//                                 <img src="images/profile-avatars/profile-avatar-6.jpg" alt="MoneyBoy Social Profile Avatar" />
//                               </div>
//                             </div>
//                             <div className="profile-card__info">
//                               <div className="profile-card__name-badge">
//                                 <div className="profile-card__name">Zain Schleifer</div>
//                                 <div className="profile-card__badge">
//                                   <img src="/images/logo/profile-badge.png" alt="MoneyBoy Social Profile Badge" />
//                                 </div>
//                               </div>
//                               <div className="profile-card__username">
//                                 <ul>
//                                   <li className="yrly">Yearly</li>
//                                   {/* <li className="stip">Stipe</li> */}
//                                   <li className="active">Active</li>
//                                 </ul>
//                               </div>
//                             </div>
//                           </Link>
//                         </div>
//                       </div>
//                       <div className="date_box">
//                         <div className="date_wrap">
//                           <svg className="icons calendarNote"/>
//                           <div className="containt">
//                             <span>Start Date</span>
//                             <p>Apr 25, 2025</p>
//                           </div>
//                         </div>
//                         <div className="date_wrap">
//                           <svg className="icons calendarNote"/>
//                           <div className="containt">
//                             <span>Start Date</span>
//                             <p>Apr 25, 2025</p>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="rel-user-action-btn">
//                       <button className="btn-txt-gradient"><span>Message</span></button>
//                       </div>
//                     </div>
//                     <div className="user-subbox">
//                       <div className="rel-user-profile">
//                         <div className="profile-card">
//                           <Link href="#" className="profile-card__main">
//                             <div className="profile-card__avatar-settings">
//                               <div className="profile-card__avatar">
//                                 <img src="/images/profile-avatars/profile-avatar-5.jpg" alt="MoneyBoy Social Profile Avatar" />
//                               </div>
//                             </div>
//                             <div className="profile-card__info">
//                               <div className="profile-card__name-badge">
//                                 <div className="profile-card__name">Gustavo Stanton</div>
//                                 <div className="profile-card__badge">
//                                   <img src="/images/logo/profile-badge.png" alt="MoneyBoy Social Profile Badge" />
//                                 </div>
//                               </div>
//                               <div className="profile-card__username">
//                                 <ul>
//                                   <li className="yrly">Yearly</li>
//                                   {/* <li className="cbill">CCbill</li> */}
//                                   <li className="active">Active</li>
//                                 </ul>
//                               </div>
//                             </div>
//                           </Link>
//                         </div>
//                       </div>
//                       <div className="date_box">
//                         <div className="date_wrap">
//                           <svg className="icons calendarNote"/>
//                           <div className="containt">
//                             <span>Start Date</span>
//                             <p>Apr 25, 2025</p>
//                           </div>
//                         </div>
//                         <div className="date_wrap">
//                           <svg className="icons calendarNote"/>
//                           <div className="containt">
//                             <span>Start Date</span>
//                             <p>Apr 25, 2025</p>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="rel-user-action-btn">
//                         <button className="btn-txt-gradient"><span>Message</span></button>
//                       </div>
//                     </div>
//                     <div className="user-subbox">
//                       <div className="rel-user-profile">
//                         <div className="profile-card">
//                           <Link href="#" className="profile-card__main">
//                             <div className="profile-card__avatar-settings">
//                               <div className="profile-card__avatar">
//                                 <img src="/images/profile-avatars/profile-avatar-3.jpg" alt="MoneyBoy Social Profile Avatar" />
//                               </div>
//                             </div>
//                             <div className="profile-card__info">
//                               <div className="profile-card__name-badge">
//                                 <div className="profile-card__name">Emerson Bator</div>
//                                 <div className="profile-card__badge">
//                                   <img src="/images/logo/profile-badge.png" alt="MoneyBoy Social Profile Badge" />
//                                 </div>
//                               </div>
//                               <div className="profile-card__username">
//                                 <ul>
//                                   <li className="yrly">Yearly</li>
//                                   {/* <li className="stip">Stipe</li> */}
//                                   <li className="active">Active</li>
//                                 </ul>
//                               </div>
//                             </div>
//                           </Link>
//                         </div>
//                       </div>
//                       <div className="date_box">
//                         <div className="date_wrap">
//                           <svg className="icons calendarNote"/>
//                           <div className="containt">
//                             <span>Start Date</span>
//                             <p>Apr 25, 2025</p>
//                           </div>
//                         </div>
//                         <div className="date_wrap">
//                           <svg className="icons calendarNote"/>
//                           <div className="containt">
//                             <span>Start Date</span>
//                             <p>Apr 25, 2025</p>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="rel-user-action-btn">
//                         <button className="btn-txt-gradient"><span>Message</span></button>
//                       </div>
//                     </div>
//                     <div className="user-subbox">
//                       <div className="rel-user-profile">
//                         <div className="profile-card">
//                           <Link href="#" className="profile-card__main">
//                             <div className="profile-card__avatar-settings">
//                               <div className="profile-card__avatar">
//                                 <img src="/images/profile-avatars/profile-avatar-7.jpg" alt="MoneyBoy Social Profile Avatar" />
//                               </div>
//                             </div>
//                             <div className="profile-card__info">
//                               <div className="profile-card__name-badge">
//                                 <div className="profile-card__name">Omar Dokidis</div>
//                                 <div className="profile-card__badge">
//                                   <img src="/images/logo/profile-badge.png" alt="MoneyBoy Social Profile Badge" />
//                                 </div>
//                               </div>
//                               <div className="profile-card__username">
//                                 <ul>
//                                   <li className="yrly">Yearly</li>
//                                   {/* <li className="stip">Stipe</li> */}
//                                   <li className="saspnd">Suspended</li>
//                                 </ul>
//                               </div>
//                             </div>
//                           </Link>
//                         </div>
//                       </div>
//                       <div className="date_box">
//                         <div className="date_wrap">
//                           <svg className="icons calendarNote"/>
//                           <div className="containt">
//                             <span>Start Date</span>
//                             <p>Apr 25, 2025</p>
//                           </div>
//                         </div>
//                         <div className="date_wrap">
//                           <svg className="icons calendarNote"/>
//                           <div className="containt">
//                             <span>Start Date</span>
//                             <p>Apr 25, 2025</p>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="rel-user-action-btn">
//                         <button className="btn-txt-gradient"><span>Message</span></button>
//                       </div>
//                     </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Featuredboys />
//     </div>
//   )
// }

// export default SubscriptionsPage;
