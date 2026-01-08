import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import { hideToast } from "../toastSlice";

interface ToastItemProps {
  toast: {
    id: number;
    message: string;
    type: "success" | "error";
  };
}

const ToastItem = ({ toast }: ToastItemProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hideToast(toast.id));
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch, toast.id]);

  return (
    <li
      style={{
        backgroundColor: toast.type === "error" ? "#dc2626" : "#16a34a",
        color: "white",
        padding: "0.75rem 1rem",
        borderRadius: "6px",
        minWidth: "240px",
      }}
    >
      {toast.message}
    </li>
  );
};

export default ToastItem;
