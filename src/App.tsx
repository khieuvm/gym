import { lazy, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { ProfileProvider } from './lib/profileContext'
import Dashboard from './pages/Dashboard'
import Program from './pages/Program'
import SessionDetail from './pages/SessionDetail'
import Exercises from './pages/Exercises'
import ExerciseDetail from './pages/ExerciseDetail'
import Nutrition from './pages/Nutrition'
import Portions from './pages/Portions'
import Knowledge from './pages/Knowledge'
import ArticleDetail from './pages/ArticleDetail'
import SettingsPage from './pages/Settings'

// Trang Tiến độ kéo theo thư viện biểu đồ nặng nên tách ra tải riêng khi cần
const Progress = lazy(() => import('./pages/Progress'))

export default function App() {
  return (
    <ProfileProvider>
      <HashRouter>
        <Layout>
          <Suspense fallback={<div className="py-16 text-center text-sm text-slate-500">Đang tải…</div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/lich-tap" element={<Program />} />
              <Route path="/buoi-tap/:id" element={<SessionDetail />} />
              <Route path="/bai-tap" element={<Exercises />} />
              <Route path="/bai-tap/:id" element={<ExerciseDetail />} />
              <Route path="/dinh-duong" element={<Nutrition />} />
              <Route path="/quy-doi" element={<Portions />} />
              <Route path="/tien-do" element={<Progress />} />
              <Route path="/kien-thuc" element={<Knowledge />} />
              <Route path="/kien-thuc/:id" element={<ArticleDetail />} />
              <Route path="/cai-dat" element={<SettingsPage />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </Suspense>
        </Layout>
      </HashRouter>
    </ProfileProvider>
  )
}
