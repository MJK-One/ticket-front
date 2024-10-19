import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetCurPage, resetAllSearchResult, setGenreFilter, setRegionFilter, setPeriod, setSearchKeyword } from '../../../store/slice/searchSlice.js';
import { autoComplete } from '../../../api/connect.js';

import DatePicker from '../../datepicker/datepicker.js';
import './MobileSearchHeader.css';

//
const MobileSearchHeader = () => {
    // slice 선언
    const dispatch = useDispatch();
    const searchSlice = useSelector((state) => state.searchs.searchParams);

    // navigate
    const navigate = useNavigate();

    /* 변수 */
    //active
    //genre
    const [isActiveGenre, setIsActiveGenre] = useState({
        Musical: false,
        Concert: false,
        Exh: false,
        Classic: false
    });

    //region
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

    /* 이벤트 함수 */
    // 화면 크기 체크 함수
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 클릭한 영역이 검색창이 아닐 시 자동완성 닫기
    const [isAutoSearchFormVisible, setAutoSearchFormVisible] = useState(false);
    const handleClickOutside = (event) => {
        if (
          !event.target.closest('.m-s-search-form') &&
          !event.target.closest('.m-s-search-result-form')
        ) {
          setAutoSearchFormVisible(false); // 검색 자동 완성 창 닫기
        }
      };
      // 컴포넌트 마운트 시 이벤트 리스너 추가
      React.useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);


    /* */
    //active item
    const ActiveGenreHandler = (genre) => {
        setIsActiveGenre((prevState) => ({
        ...prevState,
        [genre]: !prevState[genre]
        }));
    };

    const ActiveRegionHandler = (region) => {
        setIsActiveRegion((prevState) => ({
        ...prevState,
        [region]: !prevState[region]
        }));
    };

    /*
    장르
   */
    const filterGenre = [{value: "뮤지컬연극", class: "Musical"},
        {value: "콘서트", class: "Concert"},
        {value: "전시행사", class: "Exh"},
        {value: "클래식", class: "Classic"}
    ];
    const filterGenreBtns = filterGenre.map(item => (
        <button className={`filterBtn ${item.class} ${isActiveGenre[item.class] ? "is-active" : null}`}
        onClick={() => ActiveGenreHandler(item.class)}
        key={`filterBtn-Genre-${item.class}`}>
        {item.value}
        </button>
    ));

    /*
        지역
    */
    //서울, 경기, 인천, 강원, 충남, 충북, 세종, 대전, 경남, 경북, 대구, 울산, 부산, 전남, 전북, 광주, 제주
    const filterRegion = [{value: "서울", class: "Seoul"}, {value: "경기", class: "Gyeonggi"},
        {value: "인천", class: "Incheon"}, {value: "세종", class: "Sejong"}, {value: "강원", class: "Gangwon"},
        {value: "충청북도", class: "Nchungcheong"}, {value: "충청남도", class: "Schungcheong"},
        {value: "대전", class: "Daejeon"},{value: "대구", class: "Daegu"},
        {value: "경상북도", class: "Ngyeongsang"}, {value: "경상남도", class: "Sgyeongsang"},
        {value: "울산", class: "Ulsan"}, {value: "부산", class: "Busan"},
        {value: "전라북도", class: "Njeolla"}, {value: "전라남도", class: "Sjeolla"},
        {value: "광주", class: "Gwangju"}, {value: "제주", class: "Jeju"}
    ];
    const filterRegionBtns = filterRegion.map(item => (
        <button className={`filterBtn ${item.class} ${isActiveRegion[item.class] ? "is-active" : null}`}
        onClick={() => ActiveRegionHandler(item.class)}
        key={`filterBtn-Region-${item.class}`}>
        {item.value}
        </button>
    ));


    /*
        결과 배열, str
    */
    //장르
    //선택 장르 배열, str
        //배열
    const [selectedGenre, setSelectedGenre] = useState([]);
    useEffect(() => {
        const selectedGenres = filterGenre
        .filter(item => isActiveGenre[item.class])
        .map(item => item.value); //선택된 장르 배열
        setSelectedGenre(selectedGenres);
    }, [isActiveGenre]);

        //string:'(첫번째 장르) 외 N개 장르'로 표기 예정
    const [selectedGenreStr, setSelectedGenreStr] = useState("전체");
    useEffect(() => {
        if(selectedGenre.length > 0){ //선택된 장르가 1개 이상
        const firstGenre = selectedGenre[0]; //첫번째 선택 장르
        const overGenreLength = selectedGenre.length - 1; //외 장르 개수
        if(overGenreLength > 0){ //선택 장르 2개 이상
            setSelectedGenreStr(`${firstGenre} 외 ${overGenreLength}개 장르`);
        } else { //선택 장르 1개
            setSelectedGenreStr(firstGenre);
        }
        } else { //선택 장르가 없다면
        setSelectedGenreStr("전체");
        }
    }, [selectedGenre]);

    //지역
    //선택 지역 배열, str
        //배열
    const [selectedRegion, setSelectedRegion] = useState([]);
    useEffect(() => {
        const selectedRegions = filterRegion
        .filter(item => isActiveRegion[item.class])
        .map(item => item.value); //선택된 지역 배열
        setSelectedRegion(selectedRegions);
    }, [isActiveRegion]);

        //string:'(첫번째 지역) 외 N개 지역'으로 표기 예정
    const [selectedRegionStr, setSelectedRegionStr] = useState("전체");
    useEffect(() => {
        if(selectedRegion.length > 0){ //선택된 지역이 1개 이상
        const firstRegion = selectedRegion[0]; //첫번째 선택 지역
        const overRegionLength = selectedRegion.length - 1; //외 지역 개수
        if(overRegionLength > 0){ //선택 지역 2개 이상
            setSelectedRegionStr(`${firstRegion} 외 ${overRegionLength}개 지역`);
        } else { //선택 지역 1개
            setSelectedRegionStr(firstRegion);
        }
        } else { //선택 지역이 없다면
        setSelectedRegionStr("전체");
        }
    }, [selectedRegion]);
    

    //날짜 str 받아오기
    const [calendarDateValue, setCalendarDateValue] = useState('');

    const handleDateChange = (newDate) => {
        setCalendarDateValue(newDate);
    };

    // 검색어
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
                <li className="m-s-auto-complete-li" key={`auto-cmp-${i}`}>
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

    /*
    searchSlice 변경에 따른 업데이트
    */
    // isActiveGenre 업데이트: searchSlice.genreFilter 값이 변경될 때마다
    useEffect(() => {
        const updatedActiveGenre = {};
        filterGenre.forEach(genre => { // 해당하는 값이 있으면 true, 없으면 false
        updatedActiveGenre[genre.class] = searchSlice.genreFilter.includes(genre.value);
        });
        setIsActiveGenre(updatedActiveGenre);
    }, [searchSlice.genreFilter]);

    // isActiveRegion 업데이트: searchSlice.regionFilter 값이 변경될 때마다
    useEffect(() => {
        const updatedActiveRegion = {};

        filterRegion.forEach(region => { // 해당하는 값이 있으면 true, 없으면 false
        updatedActiveRegion[region.class] = searchSlice.regionFilter.includes(region.value);
        });

        setIsActiveRegion(updatedActiveRegion);
    }, [searchSlice.regionFilter]);

    // searchValue 업데이트: searchSlice.searchKeyword 값이 변경될 때마다
    useEffect(() => {
        setSearchValue(searchSlice.searchKeyword);
    }, [searchSlice.searchKeyword]);

    /* 검색 버튼 핸들러 */
    // submit 버튼 핸들러
    const headerSearchSubmitHandler = (event) => {
        event.stopPropagation(); // 이벤트 전파 방지

        // 이전 검색 결과 초기화
        dispatch(resetCurPage());
        dispatch(resetAllSearchResult());

        // slice 제어
        dispatch(setSearchKeyword(searchValue)); // 검색어

        // 검색 필터 및 자동완성 창 닫기
        setAutoSearchFormVisible(false); // search-result-form 닫기

        // 주소 이동
        navigate("/search");
    };

  
    /* 필터 상단(windowWidth <= 1400) */
    // 필터 visible 여부
    const [isTopGenreFilter, setIsTopGenreFilter] = useState(false); //장르
    const [isTopRegionFilter, setIsTopRegionFilter] = useState(false); //지역
    const [isTopDateFilter, setIsTopDateFilter] = useState(false); //날짜
  
    // 필터 선택 여부
    const [isSelctedTopGenre, setIsSelctedTopGenre] = useState(false); //장르
    const [isSelctedTopRegion, setIsSelctedTopRegion] = useState(false); //지역
    const [isSelctedTopDate, setIsSelctedTopDate] = useState(false); //날짜
  
    // 선택시 is-visible
    useEffect(() => {
      if(selectedGenreStr === "전체"){
        setIsSelctedTopGenre(false);
      } else {
        setIsSelctedTopGenre(true);
      }
  
    }, [selectedGenreStr]);
  
    useEffect(() => {
      if(selectedRegionStr === "전체") {
        setIsSelctedTopRegion(false);
      } else {
        setIsSelctedTopRegion(true);
      }
    }, [selectedRegionStr]);
  
    useEffect(() => {
      if(calendarDateValue === "전체") {
        setIsSelctedTopDate(false);
      } else {
        setIsSelctedTopDate(true);
      }
    }, [calendarDateValue]);
  
    // 필터창 선택 함수
    const topFilterBtnHandler = (filter) => {
      if(filter === "genre") {
        setIsTopGenreFilter(true);
        setIsTopRegionFilter(false);
        setIsTopDateFilter(false);
        setAutoSearchFormVisible(false);
      }
      else if(filter === "region") {
        setIsTopGenreFilter(false);
        setIsTopRegionFilter(true);
        setIsTopDateFilter(false);
        setAutoSearchFormVisible(false);
      }
      else if(filter === "date") {
        setIsTopGenreFilter(false);
        setIsTopRegionFilter(false);
        setIsTopDateFilter(true);
        setAutoSearchFormVisible(false);
      }
      else if(filter === "searchKey"){
        setIsTopGenreFilter(false);
        setIsTopRegionFilter(false);
        setIsTopDateFilter(false);
        setAutoSearchFormVisible(true);
      }
      else {
        console.log("error");
      }
    };
  
    // 버튼 : 적용
    const SubmitBtnHandler = () => { //필터 적용 버튼
        // 이전 검색 결과 초기화
        dispatch(resetCurPage());
        dispatch(resetAllSearchResult());
  
        //slice 제어
        dispatch(setGenreFilter(selectedGenre)); //장르 필터
        dispatch(setRegionFilter(selectedRegion)); //지역 필터
        dispatch(setPeriod(calendarDateValue)); //날짜 필터
    
        navigate("/search");
    };

    // 버튼 : 초기화
    const ResetGenreBtnHandler = () => { //장르 필터 리셋 버튼
      // 이전 검색 결과 초기화
      dispatch(resetCurPage());
      dispatch(resetAllSearchResult());
  
      //slice 제어
      dispatch(setGenreFilter([])); //장르 필터
  
      navigate("/search");
    };
  
    const ResetRegionBtnHandler = () => { //지역 필터 리셋 버튼
      // 이전 검색 결과 초기화
      dispatch(resetCurPage());
      dispatch(resetAllSearchResult());
  
      //slice 제어
      dispatch(setRegionFilter([])); //지역 필터
  
      navigate("/search");
    };
  
    const ResetDateBtnHandler = () => { //날짜 필터 리셋 버튼
      // 이전 검색 결과 초기화
      dispatch(resetCurPage());
      dispatch(resetAllSearchResult());
  
      //slice 제어
      dispatch(setPeriod("전체")); //날짜 필터
  
      navigate("/search");
    };
    
    //
    return (
        <div className='m-s-header'>
            <div className='m-s-header-search'>
                <div className='m-s-header-logo'>
                    <Link to="/" className='m-s-header-logo-link'>
                        <img className='m-s-logo-img' src="/img/TOW.png" />
                    </Link>
                </div>
                <div className='m-s-search-wrap'>
                    <div className="m-s-search-form" onClick={() => topFilterBtnHandler('searchKey')}>
                      <input gtm-label="검색창" type="text" placeholder="검색창"
                      value={searchValue}
                      onChange={handleSearchInputChange}/>
                      <button className="m-s-search-btn" onClick={headerSearchSubmitHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#3A3A3A" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.6" d="m17.875 17.877-4.607-4.607c-.462-.462-1.198-.56-1.729-.197-1.345.943-3.084 1.356-4.92.943-2.26-.5-4.087-2.328-4.588-4.587A6.157 6.157 0 0 1 8.23 1.876c3.045.098 5.638 2.534 5.923 5.56.079.844-.02 1.66-.245 2.416l-.295.726"></path></svg>
                      </button>  
                    </div>
                    {isAutoSearchFormVisible && (
                      <div className="m-s-search-result-form">
                        <div className="m-s-s-r-container">
                          <ul className="m-s-auto-complete-ul">
                            {autoCompleteComp}
                          </ul>
                        </div>
                      </div>
                    )}
                </div>
            </div>
            {/* 필터 */}
            <div className='filterWrap'>
                <button className={`s-filter-btn ${isSelctedTopGenre ? 'is-active' : null}`} onClick={() => topFilterBtnHandler('genre')}>
                    {`${isSelctedTopGenre ? selectedGenreStr : '장르'}`} ▼
                </button>
                <button className={`s-filter-btn ${isSelctedTopRegion ? 'is-active' : null}`} onClick={() => topFilterBtnHandler('region')}>
                    {`${isSelctedTopRegion ? selectedRegionStr : '지역'}`} ▼
                </button>
                <button className={`s-filter-btn ${isSelctedTopDate ? 'is-active' : null}`} onClick={() => topFilterBtnHandler('date')}>
                    {`${isSelctedTopDate ? calendarDateValue : '관람일'}`} ▼
                </button>

                {/* 장르 필터 */}
                <div className={`filter ${isTopGenreFilter ? null : "is-invisible"}`}>
                    <div className={`filterContainer`}>
                    {/* Container */}
                    <div className='filterHeader'>
                        <h4 className='filterTitle'>장르</h4>
                        <div className='selectedData'>
                            <span className='blind'>선택된 장르:</span>
                            <span className='selec-genre'>{selectedGenreStr}</span>
                        </div>
                    </div>

                    <button className='close-btn' onClick={() => setIsTopGenreFilter(false)}>×</button>

                    <div className='filterMenu'>
                        {filterGenreBtns}
                    </div>

                    <div className='filterBtnsWrap'>
                        <button onClick={ResetGenreBtnHandler} className="search-f-reset-btn">
                        초기화
                        </button>
                        <button onClick={SubmitBtnHandler} className="search-f-submit-btn">
                        적용
                        </button>
                    </div>
            
                    </div>
                </div>

                {/* 지역 필터 */}
                <div className={`filter ${isTopRegionFilter ? null : "is-invisible"}`}>
                    <div className={`filterContainer`}>
                    {/* Container */}
                    <div className='filterHeader'>
                        <h4 className='filterTitle'>지역</h4>
                        <div className='selectedData'>
                        <span className='blind'>선택된 지역:</span>
                        <span className='selec-region'>{selectedRegionStr}</span>
                        </div>
                    </div>

                    <button className='close-btn' onClick={() => setIsTopRegionFilter(false)}>×</button>

                    <div className='filterMenu'>
                        {filterRegionBtns}
                    </div>

                    <div className='filterBtnsWrap'>
                        <button onClick={ResetRegionBtnHandler} className="search-f-reset-btn">
                        초기화
                        </button>
                        <button onClick={SubmitBtnHandler} className="search-f-submit-btn">
                        적용
                        </button>
                    </div>
            
                    </div>
                </div>

                {/* 관람일 필터 */}
                <div className={`filter ${isTopDateFilter ? null : "is-invisible"}`}>
                    <div className={`filterContainer`}>
                    {/* Container */}
                    <div className='filterHeader'>
                        <h4 className='filterTitle'>관람일</h4>
                        <div className='selectedData'>
                        <span className='blind'>선택된 일자:</span>
                        <span className='date'>{calendarDateValue}</span>
                        </div>
                    </div>

                    <button className='close-btn' onClick={() => setIsTopDateFilter(false)}>×</button>

                    <DatePicker onDateChange={handleDateChange} />

                    <div className='filterBtnsWrap'>
                        <button onClick={ResetDateBtnHandler} className="search-f-reset-btn">
                        초기화
                        </button>
                        <button onClick={SubmitBtnHandler} className="search-f-submit-btn">
                        적용
                        </button>
                    </div>
            
                    </div>
                </div>

            </div>
        </div>
    );
};
export default MobileSearchHeader;