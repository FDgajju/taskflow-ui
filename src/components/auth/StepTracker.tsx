import React from 'react';
import { SIGN_UP_STEPS } from '../../constants/constants';
import type { SignupState } from '../../page/auth/Signup';

export const StepTracker = ({
  step,
  onPrevious,
  goto,
  completedSteps,
}: {
  step: SignupState;
  onPrevious: () => void;
  goto: (step: string) => void;
  completedSteps: SignupState[];
}) => {
  const steps = Object.keys(SIGN_UP_STEPS);

  return (
    <div className="w-full flex items-center justify-evenly my-4">
      <button
        type="button"
        onClick={onPrevious}
        className={`px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-600 hover:text-btn-primary hover:bg-btn-secondary`}
      >
        <span>Prev</span>
      </button>
      {steps.length > 1 && <span className="text-gray-400">&middot;</span>}
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          {/** biome-ignore lint/a11y/noStaticElementInteractions: explanation */}
          {/** biome-ignore lint/a11y/useKeyWithClickEvents: explanation */}
          <div
            onClick={() => {
              const idx = steps.indexOf(s);
              const currentIdx = steps.indexOf(step);
              if (
                completedSteps.includes(s as SignupState) ||
                idx <= currentIdx
              ) {
                goto(s);
              }
            }}
            className={`px-3 py-1 text-sm rounded-full cursor-pointer ${
              s === step
                ? 'bg-btn-secondary text-btn-primary'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {i + 1}
          </div>
          {i < steps.length - 1 && <span className="text-gray-400">—</span>}
        </React.Fragment>
      ))}
    </div>
  );
};
