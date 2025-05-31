import type React from "react";

const H2: React.FC<{ text: string }> = ({ text }) => {
  const localStyle = "text-main text-xl font-bold ";
  return <h2 className={localStyle}>{text}</h2>;
};

export default H2;
