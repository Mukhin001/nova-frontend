"use client";

import { useGetLocationQuery } from "@/api/location/locationApi";
import { useGetWeatherByCityQuery } from "@/api/weather/weatherApi";
import LocationInfo from "../locationInfo/LocationInfo";
import News from "../news/News";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCity } from "@/store/slices/uiSlice";
import { useEffect } from "react";
import Loader from "../loader/Loader";

const Weather = () => {
  const {
    data: location,
    isLoading: cityIsLoading,
    isError: cityIsError,
  } = useGetLocationQuery();

  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.ui.city);

  useEffect(() => {
    if (!city && location?.city) {
      dispatch(setCity(location.city));
    }
  }, [location?.city, city, dispatch]);

  const citiesArr = [
    { label: "Москва", value: "Moscow" },
    { label: "Санкт-Петербург", value: "Saint Petersburg" },
    { label: "Берлин", value: "Berlin" },
    { label: "Новосибирск", value: "Novosibirsk" },
    { label: "Екатеринбург", value: "Ekaterinburg" },
    { label: "Казань", value: "Kazan" },
    { label: "Нижний Новгород", value: "Nizhniy Novgorod" },
    { label: "Краснодар", value: "Krasnodar" },
    { label: "Сочи", value: "Sochi" },
  ];

  const { data, isLoading, isError } = useGetWeatherByCityQuery({ city });

  if (isLoading) return <Loader />;
  if (isError) return <p>Failed to load weather</p>;

  const currentCityLabel =
    citiesArr.find((c) => c.value === city)?.label ?? city;

  return (
    <section>
      <h3>City: {currentCityLabel}</h3>
      <p>temp: {data?.main.temp} &deg;C</p>
      <p>{data?.weather[0].description}</p>
      <label htmlFor="city-select">
        {
          <select
            value={city}
            name="cities"
            id="city-select"
            onChange={(e) => dispatch(setCity(e.target.value))}
          >
            {citiesArr.map((city) => (
              <option value={city.value} key={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        }
      </label>
      <LocationInfo
        city={city}
        country={location?.country}
        isLoading={cityIsLoading}
        isError={cityIsError}
      />
      <News />
    </section>
  );
};

export default Weather;
