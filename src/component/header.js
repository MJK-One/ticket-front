import React, { useState } from "react";
import { Link, redirect, useLocation } from 'react-router-dom';
import './header.css';

//메뉴 버튼 클릭시 Router 연결, CSS active
function CustomLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  const className = isActive ? 'active' : null;

  const iconImg = () => {
    let iconName = children;
    let baseSrc = "/img/icon/";

    switch (iconName) {
      case '뮤지컬/연극' :
        return baseSrc + "musical_icon.png";
      case '콘서트' :
        return baseSrc + "concert_icon.png";
      case '전시/행사' :
        return baseSrc + "exh_icon.png";
      case '클래식' :
        return baseSrc + "classic_icon.png";
      case '아동/가족' :
        return baseSrc + "child_icon.png";

      case '지역별' :
        return baseSrc + "region_icon.png";
      case '월별' :
        return baseSrc + "calendar_icon.png";
      default :
        return redirect;
    };
  };

  return (
  <li className={className}>
    <div className="menu-img"><img alt="" src={iconImg()} /></div>
    <div className="menu-title"><Link to={to}>{children}</Link></div>
  </li>
  );
}

function Header() {
  const [searchValue, setSearchValue] = useState("");
  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

    return (
        <div className="App">
          <header className="App-header">
              <div className="header-top">
                <div className="h-t-logo-search">
                  <div className="header-logo">
                  <Link to="/" className="linksty"><img className="logo-img" alt="" src="/img/TOW.png" /></Link></div>
                  <div className="header-search">
                      <div className="search-form">
                        <input gtm-label="검색창" type="text" placeholder="검색창"
                        value={searchValue}
                        onChange={handleSearchInputChange}/>
                        <Link to="/search">
                          <button className="search-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#3A3A3A" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.6" d="m17.875 17.877-4.607-4.607c-.462-.462-1.198-.56-1.729-.197-1.345.943-3.084 1.356-4.92.943-2.26-.5-4.087-2.328-4.588-4.587A6.157 6.157 0 0 1 8.23 1.876c3.045.098 5.638 2.534 5.923 5.56.079.844-.02 1.66-.245 2.416l-.295.726"></path></svg>
                          </button>
                        </Link>  
                      </div>
                  </div>
                </div>
              </div>
              <div className="header-bottom">
                <div className="h-b-menu">
                  <ul className="normal-header">             
                    <CustomLink to="/genre/musicall">뮤지컬/연극</CustomLink>
                    <CustomLink to="/genre/consert">콘서트</CustomLink>
                    <CustomLink to="/genre/exhibitionevent">전시/행사</CustomLink>
                    <CustomLink to="/genre/classic">클래식</CustomLink>         
                    {/* <CustomLink to="/chlidfamliy">아동/가족</CustomLink> */}
                    {/* <CustomLink to="/detail">디테일</CustomLink> */}
                  </ul>
                  <div className="menuDivider"></div>
                  <ul className="sep-header">
                    <CustomLink to="/region">지역별</CustomLink>
                    <CustomLink to="/blah">월별</CustomLink>
                    {/* 월별 완료되면 링크 수정하기 */}
                  </ul>
                </div>
              </div>
          </header>
        </div>
      );
}

export default Header;