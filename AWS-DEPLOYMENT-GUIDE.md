# Hướng Dẫn Triển Khai (Deployment) AWS ECS với GitHub Actions

Tài liệu này tổng hợp lại toàn bộ quá trình thiết lập CI/CD (Tích hợp và Triển khai liên tục) để đẩy ứng dụng lên Amazon Web Services (AWS) thông qua GitHub Actions. Tài liệu được viết chi tiết để người mới bắt đầu với AWS cũng có thể đọc hiểu, vận hành và khắc phục lỗi khi cần.

---

## 1. Tổng quan Kiến trúc (Overview)
Quy trình deployment tự động của ứng dụng hoạt động theo flow như sau:
1. Lập trình viên viết code và thực hiện lệnh push (đẩy) lên nhánh `main` trên GitHub.
2. **GitHub Actions** (đóng vai trò là máy chủ tự động hóa) sẽ nhận diện sự thay đổi code và tự động chạy kịch bản (được định nghĩa trong `.github/workflows/aws.yml`).
3. Máy chủ GitHub sẽ lấy source code, tạo ra một **Docker Image** (một gói nén chứa toàn bộ code và môi trường chạy: OS, dependencies...).
4. GitHub đẩy Docker Image này lên kho lưu trữ **Amazon ECR** trên AWS.
5. GitHub ra lệnh cho **Amazon ECS** thay thế phiên bản cũ bằng phiên bản mới ngập tràn từ ECR. Quá trình triển khai hoàn tất mà không downtime (Zero Downtime Deployment).

---

## 2. Các Khái niệm AWS Cần Nắm (Dành cho người mới)
- **IAM (Identity and Access Management)**: Hệ thống quản lý tài khoản và phân quyền của AWS. GitHub cần có 1 tài khoản (User) ở đây (đại diện bằng Access Key ID và Secret Key) để có chìa khóa đăng nhập vào AWS tự động.
- **Amazon ECR (Elastic Container Registry)**: Giống như Google Drive hay Docker Hub, nhưng của AWS, chuyên dùng để cất giữ các bản build Docker Image. Trong dự án này, ECR lưu trữ image có tên là `ui`.
- **Amazon ECS (Elastic Container Service)**: Dịch vụ chạy và vận hành ứng dụng. ECS nhận lệnh để chạy các Docker Image 24/7.
- **ECS Task Definition**: Bản "thiết kế" cấu hình báo cho ECS biết cách chạy ứng dụng. Nó chứa các yêu cầu máy chủ: "*Tôi cần 1024 CPU (1 vCPU), 2048 RAM (2 GB), mở cổng mạng số 80 và chạy file Docker tải về từ ECR.*" (File này lưu ở source code: `.aws/task-definition.json`).
- **ECS Cluster & Service**: 
  - **Cluster**: Máy chủ vật lý hoặc môi trường ảo hóa dùng để gom nhóm tài nguyên.
  - **Service**: Người giám hộ đảm bảo hệ thống bạn lúc nào cũng có ĐÚNG số lượng ứng dụng đang bật. Nếu app sập hay lỗi tắt ngang, Server sẽ tự động khởi động lại bản sao mới.

---

## 3. Cấu hình trên GitHub (Nơi hay sai sót nhất)
Nơi cài đặt: Tab **Settings > Secrets and variables > Actions** trên repository GitHub của bạn.

### A. Repository Variables (Biến môi trường công khai)
Mọi thiết lập về môi trường, tên kho trữ aws phải lưu ở đây. Việc khai báo biến giúp file kịch bản không bị "code cứng" (hardcode).
**Bảng các biến buộc phải có**:
| Tên Biến trong GitHub | Ví dụ Giá trị | Ý Nghĩa |
| :--- | :--- | :--- |
| `MY_AWS_REGION` | `ap-southeast-1` | Vùng máy chủ AWS (Singagpore). |
| `ECR_REPOSITORY` | `ui` | Tên kho chứa image trên ECR. |
| `ECS_CLUSTER` | `ecs-ui` | Tên cụm cluster trên ECS đang chạy. |
| `ECS_SERVICE` | `ui` | Tên của service quản lý ứng dụng trên ECS. |
| `MY_CONTAINER_NAME` | `app-ui` | Phải KHỚP chính xác với trường `name` trong `task-definition.json`. |

### B. Repository Secrets (Bảo mật tuyệt đối)
Đây là chìa khoá tài khoản IAM. **Cấm tuyệt đối** lưu cứng nó bằng dạng Text lên file `.yml`.
| Tên Biến trong GitHub | Ý Nghĩa |
| :--- | :--- |
| `AWS_ACCESS_KEY_ID` | Tên đăng nhập / Khóa truy cập API của User IAM. |
| `AWS_SECRET_ACCESS_KEY` | Mật khẩu truy cập API. |

---

## 4. Các file cấu hình trong Source Code

Được lưu trong Github để kiểm soát phiên bản.

1. **`.github/workflows/aws.yml`**
   - File kịch bản của GitHub Actions.
   - Luôn sử dụng cú pháp `${{ vars.TEN_BIEN }}` để đọc các Variables và `${{ secrets.TEN_SECRET }}` để đọc khóa bảo mật khai báo trên GitHub.
   
2. **`.aws/task-definition.json`**
   - Khai báo phần cứng, hệ điều hành (LINUX, kiến trúc X86_64 hoặc ARM64).
   - `executionRoleArn`: ID của Role phân quyền trên AWS cho phép ECS tải ảnh từ kho ECR và in log.
   - `containerDefinitions`: Có tùy chỉnh Port mapping (Ánh xạ cổng mạng 80 của vùng chứa container ra ngoài hệ thống AWS để có thể cấp đường dẫn public).

---

## 5. Tổng hợp Lỗi CI/CD Thường Gặp & Cách Khắc Phục

### ❌ Lỗi số 1: Hiểu nhầm cách đọc Variables
- **Triệu chứng:** Hành động login vào ECR bị thất bại hiển thị lỗi vùng miền (`Invalid region`), hoặc ECR name sai. Hoặc Action không tìm ra biến.
- **Nguyên nhân cốt lõi:** Developer điền giá trị dạng chữ trong file `.yml` (VD: `AWS_REGION: MY_AWS_REGION`). Github sẽ hiểu bạn đang setup khu vực AWS tên là "MY_AWS_REGION" (một vùng không tồn tại).
- **Khắc phục:** File `.yml` phải đọc biến từ trên Github, bắt buộc dùng cú pháp `${{ vars.MY_AWS_REGION }}`.

### ❌ Lỗi số 2: Lỗi xích mích tên Container "Container in Task Definition not found"
- **Triệu chứng:** Ở bước deploy lên Amazon ECS (`Amazon ECS deploy task definition`), lỗi đỏ hiển thị: *Did not find container [tên-nào-đó] in task definition*.
- **Nguyên nhân cốt lõi:** Có 2 thứ cần khớp nhau: biến `${{ vars.MY_CONTAINER_NAME }}` và trường `"name"` nằm sâu trong `.aws/task-definition.json`. Nếu một bên để là `ui`, một bên để là `app-ui`, AWS sẽ từ chối update vì không biết bạn định update cái nắp ứng dụng nào.
- **Khắc phục:** Đồng bộ lại `MY_CONTAINER_NAME` trên biến GitHub sao cho khớp 100% với chữ trong file file JSON (Ví dụ trong dự án này phải là `app-ui`).

### ❌ Lỗi số 3: Lỗi mất kết nối (Application Timeout) hoặc Crash Loop trên ECS
- **Triệu chứng:** Github Actions báo thành công (tick xanh), nhưng vào Console của AWS ECS thì thấy Task liên tục "RUNNING" rồi tắt "STOPPED".
- **Nguyên nhân cốt lõi:**
  1. Mã nguồn Code Node.js / React bị lỗi khi khởi động. 
  2. Bị sai cổng mạng: Ứng dụng code bắt chạy cổng `5173` (Vite) nhưng file JSON lại khai báo Port mapping là `80`. ECS gõ cửa cổng 80 nhưng không thấy ứng dụng nào nghe máy -> Dừng ngắt app.
  3. Security Groups (tường lửa AWS) chưa mở IP cho giao thông web vào ứng dụng.
- **Khắc phục:** Mở tab **Logs** bên trong Amazon ECS Console để đọc lỗi thực tế in ra từ Nodejs. 

### ❌ Lỗi số 4: Access Denied (Lỗi phân quyền IAM)
- **Triệu chứng:** Báo lỗi `AccessDenied` hay `Not authorized` tại bước login (`Login to Amazon ECR`) hoặc push image.
- **Nguyên nhân cốt lõi:** IAM User cấp cho GitHub (thông qua cặp key) bị thiếu một số quyền quan trọng để giao tiếp với AWS.
- **Khắc phục:** Vào AWS Console > IAM > Users > tìm User đang cấu hình, bổ sung quyền `AmazonEC2ContainerRegistryPowerUser` (để up image) và các quyền cho phép ECS update Task Definition.
