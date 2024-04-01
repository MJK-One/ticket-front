import React from 'react';
import './basic-swiper.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';

const BasicSwiper = () => (
        <Swiper
            modules={[Navigation]}
            slidesPerView={'auto'}
            spaceBetween={10}
            slidesOffsetBefore={0}
            slidesOffsetAfter={0}
            navigation
            className="basicSwiper"
            centeredSlides={false}
            loop={false}
            simulateTouch={false}
        >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
);

export default BasicSwiper;