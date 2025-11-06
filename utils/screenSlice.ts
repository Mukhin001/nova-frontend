import { AppRootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScreenState {
  isDesktop: boolean;
}

const initialState: ScreenState = {
  isDesktop: true,
};

export const screenSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    setIsDesktop(_, action: PayloadAction<boolean>) {
      return { isDesktop: action.payload };
    },
  },
});

export const { setIsDesktop } = screenSlice.actions;

export const selectIsDesktop = (state: AppRootState) => state.screen.isDesktop;

export default screenSlice.reducer;
