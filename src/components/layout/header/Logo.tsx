import Link from "next/link";
import st from "./header.module.css";

const Logo = () => {
  return (
    <Link href="/" aria-label="На главную" className={st.logo}>
      Nova-app
    </Link>
  );
};

export default Logo;
