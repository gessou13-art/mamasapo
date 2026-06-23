import type { DailyMessage, AppPhase } from '@/types'

export function selectTodayMessage(
  messages: DailyMessage[],
  phase: AppPhase,
  month: number | null
): DailyMessage {
  const today = new Date()
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  )

  const filtered = messages.filter((m) => {
    if (m.phase && m.phase !== phase) return false
    if (m.monthRange && month !== null) {
      if (month < m.monthRange[0] || month > m.monthRange[1]) return false
    }
    return true
  })

  const pool = filtered.length > 0 ? filtered : messages
  return pool[dayOfYear % pool.length]
}
