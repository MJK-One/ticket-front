import React, {useState} from 'react';
import './ticketlist.css'

function Ticektlist() {
    const [ticketArray, setTicketArray] = useState([...Array(8)]); // 배열의 상태와, 그 상태를 업데이트 할 함수를 정의합니다.
    const [showButton, setShowButton] = useState(true); // 버튼 표시 여부의 상태와, 그 상태를 업데이트 할 함수를 정의합니다.

    // 버튼 클릭 이벤트 핸들러입니다.
    const handleClick = () => {
        setTicketArray([...Array(16)]); // 배열의 크기를 16으로 변경합니다.
        setShowButton(false); // 버튼을 숨깁니다.
    };

    return (
        <div className='ticketlist'>
            <div class="tl-t">티켓오픈</div>
            <div class="tl-con">
                <div className='s-openticket-arrange'>
                    {ticketArray.map((value, index) => {  
                        return (  
                            <div className='s-openticket' key={index}>
                                <div className='s-openticket-img'>
                                    이미지
                                </div>
                                <div className='s-openticket-info'>
                                    <div className='s-open-Timer'>
                                        <div className='s-Timer-banner'>OPEN</div>
                                        <div className='s-Timer-day'>D-1 12:00</div>
                                    </div>
                                    <div className='s-title'>오픈티켓 제목</div>
                                    <div className='s-day'>2024.4.10</div>
                                </div>
                            </div>  
                        );  
                    })}
                </div>  
                {showButton && <button className="s-tl-plus" id="tl-plus" onClick={handleClick}>티켓오픈 더보기</button>}
            </div>
        </div>
    ); 
}    

export default Ticektlist;