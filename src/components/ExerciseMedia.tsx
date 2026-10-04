import { useEffect, useState } from 'react'
import type { Exercise } from '../lib/types'
import { hasIllustration, type MediaMode } from '../lib/media'

/**
 * Ảnh động mô phỏng chuyển động bằng cách lật qua lại các khung hình.
 * - Hình vẽ (@bryllim/workout-guide): 3 khung hình, nền trong suốt -> mượt hơn.
 * - Ảnh chụp (free-exercise-db): 2 khung hình bắt đầu / kết thúc.
 */
export function ExerciseAnimation({
  exercise,
  className = '',
  playing = true,
  intervalMs = 700,
  mode,
}: {
  exercise: Exercise
  className?: string
  playing?: boolean
  intervalMs?: number
  mode?: MediaMode
}) {
  const isDrawing = (mode ?? (hasIllustration(exercise) ? 'illustration' : 'photo')) === 'illustration' && hasIllustration(exercise)
  const sources = isDrawing ? exercise.illustration!.frames : exercise.images

  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!playing || sources.length < 2) return
    const t = setInterval(() => setTick((v) => v + 1), intervalMs)
    return () => clearInterval(t)
  }, [playing, sources.length, intervalMs])

  if (!sources.length) {
    return (
      <div className={`flex items-center justify-center bg-panel2 text-xs text-slate-500 ${className}`}>
        Không có ảnh
      </div>
    )
  }

  const frame = tick % sources.length

  return (
    <div className={`relative overflow-hidden ${isDrawing ? 'bg-panel2' : 'bg-white'} ${className}`}>
      {sources.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${exercise.name} — khung ${i + 1}`}
          loading="lazy"
          className={`absolute inset-0 h-full w-full transition-opacity duration-200 ${
            isDrawing ? 'object-contain p-2' : 'object-cover'
          } ${i === frame ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  )
}

export function IllustrationCredit({ exercise }: { exercise: Exercise }) {
  const il = exercise.illustration
  if (!il) return null
  return (
    <p className="text-xs text-slate-500">
      Hình vẽ:{' '}
      <a className="text-brand2 hover:underline" href={il.creatorUrl} target="_blank" rel="noreferrer">
        {il.creator}
      </a>{' '}
      ·{' '}
      <a className="text-brand2 hover:underline" href={il.licenseUrl} target="_blank" rel="noreferrer">
        {il.license}
      </a>
      {il.upstream && (
        <>
          {' '}
          · dựa trên{' '}
          <a className="text-brand2 hover:underline" href={il.upstream.url} target="_blank" rel="noreferrer">
            {il.upstream.name}
          </a>
        </>
      )}
    </p>
  )
}

export function ExerciseVideoPlayer({ exercise }: { exercise: Exercise }) {
  const [failed, setFailed] = useState(false)
  const v = exercise.video

  if (!v) return null

  return (
    <div className="space-y-2">
      {!failed ? (
        <video
          key={v.url}
          src={v.url}
          controls
          loop
          muted
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
          className="w-full rounded-xl border border-line bg-black"
        />
      ) : (
        <div className="rounded-xl border border-dashed border-line p-4 text-sm text-slate-400">
          Trình duyệt không phát được định dạng <code>.{v.format}</code> của video này.
          <a className="ml-1 font-medium text-brand hover:underline" href={v.source} target="_blank" rel="noreferrer">
            Xem trên wger →
          </a>
        </div>
      )}
      <p className="text-xs text-slate-500">
        “{v.wgerName}” — {v.author} · {v.license} ·{' '}
        <a className="text-brand2 hover:underline" href={v.source} target="_blank" rel="noreferrer">
          nguồn wger
        </a>
      </p>
    </div>
  )
}
