

import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'completed' | 'pending' | 'high' | 'medium' | 'low'
}

export default function Badge({ children, variant = 'pending' }: BadgeProps) {
  const styles = {
    completed: 'bg-green-50 text-green-700 ring-green-600/20',
    pending: 'bg-orange-50 text-orange-700 ring-orange-600/20', 
    high: 'text-red-600',
    medium: 'text-orange-600',
    low: 'text-purple-600'
  }
  
  // Priority ke liye dot wala badge
  if (variant === 'high' || variant === 'medium' || variant === 'low') {
    return (
      <div className={`flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium ${styles[variant]} shrink-0`}>
        <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-current"></span>
        <span className="truncate">{children}</span>
      </div>
    )
  }

  // Status ke liye pill wala badge  
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 text- sm:text-xs font-semibold ring-1 ring-inset ${styles[variant]} shrink-0 whitespace-nowrap`}>
      {children}
    </span>
  )
}