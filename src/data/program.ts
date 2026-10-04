import type { DayPlan, Session } from '../lib/types'

// Giáo án Upper/Lower 4 buổi tạ/tuần, xếp quanh lịch đạp xe đi làm và đá bóng tối thứ 5.
// Cơ sở: tập mỗi nhóm cơ ~2 lần/tuần hiệu quả hơn 1 lần/tuần ở cùng tổng volume
// (Schoenfeld, Ogborn & Krieger 2016, Sports Medicine).
export const SESSIONS: Session[] = [
  {
    id: 'upper-a',
    name: 'Upper A — Đẩy nhiều',
    type: 'gym',
    focus: 'Ngực · Vai · Tay sau · Lưng trên',
    durationMin: 65,
    why: 'Mở đầu tuần với thân trên để đôi chân còn tươi cho buổi Lower ngày mai và trận bóng thứ 5.',
    warmup: [
      '5 phút xe đạp/máy chèo nhẹ cho nóng người',
      'Scapular_Pull-Up × 10 nhịp',
      'Cat_Stretch × 10 nhịp',
      '2 set khởi động bench với đòn không và 50% mức tạ',
    ],
    blocks: [
      { exerciseId: 'Barbell_Bench_Press_-_Medium_Grip', sets: 4, reps: '6-8', restSec: 150, rpe: 'RPE 8', note: 'Bài chính, tăng tạ khi đủ 3×8' },
      { exerciseId: 'Seated_Cable_Rows', sets: 4, reps: '10-12', restSec: 90, rpe: 'RPE 8', note: 'Dừng 1 giây siết bả vai' },
      { exerciseId: 'Incline_Dumbbell_Press', sets: 3, reps: '10-12', restSec: 90, rpe: 'RPE 8' },
      { exerciseId: 'Dumbbell_Shoulder_Press', sets: 3, reps: '8-12', restSec: 90, rpe: 'RPE 8' },
      { exerciseId: 'Side_Lateral_Raise', sets: 3, reps: '15-20', restSec: 60, note: 'Tạ nhẹ, kiểm soát', superset: 'A' },
      { exerciseId: 'Face_Pull', sets: 3, reps: '15-20', restSec: 60, note: 'Chống gù vai — bắt buộc', superset: 'A' },
      { exerciseId: 'Triceps_Pushdown_-_Rope_Attachment', sets: 3, reps: '12-15', restSec: 60 },
      { exerciseId: 'Pallof_Press', sets: 3, reps: '8 mỗi bên, giữ 3s', restSec: 45 },
    ],
    cooldown: ['Chest_And_Front_Of_Shoulder_Stretch 30s mỗi bên', 'Shoulder_Stretch 30s mỗi bên'],
  },
  {
    id: 'lower-a',
    name: 'Lower A — Squat',
    type: 'gym',
    focus: 'Đùi trước · Mông · Core',
    durationMin: 65,
    why: 'Chân khoẻ giúp cả đạp xe 30 km lẫn bứt tốc khi đá bóng; squat là bài đốt năng lượng lớn nhất trong tuần.',
    warmup: [
      '5 phút xe đạp nhẹ',
      'Seated_Calf_Stretch 30s mỗi bên',
      'Kneeling_Hip_Flexor 30s mỗi bên',
      'Leg_Extensions 2×15 tạ nhẹ làm nóng gối',
      'Squat với đòn không × 10, rồi 50% và 70% mức tạ',
    ],
    blocks: [
      { exerciseId: 'Barbell_Squat', sets: 4, reps: '5-8', restSec: 180, rpe: 'RPE 8', note: 'Bài chính của tuần' },
      { exerciseId: 'Romanian_Deadlift', sets: 3, reps: '8-10', restSec: 120, rpe: 'RPE 7-8' },
      { exerciseId: 'Leg_Press', sets: 3, reps: '12-15', restSec: 90 },
      { exerciseId: 'Lying_Leg_Curls', sets: 3, reps: '12-15', restSec: 60 },
      { exerciseId: 'Standing_Calf_Raises', sets: 4, reps: '12-15', restSec: 60, note: 'Dừng 1 giây ở đỉnh' },
      { exerciseId: 'Hanging_Leg_Raise', sets: 3, reps: '8-12', restSec: 60, note: 'Cuộn hông, không đu' },
      { exerciseId: 'Plank', sets: 3, reps: 'giữ 40-60 giây', restSec: 45 },
    ],
    cooldown: ['Childs_Pose 60s', 'Piriformis-SMR 45s mỗi bên', 'Standing_Hip_Flexors 30s mỗi bên'],
  },
  {
    id: 'upper-b',
    name: 'Upper B — Kéo nhiều',
    type: 'gym',
    focus: 'Lưng xô · Vai sau · Tay trước',
    durationMin: 65,
    why: 'Khối lượng kéo gấp đôi khối lượng đẩy để kéo vai về sau — thuốc giải cho 8 tiếng ngồi gõ code mỗi ngày.',
    warmup: [
      '5 phút máy chèo',
      'Scapular_Pull-Up × 10',
      'Cable_Rear_Delt_Fly 2×20 tạ nhẹ',
      'Cat_Stretch × 10 nhịp',
    ],
    blocks: [
      { exerciseId: 'Pullups', sets: 4, reps: 'tối đa (6-10)', restSec: 150, note: 'Dùng máy assisted nếu chưa đủ lực' },
      { exerciseId: 'Bent_Over_Barbell_Row', sets: 4, reps: '8-10', restSec: 120, rpe: 'RPE 8' },
      { exerciseId: 'Leverage_Chest_Press', sets: 3, reps: '10-12', restSec: 90 },
      { exerciseId: 'Close-Grip_Front_Lat_Pulldown', sets: 3, reps: '12-15', restSec: 75 },
      { exerciseId: 'Cable_Rear_Delt_Fly', sets: 3, reps: '15-20', restSec: 60, superset: 'B' },
      { exerciseId: 'Side_Lateral_Raise', sets: 3, reps: '15-20', restSec: 60, superset: 'B' },
      { exerciseId: 'Hammer_Curls', sets: 3, reps: '10-12', restSec: 60 },
      { exerciseId: 'Cable_Crunch', sets: 3, reps: '12-15', restSec: 60, note: 'Tăng tạ dần để cơ bụng dày lên' },
    ],
    cooldown: ['Chest_And_Front_Of_Shoulder_Stretch 30s mỗi bên', 'Isometric_Neck_Exercise_-_Front_And_Back 2 vòng'],
  },
  {
    id: 'lower-b',
    name: 'Lower B — Hinge & Đơn chân',
    type: 'gym',
    focus: 'Đùi sau · Mông · Bụng dưới',
    durationMin: 60,
    why: 'Sau trận bóng tối thứ 5, buổi này ưu tiên gập hông và chân đơn để cân bằng hai bên, giảm nguy cơ chấn thương.',
    warmup: [
      '5 phút đi bộ dốc hoặc xe đạp nhẹ',
      'Barbell_Glute_Bridge 2×15 không tạ',
      'Bodyweight_Walking_Lunge 2×10 bước',
      'Dead_Bug 2×8 mỗi bên',
    ],
    blocks: [
      { exerciseId: 'Barbell_Deadlift', sets: 3, reps: '5', restSec: 180, rpe: 'RPE 7', note: 'Kỹ thuật trên hết, không tập tới thất bại' },
      { exerciseId: 'Split_Squat_with_Dumbbells', sets: 3, reps: '8-10 mỗi chân', restSec: 90 },
      { exerciseId: 'Barbell_Hip_Thrust', sets: 3, reps: '10-12', restSec: 90, note: 'Siết mông 2 giây ở đỉnh' },
      { exerciseId: 'Seated_Leg_Curl', sets: 3, reps: '12-15', restSec: 60 },
      { exerciseId: 'Seated_Calf_Raise', sets: 4, reps: '15-20', restSec: 45 },
      { exerciseId: 'Reverse_Crunch', sets: 3, reps: '12-15', restSec: 45, superset: 'C' },
      { exerciseId: 'Side_Bridge', sets: 3, reps: 'giữ 30 giây mỗi bên', restSec: 45, superset: 'C' },
      { exerciseId: 'Mountain_Climbers', sets: 3, reps: '30 giây', restSec: 45, note: 'Finisher, tuỳ sức' },
    ],
    cooldown: ['Childs_Pose 60s', 'Seated_Calf_Stretch 30s mỗi bên', 'Piriformis-SMR 45s mỗi bên'],
  },
  {
    id: 'ride-to-work',
    name: 'Đạp xe đi làm — 30 km Zone 2',
    type: 'cardio',
    focus: 'Cardio nền · Đốt mỡ',
    durationMin: 80,
    why: 'Đạp đều ở nhịp tim Zone 2 (còn nói chuyện được) đốt mỡ mà không ăn vào khả năng hồi phục của buổi tạ.',
    warmup: ['10 phút đầu đạp nhẹ, guồng chân cao, không gắng sức'],
    blocks: [],
    cooldown: ['5 phút cuối thả lỏng', 'Standing_Hip_Flexors 30s mỗi bên khi tới nơi', 'Seated_Calf_Stretch 30s mỗi bên'],
  },
  {
    id: 'ride-home',
    name: 'Đạp xe về nhà — 30 km hồi phục',
    type: 'cardio',
    focus: 'Cardio nền · Hồi phục chủ động',
    durationMin: 85,
    why: 'Ngày không tập tạ nên đạp nhẹ hơn: mục tiêu là lưu thông máu giúp chân hồi phục, không phải phá kỷ lục.',
    warmup: ['10 phút đầu guồng nhẹ'],
    blocks: [],
    cooldown: ['Childs_Pose 60s khi về tới nhà', 'Kneeling_Hip_Flexor 45s mỗi bên'],
  },
  {
    id: 'football',
    name: 'Đá bóng tối thứ 5',
    type: 'sport',
    focus: 'Cardio cường độ cao · Bứt tốc',
    durationMin: 90,
    why: 'Đây đã là buổi HIIT của tuần. Không cần thêm cardio cường độ cao nào khác.',
    warmup: [
      'Bodyweight_Walking_Lunge 10 bước',
      'Barbell_Glute_Bridge 15 nhịp không tạ',
      'Chạy nhẹ 5 phút + 4 nhịp tăng tốc 20 m',
    ],
    blocks: [],
    cooldown: ['Đi bộ 5 phút hạ nhiệt', 'Seated_Calf_Stretch 30s mỗi bên', 'Piriformis-SMR 45s mỗi bên'],
  },
  {
    id: 'desk-reset',
    name: 'Reset bàn làm việc (làm tại văn phòng)',
    type: 'mobility',
    focus: 'Tư thế · Chống đau lưng cổ',
    durationMin: 10,
    why: 'Cắt nhỏ thời gian ngồi liên tục giúp cải thiện đường huyết sau ăn và giảm đau lưng (WHO 2020).',
    warmup: [],
    blocks: [
      { exerciseId: 'Cat_Stretch', sets: 1, reps: '10 nhịp', restSec: 0 },
      { exerciseId: 'Standing_Hip_Flexors', sets: 1, reps: '30 giây mỗi bên', restSec: 0 },
      { exerciseId: 'Chest_And_Front_Of_Shoulder_Stretch', sets: 1, reps: '30 giây mỗi bên', restSec: 0 },
      { exerciseId: 'Isometric_Neck_Exercise_-_Front_And_Back', sets: 2, reps: 'giữ 10 giây mỗi hướng', restSec: 0 },
      { exerciseId: 'Barbell_Glute_Bridge', sets: 2, reps: '15 nhịp (không tạ)', restSec: 0, note: 'Làm trên sàn hoặc thảm' },
      { exerciseId: 'Dead_Bug', sets: 2, reps: '8 mỗi bên', restSec: 0 },
    ],
    cooldown: [],
  },
  {
    id: 'rest-day',
    name: 'Nghỉ & chuẩn bị đồ ăn',
    type: 'rest',
    focus: 'Hồi phục · Meal prep',
    durationMin: 0,
    why: 'Cơ bắp lớn lên lúc nghỉ chứ không phải lúc tập. Dùng ngày này để nấu sẵn đạm cho cả tuần.',
    warmup: [],
    blocks: [
      { exerciseId: 'Childs_Pose', sets: 1, reps: '60 giây', restSec: 0 },
      { exerciseId: 'Piriformis-SMR', sets: 1, reps: '45 giây mỗi bên', restSec: 0 },
      { exerciseId: 'Kneeling_Hip_Flexor', sets: 1, reps: '45 giây mỗi bên', restSec: 0 },
    ],
    cooldown: [],
  },
]

export const SESSION_BY_ID = new Map(SESSIONS.map((s) => [s.id, s]))

export const WEEK: DayPlan[] = [
  {
    key: 'mon',
    label: 'Thứ 2',
    short: 'T2',
    sessionIds: ['ride-to-work', 'upper-a', 'desk-reset'],
    note: 'Đạp xe 30 km lên công ty và để xe lại. Tối tập Upper A.',
  },
  {
    key: 'tue',
    label: 'Thứ 3',
    short: 'T3',
    sessionIds: ['lower-a', 'desk-reset'],
    note: 'Đi làm bằng phương tiện khác. Tối là buổi squat nặng nhất tuần.',
  },
  {
    key: 'wed',
    label: 'Thứ 4',
    short: 'T4',
    sessionIds: ['ride-home', 'desk-reset'],
    note: 'Lấy xe đạp về nhà, đạp nhẹ hồi phục. Không tập tạ.',
  },
  {
    key: 'thu',
    label: 'Thứ 5',
    short: 'T5',
    sessionIds: ['desk-reset', 'football'],
    note: 'Để chân tươi cho trận bóng tối. Ăn thêm tinh bột bữa trưa và chiều.',
  },
  {
    key: 'fri',
    label: 'Thứ 6',
    short: 'T6',
    sessionIds: ['upper-b', 'desk-reset'],
    note: 'Thân trên, nhiều bài kéo. Chân vẫn đang hồi phục sau trận bóng.',
  },
  {
    key: 'sat',
    label: 'Thứ 7',
    short: 'T7',
    sessionIds: ['lower-b'],
    note: 'Buổi chân thứ hai, nhẹ hơn Lower A. Tập sáng để tối được nghỉ.',
  },
  {
    key: 'sun',
    label: 'Chủ nhật',
    short: 'CN',
    sessionIds: ['rest-day'],
    note: 'Nghỉ hoàn toàn. Đi bộ 30–45 phút, nấu sẵn đạm và cơm cho tuần mới.',
  },
]

export const DAY_KEYS = WEEK.map((d) => d.key)

export function todayKey(d = new Date()) {
  // getDay(): 0 = Chủ nhật
  return ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][d.getDay()]
}

export type Phase = {
  weeks: string
  name: string
  goal: string
  details: string[]
}

export const PHASES: Phase[] = [
  {
    weeks: 'Tuần 1–2',
    name: 'Làm quen & học kỹ thuật',
    goal: 'Thuộc động tác, tìm mức tạ nền',
    details: [
      'Dùng mức tạ chỉ khoảng RPE 6 (còn dư 4 lần nữa mới kiệt).',
      'Quay video squat / deadlift / bench một lần để tự soi kỹ thuật.',
      'Ăn đúng mức calo duy trì, tập trung đủ đạm trước đã.',
      'Đo vòng bụng và chụp ảnh mốc đầu tiên.',
    ],
  },
  {
    weeks: 'Tuần 3–6',
    name: 'Tăng tải tuần tự',
    goal: 'Mạnh lên đều mỗi tuần',
    details: [
      'Mỗi khi đạt mốc số lần trên của khoảng rep ở cả các set, tăng 2,5 kg buổi sau.',
      'Giữ mức thâm hụt nhẹ vào ngày nghỉ, ăn đủ vào ngày tập.',
      'Giữ nguyên lịch đạp xe 2 chiều/tuần, không thêm cardio.',
    ],
  },
  {
    weeks: 'Tuần 7',
    name: 'Tuần giảm tải (deload)',
    goal: 'Hồi phục khớp và thần kinh',
    details: [
      'Giữ nguyên mức tạ nhưng giảm một nửa số set.',
      'Vẫn đạp xe bình thường, vẫn đá bóng.',
      'Ngủ thêm 1 tiếng mỗi đêm nếu được.',
    ],
  },
  {
    weeks: 'Tuần 8–12',
    name: 'Giai đoạn lộ cơ bụng',
    goal: 'Giảm mỡ bụng, giữ nguyên cơ',
    details: [
      'Hạ calo ngày nghỉ thêm 100–150 kcal, giữ nguyên đạm.',
      'Thêm 1 set cho các bài chính nếu vẫn hồi phục tốt.',
      'Mục tiêu vòng bụng giảm 0,5–1 cm mỗi 2 tuần — chậm nhưng giữ được cơ.',
      'Chụp ảnh so sánh mỗi 2 tuần, cùng ánh sáng và góc chụp.',
    ],
  },
]
