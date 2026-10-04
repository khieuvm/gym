import { useRef } from 'react'
import { Download, RotateCcw, Upload } from 'lucide-react'
import { useProfile } from '../lib/profileContext'
import { GOAL_LABEL, bmr, restingBurn, type Goal, type Profile } from '../lib/nutrition'
import { clearAllData, exportAllData, importAllData } from '../lib/storage'
import { Card, SectionTitle, Stat } from '../components/ui'

const NUMBER_FIELDS: { key: keyof Profile; label: string; unit: string; step: string; hint?: string }[] = [
  { key: 'heightCm', label: 'Chiều cao', unit: 'cm', step: '0.5' },
  { key: 'weightKg', label: 'Cân nặng', unit: 'kg', step: '0.5', hint: 'Nếu không có cân, dùng số đo gần nhất ở phòng gym hoặc trạm y tế' },
  { key: 'age', label: 'Tuổi', unit: 'tuổi', step: '1' },
  { key: 'proteinPerKg', label: 'Đạm mỗi kg cân nặng', unit: 'g/kg', step: '0.1', hint: '1,6–2,2 g/kg là khoảng hiệu quả' },
  { key: 'fatPerKg', label: 'Chất béo mỗi kg', unit: 'g/kg', step: '0.1', hint: 'Không nên dưới 0,6 g/kg' },
  { key: 'neatFactor', label: 'Hệ số vận động ngoài tập', unit: '×', step: '0.05', hint: '1,2 ngồi cả ngày · 1,25 có đi lại · 1,35 hay đứng/đi bộ' },
]

const CREDITS = [
  {
    name: 'free-exercise-db (yuhonas)',
    note: 'Ảnh minh hoạ và dữ liệu bài tập · Unlicense (phạm vi công cộng)',
    url: 'https://github.com/yuhonas/free-exercise-db',
  },
  {
    name: 'wger',
    note: 'Video minh hoạ bài tập · Creative Commons BY-SA (ghi rõ tác giả trong từng video)',
    url: 'https://wger.de',
  },
  {
    name: 'USDA FoodData Central',
    note: 'Giá trị dinh dưỡng trên 100 g · CC0 (phạm vi công cộng)',
    url: 'https://fdc.nal.usda.gov',
  },
  {
    name: 'Bảng thành phần thực phẩm Việt Nam 2007 — Viện Dinh dưỡng',
    note: 'Số liệu tham chiếu cho thực phẩm Việt · bản PDF do FAO/INFOODS lưu trữ',
    url: 'https://www.fao.org/infoods/infoods/tables-and-databases/asia/en/',
  },
]

export default function SettingsPage() {
  const { profile, setProfile, resetProfile } = useProfile()
  const fileRef = useRef<HTMLInputElement>(null)

  const setNumber = (key: keyof Profile, value: string) => {
    const n = Number.parseFloat(value)
    setProfile((p) => ({ ...p, [key]: Number.isFinite(n) ? n : 0 }))
  }

  const doExport = () => {
    const blob = new Blob([JSON.stringify(exportAllData(), null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `gymcoach-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const doImport = async (file: File) => {
    try {
      importAllData(JSON.parse(await file.text()))
      window.location.reload()
    } catch {
      alert('File sao lưu không hợp lệ.')
    }
  }

  const doClear = () => {
    if (!confirm('Xoá toàn bộ dữ liệu đã lưu trên máy (nhật ký tập, số đo, nhật ký ăn)?')) return
    clearAllData()
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">Cài đặt</h1>
        <p className="mt-1 text-sm text-slate-400">
          Mọi dữ liệu chỉ nằm trong trình duyệt của bạn, không gửi đi đâu cả.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="BMR (chuyển hoá cơ bản)" value={Math.round(bmr(profile))} unit="kcal" tone="muted" />
        <Stat label="Tiêu hao ngày nghỉ" value={Math.round(restingBurn(profile))} unit="kcal" tone="blue" />
        <Stat
          label="Đạm mục tiêu"
          value={Math.round(profile.weightKg * profile.proteinPerKg)}
          unit="g/ngày"
          tone="brand"
        />
      </div>

      <Card>
        <SectionTitle title="Thông số cá nhân" subtitle="Thay đổi sẽ tự động cập nhật mọi mục tiêu calo trong app" />
        <div className="grid gap-3 sm:grid-cols-2">
          {NUMBER_FIELDS.map((f) => (
            <label key={f.key} className="block">
              <span className="mb-1 block text-xs text-slate-400">
                {f.label} <span className="text-slate-600">({f.unit})</span>
              </span>
              <input
                type="number"
                step={f.step}
                value={String(profile[f.key])}
                onChange={(e) => setNumber(f.key, e.target.value)}
                className="w-full rounded-xl border border-line bg-panel2 px-3 py-2 text-sm text-white outline-none focus:border-brand/60"
              />
              {f.hint && <span className="mt-1 block text-[11px] text-slate-600">{f.hint}</span>}
            </label>
          ))}
        </div>

        <div className="mt-4">
          <span className="mb-2 block text-xs text-slate-400">Mục tiêu</span>
          <div className="space-y-2">
            {(Object.keys(GOAL_LABEL) as Goal[]).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setProfile((p) => ({ ...p, goal: g }))}
                className={`block w-full rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                  profile.goal === g
                    ? 'border-brand/50 bg-brand/10 text-brand'
                    : 'border-line bg-panel2 text-slate-300 hover:border-brand/30'
                }`}
              >
                {GOAL_LABEL[g]}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Với người skinny fat mới tập, “tái cấu trúc cơ thể” là lựa chọn cho kết quả tốt nhất: ăn quanh mức duy trì,
            đạm cao, tập đều — cơ lên và mỡ xuống cùng lúc.
          </p>
        </div>

        <button
          type="button"
          onClick={resetProfile}
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-sm text-slate-300 hover:border-brand/50 hover:text-brand"
        >
          <RotateCcw size={15} /> Khôi phục thông số mặc định
        </button>
      </Card>

      <Card>
        <SectionTitle title="Sao lưu dữ liệu" subtitle="Nên xuất file mỗi tháng một lần để khỏi mất nhật ký" />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={doExport}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-ink hover:brightness-110"
          >
            <Download size={16} /> Xuất file JSON
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2 text-sm font-medium text-slate-300 hover:border-brand/50 hover:text-brand"
          >
            <Upload size={16} /> Nhập từ file
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) void doImport(f)
            }}
          />
          <button
            type="button"
            onClick={doClear}
            className="inline-flex items-center gap-2 rounded-xl border border-danger/40 px-4 py-2 text-sm font-medium text-danger hover:bg-danger/10"
          >
            Xoá toàn bộ dữ liệu
          </button>
        </div>
      </Card>

      <Card>
        <SectionTitle title="Nguồn dữ liệu & giấy phép" />
        <ul className="space-y-3 text-sm">
          {CREDITS.map((c) => (
            <li key={c.url}>
              <a href={c.url} target="_blank" rel="noreferrer" className="font-medium text-brand2 hover:underline">
                {c.name}
              </a>
              <div className="text-xs text-slate-500">{c.note}</div>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-slate-500">
          Nội dung tiếng Việt, giáo án và bảng quy đổi khẩu phần do dự án này tự biên soạn. Ứng dụng mang tính tham
          khảo, không thay thế tư vấn của bác sĩ hay huấn luyện viên. Nếu bạn có chấn thương hoặc bệnh nền, hãy hỏi ý
          kiến chuyên gia trước khi áp dụng.
        </p>
      </Card>
    </div>
  )
}
