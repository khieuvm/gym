import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MEAL_PLANS, itemGrams, itemMacros, planMacros, sumMacros } from '../data/mealPlans'
import { FOOD_BY_ID } from '../data/foods'
import { WEEK, todayKey } from '../data/program'
import { macroTarget } from '../lib/nutrition'
import { useProfile } from '../lib/profileContext'
import { Bar, Card, Pill, SectionTitle, Stat } from '../components/ui'

const PRINCIPLES = [
  {
    title: 'Đạm là ưu tiên số một',
    body: 'Mỗi bữa chính phải có ít nhất 1,5 lòng bàn tay thịt/cá/trứng. Đủ đạm thì vừa giữ được cơ khi giảm mỡ, vừa no lâu hơn.',
  },
  {
    title: 'Tinh bột xoay quanh buổi tập',
    body: 'Ngày tập tạ và ngày đạp xe ăn nhiều cơm hơn, ngày nghỉ cắt bớt. Cùng một tuần nhưng calo lên xuống theo mức vận động.',
  },
  {
    title: 'Rau trước, cơm sau',
    body: 'Ăn rau và đạm trước rồi mới tới cơm. Cùng một bữa nhưng bạn sẽ tự động ăn ít tinh bột hơn mà không thấy thiếu.',
  },
  {
    title: 'Để ý dầu mỡ và đồ uống',
    body: '2 muỗng canh dầu ăn bằng calo của 1,5 chén cơm. Một ly trà sữa bằng gần 4 chén cơm mà không hề no.',
  },
  {
    title: 'Nấu sẵn vào chủ nhật',
    body: 'Luộc 1 kg ức gà, luộc trứng, nấu một nồi cơm. Ba ngày đầu tuần chỉ cần hâm lại là xong — không còn cớ gọi đồ ăn ngoài.',
  },
  {
    title: 'Không cần hoàn hảo',
    body: 'Làm đúng 80% số bữa là đủ để đạt mục tiêu. Một bữa lỡ miệng không phá hỏng gì, bỏ cuộc mới phá hỏng.',
  },
]

export default function Nutrition() {
  const { profile } = useProfile()
  const today = todayKey()
  const defaultPlan = MEAL_PLANS.find((p) => p.dayKeys.includes(today)) ?? MEAL_PLANS[0]
  const [planId, setPlanId] = useState(defaultPlan.id)
  const plan = MEAL_PLANS.find((p) => p.id === planId)!

  const dayKey = plan.dayKeys[0]
  const day = WEEK.find((d) => d.key === dayKey)!
  const target = macroTarget(profile, day.sessionIds)
  const totals = planMacros(plan)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">Chế độ ăn</h1>
        <p className="mt-1 max-w-3xl text-sm text-slate-400">
          Thực đơn mẫu bằng món Việt quen thuộc, đong bằng chén và lòng bàn tay thay vì cân.{' '}
          <Link to="/quy-doi" className="font-medium text-brand hover:underline">
            Xem bảng quy đổi →
          </Link>
        </p>
      </div>

      <div className="no-print flex flex-wrap gap-1.5">
        {MEAL_PLANS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPlanId(p.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              p.id === planId ? 'bg-brand/20 text-brand' : 'bg-white/5 text-slate-400 hover:text-slate-200'
            }`}
          >
            {p.name.replace('Thực đơn ', '')}
          </button>
        ))}
      </div>

      <Card>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white">{plan.name}</h2>
            <p className="text-sm text-slate-400">Áp dụng: {plan.appliesTo}</p>
          </div>
          <Pill tone="blue">Mục tiêu ngày này: {target.kcal} kcal</Pill>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Calo thực đơn" value={Math.round(totals.kcal)} unit="kcal" hint={`mục tiêu ${target.kcal}`} />
          <Stat
            label="Đạm"
            value={Math.round(totals.protein)}
            unit="g"
            tone="blue"
            hint={`mục tiêu ${target.protein} g`}
          />
          <Stat label="Tinh bột" value={Math.round(totals.carb)} unit="g" tone="warn" hint={`mục tiêu ${target.carb} g`} />
          <Stat label="Béo" value={Math.round(totals.fat)} unit="g" tone="muted" hint={`mục tiêu ${target.fat} g`} />
        </div>

        <div className="mt-4 space-y-2">
          <Bar value={totals.kcal} max={target.kcal} />
          <p className="text-xs text-slate-500">
            Chênh lệch so với mục tiêu: {Math.round(totals.kcal - target.kcal) > 0 ? '+' : ''}
            {Math.round(totals.kcal - target.kcal)} kcal. Lệch trong khoảng ±150 kcal là hoàn toàn ổn.
          </p>
        </div>
      </Card>

      <div className="space-y-3">
        {plan.meals.map((meal) => {
          const m = sumMacros(meal.items)
          return (
            <Card key={`${plan.id}-${meal.time}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-brand/15 px-2 py-1 text-xs font-bold tabular-nums text-brand">
                    {meal.time}
                  </span>
                  <span className="font-semibold text-white">{meal.name}</span>
                </div>
                <div className="text-xs tabular-nums text-slate-400">
                  {Math.round(m.kcal)} kcal · {Math.round(m.protein)} g đạm
                </div>
              </div>

              <ul className="mt-3 divide-y divide-line/50">
                {meal.items.map((item) => {
                  const food = FOOD_BY_ID.get(item.foodId)!
                  const macros = itemMacros(item)
                  return (
                    <li key={`${item.foodId}-${item.unit}`} className="flex items-center justify-between gap-3 py-2">
                      <div className="min-w-0">
                        <div className="truncate text-sm text-slate-200">{food.name}</div>
                        <div className="text-xs text-slate-500">
                          {item.amount} {item.unit} ≈ {Math.round(itemGrams(item))} g
                          {item.note ? ` · ${item.note}` : ''}
                        </div>
                      </div>
                      <div className="shrink-0 text-right text-xs tabular-nums text-slate-400">
                        <div>{Math.round(macros.kcal)} kcal</div>
                        <div className="text-slate-600">{Math.round(macros.protein)} g đạm</div>
                      </div>
                    </li>
                  )
                })}
              </ul>

              {meal.tip && (
                <p className="mt-3 rounded-lg bg-brand/8 px-3 py-2 text-xs text-brand/90">{meal.tip}</p>
              )}
            </Card>
          )
        })}
      </div>

      {plan.notes.length > 0 && (
        <Card>
          <SectionTitle title="Ghi chú cho ngày này" />
          <ul className="space-y-1.5 text-sm text-slate-300">
            {plan.notes.map((n) => (
              <li key={n} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                {n}
              </li>
            ))}
          </ul>
        </Card>
      )}

      <section>
        <SectionTitle title="6 nguyên tắc ăn uống" subtitle="Nhớ được 6 điều này là không cần đếm calo từng ngày" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <Card key={p.title}>
              <div className="text-sm font-semibold text-white">{p.title}</div>
              <p className="mt-1 text-sm text-slate-400">{p.body}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
