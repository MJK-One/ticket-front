import React, { useState, useEffect } from 'react';
import './main.css';
import MainTop from '../componet/mainTop';
import Monthticket from './monthticket';
import Ticketlist from '../componet/ticketlist';
import { getmonth, getTop10, getalllist} from '../../api/connect'; // API 함수를 불러옵니다.

function Main() {
    const [top10Tickets, setTop10Tickets] = useState([]); // 상태 추가
    const [monthTickets, setMonthTickets] = useState([]); // 상태 추가
    const [allTickets, setAllTickets] = useState([]); // 상태 추가

    // 컴포넌트가 마운트될 때 데이터를 불러옵니다.
    useEffect(() => {
        const fetchData = async () => {
            try {
                const top10Result = await getTop10(); // getTop10 API 호출
                setTop10Tickets(top10Result); // 결과를 top10Tickets 상태에 저장

                const monthResult = await getmonth(); // API 호출
                setMonthTickets(monthResult); // 결과를 monthTickets 상태에 저장

                const allResult = await getalllist(); // API 호출
                setAllTickets(allResult); // 결과를 monthTickets 상태에 저장
            } catch (error) {
                console.error('데이터를 불러오는 데 실패했습니다.', error);
            }
        };
        fetchData();
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 합니다.

    return (
        <main id="contents">
            <section className='maintop'>
                <MainTop top10Tickets={top10Tickets} /> {/* top10Tickets를 MainTop에 props로 전달*/}
            </section> 
            <section className='ticket-month'>
                <Monthticket monthTickets={monthTickets} /> {/* monthTickets를 Monthticket에 props로 올바르게 전달 */}
            </section>
            <section className='ticket-list'>
                <Ticketlist allTickets={allTickets} /> {/* allTikcets를 Ticketlist에 props로 올바르게 전달 */}
            </section>
        </main>
    );   
}

export default Main;
