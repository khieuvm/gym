// Sinh src/data/illustrations.generated.json từ @bryllim/workout-guide
// (3 khung hình PNG 512x512, nền trong suốt, CC BY-SA 4.0 — bắt buộc ghi nguồn).
// Map được đối chiếu THỦ CÔNG để tránh khớp nhầm biến thể bài tập.
// Chạy: npm run data:illustrations
import { writeFileSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const VERSION = '1.0.0'
const CDN = `https://cdn.jsdelivr.net/npm/@bryllim/workout-guide@${VERSION}`

// free-exercise-db id -> workout-guide slug
const MAP = {
  'Barbell_Bench_Press_-_Medium_Grip': 'bench-press',
  Incline_Dumbbell_Press: 'incline-dumbbell-press',
  Leverage_Chest_Press: 'machine-chest-press',
  Butterfly: 'pec-deck',
  Dumbbell_Flyes: 'dumbbell-fly',
  Dumbbell_Shoulder_Press: 'seated-dumbbell-press',
  Side_Lateral_Raise: 'lateral-raise',
  Face_Pull: 'face-pull',
  'Triceps_Pushdown_-_Rope_Attachment': 'rope-tricep-pushdown',
  'Close-Grip_Barbell_Bench_Press': 'close-grip-bench-press',
  'Dips_-_Triceps_Version': 'dip',
  Pullups: 'pull-up',
  'Chin-Up': 'chin-up',
  'Wide-Grip_Lat_Pulldown': 'wide-grip-lat-pulldown',
  'Close-Grip_Front_Lat_Pulldown': 'close-grip-lat-pulldown',
  Seated_Cable_Rows: 'seated-row',
  Bent_Over_Barbell_Row: 'barbell-row',
  Cable_Rear_Delt_Fly: 'cable-rear-delt-fly',
  Barbell_Curl: 'bicep-curl',
  Hammer_Curls: 'hammer-curl',
  Preacher_Curl: 'preacher-curl',
  Barbell_Squat: 'squat',
  Front_Squat_Clean_Grip: 'front-squat',
  Leg_Press: 'leg-press',
  Split_Squat_with_Dumbbells: 'bulgarian-split-squat',
  Bodyweight_Walking_Lunge: 'walking-lunge',
  Romanian_Deadlift: 'romanian-deadlift',
  Barbell_Deadlift: 'deadlift',
  Barbell_Hip_Thrust: 'hip-thrust',
  Lying_Leg_Curls: 'lying-leg-curl',
  Seated_Leg_Curl: 'seated-leg-curl',
  Leg_Extensions: 'leg-extension',
  Standing_Calf_Raises: 'standing-calf-raise',
  Seated_Calf_Raise: 'seated-calf-raise',
  Hyperextensions_Back_Extensions: 'back-extension',
  Good_Morning: 'good-morning',
  Plank: 'plank',
  Side_Bridge: 'side-plank',
  Dead_Bug: 'dead-bug',
  Hanging_Leg_Raise: 'hanging-leg-raise',
  Cable_Crunch: 'cable-crunch',
  Reverse_Crunch: 'reverse-crunch',
  Pallof_Press: 'pallof-press',
  Russian_Twist: 'russian-twist',
  Mountain_Climbers: 'mountain-climber',
  Barbell_Glute_Bridge: 'barbell-glute-bridge',
  Cat_Stretch: 'cat-cow-stretch',
  Childs_Pose: 'childs-pose',
  Kneeling_Hip_Flexor: 'kneeling-hip-flexor-stretch',
  Chest_And_Front_Of_Shoulder_Stretch: 'doorway-chest-stretch',
  Shoulder_Stretch: 'cross-body-shoulder-stretch',
  'Scapular_Pull-Up': 'scapular-pull-up',
}

const here = dirname(fileURLToPath(import.meta.url))
const ourIds = new Set(
  JSON.parse(readFileSync(resolve(here, '../src/data/exercises.generated.json'), 'utf8')).map((e) => e.id),
)

const unknown = Object.keys(MAP).filter((id) => !ourIds.has(id))
if (unknown.length) throw new Error(`Id không có trong exercises.generated.json: ${unknown.join(', ')}`)

const res = await fetch(`${CDN}/manifest.json`)
if (!res.ok) throw new Error(`Không tải được manifest: HTTP ${res.status}`)
const manifest = Object.values(await res.json())
const bySlug = new Map(manifest.map((e) => [e.slug, e]))

const missing = Object.values(MAP).filter((slug) => !bySlug.has(slug))
if (missing.length) throw new Error(`Slug không có trong workout-guide: ${missing.join(', ')}`)

const out = {}
for (const [ourId, slug] of Object.entries(MAP)) {
  const e = bySlug.get(slug)
  const a = e.attribution
  out[ourId] = {
    slug,
    name: e.name,
    frames: e.frames.map((f) => `${CDN}/${f.path}`),
    creator: a.creator,
    creatorUrl: a.creatorUrl,
    license: a.license,
    licenseUrl: a.licenseUrl,
    upstream: a.source ? { name: a.source.name, url: a.source.url, changes: a.source.changes } : null,
  }
}

const target = resolve(here, '../src/data/illustrations.generated.json')
writeFileSync(target, `${JSON.stringify(out, null, 2)}\n`, 'utf8')
console.log(`Đã ghi ${Object.keys(out).length}/${ourIds.size} hình minh hoạ -> ${target}`)
