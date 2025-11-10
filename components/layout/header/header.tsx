"use client";

import { useGetGreetingServerQuery } from "@/api/api";
import { ReactNode, useState } from "react";
import Link from "next/link";
import Drawer from "../../ui/drawer/drawer";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn, selectUser } from "@/store/userSlice";
import st from "./header.module.css";

const Header = () => {
  const { data, isLoading, isError } = useGetGreetingServerQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userIsLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const greet = (): ReactNode => {
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error...</p>;
    if (data) return <p>{data.message}</p>;

    return null;
  };

  return (
    <header className={st.header}>
      <Link href="/">
        <h1>Full-stack-app</h1>
      </Link>
      {userIsLoggedIn ? <h2>{user?.name}</h2> : <h2>Войдите...</h2>}
      <div>{greet()}</div>
      <div className="relative">
        <button onClick={openModal}>меню профиля</button>

        {isModalOpen && (
          <Drawer onClose={closeModal}>
            <ul>
              <li>
                <Link href="/yourSaved" onClick={closeModal}>
                  твои сохраненные
                </Link>
              </li>
              {!userIsLoggedIn && (
                <li>
                  <Link href="/register" onClick={closeModal}>
                    регистрация
                  </Link>
                </li>
              )}
              {!userIsLoggedIn && (
                <li>
                  <Link href="/login" onClick={closeModal}>
                    войти
                  </Link>
                </li>
              )}
              {userIsLoggedIn && (
                <li>
                  <Link href="/account" onClick={closeModal}>
                    аккаунт
                  </Link>
                </li>
              )}
            </ul>
          </Drawer>
        )}
      </div>
    </header>
  );
};

export default Header;
