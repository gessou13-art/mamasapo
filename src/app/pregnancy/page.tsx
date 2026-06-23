'use client'

import { useBabyAge } from '@/hooks/useBabyAge'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import pregnancyData from '@/data/pregnancy-guide.json'
import type { PregnancyPhase } from '@/types'

export default function PregnancyPage() {
  const ageInfo = useBabyAge()
  const currentPhase = ageInfo.pregnancyPhase

  return (
    <div>
      <PageHeader title="出産前ナビ" backHref="/" />

      <div className="bg-gradient-to-b from-pastel-pink to-pastel-cream px-4 py-6">
        <h1 className="text-2xl font-bold text-pink-800">出産準備ガイド</h1>
        {ageInfo.daysUntilDue !== null && (
          <p className="text-pink-600 mt-1">
            出産まであと約{Math.max(0, ageInfo.daysUntilDue)}日
          </p>
        )}
      </div>

      <div className="page-content">
        {pregnancyData.phases.map((phase) => {
          const isCurrent = phase.phase === currentPhase
          return (
            <div key={phase.phase}>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="font-bold text-gray-800">{phase.title}</h2>
                {isCurrent && <Badge color="mint">📍 今ここ</Badge>}
              </div>
              <Card color={isCurrent ? 'pink' : 'white'}>
                <p className="text-gray-600 mb-4">{phase.description}</p>

                <h3 className="font-bold text-gray-800 mb-2">準備リスト</h3>
                <ul className="space-y-1 mb-4">
                  {phase.checklist.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-pastel-pink-btn mt-0.5">□</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <h3 className="font-bold text-gray-800 mb-2">アドバイス</h3>
                <ul className="space-y-1 mb-4">
                  {phase.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                      <span className="text-amber-400 mt-0.5">💡</span>
                      {tip}
                    </li>
                  ))}
                </ul>

                {phase.urgentSigns && (
                  <div className="bg-red-50 rounded-xl p-3">
                    <p className="font-bold text-red-700 text-sm mb-2">⚠️ すぐに病院へ連絡するサイン</p>
                    <ul className="space-y-1">
                      {phase.urgentSigns.map((sign, i) => (
                        <li key={i} className="text-red-600 text-sm flex items-start gap-1">
                          <span>•</span>{sign}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}
