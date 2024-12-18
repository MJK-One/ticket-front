import React, { useState, useEffect } from 'react';
import './mainTop.css';
import { Link } from 'react-router-dom';
import moment from 'moment'; // 날짜 변환
import 'moment/locale/ko'; // 한국어 로케일 import
import "moment-duration-format";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

export default function MainTop({ top10Tickets }) { 
  const [enableNavigation, setEnableNavigation] = useState(true);
  const [textColors, setTextColors] = useState({});
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1000);

  // 창 크기 width 1000 기준으로 Enable 활성화 여부 및 화면 크기 상태 업데이트
  useEffect(() => { 
    const updateScreenSize = () => {
      const isSmall = window.innerWidth <= 1000;
      setEnableNavigation(!isSmall);
      setIsSmallScreen(isSmall);
    };

    updateScreenSize(); // 컴포넌트 마운트 시 실행
    window.addEventListener('resize', updateScreenSize); // 윈도우 크기 변경 시 실행

    return () => window.removeEventListener('resize', updateScreenSize); // 컴포넌트 언마운트 시 이벤트 리스너 제거
  }, []);

  // 스와이퍼 개수 설정
  const [slidesPerView, setSlidesPerView] = useState(5); // 기본값 5
  useEffect(() => {
    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      if (width >= 1420) {
        setSlidesPerView(5);
      } else if (width >= 1000) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(1);
      }
    };

    updateSlidesPerView(); // 초기 실행
    window.addEventListener('resize', updateSlidesPerView); // 크기 변경 시 실행

    return () => window.removeEventListener('resize', updateSlidesPerView); // 컴포넌트 언마운트 시 리스너 제거
  }, []);



  //
  useEffect(() => {
    if (isSmallScreen) {
      top10Tickets.forEach(ticket => {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // CORS 문제를 피하기 위해 설정
        img.src = ticket.image_url || "/img/normal_poster.png";
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const data = imageData.data;
          let totalBrightness = 0;

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const brightness = (r + g + b) / 3;
            totalBrightness += brightness;
          }

          const avgBrightness = totalBrightness / (data.length / 4);
          const textColor = avgBrightness < 128 ? 'white' : 'black';

          setTextColors(prevColors => ({
            ...prevColors,
            [ticket.id]: textColor
          }));
        };
      });
    }
  }, [top10Tickets, isSmallScreen]);

  return (
    <div className='maintop-con'>
      <Swiper // Swiper Module Setting
        modules={[Navigation, Autoplay]}
        centeredSlides={true}
        loop={true}
        autoplay={true}
        allowTouchMove={false}
        navigation={enableNavigation ? {
          nextEl: '.custom-next', // 커스텀 next 버튼
          prevEl: '.custom-prev'  // 커스텀 prev 버튼
        } : false} // 화면 크기에 따라 버튼 활성화 여부 제어
        className="maintop-con-sw"
        slidesPerView={slidesPerView} // 동적으로 관리되는 slidesPerView 사용
        breakpoints={{
          1000: {
            spaceBetween: 10,
            allowTouchMove: false,
          },
          200: {
            spaceBetween: 0,
            allowTouchMove: true,
          },
        }}
      >
        {top10Tickets.map(tticket => (
          <SwiperSlide key={tticket.id}>
            <Link to={`/detail/${tticket.id}`}>
              <div className='poster'>
                <div className='poster-img'>
                  <img src={tticket.image_url || "/img/normal_poster.png"} alt={`${tticket.event_name} 이미지`} />
                </div>
                <div className='poster-info'>
                  <div className='poster-info-cl'>{tticket.genre}</div>
                  <div className='poster-info-title'>{tticket.event_name}</div>
                  <div className='poster-info-day'>{moment(tticket.ticket_open_date).locale('ko').format('M.DD(ddd) HH:mm')}</div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}

        {enableNavigation && (
          <>
          <div className="custom-prev">
            <img src="/img/icon/swiper/prev_btn.png" alt="이전" />
          </div>
          <div className="custom-next">
            <img src="/img/icon/swiper/after_btn.png" alt="다음" />
          </div>
          </>
        )}
        

      </Swiper>
    </div>
  );
};
