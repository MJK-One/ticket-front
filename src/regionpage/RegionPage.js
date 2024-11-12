import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetCurPage, resetAllSearchResult, setRegionFilter } from '../store/slice/searchSlice';
import { fetchRegion } from '../store/slice/regionSlice';

import KoreaMap from '../component/koreaMap/koreaMap';
import './RegionPage.css';

const RegionPage =  () => {
    //전역 상태
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // region slice
    const status = useSelector((state) => state.regions.status);
    const error = useSelector((state) => state.regions.error);
    const click = useSelector((state) => state.regions.click);
    const region = useSelector((state) => state.regions.region);

    //지역별 top6 리스트
    const [regionItemList, setRegionItemList] = useState([]);

    //데이터 불러오기
    useEffect(() => {
        dispatch(fetchRegion(click));
    }, [dispatch, click]);

    //지역 리스트 상태 변경 업데이트
    useEffect(() => {
        if(status === 'succeeded' && region) {
            const newRegionList = region.map(item => {
                const period = item.event_start_date === item.event_end_date
                    ? item.event_start_date
                    : `${item.event_start_date} ~ ${item.event_end_date}`;
                
                const imageUrl = item.image_url || "/img/normal_poster.png";

                return {
                    id: item.id,
                    name: item.event_name,
                    period: period,
                    image_url: imageUrl
                };
            });
            setRegionItemList(newRegionList);
        }
    }, [region, status]);

    // 화면 크기 체크 함수
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // submit 이벤트 함수
    const SubmitRegionHandler = () => {
        // 이전 검색 결과 초기화
        dispatch(resetCurPage());
        dispatch(resetAllSearchResult());

        const region = [click];

        //slice 제어
        dispatch(setRegionFilter(region)); //지역 필터

        navigate("/search");
    };

    const [isMapVisible, setIsMapVisible] = useState(false);

    // if(status === 'loading') {
    //     return <div>Loading...</div>;
    // }

    // if(status === 'failed') {
    //     return <div>Error: {error}</div>;
    // }

    return (
        <div id="region-mainContainer">
            <div className="contents">

                <div className="leftBox">
                    <div className='leftBoxTop'>
                        <span className='regionTitle'>{click}</span>
                        {windowWidth < 1100 && (
                            <>
                                {isMapVisible && (
                                    <button onClick={() => setIsMapVisible(false)} className='regionTitle-btn'>
                                        ▲
                                    </button>
                                )}
                                {isMapVisible === false && (
                                    <button onClick={() => setIsMapVisible(true)} className='regionTitle-btn'>
                                        ▼
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                    {windowWidth < 1100 ? (
                        <>
                            {isMapVisible && (
                                <div className='leftBoxBottom'>
                                    <div className='mapImg'>
                                        <KoreaMap />
                                    </div>
                                </div>
                            )}
                        </>
                        
                    ) : (
                        <div className='leftBoxBottom'>
                            <div className='mapImg'>
                                <KoreaMap />
                            </div>
                        </div>
                    )}
                </div>

                <div className="rightBox">
                    <div className="rightBoxTop">

                        { regionItemList && regionItemList.length > 0 ? (
                            regionItemList.map(item => (
                            <Link to={`/detail/${item.id}`}>
                                <div className="wrapBox" key="region_page_wrapBox_comp">
                                    <div className="posterImg" key="region_page_posterImg_comp">
                                        <img src={item.image_url} />
                                    </div>
                                    <div className="textWrap" key="region_page_textWrap_comp">
                                        <span className="posterTitle" key="region_page_posterTitle_comp">{item.name}</span>
                                        <span className="posterDate" key="region_page_posterDate_comp">{item.period || "정보없음"}</span>
                                    </div>
                                </div>
                            </Link>
                            ))
                        ) : (
                            <p className='no_result'>결과 없음</p>
                        )}

                    </div>

                    <div className="rightBoxBottom">
                        <button className="regionGoBtn" onClick={SubmitRegionHandler}>지역별 공연 전체보기</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
};

export default RegionPage;