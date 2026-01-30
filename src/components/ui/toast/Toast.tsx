"use client";

import { useAppSelector } from "@/store/hooks";
import ToastItem from "./toastItem/ToastItem";

const Toast = () => {
  const queue = useAppSelector((state) => state.toast.queue);

  return (
    <ul style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
      {queue.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </ul>
  );
};

export default Toast;
