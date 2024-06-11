import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './MainTop.css';

const MainTop = () => {
    //데이터 불러오기
    const detail = useSelector((state) => state.details.detail);
    const status = useSelector((state) => state.details.status);
    const error = useSelector((state) => state.details.error);

    const [genre, setGenre] = useState(detail.genre || "정보 없음");
    const genreText = "> " + genre;

    const [prdTitle, setPrdTitle] = useState(detail.event_name || "NONAME");//상품 제목
    const [prdPosterSrc, setPrdPosterSrc] = useState(detail.image_url || "/img/normal_poster.png");//포스터 이미지 링크
    
    const [regDate, setRegDate] = useState(detail.registration_date || "정보 없음"); //등록일
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
    const [infoPeriod, setInfoPeriod] = useState("정보 없음")
    
    useEffect(() => {
        if((startDate !== null && startDate.length > 0) && (endDate !== null && endDate.length > 0)){
            if(startDate !== endDate) {
                setInfoPeriod(startDate + " ~ " + endDate);
            } else {
                setInfoPeriod(startDate);
            }
        }
    }, [startDate, endDate]);

    //장소
    const [placeData, setPlaceData] = useState(detail.venue);
    const [infoPlace, setInfoPlace] = useState("정보 없음");
    const [placeLink, setPlaceLink] = useState("#");

    useEffect(() => {
        if(placeData !== null && placeData.length > 0){
            setInfoPlace(placeData + " ▸");
            const placeList = placeData.split(/\s+/g);
            const placeStr = placeList.join('+');
            setPlaceLink("https://map.naver.com/p/search/" + placeStr);
        }
    }, [placeData]);

    const [infoOpenDateTime, setInfoOpenDateTime] = useState(detail.ticket_open_date || "정보 없음");
    const [infoPreOpenDateTime, setInfoPreOpenDateTime] = useState(detail.pre_sale_date || "정보 없음");

    const infoList = [
        {label: '공연 기간', text: infoPeriod},
        {label: '공연 장소', text: infoPlace, link: placeLink},
        {label: '티켓 오픈', text: infoOpenDateTime},
        {label: '선예매 오픈', text: infoPreOpenDateTime}]; //p 또는 a 태그인 info

    const infoItem = infoList.map((item, i) => (
        <li className='infoItem' key={`PMT-info-p-${i}`}>
            <strong className='infoLabel'>{item.label}</strong>
            <div className='infoDesc'>
                {(item.label === '공연 장소' && item.link !== "#") ? (
                    <a href={item.link} className='infoText is-place' target="_blank" rel="noopener noreferrer">{item.text}</a>
                ) : (
                    <p className='infoText'>{item.text}</p>
                )}
            </div>
        </li>
    ));

    //예매 바로가기 버튼
    const [sitesList, setSiteList] = useState([]);
    useEffect(() => {
        if (detail.eventSites) {
            const newSitesList = detail.eventSites.map(site => ({
                link: site.detail_link,
                site: site.sales_site
            }));
            setSiteList(newSitesList);
        }
    }, [detail]); 
    
    const siteConfig = {
        'Melon Ticket': {
            btnClass: "is-melon",
            btnImgSrc: "/img/other_logo/melon.png"
        },
        'Interpark Ticket': {
            btnClass: "is-interpark",
            btnImgSrc: "/img/other_logo/interpark.png"
        },
        'Yes24 Ticket': {
            btnClass: "is-yes24",
            btnImgSrc: "/img/other_logo/yes24ticket.png"
        },
        'Ticketlink': {
            btnClass: "is-ticketlink",
            btnImgSrc: "/img/other_logo/ticketlink.png"
        }
    };
    
    const bookingBtn = sitesList.map((item, i) => {
        let { btnClass = "", btnImgSrc = "" } = siteConfig[item.site] || {};
    
        return (
            <li className='is-direct' key={`PMT-info-bookingbtn-isdirect-${i}`}>
                <a className='bookingBtn' href={item.link} target="_blank" rel="noopener noreferrer">
                    <img className={btnClass} src={btnImgSrc} />
                </a>
            </li>
        );
    });

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
                            <div className='genreText' key={`PMT-info-component-genreText`}>
                                <span>{genreText}</span>
                            </div>
                        </div>
                        <h2 className='prdTitle' key={`PMT-info-component-prdTitle`}>{prdTitle}</h2>
                    </div>
                    
                    <div className='summaryTopRight'>
                        <div className='regDate' key={`PMT-info-component-regDate`}>
                            <div className='regDateText'>
                                <span>등록일: {regDate}</span>
                            </div>
                        </div>
                        <div className='view' key={`PMT-info-component-view`}>
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
                            <img className='posterBoxImage' src={prdPosterSrc} alt={prdTitle} key={`PMT-info-component-posterBox`}/>
                        </div>

                        {/* 좋아요 */}
                        <div className='posterBoxBottom'>
                            <div className='prdCast' key={`PMT-info-component-prdCast`}>
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
                        <ul className='info' key={`PMT-info-component-info`}>
                            {infoItem}
                        </ul>

                        {/* 예매 버튼 */}
                        <ul className='btnList' key={`PMT-info-component-btnList`}>
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