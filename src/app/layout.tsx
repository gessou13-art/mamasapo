'use client'

import './globals.css'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { MobileContainer } from '@/components/layout/MobileContainer'
import { BottomNav } from '@/components/layout/BottomNav'
import { useUserProfile } from '@/hooks/useUserProfile'

function AppShell({ children }: { children: React.ReactNode }) {
  const { isOnboardingComplete, hydrated } = useUserProfile()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!hydrated) return
    if (!isOnboardingComplete && pathname !== '/onboarding') {
      router.replace('/onboarding')
    }
  }, [hydrated, isOnboardingComplete, pathname, router])

  const showNav = isOnboardingComplete && pathname !== '/onboarding'

  return (
    <MobileContainer>
      {children}
      {showNav && <BottomNav />}
    </MobileContainer>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#FFD6E0" />
        <title>はじめてママナビ</title>
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
