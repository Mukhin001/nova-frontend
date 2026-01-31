import { Dispatch, ReactNode, SetStateAction } from "react";
import st from "./modal.module.css";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ children, isOpen, setIsOpen }: ModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setIsOpen(false);
  };

  return (
    <div className={st.overlay} onClick={handleOverlayClick}>
      <div className={st.modal}>{children}</div>
    </div>
  );
};

export default Modal;
