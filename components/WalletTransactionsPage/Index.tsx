"use client";
import { useState } from "react";
import Featuredboys from '../Featuredboys';
import CustomSelect from '../CustomSelect';
import Link from "next/link";

const WalletTransactionsPage = () => {
  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
        <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers" data-scroll-zero data-multiple-tabs-section data-identifier="1">
          <div className="moneyboy-feed-page-cate-buttons card" id="posts-tabs-btn-card">
            <button className="page-content-type-button active-down-effect active">Wallet Transactions</button>
            <button className="page-content-type-button active-down-effect"> Order History</button>
            <button className="page-content-type-button active-down-effect"> Payment History</button>
          </div>
          <div className="tabs-content-wrapper-layout">
            <div data-multi-dem-cards-layout>
              <div className="creator-content-filter-grid-container">
                <div className="card filters-card-wrapper">
                  <div className="search-features-grid-btns has-multi-tabs-btns one-row-content-wrapper">
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
                      <input type="text" placeholder="Enter keyword here" />
                    </div>
                  </div>

                  <div className="creater-content-filters-layouts">
                    <div className="creator-content-select-filter">
                      <div className="custom-select-element bg-white p-sm size-sm">
                        <div className="custom-select-label-wrapper">
                          <div className="custom-select-icon-txt">
                            <span className="custom-select-label-txt">All Time</span>
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
                      </div>
                    </div>
                  </div>
                  </div>
                  <div className="creator-content-cards-wrapper wtransactions_containt">
                    <div className="rel-users-wrapper">
                    <div className="history_wrap">
                      <div className="rline">
                        <p>Total Earned</p>
                        <h3>$ 1,598.61</h3>
                      </div>
                      <div className="rline">
                        <p>Withdrew</p>
                        <h3>$ 150.00</h3>
                      </div>
                      <div className="">
                        <p>Wallet Balance</p>
                        <h3>$ 1,429.42</h3>
                      </div>
                    </div>
                    <div className="payout_wrap">
                      <h3>Get a payout</h3>
                      <button className="btn-txt-gradient" type="button"><span>Request payout</span> </button>
                    </div>
                    <div className="payout_wrap">
                      <div>
                        <p>Current Balance</p>
                        <h3>$ 1,598.61</h3>
                      </div>
                      <button className="btn-txt-gradient" type="button"><span>Add Funds</span> </button>
                    </div>
                    <div className="rel-user-box">
                      <div className="rel-user-profile-action">
                        <div className="rel-user-profile">
                          <div className="profile-card">
                            <Link href="#" className="profile-card__main">
                              <div className="profile-card__avatar-settings">
                                <div className="profile-card__avatar">
                                  <img src="/images/profile-avatars/profile-avatar-6.jpg" alt="User profile avatar" />
                                </div>
                              </div>
                              <div className="profile-card__info">
                                <div className="profile-card__username tphead">From</div>
                                <div className="profile-card__name-badge">
                                  <div className="profile-card__name">Zain Schleifer</div>
                                  <div className="profile-card__badge"><img src="/images/logo/profile-badge.png" alt="Verified badge" /></div>
                                </div>
                                <div className="profile-card__username">cae38e45 <span className="badge success">Success</span></div>
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="date_box">
                          <div className="date_wrap">
                            <svg className="icons currency"/>
                            <div className="containt">
                              <span>Amount</span>
                              <p className="text-green">Apr 25, 2025</p>
                            </div>
                          </div>
                          <div className="date_wrap">
                            <svg className="icons noteDocument"/>
                            <div className="containt">
                              <span>Type</span>
                              <p>Streaming Tip</p>
                            </div>
                          </div>
                          <div className="date_wrap">
                            <svg className="icons calendarNote"/>
                            <div className="containt">
                              <span>Date</span>
                              <p>30/09/2025</p>
                              <p>19:06:28</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rel-user-desc">
                        <div className="">
                          <p className="heading">Discription</p>
                          <p>A jazzy Lofi/neo soul-esque guitar part as shown in my video.</p>
                        </div>
                        <div className="rel-user-actions">
                          <button className="btn-txt-gradient" type="button"><span>View</span> </button>
                        </div>
                      </div>
                    </div>
                    <div className="rel-user-box">
                      <div className="rel-user-profile-action">
                        <div className="rel-user-profile">
                          <div className="profile-card">
                            <Link href="#" className="profile-card__main">
                              <div className="profile-card__avatar-settings">
                                <div className="profile-card__avatar">
                                  <img src="/images/profile-avatars/profile-avatar-5.jpg" alt="User profile avatar" />
                                </div>
                              </div>
                              <div className="profile-card__info">
                                <div className="profile-card__username tphead">From</div>
                                <div className="profile-card__name-badge">
                                  <div className="profile-card__name">Gustavo Stanton</div>
                                  <div className="profile-card__badge"><img src="/images/logo/profile-badge.png" alt="Verified badge" /></div>
                                </div>
                                <div className="profile-card__username">cae388e1 <span className="badge success">Success</span></div>
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="date_box">
                          <div className="date_wrap">
                            <svg className="icons currency"/>
                            <div className="containt">
                              <span>Amount</span>
                              <p className="text-green">$100</p>
                            </div>
                          </div>
                          <div className="date_wrap">
                            <svg className="icons noteDocument"/>
                            <div className="containt">
                              <span>Type</span>
                              <p>Creator Tip</p>
                            </div>
                          </div>
                          <div className="date_wrap">
                            <svg className="icons calendarNote"/>
                            <div className="containt">
                              <span>Date</span>
                              <p>30/09/2025</p>
                              <p>19:06:28</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rel-user-desc">
                        <div className="">
                          <p className="heading">Discription</p>
                          <p>purchase product ZACH KING SNAPBACK HAT x1</p>
                        </div>
                        <div className="rel-user-actions">
                          <button className="btn-txt-gradient" type="button"><span>View</span> </button>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ===================================== */}
          {/* ========== Payment History ========== */}
          {/* ===================================== */}
          <div className="moneyboy-feed-page-cate-buttons card" id="posts-tabs-btn-card">
            {/* Back Button */}
            <button className="cate-back-btn active-down-effect" type="button" aria-label="Go back">
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

                      {/* <div className="rel-user-box">
                        <div className="rel-user-profile-action">
                          <div className="rel-user-profile">
                            <div className="profile-card">
                              <Link href="#" className="profile-card__main">
                                <div className="profile-card__avatar-settings">
                                  <div className="profile-card__avatar">
                                    <img src="/images/profile-avatars/profile-avatar-5.jpg" alt="User profile avatar" />
                                  </div>
                                </div>
                                <div className="profile-card__info">
                                  <div className="profile-card__username tphead">From</div>
                                  <div className="profile-card__name-badge">
                                    <div className="profile-card__name">Gustavo Stanton</div>
                                    <div className="profile-card__badge"><img src="/images/logo/profile-badge.png" alt="Verified badge" /></div>
                                  </div>
                                  <div className="profile-card__username">cae388e1 <span className="badge success">Success</span></div>
                                </div>
                              </Link>
                            </div>
                          </div>
                          <div className="date_box">
                            <div className="date_wrap">
                              <svg className="icons currency"/>
                              <div className="containt">
                                <span>Amount</span>
                                <p className="text-green">$100</p>
                              </div>
                            </div>
                            <div className="date_wrap">
                              <svg className="icons noteDocument"/>
                              <div className="containt">
                                <span>Type</span>
                                <p>Creator Tip</p>
                              </div>
                            </div>
                            <div className="date_wrap">
                              <svg className="icons calendarNote"/>
                              <div className="containt">
                                <span>Date</span>
                                <p>30/09/2025</p>
                                <p>19:06:28</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rel-user-desc">
                          <div className="">
                            <p className="heading">Discription</p>
                            <p>purchase product ZACH KING SNAPBACK HAT x1</p>
                          </div>
                          <div className="rel-user-actions">
                            <button className="btn-txt-gradient" type="button"><span>View</span> </button>
                          </div>
                        </div>
                      </div> */}
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

export default WalletTransactionsPage;
