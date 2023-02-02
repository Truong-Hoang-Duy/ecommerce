import styled from 'styled-components';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';

const HomeBannerStyles = styled.div`
  padding: 60px 0;
  max-height: 520px;
  .swiper-container {
    width: 100%;
    max-height: 520px;
  }
  .swiper-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log('slide change')}
        >
          <SwiperSlide>
            <div className="swiper-container">
              <img
                src="https://icms-image.slatic.net/images/ims-web/9f395165-5b2e-4f55-af3a-e98b50babd3c.jpg"
                alt=""
                className="swiper-img"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-container">
              <img
                src="https://lzd-img-global.slatic.net/g/icms/images/ims-web/6d37f1f7-bcf8-44e0-a577-511b63adfc29.jpg_2200x2200q90.jpg_.webp"
                alt=""
                className="swiper-img"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-container">
              <img
                src="https://lzd-img-global.slatic.net/g/icms/images/ims-web/0b6ec95d-f2b4-4caf-b3da-adfa905992d5.jpg_2200x2200q90.jpg_.webp"
                alt=""
                className="swiper-img"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-container">
              <img
                src="https://lzd-img-global.slatic.net/g/icms/images/ims-web/4ddb8308-c227-4d03-8fb4-749ea7790478.jpg_2200x2200q90.jpg_.webp"
                alt=""
                className="swiper-img"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
