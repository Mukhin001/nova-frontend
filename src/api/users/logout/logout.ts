import { baseApi } from "@/api/baseApi";

export const logout = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/user/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const { useLogoutMutation } = logout;
