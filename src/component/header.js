import React, { useEffect, useState } from "react";
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetCurPage, resetAllSearchResult, setRegionFilter, setPeriod, setSearchKeyword } from '../store/slice/searchSlice.js';
import { autoComplete } from "../api/connect.js";
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
  const [isAutoSearchFormVisible, setAutoSearchFormVisible] = useState(false);
  
  const toggleLocationSearchFilter = () => {
    setLocationFilterVisible(!isLocationFilterVisible);
    if (isMonthFilterVisible) { setMonthFilterVisible(false);} // 월 필터 닫기
    if (isAutoSearchFormVisible) { setAutoSearchFormVisible(false);} // 검색 자동 완성 창 닫기

  };
  const toggleMonthSearchFilter = () => {
    setMonthFilterVisible(!isMonthFilterVisible);
    if (isLocationFilterVisible) { setLocationFilterVisible(false);} // 위치 필터 닫기
    if (isAutoSearchFormVisible) { setAutoSearchFormVisible(false);} // 검색 자동 완성 창 닫기
  };
  const toggleSearchForm = () => {
    setAutoSearchFormVisible(true);
    if (isLocationFilterVisible) { setLocationFilterVisible(false);} // 위치 필터 닫기
    if (isMonthFilterVisible) { setMonthFilterVisible(false);} // 월 필터 닫기
  };
  const handleClickOutside = (event) => {
    // 클릭한 영역이 필터가 아닐 경우 두 필터 모두 닫기
    if (
      !event.target.closest('.location-form') &&
      !event.target.closest('.month-form') &&
      !event.target.closest('.search-form') &&
      !event.target.closest('.l-search-filter') &&
      !event.target.closest('.m-search-filter') &&
      !event.target.closest('.search-result-form')
    ) {
      setLocationFilterVisible(false);
      setMonthFilterVisible(false);
      setAutoSearchFormVisible(false); // 검색 자동 완성 창 닫기
    }
  };

  // slice 선언
  const dispatch = useDispatch();
  const searchSlice = useSelector((state) => state.searchs.searchParams);

  // navigate
  const navigate = useNavigate();

  // 지역별 필터
    // active 지역 useState
  const [isActiveRegion, setIsActiveRegion] = useState({
    Seoul: false,
    Gyeonggi: false,
    Incheon: false,
    Gangwon: false,
    Schungcheong: false,
    Nchungcheong: false,
    Sejong: false,
    Daejeon: false,
    Sgyeongsang: false,
    Ngyeongsang: false,
    Daegu: false,
    Ulsan: false,
    Busan: false,
    Sjeolla: false,
    Njeolla: false,
    Gwangju: false,
    Jeju: false
  });

    // 클릭시 지역 useState 반전(on-off)
  const ActiveRegionHandler = (region) => {
    setIsActiveRegion((prevState) => ({
      ...prevState,
      [region]: !prevState[region]
    }));
  };

  const ResetRegionsHandler = () => {
    setIsActiveRegion(prevState => 
      Object.fromEntries(
        Object.entries(prevState).map(([region, _]) => [region, false])
      )
    );
  };

    // 지역 배열
  const regions = [{value: "서울", class: "Seoul"}, {value: "경기", class: "Gyeonggi"},
    {value: "인천", class: "Incheon"}, {value: "강원", class: "Gangwon"},
    {value: "충청북도", class: "Nchungcheong"}, {value: "충청남도", class: "Schungcheong"},
    {value: "세종", class: "Sejong"}, {value: "대전", class: "Daejeon"},
    {value: "경상북도", class: "Ngyeongsang"}, {value: "경상남도", class: "Sgyeongsang"},
    {value: "대구", class: "Daegu"}, {value: "울산", class: "Ulsan"},
    {value: "전라북도", class: "Njeolla"}, {value: "전라남도", class: "Sjeolla"},
    {value: "부산", class: "Busan"}, {value: "광주", class: "Gwangju"},
    {value: "제주", class: "Jeju"}
  ];
  
  
    // 선택 지역 배열, string
      // 배열
  const [selectedLocation, setSelectedLocation] = useState([]);
  useEffect(() => {
    const selectedRegions = regions
      .filter(item => isActiveRegion[item.class])
      .map(item => item.value); //선택된 지역 배열
    setSelectedLocation(selectedRegions);
  }, [isActiveRegion]);

    // string: '(첫번째 지역) 외 N개 지역'으로 표기 예정
  const [selectedLocationStr, setSelectedLocationStr] = useState("전체");
  useEffect(() => {
    if(selectedLocation.length > 0){ //선택된 지역이 1개 이상이라면
      const firstLocation = selectedLocation[0]; //첫번째 선택 지역
      const overLocationLength = selectedLocation.length - 1; //외 지역 개수
      if(overLocationLength > 0){ //선택 지역 2개 이상
        setSelectedLocationStr(`${firstLocation} 외 ${overLocationLength}개 지역`);
      } else { //선택 지역 1개
        setSelectedLocationStr(firstLocation);
      }
    } else { //선택 지역이 없다면
      setSelectedLocationStr("전체");
    }
  }, [selectedLocation]);
  

  // 날짜별 필터
  const [calendarDateValue, setCalendarDateValue] = useState("전체");

  const handleDateChange = (newDate) => {
    setCalendarDateValue(newDate);
  };
  
  // 컴포넌트 마운트 시 이벤트 리스너 추가
  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const [searchValue, setSearchValue] = useState("");
  const [autoCompleteComp, setAutoCompleteComp] = useState(null);
  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };
  useEffect(() => {
    const fetchAutoComplete = async () => {
      if (searchValue.trim() === "") {
        setAutoCompleteComp(null); // 검색어가 없으면 자동완성 초기화
        return;
      }

      try {
        const autoCompleteList = await autoComplete(searchValue);
        if (autoCompleteList && autoCompleteList.length > 0) {
          setAutoCompleteComp(
            autoCompleteList.map((item, i) => (
              <li className="auto-complete-li" key={`auto-cmp-${i}`}>
                <Link to={`/detail/${item.id}`} onClick={() => setAutoSearchFormVisible(false)}>
                  {item.event_name}
                </Link>
              </li>
            ))
          );
        } else {
          setAutoCompleteComp(null);
        }
      } catch (error) {
        console.error("Error fetching autocomplete data:", error);
        setAutoCompleteComp(null); // 오류가 발생하면 자동완성 초기화
      }
    };
    
    fetchAutoComplete();
  },[searchValue]);

  // isActiveRegion 업데이트: searchSlice.regionFilter 값이 변경될 때마다
  useEffect(() => {
    const updatedActiveRegion = {};

    regions.forEach(region => { // 해당하는 값이 있으면 true, 없으면 false
      updatedActiveRegion[region.class] = searchSlice.regionFilter.includes(region.value);
    });

    setIsActiveRegion(updatedActiveRegion);
  }, [searchSlice.regionFilter]);

  // searchValue 업데이트: searchSlice.searchKeyword 값이 변경될 때마다
  useEffect(() => {
    setSearchValue(searchSlice.searchKeyword);
  }, [searchSlice.searchKeyword]);

  // 달력 off가 기본이라, 날짜를 수동으로 업데이트
  useEffect(() => {
    setCalendarDateValue(searchSlice.period);
  },[searchSlice.period]);
  

  // submit 버튼 핸들러
  const headerSearchSubmitHandler = (event) => {
    event.stopPropagation(); // 이벤트 전파 방지

    // 이전 검색 결과 초기화
    dispatch(resetCurPage());
    dispatch(resetAllSearchResult());

    // slice 제어
    dispatch(setRegionFilter(selectedLocation)); // 지역 필터
    dispatch(setPeriod(calendarDateValue)); // 날짜 필터
    dispatch(setSearchKeyword(searchValue)); // 검색어

    // 검색 필터 및 자동완성 창 닫기
    setLocationFilterVisible(false);
    setMonthFilterVisible(false);
    setAutoSearchFormVisible(false); // search-result-form 닫기

    // 주소 이동
    navigate("/search");
  };


    return (
        <div className="App">
          <header className="App-header">
              <div className="header-first">
              <Link to="/login"><div className="h-t-login">로그인</div></Link>
                <div className="h-t-mypage">마이페이지</div>
              </div>
              <div className="header-top">
                <div className="h-t-logo-search">
                  <div className="header-logo">
                  <Link to="/" className="linksty"><img className="logo-img" alt="" src="/img/TOW.png" /></Link></div>
                  <div className="header-search">
                      <div className="location-form" onClick={toggleLocationSearchFilter}>
                        <div className="location-input">
                          <img className="l-logo-img" alt="" src="/img/map.png" />
                          <div className="l-title">지역</div>
                          <div className="l-result">{selectedLocationStr}</div>
                        </div>
                      </div>
                      {isLocationFilterVisible && (
                        <div className="l-search-filter">
                          <div className="location-label-wrap">
                            {regions.map((region) => (
                                <label key={region.class} className={`location-label ${isActiveRegion[region.class] ? 'active' : ''}`}>
                                    <input
                                        type="checkbox"
                                        value={region.value}
                                        onChange={() => ActiveRegionHandler(region.class)}
                                        className="hidden-ckbox"
                                    />
                                    {region.value}
                                </label>
                            ))}
                          </div>
                          
                          <div className="l-reset-btn-wrap">
                            <button onClick={ResetRegionsHandler} className="l-reset-btn">
                              선택 초기화
                            </button>
                          </div>

                        </div>
                      )}
                      <div className="month-form" onClick={toggleMonthSearchFilter}>
                        <div className="month-input">
                          <img className="m-logo-img" alt="" src="/img/month.png" />
                          <div className="m-title">날짜</div>
                          <div className="m-result">{calendarDateValue}</div> {/* 결과 값 표시 */}
                        </div>
                      </div>
                      {isMonthFilterVisible && (
                        <div className="m-search-filter">
                          <div className="m-search-stend">
                            <div className="m-s-filterContainer">
                              <div className='m-s-filterHeader'>
                                <div className='selectedData blind'>
                                  <span className='blind'>선택된 일자:</span>
                                  <span className='blind'>{calendarDateValue}</span>
                                </div>
                              </div>
                              <DatePicker onDateChange={handleDateChange} />
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="search-form" onClick={toggleSearchForm}>
                        <input gtm-label="검색창" type="text" placeholder="검색창"
                        value={searchValue}
                        onChange={handleSearchInputChange}/>
                        <button className="search-btn" onClick={headerSearchSubmitHandler}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#3A3A3A" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.6" d="m17.875 17.877-4.607-4.607c-.462-.462-1.198-.56-1.729-.197-1.345.943-3.084 1.356-4.92.943-2.26-.5-4.087-2.328-4.588-4.587A6.157 6.157 0 0 1 8.23 1.876c3.045.098 5.638 2.534 5.923 5.56.079.844-.02 1.66-.245 2.416l-.295.726"></path></svg>
                        </button>  
                      </div>
                      {isAutoSearchFormVisible && (
                        <div className="search-result-form">
                          <div className="s-r-container">
                            <ul className="auto-complete-ul">
                              {autoCompleteComp}
                            </ul>
                          </div>
                        </div>
                      )}
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
                  {/* <div className="menuDivider"></div>
                  <ul className="sep-header">
                    <CustomLink to="/region">지역별</CustomLink>
                    <CustomLink to="/month">날짜별</CustomLink>
                  </ul> */}
                </div>
              </div>
          </header>
        </div>
      );
}

export default Header;