import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";
let fetchtasks = createAsyncThunk("tasks/")