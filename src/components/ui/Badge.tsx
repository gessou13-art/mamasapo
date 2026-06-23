import { ReactNode } from 'react'

type BadgeColor = 'pink' | 'mint' | 'lavender' | 'beige' | 'red'

const colorMap: Record<BadgeColor, string> = {
  pink: 'bg-pastel-pink text-pink-700',
  mint: 'bg-pastel-mint text-emerald-700',
  lavender: 'bg-pastel-lavender text-purple-700',
  beige: 'bg-pastel-beige text-amber-700',
  red: 'bg-red-100 text-red-700',
}

interface BadgeProps {
  children: ReactNode
  color?: BadgeColor
}

export function Badge({ children, color = 'pink' }: BadgeProps) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colorMap[color]}`}>
      {children}
    </span>
  )
}
