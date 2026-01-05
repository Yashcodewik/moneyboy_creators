"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

export default function FeaturedContentSlider() {
  return (
    <Swiper spaceBetween={16} slidesPerView={2}
    breakpoints={{
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 2 },
    }}>
      <SwiperSlide>
        <div className="featured-content-premium-card">
          <div className="featured-content-premium-card-container">
            <div className="featured-content-bg-img">
              <img src="/images/profile-avatars/profile-avatar-21.jpg" alt="Featured Content BG Image"/>
            </div>
            <div className="featured-premium-card-content-container">
              <div className="featured-premium-card-content">
                <div className="featured-premium-card-icons">
                  <div className="featured-premium-card-icon wishlist-icon">
                    <svg className="icons wishlist wishlist-icon white"/>
                    <span>13</span>
                  </div>
                </div>
                <h5>Featured contents</h5>
                <p>Today, I experienced the most blissful ride outside.{" "}</p>
                <Link href="#" className="btn-txt-gradient btn-outline">
                  <svg className="only-fill-hover-effect" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10.001 0.916992C12.2126 0.916992 13.7238 1.51554 14.6475 2.66211C15.5427 3.77366 15.751 5.24305 15.751 6.66699V7.66895C16.6879 7.79136 17.4627 8.06745 18.0312 8.63574C18.8947 9.49918 19.0849 10.8389 19.085 12.5V14.166C19.085 15.8272 18.8946 17.1668 18.0312 18.0303C17.1677 18.8935 15.8291 19.083 14.168 19.083H5.83496C4.17365 19.083 2.83421 18.8938 1.9707 18.0303C1.10735 17.1668 0.917969 15.8272 0.917969 14.166V12.5C0.917997 10.8389 1.10726 9.49918 1.9707 8.63574C2.53913 8.06742 3.31408 7.79232 4.25098 7.66992V6.66699C4.25098 5.24305 4.45925 3.77366 5.35449 2.66211C6.27812 1.51554 7.78932 0.916992 10.001 0.916992ZM5.83496 9.08301C4.1632 9.08301 3.4178 9.30991 3.03125 9.69629C2.64478 10.0828 2.418 10.8282 2.41797 12.5V14.166C2.41797 15.8378 2.64487 16.5832 3.03125 16.9697C3.41774 17.3562 4.16293 17.583 5.83496 17.583H14.168C15.8395 17.583 16.5841 17.356 16.9707 16.9697C17.3571 16.5832 17.585 15.8378 17.585 14.166V12.5C17.5849 10.8282 17.3572 10.0828 16.9707 9.69629C16.5841 9.3101 15.8393 9.08301 14.168 9.08301H5.83496ZM10.001 10.5C11.5657 10.5 12.8348 11.7684 12.835 13.333C12.835 14.8978 11.5658 16.167 10.001 16.167C8.43632 16.1668 7.16797 14.8977 7.16797 13.333C7.16814 11.7685 8.43643 10.5002 10.001 10.5ZM10.001 12C9.26486 12.0002 8.66814 12.5969 8.66797 13.333C8.66797 14.0693 9.26475 14.6668 10.001 14.667C10.7374 14.667 11.335 14.0694 11.335 13.333C11.3348 12.5968 10.7372 12 10.001 12ZM10.001 2.41699C8.04601 2.41699 7.05717 2.93971 6.52246 3.60352C5.95984 4.30235 5.75098 5.33302 5.75098 6.66699V7.58398C5.77888 7.58387 5.80687 7.58301 5.83496 7.58301H14.168C14.1957 7.58301 14.2234 7.58388 14.251 7.58398V6.66699C14.251 5.33302 14.0421 4.30235 13.4795 3.60352C12.9448 2.93971 11.9559 2.41699 10.001 2.41699Z" fill="url(#paint0_linear_745_155)"/>
                    <defs>
                      <linearGradient id="paint0_linear_745_155" x1="1.99456" y1="0.916991" x2="26.1808" y2="6.81415" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FECE26" />
                        <stop offset="1" stopColor="#E5741F"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span>$12.00</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="featured-content-premium-card">
          <div className="featured-content-premium-card-container">
            <div className="featured-content-bg-img">
              <img src="/images/profile-avatars/profile-avatar-22.jpg" alt="Featured Content BG Image"/>
            </div>
            <div className="featured-premium-card-content-container">
              <div className="featured-premium-card-content">
                <div className="featured-premium-card-icons">
                  <div className="featured-premium-card-icon wishlist-icon">
                    <svg className="icons wishlist wishlist-icon white"/>
                    <span>13</span>
                  </div>
                </div>
                <h5>Featured contents</h5>
                <p>Today, I experienced the most blissful ride outside.{" "}</p>
                <Link href="#" className="btn-txt-gradient btn-outline grey-variant">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M13.9173 15.8167H6.08399C5.73399 15.8167 5.34232 15.5417 5.22565 15.2083L1.77565 5.55834C1.28399 4.17501 1.85899 3.75001 3.04232 4.60001L6.29232 6.92501C6.83399 7.30001 7.45065 7.10834 7.68399 6.50001L9.15065 2.59167C9.61732 1.34167 10.3923 1.34167 10.859 2.59167L12.3257 6.50001C12.559 7.10834 13.1757 7.30001 13.709 6.92501L16.759 4.75001C18.059 3.81667 18.684 4.29168 18.1507 5.80001L14.784 15.225C14.659 15.5417 14.2673 15.8167 13.9173 15.8167Z" stroke="url(#paint0_linear_745_209)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M5.41602 18.3333H14.5827" stroke="url(#paint1_linear_745_209)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M7.91602 11.6667H12.0827" stroke="url(#paint2_linear_745_209)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <defs>
                      <linearGradient id="paint0_linear_745_209" x1="9.9704" y1="1.65417" x2="9.9704" y2="15.8167" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FFCD84"></stop> <stop offset="1" stop-color="#FEA10A"></stop>
                      </linearGradient>
                      <linearGradient id="paint1_linear_745_209" x1="9.99935" y1="18.3333" x2="9.99935" y2="19.3333" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FFCD84"></stop> <stop offset="1" stop-color="#FEA10A"></stop>
                      </linearGradient>
                      <linearGradient id="paint2_linear_745_209" x1="9.99935" y1="11.6667" x2="9.99935" y2="12.6667" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FFCD84"></stop> <stop offset="1" stop-color="#FEA10A"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span>For Subscribers</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="featured-content-premium-card">
          <div className="featured-content-premium-card-container">
            <div className="featured-content-bg-img">
              <img src="/images/profile-avatars/profile-avatar-21.jpg" alt="Featured Content BG Image"/>
            </div>
            <div className="featured-premium-card-content-container">
              <div className="featured-premium-card-content">
                <div className="featured-premium-card-icons">
                  <div className="featured-premium-card-icon wishlist-icon">
                    <svg className="icons wishlist wishlist-icon white"/>
                    <span>13</span>
                  </div>
                </div>
                <h5>Featured contents</h5>
                <p>Today, I experienced the most blissful ride outside.{" "}</p>
                <Link href="#" className="btn-txt-gradient btn-outline">
                  <svg className="only-fill-hover-effect" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10.001 0.916992C12.2126 0.916992 13.7238 1.51554 14.6475 2.66211C15.5427 3.77366 15.751 5.24305 15.751 6.66699V7.66895C16.6879 7.79136 17.4627 8.06745 18.0312 8.63574C18.8947 9.49918 19.0849 10.8389 19.085 12.5V14.166C19.085 15.8272 18.8946 17.1668 18.0312 18.0303C17.1677 18.8935 15.8291 19.083 14.168 19.083H5.83496C4.17365 19.083 2.83421 18.8938 1.9707 18.0303C1.10735 17.1668 0.917969 15.8272 0.917969 14.166V12.5C0.917997 10.8389 1.10726 9.49918 1.9707 8.63574C2.53913 8.06742 3.31408 7.79232 4.25098 7.66992V6.66699C4.25098 5.24305 4.45925 3.77366 5.35449 2.66211C6.27812 1.51554 7.78932 0.916992 10.001 0.916992ZM5.83496 9.08301C4.1632 9.08301 3.4178 9.30991 3.03125 9.69629C2.64478 10.0828 2.418 10.8282 2.41797 12.5V14.166C2.41797 15.8378 2.64487 16.5832 3.03125 16.9697C3.41774 17.3562 4.16293 17.583 5.83496 17.583H14.168C15.8395 17.583 16.5841 17.356 16.9707 16.9697C17.3571 16.5832 17.585 15.8378 17.585 14.166V12.5C17.5849 10.8282 17.3572 10.0828 16.9707 9.69629C16.5841 9.3101 15.8393 9.08301 14.168 9.08301H5.83496ZM10.001 10.5C11.5657 10.5 12.8348 11.7684 12.835 13.333C12.835 14.8978 11.5658 16.167 10.001 16.167C8.43632 16.1668 7.16797 14.8977 7.16797 13.333C7.16814 11.7685 8.43643 10.5002 10.001 10.5ZM10.001 12C9.26486 12.0002 8.66814 12.5969 8.66797 13.333C8.66797 14.0693 9.26475 14.6668 10.001 14.667C10.7374 14.667 11.335 14.0694 11.335 13.333C11.3348 12.5968 10.7372 12 10.001 12ZM10.001 2.41699C8.04601 2.41699 7.05717 2.93971 6.52246 3.60352C5.95984 4.30235 5.75098 5.33302 5.75098 6.66699V7.58398C5.77888 7.58387 5.80687 7.58301 5.83496 7.58301H14.168C14.1957 7.58301 14.2234 7.58388 14.251 7.58398V6.66699C14.251 5.33302 14.0421 4.30235 13.4795 3.60352C12.9448 2.93971 11.9559 2.41699 10.001 2.41699Z" fill="url(#paint0_linear_745_155)"/>
                    <defs>
                      <linearGradient id="paint0_linear_745_155" x1="1.99456" y1="0.916991" x2="26.1808" y2="6.81415" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FECE26" />
                        <stop offset="1" stopColor="#E5741F"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span>$12.00</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
