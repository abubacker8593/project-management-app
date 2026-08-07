import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import  api  from "../../api/api";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};
export const signupuser = createAsyncThunk("auth/signup" , async (data)=>{
  try{
    let res = await api.post("/users",data)
    return res.data
  }catch(err){
    throw err
  }
})
export const loginuser = createAsyncThunk("auth/login", async (credentials) => {
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

    .addCase(signupuser.fulfilled,(state,action) =>{
      state.user.push(action.payload)
    })
  }
});
export const authReducer = authslice.reducer;
