"use client";

import { useGetCityStatsQuery } from "@/api/analytics/cityStatsApi";

const Analytics = () => {
  const { data, isLoading, isError } = useGetCityStatsQuery();
  console.log(data);

  if (isLoading) {
    return <p>Загружаем аналитику…</p>;
  }

  if (isError) {
    return <p>Ошибка загрузки аналитики</p>;
  }
  if (!data?.cities.length)
    return (
      <main>
        <h1>Нет данных аналитики</h1>
      </main>
    );

  const sorted = [...data.cities].sort((a, b) => b.total - a.total);
  return (
    <main className="container">
      <h1>Аналитика!</h1>

      <div style={{ padding: 24 }}>
        <h1>📊 Статистика городов</h1>

        {sorted.map((city) => (
          <div
            key={city._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 16,
              marginTop: 12,
            }}
          >
            <h2>{city._id}</h2>
            <p>Выбран: {city.total} раз</p>

            {city.categories && (
              <div>
                <b>Категории:</b>
                <ul>
                  {Object.entries(city.categories).map(([cat, count]) => (
                    <li key={cat}>
                      {cat}: {count}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Analytics;
