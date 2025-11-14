import { userApi } from "@/api/users/userApi";

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

export const register = userApi.injectEndpoints({
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
