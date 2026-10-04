import type { SessionType } from './types'

export type Goal = 'recomp' | 'cut' | 'leanbulk'

export type Profile = {
  heightCm: number
  weightKg: number
  age: number
  proteinPerKg: number
  fatPerKg: number
  goal: Goal
  neatFactor: number
}

export const DEFAULT_PROFILE: Profile = {
  heightCm: 171,
  weightKg: 62,
  age: 28,
  proteinPerKg: 2.0,
  fatPerKg: 0.9,
  goal: 'recomp',
  // 1.25 = công việc văn phòng, ngồi nhiều nhưng có đứng dậy đi lại
  neatFactor: 1.25,
}

export const GOAL_LABEL: Record<Goal, string> = {
  recomp: 'Tái cấu trúc cơ thể (tăng cơ + giảm mỡ cùng lúc)',
  cut: 'Ưu tiên giảm mỡ',
  leanbulk: 'Ưu tiên tăng cơ',
}

export const GOAL_ADJUST: Record<Goal, number> = {
  recomp: -0.05,
  cut: -0.15,
  leanbulk: 0.1,
}

// Ước lượng năng lượng tiêu hao thêm cho mỗi loại buổi tập (kcal)
export const SESSION_BURN: Record<string, number> = {
  'upper-a': 300,
  'lower-a': 350,
  'upper-b': 300,
  'lower-b': 330,
  'ride-to-work': 750,
  'ride-home': 700,
  football: 700,
  'desk-reset': 40,
  'rest-day': 0,
}

/** Mifflin–St Jeor cho nam giới. */
export function bmr(p: Profile) {
  return 10 * p.weightKg + 6.25 * p.heightCm - 5 * p.age + 5
}

export function restingBurn(p: Profile) {
  return bmr(p) * p.neatFactor
}

export function dayTdee(p: Profile, sessionIds: string[]) {
  const extra = sessionIds.reduce((sum, id) => sum + (SESSION_BURN[id] ?? 0), 0)
  return Math.round(restingBurn(p) + extra)
}

export type MacroTarget = {
  kcal: number
  protein: number
  carb: number
  fat: number
  tdee: number
}

export function macroTarget(p: Profile, sessionIds: string[]): MacroTarget {
  const tdee = dayTdee(p, sessionIds)
  const kcal = Math.round(tdee * (1 + GOAL_ADJUST[p.goal]))
  const protein = Math.round(p.weightKg * p.proteinPerKg)
  const fat = Math.round(p.weightKg * p.fatPerKg)
  const carb = Math.max(0, Math.round((kcal - protein * 4 - fat * 9) / 4))
  return { kcal, protein, carb, fat, tdee }
}

export function sessionTypeLabel(t: SessionType) {
  return {
    gym: 'Phòng tập',
    cardio: 'Đạp xe',
    sport: 'Thể thao',
    mobility: 'Giãn cơ',
    rest: 'Nghỉ',
  }[t]
}

/**
 * Ước lượng % mỡ cơ thể theo công thức US Navy (nam), đơn vị cm.
 * Dùng thước dây thay cho cân — phù hợp khi nhà không có cân.
 */
export function navyBodyFat(waistCm: number, neckCm: number, heightCm: number) {
  if (waistCm <= neckCm || heightCm <= 0) return null
  const value =
    495 /
      (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) -
    450
  if (!Number.isFinite(value) || value <= 0) return null
  return Math.round(value * 10) / 10
}

/** Tỉ lệ vòng bụng trên chiều cao — chỉ số dự báo mỡ nội tạng tốt hơn BMI. */
export function waistToHeight(waistCm: number, heightCm: number) {
  if (!waistCm || !heightCm) return null
  return Math.round((waistCm / heightCm) * 1000) / 1000
}

export function waistVerdict(ratio: number | null) {
  if (ratio === null) return { text: 'Chưa có dữ liệu', tone: 'muted' as const }
  if (ratio < 0.43) return { text: 'Rất gầy', tone: 'warn' as const }
  if (ratio < 0.46) return { text: 'Rõ cơ bụng', tone: 'good' as const }
  if (ratio < 0.5) return { text: 'Khoẻ mạnh', tone: 'good' as const }
  if (ratio < 0.53) return { text: 'Hơi dư mỡ bụng', tone: 'warn' as const }
  return { text: 'Dư mỡ bụng', tone: 'bad' as const }
}
