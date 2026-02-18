import { baseApi } from "@/api/baseApi";

export type FeedNewsItem = {
  title: string;
  description: string;
  link: string;
  pubDate: string;
};

export type FeedWeatherItem = {
  temp: number;
  feelsLike: number;
  humidity: number;
  description: string;
  icon: string;
  condition: string;
};

export type FeedItem = {
  city: string;
  category: string;
  weather: FeedWeatherItem | null;
  news: FeedNewsItem[] | [];
};

export type FeedResponse = FeedItem[];

export const feedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeed: builder.query<FeedResponse, void>({
      query: () => ({
        url: "/user/feed",
        method: "GET",
      }),
      providesTags: ["Feed"],
    }),
  }),
});

export const { useGetFeedQuery } = feedApi;
