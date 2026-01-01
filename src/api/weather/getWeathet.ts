import { weatherApi } from "./weatherApi";

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

export const getWeather = weatherApi.injectEndpoints({
  endpoints: (builder) => ({
    getWeatherByCity: builder.query<WeatherResponse, string>({
      query: (city) => `/weather?city=${encodeURIComponent(city)}`,
    }),
  }),
});

export const { useGetWeatherByCityQuery } = getWeather;
