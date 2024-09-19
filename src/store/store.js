import { configureStore } from "@reduxjs/toolkit";
import detailReducer from './slice/detailSlice.js';
import regionReducer from './slice/regionSlice.js';
import searchReducer from "./slice/searchSlice.js";

const store = configureStore({
    reducer: {
        details: detailReducer,
        regions: regionReducer,
        searchs: searchReducer
    }
});

export default store;