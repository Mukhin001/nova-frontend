import { baseApi } from "../baseApi";

export interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

export const weatherApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWeatherByCity: builder.query<WeatherResponse, { city: string }>({
      query: ({ city }) => `/weather?city=${encodeURIComponent(city)}`,
    }),
  }),
});

export const { useGetWeatherByCityQuery } = weatherApi;
