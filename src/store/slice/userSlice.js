import { createSlice } from '@reduxjs/toolkit';

//
const initialState = {
  isAuthenticated: false,
  user: {
    email: null,
    type: null,
  },
};

//
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = {
        email: action.payload.email,
        type: action.payload.type,
      };
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {
        email: null,
        type: null,
      };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;