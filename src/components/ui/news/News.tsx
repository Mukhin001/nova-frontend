import { useGetNewsQuery } from "@/api/news/newsApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setNewsCategory } from "@/store/slices/uiSlice";

const News = () => {
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.ui.city);
  const category = useAppSelector((state) => state.ui.newsCategory);
  const {
    data: newsList,
    isLoading,
    isError,
  } = useGetNewsQuery({ city, category });

  const renderNews = () => {
    if (isLoading) return <p>Loading news...</p>;
    if (isError) return <p>Failed to load news</p>;

    if (!newsList || newsList.length === 0) {
      return <li>No news available for {city}</li>;
    }

    return newsList.map((news) => (
      <li key={news.link}>
        <a href={news.link} target="_blank" rel="noreferrer">
          {news.title}
        </a>
      </li>
    ));
  };

  return (
    <section>
      <h3>
        Ключевое слово для поиска в тексте новости: <i>{city}</i>
      </h3>
      <p>Выбрано: {category}</p>

      <select
        value={category}
        onChange={(e) => dispatch(setNewsCategory(e.target.value))}
      >
        <option value="">All</option>
        <option value="technology">Technology</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
      </select>

      <h3>News for city: {city}</h3>
      <ul>{renderNews()}</ul>
    </section>
  );
};

export default News;
