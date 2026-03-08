# Product Requirements Document (PRD)
# MoneyGuard - Ứng dụng Quản lý Tài chính Cá nhân

## 1. Tổng quan sản phẩm

### 1.1 Mục đích
MoneyGuard là ứng dụng web quản lý tài chính cá nhân giúp người dùng theo dõi thu chi hằng ngày, quản lý ngân sách, và có cái nhìn tổng quan về tình hình tài chính của mình.

### 1.2 Mục tiêu
- Giúp người dùng ghi chép thu chi một cách dễ dàng và nhanh chóng
- Cung cấp báo cáo trực quan về tình hình tài chính
- Hỗ trợ quản lý nhiều tài khoản/ví khác nhau
- Cảnh báo khi chi tiêu vượt ngân sách đã đặt
- Giúp người dùng có thói quen quản lý tài chính tốt hơn

### 1.3 Đối tượng người dùng
- Người dùng cá nhân muốn quản lý tài chính hằng ngày
- Người có nhiều nguồn thu nhập và chi tiêu
- Người muốn tiết kiệm và kiểm soát chi tiêu
- Độ tuổi: 18-45, có smartphone/máy tính và thói quen sử dụng ứng dụng

---

## 2. Tính năng chi tiết

### 2.0 Quản lý Danh mục (Category Management)

#### 2.0.1 Mô tả
Hệ thống danh mục phân cấp với 2 cấp độ:
- **Category Group**: Nhóm danh mục chính (Thu nhập / Chi tiêu)
- **Category**: Danh mục con thuộc từng nhóm

#### 2.0.2 Yêu cầu chức năng

**Danh mục mặc định:**
- **Nhóm Thu nhập (Income)**
  - Lương
  - Thưởng
  - Đầu tư
  - Kinh doanh
  - Thu nhập khác
  
- **Nhóm Chi tiêu (Expense)**
  - Ăn uống
  - Đi lại
  - Giải trí
  - Nhà cửa
  - Y tế
  - Giáo dục
  - Mua sắm
  - Hóa đơn
  - Nợ/Vay
  - Chi tiêu khác

**Chức năng quản lý:**
- ✅ Xem danh sách danh mục theo nhóm
- ✅ Thêm danh mục mới vào nhóm Thu hoặc Chi
- ✅ Sửa tên danh mục
- ✅ Xóa danh mục (có cảnh báo nếu đang được sử dụng)
- ✅ Chọn icon/màu sắc cho từng danh mục
- ✅ Sắp xếp thứ tự hiển thị danh mục

#### 2.0.3 Giao diện
- Trang quản lý danh mục riêng biệt
- Hiển thị 2 cột: Thu nhập | Chi tiêu
- Mỗi danh mục hiển thị: Icon, Tên, Số giao dịch
- Nút "+" để thêm danh mục mới
- Click vào danh mục để sửa/xóa

#### 2.0.4 Validation
- Tên danh mục không được trống
- Tên danh mục không được trùng trong cùng nhóm
- Không cho phép xóa danh mục đang có giao dịch (hoặc hỏi chuyển sang danh mục khác)

---

### 2.1 Ghi chép Thu - Chi hằng ngày

#### 2.1.1 Mô tả
Cho phép người dùng ghi lại mọi khoản thu nhập và chi tiêu trong ngày một cách nhanh chóng và đầy đủ thông tin.

#### 2.1.2 Yêu cầu chức năng

**Thêm giao dịch mới:**
- ✅ Chọn loại giao dịch: Thu nhập hoặc Chi tiêu
- ✅ Nhập số tiền (bắt buộc)
- ✅ Chọn danh mục (bắt buộc)
- ✅ Chọn tài khoản/ví (bắt buộc)
- ✅ Chọn ngày giao dịch (mặc định: hôm nay)
- ✅ Nhập ghi chú/mô tả (tùy chọn)
- ✅ Lưu giao dịch

**Sửa giao dịch:**
- ✅ Click vào giao dịch để mở form chỉnh sửa
- ✅ Cho phép sửa tất cả các trường thông tin
- ✅ Lưu thay đổi

**Xóa giao dịch:**
- ✅ Nút xóa trên mỗi giao dịch
- ✅ Hiển thị dialog xác nhận trước khi xóa
- ✅ Cập nhật số dư tài khoản sau khi xóa

**Xem danh sách giao dịch:**
- ✅ Hiển thị danh sách giao dịch theo thứ tự thời gian (mới nhất trước)
- ✅ Mỗi giao dịch hiển thị: Icon danh mục, Tên danh mục, Số tiền, Ngày, Ghi chú
- ✅ Phân biệt màu sắc: Thu nhập (xanh lá), Chi tiêu (đỏ)
- ✅ Hiển thị tài khoản/ví đã sử dụng

#### 2.1.3 Giao diện
- Nút "Thêm giao dịch" nổi bật trên màn hình chính
- Form thêm/sửa giao dịch dạng modal hoặc trang riêng
- Danh sách giao dịch dạng card/list với scroll
- Responsive trên mobile và desktop

#### 2.1.4 Validation
- Số tiền phải lớn hơn 0
- Phải chọn danh mục
- Phải chọn tài khoản/ví
- Ngày không được là tương lai (có thể cấu hình)

---

### 2.2 Quản lý Danh mục Chi tiêu (đã mô tả ở 2.0)

---

### 2.3 Quản lý Tài khoản / Ví

#### 2.3.1 Mô tả
Cho phép người dùng quản lý nhiều tài khoản/ví khác nhau và theo dõi số dư của từng tài khoản.

#### 2.3.2 Yêu cầu chức năng

**Loại tài khoản:**
- Tiền mặt (Cash)
- Tài khoản ngân hàng (Bank Account)
- Thẻ tín dụng (Credit Card)
- Ví điện tử (E-Wallet)
- Tài khoản khác (Other)

**Quản lý tài khoản:**
- ✅ Thêm tài khoản mới
  - Tên tài khoản (bắt buộc)
  - Loại tài khoản (bắt buộc)
  - Số dư ban đầu (mặc định: 0)
  - Màu sắc/icon đại diện
  - Ghi chú
- ✅ Sửa thông tin tài khoản
- ✅ Xóa tài khoản (có cảnh báo nếu đang có giao dịch)
- ✅ Xem danh sách tất cả tài khoản
- ✅ Hiển thị số dư hiện tại của từng tài khoản
- ✅ Tính tổng số dư tất cả tài khoản

**Chuyển tiền nội bộ:**
- ✅ Chuyển tiền giữa các tài khoản
  - Chọn tài khoản nguồn
  - Chọn tài khoản đích
  - Nhập số tiền chuyển
  - Nhập ghi chú (tùy chọn)
  - Chọn ngày chuyển
- ✅ Tự động cập nhật số dư 2 tài khoản
- ✅ Ghi nhận lịch sử chuyển tiền

**Quản lý Vay - Nợ:**
- ✅ Ghi nhận khoản vay (Borrow)
  - Người cho vay
  - Số tiền vay
  - Ngày vay
  - Hạn trả (tùy chọn)
  - Lãi suất (tùy chọn)
  - Ghi chú
- ✅ Ghi nhận khoản cho vay (Lend)
  - Người đi vay
  - Số tiền cho vay
  - Ngày cho vay
  - Hạn thu (tùy chọn)
  - Lãi suất (tùy chọn)
  - Ghi chú
- ✅ Trả nợ/Thu nợ từng phần hoặc toàn bộ
- ✅ Xem danh sách các khoản vay/nợ đang còn
- ✅ Cảnh báo khi đến hạn trả/thu

#### 2.3.3 Giao diện
- Trang quản lý tài khoản riêng
- Hiển thị danh sách tài khoản dạng card với số dư
- Nút "Thêm tài khoản" và "Chuyển tiền"
- Tab riêng cho Vay/Nợ

#### 2.3.4 Validation
- Tên tài khoản không được trống
- Số dư ban đầu phải là số hợp lệ
- Số tiền chuyển phải nhỏ hơn hoặc bằng số dư tài khoản nguồn
- Tài khoản nguồn và đích phải khác nhau

---

### 2.4 Báo cáo, Biểu đồ, Thống kê

#### 2.4.1 Mô tả
Cung cấp các báo cáo trực quan giúp người dùng hiểu rõ tình hình tài chính của mình.

#### 2.4.2 Yêu cầu chức năng

**Tổng hợp thu - chi:**
- ✅ Chọn khoảng thời gian: Ngày, Tuần, Tháng, Năm, Tùy chỉnh
- ✅ Hiển thị:
  - Tổng thu nhập
  - Tổng chi tiêu
  - Chênh lệch (Thu - Chi)
  - Số dư hiện tại
- ✅ So sánh với kỳ trước (tăng/giảm bao nhiêu %)

**Biểu đồ:**
- ✅ Biểu đồ tròn (Pie Chart):
  - Tỷ trọng chi tiêu theo danh mục
  - Tỷ trọng thu nhập theo danh mục
- ✅ Biểu đồ cột (Bar Chart):
  - Thu - Chi theo ngày/tuần/tháng
  - So sánh thu - chi qua các tháng
- ✅ Biểu đồ đường (Line Chart):
  - Xu hướng chi tiêu theo thời gian
  - Xu hướng thu nhập theo thời gian
  - Xu hướng số dư

**Chi tiết theo danh mục:**
- ✅ Xem chi tiết chi tiêu của từng danh mục
- ✅ Xem danh sách giao dịch của từng danh mục
- ✅ Sắp xếp danh mục theo số tiền (cao đến thấp)

**Xuất báo cáo:**
- ✅ Xuất báo cáo dạng PDF
- ✅ Xuất dữ liệu dạng CSV/Excel
- ✅ Chia sẻ báo cáo qua email

#### 2.4.3 Giao diện
- Trang báo cáo riêng với các tab: Tổng quan, Biểu đồ, Chi tiết
- Bộ lọc thời gian ở đầu trang
- Biểu đồ tương tác (hover để xem chi tiết)
- Responsive và tối ưu cho mobile

#### 2.4.4 Hiệu năng
- Cache dữ liệu báo cáo
- Lazy load biểu đồ
- Tối ưu query database

---

### 2.5 Ngân sách và Cảnh báo

#### 2.5.1 Mô tả
Giúp người dùng đặt ngân sách và nhận cảnh báo khi chi tiêu gần hoặc vượt ngân sách.

#### 2.5.2 Yêu cầu chức năng

**Đặt ngân sách:**
- ✅ Đặt ngân sách tổng theo tháng
- ✅ Đặt ngân sách theo từng danh mục chi tiêu
  - Chọn danh mục
  - Nhập số tiền ngân sách
  - Chọn kỳ: Tháng, Quý, Năm
  - Chọn tháng/quý/năm áp dụng
- ✅ Sửa/Xóa ngân sách
- ✅ Xem danh sách ngân sách đã đặt

**Theo dõi ngân sách:**
- ✅ Hiển thị % đã chi so với ngân sách
- ✅ Progress bar trực quan:
  - Xanh: < 70%
  - Vàng: 70-90%
  - Đỏ: > 90%
- ✅ Hiển thị số tiền còn lại trong ngân sách
- ✅ Cảnh báo khi chi tiêu đạt ngưỡng:
  - 70% ngân sách: Cảnh báo nhẹ
  - 90% ngân sách: Cảnh báo mạnh
  - 100% ngân sách: Cảnh báo vượt ngân sách

**Thông báo:**
- ✅ Thông báo trong ứng dụng (In-app notification)
- ✅ Thông báo push (nếu có)
- ✅ Email thông báo (tùy chọn)
- ✅ Lịch sử thông báo

**Dashboard ngân sách:**
- ✅ Trang tổng quan ngân sách
- ✅ Hiển thị tất cả ngân sách đang theo dõi
- ✅ Highlight các ngân sách gần vượt hoặc đã vượt
- ✅ Gợi ý tiết kiệm dựa trên xu hướng chi tiêu

#### 2.5.3 Giao diện
- Trang quản lý ngân sách riêng
- Card cho mỗi ngân sách với progress bar
- Badge thông báo trên icon menu
- Modal cảnh báo khi thêm giao dịch vượt ngân sách

#### 2.5.4 Logic cảnh báo
- Kiểm tra ngân sách sau mỗi lần thêm giao dịch chi tiêu
- Tính toán tổng chi tiêu trong kỳ hiện tại
- So sánh với ngân sách đã đặt
- Hiển thị cảnh báo nếu vượt ngưỡng

---

## 3. Yêu cầu phi chức năng

### 3.1 Hiệu năng
- Thời gian tải trang < 2 giây
- Thời gian phản hồi thao tác < 500ms
- Hỗ trợ offline mode (lưu local, sync khi online)

### 3.2 Bảo mật
- Mã hóa dữ liệu nhạy cảm
- Xác thực người dùng (Login/Register)
- Session timeout sau 30 phút không hoạt động
- HTTPS cho mọi request

### 3.3 Khả năng mở rộng
- Hỗ trợ đa ngôn ngữ (Tiếng Việt, English)
- Hỗ trợ đa tiền tệ (VND, USD, EUR...)
- API để tích hợp với các dịch vụ khác

### 3.4 Trải nghiệm người dùng
- Giao diện thân thiện, dễ sử dụng
- Responsive trên mọi thiết bị
- Dark mode / Light mode
- Accessibility (WCAG 2.1 Level AA)

### 3.5 Độ tin cậy
- Backup dữ liệu tự động
- Khôi phục dữ liệu khi có lỗi
- Uptime > 99.5%

---

## 4. Luồng người dùng chính

### 4.1 Luồng đăng ký và đăng nhập
1. Người dùng truy cập ứng dụng
2. Chọn "Đăng ký" nếu chưa có tài khoản
3. Nhập thông tin: Email, Mật khẩu, Tên
4. Xác nhận email (tùy chọn)
5. Đăng nhập vào hệ thống

### 4.2 Luồng thêm giao dịch
1. Người dùng click "Thêm giao dịch"
2. Chọn loại: Thu nhập hoặc Chi tiêu
3. Nhập số tiền
4. Chọn danh mục
5. Chọn tài khoản/ví
6. Chọn ngày (mặc định hôm nay)
7. Nhập ghi chú (tùy chọn)
8. Click "Lưu"
9. Hệ thống cập nhật số dư tài khoản
10. Kiểm tra ngân sách và hiển thị cảnh báo nếu cần
11. Hiển thị giao dịch trong danh sách

### 4.3 Luồng xem báo cáo
1. Người dùng vào trang "Báo cáo"
2. Chọn khoảng thời gian
3. Xem tổng quan thu - chi
4. Xem biểu đồ chi tiết
5. Click vào danh mục để xem chi tiết
6. Xuất báo cáo nếu cần

### 4.4 Luồng đặt ngân sách
1. Người dùng vào trang "Ngân sách"
2. Click "Thêm ngân sách"
3. Chọn danh mục hoặc tổng
4. Nhập số tiền ngân sách
5. Chọn kỳ áp dụng
6. Lưu ngân sách
7. Hệ thống bắt đầu theo dõi và cảnh báo

---

## 5. Công nghệ đề xuất

### 5.1 Frontend
- **Framework**: React 18+ với TypeScript
- **Build Tool**: Vite
- **Routing**: React Router
- **State Management**: Context API hoặc Zustand
- **UI Components**: Custom components với CSS3
- **Charts**: Chart.js hoặc Recharts
- **Icons**: Lucide React
- **Date Picker**: React DatePicker

### 5.2 Backend (đề xuất)
- **Framework**: Node.js + Express hoặc NestJS
- **Database**: PostgreSQL hoặc MongoDB
- **ORM**: Prisma hoặc TypeORM
- **Authentication**: JWT
- **API**: RESTful API hoặc GraphQL

### 5.3 Deployment
- **Frontend**: Vercel, Netlify, hoặc AWS S3 + CloudFront
- **Backend**: AWS EC2, Heroku, hoặc Railway
- **Database**: AWS RDS, MongoDB Atlas
- **CI/CD**: GitHub Actions

---

## 6. Roadmap phát triển

### Phase 1: MVP (2-3 tháng)
- ✅ Đăng ký/Đăng nhập
- ✅ Quản lý danh mục cơ bản
- ✅ Thêm/Sửa/Xóa giao dịch
- ✅ Quản lý tài khoản/ví
- ✅ Dashboard cơ bản
- ✅ Light/Dark mode

### Phase 2: Báo cáo và Phân tích (1-2 tháng)
- ✅ Báo cáo thu - chi theo thời gian
- ✅ Biểu đồ tròn, cột, đường
- ✅ Xuất báo cáo PDF/CSV
- ✅ Chi tiết theo danh mục

### Phase 3: Ngân sách và Cảnh báo (1 tháng)
- ✅ Đặt ngân sách theo danh mục
- ✅ Theo dõi ngân sách
- ✅ Cảnh báo vượt ngân sách
- ✅ Dashboard ngân sách

### Phase 4: Tính năng nâng cao (2-3 tháng)
- ✅ Chuyển tiền nội bộ
- ✅ Quản lý vay - nợ
- ✅ Giao dịch định kỳ
- ✅ Đa tiền tệ
- ✅ Đa ngôn ngữ
- ✅ Offline mode

### Phase 5: Tối ưu và Mở rộng (liên tục)
- ✅ Tối ưu hiệu năng
- ✅ Mobile app (React Native)
- ✅ Tích hợp ngân hàng (Open Banking)
- ✅ AI gợi ý tiết kiệm
- ✅ Chia sẻ ngân sách với gia đình

---

## 7. Metrics đo lường thành công

### 7.1 Metrics người dùng
- Số lượng người dùng đăng ký
- Số lượng người dùng hoạt động hằng ngày (DAU)
- Số lượng người dùng hoạt động hằng tháng (MAU)
- Tỷ lệ giữ chân người dùng (Retention Rate)

### 7.2 Metrics tương tác
- Số lượng giao dịch được tạo mỗi ngày
- Số lần xem báo cáo
- Số lượng ngân sách được đặt
- Thời gian sử dụng trung bình

### 7.3 Metrics kỹ thuật
- Thời gian tải trang
- Tỷ lệ lỗi (Error Rate)
- Uptime
- API response time

---

## 8. Rủi ro và Giải pháp

### 8.1 Rủi ro bảo mật
- **Rủi ro**: Dữ liệu tài chính bị lộ
- **Giải pháp**: Mã hóa dữ liệu, HTTPS, xác thực 2 lớp

### 8.2 Rủi ro hiệu năng
- **Rủi ro**: Ứng dụng chậm khi có nhiều dữ liệu
- **Giải pháp**: Pagination, lazy loading, caching

### 8.3 Rủi ro trải nghiệm
- **Rủi ro**: Người dùng thấy khó sử dụng
- **Giải pháp**: User testing, thu thập feedback, cải thiện UX

### 8.4 Rủi ro cạnh tranh
- **Rủi ro**: Nhiều ứng dụng tương tự trên thị trường
- **Giải pháp**: Tập trung vào UX tốt, tính năng độc đáo, hỗ trợ tiếng Việt tốt

---

## 9. Phụ lục

### 9.1 Thuật ngữ
- **Transaction**: Giao dịch (thu hoặc chi)
- **Category**: Danh mục
- **Account/Wallet**: Tài khoản/Ví
- **Budget**: Ngân sách
- **Report**: Báo cáo
- **Dashboard**: Bảng điều khiển

### 9.2 Tham khảo
- Ứng dụng tương tự: Moneylover, Wallet, YNAB, Mint
- Design system: Material Design, Ant Design
- Best practices: WCAG 2.1, OWASP Top 10

---

**Phiên bản**: 1.0  
**Ngày tạo**: 2026-03-07  
**Người tạo**: Product Team  
**Trạng thái**: Draft

