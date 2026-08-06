import {configureStore}  from "@reduxjs/toolkit"
import { authReducer } from "../redux/features/authslice"
import { taskReducer } from "../redux/features/taskslice"
export const store = configureStore({
    reducer : {
        auth : authReducer,
        task : taskReducer
    }
})