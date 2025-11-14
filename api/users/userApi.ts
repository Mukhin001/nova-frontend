import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppRootState } from "@/store/store";

interface GreetingResponse {
  message: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500",
    // ✅ Здесь добавляем токен автоматически
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as AppRootState).user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getGreetingServer: builder.query<GreetingResponse, void>({
      query: () => "",
    }),
  }),
});

export const { useGetGreetingServerQuery } = userApi;
