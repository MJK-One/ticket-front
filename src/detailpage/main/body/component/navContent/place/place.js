import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PersonalNaverMap from '../../../../../../api/NaverMap';
import './place.css';

const NavPlace = () => {
    //데이터 불러오기
    const detail = useSelector((state) => state.details.detail);
    const status = useSelector((state) => state.details.status);
    const error = useSelector((state) => state.details.error);

    //장소
    const [venue, setVenue] = useState(detail.venue);
    const [venueStr, setVenueStr] = useState("정보 없음");

    useEffect(() => {
        if(venue !== null && venue.length > 0){
            const venueList = venue.split(/\s+/g);
            setVenueStr(venueList.join('+'));
        }
    }, [venue]);

    //주소
    const [addr, setAddr] = useState(detail.address || "정보 없음");

    //주소와 장소 중 어떤걸로 검색할지 정하기
    const [placeData, setPlaceData] = useState("");
    const [placeType, setPlaceType] = useState("addr"); //기본

    useEffect(() => {
        if(addr === "정보 없음"){ //주소 정보가 없을 경우
            //주소와 장소 둘다 없는 경우는 상위 컴포넌트에서 거름 > 장소만 있는 경우
            setPlaceData(venueStr);
            setPlaceType("name");
        } else { //주소 정보가 존재하는 경우
            setPlaceData(addr);
        }
    },[venueStr, addr]);

    //detail text
    const detailList = [
        {label: '- 공연 장소', text: venue},
        {label: '- 주소', text: addr}
    ];
    const detailText = detailList.map((item, i) => (
        (item.text !== null && item.text.length > 0) ? (
            <p className='contentDetailText' key={`MB-place-content-detail-text${i}`}>
                {`${item.label}: ${item.text}`}
            </p>
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
                {/* 공연장 정보 */}
                <div className='content' key='MB-place-content2'>
                    <h3 className='contentTitle'>공연장 위치</h3>
                    <div className='contentDetail'>
                        {detailText}
                        <PersonalNaverMap placeData={placeData} placeType={placeType}/>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default NavPlace;