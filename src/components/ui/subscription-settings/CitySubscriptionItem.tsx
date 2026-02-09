"use client";

import { Subscription } from "@/api/users/subscriptions/subscriptions";
import { NEWS } from "@/constants/subscription";

interface Props {
  city: string;
  subscription?: Subscription;
  disabled?: boolean;
  onToggle: (city: string) => void;
  onCategoryChange: (city: string, category: string) => void;
}

const CitySubscriptionItem = ({
  city,
  subscription,
  disabled,
  onToggle,
  onCategoryChange,
}: Props) => {
  return (
    <div className="subscription-item">
      <fieldset disabled={disabled}>
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id={`city_${city}`}
            checked={!!subscription}
            onChange={() => onToggle(city)}
            className="checkbox"
            disabled={disabled}
          />
          <label
            htmlFor={`city_${city}`}
            className={`label-checkbox ${disabled ? "label-disabled" : ""}`}
          >
            {city}
          </label>

          {subscription && (
            <>
              <label htmlFor={`category_${city}`}>Категория новостей:</label>
              <select
                name={`category_${city}`}
                value={subscription.category}
                onChange={(e) => onCategoryChange(city, e.target.value)}
              >
                {NEWS.map((news) => (
                  <option key={news} value={news}>
                    {news}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      </fieldset>
    </div>
  );
};

export default CitySubscriptionItem;
