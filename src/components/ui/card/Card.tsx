import { ElementType, ReactNode } from "react";
import st from "./card.module.css";

interface CardProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

const Card = ({
  as: Component = "div",
  children,
  className = "",
}: CardProps) => {
  return (
    <Component className={`${st.card} ${className}`}>{children}</Component>
  );
};

export default Card;
