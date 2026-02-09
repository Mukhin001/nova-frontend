"use client";

import { selectUser } from "@/store/slices/userSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import DeleteAccountForm from "./DeleteAccountForm";
import UpdateProfileForm from "./UpdateProfileForm";

import ProfileView from "./ProfileView";
import Logout from "../logout/Logout";
import Button from "../button/Button";
import Device from "../device/Device";

export type Mode = "view" | "edit" | "delete" | "device";

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
      {isOpen && <Logout isOpen={isOpen} setIsOpen={setIsOpen} />}

      <Button onClick={() => setIsOpen(true)}>Выйти</Button>
      {/* {mode !== "device" && (
        <Button onClick={() => setMode("device")}>User Agent</Button>
      )} */}
      {mode === "view" && <ProfileView user={user} setMode={setMode} />}
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
      {mode === "device" && <Device setMode={setMode} />}
    </section>
  );
};

export default ProfileClient;
