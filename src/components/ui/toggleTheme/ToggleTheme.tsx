"use client";

import { THEME_KEY } from "@/constants/theme";
import Button from "../button/Button";

const ToggleTheme = () => {
  const toggleTheme = () => {
    const current =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";

    const next = current === "light" ? "dark" : "light";

    localStorage.setItem(THEME_KEY, next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <Button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Toggle theme"
      title="Toggle theme"
    ></Button>
  );
};

export default ToggleTheme;
