import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import FixedHeader from "../FixedHeader";

import './MobileDetailHeader.css';

const MobileDetailHeader = () => {
    // 이전 페이지 돌아가기
    const navigate = useNavigate();
    const BackBtnHandler = () => {
        navigate(-1);
    };

    return (
        <FixedHeader>

            <div className='mobile-detail-header'>
                <div className='m-d-h-left-btn-wrap'>
                    <button className='m-d-h-back-btn' onClick={BackBtnHandler}>
                        ❮
                    </button>
                </div>
                <div className='m-d-h-middle-btn-wrap'>
                    <Link to="/" className="m-d-h-btn-link">
                        <img className="m-d-h-logo-img" alt="" src="/img/TOW.png" />
                    </Link>
                </div>
                <div className='m-d-h-right-btn-wrap'>
                    <Link to="/search" className="m-d-h-search-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#3A3A3A" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.6" d="m17.875 17.877-4.607-4.607c-.462-.462-1.198-.56-1.729-.197-1.345.943-3.084 1.356-4.92.943-2.26-.5-4.087-2.328-4.588-4.587A6.157 6.157 0 0 1 8.23 1.876c3.045.098 5.638 2.534 5.923 5.56.079.844-.02 1.66-.245 2.416l-.295.726"></path></svg>
                    </Link>
                </div>
            </div>

        </FixedHeader>
    );
}
export default MobileDetailHeader;