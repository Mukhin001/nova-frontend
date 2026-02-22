import Link from "next/link";

const NotFoundPage = () => {
  return (
    <main className="container stack stack-md center-y">
      <section className="stack">
        <h1>404 - Route not found...</h1>
        <p>Такой страницы не существует</p>
        <Link href="/">На главную</Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
