'use client'

import { useLocalStorage } from './useLocalStorage'
import checklistData from '@/data/checklist.json'
import type { ChecklistState } from '@/types'

const DEFAULT_STATE: ChecklistState = { checkedItems: {}, lastUpdated: '' }

export function useChecklist() {
  const [state, setState] = useLocalStorage<ChecklistState>('mama-navi-checklist', DEFAULT_STATE)

  const toggleItem = (itemId: string) => {
    setState((prev) => ({
      checkedItems: { ...prev.checkedItems, [itemId]: !prev.checkedItems[itemId] },
      lastUpdated: new Date().toISOString(),
    }))
  }

  const getCategoryProgress = (categoryId: string) => {
    const cat = checklistData.categories.find((c) => c.id === categoryId)
    if (!cat) return { checked: 0, total: 0, percent: 0 }
    const total = cat.items.length
    const checked = cat.items.filter((i) => state.checkedItems[i.id]).length
    return { checked, total, percent: total === 0 ? 0 : Math.round((checked / total) * 100) }
  }

  const getOverallProgress = () => {
    const allItems = checklistData.categories.flatMap((c) => c.items)
    const total = allItems.length
    const checked = allItems.filter((i) => state.checkedItems[i.id]).length
    return { checked, total, percent: total === 0 ? 0 : Math.round((checked / total) * 100) }
  }

  return { checkedItems: state.checkedItems, toggleItem, getCategoryProgress, getOverallProgress }
}
