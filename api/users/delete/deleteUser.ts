import { userApi } from "../userApi";

export const deleteUser = userApi.injectEndpoints({
  endpoints: (builder) => ({
    delete: builder.mutation<
      { message: string },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "delete-user",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useDeleteMutation } = deleteUser;
