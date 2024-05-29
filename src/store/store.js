import { configureStore } from "@reduxjs/toolkit";
import detailReducer from './slice/detailSlice.js';

const store = configureStore({
    reducer: {
        details: detailReducer
    }
});

export default store;