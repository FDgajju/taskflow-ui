import type React from 'react';
import { twMerge } from 'tailwind-merge';
import TextTag from './TextTag';

const PasswordStrengthBar: React.FC<{ level: string; percentage: number }> = ({
  level,
  percentage,
}) => {
  let barClasses =
    'p-0.5 rounded-lg bg-priority-high mb-0.5 transition-all duration-500 ease-in';
  let labelClasses = '';

  switch (level) {
    case 'fair': {
      barClasses = twMerge(barClasses, `bg-orange-500`);
      labelClasses = twMerge(
        labelClasses,
        `bg-orange-500/20 text-orange-500 border-orange-500 text-xs`,
      );

      break;
    }

    case 'good': {
      barClasses = twMerge(barClasses, `bg-priority-medium`);

      labelClasses = twMerge(
        labelClasses,
        `bg-priority-medium/20 text-priority-medium border-priority-medium text-xs`,
      );

      break;
    }

    case 'strong': {
      barClasses = twMerge(barClasses, `bg-priority-low`);
      labelClasses = twMerge(
        labelClasses,
        `bg-priority-low/20 text-priority-low border-priority-low text-xs`,
      );

      break;
    }

    case 'very strong': {
      barClasses = twMerge(barClasses, `bg-green-900`);
      labelClasses = twMerge(
        labelClasses,
        `bg-green-900/20 text-green-900 border-green-900 text-xs`,
      );

      break;
    }

    default: {
      barClasses = twMerge(barClasses, `bg-priority-high`);
      labelClasses = twMerge(
        labelClasses,
        `bg-priority-high/20 text-priority-high border-priority-high text-xs`,
      );
      break;
    }
  }

  return (
    <div className="w-full">
      <div className={barClasses} style={{ width: `${percentage}%` }} />
      <TextTag text={level} className={labelClasses} />
    </div>
  );
};

export default PasswordStrengthBar;
