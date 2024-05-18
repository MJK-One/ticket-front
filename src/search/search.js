import React from 'react';
import './search.css';

import Filter from './filter/filter';
import Ticektlist from './TicketList/ticketlist';

function Search() {
    return (
        <main id="search-content">
            <div class="search-container">
                <div class="filter">
                    <Filter />
                </div>
                <div class="tickets">
                    <Ticektlist />
                </div>
            </div>
        </main>
    ); 
}    

export default Search;