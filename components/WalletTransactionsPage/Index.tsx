"use client";
import React, { useEffect, useRef, useState } from "react";
import Featuredboys from '../Featuredboys';
import CustomSelect from '../CustomSelect';
import Link from "next/link";
import { useDecryptedSession } from "@/libs/useDecryptedSession";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "@/utils/endpoints/common";
import { API_ADD_COMMENT, API_GET_TRANSACTION_CREATORS, API_GET_TRANSACTIONS } from "@/utils/api/APIConstant";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WalletTransactionsPage = () => {
  const { session } = useDecryptedSession();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState<string>("");
  const [searchText, setSearchText] = useState("");
  
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [activeField, setActiveField] = useState<"start" | "end" | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setActiveField(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initialTab =
    searchParams.get("tab") === "orders"
      ? "orders"
      : searchParams.get("tab") === "payments"
      ? "payments"
      : "wallet";

  const [activeTab, setActiveTab] = useState<
    "wallet" | "orders" | "payments" | "details"
  >(initialTab);

  useEffect(() => {
  if (!session?.user?.role) return;

  if (session.user.role === 2) {
    // CREATOR
    if (activeTab === "wallet") setMode("earnings");
    if (activeTab === "orders") setMode("sales");
    if (activeTab === "payments") setMode("received");
  }

  if (session.user.role === 1) {
    // USER
    if (activeTab === "wallet") setMode("expenses");
    if (activeTab === "orders") setMode("purchases");
    if (activeTab === "payments") setMode("sent");
  }

  setPage(1); 
}, [activeTab, session?.user?.role]);

  const rowsPerPage = 10;
  useEffect(() => {
    setPage(1);
  }, [activeTab, mode]);


const { data, isLoading } = useQuery({
  queryKey: ["wallet-transactions", activeTab, mode, searchText, page, startDate, endDate],
  queryFn: () => {
    const params = new URLSearchParams({
      tab: activeTab,
      mode: mode,
    });

    if (startDate) params.append("startDate", startDate.toISOString());
    if (endDate) params.append("endDate", endDate.toISOString());

    return getApi({
      url: `${API_GET_TRANSACTIONS}?${params.toString()}&`,
      page,
      rowsPerPage,
      searchText,
    });
  },
  enabled: !!mode,
});

  const transactions = data?.data || [];
  const summary = data?.summary;
  const { data: creators } = useQuery({
    queryKey: ["transaction-creators"],
    queryFn: () => getApi({ url: API_GET_TRANSACTION_CREATORS }),
  });

const getModeOptions = () => {
  // WALLET
  if (activeTab === "wallet") {
    if (session?.user?.role === 2) {
      return [
        { label: "Earnings", value: "earnings" },
        { label: "Expenses", value: "expenses" },
      ];
    }
    return [{ label: "Expenses", value: "expenses" }];
  }

  // ORDERS
  if (activeTab === "orders") {
    if (session?.user?.role === 2) {
      return [
        { label: "Sales", value: "sales" },
        { label: "Purchases", value: "purchases" },
      ];
    }
    return [{ label: "Purchases", value: "purchases" }];
  }

  // PAYMENTS
  if (activeTab === "payments") {
    if (session?.user?.role === 2) {
      return [
        { label: "Received", value: "received" },
        { label: "Sent", value: "sent" },
      ];
    }
    return [{ label: "Sent", value: "sent" }];
  }

  return [];
};


  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
        <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers" data-scroll-zero data-multiple-tabs-section data-identifier="1">
          <div className="moneyboy-feed-page-cate-buttons card" id="posts-tabs-btn-card">
            <button
            className={`page-content-type-button active-down-effect ${activeTab === "wallet" ? "active" : ""}`}
            onClick={() => setActiveTab("wallet")}
          >
            Wallet Transactions
          </button>

          <button
            className={`page-content-type-button active-down-effect ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            Order History
          </button>

          <button
            className={`page-content-type-button active-down-effect ${activeTab === "payments" ? "active" : ""}`}
            onClick={() => setActiveTab("payments")}
          >
            Payment History
          </button>

          </div>
          <div className="tabs-content-wrapper-layout">
            <div data-multi-dem-cards-layout>
              <div className="creator-content-filter-grid-container">
                <div className="card filters-card-wrapper">
                  <div className="search-features-grid-btns has-multi-tabs-btns two-row-content-wrapper wthead_wrap">
                  <div className="creator-content-search-input">
                    <div className="label-input">
                      <div className="input-placeholder-icon">
                        <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M14 5H20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M14 8H17" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <input type="text" placeholder="Enter name here"  
                      value={searchText}
                        onChange={(e) => {
                          setSearchText(e.target.value);
                          setPage(1);
                        }} />
                    </div>
                  </div>

                  <div className="creater-content-filters-layouts gap-5">
                    <div className="creator-content-select-filter gap-5">
                      <div className="custom-select-element bg-white p-sm size-sm">
                        <div className="creator-content-select-filter">
                          <CustomSelect className="bg-white p-sm size-sm" label="Filter" options={getModeOptions()} value={mode} searchable={false} onChange={(val) => {setMode(val as string); setPage(1);}}/>
                        </div>
                      </div>
                      <div className="custom-select-element bg-white p-sm size-sm">
                        <div className="creator-content-select-filter">
                          <CustomSelect className="bg-white p-sm size-sm" label="All Creators" searchable={false}
                          options={
                            creators?.data?.map((u: any) => ({
                              label: u.displayName,
                              value: u._id,
                            })) || []
                          }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="creator-content-grid-layout-options date-range-options" ref={wrapperRef}>
                      <div className="date-btn-wrapper">
                        <button type="button" className="creator-content-grid-layout-btn" onClick={() => setActiveField(activeField === "start" ? null : "start")}><span>{startDate ? startDate.toDateString() : "Start Date"}</span><svg className="icons calendarNoteSmall" /></button>
                        {activeField === "start" && (
                          <div className="calendar-dropdown"><DatePicker selected={startDate} onChange={(date: any) => {setStartDate(date); setPage(1);  setActiveField(null);}} inline/></div>
                        )}
                      </div>
                      <div className="date-btn-wrapper">
                        <button type="button" className="creator-content-grid-layout-btn" onClick={() => setActiveField(activeField === "end" ? null : "end")}><span>{endDate ? endDate.toDateString() : "End Date"}</span> <svg className="icons calendarNoteSmall" /></button>
                        {activeField === "end" && (
                          <div className="calendar-dropdown"><DatePicker selected={endDate} minDate={startDate ?? undefined} onChange={(date: any) => {setEndDate(date); setPage(1); setActiveField(null);}} inline/></div>
                        )}
                      </div>
                    </div>
                  </div>
                  </div>
                  {activeTab !== "details" && (
                  <div className="creator-content-cards-wrapper wtransactions_containt">
                    <div className="rel-users-wrapper">
                      {session?.user?.role === 2 && (
                    <>
                    <div className="history_wrap">
                      <div className="rline">
                        <p>Total Earned</p>
                       <h3>$ {summary?.totalEarned?.toFixed(2) || "0.00"}</h3>
                      </div>
                      <div className="rline">
                        <p>Withdrew</p>
                        <h3>$ {summary?.totalWithdrawn?.toFixed(2) || "0.00"}</h3>
                      </div>
                      <div className="">
                        <p>Wallet Balance</p>
                        <h3>$ {summary?.walletBalance?.toFixed(2) || "0.00"}</h3>
                      </div>
                    </div>
                    <div className="payout_wrap">
                      <h3>Get a payout</h3>
                     <Link href="/request-payout">
                      <button className="btn-txt-gradient" type="button" ><span>Request payout</span> </button>
                    </Link>
                    </div>
                    </>
                      )}
                      {session?.user?.role === 1 && (
                    <div className="payout_wrap">
                      <div>
                        <p>Current Balance</p>
                        <h3>$ {summary?.totalSpent?.toFixed(2) || "0.00"}</h3>
                      </div>
                      <Link href="#">
                      <button className="btn-txt-gradient" type="button"><span>Add Funds</span> </button>
                        </Link>
                    </div>
                      )}
                   {transactions.map((txn: any) => {
                        const isIncoming = txn.toUser?._id === session?.user?.id;
                        const otherUser = isIncoming ? txn.fromUser : txn.toUser;

                        return (
                          <div className="rel-user-box" key={txn._id}>
                            <div className="rel-user-profile-action">
                              <div className="rel-user-profile">
                                <div className="profile-card">
                                  <Link href="#" className="profile-card__main">
                                    <div className="profile-card__avatar-settings">
                                      <div className="profile-card__avatar">
                                      {otherUser?.profile ? (
                                        <img src={otherUser?.profile || "/images/profile-avatars/profile-avatar-6.jpg"} alt="User profile avatar"/>
                                        ) : (
                                        <div className="noprofile">
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
                                        <img src={otherUser?.profile || "/images/profile-avatars/profile-avatar-6.jpg"} alt="User profile avatar"/>
                                      </div>
                                    </div>
                                    <div className="profile-card__info">
                                      <div className="profile-card__username tphead">
                                        {isIncoming ? "From" : "To"}
                                      </div>
                                      <div className="profile-card__name-badge">
                                        <div className="profile-card__name">
                                          {otherUser?.displayName}
                                        </div>
                                      </div>
                                      <div className="profile-card__username">
                                        {txn.status === "SUCCESS" && (
                                          <span className="badge success">Success</span>
                                        )}
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                              <div className="date_box">
                                <div className="date_wrap">
                                  <svg className="icons currency" />
                                  <div className="containt">
                                    <span>Amount</span>
                                    <p className={isIncoming ? "text-green" : ""}>
                                      ${txn.amount}
                                    </p>
                                  </div>
                                </div>

                                <div className="date_wrap">
                                  <svg className="icons noteDocument" />
                                  <div className="containt">
                                    <span>Type</span>
                                    <p>{txn.type.replace("_", " ")}</p>
                                  </div>
                                </div>

                                <div className="date_wrap">
                                  <svg className="icons calendarNote" />
                                  <div className="containt">
                                    <span>Date</span>
                                    <p>{new Date(txn.createdAt).toLocaleDateString()}</p>
                                    <p>{new Date(txn.createdAt).toLocaleTimeString()}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="rel-user-desc">
                              <div>
                                <p className="heading">Discription</p>
                                <p>{txn.type}</p>
                              </div>
                              <div className="rel-user-actions">
                                <button
                                  className="btn-txt-gradient"
                                  type="button"
                                  onClick={() => setActiveTab("details")}
                                >
                                  <span>View</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* ===================================== */}
          {/* ========== Payment History ========== */}
          {/* ===================================== */}
          {activeTab === "details" && (
            <>
          <div className="moneyboy-feed-page-cate-buttons card" id="posts-tabs-btn-card">
            {/* Back Button */}
            <button className="cate-back-btn active-down-effect" type="button" aria-label="Go back"  onClick={() => setActiveTab("orders")}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9.57 5.93L3.5 12L9.57 18.07" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20.5 12H3.67" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="icntext_wrap">
              <div className="iconsbox"><svg className="icons box3d" width="24" height="24"/></div>
              <h3>#80900857</h3>
            </div>
          </div>
          
          <div className="tabs-content-wrapper-layout">
            <div>
              <div className="creator-content-filter-grid-container">
                <div className="card filters-card-wrapper">
                  <div className="creator-content-cards-wrapper wtransactions_containt mt-0">
                    <div className="rel-users-wrapper">
                      <div className="rel-user-box hist-box">
                        <div className="rel-user-profile-action">
                          <div className="rel-user-profile">
                            <div className="profile-card">
                              <Link href="#" className="profile-card__main">
                                <div className="profile-card__avatar-settings">
                                  <div className="profile-card__avatar iconsbox">
                                   <svg className="icons box3d" width="24" height="24"/>
                                  </div>
                                </div>
                                <div className="profile-card__info">
                                  <div className="profile-card__username tphead">Product</div>
                                  <div className="profile-card__name-badge">
                                    <div className="profile-card__name">Sunset Video</div>
                                    <div className="profile-card__badge"><span className="badge success">Delivered</span></div>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                          <div className="date_box mobail_show">
                            <div className="date_wrap">
                              <svg className="icons archiveBox"/>
                              <div className="containt">
                                <span>Product Type</span>
                                <p>Digital</p>
                              </div>
                            </div>
                          </div>
                          <div className="date_box">
                            <div className="date_wrap mobail_hide">
                              <svg className="icons archiveBox"/>
                              <div className="containt">
                                <span>Product Type</span>
                                <p>Digital</p>
                              </div>
                            </div>
                            <div className="date_wrap">
                              <svg className="icons currency"/>
                              <div className="containt">
                                <span>Unit Price</span>
                                <p>$10</p>
                              </div>
                            </div>
                            <div className="date_wrap">
                              <svg className="icons noteDocument"/>
                              <div className="containt">
                                <span>Quantity</span>
                                <p>1</p>
                              </div>
                            </div>
                            <div className="date_wrap">
                              <svg className="icons currency"/>
                              <div className="containt">
                                <span>Total Price</span>
                                <p>$10</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rel-user-desc">
                          <div className="">
                            <p className="heading">Discription</p>
                            <p>purchase product ZACH KING SNAPBACK HAT x1</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>
          )}
        </div>
      </div>

      <Featuredboys />
    </div>
  )
}

export default WalletTransactionsPage;