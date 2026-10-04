# GymCoach — Giáo án tập luyện & dinh dưỡng cá nhân

Web app chạy hoàn toàn trên trình duyệt (không cần server, không cần tài khoản), được thiết kế riêng cho một người:

| Thông số | Giá trị |
| --- | --- |
| Chiều cao / cân nặng | 171 cm · 62 kg |
| Tình trạng | Skinny fat — mỡ tập trung ở bụng |
| Mục tiêu | Tăng cơ, giảm mỡ bụng, hướng tới cơ bụng 6 múi |
| Nghề nghiệp | IT, ngồi nhiều |
| Vận động sẵn có | Đạp xe đi làm 30 km mỗi chiều · đá bóng tối thứ 5 |
| Ràng buộc | **Không có cân** → mọi khẩu phần đong bằng chén, muỗng, lòng bàn tay |

## Tính năng

- **Hôm nay** — buổi tập của ngày, mục tiêu calo/macro tính theo đúng mức vận động của ngày đó.
- **Lịch tập** — giáo án Upper/Lower 4 buổi tạ/tuần xếp xen kẽ với 2 chiều đạp xe và trận bóng thứ 5, kèm lộ trình 12 tuần.
- **Chi tiết buổi tập** — khởi động, từng bài với số set/rep/thời gian nghỉ, ô nhập mức tạ, gợi ý số liệu buổi trước, đồng hồ đếm ngược thời gian nghỉ.
- **Thư viện bài tập** — 56 bài tập. 52 bài có hình vẽ 3 khung hình (nét trắng trên nền tối), tất cả đều có ảnh chụp thật để đối chiếu, hướng dẫn tiếng Việt, mẹo kỹ thuật và lỗi thường gặp. Mỗi bài có thể ghim một video YouTube tuỳ ý, phát qua trình nhúng chính thức.
- **Dinh dưỡng** — 5 thực đơn mẫu theo từng loại ngày (đạp xe + tạ, tạ, đạp xe về, đá bóng, nghỉ), mỗi món ghi bằng đơn vị gia đình và được đối chiếu với mục tiêu calo của ngày.
- **Quy đổi khẩu phần** — công cụ đổi "1,5 chén cơm", "1 lòng bàn tay ức gà", "1 muỗng canh dầu" ra gram và calo, cộng nhật ký ăn uống trong ngày.
- **Tiến độ** — theo dõi bằng thước dây thay vì cân: vòng bụng, % mỡ ước tính theo công thức US Navy, tỉ lệ bụng/chiều cao, biểu đồ và tổng khối lượng tạ đã nâng.
- **Kiến thức** — 7 bài viết giải thích skinny fat, lộ trình 6 múi, cách ngồi làm việc, cách dùng quãng đường đạp xe, ăn ngoài, ngủ và hồi phục (có dẫn nguồn nghiên cứu).
- **Cài đặt** — chỉnh thông số cá nhân, xuất/nhập file sao lưu JSON, trang ghi nguồn và giấy phép.

Toàn bộ dữ liệu cá nhân (nhật ký tập, số đo, nhật ký ăn) lưu trong `localStorage` của trình duyệt, không gửi đi đâu.

## Chạy dự án

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build production vào dist/
npm run preview    # xem thử bản build
npm run lint
```

### Deploy lên GitHub Pages

```bash
npm run deploy     # build với base '/Gym/' rồi đẩy dist/ lên nhánh gh-pages
```

Nếu repository có tên khác, đặt biến môi trường `VITE_BASE=/ten-repo/` trước khi build.

## Cập nhật dữ liệu bài tập

Ảnh và video bài tập được tải sẵn thành file JSON trong `src/data/` để app chạy được mà không phụ thuộc API lúc runtime.

```bash
npm run data:exercises       # sinh lại src/data/exercises.generated.json từ free-exercise-db
npm run data:videos          # sinh lại src/data/videos.generated.json từ wger API
npm run data:illustrations   # sinh lại src/data/illustrations.generated.json từ workout-guide
npm run data:all
```

Muốn thêm bài tập mới: thêm `id` vào mảng `WANTED` trong `scripts/build-exercises.mjs`, chạy lại script, rồi bổ sung phần dịch tiếng Việt tương ứng vào `OVERLAY` trong `src/data/exercises.ts`. Nếu muốn bài đó có hình vẽ, thêm cặp `id → slug` vào `MAP` trong `scripts/build-illustrations.mjs`. Các script đều báo lỗi nếu `id`/`slug` không tồn tại, và app báo lỗi nếu thiếu bản dịch.

## Cấu trúc

```
scripts/           Script sinh dữ liệu (chạy thủ công, không nằm trong build)
src/
  components/      Layout, thẻ UI dùng chung, ảnh động bài tập, đồng hồ nghỉ
  data/            Bài tập, giáo án, thực phẩm, thực đơn, bài viết kiến thức
  lib/             Kiểu dữ liệu, tính toán dinh dưỡng, localStorage, nhật ký tập
  pages/           Các trang tương ứng với route
```

## Nguồn dữ liệu & giấy phép

| Nguồn | Dùng cho | Giấy phép |
| --- | --- | --- |
| [free-exercise-db](https://github.com/yuhonas/free-exercise-db) | Ảnh chụp và metadata bài tập | Unlicense (phạm vi công cộng) |
| [Workout Guide — Bryl Lim](https://github.com/bryllim/workout-guide) | Hình vẽ 3 khung hình, dựa trên [Everkinetic](https://github.com/everkinetic/data) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) — dùng nguyên bản, không chỉnh sửa |
| [wger](https://wger.de) | Video demo bài tập | Creative Commons BY-SA (ghi tác giả theo từng video trong app) |
| [YouTube](https://www.youtube.com) | Video do người dùng tự ghim | Phát qua trình nhúng chính thức (`youtube-nocookie.com`); app chỉ lưu mã video trên máy bạn, không tải hay lưu trữ nội dung |
| [USDA FoodData Central](https://fdc.nal.usda.gov) | Giá trị dinh dưỡng trên 100 g | CC0 |
| [Bảng thành phần thực phẩm Việt Nam 2007 — Viện Dinh dưỡng](https://www.fao.org/infoods/infoods/tables-and-databases/asia/en/) | Số liệu thực phẩm Việt | Số liệu tham chiếu, bản PDF do FAO/INFOODS lưu trữ |

Dự án chỉ dùng tài nguyên có giấy phép cho phép tái sử dụng, hoặc nhúng qua player chính thức của nhà cung cấp. Không có ảnh, GIF hay video bản quyền nào được sao chép vào repository này.

Bảng quy đổi đơn vị gia đình (chén, muỗng, lòng bàn tay), toàn bộ nội dung tiếng Việt và giáo án là phần tự biên soạn của dự án này.

Các nghiên cứu được trích dẫn trong mục Kiến thức: Schoenfeld và cộng sự 2016 (tần suất tập), Morton và cộng sự 2018 (nhu cầu đạm), Barakat và cộng sự 2020 (tái cấu trúc cơ thể), WHO 2020 (vận động và thời gian ngồi).

> Ứng dụng mang tính tham khảo, không thay thế tư vấn của bác sĩ hay huấn luyện viên.
