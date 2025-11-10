import { AppRootState } from "@/store/store";
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

interface UpdateProfileRequest {
  name: string;
  email: string;
  password: string;
  password_new: string;
}

export const greetingServer = createApi({
  reducerPath: "greetingServer",
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
    updateProfile: builder.mutation<LoginResponse, UpdateProfileRequest>({
      query: (body) => ({
        url: "/update-profile",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetGreetingServerQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useUpdateProfileMutation,
} = greetingServer;
