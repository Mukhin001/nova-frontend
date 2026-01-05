import { baseApi } from "../baseApi";

export interface LocationResponse {
  country: string;
  city: string;
  lat?: number;
  lon?: number;
}

export const locationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLocation: builder.query<LocationResponse, void>({
      query: () => "/location",
    }),
  }),
});

export const { useGetLocationQuery } = locationApi;
