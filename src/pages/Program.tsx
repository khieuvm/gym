import { Link } from 'react-router-dom'
import { PHASES, SESSION_BY_ID, WEEK, todayKey } from '../data/program'
import { macroTarget } from '../lib/nutrition'
import { useProfile } from '../lib/profileContext'
import { Card, Pill, SectionTitle } from '../components/ui'

export default function Program() {
  const { profile } = useProfile()
  const today = todayKey()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">Lịch tập trong tuần</h1>
        <p className="mt-1 max-w-3xl text-sm text-slate-400">
          Upper/Lower 4 buổi tạ mỗi tuần, xếp xen kẽ với 2 chiều đạp xe 30 km và trận bóng tối thứ 5. Mỗi nhóm cơ
          được tập 2 lần/tuần — hiệu quả hơn kiểu chia mỗi ngày một nhóm cơ.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {WEEK.map((day) => {
          const sessions = day.sessionIds.map((id) => SESSION_BY_ID.get(id)!)
          const target = macroTarget(profile, day.sessionIds)
          const isToday = day.key === today
          return (
            <Card key={day.key} className={isToday ? 'ring-1 ring-brand/50' : ''}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white">{day.label}</span>
                    {isToday && <Pill tone="brand">Hôm nay</Pill>}
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{day.note}</p>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-xs text-slate-500">Mục tiêu</div>
                  <div className="font-bold tabular-nums text-brand">{target.kcal}</div>
                  <div className="text-[11px] text-slate-500">kcal</div>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                {sessions.map((s) => (
                  <Link
                    key={s.id}
                    to={`/buoi-tap/${s.id}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-line/60 bg-panel2/50 px-3 py-2 transition hover:border-brand/40"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-100">{s.name}</div>
                      <div className="truncate text-xs text-slate-500">{s.focus}</div>
                    </div>
                    <span className="shrink-0 text-xs text-slate-500">
                      {s.durationMin > 0 ? `${s.durationMin}′` : '—'}
                    </span>
                  </Link>
                ))}
              </div>
            </Card>
          )
        })}
      </div>

      <section>
        <SectionTitle
          title="Lộ trình 12 tuần"
          subtitle="Tập cùng một giáo án nhưng thay đổi cách tăng tải và mức calo theo từng giai đoạn"
        />
        <div className="grid gap-3 md:grid-cols-2">
          {PHASES.map((p) => (
            <Card key={p.weeks}>
              <div className="flex items-center gap-2">
                <Pill tone="blue">{p.weeks}</Pill>
                <span className="font-semibold text-white">{p.name}</span>
              </div>
              <p className="mt-1 text-sm text-brand">{p.goal}</p>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-400">
                {p.details.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-600" />
                    {d}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <Card>
        <SectionTitle title="Nguyên tắc tăng tải" subtitle="Chỉ cần nhớ đúng một quy tắc này" />
        <p className="text-sm text-slate-300">
          Mỗi bài có một khoảng số lần, ví dụ <strong className="text-white">6–8</strong>. Khi bạn làm được{' '}
          <strong className="text-white">8 lần ở tất cả các set</strong> với kỹ thuật chuẩn, buổi sau tăng thêm 2,5 kg
          và quay lại mốc 6 lần. Cứ thế lặp lại. Đây là toàn bộ bí quyết tăng cơ — phần còn lại chỉ là ăn và ngủ.
        </p>
      </Card>
    </div>
  )
}
