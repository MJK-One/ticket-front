import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API_SERVER_HOST } from '../../api/connect';
import './ticketlist.css'
import axios from 'axios';

function Ticektlist() {
    // slice 선언
    const searchSlice = useSelector((state) => state.searchs.search);

    // 페이지 변수
    const [curPageNum, setCurPageNum] = useState(0); //현재 페이지 번호
    const [totalPageNum, setTotalPageNum] = useState(0); //전체 페이지 수

    // 총 결과 데이터 개수
    const [totalDataNum, setTotalDataNum] = useState(0);

    // slice 변경 사항 있을 시 업데이트
    useEffect(() => {
        // 검색 파라미터 설정
        const searchParams = {
            genreFilter: searchSlice.genreFilter, // 장르
            regionFilter: searchSlice.regionFilter, //지역
            period: searchSlice.period, // 공연 기간
            searchKeyword: searchSlice.searchKeyword, //검색어
            pageNum: curPageNum
        };

        async function getSearchData() {
            try {
                const response = await axios.post(`${API_SERVER_HOST}/getSearchData`, searchParams);
                const { content, totalElements, totalPages } = response.data;
    
                // 받은 데이터를 처리하는 로직 추가
                console.log("검색 결과:", content);
                console.log("총 데이터 개수:", totalElements);
                console.log("총 페이지 수:", totalPages);
                setTotalDataNum(totalElements);
                setTotalPageNum(totalPages);
            } catch (error) {
                console.error("에러: ", error);
            }
        }

        getSearchData();
    }, [searchSlice, curPageNum]);

    // 정렬 방식 선택
    const [selectedSorting, setSelectedSorting] = useState("popular");
    const sortClickHandler = (sorting) => {
        setSelectedSorting(sorting);
    };
    
    //
    const [ticketArray, setTicketArray] = useState([...Array(8)]); // 배열의 상태와, 그 상태를 업데이트 할 함수를 정의합니다.
    const [showButton, setShowButton] = useState(true); // 버튼 표시 여부의 상태와, 그 상태를 업데이트 할 함수를 정의합니다.

    // 버튼 클릭 이벤트 핸들러입니다.
    const handleClick = () => {
        setTicketArray([...Array(16)]); // 배열의 크기를 16으로 변경합니다.
        setShowButton(false); // 버튼을 숨깁니다.
    };

    //데이터
    const tickets = [
        {
          id: 1,
          timer: 'D-1 12:00',
          title: '오픈티켓 제목 1',
          date: '2024.4.10',
        },
        {
          id: 2,
          timer: 'D-2 15:00',
          title: '오픈티켓 제목 2',
          date: '2024.4.11',
        },
      ];

    return (
        <div className='ticketlist'>
            <div className='tl-top-wrap'>
                <div className='tl-t-wrap'>
                    <div class="tl-t">티켓오픈</div>
                    <div className='tl-st' key={'tl-subTitle'}>{`(${totalDataNum})`}</div>
                </div>
                <ul className='tl-sort-ul' key={'tl-sort-ul'}>
                    <li className={`tl-sort-li ${selectedSorting === "popular" ? "selected" : null}`}
                        onClick={() => sortClickHandler("popular")}
                        key={'tl-sort-popular'}>
                        인기순
                    </li>
                    <li className={`tl-sort-li ${selectedSorting === "view" ? "selected" : null}`}
                        onClick={() => sortClickHandler("view")}
                        key={'tl-sort-view'}>
                        조회순
                    </li>
                </ul>
            </div>
            
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
                                        <div className='s-Timer-day'>D-1</div>
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