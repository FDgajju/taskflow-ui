import type React from "react";

type ButtonProps = {
  text?: string;
  type: "button" | "submit" | "reset";
  style?: string;
  onClick: () => void;
  children?: React.ReactNode;
  reference?: React.RefObject<HTMLButtonElement | null>;
};

const Button: React.FC<ButtonProps> = ({
  text,
  type,
  style,
  onClick,
  children,
  reference,
}) => {
  return (
    <button
      ref={reference}
      type={type}
      className={`cursor-pointer bg-btn-primary py-2 px-4 text-btn-primary-text font-bold rounded-lg text-sm ${style}`}
      onClick={onClick}
      // disabled={true}
    >
      {text || children || "Submit"}
    </button>
  );
};

export default Button;
