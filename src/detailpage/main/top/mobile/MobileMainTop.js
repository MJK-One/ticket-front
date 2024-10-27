import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './MobileMainTop.css';

const MobileMainTop = () => {
    // 화면 크기 체크 함수
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    //데이터 불러오기
    const detail = useSelector((state) => state.details.detail);
    const status = useSelector((state) => state.details.status);
    const error = useSelector((state) => state.details.error);

    const [genre, setGenre] = useState(detail.genre || "정보 없음");
    const genreText = "장르 > " + genre;

    const [prdTitle, setPrdTitle] = useState(detail.event_name || "NONAME");//상품 제목
    const [prdPosterSrc, setPrdPosterSrc] = useState(detail.image_url || "/img/normal_poster.png");//포스터 이미지 링크
    
    const [regDate, setRegDate] = useState(detail.registration_date || "정보 없음"); //등록일
    const [view, setView] = useState(detail.ticketViews.view_cnt);

     //티켓 하트 버튼 이벤트
     const prdHeartNum = 7554; //좋아요 수(하트 버튼)
     const [isHeartBtn, setIsHeartBtn] = useState(false);
         /* 이벤트 함수 */
     const HeartBtnHandler = () => {
         setIsHeartBtn(!isHeartBtn); //클릭되면 상태를 반전함
         //숫자 아직 적용 안함
     };
 
     // 티켓 알림 버튼 이벤트
     const prdBellNum = 7554; //알림 수
     const [isBellBtn, setIsBellBtn] = useState(false);
     const BellBtnHandler = () => {
         setIsBellBtn(!isBellBtn);
     };

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
        <li className='m-infoItem' key={`m-PMT-info-p-${i}`}>
            <strong className='m-infoLabel'>{item.label}</strong>
            <div className='m-infoDesc'>
                {(item.label === '공연 장소' && item.link !== "#") ? (
                    <a href={item.link} className='m-infoText is-place' target="_blank" rel="noopener noreferrer">{item.text}</a>
                ) : (
                    <p className='m-infoText'>{item.text}</p>
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
        'Yes24': {
            btnClass: "is-yes24",
            btnImgSrc: "/img/other_logo/yes24ticket.png"
        },
        'Ticket Link': {
            btnClass: "is-ticketlink",
            btnImgSrc: "/img/other_logo/ticketlink.png"
        }
    };
    
    const bookingBtn = sitesList.map((item, i) => {
        let { btnClass = "", btnImgSrc = "" } = siteConfig[item.site] || {};
    
        return (
            <li className='m-is-direct' key={`m-PMT-info-bookingbtn-isdirect-${i}`}>
                <a className='m-bookingBtn' href={item.link} target="_blank" rel="noopener noreferrer">
                    <img className={btnClass} src={btnImgSrc} />
                </a>
            </li>
        );
    });

    // 예매 사이트 목록 visible
    const [isBookingVisible, setIsBookingVisible] = useState(false);


    if(status === 'loading') {
        return <div>Loading...</div>;
    }

    if(status === 'failed') {
        return <div>Error: {error}</div>;
    }
    
    //return
    return (
        <div className='m-productMainTop'>

            {/* 포스터, info1(제목, 장르, 좋아요) */}
            <div className='m-p-main-top-top'>
                {/* 포스터 */}
                <div className='m-posterBox'>
                    <img className='m-posterBoxImage' src={prdPosterSrc} alt={prdTitle} key={`m-PMT-info-component-posterBox`}/>
                </div>

                {/* info */}
                <div className='m-infoBox-top'>
                    <div className='m-prd-title-genre-wrap'>
                        {/* 제목 */}
                        <div className='m-prdTitle' key={`m-PMT-info-component-prdTitle`}>
                            {prdTitle}
                        </div>

                        {/* 장르 */}
                        <div className='m-genre' key={`m-PMT-info-component-genreText`}>
                            <span>{genreText}</span>
                        </div>
                    </div>

                    <div className='m-prdCast' key={`m-PMT-info-component-prdCast`}>
                        {/* 좋아요 */}
                        <div className='m-prdCastWrap'>
                            <a className='m-prdCastBtn' role='checkbox' onClick={HeartBtnHandler}>
                                <img src={isHeartBtn ? "/img/icon/detail/heart_on.png" : "/img/icon/detail/heart_off.png"} />
                                <p className='m-prdCastName'>좋아요</p>
                                <p className='m-prdCastNum'>{prdHeartNum}</p>
                            </a>
                        </div>

                        {/* 알림 */}
                        {isHeartBtn && (
                            <div className='m-prdCastWrap'>
                                <a className='m-prdCastBtn' role='checkbox' onClick={BellBtnHandler}>
                                    <img src={isBellBtn ? "/img/icon/detail/bell_on.png" : "/img/icon/detail/bell_off.png"} />
                                    <p className='m-prdCastName'>알림</p>
                                    <p className='m-prdCastNum'>{prdBellNum}</p>
                                </a>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* info2(기간, 장소, 오픈, 선예매) */}
            <div className='m-p-main-top-bottom'>
                {/* info */}
                <div className='m-infoBox-bottom'>
                    <ul className='m-info' key={`m-PMT-info-component-info`}>
                        {infoItem}
                    </ul>
                </div>
            </div>

            {/* 예매버튼(아래쪽에 고정) */}
            <div className='m-p-main-top-book-btns-wrap'>
                {/* 예매 버튼 */}
                {isBookingVisible ? (
                    <div className='m-p-main-top-bookig-tap'>
                        <div className='m-btns-close-btn-wrap'>
                            <button className='m-btns-close-btn' onClick={() => setIsBookingVisible(false)} >×</button>
                        </div>
                        <ul className='m-btns' key={`m-PMT-info-component-btns`}>
                            {bookingBtn}
                        </ul>
                    </div>
                ): (
                    <ul className='m-btn' key={`m-PMT-info-component-btn`}>
                        <li className='m-is-main'>
                            <a className='m-bookingBtn' href='#' onClick={() => setIsBookingVisible(true)}>
                                <span>예매 사이트 바로가기</span>
                            </a>
                        </li>
                    </ul>
                )}

            </div>

        </div>
    );
};
export default MobileMainTop;