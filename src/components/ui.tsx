import type { ReactNode } from 'react'

export function Card({
  children,
  className = '',
  pad = true,
}: {
  children: ReactNode
  className?: string
  pad?: boolean
}) {
  return (
    <div
      className={`rounded-2xl border border-line/70 bg-panel/80 shadow-lg shadow-black/20 backdrop-blur ${
        pad ? 'p-4 sm:p-5' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

export function SectionTitle({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">{title}</h2>
        {subtitle && <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

const TONES = {
  brand: 'bg-brand/15 text-brand border-brand/30',
  blue: 'bg-brand2/15 text-brand2 border-brand2/30',
  warn: 'bg-warn/15 text-warn border-warn/30',
  danger: 'bg-danger/15 text-danger border-danger/30',
  muted: 'bg-white/5 text-slate-300 border-white/10',
}

export type Tone = keyof typeof TONES

export function Pill({ children, tone = 'muted' }: { children: ReactNode; tone?: Tone }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${TONES[tone]}`}>
      {children}
    </span>
  )
}

export function Stat({
  label,
  value,
  unit,
  hint,
  tone = 'brand',
}: {
  label: string
  value: string | number
  unit?: string
  hint?: string
  tone?: Tone
}) {
  const color = {
    brand: 'text-brand',
    blue: 'text-brand2',
    warn: 'text-warn',
    danger: 'text-danger',
    muted: 'text-slate-200',
  }[tone]
  return (
    <div className="rounded-xl border border-line/60 bg-panel2/60 p-3">
      <div className="text-xs text-slate-400">{label}</div>
      <div className={`mt-1 text-2xl font-bold tabular-nums ${color}`}>
        {value}
        {unit && <span className="ml-1 text-sm font-medium text-slate-400">{unit}</span>}
      </div>
      {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
    </div>
  )
}

export function Bar({ value, max, tone = 'brand' }: { value: number; max: number; tone?: Tone }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0
  const bg = {
    brand: 'bg-brand',
    blue: 'bg-brand2',
    warn: 'bg-warn',
    danger: 'bg-danger',
    muted: 'bg-slate-500',
  }[tone]
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/8">
      <div className={`h-full rounded-full transition-all ${bg}`} style={{ width: `${pct}%` }} />
    </div>
  )
}

export function Empty({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border border-dashed border-line py-8 text-center text-sm text-slate-500">{children}</div>
}
