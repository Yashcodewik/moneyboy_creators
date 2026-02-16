"use client";
import { useEffect, useState } from "react";
import Featuredboys from "../Featuredboys";
import CustomSelect from "../CustomSelect";
import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";
import {
  API_BLOCK_USER,
  API_GET_BLOCKED_USERS,
  API_GET_CONNECTIONS,
} from "@/utils/api/APIConstant";
import ShowToast from "../common/ShowToast";

const BlacklistPage = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connections, setConnections] = useState<any[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reason, setReason] = useState("");
  useEffect(() => {
    if (isModalOpen) {
      fetchConnections();
    }
  }, [isModalOpen]);

  const fetchConnections = async () => {
    const res = await getApiWithOutQuery({
      url: API_GET_CONNECTIONS,
    });

    if (res?.success) {
      setConnections(res.data || []);
    } else {
      ShowToast(res?.message || "Failed to load users", "error");
    }
  };

  const connectionOptions = connections.map((user: any) => ({
    label: `${user.userName} `,
    // (@${user.displayName})
    value: user._id,
  }));

  const handleBlockUser = async () => {
    if (!selectedUser) {
      ShowToast("Please select a user", "error");
      return;
    }

    const res = await apiPost({
      url: API_BLOCK_USER,
      values: {
        blockedId: selectedUser,
        reason,
      },
    });

    if (res?.success) {
      ShowToast(res.message, "success");

      setIsModalOpen(false);
      setSelectedUser(null);
      setReason("");

      fetchBlockedUsers(); // refresh list
    } else {
      ShowToast(res?.message || "Action failed", "error");
    }
  };

  const fetchBlockedUsers = async () => {
    const res = await getApiWithOutQuery({
      url: API_GET_BLOCKED_USERS,
    });

    if (res?.success) {
      setBlockedUsers(res.data || []);
    } else {
      ShowToast("Failed to load blocked users", "error");
    }
  };
  useEffect(() => {
    fetchBlockedUsers();
  }, []);

  const handleUnblockUser = async (blockedId: string) => {
    const res = await apiPost({
      url: API_BLOCK_USER,
      values: { blockedId },
    });

    if (res?.success) {
      ShowToast(res.message, "success");
      fetchBlockedUsers();
    }
  };

  return (
    <>
      <div className="moneyboy-2x-1x-layout-container">
        <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
          <div
            className="moneyboy-feed-page-container moneyboy-diff-content-wrappers"
            data-scroll-zero
            data-multiple-tabs-section
            data-identifier="1"
          >
            <div
              className="moneyboy-feed-page-cate-buttons card"
              id="posts-tabs-btn-card"
            >
              <button
                className="cate-back-btn active-down-effect"
                onClick={() => router.push("/feed")}
              >
                <span className="icons arrowLeft hwhite"></span>
              </button>
              <button className="page-content-type-button active-down-effect active max-w-50">
                Blacklist
              </button>
            </div>
            <div className="tabs-content-wrapper-layout">
              <div data-multi-dem-cards-layout>
                <div className="creator-content-filter-grid-container">
                  <div className="card filters-card-wrapper">
                    <button
                      className="btn-txt-gradient btn-outline link-gradint rounded"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <span>Want to block someone, click here !</span>
                    </button>
                    <div className="creator-content-cards-wrapper wtransactions_containt">
                      {/* ✅ Dynamic Blocked Users */}
                      {blockedUsers.length === 0 ? (
                        <p className="nodeta">No blocked users</p>
                      ) : (
                        blockedUsers.map((user) => {
                          const date = new Date(user.blockedAt);

                          return (
                            <div className="rel-users-wrapper" key={user._id}>
                              <div className="rel-user-box blacklist_box">
                                <div className="rel-user-profile-action">
                                  <div className="rel-user-profile">
                                    <div className="profile-card">
                                      <Link
                                        href="#"
                                        className="profile-card__main"
                                      >
                                        <div className="profile-card__avatar-settings">
                                          <div className="profile-card__avatar">
                                            {user.profile ? (
                                              <img
                                                src={user.profile}
                                                alt="User profile avatar"
                                                onError={(e) => {
                                                  e.currentTarget.style.display =
                                                    "none";
                                                }}
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
                                                    fill="url(#paint0_linear)"
                                                  />
                                                  <defs>
                                                    <linearGradient
                                                      id="paint0_linear"
                                                      x1="0"
                                                      y1="27"
                                                      x2="66"
                                                      y2="27"
                                                      gradientUnits="userSpaceOnUse"
                                                    >
                                                      <stop stopColor="#FDAB0A" />
                                                      <stop
                                                        offset="0.4"
                                                        stopColor="#FECE26"
                                                      />
                                                      <stop
                                                        offset="1"
                                                        stopColor="#FE990B"
                                                      />
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
                                              {user.displayName}
                                            </div>
                                            <div className="profile-card__badge">
                                              <img
                                                src="/images/logo/profile-badge.png"
                                                alt="Verified badge"
                                              />
                                            </div>
                                          </div>
                                          <div className="profile-card__username">
                                            @{user.userName}
                                          </div>
                                        </div>
                                      </Link>
                                    </div>
                                  </div>

                                  <div className="date_box">
                                    <div className="date_wrap">
                                      <svg className="icons calendarNote" />
                                      <div className="containt">
                                        <span>Date</span>
                                        <p>{date.toLocaleDateString()}</p>
                                        <p>{date.toLocaleTimeString()}</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="rel-user-actions">
                                    <button
                                      className="btn-txt-gradient btn-outline"
                                      type="button"
                                      onClick={() =>
                                        handleUnblockUser(user._id)
                                      }
                                    >
                                      <span>Unblock</span>
                                    </button>
                                  </div>
                                </div>

                                <div className="rel-user-desc">
                                  <div>
                                    <p className="heading">Reason</p>
                                    <p>{user.reason}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
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
      {/* ========== Blacklist User Modal Start ========== */}
      {isModalOpen && (
        <div
          className="modal show"
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-modal-title"
        >
          <div className="modal-wrap blacklist">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              <CgClose size={22} />
            </button>
            <h3>Blacklist user</h3>
            <div className="containt_wrap">
              <div className="">
                <label>Please enter the username you want to block</label>
                <CustomSelect
                  label="Select User"
                  searchable={true}
                  options={connectionOptions}
                  onChange={(option: any) => setSelectedUser(option)}
                />
              </div>
              <div className="">
                <label>Reason</label>
                <textarea
                  rows={2}
                  name="reason"
                  placeholder="Enter your reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </div>
            <div className="actions">
              <button className="premium-btn" onClick={handleBlockUser}>
                <span>Submit</span>
              </button>
              <button
                className="cate-back-btn active-down-effect"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlacklistPage;
