import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './MobileNav.css';

const MobileNav = () => {
    // 경로에 따라 nav를 결정하는 함수
    const location = useLocation();
    const getNavFromPath = (path) => {
        if (path.startsWith('/genre')) {
            return 'category';
        }

        switch(path) {
            case '/':
                return 'home';
            case '/search':
                return 'search';
            case '/my':
                return 'my';
            default:
                return '';
        }
    };

    const [selectedNav, setSelectedNav] = useState("");
    useEffect(() => {
        let nav = getNavFromPath(location.pathname);
        setSelectedNav(nav);
    }, [location.pathname]);

    //
    return (
        <nav className='mobile-nav'>
            <Link to="/" className={`mobile-nav-a ${selectedNav === "home" && "is-selected"}`}>
                <img src={selectedNav === "home" ? "/img/icon/mobile_nav/home_on.png" : "/img/icon/mobile_nav/home_off.png"} />
                홈
            </Link>

            <Link to="/genre/musicall" className={`mobile-nav-a ${selectedNav === "category" && "is-selected"}`}>
                <img src={selectedNav === "category" ? "/img/icon/mobile_nav/category_on.png" : "/img/icon/mobile_nav/category_off.png"} />
                카테고리
            </Link>

            <Link to="/search" className={`mobile-nav-a ${selectedNav === "search" && "is-selected"}`}>
                <img src={selectedNav === "search" ? "/img/icon/mobile_nav/search_on.png" : "/img/icon/mobile_nav/search_off.png"} />
                검색
            </Link>

            <Link to="/" className={`mobile-nav-a ${selectedNav === "my" && "is-selected"}`}>
                <img src={selectedNav === "my" ? "/img/icon/mobile_nav/user_on.png" : "/img/icon/mobile_nav/user_off.png"} />
                마이
            </Link>
        </nav>
    );
};
export default MobileNav;