import React, { useState } from 'react';
import './openticket.css';

//BySite Active
function BySite({ to, children, onClick, className }) {
  return <div className={className} onClick={onClick}>{children}</div>;
}

export default function Openticket() {
  
  const [activeSite, setActiveSite] = useState('');

  //Site 별 나열 로직
  const handleSiteClick = (site) => {
    setActiveSite(site);
    
  };

  return (
    <div className='openticket-container'>
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
        {[...Array(12)].map((value, index) => {  
        return (  
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
              <div className='day'>2024.4.10</div>
            </div>
          </div>  
          );  
        })}
      </div>      
    </div>
  );
}
