import { ReactNode } from 'react'

type CardColor = 'white' | 'pink' | 'beige' | 'mint' | 'lavender' | 'cream' | 'yellow'

const colorMap: Record<CardColor, string> = {
  white: 'bg-white',
  pink: 'bg-pastel-pink',
  beige: 'bg-pastel-beige',
  mint: 'bg-pastel-mint',
  lavender: 'bg-pastel-lavender',
  cream: 'bg-pastel-cream',
  yellow: 'bg-pastel-yellow',
}

interface CardProps {
  children: ReactNode
  color?: CardColor
  className?: string
  onClick?: () => void
}

export function Card({ children, color = 'white', className = '', onClick }: CardProps) {
  const base = `rounded-2xl shadow-sm p-4 ${colorMap[color]} ${className}`
  if (onClick) {
    return (
      <button className={`${base} w-full text-left cursor-pointer active:scale-95 transition-transform`} onClick={onClick}>
        {children}
      </button>
    )
  }
  return <div className={base}>{children}</div>
}
