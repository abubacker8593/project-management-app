import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";

let initialState = {
  tasks: [],
  loading: false,
  error: null,
};

let fetchtasks = createAsyncThunk("tasks/fetchtasks", async () => {
  try {
    let response = await api.get("/tasks");
    return response.data;
  } catch (err) {
    throw err;
  }
});
let addtasks = createAsyncThunk("tasks/addtasks", async (task) => {
  try {
    let response = await api.post("/tasks", task);
  } catch (err) {
    throw err;
  }
});

const taskslice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (buider) => {
    buider
      .addCase(fetchtasks.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchtasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchtasks.rejected, (state, action) => {
        ((state.error = action.error.message), (state.loading = false));
      });
  },
});

export const taskReducer = taskslice.reducer