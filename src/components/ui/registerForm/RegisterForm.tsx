"use client";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { setUser } from "@/utils/userSlice";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "@/api/users/register/register";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { showToast } from "../toast/toastSlice";

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
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmitForm = async (
    e: React.FormEvent<AddRegisterFormElements>
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

    if (!validateEmail(email)) {
      dispatch(showToast({ message: "Введите корректный email!" }));

      return;
    }

    if (password.length < 8) {
      dispatch(
        showToast({ message: "Пароль должен быть минимум 8 символов!" })
      );

      return;
    }

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/;
    if (!passRegex.test(password)) {
      dispatch(
        showToast({
          message:
            "Пароль должен содержать одну заглавную букву, одну строчную, одну цифру и один спецсимвол.",
        })
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
      console.log("✅ Успешно:", data);
      dispatch(
        setUser({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          createdAt: data.user.createdAt,
        })
      );
      dispatch(showToast({ message: "✅ Регистрация успешна" }));

      router.push("/");
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

    form.reset();
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <label htmlFor="name"></label>
      <input type="text" id="name" name="name" placeholder="name" />

      <label htmlFor="email"></label>
      <input type="email" id="email" name="email" placeholder="email" />

      <label htmlFor="password"></label>
      <input
        type={showPassword ? "text" : "password"}
        id="password"
        name="password"
        placeholder="password"
      />
      <input
        type={showPassword ? "text" : "password"}
        id="password_repeat"
        name="password_repeat"
        placeholder="password_repeat"
      />

      <button type="button" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Скрыть" : "Показать"}
      </button>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Sending..." : "Enter"}
      </button>
      <button type="reset">reset</button>
    </form>
  );
};

export default RegisterForm;
