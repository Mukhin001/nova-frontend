"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn, selectUser } from "@/store/slices/userSlice";
import st from "./header.module.css";
import Drawer from "@/components/ui/drawer/Drawer";
import Loader from "@/components/ui/loader/Loader";
import { useGetGreetingServerQuery } from "@/api/baseApi";

const Header = () => {
  const { data, isLoading, isError } = useGetGreetingServerQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userIsLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const greet = (): ReactNode => {
    if (isLoading) return <Loader />;
    if (isError) return <p>Error...</p>;
    if (data) return <p>{data.message}</p>;

    return null;
  };

  return (
    <header className={st.header}>
      <nav>
        <h2>Основная навигация</h2>
        <Link href="/" aria-label="На главную">
          Full-stack-app
        </Link>
        <span>
          {userIsLoggedIn ? user?.name : <Link href="/login">войти</Link>}
        </span>
        <button onClick={openModal}>меню профиля</button>
        <div style={{ fontWeight: "900", color: "#660cbb", fontSize: "large" }}>
          {greet()}
        </div>
        <div className={st.isDesktop}></div>
        <div className="relative">
          {isModalOpen && (
            <Drawer onClose={closeModal}>
              <ul>
                <li>
                  <Link href="/your-saved" onClick={closeModal}>
                    твои сохраненные
                  </Link>
                </li>
                <li>
                  <Link href="/error" onClick={closeModal}>
                    страница ошибки
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
                    <Link href="/profile" onClick={closeModal}>
                      аккаунт
                    </Link>
                  </li>
                )}
                {userIsLoggedIn && (
                  <li>
                    <Link href="/subscriptions" onClick={closeModal}>
                      подписка
                    </Link>
                  </li>
                )}
                {userIsLoggedIn && (
                  <li>
                    <Link href="/feed" onClick={closeModal}>
                      лента
                    </Link>
                  </li>
                )}
              </ul>
            </Drawer>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
