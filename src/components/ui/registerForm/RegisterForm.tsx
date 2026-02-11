"use client";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { setUser } from "@/store/slices/userSlice";
import { useRegisterMutation } from "@/api/users/register/register";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { showToast } from "../toast/toastSlice";
import { INPUT_LIMITS } from "@/constants/inputLimits";
import { validateEmail } from "@/utils/validateEmail";
import { useAppDispatch } from "@/store/hooks";
import Button from "../button/Button";

interface AddRegisterFormFields extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  password_repeat: HTMLInputElement;
}

interface AddRegisterFormElements extends HTMLFormElement {
  readonly elements: AddRegisterFormFields;
}

const RegisterForm = () => {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmitForm = async (
    e: React.FormEvent<AddRegisterFormElements>,
  ) => {
    e.preventDefault();

    const form = e.currentTarget;
    const { elements } = e.currentTarget;
    const name = elements.name.value.trim();
    const email = elements.email.value.trim();
    const password = elements.password.value;
    const passwordRepeat = elements.password_repeat.value;

    if (!name || !email || !password || !passwordRepeat) {
      dispatch(showToast({ message: "Все поля должны быть заполнены!" }));
      return;
    }

    if (name.length > INPUT_LIMITS.NAME_MAX) {
      dispatch(showToast({ message: "Имя не должно превышать 50 символов" }));
      return;
    }

    if (email.length > INPUT_LIMITS.EMAIL_MAX) {
      dispatch(
        showToast({ message: "Email не должен превышать 255 символов" }),
      );
      return;
    }

    if (
      password.length > INPUT_LIMITS.PASSWORD_MAX ||
      passwordRepeat.length > INPUT_LIMITS.PASSWORD_MAX
    ) {
      dispatch(
        showToast({ message: "Пароль не должен превышать 128 символов" }),
      );
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

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/;
    if (!passRegex.test(password)) {
      dispatch(
        showToast({
          message:
            "Пароль должен содержать одну заглавную букву, одну строчную, одну цифру и один спецсимвол.",
        }),
      );
      return;
    }

    if (password !== passwordRepeat) {
      dispatch(showToast({ message: "Пароли должны быть равны!" }));
      return;
    }

    try {
      const data = await registerUser({
        name,
        email,
        password,
      }).unwrap();
      dispatch(setUser(data.user));
      dispatch(
        showToast({
          message:
            "🎉 Регистрация успешна! 👋 Выберите города и категории, чтобы мы сформировали вашу ленту",
          type: "success",
        }),
      );
      form.reset();
      router.push("/subscription-settings");
    } catch (error) {
      let message = "Ошибка отправки данных";

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
        <label htmlFor="name">Имя</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="name"
          maxLength={INPUT_LIMITS.NAME_MAX}
          autoComplete="name"
        />

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
            placeholder="password"
            maxLength={INPUT_LIMITS.PASSWORD_MAX}
            minLength={INPUT_LIMITS.PASSWORD_MIN}
            autoComplete="new-password"
          />
          <Button
            type="button"
            variant="togglePassword"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🔓" : "🔒"}
          </Button>
        </div>
        <label htmlFor="password_repeat">Повторите пароль</label>
        <div className="passwordField">
          <input
            type={showPassword ? "text" : "password"}
            id="password_repeat"
            name="password_repeat"
            placeholder="password_repeat"
            maxLength={INPUT_LIMITS.PASSWORD_MAX}
            minLength={INPUT_LIMITS.PASSWORD_MIN}
            autoComplete="new-password"
          />
          <Button
            type="button"
            variant="togglePassword"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🔓" : "🔒"}
          </Button>
        </div>

        <Button type="submit">
          {isLoading ? "Регистрируем..." : "Зарегистрироваться"}
        </Button>
        <Button type="reset">Очистить</Button>
      </fieldset>
    </form>
  );
};

export default RegisterForm;
