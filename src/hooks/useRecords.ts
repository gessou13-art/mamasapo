'use client'

import { useLocalStorage } from './useLocalStorage'
import type { AnyRecord, RecordType } from '@/types'

export function useRecords() {
  const [records, setRecords] = useLocalStorage<AnyRecord[]>('mama-navi-records', [])
  // hydrated ignored here — records can be empty on first render safely

  const addRecord = (record: AnyRecord) => {
    setRecords((prev) => [record, ...prev])
  }

  const deleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id))
  }

  const getRecordsByType = (type: RecordType): AnyRecord[] => {
    return records.filter((r) => r.type === type)
  }

  const getTodayRecords = (): AnyRecord[] => {
    const today = new Date().toISOString().slice(0, 10)
    return records.filter((r) => r.timestamp.startsWith(today))
  }

  return { records, addRecord, deleteRecord, getRecordsByType, getTodayRecords }
}
