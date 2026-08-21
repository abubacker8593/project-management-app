import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const getallusers = createAsyncThunk(
  "auth/getallusers",
  async (_, { rejectWithValue }) => {
    try {
      let res = await api.get("/users");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message || err);
    }
  },
);
export const getuserdetails = createAsyncThunk(
  "auth/getuserdetails",
  async (id, { rejectWithValue }) => {

    try {
      let res = await api.get(`/users/${id}`);
      return res.data;
      console.log("user details", res.data)
    } catch (err) {
      return rejectWithValue(err.message || err);
    }
  },
);
export const updateUserStatus = createAsyncThunk(
    "auth/updateUserStatus",
    async ({ id, active }, { rejectWithValue }) => {
      try {
        let res = await api.patch(`/users/${id}`, { active });
        return res.data;
      } catch (err) {
        return rejectWithValue(err.message || err);
      }
    }
  );


export const deleteuser = createAsyncThunk(
  "auth/deleteuser",
  async (id, { rejectWithValue }) => {  
    try {
      let res = await api.delete(`/users/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message || err);
    }

  })

let adminslice =createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getallusers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getallusers.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getallusers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});
let adminreducer = adminslice.reducer;
export default adminreducer;