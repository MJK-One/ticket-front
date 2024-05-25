import React, { useState, useEffect } from 'react';
import { getAll } from './api/connect'; // API 함수를 불러옵니다.

function Test() {
    // tickets 상태를 생성하고, 초기값은 빈 배열로 설정합니다.
    const [tickets, setTickets] = useState([]);

    // 컴포넌트가 마운트될 때 getAll() 함수를 호출하여 데이터를 불러옵니다.
    useEffect(() => {
        // 데이터를 비동기적으로 불러옵니다.
        const fetchData = async () => {
            try {
                const result = await getAll(); // API 호출
                setTickets(result); // 결과를 tickets 상태에 저장
            } catch (error) {
                console.error('데이터를 불러오는 데 실패했습니다.', error);
            }
        };

        fetchData();
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 합니다.

    return (
        <main id="contents">
            <div>
                {/* tickets 배열을 맵핑하여 각 티켓 정보를 화면에 출력합니다. */}
                {tickets.map(ticket => (
                    <div key={ticket.id}>
                        <h3>{ticket.event_name}</h3>
                        {/* 필요한 다른 정보들도 여기에 추가할 수 있습니다. */}
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Test;
