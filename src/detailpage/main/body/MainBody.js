import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import NavInfo from './component/navContent/Info/Info.js';
import NavPlace from './component/navContent/place/place.js';

import './MainBody.css';

const MainBody = () => {
    // 데이터 불러오기
    const detail = useSelector((state) => state.details.detail);
    const status = useSelector((state) => state.details.status);
    const error = useSelector((state) => state.details.error);
    
    // 네비게이션 선택
    const [activeNav, setActiveNav] = useState('INFO');

    // 네비게이션 선택 이벤트 함수
    const navClick = (target) => {
        setActiveNav(target);
    };

    // detail 값 확인 > 값이 하나라도 있는 지 확인
    const hasInfoData = detail.basic_info || detail.event_description || detail.agency_info;
    const hasPlaceData = detail.venue || detail.address;
    
    // 모든 데이터가 없으면 null을 반환하여 컴포넌트를 렌더링하지 않음
    if (!hasInfoData && !hasPlaceData) {
        return null;
    }

    if(status === 'loading') {
        return <div>Loading...</div>;
    }

    if(status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div id='productMainBody' className='productMainBody'>
            {/* 네비게이션 바 */}
            <nav className="nav">
                <h3 className="blind">네비게이션</h3>
                <ul className="navList">
                    {hasInfoData && (
                        <li className={`navItem ${activeNav === 'INFO' ? 'is-active' : ''}`}>
                            <a className="navLink" href="#" onClick={() => navClick('INFO')}>공연정보</a>
                        </li>
                    )}
                    {hasPlaceData && (
                        <li className={`navItem ${activeNav === 'PLACE' ? 'is-active' : ''}`}>
                            <a className="navLink" href="#" onClick={() => navClick('PLACE')}>공연장 정보</a>
                        </li>
                    )}
                </ul>
            </nav>

            {/* 선택된 navlink에 따라 변경 */}
            <div>
                {activeNav === 'INFO' && hasInfoData && <NavInfo />}
                {activeNav === 'PLACE' && hasPlaceData && <NavPlace />}
            </div>

        </div>
    );
};

export default MainBody;