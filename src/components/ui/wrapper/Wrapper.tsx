import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  className: string;
}

const Wrapper = ({ children, className = "" }: WrapperProps) => {
  return <div className={className}>{children}</div>;
};

export default Wrapper;
