import React, { useState, useEffect } from 'react';
import './ProductMain.css';
import MainTop from './top/MainTop.js';
import MobileMainTop from './top/mobile/MobileMainTop.js';
import MainBody from './body/MainBody.js';

const ProductMain = () => {
    // 화면 크기 체크 함수
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='productMain'>
            {windowWidth > 960 ? (
                <MainTop />
            ) : (
                <MobileMainTop />
            )}
            <MainBody />
        </div>
    );
};
export default ProductMain;