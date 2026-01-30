"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn, selectUser } from "@/store/slices/userSlice";
import Drawer from "@/components/ui/drawer/Drawer";
import Loader from "@/components/ui/loader/Loader";
import { useGetGreetingServerQuery } from "@/api/baseApi";
import Logout from "@/components/ui/logout/Logout";

const Header = () => {
  const { data, isLoading, isError } = useGetGreetingServerQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userIsLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);
  const [openLogout, setopenLogout] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const greet = (): ReactNode => {
    if (isLoading) return <Loader />;
    if (isError) return <h2>Error...</h2>;
    if (data) return <h2>{data.message}</h2>;

    return null;
  };

  return (
    <header>
      <div className="container">
        <nav>
          <h2>Основная навигация</h2>
          <Link href="/" aria-label="На главную">
            Full-stack-app
          </Link>
          <div>
            {userIsLoggedIn ? (
              <span>
                {user?.name}{" "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setopenLogout(true)}
                >
                  Выйти
                </span>
              </span>
            ) : (
              <Link href="/login">войти</Link>
            )}
          </div>
          {openLogout && <Logout setopenLogout={setopenLogout} />}
          <button onClick={openModal}>меню профиля</button>
          <div>{greet()}</div>
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
                      <Link href="/subscription-settings" onClick={closeModal}>
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
      </div>
    </header>
  );
};

export default Header;
