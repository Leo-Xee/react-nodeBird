import React from "react";
import PropTypes from "prop-types";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";

function PostImages({ images }) {
  return (
    <Swiper modules={[Navigation]} navigation>
      {images.map((image, idx) => (
        <SwiperSlide key={idx}>
          <img src={image.src} height="400px" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

PostImages.proptypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
    }),
  ).isRequired,
};

export default PostImages;
