import React from "react";

type ButtonProps = {
  text?: string;
  type: "button" | "submit" | "reset";
  style?: string;
  className?: string;
  onClick: () => void;
  children?: React.ReactNode;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, type, style, className, onClick, children }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={`cursor-pointer bg-btn-primary py-2 px-4 text-btn-primary-text font-bold rounded-lg text-sm ${
          style || className
        }`}
        onClick={onClick}
        // disabled={true}
      >
        {text || children || "Submit"}
      </button>
    );
  }
);

export default Button;
