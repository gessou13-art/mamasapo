'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserProfile } from '@/hooks/useUserProfile'
import { Button } from '@/components/ui/Button'
import type { DeliveryMethod, FeedingMethod } from '@/types'

const STEPS = ['日付の設定', 'あかちゃんの情報', '授乳方法', '準備完了'] as const

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [dateType, setDateType] = useState<'due' | 'birth'>('due')
  const [dateValue, setDateValue] = useState('')
  const [babyName, setBabyName] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('未定')
  const [feedingMethod, setFeedingMethod] = useState<FeedingMethod>('未定')
  const { updateProfile } = useUserProfile()
  const router = useRouter()

  const handleFinish = () => {
    updateProfile({
      babyName: babyName || 'あかちゃん',
      birthDate: dateType === 'birth' ? dateValue : null,
      dueDate: dateType === 'due' ? dateValue : null,
      deliveryMethod,
      feedingMethod,
      notificationsEnabled: false,
      onboardingCompleted: true,
      createdAt: new Date().toISOString(),
    })
    router.replace('/')
  }

  return (
    <div className="min-h-screen bg-pastel-cream flex flex-col">
      {/* Header */}
      <div className="bg-pastel-pink p-6 text-center">
        <h1 className="text-2xl font-bold text-pink-800">🌸 はじめてママナビ</h1>
        <p className="text-pink-700 text-sm mt-1">はじめての育児を、一緒にナビゲートします</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 py-4 px-6">
        {STEPS.map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              i === step ? 'bg-pastel-pink-btn text-white' :
              i < step ? 'bg-pastel-mint text-emerald-700' : 'bg-gray-200 text-gray-400'
            }`}>
              {i < step ? '✓' : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-8 h-0.5 ${i < step ? 'bg-pastel-mint' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-gray-500 mb-2">{STEPS[step]}</p>

      {/* Content */}
      <div className="flex-1 px-6 py-4">
        {step === 0 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-gray-700 mb-4 leading-relaxed">
                出産予定日か、赤ちゃんの誕生日を教えてください。月齢に合わせた情報をお届けします。
              </p>
              <div className="flex gap-2 mb-4">
                <button
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${dateType === 'due' ? 'bg-pastel-pink-btn text-white' : 'bg-gray-100 text-gray-600'}`}
                  onClick={() => setDateType('due')}
                >
                  出産予定日
                </button>
                <button
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${dateType === 'birth' ? 'bg-pastel-pink-btn text-white' : 'bg-gray-100 text-gray-600'}`}
                  onClick={() => setDateType('birth')}
                >
                  誕生日
                </button>
              </div>
              <input
                type="date"
                value={dateValue}
                onChange={(e) => setDateValue(e.target.value)}
                className="w-full border-2 border-pastel-pink rounded-xl p-3 text-lg text-center focus:outline-none focus:border-pastel-pink-btn"
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <label className="block text-gray-700 font-medium mb-2">
                赤ちゃんの名前・ニックネーム
              </label>
              <input
                type="text"
                value={babyName}
                onChange={(e) => setBabyName(e.target.value)}
                placeholder="例：たろう、はなちゃん"
                className="w-full border-2 border-pastel-pink rounded-xl p-3 text-base focus:outline-none focus:border-pastel-pink-btn"
              />
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <label className="block text-gray-700 font-medium mb-3">出産方法</label>
              <div className="grid grid-cols-3 gap-2">
                {(['未定', '自然分娩', '帝王切開'] as DeliveryMethod[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setDeliveryMethod(m)}
                    className={`py-2 px-1 rounded-xl text-sm font-medium transition-colors ${deliveryMethod === m ? 'bg-pastel-pink-btn text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <label className="block text-gray-700 font-medium mb-3">授乳方法</label>
              <div className="grid grid-cols-2 gap-2">
                {(['未定', '母乳', 'ミルク', '混合'] as FeedingMethod[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setFeedingMethod(m)}
                    className={`py-3 rounded-xl text-base font-medium transition-colors ${feedingMethod === m ? 'bg-pastel-pink-btn text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">
                授乳方法は後から変更できます。未定でも大丈夫です。
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="text-5xl mb-4">🌸</div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">準備ができました！</h2>
              <p className="text-gray-600 leading-relaxed">
                {babyName || 'あかちゃん'}との育児を、
                はじめてママナビが一緒にサポートします。<br /><br />
                完璧じゃなくて大丈夫。<br />
                ひとつずつ進んでいきましょう。
              </p>
            </div>
            <div className="bg-pastel-mint rounded-2xl p-4 text-sm text-emerald-800">
              ℹ️ アプリ内の情報は一般的な目安です。心配なことがあれば医師・助産師・保健師に相談してください。
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="px-6 pb-8 flex gap-3">
        {step > 0 && (
          <Button variant="secondary" onClick={() => setStep(step - 1)}>
            戻る
          </Button>
        )}
        {step < STEPS.length - 1 ? (
          <Button
            fullWidth
            onClick={() => setStep(step + 1)}
            disabled={step === 0 && !dateValue}
          >
            次へ →
          </Button>
        ) : (
          <Button fullWidth onClick={handleFinish}>
            アプリを始める 🌸
          </Button>
        )}
      </div>
    </div>
  )
}
