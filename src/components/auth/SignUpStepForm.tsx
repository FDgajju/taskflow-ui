import type React from 'react';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import type { AnyType } from '../../types/globalTypes';

const SignUpStepForm: React.FC<{
  children: ReactNode;
  classname?: string;
  handleSubmit: () => AnyType;
}> = ({ children, handleSubmit, classname }) => {
  let formClasses = 'w-full flex flex-col gap-2 mt-2';

  if (classname) {
    formClasses = twMerge(formClasses, classname);
  }

  return (
    <form className={formClasses} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default SignUpStepForm;
