"use client";

import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn, selectUser } from "@/store/slices/userSlice";
import Link from "next/link";
import Logout from "@/components/features/auth/logout/Logout";
import Button from "@/components/ui/button/Button";
import ToggleTheme from "@/components/features/toggleTheme/ToggleTheme";
import st from "../header.module.css";

interface AuthControlsProps {
  openModal: () => void;
}

const AuthControls = ({ openModal }: AuthControlsProps) => {
  const userIsLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={st.actions}>
      <ToggleTheme />

      {userIsLoggedIn ? (
        <div className={`${st.userInfo} ${st.isMobile}`}>
          <span className={st.userName}>{user?.name}</span>
          <Button
            onClick={() => setIsOpen(true)}
            aria-label="Выйти из аккаунта"
          >
            Выйти
          </Button>
          <Logout isOpen={isOpen} setIsOpen={setIsOpen} />
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
  );
};

export default AuthControls;
