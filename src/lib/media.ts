import type { Exercise } from './types'

export type MediaMode = 'illustration' | 'photo'

export function hasIllustration(exercise: Exercise) {
  return (exercise.illustration?.frames.length ?? 0) > 0
}

/**
 * Trích mã video từ link YouTube ở các dạng phổ biến:
 * watch?v=ID · youtu.be/ID · /shorts/ID · /embed/ID · hoặc chính mã ID.
 */
export function parseYouTubeId(input: string): string | null {
  const raw = input.trim()
  if (!raw) return null
  if (/^[\w-]{11}$/.test(raw)) return raw

  try {
    const url = new URL(raw.startsWith('http') ? raw : `https://${raw}`)
    if (!/(^|\.)youtube\.com$|(^|\.)youtu\.be$|(^|\.)youtube-nocookie\.com$/.test(url.hostname)) return null

    const fromQuery = url.searchParams.get('v')
    if (fromQuery && /^[\w-]{11}$/.test(fromQuery)) return fromQuery

    const last = url.pathname.split('/').filter(Boolean).at(-1)
    if (last && /^[\w-]{11}$/.test(last)) return last
  } catch {
    return null
  }
  return null
}
