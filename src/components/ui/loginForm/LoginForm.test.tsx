import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "./LoginForm";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import toastReduser from "@/components/ui/toast/toastSlice";
import Toast from "../toast/Toast";

// mock RTK Query
const mockUseLoginMutation = jest.fn();

jest.mock("@/api/users/login/login", () => ({
  useLoginMutation: () => mockUseLoginMutation(),
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
const renderLoginForm = () => {
  // создаём простой store
  const store = configureStore({
    reducer: {
      toast: toastReduser,
    },
  });

  render(
    <Provider store={store}>
      <>
        <LoginForm />
        <Toast />
      </>
    </Provider>
  );

  return {
    store,
    emailInput: screen.getByPlaceholderText("email") as HTMLInputElement,
    passwordInput: screen.getByPlaceholderText("password") as HTMLInputElement,
    submitButton: screen.getByRole("button", { name: /вход|войти/i }),
  };
};

// Фабрика для моков RTK Query
describe("LoginForm", () => {
  test("рендерится форма логина", () => {
    mockUseLoginMutation.mockReturnValue([jest.fn(), { isLoading: false }]);
    const { emailInput, passwordInput, submitButton } = renderLoginForm();

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("кнопка enabled, когда isLoading = false", () => {
    mockUseLoginMutation.mockReturnValue([jest.fn(), { isLoading: false }]);

    const { submitButton } = renderLoginForm();
    expect(submitButton).toBeEnabled();
    expect(submitButton).toHaveTextContent("Войти");
  });

  test("кнопка disabled и показывает загрузку, когда isLoading = true", () => {
    mockUseLoginMutation.mockReturnValue([jest.fn(), { isLoading: true }]);

    const { submitButton } = renderLoginForm();
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent("Вход...");
  });

  // тест сабмита (успешный вход)
  test("успешный сабмит формы вызывает loginUser и dispatch", async () => {
    const mockLoginResponse = {
      user: {
        id: "1",
        name: "Игорь",
        email: "igor@test.com",
        createdAt: "2025-01-01",
      },
    };

    const loginUserMock = jest.fn().mockReturnValue({
      unwrap: jest.fn().mockResolvedValue(mockLoginResponse),
    });
    mockUseLoginMutation.mockReturnValue([loginUserMock, { isLoading: false }]);

    const user = userEvent.setup();
    const { emailInput, passwordInput, submitButton } = renderLoginForm();

    await user.type(emailInput, "igor@test.com");
    await user.type(passwordInput, "123456");
    await user.click(submitButton);

    // проверяем вызов loginUser с правильными данными
    expect(loginUserMock).toHaveBeenCalledWith({
      email: "igor@test.com",
      password: "123456",
    });
  });

  // теста сабмита с ошибкой
  test("при ошибке входа показывается toast с ошибкой", async () => {
    const loginUserMock = jest.fn().mockReturnValue({
      unwrap: jest.fn().mockRejectedValue(new Error("Invalid credentials")),
    });
    mockUseLoginMutation.mockReturnValue([loginUserMock, { isLoading: false }]);

    const user = userEvent.setup();
    const { emailInput, passwordInput, submitButton } = renderLoginForm();

    await user.type(emailInput, "igor@test.com");
    await user.type(passwordInput, "123456");
    await user.click(submitButton);

    // ⬇️ проверяем, что toast появился в DOM
    expect(await screen.findByText(/❌ Неверные данные!/)).toBeInTheDocument();
  });
});
