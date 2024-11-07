import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";

import detailReducer from './slice/detailSlice.js';
import regionReducer from './slice/regionSlice.js';
import searchReducer from "./slice/searchSlice.js";
import userReducer from './slice/userSlice.js';

// redux-persist 설정
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'], // user 상태만 영구 저장
  };
  
  // reducer
  const rootReducer = combineReducers({
    details: detailReducer,
    regions: regionReducer,
    searchs: searchReducer,
    user: userReducer,
  });
  
  // persistReducer로 감싸서 영구 저장 활성화
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  const store = configureStore({
    reducer: persistedReducer,
  });
  
  const persistor = persistStore(store);
  
  export { store, persistor };