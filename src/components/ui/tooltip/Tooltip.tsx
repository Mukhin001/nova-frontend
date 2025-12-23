import { ReactNode } from "react";
import st from "./tooltip.module.css";

interface TooltipProps {
  children: ReactNode;
  nameStyle?: string;
}

const Tooltip = ({ children, nameStyle }: TooltipProps) => {
  return <div className={st.container}>{children}</div>;
};

export default Tooltip;
