import { ReactNode, ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

const variantMap: Record<ButtonVariant, string> = {
  primary: 'bg-pastel-pink-btn text-white hover:bg-pink-500 active:bg-pink-600',
  secondary: 'bg-white border-2 border-pastel-pink-btn text-pastel-pink-btn hover:bg-pastel-pink',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  fullWidth?: boolean
}

export function Button({ children, variant = 'primary', fullWidth = false, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`
        ${variantMap[variant]}
        ${fullWidth ? 'w-full' : ''}
        rounded-2xl px-6 py-3 font-medium text-base
        transition-all active:scale-95 disabled:opacity-50
        min-h-[48px] flex items-center justify-center gap-2
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
