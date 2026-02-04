import st from "./button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "close";
};

const Button = ({
  children,
  variant = "default",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${st.button} ${variant === "close" ? st.closeButton : ""} ${className ?? ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
