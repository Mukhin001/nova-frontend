import { baseApi } from "@/api/baseApi";

interface LoginResponse {
  message: string;
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

export const register = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<LoginResponse, RegisterRequest>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation } = register;
