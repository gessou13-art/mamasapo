import { ReactNode } from 'react'

export function MobileContainer({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-pastel-cream flex justify-center">
      <div className="w-full max-w-[430px] relative bg-pastel-cream">
        {children}
      </div>
    </div>
  )
}
