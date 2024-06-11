import React from 'react';
import { Link } from 'react-router-dom';
import './ticketlist.css';
import moment from 'moment';
import 'moment/locale/ko';
import calculateDateDifference from './calculateDateDifference'; 
import getImageForSite from '../componet/getImageForSite';
export default function Ticketlist({ allTickets }) {  
    return (
    <div className='openticketlist-container'>
        <div className='openticket-all'>
            <div className='all'>
            토우 티켓오픈
            </div>
        </div>
        <div className='openticket-list'>
            {allTickets.map(ticket => (
            <div className='openticket' key={ticket.id}>
                <Link to={`/detail/${ticket.id}`}>
                <div className='openticket-img'>
                    <img src={ticket.image_url} alt={`${ticket.event_name} 이미지`} />
                </div>
                <div className='openticket-info'>
                    <div className='open-Timer'>
                    <div className='Timer-banner'>OPEN</div>
                    <div className='Timer-day'>{calculateDateDifference(ticket.ticket_open_date)}</div>
                    {
                        ticket.pre_sale_date !== null ? <div className='pre-banner'>선예매</div> : null
                    }
                    </div>
                    <div className='title'>{ticket.event_name}</div>
                    <div className='day'>{moment(ticket.ticket_open_date).locale('ko').format('M.DD(ddd) HH:mm')}</div>      
                    <div className='tic-site2'><img src={getImageForSite(ticket.sales_site)} alt={ticket.sales_site} /></div>
                </div>
                </Link>
            </div>
            ))}
        </div>
      </div>   
    )};