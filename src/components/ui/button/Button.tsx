import st from "./button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "toggleTheme" | "closeButton" | "togglePassword";
};

const Button = ({ children, variant, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${st.button} ${variant && st[variant]} ${className ?? ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
