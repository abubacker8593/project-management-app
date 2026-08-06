import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import { api } from "../../api/api";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};
const loginuser = createAsyncThunk("auth/login", async (credentials) => {
  try {
    const response = await api.get(`/users?email=${credentials.email}`);
    console.log(response.data);
    const user = response.data[0];
    if (!user) {
      throw new Error("usernotfound");
    }
    if (user.password !== credentials.password) {
      throw new Error("wrong password");
    }
    return user;
  } catch (err) {
    throw err;
  }
});

const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers : (builder) =>{
    builder 
    .addCase(loginuser.pending,(state) =>{
      state.loading = true
      state.error = null
    })
    .addCase(loginuser.fulfilled,(state,action ) =>{
      state.isAuthenticated = true
      state.loading = false
      state.user  =  action.payload
    })
    .addCase(loginuser.rejected , (state,action)=>{
      console.log("error" )
      state.error = action.error.message
      state.loading = false
    })
  }
});
export const authReducer = authslice.reducer;
