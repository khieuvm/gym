import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ARTICLE_BY_ID } from '../data/knowledge'
import { Card, Empty, SectionTitle } from '../components/ui'

export default function ArticleDetail() {
  const { id } = useParams()
  const article = id ? ARTICLE_BY_ID.get(id) : undefined

  if (!article) {
    return (
      <div className="space-y-4">
        <Empty>Không tìm thấy bài viết.</Empty>
        <Link to="/kien-thuc" className="text-sm text-brand hover:underline">
          ← Về trang kiến thức
        </Link>
      </div>
    )
  }

  return (
    <article className="space-y-5">
      <Link to="/kien-thuc" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-brand">
        <ArrowLeft size={14} /> Kiến thức
      </Link>

      <header>
        <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">{article.title}</h1>
        <p className="mt-2 max-w-3xl text-base text-slate-300">{article.summary}</p>
      </header>

      <div className="space-y-4">
        {article.sections.map((s) => (
          <Card key={s.heading}>
            <SectionTitle title={s.heading} />
            {s.body.map((p) => (
              <p key={p} className="mb-2 text-sm leading-relaxed text-slate-300 last:mb-0">
                {p}
              </p>
            ))}
            {s.list && (
              <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
                {s.list.map((li) => (
                  <li key={li} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                    {li}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        ))}
      </div>

      {article.sources && article.sources.length > 0 && (
        <Card>
          <SectionTitle title="Nguồn tham khảo" />
          <ul className="space-y-1.5 text-sm">
            {article.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer" className="text-brand2 hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </article>
  )
}
