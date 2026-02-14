import { baseApi } from "@/api/baseApi";

export type Subscription = {
  city: string;
  category: string;
};

interface UpdateSubscriptionsResponse {
  subscriptions: Subscription[];
}

interface UpdateSubscriptionsRequest {
  subscriptions: Subscription[];
}

export const subscriptions = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateSubscriptions: builder.mutation<
      UpdateSubscriptionsResponse,
      UpdateSubscriptionsRequest
    >({
      query: (body) => ({
        url: "/user/subscription-settings",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Feed", "CityStats"],
    }),
  }),
});

export const { useUpdateSubscriptionsMutation } = subscriptions;
