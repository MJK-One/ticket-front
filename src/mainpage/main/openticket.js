import React from 'react';
import './mon-ticket.css';

export default function Openticket() {
  return (
    <div className='openticket-con'>
        {[...Array(10)].map((value, index) => {  
        return (  
          <div className='openticket' key={index}>
            <div className='openticket-img'>
            </div>
            <div className='openticket-info'>
              <div>오픈티켓 날짜</div>
              <div>오픈티켓 제목</div>
            </div>
          </div>  
        );  
      })} 
    </div>
  );
}
