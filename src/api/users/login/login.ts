import { baseApi } from "@/api/baseApi";
import { LoginResponse } from "@/types/apiUser";

export const login = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: (body) => ({
          url: "/user/login",
          method: "POST",
          body,
        }),
      },
    ),
  }),
  overrideExisting: true,
});

export const { useLoginMutation } = login;
