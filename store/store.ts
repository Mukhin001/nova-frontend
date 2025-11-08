import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/components/counter/counterSlice";
import { greetingServer } from "../api/api";
import screenReducer from "../utils/screenSlice";
import { getIsDesktop } from "@/utils/getIsDesktop ";
import userReducer from "../store/userSlice";

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
    [greetingServer.reducerPath]: greetingServer.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([greetingServer.middleware]),
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
