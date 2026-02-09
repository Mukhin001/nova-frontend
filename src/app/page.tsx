import HomeClient from "@/components/ui/home/HomeClient";

export default function HomePage() {
  return (
    <main className="container">
      <section>
        <h1>Персональная лента новостей</h1>
        <p>
          Full-stack веб-приложение для создания персональной новостной ленты
        </p>
        <p>
          Nova — это умная новостная лента, которая показывает только те города
          и категории, которые действительно интересны тебе.
        </p>
        <p>Без шума. Без лишнего. Только актуальные новости — в одном месте.</p>
      </section>

      <HomeClient />
    </main>
  );
}
