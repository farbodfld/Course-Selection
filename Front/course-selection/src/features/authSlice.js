// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   username: localStorage.getItem('username') || '',
    id : localStorage.getItem('id') || '',
    accessToken : localStorage.getItem('accessToken') || '',
    role : localStorage.getItem('role') || ''
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
    },
    setAccessToken : ( state , action ) =>{
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },
    setRole : (state , action) => {
      state.role = action.payload;
      localStorage.setItem('role', action.payload);
    }
  }
});

export const { setUsername , setId , setAccessToken , setRole } = authSlice.actions;
export default authSlice.reducer;
