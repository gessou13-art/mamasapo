'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useChecklist } from '@/hooks/useChecklist'
import checklistData from '@/data/checklist.json'
import type { ChecklistItemData } from '@/types'

export default function ChecklistPage() {
  const [activeCat, setActiveCat] = useState(checklistData.categories[0].id)
  const { checkedItems, toggleItem, getCategoryProgress, getOverallProgress } = useChecklist()

  const overall = getOverallProgress()
  const category = checklistData.categories.find((c) => c.id === activeCat)!

  return (
    <div>
      <PageHeader title="チェックリスト" backHref="/" />

      {/* Overall Progress */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <ProgressBar percent={overall.percent} label={`全体 ${overall.checked}/${overall.total} 完了`} />
      </div>

      {/* Category Tabs */}
      <div className="bg-white border-b border-gray-100">
        <div className="flex overflow-x-auto scrollbar-hide">
          {checklistData.categories.map((cat) => {
            const prog = getCategoryProgress(cat.id)
            const isActive = cat.id === activeCat
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`flex-shrink-0 px-3 py-3 text-center transition-colors border-b-2 ${
                  isActive ? 'border-pastel-pink-btn text-pastel-pink-btn' : 'border-transparent text-gray-500'
                }`}
              >
                <span className="text-xl block">{cat.icon}</span>
                <span className="text-xs font-medium whitespace-nowrap">{cat.title}</span>
                <span className="text-xs text-gray-400 block">{prog.checked}/{prog.total}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="page-content">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold text-gray-800">{category.icon} {category.title}</h2>
          <span className="text-sm text-gray-500">
            {getCategoryProgress(activeCat).percent}%完了
          </span>
        </div>

        <div className="space-y-2">
          {(category.items as ChecklistItemData[]).map((item) => {
            const checked = !!checkedItems[item.id]
            return (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`w-full flex items-start gap-3 p-4 rounded-2xl shadow-sm text-left transition-colors ${
                  checked ? 'bg-pastel-mint' : 'bg-white'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 border-2 transition-colors ${
                  checked ? 'bg-pastel-mint-deep border-pastel-mint-deep' : 'border-gray-300'
                }`}>
                  {checked && <span className="text-white text-xs font-bold">✓</span>}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${checked ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                    {item.text}
                  </p>
                  {item.note && (
                    <p className="text-xs text-gray-400 mt-0.5">{item.note}</p>
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-pastel-lavender text-purple-700 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {getCategoryProgress(activeCat).percent === 100 && (
          <Card color="mint">
            <p className="text-center text-emerald-700 font-bold">🎉 このカテゴリは完了です！</p>
          </Card>
        )}
      </div>
    </div>
  )
}
