"use client";

import { useEffect } from "react";
import { setIsDesktop } from "./screenSlice";
import { useAppDispatch } from "@/store/hooks";

const ScreenWatcher = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      dispatch(setIsDesktop(window.innerWidth > 1100));
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return null;
};

export default ScreenWatcher;
