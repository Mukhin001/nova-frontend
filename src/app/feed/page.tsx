"use client";

import { useGetFeedQuery } from "@/api/users/feed/feed";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import st from "./feed.module.css";
import Image from "next/image";

const FeedPage = () => {
  const subscriptions = useAppSelector(
    (state) => state.user.user?.subscriptions,
  );

  const { data: feed, isLoading, error } = useGetFeedQuery();

  if (!subscriptions || subscriptions?.length === 0) {
    return (
      <main className="container">
        <h1>Лента</h1>
        <p>Вы ещё не выбрали подписки</p>
        <Link href="/subscription-settings">Выбрать подписки</Link>
      </main>
    );
  }

  if (isLoading) {
    return <p>Загружаем ленту…</p>;
  }

  if (error) {
    return <p>Ошибка загрузки ленты</p>;
  }

  if (!feed || feed.length === 0) {
    return <p>Лента пуста</p>;
  }

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const weatherIcons: Record<string, string> = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Snow: "❄️",
    Thunderstorm: "⛈️",
    Drizzle: "🌦️",
    Mist: "🌫️",
  };

  return (
    <main className="container">
      <h1>Лента</h1>

      <div className={st.feed}>
        {feed.map((item) => (
          <article key={item.city} className={`${st.card} ${st.fadeUp}`}>
            <h2 className={st.city}>{item.city}</h2>

            <section>
              {item.weather ? (
                <div className={st.tempWrapper}>
                  <span
                    className={st.weatherIcon}
                    data-condition={item.weather.condition}
                  >
                    {weatherIcons[item.weather.condition] ?? "🌡️"}
                  </span>

                  <div>
                    <span>{item.weather.temp}°C</span>
                    <span> ощущается как {item.weather.feelsLike}°C</span>
                    <p>{item.weather.description}</p>
                  </div>

                  <div className={st.serverIcon}>
                    <Image
                      src={`https://openweathermap.org/img/wn/${item.weather.icon}@2x.png`}
                      alt={item.weather.description}
                      width={40}
                      height={40}
                    />
                  </div>
                </div>
              ) : (
                <p className={st.empty}>Нет данных о погоде</p>
              )}
            </section>

            <section>
              <h3>Новости</h3>

              {item.news.length === 0 ? (
                <p>Новостей нет</p>
              ) : (
                <ul>
                  {item.news.map((news) => (
                    <li key={news.link}>
                      <a href={news.link} target="_blank" rel="noreferrer">
                        {news.title}
                      </a>

                      {news.description && <p>{news.description}</p>}
                      <time className={st.date}>
                        {formatDate(news.pubDate)}
                      </time>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </article>
        ))}
      </div>
      <p>Конец ленты</p>
    </main>
  );
};

export default FeedPage;
