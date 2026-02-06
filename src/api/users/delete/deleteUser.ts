import { baseApi } from "@/api/baseApi";

export const deleteUser = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    delete: builder.mutation<
      { message: string },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/user/delete-user",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useDeleteMutation } = deleteUser;
