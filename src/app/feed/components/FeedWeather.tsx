import { FeedWeatherItem } from "@/api/users/feed/feed";
import st from "./feed.module.css";
import Image from "next/image";

interface FeedWeatherProps {
  weather: FeedWeatherItem | null;
}

const weatherIcons: Record<string, string> = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Snow: "❄️",
  Thunderstorm: "⛈️",
  Drizzle: "🌦️",
  Mist: "🌫️",
};

const FeedWeather = ({ weather }: FeedWeatherProps) => {
  if (!weather) return <p className={st.empty}>Нет данных о погоде</p>;

  return (
    <div className={st.tempWrapper}>
      <span className={st.weatherIcon} data-condition={weather.condition}>
        {weatherIcons[weather.condition] ?? "🌡️"}
      </span>

      <div>
        <span>{weather.temp}°C</span>
        <span> ощущается как {weather.feelsLike}°C</span>
        <p>{weather.description}</p>
      </div>

      <div className={st.serverIcon}>
        {weather.icon ? (
          <Image
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            width={40}
            height={40}
          />
        ) : (
          <p>weather icon error</p>
        )}
      </div>
    </div>
  );
};

export default FeedWeather;
