import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_SERVER_HOST } from "../../api/connect";

// 검색 데이터 불러오기
export const fetchSearchData = createAsyncThunk(
    'searchs/fetchSearchData',
    async (searchParams, thunkAPI) => {
      const response = await axios.post(`${API_SERVER_HOST}/getSearchData`, searchParams);
      return response.data; // 검색 결과(content, totalElements, totalPages)를 반환
    }
  );

//초기 상태 설정
const initialState = {
    searchParams: {
        genreFilter: [],      // 장르 필터 상태
        regionFilter: [],     // 지역 필터 상태
        period: "전체",             // 날짜 필터 상태
        searchKeyword: ''      // 검색어 상태
    },
    curPage: 0, // 현재 페이지 번호
    searchResults: [], // 검색 결과
    allSearchResults: [], // 전체 검색 결과
    totalElements: 0, // 총 데이터 개수
    totalPages: 0, // 총 페이지 수
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null // 에러
  };

//searchSlice
const searchSlice = createSlice({
    name: 'searchs',
    initialState,
    reducers: {
        // genreFilter 업데이트 액션
        setGenreFilter: (state, action) => {
            state.searchParams.genreFilter = action.payload;
        },
        // regionFilter 업데이트 액션
        setRegionFilter: (state, action) => {
            state.searchParams.regionFilter = action.payload;
        },
        // period 업데이트 액션
        setPeriod: (state, action) => {
            state.searchParams.period = action.payload;
        },
        // searchKeyword 업데이트 액션
        setSearchKeyword: (state, action) => {
            state.searchParams.searchKeyword = action.payload;
        },
        // 페이지 번호 증가 업데이트 액션
        setUpCurPage: (state) => {
            state.curPage += 1;
        },
        // 페이지 번호 리셋 업데이트 액션
        resetCurPage: (state) => {
            state.curPage = 0;
        },
        // 전체 검색 결과 업데이트
        setAllSearchResult: (state, action) => {
            state.allSearchResults = action.payload;
        },
        //
        resetAllSearchResult: (state) => {
            state.allSearchResults = [];
        },
        // 검색 필터 모두 초기화
        clearFilters: (state) => {
            state.searchParams.genreFilter = [];
            state.searchParams.regionFilter = [];
            state.searchParams.period = "전체";
            state.searchParams.searchKeyword = '';
            state.searchParams.curPage = 0;
            state.searchResults = [];
            state.allSearchResults = [];
            state.totalElements = 0;
            state.totalPages = 0;
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchSearchData.pending, (state) => {
            state.status = 'loading'; // 로딩 중
        })
        .addCase(fetchSearchData.fulfilled, (state, action) => {
            state.status = 'succeeded'; // 성공
            state.searchResults = action.payload.content;  // 검색 결과 저장
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
        })
        .addCase(fetchSearchData.rejected, (state, action) => {
            state.status = 'failed'; // 실패
            state.error = action.error.message;
        });
    }
});

// 액션 export
export const { setGenreFilter, setRegionFilter, setPeriod, setSearchKeyword, setUpCurPage, resetCurPage, setAllSearchResult, resetAllSearchResult, clearFilters } = searchSlice.actions;

// 리듀서 export
export default searchSlice.reducer;