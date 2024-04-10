import React from 'react';
import './main.css';
import MainTop from './mainTop';
import Openticket from './openticket';


function Main() {
    return (
        <main id="contents">
            <section className='maintop'>
                <MainTop />
            </section>
            <section className='ticket-site'>
                <Openticket />
            </section>
        </main>
    );
}

export default Main;