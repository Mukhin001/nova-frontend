"use client";

import { useGetCityStatsQuery } from "@/api/analytics/cityStatsApi";
import Card from "@/components/ui/card/Card";
import Loader from "@/components/ui/loader/Loader";

const Analytics = () => {
  const { data, isLoading, isError } = useGetCityStatsQuery();

  if (isLoading) {
    return <Loader variant="fullScreen" description="Загружаем аналитику…" />;
  }

  if (isError) {
    return <p>Ошибка загрузки аналитики</p>;
  }
  if (!data?.cities.length) {
    return <p>Нет данных аналитики</p>;
  }

  return (
    <section>
      <h2>📊 Статистика городов</h2>

      <ul className="stack">
        {data.cities.map((city) => (
          <Card as="li" key={city._id}>
            <h3>{city._id}</h3>
            <p>Выбран: {city.total} раз</p>

            {city.categories && (
              <section>
                <h4>Категории:</h4>
                <ul>
                  {Object.entries(city.categories).map(([cat, count]) => (
                    <li key={cat}>
                      {cat}: {count}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </Card>
        ))}
      </ul>
    </section>
  );
};

export default Analytics;
