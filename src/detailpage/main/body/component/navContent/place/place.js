import React from 'react';
import PersonalNaverMap from '../../../../../../api/NaverMap';
import './place.css';

const NavPlace = () => {
    /*
    데이터 불러오기
     */
    const placename = "샤롯데씨어터"; //띄어쓰기시 +로 연결
    const placeaddr = "대구광역시 북구 칠성동2가 302-155"; //롯데백화점 대구점

    //return
    return (
        <div>
            <div className="prdContents detail">
                {/* 공연장 정보 */}
                <div className='content' key='MB-place-content2'>
                    <h3 className='contentTitle'>공연장 위치</h3>
                    <div className='contentDetail'>
                        <PersonalNaverMap placeData={placeaddr} placeType="addr"/>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default NavPlace;