"use client";

import { selectUser } from "@/store/slices/userSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import DeleteAccountForm from "./DeleteAccountForm";
import UpdateProfileForm from "./UpdateProfileForm";

import ProfileView from "./ProfileView";
import Logout from "../logout/Logout";
import Button from "../button/Button";

export type Mode = "view" | "edit" | "delete";

const ProfileClient = () => {
  const [mode, setMode] = useState<Mode>("view");
  const user = useSelector(selectUser);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  if (!user) {
    return <p>Войдите</p>;
  }

  return (
    <section>
      <h3>Аккаунт</h3>
      <Button onClick={() => setIsOpen(true)}>Выйти</Button>

      {isOpen && <Logout isOpen={isOpen} setIsOpen={setIsOpen} />}
      {mode !== "edit" && (
        <Button
          onClick={() => {
            setMode("edit");
          }}
        >
          редактировать
        </Button>
      )}
      {mode !== "delete" && (
        <Button onClick={() => setMode("delete")}>удалить аккаунт</Button>
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
