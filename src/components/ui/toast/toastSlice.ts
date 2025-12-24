import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ToastType = "success" | "error";

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastState {
  queue: ToastItem[];
  nextId: number;
}

const initialState: ToastState = {
  queue: [],
  nextId: 1,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast(
      state,
      action: PayloadAction<{ message: string; type?: ToastType }>
    ) {
      state.queue.push({
        id: state.nextId,
        message: action.payload.message,
        type: action.payload.type || "error",
      });
      state.nextId++;
    },
    hideToast(state, action: PayloadAction<number>) {
      state.queue = state.queue.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
