import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95'
    
    const variants = {
      primary: 'bg-accent text-primary hover:bg-accent-600 focus-visible:ring-accent',
      secondary: 'bg-secondary text-primary hover:bg-secondary-800 focus-visible:ring-secondary',
      outline: 'border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-primary focus-visible:ring-accent',
      ghost: 'text-accent hover:bg-accent-50 focus-visible:ring-accent',
      link: 'text-accent underline-offset-4 hover:underline focus-visible:ring-accent',
    }
    
    const sizes = {
      sm: 'h-9 px-3 text-sm rounded-md',
      md: 'h-11 px-6 text-base rounded-lg',
      lg: 'h-12 px-8 text-lg rounded-lg',
      xl: 'h-14 px-10 text-xl rounded-xl',
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
