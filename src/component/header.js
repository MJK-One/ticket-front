import React, { useState } from "react";
import { Link, redirect, useLocation } from 'react-router-dom';
import './header.css';

import DatePicker from '../component/datepicker/datepicker.js';

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
  //필터 교차
  const [isLocationFilterVisible, setLocationFilterVisible] = useState(false);
  const [isMonthFilterVisible, setMonthFilterVisible] = useState(false);
  const toggleLocationSearchFilter = () => {
    setLocationFilterVisible(!isLocationFilterVisible);
    if (isMonthFilterVisible) {
      setMonthFilterVisible(false); // 월 필터 닫기
    }
  };
  const toggleMonthSearchFilter = () => {
    setMonthFilterVisible(!isMonthFilterVisible);
    if (isLocationFilterVisible) {
      setLocationFilterVisible(false); // 위치 필터 닫기
    }
  };
  const handleClickOutside = (event) => {
    // 클릭한 영역이 필터가 아닐 경우 두 필터 모두 닫기
    if (
      !event.target.closest('.location-form') &&
      !event.target.closest('.month-form') &&
      !event.target.closest('.l-search-filter') &&
      !event.target.closest('.m-search-filter')
    ) {
      setLocationFilterVisible(false);
      setMonthFilterVisible(false);
    }
  };

  //지역별 필터
  const locations = ['전체', '서울', '인천', '경기', '강원', '충청남도', '충청북도', '세종',
    '대전', '전라북도', '전라남도', '광주', '경상북도', '경상남도', '대구', '울산', '부산', '제주도']; // 지역 배열
  const [selectedLocation, setSelectedLocation] = useState('전체');
  const handleLocationChange = (event) => {
    const newLocation = event.target.value;
    setSelectedLocation(newLocation);
    console.log(newLocation); // 클릭한 위치 값 확인
  };

  // 날짜별 필터
  const [isToggledContainer, setIsToggledContainer] = useState(false); // toggle

  const toggleContainerHandler = () => {
    setIsToggledContainer(!isToggledContainer);
  };

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState('YYYY.MM.DD.');

  // 날짜 선택 핸들러
  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
  };

  // 초기화 핸들러
  const handleReset = () => {
  setResult('YYYY.MM.DD.');
  };

  // 적용 버튼 클릭 핸들러
  const handleApply = () => {
    updateResult(startDate, endDate);
  };

  const updateResult = (start, end) => {
    if (start && end) {
      const formattedStart = new Date(start).toLocaleDateString('ko-KR');
      const formattedEnd = new Date(end).toLocaleDateString('ko-KR');
      setResult(`${formattedStart}~${formattedEnd}`);
      if(formattedStart === formattedEnd) {
        setResult(`${formattedStart}`);
      }
    } else {
      setResult('YYYY.MM.DD.');
    }
  };
  
  // 컴포넌트 마운트 시 이벤트 리스너 추가
  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
                      <div className="location-form" onClick={toggleLocationSearchFilter}>
                        <form>
                        <img className="l-logo-img" alt="" src="/img/map.png" />
                        <div className="l-title">지역</div>
                        <div className="l-result">{selectedLocation}</div>
                        </form>
                      </div>
                      {isLocationFilterVisible && (
                        <div className="l-search-filter">
                          {locations.map((location) => (
                              <label key={location} className={`location-label ${selectedLocation === location ? 'active' : ''}`}>
                                  <input
                                      type="radio"
                                      value={location}
                                      checked={selectedLocation === location}
                                      onChange={handleLocationChange}
                                      className="hidden-radio"
                                  />
                                  {location}
                              </label>
                          ))}
                        </div>
                      )}
                      <div className="month-form" onClick={toggleMonthSearchFilter}>
                        <form>
                          <img className="m-logo-img" alt="" src="/img/month.png" />
                          <div className="m-title">날짜</div>
                          <div className="m-result">{result}</div> {/* 결과 값 표시 */}
                        </form>
                      </div>
                      {isMonthFilterVisible && (
                        <div className="m-search-filter">
                          <div className="m-search-stend">
                            <div className="start-m">
                              <div className="start-title">시작 날짜</div>
                              <div className={`filterContainer ContainerBottom ${isToggledContainer ? "is-toggled" : null}`}>
                                <div className='filterHeader'>
                                  <a className='filterToggleBtn' role='button' onClick={toggleContainerHandler}>
                                    <div className='selectedData'>
                                      <span className='blind'>선택된 일자:</span>
                                      <span className='date'>{startDate}</span>
                                    </div>
                                  </a>
                                </div>
                                <DatePicker onDateChange={handleStartDateChange} />
                              </div>
                            </div>
                            <div className="end-m">
                              <div className="end-title">마지막 날짜</div>
                              <div className={`filterContainer ContainerBottom ${isToggledContainer ? "is-toggled" : null}`}>
                                <div className='filterHeader'>
                                  <a className='filterToggleBtn' role='button' onClick={toggleContainerHandler}>
                                    <div className='selectedData'>
                                      <span className='blind'>선택된 일자:</span>
                                      <span className='date'>{endDate}</span>
                                    </div>
                                  </a>
                                </div>
                                <DatePicker onDateChange={handleEndDateChange} />
                              </div>
                            </div>
                          </div>
                          <button className="m-reset-btn" onClick={handleReset}>초기화</button>
                          <button className="m-search-btn" onClick={handleApply}>적용</button>
                        </div>
                      )}
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
                    <CustomLink to="/month">날짜별</CustomLink>
                    {/* 월별 완료되면 링크 수정하기 */}
                  </ul>
                </div>
              </div>
          </header>
        </div>
      );
}

export default Header;