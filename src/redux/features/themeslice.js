import { createSlice } from "@reduxjs/toolkit";
let initialState = {
    dark : true
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.dark = !state.dark ;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
let themeReducer = themeSlice.reducer;
export default themeReducer;