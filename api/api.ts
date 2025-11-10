import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GreetingResponse {
  message: string;
}

interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export const greetingServer = createApi({
  reducerPath: "greetingServer",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  endpoints: (builder) => ({
    getGreetingServer: builder.query<GreetingResponse, void>({
      query: () => "",
    }),
    loginUser: builder.mutation<
      LoginResponse,
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    registerUser: builder.mutation<LoginResponse, RegisterRequest>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
    getProfile: builder.query<RegisterRequest, RegisterRequest>({
      query: () => ({
        url: "/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetGreetingServerQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useLazyGetProfileQuery,
} = greetingServer;
