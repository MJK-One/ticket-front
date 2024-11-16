import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API_SERVER_HOST } from '../../../../../../api/connect';
import './stats.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NavStats = () => {
    //
    const detail = useSelector((state) => state.details.detail);
    const like = useSelector((state) => state.details.like);

    // 화면 크기 체크 함수
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 예매자 통계 데이터
        // 연령
    const [ageData, setAgeData] = useState(null);
    useEffect(() => {
        async function fetchLikePerForAge(tId) {
            try {
                const res = await axios.get(`${API_SERVER_HOST}/ticketLikePer?tId=${tId}`);
                setAgeData(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchLikePerForAge(detail.id);
    }, [detail.id, like]);

    const [statAgeData, setStatAgeData] = useState(null);
    useEffect(() => {
        if(ageData) {
            setStatAgeData([
                {age: '10대', percent: ageData.perFor10},
                {age: '20대', percent: ageData.perFor20},
                {age: '30대', percent: ageData.perFor30},
                {age: '40대', percent: ageData.perFor40},
                {age: '50대', percent: ageData.perFor50},
                {age: '60대', percent: ageData.perFor60}
            ]);
        } else {
            setStatAgeData(null);
        }
    }, [ageData]);

    const [statAgeList, setStatAgeList] = useState(null);
    useEffect(() => {
        if(statAgeData) {
            setStatAgeList(
                Array.from({length: statAgeData.length}).map((_, i) => {
                    let statBackHeight = 4.5; //rem 단위
                    let statAgePer = statAgeData[i].percent;
                    let statGraphHeight = (statBackHeight * (statAgePer / 100)).toFixed(2); //소수점 2자리로 반올림
            
                    return (
                        <div className='statAgeType' key={`MB-info-age-${i}`}>
                            <div className='statAgePercent'>{`${statAgePer}%`}</div>
                            <div className='statBack'>
                                {/* 퍼센트에 맞게 높이 조절 */}
                                <span className='statGraph' data-stat-bar={statAgePer} style={ windowWidth > 430 ? {height: statGraphHeight + 'rem'} : {width: statGraphHeight + 'rem'}}></span>
                            </div>
                            <div className='statAgeName'>{statAgeData[i].age}</div>
                        </div> 
                    );
                })
            )
        } else {
            setStatAgeList(null);
        }
    }, [statAgeData, windowWidth]);


    // 유저들이 좋아요 한 top5: 장르가 같은 항목 필터링
    const [likeTop5Data, setLikeTop5Data] = useState(null);
    useEffect(() => {
        async function fetchLikeTop5(tId) {
            try {
                const res = await axios.get(`${API_SERVER_HOST}/detailTop5?tId=${tId}`);
                if(res.data && res.data.length > 0) {
                    setLikeTop5Data(res.data);
                } else {
                    setLikeTop5Data(null);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchLikeTop5(detail.id);
    }, [detail.id, like]);

    //
    return (
        <div className='prdContents detail'>
            {/* 관심 통계 */}
            {(statAgeList !== null && statAgeList.length > 0) && (
                <div className='content prdStat'>
                    <h3 className='contentTitle'>관심 등록 유저 통계</h3>
                    <div className='statWrap'>
                        <div className='statAge'>
                            <strong className='statTitle'>연령</strong>
                            <div className='statAgeBar'>
                                {statAgeList}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {likeTop5Data && (
                <div className='content prdStat PickStat'>
                    <h3 className='contentTitle'>관심 등록 유저의 선택</h3>
                    <div className='statWrap'>
                        <div className='statPick'>

                            {likeTop5Data.map((item, index) => {
                                return (
                                    <Link to={`/detail/${item.id}`} key={`detailpage-statPick-a-${index}`}>
                                        <div className='pick-item' key={`detailpage-statPick-pick-item-${index}`}>
                                            {/* 포스터 */}
                                            <div className='stat-pick-poster' key={`detailpage-statPick-stat-pick-poster-${index}`}>
                                                {/* 순위 */}
                                                <div className='stat-pick-top-img-wrap'>
                                                    {/* 1등 */}
                                                    {index === 0 && (
                                                        <img src='/img/icon/detail/interest/gold.png' />
                                                    )}

                                                    {/* 2등 */}
                                                    {index === 1 && (
                                                        <img src='/img/icon/detail/interest/silver.png' />
                                                    )}

                                                    {/* 3등 */}
                                                    {index === 2 && (
                                                        <img src='/img/icon/detail/interest/bronze.png' />
                                                    )}

                                                    {/* 4등 */}
                                                    {index === 3 && (
                                                        <img src='/img/icon/detail/interest/4.png' />
                                                    )}

                                                    {/* 5등 */}
                                                    {index === 4 && (
                                                        <img src='/img/icon/detail/interest/5.png' />
                                                    )}
                                                    
                                                </div>

                                                {/* 포스터 이미지 */}
                                                <div className='stat-pick-poster-img-wrap'>
                                                    <img src={item.image_url} />
                                                </div>
                                            </div>

                                            {/* 제목 */}
                                            <div className='stat-pick-title' key={`detailpage-statPick-stat-pick-title-${index}`}>{item.event_name}</div>
                                        </div>
                                    </Link>
                                );
                            })}


                        </div>
                    </div>
                </div>
            )}

        </div>
    );

};
export default NavStats;
