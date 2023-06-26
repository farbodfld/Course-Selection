import { configureStore } from "@reduxjs/toolkit"
import darkModeReducer from '../features/darkModeSlice'
import authReducer from '../features/authSlice';


export const store = configureStore({
    reducer : {
            darkMode : darkModeReducer,
            auth: authReducer
    }
})