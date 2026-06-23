'use client'

import { useState } from 'react'
import { useBabyAge } from '@/hooks/useBabyAge'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import weaningData from '@/data/weaning.json'
import type { WeaningStage, WeaningStageContent } from '@/types'

const STAGES: WeaningStage[] = ['開始前', '初期', '中期', '後期', '完了期']

function getAutoStage(ageInMonths: number | null): WeaningStage {
  if (ageInMonths === null || ageInMonths < 5) return '開始前'
  if (ageInMonths <= 6) return '初期'
  if (ageInMonths <= 8) return '中期'
  if (ageInMonths <= 11) return '後期'
  return '完了期'
}

export default function WeaningPage() {
  const ageInfo = useBabyAge()
  const autoStage = getAutoStage(ageInfo.ageInMonths)
  const [activeStage, setActiveStage] = useState<WeaningStage>(autoStage)
  const [subTab, setSubTab] = useState<'概要' | '食材' | 'メニュー' | 'アドバイス'>('概要')

  const data = (weaningData.stages as WeaningStageContent[]).find((s) => s.stage === activeStage)!

  return (
    <div>
      <PageHeader title="離乳食ナビ" backHref="/" />

      {/* Stage Tabs */}
      <div className="bg-white border-b border-gray-100 px-2 py-3">
        <div className="flex overflow-x-auto gap-2 scrollbar-hide">
          {STAGES.map((stage) => (
            <button
              key={stage}
              onClick={() => setActiveStage(stage)}
              className={`flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-medium transition-colors ${
                stage === activeStage ? 'bg-pastel-pink-btn text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {stage === autoStage ? `${stage} ★` : stage}
            </button>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-b from-pastel-mint to-pastel-cream px-4 py-5">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-xl font-bold text-emerald-800">🥣 {activeStage}</h1>
          {activeStage === autoStage && <Badge color="mint">今の時期</Badge>}
        </div>
        <div className="flex gap-4 text-sm text-emerald-700">
          <span>月齢：{data.ageRange}</span>
          <span>回数：{data.frequency}</span>
        </div>
        {data.texture !== '—' && (
          <p className="text-sm text-emerald-700 mt-1">固さ：{data.texture}</p>
        )}
      </div>

      {/* Sub Tabs */}
      <div className="bg-white border-b border-gray-100 flex">
        {(['概要', '食材', 'メニュー', 'アドバイス'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              subTab === tab ? 'border-pastel-pink-btn text-pastel-pink-btn' : 'border-transparent text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="page-content">
        {subTab === '概要' && (
          <div className="space-y-3">
            {data.amount !== '—' && (
              <Card color="mint">
                <h3 className="font-bold text-emerald-800 mb-2">量の目安</h3>
                <p className="text-emerald-700">{data.amount}</p>
              </Card>
            )}
            <Card>
              <h3 className="font-bold text-gray-800 mb-3">ポイント</h3>
              <ul className="space-y-2">
                {data.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-amber-400 mt-0.5">💡</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </Card>
            {data.allergyFoods.length > 0 && (
              <div className="bg-red-50 rounded-2xl p-4">
                <h3 className="font-bold text-red-700 mb-2">⚠️ アレルギー注意食材</h3>
                <ul className="space-y-1">
                  {data.allergyFoods.map((food, i) => (
                    <li key={i} className="text-red-600 text-sm flex items-start gap-1">
                      <span>•</span>{food}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-red-500 mt-2">
                  ※新しい食材は1種類ずつ、午前中に少量から試してください
                </p>
              </div>
            )}
          </div>
        )}

        {subTab === '食材' && (
          <div className="space-y-3">
            {data.foods.length === 0 ? (
              <Card>
                <p className="text-gray-500 text-center">この段階ではまだ離乳食を開始しません。</p>
              </Card>
            ) : (
              data.foods.map((category) => (
                <Card key={category.category}>
                  <h3 className="font-bold text-gray-800 mb-3">{category.category}</h3>
                  <div className="space-y-2">
                    {category.items.map((item) => (
                      <div key={item.name} className={`flex items-start gap-3 p-2 rounded-xl ${item.allergyRisk ? 'bg-red-50' : ''}`}>
                        <span className={`text-sm mt-0.5 ${item.allowed ? 'text-emerald-500' : 'text-red-500'}`}>
                          {item.allowed ? '✓' : '✗'}
                        </span>
                        <div>
                          <span className="text-gray-800 text-sm font-medium">{item.name}</span>
                          {item.note && <p className="text-xs text-gray-500 mt-0.5">{item.note}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {subTab === 'メニュー' && (
          <div className="space-y-3">
            {data.sampleMenu.length === 0 ? (
              <Card><p className="text-gray-500 text-center">この段階ではまだ離乳食を開始しません。</p></Card>
            ) : (
              <>
                <div className="bg-pastel-mint rounded-2xl p-3 text-sm text-emerald-800">
                  💡 あくまでサンプルです。赤ちゃんの様子に合わせて調整してください。
                </div>
                {data.sampleMenu.map((menu) => (
                  <Card key={menu.day}>
                    <h3 className="font-bold text-gray-800 mb-2">{menu.day}</h3>
                    <div className="space-y-1 text-sm text-gray-700">
                      {menu.breakfast && <p>朝：{menu.breakfast}</p>}
                      {menu.lunch && <p>昼：{menu.lunch}</p>}
                      {menu.dinner && <p>夕：{menu.dinner}</p>}
                    </div>
                  </Card>
                ))}
              </>
            )}
          </div>
        )}

        {subTab === 'アドバイス' && (
          <div className="space-y-3">
            {data.wontEatTips.length > 0 && (
              <Card color="beige">
                <h3 className="font-bold text-gray-800 mb-3">😢 食べない時の対応</h3>
                <ul className="space-y-2">
                  {data.wontEatTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                      <span className="text-amber-400 mt-0.5">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
            <div className="bg-pastel-mint rounded-2xl p-4 text-sm text-emerald-800">
              ℹ️ 離乳食の情報は厚生労働省・こども家庭庁「授乳・離乳の支援ガイド」を参考にしています。
              個別の状況は医師・栄養士・保健師に相談してください。
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
