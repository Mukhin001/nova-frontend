import { ReactNode } from "react";
import st from "./tooltip.module.css";

interface TooltipProps {
  children: ReactNode;
}

const Tooltip = ({ children }: TooltipProps) => {
  return <div className={st.container}>{children}</div>;
};

export default Tooltip;
