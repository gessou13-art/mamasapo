'use client'

import { useState, ReactNode } from 'react'

interface AccordionProps {
  question: string
  children: ReactNode
  urgent?: boolean
}

export function Accordion({ question, children, urgent }: AccordionProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        className="w-full flex items-start justify-between p-4 text-left bg-white hover:bg-pastel-cream transition-colors"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-start gap-2 flex-1">
          {urgent && <span className="text-red-500 text-sm mt-0.5">⚠️</span>}
          <span className="text-gray-800 font-medium leading-relaxed">{question}</span>
        </div>
        <span className={`text-gray-400 ml-2 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 bg-pastel-cream">
          <div className="text-gray-700 leading-relaxed whitespace-pre-line text-base pt-2">
            {children}
          </div>
          {urgent && (
            <div className="mt-3 p-3 bg-red-50 rounded-xl text-red-700 text-sm">
              ⚠️ 不安を感じたら、すぐに医師・助産師・小児科・自治体の窓口に相談してください
            </div>
          )}
        </div>
      )}
    </div>
  )
}
