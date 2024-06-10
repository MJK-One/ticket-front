import React from 'react';
import { Link } from 'react-router-dom';
import './monthticket.css';
import melon from './melon.jpg'
import moment from 'moment'; //날짜 변환
import 'moment/locale/ko'; // 한국어 로케일 import
import "moment-duration-format";
import calculateDateDifference from './calculateDateDifference';

export default function Monthticket({ monthTickets }) {  
  return (
    <div className='openticket-container'>
      <div className='openticket-month'>
        <div className='month'>
          이번달 오픈티켓
        </div>
      </div>
      <div className='monthticket-arrange'>
        {monthTickets.map(ticket => (
          <Link to={`/detail/${ticket.id}`}>
          <div className='monthticket' key={ticket.id}>
              <div className='monthticket-img'>
                <img src={ticket.image_url} alt={`${ticket.event_name} 이미지`} />
              </div>
              <div className='monthticket-info'>
                <div className='open-Timer'>
                  <div className='Timer-banner'>OPEN</div>
                  <div className='Timer-day'>{calculateDateDifference(ticket.ticket_open_date)}</div>
                  {
                    ticket.pre_sale_date !== null ? <div className='pre-banner'>선예매</div> : null
                  }
                </div>
                <div className='title'>{ticket.event_name}</div>
                <div className='day'>{moment(ticket.ticket_open_date).locale('ko').format('M.DD(ddd) HH:mm')}</div>      
                <div className='tic-site'></div>
              </div>
          </div>
          </Link>
        ))}
      </div>      
      <div className='month-all'>
        <button>월별 전체보기</button>
      </div>
    </div>
  );
}