import { baseApi } from "@/api/baseApi";

export type FeedNewsItem = {
  title: string;
  description: string;
  link: string;
  pubDate: string;
};

export type FeedWeather = {
  temp: number;
  feelsLike: number;
  humidity: number;
  description: string;
  icon: string;
};

export type FeedItem = {
  city: string;
  category: string;
  weather: FeedWeather | null;
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
