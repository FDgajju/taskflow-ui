import React from "react";

type ButtonProps = {
  text?: string;
  type: "button" | "submit" | "reset";
  style?: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e: any) => void;
  children?: React.ReactNode;
  disabled?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { text, type, style, className, onClick, children, disabled = false },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={`cursor-pointer bg-btn-primary py-2 px-4 text-btn-primary-text font-bold rounded-lg text-sm ${
          style || className
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        {text || children || "Submit"}
      </button>
    );
  }
);

export default Button;
