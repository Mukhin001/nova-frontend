"use client";

import { selectUser } from "@/store/slices/userSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import DeleteAccountForm from "./DeleteAccountForm";
import UpdateProfileForm from "./UpdateProfileForm";

import ProfileView from "./ProfileView";
import Logout from "../logout/Logout";

export type Mode = "view" | "edit" | "delete";

const ProfileClient = () => {
  const [mode, setMode] = useState<Mode>("view");
  const user = useSelector(selectUser);
  const [openLogout, setopenLogout] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  if (!user) {
    return <p>Войдите</p>;
  }

  return (
    <section>
      <h3>Аккаунт</h3>
      <button onClick={() => setopenLogout(true)}>Выйти</button>
      {openLogout && <Logout setopenLogout={setopenLogout} />}
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
