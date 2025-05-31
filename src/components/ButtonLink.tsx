import type React from "react";
import { Link } from "react-router-dom";

type ButtonLinkProps = {
  text?: string;
  type: "button" | "submit" | "reset";
  style?: string;
  onClick: () => void;
  to: string;
};

const ButtonLink: React.FC<ButtonLinkProps> = ({
  text,
  type,
  style,
  onClick,
  to,
}) => {
  return (
    <Link
      to={to}
      type={type}
      className={`bg-btn-primary py-2 px-4 font-bold rounded-lg text-sm ${style}`}
      onClick={onClick}
    >
      {text || "Submit"}
    </Link>
  );
};

export default ButtonLink;
