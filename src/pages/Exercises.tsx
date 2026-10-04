import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { EXERCISES } from '../data/exercises'
import { GROUP_LABEL, type MuscleGroup } from '../lib/types'
import { ExerciseAnimation } from '../components/ExerciseMedia'
import { Card, Empty, Pill } from '../components/ui'

const GROUPS = Object.keys(GROUP_LABEL) as MuscleGroup[]

export default function Exercises() {
  const [group, setGroup] = useState<MuscleGroup | 'all'>('all')
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return EXERCISES.filter((e) => {
      if (group !== 'all' && e.group !== group) return false
      if (!needle) return true
      return `${e.name} ${e.nameEn} ${e.equipment}`.toLowerCase().includes(needle)
    })
  }, [group, q])

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">Thư viện bài tập</h1>
        <p className="mt-1 text-sm text-slate-400">
          {EXERCISES.length} bài có ảnh minh hoạ chuyển động, hướng dẫn tiếng Việt và các lỗi thường gặp.
        </p>
      </div>

      <div className="no-print space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm bài tập (squat, ngực, cáp...)"
            className="w-full rounded-xl border border-line bg-panel py-2.5 pl-9 pr-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-brand/60"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setGroup('all')}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              group === 'all' ? 'bg-brand/20 text-brand' : 'bg-white/5 text-slate-400 hover:text-slate-200'
            }`}
          >
            Tất cả
          </button>
          {GROUPS.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGroup(g)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                group === g ? 'bg-brand/20 text-brand' : 'bg-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              {GROUP_LABEL[g]}
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <Empty>Không tìm thấy bài tập phù hợp.</Empty>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((e) => (
            <Link key={e.id} to={`/bai-tap/${e.id}`}>
              <Card pad={false} className="h-full overflow-hidden transition hover:border-brand/40">
                <ExerciseAnimation exercise={e} className="h-44 w-full" intervalMs={800} />
                <div className="p-3.5">
                  <div className="font-semibold text-white">{e.name}</div>
                  <div className="mt-0.5 text-xs text-slate-500">{e.nameEn}</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Pill tone="brand">{GROUP_LABEL[e.group]}</Pill>
                    <Pill>{e.equipment}</Pill>
                    {e.video && <Pill tone="blue">Có video</Pill>}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
