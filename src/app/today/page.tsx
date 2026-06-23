'use client'

import { useBabyAge } from '@/hooks/useBabyAge'
import { useUserProfile } from '@/hooks/useUserProfile'
import { generateDailyTasks } from '@/lib/taskEngine'
import { formatAgeDisplay } from '@/lib/dateUtils'
import { selectTodayMessage } from '@/lib/messageSelector'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import messagesData from '@/data/messages.json'
import type { DailyMessage } from '@/types'

const categoryConfig = {
  feeding: { icon: '🍼', label: '授乳・食事', color: 'bg-pastel-pink' },
  health: { icon: '💊', label: '健康', color: 'bg-pastel-mint' },
  development: { icon: '🧸', label: '発達', color: 'bg-pastel-lavender' },
  admin: { icon: '📝', label: '手続き', color: 'bg-pastel-beige' },
  mama: { icon: '💆', label: 'ママのケア', color: 'bg-pastel-yellow' },
} as const

export default function TodayPage() {
  const ageInfo = useBabyAge()
  const { profile } = useUserProfile()
  const tasks = generateDailyTasks(ageInfo, profile)
  const message = selectTodayMessage(messagesData.messages as DailyMessage[], ageInfo.phase, ageInfo.ageInMonths)
  const ageDisplay = formatAgeDisplay(ageInfo)

  const today = new Date().toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'short' })

  return (
    <div>
      <PageHeader title="今日やること" backHref="/" />

      <div className="bg-gradient-to-b from-pastel-pink to-pastel-cream px-4 py-6">
        <p className="text-pink-600 text-sm">{today}</p>
        <h1 className="text-2xl font-bold text-pink-800">{ageDisplay}</h1>
        <p className="text-pink-600 mt-1 text-sm">{message?.text}</p>
      </div>

      <div className="page-content">
        <div className="space-y-3">
          {tasks.map((task) => {
            const config = categoryConfig[task.category]
            return (
              <div key={task.id} className={`${config.color} rounded-2xl p-4 shadow-sm`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{config.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-gray-800">{task.title}</p>
                      <span className="text-xs text-gray-500 flex-shrink-0">{config.label}</span>
                    </div>
                    {task.description && (
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    )}
                    {task.priority === 'high' && (
                      <span className="inline-block text-xs text-red-600 font-medium mt-1">⭐ 今日ぜひ</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <Card color="beige">
          <p className="text-sm text-gray-600 text-center leading-relaxed">
            ✨ 全部できなくても大丈夫。<br />
            今日できることをひとつだけやってみましょう。
          </p>
        </Card>

        <div className="bg-white rounded-2xl p-4 text-xs text-gray-500">
          ℹ️ アプリ内の育児情報は一般的な目安です。心配なことは医師・助産師・保健師に相談してください。
        </div>
      </div>
    </div>
  )
}
