"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { hideToast } from "./toastSlice";

const Toast = () => {
  const dispatch = useAppDispatch();
  const queue = useAppSelector((state) => state.toast.queue);

  useEffect(() => {
    if (queue.length === 0) return;

    const timers = queue.map((toast) =>
      setTimeout(() => {
        dispatch(hideToast(toast.id));
      }, 700)
    );

    return () =>
      timers.forEach((timer) => {
        clearTimeout(timer);
      });
  }, [queue, dispatch]);

  if (queue.length === 0) return null;

  return (
    <ul style={{ backgroundColor: "red", color: "white" }}>
      {queue.map((toast) => (
        <li
          key={toast.id}
          style={{
            backgroundColor: toast.type === "error" ? "red" : "green",
            color: "white",
            marginBottom: "0.5rem",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
          }}
        >
          {toast.message + toast.id}
        </li>
      ))}
    </ul>
  );
};

export default Toast;
