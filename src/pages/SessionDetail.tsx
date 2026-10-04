import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Info } from 'lucide-react'
import { SESSION_BY_ID } from '../data/program'
import { EXERCISE_BY_ID, getExercise } from '../data/exercises'
import { ExerciseAnimation } from '../components/ExerciseMedia'
import RestTimer from '../components/RestTimer'
import { Card, Empty, Pill, SectionTitle } from '../components/ui'
import { loadLog, logKey, previousEntry, saveLog, type SetEntry } from '../lib/log'
import { todayISO } from '../lib/dates'

function WarmupLine({ line }: { line: string }) {
  // Các dòng khởi động có thể bắt đầu bằng mã bài tập -> hiển thị tên tiếng Việt kèm link
  const [first, ...rest] = line.split(' ')
  const ex = EXERCISE_BY_ID.get(first)
  if (!ex) return <span>{line}</span>
  return (
    <span>
      <Link to={`/bai-tap/${ex.id}`} className="font-medium text-brand hover:underline">
        {ex.name}
      </Link>{' '}
      {rest.join(' ')}
    </span>
  )
}

export default function SessionDetail() {
  const { id } = useParams()
  const session = id ? SESSION_BY_ID.get(id) : undefined
  const iso = todayISO()
  const [log, setLog] = useState(loadLog)

  if (!session) {
    return (
      <div className="space-y-4">
        <Empty>Không tìm thấy buổi tập này.</Empty>
        <Link to="/lich-tap" className="text-sm text-brand hover:underline">
          ← Về lịch tập
        </Link>
      </div>
    )
  }

  const update = (exerciseId: string, index: number, field: keyof SetEntry, value: string) => {
    const key = logKey(iso, exerciseId)
    const current = log[key] ?? []
    const next = [...current]
    while (next.length <= index) next.push({ weight: '', reps: '' })
    next[index] = { ...next[index], [field]: value }
    const updated = { ...log, [key]: next }
    setLog(updated)
    saveLog(updated)
  }

  return (
    <div className="space-y-6">
      <div className="no-print">
        <Link to="/lich-tap" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-brand">
          <ArrowLeft size={14} /> Lịch tập
        </Link>
      </div>

      <Card className="bg-gradient-to-br from-brand/10 via-panel to-panel2">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white">{session.name}</h1>
            <div className="mt-2 flex flex-wrap gap-2">
              <Pill tone="brand">{session.focus}</Pill>
              {session.durationMin > 0 && <Pill>~{session.durationMin} phút</Pill>}
            </div>
          </div>
        </div>
        <p className="mt-3 flex gap-2 text-sm text-slate-300">
          <Info size={16} className="mt-0.5 shrink-0 text-brand" />
          {session.why}
        </p>
      </Card>

      {session.warmup.length > 0 && (
        <Card>
          <SectionTitle title="Khởi động" subtitle="Bỏ qua bước này là con đường ngắn nhất tới chấn thương" />
          <ul className="space-y-1.5 text-sm text-slate-300">
            {session.warmup.map((w) => (
              <li key={w} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                <WarmupLine line={w} />
              </li>
            ))}
          </ul>
        </Card>
      )}

      {session.blocks.length > 0 && (
        <section>
          <SectionTitle
            title="Nội dung buổi tập"
            subtitle="Nhập mức tạ và số lần ngay khi tập xong mỗi set — dữ liệu lưu trên máy bạn"
          />
          <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
            <div className="space-y-3">
              {session.blocks.map((block, blockIdx) => {
                const ex = getExercise(block.exerciseId)
                const key = logKey(iso, ex.id)
                const entries = log[key] ?? []
                const prev = previousEntry(log, iso, ex.id)
                return (
                  <Card key={`${block.exerciseId}-${blockIdx}`}>
                    <div className="flex gap-3">
                      <Link to={`/bai-tap/${ex.id}`} className="shrink-0">
                        <ExerciseAnimation exercise={ex} className="h-20 w-28 rounded-lg" />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Link to={`/bai-tap/${ex.id}`} className="font-semibold text-white hover:text-brand">
                            {ex.name}
                          </Link>
                          {block.superset && <Pill tone="warn">Superset {block.superset}</Pill>}
                        </div>
                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
                          <span>
                            <strong className="text-slate-200">{block.sets}</strong> set ×{' '}
                            <strong className="text-slate-200">{block.reps}</strong>
                          </span>
                          <span>Nghỉ {block.restSec}s</span>
                          {block.rpe && <span>{block.rpe}</span>}
                        </div>
                        {block.note && <p className="mt-1 text-xs text-brand/90">{block.note}</p>}
                        {prev && (
                          <p className="mt-1 text-xs text-slate-500">
                            Lần trước ({prev.date}):{' '}
                            {prev.sets
                              .filter((s) => s.weight || s.reps)
                              .map((s) => `${s.weight || '?'}kg×${s.reps || '?'}`)
                              .join(' · ')}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 space-y-1.5">
                      {Array.from({ length: block.sets }).map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="w-12 shrink-0 text-xs text-slate-500">Set {i + 1}</span>
                          <input
                            inputMode="decimal"
                            placeholder={prev?.sets[i]?.weight || 'kg'}
                            value={entries[i]?.weight ?? ''}
                            onChange={(e) => update(ex.id, i, 'weight', e.target.value)}
                            className="w-20 rounded-lg border border-line bg-panel2 px-2 py-1 text-sm text-white outline-none placeholder:text-slate-600 focus:border-brand/60"
                          />
                          <span className="text-xs text-slate-600">×</span>
                          <input
                            inputMode="numeric"
                            placeholder={prev?.sets[i]?.reps || 'lần'}
                            value={entries[i]?.reps ?? ''}
                            onChange={(e) => update(ex.id, i, 'reps', e.target.value)}
                            className="w-20 rounded-lg border border-line bg-panel2 px-2 py-1 text-sm text-white outline-none placeholder:text-slate-600 focus:border-brand/60"
                          />
                        </div>
                      ))}
                    </div>
                  </Card>
                )
              })}
            </div>

            <div className="lg:sticky lg:top-4 lg:h-fit">
              <RestTimer defaultSec={session.blocks[0]?.restSec ?? 90} />
            </div>
          </div>
        </section>
      )}

      {session.cooldown.length > 0 && (
        <Card>
          <SectionTitle title="Hạ nhiệt & giãn cơ" />
          <ul className="space-y-1.5 text-sm text-slate-300">
            {session.cooldown.map((c) => (
              <li key={c} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand2" />
                <WarmupLine line={c} />
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}
