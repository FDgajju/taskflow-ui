import type React from "react";

const H2: React.FC<{ text: string }> = ({ text }) => {
  return <h2 className="text-main text-xl font-bold ">{text}</h2>;
};

export default H2;
