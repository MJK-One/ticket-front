import React, { useState } from 'react';

import NavInfo from './component/navContent/Info/Info.js';
//import NavReview from './component/navContent/Review/Review.js';

import './MainBody.css';

const MainBody = () => {
    //네비게이션 선택
    const [activeNav, setActiveNav] = useState('INFO');

    //네비게이션 선택 이벤트 함수
    const navClick = (target) => {
        setActiveNav(target);
    };

    return (
        <div id='productMainBody' className='productMainBody'>
            {/* 네비게이션 바 */}
            <nav className="nav">
                <h3 className="blind">네비게이션</h3>
                <ul className="navList">
                    <li className={`navItem ${activeNav === 'INFO' ? 'is-active' : ''}`}>
                        <a className="navLink" href="#" onClick={() => navClick('INFO')}>공연정보</a>
                    </li>
                    {/* 시간 남으면 공연장 정보도 추가하면 좋을듯(네이버 지도 api) */}
                </ul>
            </nav>

            {/* 선택된 navliink에 따라 변경 */}
            <div>
                {activeNav === 'INFO' && <NavInfo />}
            </div>

        </div>
        
    );
};

export default MainBody;