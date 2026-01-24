"use client";

import { useUpdateSubscriptionsMutation } from "@/api/users/subscriptions/subscriptions";
import { showToast } from "@/components/ui/toast/toastSlice";
import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";

const CITIES = [
  "Berlin",
  "Paris",
  "Moscow",
  "Tomsk",
  "Vladivostok",
  "Saint-Petersburg",
  "Sochi",
  "Nizhniy-Novgorod",
];

const SubscriptionsPage = () => {
  const [updateSubscriptions, { isLoading }] = useUpdateSubscriptionsMutation();
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const toggleCity = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city],
    );
  };

  const handleSave = async () => {
    if (selectedCities.length === 0) {
      dispatch(showToast({ message: "не выбрали ни одного города" }));
      return;
    }
    try {
      await updateSubscriptions({
        subscriptions: {
          cities: selectedCities,
          newsCategories: [],
        },
      }).unwrap();

      dispatch(
        showToast({ message: "Подписки сохранены ✅", type: "success" }),
      );
    } catch (error) {
      const message = "Ошибка отправки данных";

      dispatch(showToast({ message: "❌ " + message }));
    }
  };

  return (
    <main>
      <h1>Настройки подписок</h1>
      <label htmlFor="cities-select">Choose a pet:</label>

      {CITIES.map((city) => (
        <label htmlFor={city} key={city}>
          <input
            type="checkbox"
            id={city}
            name={city}
            checked={selectedCities.includes(city)}
            onChange={() => toggleCity(city)}
            disabled={isLoading}
          />
          {city}
        </label>
      ))}
      <button onClick={handleSave} disabled={isLoading}>
        Сохранить
      </button>
      <ul>
        {selectedCities.map((city) => (
          <li key={city}>{city}</li>
        ))}
      </ul>
    </main>
  );
};

export default SubscriptionsPage;
