import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/components/ui/counter/counterSlice";
import screenReducer from "../utils/screenSlice";
import { getIsDesktop } from "@/utils/getIsDesktop ";
import userReducer from "../utils/userSlice";
import { userApi } from "@/api/users/userApi";
import toastReduser from "@/components/ui/toast/toastSlice";
import { weatherApi } from "@/api/weather/weatherApi";

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
    [userApi.reducerPath]: userApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware, weatherApi.middleware]),
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
