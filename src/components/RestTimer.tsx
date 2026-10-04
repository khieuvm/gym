import { useEffect, useRef, useState } from 'react'
import { Pause, Play, RotateCcw, Timer } from 'lucide-react'

export default function RestTimer({ defaultSec = 90 }: { defaultSec?: number }) {
  const [target, setTarget] = useState(defaultSec)
  const [left, setLeft] = useState(defaultSec)
  const [running, setRunning] = useState(false)
  const beeped = useRef(false)

  useEffect(() => {
    if (!running) return
    const t = setInterval(() => setLeft((l) => Math.max(0, l - 1)), 1000)
    return () => clearInterval(t)
  }, [running])

  useEffect(() => {
    if (left !== 0 || beeped.current || !running) return
    beeped.current = true
    setRunning(false)
    try {
      const ctx = new AudioContext()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.frequency.value = 880
      gain.gain.value = 0.08
      osc.connect(gain).connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.35)
      setTimeout(() => void ctx.close(), 600)
    } catch {
      // Trình duyệt chặn âm thanh khi chưa có tương tác -> bỏ qua
    }
  }, [left, running])

  const start = (sec: number) => {
    beeped.current = false
    setTarget(sec)
    setLeft(sec)
    setRunning(true)
  }

  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')
  const pct = target > 0 ? (left / target) * 100 : 0

  return (
    <div className="no-print rounded-2xl border border-line bg-panel2/70 p-3">
      <div className="flex items-center gap-3">
        <Timer size={18} className="text-brand" />
        <div className="text-2xl font-black tabular-nums text-white">
          {mm}:{ss}
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="rounded-lg border border-line p-1.5 text-slate-300 hover:border-brand/50 hover:text-brand"
            aria-label={running ? 'Tạm dừng' : 'Chạy'}
          >
            {running ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            type="button"
            onClick={() => start(target)}
            className="rounded-lg border border-line p-1.5 text-slate-300 hover:border-brand/50 hover:text-brand"
            aria-label="Đặt lại"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/8">
        <div className="h-full rounded-full bg-brand transition-all duration-1000" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {[45, 60, 90, 120, 150, 180].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => start(s)}
            className={`rounded-lg px-2 py-1 text-xs font-medium transition ${
              target === s ? 'bg-brand/20 text-brand' : 'bg-white/5 text-slate-400 hover:text-slate-200'
            }`}
          >
            {s}s
          </button>
        ))}
      </div>
    </div>
  )
}
