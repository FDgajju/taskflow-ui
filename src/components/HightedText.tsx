import type React from "react";

type HighlightedTextProps = {
  text: string;
  style?: string;
  className?: string;
};

const HightedText: React.FC<HighlightedTextProps> = ({
  text,
  style,
  className,
}) => {
  return (
    <span
      className={`bg-gray-text p-1 rounded-md text-primary-bg font-bold ${style} ${className}`}
    >
      {text}
    </span>
  );
};

export default HightedText;
