import React from 'react';
import PersonalNaverMap from '../../../../../../api/NaverMap';
import './place.css';

const NavPlace = () => {
    /*
    데이터 불러오기
     */
    const placeData = "서울 종로구 인사동9길 26 (견지동)";

    //return
    return (
        <div>
            <div className="prdContents detail">
                {/* 공연장 정보 */}
                <div className='content' key='MB-place-content2'>
                    <h3 className='contentTitle'>공연장 위치</h3>
                    <div className='contentDetail'>
                        <PersonalNaverMap placeName={placeData}/>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default NavPlace;