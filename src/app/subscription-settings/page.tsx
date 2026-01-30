"use client";

import {
  Subscription,
  useUpdateSubscriptionsMutation,
} from "@/api/users/subscriptions/subscriptions";
import Loader from "@/components/ui/loader/Loader";
import { showToast } from "@/components/ui/toast/toastSlice";
import { CITIES, MAX_CITIES, NEWS } from "@/constants/subscription";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/userSlice";

const SubscriptionSettingsPage = () => {
  const user = useAppSelector((state) => state.user.user);
  const userSubscriptions: Subscription[] = user?.subscriptions ?? [];
  const [updateSubscriptions, { isLoading }] = useUpdateSubscriptionsMutation();
  const dispatch = useAppDispatch();

  if (!user) {
    return <p>Войдите в систему</p>;
  }

  const toggleCity = (city: string) => {
    if (!user) return;

    const isSelected = userSubscriptions.some((s) => s.city === city);

    if (!isSelected && userSubscriptions.length >= MAX_CITIES) {
      dispatch(
        showToast({ message: `Можно выбрать максимум ${MAX_CITIES} города` }),
      );
      return;
    }

    const nextSubscriptions = isSelected
      ? userSubscriptions.filter((s) => s.city !== city)
      : [...userSubscriptions, { city, category: "All" }];

    dispatch(setUser({ ...user, subscriptions: nextSubscriptions }));

    const nextCount = nextSubscriptions.length;

    if (nextCount === MAX_CITIES) {
      dispatch(
        showToast({
          message: `Все ${MAX_CITIES} города выбраны`,
          type: "success",
        }),
      );
    } else {
      dispatch(
        showToast({
          message: `Можно выбрать еще ${MAX_CITIES - nextCount} города`,
          type: "success",
        }),
      );
    }
  };

  const changeCategory = (city: string, category: string) => {
    if (!user) return;

    dispatch(
      setUser({
        ...user,
        subscriptions: userSubscriptions.map((sub) =>
          sub.city === city ? { ...sub, category } : sub,
        ),
      }),
    );
  };

  const handleSave = async () => {
    if (!user || userSubscriptions.length === 0) {
      dispatch(showToast({ message: "не выбрали ни одного города" }));
      return;
    }

    try {
      const response = await updateSubscriptions({
        subscriptions: userSubscriptions,
      }).unwrap();

      dispatch(
        setUser({
          ...user,
          subscriptions: response.subscriptions,
        }),
      );

      dispatch(
        showToast({ message: "Подписки сохранены ✅", type: "success" }),
      );
      console.log("Redux state:", user);
      console.log("Updated subscriptions:", response.subscriptions);
    } catch (e) {
      const message = "Ошибка отправки данных";
      console.log(e);

      dispatch(showToast({ message: "❌ " + message }));
    }
  };

  return (
    <main className="container">
      <h1>Настройки подписок</h1>
      {isLoading && <Loader variant="fullScreen" />}

      {CITIES.map((city) => {
        const subscription = userSubscriptions.find((s) => s.city === city);
        const disabled =
          !subscription && userSubscriptions.length >= MAX_CITIES;
        return (
          <div key={city}>
            <label
              style={{
                opacity: disabled ? 0.5 : 1,
                cursor: disabled ? "not-allowed" : "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={subscription !== undefined}
                onChange={() => toggleCity(city)}
              />
              {city}
            </label>

            {subscription && (
              <select
                name={city}
                value={subscription.category}
                onChange={(e) => changeCategory(city, e.target.value)}
              >
                {NEWS.map((news) => (
                  <option key={news} value={news}>
                    {news}
                  </option>
                ))}
              </select>
            )}
          </div>
        );
      })}
      <button onClick={handleSave} disabled={isLoading} className="button">
        {isLoading ? "Сохраняем..." : "Сохранить"}
      </button>
      <ul>
        {userSubscriptions.map((sub) => (
          <li key={sub.city}>
            city: {sub.city}; category: {sub.category}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default SubscriptionSettingsPage;
