'use client'

import Link from 'next/link'
import { useBabyAge } from '@/hooks/useBabyAge'
import { useUserProfile } from '@/hooks/useUserProfile'
import { useChecklist } from '@/hooks/useChecklist'
import { useRecords } from '@/hooks/useRecords'
import { formatAgeDisplay } from '@/lib/dateUtils'
import { generateDailyTasks } from '@/lib/taskEngine'
import { selectTodayMessage } from '@/lib/messageSelector'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import messagesData from '@/data/messages.json'
import type { DailyMessage } from '@/types'

export default function HomePage() {
  const ageInfo = useBabyAge()
  const { profile } = useUserProfile()
  const { getOverallProgress } = useChecklist()
  const { getTodayRecords } = useRecords()

  const ageDisplay = formatAgeDisplay(ageInfo)
  const tasks = generateDailyTasks(ageInfo, profile).slice(0, 3)
  const progress = getOverallProgress()
  const todayRecords = getTodayRecords()
  const message = selectTodayMessage(messagesData.messages as DailyMessage[], ageInfo.phase, ageInfo.ageInMonths)

  const guideHref = ageInfo.phase === 'pregnancy'
    ? '/pregnancy'
    : `/monthly/${ageInfo.ageInMonths ?? 0}`

  return (
    <div className="pb-28">
      {/* Hero Header */}
      <div className="bg-gradient-to-b from-pastel-pink to-pastel-cream px-4 pt-12 pb-6">
        <h1 className="text-center text-xl font-bold text-pink-800 mb-1">
          🌸 はじめてママナビ
        </h1>
        <div className="text-center">
          <p className="text-sm text-pink-600 font-medium">{profile.babyName || 'あかちゃん'}の</p>
          <p className="text-3xl font-bold text-pink-800 mt-1">{ageDisplay}</p>
        </div>
      </div>

      <div className="px-4 space-y-4 mt-4">
        {/* Daily Message */}
        <Card color="pink">
          <p className="text-pink-800 font-medium leading-relaxed text-center">
            💌 {message?.text}
          </p>
        </Card>

        {/* Today's Tasks */}
        <div>
          <h2 className="section-title mb-3">📋 今日やること</h2>
          <div className="space-y-2">
            {tasks.map((task) => (
              <Card key={task.id}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">
                    {task.category === 'feeding' ? '🍼' :
                     task.category === 'health' ? '💊' :
                     task.category === 'development' ? '🧸' :
                     task.category === 'admin' ? '📝' : '💆'}
                  </span>
                  <div>
                    <p className="font-medium text-gray-800">{task.title}</p>
                    {task.description && (
                      <p className="text-sm text-gray-500 mt-0.5">{task.description}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
            <Link href="/today" className="block text-center text-pastel-pink-btn text-sm font-medium py-2">
              すべて見る →
            </Link>
          </div>
        </div>

        {/* Quick Record */}
        <div>
          <h2 className="section-title mb-3">✏️ 記録する</h2>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: '授乳', icon: '🤱', href: '/record' },
              { label: 'ミルク', icon: '🍼', href: '/record' },
              { label: 'おむつ', icon: '🧷', href: '/record' },
              { label: '睡眠', icon: '😴', href: '/record' },
              { label: '体温', icon: '🌡️', href: '/record' },
              { label: 'メモ', icon: '📝', href: '/record' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="bg-white rounded-2xl p-3 flex flex-col items-center gap-1 shadow-sm active:scale-95 transition-transform"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs text-gray-600 font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
          {todayRecords.length > 0 && (
            <p className="text-xs text-gray-500 text-center mt-2">今日の記録：{todayRecords.length}件</p>
          )}
        </div>

        {/* Checklist Progress */}
        <Card>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-gray-800">✅ チェックリスト</h2>
            <Link href="/checklist" className="text-pastel-pink-btn text-sm font-medium">
              開く →
            </Link>
          </div>
          <ProgressBar
            percent={progress.percent}
            label={`${progress.checked}/${progress.total} 完了`}
          />
        </Card>

        {/* Guide Links */}
        <div>
          <h2 className="section-title mb-3">📖 今の時期のガイド</h2>
          <div className="grid grid-cols-2 gap-2">
            <Link href={guideHref}>
              <Card color="beige">
                <div className="text-center">
                  <span className="text-3xl block mb-1">👶</span>
                  <p className="text-sm font-medium text-gray-700">
                    {ageInfo.phase === 'pregnancy' ? '出産前ナビ' : `${ageInfo.ageInMonths ?? 0}ヶ月ガイド`}
                  </p>
                </div>
              </Card>
            </Link>
            <Link href="/weaning">
              <Card color="mint">
                <div className="text-center">
                  <span className="text-3xl block mb-1">🥣</span>
                  <p className="text-sm font-medium text-gray-700">離乳食ナビ</p>
                </div>
              </Card>
            </Link>
            <Link href="/mama-care">
              <Card color="lavender">
                <div className="text-center">
                  <span className="text-3xl block mb-1">💆</span>
                  <p className="text-sm font-medium text-gray-700">ママのケア</p>
                </div>
              </Card>
            </Link>
            <Link href="/qa">
              <Card color="pink">
                <div className="text-center">
                  <span className="text-3xl block mb-1">💬</span>
                  <p className="text-sm font-medium text-gray-700">不安解消Q&amp;A</p>
                </div>
              </Card>
            </Link>
          </div>
        </div>

        {/* Monthly Guide Browser */}
        <div>
          <h2 className="section-title mb-3">👶 月齢ガイドを探す</h2>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-3">月齢を選んで赤ちゃんの成長・気をつけることを確認できます</p>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 13 }, (_, i) => (
                <Link
                  key={i}
                  href={`/monthly/${i}`}
                  className={`flex flex-col items-center justify-center py-2 rounded-xl text-sm font-bold transition-colors ${
                    i === (ageInfo.ageInMonths ?? -1) && ageInfo.phase === 'postnatal'
                      ? 'bg-pastel-pink-btn text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-pastel-pink hover:text-pink-800'
                  }`}
                >
                  <span>{i}ヶ月</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Info */}
        <Card color="beige">
          <p className="text-xs text-gray-600 text-center leading-relaxed">
            ⚠️ 赤ちゃんやママの体調で心配なことがあれば、
            迷わずかかりつけ医・産院・自治体の相談窓口に連絡してください。
          </p>
        </Card>
      </div>
    </div>
  )
}
