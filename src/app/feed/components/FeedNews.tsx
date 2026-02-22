import st from "./feed.module.css";
import { FeedNewsItem } from "@/api/users/feed/feed";

interface FeedNewsProps {
  news: FeedNewsItem[] | [];
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const FeedNews = ({ news }: FeedNewsProps) => {
  if (!news || news.length === 0) return <p>Новостей нет</p>;

  return (
    <ul className="stack">
      {news.map((n) => (
        <li key={n.link}>
          <a href={n.link} target="_blank" rel="noreferrer">
            {n.title}
          </a>
          {n.description && <p>{n.description}</p>}
          <time className={st.date}>{formatDate(n.pubDate)}</time>
        </li>
      ))}
    </ul>
  );
};

export default FeedNews;
