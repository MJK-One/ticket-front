import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './MobileNav.css';

const MobileNav = () => {
    return (
        <nav className='mobile-nav'>
            <Link to="/" className="mobile-nav-a">
                <img src="/img/icon/m_home_icon.png" />
                홈
            </Link>

            <Link to="/genre/musicall" className="mobile-nav-a">
                <img src="/img/icon/m_category_icon.png" />
                카테고리
            </Link>

            <Link to="/search" className="mobile-nav-a">
                <img src="/img/icon/m_search_icon.png" />
                검색
            </Link>

            <Link to="/" className="mobile-nav-a">
                <img src="/img/icon/m_user_icon.png" />
                마이
            </Link>
        </nav>
    );
};
export default MobileNav;