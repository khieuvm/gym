import { readStore, writeStore } from './storage'

export type SetEntry = { weight: string; reps: string }
export type WorkoutLog = Record<string, SetEntry[]> // khoá: `${ngày}__${mã bài tập}`

const KEY = 'workout-log'

export const logKey = (iso: string, exerciseId: string) => `${iso}__${exerciseId}`

export function loadLog(): WorkoutLog {
  return readStore<WorkoutLog>(KEY, {})
}

export function saveLog(log: WorkoutLog) {
  writeStore(KEY, log)
}

/** Buổi gần nhất trước ngày `iso` có ghi lại bài tập này. */
export function previousEntry(log: WorkoutLog, iso: string, exerciseId: string) {
  const suffix = `__${exerciseId}`
  const dates = Object.keys(log)
    .filter((k) => k.endsWith(suffix) && k.slice(0, 10) < iso && log[k]?.some((s) => s.weight || s.reps))
    .map((k) => k.slice(0, 10))
    .sort()
  const last = dates.at(-1)
  return last ? { date: last, sets: log[logKey(last, exerciseId)] } : null
}

export function bestSet(log: WorkoutLog, exerciseId: string) {
  const suffix = `__${exerciseId}`
  let best: { weight: number; reps: number; date: string } | null = null
  for (const [k, sets] of Object.entries(log)) {
    if (!k.endsWith(suffix)) continue
    for (const s of sets) {
      const w = Number.parseFloat(s.weight)
      const r = Number.parseInt(s.reps, 10)
      if (!Number.isFinite(w) || !Number.isFinite(r)) continue
      if (!best || w > best.weight || (w === best.weight && r > best.reps)) {
        best = { weight: w, reps: r, date: k.slice(0, 10) }
      }
    }
  }
  return best
}

export function loggedDates(log: WorkoutLog) {
  const dates = new Set<string>()
  for (const [k, sets] of Object.entries(log)) {
    if (sets.some((s) => s.weight || s.reps)) dates.add(k.slice(0, 10))
  }
  return [...dates].sort()
}

/** Tổng khối lượng nâng (kg × lần) theo từng ngày — dùng để vẽ biểu đồ tiến bộ. */
export function volumeByDate(log: WorkoutLog) {
  const map = new Map<string, number>()
  for (const [k, sets] of Object.entries(log)) {
    const date = k.slice(0, 10)
    let v = 0
    for (const s of sets) {
      const w = Number.parseFloat(s.weight)
      const r = Number.parseInt(s.reps, 10)
      if (Number.isFinite(w) && Number.isFinite(r)) v += w * r
    }
    if (v > 0) map.set(date, (map.get(date) ?? 0) + v)
  }
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([date, volume]) => ({ date, volume }))
}
