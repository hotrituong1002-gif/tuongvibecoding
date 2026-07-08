# Kết nối SePay (thanh toán chuyển khoản tự động)

Trang web giờ có luồng mua hàng thật: khách bấm "Mua ngay" → hiện mã QR +
thông tin chuyển khoản → SePay phát hiện tiền về → hệ thống tự động mở khóa
sản phẩm cho khách, không cần thao tác thủ công.

## 1. Lấy Service Role Key của Supabase

Webhook chạy trên server, cần quyền ghi trực tiếp vào database (bỏ qua RLS)
vì SePay gọi vào từ bên ngoài, không có phiên đăng nhập người dùng.

1. Vào Supabase Dashboard → **Project Settings → API**.
2. Copy khóa **service_role** (khác với khóa **anon** đã dùng trước đó).
3. Thêm vào `.env.local`:

```
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

⚠️ Khóa này có toàn quyền trên database — **không** thêm tiền tố
`NEXT_PUBLIC_`, không commit lên Git, không dán vào chỗ công khai.

## 2. Chạy lại schema.sql (thêm bảng orders)

Vào Supabase → **SQL Editor**, dán lại toàn bộ nội dung file
[`supabase/schema.sql`](supabase/schema.sql) và **Run** — file đã được cập
nhật thêm bảng `orders` (an toàn chạy lại nhiều lần).

## 3. Cấu hình thông tin ngân hàng nhận tiền

Thêm vào `.env.local` (và vào Vercel khi deploy chính thức):

```
SEPAY_BANK_ACCOUNT_NUMBER=0123456789
SEPAY_BANK_NAME=MBBank
SEPAY_BANK_ACCOUNT_HOLDER=NGUYEN VAN A
```

`SEPAY_BANK_NAME` phải đúng mã ngân hàng mà SePay/VietQR nhận diện (thường là
tên viết liền không dấu, ví dụ `MBBank`, `Vietcombank`, `ACB`, `TPBank`...).
Xem danh sách chính xác trong SePay Dashboard → phần liên kết ngân hàng của
bạn.

## 4. Tạo webhook API Key trên SePay

1. Đăng nhập **sepay.vn** → vào tài khoản ngân hàng đã liên kết → mục
   **Cấu hình Webhook / API**.
2. Tạo một API Key mới (hoặc dùng key có sẵn) — đây là chuỗi bí mật SePay sẽ
   gửi kèm mỗi lần gọi webhook để xác thực.
3. Thêm vào `.env.local`:

```
SEPAY_WEBHOOK_API_KEY=chuoi-bi-mat-tu-sepay
```

4. Trong SePay, khai báo **Webhook URL** trỏ về:

```
https://<domain-cua-ban>/api/webhooks/sepay
```

(ví dụ `https://ai-sales-academy-seven.vercel.app/api/webhooks/sepay`)

SePay sẽ gửi kèm header `Authorization: Apikey <key>` hoặc
`Authorization: Bearer <key>` — hệ thống chấp nhận cả hai dạng, miễn khớp với
`SEPAY_WEBHOOK_API_KEY`.

## 5. Đưa biến môi trường lên Vercel

Khi deploy thật, 4 biến `SUPABASE_SERVICE_ROLE_KEY`,
`SEPAY_WEBHOOK_API_KEY`, `SEPAY_BANK_ACCOUNT_NUMBER`, `SEPAY_BANK_NAME`,
`SEPAY_BANK_ACCOUNT_HOLDER` cần được thêm vào **Vercel → Project → Settings →
Environment Variables** (không phải chỉ `.env.local`, vì file đó không được
đẩy lên server).

## 6. Kiểm tra thử

1. Đăng nhập trang web bằng một tài khoản, vào **Sản phẩm**, bấm "Mua ngay"
   một combo bất kỳ.
2. Trang thanh toán hiện mã QR + nội dung chuyển khoản dạng `DHXXXXXX`.
3. Chuyển khoản thật (hoặc dùng tính năng "giả lập giao dịch" nếu SePay hỗ
   trợ trong môi trường thử) đúng số tiền + đúng nội dung.
4. Trong vài giây, trang tự chuyển sang "Thanh toán thành công" và sản phẩm
   xuất hiện "Đã mở" trong Học viện.
5. Vào `/admin/orders` để xem toàn bộ lịch sử đơn hàng, hoặc "Xác nhận đã
   trả" thủ công nếu khách chuyển sai nội dung.

## Cách hoạt động (tóm tắt kỹ thuật)

- Mỗi đơn hàng có một mã thanh toán riêng (`DHXXXXXX`) khách phải ghi đúng
  vào nội dung chuyển khoản.
- SePay phát hiện giao dịch vào tài khoản → gọi webhook
  `/api/webhooks/sepay` kèm nội dung giao dịch.
- Hệ thống kiểm tra: đúng API Key → tìm mã `DHXXXXXX` trong nội dung → tra
  đơn hàng tương ứng → nếu số tiền đủ, đánh dấu đơn "đã thanh toán" và tự
  động mở khóa sản phẩm cho đúng khách hàng đó.
- Toàn bộ bước này chạy bằng `SUPABASE_SERVICE_ROLE_KEY` (bỏ qua RLS) vì
  request đến từ SePay, không có phiên đăng nhập — an toàn vì webhook đã
  được xác thực bằng API Key ở bước đầu tiên.
