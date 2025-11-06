"use client";

import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import { setIsDesktop } from "./screenSlice";

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
