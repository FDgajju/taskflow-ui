import type React from 'react';

const H2: React.FC<{ text: string; className?: string }> = ({
  text,
  className = '',
}) => {
  const localStyle = 'text-main text-xl font-bold ';
  return <h2 className={`${localStyle} ${className}`}>{text}</h2>;
};

export default H2;
