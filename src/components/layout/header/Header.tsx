import st from "./header.module.css";
import Logo from "./Logo";
import Actions from "./Actions/Actions";
import ServerStatus from "@/components/ui/serverStatus/ServerStatus";

const Header = () => {
  return (
    <header className={st.header}>
      <div className="container">
        <nav className="space-between">
          <Logo />

          <ServerStatus className="isMobile" />

          <Actions />
        </nav>
      </div>
    </header>
  );
};

export default Header;
