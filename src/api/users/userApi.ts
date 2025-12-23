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

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500",
    credentials: "include", // <-- ДЛЯ COOKIE
  }),
  endpoints: (builder) => ({
    getGreetingServer: builder.query<GreetingResponse, void>({
      query: () => "",
    }),
    getMe: builder.query<LoginResponse, void>({
      query: () => "/me",
    }),
  }),
});

export const { useGetGreetingServerQuery, useGetMeQuery } = userApi;
