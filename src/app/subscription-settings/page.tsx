import SubscriptionSettings from "@/components/ui/subscription-settings/SubscriptionSettings";

const SubscriptionSettingsPage = () => {
  return (
    <main className="container">
      <h1>Настройки подписок</h1>
      <p>Выберите города и категории — это определит вашу новостную ленту</p>

      <SubscriptionSettings />
    </main>
  );
};

export default SubscriptionSettingsPage;
