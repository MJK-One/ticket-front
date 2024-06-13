import React, { useEffect, useState } from 'react';
import DatePicker from '../../component/datepicker/datepicker.js';
import './filter.css';

const Filter = () => {
  /*
    on-off 기능이 있는 Container에 필요한 변수, 이벤트 함수 설정
   */
    /* 변수 */
  const [isToggledContainer, setIsToggledContainer] = useState(false); //toggle

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
  //container
  const toggleContainerHandler = () => {
    setIsToggledContainer(!isToggledContainer);
  };

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
    {value: "인천", class: "Incheon"}, {value: "강원", class: "Gangwon"},
    {value: "충북", class: "Nchungcheong"}, {value: "충남", class: "Schungcheong"},
    {value: "세종", class: "Sejong"}, {value: "대전", class: "Daejeon"},
    {value: "경북", class: "Ngyeongsang"}, {value: "경남", class: "Sgyeongsang"},
    {value: "대구", class: "Daegu"}, {value: "울산", class: "Ulsan"},
    {value: "전북", class: "Njeolla"}, {value: "전남", class: "Sjeolla"},
    {value: "부산", class: "Busan"}, {value: "광주", class: "Gwangju"},
    {value: "제주", class: "Jeju"}
  ];
  const filterRegionBtns = filterRegion.map(item => (
    <button className={`filterBtn ${item.class} ${isActiveRegion[item.class] ? "is-active" : null}`}
      onClick={() => ActiveRegionHandler(item.class)}
      key={`filterBtn-Region-${item.class}`}>
      {item.value}
    </button>
  ));


  /*
    날짜 str 받아오기
   */
  const [calendarDateValue, setCalendarDateValue] = useState('');

  const handleDateChange = (newDate) => {
    setCalendarDateValue(newDate);
  };

  //return
  return (
    <div className='filter'>
      {/* filter */}
      <div className="filterContainer ContainerTop">
        {/* Container */}
        <div className='filterHeader'>
            <h4 className='filterTitle'>장르</h4>
            <div className='selectedData'>
              <span className='blind'>선택된 장르:</span>
              <input type='hidden' name='genre-str' id='genre-str' className='genre-str' value="" />
            </div>
        </div>
        <div className='filterMenu'>
          {filterGenreBtns}
        </div>

      </div>

      <div className="filterContainer ContainerMiddle">
        {/* Container */}
        <div className='filterHeader'>
            <h4 className='filterTitle'>지역</h4>
            <div className='selectedData'>
              <span className='blind'>선택된 지역:</span>
              <input type='hidden' name='region-str' id='region-str' className='region-str' value="" />
            </div>
        </div>
        <div className='filterMenu'>
          {filterRegionBtns}
        </div>

      </div>

      <div className={`filterContainer ContainerBottom ${isToggledContainer ? "is-toggled" : null}`}>
        {/* Container */}
        <div className='filterHeader'>
          <a className='filterToggleBtn' role='button' onClick={toggleContainerHandler}>
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
    
  );
};
export default Filter;