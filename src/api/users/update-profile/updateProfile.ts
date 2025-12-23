import { userApi } from "@/api/users/userApi";

interface LoginResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
}

interface UpdateProfileRequest {
  name: string;
  email: string;
  password: string;
  password_new: string;
}

export const updateProfile = userApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation<LoginResponse, UpdateProfileRequest>({
      query: (body) => ({
        url: "/update-profile",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = updateProfile;
