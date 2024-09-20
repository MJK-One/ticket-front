import { createSlice } from "@reduxjs/toolkit";

//초기 상태 설정
const initialState = {
    search: {
        genreFilter: [{}],      // 장르 필터 상태
        regionFilter: [{}],     // 지역 필터 상태
        period: "전체",             // 날짜 필터 상태
        searchKeyword: ''       // 검색어 상태
    }
  };

//searchSlice
const searchSlice = createSlice({
    name: 'searchs',
    initialState,
    reducers: {
        // genreFilter 업데이트 액션
        setGenreFilter: (state, action) => {
            state.search.genreFilter = action.payload;
        },
        // regionFilter 업데이트 액션
        setRegionFilter: (state, action) => {
            state.search.regionFilter = action.payload;
        },
        // period 업데이트 액션
        setPeriod: (state, action) => {
            state.search.period = action.payload;
        },
        // searchKeyword 업데이트 액션
        setSearchKeyword: (state, action) => {
            state.search.searchKeyword = action.payload;
        },
        // 검색 필터 모두 초기화
        clearFilters: (state) => {
            state.search.genreFilter = [{}];
            state.search.regionFilter = [{}];
            state.search.period = "전체";
            state.search.searchKeyword = '';
        }
    }
});

// 액션 export
export const { setGenreFilter, setRegionFilter, setPeriod, setSearchKeyword, clearFilters } = searchSlice.actions;

// 리듀서 export
export default searchSlice.reducer;