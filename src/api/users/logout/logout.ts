import { userApi } from "../userApi";

export const logout = userApi.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const { useLogoutMutation } = logout;
