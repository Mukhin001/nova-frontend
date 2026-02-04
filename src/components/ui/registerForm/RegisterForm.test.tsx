import { configureStore } from "@reduxjs/toolkit";
import toastReduser from "@/components/ui/toast/toastSlice";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Toast from "../toast/Toast";
import RegisterForm from "./RegisterForm";
import { useRegisterMutation } from "@/api/users/register/register";
import userEvent from "@testing-library/user-event";

// mock RTK Query
//const mockUseRegisterFn = jest.fn();

// useRegisterMutation, НЕ использует реальный файл, использует вот эту подмену”
jest.mock("@/api/users/register/register.ts", () => ({
  useRegisterMutation: jest.fn(),
}));

// mock Next.js App Router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  }),
}));

// helper функция
const renderRegisterForm = () => {
  // создаём простой store
  const store = configureStore({
    reducer: {
      toast: toastReduser,
    },
  });

  render(
    <Provider store={store}>
      <>
        <RegisterForm />
        <Toast />
      </>
    </Provider>
  );

  return {
    store,
    nameInput: screen.getByPlaceholderText("name") as HTMLInputElement,
    emailInput: screen.getByPlaceholderText("email") as HTMLInputElement,
    passwordInput: screen.getByPlaceholderText("password") as HTMLInputElement,
    passwordInputRepeat: screen.getByPlaceholderText(
      "password_repeat"
    ) as HTMLInputElement,
    submitButton: screen.getByRole("button", {
      name: /Регистриция...|Зарегистрироваться/i,
    }),
  };
};

describe("RegisterForm", () => {
  test("рендерится форма регистрации", () => {
    (useRegisterMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { isLoading: false },
    ]);

    const {
      nameInput,
      emailInput,
      passwordInput,
      passwordInputRepeat,
      submitButton,
    } = renderRegisterForm();

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInputRepeat).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("кнопка disabled и показывает загрузку, когда isLoading = true", () => {
    (useRegisterMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { isLoading: true },
    ]);

    const { submitButton } = renderRegisterForm();
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent("Регистриция...");
  });

  test("показывает ошибку, если поля пустые", async () => {
    (useRegisterMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { isLoading: false },
    ]);

    const user = userEvent.setup();
    const { submitButton } = renderRegisterForm();

    await user.click(submitButton);

    expect(
      await screen.findByText(/Все поля должны быть заполнены!/i)
    ).toBeInTheDocument();
  });

  test("успешная регистрация вызывает registerUser и редирект", async () => {
    const registerUserMock = jest.fn().mockReturnValue({
      unwrap: jest.fn().mockResolvedValue({
        user: {
          id: "1",
          name: "Игорь",
          email: "igor@test.com",
          createdAt: "2025-01-01",
        },
      }),
    });

    (useRegisterMutation as jest.Mock).mockReturnValue([
      registerUserMock,
      { isLoading: false },
    ]);

    const user = userEvent.setup();
    const {
      nameInput,
      emailInput,
      passwordInput,
      passwordInputRepeat,
      submitButton,
    } = renderRegisterForm();

    // Заполняем форму
    await user.type(nameInput, "Игорь");
    await user.type(emailInput, "igor@test.com");
    await user.type(passwordInput, "Qwerty1!");
    await user.type(passwordInputRepeat, "Qwerty1!");
    // Сабмит
    await user.click(submitButton);

    // проверяет бизнес-логику
    // форма реально отправила данные
    // API был вызван
    expect(registerUserMock).toHaveBeenCalled();

    // проверяет UI
    // пользователь увидел результат
    expect(
      await screen.findByText(/✅ Регистрация успешна/i)
    ).toBeInTheDocument();
  });

  test("при ошибке регистрации показывается toast с ошибкой", async () => {
    // Мокаем registerUser
    //     вернёт:
    // {
    //   unwrap: () => Promise.reject({
    //     data: { error: "Email уже используется" }
    //   })
    // }
    const registerUserMock = jest.fn().mockReturnValue({
      unwrap: jest.fn().mockRejectedValue({
        data: { error: "Email уже используется" },
      }),
    });

    (useRegisterMutation as jest.Mock).mockReturnValue([
      registerUserMock,
      { isLoading: false },
    ]);

    const user = userEvent.setup();
    const {
      nameInput,
      emailInput,
      passwordInput,
      passwordInputRepeat,
      submitButton,
    } = renderRegisterForm();

    // Заполняем форму
    await user.type(nameInput, "Igor");
    await user.type(emailInput, "igor@test.com");
    await user.type(passwordInput, "Qwerty1!");
    await user.type(passwordInputRepeat, "Qwerty1!");
    // Сабмит
    await user.click(submitButton);

    expect(await screen.findByText(/Email уже используется/i));
  });

  test("не отправляет форму, если пароли не совпадают", async () => {
    const registerUserMock = jest.fn();
    (useRegisterMutation as jest.Mock).mockReturnValue([
      registerUserMock,
      { isLoading: false },
    ]);

    const user = userEvent.setup();
    const {
      nameInput,
      emailInput,
      passwordInput,
      passwordInputRepeat,
      submitButton,
    } = renderRegisterForm();

    // Заполняем форму
    await user.type(nameInput, "Igor");
    await user.type(emailInput, "igor@test.com");
    await user.type(passwordInput, "Qwerty1!");
    await user.type(passwordInputRepeat, "Qwerty2!");
    // Сабмит
    await user.click(submitButton);

    expect(
      await screen.findByText(/Пароли должны быть равны!/i)
    ).toBeInTheDocument();
    // ❗ самое важное что api не улетает на сервер
    expect(registerUserMock).not.toHaveBeenCalled();
  });

  test("НЕ вызывает API, если поля пустые", async () => {
    const registerUserMock = jest.fn();

    (useRegisterMutation as jest.Mock).mockReturnValue([
      registerUserMock,
      { isLoading: false },
    ]);

    const user = userEvent.setup();
    const { submitButton } = renderRegisterForm();

    await user.click(submitButton);
    // UI
    expect(
      await screen.findByText(/Все поля должны быть заполнены!/i)
    ).toBeInTheDocument();

    // ❗ бизнес-логика что api не улетает на сервер
    expect(registerUserMock).not.toHaveBeenCalled();
  });
});
