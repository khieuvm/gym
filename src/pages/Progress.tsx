import { useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Trash2 } from 'lucide-react'
import { useProfile } from '../lib/profileContext'
import { useStoredState } from '../lib/storage'
import { navyBodyFat, waistToHeight, waistVerdict } from '../lib/nutrition'
import { loadLog, volumeByDate } from '../lib/log'
import { Card, Empty, Pill, SectionTitle, Stat } from '../components/ui'
import { todayISO } from '../lib/dates'

type Measure = {
  date: string
  waist: number
  neck: number
  chest?: number
  arm?: number
  thigh?: number
}

const FIELDS: { key: keyof Measure; label: string; required?: boolean; hint?: string }[] = [
  { key: 'waist', label: 'Vòng bụng (ngang rốn)', required: true, hint: 'Đo buổi sáng lúc đói, thở ra nhẹ, không hóp bụng' },
  { key: 'neck', label: 'Vòng cổ', required: true, hint: 'Đo ngay dưới yết hầu' },
  { key: 'chest', label: 'Vòng ngực' },
  { key: 'arm', label: 'Vòng bắp tay (gồng)' },
  { key: 'thigh', label: 'Vòng đùi' },
]

export default function Progress() {
  const { profile } = useProfile()
  const [measures, setMeasures] = useStoredState<Measure[]>('measurements', [])
  const [form, setForm] = useState<Record<string, string>>({ date: todayISO() })

  const sorted = [...measures].sort((a, b) => a.date.localeCompare(b.date))
  const latest = sorted.at(-1)
  const first = sorted[0]

  const bf = latest ? navyBodyFat(latest.waist, latest.neck, profile.heightCm) : null
  const firstBf = first ? navyBodyFat(first.waist, first.neck, profile.heightCm) : null
  const ratio = latest ? waistToHeight(latest.waist, profile.heightCm) : null
  const verdict = waistVerdict(ratio)

  const volume = volumeByDate(loadLog())

  const save = () => {
    const waist = Number.parseFloat(form.waist)
    const neck = Number.parseFloat(form.neck)
    if (!Number.isFinite(waist) || !Number.isFinite(neck)) return
    const entry: Measure = {
      date: form.date || todayISO(),
      waist,
      neck,
      chest: Number.parseFloat(form.chest) || undefined,
      arm: Number.parseFloat(form.arm) || undefined,
      thigh: Number.parseFloat(form.thigh) || undefined,
    }
    setMeasures((prev) => [...prev.filter((m) => m.date !== entry.date), entry])
    setForm({ date: todayISO() })
  }

  const remove = (date: string) => setMeasures((prev) => prev.filter((m) => m.date !== date))

  const chartData = sorted.map((m) => ({
    date: m.date.slice(5),
    waist: m.waist,
    bodyFat: navyBodyFat(m.waist, m.neck, profile.heightCm) ?? undefined,
  }))

  const toneClass = { good: 'text-brand', warn: 'text-warn', bad: 'text-danger', muted: 'text-slate-400' }[verdict.tone]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">Tiến độ — đo bằng thước dây</h1>
        <p className="mt-1 max-w-3xl text-sm text-slate-400">
          Không có cân cũng không sao. Với mục tiêu vừa tăng cơ vừa giảm mỡ, cân nặng gần như đứng yên trong khi hình
          thể thay đổi rõ — vòng bụng và ảnh chụp mới là thước đo đúng.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat
          label="Vòng bụng mới nhất"
          value={latest ? latest.waist : '—'}
          unit="cm"
          hint={first && latest && first !== latest ? `ban đầu ${first.waist} cm` : 'chưa có dữ liệu'}
        />
        <Stat
          label="% mỡ ước tính"
          value={bf ?? '—'}
          unit="%"
          tone="blue"
          hint={firstBf && bf && firstBf !== bf ? `ban đầu ${firstBf}%` : 'công thức US Navy'}
        />
        <Stat label="Bụng / chiều cao" value={ratio ?? '—'} tone="warn" hint="dưới 0,46 là rõ cơ bụng" />
        <Stat label="Số lần đo" value={measures.length} tone="muted" hint="nên đo mỗi tuần 1 lần" />
      </div>

      {latest && (
        <Card>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-slate-400">Đánh giá hiện tại:</span>
            <span className={`text-lg font-bold ${toneClass}`}>{verdict.text}</span>
            <Pill tone="muted">
              Mục tiêu 6 múi: vòng bụng ≈ {Math.round(profile.heightCm * 0.45)} cm (tỉ lệ 0,45)
            </Pill>
          </div>
        </Card>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <SectionTitle title="Ghi số đo mới" subtitle="Chỉ cần vòng bụng và vòng cổ là tính được % mỡ" />
          <div className="space-y-3">
            <label className="block">
              <span className="mb-1 block text-xs text-slate-400">Ngày đo</span>
              <input
                type="date"
                value={form.date ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                className="w-full rounded-xl border border-line bg-panel2 px-3 py-2 text-sm text-white outline-none focus:border-brand/60"
              />
            </label>
            {FIELDS.map((f) => (
              <label key={f.key} className="block">
                <span className="mb-1 block text-xs text-slate-400">
                  {f.label} {f.required && <span className="text-danger">*</span>}
                  <span className="ml-1 text-slate-600">(cm)</span>
                </span>
                <input
                  inputMode="decimal"
                  value={form[f.key] ?? ''}
                  onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                  className="w-full rounded-xl border border-line bg-panel2 px-3 py-2 text-sm text-white outline-none focus:border-brand/60"
                />
                {f.hint && <span className="mt-1 block text-[11px] text-slate-600">{f.hint}</span>}
              </label>
            ))}
            <button
              type="button"
              onClick={save}
              className="w-full rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110"
            >
              Lưu số đo
            </button>
          </div>
        </Card>

        <Card>
          <SectionTitle title="Biểu đồ vòng bụng & % mỡ" />
          {chartData.length < 2 ? (
            <Empty>Cần ít nhất 2 lần đo để vẽ biểu đồ.</Empty>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="#233041" strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} domain={['dataMin - 2', 'dataMax + 2']} />
                  <Tooltip
                    contentStyle={{ background: '#121820', border: '1px solid #233041', borderRadius: 12 }}
                    labelStyle={{ color: '#e6edf5' }}
                  />
                  <Line type="monotone" dataKey="waist" name="Vòng bụng (cm)" stroke="#22d3a6" strokeWidth={2} dot />
                  <Line type="monotone" dataKey="bodyFat" name="% mỡ" stroke="#0ea5e9" strokeWidth={2} dot />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>

      {volume.length >= 2 && (
        <Card>
          <SectionTitle
            title="Tổng khối lượng nâng theo buổi"
            subtitle="Tính từ nhật ký tập: tổng của mức tạ × số lần. Đường này đi lên nghĩa là bạn đang mạnh hơn."
          />
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={volume.map((v) => ({ ...v, date: v.date.slice(5) }))} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="#233041" strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ background: '#121820', border: '1px solid #233041', borderRadius: 12 }}
                  labelStyle={{ color: '#e6edf5' }}
                />
                <Line type="monotone" dataKey="volume" name="Khối lượng (kg)" stroke="#f59e0b" strokeWidth={2} dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      <Card>
        <SectionTitle title="Lịch sử số đo" />
        {sorted.length === 0 ? (
          <Empty>Chưa có số đo nào. Hãy đo lần đầu ngay hôm nay để có mốc so sánh.</Empty>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead className="border-b border-line/70 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="py-2 pr-3">Ngày</th>
                  <th className="py-2 pr-3 text-right">Bụng</th>
                  <th className="py-2 pr-3 text-right">Cổ</th>
                  <th className="py-2 pr-3 text-right">Ngực</th>
                  <th className="py-2 pr-3 text-right">Tay</th>
                  <th className="py-2 pr-3 text-right">% mỡ</th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line/40">
                {[...sorted].reverse().map((m) => (
                  <tr key={m.date}>
                    <td className="py-2 pr-3 text-slate-300">{m.date}</td>
                    <td className="py-2 pr-3 text-right tabular-nums text-brand">{m.waist}</td>
                    <td className="py-2 pr-3 text-right tabular-nums text-slate-400">{m.neck}</td>
                    <td className="py-2 pr-3 text-right tabular-nums text-slate-400">{m.chest ?? '—'}</td>
                    <td className="py-2 pr-3 text-right tabular-nums text-slate-400">{m.arm ?? '—'}</td>
                    <td className="py-2 pr-3 text-right tabular-nums text-brand2">
                      {navyBodyFat(m.waist, m.neck, profile.heightCm) ?? '—'}
                    </td>
                    <td className="py-2 text-right">
                      <button
                        type="button"
                        onClick={() => remove(m.date)}
                        className="rounded-lg p-1.5 text-slate-600 hover:bg-danger/10 hover:text-danger"
                        aria-label="Xoá"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card>
        <SectionTitle title="Cách chụp ảnh so sánh cho đúng" />
        <ul className="space-y-1.5 text-sm text-slate-300">
          {[
            'Chụp vào sáng chủ nhật, sau khi đi vệ sinh và trước khi ăn.',
            'Cùng một vị trí, cùng ánh sáng, cùng khoảng cách máy ảnh.',
            'Ba góc: chính diện, nghiêng, sau lưng. Đứng thả lỏng, không gồng.',
            'Hai tuần một lần là đủ. Nhìn hằng ngày sẽ không thấy gì và chỉ gây nản.',
          ].map((t) => (
            <li key={t} className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
              {t}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
