import { configureStore } from "@reduxjs/toolkit";
import screenReducer from "./slices/screenSlice";
import uiReducer from "@/store/slices/uiSlice";
import counterReducer from "@/components/ui/counter/counterSlice";
import { getIsDesktop } from "../utils/getIsDesktop";
import userReducer from "./slices/userSlice";
import { baseApi } from "@/api/baseApi";
import toastReduser from "@/components/ui/toast/toastSlice";

export const makeStore = () => {
  return configureStore({
    preloadedState: {
      screen: {
        isDesktop: getIsDesktop(),
      },
    },
    reducer: {
      screen: screenReducer,
      ui: uiReducer,
      counter: counterReducer,
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
