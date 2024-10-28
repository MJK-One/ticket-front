import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDetail } from '../store/slice/detailSlice.js';

import Header from '../component/header/home/header.js';
import MobileDetailHeader from '../component/header/detail/MobileDetailHeader.js';

import ProductMain from './main/ProductMain.js';
import './DetailPage.css';

const DetailPage = () => {
    // 화면 크기 체크 함수
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { id } = useParams();
    const dispatch = useDispatch();
    const status = useSelector((state) => state.details.status);
    const error = useSelector((state) => state.details.error);

    useEffect(() => {
        if(id) {
            dispatch(fetchDetail(id));
        }
    }, [id, dispatch]);

    if(status === 'loading') {
        return <div>Loading...</div>;
    }

    if(status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (

        <>
            {/* 헤더 */}
            {windowWidth > 1100 && <Header />}
            {windowWidth <= 1100 && <MobileDetailHeader />}

            <div id='container'>
                <div className='contents'>
                    <div className='productWrapper'>
                        <ProductMain />
                    </div>
                </div>
            </div>
        </>
    );
};
export default DetailPage;