import { useEffect, useState } from 'react'
import type { Exercise } from '../lib/types'

/**
 * Ảnh minh hoạ: free-exercise-db chỉ có 2 khung hình (bắt đầu / kết thúc).
 * Tự động đổi qua lại tạo hiệu ứng động mô phỏng chuyển động của bài tập.
 */
export function ExerciseAnimation({
  exercise,
  className = '',
  playing = true,
  intervalMs = 900,
}: {
  exercise: Exercise
  className?: string
  playing?: boolean
  intervalMs?: number
}) {
  const [frame, setFrame] = useState(0)
  const frames = exercise.images.length

  useEffect(() => {
    if (!playing || frames < 2) return
    const t = setInterval(() => setFrame((f) => (f + 1) % frames), intervalMs)
    return () => clearInterval(t)
  }, [playing, frames, intervalMs])

  if (!frames) {
    return <div className={`flex items-center justify-center bg-panel2 text-xs text-slate-500 ${className}`}>Không có ảnh</div>
  }

  return (
    <div className={`relative overflow-hidden bg-white ${className}`}>
      {exercise.images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${exercise.name} - khung ${i + 1}`}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            i === frame ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  )
}

export function ExerciseVideoPlayer({ exercise }: { exercise: Exercise }) {
  const [failed, setFailed] = useState(false)
  const v = exercise.video

  if (!v) {
    return (
      <div className="rounded-xl border border-dashed border-line p-4 text-sm text-slate-400">
        <p>Chưa có video giấy phép mở cho bài này.</p>
        <a
          className="mt-2 inline-block font-medium text-brand hover:underline"
          href={exercise.youtubeSearch}
          target="_blank"
          rel="noreferrer"
        >
          Tìm video hướng dẫn trên YouTube →
        </a>
      </div>
    )
  }

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
        Video: “{v.wgerName}” — {v.author} · {v.license} ·{' '}
        <a className="text-brand2 hover:underline" href={v.source} target="_blank" rel="noreferrer">
          nguồn wger
        </a>
        {' · '}
        <a className="text-brand2 hover:underline" href={exercise.youtubeSearch} target="_blank" rel="noreferrer">
          tìm thêm trên YouTube
        </a>
      </p>
    </div>
  )
}
