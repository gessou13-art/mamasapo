'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Accordion } from '@/components/ui/Accordion'
import qaData from '@/data/qa.json'
import type { QAItem, QACategory } from '@/types'

export default function QAPage() {
  const [activeCat, setActiveCat] = useState<string | null>(null)
  const [search, setSearch] = useState('')

const filteredItems = search
    ? (qaData.categories as QACategory[]).flatMap((c) =>
        c.items.filter((q) =>
          q.question.includes(search) || q.answer.includes(search)
        ).map((q) => ({ ...q, categoryTitle: c.title }))
      )
    : []

  const activeCategory = (qaData.categories as QACategory[]).find((c) => c.id === activeCat)

  return (
    <div>
      <PageHeader title="不安解消Q&A" backHref="/" />

      {/* Search */}
      <div className="px-4 py-3 bg-white border-b border-gray-100">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 悩みを検索（例：泣き止まない、発熱）"
          className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-sm focus:border-pastel-pink-btn focus:outline-none"
        />
      </div>

      <div className="page-content">
        {search && filteredItems.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-500">{filteredItems.length}件見つかりました</p>
            {filteredItems.map((q) => (
              <Accordion key={q.id} question={q.question} urgent={q.urgent}>
                {q.answer}
              </Accordion>
            ))}
          </div>
        ) : search && filteredItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>「{search}」の検索結果がありません</p>
            <p className="text-sm mt-2">カテゴリから探してみてください</p>
          </div>
        ) : activeCat && activeCategory ? (
          <div className="space-y-2">
            <button
              onClick={() => setActiveCat(null)}
              className="flex items-center gap-2 text-pastel-pink-btn text-sm font-medium mb-2"
            >
              ‹ カテゴリ一覧に戻る
            </button>
            <h2 className="section-title mb-3">{activeCategory.icon} {activeCategory.title}</h2>
            {activeCategory.items.map((q) => (
              <Accordion key={q.id} question={q.question} urgent={q.urgent}>
                {q.answer}
              </Accordion>
            ))}
          </div>
        ) : (
          <>
            <h2 className="section-title mb-3">カテゴリから探す</h2>
            <div className="grid grid-cols-2 gap-3">
              {(qaData.categories as QACategory[]).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm active:scale-95 transition-transform text-left"
                >
                  <span className="text-3xl">{cat.icon}</span>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{cat.title}</p>
                    <p className="text-xs text-gray-400">{cat.items.length}件</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-pastel-beige rounded-2xl p-4 text-sm text-gray-700">
              <p className="font-medium mb-1">🏥 こんな時はすぐに相談を</p>
              <ul className="space-y-1 text-gray-600">
                <li>• 生後3ヶ月未満の発熱（38℃以上）</li>
                <li>• 赤ちゃんがぐったりしている</li>
                <li>• 水分がとれない</li>
                <li>• けいれんした</li>
                <li>• ママが死にたいと感じる</li>
              </ul>
              <p className="text-xs text-gray-500 mt-2">
                迷ったら産院・小児科・自治体の窓口に相談してください
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
