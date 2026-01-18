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

interface UpdateProfileFormProps {
  name: string;
  email: string;
  setName: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setMode: Dispatch<SetStateAction<Mode>>;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
}

const UpdateProfileForm = ({
  name,
  email,
  setName,
  setEmail,
  setMode,
  showPassword,
  setShowPassword,
}: UpdateProfileFormProps) => {
  const dispatch = useAppDispatch();
  const [updateProfile] = useUpdateProfileMutation();

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    // const email = (form.elements.namedItem("delete_email") as HTMLInputElement)
    //   .value;
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
      dispatch(
        setUser({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          createdAt: data.user.createdAt,
        }),
      );
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="profile_email"></label>
        <input
          type="email"
          id="profile_email"
          name="profile_email"
          placeholder="email"
          autoComplete="email"
          value={email}
          maxLength={INPUT_LIMITS.EMAIL_MAX}
          onChange={(e) => setEmail(e.target.value)}
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

        <button type="submit">Сохранить</button>
        <button
          type="reset"
          onClick={() => {
            setName("");
            setEmail("");
          }}
        >
          Сбросить
        </button>
      </form>
      <button onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Скрыть" : "Показать"}
      </button>
      <button
        onClick={() => {
          setMode("view");
        }}
      >
        отменить
      </button>
    </>
  );
};

export default UpdateProfileForm;
