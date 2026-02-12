import Link from "next/link";
import { User } from "@/types/apiUser";
import { useGetAnalyticsQuery } from "@/api/analytics/analytics";

interface UserHomeProps {
  user: User;
}

const UserHome = ({ user }: UserHomeProps) => {
  const subsCount = user.subscriptions?.length ?? 0;
  const { data, isLoading, isError } = useGetAnalyticsQuery();
  console.log("Analytics", data);
  if (isLoading) {
    console.log("loading...");
  }

  return (
    <>
      <section>
        <h2>Привет, {user.name} 👋</h2>
        <p>
          {subsCount > 0
            ? `У тебя выбрано городов: ${subsCount}`
            : "Ты ещё не настроил свою ленту"}
        </p>
      </section>

      <section>
        <h2>Что нового</h2>
        <p>Свежие новости уже ждут тебя 👀</p>
        <div>
          <Link href="/feed">Перейти к ленте</Link>
          <Link href="/subscription-settings">Настроить подписки</Link>
        </div>
      </section>
    </>
  );
};

export default UserHome;
