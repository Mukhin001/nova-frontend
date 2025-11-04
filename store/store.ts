import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/components/counter/counterSlice";
import { greetingServer } from "../api/api";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [greetingServer.reducerPath]: greetingServer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([greetingServer.middleware]),
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
