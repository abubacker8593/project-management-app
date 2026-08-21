import {configureStore}  from "@reduxjs/toolkit"
import { authReducer } from "../redux/features/authslice"
import { taskReducer } from "../redux/features/taskslice"
import themeReducer from "../redux/features/themeslice"
import projectsreducer from "../redux/features/projectslice"
import localStorage from "redux-persist/lib/storage"
import { persistReducer,persistStore } from "redux-persist"
import adminreducer from "../redux/features/adminslice"


let storage = localStorage.default ? localStorage.default : localStorage
let persistConfig = {
    key:'auth',
    storage
}


let persistedauthreducer =  persistReducer(persistConfig , authReducer)
let persistedthemeReducer =  persistReducer(persistConfig , themeReducer)
export const store = configureStore({
    reducer : {
        auth : persistedauthreducer,
        task : taskReducer,
        theme : persistedthemeReducer,
        projects : projectsreducer,
        admin : adminreducer
    }
})
export const persistor = persistStore(store)