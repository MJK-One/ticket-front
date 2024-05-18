import React from 'react';
import SideMain from '../../detailpage/side/main/SideMain.js';
import './filter.css';

function Filter() {
    return (
        <div id='productSide' className='productSide'>
            {/* sticky(스크롤하다가 특정 위치가 되면 fixed) */}
            <div className='stickyWrap'>
                <h3 className='blind'>상품 예매하기</h3>
                <SideMain />
            </div>
        </div>
    ); 
}    

export default Filter;