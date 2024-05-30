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
    const navermaps = useNavermaps();
    const [coords, setCoords] = useState(new navermaps.LatLng(37.500751, 126.867891)); //초기 정보

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (placeType === "name" && placeData) {
                    const data = await naverSearch(placeData);
                    if (data && data.length > 0) {
                        const strMapx = data[0].mapx;
                        const strMapy = data[0].mapy;

                        const mapx = addDecimalPoint(strMapx);
                        const mapy = addDecimalPoint(strMapy);

                        setCoords(new navermaps.LatLng(mapy, mapx));
                    }
                } else {
                    if(placeData) {
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
            }
        };

        fetchData();
    }, [placeData, placeType]);

  return (
    <MapDiv
        style={{width: '50rem', height: '30rem'}}>
            <NaverMap
                center={coords}
                defaultZoom={17}>
                <Marker position={coords} />
            </NaverMap>
    </MapDiv>
  );
};

export default PersonalNaverMap;
