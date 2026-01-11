"use client";

import { ReactNode } from "react";
import st from "./drawer.module.css";

interface DrawerProps {
  children: ReactNode;
  onClose: () => void;
}

const Drawer = ({ children, onClose }: DrawerProps) => {
  return (
    <div className={`${st.container}`}>
      <div className={st.wrapper}>
        <button onClick={onClose}>x</button>
        {children}
      </div>
    </div>
  );
};

export default Drawer;
