import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

let initialState = {
  projects: [],
  isloading: false,
  error: null,
};

// FETCH PROJECTS
export let fetchProjects = createAsyncThunk(
  "projects/fetch",
  async (_, { rejectWithValue }) => {
    try {
      let res = await api.get("/projects");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ADD PROJECT
export let addProject = createAsyncThunk(
  "projects/add",
  async (data, { rejectWithValue }) => {
    try {
      let res = await api.post("/projects", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// UPDATE PROJECT
export let updateProject = createAsyncThunk(
  "projects/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      let res = await api.put(`/projects/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// DELETE PROJECT
export let deleteProject = createAsyncThunk(
  "projects/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/projects/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

let projectSlice = createSlice({
  name: "project",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ADD
      .addCase(addProject.pending, (state) => {
        state.isloading = true;
      })

      .addCase(addProject.fulfilled, (state, action) => {
        state.isloading = false;
        state.projects.push(action.payload);
      })

      .addCase(addProject.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload;
      })

      // FETCH
      .addCase(fetchProjects.pending, (state) => {
        state.isloading = true;
      })

      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isloading = false;
        state.projects = action.payload;
      })

      .addCase(fetchProjects.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateProject.pending, (state) => {
        state.isloading = true;
      })

      .addCase(updateProject.fulfilled, (state, action) => {
        state.isloading = false;

        state.projects = state.projects.map((project) =>
          project.id === action.payload.id
            ? action.payload
            : project
        );
      })

      .addCase(updateProject.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteProject.pending, (state) => {
        state.isloading = true;
      })

      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isloading = false;

        state.projects = state.projects.filter(
          (project) => project.id !== action.payload
        );
      })

      .addCase(deleteProject.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload;
      });
  },
});

let projectsreducer = projectSlice.reducer;

export default projectsreducer;