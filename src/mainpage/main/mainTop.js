import React from 'react';
import './mainTop.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Autoplay} from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'

const slidesData = [
  { id: 1, img: '이미지1', name: '이름1' },
  { id: 2, img: '이미지2', name: '이름2' },
  { id: 3, img: '이미지3', name: '이름3' },
  { id: 4, img: '이미지4', name: '이름4' },
  { id: 5, img: '이미지5', name: '이름5' },
  { id: 6, img: '이미지6', name: '이름6' },
  { id: 7, img: '이미지7', name: '이름7' },
  { id: 8, img: '이미지8', name: '이름8' },
  { id: 9, img: '이미지9', name: '이름9' },
];

export default function MainTop() {
  return (
    <div className='maintop-con'>
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={5}
        spaceBetween={10}
        centeredSlides={true}
        loop={true}
        autoplay={true}
        allowTouchMove={false}
        navigation={true}
        className="maintop-con-sw"
      >
        {slidesData.map(slide => (
          <SwiperSlide key={slide.id}>
            <div className='poster'>
              <div className='poster-img'>{slide.img}</div>
              <div className='poster-info'>{slide.name}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    );
  }
