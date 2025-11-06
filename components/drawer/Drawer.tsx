"use client";

import { ReactNode } from "react";
import st from "./drawer.module.css";
import { useAppSelector } from "@/store/hooks";
import { selectIsDesktop } from "@/utils/screenSlice";

interface DrawerProps {
  children: ReactNode;
}

const Drawer = ({ children }: DrawerProps) => {
  const width = useAppSelector(selectIsDesktop);
  const bottom: string = width ? "50%" : "0";

  return (
    <div className={`${st.container}`} style={{ bottom: bottom }}>
      {children}
    </div>
  );
};

export default Drawer;
