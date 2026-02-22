import SubscriptionSettings from "@/components/features/subscription-settings/SubscriptionSettings";

const SubscriptionSettingsPage = () => {
  return (
    <main className="container stack stack-md center-y">
      <h1>Настройки подписок</h1>
      <p>Выберите города и категории — это определит вашу новостную ленту</p>

      <SubscriptionSettings />
    </main>
  );
};

export default SubscriptionSettingsPage;
