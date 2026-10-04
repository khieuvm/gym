// Build cho GitHub Pages: đặt base path theo tên repository.
// Đổi bằng biến môi trường VITE_BASE nếu tên repo khác.
import { execSync } from 'node:child_process'

const base = process.env.VITE_BASE ?? '/Gym/'
console.log(`Build với base = ${base}`)
execSync('npx tsc -b && npx vite build', {
  stdio: 'inherit',
  env: { ...process.env, VITE_BASE: base },
})
