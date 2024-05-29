import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './Info.css';

const NavInfo = () => {
    //데이터 불러오기
    const detail = useSelector((state) => state.details.detail);
    const status = useSelector((state) => state.details.status);
    const error = useSelector((state) => state.details.error);

    //데이터 넣었을 때 자동으로 줄바꿈 안되면 split해야함
    //기본 정보
    const [normalData, setNormalData] = useState(detail.basic_info);
    const infoNormalData = {text: normalData};

    //공연 소개
    const [intro, setIntro] = useState(detail.event_description);
    const infoIntroData = {text: intro};
    //const infoNoticeImgList = infoNoticeData.img.split(/,\s*/);

    //기획사 정보
    const [agency, setAgency] = useState(detail.agency_info);
    const infoAgencyData = {text: agency};

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
                {/* 기본 정보 */}
                {(infoNormalData.text !== null && infoNormalData.text.length !== 0) && (
                    <div className='content' key='MB-info-content2'>
                        <h3 className='contentTitle'>기본 정보</h3>
                        <div className='contentDetail'>
                            <p className='contentDetailText'>{infoNormalData.text}</p>
                        </div>
                    </div>
                )}

                {/* 공연 소개 */}
                {(infoIntroData.text !== null && infoIntroData.text.length !== 0) && (
                    <div className='content' key='MB-info-content3'>
                        <h3 className='contentTitle'>공연 소개</h3>
                        <div className='contentDetail'>
                            <p className='contentDetailText'>{infoIntroData.text}</p>
                        </div>
                    </div>
                )}

                {/* 기획사 정보 */}
                {(infoAgencyData.text !== null && infoAgencyData.text.length !== 0) && (
                    <div className='content' key='MB-info-content4'>
                        <h3 className='contentTitle'>할인정보</h3>
                        <div className='contentDetail'>
                            <p className='contentDetailText'>{infoAgencyData.text}</p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};
export default NavInfo;