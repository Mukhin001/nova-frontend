import { useGetNewsQuery } from "@/api/news/newsApi";
import { useState } from "react";

const News = () => {
  const [category, setCategory] = useState<string | undefined>("technology");
  const { data, isLoading, isError } = useGetNewsQuery({ category });

  if (isLoading) return <p>Loading news...</p>;
  if (isError) return <p>Failed to load news</p>;

  return (
    <section>
      <h3>News {category && `(${category})`}</h3>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value || undefined)}
      >
        <option value="">All</option>
        <option value="technology">Technology</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
      </select>

      <ul>
        {data?.map((news) => (
          <li key={news.link}>
            <a href={news.link} target="_blank" rel="noreferrer">
              {news.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default News;
