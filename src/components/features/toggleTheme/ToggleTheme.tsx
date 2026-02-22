"use client";

import { THEME_KEY } from "@/constants/theme";
import Button from "@/components/ui/button/Button";
import st from "./toggleTheme.module.css";

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
    <>
      <h2>
        Тема: <span className={st.themeLabel} />
      </h2>
      <Button
        onClick={toggleTheme}
        className={st["theme-toggle"]}
        aria-label="Toggle theme"
        title="Toggle theme"
        variant="toggleTheme"
      ></Button>
    </>
  );
};

export default ToggleTheme;
