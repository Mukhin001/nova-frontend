"use client";

import { ReactNode } from "react";
import st from "./drawer.module.css";
import Button from "../button/Button";

interface DrawerProps {
  children: ReactNode;
  onClose: () => void;
}

const Drawer = ({ children, onClose }: DrawerProps) => {
  return (
    <div className={`${st.container}`}>
      <div className={st.wrapper}>
        <Button onClick={onClose} variant="closeButton">
          x
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Drawer;
