import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/components/ui/counter/counterSlice";
import screenReducer from "../utils/screenSlice";
import { getIsDesktop } from "@/utils/getIsDesktop ";
import userReducer from "../store/userSlice";
import { userApi } from "@/api/users/userApi";

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
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware]),
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
