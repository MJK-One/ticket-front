import React, { useState, useEffect} from 'react';
import './openticket.css';
import melon from './melon.jpg'
import { gethome } from '../../api/connect'; // API 함수를 불러옵니다.
import moment from 'moment'; //날짜 변환
import 'moment/locale/ko'; // 한국어 로케일 import
import "moment-duration-format";

//BySite Active
function BySite({ to, children, onClick, className }) {
  return <div className={className} onClick={onClick}>{children}</div>;
}

function ByYearMonth(ticket, currentDate) {
  // 현재 날짜의 년도와 월
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // getMonth()는 0부터 시작하기 때문에 +1을 해줍니다.

  // 티켓 오픈 날짜의 년도와 월
  const ticketOpenYear = moment(ticket.ticket_open_date).year();
  const ticketOpenMonth = moment(ticket.ticket_open_date).month() + 1; // month()도 0부터 시작하기 때문에 +1을 해줍니다.

  // 현재 날짜의 년도와 월이 티켓 오픈 날짜의 년도와 월과 일치하는지 확인
  return (currentYear === ticketOpenYear) && (currentMonth === ticketOpenMonth);
}

//D-1 날짜 계산
function calculateDateDifference(date) {
  // 현재 날짜와 시간
  const now = moment();
  // 대상 날짜 (데이터베이스에서 가져온 날짜)
  const target = moment(date);
  // 대상 날짜까지의 차이를 계산 (밀리초 단위)
  const diff = target.diff(now);
  
  // 차이가 0 미만이면, 이미 지난 날짜입니다.
  if (diff < 0) {
    return "";
  }

  // moment-duration-format 라이브러리를 사용하여 차이를 포맷합니다.
  const duration = moment.duration(diff);

  // 일수 차이를 계산합니다.
  const days = duration.days();
  
  // 시간, 분, 초 차이를 포맷하여 가져옵니다.
  const time = duration.format("HH:mm:ss");

  // 일수 차이가 0일이 아니면 "D-n" 형식으로 반환합니다.
  if (days > 0) {
    return `D-${days}`;
  } else {
    // 일수 차이가 없으면 시간 차이만 반환합니다.
    return `D-Day ${time}`;
  }
}

export default function Openticket() {
   // tickets 상태를 생성하고, 초기값은 빈 배열로 설정합니다.
   const [tickets, setTickets] = useState([]);

   // 컴포넌트가 마운트될 때 gethome() 함수를 호출하여 데이터를 불러옵니다.
   useEffect(() => {
       // 데이터를 비동기적으로 불러옵니다.
       const fetchData = async () => {
           try {
               const result = await gethome(); // API 호출
               setTickets(result); // 결과를 tickets 상태에 저장
           } catch (error) {
               console.error('데이터를 불러오는 데 실패했습니다.', error);
           }
       };

       fetchData();
   }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 합니다.
  
   
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
          to="Melon Ticket"
          onClick={() => handleSiteClick('Melon Ticket')}
          className={activeSite === 'Melon Ticket' ? 'active' : ''}
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
        {tickets
           .filter(ticket => ByYearMonth(ticket, currentDate))
          .filter(ticket => activeSite === 'all' || ticket.sales_site === activeSite) // activeSite에 따라 필터링
          .map(ticket => (
            <div className='openticket' key={ticket.id}>
              <div className='openticket-img'>
                <img src={ticket.image_url} alt={`${ticket.event_name} 이미지`} />
              </div>
              <div className='openticket-info'>
                <div className='open-Timer'>
                  <div className='Timer-banner'>OPEN</div>
                  <div className='Timer-day'>{calculateDateDifference(ticket.ticket_open_date)}</div>
                </div>
                <div className='title'>{ticket.event_name}</div>
                <div className='ot-info-bot'>
                  <div className='day'>{moment(ticket.ticket_open_date).format('M.DD(ddd) HH:mm')}</div>
                </div>
                <div className='tic-site'><img src={melon} alt="멜론"></img></div>
              </div>
            </div>
        ))}
      </div>      
    </div>
  );
}
