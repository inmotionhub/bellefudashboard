import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from './LoginSlice'


export const store = configureStore({
    reducer: {
        login: LoginReducer,
    }, // this plase is for reducers
});
