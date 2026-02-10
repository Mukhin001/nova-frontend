"use client";

import {
  Subscription,
  useUpdateSubscriptionsMutation,
} from "@/api/users/subscriptions/subscriptions";
import Button from "@/components/ui/button/Button";
import Loader from "@/components/ui/loader/Loader";
import { showToast } from "@/components/ui/toast/toastSlice";
import { CITIES, MAX_CITIES } from "@/constants/subscription";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import CitySubscriptionItem from "./CitySubscriptionItem";

const SubscriptionSettings = () => {
  const user = useAppSelector((state) => state.user.user);
  const userSubscriptions: Subscription[] = user?.subscriptions ?? [];
  const [updateSubscriptions, { isLoading }] = useUpdateSubscriptionsMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  if (!user) {
    return (
      <div>
        <p>Пожалуйста, войдите в систему, чтобы управлять подписками.</p>
        <Button onClick={() => router.push("/login")}>Войти</Button>
      </div>
    );
  }

  const toggleCity = (city: string) => {
    if (!user) return;

    const isSelected = userSubscriptions.some((s) => s.city === city);

    const nextSubscriptions = isSelected
      ? userSubscriptions.filter((s) => s.city !== city)
      : [...userSubscriptions, { city, category: "All" }];

    dispatch(
      setUser({
        ...user,
        subscriptions: nextSubscriptions,
      }),
    );

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

    const newSub = userSubscriptions.map((sub) =>
      sub.city === city ? { ...sub, category } : sub,
    );

    dispatch(
      setUser({
        ...user,
        subscriptions: newSub,
      }),
    );
  };

  const handleSave = async () => {
    if (!user) {
      dispatch(
        showToast({
          message: "Пожалуйста, войдите в систему, чтобы управлять подписками.",
        }),
      );
      return;
    }

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
      router.push("/feed");
    } catch (e) {
      const message = "Ошибка отправки данных";
      console.log(e);

      dispatch(showToast({ message: "❌ " + message }));
    }
  };

  return (
    <>
      {isLoading && <Loader variant="fullScreen" />}

      {CITIES.map((city) => {
        const subscription = userSubscriptions.find((s) => s.city === city);
        const disabled =
          !subscription && userSubscriptions.length >= MAX_CITIES;
        return (
          <CitySubscriptionItem
            key={city}
            city={city}
            subscription={subscription}
            disabled={disabled}
            onToggle={toggleCity}
            onCategoryChange={changeCategory}
          />
        );
      })}

      <Button onClick={handleSave} disabled={isLoading} className="button">
        {isLoading ? "Сохраняем..." : "Сохранить"}
      </Button>
    </>
  );
};

export default SubscriptionSettings;
