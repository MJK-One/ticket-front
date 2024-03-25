import React from 'react';
import './main.css';
import BasicSwiper from './basic-swiper';
import AdverSwiper from './adver-swiper';
import Openticket from './openticket';


function Main() {
    return (
        <main id="contents">
            <section className='advertising'>
                <AdverSwiper />
            </section>
            <section className="rank">
                <h2>장르별 랭킹</h2>
                <BasicSwiper />
            </section>
            <section className="mon-ticket">
                <h2>이달의 오픈티켓</h2>
                <Openticket />
            </section>
        </main>
    );
}

export default Main;