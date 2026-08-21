import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import api from "../../api/api";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};
export const signupuser = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      let res = await api.get(`users?email=${data.email}`);
      if (res.data.length != 0) {
        return rejectWithValue("account already exists");
      }
      res = await api.post("/users", data);
      console.log(res.data)
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const loginuser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users?email=${credentials.email}`);
      console.log(response.data);
      const user = response.data[0];
      if (!user) {
        return rejectWithValue("user not found");
      }
      if (user.password !== credentials.password) {
        return rejectWithValue("wrong password");
      }
      return user;
    } catch (err) {
      return rejectWithValue(err || "Login failed");
    }
  },
);

export const updateuser = createAsyncThunk(
  "auth/update",
  async (data, { rejectWithValue }) => {
    try {
      let res = await api.patch(`/users/${data.id}`, data);
      console.log("updated");
      return res.data;   
    } catch (err) {
      return rejectWithValue(err.message || err);
    }
  },
);

const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      toast("logged out");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginuser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginuser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginuser.rejected, (state, action) => {
        console.log("error");
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(signupuser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(updateuser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
      
      
  },
});
export const { logout } = authslice.actions;
export const authReducer = authslice.reducer;
