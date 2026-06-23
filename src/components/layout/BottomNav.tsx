'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useBabyAge } from '@/hooks/useBabyAge'

const tabs = [
  { label: 'ホーム', icon: '🏠', href: '/' },
  { label: 'ガイド', icon: '📖', href: null },
  { label: '記録', icon: '✏️', href: '/record' },
  { label: 'リスト', icon: '✅', href: '/checklist' },
  { label: 'ママケア', icon: '💆', href: '/mama-care' },
]

export function BottomNav() {
  const pathname = usePathname()
  const ageInfo = useBabyAge()

  const guideHref = ageInfo.phase === 'pregnancy'
    ? '/pregnancy'
    : `/monthly/${ageInfo.ageInMonths ?? 0}`

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
      <div className="w-full max-w-[430px] bg-white border-t border-gray-100 flex items-center pb-safe">
        {tabs.map((tab) => {
          const href = tab.href ?? guideHref
          const isGuide = tab.label === 'ガイド'
          const isActive = isGuide
            ? (pathname.startsWith('/monthly') || pathname.startsWith('/pregnancy'))
            : pathname === href

          return (
            <Link
              key={tab.label}
              href={href}
              className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${
                isActive ? 'text-pastel-pink-btn' : 'text-gray-400'
              }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              <span className="text-xs font-medium">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
