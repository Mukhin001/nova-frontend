import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GreetingResponse {
  message: string;
}

export const greetingServer = createApi({
  reducerPath: "greetingServer",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  endpoints: (builder) => ({
    getGreetingServer: builder.query<GreetingResponse, void>({
      query: () => "",
    }),
    registerUser: builder.mutation<
      void,
      { name: string; email: string; password: string }
    >({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetGreetingServerQuery, useRegisterUserMutation } =
  greetingServer;
