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

  const handleSubmitForm = async (e: React.FormEvent<AddAuthFormElements>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const { elements } = e.currentTarget;
    const name = elements.name.value;
    const email = elements.email.value;
    const password = elements.password.value;

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
