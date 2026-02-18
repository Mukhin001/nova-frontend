import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "@/store/slices/uiSlice";
import userReducer from "./slices/userSlice";
import { baseApi } from "@/api/baseApi";
import toastReduser from "@/components/ui/toast/toastSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      ui: uiReducer,
      user: userReducer,
      toast: toastReduser,
      [baseApi.reducerPath]: baseApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
