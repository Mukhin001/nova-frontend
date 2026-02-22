import st from "./header.module.css";
import Greeting from "./Greeting";
import Logo from "./Logo";
import Actions from "./Actions/Actions";

const Header = () => {
  return (
    <header className={st.header}>
      <div className="container">
        <nav className={st.nav}>
          <Logo />

          <Greeting />

          <Actions />
        </nav>
      </div>
    </header>
  );
};

export default Header;
