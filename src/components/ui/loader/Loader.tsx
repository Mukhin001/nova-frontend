import st from "./loader.module.css";
import Spinner from "./Spinner";

type LoaderVariant = "local" | "fullScreen";

interface LoaderProps {
  isOpen?: boolean;
  variant?: LoaderVariant;
  description?: string;
}

const Loader = ({
  isOpen = true,
  variant = "local",
  description = "Загрузка...",
}: LoaderProps) => {
  if (!isOpen) return null;

  return (
    <div className={st[variant]}>
      <div className={st.wrapper}>
        <Spinner size={variant === "fullScreen" ? 60 : 20} />
        <p className={st.text}>{description}</p>
      </div>
    </div>
  );
};

export default Loader;
