import { baseApi } from "@/api/baseApi";

interface LoginResponse {
  subscriptions: {
    cities: string[];
    newsCategories: string[];
  };
}

interface UpdateSubscriptionsRequest {
  subscriptions: {
    cities: string[];
    newsCategories: string[];
  };
}

export const subscriptions = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateSubscriptions: builder.mutation<
      LoginResponse,
      UpdateSubscriptionsRequest
    >({
      query: (body) => ({
        url: "/user/subscriptions",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useUpdateSubscriptionsMutation } = subscriptions;
