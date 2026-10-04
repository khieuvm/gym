import type { Food } from '../lib/types'

// Giá trị dinh dưỡng /100 g là số tham khảo, tổng hợp từ USDA FoodData Central (CC0)
// và Bảng thành phần thực phẩm Việt Nam 2007 (Viện Dinh dưỡng, qua FAO/INFOODS).
// Phần quy đổi đơn vị gia đình (chén, muỗng, lòng bàn tay...) do dự án này tự ước lượng,
// sai số chấp nhận được khoảng ±10–15% — đủ chính xác để theo dõi xu hướng khi không có cân.
export const FOODS: Food[] = [
  // ---------- ĐẠM ----------
  {
    id: 'uc-ga',
    name: 'Ức gà (bỏ da, luộc/áp chảo)',
    category: 'protein',
    per100g: { kcal: 165, protein: 31, carb: 0, fat: 3.6 },
    units: [
      { label: 'lòng bàn tay (không tính ngón)', grams: 100, hint: 'Dày bằng lòng bàn tay bạn' },
      { label: 'miếng ức vừa', grams: 150 },
      { label: 'miếng ức to', grams: 220 },
    ],
    note: 'Nguồn đạm rẻ và sạch nhất. Nấu sẵn 1 kg vào chủ nhật là đủ 4–5 bữa.',
  },
  {
    id: 'dui-ga',
    name: 'Đùi gà (bỏ da)',
    category: 'protein',
    per100g: { kcal: 177, protein: 24, carb: 0, fat: 8.5 },
    units: [
      { label: 'cái đùi tỏi', grams: 70 },
      { label: 'cái đùi góc tư (bỏ da)', grams: 130 },
      { label: 'lòng bàn tay', grams: 100 },
    ],
  },
  {
    id: 'thit-heo-nac',
    name: 'Thịt heo nạc (thăn/mông)',
    category: 'protein',
    per100g: { kcal: 143, protein: 21, carb: 0, fat: 6 },
    units: [
      { label: 'lòng bàn tay', grams: 100 },
      { label: 'lát mỏng (sườn/thăn)', grams: 30 },
      { label: 'phần ăn ở quán cơm', grams: 80 },
    ],
  },
  {
    id: 'thit-bo-nac',
    name: 'Thịt bò nạc (thăn)',
    category: 'protein',
    per100g: { kcal: 150, protein: 22, carb: 0, fat: 6 },
    units: [
      { label: 'lòng bàn tay', grams: 100 },
      { label: 'phần bò trong tô phở', grams: 60 },
    ],
  },
  {
    id: 'ca-basa',
    name: 'Cá basa / cá tra phi lê',
    category: 'protein',
    per100g: { kcal: 124, protein: 14.5, carb: 0, fat: 7 },
    units: [
      { label: 'miếng phi lê vừa', grams: 120 },
      { label: 'lòng bàn tay', grams: 100 },
    ],
  },
  {
    id: 'ca-thu',
    name: 'Cá thu / cá nục',
    category: 'protein',
    per100g: { kcal: 189, protein: 19, carb: 0, fat: 12 },
    units: [
      { label: 'khúc cá vừa', grams: 100 },
      { label: 'con cá nục', grams: 80 },
    ],
    note: 'Giàu omega-3, nên ăn 2–3 bữa cá béo mỗi tuần.',
  },
  {
    id: 'ca-ngu-hop',
    name: 'Cá ngừ hộp (ngâm nước, chắt ráo)',
    category: 'protein',
    per100g: { kcal: 116, protein: 26, carb: 0, fat: 1 },
    units: [
      { label: 'hộp nhỏ (ráo nước)', grams: 120 },
      { label: 'muỗng canh', grams: 20 },
    ],
    note: 'Cứu cánh khi bận deadline: mở hộp là có 30 g đạm.',
  },
  {
    id: 'tom',
    name: 'Tôm (bóc vỏ)',
    category: 'protein',
    per100g: { kcal: 99, protein: 24, carb: 0.2, fat: 0.3 },
    units: [
      { label: 'con tôm sú vừa (bóc vỏ)', grams: 15 },
      { label: 'nắm tay', grams: 90 },
    ],
  },
  {
    id: 'muc',
    name: 'Mực tươi',
    category: 'protein',
    per100g: { kcal: 92, protein: 15.6, carb: 3, fat: 1.4 },
    units: [{ label: 'con mực vừa (làm sạch)', grams: 100 }],
  },
  {
    id: 'trung-ga',
    name: 'Trứng gà',
    category: 'protein',
    per100g: { kcal: 143, protein: 12.6, carb: 0.7, fat: 9.5 },
    units: [
      { label: 'quả (cỡ vừa, phần ăn được)', grams: 50 },
      { label: 'quả to', grams: 60 },
    ],
    note: '2–3 quả mỗi ngày hoàn toàn ổn với người tập tạ.',
  },
  {
    id: 'long-trang-trung',
    name: 'Lòng trắng trứng',
    category: 'protein',
    per100g: { kcal: 52, protein: 11, carb: 0.7, fat: 0.2 },
    units: [{ label: 'lòng trắng của 1 quả', grams: 33 }],
    note: 'Dùng để tăng đạm mà không tăng nhiều calo.',
  },
  {
    id: 'dau-phu',
    name: 'Đậu phụ',
    category: 'protein',
    per100g: { kcal: 76, protein: 8, carb: 1.9, fat: 4.8 },
    units: [
      { label: 'bìa đậu', grams: 60 },
      { label: 'miếng chiên nhỏ', grams: 30 },
    ],
  },
  {
    id: 'sua-tuoi-kd',
    name: 'Sữa tươi không đường',
    category: 'protein',
    per100g: { kcal: 61, protein: 3.2, carb: 4.8, fat: 3.3 },
    units: [
      { label: 'hộp 180 ml', grams: 185 },
      { label: 'ly 250 ml', grams: 257 },
    ],
  },
  {
    id: 'sua-chua-kd',
    name: 'Sữa chua không đường',
    category: 'protein',
    per100g: { kcal: 61, protein: 3.5, carb: 4.7, fat: 3.3 },
    units: [{ label: 'hũ', grams: 100 }],
  },
  {
    id: 'whey',
    name: 'Whey protein (bột)',
    category: 'protein',
    per100g: { kcal: 400, protein: 80, carb: 8, fat: 6 },
    units: [
      { label: 'muỗng scoop', grams: 30 },
      { label: 'muỗng canh đầy', grams: 15 },
    ],
    note: 'Không bắt buộc. Chỉ dùng khi khó ăn đủ đạm từ thức ăn thật.',
  },

  // ---------- TINH BỘT ----------
  {
    id: 'com-trang',
    name: 'Cơm trắng (đã nấu)',
    category: 'carb',
    per100g: { kcal: 130, protein: 2.7, carb: 28, fat: 0.3 },
    units: [
      { label: 'chén cơm vừa (gạt ngang)', grams: 120, hint: 'Chén sứ ăn cơm tiêu chuẩn' },
      { label: 'chén cơm đầy có ngọn', grams: 160 },
      { label: 'đĩa cơm phần (quán cơm)', grams: 280 },
      { label: 'muỗng canh cơm', grams: 25 },
      { label: 'lòng bàn tay khum', grams: 90, hint: 'Khum bàn tay lại, đổ đầy cơm' },
    ],
    note: '1 lon sữa bò gạo sống (~160 g) nấu ra khoảng 400 g cơm chín.',
  },
  {
    id: 'gao-lut',
    name: 'Cơm gạo lứt (đã nấu)',
    category: 'carb',
    per100g: { kcal: 111, protein: 2.6, carb: 23, fat: 0.9, fiber: 1.8 },
    units: [
      { label: 'chén vừa', grams: 120 },
      { label: 'chén đầy', grams: 160 },
    ],
    note: 'Nhiều chất xơ hơn, no lâu hơn — hợp cho ngày ngồi văn phòng.',
  },
  {
    id: 'bun-tuoi',
    name: 'Bún tươi',
    category: 'carb',
    per100g: { kcal: 110, protein: 1.7, carb: 25, fat: 0.1 },
    units: [
      { label: 'tô bún (phần bún)', grams: 200 },
      { label: 'nắm tay', grams: 100 },
    ],
  },
  {
    id: 'banh-pho',
    name: 'Bánh phở tươi',
    category: 'carb',
    per100g: { kcal: 141, protein: 3, carb: 32, fat: 0.3 },
    units: [{ label: 'tô phở (phần bánh)', grams: 180 }],
  },
  {
    id: 'banh-mi',
    name: 'Bánh mì không',
    category: 'carb',
    per100g: { kcal: 265, protein: 9, carb: 49, fat: 3.2 },
    units: [
      { label: 'ổ bánh mì Việt Nam', grams: 90 },
      { label: 'lát bánh mì sandwich', grams: 28 },
    ],
  },
  {
    id: 'khoai-lang',
    name: 'Khoai lang luộc',
    category: 'carb',
    per100g: { kcal: 86, protein: 1.6, carb: 20, fat: 0.1, fiber: 3 },
    units: [
      { label: 'củ vừa', grams: 150 },
      { label: 'củ to', grams: 250 },
    ],
    note: 'Lựa chọn tinh bột tốt nhất cho bữa trước khi tập.',
  },
  {
    id: 'khoai-tay',
    name: 'Khoai tây luộc',
    category: 'carb',
    per100g: { kcal: 87, protein: 2, carb: 20, fat: 0.1 },
    units: [{ label: 'củ vừa', grams: 150 }],
  },
  {
    id: 'yen-mach',
    name: 'Yến mạch (khô)',
    category: 'carb',
    per100g: { kcal: 389, protein: 16.9, carb: 66, fat: 6.9, fiber: 10.6 },
    units: [
      { label: 'muỗng canh đầy', grams: 15 },
      { label: 'lòng bàn tay khum', grams: 40 },
      { label: 'phần ăn sáng tiêu chuẩn', grams: 50 },
    ],
  },
  {
    id: 'bap-luoc',
    name: 'Bắp (ngô) luộc',
    category: 'carb',
    per100g: { kcal: 96, protein: 3.4, carb: 21, fat: 1.5 },
    units: [{ label: 'trái vừa (phần hạt)', grams: 120 }],
  },
  {
    id: 'mi-goi',
    name: 'Mì gói (cả gói gia vị)',
    category: 'avoid',
    per100g: { kcal: 450, protein: 9, carb: 60, fat: 18 },
    units: [{ label: 'gói', grams: 85 }],
    note: 'Nhiều calo rỗng và natri. Nếu ăn, bỏ nửa gói dầu và thêm 2 quả trứng + rau.',
  },

  // ---------- RAU ----------
  {
    id: 'rau-muong',
    name: 'Rau muống luộc',
    category: 'veg',
    per100g: { kcal: 23, protein: 2.6, carb: 3.1, fat: 0.2, fiber: 2.1 },
    units: [
      { label: 'nắm tay (sau luộc)', grams: 100 },
      { label: 'đĩa rau luộc', grams: 200 },
    ],
  },
  {
    id: 'bong-cai-xanh',
    name: 'Bông cải xanh',
    category: 'veg',
    per100g: { kcal: 34, protein: 2.8, carb: 7, fat: 0.4, fiber: 2.6 },
    units: [
      { label: 'nắm tay', grams: 90 },
      { label: 'bông nhỏ', grams: 20 },
    ],
  },
  {
    id: 'cai-thia',
    name: 'Cải thìa / cải ngọt',
    category: 'veg',
    per100g: { kcal: 13, protein: 1.5, carb: 2.2, fat: 0.2, fiber: 1 },
    units: [{ label: 'đĩa rau xào', grams: 150 }],
  },
  {
    id: 'dua-leo',
    name: 'Dưa leo',
    category: 'veg',
    per100g: { kcal: 15, protein: 0.7, carb: 3.6, fat: 0.1 },
    units: [
      { label: 'quả vừa', grams: 180 },
      { label: 'lát', grams: 10 },
    ],
  },
  {
    id: 'ca-chua',
    name: 'Cà chua',
    category: 'veg',
    per100g: { kcal: 18, protein: 0.9, carb: 3.9, fat: 0.2 },
    units: [{ label: 'quả vừa', grams: 120 }],
  },
  {
    id: 'bi-do',
    name: 'Bí đỏ',
    category: 'veg',
    per100g: { kcal: 26, protein: 1, carb: 6.5, fat: 0.1 },
    units: [{ label: 'chén canh (phần cái)', grams: 100 }],
  },

  // ---------- CHẤT BÉO ----------
  {
    id: 'dau-an',
    name: 'Dầu ăn / dầu ô liu',
    category: 'fat',
    per100g: { kcal: 884, protein: 0, carb: 0, fat: 100 },
    units: [
      { label: 'muỗng canh', grams: 13, hint: 'Gần bằng cả đốt ngón cái' },
      { label: 'muỗng cà phê', grams: 4.5 },
      { label: 'lượng dầu một món xào', grams: 15 },
    ],
    note: 'Thủ phạm calo ẩn lớn nhất. 2 muỗng canh dầu = 1 chén cơm rưỡi.',
  },
  {
    id: 'dau-phong',
    name: 'Đậu phộng rang',
    category: 'fat',
    per100g: { kcal: 567, protein: 26, carb: 16, fat: 49, fiber: 8.5 },
    units: [
      { label: 'nắm tay nhỏ', grams: 30 },
      { label: 'muỗng canh', grams: 12 },
    ],
  },
  {
    id: 'hat-dieu',
    name: 'Hạt điều',
    category: 'fat',
    per100g: { kcal: 553, protein: 18, carb: 30, fat: 44 },
    units: [
      { label: 'nắm tay nhỏ', grams: 30 },
      { label: 'hạt', grams: 1.5 },
    ],
  },
  {
    id: 'bo-dau-phong',
    name: 'Bơ đậu phộng',
    category: 'fat',
    per100g: { kcal: 588, protein: 25, carb: 20, fat: 50 },
    units: [
      { label: 'muỗng canh', grams: 16 },
      { label: 'đốt ngón tay cái', grams: 10 },
    ],
  },
  {
    id: 'qua-bo',
    name: 'Quả bơ',
    category: 'fat',
    per100g: { kcal: 160, protein: 2, carb: 8.5, fat: 14.7, fiber: 6.7 },
    units: [
      { label: 'nửa quả vừa', grams: 100 },
      { label: 'quả vừa (phần ăn được)', grams: 200 },
    ],
  },
  {
    id: 'me',
    name: 'Mè (vừng)',
    category: 'fat',
    per100g: { kcal: 573, protein: 17.7, carb: 23, fat: 49.7 },
    units: [{ label: 'muỗng cà phê', grams: 3 }],
  },

  // ---------- TRÁI CÂY ----------
  {
    id: 'chuoi',
    name: 'Chuối',
    category: 'fruit',
    per100g: { kcal: 89, protein: 1.1, carb: 23, fat: 0.3, fiber: 2.6 },
    units: [
      { label: 'quả vừa (bỏ vỏ)', grams: 100 },
      { label: 'quả to', grams: 135 },
    ],
    note: 'Ăn 1 quả 30 phút trước buổi tạ hoặc giữa chặng đạp xe.',
  },
  {
    id: 'tao',
    name: 'Táo',
    category: 'fruit',
    per100g: { kcal: 52, protein: 0.3, carb: 14, fat: 0.2, fiber: 2.4 },
    units: [{ label: 'quả vừa', grams: 180 }],
  },
  {
    id: 'cam',
    name: 'Cam',
    category: 'fruit',
    per100g: { kcal: 47, protein: 0.9, carb: 12, fat: 0.1, fiber: 2.4 },
    units: [{ label: 'quả vừa (phần ăn được)', grams: 130 }],
  },
  {
    id: 'oi',
    name: 'Ổi',
    category: 'fruit',
    per100g: { kcal: 68, protein: 2.6, carb: 14, fat: 1, fiber: 5.4 },
    units: [{ label: 'quả vừa', grams: 200 }],
    note: 'Nhiều chất xơ, rất no — món ăn vặt lý tưởng ở văn phòng.',
  },
  {
    id: 'dua-hau',
    name: 'Dưa hấu',
    category: 'fruit',
    per100g: { kcal: 30, protein: 0.6, carb: 8, fat: 0.2 },
    units: [{ label: 'miếng (phần ruột)', grams: 150 }],
  },
  {
    id: 'xoai',
    name: 'Xoài chín',
    category: 'fruit',
    per100g: { kcal: 60, protein: 0.8, carb: 15, fat: 0.4 },
    units: [{ label: 'nửa quả vừa', grams: 150 }],
  },

  // ---------- ĐỒ UỐNG ----------
  {
    id: 'sua-dau-nanh-kd',
    name: 'Sữa đậu nành không đường',
    category: 'drink',
    per100g: { kcal: 33, protein: 3.3, carb: 1.5, fat: 1.8 },
    units: [{ label: 'ly 250 ml', grams: 250 }],
  },
  {
    id: 'ca-phe-sua',
    name: 'Cà phê sữa đá',
    category: 'drink',
    per100g: { kcal: 60, protein: 1.5, carb: 10, fat: 1.5 },
    units: [
      { label: 'ly nhỏ (150 ml)', grams: 150 },
      { label: 'ly lớn (350 ml)', grams: 350 },
    ],
    note: 'Cà phê đen không đường gần như 0 kcal — đổi sang đó tiết kiệm được 150–200 kcal/ly.',
  },
  {
    id: 'tra-sua',
    name: 'Trà sữa trân châu',
    category: 'avoid',
    per100g: { kcal: 90, protein: 1, carb: 17, fat: 2 },
    units: [{ label: 'ly size M (500 ml)', grams: 500 }],
    note: '1 ly ≈ 450 kcal ≈ gần 4 chén cơm, mà không no. Giới hạn 1 ly/tuần.',
  },
  {
    id: 'nuoc-ngot',
    name: 'Nước ngọt có ga',
    category: 'avoid',
    per100g: { kcal: 42, protein: 0, carb: 10.6, fat: 0 },
    units: [{ label: 'lon 330 ml', grams: 330 }],
  },
  {
    id: 'bia',
    name: 'Bia',
    category: 'avoid',
    per100g: { kcal: 43, protein: 0.5, carb: 3.6, fat: 0 },
    units: [{ label: 'lon 330 ml', grams: 330 }],
    note: 'Rượu bia ức chế tổng hợp cơ và đốt mỡ trong nhiều giờ sau đó.',
  },
  {
    id: 'thit-ba-chi',
    name: 'Thịt ba chỉ / thịt mỡ',
    category: 'avoid',
    per100g: { kcal: 490, protein: 11, carb: 0, fat: 50 },
    units: [
      { label: 'lát mỏng', grams: 25 },
      { label: 'phần ăn ở quán', grams: 80 },
    ],
    note: 'Không cấm, nhưng 100 g ba chỉ bằng calo của 350 g ức gà.',
  },
]

export const FOOD_BY_ID = new Map(FOODS.map((f) => [f.id, f]))

export type HandRule = {
  measure: string
  equals: string
  use: string
}

// Quy tắc "đo bằng tay" — dùng khi không có cân và không có chén quen thuộc.
export const HAND_RULES: HandRule[] = [
  {
    measure: 'Lòng bàn tay (không tính ngón)',
    equals: '≈ 100 g thịt/cá chín ≈ 22–30 g đạm',
    use: 'Mỗi bữa chính lấy 1,5–2 lòng bàn tay đạm.',
  },
  {
    measure: 'Lòng bàn tay khum lại',
    equals: '≈ 90 g cơm chín ≈ 25 g tinh bột',
    use: 'Ngày tập: 2 khum. Ngày nghỉ: 1 khum.',
  },
  {
    measure: 'Nắm tay',
    equals: '≈ 100 g rau củ',
    use: 'Mỗi bữa ít nhất 1–2 nắm rau. Ăn rau trước khi ăn cơm.',
  },
  {
    measure: 'Đốt ngón tay cái',
    equals: '≈ 10–12 g chất béo ≈ 100 kcal',
    use: 'Giới hạn 2–3 đốt ngón cái chất béo thêm vào mỗi ngày.',
  },
  {
    measure: 'Muỗng canh (thìa phở)',
    equals: '≈ 13 g dầu · ≈ 15 g bơ đậu phộng · ≈ 25 g cơm',
    use: 'Đếm số muỗng dầu khi nấu — đây là nguồn calo bị bỏ sót nhiều nhất.',
  },
  {
    measure: 'Chén sứ ăn cơm (gạt ngang)',
    equals: '≈ 120 g cơm chín ≈ 155 kcal',
    use: 'Chén có ngọn thì nhân 1,35 lần.',
  },
  {
    measure: 'Tô phở / bún ngoài hàng',
    equals: '≈ 180–200 g bánh + 60 g thịt ≈ 450–550 kcal',
    use: 'Gọi thêm một phần thịt/trứng để đủ đạm, chừa lại 1/3 bánh nếu đang ngày nghỉ.',
  },
  {
    measure: 'Ly nước 250 ml',
    equals: '≈ 250 g chất lỏng',
    use: 'Uống 2,5–3,5 lít/ngày, cộng thêm 1 lít cho ngày đạp xe 30 km.',
  },
]
