import { baseApi } from "../baseApi";

export type CityStats = {
  _id: string;
  total: number;
  categories?: Record<string, number>;
};

type CityStatsResponse = { cities: CityStats[] };

export const cityStatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCityStats: builder.query<CityStatsResponse, void>({
      query: () => "/analytics/cities",
      providesTags: ["CityStats"],
    }),
  }),
});

export const { useGetCityStatsQuery } = cityStatsApi;
