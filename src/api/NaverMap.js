import React, { useEffect, useState } from 'react';
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';

const PersonalNaverMap = ({ placeName }) => {
    const navermaps = useNavermaps();
    const [coords, setCoords] = useState(new navermaps.LatLng(37.500751, 126.867891)); //초기 정보

    useEffect(() => {
        if(placeName) {
            navermaps.Service.geocode(
                {query : placeName},
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

  }, [placeName]);

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
