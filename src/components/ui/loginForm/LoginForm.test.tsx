import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "./LoginForm";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// mock RTK Query
const mockUseLoginMutation = jest.fn();

jest.mock("@/api/users/login/login", () => ({
  useLoginMutation: () => mockUseLoginMutation(),
}));

// мок для dispatch:
const mockDispatch = jest.fn();

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

// создаём простой store
const store = configureStore({
  reducer: (state = {}) => state,
});

describe("LoginForm", () => {
  test("рендерится форма логина", () => {
    mockUseLoginMutation.mockReturnValue([jest.fn(), { isLoading: false }]);

    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Войти" })).toBeInTheDocument();
  });

  test("кнопка enabled, когда isLoading = false", () => {
    mockUseLoginMutation.mockReturnValue([jest.fn(), { isLoading: false }]);

    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    const button = screen.getByRole("button", { name: "Войти" });
    expect(button).toBeEnabled();
    expect(button).toHaveTextContent("Войти");
  });

  test("кнопка disabled и показывает загрузку, когда isLoading = true", () => {
    mockUseLoginMutation.mockReturnValue([jest.fn(), { isLoading: true }]);

    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    const button = screen.getByRole("button", { name: "Вход..." });
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Вход...");
  });
});
