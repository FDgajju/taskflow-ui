import { useState } from 'react';

export const useMultiStepForm = (
  steps: string[],
  labels: Record<string, string>,
) => {
  const [current, setCurrent] = useState(steps[0]);

  return {
    current,
    label: labels[current],

    isFirst: current === steps[0],
    isLast: current === steps[steps.length - 1],

    next() {
      setCurrent((prev) => {
        const idx = steps.indexOf(prev);
        return idx < steps.length - 1 ? steps[idx + 1] : prev;
      });
    },

    previous() {
      setCurrent((prev) => {
        const idx = steps.indexOf(prev);
        return idx > 0 ? steps[idx - 1] : prev;
      });
    },

    goto(step: string) {
      if (steps.includes(step)) setCurrent(step);
    },
  };
};
