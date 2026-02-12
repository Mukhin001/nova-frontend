import { baseApi } from "../baseApi";

export type AnalyticsEvent = {
  _id: string;
  event: string;
  userId: string | null;
  data?: Record<string, any>;
  ip: string | null;
  ua: string | null;
  createdAt: string; // ISO string, можно потом конвертировать в Date
};

export type GetAnalyticsResponse = {
  events: AnalyticsEvent[];
};

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query<GetAnalyticsResponse, void>({
      query: () => "/analytics",
    }),
  }),
});

export const { useGetAnalyticsQuery } = analyticsApi;
