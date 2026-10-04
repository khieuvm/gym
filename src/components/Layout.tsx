import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import {
  BookOpen,
  CalendarDays,
  Dumbbell,
  Home,
  LineChart,
  Scale,
  Settings,
  Utensils,
} from 'lucide-react'

const NAV = [
  { to: '/', label: 'Hôm nay', icon: Home, end: true },
  { to: '/lich-tap', label: 'Lịch tập', icon: CalendarDays, end: false },
  { to: '/bai-tap', label: 'Bài tập', icon: Dumbbell, end: false },
  { to: '/dinh-duong', label: 'Dinh dưỡng', icon: Utensils, end: false },
  { to: '/quy-doi', label: 'Quy đổi', icon: Scale, end: false },
  { to: '/tien-do', label: 'Tiến độ', icon: LineChart, end: false },
  { to: '/kien-thuc', label: 'Kiến thức', icon: BookOpen, end: false },
  { to: '/cai-dat', label: 'Cài đặt', icon: Settings, end: false },
]

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-7xl gap-6 px-3 pb-24 pt-4 sm:px-5 lg:pb-8">
      <aside className="no-print sticky top-4 hidden h-fit w-56 shrink-0 lg:block">
        <div className="mb-6 px-2">
          <div className="text-xl font-black tracking-tight text-white">
            Gym<span className="text-brand">Coach</span>
          </div>
          <div className="text-xs text-slate-500">Giáo án cá nhân · 171 cm</div>
        </div>
        <nav className="space-y-1">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-brand/15 text-brand' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="no-print mb-4 flex items-center justify-between lg:hidden">
          <div className="text-lg font-black tracking-tight text-white">
            Gym<span className="text-brand">Coach</span>
          </div>
        </header>
        {children}
      </main>

      <nav className="no-print fixed inset-x-0 bottom-0 z-20 flex justify-around border-t border-line bg-ink/95 px-1 py-1.5 backdrop-blur lg:hidden">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-lg px-1 py-1 text-[10px] font-medium ${
                isActive ? 'text-brand' : 'text-slate-500'
              }`
            }
          >
            <Icon size={18} />
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
