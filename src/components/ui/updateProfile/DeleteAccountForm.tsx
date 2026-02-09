"use client";

import { useDeleteMutation } from "@/api/users/delete/deleteUser";
import { INPUT_LIMITS } from "@/constants/inputLimits";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/userSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { showToast } from "../toast/toastSlice";
import { Mode } from "./ProfileClient";
import { User } from "@/types/apiUser";
import Button from "../button/Button";

interface DeleteAccountFormProps {
  user: User | null;
  setMode: Dispatch<SetStateAction<Mode>>;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
}

const DeleteAccountForm = ({
  user,
  setMode,
  showPassword,
  setShowPassword,
}: DeleteAccountFormProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [deleteUser, { isLoading }] = useDeleteMutation();

  if (!user) {
    return <p>Войдите в профиль</p>;
  }

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("delete_email") as HTMLInputElement)
      .value;
    const password = (
      form.elements.namedItem("delete_password") as HTMLInputElement
    ).value;

    if (!email || !password) {
      dispatch(showToast({ message: "Введите текущий email и пароль" }));
      return;
    }

    try {
      const res = await deleteUser({
        email,
        password,
      }).unwrap();

      dispatch(showToast({ message: res.message, type: "success" }));

      form.reset();
      dispatch(logout());
      setMode("view");
      router.push("/");
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      const err = error as FetchBaseQueryError & {
        data?: { error?: string };
      };
      // --- 🎯 Обработка ошибок ---
      if (err.status === 404) {
        dispatch(
          showToast({ message: "❌ Пользователь с таким email не найден" }),
        );
        return;
      }
      if (err.status === 401) {
        dispatch(showToast({ message: "❌ Неверный пароль" }));
        return;
      }
      dispatch(
        showToast({
          message: "Не удалось удалить ваш аккаунт. Попробуйте снова.",
        }),
      );
    }
  };

  return (
    <>
      <form onSubmit={handleDelete} autoComplete="off">
        <fieldset
          disabled={isLoading}
          className={isLoading ? "form-loading" : ""}
        >
          <label htmlFor="delete_email">Введите текущий email</label>
          <input
            type="email"
            id="delete_email"
            name="delete_email"
            placeholder="Введите текущий email"
            maxLength={INPUT_LIMITS.EMAIL_MAX}
            autoComplete="email"
          />

          <label htmlFor="delete_password">Введите текущий пароль</label>
          <input
            type={showPassword ? "text" : "password"}
            id="delete_password"
            name="delete_password"
            placeholder="Введите текущий пароль"
            maxLength={INPUT_LIMITS.PASSWORD_MAX}
            minLength={INPUT_LIMITS.PASSWORD_MIN}
            autoComplete="new-password"
          />

          <Button type="submit">
            {isLoading ? "Удаление..." : "Удалить аккаунт"}
          </Button>
          <Button type="reset">Сбросить</Button>
        </fieldset>
      </form>
      <Button
        onClick={() => setShowPassword(!showPassword)}
        disabled={isLoading}
      >
        {showPassword ? "Скрыть" : "Показать"}
      </Button>
      <Button
        disabled={isLoading}
        onClick={() => {
          setMode("view");
        }}
      >
        отменить
      </Button>
    </>
  );
};

export default DeleteAccountForm;
