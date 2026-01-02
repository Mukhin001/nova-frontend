"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";

import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn, selectUser } from "@/utils/userSlice";
import st from "./header.module.css";
import Drawer from "@/components/ui/drawer/Drawer";
import Loader from "@/components/ui/loader/Loader";
import { useGetGreetingServerQuery } from "@/api/baseApi";

const Header = () => {
  const { data, isLoading, isError } = useGetGreetingServerQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userIsLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);
  console.log(user);

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
      <Link href="/">
        <h1>Full-stack-app</h1>
      </Link>
      {userIsLoggedIn ? <h2>{user?.name}</h2> : <h2>Войдите...</h2>}
      <div style={{ fontWeight: "900", color: "#660cbb", fontSize: "large" }}>
        {greet()}
      </div>
      <div className="relative">
        <button onClick={openModal}>меню профиля</button>

        {isModalOpen && (
          <Drawer onClose={closeModal}>
            <ul>
              <li>
                <Link href="/your-saved" onClick={closeModal}>
                  твои сохраненные
                </Link>
              </li>
              <li>
                <Link href="/error-page" onClick={closeModal}>
                  нет такой страницы
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
