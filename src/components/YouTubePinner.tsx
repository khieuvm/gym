import { useState } from 'react'
import { Check, CirclePlay, ExternalLink, Trash2 } from 'lucide-react'
import { useStoredState } from '../lib/storage'
import { parseYouTubeId } from '../lib/media'

export default function YouTubePinner({
  exerciseId,
  exerciseName,
  searchUrl,
}: {
  exerciseId: string
  exerciseName: string
  searchUrl: string
}) {
  const [pinned, setPinned] = useStoredState<Record<string, string>>('exercise-youtube', {})
  const [draft, setDraft] = useState('')
  const [error, setError] = useState<string | null>(null)

  const videoId = pinned[exerciseId]

  const save = () => {
    const id = parseYouTubeId(draft)
    if (!id) {
      setError('Link không hợp lệ. Dán link dạng youtube.com/watch?v=… hoặc youtu.be/…')
      return
    }
    setError(null)
    setDraft('')
    setPinned((prev) => ({ ...prev, [exerciseId]: id }))
  }

  const remove = () =>
    setPinned((prev) => {
      const next = { ...prev }
      delete next[exerciseId]
      return next
    })

  return (
    <div className="space-y-3">
      {videoId ? (
        <>
          <div className="aspect-video w-full overflow-hidden rounded-xl border border-line bg-black">
            <iframe
              key={videoId}
              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
              title={`Video hướng dẫn ${exerciseName}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full"
            />
          </div>
          <button
            type="button"
            onClick={remove}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-danger"
          >
            <Trash2 size={13} /> Gỡ video đã ghim
          </button>
        </>
      ) : (
        <div className="rounded-xl border border-dashed border-line p-4">
          <p className="flex items-center gap-2 text-sm text-slate-300">
            <CirclePlay size={16} className="text-danger" />
            Ghim một video YouTube cho bài này
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Video được phát bằng trình nhúng chính thức của YouTube, link lưu trên máy bạn.
          </p>
          <a
            href={searchUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
          >
            Tìm video trên YouTube <ExternalLink size={13} />
          </a>
          <div className="mt-3 flex gap-2">
            <input
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
              <Check size={15} /> Ghim
            </button>
          </div>
          {error && <p className="mt-2 text-xs text-danger">{error}</p>}
        </div>
      )}
    </div>
  )
}
