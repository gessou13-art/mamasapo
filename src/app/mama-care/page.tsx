'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { useUserProfile } from '@/hooks/useUserProfile'
import mamaCareData from '@/data/mama-care.json'

export default function MamaCarePage() {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const { profile } = useUserProfile()

  const sections = mamaCareData.sections.filter((s) => {
    if (!s.deliveryMethodSpecific) return true
    return s.deliveryMethodSpecific.includes(profile.deliveryMethod as never)
  })

  return (
    <div>
      <PageHeader title="ママの体と心ケア" backHref="/" />

      <div className="bg-gradient-to-b from-pastel-lavender to-pastel-cream px-4 py-6">
        <h1 className="text-2xl font-bold text-purple-800">💆 ママのケア</h1>
        <p className="text-purple-600 mt-1 text-sm">産後のあなたの体と心を大切に</p>
      </div>

      <div className="page-content">
        <div className="bg-pastel-lavender rounded-2xl p-4 text-sm text-purple-800">
          💙 産後のママの体はまだ回復中です。無理しないで、ひとつひとつゆっくり向き合いましょう。
          心配なことがあれば、迷わず医師・助産師に相談してください。
        </div>

        <div className="space-y-2">
          {sections.map((section) => {
            const isOpen = openSection === section.id
            const isUrgent = section.id === 'consult-signs' || section.id === 'postpartum-depression'

            return (
              <div key={section.id} className={`rounded-2xl overflow-hidden shadow-sm ${isUrgent ? 'border-2 border-red-200' : ''}`}>
                <button
                  onClick={() => setOpenSection(isOpen ? null : section.id)}
                  className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
                    isOpen ? 'bg-pastel-lavender' : 'bg-white hover:bg-pastel-cream'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{section.icon}</span>
                    <div>
                      <p className="font-bold text-gray-800">{section.title}</p>
                      {isUrgent && <span className="text-xs text-red-600 font-medium">⚠️ 重要</span>}
                    </div>
                  </div>
                  <span className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 bg-pastel-cream space-y-3 pt-2">
                    <p className="text-gray-700 leading-relaxed">{section.content}</p>

                    {section.bulletPoints && (
                      <ul className="space-y-2">
                        {section.bulletPoints.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                            <span className="text-purple-400 mt-0.5">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.doctorVisitSigns && (
                      <div className="bg-red-50 rounded-xl p-3 mt-2">
                        <p className="font-bold text-red-700 text-sm mb-2">⚠️ 受診・相談のサイン</p>
                        <ul className="space-y-1">
                          {section.doctorVisitSigns.map((sign, i) => (
                            <li key={i} className="text-red-600 text-sm flex items-start gap-1">
                              <span>•</span>{sign}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <Card color="beige">
          <p className="text-sm text-gray-700 text-center leading-relaxed">
            📞 不安を感じたら一人で抱えないで<br />
            かかりつけ医・産院・助産師・自治体の
            保健師・相談窓口に連絡してください。
          </p>
        </Card>
      </div>
    </div>
  )
}
