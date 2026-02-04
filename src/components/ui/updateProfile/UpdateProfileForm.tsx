"use client";
import { useUpdateProfileMutation } from "@/api/users/update-profile/updateProfile";
import { INPUT_LIMITS } from "@/constants/inputLimits";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/userSlice";
import { validateEmail } from "@/utils/validateEmail";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Dispatch, SetStateAction } from "react";
import { showToast } from "../toast/toastSlice";
import { Mode } from "./ProfileClient";
import { User } from "@/types/apiUser";
import Button from "../button/Button";

interface UpdateProfileFormProps {
  user: User | null;
  setMode: Dispatch<SetStateAction<Mode>>;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
}

const UpdateProfileForm = ({
  user,
  setMode,
  showPassword,
  setShowPassword,
}: UpdateProfileFormProps) => {
  const dispatch = useAppDispatch();
  const [updateProfile] = useUpdateProfileMutation();

  if (!user) {
    return <p>Войдите в систему</p>;
  }

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const name = (form.elements.namedItem("profile_name") as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem("profile_email") as HTMLInputElement)
      .value;
    const password = (
      form.elements.namedItem("profile_current_password") as HTMLInputElement
    ).value;
    const passwordNew = (
      form.elements.namedItem("profile_new_password") as HTMLInputElement
    ).value;

    if (!name || !email || !password) {
      dispatch(showToast({ message: "Все поля должны быть заполнены!" }));
      return;
    }

    if (!validateEmail(email)) {
      dispatch(showToast({ message: "Введите корректный email!" }));
      return;
    }

    if (password.length < INPUT_LIMITS.PASSWORD_MIN) {
      dispatch(
        showToast({ message: "Пароль должен быть минимум 8 символов!" }),
      );
      return;
    }

    try {
      const data = await updateProfile({
        name,
        email,
        password,
        password_new: passwordNew,
      }).unwrap();

      setMode("view");
      dispatch(setUser(data.user));
    } catch (err) {
      const error = err as FetchBaseQueryError & {
        data?: { error?: string };
      };
      dispatch(
        showToast({
          message: "❌ " + error.data?.error || "Ошибка обновления",
        }),
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitForm} autoComplete="on">
        <label htmlFor="profile_name"></label>
        <input
          type="text"
          id="profile_name"
          name="profile_name"
          placeholder="name"
          autoComplete="name"
          defaultValue={user?.name}
          maxLength={INPUT_LIMITS.NAME_MAX}
        />

        <label htmlFor="profile_email"></label>
        <input
          type="email"
          id="profile_email"
          name="profile_email"
          placeholder="email"
          autoComplete="email"
          defaultValue={user?.email}
          maxLength={INPUT_LIMITS.EMAIL_MAX}
        />

        <label htmlFor="profile_current_password"></label>
        <input
          type={showPassword ? "text" : "password"}
          id="profile_current_password"
          name="profile_current_password"
          placeholder="Введите текущий пароль"
          autoComplete="off"
          maxLength={INPUT_LIMITS.PASSWORD_MAX}
          minLength={INPUT_LIMITS.PASSWORD_MIN}
        />

        <label htmlFor="profile_new_password"></label>
        <input
          type={showPassword ? "text" : "password"}
          id="profile_new_password"
          name="profile_new_password"
          placeholder="Введите новый пароль"
          autoComplete="new-password"
          maxLength={INPUT_LIMITS.PASSWORD_MAX}
          minLength={INPUT_LIMITS.PASSWORD_MIN}
        />
        <Button type="submit">Сохранить</Button>
        <Button type="reset">Сбросить</Button>
      </form>
      <Button onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Скрыть" : "Показать"}
      </Button>
      <Button
        onClick={() => {
          setMode("view");
        }}
      >
        отменить
      </Button>
    </>
  );
};

export default UpdateProfileForm;
