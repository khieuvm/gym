// Tìm sẵn một video YouTube hướng dẫn cho mỗi bài tập.
// Chỉ lưu MÃ VIDEO để nhúng bằng player chính thức của YouTube — không tải nội dung.
// Chạy: npm run data:youtube
import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const target = resolve(here, '../src/data/youtube.generated.json')

// Từ khoá tìm kiếm viết tay cho từng bài — tên gốc trong dataset nhiều chỗ
// không phải là cách người ta thực sự gọi bài tập đó trên YouTube.
// Dạng chuỗi, hoặc { q, require: từ bắt buộc có trong tiêu đề, avoid: từ loại trừ }.
const QUERIES = {
  'Barbell_Bench_Press_-_Medium_Grip': 'barbell bench press',
  Incline_Dumbbell_Press: 'incline dumbbell press',
  Leverage_Chest_Press: 'machine chest press',
  Butterfly: 'pec deck machine chest fly',
  Dumbbell_Flyes: 'dumbbell chest fly',
  Dumbbell_Shoulder_Press: 'seated dumbbell shoulder press',
  Side_Lateral_Raise: 'dumbbell lateral raise',
  Face_Pull: 'cable face pull',
  'Triceps_Pushdown_-_Rope_Attachment': 'rope triceps pushdown',
  'Close-Grip_Barbell_Bench_Press': 'close grip bench press',
  'Dips_-_Triceps_Version': 'triceps dips',
  Pullups: { q: 'pull up', require: ['pull up'], avoid: ['l-sit', 'one arm', 'muscle up', 'weighted'] },
  'Chin-Up': { q: 'chin up', require: ['chin'], avoid: ['l-sit', 'one arm', 'weighted', 'archer'] },
  'Wide-Grip_Lat_Pulldown': 'wide grip lat pulldown',
  'Close-Grip_Front_Lat_Pulldown': 'close grip lat pulldown',
  Seated_Cable_Rows: 'seated cable row',
  Bent_Over_Barbell_Row: 'barbell bent over row',
  Cable_Rear_Delt_Fly: 'cable rear delt fly',
  Barbell_Curl: 'barbell biceps curl',
  Hammer_Curls: 'dumbbell hammer curl',
  Preacher_Curl: 'preacher curl',
  Barbell_Squat: 'barbell back squat',
  Front_Squat_Clean_Grip: 'barbell front squat',
  Leg_Press: 'leg press machine',
  Split_Squat_with_Dumbbells: 'bulgarian split squat dumbbell',
  Bodyweight_Walking_Lunge: 'walking lunge',
  Romanian_Deadlift: 'romanian deadlift',
  Barbell_Deadlift: 'conventional barbell deadlift',
  Barbell_Hip_Thrust: 'barbell hip thrust',
  Lying_Leg_Curls: 'lying leg curl machine',
  Seated_Leg_Curl: 'seated leg curl machine',
  Leg_Extensions: 'leg extension machine',
  Standing_Calf_Raises: 'standing calf raise',
  Seated_Calf_Raise: 'seated calf raise',
  Hyperextensions_Back_Extensions: 'back extension hyperextension',
  Good_Morning: 'barbell good morning',
  Plank: 'plank exercise',
  Side_Bridge: 'side plank',
  Dead_Bug: 'dead bug exercise',
  Hanging_Leg_Raise: 'hanging leg raise',
  Cable_Crunch: 'cable crunch',
  Reverse_Crunch: 'reverse crunch',
  Pallof_Press: 'pallof press',
  Russian_Twist: 'russian twist',
  Mountain_Climbers: 'mountain climbers exercise',
  Barbell_Glute_Bridge: 'barbell glute bridge',
  Cat_Stretch: 'cat cow stretch',
  Childs_Pose: 'childs pose stretch',
  Kneeling_Hip_Flexor: 'kneeling hip flexor stretch',
  Chest_And_Front_Of_Shoulder_Stretch: {
    q: 'doorway chest stretch',
    require: ['stretch'],
    avoid: ['stop', 'mistake', 'wrong'],
  },
  Shoulder_Stretch: 'cross body shoulder stretch',
  'Piriformis-SMR': 'piriformis foam rolling',
  Standing_Hip_Flexors: {
    q: 'standing hip flexor stretch',
    require: ['hip flexor'],
    avoid: ['kneeling', 'lunge'],
  },
  Seated_Calf_Stretch: 'seated calf stretch',
  'Scapular_Pull-Up': { q: 'scapular pull up', require: ['scapular'] },
  'Isometric_Neck_Exercise_-_Front_And_Back': 'isometric neck exercise',
}

// Kênh hướng dẫn kỹ thuật có uy tín — được cộng điểm ưu tiên
const TRUSTED = [
  'jeff nippard',
  'jeremy ethier',
  'squat university',
  'athlean-x',
  'renaissance periodization',
  'barbell medicine',
  'alan thrall',
  'juggernaut training systems',
  'calgary barbell',
  'buff dudes',
  'scotthermanfitness',
  'scott herman',
  'puregym',
  'national academy of sports medicine',
  'nasm',
  'bodybuilding.com',
  'mind pump',
  'testosterone nation',
  't nation',
  'precision nutrition',
  'physiotutors',
  'e3 rehab',
  'bob & brad',
  'the ready state',
  'gymshark',
  'muscleandstrength',
  'muscle & strength',
]

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function getText(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9' },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} tại ${url}`)
  return res.text()
}

/** Trích đối tượng ytInitialData từ HTML trang YouTube. */
function extractInitialData(html) {
  const marker = 'var ytInitialData = '
  const start = html.indexOf(marker)
  if (start === -1) return null
  let i = start + marker.length
  let depth = 0
  let inString = false
  let escaped = false
  for (; i < html.length; i++) {
    const c = html[i]
    if (inString) {
      if (escaped) escaped = false
      else if (c === '\\') escaped = true
      else if (c === '"') inString = false
      continue
    }
    if (c === '"') inString = true
    else if (c === '{') depth++
    else if (c === '}') {
      depth--
      if (depth === 0) {
        try {
          return JSON.parse(html.slice(start + marker.length, i + 1))
        } catch {
          return null
        }
      }
    }
  }
  return null
}

function collectVideos(node, out = []) {
  if (Array.isArray(node)) {
    for (const item of node) collectVideos(item, out)
    return out
  }
  if (node && typeof node === 'object') {
    if (node.videoRenderer?.videoId) out.push(node.videoRenderer)
    for (const value of Object.values(node)) collectVideos(value, out)
  }
  return out
}

function durationToSeconds(text) {
  if (!text) return null
  const parts = text.split(':').map(Number)
  if (parts.some(Number.isNaN)) return null
  return parts.reduce((acc, p) => acc * 60 + p, 0)
}

function scoreCandidate(v, spec) {
  const title = (v.title?.runs?.[0]?.text ?? '').toLowerCase()
  const channel = (v.ownerText?.runs?.[0]?.text ?? '').toLowerCase()
  const seconds = durationToSeconds(v.lengthText?.simpleText)

  if (seconds === null) return -1 // livestream hoặc Short: bỏ
  if (seconds < 25 || seconds > 1500) return -1

  if (spec.require.some((r) => !title.includes(r))) return -1
  if (spec.avoid.some((a) => title.includes(a))) return -1

  const matched = spec.keywords.filter((k) => title.includes(k)).length
  if (matched === 0) return -1

  let score = matched * 10
  if (TRUSTED.some((t) => channel.includes(t))) score += 25
  if (/how to|technique|form|tutorial|guide|properly/.test(title)) score += 8
  if (/mistake|stop doing|worst|ranking|vs\.? /.test(title)) score -= 12
  if (seconds >= 45 && seconds <= 600) score += 6
  return score
}

async function isEmbeddable(videoId) {
  try {
    const html = await getText(`https://www.youtube.com/watch?v=${videoId}&hl=en&gl=US`)
    if (html.includes('"playableInEmbed":false')) return false
    return html.includes('"playableInEmbed":true')
  } catch {
    return false
  }
}

const exercises = JSON.parse(readFileSync(resolve(here, '../src/data/exercises.generated.json'), 'utf8'))
const missingQuery = exercises.filter((e) => !QUERIES[e.id]).map((e) => e.id)
if (missingQuery.length) throw new Error(`Thiếu từ khoá tìm kiếm cho: ${missingQuery.join(', ')}`)

// Giữ lại kết quả cũ để chạy lại không mất công tìm từ đầu
const existing = existsSync(target) ? JSON.parse(readFileSync(target, 'utf8')) : {}
const onlyMissing = process.argv.includes('--missing')

const result = { ...existing }
for (const ex of exercises) {
  if (onlyMissing && result[ex.id]) continue

  const raw = QUERIES[ex.id]
  const spec = typeof raw === 'string' ? { q: raw } : raw
  const query = spec.q
  const search = {
    keywords: query.split(' ').filter((w) => w.length > 2),
    require: (spec.require ?? []).map((s) => s.toLowerCase()),
    avoid: (spec.avoid ?? []).map((s) => s.toLowerCase()),
  }
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${query} form tutorial`,
  )}&sp=EgIQAQ%253D%253D&hl=en&gl=US`

  try {
    const data = extractInitialData(await getText(url))
    if (!data) throw new Error('không đọc được ytInitialData')

    const ranked = collectVideos(data)
      .map((v) => ({ v, score: scoreCandidate(v, search) }))
      .filter((c) => c.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)

    let picked = null
    for (const { v } of ranked) {
      await sleep(400)
      if (!(await isEmbeddable(v.videoId))) continue
      picked = {
        videoId: v.videoId,
        title: v.title.runs[0].text,
        channel: v.ownerText?.runs?.[0]?.text ?? '',
        duration: v.lengthText?.simpleText ?? '',
        url: `https://www.youtube.com/watch?v=${v.videoId}`,
      }
      break
    }

    if (picked) {
      result[ex.id] = picked
      console.log(`OK   ${ex.id} -> ${picked.title} (${picked.channel})`)
    } else {
      console.log(`MISS ${ex.id} — không có ứng viên nào cho phép nhúng`)
    }
  } catch (err) {
    console.log(`ERR  ${ex.id} — ${err.message}`)
  }

  await sleep(1200)
}

writeFileSync(target, `${JSON.stringify(result, null, 2)}\n`, 'utf8')
console.log(`\nĐã ghi ${Object.keys(result).length}/${exercises.length} video -> ${target}`)
