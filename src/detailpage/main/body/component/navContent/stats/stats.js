import React, { useState } from 'react';
import './stats.css';

const NavStats = (props) => {
    // 티켓 아이디
    const ticketId = props.tid;

    // 예매자 통계 데이터(가데이터)
        // 연령
    const statAgeData = [
        {age: '10대', percent: 3.4},
        {age: '20대', percent: 25.8},
        {age: '30대', percent: 35.1},
        {age: '40대', percent: 24.7},
        {age: '50대', percent: 9.4},
        {age: '60대', percent: 0}
    ];

    const statAgeList = Array.from({length: statAgeData.length}).map((_, i) => {
        let statBackHeight = 4.5; //rem 단위
        let statAgePer = statAgeData[i].percent;
        let statGraphHeight = (statBackHeight * (statAgePer / 100)).toFixed(2); //소수점 2자리로 반올림

        return (
            <div className='statAgeType' key={`MB-info-age-${i}`}>
                <div className='statAgePercent'>{`${statAgePer}%`}</div>
                <div className='statBack'>
                    {/* 퍼센트에 맞게 높이 조절 */}
                    <span className='statGraph' data-stat-bar={statAgePer} style={{height: statGraphHeight + 'rem'}}></span>
                </div>
                <div className='statAgeName'>{statAgeData[i].age}</div>
            </div> 
        );
    });

    //
    return (
        <div className='prdContents detail'>
            {/* 관심 통계 */}
            <div className='content prdStat'>
                <h3 className='contentTitle'>관심 등록 유저 통계</h3>
                <div className='statWrap'>
                    {/* 연령 */}
                    <div className='statAge'>
                        <strong className='statTitle'>연령</strong>
                        <div className='statAgeBar'>
                            {statAgeList}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};
export default NavStats;
