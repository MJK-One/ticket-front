import { createSlice } from '@reduxjs/toolkit';

//
const initialState = {
  isAuthenticated: false,
  email: null,
};

//
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;