// Lấy video demo Creative Commons từ wger.de cho các bài tập trong giáo án.
// Map được đối chiếu THỦ CÔNG (free-exercise-db id -> wger exercise id)
// vì khớp tên tự động cho kết quả sai (vd. Bench Press -> Incline Bench Press).
// Chạy: npm run data:videos
import { writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const MAP = {
  'Barbell_Bench_Press_-_Medium_Grip': 73,
  Incline_Dumbbell_Press: 537,
  Dumbbell_Shoulder_Press: 567,
  Side_Lateral_Raise: 348,
  Cable_Rear_Delt_Fly: 82,
  Face_Pull: 222,
  'Triceps_Pushdown_-_Rope_Attachment': 659,
  'Dips_-_Triceps_Version': 194,
  Pullups: 475,
  Seated_Cable_Rows: 512,
  Barbell_Curl: 91,
  Hammer_Curls: 272,
  Preacher_Curl: 465,
  Front_Squat_Clean_Grip: 257,
  Leg_Press: 371,
  Romanian_Deadlift: 507,
  Barbell_Hip_Thrust: 294,
  Lying_Leg_Curls: 365,
  Seated_Leg_Curl: 366,
  Standing_Calf_Raises: 622,
  Seated_Calf_Raise: 590,
  Split_Squat_with_Dumbbells: 205,
  Bodyweight_Walking_Lunge: 206,
}

const json = async (url) => {
  const r = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!r.ok) throw new Error(`HTTP ${r.status} tại ${url}`)
  return r.json()
}

const licenses = await json('https://wger.de/api/v2/license/?format=json&limit=100')
const licenseById = new Map(licenses.results.map((l) => [l.id, l.full_name || l.short_name]))

const videos = await json('https://wger.de/api/v2/video/?format=json&limit=500')
const byExercise = new Map()
for (const v of videos.results) {
  const list = byExercise.get(v.exercise) ?? []
  list.push(v)
  byExercise.set(v.exercise, list)
}

// Ưu tiên định dạng trình duyệt chắc chắn phát được (mp4/webm), rồi tới is_main, rồi file nhẹ nhất
const rank = (v) => {
  const ext = v.video.split('.').pop().toLowerCase()
  return [ext === 'mp4' || ext === 'webm' ? 0 : 1, v.is_main ? 0 : 1, v.size]
}

const result = {}
const skipped = []
for (const [ourId, wgerId] of Object.entries(MAP)) {
  const list = byExercise.get(wgerId)
  if (!list?.length) {
    skipped.push(ourId)
    continue
  }
  const v = [...list].sort((a, b) => {
    const ra = rank(a)
    const rb = rank(b)
    return ra[0] - rb[0] || ra[1] - rb[1] || ra[2] - rb[2]
  })[0]
  const info = await json(`https://wger.de/api/v2/exerciseinfo/${wgerId}/?format=json`)
  const en = (info.translations ?? []).find((t) => t.language === 2)
  result[ourId] = {
    url: v.video,
    format: v.video.split('.').pop().toLowerCase(),
    durationSec: Number(v.duration) || null,
    wgerName: en?.name ?? String(wgerId),
    license: licenseById.get(v.license) ?? String(v.license),
    author: v.license_author || 'wger contributors',
    source: `https://wger.de/en/exercise/${wgerId}/view/`,
  }
}

const target = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/videos.generated.json')
writeFileSync(target, `${JSON.stringify(result, null, 2)}\n`, 'utf8')
console.log(`Đã ghi ${Object.keys(result).length} video -> ${target}`)
if (skipped.length) console.log(`Không có video: ${skipped.join(', ')}`)
