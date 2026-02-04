"use client";

import { useLogoutMutation } from "@/api/users/logout/logout";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "../toast/toastSlice";
import { logout } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import Button from "../button/Button";
import Modal from "../modal/Modal";
import st from "./logout.module.css";

interface LogoutProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Logout = ({ isOpen, setIsOpen }: LogoutProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [logoutRequest] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutRequest().unwrap();
    } catch (err) {
      console.error("Ошибка при выходе:", err);
      dispatch(showToast({ message: "Не удалось выйти. Попробуйте снова." }));
    } finally {
      dispatch(logout());
      dispatch(showToast({ message: "До свидания!", type: "success" }));
      setIsOpen(false);
      router.push("/");
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h3>Выйти</h3>
      <Button variant="close" onClick={() => setIsOpen(false)}>
        x
      </Button>
      <div>
        <Button onClick={() => setIsOpen(false)}>Нет</Button>
        <Button onClick={handleLogout}>Да</Button>
      </div>
    </Modal>
  );
};

export default Logout;
