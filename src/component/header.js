import React from "react";
import { Link } from 'react-router-dom';
import './header.css';

const linksty = {textDecoration: "none", color:'black'}
function Header() {
    return (
        <div className="App">
          <header className="App-header">
              <div class="header-top">
                <div class="h-t-logo-search">
                  <div class="header-logo">
                  <Link to="/" style={linksty}>티켓 로그</Link></div>
                  <div class="header-search">
                      <div class="search-form">
                      <input gtm-label="검색창" type="text" placeholder="검색창" value=""/>
                        <button class="search-btn">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#3A3A3A" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.6" d="m17.875 17.877-4.607-4.607c-.462-.462-1.198-.56-1.729-.197-1.345.943-3.084 1.356-4.92.943-2.26-.5-4.087-2.328-4.588-4.587A6.157 6.157 0 0 1 8.23 1.876c3.045.098 5.638 2.534 5.923 5.56.079.844-.02 1.66-.245 2.416l-.295.726"></path></svg>
                        </button>
                      </div>
                  </div>
                </div>
              </div>
              <div class="header-bottom">
                <div class="h-b-menu">
                  <ul>             
                    <li><Link to="/musicall" style={linksty}>뮤지컬</Link></li>
                    <li><Link to="/consert" style={linksty}>콘서트</Link></li>
                  </ul>
                </div>
              </div>
          </header>
        </div>
      );
}

export default Header;