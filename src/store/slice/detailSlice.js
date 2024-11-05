import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_SERVER_HOST } from "../../api/connect";
import axios from "axios";

//비동기 액션: detail 데이터 로딩
export const fetchDetail = createAsyncThunk(
    'details/fetchDetail',
    async (id, thunkAPI) => {
        const response = await axios.get(`${API_SERVER_HOST}/info?id=${id}`);
        return response.data;
    }
);

//비동기 액션: like 데이터 로딩
// state
export const fetchLikeState = createAsyncThunk(
    'details/fetchLikeState',
    async ({ tId, uId }, thunkAPI) => {
        try {
            const response = await axios.get(`${API_SERVER_HOST}/likeCheck?tId=${tId}&uId=${uId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching like state:", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
// cnt
export const fetchLikeCnt = createAsyncThunk(
    'details/fetchLikeCnt',
    async (tId, thunkAPI) => {
        try {
            const response = await axios.get(`${API_SERVER_HOST}/ticketLike?tId=${tId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching like cnt:", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

//비동기 액션: bell 데이터 로딩
// state
export const fetchBellState = createAsyncThunk(
    'details/fetchBellState',
    async ({ tId, uId }, thunkAPI) => {
        try {
            const response = await axios.get(`${API_SERVER_HOST}/bellCheck?tId=${tId}&uId=${uId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching bell state:", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
// cnt
export const fetchBellCnt = createAsyncThunk(
    'details/fetchBellCnt',
    async (tId, thunkAPI) => {
        try {
            const response = await axios.get(`${API_SERVER_HOST}/ticketBell?tId=${tId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching bell cnt:", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

//초기 상태 설정
const initialState = {
    detail: {
      id: null,
      event_name: '',
      registration_date: '',
      ticket_open_date: '',
      pre_sale_date: null,
      image_url: '',
      basic_info: '',
      event_description: '',
      agency_info: '',
      genre: '',
      event_start_date: '',
      event_end_date: '',
      venue: '',
      address: '',
      eventSites: [{}],
      ticketViews: {}
    },
    like: {
        state: false,
        cnt: 0
    },
    bell: {
        state: false,
        cnt: 0
    },
    status: 'idle',
    error: null
  };

  //slice
  const detailSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        // like state 업데이트 액션
        setLikeState: (state, action) => {
            state.like.state = action.payload;
        },
        // bell state 업데이트 액션
        setBellState: (state, action) => {
            state.bell.state = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDetail.pending, (state) => { //pending
                state.status = 'loading';
            })
            .addCase(fetchDetail.fulfilled, (state, action) => { //fulfilled
                state.status = 'succeeded';
                state.detail = action.payload; //받아온 데이터 저장
            })
            .addCase(fetchLikeState.fulfilled, (state, action) => {
                state.like.state = Boolean(action.payload); //받아온 데이터 저장
            })
            .addCase(fetchLikeCnt.fulfilled, (state, action) => {
                state.like.cnt = action.payload; //받아온 데이터 저장
            })
            .addCase(fetchBellState.fulfilled, (state, action) => {
                state.bell.state = Boolean(action.payload); //받아온 데이터 저장
            })
            .addCase(fetchBellCnt.fulfilled, (state, action) => {
                state.bell.cnt = action.payload; //받아온 데이터 저장
            })
            .addCase(fetchDetail.rejected, (state, action) => { //failed
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
  });

  // 액션 export
  export const { setLikeState, setBellState } = detailSlice.actions;
  // 리듀서 export
  export default detailSlice.reducer;