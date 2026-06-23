'use client'

import { useLocalStorage } from './useLocalStorage'
import type { UserProfile } from '@/types'

const DEFAULT_PROFILE: UserProfile = {
  babyName: '',
  birthDate: null,
  dueDate: null,
  deliveryMethod: '未定',
  feedingMethod: '未定',
  notificationsEnabled: false,
  onboardingCompleted: false,
  createdAt: new Date().toISOString(),
}

export function useUserProfile() {
  const [profile, setProfile, hydrated] = useLocalStorage<UserProfile>('mama-navi-profile', DEFAULT_PROFILE)

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }))
  }

  const isOnboardingComplete = profile.onboardingCompleted

  return { profile, updateProfile, isOnboardingComplete, hydrated }
}
