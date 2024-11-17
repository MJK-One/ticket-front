import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import './search.css';

import Filter from './filter/filter';
import Ticektlist from './TicketList/ticketlist';
import Header from '../component/header/home/header';
import MobileSearchHeader from '../component/header/search/MobileSearchHeader';
import MobileNav from '../component/header/mobileNav/MobileNav';
import ScrollButtons from '../component/scrollBtn/scrollButtons';

function Search() {
    // 화면 크기 체크 함수
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /*  */
    const status = useSelector((state) => state.searchs.status); // 로딩 상태
    const scrollPositionRef = useRef(0); // 스크롤 위치

    // 스크롤 위치 저장 로직
    useEffect(() => {
        const handleScroll = () => {
        if (status !== 'loading') {
            scrollPositionRef.current = window.scrollY;
        }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, [status]); // status를 의존성으로 추가해 상태 변화 시 효과 적용

    // 로딩 후 스크롤 위치 복원
    useEffect(() => {
        if (status === 'succeeded') {
        window.scrollTo({
            top: scrollPositionRef.current,
            behavior: 'auto',
        });
        }
    }, [status]);

    return (
        <>
            {/* 헤더 */}
            {windowWidth > 1100 && <Header />}
            {windowWidth <= 1100 && <MobileSearchHeader />}

            <main id="search-content">
                <div className="search-container">
                    {windowWidth > 1400 && (
                        <div id='search-side' className='search-side'>
                            {/* sticky(스크롤하다가 특정 위치가 되면 fixed) */}
                            <div className='stickyWrap'>
                                <Filter />
                            </div>
                        </div>
                    )}

                    {windowWidth <= 1400 && (
                        <Filter />
                    )}
                    
                    <div className="tickets">
                        <Ticektlist />
                    </div>
                </div>

                <ScrollButtons />
            </main>

            {/* 모바일 nav */}
            {windowWidth <= 1100 && <MobileNav />}
        </>
    ); 
}    

export default Search;