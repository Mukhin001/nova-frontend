import { userApi } from "../userApi";

interface LoginResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
}

export const login = userApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: (body) => ({
          url: "/login",
          method: "POST",
          body,
        }),
      }
    ),
  }),
  overrideExisting: true,
});

export const { useLoginMutation } = login;
