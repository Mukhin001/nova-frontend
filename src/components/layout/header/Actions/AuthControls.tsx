"use client";

import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn, selectUser } from "@/store/slices/userSlice";
import Link from "next/link";
import Logout from "@/components/features/auth/logout/Logout";
import Button from "@/components/ui/button/Button";
import st from "../header.module.css";

interface AuthControlsProps {
  openModal: () => void;
}

const AuthControls = ({ openModal }: AuthControlsProps) => {
  const userIsLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="cluster">
      {userIsLoggedIn ? (
        <div className={`${st.userInfo} ${st.isMobile}`}>
          <Button
            onClick={() => setIsOpen(true)}
            aria-label="Выйти из аккаунта"
          >
            {user?.name} ▼
          </Button>
          <Logout isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      ) : (
        <Link href="/login" className={st.loginLink}>
          Войти
        </Link>
      )}

      <Button onClick={openModal} aria-label="Открыть меню">
        ☰
      </Button>
    </div>
  );
};

export default AuthControls;
