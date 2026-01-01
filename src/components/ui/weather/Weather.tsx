import { useGetWeatherByCityQuery } from "@/api/weather/getWeathet";
import { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState<string>("Moscow");

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

  const { data, isLoading, isError } = useGetWeatherByCityQuery(city);
  //   <select
  //     name="cities"
  //     id="city-select"
  //     onChange={(e) => setCity(e.target.value)}
  //   >
  //     {citiesArr.map((city) => (
  //       <option value={city} key={city}>
  //         {city}
  //       </option>
  //     ))}
  //   </select>;
  // );

  if (isLoading) return <p>Loading weather...</p>;
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
            onChange={(e) => setCity(e.target.value)}
          >
            {citiesArr.map((city) => (
              <option value={city.value} key={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        }
      </label>
    </section>
  );
};

export default Weather;
