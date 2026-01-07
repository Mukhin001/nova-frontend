import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  city: string;
  newsCategory: string;
}

const initialState: UiState = {
  city: "Berlin",
  newsCategory: "",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    setNewsCategory(state, action: PayloadAction<string>) {
      state.newsCategory = action.payload;
    },
  },
});

export const { setCity, setNewsCategory } = uiSlice.actions;
export default uiSlice.reducer;
