import React from 'react';

type ButtonProps = {
  text?: string;
  type: 'button' | 'submit' | 'reset';
  style?: string;
  className?: string;
  // biome-ignore lint/suspicious/noExplicitAny: explanation
  onClick?: (e: any) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { text, type, style, className, onClick, children, disabled = false },
    ref,
  ) => {
    let buttonStyle = `my-1 cursor-pointer bg-btn-primary py-2 px-4 text-btn-primary-text font-bold rounded-lg text-sm ${
      style || className
    }`;

    if (disabled) {
      buttonStyle += ' bg-btn-primary/50';
    }

    return (
      <button
        ref={ref}
        type={type}
        className={buttonStyle}
        onClick={onClick}
        disabled={disabled}
      >
        {text || children || 'Submit'}
      </button>
    );
  },
);

export default Button;
