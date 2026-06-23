'use client'

import { useMemo } from 'react'
import { useUserProfile } from './useUserProfile'
import { getBabyAgeInfo } from '@/lib/dateUtils'
import type { BabyAgeInfo } from '@/types'

export function useBabyAge(): BabyAgeInfo {
  const { profile } = useUserProfile()

  return useMemo(
    () => getBabyAgeInfo(profile.birthDate, profile.dueDate),
    [profile.birthDate, profile.dueDate]
  )
}
