import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_SERVER_HOST } from "../../api/connect";
import axios from "axios";

//비동기 액션
export const fetchRegion = createAsyncThunk(
    'regions/fetchRegion',
    async (region, thunkAPI) => {
        const response = await axios.get(`${API_SERVER_HOST}/region?keyword=${region}`);
        return response.data;
    }
);

//초기 상태 설정
const initialState = {
    region: [],
    click: "서울",
    status: 'idle',
    error: null
  };

  //slice
  const regionSlice = createSlice({
    name: 'regions',
    initialState,
    reducers: {
        setClick(state, action) {
            state.click = action.payload; //click 상태 업데이트
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegion.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRegion.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.region = action.payload; //받아온 데이터 저장
            })
            .addCase(fetchRegion.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
  });

  //액션, 리듀서 내보내기
  export const { setClick } = regionSlice.actions;
  export default regionSlice.reducer;