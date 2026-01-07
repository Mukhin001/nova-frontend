"use client";

import { useEffect } from "react";
import { setIsDesktop } from "../store/slices/screenSlice";
import { useAppDispatch } from "@/store/hooks";
import { getIsDesktop } from "@/utils/getIsDesktop";

const ScreenWatcher = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      dispatch(setIsDesktop(getIsDesktop()));
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return null;
};

export default ScreenWatcher;
