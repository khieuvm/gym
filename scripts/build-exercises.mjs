// Sinh src/data/exercises.generated.json từ free-exercise-db (Unlicense / public domain).
// Chạy: npm run data:exercises
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const SOURCE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json'
const IMAGE_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises'

const WANTED = [
  'Barbell_Bench_Press_-_Medium_Grip',
  'Incline_Dumbbell_Press',
  'Leverage_Chest_Press',
  'Butterfly',
  'Dumbbell_Flyes',
  'Dumbbell_Shoulder_Press',
  'Side_Lateral_Raise',
  'Face_Pull',
  'Triceps_Pushdown_-_Rope_Attachment',
  'Close-Grip_Barbell_Bench_Press',
  'Dips_-_Triceps_Version',
  'Pullups',
  'Chin-Up',
  'Wide-Grip_Lat_Pulldown',
  'Close-Grip_Front_Lat_Pulldown',
  'Seated_Cable_Rows',
  'Bent_Over_Barbell_Row',
  'Cable_Rear_Delt_Fly',
  'Barbell_Curl',
  'Hammer_Curls',
  'Preacher_Curl',
  'Barbell_Squat',
  'Front_Squat_Clean_Grip',
  'Leg_Press',
  'Split_Squat_with_Dumbbells',
  'Bodyweight_Walking_Lunge',
  'Romanian_Deadlift',
  'Barbell_Deadlift',
  'Barbell_Hip_Thrust',
  'Lying_Leg_Curls',
  'Seated_Leg_Curl',
  'Leg_Extensions',
  'Standing_Calf_Raises',
  'Seated_Calf_Raise',
  'Hyperextensions_Back_Extensions',
  'Good_Morning',
  'Plank',
  'Side_Bridge',
  'Dead_Bug',
  'Hanging_Leg_Raise',
  'Cable_Crunch',
  'Reverse_Crunch',
  'Pallof_Press',
  'Russian_Twist',
  'Mountain_Climbers',
  'Barbell_Glute_Bridge',
  'Cat_Stretch',
  'Childs_Pose',
  'Kneeling_Hip_Flexor',
  'Chest_And_Front_Of_Shoulder_Stretch',
  'Shoulder_Stretch',
  'Piriformis-SMR',
  'Standing_Hip_Flexors',
  'Seated_Calf_Stretch',
  'Scapular_Pull-Up',
  'Isometric_Neck_Exercise_-_Front_And_Back',
]

const res = await fetch(SOURCE)
if (!res.ok) throw new Error(`Không tải được dataset: HTTP ${res.status}`)
const all = await res.json()
const byId = new Map(all.map((e) => [e.id, e]))

const missing = WANTED.filter((id) => !byId.has(id))
if (missing.length) throw new Error(`Thiếu id trong dataset: ${missing.join(', ')}`)

const out = WANTED.map((id) => {
  const e = byId.get(id)
  return {
    id,
    name: e.name,
    equipment: e.equipment,
    level: e.level,
    mechanic: e.mechanic,
    force: e.force,
    category: e.category,
    primaryMuscles: e.primaryMuscles,
    secondaryMuscles: e.secondaryMuscles,
    instructions: e.instructions,
    images: e.images.map((p) => `${IMAGE_BASE}/${p}`),
  }
})

const target = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/exercises.generated.json')
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, `${JSON.stringify(out, null, 2)}\n`, 'utf8')
console.log(`Đã ghi ${out.length} bài tập -> ${target}`)
