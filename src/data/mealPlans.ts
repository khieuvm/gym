import { FOOD_BY_ID } from './foods'

export type MealItem = {
  foodId: string
  unit: string
  amount: number
  note?: string
}

export type Meal = {
  time: string
  name: string
  items: MealItem[]
  tip?: string
}

export type MealPlan = {
  id: string
  name: string
  appliesTo: string
  dayKeys: string[]
  meals: Meal[]
  notes: string[]
}

export const MEAL_PLANS: MealPlan[] = [
  {
    id: 'ride-gym-day',
    name: 'Ngày đạp xe + tập tạ',
    appliesTo: 'Thứ 2 — đạp 30 km lên công ty, tối tập Upper A',
    dayKeys: ['mon'],
    meals: [
      {
        time: '05:30',
        name: 'Trước khi đạp',
        items: [
          { foodId: 'banh-mi', unit: 'ổ bánh mì Việt Nam', amount: 1 },
          { foodId: 'chuoi', unit: 'quả vừa (bỏ vỏ)', amount: 1 },
        ],
        tip: 'Ăn nhẹ dễ tiêu trước khi lên xe 30–45 phút, tránh đồ nhiều dầu mỡ.',
      },
      {
        time: '08:00',
        name: 'Sáng, ngay khi tới công ty',
        items: [
          { foodId: 'trung-ga', unit: 'quả (cỡ vừa, phần ăn được)', amount: 3 },
          { foodId: 'yen-mach', unit: 'phần ăn sáng tiêu chuẩn', amount: 1 },
          { foodId: 'sua-tuoi-kd', unit: 'ly 250 ml', amount: 1 },
        ],
        tip: 'Nạp lại trong vòng 60 phút sau khi đạp để chân không bị rã suốt ngày làm việc.',
      },
      {
        time: '12:00',
        name: 'Bữa trưa',
        items: [
          { foodId: 'com-trang', unit: 'chén cơm vừa (gạt ngang)', amount: 3 },
          { foodId: 'uc-ga', unit: 'lòng bàn tay (không tính ngón)', amount: 1 },
          { foodId: 'rau-muong', unit: 'đĩa rau luộc', amount: 1 },
          { foodId: 'dau-an', unit: 'muỗng canh', amount: 1 },
        ],
      },
      {
        time: '15:30',
        name: 'Phụ chiều',
        items: [
          { foodId: 'sua-chua-kd', unit: 'hũ', amount: 1 },
          { foodId: 'dau-phong', unit: 'nắm tay nhỏ', amount: 0.5 },
          { foodId: 'chuoi', unit: 'quả vừa (bỏ vỏ)', amount: 1 },
        ],
        tip: 'Ăn trước buổi tập tối khoảng 2 tiếng.',
      },
      {
        time: '20:00',
        name: 'Sau khi tập',
        items: [
          { foodId: 'com-trang', unit: 'chén cơm vừa (gạt ngang)', amount: 3 },
          { foodId: 'thit-heo-nac', unit: 'lòng bàn tay', amount: 1.5 },
          { foodId: 'cai-thia', unit: 'đĩa rau xào', amount: 1 },
          { foodId: 'dau-an', unit: 'muỗng cà phê', amount: 2 },
        ],
      },
      {
        time: '22:00',
        name: 'Trước khi ngủ',
        items: [{ foodId: 'sua-tuoi-kd', unit: 'ly 250 ml', amount: 1 }],
      },
    ],
    notes: [
      'Đây là ngày tiêu hao lớn nhất tuần: 30 km đạp xe cộng một buổi tạ. Ăn ít đi sẽ mất cơ chứ không giảm được mỡ.',
      'Mang theo một chai nước 750 ml cho chặng đạp, uống từng ngụm mỗi 15 phút.',
    ],
  },
  {
    id: 'gym-day',
    name: 'Ngày tập tạ',
    appliesTo: 'Thứ 3, Thứ 6, Thứ 7',
    dayKeys: ['tue', 'fri', 'sat'],
    meals: [
      {
        time: '06:30',
        name: 'Bữa sáng',
        items: [
          { foodId: 'yen-mach', unit: 'phần ăn sáng tiêu chuẩn', amount: 1 },
          { foodId: 'sua-tuoi-kd', unit: 'ly 250 ml', amount: 1 },
          { foodId: 'trung-ga', unit: 'quả (cỡ vừa, phần ăn được)', amount: 2 },
          { foodId: 'chuoi', unit: 'quả vừa (bỏ vỏ)', amount: 1 },
        ],
        tip: 'Nấu yến mạch với sữa, luộc sẵn trứng từ tối hôm trước để sáng chỉ mất 3 phút.',
      },
      {
        time: '09:30',
        name: 'Phụ sáng tại văn phòng',
        items: [
          { foodId: 'sua-chua-kd', unit: 'hũ', amount: 1 },
          { foodId: 'oi', unit: 'quả vừa', amount: 1, note: 'Hoặc một quả táo' },
        ],
        tip: 'Để sẵn trong tủ lạnh công ty — tránh việc đói rồi gọi trà sữa.',
      },
      {
        time: '12:00',
        name: 'Bữa trưa',
        items: [
          { foodId: 'com-trang', unit: 'chén cơm vừa (gạt ngang)', amount: 1.5 },
          { foodId: 'uc-ga', unit: 'lòng bàn tay (không tính ngón)', amount: 1.5 },
          { foodId: 'rau-muong', unit: 'đĩa rau luộc', amount: 1 },
          { foodId: 'dau-an', unit: 'muỗng canh', amount: 1 },
        ],
        tip: 'Ăn rau trước, rồi đạm, cuối cùng mới tới cơm — no hơn với ít calo hơn.',
      },
      {
        time: '16:30',
        name: 'Trước khi tập',
        items: [{ foodId: 'khoai-lang', unit: 'củ vừa', amount: 1 }],
        tip: 'Ăn trước tập 60–90 phút. Thêm một ly cà phê đen không đường (gần như 0 kcal) để đẩy hiệu suất buổi tập.',
      },
      {
        time: '19:30',
        name: 'Sau khi tập',
        items: [
          { foodId: 'com-trang', unit: 'chén cơm vừa (gạt ngang)', amount: 2 },
          { foodId: 'thit-bo-nac', unit: 'lòng bàn tay', amount: 1.5 },
          { foodId: 'bong-cai-xanh', unit: 'nắm tay', amount: 1 },
        ],
        tip: 'Bữa tinh bột lớn nhất trong ngày nên nằm ngay sau buổi tập.',
      },
      {
        time: '21:30',
        name: 'Trước khi ngủ',
        items: [{ foodId: 'sua-tuoi-kd', unit: 'hộp 180 ml', amount: 1 }],
        tip: 'Đạm chậm tiêu ban đêm hỗ trợ hồi phục. Ngủ trước 23h.',
      },
    ],
    notes: [
      'Ngày tập ăn nhiều tinh bột hơn để có lực đẩy tạ nặng.',
      'Uống 2,5–3 lít nước trải đều cả ngày.',
    ],
  },
  {
    id: 'ride-home-day',
    name: 'Ngày đạp xe về nhà',
    appliesTo: 'Thứ 4 — lấy xe đạp về, không tập tạ',
    dayKeys: ['wed'],
    meals: [
      {
        time: '07:00',
        name: 'Bữa sáng',
        items: [
          { foodId: 'yen-mach', unit: 'phần ăn sáng tiêu chuẩn', amount: 1 },
          { foodId: 'sua-tuoi-kd', unit: 'ly 250 ml', amount: 1 },
          { foodId: 'trung-ga', unit: 'quả (cỡ vừa, phần ăn được)', amount: 2 },
        ],
      },
      {
        time: '09:30',
        name: 'Phụ sáng',
        items: [{ foodId: 'chuoi', unit: 'quả vừa (bỏ vỏ)', amount: 1 }],
      },
      {
        time: '12:00',
        name: 'Bữa trưa',
        items: [
          { foodId: 'com-trang', unit: 'chén cơm vừa (gạt ngang)', amount: 3 },
          { foodId: 'ca-basa', unit: 'miếng phi lê vừa', amount: 1.5 },
          { foodId: 'rau-muong', unit: 'đĩa rau luộc', amount: 1 },
          { foodId: 'dau-an', unit: 'muỗng canh', amount: 1 },
        ],
      },
      {
        time: '16:30',
        name: 'Trước khi đạp về',
        items: [
          { foodId: 'chuoi', unit: 'quả vừa (bỏ vỏ)', amount: 1 },
          { foodId: 'banh-mi', unit: 'ổ bánh mì Việt Nam', amount: 0.5 },
        ],
        tip: 'Nạp nhẹ trước chặng 30 km buổi chiều, nếu không sẽ bị tụt năng lượng giữa đường.',
      },
      {
        time: '20:00',
        name: 'Bữa tối sau khi về tới nhà',
        items: [
          { foodId: 'com-trang', unit: 'chén cơm vừa (gạt ngang)', amount: 3 },
          { foodId: 'thit-heo-nac', unit: 'lòng bàn tay', amount: 1.5 },
          { foodId: 'cai-thia', unit: 'đĩa rau xào', amount: 1 },
          { foodId: 'dau-an', unit: 'muỗng cà phê', amount: 2 },
        ],
      },
      {
        time: '21:30',
        name: 'Trước khi ngủ',
        items: [
          { foodId: 'sua-chua-kd', unit: 'hũ', amount: 1 },
          { foodId: 'dau-phong', unit: 'nắm tay nhỏ', amount: 0.5 },
        ],
      },
    ],
    notes: [
      'Hôm nay không tập tạ nên đạp ở mức nhẹ, mục tiêu là hồi phục chứ không phải phá kỷ lục.',
      'Uống thêm khoảng 1 lít nước so với ngày thường, thêm chút muối nếu ra nhiều mồ hôi.',
    ],
  },
  {
    id: 'football-day',
    name: 'Ngày đá bóng',
    appliesTo: 'Thứ 5',
    dayKeys: ['thu'],
    meals: [
      {
        time: '07:00',
        name: 'Bữa sáng',
        items: [
          { foodId: 'banh-mi', unit: 'ổ bánh mì Việt Nam', amount: 1 },
          { foodId: 'trung-ga', unit: 'quả (cỡ vừa, phần ăn được)', amount: 3 },
          { foodId: 'sua-tuoi-kd', unit: 'ly 250 ml', amount: 1 },
        ],
      },
      {
        time: '09:30',
        name: 'Phụ sáng',
        items: [
          { foodId: 'chuoi', unit: 'quả vừa (bỏ vỏ)', amount: 1 },
          { foodId: 'sua-chua-kd', unit: 'hũ', amount: 1 },
        ],
      },
      {
        time: '12:00',
        name: 'Bữa trưa',
        items: [
          { foodId: 'com-trang', unit: 'chén cơm vừa (gạt ngang)', amount: 3 },
          { foodId: 'uc-ga', unit: 'lòng bàn tay (không tính ngón)', amount: 1.5 },
          { foodId: 'rau-muong', unit: 'đĩa rau luộc', amount: 1 },
          { foodId: 'dau-an', unit: 'muỗng canh', amount: 1 },
        ],
      },
      {
        time: '16:30',
        name: 'Trước trận',
        items: [
          { foodId: 'chuoi', unit: 'quả vừa (bỏ vỏ)', amount: 1 },
          { foodId: 'bap-luoc', unit: 'trái vừa (phần hạt)', amount: 1 },
          { foodId: 'sua-chua-kd', unit: 'hũ', amount: 1 },
        ],
        tip: 'Tinh bột dễ tiêu trước trận khoảng 2 tiếng. Tránh đồ chiên rán.',
      },
      {
        time: '21:00',
        name: 'Sau trận',
        items: [
          { foodId: 'banh-pho', unit: 'tô phở (phần bánh)', amount: 1 },
          { foodId: 'thit-bo-nac', unit: 'phần bò trong tô phở', amount: 2, note: 'Gọi thêm một phần thịt' },
          { foodId: 'trung-ga', unit: 'quả (cỡ vừa, phần ăn được)', amount: 1, note: 'Trứng chần trong tô' },
        ],
        tip: 'Một tô phở gọi thêm thịt là bữa hồi phục sau trận rất hợp lý. Tuyệt đối không bia.',
      },
      {
        time: '22:30',
        name: 'Trước khi ngủ',
        items: [{ foodId: 'sua-tuoi-kd', unit: 'ly 250 ml', amount: 1 }],
      },
    ],
    notes: [
      'Uống đủ nước từ sáng, không chờ tới lúc ra sân mới uống.',
      'Nếu đá xong quá muộn, chọn phở hoặc bún thay vì đồ nướng nhiều dầu mỡ.',
    ],
  },
  {
    id: 'rest-day',
    name: 'Ngày nghỉ',
    appliesTo: 'Chủ nhật',
    dayKeys: ['sun'],
    meals: [
      {
        time: '07:30',
        name: 'Bữa sáng',
        items: [
          { foodId: 'trung-ga', unit: 'quả (cỡ vừa, phần ăn được)', amount: 3 },
          { foodId: 'banh-mi', unit: 'ổ bánh mì Việt Nam', amount: 0.5 },
          { foodId: 'dua-leo', unit: 'quả vừa', amount: 0.5 },
          { foodId: 'sua-dau-nanh-kd', unit: 'ly 250 ml', amount: 1 },
        ],
      },
      {
        time: '12:00',
        name: 'Bữa trưa',
        items: [
          { foodId: 'com-trang', unit: 'chén cơm vừa (gạt ngang)', amount: 1.5 },
          { foodId: 'uc-ga', unit: 'lòng bàn tay (không tính ngón)', amount: 2 },
          { foodId: 'bong-cai-xanh', unit: 'nắm tay', amount: 2 },
          { foodId: 'dau-an', unit: 'muỗng cà phê', amount: 2 },
        ],
        tip: 'Ngày nghỉ giảm tinh bột, tăng rau và đạm để vẫn no mà tổng calo thấp hơn.',
      },
      {
        time: '16:00',
        name: 'Phụ chiều',
        items: [
          { foodId: 'oi', unit: 'quả vừa', amount: 1 },
          { foodId: 'hat-dieu', unit: 'nắm tay nhỏ', amount: 0.5 },
        ],
      },
      {
        time: '19:00',
        name: 'Bữa tối',
        items: [
          { foodId: 'ca-thu', unit: 'khúc cá vừa', amount: 1 },
          { foodId: 'khoai-lang', unit: 'củ vừa', amount: 1 },
          { foodId: 'rau-muong', unit: 'đĩa rau luộc', amount: 1 },
        ],
      },
      {
        time: '21:00',
        name: 'Trước khi ngủ',
        items: [{ foodId: 'sua-chua-kd', unit: 'hũ', amount: 1 }],
      },
    ],
    notes: [
      'Ngày nghỉ là ngày thâm hụt calo mạnh nhất tuần — đây chính là lúc mỡ bụng bị đốt.',
      'Dành một tiếng chiều chủ nhật nấu sẵn 1 kg ức gà và một nồi cơm cho ba ngày đầu tuần.',
    ],
  },
]

export const PLAN_BY_DAY = new Map<string, MealPlan>()
for (const plan of MEAL_PLANS) for (const d of plan.dayKeys) PLAN_BY_DAY.set(d, plan)

export function itemGrams(item: MealItem) {
  const food = FOOD_BY_ID.get(item.foodId)
  if (!food) throw new Error(`Không tìm thấy thực phẩm: ${item.foodId}`)
  const unit = food.units.find((u) => u.label === item.unit)
  if (!unit) throw new Error(`Thực phẩm ${item.foodId} không có đơn vị "${item.unit}"`)
  return unit.grams * item.amount
}

export function itemMacros(item: MealItem) {
  const food = FOOD_BY_ID.get(item.foodId)!
  const g = itemGrams(item)
  const k = g / 100
  return {
    grams: g,
    kcal: food.per100g.kcal * k,
    protein: food.per100g.protein * k,
    carb: food.per100g.carb * k,
    fat: food.per100g.fat * k,
  }
}

export function sumMacros(items: MealItem[]) {
  return items.reduce(
    (acc, it) => {
      const m = itemMacros(it)
      acc.kcal += m.kcal
      acc.protein += m.protein
      acc.carb += m.carb
      acc.fat += m.fat
      return acc
    },
    { kcal: 0, protein: 0, carb: 0, fat: 0 },
  )
}

export function planMacros(plan: MealPlan) {
  return sumMacros(plan.meals.flatMap((m) => m.items))
}
