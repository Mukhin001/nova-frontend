"use client";

import { useLoginMutation } from "@/api/users/login/login";
import { setUser } from "@/store/slices/userSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { showToast } from "../toast/toastSlice";
import { INPUT_LIMITS } from "@/constants/inputLimits";
import { validateEmail } from "@/utils/validateEmail";
import Button from "../button/Button";
import { useState } from "react";

interface AddLoginFormFields extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface AddLoginFormElements extends HTMLFormElement {
  readonly elements: AddLoginFormFields;
}

const LoginForm = () => {
  const user = useAppSelector((state) => state.user.user);
  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  if (user) {
    return <p>Вы уже авторизованы</p>;
  }

  const handleSubmitForm = async (e: React.FormEvent<AddLoginFormElements>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const { elements } = e.currentTarget;
    const email = elements.email.value.trim();
    const password = elements.password.value;

    if (!email || !password) {
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
      const data = await loginUser({
        email,
        password,
      }).unwrap();
      dispatch(setUser(data.user));
      dispatch(
        showToast({
          message: `✅ Добро пожаловать, ${data.user.name}`,
          type: "success",
        }),
      );
      form.reset();
      router.push("/");
    } catch (error) {
      let message: string = "Неверные данные!";

      if (typeof error === "object" && error) {
        const fetchError = error as FetchBaseQueryError;
        // Тип ошибки теперь безопасно определяется через FetchBaseQueryError.
        if (
          "data" in fetchError &&
          fetchError.data &&
          typeof fetchError.data === "object"
        ) {
          // @ts-expect-error: у RTK Query data может быть любым объектом
          message = fetchError.data.error || message;
        } else if (
          "error" in fetchError &&
          typeof fetchError.error === "string"
        ) {
          message = fetchError.error;
        }
      }
      dispatch(showToast({ message: "❌ " + message }));
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <fieldset
        disabled={isLoading}
        className={isLoading ? "form-loading" : ""}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          maxLength={INPUT_LIMITS.EMAIL_MAX}
          autoComplete="email"
        />

        <label htmlFor="password">Пароль</label>
        <div className="passwordField">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="current-password"
            maxLength={INPUT_LIMITS.PASSWORD_MAX}
            minLength={INPUT_LIMITS.PASSWORD_MIN}
            autoComplete="current-password"
          />
          <Button
            type="button"
            variant="togglePassword"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🔓" : "🔒"}
          </Button>
        </div>

        <Button type="submit">{isLoading ? "Вход..." : "Войти"}</Button>
        <Button type="reset">Очистить</Button>
      </fieldset>
    </form>
  );
};

export default LoginForm;
