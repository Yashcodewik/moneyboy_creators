import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export default function FeaturedContentSlider() {
  return (
    <Swiper modules={[Navigation, Pagination]} spaceBetween={20} slidesPerView={3} navigation pagination={{ clickable: true }} breakpoints={{
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="swiper"
    >
      {/* Slide 1 */}
      <SwiperSlide>
        <div className="featured-content-premium-card">
          <div className="featured-content-premium-card-container">

            <div className="featured-content-bg-img">
              <img
                src="/images/profile-avatars/profile-avatar-21.jpg"
                alt="Featured Content"
              />
            </div>

            <div className="featured-premium-card-content-container">
              <div className="featured-premium-card-content">

                <div className="featured-premium-card-icons">
                  <div className="featured-premium-card-icon wishlist-icon">
                    ❤️ <span>13</span>
                  </div>
                </div>

                <h5>Featured contents</h5>
                <p>Today, I experienced the most blissful ride outside.</p>

                <a href="#" className="btn-txt-gradient btn-outline">
                  <span>$12.00</span>
                </a>

              </div>
            </div>

          </div>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <div className="featured-content-premium-card">
          <div className="featured-content-premium-card-container">

            <div className="featured-content-bg-img">
              <img
                src="/images/profile-avatars/profile-avatar-22.jpg"
                alt="Featured Content"
              />
            </div>

            <div className="featured-premium-card-content-container">
              <div className="featured-premium-card-content">

                <div className="featured-premium-card-icons">
                  <div className="featured-premium-card-icon wishlist-icon">
                    ❤️ <span>13</span>
                  </div>
                </div>

                <h5>Featured contents</h5>
                <p>Today, I experienced the most blissful ride outside.</p>

                <a
                  href="#"
                  className="btn-txt-gradient btn-outline grey-variant"
                >
                  <span>For Subscribers</span>
                </a>

              </div>
            </div>

          </div>
        </div>
      </SwiperSlide>

      {/* Slide 3 */}
      <SwiperSlide>
        <div className="featured-content-premium-card">
          <div className="featured-content-premium-card-container">

            <div className="featured-content-bg-img">
              <img
                src="/images/profile-avatars/profile-avatar-21.jpg"
                alt="Featured Content"
              />
            </div>

            <div className="featured-premium-card-content-container">
              <div className="featured-premium-card-content">

                <div className="featured-premium-card-icons">
                  <div className="featured-premium-card-icon wishlist-icon">
                    ❤️ <span>13</span>
                  </div>
                </div>

                <h5>Featured contents</h5>
                <p>Today, I experienced the most blissful ride outside.</p>

                <a href="#" className="btn-txt-gradient btn-outline">
                  <span>$12.00</span>
                </a>

              </div>
            </div>

          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
