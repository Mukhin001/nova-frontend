"use client";

import { useLoginMutation } from "@/api/users/login/login";
import { setUser } from "@/utils/userSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "../toast/toastSlice";

interface AddLoginFormFields extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface AddLoginFormElements extends HTMLFormElement {
  readonly elements: AddLoginFormFields;
}

const LoginForm = () => {
  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const validateEmail = (email: string) => {
    return email.includes("@") && email.includes(".");
  };

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

    if (password.length < 6) {
      dispatch(
        showToast({ message: "Пароль должен быть минимум 6 символов!" })
      );

      return;
    }

    try {
      const data = await loginUser({
        email,
        password,
      }).unwrap();
      console.log("✅ Вход успешен:", data);
      dispatch(
        setUser({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          createdAt: data.user.createdAt,
        })
      );
      dispatch(
        showToast({
          message: `✅ Добро пожаловать, ${data.user.name}`,
          type: "success",
        })
      );

      router.push("/");
    } catch (error) {
      //console.log("❌ Ошибка:", error);
      console.log("❌ Ошибка:");
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

    form.reset();
  };
  return (
    <form onSubmit={handleSubmitForm}>
      <label htmlFor="email"></label>
      <input type="email" id="email" name="email" placeholder="email" />

      <label htmlFor="password"></label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="password"
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Вход..." : "Войти"}
      </button>
      <button type="reset">Очистить</button>
    </form>
  );
};

export default LoginForm;
