'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useRecords } from '@/hooks/useRecords'
import type { RecordType, AnyRecord } from '@/types'

const RECORD_TYPES: { type: RecordType; icon: string; label: string }[] = [
  { type: '授乳', icon: '🤱', label: '授乳' },
  { type: 'ミルク', icon: '🍼', label: 'ミルク' },
  { type: 'おむつ', icon: '🧷', label: 'おむつ' },
  { type: '睡眠', icon: '😴', label: '睡眠' },
  { type: '体温', icon: '🌡️', label: '体温' },
  { type: '体重', icon: '⚖️', label: '体重' },
  { type: '身長', icon: '📏', label: '身長' },
  { type: '離乳食', icon: '🥣', label: '離乳食' },
  { type: 'ママの体調', icon: '💆', label: 'ママの体調' },
  { type: 'ママの気分', icon: '💭', label: 'ママの気分' },
  { type: 'メモ', icon: '📝', label: 'メモ' },
]

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function RecordForm({ type, onSave, onCancel }: {
  type: RecordType
  onSave: (record: AnyRecord) => void
  onCancel: () => void
}) {
  const [note, setNote] = useState('')
  const [side, setSide] = useState<'左' | '右' | '両方'>('両方')
  const [duration, setDuration] = useState('')
  const [amount, setAmount] = useState('')
  const [diaperType, setDiaperType] = useState<'小' | '大' | '両方'>('小')
  const [celsius, setCelsius] = useState('')
  const [grams, setGrams] = useState('')
  const [cm, setCm] = useState('')
  const [amountLevel, setAmountLevel] = useState<'少し' | '半分' | 'だいたい' | '全部'>('少し')
  const [condition, setCondition] = useState<'良い' | '普通' | '疲れた' | '辛い'>('普通')
  const [mood, setMood] = useState<'😊' | '😐' | '😢' | '😤' | '😴'>('😊')

  const handleSave = () => {
    const base = { id: generateId(), timestamp: new Date().toISOString(), note }
    let record: AnyRecord

    switch (type) {
      case '授乳':
        record = { ...base, type, side, durationMinutes: parseInt(duration) || 0 }
        break
      case 'ミルク':
        record = { ...base, type, amountMl: parseInt(amount) || 0 }
        break
      case 'おむつ':
        record = { ...base, type, diaperType }
        break
      case '睡眠':
        record = { ...base, type, startTime: new Date().toTimeString().slice(0, 5), endTime: null, durationMinutes: null }
        break
      case '体温':
        record = { ...base, type, celsius: parseFloat(celsius) || 36.5 }
        break
      case '体重':
        record = { ...base, type, grams: Math.round(parseFloat(grams) * 1000) || 0 }
        break
      case '身長':
        record = { ...base, type, cm: parseFloat(cm) || 0 }
        break
      case '離乳食':
        record = { ...base, type, amountLevel, foodsEaten: note }
        break
      case 'ママの体調':
        record = { ...base, type, condition }
        break
      case 'ママの気分':
        record = { ...base, type, mood }
        break
      default:
        record = { ...base, type: 'メモ', content: note }
    }

    onSave(record)
  }

  return (
    <div className="space-y-4">
      {type === '授乳' && (
        <>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">どちらから？</p>
            <div className="flex gap-2">
              {(['左', '右', '両方'] as const).map((s) => (
                <button key={s} onClick={() => setSide(s)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium ${side === s ? 'bg-pastel-pink-btn text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">時間（分）</p>
            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)}
              placeholder="例：15" className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-pastel-pink-btn focus:outline-none" />
          </div>
        </>
      )}
      {type === 'ミルク' && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">量（mL）</p>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
            placeholder="例：100" className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-pastel-pink-btn focus:outline-none" />
        </div>
      )}
      {type === 'おむつ' && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">おむつの種類</p>
          <div className="flex gap-2">
            {(['小', '大', '両方'] as const).map((d) => (
              <button key={d} onClick={() => setDiaperType(d)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium ${diaperType === d ? 'bg-pastel-pink-btn text-white' : 'bg-gray-100 text-gray-600'}`}>
                {d === '小' ? 'おしっこ' : d === '大' ? 'うんち' : '両方'}
              </button>
            ))}
          </div>
        </div>
      )}
      {type === '体温' && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">体温（℃）</p>
          <input type="number" step="0.1" value={celsius} onChange={(e) => setCelsius(e.target.value)}
            placeholder="例：36.8" className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-pastel-pink-btn focus:outline-none" />
          {parseFloat(celsius) >= 38 && (
            <p className="text-red-600 text-sm mt-1">⚠️ 38℃以上です。かかりつけ医に相談を</p>
          )}
        </div>
      )}
      {type === '体重' && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">体重（kg）</p>
          <input type="number" step="0.01" value={grams} onChange={(e) => setGrams(e.target.value)}
            placeholder="例：4.5" className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-pastel-pink-btn focus:outline-none" />
        </div>
      )}
      {type === '身長' && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">身長（cm）</p>
          <input type="number" step="0.1" value={cm} onChange={(e) => setCm(e.target.value)}
            placeholder="例：55.0" className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-pastel-pink-btn focus:outline-none" />
        </div>
      )}
      {type === '離乳食' && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">食べた量</p>
          <div className="grid grid-cols-2 gap-2">
            {(['少し', '半分', 'だいたい', '全部'] as const).map((l) => (
              <button key={l} onClick={() => setAmountLevel(l)}
                className={`py-2 rounded-xl text-sm font-medium ${amountLevel === l ? 'bg-pastel-pink-btn text-white' : 'bg-gray-100 text-gray-600'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>
      )}
      {type === 'ママの体調' && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">体調は？</p>
          <div className="grid grid-cols-2 gap-2">
            {(['良い', '普通', '疲れた', '辛い'] as const).map((c) => (
              <button key={c} onClick={() => setCondition(c)}
                className={`py-2 rounded-xl text-sm font-medium ${condition === c ? 'bg-pastel-pink-btn text-white' : 'bg-gray-100 text-gray-600'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
      {type === 'ママの気分' && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">今の気分は？</p>
          <div className="flex justify-around">
            {(['😊', '😐', '😢', '😤', '😴'] as const).map((m) => (
              <button key={m} onClick={() => setMood(m)}
                className={`text-4xl p-2 rounded-2xl transition-transform ${mood === m ? 'scale-125 bg-pastel-pink' : ''}`}>
                {m}
              </button>
            ))}
          </div>
        </div>
      )}

      {type !== '離乳食' && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">メモ（任意）</p>
          <textarea value={note} onChange={(e) => setNote(e.target.value)}
            placeholder="気になることなど自由に"
            rows={2}
            className="w-full border-2 border-gray-200 rounded-xl p-3 resize-none focus:border-pastel-pink-btn focus:outline-none" />
        </div>
      )}
      {type === 'メモ' && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">内容</p>
          <textarea value={note} onChange={(e) => setNote(e.target.value)}
            placeholder="自由に書いてください"
            rows={4}
            className="w-full border-2 border-gray-200 rounded-xl p-3 resize-none focus:border-pastel-pink-btn focus:outline-none" />
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <Button variant="secondary" onClick={onCancel}>キャンセル</Button>
        <Button fullWidth onClick={handleSave}>記録する</Button>
      </div>
    </div>
  )
}

function formatTime(timestamp: string) {
  const d = new Date(timestamp)
  return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`
}

function RecordLabel(record: AnyRecord): string {
  switch (record.type) {
    case '授乳': return `${record.side}・${record.durationMinutes}分`
    case 'ミルク': return `${record.amountMl}mL`
    case 'おむつ': return record.diaperType === '小' ? 'おしっこ' : record.diaperType === '大' ? 'うんち' : 'おしっこ＋うんち'
    case '体温': return `${record.celsius}℃`
    case '体重': return `${(record.grams / 1000).toFixed(2)}kg`
    case '身長': return `${record.cm}cm`
    case '離乳食': return record.amountLevel
    case 'ママの体調': return record.condition
    case 'ママの気分': return record.mood
    case 'メモ': return record.content?.slice(0, 20) ?? ''
    default: return ''
  }
}

export default function RecordPage() {
  const [selectedType, setSelectedType] = useState<RecordType | null>(null)
  const [saved, setSaved] = useState(false)
  const { addRecord, getTodayRecords } = useRecords()
  const todayRecords = getTodayRecords()

  const handleSave = (record: AnyRecord) => {
    addRecord(record)
    setSelectedType(null)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <PageHeader title="記録する" backHref="/" />

      {saved && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 bg-pastel-mint text-emerald-800 px-6 py-3 rounded-2xl shadow-lg z-50 text-sm font-medium">
          ✓ 記録しました！
        </div>
      )}

      <div className="page-content">
        {selectedType ? (
          <Card>
            <h2 className="font-bold text-gray-800 mb-4">
              {RECORD_TYPES.find((r) => r.type === selectedType)?.icon} {selectedType}を記録
            </h2>
            <RecordForm type={selectedType} onSave={handleSave} onCancel={() => setSelectedType(null)} />
          </Card>
        ) : (
          <>
            <h2 className="section-title mb-3">何を記録しますか？</h2>
            <div className="grid grid-cols-3 gap-3">
              {RECORD_TYPES.map((r) => (
                <button
                  key={r.type}
                  onClick={() => setSelectedType(r.type)}
                  className="bg-white rounded-2xl p-4 flex flex-col items-center gap-1 shadow-sm active:scale-95 transition-transform"
                >
                  <span className="text-3xl">{r.icon}</span>
                  <span className="text-xs text-gray-600 font-medium text-center">{r.label}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Today's Records */}
        {todayRecords.length > 0 && !selectedType && (
          <div>
            <h2 className="section-title mb-3">今日の記録（{todayRecords.length}件）</h2>
            <div className="space-y-2">
              {todayRecords.slice(0, 20).map((record) => {
                const typeInfo = RECORD_TYPES.find((r) => r.type === record.type)
                return (
                  <Card key={record.id}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{typeInfo?.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{record.type}</p>
                        <p className="text-sm text-gray-500">{RecordLabel(record)}</p>
                      </div>
                      <span className="text-xs text-gray-400">{formatTime(record.timestamp)}</span>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
