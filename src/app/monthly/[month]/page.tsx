'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useBabyAge } from '@/hooks/useBabyAge'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Accordion } from '@/components/ui/Accordion'
import monthlyData from '@/data/monthly-guide.json'
import qaData from '@/data/qa.json'
import type { QAItem } from '@/types'

const SECTION_TABS = ['発達', '授乳・食事', '睡眠', '遊び', 'ママ', '準備', '健診・接種'] as const
type SectionTab = typeof SECTION_TABS[number]

export default function MonthlyPage() {
  const params = useParams()
  const month = Math.min(Math.max(parseInt(params.month as string) || 0, 0), 12)
  const ageInfo = useBabyAge()
  const [activeTab, setActiveTab] = useState<SectionTab>('発達')

  const data = monthlyData.months.find((m) => m.month === month)
  if (!data) return <div className="page-content"><p>データが見つかりません</p></div>

  const allQA = qaData.categories.flatMap((c) => c.items as QAItem[])
  const relatedQA = allQA.filter((q) => q.relatedMonths?.includes(month))

  const currentMonth = ageInfo.ageInMonths ?? 0
  const isCurrentMonth = month === currentMonth && ageInfo.phase === 'postnatal'

  return (
    <div>
      <PageHeader title={`${data.month}ヶ月ガイド`} backHref="/" />

      {/* Month Selector */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="flex overflow-x-auto gap-2 px-4 scrollbar-hide">
          {Array.from({ length: 13 }, (_, i) => (
            <Link
              key={i}
              href={`/monthly/${i}`}
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                i === month ? 'bg-pastel-pink-btn text-white' :
                i === currentMonth && ageInfo.phase === 'postnatal' ? 'bg-pastel-mint text-emerald-700 ring-2 ring-emerald-400' :
                'bg-gray-100 text-gray-600'
              }`}
            >
              {i}
            </Link>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-b from-pastel-pink to-pastel-cream px-4 py-6">
        {isCurrentMonth && (
          <span className="mb-2"><Badge color="mint">📍 今の月齢</Badge></span>
        )}
        <h1 className="text-2xl font-bold text-pink-800">{data.title}</h1>
        <p className="text-pink-600 mt-1">{data.subtitle}</p>
      </div>

      {/* Section Tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-14 z-30">
        <div className="flex overflow-x-auto gap-0 scrollbar-hide">
          {SECTION_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab ? 'border-pastel-pink-btn text-pastel-pink-btn' : 'border-transparent text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="page-content">
        {activeTab === '発達' && (
          <div className="space-y-3">
            <Card color="beige">
              <h3 className="font-bold text-gray-800 mb-3">👶 発達の目安</h3>
              <p className="text-xs text-gray-500 mb-3">※個人差があります。目安として参考にしてください。</p>
              <ul className="space-y-2">
                {data.milestones.map((m, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-pastel-pink-btn mt-0.5">•</span>
                    <span className="text-gray-700">
                      {m.text}
                      {m.isOptional && <span className="text-gray-400 text-sm ml-1">（個人差あり）</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
            <div className="bg-pastel-mint rounded-2xl p-4 text-sm text-emerald-800">
              ℹ️ 発達は個人差が大きいです。目安より早い・遅いことがあります。心配な場合は健診や小児科で確認しましょう。
            </div>
          </div>
        )}

        {activeTab === '授乳・食事' && (
          <div className="space-y-3">
            <Card>
              <h3 className="font-bold text-gray-800 mb-2">🍼 授乳の目安</h3>
              <div className="bg-pastel-pink rounded-xl p-3 mb-3">
                <p className="text-pink-700 font-medium">{data.feeding.frequency}</p>
              </div>
              <p className="text-gray-700 mb-3">{data.feeding.summary}</p>
              <ul className="space-y-2">
                {data.feeding.tips.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-pink-400 mt-0.5">💡</span>
                    {t}
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="font-bold text-gray-800 mb-2">💩 おむつ・排泄</h3>
              <div className="bg-pastel-beige rounded-xl p-3 mb-3">
                <p className="text-amber-700 font-medium">{data.diaper.dailyCount}</p>
              </div>
              <ul className="space-y-2">
                {data.diaper.notes.map((n, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-amber-400 mt-0.5">•</span>
                    {n}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}

        {activeTab === '睡眠' && (
          <Card>
            <h3 className="font-bold text-gray-800 mb-2">😴 睡眠の目安</h3>
            <div className="bg-pastel-lavender rounded-xl p-3 mb-3">
              <p className="text-purple-700 font-medium">合計 {data.sleep.totalHours}</p>
            </div>
            <p className="text-gray-700 mb-3">{data.sleep.summary}</p>
            <ul className="space-y-2">
              {data.sleep.tips.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <span className="text-purple-400 mt-0.5">💡</span>
                  {t}
                </li>
              ))}
            </ul>
          </Card>
        )}

        {activeTab === '遊び' && (
          <Card>
            <h3 className="font-bold text-gray-800 mb-1">🧸 遊び・声かけ</h3>
            <p className="text-gray-500 text-sm mb-3">注目：{data.play.developmentFocus}</p>
            <ul className="space-y-2">
              {data.play.ideas.map((idea, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <span className="text-amber-400 mt-0.5">★</span>
                  {idea}
                </li>
              ))}
            </ul>
          </Card>
        )}

        {activeTab === 'ママ' && (
          <div className="space-y-3">
            <Card color="lavender">
              <h3 className="font-bold text-gray-800 mb-2">💆 ママの体と心</h3>
              <ul className="space-y-2 mb-3">
                {data.mamaBody.changes.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-purple-400 mt-0.5">•</span>
                    {c}
                  </li>
                ))}
              </ul>
              <div className="border-t border-purple-100 pt-3">
                {data.mamaBody.tips.map((t, i) => (
                  <p key={i} className="text-sm text-purple-700 mb-1">💡 {t}</p>
                ))}
              </div>
            </Card>
            <Link href="/mama-care">
              <Card>
                <p className="text-center text-pastel-pink-btn font-medium">ママのケア詳細を見る →</p>
              </Card>
            </Link>
          </div>
        )}

        {activeTab === '準備' && (
          <Card>
            <h3 className="font-bold text-gray-800 mb-3">📝 この時期に準備すること</h3>
            {data.preparations.length > 0 ? (
              <ul className="space-y-2">
                {data.preparations.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-pastel-pink-btn mt-0.5">□</span>
                    {p}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">この月の特別な準備はありません。</p>
            )}
          </Card>
        )}

        {activeTab === '健診・接種' && (
          <div className="space-y-3">
            {data.vaccines.length > 0 ? (
              <Card>
                <h3 className="font-bold text-gray-800 mb-3">💉 予防接種</h3>
                <ul className="space-y-3">
                  {data.vaccines.map((v, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`text-sm px-2 py-0.5 rounded-full font-medium ${v.mandatory ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                        {v.mandatory ? '定期' : '任意'}
                      </span>
                      <div>
                        <p className="font-medium text-gray-800">{v.name}</p>
                        <p className="text-sm text-gray-500">{v.timing}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            ) : (
              <Card>
                <p className="text-gray-500">この月に予定している接種はありません。</p>
              </Card>
            )}
            <div className="bg-pastel-mint rounded-2xl p-4 text-sm text-emerald-800">
              💡 予防接種のスケジュールはかかりつけ医に確認しましょう。日本小児科学会のスケジュールも参考にしてください。
            </div>

            {relatedQA.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-800 mb-3">💬 よくある悩み</h3>
                <div className="space-y-2">
                  {relatedQA.slice(0, 5).map((qa) => (
                    <Accordion key={qa.id} question={qa.question} urgent={qa.urgent}>
                      {qa.answer}
                    </Accordion>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
