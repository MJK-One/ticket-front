import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_SERVER_HOST } from "../../api/connect";
import axios from "axios";

//비동기 액션
export const fetchDetail = createAsyncThunk(
    'details/fetchDetail',
    async (id, thunkAPI) => {
        const response = await axios.get(`${API_SERVER_HOST}/info?id=${id}`);
        return response.data;
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
    status: 'idle',
    error: null
  };

  //slice
  const detailSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDetail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDetail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.detail = action.payload; //받아온 데이터 저장
            })
            .addCase(fetchDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
  });

  export default detailSlice.reducer;