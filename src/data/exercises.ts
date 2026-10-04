import generated from './exercises.generated.json'
import videosJson from './videos.generated.json'
import illustrationsJson from './illustrations.generated.json'
import type { Exercise, ExerciseVideo, Illustration, MuscleGroup } from '../lib/types'

type Generated = {
  id: string
  name: string
  equipment: string
  level: string
  mechanic: string | null
  force: string | null
  category: string
  primaryMuscles: string[]
  secondaryMuscles: string[]
  instructions: string[]
  images: string[]
}

type Overlay = {
  name: string
  group: MuscleGroup
  howTo: string[]
  cues: string[]
  mistakes: string[]
}

// Ảnh gốc: yuhonas/free-exercise-db (Unlicense - public domain).
// Phần tiếng Việt dưới đây do dự án này tự biên soạn.
const OVERLAY: Record<string, Overlay> = {
  'Barbell_Bench_Press_-_Medium_Grip': {
    name: 'Đẩy ngực tạ đòn (Bench Press)',
    group: 'chest',
    howTo: [
      'Nằm ngửa trên ghế, hai bàn chân đạp chắc xuống sàn, ép hai bả vai xuống và vào nhau.',
      'Nắm đòn rộng hơn vai khoảng một nắm tay, hạ đòn chạm nhẹ giữa ngực trong 2 giây.',
      'Đẩy đòn lên theo đường chéo nhẹ về phía mặt, siết ngực ở đỉnh, không khoá khuỷu quá mạnh.',
    ],
    cues: [
      'Giữ lưng trên bám ghế, ngực ưỡn nhẹ, mông luôn chạm ghế.',
      'Khuỷu tay tạo góc ~45–60° với thân, không banh ngang 90°.',
    ],
    mistakes: ['Nảy đòn khỏi ngực lấy đà.', 'Nhấc mông khỏi ghế để đẩy mức nặng quá sức.'],
  },
  Incline_Dumbbell_Press: {
    name: 'Đẩy ngực trên tạ đơn (Incline DB Press)',
    group: 'chest',
    howTo: [
      'Chỉnh ghế nghiêng 30°, ngồi dựa lưng và dùng đùi hất tạ lên vị trí ngang vai.',
      'Hạ tạ chậm tới khi khuỷu thấp hơn vai một chút, cảm nhận ngực trên căng.',
      'Đẩy hai tạ lên và hơi hướng vào nhau, dừng 1 nhịp ở trên.',
    ],
    cues: ['Ghế nghiêng tối đa 30–45°, cao hơn sẽ thành bài vai.', 'Cổ tay thẳng trục với cẳng tay.'],
    mistakes: ['Đập hai quả tạ vào nhau ở trên mất lực căng.', 'Hạ quá nông, không đủ biên độ.'],
  },
  Leverage_Chest_Press: {
    name: 'Đẩy ngực máy (Machine Chest Press)',
    group: 'chest',
    howTo: [
      'Chỉnh ghế sao cho tay cầm ngang giữa ngực.',
      'Đẩy ra trước tới khi tay gần thẳng, siết ngực 1 giây.',
      'Thả về chậm 2–3 giây cho tới khi ngực căng.',
    ],
    cues: ['Lưng và bả vai luôn áp sát đệm.', 'Dùng máy cho các set cuối khi đã mỏi, rất an toàn.'],
    mistakes: ['Nhô vai về trước khi đẩy.', 'Thả tạ rơi tự do về vị trí đầu.'],
  },
  Butterfly: {
    name: 'Ép ngực máy (Pec Deck)',
    group: 'chest',
    howTo: [
      'Ngồi thẳng, tay cầm ngang ngực, khuỷu hơi cong và cố định.',
      'Ép hai tay vào nhau bằng lực ngực, dừng 1 giây ở giữa.',
      'Mở ra chậm cho tới khi ngực căng, không mở quá sâu.',
    ],
    cues: ['Nghĩ tới việc ép hai khuỷu tay vào nhau, không phải hai bàn tay.'],
    mistakes: ['Dùng quán tính giật tạ.', 'Mở tay quá rộng gây áp lực khớp vai trước.'],
  },
  Dumbbell_Flyes: {
    name: 'Ép ngực tạ đơn (DB Fly)',
    group: 'chest',
    howTo: [
      'Nằm ngửa, hai tạ thẳng trên ngực, khuỷu cong nhẹ cố định suốt bài.',
      'Mở rộng hai tay sang ngang như ôm thùng phi cho tới khi ngực căng.',
      'Kéo về theo cùng quỹ đạo, siết ngực ở đỉnh.',
    ],
    cues: ['Dùng tạ nhẹ, ưu tiên cảm giác cơ.', 'Không biến thành động tác đẩy.'],
    mistakes: ['Duỗi thẳng khuỷu khiến vai chịu lực.', 'Hạ quá sâu dưới mặt phẳng ghế.'],
  },
  Dumbbell_Shoulder_Press: {
    name: 'Đẩy vai tạ đơn (DB Shoulder Press)',
    group: 'shoulders',
    howTo: [
      'Ngồi ghế tựa dựng đứng, hai tạ ngang tai, lòng bàn tay hướng trước.',
      'Đẩy thẳng lên trên, hai tạ gần chạm nhau ở đỉnh.',
      'Hạ chậm về ngang tai, giữ lực căng ở vai.',
    ],
    cues: ['Siết core, không ưỡn lưng dưới.', 'Khuỷu tay hơi chếch về trước ~30°.'],
    mistakes: ['Ưỡn lưng thành bài đẩy ngực trên.', 'Hạ tạ quá thấp dưới cằm gây chèn khớp vai.'],
  },
  Side_Lateral_Raise: {
    name: 'Nâng tạ sang ngang (Lateral Raise)',
    group: 'shoulders',
    howTo: [
      'Đứng thẳng, hai tạ nhẹ hai bên hông, khuỷu cong nhẹ.',
      'Nâng hai tay sang ngang tới ngang vai, cổ tay không cao hơn khuỷu.',
      'Hạ chậm 3 giây về vị trí đầu.',
    ],
    cues: ['Tạ nhẹ thôi — đây là bài tạo độ rộng vai, không phải bài nặng.', 'Tưởng tượng rót nước từ bình.'],
    mistakes: ['Lắc người lấy đà.', 'Nhún vai lên tai (dùng cơ thang thay vì vai giữa).'],
  },
  Face_Pull: {
    name: 'Kéo cáp vào mặt (Face Pull)',
    group: 'shoulders',
    howTo: [
      'Chỉnh ròng rọc ngang mặt, cầm dây thừng hai tay, lòng bàn tay hướng vào nhau.',
      'Kéo dây về phía trán, tách hai tay ra hai bên tai.',
      'Siết vai sau và cơ giữa lưng 1 giây rồi thả chậm.',
    ],
    cues: ['Bài số 1 chống gù vai cho dân IT — nên tập mỗi buổi.', 'Khuỷu tay luôn cao hơn cổ tay.'],
    mistakes: ['Dùng tạ nặng kéo bằng lưng.', 'Ngửa người ra sau.'],
  },
  'Triceps_Pushdown_-_Rope_Attachment': {
    name: 'Đẩy tay sau với dây cáp (Triceps Pushdown)',
    group: 'arms',
    howTo: [
      'Đứng trước máy cáp cao, cầm dây thừng, khuỷu tay ép sát thân.',
      'Duỗi thẳng tay xuống và tách hai đầu dây ra ở cuối.',
      'Gập tay về chậm, giữ khuỷu đứng yên.',
    ],
    cues: ['Chỉ khuỷu tay chuyển động, vai và thân bất động.'],
    mistakes: ['Nhoài người đè lên tạ.', 'Khuỷu tay bay ra trước.'],
  },
  'Close-Grip_Barbell_Bench_Press': {
    name: 'Đẩy ngực tay hẹp (Close-Grip Bench)',
    group: 'arms',
    howTo: [
      'Nằm bench, nắm đòn rộng bằng vai (không hẹp hơn).',
      'Hạ đòn xuống phần dưới ngực, khuỷu ép sát thân.',
      'Đẩy lên bằng lực tay sau.',
    ],
    cues: ['Khoảng cách tay bằng vai là đủ, hẹp hơn sẽ đau cổ tay.'],
    mistakes: ['Nắm quá hẹp.', 'Banh khuỷu ra ngang biến thành bench thường.'],
  },
  'Dips_-_Triceps_Version': {
    name: 'Hít xà kép tay sau (Triceps Dips)',
    group: 'arms',
    howTo: [
      'Chống hai tay lên xà kép, thân thẳng đứng, chân gập sau.',
      'Hạ người xuống tới khi khuỷu gập ~90°.',
      'Đẩy lên bằng tay sau, không khoá khuỷu mạnh.',
    ],
    cues: ['Thân càng thẳng đứng càng dồn vào tay sau.', 'Nếu chưa đủ lực, dùng máy hỗ trợ (assisted dips).'],
    mistakes: ['Hạ quá sâu gây căng bao khớp vai.', 'Nhún vai lên tai ở đáy.'],
  },
  Pullups: {
    name: 'Hít xà (Pull-up)',
    group: 'back',
    howTo: [
      'Nắm xà rộng hơn vai, lòng bàn tay hướng ra trước.',
      'Hạ vai xuống trước, rồi kéo cằm vượt qua xà bằng lực lưng.',
      'Hạ xuống có kiểm soát tới khi tay gần thẳng.',
    ],
    cues: ['Bắt đầu bằng việc hạ bả vai, không phải gập tay.', 'Chưa kéo nổi thì dùng dây kháng lực hoặc máy assisted.'],
    mistakes: ['Đu người lấy đà.', 'Chỉ kéo nửa biên độ.'],
  },
  'Chin-Up': {
    name: 'Hít xà tay ngửa (Chin-up)',
    group: 'back',
    howTo: [
      'Nắm xà rộng bằng vai, lòng bàn tay hướng vào mặt.',
      'Kéo người lên cho tới khi cằm vượt xà.',
      'Hạ chậm 3 giây.',
    ],
    cues: ['Phiên bản này tay trước tham gia nhiều hơn, dễ hơn pull-up.'],
    mistakes: ['Ngửa cổ cố vượt xà.', 'Thả rơi tự do khi xuống.'],
  },
  'Wide-Grip_Lat_Pulldown': {
    name: 'Kéo xô tay rộng (Lat Pulldown)',
    group: 'back',
    howTo: [
      'Ngồi vào máy, kẹp chặt đùi dưới đệm, nắm đòn rộng.',
      'Ngả thân về sau ~15°, kéo đòn xuống chạm phần trên ngực.',
      'Thả lên chậm cho tới khi lưng xô căng hết.',
    ],
    cues: ['Dùng khuỷu tay kéo xuống, tưởng tượng tay chỉ là cái móc.', 'Ngực ưỡn đón đòn.'],
    mistakes: ['Kéo đòn ra sau gáy (hại vai).', 'Ngả người quá nhiều thành bài row.'],
  },
  'Close-Grip_Front_Lat_Pulldown': {
    name: 'Kéo xô tay hẹp (Close-Grip Pulldown)',
    group: 'back',
    howTo: [
      'Dùng tay cầm chữ V, ngồi thẳng, kẹp đùi.',
      'Kéo tay cầm xuống chạm giữa ngực, siết lưng giữa.',
      'Thả lên chậm, giữ lực căng.',
    ],
    cues: ['Tay hẹp nhắm vào phần lưng xô dưới và dày lưng.'],
    mistakes: ['Giật người ra sau.', 'Nhún vai khi thả lên.'],
  },
  Seated_Cable_Rows: {
    name: 'Kéo cáp ngồi (Seated Cable Row)',
    group: 'back',
    howTo: [
      'Ngồi thẳng, chân đạp bàn, gối hơi cong, lưng giữ thẳng.',
      'Kéo tay cầm về rốn, ép hai bả vai lại với nhau.',
      'Duỗi tay về trước chậm, cho bả vai trượt ra nhưng lưng không cong.',
    ],
    cues: ['Dừng 1 giây khi siết bả vai — rất quan trọng để chữa lưng gù.'],
    mistakes: ['Ngả người ra sau kéo bằng lưng dưới.', 'Cong lưng khi duỗi tay.'],
  },
  Bent_Over_Barbell_Row: {
    name: 'Kéo tạ đòn cúi người (Barbell Row)',
    group: 'back',
    howTo: [
      'Đứng rộng bằng hông, gập hông đưa thân về trước ~45°, lưng thẳng.',
      'Kéo đòn về phía rốn, khuỷu đi sát thân.',
      'Hạ đòn xuống có kiểm soát.',
    ],
    cues: ['Siết core và mông để khoá cột sống.', 'Cằm thu nhẹ, mắt nhìn sàn phía trước.'],
    mistakes: ['Cong lưng dưới — nguy cơ chấn thương cao nhất.', 'Dùng toàn thân giật đòn lên.'],
  },
  Cable_Rear_Delt_Fly: {
    name: 'Mở vai sau với cáp (Rear Delt Fly)',
    group: 'shoulders',
    howTo: [
      'Bắt chéo hai dây cáp ngang vai, mỗi tay cầm một bên.',
      'Mở hai tay sang ngang và ra sau, khuỷu cong nhẹ cố định.',
      'Siết vai sau 1 giây, thả về chậm.',
    ],
    cues: ['Bài quan trọng để cân bằng tư thế khi ngồi máy tính nhiều.'],
    mistakes: ['Dùng lưng giữa kéo thay vì vai sau.', 'Tạ quá nặng.'],
  },
  Barbell_Curl: {
    name: 'Cuốn tay trước tạ đòn (Barbell Curl)',
    group: 'arms',
    howTo: [
      'Đứng thẳng, nắm đòn rộng bằng vai, lòng bàn tay hướng trước.',
      'Cuốn đòn lên tới ngang ngực, khuỷu giữ sát thân.',
      'Hạ xuống chậm 3 giây.',
    ],
    cues: ['Siết core, không đu người.'],
    mistakes: ['Đưa khuỷu ra trước ở đỉnh.', 'Ngửa lưng lấy đà.'],
  },
  Hammer_Curls: {
    name: 'Cuốn tay kiểu búa (Hammer Curl)',
    group: 'arms',
    howTo: [
      'Cầm hai tạ đơn, lòng bàn tay hướng vào thân.',
      'Cuốn lên giữ nguyên hướng cổ tay.',
      'Hạ chậm về.',
    ],
    cues: ['Nhắm vào cơ cánh tay trong, giúp tay dày hơn.'],
    mistakes: ['Xoay cổ tay giữa chừng.', 'Lắc vai để đưa tạ lên.'],
  },
  Preacher_Curl: {
    name: 'Cuốn tay ghế Preacher',
    group: 'arms',
    howTo: [
      'Đặt cánh tay lên đệm nghiêng, nách tì sát mép đệm.',
      'Cuốn tạ lên, dừng trước khi cẳng tay thẳng đứng hoàn toàn.',
      'Hạ xuống chậm nhưng không duỗi khoá khớp khuỷu.',
    ],
    cues: ['Bài cô lập tay trước tốt nhất vì không thể gian lận.'],
    mistakes: ['Duỗi thẳng đột ngột ở đáy gây căng gân khuỷu.'],
  },
  Barbell_Squat: {
    name: 'Squat tạ đòn (Back Squat)',
    group: 'legs',
    howTo: [
      'Đặt đòn lên phần cơ thang trên, hai chân rộng bằng vai, mũi chân hơi xoay ngoài.',
      'Hít sâu, siết core, đẩy hông ra sau và hạ xuống tới khi đùi song song sàn hoặc sâu hơn.',
      'Đạp gót chân xuống sàn đứng lên, siết mông ở đỉnh.',
    ],
    cues: ['Gối đi theo hướng mũi chân, không đổ vào trong.', 'Giữ ngực cao, lưng trung tính.'],
    mistakes: ['Nhấc gót chân (thiếu linh hoạt cổ chân → tập giãn bắp chân).', 'Cong lưng dưới ở đáy.'],
  },
  Front_Squat_Clean_Grip: {
    name: 'Squat trước (Front Squat)',
    group: 'legs',
    howTo: [
      'Đặt đòn lên phần trước vai, khuỷu tay nâng cao song song sàn.',
      'Hạ người thẳng xuống, thân giữ thẳng đứng hơn back squat.',
      'Đạp lên, giữ khuỷu luôn cao.',
    ],
    cues: ['Nhắm nhiều vào đùi trước và core.'],
    mistakes: ['Hạ khuỷu tay khiến đòn trượt về trước.'],
  },
  Leg_Press: {
    name: 'Đạp đùi máy (Leg Press)',
    group: 'legs',
    howTo: [
      'Ngồi vào máy, hai chân đặt giữa bàn đạp, rộng bằng hông.',
      'Hạ bàn đạp xuống tới khi gối gập ~90° hoặc sâu hơn nếu lưng không nhấc.',
      'Đạp lên nhưng không khoá thẳng gối.',
    ],
    cues: ['Lưng dưới luôn dán vào đệm — nếu mông nhấc lên là đã hạ quá sâu.'],
    mistakes: ['Khoá gối đột ngột ở đỉnh.', 'Dùng tay đè lên gối.'],
  },
  Split_Squat_with_Dumbbells: {
    name: 'Squat chân trước sau (Split Squat / Bulgarian)',
    group: 'legs',
    howTo: [
      'Hai tay cầm tạ đơn, một chân bước về trước, chân sau đặt trên ghế (bản Bulgarian) hoặc trên sàn.',
      'Hạ thẳng người xuống tới khi gối sau gần chạm sàn.',
      'Đạp chân trước đứng lên, không đẩy bằng chân sau.',
    ],
    cues: ['Bài số 1 để sửa lệch chân và tăng sức mạnh cho đạp xe + đá bóng.'],
    mistakes: ['Bước quá ngắn khiến gối trước vượt quá xa mũi chân.', 'Mất thăng bằng do nhìn xuống.'],
  },
  Bodyweight_Walking_Lunge: {
    name: 'Lunge bước đi',
    group: 'legs',
    howTo: [
      'Đứng thẳng, bước một chân dài về trước.',
      'Hạ gối sau xuống gần sàn, thân giữ thẳng.',
      'Đạp chân trước lên và bước tiếp bằng chân kia.',
    ],
    cues: ['Dùng làm bài khởi động chân hoặc finisher đốt mỡ.'],
    mistakes: ['Bước quá ngắn.', 'Ngả người về trước.'],
  },
  Romanian_Deadlift: {
    name: 'Romanian Deadlift (RDL)',
    group: 'glutes',
    howTo: [
      'Đứng giữ đòn trước đùi, gối cong nhẹ và giữ nguyên góc gối.',
      'Đẩy hông ra sau, trượt đòn dọc theo đùi xuống tới ngang giữa cẳng chân.',
      'Siết mông đẩy hông về trước để đứng lên.',
    ],
    cues: ['Cảm giác căng ở đùi sau mới là đúng.', 'Lưng luôn thẳng, không cong.'],
    mistakes: ['Biến thành squat (gập gối quá nhiều).', 'Đòn rời xa thân làm lưng dưới chịu tải.'],
  },
  Barbell_Deadlift: {
    name: 'Deadlift tạ đòn',
    group: 'glutes',
    howTo: [
      'Đứng giữa đòn, chân rộng bằng hông, đòn nằm trên giữa bàn chân.',
      'Gập hông và gối nắm đòn, ngực lên, lưng thẳng, siết lưng xô.',
      'Đạp sàn ra xa, đẩy hông về trước tới khi đứng thẳng.',
    ],
    cues: ['Đòn đi sát chân suốt quá trình.', 'Nghĩ "đẩy sàn ra" thay vì "kéo tạ lên".'],
    mistakes: ['Hông bật lên trước ngực.', 'Cong lưng dưới.', 'Ngửa người ra sau ở đỉnh.'],
  },
  Barbell_Hip_Thrust: {
    name: 'Đẩy hông tạ đòn (Hip Thrust)',
    group: 'glutes',
    howTo: [
      'Lưng trên tựa mép ghế, đòn đặt ngang hông (có đệm).',
      'Đạp gót chân, đẩy hông lên tới khi thân và đùi thành đường thẳng.',
      'Siết mông 2 giây rồi hạ chậm.',
    ],
    cues: ['Thu cằm, nhìn về phía gối để tránh ưỡn lưng.'],
    mistakes: ['Ưỡn lưng dưới thay vì siết mông.', 'Đặt chân quá gần/quá xa.'],
  },
  Lying_Leg_Curls: {
    name: 'Cuốn đùi sau nằm (Lying Leg Curl)',
    group: 'glutes',
    howTo: [
      'Nằm sấp, cổ chân đặt dưới đệm lăn.',
      'Gập gối kéo gót về phía mông, siết 1 giây.',
      'Hạ chậm về gần thẳng.',
    ],
    cues: ['Không nhấc hông khỏi đệm.'],
    mistakes: ['Dùng lực giật và thả rơi.'],
  },
  Seated_Leg_Curl: {
    name: 'Cuốn đùi sau ngồi (Seated Leg Curl)',
    group: 'glutes',
    howTo: [
      'Ngồi vào máy, chỉnh đệm trên đùi và đệm lăn ngay trên gót.',
      'Gập gối kéo xuống hết biên độ.',
      'Thả lên chậm 3 giây.',
    ],
    cues: ['Tư thế ngồi kéo căng đùi sau nhiều hơn bản nằm.'],
    mistakes: ['Nhấc mông khỏi ghế.'],
  },
  Leg_Extensions: {
    name: 'Đá đùi trước máy (Leg Extension)',
    group: 'legs',
    howTo: [
      'Ngồi vào máy, trục xoay thẳng hàng với gối.',
      'Duỗi thẳng chân, siết đùi trước 1 giây.',
      'Hạ chậm về.',
    ],
    cues: ['Dùng làm bài khởi động làm nóng gối hoặc bài phụ cuối buổi.'],
    mistakes: ['Dùng tạ quá nặng gây đau gối.', 'Giật chân lên.'],
  },
  Standing_Calf_Raises: {
    name: 'Nhón bắp chân đứng',
    group: 'legs',
    howTo: [
      'Đứng trên bục, mũi chân trên bục, gót thả thấp hết cỡ.',
      'Nhón lên cao nhất có thể, dừng 1 giây.',
      'Hạ gót xuống chậm, căng hết biên độ.',
    ],
    cues: ['Biên độ đầy đủ quan trọng hơn mức tạ. Rất hữu ích cho đạp xe & đá bóng.'],
    mistakes: ['Nảy lên xuống bằng quán tính.'],
  },
  Seated_Calf_Raise: {
    name: 'Nhón bắp chân ngồi',
    group: 'legs',
    howTo: [
      'Ngồi, đệm đặt trên đùi sát gối, mũi chân trên bục.',
      'Nhón gót lên cao, siết 1 giây.',
      'Hạ chậm xuống hết biên độ.',
    ],
    cues: ['Tư thế ngồi nhắm vào cơ dép (soleus) — cơ chịu tải khi đạp xe đường dài.'],
    mistakes: ['Biên độ quá ngắn.'],
  },
  Hyperextensions_Back_Extensions: {
    name: 'Ngửa lưng trên ghế (Back Extension)',
    group: 'glutes',
    howTo: [
      'Nằm sấp trên ghế 45°, đệm ngay dưới hông.',
      'Gập hông hạ thân xuống, giữ lưng thẳng.',
      'Siết mông nâng thân lên tới khi thẳng hàng, không ngửa quá.',
    ],
    cues: ['Dừng ở đường thẳng, đừng ưỡn ngược.'],
    mistakes: ['Ưỡn quá đà gây ép đốt sống lưng dưới.'],
  },
  Good_Morning: {
    name: 'Good Morning',
    group: 'glutes',
    howTo: [
      'Đòn trên lưng trên như back squat, chân rộng bằng hông.',
      'Đẩy hông ra sau, cúi thân về trước, lưng thẳng.',
      'Siết mông đứng lên.',
    ],
    cues: ['Dùng tạ rất nhẹ khi mới tập. Có thể thay bằng RDL.'],
    mistakes: ['Cong lưng.', 'Dùng tạ nặng sớm.'],
  },
  Plank: {
    name: 'Plank',
    group: 'core',
    howTo: [
      'Chống khuỷu tay và mũi chân, thân thành một đường thẳng.',
      'Siết mông, siết bụng, thu xương chậu về (cuộn mông dưới).',
      'Giữ 30–60 giây, thở đều.',
    ],
    cues: ['Siết mạnh 30 giây tốt hơn thả lỏng 3 phút.'],
    mistakes: ['Võng lưng dưới.', 'Nâng mông quá cao.'],
  },
  Side_Bridge: {
    name: 'Plank nghiêng (Side Plank)',
    group: 'core',
    howTo: [
      'Nằm nghiêng, chống một khuỷu tay dưới vai.',
      'Nâng hông lên tạo đường thẳng từ đầu tới gót.',
      'Giữ 20–45 giây mỗi bên.',
    ],
    cues: ['Bài tốt nhất cho cơ liên sườn và chống lệch eo.'],
    mistakes: ['Hông tụt xuống.', 'Xoay thân về trước.'],
  },
  Dead_Bug: {
    name: 'Dead Bug',
    group: 'core',
    howTo: [
      'Nằm ngửa, hai tay vươn thẳng lên trần, gối và hông gập 90°.',
      'Ép lưng dưới sát sàn, duỗi tay phải và chân trái ra xa cùng lúc.',
      'Thu về rồi đổi bên.',
    ],
    cues: ['Lưng dưới không được tách khỏi sàn — đó là toàn bộ mục đích bài này.'],
    mistakes: ['Làm quá nhanh.', 'Nín thở.'],
  },
  Hanging_Leg_Raise: {
    name: 'Treo xà nâng chân (Hanging Leg Raise)',
    group: 'core',
    howTo: [
      'Treo người trên xà, vai siết xuống (không thả lỏng hoàn toàn).',
      'Cuộn xương chậu và nâng chân lên ngang hông hoặc cao hơn.',
      'Hạ chân xuống chậm, không đu.',
    ],
    cues: ['Phải cuộn hông mới tác động bụng dưới; chỉ nâng chân là tập cơ gập hông.'],
    mistakes: ['Đu người lấy đà.', 'Chỉ nâng chân mà không cuộn hông.'],
  },
  Cable_Crunch: {
    name: 'Gập bụng cáp quỳ (Cable Crunch)',
    group: 'core',
    howTo: [
      'Quỳ trước máy cáp cao, cầm dây thừng hai bên tai.',
      'Cuộn cột sống xuống bằng cơ bụng, khuỷu hướng về đùi.',
      'Cuộn lên chậm.',
    ],
    cues: ['Bài tập bụng có thể tăng tải — cần để cơ bụng dày lên và lộ rõ.'],
    mistakes: ['Gập hông thay vì cuộn cột sống.', 'Kéo bằng tay.'],
  },
  Reverse_Crunch: {
    name: 'Gập bụng ngược (Reverse Crunch)',
    group: 'core',
    howTo: [
      'Nằm ngửa, tay bám hai bên, gối gập 90°.',
      'Cuộn hông nâng mông khỏi sàn, đưa gối về phía ngực.',
      'Hạ xuống chậm.',
    ],
    cues: ['Tập trung vào bụng dưới — vùng khó lộ nhất.'],
    mistakes: ['Đẩy bằng quán tính chân.'],
  },
  Pallof_Press: {
    name: 'Pallof Press (chống xoay)',
    group: 'core',
    howTo: [
      'Đứng nghiêng với máy cáp ngang ngực, hai tay nắm tay cầm trước ngực.',
      'Đẩy thẳng tay ra trước và giữ 2–3 giây, chống lại lực kéo xoay.',
      'Thu về ngực, lặp lại rồi đổi bên.',
    ],
    cues: ['Bài chống xoay — bảo vệ cột sống khi đá bóng.'],
    mistakes: ['Để thân bị xoay theo cáp.', 'Nín thở.'],
  },
  Russian_Twist: {
    name: 'Xoay người kiểu Nga (Russian Twist)',
    group: 'core',
    howTo: [
      'Ngồi, ngả thân ra sau ~45°, chân nhấc nhẹ khỏi sàn.',
      'Xoay thân sang hai bên có kiểm soát.',
      'Giữ lưng thẳng suốt bài.',
    ],
    cues: ['Xoay từ thân trên, không chỉ vung tay.'],
    mistakes: ['Cong lưng.', 'Làm quá nhanh mất kiểm soát.'],
  },
  Mountain_Climbers: {
    name: 'Leo núi tại chỗ (Mountain Climbers)',
    group: 'core',
    howTo: [
      'Vào tư thế chống đẩy, thân thẳng.',
      'Kéo lần lượt từng gối về ngực nhanh.',
      'Giữ hông thấp, không nhấp nhô.',
    ],
    cues: ['Dùng làm finisher đốt calo cuối buổi.'],
    mistakes: ['Nâng mông cao.', 'Chạm chân nặng nề.'],
  },
  Barbell_Glute_Bridge: {
    name: 'Cầu mông tạ đòn (Glute Bridge)',
    group: 'glutes',
    howTo: [
      'Nằm ngửa trên sàn, gối gập, đòn đặt ngang hông.',
      'Đạp gót, đẩy hông lên hết biên độ.',
      'Siết mông 2 giây rồi hạ.',
    ],
    cues: ['Rất tốt để "đánh thức" mông sau cả ngày ngồi ghế.'],
    mistakes: ['Ưỡn lưng thay vì siết mông.'],
  },
  Cat_Stretch: {
    name: 'Giãn lưng mèo - bò (Cat-Cow)',
    group: 'mobility',
    howTo: [
      'Quỳ bốn điểm, tay dưới vai, gối dưới hông.',
      'Hít vào ưỡn lưng, ngẩng đầu; thở ra cong lưng, cúi cằm.',
      'Lặp lại 10 nhịp chậm.',
    ],
    cues: ['Làm 1–2 lần mỗi giờ ngồi làm việc.'],
    mistakes: ['Chuyển động quá nhanh.'],
  },
  Childs_Pose: {
    name: 'Tư thế em bé (Child\u2019s Pose)',
    group: 'mobility',
    howTo: [
      'Quỳ gối, ngồi lên gót, vươn hai tay dài về trước.',
      'Thả lỏng vai và lưng, trán chạm sàn.',
      'Giữ 30–60 giây, thở sâu.',
    ],
    cues: ['Giãn lưng dưới và vai sau một ngày ngồi.'],
    mistakes: ['Gồng vai lên tai.'],
  },
  Kneeling_Hip_Flexor: {
    name: 'Giãn cơ gập hông quỳ',
    group: 'mobility',
    howTo: [
      'Quỳ một gối, chân kia bước về trước tạo góc 90°.',
      'Siết mông bên chân quỳ và đẩy hông nhẹ về trước.',
      'Giữ 30 giây mỗi bên.',
    ],
    cues: ['Bài quan trọng nhất cho dân ngồi nhiều — cơ gập hông co ngắn gây ưỡn lưng và bụng đưa ra.'],
    mistakes: ['Ưỡn lưng dưới thay vì mở hông.'],
  },
  Chest_And_Front_Of_Shoulder_Stretch: {
    name: 'Giãn ngực & vai trước',
    group: 'mobility',
    howTo: [
      'Đặt cẳng tay lên khung cửa, khuỷu ngang vai.',
      'Bước một chân về trước, xoay thân ra xa.',
      'Giữ 30 giây mỗi bên.',
    ],
    cues: ['Chống vai cuộn về trước do gõ bàn phím.'],
    mistakes: ['Giãn quá mạnh gây đau khớp vai.'],
  },
  Shoulder_Stretch: {
    name: 'Giãn vai sau',
    group: 'mobility',
    howTo: [
      'Đưa một tay ngang ngực.',
      'Dùng tay kia kéo nhẹ vào thân.',
      'Giữ 20–30 giây mỗi bên.',
    ],
    cues: ['Làm sau buổi tập lưng/vai.'],
    mistakes: ['Nhún vai lên khi kéo.'],
  },
  'Piriformis-SMR': {
    name: 'Lăn foam cơ mông sâu (Piriformis)',
    group: 'mobility',
    howTo: [
      'Ngồi lên con lăn, bắt chéo một cổ chân lên gối đối diện.',
      'Lăn chậm quanh vùng mông, dừng ở điểm căng.',
      'Mỗi bên 30–60 giây.',
    ],
    cues: ['Giúp giảm căng hông sau buổi đạp xe dài.'],
    mistakes: ['Lăn quá nhanh.', 'Lăn trực tiếp lên dây thần kinh toạ gây tê chân.'],
  },
  Standing_Hip_Flexors: {
    name: 'Giãn cơ gập hông đứng',
    group: 'mobility',
    howTo: [
      'Đứng thẳng, bước một chân lùi ra sau.',
      'Siết mông, đẩy hông về trước nhẹ.',
      'Giữ 30 giây mỗi bên.',
    ],
    cues: ['Phiên bản làm ngay tại bàn làm việc, không cần quỳ.'],
    mistakes: ['Ưỡn lưng.'],
  },
  Seated_Calf_Stretch: {
    name: 'Giãn bắp chân ngồi',
    group: 'mobility',
    howTo: [
      'Ngồi duỗi thẳng một chân.',
      'Dùng khăn hoặc tay kéo mũi chân về phía người.',
      'Giữ 30 giây mỗi bên.',
    ],
    cues: ['Cổ chân linh hoạt hơn giúp squat sâu hơn và đạp xe đỡ chuột rút.'],
    mistakes: ['Cong lưng để với tới mũi chân.'],
  },
  'Scapular_Pull-Up': {
    name: 'Kéo bả vai treo xà (Scapular Pull-up)',
    group: 'back',
    howTo: [
      'Treo người thẳng tay trên xà.',
      'Không gập khuỷu, chỉ hạ vai xuống để nâng thân lên vài cm.',
      'Thả về trạng thái treo thụ động, lặp 10 nhịp.',
    ],
    cues: ['Bài khởi động bắt buộc trước khi hít xà, dạy cơ thể kích hoạt lưng xô.'],
    mistakes: ['Gập khuỷu tay thành hít xà.'],
  },
  'Isometric_Neck_Exercise_-_Front_And_Back': {
    name: 'Tập cổ tĩnh (chống đau cổ dân văn phòng)',
    group: 'mobility',
    howTo: [
      'Đặt lòng bàn tay lên trán, đẩy đầu vào tay mà đầu không di chuyển.',
      'Giữ 10 giây, đổi sang sau gáy và hai bên.',
      'Lặp 2–3 vòng.',
    ],
    cues: ['Kết hợp với động tác thu cằm (chin tuck) để chữa tư thế đầu đưa ra trước.'],
    mistakes: ['Dùng lực quá mạnh gây căng cơ cổ.'],
  },
}

const videos = videosJson as Record<string, ExerciseVideo>
const illustrations = illustrationsJson as Record<string, Illustration>

export const EXERCISES: Exercise[] = (generated as Generated[]).map((g) => {
  const o = OVERLAY[g.id]
  if (!o) throw new Error(`Thiếu bản dịch tiếng Việt cho bài tập: ${g.id}`)
  return {
    id: g.id,
    name: o.name,
    nameEn: g.name,
    group: o.group,
    equipment: g.equipment,
    level: g.level,
    mechanic: g.mechanic,
    primaryMuscles: g.primaryMuscles,
    images: g.images,
    illustration: illustrations[g.id],
    instructionsEn: g.instructions,
    howTo: o.howTo,
    cues: o.cues,
    mistakes: o.mistakes,
    video: videos[g.id],
    youtubeSearch: `https://www.youtube.com/results?search_query=${encodeURIComponent(
      `${g.name} proper form tutorial`,
    )}`,
  }
})

export const EXERCISE_BY_ID = new Map(EXERCISES.map((e) => [e.id, e]))

export function getExercise(id: string): Exercise {
  const e = EXERCISE_BY_ID.get(id)
  if (!e) throw new Error(`Không tìm thấy bài tập: ${id}`)
  return e
}
