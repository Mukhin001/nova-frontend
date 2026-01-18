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

export type Mode = "view" | "edit" | "delete";

const ProfileClient = () => {
  const [mode, setMode] = useState<Mode>("view");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [name, setName] = useState<string>(user?.name ?? "");
  const [email, setEmail] = useState<string>(user?.email ?? "");

  const [logoutRequest] = useLogoutMutation();

  useEffect(() => {
    if (!user) {
      router.push("/"); // редирект, если не авторизован
    }
    setShowPassword(false);
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
    <div>
      <h3>accaunt</h3>
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
      {mode === "view" && (
        <ul>
          <li>
            <h3>id:</h3> {user?.id}
          </li>
          <li>
            <h3>name:</h3> {user?.name}
          </li>
          <li>
            <h3>email: </h3>
            {user?.email}
          </li>
          <li>
            <h3>createdAt:</h3> {user?.createdAt}
          </li>
        </ul>
      )}
      {mode === "edit" && (
        <UpdateProfileForm
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          setMode={setMode}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      )}
      {mode === "delete" && (
        <>
          <DeleteAccountForm
            user={user}
            setMode={setMode}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </>
      )}
    </div>
  );
};

export default ProfileClient;
