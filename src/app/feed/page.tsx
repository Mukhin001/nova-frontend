"use client";

import { useGetFeedQuery } from "@/api/users/feed/feed";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";

const FeedPage = () => {
  const subscriptions = useAppSelector(
    (state) => state.user.user?.subscriptions,
  );

  const { data: feed, isLoading, error } = useGetFeedQuery();
  //console.log(feed);

  if (!subscriptions || subscriptions?.length === 0) {
    return (
      <main className="container">
        <h1>Лента</h1>
        <p>Вы ещё не выбрали подписки</p>
        <Link href="/subscriptions">Выбрать подписки</Link>
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

  return (
    <main className="container">
      <h1>Лента</h1>

      {feed.map((item) => (
        <section key={item.city}>
          <h2>{item.city}</h2>

          {/* 🌤 Погода */}
          {item.weather ? (
            <p>
              🌡 {item.weather.temp}°C (ощущается как {item.weather.feelsLike}
              °C) <br />
              {item.weather.description}
            </p>
          ) : (
            <p>Нет данных о погоде</p>
          )}

          {/* 📰 Новости */}
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

                  <div>
                    <small>{formatDate(news.pubDate)}</small>
                  </div>

                  {news.description && <p>{news.description}</p>}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </main>
  );
};

export default FeedPage;
