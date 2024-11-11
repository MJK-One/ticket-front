import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sitemenu.css'
import '../componet/ticketlist.css'
import calculateDateDifference from '../componet/calculateDateDifference';
import getImageForSite from '../componet/getImageForSite';
import moment from 'moment'; //날짜 변환
import 'moment/locale/ko'; // 한국어 로케일 import
import "moment-duration-format";

//BySite Active
function BySite({ to, children, onClick, className }) {
  return <div className={className} onClick={onClick}>{children}</div>;
}

export default function Sitemenu({ tickets }) {     
const [activeSite, setActiveSite] = useState('all');

//Site 별 나열 로직
const handleSiteClick = (site) => {
  setActiveSite(site);
};

return( 
  <div className='openticket-container'>
      <menu className='by-site'>
        <div className={`site-logo ${activeSite === 'all' ? 'active' : ''}`} onClick={() => handleSiteClick('all')}>
            <img src="/img/siteicon/all.png" alt="ALL" />
        </div>
        <div className={`site-logo ${activeSite === 'Interpark Ticket' ? 'active' : ''}`} onClick={() => handleSiteClick('Interpark Ticket')}>
            <img src="/img/siteicon/interpark.jpg" alt="인터파크" />
        </div>
        <div className={`site-logo ${activeSite === 'ticketlink' ? 'active' : ''}`} onClick={() => handleSiteClick('ticketlink')}>
            <img src="/img/siteicon/ticketlink.jpg" alt="티켓링크" />
        </div>
        <div className={`site-logo ${activeSite === 'Melon Ticket' ? 'active' : ''}`} onClick={() => handleSiteClick('Melon Ticket')}>
            <img src="/img/siteicon/melon.jpg" alt="멜론" />
        </div>
        <div className={`site-logo ${activeSite === 'yes24' ? 'active' : ''}`} onClick={() => handleSiteClick('yes24')}>
            <img src="/img/siteicon/yes24.png" alt="YES24" />
        </div>
      </menu>
      <div className='openticket-arrange'>
          {tickets
              .filter(ticket => 
                  activeSite === 'all' || 
                  ticket.eventSites.some(site => site.sales_site === activeSite) // 배열 내 요소와 비교
              )
              .map(ticket => (
                  <div className='openticket' key={ticket.id}>
                      <Link to={`/detail/${ticket.id}`}>
                          <div className='openticket-img'>
                              <img src={ticket.image_url || "/img/normal_poster.png"} alt={`${ticket.event_name} 이미지`} />
                          </div>
                          <div className='openticket-info'>
                              <div className='open-Timer'>
                                  <div className='Timer-banner'>OPEN</div>
                                  <div className='Timer-day'>{calculateDateDifference(ticket.ticket_open_date)}</div>
                                  {ticket.pre_sale_date !== null ? <div className='pre-banner'>선예매</div> : null}
                              </div>
                              <div className='title'>{ticket.event_name}</div>
                              <div className='day'>{moment(ticket.ticket_open_date).locale('ko').format('M.DD(ddd) HH:mm')}</div>
                              <div className='day2'>
                                        공연 날짜 :
                                        {ticket.event_start_date && ticket.event_end_date ? (
                                            <>
                                                {moment(ticket.event_start_date).locale('ko').format('M.DD')}~
                                                {moment(ticket.event_end_date).locale('ko').format('M.DD')}
                                            </>
                                        ) : (
                                            <span>정보 없음</span>
                                        )}
                                    </div>      
                              <div className='tic-site2'>
                                  {ticket.eventSites.map(site => (
                                      <img src={getImageForSite(site.sales_site)} alt={site.sales_site} key={site.id} />
                                  ))}
                              </div>
                          </div>
                      </Link>
                  </div>
              ))}
      </div>      
  </div>
);
}
