import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './Info.css';

const NavInfo = () => {
    //데이터 불러오기
    const detail = useSelector((state) => state.details.detail);
    const status = useSelector((state) => state.details.status);
    const error = useSelector((state) => state.details.error);

    //기본 정보
    const [normalData, setNormalData] = useState(detail.basic_info);
    //공연 소개
    const [intro, setIntro] = useState(detail.event_description);
    //기획사 정보
    const [agency, setAgency] = useState(detail.agency_info);

    //list
    const infoList = [
        {label: '기본 정보', text: normalData},
        {label: '공연 소개', text: intro},
        {label: '기획사 정보', text: agency}
    ];

    const infoItem = infoList.map((item, i) => (
        (item.text !== null && item.text.length > 0) ? (
            <div className='content' key={`MB-info-content${i + 1}`}>
                <h3 className='contentTitle'>{item.label}</h3>
                <div className='contentDetail'>
                    <p className='contentDetailText'>{item.text}</p>
                </div>
            </div>
        ) : null
    ));

    if(status === 'loading') {
        return <div>Loading...</div>;
    }

    if(status === 'failed') {
        return <div>Error: {error}</div>;
    }

    //return
    return (
        <div>
            <div className="prdContents detail">
                {infoItem}
            </div>
        </div>
    );
};
export default NavInfo;