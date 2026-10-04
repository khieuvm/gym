import { useCallback, useEffect, useState } from 'react'

const PREFIX = 'gym-coach:'

export function readStore<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

export function writeStore<T>(key: string, value: T) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // Bỏ qua khi localStorage đầy hoặc bị chặn
  }
}

export function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => readStore(key, initial))

  useEffect(() => {
    writeStore(key, value)
  }, [key, value])

  const reset = useCallback(() => setValue(initial), [initial])

  return [value, setValue, reset] as const
}

export function exportAllData() {
  const dump: Record<string, unknown> = {}
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (!k?.startsWith(PREFIX)) continue
    try {
      dump[k.slice(PREFIX.length)] = JSON.parse(localStorage.getItem(k) as string)
    } catch {
      dump[k.slice(PREFIX.length)] = localStorage.getItem(k)
    }
  }
  return dump
}

export function importAllData(dump: Record<string, unknown>) {
  for (const [k, v] of Object.entries(dump)) writeStore(k, v)
}

export function clearAllData() {
  const keys: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (k?.startsWith(PREFIX)) keys.push(k)
  }
  keys.forEach((k) => localStorage.removeItem(k))
}
