import type React from 'react';
import { Link } from 'react-router-dom';

type ButtonLinkProps = {
  text?: string;
  type: 'button' | 'submit' | 'reset';
  style?: string;
  className?: string;
  // onClick?: () => void;
  to: string;
};

const ButtonLink: React.FC<ButtonLinkProps> = ({
  text,
  type,
  style,
  className,
  // onClick,
  to,
}) => {
  return (
    <Link
      to={to}
      type={type}
      className={`flex justify-center items-center align-middle bg-btn-primary py-2 px-4 font-bold rounded-lg text-sm ${
        style || className
      }`}
      // onClick={onClick}
    >
      {text || 'Submit'}
    </Link>
  );
};

export default ButtonLink;
