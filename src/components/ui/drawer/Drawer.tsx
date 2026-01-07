"use client";

import { ReactNode } from "react";
import st from "./drawer.module.css";
import { useAppSelector } from "@/store/hooks";
import { selectIsDesktop } from "@/store/slices/screenSlice";

interface DrawerProps {
  children: ReactNode;
  onClose: () => void;
}

const Drawer = ({ children, onClose }: DrawerProps) => {
  const width = useAppSelector(selectIsDesktop);
  const bottom: string = width ? "50%" : "0";

  return (
    <div className={`${st.container}`}>
      <div className={st.wrapper} style={{ bottom: bottom }}>
        <button onClick={onClose}>x</button>
        {children}
      </div>
    </div>
  );
};

export default Drawer;
