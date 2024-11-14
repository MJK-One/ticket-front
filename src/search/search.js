import React, { useEffect, useState } from 'react';
import './search.css';

import Filter from './filter/filter';
import Ticektlist from './TicketList/ticketlist';
import Header from '../component/header/home/header';
import MobileSearchHeader from '../component/header/search/MobileSearchHeader';
import MobileNav from '../component/header/mobileNav/MobileNav';

function Search() {
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
            </main>

            {/* 모바일 nav */}
            {windowWidth <= 1100 && <MobileNav />}
        </>
    ); 
}    

export default Search;