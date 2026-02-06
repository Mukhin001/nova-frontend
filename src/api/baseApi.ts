import { LoginResponse } from "@/types/apiUser";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GreetingResponse {
  message: string;
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include", // <-- ДЛЯ COOKIE
  }),
  tagTypes: ["User", "Weather", "News", "Feed"],
  endpoints: (builder) => ({
    getGreetingServer: builder.query<GreetingResponse, void>({
      query: () => "",
    }),
    getMe: builder.query<LoginResponse, void>({
      query: () => "/user/me",
    }),
  }),
});

export const { useGetGreetingServerQuery, useGetMeQuery } = baseApi;
