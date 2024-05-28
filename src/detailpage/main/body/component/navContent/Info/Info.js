import React from 'react';
import './Info.css';

const NavInfo = () => {
    /*
    데이터 불러오기
     */
    //데이터 넣었을 때 자동으로 줄바꿈 안되면 split해야함
    //기본 정보(가데이터)
    const infoNormalData = {text: "aaa \n bbb \n ccc"};

    //공연 소개(가데이터)
    const infoIntroData = {text: "aaa \n bbb \n ccc"};
    //const infoNoticeImgList = infoNoticeData.img.split(/,\s*/);

    //기획사 정보(가데이터)
    const infoAgencyData = {text: "aaa \n bbb \n ccc"};


    //return
    return (
        <div>
            <div className="prdContents detail">
                {/* 기본 정보 */}
                <div className='content' key='MB-info-content2'>
                    <h3 className='contentTitle'>기본 정보</h3>
                    <div className='contentDetail'>
                        <p className='contentDetailText'>{infoNormalData.text}</p>
                    </div>
                </div>

                {/* 공연 소개 */}
                <div className='content' key='MB-info-content3'>
                    <h3 className='contentTitle'>공연 소개</h3>
                    <div className='contentDetail'>
                        <p className='contentDetailText'>{infoIntroData.text}</p>
                    </div>
                </div>

                {/* 기획사 정보 */}
                <div className='content' key='MB-info-content4'>
                    <h3 className='contentTitle'>할인정보</h3>
                    <div className='contentDetail'>
                        <p className='contentDetailText'>{infoAgencyData.text}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default NavInfo;