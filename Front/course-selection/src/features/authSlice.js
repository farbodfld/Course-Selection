// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   username: localStorage.getItem('username') || '',
    id : localStorage.getItem('id') || ''
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
      localStorage.setItem('username', action.payload);
    },
    setId: (state, action) => {
      state.id = action.payload;
      localStorage.setItem('id', action.payload);
    }
  }
});

export const { setUsername , setId } = authSlice.actions;
export default authSlice.reducer;
