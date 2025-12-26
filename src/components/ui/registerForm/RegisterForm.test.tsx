import { configureStore } from "@reduxjs/toolkit";
import toastReduser from "@/components/ui/toast/toastSlice";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Toast from "../toast/Toast";
import RegisterForm from "./RegisterForm";
import { useRegisterMutation } from "@/api/users/register/register";

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
    emailInput: screen.getByPlaceholderText("email") as HTMLInputElement,
    passwordInput: screen.getByPlaceholderText("password") as HTMLInputElement,
    passwordInputRepeat: screen.getByPlaceholderText(
      "password_repeat"
    ) as HTMLInputElement,
    submitButton: screen.getByRole("button", { name: /вход|войти/i }),
  };
};

describe("RegisterForm", () => {
  test("рендерится форма регистрации", () => {
    (useRegisterMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { isLoading: false },
    ]);

    const { emailInput, passwordInput, passwordInputRepeat, submitButton } =
      renderRegisterForm();

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
    expect(submitButton).toHaveTextContent("Вход...");
  });
});
