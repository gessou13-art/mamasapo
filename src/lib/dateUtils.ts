import type { BabyAgeInfo, PregnancyPhase } from '@/types'

export function calculateBabyAge(birthDate: string): { days: number; weeks: number; months: number } {
  const birth = new Date(birthDate)
  const now = new Date()
  const days = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))
  return {
    days,
    weeks: Math.floor(days / 7),
    months: Math.floor(days / 30.44),
  }
}

export function calculatePregnancyWeek(dueDate: string): { weeks: number; days: number } {
  const due = new Date(dueDate)
  const now = new Date()
  const daysUntilDue = Math.floor((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  const totalPregnancyDays = 280
  const daysPregnant = totalPregnancyDays - daysUntilDue
  return {
    weeks: Math.floor(daysPregnant / 7),
    days: daysPregnant % 7,
  }
}

export function daysUntilDue(dueDate: string): number {
  const due = new Date(dueDate)
  const now = new Date()
  return Math.floor((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

export function getPregnancyPhase(dueDate: string): PregnancyPhase | null {
  const days = daysUntilDue(dueDate)
  if (days < -7) return null
  if (days < 0) return '退院直後'
  if (days <= 7) return '入院直前'
  if (days <= 14) return '1週間前'
  if (days <= 21) return '2週間前'
  if (days <= 35) return '1ヶ月前'
  return null
}

export function getBabyAgeInfo(birthDate: string | null, dueDate: string | null): BabyAgeInfo {
  if (birthDate) {
    const { days, weeks, months } = calculateBabyAge(birthDate)
    return {
      phase: 'postnatal',
      ageInDays: days,
      ageInWeeks: weeks,
      ageInMonths: Math.min(months, 12),
      weeksPregnant: null,
      daysUntilDue: null,
      pregnancyPhase: null,
    }
  }

  if (dueDate) {
    const { weeks } = calculatePregnancyWeek(dueDate)
    return {
      phase: 'pregnancy',
      ageInDays: null,
      ageInWeeks: null,
      ageInMonths: null,
      weeksPregnant: weeks,
      daysUntilDue: daysUntilDue(dueDate),
      pregnancyPhase: getPregnancyPhase(dueDate),
    }
  }

  return {
    phase: 'pregnancy',
    ageInDays: null,
    ageInWeeks: null,
    ageInMonths: null,
    weeksPregnant: null,
    daysUntilDue: null,
    pregnancyPhase: null,
  }
}

export function formatAgeDisplay(ageInfo: BabyAgeInfo): string {
  if (ageInfo.phase === 'postnatal' && ageInfo.ageInDays !== null) {
    const months = ageInfo.ageInMonths ?? 0
    const days = ageInfo.ageInDays
    if (months === 0) return `生後${days}日`
    return `生後${months}ヶ月（${days}日）`
  }
  if (ageInfo.weeksPregnant !== null) {
    const days = ageInfo.daysUntilDue
    if (days !== null && days >= 0) return `妊娠${ageInfo.weeksPregnant}週（出産まであと${days}日）`
    return `妊娠${ageInfo.weeksPregnant}週`
  }
  return '出産予定日を設定してください'
}
