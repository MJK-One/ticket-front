import React, { useEffect, useState } from 'react';
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';
import { naverSearch } from './connect';

//mapx와 mapy가 string이라 . 찍어야 함
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
    const [coords, setCoords] = useState(new navermaps.LatLng(37.500751, 126.867891)); //초기 정보
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (placeType === "name" && placeData) {//장소명 검색
                    const data = await naverSearch(placeData);
                    if (data && data.length > 0) {
                        const strMapx = data[0].mapx;
                        const strMapy = data[0].mapy;

                        const mapx = addDecimalPoint(strMapx);
                        const mapy = addDecimalPoint(strMapy);

                        console.log('naverSearch mapx: ', mapx);
                        console.log('naverSearch mapy: ', mapy);

                        setCoords(new navermaps.LatLng(mapy, mapx));
                    }
                } else {
                    if(placeData) {//주소 검색
                        navermaps.Service.geocode(
                            {query : placeData},
                            function (status, res) {
                                if(res.v2.addresses.length === 0){
                                    console.log('error1');
                                } else {
                                    const resAddress = res.v2.addresses[0];
                                    const x = parseFloat(resAddress.x);
                                    const y = parseFloat(resAddress.y);
                                    setCoords(new navermaps.LatLng(y, x));
                                }
                            }
                        );
                    }
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
