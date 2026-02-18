import st from "./feed.module.css";
import { FeedItem } from "@/api/users/feed/feed";
import FeedWeather from "./FeedWeather";
import FeedNews from "./FeedNews";

interface FeedCardProps {
  item: FeedItem;
}

const FeedCard = ({ item }: FeedCardProps) => {
  return (
    <article key={item.city} className={`${st.card} ${st.fadeUp}`}>
      <h2 className={st.city}>{item.city}</h2>

      <section>
        <FeedWeather weather={item.weather} />
      </section>

      <section>
        <h3>Новости</h3>
        <FeedNews news={item.news} />
      </section>
    </article>
  );
};

export default FeedCard;
