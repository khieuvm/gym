/** Ngày hôm nay theo giờ địa phương, dạng YYYY-MM-DD (không dùng toISOString vì nó quy về UTC). */
export function todayISO(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
