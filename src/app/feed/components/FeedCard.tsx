import st from "./feed.module.css";
import { FeedItem } from "@/api/users/feed/feed";
import FeedWeather from "./FeedWeather";
import FeedNews from "./FeedNews";
import Card from "@/components/ui/card/Card";

interface FeedCardProps {
  item: FeedItem;
}

const FeedCard = ({ item }: FeedCardProps) => {
  return (
    <Card as="article" className="stack stack-md">
      <h2 className={st.city}>{item.city}</h2>

      <FeedWeather weather={item.weather} />

      <section>
        <h3>Новости</h3>
        <FeedNews news={item.news} />
      </section>
    </Card>
  );
};

export default FeedCard;
