# Kết nối Supabase (bắt buộc để trang web hoạt động)

Trang web giờ cần một project Supabase thật (miễn phí) để lưu tài khoản, sản
phẩm, mã kích hoạt và người dùng. Làm theo các bước sau:

## 1. Tạo project Supabase

1. Vào https://supabase.com → Sign up / Sign in → **New project**.
2. Đặt tên project (vd: `ai-sales-academy`), chọn mật khẩu database, chọn
   region gần Việt Nam (Singapore), bấm **Create**. Đợi 1-2 phút.

## 2. Chạy schema

1. Trong project, mở **SQL Editor** (menu bên trái) → **New query**.
2. Copy toàn bộ nội dung file [`supabase/schema.sql`](supabase/schema.sql)
   trong repo này, dán vào, bấm **Run**.
3. Lệnh này tạo đầy đủ bảng, quyền truy cập (RLS), hàm nhập mã kích hoạt, và
   seed sẵn 7 sản phẩm + 1 mã demo `AISALES2026`.

## 3. Lấy API keys

1. Vào **Project Settings → API**.
2. Copy **Project URL** và **anon public** key.
3. Trong thư mục `ai-sales-academy/`, copy file `.env.local.example` thành
   `.env.local`, dán 2 giá trị trên vào:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

`.env.local` không được commit lên GitHub (đã có trong `.gitignore`).

## 4. Chạy thử

```bash
npm install
npm run dev
```

Mở http://localhost:3000/dang-nhap → tạo tài khoản của bạn.

> Mặc định Supabase yêu cầu xác nhận email trước khi đăng nhập được. Muốn tắt
> để test nhanh: **Authentication → Providers → Email → tắt "Confirm email"**.

## 5. Biến tài khoản của bạn thành Admin

Sau khi đăng ký xong, vào lại **SQL Editor**, chạy (thay email của bạn):

```sql
update public.profiles set role = 'admin' where email = 'ban@email.com';
```

Đăng xuất/đăng nhập lại → vào `/admin` để quản lý sản phẩm, mã kích hoạt,
người dùng và giá gói trọn bộ.

## 6. Trước khi ra mắt thật

- Vào `/admin/codes`, vô hiệu hoá hoặc xoá mã demo `AISALES2026`.
- Sửa nội dung/giá sản phẩm thật ở `/admin/products`.
- Đặt `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` làm biến
  môi trường trên nơi bạn deploy (Vercel, v.v.) — không copy `.env.local` lên
  server thủ công.
