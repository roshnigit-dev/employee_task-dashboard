import React from 'react';
import { ChevronDown } from 'lucide-react';

interface BaseProps {
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
}

interface InputProps extends BaseProps, React.InputHTMLAttributes<HTMLInputElement> {
  as?: 'input';
}

interface TextareaProps extends BaseProps, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: 'textarea';
}

interface SelectProps extends BaseProps, React.SelectHTMLAttributes<HTMLSelectElement> {
  as: 'select';
  options: { label: string; value: string }[];
}

type Props = InputProps | TextareaProps | SelectProps;

const fieldBase =
  'w-full bg-white border rounded-lg px-3 sm:px-3.5 py-2 sm:py-2.5 text-sm ' +
  'text-gray-900 placeholder:text-gray-400 ' +
  'transition-all duration-150 outline-none ' +
  'disabled:bg-gray-50 disabled:cursor-not-allowed';

export default function Input(props: Props) {
  const { label, error, required, hint, id,...rest } = props as Props & { id?: string };
  const fieldId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const borderClass = error
   ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
    : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20';

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={fieldId}
        className="text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {props.as === 'textarea'? (
        <textarea
          id={fieldId}
          className={`${fieldBase} ${borderClass} min-h-[100px] sm:min-h-[120px] resize-y`}
          aria-invalid={!!error}
          aria-describedby={error? `${fieldId}-error` : hint? `${fieldId}-hint` : undefined}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : props.as === 'select'? (
        <div className="relative">
          <select
            id={fieldId}
            className={`${fieldBase} ${borderClass} cursor-pointer appearance-none pr-10`}
            aria-invalid={!!error}
            aria-describedby={error? `${fieldId}-error` : hint? `${fieldId}-hint` : undefined}
            {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)}
          >
            {props.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      ) : (
        <input
          id={fieldId}
          className={`${fieldBase} ${borderClass}`}
          aria-invalid={!!error}
          aria-describedby={error? `${fieldId}-error` : hint? `${fieldId}-hint` : undefined}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {hint &&!error && (
        <span id={`${fieldId}-hint`} className="text-xs text-gray-500">
          {hint}
        </span>
      )}
      {error && (
        <span id={`${fieldId}-error`} className="text-xs text-red-600 font-medium">
          {error}
        </span>
      )}
    </div>
  );
}