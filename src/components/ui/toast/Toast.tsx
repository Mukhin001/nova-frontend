"use client";

import { useAppSelector } from "@/store/hooks";
import ToastItem from "./toastItem/ToastItem";

const Toast = () => {
  const queue = useAppSelector((state) => state.toast.queue);

  return (
    <ul>
      {queue.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </ul>
  );
};

export default Toast;
