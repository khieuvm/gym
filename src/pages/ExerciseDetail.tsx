import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AlertTriangle, ArrowLeft, Lightbulb } from 'lucide-react'
import { EXERCISE_BY_ID } from '../data/exercises'
import { SESSIONS } from '../data/program'
import { GROUP_LABEL } from '../lib/types'
import {
  ExerciseAnimation,
  ExerciseVideoPlayer,
  IllustrationCredit,
} from '../components/ExerciseMedia'
import { hasIllustration, type MediaMode } from '../lib/media'
import YouTubePinner from '../components/YouTubePinner'
import { Card, Empty, Pill, SectionTitle } from '../components/ui'
import { bestSet, loadLog } from '../lib/log'

export default function ExerciseDetail() {
  const { id } = useParams()
  const ex = id ? EXERCISE_BY_ID.get(id) : undefined
  const [mode, setMode] = useState<MediaMode>('illustration')

  if (!ex) {
    return (
      <div className="space-y-4">
        <Empty>Không tìm thấy bài tập này.</Empty>
        <Link to="/bai-tap" className="text-sm text-brand hover:underline">
          ← Về thư viện bài tập
        </Link>
      </div>
    )
  }

  const usedIn = SESSIONS.filter((s) => s.blocks.some((b) => b.exerciseId === ex.id))
  const pr = bestSet(loadLog(), ex.id)
  const canToggle = hasIllustration(ex) && ex.images.length > 0

  return (
    <div className="space-y-5">
      <Link to="/bai-tap" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-brand">
        <ArrowLeft size={14} /> Thư viện bài tập
      </Link>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          <Card pad={false} className="overflow-hidden">
            <ExerciseAnimation exercise={ex} className="aspect-4/3 w-full" mode={mode} />
            {canToggle && (
              <div className="flex gap-1.5 border-t border-line/60 p-2">
                {(['illustration', 'photo'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`rounded-lg px-3 py-1 text-xs font-medium transition ${
                      mode === m ? 'bg-brand/20 text-brand' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {m === 'illustration' ? 'Hình vẽ' : 'Ảnh chụp'}
                  </button>
                ))}
              </div>
            )}
          </Card>
          {mode === 'illustration' && <IllustrationCredit exercise={ex} />}

          <Card>
            <SectionTitle title="Video minh hoạ" />
            <YouTubePinner exercise={ex} />
            {ex.video && (
              <details className="mt-3">
                <summary className="cursor-pointer text-sm font-medium text-slate-400">
                  Video Creative Commons từ wger
                </summary>
                <div className="mt-3">
                  <ExerciseVideoPlayer exercise={ex} />
                </div>
              </details>
            )}
          </Card>
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white">{ex.name}</h1>
            <div className="mt-1 text-sm text-slate-500">{ex.nameEn}</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Pill tone="brand">{GROUP_LABEL[ex.group]}</Pill>
              <Pill>{ex.equipment}</Pill>
              <Pill>{ex.level}</Pill>
              {ex.mechanic && <Pill>{ex.mechanic}</Pill>}
            </div>
            {pr && (
              <div className="mt-3 text-sm text-slate-400">
                Kỷ lục của bạn:{' '}
                <strong className="text-brand">
                  {pr.weight} kg × {pr.reps} lần
                </strong>{' '}
                <span className="text-slate-600">({pr.date})</span>
              </div>
            )}
          </div>

          <Card>
            <SectionTitle title="Cách thực hiện" />
            <ol className="space-y-2 text-sm text-slate-300">
              {ex.howTo.map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-xs font-bold text-brand">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </Card>

          <Card>
            <SectionTitle title="Mẹo kỹ thuật" />
            <ul className="space-y-2 text-sm text-slate-300">
              {ex.cues.map((c) => (
                <li key={c} className="flex gap-2">
                  <Lightbulb size={16} className="mt-0.5 shrink-0 text-warn" />
                  {c}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <SectionTitle title="Lỗi thường gặp" />
            <ul className="space-y-2 text-sm text-slate-300">
              {ex.mistakes.map((m) => (
                <li key={m} className="flex gap-2">
                  <AlertTriangle size={16} className="mt-0.5 shrink-0 text-danger" />
                  {m}
                </li>
              ))}
            </ul>
          </Card>

          {usedIn.length > 0 && (
            <Card>
              <SectionTitle title="Nằm trong buổi" />
              <div className="flex flex-wrap gap-2">
                {usedIn.map((s) => (
                  <Link
                    key={s.id}
                    to={`/buoi-tap/${s.id}`}
                    className="rounded-lg border border-line px-3 py-1.5 text-sm text-slate-300 hover:border-brand/50 hover:text-brand"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </Card>
          )}

          <details className="rounded-2xl border border-line/70 bg-panel/60 p-4">
            <summary className="cursor-pointer text-sm font-medium text-slate-400">
              Hướng dẫn gốc tiếng Anh (free-exercise-db)
            </summary>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-slate-400">
              {ex.instructionsEn.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </details>
        </div>
      </div>
    </div>
  )
}
