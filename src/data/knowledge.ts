export type Article = {
  id: string
  title: string
  summary: string
  sections: { heading: string; body: string[]; list?: string[] }[]
  sources?: { label: string; url: string }[]
}

export const ARTICLES: Article[] = [
  {
    id: 'skinny-fat',
    title: 'Skinny fat: vì sao gầy mà vẫn có bụng?',
    summary:
      'Cân nặng 62 kg ở chiều cao 171 cm là bình thường, nhưng tỉ lệ cơ thấp và mỡ tập trung ở bụng khiến nhìn vẫn "bèo nhèo". Vấn đề không nằm ở cân nặng mà ở thành phần cơ thể.',
    sections: [
      {
        heading: 'Chuyện gì đang xảy ra',
        body: [
          'Nhiều năm ngồi làm việc, ít vận động kháng lực và ăn thiên về tinh bột khiến khối cơ ít đi trong khi mỡ, đặc biệt mỡ quanh bụng, tăng lên. Kết quả là chỉ số cân nặng vẫn đẹp nhưng hình thể thì không.',
          'Vì vậy mục tiêu của bạn không phải "giảm cân". Giảm cân nhanh ở người skinny fat thường làm mất cơ và trông càng yếu hơn.',
        ],
      },
      {
        heading: 'Cách xử lý đúng',
        body: ['Chiến lược phù hợp nhất là tái cấu trúc cơ thể (body recomposition): ăn quanh mức duy trì, đạm cao, tập kháng lực nghiêm túc.'],
        list: [
          'Tập tạ 4 buổi/tuần, mỗi nhóm cơ 2 lần/tuần.',
          'Đạm 1,8–2,2 g cho mỗi kg cân nặng, tức khoảng 110–135 g/ngày với bạn.',
          'Thâm hụt calo nhẹ thôi (khoảng 5–10%), đừng nhịn.',
          'Theo dõi bằng vòng bụng và ảnh chụp, không phải bằng cân.',
          'Kiên nhẫn: 12–16 tuần mới thấy khác biệt rõ ràng.',
        ],
      },
      {
        heading: 'Về lớp da bụng dày',
        body: [
          'Cảm giác "da bụng dày" phần lớn là lớp mỡ dưới da cộng với việc cơ bụng chưa phát triển. Khi mỡ giảm dần và cơ bụng dày lên, vùng này sẽ săn lại.',
          'Không có bài tập nào đốt mỡ cục bộ ở bụng. Gập bụng 1000 cái/ngày không làm lộ cơ bụng — chỉ thâm hụt calo mới làm được điều đó.',
        ],
      },
    ],
    sources: [
      { label: 'Barakat et al. 2020 — Body Recomposition (Strength & Conditioning Journal)', url: 'https://doi.org/10.1519/SSC.0000000000000584' },
      { label: 'Morton et al. 2018 — Protein supplementation meta-analysis (BJSM)', url: 'https://doi.org/10.1136/bjsports-2017-097608' },
    ],
  },
  {
    id: 'six-pack',
    title: 'Lộ trình thực tế để có cơ bụng 6 múi',
    summary:
      'Cơ bụng 6 múi là kết quả của hai việc tách biệt: làm cơ bụng dày lên và hạ tỉ lệ mỡ cơ thể xuống đủ thấp. Với nam giới, múi bụng thường bắt đầu lộ ở khoảng 12–14% mỡ và rõ ở dưới 12%.',
    sections: [
      {
        heading: 'Hai việc phải làm song song',
        body: [],
        list: [
          'Làm dày cơ bụng: tập bụng có tăng tải (cable crunch, hanging leg raise) 2–3 buổi/tuần, 3 set mỗi bài, giống như tập ngực hay lưng.',
          'Hạ mỡ: thâm hụt calo nhẹ và đều đặn, duy trì nhiều tháng chứ không phải vài tuần.',
        ],
      },
      {
        heading: 'Mốc thời gian hợp lý',
        body: [
          'Với tỉ lệ mỡ hiện tại ước tính khoảng 18–22%, bạn cần giảm khoảng 5–8 kg mỡ. Ở tốc độ an toàn 0,3–0,5 kg mỡ mỗi tuần, lộ trình rơi vào 4–6 tháng.',
          'Trong thời gian đó, nếu tập đúng, bạn vẫn tăng được 2–4 kg cơ. Vòng bụng giảm nhưng vai và ngực to ra — đó là lý do bạn phải đo chứ không chỉ nhìn cân.',
        ],
      },
      {
        heading: 'Những việc không cần làm',
        body: [],
        list: [
          'Không cần uống đai nịt bụng, trà giảm cân, thuốc đốt mỡ.',
          'Không cần nhịn ăn tối hay cắt hoàn toàn tinh bột.',
          'Không cần chạy bộ thêm — bạn đã có 60 km đạp xe và một trận bóng mỗi tuần.',
        ],
      },
    ],
  },
  {
    id: 'it-desk',
    title: 'Dân IT: chống hại của việc ngồi 8 tiếng',
    summary:
      'Ngồi nhiều không chỉ làm tăng mỡ bụng mà còn làm co ngắn cơ gập hông, yếu cơ mông, cuộn vai về trước và đẩy đầu ra trước. Tất cả đều làm bụng trông to hơn thực tế.',
    sections: [
      {
        heading: 'Quy tắc 50/10',
        body: ['Cứ 50 phút ngồi thì đứng dậy 10 phút, hoặc tối thiểu 2–3 phút vận động nhẹ mỗi giờ. Hãy đặt hẹn giờ trong IDE hoặc điện thoại.'],
        list: [
          'Đứng dậy đi lấy nước — vừa vận động vừa đủ nước.',
          'Làm chuỗi "Reset bàn làm việc" 10 phút vào giữa buổi chiều.',
          'Họp nội bộ có thể đứng hoặc đi bộ.',
        ],
      },
      {
        heading: 'Tư thế ngồi tối thiểu phải đúng',
        body: [],
        list: [
          'Màn hình ngang tầm mắt, cạnh trên màn hình bằng chân mày.',
          'Khuỷu tay gập 90°, cổ tay thẳng trục cẳng tay.',
          'Hai chân đặt phẳng trên sàn, gối ngang hoặc thấp hơn hông một chút.',
          'Tựa lưng đỡ phần thắt lưng; nếu ghế không có, cuộn một chiếc khăn chèn vào.',
        ],
      },
      {
        heading: 'Tác dụng lên mỡ bụng',
        body: [
          'Việc cắt nhỏ thời gian ngồi liên tục giúp kiểm soát đường huyết sau bữa ăn tốt hơn, đồng thời tăng tổng năng lượng tiêu hao ngoài tập luyện (NEAT) — vốn là yếu tố tạo khác biệt lớn giữa người giảm được mỡ và người không.',
        ],
      },
    ],
    sources: [
      { label: 'WHO 2020 guidelines on physical activity and sedentary behaviour', url: 'https://doi.org/10.1136/bjsports-2020-102955' },
    ],
  },
  {
    id: 'cycling-30km',
    title: 'Đạp xe 30 km đi làm: dùng sao cho đúng',
    summary:
      'Quãng đường 30 km mỗi chiều là tài sản lớn, nhưng nếu đạp quá nặng vào ngày trước buổi chân thì sẽ phá hỏng buổi tập tạ. Nguyên tắc: đạp chậm, đều, ở mức còn nói chuyện được.',
    sections: [
      {
        heading: 'Cách bố trí trong tuần',
        body: [],
        list: [
          'Thứ 2 đạp lên công ty rồi để xe lại, tối tập Upper A (thân trên) — chân được nghỉ.',
          'Thứ 4 đạp xe về nhà, đây là ngày không tập tạ nên đạp nhẹ để hồi phục.',
          'Không đạp hết sức vào ngày trước buổi Lower hoặc trước trận bóng.',
        ],
      },
      {
        heading: 'Cường độ: Zone 2 là gì',
        body: [
          'Zone 2 là mức bạn vẫn nói được trọn câu mà không hụt hơi, khoảng 60–70% nhịp tim tối đa. Với tuổi 28 thì rơi vào khoảng 115–135 nhịp/phút.',
          'Ở mức này cơ thể dùng mỡ làm nhiên liệu chính và hầu như không ảnh hưởng tới khả năng hồi phục cho buổi tạ.',
        ],
      },
      {
        heading: 'Chuẩn bị cho mỗi chuyến',
        body: [],
        list: [
          'Nước: 1 bình 750 ml cho 30 km, uống từng ngụm mỗi 15 phút.',
          'Năng lượng: 1 quả chuối giữa chặng nếu đạp trên 60 phút.',
          'Yên xe đúng chiều cao: khi bàn đạp ở điểm thấp nhất, gối còn cong nhẹ khoảng 25–30°.',
          'Sau khi tới nơi: giãn cơ gập hông và bắp chân 2 phút, tránh ngồi ngay xuống ghế làm việc.',
        ],
      },
    ],
  },
  {
    id: 'progress-no-scale',
    title: 'Không có cân thì đo tiến độ bằng gì?',
    summary:
      'Thật ra không có cân lại là lợi thế: cân nặng dao động 1–2 kg mỗi ngày vì nước và thức ăn trong ruột, gây hoang mang vô ích. Thước dây và máy ảnh cho tín hiệu tốt hơn nhiều.',
    sections: [
      {
        heading: 'Bốn chỉ số nên theo dõi',
        body: [],
        list: [
          'Vòng bụng ngang rốn — đo sáng sớm khi bụng đói, thở ra nhẹ, không hóp. Mỗi tuần một lần.',
          'Vòng cổ và vòng bụng để tính % mỡ theo công thức US Navy (có sẵn ở trang Tiến độ).',
          'Ảnh chụp mỗi 2 tuần: cùng chỗ đứng, cùng ánh sáng, cùng giờ.',
          'Sức mạnh: mức tạ và số lần của các bài chính. Tạ lên mà vòng bụng xuống là đang đi đúng hướng.',
        ],
      },
      {
        heading: 'Đọc kết quả thế nào',
        body: [],
        list: [
          'Vòng bụng giảm + tạ tăng → hoàn hảo, giữ nguyên mọi thứ.',
          'Vòng bụng đứng yên 3 tuần liền → giảm thêm 100–150 kcal ở ngày nghỉ.',
          'Tạ tụt liên tục + mệt mỏi → đang ăn thiếu hoặc ngủ thiếu, tăng calo lại.',
          'Vòng bụng giảm quá nhanh (trên 1 cm/tuần) → nguy cơ mất cơ, nên ăn thêm.',
        ],
      },
    ],
  },
  {
    id: 'eating-out',
    title: 'Ăn ngoài, ăn cơm công ty mà vẫn đúng mục tiêu',
    summary:
      'Bạn không thể mang cân đi quán. Nhưng chỉ cần nhớ vài quy đổi và vài quy tắc gọi món là đủ kiểm soát 80% kết quả.',
    sections: [
      {
        heading: 'Quy tắc gọi món',
        body: [],
        list: [
          'Luôn gọi thêm một phần đạm (trứng, thịt, đậu hũ) — suất cơm bình dân thường chỉ có 50–70 g thịt.',
          'Yêu cầu ít dầu, ít nước sốt. Nước sốt ngọt là calo ẩn lớn nhất.',
          'Món luộc, hấp, nướng ưu tiên hơn chiên, rim, kho béo.',
          'Ăn hết rau trước, rồi đạm, cơm ăn sau cùng và chừa lại nếu thấy no.',
          'Đồ uống: nước lọc, trà đá không đường, cà phê đen. Một ly trà sữa bằng gần 4 chén cơm.',
        ],
      },
      {
        heading: 'Vài món Việt quen thuộc',
        body: [],
        list: [
          'Phở bò: khoảng 450–550 kcal, 25–30 g đạm. Khá ổn, gọi thêm thịt là thành bữa tốt.',
          'Cơm tấm sườn: 700–900 kcal vì sườn ướp đường và mỡ. Ăn thì bỏ bớt cơm.',
          'Bún chả: 600–700 kcal, chả nướng khá nhiều mỡ.',
          'Bánh mì thịt: 400–550 kcal, bảo giảm bơ và pate.',
          'Cơm gà xối mỡ, cơm chiên: thuộc nhóm nên hạn chế.',
        ],
      },
    ],
  },
  {
    id: 'sleep-recovery',
    title: 'Ngủ và hồi phục — phần bị xem nhẹ nhất',
    summary:
      'Thiếu ngủ làm giảm tăng trưởng cơ, tăng cảm giác thèm đồ ngọt và khiến cơ thể giữ mỡ bụng. Với lịch tập dày như của bạn, ngủ chính là một phần của giáo án.',
    sections: [
      {
        heading: 'Mục tiêu',
        body: [],
        list: [
          'Ngủ 7–8 tiếng, cố định giờ đi ngủ kể cả cuối tuần.',
          'Ngừng màn hình sáng 45 phút trước khi ngủ, hoặc bật chế độ ấm màu.',
          'Không cà phê sau 15h — thời gian bán thải caffeine khoảng 5–6 tiếng.',
          'Tối thứ 5 đá bóng về muộn thì sáng thứ 6 có thể lùi buổi tập sang chiều.',
        ],
      },
      {
        heading: 'Dấu hiệu đang quá tải',
        body: [],
        list: [
          'Nhịp tim lúc nghỉ buổi sáng cao hơn bình thường 5–10 nhịp.',
          'Mức tạ tụt ở 2 buổi liên tiếp.',
          'Đau nhức khớp (không phải đau cơ) kéo dài trên 3 ngày.',
          'Mất hứng tập, ngủ không sâu. Khi đó hãy nghỉ 2–3 ngày hoặc tập tuần deload.',
        ],
      },
    ],
  },
]

export const ARTICLE_BY_ID = new Map(ARTICLES.map((a) => [a.id, a]))
