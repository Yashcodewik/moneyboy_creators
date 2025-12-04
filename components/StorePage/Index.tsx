import React from 'react'

const StorePage = () => {
  return (
    <div className="moneyboy-page-content-container">
          <main className="moneyboy-dynamic-content-layout">
            <div className="moneyboy-2x-1x-layout-container">
             
              <div className="moneyboy-2x-1x-a-layout">
                <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers">
                
                  <div className="moneyboy-feed-page-cate-buttons card store-page-header-wrapper" id="posts-tabs-btn-card">
                    <div className="store-page-header">
                      <div className="store-page-header-bg-img">
                        <img src="/images/element-assets/store-page-header-bg.jpg"
                          alt="Store Header BG Image"/>
                      </div>
                      <button className="cate-back-btn active-down-effect">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M9.57 5.92999L3.5 12L9.57 18.07" stroke="none" stroke-width="2.5"
                            stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                          <path d="M20.4999 12H3.66992" stroke="none" stroke-width="2.5" stroke-miterlimit="10"
                            stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                      </button>
                      <div className="store-page-header-content-wrapper">
                        <div className="store-page-header--profile">
                          <div className="profile-card">
                            <div className="profile-card__main">
                              <div className="profile-card__avatar-settings">
                                <div className="profile-card__avatar">
                                  <img src="/images/profile-avatars/profile-avatar-1.png"
                                    alt="MoneyBoy Social Profile Avatar"/>
                                </div>
                              </div>
                              <div className="profile-card__info">
                                <div className="profile-card__name-badge">
                                  <div className="profile-card__name"> Corey Bergson </div>
                                  <div className="profile-card__badge">
                                    <img src="/images/logo/profile-badge.png"
                                      alt="MoneyBoy Social Profile Badge"/>
                                  </div>
                                </div>
                                <div className="profile-card__username"> @coreybergson </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="store-page-header-tag">
                          <img src="/images/logo/profile-badge.png" alt="Store Button Icon"/>
                          <span>Store</span>
                        </div>
                      </div>
                    </div>
                  </div>




                  <div>
                    <div className="store-page-wrapper">


                      <div className="hero-type-card-wrapper">
                        <div className="hero-type-card-container">
                          <div className="hero-type-card--bg-img">
                            <img src=".//images/profile-banners/profile-banner-10.jpg"
                              alt="Store Banner Image"/>
                          </div>

                          <div className="hero-type-card--content-container">
                            <h2>PPV Request</h2>
                            <h4>Want Something Special?</h4>
                            <div className="hero-type-card--cta-box">
                              <p>
                                Request a custom photo or video directly from this MoneyBoy
                              </p>
                              <div>
                                <button className="btn-txt-gradient btn-outline p-sm">
                                  <span>Request PPV</span>
                                </button>
                              </div>
                            </div>
                            <div className="hero-type-card--desc">
                              <p>
                                Prices very based on your request. You’ll get a quote before payment.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="moneyboy-swiper-wrapper" data-moneyboy-swiper>
                        <div className="moneyboy-swiper-container">

                          <div className="moneyboy-swiper-header">
                            <h3 className="section-heading-label">
                              Featured contents
                            </h3>

                            <div className="moneyboy-swiper-controls">
                              <button className="moneyboy-swiper-control-btn prev-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                  fill="none">
                                  <path
                                    d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75ZM13.7891 7.93848C13.4958 7.64639 13.0209 7.64736 12.7285 7.94043L9.20898 11.4697C8.91713 11.7624 8.91722 12.2366 9.20898 12.5293L12.7285 16.0596C13.021 16.3528 13.4958 16.353 13.7891 16.0605C14.0822 15.7681 14.0834 15.2933 13.791 15L10.7988 11.999L13.791 8.99902C14.0831 8.70569 14.0823 8.23084 13.7891 7.93848Z"
                                    fill="url(#paint0_linear_792_43)" />
                                  <defs>
                                    <linearGradient id="paint0_linear_792_43" x1="21.4759" y1="1.25" x2="-7.14787"
                                      y2="8.22874" gradientUnits="userSpaceOnUse">
                                      <stop stop-color="#FECE26" />
                                      <stop offset="1" stop-color="#E5741F" />
                                    </linearGradient>
                                  </defs>
                                </svg>
                              </button>
                              <button className="moneyboy-swiper-control-btn next-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                  fill="none">
                                  <path
                                    d="M12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM10.2109 7.93848C10.5042 7.64639 10.9791 7.64736 11.2715 7.94043L14.791 11.4697C15.0829 11.7624 15.0828 12.2366 14.791 12.5293L11.2715 16.0596C10.979 16.3528 10.5042 16.353 10.2109 16.0605C9.91775 15.7681 9.91656 15.2933 10.209 15L13.2012 11.999L10.209 8.99902C9.91685 8.70569 9.91774 8.23084 10.2109 7.93848Z"
                                    fill="url(#paint0_linear_792_51)" />
                                  <defs>
                                    <linearGradient id="paint0_linear_792_51" x1="2.52411" y1="1.25" x2="31.1479"
                                      y2="8.22874" gradientUnits="userSpaceOnUse">
                                      <stop stop-color="#FECE26" />
                                      <stop offset="1" stop-color="#E5741F" />
                                    </linearGradient>
                                  </defs>
                                </svg>
                              </button>
                            </div>
                          </div>

                          <div className="moneyboy-swiper-cards-wrapper">
                            <div className="swiper" data-swiper-slides>
                              <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                  <div className="featured-content-premium-card">
                                    <div className="featured-content-premium-card-container">

                                      <div className="featured-content-bg-img">
                                        <img src="/images/profile-avatars/profile-avatar-21.jpg"
                                          alt="Featured Content BG Image"/>
                                      </div>

                                      <div className="featured-premium-card-content-container">
                                        <div className="featured-premium-card-content">
                                          <div className="featured-premium-card-icons">

                                            <div className="featured-premium-card-icon wishlist-icon">
                                              <svg className="wishlist-icon" xmlns="http://www.w3.org/2000/svg" width="32"
                                                height="32" viewBox="0 0 32 32" fill="none">
                                                <path
                                                  d="M22.4266 2.66669H9.57327C6.73327 2.66669 4.42661 4.98669 4.42661 7.81335V26.6C4.42661 29 6.14661 30.0134 8.25327 28.8534L14.7599 25.24C15.4533 24.8534 16.5733 24.8534 17.2533 25.24L23.7599 28.8534C25.8666 30.0267 27.5866 29.0134 27.5866 26.6V7.81335C27.5733 4.98669 25.2666 2.66669 22.4266 2.66669Z"
                                                  stroke="none" stroke-width="2" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path
                                                  d="M22.4266 2.66669H9.57327C6.73327 2.66669 4.42661 4.98669 4.42661 7.81335V26.6C4.42661 29 6.14661 30.0134 8.25327 28.8534L14.7599 25.24C15.4533 24.8534 16.5733 24.8534 17.2533 25.24L23.7599 28.8534C25.8666 30.0267 27.5866 29.0134 27.5866 26.6V7.81335C27.5733 4.98669 25.2666 2.66669 22.4266 2.66669Z"
                                                  stroke="none" stroke-width="2" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path
                                                  d="M12.3333 12.0667C14.7067 12.9334 17.2933 12.9334 19.6667 12.0667"
                                                  stroke="none" stroke-width="2" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                              </svg>

                                              <span>13</span>
                                            </div>
                                          </div>

                                          <h5>Featured contents</h5>
                                          <p>Today, I experienced the most blissful ride outside. </p>

                                          <a href="#" className="btn-txt-gradient btn-outline">
                                            <svg className="only-fill-hover-effect" xmlns="http://www.w3.org/2000/svg"
                                              width="20" height="20" viewBox="0 0 20 20" fill="none">
                                              <path
                                                d="M10.001 0.916992C12.2126 0.916992 13.7238 1.51554 14.6475 2.66211C15.5427 3.77366 15.751 5.24305 15.751 6.66699V7.66895C16.6879 7.79136 17.4627 8.06745 18.0312 8.63574C18.8947 9.49918 19.0849 10.8389 19.085 12.5V14.166C19.085 15.8272 18.8946 17.1668 18.0312 18.0303C17.1677 18.8935 15.8291 19.083 14.168 19.083H5.83496C4.17365 19.083 2.83421 18.8938 1.9707 18.0303C1.10735 17.1668 0.917969 15.8272 0.917969 14.166V12.5C0.917997 10.8389 1.10726 9.49918 1.9707 8.63574C2.53913 8.06742 3.31408 7.79232 4.25098 7.66992V6.66699C4.25098 5.24305 4.45925 3.77366 5.35449 2.66211C6.27812 1.51554 7.78932 0.916992 10.001 0.916992ZM5.83496 9.08301C4.1632 9.08301 3.4178 9.30991 3.03125 9.69629C2.64478 10.0828 2.418 10.8282 2.41797 12.5V14.166C2.41797 15.8378 2.64487 16.5832 3.03125 16.9697C3.41774 17.3562 4.16293 17.583 5.83496 17.583H14.168C15.8395 17.583 16.5841 17.356 16.9707 16.9697C17.3571 16.5832 17.585 15.8378 17.585 14.166V12.5C17.5849 10.8282 17.3572 10.0828 16.9707 9.69629C16.5841 9.3101 15.8393 9.08301 14.168 9.08301H5.83496ZM10.001 10.5C11.5657 10.5 12.8348 11.7684 12.835 13.333C12.835 14.8978 11.5658 16.167 10.001 16.167C8.43632 16.1668 7.16797 14.8977 7.16797 13.333C7.16814 11.7685 8.43643 10.5002 10.001 10.5ZM10.001 12C9.26486 12.0002 8.66814 12.5969 8.66797 13.333C8.66797 14.0693 9.26475 14.6668 10.001 14.667C10.7374 14.667 11.335 14.0694 11.335 13.333C11.3348 12.5968 10.7372 12 10.001 12ZM10.001 2.41699C8.04601 2.41699 7.05717 2.93971 6.52246 3.60352C5.95984 4.30235 5.75098 5.33302 5.75098 6.66699V7.58398C5.77888 7.58387 5.80687 7.58301 5.83496 7.58301H14.168C14.1957 7.58301 14.2234 7.58388 14.251 7.58398V6.66699C14.251 5.33302 14.0421 4.30235 13.4795 3.60352C12.9448 2.93971 11.9559 2.41699 10.001 2.41699Z"
                                                fill="url(#paint0_linear_745_155)" />
                                              <defs>
                                                <linearGradient id="paint0_linear_745_155" x1="1.99456" y1="0.916991"
                                                  x2="26.1808" y2="6.81415" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#FECE26" />
                                                  <stop offset="1" stop-color="#E5741F" />
                                                </linearGradient>
                                              </defs>
                                            </svg>
                                            <span>$12.00</span>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="swiper-slide">
                                  <div className="featured-content-premium-card">
                                    <div className="featured-content-premium-card-container">

                                      <div className="featured-content-bg-img">
                                        <img src="/images/profile-avatars/profile-avatar-22.jpg"
                                          alt="Featured Content BG Image"/>
                                      </div>

                                      <div className="featured-premium-card-content-container">
                                        <div className="featured-premium-card-content">
                                          <div className="featured-premium-card-icons">

                                            <div className="featured-premium-card-icon wishlist-icon ">
                                              <svg className="wishlist-icon" xmlns="http://www.w3.org/2000/svg" width="32"
                                                height="32" viewBox="0 0 32 32" fill="none">
                                                <path
                                                  d="M22.4266 2.66669H9.57327C6.73327 2.66669 4.42661 4.98669 4.42661 7.81335V26.6C4.42661 29 6.14661 30.0134 8.25327 28.8534L14.7599 25.24C15.4533 24.8534 16.5733 24.8534 17.2533 25.24L23.7599 28.8534C25.8666 30.0267 27.5866 29.0134 27.5866 26.6V7.81335C27.5733 4.98669 25.2666 2.66669 22.4266 2.66669Z"
                                                  stroke="none" stroke-width="2" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path
                                                  d="M22.4266 2.66669H9.57327C6.73327 2.66669 4.42661 4.98669 4.42661 7.81335V26.6C4.42661 29 6.14661 30.0134 8.25327 28.8534L14.7599 25.24C15.4533 24.8534 16.5733 24.8534 17.2533 25.24L23.7599 28.8534C25.8666 30.0267 27.5866 29.0134 27.5866 26.6V7.81335C27.5733 4.98669 25.2666 2.66669 22.4266 2.66669Z"
                                                  stroke="none" stroke-width="2" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path
                                                  d="M12.3333 12.0667C14.7067 12.9334 17.2933 12.9334 19.6667 12.0667"
                                                  stroke="none" stroke-width="2" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                              </svg>

                                              <span>13</span>
                                            </div>
                                          </div>

                                          <h5>Featured contents</h5>
                                          <p>Today, I experienced the most blissful ride outside. </p>

                                          <a href="#" className="btn-txt-gradient btn-outline grey-variant">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                              viewBox="0 0 20 20" fill="none">
                                              <path
                                                d="M13.9173 15.8167H6.08399C5.73399 15.8167 5.34232 15.5417 5.22565 15.2083L1.77565 5.55834C1.28399 4.17501 1.85899 3.75001 3.04232 4.60001L6.29232 6.92501C6.83399 7.30001 7.45065 7.10834 7.68399 6.50001L9.15065 2.59167C9.61732 1.34167 10.3923 1.34167 10.859 2.59167L12.3257 6.50001C12.559 7.10834 13.1757 7.30001 13.709 6.92501L16.759 4.75001C18.059 3.81667 18.684 4.29168 18.1507 5.80001L14.784 15.225C14.659 15.5417 14.2673 15.8167 13.9173 15.8167Z"
                                                stroke="url(#paint0_linear_745_209)" stroke-width="1.5"
                                                stroke-linecap="round" stroke-linejoin="round" />
                                              <path d="M5.41602 18.3333H14.5827" stroke="url(#paint1_linear_745_209)"
                                                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                              <path d="M7.91602 11.6667H12.0827" stroke="url(#paint2_linear_745_209)"
                                                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                              <defs>
                                                <linearGradient id="paint0_linear_745_209" x1="9.9704" y1="1.65417"
                                                  x2="9.9704" y2="15.8167" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#FFCD84" />
                                                  <stop offset="1" stop-color="#FEA10A" />
                                                </linearGradient>
                                                <linearGradient id="paint1_linear_745_209" x1="9.99935" y1="18.3333"
                                                  x2="9.99935" y2="19.3333" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#FFCD84" />
                                                  <stop offset="1" stop-color="#FEA10A" />
                                                </linearGradient>
                                                <linearGradient id="paint2_linear_745_209" x1="9.99935" y1="11.6667"
                                                  x2="9.99935" y2="12.6667" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#FFCD84" />
                                                  <stop offset="1" stop-color="#FEA10A" />
                                                </linearGradient>
                                              </defs>
                                            </svg>
                                            <span>For Subscribers</span>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="swiper-slide">
                                  <div className="featured-content-premium-card">
                                    <div className="featured-content-premium-card-container">

                                      <div className="featured-content-bg-img">
                                        <img src="/images/profile-avatars/profile-avatar-21.jpg"
                                          alt="Featured Content BG Image"/>
                                      </div>

                                      <div className="featured-premium-card-content-container">
                                        <div className="featured-premium-card-content">
                                          <div className="featured-premium-card-icons">

                                            <div className="featured-premium-card-icon wishlist-icon">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                viewBox="0 0 32 32" fill="none">
                                                <path
                                                  d="M22.4266 2.66669H9.57327C6.73327 2.66669 4.42661 4.98669 4.42661 7.81335V26.6C4.42661 29 6.14661 30.0134 8.25327 28.8534L14.7599 25.24C15.4533 24.8534 16.5733 24.8534 17.2533 25.24L23.7599 28.8534C25.8666 30.0267 27.5866 29.0134 27.5866 26.6V7.81335C27.5733 4.98669 25.2666 2.66669 22.4266 2.66669Z"
                                                  stroke="none" stroke-width="2" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path
                                                  d="M22.4266 2.66669H9.57327C6.73327 2.66669 4.42661 4.98669 4.42661 7.81335V26.6C4.42661 29 6.14661 30.0134 8.25327 28.8534L14.7599 25.24C15.4533 24.8534 16.5733 24.8534 17.2533 25.24L23.7599 28.8534C25.8666 30.0267 27.5866 29.0134 27.5866 26.6V7.81335C27.5733 4.98669 25.2666 2.66669 22.4266 2.66669Z"
                                                  stroke="none" stroke-width="2" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path
                                                  d="M12.3333 12.0667C14.7067 12.9334 17.2933 12.9334 19.6667 12.0667"
                                                  stroke="none" stroke-width="2" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                              </svg>

                                              <span>13</span>
                                            </div>
                                          </div>

                                          <h5>Featured contents</h5>
                                          <p>Today, I experienced the most blissful ride outside. </p>

                                          <a href="#" className="btn-txt-gradient btn-outline">
                                            <svg className="only-fill-hover-effect" xmlns="http://www.w3.org/2000/svg"
                                              width="20" height="20" viewBox="0 0 20 20" fill="none">
                                              <path
                                                d="M10.001 0.916992C12.2126 0.916992 13.7238 1.51554 14.6475 2.66211C15.5427 3.77366 15.751 5.24305 15.751 6.66699V7.66895C16.6879 7.79136 17.4627 8.06745 18.0312 8.63574C18.8947 9.49918 19.0849 10.8389 19.085 12.5V14.166C19.085 15.8272 18.8946 17.1668 18.0312 18.0303C17.1677 18.8935 15.8291 19.083 14.168 19.083H5.83496C4.17365 19.083 2.83421 18.8938 1.9707 18.0303C1.10735 17.1668 0.917969 15.8272 0.917969 14.166V12.5C0.917997 10.8389 1.10726 9.49918 1.9707 8.63574C2.53913 8.06742 3.31408 7.79232 4.25098 7.66992V6.66699C4.25098 5.24305 4.45925 3.77366 5.35449 2.66211C6.27812 1.51554 7.78932 0.916992 10.001 0.916992ZM5.83496 9.08301C4.1632 9.08301 3.4178 9.30991 3.03125 9.69629C2.64478 10.0828 2.418 10.8282 2.41797 12.5V14.166C2.41797 15.8378 2.64487 16.5832 3.03125 16.9697C3.41774 17.3562 4.16293 17.583 5.83496 17.583H14.168C15.8395 17.583 16.5841 17.356 16.9707 16.9697C17.3571 16.5832 17.585 15.8378 17.585 14.166V12.5C17.5849 10.8282 17.3572 10.0828 16.9707 9.69629C16.5841 9.3101 15.8393 9.08301 14.168 9.08301H5.83496ZM10.001 10.5C11.5657 10.5 12.8348 11.7684 12.835 13.333C12.835 14.8978 11.5658 16.167 10.001 16.167C8.43632 16.1668 7.16797 14.8977 7.16797 13.333C7.16814 11.7685 8.43643 10.5002 10.001 10.5ZM10.001 12C9.26486 12.0002 8.66814 12.5969 8.66797 13.333C8.66797 14.0693 9.26475 14.6668 10.001 14.667C10.7374 14.667 11.335 14.0694 11.335 13.333C11.3348 12.5968 10.7372 12 10.001 12ZM10.001 2.41699C8.04601 2.41699 7.05717 2.93971 6.52246 3.60352C5.95984 4.30235 5.75098 5.33302 5.75098 6.66699V7.58398C5.77888 7.58387 5.80687 7.58301 5.83496 7.58301H14.168C14.1957 7.58301 14.2234 7.58388 14.251 7.58398V6.66699C14.251 5.33302 14.0421 4.30235 13.4795 3.60352C12.9448 2.93971 11.9559 2.41699 10.001 2.41699Z"
                                                fill="url(#paint0_linear_745_155)" />
                                              <defs>
                                                <linearGradient id="paint0_linear_745_155" x1="1.99456" y1="0.916991"
                                                  x2="26.1808" y2="6.81415" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#FECE26" />
                                                  <stop offset="1" stop-color="#E5741F" />
                                                </linearGradient>
                                              </defs>
                                            </svg>
                                            <span>$12.00</span>
                                          </a>
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

                      <div className="moneyboy-special-content-banner-wrapper card">
                        <div className="moneyboy-special-content-banner-container">
                          <div className="moneyboy-special-content-banner--content">
                            <h2>Get exclusive access</h2>
                            <p>
                              Subscribe to unlock everything from this creator.
                            </p>
                            <a href="#" className="btn-txt-gradient btn-outline">
                              <svg className="only-fill-hover-effect" xmlns="http://www.w3.org/2000/svg" width="20"
                                height="20" viewBox="0 0 20 20" fill="none">
                                <path
                                  d="M10.001 0.916992C12.2126 0.916992 13.7238 1.51554 14.6475 2.66211C15.5427 3.77366 15.751 5.24305 15.751 6.66699V7.66895C16.6879 7.79136 17.4627 8.06745 18.0312 8.63574C18.8947 9.49918 19.0849 10.8389 19.085 12.5V14.166C19.085 15.8272 18.8946 17.1668 18.0312 18.0303C17.1677 18.8935 15.8291 19.083 14.168 19.083H5.83496C4.17365 19.083 2.83421 18.8938 1.9707 18.0303C1.10735 17.1668 0.917969 15.8272 0.917969 14.166V12.5C0.917997 10.8389 1.10726 9.49918 1.9707 8.63574C2.53913 8.06742 3.31408 7.79232 4.25098 7.66992V6.66699C4.25098 5.24305 4.45925 3.77366 5.35449 2.66211C6.27812 1.51554 7.78932 0.916992 10.001 0.916992ZM5.83496 9.08301C4.1632 9.08301 3.4178 9.30991 3.03125 9.69629C2.64478 10.0828 2.418 10.8282 2.41797 12.5V14.166C2.41797 15.8378 2.64487 16.5832 3.03125 16.9697C3.41774 17.3562 4.16293 17.583 5.83496 17.583H14.168C15.8395 17.583 16.5841 17.356 16.9707 16.9697C17.3571 16.5832 17.585 15.8378 17.585 14.166V12.5C17.5849 10.8282 17.3572 10.0828 16.9707 9.69629C16.5841 9.3101 15.8393 9.08301 14.168 9.08301H5.83496ZM10.001 10.5C11.5657 10.5 12.8348 11.7684 12.835 13.333C12.835 14.8978 11.5658 16.167 10.001 16.167C8.43632 16.1668 7.16797 14.8977 7.16797 13.333C7.16814 11.7685 8.43643 10.5002 10.001 10.5ZM10.001 12C9.26486 12.0002 8.66814 12.5969 8.66797 13.333C8.66797 14.0693 9.26475 14.6668 10.001 14.667C10.7374 14.667 11.335 14.0694 11.335 13.333C11.3348 12.5968 10.7372 12 10.001 12ZM10.001 2.41699C8.04601 2.41699 7.05717 2.93971 6.52246 3.60352C5.95984 4.30235 5.75098 5.33302 5.75098 6.66699V7.58398C5.77888 7.58387 5.80687 7.58301 5.83496 7.58301H14.168C14.1957 7.58301 14.2234 7.58388 14.251 7.58398V6.66699C14.251 5.33302 14.0421 4.30235 13.4795 3.60352C12.9448 2.93971 11.9559 2.41699 10.001 2.41699Z"
                                  fill="url(#paint0_linear_745_155)"></path>
                                <defs>
                                  <linearGradient id="paint0_linear_745_155" x1="1.99456" y1="0.916991" x2="26.1808"
                                    y2="6.81415" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#FECE26"></stop>
                                    <stop offset="1" stop-color="#E5741F"></stop>
                                  </linearGradient>
                                </defs>
                              </svg>
                              <span>Subscribe Now</span>
                            </a>
                          </div>
                          <div className="moneyboy-special-content-banner--img-wrapper">
                            <img src="/images/profile-avatars/profile-avatar-23.jpg"
                              alt="Get Exclusive Access Image"/>
                            <div className="text-overlay">
                              <p>
                                Unlock the full experience with a subscription
                              </p>
                            </div>
                          </div>
                        </div>

                      </div>

                      <h3 className="section-heading-label">
                        All Contents
                      </h3>
                      <div>
                        <div className="tabs-content-wrapper-layout">
                          <div data-multi-dem-cards-layout>
                            <div className="creator-content-filter-grid-container" data-multiple-tabs-section>
                              <div className="filters-card-wrapper card">
                                <div className="search-features-grid-btns has-multi-tabs-btns">
                                  <div className="creator-content-search-input">
                                    <div className="label-input">
                                      <div className="input-placeholder-icon">
                                        <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                          viewBox="0 0 24 24" fill="none">
                                          <path
                                            d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2"
                                            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                          <path
                                            d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                          <path d="M14 5H20" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                          <path d="M14 8H17" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        </svg>
                                      </div>

                                      <input type="text" placeholder="Enter keyword here" />
                                    </div>
                                  </div>
                                  <div className="  creator-content-tabs-btn-wrapper">
                                    <div className="multi-tabs-action-buttons">
                                      <button className="multi-tab-switch-btn videos-btn" data-multi-tabs-switch-btndata__active>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25"
                                          viewBox="0 0 24 25" fill="none">
                                          <path
                                            d="M12.53 20.92H6.21C3.05 20.92 2 18.82 2 16.71V8.29002C2 5.13002 3.05 4.08002 6.21 4.08002H12.53C15.69 4.08002 16.74 5.13002 16.74 8.29002V16.71C16.74 19.87 15.68 20.92 12.53 20.92Z"
                                            stroke="none" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                          <path
                                            d="M19.5202 17.6L16.7402 15.65V9.34001L19.5202 7.39001C20.8802 6.44001 22.0002 7.02001 22.0002 8.69001V16.31C22.0002 17.98 20.8802 18.56 19.5202 17.6Z"
                                            stroke="none" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                          <path
                                            d="M11.5 11.5C12.3284 11.5 13 10.8284 13 10C13 9.17157 12.3284 8.5 11.5 8.5C10.6716 8.5 10 9.17157 10 10C10 10.8284 10.6716 11.5 11.5 11.5Z"
                                            stroke="none" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        </svg>
                                        <span>Videos</span>
                                      </button>
                                      <button className="multi-tab-switch-btn photos-btn" data-multi-tabs-switch-btn>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                          viewBox="0 0 25 25" fill="none">
                                          <path
                                            d="M9.5 22.5H15.5C20.5 22.5 22.5 20.5 22.5 15.5V9.5C22.5 4.5 20.5 2.5 15.5 2.5H9.5C4.5 2.5 2.5 4.5 2.5 9.5V15.5C2.5 20.5 4.5 22.5 9.5 22.5Z"
                                            stroke="none" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                          <path
                                            d="M9.5 10.5C10.6046 10.5 11.5 9.60457 11.5 8.5C11.5 7.39543 10.6046 6.5 9.5 6.5C8.39543 6.5 7.5 7.39543 7.5 8.5C7.5 9.60457 8.39543 10.5 9.5 10.5Z"
                                            stroke="none" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                          <path
                                            d="M3.16992 19.45L8.09992 16.14C8.88992 15.61 10.0299 15.67 10.7399 16.28L11.0699 16.57C11.8499 17.24 13.1099 17.24 13.8899 16.57L18.0499 13C18.8299 12.33 20.0899 12.33 20.8699 13L22.4999 14.4"
                                            stroke="none" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        </svg>
                                        <span>Photos</span>
                                      </button>

                                    </div>
                                  </div>
                                  <div className="creater-content-filters-layouts">
                                    <div className="creator-content-select-filter">
                                      <div className="custom-select-element bg-white p-sm size-sm"
                                        data-custom-select-element data-custom-select-value>
                                        <div className="custom-select-label-wrapper" data-custom-select-triger>
                                          <div className="custom-select-icon-txt">
                                            <span className="custom-select-label-txt">
                                              All Time
                                            </span>
                                          </div>
                                          <div className="custom-select-chevron">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24"
                                              viewBox="0 0 25 24" fill="none">
                                              <path
                                                d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95"
                                                stroke="none" stroke-width="1.5" stroke-miterlimit="10"
                                                stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                          </div>
                                        </div>
                                        <div className="custom-select-options-dropdown-wrapper" data-custom-select-dropdown>
                                          <div className="custom-select-options-dropdown-container">
                                            <div className="custom-select-options-lists-container">
                                              <ul className="custom-select-options-list" data-custom-select-options-list>
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
                                    <div className="creator-content-grid-layout-options" data-multi-dem-cards-layout-btns>
                                        {/* data__active */}
                                      <button className="creator-content-grid-layout-btn" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                          viewBox="0 0 24 24" fill="none">
                                          <path
                                            d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z"
                                            fill="none" />
                                          <path
                                            d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z"
                                            fill="none" />
                                          <path
                                            d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z"
                                            fill="none" />
                                          <path
                                            d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z"
                                            fill="none" />
                                        </svg>
                                      </button>
                                      <button className="creator-content-grid-layout-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                          viewBox="0 0 24 24" fill="none">
                                          <path
                                            d="M19.9 13.5H4.1C2.6 13.5 2 14.14 2 15.73V19.77C2 21.36 2.6 22 4.1 22H19.9C21.4 22 22 21.36 22 19.77V15.73C22 14.14 21.4 13.5 19.9 13.5Z"
                                            stroke="none" stroke-linecap="round" stroke-linejoin="round" />
                                          <path
                                            d="M19.9 2H4.1C2.6 2 2 2.64 2 4.23V8.27C2 9.86 2.6 10.5 4.1 10.5H19.9C21.4 10.5 22 9.86 22 8.27V4.23C22 2.64 21.4 2 19.9 2Z"
                                            stroke="none" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="creator-content-cards-wrapper multi-dem-cards-wrapper-layout">
                                <div className="creator-content-type-container-wrapper" data-multi-tabs-content-tabdata__active>

                                  <div className="col-4-cards-layout">
                                    <div className="creator-media-card card">
                                      <div className="creator-media-card__media-wrapper">
                                        <div className="creator-media-card__media">
                                          <img src="/images/post-images/post-img-11.jpg" alt="Post Image"/>
                                        </div>
                                        <div className="creator-media-card__overlay">
                                          <div className="creator-media-card__stats">

                                            <div className="creator-media-card__stats-btn wishlist-icon">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none">
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                              </svg>
                                              <span> 13 </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="creator-media-card__desc">
                                        <p>
                                          Today, I experienced the most blissful
                                          ride outside.
                                        </p>
                                      </div>
                                      <div className="creator-media-card__btn">
                                        <a href="#" className="btn-txt-gradient btn-outline">
                                          <svg className="only-fill-hover-effect" xmlns="http://www.w3.org/2000/svg"
                                            width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path
                                              d="M10.001 0.916992C12.2126 0.916992 13.7238 1.51554 14.6475 2.66211C15.5427 3.77366 15.751 5.24305 15.751 6.66699V7.66895C16.6879 7.79136 17.4627 8.06745 18.0312 8.63574C18.8947 9.49918 19.0849 10.8389 19.085 12.5V14.166C19.085 15.8272 18.8946 17.1668 18.0312 18.0303C17.1677 18.8935 15.8291 19.083 14.168 19.083H5.83496C4.17365 19.083 2.83421 18.8938 1.9707 18.0303C1.10735 17.1668 0.917969 15.8272 0.917969 14.166V12.5C0.917997 10.8389 1.10726 9.49918 1.9707 8.63574C2.53913 8.06742 3.31408 7.79232 4.25098 7.66992V6.66699C4.25098 5.24305 4.45925 3.77366 5.35449 2.66211C6.27812 1.51554 7.78932 0.916992 10.001 0.916992ZM5.83496 9.08301C4.1632 9.08301 3.4178 9.30991 3.03125 9.69629C2.64478 10.0828 2.418 10.8282 2.41797 12.5V14.166C2.41797 15.8378 2.64487 16.5832 3.03125 16.9697C3.41774 17.3562 4.16293 17.583 5.83496 17.583H14.168C15.8395 17.583 16.5841 17.356 16.9707 16.9697C17.3571 16.5832 17.585 15.8378 17.585 14.166V12.5C17.5849 10.8282 17.3572 10.0828 16.9707 9.69629C16.5841 9.3101 15.8393 9.08301 14.168 9.08301H5.83496ZM10.001 10.5C11.5657 10.5 12.8348 11.7684 12.835 13.333C12.835 14.8978 11.5658 16.167 10.001 16.167C8.43632 16.1668 7.16797 14.8977 7.16797 13.333C7.16814 11.7685 8.43643 10.5002 10.001 10.5ZM10.001 12C9.26486 12.0002 8.66814 12.5969 8.66797 13.333C8.66797 14.0693 9.26475 14.6668 10.001 14.667C10.7374 14.667 11.335 14.0694 11.335 13.333C11.3348 12.5968 10.7372 12 10.001 12ZM10.001 2.41699C8.04601 2.41699 7.05717 2.93971 6.52246 3.60352C5.95984 4.30235 5.75098 5.33302 5.75098 6.66699V7.58398C5.77888 7.58387 5.80687 7.58301 5.83496 7.58301H14.168C14.1957 7.58301 14.2234 7.58388 14.251 7.58398V6.66699C14.251 5.33302 14.0421 4.30235 13.4795 3.60352C12.9448 2.93971 11.9559 2.41699 10.001 2.41699Z"
                                              fill="url(#paint0_linear_745_155)"></path>
                                            <defs>
                                              <linearGradient id="paint0_linear_745_155" x1="1.99456" y1="0.916991"
                                                x2="26.1808" y2="6.81415" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FECE26"></stop>
                                                <stop offset="1" stop-color="#E5741F"></stop>
                                              </linearGradient>
                                            </defs>
                                          </svg>
                                          <span>$12.00</span>
                                        </a>
                                      </div>
                                    </div>
                                    <div className="creator-media-card card">
                                      <div className="creator-media-card__media-wrapper">
                                        <div className="creator-media-card__media">
                                          <img src="/images/post-images/post-img-9.jpg" alt="Post Image"/>
                                        </div>
                                        <div className="creator-media-card__overlay">
                                          <div className="creator-media-card__stats">

                                            <div className="creator-media-card__stats-btn wishlist-icon">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none">
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                              </svg>
                                              <span> 13 </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="creator-media-card__desc">
                                        <p>
                                          Today, I experienced the most blissful
                                          ride outside.
                                        </p>
                                      </div>
                                      <div className="creator-media-card__btn">
                                        <a href="#" className="btn-txt-gradient btn-outline grey-variant">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            viewBox="0 0 20 20" fill="none">
                                            <path
                                              d="M13.9173 15.8167H6.08399C5.73399 15.8167 5.34232 15.5417 5.22565 15.2083L1.77565 5.55834C1.28399 4.17501 1.85899 3.75001 3.04232 4.60001L6.29232 6.92501C6.83399 7.30001 7.45065 7.10834 7.68399 6.50001L9.15065 2.59167C9.61732 1.34167 10.3923 1.34167 10.859 2.59167L12.3257 6.50001C12.559 7.10834 13.1757 7.30001 13.709 6.92501L16.759 4.75001C18.059 3.81667 18.684 4.29168 18.1507 5.80001L14.784 15.225C14.659 15.5417 14.2673 15.8167 13.9173 15.8167Z"
                                              stroke="url(#paint0_linear_745_209)" stroke-width="1.5"
                                              stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M5.41602 18.3333H14.5827" stroke="url(#paint1_linear_745_209)"
                                              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M7.91602 11.6667H12.0827" stroke="url(#paint2_linear_745_209)"
                                              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <defs>
                                              <linearGradient id="paint0_linear_745_209" x1="9.9704" y1="1.65417"
                                                x2="9.9704" y2="15.8167" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                              <linearGradient id="paint1_linear_745_209" x1="9.99935" y1="18.3333"
                                                x2="9.99935" y2="19.3333" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                              <linearGradient id="paint2_linear_745_209" x1="9.99935" y1="11.6667"
                                                x2="9.99935" y2="12.6667" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                            </defs>
                                          </svg>
                                          <span>For Subscribers</span>
                                        </a>
                                      </div>
                                    </div>
                                    <div className="creator-media-card card">
                                      <div className="creator-media-card__media-wrapper">
                                        <div className="creator-media-card__media">
                                          <img src="/images/post-images/post-img-12.jpg" alt="Post Image"/>
                                        </div>
                                        <div className="creator-media-card__overlay">
                                          <div className="creator-media-card__stats">

                                            <div className="creator-media-card__stats-btn wishlist-icon">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none">
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                              </svg>
                                              <span> 13 </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="creator-media-card__desc">
                                        <p>
                                          Today, I experienced the most blissful
                                          ride outside.
                                        </p>
                                      </div>
                                      <div className="creator-media-card__btn">
                                        <a href="#" className="btn-txt-gradient btn-outline">
                                          <svg className="only-fill-hover-effect" xmlns="http://www.w3.org/2000/svg"
                                            width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path
                                              d="M10.001 0.916992C12.2126 0.916992 13.7238 1.51554 14.6475 2.66211C15.5427 3.77366 15.751 5.24305 15.751 6.66699V7.66895C16.6879 7.79136 17.4627 8.06745 18.0312 8.63574C18.8947 9.49918 19.0849 10.8389 19.085 12.5V14.166C19.085 15.8272 18.8946 17.1668 18.0312 18.0303C17.1677 18.8935 15.8291 19.083 14.168 19.083H5.83496C4.17365 19.083 2.83421 18.8938 1.9707 18.0303C1.10735 17.1668 0.917969 15.8272 0.917969 14.166V12.5C0.917997 10.8389 1.10726 9.49918 1.9707 8.63574C2.53913 8.06742 3.31408 7.79232 4.25098 7.66992V6.66699C4.25098 5.24305 4.45925 3.77366 5.35449 2.66211C6.27812 1.51554 7.78932 0.916992 10.001 0.916992ZM5.83496 9.08301C4.1632 9.08301 3.4178 9.30991 3.03125 9.69629C2.64478 10.0828 2.418 10.8282 2.41797 12.5V14.166C2.41797 15.8378 2.64487 16.5832 3.03125 16.9697C3.41774 17.3562 4.16293 17.583 5.83496 17.583H14.168C15.8395 17.583 16.5841 17.356 16.9707 16.9697C17.3571 16.5832 17.585 15.8378 17.585 14.166V12.5C17.5849 10.8282 17.3572 10.0828 16.9707 9.69629C16.5841 9.3101 15.8393 9.08301 14.168 9.08301H5.83496ZM10.001 10.5C11.5657 10.5 12.8348 11.7684 12.835 13.333C12.835 14.8978 11.5658 16.167 10.001 16.167C8.43632 16.1668 7.16797 14.8977 7.16797 13.333C7.16814 11.7685 8.43643 10.5002 10.001 10.5ZM10.001 12C9.26486 12.0002 8.66814 12.5969 8.66797 13.333C8.66797 14.0693 9.26475 14.6668 10.001 14.667C10.7374 14.667 11.335 14.0694 11.335 13.333C11.3348 12.5968 10.7372 12 10.001 12ZM10.001 2.41699C8.04601 2.41699 7.05717 2.93971 6.52246 3.60352C5.95984 4.30235 5.75098 5.33302 5.75098 6.66699V7.58398C5.77888 7.58387 5.80687 7.58301 5.83496 7.58301H14.168C14.1957 7.58301 14.2234 7.58388 14.251 7.58398V6.66699C14.251 5.33302 14.0421 4.30235 13.4795 3.60352C12.9448 2.93971 11.9559 2.41699 10.001 2.41699Z"
                                              fill="url(#paint0_linear_745_155)"></path>
                                            <defs>
                                              <linearGradient id="paint0_linear_745_155" x1="1.99456" y1="0.916991"
                                                x2="26.1808" y2="6.81415" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FECE26"></stop>
                                                <stop offset="1" stop-color="#E5741F"></stop>
                                              </linearGradient>
                                            </defs>
                                          </svg>
                                          <span>$12.00</span>
                                        </a>
                                      </div>
                                    </div>
                                    <div className="creator-media-card card">
                                      <div className="creator-media-card__media-wrapper">
                                        <div className="creator-media-card__media">
                                          <img src="/images/post-images/post-img-10.jpg" alt="Post Image"/>
                                        </div>
                                        <div className="creator-media-card__overlay">
                                          <div className="creator-media-card__stats">

                                            <div className="creator-media-card__stats-btn wishlist-icon">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none">
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                              </svg>
                                              <span> 13 </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="creator-media-card__desc">
                                        <p>
                                          Today, I experienced the most blissful
                                          ride outside.
                                        </p>
                                      </div>
                                      <div className="creator-media-card__btn">
                                        <a href="#" className="btn-txt-gradient btn-outline grey-variant">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            viewBox="0 0 20 20" fill="none">
                                            <path
                                              d="M13.9173 15.8167H6.08399C5.73399 15.8167 5.34232 15.5417 5.22565 15.2083L1.77565 5.55834C1.28399 4.17501 1.85899 3.75001 3.04232 4.60001L6.29232 6.92501C6.83399 7.30001 7.45065 7.10834 7.68399 6.50001L9.15065 2.59167C9.61732 1.34167 10.3923 1.34167 10.859 2.59167L12.3257 6.50001C12.559 7.10834 13.1757 7.30001 13.709 6.92501L16.759 4.75001C18.059 3.81667 18.684 4.29168 18.1507 5.80001L14.784 15.225C14.659 15.5417 14.2673 15.8167 13.9173 15.8167Z"
                                              stroke="url(#paint0_linear_745_209)" stroke-width="1.5"
                                              stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M5.41602 18.3333H14.5827" stroke="url(#paint1_linear_745_209)"
                                              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M7.91602 11.6667H12.0827" stroke="url(#paint2_linear_745_209)"
                                              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <defs>
                                              <linearGradient id="paint0_linear_745_209" x1="9.9704" y1="1.65417"
                                                x2="9.9704" y2="15.8167" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                              <linearGradient id="paint1_linear_745_209" x1="9.99935" y1="18.3333"
                                                x2="9.99935" y2="19.3333" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                              <linearGradient id="paint2_linear_745_209" x1="9.99935" y1="11.6667"
                                                x2="9.99935" y2="12.6667" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                            </defs>
                                          </svg>
                                          <span>For Subscribers</span>
                                        </a>
                                      </div>
                                    </div>
                                    <div className="creator-media-card card">
                                      <div className="creator-media-card__media-wrapper">
                                        <div className="creator-media-card__media">
                                          <img src="/images/post-images/post-img-13.jpg" alt="Post Image"/>
                                        </div>
                                        <div className="creator-media-card__overlay">
                                          <div className="creator-media-card__stats">

                                            <div className="creator-media-card__stats-btn wishlist-icon">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none">
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                              </svg>
                                              <span> 13 </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="creator-media-card__desc">
                                        <p>
                                          Today, I experienced the most blissful
                                          ride outside.
                                        </p>
                                      </div>
                                      <div className="creator-media-card__btn">
                                        <a href="#" className="btn-txt-gradient btn-outline">
                                          <svg className="only-fill-hover-effect" xmlns="http://www.w3.org/2000/svg"
                                            width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path
                                              d="M10.001 0.916992C12.2126 0.916992 13.7238 1.51554 14.6475 2.66211C15.5427 3.77366 15.751 5.24305 15.751 6.66699V7.66895C16.6879 7.79136 17.4627 8.06745 18.0312 8.63574C18.8947 9.49918 19.0849 10.8389 19.085 12.5V14.166C19.085 15.8272 18.8946 17.1668 18.0312 18.0303C17.1677 18.8935 15.8291 19.083 14.168 19.083H5.83496C4.17365 19.083 2.83421 18.8938 1.9707 18.0303C1.10735 17.1668 0.917969 15.8272 0.917969 14.166V12.5C0.917997 10.8389 1.10726 9.49918 1.9707 8.63574C2.53913 8.06742 3.31408 7.79232 4.25098 7.66992V6.66699C4.25098 5.24305 4.45925 3.77366 5.35449 2.66211C6.27812 1.51554 7.78932 0.916992 10.001 0.916992ZM5.83496 9.08301C4.1632 9.08301 3.4178 9.30991 3.03125 9.69629C2.64478 10.0828 2.418 10.8282 2.41797 12.5V14.166C2.41797 15.8378 2.64487 16.5832 3.03125 16.9697C3.41774 17.3562 4.16293 17.583 5.83496 17.583H14.168C15.8395 17.583 16.5841 17.356 16.9707 16.9697C17.3571 16.5832 17.585 15.8378 17.585 14.166V12.5C17.5849 10.8282 17.3572 10.0828 16.9707 9.69629C16.5841 9.3101 15.8393 9.08301 14.168 9.08301H5.83496ZM10.001 10.5C11.5657 10.5 12.8348 11.7684 12.835 13.333C12.835 14.8978 11.5658 16.167 10.001 16.167C8.43632 16.1668 7.16797 14.8977 7.16797 13.333C7.16814 11.7685 8.43643 10.5002 10.001 10.5ZM10.001 12C9.26486 12.0002 8.66814 12.5969 8.66797 13.333C8.66797 14.0693 9.26475 14.6668 10.001 14.667C10.7374 14.667 11.335 14.0694 11.335 13.333C11.3348 12.5968 10.7372 12 10.001 12ZM10.001 2.41699C8.04601 2.41699 7.05717 2.93971 6.52246 3.60352C5.95984 4.30235 5.75098 5.33302 5.75098 6.66699V7.58398C5.77888 7.58387 5.80687 7.58301 5.83496 7.58301H14.168C14.1957 7.58301 14.2234 7.58388 14.251 7.58398V6.66699C14.251 5.33302 14.0421 4.30235 13.4795 3.60352C12.9448 2.93971 11.9559 2.41699 10.001 2.41699Z"
                                              fill="url(#paint0_linear_745_155)"></path>
                                            <defs>
                                              <linearGradient id="paint0_linear_745_155" x1="1.99456" y1="0.916991"
                                                x2="26.1808" y2="6.81415" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FECE26"></stop>
                                                <stop offset="1" stop-color="#E5741F"></stop>
                                              </linearGradient>
                                            </defs>
                                          </svg>
                                          <span>$12.00</span>
                                        </a>
                                      </div>
                                    </div>
                                    <div className="creator-media-card card">
                                      <div className="creator-media-card__media-wrapper">
                                        <div className="creator-media-card__media">
                                          <img src="/images/post-images/post-img-7.jpg" alt="Post Image"/>
                                        </div>
                                        <div className="creator-media-card__overlay">
                                          <div className="creator-media-card__stats">

                                            <div className="creator-media-card__stats-btn wishlist-icon">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none">
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                              </svg>
                                              <span> 13 </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="creator-media-card__desc">
                                        <p>
                                          Today, I experienced the most blissful
                                          ride outside.
                                        </p>
                                      </div>
                                      <div className="creator-media-card__btn">
                                        <a href="#" className="btn-txt-gradient btn-outline grey-variant">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            viewBox="0 0 20 20" fill="none">
                                            <path
                                              d="M13.9173 15.8167H6.08399C5.73399 15.8167 5.34232 15.5417 5.22565 15.2083L1.77565 5.55834C1.28399 4.17501 1.85899 3.75001 3.04232 4.60001L6.29232 6.92501C6.83399 7.30001 7.45065 7.10834 7.68399 6.50001L9.15065 2.59167C9.61732 1.34167 10.3923 1.34167 10.859 2.59167L12.3257 6.50001C12.559 7.10834 13.1757 7.30001 13.709 6.92501L16.759 4.75001C18.059 3.81667 18.684 4.29168 18.1507 5.80001L14.784 15.225C14.659 15.5417 14.2673 15.8167 13.9173 15.8167Z"
                                              stroke="url(#paint0_linear_745_209)" stroke-width="1.5"
                                              stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M5.41602 18.3333H14.5827" stroke="url(#paint1_linear_745_209)"
                                              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M7.91602 11.6667H12.0827" stroke="url(#paint2_linear_745_209)"
                                              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <defs>
                                              <linearGradient id="paint0_linear_745_209" x1="9.9704" y1="1.65417"
                                                x2="9.9704" y2="15.8167" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                              <linearGradient id="paint1_linear_745_209" x1="9.99935" y1="18.3333"
                                                x2="9.99935" y2="19.3333" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                              <linearGradient id="paint2_linear_745_209" x1="9.99935" y1="11.6667"
                                                x2="9.99935" y2="12.6667" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                            </defs>
                                          </svg>
                                          <span>For Subscribers</span>
                                        </a>
                                      </div>
                                    </div>
                                    <div className="creator-media-card card">
                                      <div className="creator-media-card__media-wrapper">
                                        <div className="creator-media-card__media">
                                          <img src="/images/post-images/post-img-14.jpg" alt="Post Image"/>
                                        </div>
                                        <div className="creator-media-card__overlay">
                                          <div className="creator-media-card__stats">

                                            <div className="creator-media-card__stats-btn wishlist-icon">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none">
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                              </svg>
                                              <span> 13 </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="creator-media-card__desc">
                                        <p>
                                          Today, I experienced the most blissful
                                          ride outside.
                                        </p>
                                      </div>
                                      <div className="creator-media-card__btn">
                                        <a href="#" className="btn-txt-gradient btn-outline">
                                          <svg className="only-fill-hover-effect" xmlns="http://www.w3.org/2000/svg"
                                            width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path
                                              d="M10.001 0.916992C12.2126 0.916992 13.7238 1.51554 14.6475 2.66211C15.5427 3.77366 15.751 5.24305 15.751 6.66699V7.66895C16.6879 7.79136 17.4627 8.06745 18.0312 8.63574C18.8947 9.49918 19.0849 10.8389 19.085 12.5V14.166C19.085 15.8272 18.8946 17.1668 18.0312 18.0303C17.1677 18.8935 15.8291 19.083 14.168 19.083H5.83496C4.17365 19.083 2.83421 18.8938 1.9707 18.0303C1.10735 17.1668 0.917969 15.8272 0.917969 14.166V12.5C0.917997 10.8389 1.10726 9.49918 1.9707 8.63574C2.53913 8.06742 3.31408 7.79232 4.25098 7.66992V6.66699C4.25098 5.24305 4.45925 3.77366 5.35449 2.66211C6.27812 1.51554 7.78932 0.916992 10.001 0.916992ZM5.83496 9.08301C4.1632 9.08301 3.4178 9.30991 3.03125 9.69629C2.64478 10.0828 2.418 10.8282 2.41797 12.5V14.166C2.41797 15.8378 2.64487 16.5832 3.03125 16.9697C3.41774 17.3562 4.16293 17.583 5.83496 17.583H14.168C15.8395 17.583 16.5841 17.356 16.9707 16.9697C17.3571 16.5832 17.585 15.8378 17.585 14.166V12.5C17.5849 10.8282 17.3572 10.0828 16.9707 9.69629C16.5841 9.3101 15.8393 9.08301 14.168 9.08301H5.83496ZM10.001 10.5C11.5657 10.5 12.8348 11.7684 12.835 13.333C12.835 14.8978 11.5658 16.167 10.001 16.167C8.43632 16.1668 7.16797 14.8977 7.16797 13.333C7.16814 11.7685 8.43643 10.5002 10.001 10.5ZM10.001 12C9.26486 12.0002 8.66814 12.5969 8.66797 13.333C8.66797 14.0693 9.26475 14.6668 10.001 14.667C10.7374 14.667 11.335 14.0694 11.335 13.333C11.3348 12.5968 10.7372 12 10.001 12ZM10.001 2.41699C8.04601 2.41699 7.05717 2.93971 6.52246 3.60352C5.95984 4.30235 5.75098 5.33302 5.75098 6.66699V7.58398C5.77888 7.58387 5.80687 7.58301 5.83496 7.58301H14.168C14.1957 7.58301 14.2234 7.58388 14.251 7.58398V6.66699C14.251 5.33302 14.0421 4.30235 13.4795 3.60352C12.9448 2.93971 11.9559 2.41699 10.001 2.41699Z"
                                              fill="url(#paint0_linear_745_155)"></path>
                                            <defs>
                                              <linearGradient id="paint0_linear_745_155" x1="1.99456" y1="0.916991"
                                                x2="26.1808" y2="6.81415" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FECE26"></stop>
                                                <stop offset="1" stop-color="#E5741F"></stop>
                                              </linearGradient>
                                            </defs>
                                          </svg>
                                          <span>$12.00</span>
                                        </a>
                                      </div>
                                    </div>
                                    <div className="creator-media-card card">
                                      <div className="creator-media-card__media-wrapper">
                                        <div className="creator-media-card__media">
                                          <img src="/images/post-images/post-img-8.jpg" alt="Post Image"/>
                                        </div>
                                        <div className="creator-media-card__overlay">
                                          <div className="creator-media-card__stats">

                                            <div className="creator-media-card__stats-btn wishlist-icon">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none">
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                              </svg>
                                              <span> 13 </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="creator-media-card__desc">
                                        <p>
                                          Today, I experienced the most blissful
                                          ride outside.
                                        </p>
                                      </div>
                                      <div className="creator-media-card__btn">
                                        <a href="#" className="btn-txt-gradient btn-outline grey-variant">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            viewBox="0 0 20 20" fill="none">
                                            <path
                                              d="M13.9173 15.8167H6.08399C5.73399 15.8167 5.34232 15.5417 5.22565 15.2083L1.77565 5.55834C1.28399 4.17501 1.85899 3.75001 3.04232 4.60001L6.29232 6.92501C6.83399 7.30001 7.45065 7.10834 7.68399 6.50001L9.15065 2.59167C9.61732 1.34167 10.3923 1.34167 10.859 2.59167L12.3257 6.50001C12.559 7.10834 13.1757 7.30001 13.709 6.92501L16.759 4.75001C18.059 3.81667 18.684 4.29168 18.1507 5.80001L14.784 15.225C14.659 15.5417 14.2673 15.8167 13.9173 15.8167Z"
                                              stroke="url(#paint0_linear_745_209)" stroke-width="1.5"
                                              stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M5.41602 18.3333H14.5827" stroke="url(#paint1_linear_745_209)"
                                              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M7.91602 11.6667H12.0827" stroke="url(#paint2_linear_745_209)"
                                              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <defs>
                                              <linearGradient id="paint0_linear_745_209" x1="9.9704" y1="1.65417"
                                                x2="9.9704" y2="15.8167" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                              <linearGradient id="paint1_linear_745_209" x1="9.99935" y1="18.3333"
                                                x2="9.99935" y2="19.3333" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                              <linearGradient id="paint2_linear_745_209" x1="9.99935" y1="11.6667"
                                                x2="9.99935" y2="12.6667" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                            </defs>
                                          </svg>
                                          <span>For Subscribers</span>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="creator-content-type-container-wrapper" data-multi-tabs-content-tab>
                                  <div className="col-4-cards-layout">
                                    <div className="creator-media-card card">
                                      <div className="creator-media-card__media-wrapper">
                                        <div className="creator-media-card__media">
                                          <img src="/images/post-images/post-img-13.jpg" alt="Post Image"/>
                                        </div>
                                        <div className="creator-media-card__overlay">
                                          <div className="creator-media-card__stats">

                                            <div className="creator-media-card__stats-btn wishlist-icon">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none">
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                              </svg>
                                              <span> 13 </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="creator-media-card__desc">
                                        <p>
                                          Today, I experienced the most blissful
                                          ride outside.
                                        </p>
                                      </div>
                                      <div className="creator-media-card__btn">
                                        <a href="#" className="btn-txt-gradient btn-outline">
                                          <svg className="only-fill-hover-effect" xmlns="http://www.w3.org/2000/svg"
                                            width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path
                                              d="M10.001 0.916992C12.2126 0.916992 13.7238 1.51554 14.6475 2.66211C15.5427 3.77366 15.751 5.24305 15.751 6.66699V7.66895C16.6879 7.79136 17.4627 8.06745 18.0312 8.63574C18.8947 9.49918 19.0849 10.8389 19.085 12.5V14.166C19.085 15.8272 18.8946 17.1668 18.0312 18.0303C17.1677 18.8935 15.8291 19.083 14.168 19.083H5.83496C4.17365 19.083 2.83421 18.8938 1.9707 18.0303C1.10735 17.1668 0.917969 15.8272 0.917969 14.166V12.5C0.917997 10.8389 1.10726 9.49918 1.9707 8.63574C2.53913 8.06742 3.31408 7.79232 4.25098 7.66992V6.66699C4.25098 5.24305 4.45925 3.77366 5.35449 2.66211C6.27812 1.51554 7.78932 0.916992 10.001 0.916992ZM5.83496 9.08301C4.1632 9.08301 3.4178 9.30991 3.03125 9.69629C2.64478 10.0828 2.418 10.8282 2.41797 12.5V14.166C2.41797 15.8378 2.64487 16.5832 3.03125 16.9697C3.41774 17.3562 4.16293 17.583 5.83496 17.583H14.168C15.8395 17.583 16.5841 17.356 16.9707 16.9697C17.3571 16.5832 17.585 15.8378 17.585 14.166V12.5C17.5849 10.8282 17.3572 10.0828 16.9707 9.69629C16.5841 9.3101 15.8393 9.08301 14.168 9.08301H5.83496ZM10.001 10.5C11.5657 10.5 12.8348 11.7684 12.835 13.333C12.835 14.8978 11.5658 16.167 10.001 16.167C8.43632 16.1668 7.16797 14.8977 7.16797 13.333C7.16814 11.7685 8.43643 10.5002 10.001 10.5ZM10.001 12C9.26486 12.0002 8.66814 12.5969 8.66797 13.333C8.66797 14.0693 9.26475 14.6668 10.001 14.667C10.7374 14.667 11.335 14.0694 11.335 13.333C11.3348 12.5968 10.7372 12 10.001 12ZM10.001 2.41699C8.04601 2.41699 7.05717 2.93971 6.52246 3.60352C5.95984 4.30235 5.75098 5.33302 5.75098 6.66699V7.58398C5.77888 7.58387 5.80687 7.58301 5.83496 7.58301H14.168C14.1957 7.58301 14.2234 7.58388 14.251 7.58398V6.66699C14.251 5.33302 14.0421 4.30235 13.4795 3.60352C12.9448 2.93971 11.9559 2.41699 10.001 2.41699Z"
                                              fill="url(#paint0_linear_745_155)"></path>
                                            <defs>
                                              <linearGradient id="paint0_linear_745_155" x1="1.99456" y1="0.916991"
                                                x2="26.1808" y2="6.81415" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FECE26"></stop>
                                                <stop offset="1" stop-color="#E5741F"></stop>
                                              </linearGradient>
                                            </defs>
                                          </svg>
                                          <span>$12.00</span>
                                        </a>
                                      </div>
                                    </div>
                                    <div className="creator-media-card card">
                                      <div className="creator-media-card__media-wrapper">
                                        <div className="creator-media-card__media">
                                          <img src="/images/post-images/post-img-7.jpg" alt="Post Image"/>
                                        </div>
                                        <div className="creator-media-card__overlay">
                                          <div className="creator-media-card__stats">

                                            <div className="creator-media-card__stats-btn wishlist-icon">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none">
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                              </svg>
                                              <span> 13 </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="creator-media-card__desc">
                                        <p>
                                          Today, I experienced the most blissful
                                          ride outside.
                                        </p>
                                      </div>
                                      <div className="creator-media-card__btn">
                                        <a href="#" className="btn-txt-gradient btn-outline grey-variant">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            viewBox="0 0 20 20" fill="none">
                                            <path
                                              d="M13.9173 15.8167H6.08399C5.73399 15.8167 5.34232 15.5417 5.22565 15.2083L1.77565 5.55834C1.28399 4.17501 1.85899 3.75001 3.04232 4.60001L6.29232 6.92501C6.83399 7.30001 7.45065 7.10834 7.68399 6.50001L9.15065 2.59167C9.61732 1.34167 10.3923 1.34167 10.859 2.59167L12.3257 6.50001C12.559 7.10834 13.1757 7.30001 13.709 6.92501L16.759 4.75001C18.059 3.81667 18.684 4.29168 18.1507 5.80001L14.784 15.225C14.659 15.5417 14.2673 15.8167 13.9173 15.8167Z"
                                              stroke="url(#paint0_linear_745_209)" stroke-width="1.5"
                                              stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M5.41602 18.3333H14.5827" stroke="url(#paint1_linear_745_209)"
                                              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M7.91602 11.6667H12.0827" stroke="url(#paint2_linear_745_209)"
                                              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <defs>
                                              <linearGradient id="paint0_linear_745_209" x1="9.9704" y1="1.65417"
                                                x2="9.9704" y2="15.8167" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                              <linearGradient id="paint1_linear_745_209" x1="9.99935" y1="18.3333"
                                                x2="9.99935" y2="19.3333" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                              <linearGradient id="paint2_linear_745_209" x1="9.99935" y1="11.6667"
                                                x2="9.99935" y2="12.6667" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                            </defs>
                                          </svg>
                                          <span>For Subscribers</span>
                                        </a>
                                      </div>
                                    </div>
                                    <div className="creator-media-card card">
                                      <div className="creator-media-card__media-wrapper">
                                        <div className="creator-media-card__media">
                                          <img src="/images/post-images/post-img-14.jpg" alt="Post Image"/>
                                        </div>
                                        <div className="creator-media-card__overlay">
                                          <div className="creator-media-card__stats">

                                            <div className="creator-media-card__stats-btn wishlist-icon">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none">
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                              </svg>
                                              <span> 13 </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="creator-media-card__desc">
                                        <p>
                                          Today, I experienced the most blissful
                                          ride outside.
                                        </p>
                                      </div>
                                      <div className="creator-media-card__btn">
                                        <a href="#" className="btn-txt-gradient btn-outline">
                                          <svg className="only-fill-hover-effect" xmlns="http://www.w3.org/2000/svg"
                                            width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path
                                              d="M10.001 0.916992C12.2126 0.916992 13.7238 1.51554 14.6475 2.66211C15.5427 3.77366 15.751 5.24305 15.751 6.66699V7.66895C16.6879 7.79136 17.4627 8.06745 18.0312 8.63574C18.8947 9.49918 19.0849 10.8389 19.085 12.5V14.166C19.085 15.8272 18.8946 17.1668 18.0312 18.0303C17.1677 18.8935 15.8291 19.083 14.168 19.083H5.83496C4.17365 19.083 2.83421 18.8938 1.9707 18.0303C1.10735 17.1668 0.917969 15.8272 0.917969 14.166V12.5C0.917997 10.8389 1.10726 9.49918 1.9707 8.63574C2.53913 8.06742 3.31408 7.79232 4.25098 7.66992V6.66699C4.25098 5.24305 4.45925 3.77366 5.35449 2.66211C6.27812 1.51554 7.78932 0.916992 10.001 0.916992ZM5.83496 9.08301C4.1632 9.08301 3.4178 9.30991 3.03125 9.69629C2.64478 10.0828 2.418 10.8282 2.41797 12.5V14.166C2.41797 15.8378 2.64487 16.5832 3.03125 16.9697C3.41774 17.3562 4.16293 17.583 5.83496 17.583H14.168C15.8395 17.583 16.5841 17.356 16.9707 16.9697C17.3571 16.5832 17.585 15.8378 17.585 14.166V12.5C17.5849 10.8282 17.3572 10.0828 16.9707 9.69629C16.5841 9.3101 15.8393 9.08301 14.168 9.08301H5.83496ZM10.001 10.5C11.5657 10.5 12.8348 11.7684 12.835 13.333C12.835 14.8978 11.5658 16.167 10.001 16.167C8.43632 16.1668 7.16797 14.8977 7.16797 13.333C7.16814 11.7685 8.43643 10.5002 10.001 10.5ZM10.001 12C9.26486 12.0002 8.66814 12.5969 8.66797 13.333C8.66797 14.0693 9.26475 14.6668 10.001 14.667C10.7374 14.667 11.335 14.0694 11.335 13.333C11.3348 12.5968 10.7372 12 10.001 12ZM10.001 2.41699C8.04601 2.41699 7.05717 2.93971 6.52246 3.60352C5.95984 4.30235 5.75098 5.33302 5.75098 6.66699V7.58398C5.77888 7.58387 5.80687 7.58301 5.83496 7.58301H14.168C14.1957 7.58301 14.2234 7.58388 14.251 7.58398V6.66699C14.251 5.33302 14.0421 4.30235 13.4795 3.60352C12.9448 2.93971 11.9559 2.41699 10.001 2.41699Z"
                                              fill="url(#paint0_linear_745_155)"></path>
                                            <defs>
                                              <linearGradient id="paint0_linear_745_155" x1="1.99456" y1="0.916991"
                                                x2="26.1808" y2="6.81415" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FECE26"></stop>
                                                <stop offset="1" stop-color="#E5741F"></stop>
                                              </linearGradient>
                                            </defs>
                                          </svg>
                                          <span>$12.00</span>
                                        </a>
                                      </div>
                                    </div>
                                    <div className="creator-media-card card">
                                      <div className="creator-media-card__media-wrapper">
                                        <div className="creator-media-card__media">
                                          <img src="/images/post-images/post-img-8.jpg" alt="Post Image"/>
                                        </div>
                                        <div className="creator-media-card__overlay">
                                          <div className="creator-media-card__stats">

                                            <div className="creator-media-card__stats-btn wishlist-icon">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none">
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                              </svg>
                                              <span> 13 </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="creator-media-card__desc">
                                        <p>
                                          Today, I experienced the most blissful
                                          ride outside.
                                        </p>
                                      </div>
                                      <div className="creator-media-card__btn">
                                        <a href="#" className="btn-txt-gradient btn-outline grey-variant">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            viewBox="0 0 20 20" fill="none">
                                            <path
                                              d="M13.9173 15.8167H6.08399C5.73399 15.8167 5.34232 15.5417 5.22565 15.2083L1.77565 5.55834C1.28399 4.17501 1.85899 3.75001 3.04232 4.60001L6.29232 6.92501C6.83399 7.30001 7.45065 7.10834 7.68399 6.50001L9.15065 2.59167C9.61732 1.34167 10.3923 1.34167 10.859 2.59167L12.3257 6.50001C12.559 7.10834 13.1757 7.30001 13.709 6.92501L16.759 4.75001C18.059 3.81667 18.684 4.29168 18.1507 5.80001L14.784 15.225C14.659 15.5417 14.2673 15.8167 13.9173 15.8167Z"
                                              stroke="url(#paint0_linear_745_209)" stroke-width="1.5"
                                              stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M5.41602 18.3333H14.5827" stroke="url(#paint1_linear_745_209)"
                                              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M7.91602 11.6667H12.0827" stroke="url(#paint2_linear_745_209)"
                                              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <defs>
                                              <linearGradient id="paint0_linear_745_209" x1="9.9704" y1="1.65417"
                                                x2="9.9704" y2="15.8167" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                              <linearGradient id="paint1_linear_745_209" x1="9.99935" y1="18.3333"
                                                x2="9.99935" y2="19.3333" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                              <linearGradient id="paint2_linear_745_209" x1="9.99935" y1="11.6667"
                                                x2="9.99935" y2="12.6667" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                            </defs>
                                          </svg>
                                          <span>For Subscribers</span>
                                        </a>
                                      </div>
                                    </div>
                                    <div className="creator-media-card card">
                                      <div className="creator-media-card__media-wrapper">
                                        <div className="creator-media-card__media">
                                          <img src="/images/post-images/post-img-11.jpg" alt="Post Image"/>
                                        </div>
                                        <div className="creator-media-card__overlay">
                                          <div className="creator-media-card__stats">

                                            <div className="creator-media-card__stats-btn wishlist-icon">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none">
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                              </svg>
                                              <span> 13 </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="creator-media-card__desc">
                                        <p>
                                          Today, I experienced the most blissful
                                          ride outside.
                                        </p>
                                      </div>
                                      <div className="creator-media-card__btn">
                                        <a href="#" className="btn-txt-gradient btn-outline">
                                          <svg className="only-fill-hover-effect" xmlns="http://www.w3.org/2000/svg"
                                            width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path
                                              d="M10.001 0.916992C12.2126 0.916992 13.7238 1.51554 14.6475 2.66211C15.5427 3.77366 15.751 5.24305 15.751 6.66699V7.66895C16.6879 7.79136 17.4627 8.06745 18.0312 8.63574C18.8947 9.49918 19.0849 10.8389 19.085 12.5V14.166C19.085 15.8272 18.8946 17.1668 18.0312 18.0303C17.1677 18.8935 15.8291 19.083 14.168 19.083H5.83496C4.17365 19.083 2.83421 18.8938 1.9707 18.0303C1.10735 17.1668 0.917969 15.8272 0.917969 14.166V12.5C0.917997 10.8389 1.10726 9.49918 1.9707 8.63574C2.53913 8.06742 3.31408 7.79232 4.25098 7.66992V6.66699C4.25098 5.24305 4.45925 3.77366 5.35449 2.66211C6.27812 1.51554 7.78932 0.916992 10.001 0.916992ZM5.83496 9.08301C4.1632 9.08301 3.4178 9.30991 3.03125 9.69629C2.64478 10.0828 2.418 10.8282 2.41797 12.5V14.166C2.41797 15.8378 2.64487 16.5832 3.03125 16.9697C3.41774 17.3562 4.16293 17.583 5.83496 17.583H14.168C15.8395 17.583 16.5841 17.356 16.9707 16.9697C17.3571 16.5832 17.585 15.8378 17.585 14.166V12.5C17.5849 10.8282 17.3572 10.0828 16.9707 9.69629C16.5841 9.3101 15.8393 9.08301 14.168 9.08301H5.83496ZM10.001 10.5C11.5657 10.5 12.8348 11.7684 12.835 13.333C12.835 14.8978 11.5658 16.167 10.001 16.167C8.43632 16.1668 7.16797 14.8977 7.16797 13.333C7.16814 11.7685 8.43643 10.5002 10.001 10.5ZM10.001 12C9.26486 12.0002 8.66814 12.5969 8.66797 13.333C8.66797 14.0693 9.26475 14.6668 10.001 14.667C10.7374 14.667 11.335 14.0694 11.335 13.333C11.3348 12.5968 10.7372 12 10.001 12ZM10.001 2.41699C8.04601 2.41699 7.05717 2.93971 6.52246 3.60352C5.95984 4.30235 5.75098 5.33302 5.75098 6.66699V7.58398C5.77888 7.58387 5.80687 7.58301 5.83496 7.58301H14.168C14.1957 7.58301 14.2234 7.58388 14.251 7.58398V6.66699C14.251 5.33302 14.0421 4.30235 13.4795 3.60352C12.9448 2.93971 11.9559 2.41699 10.001 2.41699Z"
                                              fill="url(#paint0_linear_745_155)"></path>
                                            <defs>
                                              <linearGradient id="paint0_linear_745_155" x1="1.99456" y1="0.916991"
                                                x2="26.1808" y2="6.81415" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FECE26"></stop>
                                                <stop offset="1" stop-color="#E5741F"></stop>
                                              </linearGradient>
                                            </defs>
                                          </svg>
                                          <span>$12.00</span>
                                        </a>
                                      </div>
                                    </div>
                                    <div className="creator-media-card card">
                                      <div className="creator-media-card__media-wrapper">
                                        <div className="creator-media-card__media">
                                          <img src="/images/post-images/post-img-9.jpg" alt="Post Image"/>
                                        </div>
                                        <div className="creator-media-card__overlay">
                                          <div className="creator-media-card__stats">

                                            <div className="creator-media-card__stats-btn wishlist-icon">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none">
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                              </svg>
                                              <span> 13 </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="creator-media-card__desc">
                                        <p>
                                          Today, I experienced the most blissful
                                          ride outside.
                                        </p>
                                      </div>
                                      <div className="creator-media-card__btn">
                                        <a href="#" className="btn-txt-gradient btn-outline grey-variant">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            viewBox="0 0 20 20" fill="none">
                                            <path
                                              d="M13.9173 15.8167H6.08399C5.73399 15.8167 5.34232 15.5417 5.22565 15.2083L1.77565 5.55834C1.28399 4.17501 1.85899 3.75001 3.04232 4.60001L6.29232 6.92501C6.83399 7.30001 7.45065 7.10834 7.68399 6.50001L9.15065 2.59167C9.61732 1.34167 10.3923 1.34167 10.859 2.59167L12.3257 6.50001C12.559 7.10834 13.1757 7.30001 13.709 6.92501L16.759 4.75001C18.059 3.81667 18.684 4.29168 18.1507 5.80001L14.784 15.225C14.659 15.5417 14.2673 15.8167 13.9173 15.8167Z"
                                              stroke="url(#paint0_linear_745_209)" stroke-width="1.5"
                                              stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M5.41602 18.3333H14.5827" stroke="url(#paint1_linear_745_209)"
                                              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M7.91602 11.6667H12.0827" stroke="url(#paint2_linear_745_209)"
                                              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <defs>
                                              <linearGradient id="paint0_linear_745_209" x1="9.9704" y1="1.65417"
                                                x2="9.9704" y2="15.8167" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                              <linearGradient id="paint1_linear_745_209" x1="9.99935" y1="18.3333"
                                                x2="9.99935" y2="19.3333" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                              <linearGradient id="paint2_linear_745_209" x1="9.99935" y1="11.6667"
                                                x2="9.99935" y2="12.6667" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                            </defs>
                                          </svg>
                                          <span>For Subscribers</span>
                                        </a>
                                      </div>
                                    </div>
                                    <div className="creator-media-card card">
                                      <div className="creator-media-card__media-wrapper">
                                        <div className="creator-media-card__media">
                                          <img src="/images/post-images/post-img-12.jpg" alt="Post Image"/>
                                        </div>
                                        <div className="creator-media-card__overlay">
                                          <div className="creator-media-card__stats">

                                            <div className="creator-media-card__stats-btn wishlist-icon">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none">
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                              </svg>
                                              <span> 13 </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="creator-media-card__desc">
                                        <p>
                                          Today, I experienced the most blissful
                                          ride outside.
                                        </p>
                                      </div>
                                      <div className="creator-media-card__btn">
                                        <a href="#" className="btn-txt-gradient btn-outline">
                                          <svg className="only-fill-hover-effect" xmlns="http://www.w3.org/2000/svg"
                                            width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path
                                              d="M10.001 0.916992C12.2126 0.916992 13.7238 1.51554 14.6475 2.66211C15.5427 3.77366 15.751 5.24305 15.751 6.66699V7.66895C16.6879 7.79136 17.4627 8.06745 18.0312 8.63574C18.8947 9.49918 19.0849 10.8389 19.085 12.5V14.166C19.085 15.8272 18.8946 17.1668 18.0312 18.0303C17.1677 18.8935 15.8291 19.083 14.168 19.083H5.83496C4.17365 19.083 2.83421 18.8938 1.9707 18.0303C1.10735 17.1668 0.917969 15.8272 0.917969 14.166V12.5C0.917997 10.8389 1.10726 9.49918 1.9707 8.63574C2.53913 8.06742 3.31408 7.79232 4.25098 7.66992V6.66699C4.25098 5.24305 4.45925 3.77366 5.35449 2.66211C6.27812 1.51554 7.78932 0.916992 10.001 0.916992ZM5.83496 9.08301C4.1632 9.08301 3.4178 9.30991 3.03125 9.69629C2.64478 10.0828 2.418 10.8282 2.41797 12.5V14.166C2.41797 15.8378 2.64487 16.5832 3.03125 16.9697C3.41774 17.3562 4.16293 17.583 5.83496 17.583H14.168C15.8395 17.583 16.5841 17.356 16.9707 16.9697C17.3571 16.5832 17.585 15.8378 17.585 14.166V12.5C17.5849 10.8282 17.3572 10.0828 16.9707 9.69629C16.5841 9.3101 15.8393 9.08301 14.168 9.08301H5.83496ZM10.001 10.5C11.5657 10.5 12.8348 11.7684 12.835 13.333C12.835 14.8978 11.5658 16.167 10.001 16.167C8.43632 16.1668 7.16797 14.8977 7.16797 13.333C7.16814 11.7685 8.43643 10.5002 10.001 10.5ZM10.001 12C9.26486 12.0002 8.66814 12.5969 8.66797 13.333C8.66797 14.0693 9.26475 14.6668 10.001 14.667C10.7374 14.667 11.335 14.0694 11.335 13.333C11.3348 12.5968 10.7372 12 10.001 12ZM10.001 2.41699C8.04601 2.41699 7.05717 2.93971 6.52246 3.60352C5.95984 4.30235 5.75098 5.33302 5.75098 6.66699V7.58398C5.77888 7.58387 5.80687 7.58301 5.83496 7.58301H14.168C14.1957 7.58301 14.2234 7.58388 14.251 7.58398V6.66699C14.251 5.33302 14.0421 4.30235 13.4795 3.60352C12.9448 2.93971 11.9559 2.41699 10.001 2.41699Z"
                                              fill="url(#paint0_linear_745_155)"></path>
                                            <defs>
                                              <linearGradient id="paint0_linear_745_155" x1="1.99456" y1="0.916991"
                                                x2="26.1808" y2="6.81415" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FECE26"></stop>
                                                <stop offset="1" stop-color="#E5741F"></stop>
                                              </linearGradient>
                                            </defs>
                                          </svg>
                                          <span>$12.00</span>
                                        </a>
                                      </div>
                                    </div>
                                    <div className="creator-media-card card">
                                      <div className="creator-media-card__media-wrapper">
                                        <div className="creator-media-card__media">
                                          <img src="/images/post-images/post-img-10.jpg" alt="Post Image"/>
                                        </div>
                                        <div className="creator-media-card__overlay">
                                          <div className="creator-media-card__stats">

                                            <div className="creator-media-card__stats-btn wishlist-icon">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none">
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path
                                                  d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                                <path d="M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999"
                                                  stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                  stroke-linejoin="round"></path>
                                              </svg>
                                              <span> 13 </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="creator-media-card__desc">
                                        <p>
                                          Today, I experienced the most blissful
                                          ride outside.
                                        </p>
                                      </div>
                                      <div className="creator-media-card__btn">
                                        <a href="#" className="btn-txt-gradient btn-outline grey-variant">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            viewBox="0 0 20 20" fill="none">
                                            <path
                                              d="M13.9173 15.8167H6.08399C5.73399 15.8167 5.34232 15.5417 5.22565 15.2083L1.77565 5.55834C1.28399 4.17501 1.85899 3.75001 3.04232 4.60001L6.29232 6.92501C6.83399 7.30001 7.45065 7.10834 7.68399 6.50001L9.15065 2.59167C9.61732 1.34167 10.3923 1.34167 10.859 2.59167L12.3257 6.50001C12.559 7.10834 13.1757 7.30001 13.709 6.92501L16.759 4.75001C18.059 3.81667 18.684 4.29168 18.1507 5.80001L14.784 15.225C14.659 15.5417 14.2673 15.8167 13.9173 15.8167Z"
                                              stroke="url(#paint0_linear_745_209)" stroke-width="1.5"
                                              stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M5.41602 18.3333H14.5827" stroke="url(#paint1_linear_745_209)"
                                              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M7.91602 11.6667H12.0827" stroke="url(#paint2_linear_745_209)"
                                              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <defs>
                                              <linearGradient id="paint0_linear_745_209" x1="9.9704" y1="1.65417"
                                                x2="9.9704" y2="15.8167" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                              <linearGradient id="paint1_linear_745_209" x1="9.99935" y1="18.3333"
                                                x2="9.99935" y2="19.3333" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                              <linearGradient id="paint2_linear_745_209" x1="9.99935" y1="11.6667"
                                                x2="9.99935" y2="12.6667" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFCD84"></stop>
                                                <stop offset="1" stop-color="#FEA10A"></stop>
                                              </linearGradient>
                                            </defs>
                                          </svg>
                                          <span>For Subscribers</span>
                                        </a>
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


            </div>
          </main>
        </div>
  )
}

export default StorePage