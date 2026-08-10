import {configureStore}  from "@reduxjs/toolkit"
import { authReducer } from "../redux/features/authslice"
import { taskReducer } from "../redux/features/taskslice"
import themeReducer from "../redux/features/themeslice"
export const store = configureStore({
    reducer : {
        auth : authReducer,
        task : taskReducer,
        theme : themeReducer
    }
})