import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GreetingResponse {
  message: string;
}

interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500",
    credentials: "include", // <-- ДЛЯ COOKIE
  }),
  tagTypes: ["User", "Weather", "News"],
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
