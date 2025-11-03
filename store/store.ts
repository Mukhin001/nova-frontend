import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/components/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// import { configureStore } from "@reduxjs/toolkit";

// export const makeStore = () => {
//   return configureStore({
//     reducer: {},
//   });
// };

// export type AppStore = ReturnType<typeof makeStore>;
// export type AppRootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];
