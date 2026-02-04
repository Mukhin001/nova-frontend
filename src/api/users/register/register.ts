import { baseApi } from "@/api/baseApi";
import { LoginResponse } from "@/types/apiUser";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export const register = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<LoginResponse, RegisterRequest>({
      query: (body) => ({
        url: "/user/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation } = register;
