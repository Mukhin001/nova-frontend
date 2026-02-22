import Link from "next/link";
import Drawer from "@/components/ui/drawer/Drawer";
import st from "../header.module.css";

interface MenuDrawerProps {
  userIsLoggedIn: boolean;
  closeModal: () => void;
}
type NavLink = {
  href: string;
  label: string;
  icon?: string;
};

export const guestLinks: NavLink[] = [
  { href: "/", label: "На главную", icon: "🏠" },
  { href: "/analytics", label: "Аналитика", icon: "📊" },
  { href: "/register", label: "Регистрация", icon: "📝" },
  { href: "/login", label: "Войти", icon: "🔑" },
];

export const userLinks: NavLink[] = [
  { href: "/", label: "На главную", icon: "🏠" },
  { href: "/analytics", label: "Аналитика", icon: "📊" },
  { href: "/profile", label: "Аккаунт", icon: "🧑" },
  { href: "/subscription-settings", label: "Подписка", icon: "⭐" },
  { href: "/feed", label: "Лента", icon: "📰" },
];

const MenuDrawer = ({ userIsLoggedIn, closeModal }: MenuDrawerProps) => {
  const links = userIsLoggedIn ? userLinks : guestLinks;

  return (
    <Drawer onClose={closeModal}>
      <ul className={st.drawerList}>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} onClick={closeModal}>
              {link.icon} {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </Drawer>
  );
};

export default MenuDrawer;
