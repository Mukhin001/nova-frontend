import st from "./button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "toggleTheme" | "closeButton";
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
