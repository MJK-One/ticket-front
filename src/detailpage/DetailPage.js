import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDetail } from '../store/slice/detailSlice.js';

import ProductMain from './main/ProductMain.js';
import './DetailPage.css';

const DetailPage = () => {
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