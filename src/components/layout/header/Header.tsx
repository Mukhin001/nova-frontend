"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn, selectUser } from "@/store/slices/userSlice";
import Drawer from "@/components/ui/drawer/Drawer";
import Loader from "@/components/ui/loader/Loader";
import { useGetGreetingServerQuery } from "@/api/baseApi";
import Logout from "@/components/ui/logout/Logout";
import Button from "@/components/ui/button/Button";
import ToggleTheme from "@/components/ui/toggleTheme/ToggleTheme";
import st from "./header.module.css";

const Header = () => {
  const { data, isLoading, isError } = useGetGreetingServerQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userIsLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const greet = (): ReactNode => {
    if (isLoading) return <Loader variant="local" />;
    if (isError) return <h2>Ошибка загрузки</h2>;
    if (data) return <h2>{data.message}</h2>;

    return null;
  };

  return (
    <header className={st.header}>
      <div className="container">
        <nav className={st.nav}>
          {/* Логотип */}
          <Link href="/" aria-label="На главную" className={st.logo}>
            Nova-app
          </Link>

          {/* Грейтинг */}
          <div className={st.greeting}>{greet()}</div>

          {/* Действия справа */}
          <div className={st.actions}>
            <ToggleTheme />

            {userIsLoggedIn ? (
              <div className={st.userInfo}>
                <span className={st.userName}>{user?.name}</span>
                <Button
                  // variant="closeButton"
                  onClick={() => setIsOpen(true)}
                  aria-label="Выйти из аккаунта"
                >
                  Выйти
                </Button>
                {isOpen && <Logout isOpen={isOpen} setIsOpen={setIsOpen} />}
              </div>
            ) : (
              <Link href="/login" className={st.loginLink}>
                Войти
              </Link>
            )}

            <Button onClick={openModal} aria-label="Открыть меню">
              Меню
            </Button>
          </div>

          {/* Drawer меню */}
          {isModalOpen && (
            <Drawer onClose={closeModal}>
              <ul className={st.drawerList}>
                <li>
                  <Link href="/" onClick={closeModal}>
                    🏠 На главную
                  </Link>
                </li>
                {!userIsLoggedIn && (
                  <>
                    <li>
                      <Link href="/register" onClick={closeModal}>
                        📝 Регистрация
                      </Link>
                    </li>
                    <li>
                      <Link href="/login" onClick={closeModal}>
                        🔑 Войти
                      </Link>
                    </li>
                  </>
                )}
                {userIsLoggedIn && (
                  <>
                    <li>
                      <Link href="/profile" onClick={closeModal}>
                        🧑 Аккаунт
                      </Link>
                    </li>
                    <li>
                      <Link href="/subscription-settings" onClick={closeModal}>
                        ⭐ Подписка
                      </Link>
                    </li>
                    <li>
                      <Link href="/feed" onClick={closeModal}>
                        📰 Лента
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </Drawer>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
