"use client";
import { useState } from "react";
import Featuredboys from '../Featuredboys';
import CustomSelect from '../CustomSelect';

const SubscriptionsPage = () => {
  const [time, setTime] = useState("all");
  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
        <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers" data-scroll-zero data-multiple-tabs-section data-identifier="1">
          <div className="moneyboy-feed-page-cate-buttons card" id="posts-tabs-btn-card">
            <button className="page-content-type-button active-down-effect active">Moneyboys</button>
            <button className="page-content-type-button active-down-effect"> Saved Media</button>
          </div>
            <div className="tabs-content-wrapper-layout">
              <div data-multi-dem-cards-layout>
                <div className="creator-content-filter-grid-container">
                  <div className="card filters-card-wrapper">
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

                        <input type="text" placeholder="Enter keyword here" />
                      </div>
                    </div>

                    <div className="creater-content-filters-layouts">
                      <div className="creator-content-select-filter">
                      <CustomSelect
                        label="All Time"
                        value={time}
                        onChange={(val) => {setTime(val); console.log("Selected:", val);}}
                        className="bg-white p-sm size-sm"
                        options={[
                          { label: "All Time", value: "all" },
                          { label: "Today", value: "today" },
                          { label: "Last 7 Days", value: "7days" },
                          { label: "Last 30 Days", value: "30days" },
                        ]}
                      />
                        <div className="custom-select-element bg-white p-sm size-sm">
                          <div
                            className="custom-select-label-wrapper"
                            data-custom-select-triger
                          >
                            <div className="custom-select-icon-txt">
                              <span className="custom-select-label-txt">All Time</span>
                            </div>
                            <div className="custom-select-chevron">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                              >
                                <path
                                  d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95"
                                  stroke="none"
                                  strokeWidth="1.5"
                                  strokeMiterlimit="10"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>

                          <div
                            className="custom-select-options-dropdown-wrapper"
                            data-custom-select-dropdown
                            style={{
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              overflow: "hidden",
                              display: "none",
                              opacity: 0,
                              transform: "translate(0px, -10px)",
                              height: "0px",
                            }}
                          >
                            <div className="custom-select-options-dropdown-container">
                              <div className="custom-select-options-lists-container">
                                <ul
                                  className="custom-select-options-list"
                                  data-custom-select-options-list
                                >
                                  <li className="custom-select-option">
                                    <span> Option 1</span>
                                  </li>
                                  <li className="custom-select-option">
                                    <span> Option 2</span>
                                  </li>
                                  <li className="custom-select-option">
                                    <span> Option 3</span>
                                  </li>
                                  <li className="custom-select-option">
                                    <span> Option 4</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
