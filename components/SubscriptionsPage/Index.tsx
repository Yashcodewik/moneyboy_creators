"use client";
import { useState, useEffect } from "react";
import Featuredboys from '../Featuredboys';
import CustomSelect from '../CustomSelect';
import Link from "next/link";
import { useDecryptedSession } from "@/libs/useDecryptedSession";
import { useSearchParams } from "next/navigation";

const SubscriptionsPage = () => {
  const [time, setTime] = useState("all");
  const [activeTab, setActiveTab] = useState("subscribers"); // "subscribers" or "subscriptions"
  const { session } = useDecryptedSession();
  const isCreator = session?.isAuthenticated && session?.user?.role === 2;
  const searchParams = useSearchParams(); // Add this line

  // Replace your existing useEffect with this:
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    
    if (tabFromUrl === 'subscriptions') {
      setActiveTab("subscriptions");
    } else if (tabFromUrl === 'subscribers') {
      setActiveTab("subscribers");
    } else {
      // Default based on user role
      if (!isCreator) {
        setActiveTab("subscriptions");
      } else {
        setActiveTab("subscribers");
      }
    }
  }, [searchParams, isCreator]);

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
                  className={`page-content-type-button active-down-effect max-50 ${activeTab === "subscribers" ? "active" : ""}`}
                  onClick={() => setActiveTab("subscribers")}
                >
                  Subscribers
                </button>
                <button
                  className={`page-content-type-button active-down-effect max-50 ${activeTab === "subscriptions" ? "active" : ""}`}
                  onClick={() => setActiveTab("subscriptions")}
                >
                  Subscriptions
                </button>
              </>
            ) : (
              <button
                className="page-content-type-button active-down-effect max-50 active"
              >
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
                        <input type="text" placeholder="Enter keyword here" />
                      </div>
                    </div>

                    <div className="creater-content-filters-layouts">
                      <div className="creator-content-select-filter group_select">
                        <div className="custom-select-element bg-white p-sm size-sm">
                          <div className="custom-select-label-wrapper">
                            <div className="custom-select-icon-txt">
                              <span className="custom-select-label-txt">All Status</span>
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
                        <div className="custom-select-element bg-white p-sm size-sm">
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
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tab Content */}
                  <div className="creator-content-cards-wrapper subscriptions_containt">
                    {activeTab === "subscribers" && (
                      <div className="rel-users-wrapper">
                        <div className="user-subbox">
                          <div className="rel-user-profile">
                            <div className="profile-card">
                              <Link href="#" className="profile-card__main">
                                <div className="profile-card__avatar-settings">
                                  <div className="profile-card__avatar">
                                    <img src="images/profile-avatars/profile-avatar-6.jpg" alt="MoneyBoy Social Profile Avatar" />
                                  </div>
                                </div>
                                <div className="profile-card__info">
                                  <div className="profile-card__name-badge">
                                    <div className="profile-card__name">Zain Schleifer</div>
                                    <div className="profile-card__badge">
                                      <img src="/images/logo/profile-badge.png" alt="MoneyBoy Social Profile Badge" />
                                    </div>
                                  </div>
                                  <div className="profile-card__username">
                                    <ul>
                                      <li className="yrly">Yearly</li>
                                      {/* <li className="stip">Stipe</li> */}
                                      <li className="active">Active</li>
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
                                <p>Apr 25, 2025</p>
                              </div>
                            </div>
                            <div className="date_wrap">
                              <svg className="icons calendarNote"/>
                              <div className="containt">
                                <span>Start Date</span>
                                <p>Apr 25, 2025</p>
                              </div>
                            </div>
                          </div>
                          <div className="rel-user-action-btn">
                            <button className="btn-txt-gradient"><span>Message</span></button>
                          </div>
                        </div>
                        <div className="user-subbox">
                          <div className="rel-user-profile">
                            <div className="profile-card">
                              <Link href="#" className="profile-card__main">
                                <div className="profile-card__avatar-settings">
                                  <div className="profile-card__avatar">
                                    <img src="/images/profile-avatars/profile-avatar-5.jpg" alt="MoneyBoy Social Profile Avatar" />
                                  </div>
                                </div>
                                <div className="profile-card__info">
                                  <div className="profile-card__name-badge">
                                    <div className="profile-card__name">Gustavo Stanton</div>
                                    <div className="profile-card__badge">
                                      <img src="/images/logo/profile-badge.png" alt="MoneyBoy Social Profile Badge" />
                                    </div>
                                  </div>
                                  <div className="profile-card__username">
                                    <ul>
                                      <li className="yrly">Yearly</li>
                                      {/* <li className="cbill">CCbill</li> */}
                                      <li className="active">Active</li>
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
                                <p>Apr 25, 2025</p>
                              </div>
                            </div>
                            <div className="date_wrap">
                              <svg className="icons calendarNote"/>
                              <div className="containt">
                                <span>Start Date</span>
                                <p>Apr 25, 2025</p>
                              </div>
                            </div>
                          </div>
                          <div className="rel-user-action-btn">
                            <button className="btn-txt-gradient"><span>Message</span></button>
                          </div>
                        </div>
                        <div className="user-subbox">
                          <div className="rel-user-profile">
                            <div className="profile-card">
                              <Link href="#" className="profile-card__main">
                                <div className="profile-card__avatar-settings">
                                  <div className="profile-card__avatar">
                                    <img src="/images/profile-avatars/profile-avatar-3.jpg" alt="MoneyBoy Social Profile Avatar" />
                                  </div>
                                </div>
                                <div className="profile-card__info">
                                  <div className="profile-card__name-badge">
                                    <div className="profile-card__name">Emerson Bator</div>
                                    <div className="profile-card__badge">
                                      <img src="/images/logo/profile-badge.png" alt="MoneyBoy Social Profile Badge" />
                                    </div>
                                  </div>
                                  <div className="profile-card__username">
                                    <ul>
                                      <li className="yrly">Yearly</li>
                                      {/* <li className="stip">Stipe</li> */}
                                      <li className="active">Active</li>
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
                                <p>Apr 25, 2025</p>
                              </div>
                            </div>
                            <div className="date_wrap">
                              <svg className="icons calendarNote"/>
                              <div className="containt">
                                <span>Start Date</span>
                                <p>Apr 25, 2025</p>
                              </div>
                            </div>
                          </div>
                          <div className="rel-user-action-btn">
                            <button className="btn-txt-gradient"><span>Message</span></button>
                          </div>
                        </div>
                        <div className="user-subbox">
                          <div className="rel-user-profile">
                            <div className="profile-card">
                              <Link href="#" className="profile-card__main">
                                <div className="profile-card__avatar-settings">
                                  <div className="profile-card__avatar">
                                    <img src="/images/profile-avatars/profile-avatar-7.jpg" alt="MoneyBoy Social Profile Avatar" />
                                  </div>
                                </div>
                                <div className="profile-card__info">
                                  <div className="profile-card__name-badge">
                                    <div className="profile-card__name">Omar Dokidis</div>
                                    <div className="profile-card__badge">
                                      <img src="/images/logo/profile-badge.png" alt="MoneyBoy Social Profile Badge" />
                                    </div>
                                  </div>
                                  <div className="profile-card__username">
                                    <ul>
                                      <li className="yrly">Yearly</li>
                                      {/* <li className="stip">Stipe</li> */}
                                      <li className="saspnd">Suspended</li>
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
                                <p>Apr 25, 2025</p>
                              </div>
                            </div>
                            <div className="date_wrap">
                              <svg className="icons calendarNote"/>
                              <div className="containt">
                                <span>Start Date</span>
                                <p>Apr 25, 2025</p>
                              </div>
                            </div>
                          </div>
                          <div className="rel-user-action-btn">
                            <button className="btn-txt-gradient"><span>Message</span></button>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "subscriptions" && (
                      <div className="rel-users-wrapper">
                        <div className="user-subbox">
                          <div className="rel-user-profile">
                            <div className="profile-card">
                              <Link href="#" className="profile-card__main">
                                <div className="profile-card__avatar-settings">
                                  <div className="profile-card__avatar">
                                    <img src="images/profile-avatars/profile-avatar-6.jpg" alt="MoneyBoy Social Profile Avatar" />
                                  </div>
                                </div>
                                <div className="profile-card__info">
                                  <div className="profile-card__name-badge">
                                    <div className="profile-card__name">Zain Schleifer</div>
                                    <div className="profile-card__badge">
                                      <img src="/images/logo/profile-badge.png" alt="MoneyBoy Social Profile Badge" />
                                    </div>
                                  </div>
                                  <div className="profile-card__username">
                                    <ul>
                                      <li className="yrly">Yearly</li>
                                      <li className="stip">Stipe</li>
                                      <li className="active">Active</li>
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
                                <p>Apr 25, 2025</p>
                              </div>
                            </div>
                            <div className="date_wrap">
                              <svg className="icons calendarNote"/>
                              <div className="containt">
                                <span>Start Date</span>
                                <p>Apr 25, 2025</p>
                              </div>
                            </div>
                          </div>
                          <div className="rel-user-action-btn">
                            <button className="btn-txt-gradient"><span>Cancel</span></button>
                          </div>
                        </div>
                        <div className="user-subbox">
                          <div className="rel-user-profile">
                            <div className="profile-card">
                              <Link href="#" className="profile-card__main">
                                <div className="profile-card__avatar-settings">
                                  <div className="profile-card__avatar">
                                    <img src="/images/profile-avatars/profile-avatar-5.jpg" alt="MoneyBoy Social Profile Avatar" />
                                  </div>
                                </div>
                                <div className="profile-card__info">
                                  <div className="profile-card__name-badge">
                                    <div className="profile-card__name">Gustavo Stanton</div>
                                    <div className="profile-card__badge">
                                      <img src="/images/logo/profile-badge.png" alt="MoneyBoy Social Profile Badge" />
                                    </div>
                                  </div>
                                  <div className="profile-card__username">
                                    <ul>
                                      <li className="yrly">Yearly</li>
                                      <li className="cbill">CCbill</li>
                                      <li className="active">Active</li>
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
                                <p>Apr 25, 2025</p>
                              </div>
                            </div>
                            <div className="date_wrap">
                              <svg className="icons calendarNote"/>
                              <div className="containt">
                                <span>Start Date</span>
                                <p>Apr 25, 2025</p>
                              </div>
                            </div>
                          </div>
                          <div className="rel-user-action-btn">
                            <button className="btn-txt-gradient"><span>Cancel</span></button>
                          </div>
                        </div>
                        <div className="user-subbox">
                          <div className="rel-user-profile">
                            <div className="profile-card">
                              <Link href="#" className="profile-card__main">
                                <div className="profile-card__avatar-settings">
                                  <div className="profile-card__avatar">
                                    <img src="/images/profile-avatars/profile-avatar-3.jpg" alt="MoneyBoy Social Profile Avatar" />
                                  </div>
                                </div>
                                <div className="profile-card__info">
                                  <div className="profile-card__name-badge">
                                    <div className="profile-card__name">Emerson Bator</div>
                                    <div className="profile-card__badge">
                                      <img src="/images/logo/profile-badge.png" alt="MoneyBoy Social Profile Badge" />
                                    </div>
                                  </div>
                                  <div className="profile-card__username">
                                    <ul>
                                      <li className="yrly">Yearly</li>
                                      <li className="stip">Stipe</li>
                                      <li className="active">Active</li>
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
                                <p>Apr 25, 2025</p>
                              </div>
                            </div>
                            <div className="date_wrap">
                              <svg className="icons calendarNote"/>
                              <div className="containt">
                                <span>Start Date</span>
                                <p>Apr 25, 2025</p>
                              </div>
                            </div>
                          </div>
                          <div className="rel-user-action-btn">
                            <button className="btn-txt-gradient"><span>Cancel</span></button>
                          </div>
                        </div>
                        <div className="user-subbox">
                          <div className="rel-user-profile">
                            <div className="profile-card">
                              <Link href="#" className="profile-card__main">
                                <div className="profile-card__avatar-settings">
                                  <div className="profile-card__avatar">
                                    <img src="/images/profile-avatars/profile-avatar-7.jpg" alt="MoneyBoy Social Profile Avatar" />
                                  </div>
                                </div>
                                <div className="profile-card__info">
                                  <div className="profile-card__name-badge">
                                    <div className="profile-card__name">Omar Dokidis</div>
                                    <div className="profile-card__badge">
                                      <img src="/images/logo/profile-badge.png" alt="MoneyBoy Social Profile Badge" />
                                    </div>
                                  </div>
                                  <div className="profile-card__username">
                                    <ul>
                                      <li className="yrly">Yearly</li>
                                      <li className="stip">Stipe</li>
                                      <li className="saspnd">Suspended</li>
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
                                <p>Apr 25, 2025</p>
                              </div>
                            </div>
                            <div className="date_wrap">
                              <svg className="icons calendarNote"/>
                              <div className="containt">
                                <span>Start Date</span>
                                <p>Apr 25, 2025</p>
                              </div>
                            </div>
                          </div>
                          <div className="rel-user-action-btn">
                            <button className="btn-txt-gradient"><span>Activate</span></button>
                          </div>
                        </div>
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
