import React, { useState, useEffect } from 'react';
import './mainTop.css';
import { Link } from 'react-router-dom';
import moment from 'moment'; //날짜 변환
import 'moment/locale/ko'; // 한국어 로케일 import
import "moment-duration-format";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

export default function MainTop({ top10Tickets }) { 
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
          1000: {
            slidesPerView: 5,
            spaceBetween: 10,
            allowTouchMove: false
          },
          200: {
            slidesPerView: 1,
            spaceBetween: 0,
            allowTouchMove: true
          },
        }}
      >
        {top10Tickets.map(tticket => (
          <SwiperSlide key={tticket.id}>
            <Link to={`/detail/${tticket.id}`}>
            <div className='poster'>
              <div className='poster-img'><img src={tticket.image_url} alt={`${tticket.event_name} 이미지`} /></div>
              <div className='poster-info'>
                  <div className='poster-info-cl'>종류</div>
                  <div className='poster-info-title'>{tticket.event_name}</div>
                  <div className='poster-info-day'>{moment(tticket.ticket_open_date).locale('ko').format('M.DD(ddd) HH:mm')}</div>
              </div>
            </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
