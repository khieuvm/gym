import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Activity, Bike, CheckCircle2, Circle, Dumbbell, Footprints, Moon } from 'lucide-react'
import { SESSION_BY_ID, WEEK, todayKey } from '../data/program'
import { PLAN_BY_DAY, planMacros } from '../data/mealPlans'
import { macroTarget } from '../lib/nutrition'
import { todayISO } from '../lib/dates'
import { useProfile } from '../lib/profileContext'
import { useStoredState } from '../lib/storage'
import { Bar, Card, Pill, SectionTitle, Stat } from '../components/ui'
import type { SessionType } from '../lib/types'

const ICON: Record<SessionType, typeof Dumbbell> = {
  gym: Dumbbell,
  cardio: Bike,
  sport: Footprints,
  mobility: Activity,
  rest: Moon,
}

const TONE: Record<SessionType, 'brand' | 'blue' | 'warn' | 'muted'> = {
  gym: 'brand',
  cardio: 'blue',
  sport: 'warn',
  mobility: 'muted',
  rest: 'muted',
}

export default function Dashboard() {
  const { profile } = useProfile()
  const [now] = useState(() => new Date())
  const key = todayKey(now)
  const day = WEEK.find((d) => d.key === key)!
  const sessions = day.sessionIds.map((id) => SESSION_BY_ID.get(id)!)
  const target = macroTarget(profile, day.sessionIds)
  const plan = PLAN_BY_DAY.get(key)
  const planTotals = plan ? planMacros(plan) : null

  const iso = todayISO(now)
  const [done, setDone] = useStoredState<Record<string, string[]>>('session-done', {})
  const doneToday = done[iso] ?? []

  const toggle = (id: string) =>
    setDone((prev) => {
      const list = prev[iso] ?? []
      const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
      return { ...prev, [iso]: next }
    })

  const completed = sessions.filter((s) => doneToday.includes(s.id)).length

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-brand/12 via-panel to-panel2">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-sm text-slate-400">
              {day.label} · {now.toLocaleDateString('vi-VN')}
            </div>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
              {sessions.map((s) => s.name.split('—')[0].trim()).join(' + ')}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">{day.note}</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400">Hoàn thành</div>
            <div className="text-3xl font-black text-brand">
              {completed}/{sessions.length}
            </div>
          </div>
        </div>
      </Card>

      <section>
        <SectionTitle title="Buổi tập hôm nay" subtitle="Bấm vào từng buổi để xem chi tiết và ghi lại mức tạ" />
        <div className="grid gap-3 sm:grid-cols-2">
          {sessions.map((s) => {
            const Icon = ICON[s.type]
            const isDone = doneToday.includes(s.id)
            return (
              <Card key={s.id} className={isDone ? 'opacity-60' : ''}>
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-white/5 p-2 text-brand">
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link to={`/buoi-tap/${s.id}`} className="font-semibold text-white hover:text-brand">
                        {s.name}
                      </Link>
                      <Pill tone={TONE[s.type]}>{s.focus}</Pill>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">{s.why}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggle(s.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1 text-xs font-medium text-slate-300 hover:border-brand/50 hover:text-brand"
                      >
                        {isDone ? <CheckCircle2 size={14} className="text-brand" /> : <Circle size={14} />}
                        {isDone ? 'Đã xong' : 'Đánh dấu xong'}
                      </button>
                      {s.durationMin > 0 && <span className="text-xs text-slate-500">~{s.durationMin} phút</span>}
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      <section>
        <SectionTitle
          title="Mục tiêu dinh dưỡng hôm nay"
          subtitle={`Tiêu hao ước tính ${target.tdee} kcal · mục tiêu nạp ${target.kcal} kcal`}
          action={
            <Link to="/dinh-duong" className="text-sm font-medium text-brand hover:underline">
              Thực đơn →
            </Link>
          }
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Calo" value={target.kcal} unit="kcal" tone="brand" />
          <Stat label="Đạm" value={target.protein} unit="g" tone="blue" hint={`${profile.proteinPerKg} g/kg`} />
          <Stat label="Tinh bột" value={target.carb} unit="g" tone="warn" />
          <Stat label="Chất béo" value={target.fat} unit="g" tone="muted" />
        </div>

        {plan && planTotals && (
          <Card className="mt-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="font-semibold text-white">{plan.name}</div>
                <div className="text-xs text-slate-400">
                  Thực đơn mẫu: {Math.round(planTotals.kcal)} kcal · {Math.round(planTotals.protein)} g đạm
                </div>
              </div>
              <Link to="/dinh-duong" className="text-sm font-medium text-brand hover:underline">
                Xem từng bữa →
              </Link>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Calo thực đơn so với mục tiêu</span>
                <span className="tabular-nums">
                  {Math.round(planTotals.kcal)} / {target.kcal}
                </span>
              </div>
              <Bar value={planTotals.kcal} max={target.kcal} />
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Đạm</span>
                <span className="tabular-nums">
                  {Math.round(planTotals.protein)} / {target.protein} g
                </span>
              </div>
              <Bar value={planTotals.protein} max={target.protein} tone="blue" />
            </div>
          </Card>
        )}
      </section>

      <section>
        <SectionTitle title="Nhắc riêng cho dân ngồi bàn phím" />
        <div className="grid gap-3 sm:grid-cols-3">
          <Card>
            <div className="text-sm font-semibold text-white">Quy tắc 50/10</div>
            <p className="mt-1 text-sm text-slate-400">
              Cứ 50 phút code thì đứng dậy 2–3 phút. Đặt hẹn giờ ngay trong IDE.
            </p>
          </Card>
          <Card>
            <div className="text-sm font-semibold text-white">Uống nước</div>
            <p className="mt-1 text-sm text-slate-400">
              2,5–3 lít/ngày, cộng thêm 1 lít cho ngày đạp xe 30 km.
            </p>
          </Card>
          <Card>
            <div className="text-sm font-semibold text-white">Đo vòng bụng</div>
            <p className="mt-1 text-sm text-slate-400">
              Mỗi sáng chủ nhật, lúc đói.{' '}
              <Link to="/tien-do" className="font-medium text-brand hover:underline">
                Ghi lại →
              </Link>
            </p>
          </Card>
        </div>
      </section>
    </div>
  )
}
