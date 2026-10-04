export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'arms'
  | 'legs'
  | 'glutes'
  | 'core'
  | 'mobility'

export const GROUP_LABEL: Record<MuscleGroup, string> = {
  chest: 'Ngực',
  back: 'Lưng',
  shoulders: 'Vai',
  arms: 'Tay',
  legs: 'Chân',
  glutes: 'Mông / Đùi sau',
  core: 'Core / Bụng',
  mobility: 'Giãn cơ & Linh hoạt',
}

export type Exercise = {
  id: string
  name: string
  nameEn: string
  group: MuscleGroup
  equipment: string
  level: string
  mechanic: string | null
  primaryMuscles: string[]
  images: string[]
  instructionsEn: string[]
  howTo: string[]
  cues: string[]
  mistakes: string[]
  video?: ExerciseVideo
  youtubeSearch: string
}

export type ExerciseVideo = {
  url: string
  format: string
  durationSec: number | null
  wgerName: string
  license: string
  author: string
  source: string
}

export type SetPrescription = {
  exerciseId: string
  sets: number
  reps: string
  restSec: number
  rpe?: string
  note?: string
  superset?: string
}

export type SessionType = 'gym' | 'cardio' | 'sport' | 'mobility' | 'rest'

export type Session = {
  id: string
  name: string
  type: SessionType
  focus: string
  durationMin: number
  why: string
  warmup: string[]
  blocks: SetPrescription[]
  cooldown: string[]
}

export type DayPlan = {
  key: string
  label: string
  short: string
  sessionIds: string[]
  note: string
}

export type FoodUnit = {
  label: string
  grams: number
  hint?: string
}

export type Food = {
  id: string
  name: string
  category: FoodCategory
  per100g: { kcal: number; protein: number; carb: number; fat: number; fiber?: number }
  units: FoodUnit[]
  note?: string
}

export type FoodCategory = 'protein' | 'carb' | 'veg' | 'fat' | 'fruit' | 'drink' | 'avoid'

export const FOOD_CATEGORY_LABEL: Record<FoodCategory, string> = {
  protein: 'Đạm',
  carb: 'Tinh bột',
  veg: 'Rau',
  fat: 'Chất béo',
  fruit: 'Trái cây',
  drink: 'Đồ uống',
  avoid: 'Hạn chế',
}
