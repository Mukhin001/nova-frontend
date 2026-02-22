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
    <fieldset disabled={disabled} className="checkbox-wrapper">
      <label
        htmlFor={`city_${city}`}
        className={`flex stack-md label-checkbox ${disabled ? "label-disabled" : ""}`}
      >
        <input
          type="checkbox"
          id={`city_${city}`}
          checked={!!subscription}
          onChange={() => onToggle(city)}
          className="checkbox"
          disabled={disabled}
        />
        {city}
      </label>

      <div
        className={`flex stack-md center-y category-block ${subscription ? "show" : ""}`}
      >
        <label htmlFor={`category_${city}`}>Категория новостей:</label>
        <select
          id={`category_${city}`}
          name={`category_${city}`}
          value={subscription?.category}
          onChange={(e) => onCategoryChange(city, e.target.value)}
        >
          {NEWS.map((news) => (
            <option key={news} value={news}>
              {news}
            </option>
          ))}
        </select>
      </div>
    </fieldset>
  );
};

export default CitySubscriptionItem;
