import { useState } from 'react'
import { Check, ExternalLink, Pencil, RotateCcw } from 'lucide-react'
import { useStoredState } from '../lib/storage'
import { parseYouTubeId } from '../lib/media'
import type { Exercise } from '../lib/types'

export default function YouTubePinner({ exercise }: { exercise: Exercise }) {
  const [pinned, setPinned] = useStoredState<Record<string, string>>('exercise-youtube', {})
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const [error, setError] = useState<string | null>(null)

  const custom = pinned[exercise.id]
  const suggested = exercise.youtube
  const videoId = custom ?? suggested?.videoId

  const save = () => {
    const id = parseYouTubeId(draft)
    if (!id) {
      setError('Link không hợp lệ. Dán link dạng youtube.com/watch?v=… hoặc youtu.be/…')
      return
    }
    setError(null)
    setDraft('')
    setEditing(false)
    setPinned((prev) => ({ ...prev, [exercise.id]: id }))
  }

  const restore = () =>
    setPinned((prev) => {
      const next = { ...prev }
      delete next[exercise.id]
      return next
    })

  return (
    <div className="space-y-3">
      {videoId ? (
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-line bg-black">
          <iframe
            key={videoId}
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
            title={`Video hướng dẫn ${exercise.name}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-full w-full"
          />
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-line p-4 text-sm text-slate-400">
          Chưa có video cho bài này. Hãy tìm và ghim một video bên dưới.
        </div>
      )}

      {custom ? (
        <p className="text-xs text-slate-500">
          Video do bạn ghim.{' '}
          {suggested && (
            <button type="button" onClick={restore} className="font-medium text-brand hover:underline">
              Quay lại video gợi ý
            </button>
          )}
        </p>
      ) : (
        suggested && (
          <p className="text-xs text-slate-500">
            <a className="text-slate-300 hover:underline" href={suggested.url} target="_blank" rel="noreferrer">
              {suggested.title}
            </a>{' '}
            — {suggested.channel}
            {suggested.duration && ` · ${suggested.duration}`}
          </p>
        )
      )}

      {editing ? (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && save()}
              placeholder="Dán link YouTube vào đây"
              className="min-w-0 flex-1 rounded-lg border border-line bg-panel2 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-brand/60"
            />
            <button
              type="button"
              onClick={save}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-ink hover:brightness-110"
            >
              <Check size={15} /> Lưu
            </button>
          </div>
          {error && <p className="text-xs text-danger">{error}</p>}
          <div className="flex items-center gap-3">
            <a
              href={exercise.youtubeSearch}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-brand hover:underline"
            >
              Tìm video khác trên YouTube <ExternalLink size={12} />
            </a>
            <button
              type="button"
              onClick={() => {
                setEditing(false)
                setError(null)
              }}
              className="text-xs text-slate-500 hover:text-slate-300"
            >
              Huỷ
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1 text-xs font-medium text-slate-400 hover:border-brand/50 hover:text-brand"
        >
          {custom ? <RotateCcw size={13} /> : <Pencil size={13} />}
          Đổi video khác
        </button>
      )}
    </div>
  )
}
