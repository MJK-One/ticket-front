import React, { useState, useEffect, useRef, useCallback } from 'react';
import './main.css';
import MainTop from '../componet/mainTop';
import Monthticket from './monthticket';
import Ticketlist from '../componet/ticketlist';
import { getMonth, getTop10, getAllList } from '../../api/connect';

function Main() {
    const [top10Tickets, setTop10Tickets] = useState([]);
    const [monthTickets, setMonthTickets] = useState([]);
    const [allTickets, setAllTickets] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const top10Result = await getTop10();
                setTop10Tickets(top10Result);

                const monthResult = await getMonth();
                setMonthTickets(monthResult);
                // 서버에서 현재 페이지의 티켓 데이터를 가져옴
                const allResult = await getAllList(page, 10);
                // 이전 티켓 배열에 새로운 티켓 배열을 추가하여 상태 업데이트
                setAllTickets(prevTickets => [...prevTickets, ...allResult]);
                // 더 가져올 데이터가 있는지 여부를 상태로 설정
                // 스크롤할 때마다 page가 증가하고, 새로운 데이터를 불러와 화면에 추가
                setHasMore(allResult.length > 0);
            } catch (error) {
                console.error('데이터를 불러오는 데 실패했습니다.', error);
            }
        };
        fetchData();
    }, [page]);

    const lastTicketElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [hasMore]);

    return (
        <main id="contents">
            <section className='maintop'>
                <MainTop top10Tickets={top10Tickets} />
            </section> 
            <section className='ticket-month'>
                <Monthticket monthTickets={monthTickets} />
            </section>
            <section className='ticket-list'>
                <Ticketlist allTickets={allTickets} lastTicketElementRef={lastTicketElementRef} />
            </section>
        </main>
    );   
}

export default Main;
