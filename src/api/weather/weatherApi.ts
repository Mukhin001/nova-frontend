import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const weatherApi = createApi({
  reducerPath: "weather",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500",
    credentials: "include",
  }),
  tagTypes: ["weather"],
  endpoints: () => ({}),
});

export const {} = weatherApi;
