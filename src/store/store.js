import { configureStore } from "@reduxjs/toolkit";
import detailReducer from './slice/detailSlice.js';
import regionReducer from './slice/regionSlice.js';

const store = configureStore({
    reducer: {
        details: detailReducer,
        regions: regionReducer
    }
});

export default store;