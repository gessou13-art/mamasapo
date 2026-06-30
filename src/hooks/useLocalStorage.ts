'use client'

import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) setStoredValue(JSON.parse(item))
    } catch {
      // ignore parse errors
    }
    setHydrated(true)

    const handleSync = (e: CustomEvent<string>) => {
      if (e.detail !== key) return
      try {
        const item = window.localStorage.getItem(key)
        if (item) setStoredValue(JSON.parse(item))
      } catch {}
    }
    window.addEventListener('local-storage-sync', handleSync as EventListener)
    return () => window.removeEventListener('local-storage-sync', handleSync as EventListener)
  }, [key])

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
        window.dispatchEvent(new CustomEvent('local-storage-sync', { detail: key }))
      }
    } catch {
      // ignore write errors
    }
  }

  return [storedValue, setValue, hydrated]
}
