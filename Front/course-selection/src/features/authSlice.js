// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   username: localStorage.getItem('username') || '',
  
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
      localStorage.setItem('username', action.payload);
    }

  }
});

export const { setUsername } = authSlice.actions;
export default authSlice.reducer;
