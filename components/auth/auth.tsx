//  "username": "john_doe",
//   "email": "john@example.com",
//   "passwordHash": "hashed_password_here",

import { useRegisterUserMutation } from "@/api/api";

interface AddAuthFormFields extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface AddAuthFormElements extends HTMLFormElement {
  readonly elements: AddAuthFormFields;
}

const Auth = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmitForm = async (e: React.FormEvent<AddAuthFormElements>) => {
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
      alert("✅ Регистрация успешна");
    } catch (error) {
      console.log("❌ Ошибка:", error);
      alert("❌ Ошибка отправки данных");
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

export default Auth;
