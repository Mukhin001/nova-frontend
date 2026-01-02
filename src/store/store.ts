import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/components/ui/counter/counterSlice";
import screenReducer from "../utils/screenSlice";
import { getIsDesktop } from "@/utils/getIsDesktop ";
import userReducer from "../utils/userSlice";
import { baseApi } from "@/api/baseApi";
import toastReduser from "@/components/ui/toast/toastSlice";

export const store = configureStore({
  preloadedState: {
    screen: {
      isDesktop: getIsDesktop(),
    },
  },
  reducer: {
    screen: screenReducer,
    counter: counterReducer,
    user: userReducer,
    toast: toastReduser,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
