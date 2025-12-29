"use client";

import React, { useState } from "react";

const PurchasedMediaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"videos" | "photos" | "others">(
    "videos"
  );

  // helper to add data__active only when needed
  const activeAttr = (cond: boolean) => (cond ? { "data__active": "" } : {});

  return (
    <div className="moneyboy-page-content-container">
      <main className="moneyboy-dynamic-content-layout">
        <div className="moneyboy-2x-1x-layout-container">
          <div className="moneyboy-2x-1x-a-layout">
            <h1>Need Design Approval to Continue Development</h1>

            {/* main purchased media wrapper */}
            <div
              className="moneyboy-feed-page-container moneyboy-diff-content-wrappers"
              data-multiple-tabs-section="true"
              data-identifier="1"
              {...activeAttr(true)} // this section is active
            >
              <div
                className="moneyboy-feed-page-cate-buttons card"
                id="posts-tabs-btn-card"
              >
                <button
                  className="page-content-type-button active-down-effect"
                  data-multi-tabs-switch-btn="true"
                  data-identifier="1"
                  style={{ maxWidth: "300px" }}
                  {...activeAttr(true)}
                >
                  Purchased Media
                </button>
              </div>

              {/* content of purchased media */}
              <div
                data-multi-tabs-content-tab="true"
                data-identifier="1"
                {...activeAttr(true)}
              >
                <div className="filters-card-layout-wrapper">
                  <div className="tabs-content-wrapper-layout">
                    <div data-multi-dem-cards-layout="true">
                      <div
                        className="creator-content-filter-grid-container"
                        data-multiple-tabs-section="true"
                      >
                        <div className="card search-features-grid-btns has-multi-tabs-btns">
                          {/* search input */}
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
                              <input type="text" placeholder="Enter keyword here" />
                            </div>
                          </div>

                          {/* top tabs (Videos / Photos / Others) */}
                          <div className="creator-content-tabs-btn-wrapper">
                            <div className="multi-tabs-action-buttons">
                              <button
                                className={`multi-tab-switch-btn videos-btn ${
                                  activeTab === "videos" ? "active" : ""
                                }`}
                                data-multi-tabs-switch-btn="true"
                                {...activeAttr(activeTab === "videos")}
                                onClick={() => setActiveTab("videos")}
                              >
                                {/* icon kept same */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="25"
                                  viewBox="0 0 24 25"
                                  fill="none"
                                >
                                  <path
                                    d="M12.53 20.92H6.21C3.05 20.92 2 18.82 2 16.71V8.29002C2 5.13002 3.05 4.08002 6.21 4.08002H12.53C15.69 4.08002 16.74 5.13002 16.74 8.29002V16.71C16.74 19.87 15.68 20.92 12.53 20.92Z"
                                    stroke="none"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M19.5202 17.6L16.7402 15.65V9.34001L19.5202 7.39001C20.8802 6.44001 22.0002 7.02001 22.0002 8.69001V16.31C22.0002 17.98 20.8802 18.56 19.5202 17.6Z"
                                    stroke="none"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M11.5 11.5C12.3284 11.5 13 10.8284 13 10C13 9.17157 12.3284 8.5 11.5 8.5C10.6716 8.5 10 9.17157 10 10C10 10.8284 10.6716 11.5 11.5 11.5Z"
                                    stroke="none"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span>Videos</span>
                              </button>

                              <button
                                className={`multi-tab-switch-btn photos-btn ${
                                  activeTab === "photos" ? "active" : ""
                                }`}
                                data-multi-tabs-switch-btn="true"
                                {...activeAttr(activeTab === "photos")}
                                onClick={() => setActiveTab("photos")}
                              >
                                {/* icon kept same */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25"
                                  height="25"
                                  viewBox="0 0 25 25"
                                  fill="none"
                                >
                                  <path
                                    d="M9.5 22.5H15.5C20.5 22.5 22.5 20.5 22.5 15.5V9.5C22.5 4.5 20.5 2.5 15.5 2.5H9.5C4.5 2.5 2.5 4.5 2.5 9.5V15.5C2.5 20.5 4.5 22.5 9.5 22.5Z"
                                    stroke="none"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M9.5 10.5C10.6046 10.5 11.5 9.60457 11.5 8.5C11.5 7.39543 10.6046 6.5 9.5 6.5C8.39543 6.5 7.5 7.39543 7.5 8.5C7.5 9.60457 8.39543 10.5 9.5 10.5Z"
                                    stroke="none"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3.16992 19.45L8.09992 16.14C8.88992 15.61 10.0299 15.67 10.7399 16.28L11.0699 16.57C11.8499 17.24 13.1099 17.24 13.8899 16.57L18.0499 13C18.8299 12.33 20.0899 12.33 20.8699 13L22.4999 14.4"
                                    stroke="none"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span>Photos</span>
                              </button>

                              <button
                                className={`multi-tab-switch-btn photos-btn ${
                                  activeTab === "others" ? "active" : ""
                                }`}
                                data-multi-tabs-switch-btn="true"
                                {...activeAttr(activeTab === "others")}
                                onClick={() => setActiveTab("others")}
                              >
                                {/* icon kept same */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25"
                                  height="25"
                                  viewBox="0 0 25 25"
                                  fill="none"
                                >
                                  <path
                                    d="M9.5 22.5H15.5C20.5 22.5 22.5 20.5 22.5 15.5V9.5C22.5 4.5 20.5 2.5 15.5 2.5H9.5C4.5 2.5 2.5 4.5 2.5 9.5V15.5C2.5 20.5 4.5 22.5 9.5 22.5Z"
                                    stroke="none"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M9.5 10.5C10.6046 10.5 11.5 9.60457 11.5 8.5C11.5 7.39543 10.6046 6.5 9.5 6.5C8.39543 6.5 7.5 7.39543 7.5 8.5C7.5 9.60457 8.39543 10.5 9.5 10.5Z"
                                    stroke="none"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3.16992 19.45L8.09992 16.14C8.88992 15.61 10.0299 15.67 10.7399 16.28L11.0699 16.57C11.8499 17.24 13.1099 17.24 13.8899 16.57L18.0499 13C18.8299 12.33 20.0899 12.33 20.8699 13L22.4999 14.4"
                                    stroke="none"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span>Others</span>
                              </button>
                            </div>
                          </div>

                          {/* you can paste your bottom select + grid toggle here */}
                        </div>

                        {/* TAB CONTENT */}
                        <div
                          className="creator-content-cards-wrapper multi-dem-cards-wrapper-layout"
                          data-multi-child-grid-layout-wishlist="true"
                        >
                          {activeTab === "videos" && (
                            <div
                              className="creator-content-type-container-wrapper"
                              data-multi-tabs-content-tab="true"
                              {...activeAttr(true)}
                            >
                              <h1>Videos Tab</h1>
                            </div>
                          )}

                          {activeTab === "photos" && (
                            <div
                              className="creator-content-type-container-wrapper"
                              data-multi-tabs-content-tab="true"
                              {...activeAttr(true)}
                            >
                              <h1>Photos Tab</h1>
                            </div>
                          )}

                          {activeTab === "others" && (
                            <div
                              className="creator-content-type-container-wrapper"
                              data-multi-tabs-content-tab="true"
                              {...activeAttr(true)}
                            >
                              <h1>Other Content Tab</h1>
                            </div>
                          )}
                        </div>
                        {/* END TAB CONTENT */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end purchased media content */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PurchasedMediaPage;
