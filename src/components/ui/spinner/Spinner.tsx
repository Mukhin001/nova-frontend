import st from "./spinner.module.css";

interface SpinnerProps {
  size?: number;
}

const Spinner = ({ size = 40 }: SpinnerProps) => {
  const borderSize = Math.max(2, size / 10);

  return (
    <div
      className={st.spinner}
      style={{ width: size, height: size, borderWidth: borderSize }}
      role="status"
      aria-label="Loading"
    ></div>
  );
};

export default Spinner;
