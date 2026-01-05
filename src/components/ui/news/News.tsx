import { useGetNewsQuery } from "@/api/news/newsApi";
import { useState } from "react";

interface NewsProps {
  city: string;
}

const News = ({ city }: NewsProps) => {
  const [category, setCategory] = useState<string>("technology");
  const { data, isLoading, isError } = useGetNewsQuery({ city, category });
  console.log(data);

  if (isLoading) return <p>Loading news...</p>;
  if (isError) return <p>Failed to load news</p>;

  return (
    <section>
      <h3>
        ключевое слово для поиска в тексте новости: <i>{city}</i>
      </h3>
      <p>Выбранны: {category}</p>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All</option>
        <option value="technology">Technology</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
      </select>

      <h3>News for city: {city}</h3>
      <ul>
        {data && data.length > 0 ? (
          data.map((news) => (
            <li key={news.link}>
              <a href={news.link} target="_blank" rel="noreferrer">
                {news.title}
              </a>
            </li>
          ))
        ) : (
          <li>No news available for {city}</li>
        )}
      </ul>
    </section>
  );
};

export default News;
