import React from 'react';
import './search.css';

import Filter from './filter/filter';
import Ticektlist from './TicketList/ticketlist';

function Search() {
    return (
        <main id="search-content">
            <div class="search-container">
                <div id='search-side' className='search-side'>
                    {/* sticky(스크롤하다가 특정 위치가 되면 fixed) */}
                    <div className='stickyWrap'>
                        <Filter />
                    </div>
                </div>
                
                <div class="tickets">
                    <Ticektlist />
                </div>
            </div>
        </main>
    ); 
}    

export default Search;