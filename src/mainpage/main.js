import React from 'react';
import './main.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

function Main() {
    return (
        <main id="contents">
            <section className="swiper">
                <Swiper
                    modules={[Autoplay, Navigation]}
                    spaceBetween={50}
                    slidesPerView={6}
                    navigation
                    centeredSlides={true} // 슬라이드를 중앙 정렬
                    centeredSlidesBounds={true} // 중앙 정렬된 슬라이드가 뷰포트 경계에 도달할 때까지 슬라이드 정렬
                    onSlideChange={() => {}}
                    onSwiper={(swiper) => {}}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                >        
                        <SwiperSlide>0</SwiperSlide>
                        <SwiperSlide>1</SwiperSlide>
                        <SwiperSlide>2</SwiperSlide>
                        <SwiperSlide>3</SwiperSlide>
                        <SwiperSlide>4</SwiperSlide>
                        <SwiperSlide>5</SwiperSlide>
                        <SwiperSlide>6</SwiperSlide>
                        <SwiperSlide>7</SwiperSlide>
                        <SwiperSlide>8</SwiperSlide>
                        <SwiperSlide>9</SwiperSlide>
                </Swiper>
            </section>
        </main>
    ); 
}    

export default Main;