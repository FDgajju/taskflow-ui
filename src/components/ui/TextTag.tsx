import type React from 'react';
import { twMerge } from 'tailwind-merge';

const TextTag: React.FC<{
  text: string;
  className?: string;
  onClick?: () => void;
}> = ({ text, className = '', onClick }) => {
  let ttClasses =
    'text-[10px] border border-btn-primary/50 text-btn-primary bg-btn-secondary p-0.5 rounded-sm';

  if (className) {
    ttClasses = twMerge(ttClasses, className);
  }

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: explanation
    // biome-ignore lint/a11y/noStaticElementInteractions: explanation
    <span className={ttClasses} onClick={onClick}>
      {text}
    </span>
  );
};

export default TextTag;
