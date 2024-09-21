import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import calculateDateDifference from '../../mainpage/componet/calculateDateDifference';
import getImageForSite from '../../mainpage/componet/getImageForSite';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSearchData, setUpCurPage, resetCurPage, setAllSearchResult, resetAllSearchResult } from '../../store/slice/searchSlice';
import './ticketlist.css'

function Ticektlist() {
    // dispatch
    const dispatch = useDispatch();

    // selecter
    const searchParams = useSelector((state) => state.searchs.searchParams); // 검색 파라미터
    const searchCurPage = useSelector((state) => state.searchs.curPage); // 현재 검색 페이지
    const searchResults = useSelector((state) => state.searchs.searchResults); // 검색 결과 배열
    const totalElements = useSelector((state) => state.searchs.totalElements); // 검색 데이터 총 개수
    const totalPages = useSelector((state) => state.searchs.totalPages); // 검색 데이터 총 페이지 수
    const status = useSelector((state) => state.searchs.status); // 로딩 상태
    const error = useSelector((state) => state.searchs.error); // 에러

    // 페이지 데이터
    const allResults = useSelector((state) => state.searchs.allSearchResults); // 전체 검색 결과

    // 정렬 방식 선택
    const [selectedSorting, setSelectedSorting] = useState("popular");
    const sortClickHandler = (sorting) => {
        setSelectedSorting(sorting);
    };

    useEffect(() => {
        const params = {
            genreFilter: searchParams.genreFilter,
            regionFilter: searchParams.regionFilter,
            period: searchParams.period,
            searchKeyword: searchParams.searchKeyword,
            pageNum: 0,
          };
      
          // 검색 결과 불러오기
          dispatch(fetchSearchData(params));
    },[searchParams]);

    // 검색 결과 변경시 전체 결과 업데이트
    useEffect(() => {
        if(status === 'succeeded') {
            // 페이지 번호가 0
            if(searchCurPage === 0) {
                dispatch(setAllSearchResult(searchResults));
            } else {
                const newArr = allResults.concat(searchResults);
                dispatch(setAllSearchResult(newArr)) // 기존 데이터에 새로운 데이터 추가
            }
        }
    }, [searchResults]);

    // '더보기' 버튼 핸들러
    const loadMoreHandler = () => {
        if(searchCurPage < totalPages) {
            const nextPage = searchCurPage + 1;

            // 검색 파라미터 설정
            const params = {
                genreFilter: searchParams.genreFilter, // 장르
                regionFilter: searchParams.regionFilter, //지역
                period: searchParams.period, // 공연 기간
                searchKeyword: searchParams.searchKeyword, //검색어
                pageNum: nextPage //현재 페이지 번호
            };

            // 검색 데이터 불러오기
            dispatch(fetchSearchData(params));
            // 페이지 번호 증가
            dispatch(setUpCurPage());
        }
    };

    //
    return (
        <div className='ticketlist'>
            <div className='tl-top-wrap'>
                <div className='tl-t-wrap'>
                    <div class="tl-t">티켓오픈</div>
                    {status === 'succeeded' && <div className='tl-st' key={'tl-subTitle'}>{`(${totalElements})`}</div>}
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
                {status === 'loading' && (
                    <div className='s-openticket-arrange'>
                        <div>loading...</div>
                    </div>
                )}
                {status === 'failed' && (
                    <div className='s-openticket-arrange'>
                        <div>error: {error}</div>
                    </div>
                )}
                {(status === 'succeeded' && totalElements === 0) && (
                    <div className='s-openticket-arrange'>
                        <div>결과 없음</div>
                    </div>
                )}
                {(status === 'succeeded' && totalElements !== 0) && (
                    <div className='s-openticket-arrange'>
                        {allResults.map((ticket, index) => {
                            return (  
                                <div className='s-openticket' key={ticket.id}>
                                    <Link to={`/detail/${ticket.id}`}>
                                        <div className='s-openticket-img'>
                                            <img src={ticket.image_url || "/img/normal_poster.png"} alt={`${ticket.event_name} 이미지`} />
                                        </div>
                                        <div className='s-openticket-info'>
                                            <div className='s-open-Timer'>
                                                <div className='s-Timer-banner'>OPEN</div>
                                                <div className='s-Timer-day'>{calculateDateDifference(ticket.ticket_open_date)}</div>
                                                {ticket.pre_sale_date !== null ? <div className='pre-banner'>선예매</div> : null}
                                            </div>
                                            <div className='s-title'>{ticket.event_name}</div>
                                            <div className='s-day'>{moment(ticket.ticket_open_date).locale('ko').format('M.DD(ddd) HH:mm')}</div>
                                            <div className='s-tic-site2'>
                                                {ticket.eventSites.map(site => (
                                                    <img src={getImageForSite(site.sales_site)} alt={site.sales_site} key={site.id} />
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                </div> 
                            );  
                        })}
                    </div>
                )}  
                {(status === 'succeeded' && searchCurPage < totalPages - 1) && (
                    <button className="s-tl-plus" id="tl-plus" onClick={loadMoreHandler}>
                        {`티켓오픈 더보기 (${searchCurPage + 1}/${totalPages - 1})`}
                    </button>
                )}
            </div>
        </div>
    ); 
}    

export default Ticektlist;