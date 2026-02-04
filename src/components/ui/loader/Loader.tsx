import st from "./loader.module.css";
import Spinner from "./Spinner";

type LoaderVariant = "local" | "fullScreen";

interface LoaderProps {
  isOpen?: boolean;
  variant?: LoaderVariant;
}

const Loader = ({ isOpen = true, variant = "local" }: LoaderProps) => {
  if (!isOpen) return null;

  return (
    <div className={st[variant]}>
      <Spinner size={variant === "fullScreen" ? 60 : 20} />
    </div>
  );
};

export default Loader;
