// Build cho GitHub Pages ở máy local (để xem thử bản production).
// Trên CI thì workflow .github/workflows/deploy.yml tự đặt VITE_BASE.
import { execSync } from 'node:child_process'

const base = process.env.VITE_BASE ?? '/gym/'
console.log(`Build với base = ${base}`)
execSync('npx tsc -b && npx vite build', {
  stdio: 'inherit',
  env: { ...process.env, VITE_BASE: base },
})
