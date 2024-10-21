import React, { useState, useEffect } from 'react';
import MainTop from '../componet/mainTop'; // MainTop import 추가
import Sitemenu from './sitemenu';
import Header from '../../component/header/home/header';
import MobileGenreHeader from '../../component/header/genre/MobileGenreHeader';
import MobileNav from '../../component/header/mobileNav/MobileNav';
import './genre.css';
import { getGenre, getTop10ByGenre } from '../../api/connect';
import { useLocation } from 'react-router-dom';

function Genre() {
    const [tickets, setTickets] = useState([]); // tickets 상태를 추가
    const [top10Tickets, setTopTickets] = useState([]); // topTickets 상태 추가
    const location = useLocation(); // 현재 경로를 가져옵니다

    // 경로에 따라 장르를 결정하는 함수
    const getGenreFromPath = (path) => {
        switch(path) {
            case '/genre/musicall':
                return '뮤지컬연극';
            case '/genre/consert':
                return '콘서트';
            case '/genre/exhibitionevent':
                return '전시행사';
            case '/genre/classic':
                return '클래식';
            default:
                return ''; // 기본 경로는 전체 데이터를 가져옵니다
        }
    };

    // 컴포넌트가 마운트될 때 getgenre() 함수를 호출하여 데이터를 불러옵니다.
    useEffect(() => {
        // 데이터를 비동기적으로 불러옵니다.
        const fetchData = async () => {
            try {
                let result = [];
                let topResult = [];
                const genre = getGenreFromPath(location.pathname);
                if (genre) {
                    result = await getGenre(genre); // 특정 장르 데이터 호출
                    topResult = await getTop10ByGenre(genre); // 특정 장르의 상위 10개 데이터 호출
                } 
                setTickets(result); // 결과를 tickets 상태에 저장
                setTopTickets(topResult); // 결과를 topTickets 상태에 저장
            } catch (error) {
                console.error('데이터를 불러오는 데 실패했습니다.', error);
            }
        };

        fetchData();
    }, [location.pathname]); // 경로가 변경될 때마다 데이터를 다시 불러옵니다

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
            {windowWidth <= 1100 && <MobileGenreHeader />}

            <main id="contents">
                <section className='maintop'>
                    <MainTop top10Tickets={top10Tickets} /> {/* MainTop에 topTickets 전달 */}
                </section>
                <section className='sales_site'>
                    <Sitemenu tickets={tickets} />
                </section>
            </main>

            {/* 모바일 nav */}
            {windowWidth <= 1100 && <MobileNav />}
        </>
    );   
}

export default Genre;
