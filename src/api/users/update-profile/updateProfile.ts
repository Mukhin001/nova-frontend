import { baseApi } from "@/api/baseApi";
import { LoginResponse } from "@/types/apiUser";

interface UpdateProfileRequest {
  name: string;
  email: string;
  password: string;
  password_new: string;
}

export const updateProfile = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation<LoginResponse, UpdateProfileRequest>({
      query: (body) => ({
        url: "/user/update-profile",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = updateProfile;
