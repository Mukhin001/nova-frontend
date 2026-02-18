"use client";

import { useGetFeedQuery } from "@/api/users/feed/feed";
import { useAppSelector } from "@/store/hooks";
import st from "./feed.module.css";
import FeedCard from "./FeedCard";
import Loader from "@/components/ui/loader/Loader";
import FeedEmpty from "./FeedEmpty";

const Feed = () => {
  const subscriptions = useAppSelector(
    (state) => state.user.user?.subscriptions,
  );

  const { data: feed, isLoading, error } = useGetFeedQuery();

  if (!subscriptions || subscriptions?.length === 0) {
    return <FeedEmpty />;
  }

  if (isLoading) {
    return <Loader variant="fullScreen" description="Загружаем ленту..." />;
  }

  if (error) {
    return <p>Ошибка загрузки ленты</p>;
  }

  if (!feed || feed.length === 0) {
    return <p>Лента пуста</p>;
  }

  return (
    <>
      <div className={st.feed}>
        {feed.map((item) => (
          <FeedCard key={item.city} item={item} />
        ))}
      </div>
      <p>Конец ленты</p>
    </>
  );
};

export default Feed;
