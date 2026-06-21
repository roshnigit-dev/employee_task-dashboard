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
    'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500',
  secondary:
    'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 focus:ring-blue-500',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500',
  ghost:
    'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 focus:ring-gray-500',
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
        focus:outline-none focus:ring-2 focus:ring-offset-2
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