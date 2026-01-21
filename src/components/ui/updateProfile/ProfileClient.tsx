"use client";

import { useLogoutMutation } from "@/api/users/logout/logout";
import { useAppDispatch } from "@/store/hooks";
import { logout, selectUser } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DeleteAccountForm from "./DeleteAccountForm";
import UpdateProfileForm from "./UpdateProfileForm";
import { showToast } from "../toast/toastSlice";
import ProfileView from "./ProfileView";

export type Mode = "view" | "edit" | "delete";

const ProfileClient = () => {
  const [mode, setMode] = useState<Mode>("view");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [logoutRequest] = useLogoutMutation();

  useEffect(() => {
    setShowPassword(false);
    if (!user) {
      router.push("/login"); // редирект, если не авторизован
    }
  }, [user, router, mode]);

  const handleLogout = async () => {
    try {
      await logoutRequest().unwrap();
    } catch (err) {
      console.error("Ошибка при выходе:", err);
      dispatch(showToast({ message: "Не удалось выйти. Попробуйте снова." }));
    } finally {
      dispatch(logout());
      dispatch(showToast({ message: "До свидания!", type: "success" }));
      router.push("/");
    }
  };

  return (
    <section>
      <h3>Аккаунт</h3>
      <button onClick={handleLogout}>Выйти</button>
      {mode !== "edit" && (
        <button
          onClick={() => {
            setMode("edit");
          }}
        >
          редактировать
        </button>
      )}
      {mode !== "delete" && (
        <button onClick={() => setMode("delete")}>удалить аккаунт</button>
      )}
      {mode === "view" && <ProfileView user={user} />}
      {mode === "edit" && (
        <UpdateProfileForm
          user={user}
          setMode={setMode}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      )}
      {mode === "delete" && (
        <DeleteAccountForm
          user={user}
          setMode={setMode}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      )}
    </section>
  );
};

export default ProfileClient;
