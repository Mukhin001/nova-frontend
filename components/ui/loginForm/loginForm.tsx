"use client";
import { useLoginUserMutation } from "@/api/api";
import { setUser } from "@/store/userSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

interface AddLoginFormFields extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface AddLoginFormElements extends HTMLFormElement {
  readonly elements: AddLoginFormFields;
}

const LoginForm = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
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
      const data = await loginUser({
        email,
        password,
      }).unwrap();
      console.log("✅ Вход успешен:", data);
      dispatch(
        setUser({
          user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            createdAt: data.user.createdAt,
          },
          token: data.token,
          isLoggedIn: true,
        })
      );
      alert(`✅ Добро пожаловать, ${data.user.name}`);
      router.push("/");
    } catch (error) {
      console.log("❌ Ошибка:", error);
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

      alert("❌ " + message);
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
