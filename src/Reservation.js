import React, { useEffect, useState } from 'react';
import Header from './component/header/home/header';
import MobileDetailHeader from './component/header/detail/MobileDetailHeader';
import { createReservation } from './api/connect'; // api.js 파일에서 함수 임포트

const ReservationForm = () => {
    const [email, setEmail] = useState('');
    const [ticketDate, setTicketDate] = useState('');
    const [notificationHours, setNotificationHours] = useState(1); // 기본값 1시간

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ticketDate를 UTC 형식으로 변환
        const reservation = {
            email,
            // 'Z'를 추가하여 UTC로 설정
            ticketOpenDate: new Date(ticketDate + "Z").toISOString(), // ISO 형식으로 변환
            notificationHours
        };
        
        try {
            const createdReservation = await createReservation(reservation);
            alert('예약이 완료되었습니다: ' + createdReservation.id);
        } catch (error) {
            alert('예약 생성 실패: ' + error.message);
        }
    };

    // 화면 크기 체크 함수
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {/* 헤더 */}
            {windowWidth > 1100 && <Header />}
            {windowWidth <= 1100 && <MobileDetailHeader />}

            <form onSubmit={handleSubmit} style={ windowWidth <= 1100 ? { marginTop: '50px'}  : {marginTop: '10px'}}>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="이메일" 
                    required 
                />
                <input 
                    type="datetime-local" 
                    value={ticketDate} 
                    onChange={(e) => setTicketDate(e.target.value)} 
                    required 
                />
                <input 
                    type="number" 
                    value={notificationHours} 
                    onChange={(e) => setNotificationHours(e.target.value)} 
                    placeholder="알림 시간(시간)" 
                    min="1" // 최소 1시간
                    required 
                />
                <button type="submit">예약하기</button>
            </form>

        </>
    );
};

export default ReservationForm;
