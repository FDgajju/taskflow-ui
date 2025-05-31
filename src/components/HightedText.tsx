import type React from "react";

type HighlightedTextProps = {
  text: string;
  style?: string;
};

const HightedText: React.FC<HighlightedTextProps> = ({ text, style }) => {
  return (
    <span
      className={`bg-gray-text p-1 rounded-md text-primary-bg font-bold ${style}`}
    >
      {text}
    </span>
  );
};

export default HightedText;
