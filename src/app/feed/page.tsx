"use client";

import { useGetFeedQuery } from "@/api/users/feed/feed";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import st from "./feed.module.css";

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

  return (
    <main className="container">
      <h1>Лента</h1>

      {feed.map((item) => (
        <section key={item.city}>
          <h2 className={st.fadeUp}>{item.city}</h2>

          {item.weather ? (
            <p className={st.fadeUp}>
              🌡 {item.weather.temp}°C (ощущается как {item.weather.feelsLike}
              °C) <br />
              {item.weather.description}
            </p>
          ) : (
            <p className={st.fadeUp}>Нет данных о погоде</p>
          )}

          <h3 className={st.fadeUp}>Новости</h3>

          {item.news.length === 0 ? (
            <p className={st.fadeUp}>Новостей нет</p>
          ) : (
            <ul>
              {item.news.map((news) => (
                <li key={news.link} className={st.fadeUp}>
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
      <p className={`${st.fadeUp} ${st.end}`}>Конец</p>
      <div className={st.feedEnd}></div>
    </main>
  );
};

export default FeedPage;
