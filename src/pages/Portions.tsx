import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { FOODS, FOOD_BY_ID, HAND_RULES } from '../data/foods'
import { FOOD_CATEGORY_LABEL, type FoodCategory } from '../lib/types'
import { WEEK, todayKey } from '../data/program'
import { macroTarget } from '../lib/nutrition'
import { useProfile } from '../lib/profileContext'
import { useStoredState } from '../lib/storage'
import { Bar, Card, Empty, Pill, SectionTitle, Stat } from '../components/ui'
import { todayISO } from '../lib/dates'

type Entry = { foodId: string; unit: string; amount: number }

const CATEGORIES = Object.keys(FOOD_CATEGORY_LABEL) as FoodCategory[]

function macrosOf(entry: Entry) {
  const food = FOOD_BY_ID.get(entry.foodId)
  const unit = food?.units.find((u) => u.label === entry.unit)
  if (!food || !unit) return { grams: 0, kcal: 0, protein: 0, carb: 0, fat: 0 }
  const grams = unit.grams * entry.amount
  const k = grams / 100
  return {
    grams,
    kcal: food.per100g.kcal * k,
    protein: food.per100g.protein * k,
    carb: food.per100g.carb * k,
    fat: food.per100g.fat * k,
  }
}

export default function Portions() {
  const { profile } = useProfile()
  const day = WEEK.find((d) => d.key === todayKey())!
  const target = macroTarget(profile, day.sessionIds)
  const iso = todayISO()

  const [foodId, setFoodId] = useState(FOODS[0].id)
  const [unit, setUnit] = useState(FOODS[0].units[0].label)
  const [amount, setAmount] = useState('1')
  const [cat, setCat] = useState<FoodCategory | 'all'>('all')
  const [diary, setDiary] = useStoredState<Record<string, Entry[]>>('food-diary', {})

  const food = FOOD_BY_ID.get(foodId)!
  const preview = macrosOf({ foodId, unit, amount: Number.parseFloat(amount) || 0 })
  const entries = diary[iso] ?? []

  const totals = entries.reduce(
    (acc, e) => {
      const m = macrosOf(e)
      acc.kcal += m.kcal
      acc.protein += m.protein
      acc.carb += m.carb
      acc.fat += m.fat
      return acc
    },
    { kcal: 0, protein: 0, carb: 0, fat: 0 },
  )

  const pickFood = (id: string) => {
    setFoodId(id)
    setUnit(FOOD_BY_ID.get(id)!.units[0].label)
  }

  const add = () => {
    const value = Number.parseFloat(amount)
    if (!Number.isFinite(value) || value <= 0) return
    setDiary((prev) => ({ ...prev, [iso]: [...(prev[iso] ?? []), { foodId, unit, amount: value }] }))
  }

  const remove = (index: number) =>
    setDiary((prev) => ({ ...prev, [iso]: (prev[iso] ?? []).filter((_, i) => i !== index) }))

  const visibleFoods = cat === 'all' ? FOODS : FOODS.filter((f) => f.category === cat)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">Quy đổi khẩu phần — không cần cân</h1>
        <p className="mt-1 max-w-3xl text-sm text-slate-400">
          Bàn tay của bạn luôn đi cùng cơ thể bạn, nên nó là dụng cụ đo tiện nhất. Sai số khoảng 10–15% — thừa đủ chính
          xác để theo dõi xu hướng qua từng tuần.
        </p>
      </div>

      <section>
        <SectionTitle title="Bảng quy đổi bằng tay và vật dụng nhà bếp" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HAND_RULES.map((r) => (
            <Card key={r.measure}>
              <div className="text-sm font-semibold text-white">{r.measure}</div>
              <div className="mt-1 text-sm text-brand">{r.equals}</div>
              <p className="mt-2 text-xs text-slate-400">{r.use}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <SectionTitle title="Công cụ quy đổi" subtitle="Chọn món và đơn vị quen thuộc, hệ thống đổi ra gram và calo" />
          <div className="space-y-3">
            <label className="block">
              <span className="mb-1 block text-xs text-slate-400">Món ăn</span>
              <select
                value={foodId}
                onChange={(e) => pickFood(e.target.value)}
                className="w-full rounded-xl border border-line bg-panel2 px-3 py-2 text-sm text-white outline-none focus:border-brand/60"
              >
                {CATEGORIES.map((c) => (
                  <optgroup key={c} label={FOOD_CATEGORY_LABEL[c]}>
                    {FOODS.filter((f) => f.category === c).map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-[1fr_90px] gap-2">
              <label className="block">
                <span className="mb-1 block text-xs text-slate-400">Đơn vị</span>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full rounded-xl border border-line bg-panel2 px-3 py-2 text-sm text-white outline-none focus:border-brand/60"
                >
                  {food.units.map((u) => (
                    <option key={u.label} value={u.label}>
                      {u.label} (~{u.grams} g)
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-slate-400">Số lượng</span>
                <input
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-xl border border-line bg-panel2 px-3 py-2 text-sm text-white outline-none focus:border-brand/60"
                />
              </label>
            </div>

            {food.units.find((u) => u.label === unit)?.hint && (
              <p className="text-xs text-slate-500">{food.units.find((u) => u.label === unit)!.hint}</p>
            )}

            <div className="grid grid-cols-4 gap-2">
              <Stat label="Khối lượng" value={Math.round(preview.grams)} unit="g" tone="muted" />
              <Stat label="Calo" value={Math.round(preview.kcal)} unit="kcal" />
              <Stat label="Đạm" value={Math.round(preview.protein)} unit="g" tone="blue" />
              <Stat label="Béo" value={Math.round(preview.fat)} unit="g" tone="warn" />
            </div>

            {food.note && <p className="rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-400">{food.note}</p>}

            <button
              type="button"
              onClick={add}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110"
            >
              <Plus size={16} /> Thêm vào nhật ký hôm nay
            </button>
          </div>
        </Card>

        <Card>
          <SectionTitle
            title="Nhật ký ăn uống hôm nay"
            subtitle={`${day.label} · mục tiêu ${target.kcal} kcal / ${target.protein} g đạm`}
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Calo</span>
              <span className="tabular-nums">
                {Math.round(totals.kcal)} / {target.kcal} kcal
              </span>
            </div>
            <Bar value={totals.kcal} max={target.kcal} />
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Đạm</span>
              <span className="tabular-nums">
                {Math.round(totals.protein)} / {target.protein} g
              </span>
            </div>
            <Bar value={totals.protein} max={target.protein} tone="blue" />
            <p className="pt-1 text-xs text-slate-500">
              Còn lại: {Math.max(0, target.kcal - Math.round(totals.kcal))} kcal ·{' '}
              {Math.max(0, target.protein - Math.round(totals.protein))} g đạm
            </p>
          </div>

          <div className="mt-4">
            {entries.length === 0 ? (
              <Empty>Chưa ghi món nào hôm nay.</Empty>
            ) : (
              <ul className="divide-y divide-line/50">
                {entries.map((e, i) => {
                  const f = FOOD_BY_ID.get(e.foodId)
                  const m = macrosOf(e)
                  return (
                    <li key={`${e.foodId}-${i}`} className="flex items-center justify-between gap-3 py-2">
                      <div className="min-w-0">
                        <div className="truncate text-sm text-slate-200">{f?.name ?? e.foodId}</div>
                        <div className="text-xs text-slate-500">
                          {e.amount} {e.unit} ≈ {Math.round(m.grams)} g
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <div className="text-right text-xs tabular-nums text-slate-400">
                          <div>{Math.round(m.kcal)} kcal</div>
                          <div className="text-slate-600">{Math.round(m.protein)} g đạm</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(i)}
                          className="rounded-lg p-1.5 text-slate-500 hover:bg-danger/10 hover:text-danger"
                          aria-label="Xoá"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </Card>
      </section>

      <section>
        <SectionTitle title="Bảng tra nhanh" subtitle="Giá trị cho một khẩu phần đo bằng đơn vị gia đình" />
        <div className="no-print mb-3 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setCat('all')}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              cat === 'all' ? 'bg-brand/20 text-brand' : 'bg-white/5 text-slate-400 hover:text-slate-200'
            }`}
          >
            Tất cả
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                cat === c ? 'bg-brand/20 text-brand' : 'bg-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              {FOOD_CATEGORY_LABEL[c]}
            </button>
          ))}
        </div>

        <Card pad={false} className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="border-b border-line/70 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Món</th>
                <th className="px-4 py-3">1 khẩu phần</th>
                <th className="px-4 py-3 text-right">Gram</th>
                <th className="px-4 py-3 text-right">Calo</th>
                <th className="px-4 py-3 text-right">Đạm</th>
                <th className="px-4 py-3 text-right">Béo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/40">
              {visibleFoods.map((f) => {
                const u = f.units[0]
                const k = u.grams / 100
                return (
                  <tr key={f.id} className="hover:bg-white/3">
                    <td className="px-4 py-2.5">
                      <div className="font-medium text-slate-200">{f.name}</div>
                      {f.category === 'avoid' && (
                        <span className="mt-1 inline-block">
                          <Pill tone="danger">Hạn chế</Pill>
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-slate-400">{u.label}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-slate-400">{Math.round(u.grams)}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums font-semibold text-brand">
                      {Math.round(f.per100g.kcal * k)}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-slate-300">
                      {Math.round(f.per100g.protein * k)}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-slate-400">
                      {Math.round(f.per100g.fat * k)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  )
}
