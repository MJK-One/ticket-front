import React from 'react';

import ProductMain from './main/ProductMain.js';

import './DetailPage.css';

const DetailPage = () => {
    return (
        <React.Fragment key='DetailPage'>
            <div id='container'>
                <div className='contents'>
                    <div className='productWrapper'>
                        <ProductMain />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default DetailPage;