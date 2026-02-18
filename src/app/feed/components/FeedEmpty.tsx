import Link from "next/link";

const FeedEmpty = () => {
  return (
    <>
      <p>Вы ещё не выбрали подписки</p>
      <Link href="/subscription-settings">Выбрать подписки</Link>
    </>
  );
};

export default FeedEmpty;
