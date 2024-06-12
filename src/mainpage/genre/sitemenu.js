import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sitemenu.css'
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
          <BySite
              to="all"
              onClick={() => handleSiteClick('all')}
              className={activeSite === 'all' ? 'active' : ''}
          >ALL</BySite>
          <BySite
              to="interpark"
              onClick={() => handleSiteClick('Interpark Ticket')}
              className={activeSite === 'Interpark Ticket' ? 'active' : ''}
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
                              <img src={ticket.image_url} alt={`${ticket.event_name} 이미지`} />
                          </div>
                          <div className='openticket-info'>
                              <div className='open-Timer'>
                                  <div className='Timer-banner'>OPEN</div>
                                  <div className='Timer-day'>{calculateDateDifference(ticket.ticket_open_date)}</div>
                                  {ticket.pre_sale_date !== null ? <div className='pre-banner'>선예매</div> : null}
                              </div>
                              <div className='title'>{ticket.event_name}</div>
                              <div className='day'>{moment(ticket.ticket_open_date).locale('ko').format('M.DD(ddd) HH:mm')}</div>      
                              <div className='tic-site1'>
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
