import React, { useEffect, useState } from 'react';
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';
import { naverPlaceSearch, naverAddrSearch } from './connect';

//mapx와 mapy가 string이라 . 찍어야 함 > 장소 검색만 해당
const addDecimalPoint = (str) => {
    const withDecimalPoint = str.slice(0, -7) + "." + str.slice(-7);
    return parseFloat(withDecimalPoint);
};

//
const PersonalNaverMap = ({ placeData, placeType }) => {
    // 화면 크기 체크 함수
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    //
    const navermaps = useNavermaps();
    const [isAvailable, setIsAvailable] = useState(false);
    const [coords, setCoords] = useState(new navermaps.LatLng(37.500751, 126.867891)); //초기 정보
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태

    useEffect(() => {
        const fetchData = async () => {
            console.log(`placeData: ${placeData}, placeType: ${placeType}`);
            try {
                if(placeType === "addr" && placeData) { //주소로 불러오기
                    const data = await naverAddrSearch(placeData);
                    if (data && data.x && data.y) { //null이 반환되지 않았다면 > 성공
                        const mapXAddr = parseFloat(data.x);
                        const mapYAddr = parseFloat(data.y);

                        setCoords(new navermaps.LatLng(mapYAddr, mapXAddr)); //지도에 표시
                        setIsAvailable(true); //성공
                        console.log(`addr map: ${mapXAddr}, ${mapYAddr}`);
                    } else { //null이 반환되었다면
                        setIsAvailable(false); //실패
                        console.log('addr null');
                    }
                } else if(placeType === "name" && placeData) { //장소로 불러오기
                    const data = await naverPlaceSearch(placeData);
                    if (data && data.length > 0) {
                        const mapx = data[0].mapx;
                        const mapy = data[0].mapy;

                        const mapXPlace = addDecimalPoint(mapx);
                        const mapYPlace = addDecimalPoint(mapy);

                        setCoords(new navermaps.LatLng(mapYPlace, mapXPlace)); //지도에 표시
                        setIsAvailable(true); //성공
                        console.log(`place map: ${mapXPlace}, ${mapYPlace}`);
                    } else { //null이 반환되었다면
                        setIsAvailable(false); //실패
                        console.log('place null');
                    }
                } else {
                    setIsAvailable(false); //실패
                    console.log('hing null');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false); //데이터 불러오기 완료
            }
        };

        fetchData();
    }, [placeData, placeType]);

    if (isLoading) {
        return <div>Loading map...</div>; // 로딩 중 표시
    }

    if (isAvailable === false) {
        return null;
    }

  return (
    <MapDiv
        style={ windowWidth > 900 ? {width: '50rem', height: '30rem', marginTop: '15px'} : {width: '100%', height: '300px', marginTop: '15px'} }>
            <NaverMap
                center={coords}
                defaultZoom={17}>
                <Marker position={coords} />
            </NaverMap>
    </MapDiv>
  );
};

export default PersonalNaverMap;