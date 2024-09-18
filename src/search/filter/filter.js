import React, { useEffect, useState } from 'react';
import DatePicker from '../../component/datepicker/datepicker.js';
import './filter.css';

const Filter = () => {
  /*
    toggle 기능이 있는 Container에 필요한 변수, 이벤트 함수 설정
   */
    /* 변수 */
    //toggle
  const [isToggledTopContainer, setIsToggledTopContainer] = useState(false); //top
  const [isToggledMidContainer, setIsToggledMidContainer] = useState(false); //Middle
  const [isToggledBotContainer, setIsToggledBotContainer] = useState(false); //Bottom

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
  //toggle container
  const toggleContainerTopHandler = () => { //top
    setIsToggledTopContainer(!isToggledTopContainer);
  };
  const toggleContainerMidHandler = () => { //Middle
    setIsToggledMidContainer(!isToggledMidContainer);
  };
  const toggleContainerBotHandler = () => { //Bottom
    setIsToggledBotContainer(!isToggledBotContainer);
  };

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
  const filterGenre = [{value: "뮤지컬/연극", class: "Musical"},
    {value: "콘서트", class: "Concert"},
    {value: "전시/행사", class: "Exh"},
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

  /*
  필터 버튼
  */
  const ResetBtnHandler = () => { //필터 리셋 버튼
    // 장르 선택 리셋
    setIsActiveGenre(prevState => 
      Object.fromEntries(
        Object.entries(prevState).map(([genre, _]) => [genre, false])
      )
    );
    // 지역 선택 리셋
    setIsActiveRegion(prevState => 
      Object.fromEntries(
        Object.entries(prevState).map(([region, _]) => [region, false])
      )
    );

    //달력 리셋은 복잡할 것 같아서 나중에 시간나면 하겠음.
  };
  const SubmitBtnHandler = () => { //필터 적용 버튼

  };

  //return
  return (
    <div className='filterWrap'>
      <div className='filter'>
        {/* filter */}
        <div className={`filterContainer ContainerTop ${isToggledTopContainer ? "is-toggled" : null}`}>
          {/* Container */}
          <div className='filterHeader'>
            <a className='filterToggleBtn' role='button' onClick={toggleContainerTopHandler}>
              <h4 className='filterTitle'>장르</h4>
              <div className='selectedData'>
                <span className='blind'>선택된 장르:</span>
                <span className='selec-genre'>{selectedGenreStr}</span>
              </div>
            </a>
          </div>
          <div className='filterMenu'>
            {filterGenreBtns}
          </div>

        </div>

        <div className={`filterContainer ContainerMiddle ${isToggledMidContainer ? "is-toggled" : null}`}>
          {/* Container */}
          <div className='filterHeader'>
            <a className='filterToggleBtn' role='button' onClick={toggleContainerMidHandler}>
              <h4 className='filterTitle'>지역</h4>
              <div className='selectedData'>
                <span className='blind'>선택된 지역:</span>
                <span className='selec-region'>{selectedRegionStr}</span>
              </div>
            </a>
          </div>
          <div className='filterMenu'>
            {filterRegionBtns}
          </div>

        </div>

        <div className={`filterContainer ContainerBottom ${isToggledBotContainer ? "is-toggled" : null}`}>
          {/* Container */}
          <div className='filterHeader'>
            <a className='filterToggleBtn' role='button' onClick={toggleContainerBotHandler}>
              <h4 className='filterTitle'>관람일</h4>
              <div className='selectedData'>
                <span className='blind'>선택된 일자:</span>
                <span className='date'>{calendarDateValue}</span>
              </div>
            </a>
          </div>

          <DatePicker onDateChange={handleDateChange} />
        </div>
      </div>
      
      {/* Button */}
      <div className='filterBtnsWrap'>
        <button onClick={ResetBtnHandler} className="search-f-reset-btn">
          초기화
        </button>
        <button onClick={SubmitBtnHandler} className="search-f-submit-btn">
          적용
        </button>
      </div>

    </div>
  );
};
export default Filter;