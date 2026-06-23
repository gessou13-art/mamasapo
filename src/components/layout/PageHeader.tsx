'use client'

import { useRouter } from 'next/navigation'

interface PageHeaderProps {
  title: string
  backHref?: string
}

export function PageHeader({ title, backHref }: PageHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    if (backHref) {
      router.push(backHref)
    } else {
      router.back()
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="flex items-center h-14 px-4">
        <button
          onClick={handleBack}
          className="text-2xl text-gray-500 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          ‹
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-gray-800 -ml-10 pr-0">
          {title}
        </h1>
      </div>
    </header>
  )
}
