import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDetail, fetchLikeState, setLikeState, fetchLikeCnt, fetchBellState, setBellState, fetchBellCnt } from '../store/slice/detailSlice.js';

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
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const status = useSelector((state) => state.details.status);
    const error = useSelector((state) => state.details.error);

    // detail 데이터 로딩
    useEffect(() => {
        if(id) {
            dispatch(fetchDetail(id));
        }
    }, [id, dispatch]);

    // like 데이터 로딩
    useEffect(() => {
        if(id) {
            if(isAuthenticated) { //로그인 중
                dispatch(fetchLikeState({tId: id, uId: user.email})); //state
                dispatch(fetchLikeCnt(id)); //cnt
            } else {
                dispatch(setLikeState(false)); //state
                dispatch(fetchLikeCnt(id)); //cnt
            }
        }
    }, [id, isAuthenticated, user.email]);

    // bell 데이터 로딩
    useEffect(() => {
        if(id) {
            if(isAuthenticated) { //로그인 중
                dispatch(fetchBellState({tId: id, uId: user.email})); //state
                dispatch(fetchBellCnt(id)); //cnt
            } else {
                dispatch(setBellState(false)); //state
                dispatch(fetchBellCnt(id)); //cnt
            }
        }
    }, [id, isAuthenticated, user.email]);

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