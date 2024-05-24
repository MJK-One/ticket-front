import React, { useState, useEffect, useRef } from 'react';
import './openticket.css';
import melon from './melon.jpg'

//BySite Active
function BySite({ to, children, onClick, className }) {
  return <div className={className} onClick={onClick}>{children}</div>;
}

export default function Openticket() {
  const [currentDate, setCurrentDate] = useState(new Date());
  // 월을 이동하는 함수입니다.
  const moveMonth = (offset) => {
    // 현재 날짜에 offset 만큼의 월을 더하거나 뺍니다.
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + offset));
    setCurrentDate(newDate);
  };
  // 달력창 띄워주는 로직
  // const preventDefault = () =>{

  // };
  const [activeSite, setActiveSite] = useState('all');
  //Site 별 나열 로직
  const handleSiteClick = (site) => {
    setActiveSite(site);
  };

    //무한 스크롤 처음 10개후 10개씩 생성
    const [tickets, setTickets] = useState([...Array(10).keys()]); // 초기 10개
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // 데이터가 더 있는지를 확인하는 상태
    const loader = useRef(null);
  
    const loadMoreTickets = () => {
      if (!hasMore) return; // 데이터가 더 없으면 함수를 종료
  
      setIsLoading(true);
      setTimeout(() => {
        // 예시에서는 단순히 50개 이후에는 더 이상 데이터가 없다고 가정, hasMore 사용
        if (tickets.length >= 50) {
          setHasMore(false);
        } else {
          setTickets((prev) => [...prev, ...Array(10).keys()].map((_, i) => prev.length + i));
        }
        setIsLoading(false);
      }, 1000);
    };
  
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          loadMoreTickets();
        }
      }, {
        threshold: 1.0
      });
  
      const currentLoader = loader.current;
      if (currentLoader) {
        observer.observe(currentLoader);
      }
  
      return () => {
        if (currentLoader) {
          observer.unobserve(currentLoader);
        }
      };
    }, [isLoading, hasMore, loadMoreTickets]);

  return (
    <div className='openticket-container'>
      <div className='openticket-month'>
        <button className='month-left' onClick={() => moveMonth(-1)}>◀</button>
        {/* 날짜를 YYYY.MM 형식으로 표시합니다. */}
        <div className='month'>
          <a href="#none" onClick={(e) => e.preventDefault()}>
            {currentDate.getFullYear()}.{(currentDate.getMonth() + 1).toString().padStart(2, '0')}
          </a>
        </div>
        <button className='month-right' onClick={() => moveMonth(1)}>▶</button>
      </div>
      <menu className='by-site'>
        <BySite
          to="all"
          onClick={() => handleSiteClick('all')}
          className={activeSite === 'all' ? 'active' : ''}
        >ALL</BySite>
        <BySite
          to="interpark"
          onClick={() => handleSiteClick('interpark')}
          className={activeSite === 'interpark' ? 'active' : ''}
        >인터파크</BySite>
        <BySite
          to="melon"
          onClick={() => handleSiteClick('melon')}
          className={activeSite === 'melon' ? 'active' : ''}
        >멜론</BySite>
        <BySite
          to="ticketlink"
          onClick={() => handleSiteClick('ticketlink')}
          className={activeSite === 'ticketlink' ? 'active' : ''}
        >티켓링크</BySite>
        <BySite
          to="yes24"
          onClick={() => handleSiteClick('yes24')}
          className={activeSite === 'yes24' ? 'active' : ''}
        >YES24</BySite>
      </menu>
      {/* <div className='controll-list'>
        <div className='view-type'>
          <button></button>
          <button></button>
        </div>
        <ul className='view-sort'>
          <li>인기순</li>
          <li>오픈임박순</li>
          <li>최신순</li>
        </ul>
      </div> */}
      <div className='openticket-arrange'>
        {tickets.map((value, index) => (
          <div className='openticket' key={index}>
            <div className='openticket-img'>
              이미지
            </div>
            <div className='openticket-info'>
              <div className='open-Timer'>
                <div className='Timer-banner'>OPEN</div>
                <div className='Timer-day'>D-1 12:00</div>
              </div>
              <div className='title'>오픈티켓 제목</div>
              <div className='ot-info-bot'>
                <div className='day'>2024.4.10</div>
                <div className='tic-site'><img src={melon} alt="멜론"></img></div>
              </div>
            </div>
          </div>
        ))}
        <div ref={loader}>
          {isLoading}
          {!hasMore && !isLoading} {/* 데이터가 더 없을 때 메시지 출력 */}
        </div>
      </div>      
    </div>
  );
}
