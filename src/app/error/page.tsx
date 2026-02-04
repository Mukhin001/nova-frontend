import Link from "next/link";

interface ErrorPageProps {
  title?: string;
}

const ErrorPage = ({ title = "Страница ошибки" }: ErrorPageProps) => {
  return (
    <main className="container">
      <h1>404 - Страница не найдена...</h1>
      <p>{title}</p>
      <Link href="/">На главную</Link>
    </main>
  );
};

export default ErrorPage;
