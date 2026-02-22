import ToggleTheme from "@/components/features/toggleTheme/ToggleTheme";
import ServerStatus from "@/components/ui/serverStatus/ServerStatus";

const SettingsPage = () => {
  return (
    <main className="container stack stack-md center-y">
      <h1>Настройки</h1>

      <section className="stack center-y">
        <ToggleTheme />
      </section>

      <section className="stack center-y">
        <h2>Информация о сервере</h2>
        <ServerStatus className="showAlways" />
      </section>

      <section className="stack center-y">
        <h2>Уведомления</h2>
        <label>
          <input type="checkbox" className="checkbox" /> Получать email
          уведомления
        </label>
        <label>
          <input type="checkbox" className="checkbox" /> Получать push
          уведомления
        </label>
      </section>
    </main>
  );
};

export default SettingsPage;
