import type React from 'react';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import type { AnyType } from '../../types/globalTypes';

export interface InputProps {
  id: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'url'
    | 'search'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'month'
    | 'week'
    | 'checkbox'
    | 'radio'
    | 'file'
    | 'hidden'
    | 'submit'
    | 'reset'
    | 'button'
    | 'color'
    | 'range';
  name: string;
  value?: string | number;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  onIconClick?: () => void;
  props?: AnyType;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  label,
  value = '',
  onChange = () => {},
  placeholder = undefined,
  required = false,
  disabled = false,
  ...props
}) => {
  let inputClasses =
    'text-main text-sm p-2 outline-none border-1 border-main/50 focus:border-btn-primary rounded-sm';

  if (disabled) {
    inputClasses = twMerge(
      inputClasses,
      'text-gray-text font-bold border-text-gray',
    );
  }

  return (
    <div className="flex flex-col gap-1 relative">
      <label htmlFor="email" className="text-main text-sm font-medium">
        {label} {required && <span className="text-status-overdue">*</span>}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={inputClasses}
        disabled={disabled}
        {...props}
      />
    </div>
  );
};

export default Input;
