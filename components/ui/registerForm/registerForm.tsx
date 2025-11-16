"use client";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { setUser } from "@/utils/userSlice";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "@/api/users/register/register";

interface AddRegisterFormFields extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface AddRegisterFormElements extends HTMLFormElement {
  readonly elements: AddRegisterFormFields;
}

const RegisterForm = () => {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();

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

    if (!name || !email || !password) {
      alert("Все поля должны быть заполнены!");
      return;
    }

    if (!validateEmail(email)) {
      alert("Введите корректный email!");
      return;
    }

    if (password.length < 6) {
      alert("Пароль должен быть минимум 6 символов!");
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
          user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            createdAt: data.user.createdAt,
          },
          isLoggedIn: true,
        })
      );
      alert("✅ Регистрация успешна");
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

      alert("❌ " + message);
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
        type="password"
        id="password"
        name="password"
        placeholder="password"
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Sending..." : "Enter"}
      </button>
      <button type="reset">reset</button>
    </form>
  );
};

export default RegisterForm;
