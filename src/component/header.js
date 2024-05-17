import React from "react";
import { Link, useLocation } from 'react-router-dom';
import './header.css';

function CustomLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  const className = isActive ? 'active' : null;

  const iconImg = () => {
    let iconName = children;
    let baseSrc = "img/icon/";

    switch (iconName) {
      case '뮤지컬' :
        return baseSrc + "musical_icon.png";
      case '콘서트' :
        return baseSrc + "concert_icon.png";
      case '전시/행사' :
        return baseSrc + "exh_icon.png";
      case '클래식/무용' :
        return baseSrc + "classic_icon.png";
      case '연극' :
        return baseSrc + "play_icon.png";
      case '아동/가족' :
        return baseSrc + "child_icon.png";
    };
  };

  return <li className={className}><div className="menu-img"><img alt="" src={iconImg()} /></div><div className="menu-title"><Link to={to}>{children}</Link></div></li>;
}

function Header() {
    return (
        <div className="App">
          <header className="App-header">
              <div className="header-top">
                <div className="h-t-logo-search">
                  <div className="header-logo">
                  <Link to="/" className="linksty"><img className="logo-img" alt="" src="img/TOW.png" /></Link></div>
                  <div className="header-search">
                      <div className="search-form">
                      <input gtm-label="검색창" type="text" placeholder="검색창" value=""/>
                        <button className="search-btn">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#3A3A3A" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.6" d="m17.875 17.877-4.607-4.607c-.462-.462-1.198-.56-1.729-.197-1.345.943-3.084 1.356-4.92.943-2.26-.5-4.087-2.328-4.588-4.587A6.157 6.157 0 0 1 8.23 1.876c3.045.098 5.638 2.534 5.923 5.56.079.844-.02 1.66-.245 2.416l-.295.726"></path></svg>
                        </button>
                      </div>
                  </div>
                </div>
              </div>
              <div className="header-bottom">
                <div className="h-b-menu">
                  <ul>             
                    <CustomLink to="/musicall">뮤지컬</CustomLink>
                    <CustomLink to="/consert">콘서트</CustomLink>
                    <CustomLink to="/exhAndevnet">전시/행사</CustomLink>
                    <CustomLink to="/classicdance">클래식/무용</CustomLink>
                    <CustomLink t0="/house">연극</CustomLink>
                    <CustomLink to="/youngfamily">아동/가족</CustomLink>
                  </ul>
                </div>
              </div>
          </header>
        </div>
      );
}

export default Header;