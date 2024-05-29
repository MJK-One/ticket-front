import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './MainTop.css';

const MainTop = () => {
    //데이터 불러오기
    const detail = useSelector((state) => state.details.detail);
    const status = useSelector((state) => state.details.status);
    const error = useSelector((state) => state.details.error);

    const [genre, setGenre] = useState(detail.genre);
    const genreText = "> " + genre;

    const [prdTitle, setPrdTitle] = useState(detail.event_name);//상품 제목
    const [prdPosterSrc, setPrdPosterSrc] = useState(detail.image_url);//포스터 이미지 링크
    
    const [regDate, setRegDate] = useState(detail.registration_date); //등록일
    const [view, setView] = useState(detail.view_count);

    //티켓캐스트 하트 버튼 이벤트
    const prdCastNum = 7554; //좋아요 수(하트 버튼)
    const [isTkHeartBtn, setisTkHeartBtn] = useState(false);
        /* 이벤트 함수 */
    const tkHeartBtnHandler = () => {
        setisTkHeartBtn(!isTkHeartBtn); //클릭되면 상태를 반전함
        //숫자 아직 적용 안함
    }

        //p or a tag 항목
    //데이터 불러오기
    const [startDate, setStartDate] = useState(detail.event_start_date);
    const [endDate, setEndDate] = useState(detail.event_end_date);
    const infoPeriod = startDate + " ~ " + endDate;

    const [placeData, setPlaceData] = useState(detail.venue); //장소
    const infoPlace = placeData + " ▸";
    const placeList = placeData.split(/\s+/g);
    const placeStr = placeList.join('+');
    const placeLink = "https://map.naver.com/p/search/" + placeStr;

    const [infoOpenDateTime, setInfoOpenDateTime] = useState(detail.ticket_open_date);
    const [infoPreOpenDateTime, setInfoPreOpenDateTime] = useState(detail.pre_sale_date);
    if(infoOpenDateTime === null){setInfoOpenDateTime("정보없음")};
    if(infoPreOpenDateTime === null){setInfoPreOpenDateTime("정보없음")};

    const infoList = [
        {label: '공연 기간', text: infoPeriod},
        {label: '공연 장소', text: infoPlace, link: placeLink},
        {label: '티켓 오픈', text: infoOpenDateTime},
        {label: '선예매 오픈', text: infoPreOpenDateTime}]; //p 또는 a 태그인 info

    const infoItem = infoList.map((item, i) => (
        <li className='infoItem' key={`PMT-info-p-${i}`}>
            <strong className='infoLabel'>{item.label}</strong>
            <div className='infoDesc'>
                {item.label === '공연 장소' ? (
                    <a href={item.link} className='infoText is-place' target="_blank" rel="noopener noreferrer">{item.text}</a>
                ) : (
                    <p className='infoText'>{item.text}</p>
                )}
            </div>
        </li>
    ));

    //예매 바로가기 버튼
    const [salesSite, setSalesSite] = useState(detail.sales_site);
    const [detailLink, setDetailLink] = useState(detail.detail_link);
    const bookingBtn = (
        <li className='is-direct'>
            <a className='bookingBtn' href={detailLink}>
                <span>멜론 티켓 바로가기</span>
            </a>
        </li>
    );

    if(status === 'loading') {
        return <div>Loading...</div>;
    }

    if(status === 'failed') {
        return <div>Error: {error}</div>;
    }
    
    //return
    return (
        <div className='productMainTop'>
            <div className='summary'>
                {/* 장르, 제목 */}
                <div className='summaryTop'>
                    <div className='summaryTopLeft'>
                        <div className='genre'>
                            <div className='genreText'>
                                <span>{genreText}</span>
                            </div>
                        </div>
                        <h2 className='prdTitle'>{prdTitle}</h2>
                    </div>
                    
                    <div className='summaryTopRight'>
                        <div className='regDate'>
                            <div className='regDateText'>
                                <span>등록일: {regDate}</span>
                            </div>
                        </div>
                        <div className='view'>
                            <div className='viewText'>
                                <span>조회수: {view}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 포스터, 정보 */}
                <div className='summaryBody'>
                    <div className='posterBox'>
                        {/* 포스터 이미지 */}
                        <div className='posterBoxTop'>
                            <img className='posterBoxImage' src={prdPosterSrc} alt={prdTitle} />
                        </div>

                        {/* 좋아요 */}
                        <div className='posterBoxBottom'>
                            <div className='prdCast'>
                                <div className='prdCastWrap'>
                                    <a className={`prdCastBtn ${isTkHeartBtn ? 'is-toggled' : ''}`} role='checkbox' onClick={tkHeartBtnHandler}>
                                        좋아요
                                    </a>
                                    <p className='prdCastNum'>{prdCastNum}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='infoBox'>
                        <ul className='info'>
                            {infoItem}
                        </ul>

                        {/* 예매 버튼 */}
                        <ul className='btnList'>
                            <li className='is-main'>
                                <a className='bookingBtn' href='#'>
                                    <span>예매 사이트 바로가기</span>
                                </a>
                            </li>
                            {bookingBtn}
                        </ul>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    );
};
export default MainTop;