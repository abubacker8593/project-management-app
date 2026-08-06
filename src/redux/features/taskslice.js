import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { act } from "react";

let initialState = {
  tasks: [],
  loading: false,
  error: null,
};

export let fetchtasks = createAsyncThunk("tasks/fetchtasks", async () => {
  try {
    let response = await api.get("/tasks");
    return response.data;
  } catch (err) {
    throw err;
  }
});
export let addtasks = createAsyncThunk("tasks/addtasks", async (task) => {
  let response = await api.post("/tasks", task);
  return response.data;
});
export let removetask = createAsyncThunk("tasks/delete", async (id) => {
  try {
    let res = await api.delete(`/tasks/${id}`);
    return id;
  } catch (err) {
    throw err;
  }
});
export let updatetask = createAsyncThunk("tasks/update", async (task) => {
  let res = await api.put("/tasks", task);
  return res.data;
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
      })

      .addCase(addtasks.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.loading = false;
      })

      .addCase(removetask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })

      .addCase(updatetask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map(
          (x) => (x = x.id == action.payload.id ? action.payload : x),
        );
      });
  },
});

export const taskReducer = taskslice.reducer;
