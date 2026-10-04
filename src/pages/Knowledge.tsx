import { Link } from 'react-router-dom'
import { ARTICLES } from '../data/knowledge'
import { Card } from '../components/ui'

export default function Knowledge() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">Kiến thức nền</h1>
        <p className="mt-1 max-w-3xl text-sm text-slate-400">
          Những gì bạn cần hiểu để tự ra quyết định, thay vì làm theo cảm tính hay quảng cáo. Viết riêng cho tình
          huống của bạn: skinny fat, làm IT, đạp xe đi làm và đá bóng mỗi tuần.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {ARTICLES.map((a) => (
          <Link key={a.id} to={`/kien-thuc/${a.id}`}>
            <Card className="h-full transition hover:border-brand/40">
              <h2 className="font-semibold text-white">{a.title}</h2>
              <p className="mt-1.5 text-sm text-slate-400">{a.summary}</p>
              <span className="mt-3 inline-block text-sm font-medium text-brand">Đọc tiếp →</span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
