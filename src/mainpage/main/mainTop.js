import React, { useState, useEffect } from 'react';
import './mainTop.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

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
  const [enableNavigation, setEnableNavigation] = useState(true);

  //창 크기 width 1000기준으로 Enable 활성화 여부
  useEffect(() => { 
    const updateNavigation = () => {
      if (window.innerWidth <= 1000) {
        setEnableNavigation(false);
      } else {
        setEnableNavigation(true);
      }
    };

    updateNavigation(); // 컴포넌트 마운트 시 실행
    window.addEventListener('resize', updateNavigation); // 윈도우 크기 변경 시 실행

    return () => window.removeEventListener('resize', updateNavigation); // 컴포넌트 언마운트 시 이벤트 리스너 제거
  }, []);

  return (
    <div className='maintop-con'>
      <Swiper //Swiper Module Setting
        modules={[Navigation, Autoplay]}
        centeredSlides={true}
        loop={true}
        autoplay={true}
        allowTouchMove={false}
        navigation={enableNavigation} // 조건부 navigation 활성화
        className="maintop-con-sw"
        breakpoints={{
          1200: {
            slidesPerView: 5,
            spaceBetween: 10,
            allowTouchMove : false,
          },
          200: {
            slidesPerView: 1,
            spaceBetween: 0,
            allowTouchMove : true,
          },
        }}
      >
        {slidesData.map(slide => (
          <SwiperSlide key={slide.id}>
            <div className='poster'>
              <div className='poster-img'>{slide.img}</div>
              <div className='poster-info'>
                  <div className='poster-info-cl'>종류</div>
                  <div className='poster-info-title'>{slide.name}</div>
                  <div className='poster-info-day'>2024.04.12</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
