

import React from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 active:bg-blue-800 dark:active:bg-blue-700 focus:ring-blue-500',
  secondary:
    'bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-600 focus:ring-blue-500',
  danger:
    'bg-red-600 dark:bg-red-500 text-white hover:bg-red-700 dark:hover:bg-red-600 active:bg-red-800 dark:active:bg-red-700 focus:ring-red-500',
  ghost:
    'bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white active:bg-gray-200 dark:active:bg-gray-600 focus:ring-gray-500',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-2.5 py-1.5 text-xs sm:px-3 sm:py-1.5 sm:text-sm',
  md: 'px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-sm',
  lg: 'px-4 py-2.5 text-sm sm:px-5 sm:py-3 sm:text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-1.5 sm:gap-2
        font-medium rounded-lg transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        active:scale-95 touch-manipulation
        ${variantClasses[variant]} ${sizeClasses[size]} ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  );
}