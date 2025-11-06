"use client";

import { useGetGreetingServerQuery } from "@/api/api";
import { ReactNode } from "react";
import Drawer from "./drawer/Drawer";
import Link from "next/link";

const TheHeader = () => {
  const { data, isLoading, isError } = useGetGreetingServerQuery();

  const greet = (): ReactNode => {
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error...</p>;
    if (data) return <p>{data.message}</p>;

    return null;
  };

  return (
    <header>
      Header
      <div>
        <h2>Full-stack-app</h2>
        {greet()}
      </div>
      <div className="relative">
        <button>Войти</button>
        <Drawer bottom="50%">
          <ul>
            <li>
              <Link href="/yourSaved">твои сохраненные</Link>
            </li>
            <li>
              <Link href="/account">аккаунт</Link>
            </li>
            <li>
              <Link href="/signIn">войти</Link>
            </li>
          </ul>
        </Drawer>
      </div>
    </header>
  );
};

export default TheHeader;
