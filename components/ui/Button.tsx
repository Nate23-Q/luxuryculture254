'use client'

import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-bold uppercase tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 no-select relative overflow-hidden'
    
    const variants = {
      primary: 'bg-gradient-to-r from-accent to-red-600 text-white hover:shadow-xl hover:shadow-accent/50 hover:-translate-y-1 focus-visible:ring-accent border border-accent/20',
      secondary: 'bg-secondary text-primary hover:bg-secondary-800 hover:shadow-lg focus-visible:ring-secondary',
      outline: 'border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white hover:shadow-lg hover:-translate-y-1 focus-visible:ring-accent',
      ghost: 'text-accent hover:bg-accent/10 focus-visible:ring-accent',
      link: 'text-accent underline-offset-4 hover:underline focus-visible:ring-accent',
    }
    
    const sizes = {
      sm: 'h-11 px-4 text-sm rounded-lg min-w-[44px]',
      md: 'h-12 px-6 text-base rounded-lg min-w-[44px]',
      lg: 'h-14 px-8 text-lg rounded-lg min-w-[44px]',
      xl: 'h-16 px-10 text-xl rounded-xl min-w-[44px]',
    }
    
    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
