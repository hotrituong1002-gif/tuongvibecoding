-- AI Sales Academy — Supabase schema
-- Paste this whole file into Supabase Dashboard → SQL Editor → New query → Run.
-- Safe to re-run: uses "if not exists" / "on conflict" / "drop policy if exists".

create extension if not exists pgcrypto;

-- 1. profiles (one row per auth.users, created automatically on signup)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'customer' check (role in ('customer','admin')),
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. products (content shown on Trang chủ / Sản phẩm / Học viện)
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  tag text not null default '',
  badge text not null default 'Khóa' check (badge in ('Khóa','Đặc biệt')),
  kind text not null default 'combo' check (kind in ('ebook','combo','special')),
  price integer not null default 0,
  lessons_count integer not null default 0,
  cover text not null default 'from-zinc-800 via-zinc-900 to-black',
  description text not null default '',
  outcomes jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. activation_codes (redeemable in Học viện to unlock products)
create table if not exists public.activation_codes (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  scope text not null default 'bundle', -- 'bundle' = all products, or an exact product slug
  max_uses integer not null default 1,
  uses_count integer not null default 0,
  is_active boolean not null default true,
  expires_at timestamptz,
  note text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

-- 4. unlocks (which user has access to which product)
create table if not exists public.unlocks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_slug text not null references public.products(slug) on delete cascade,
  source text not null default 'code' check (source in ('code','admin_grant','purchase')),
  activation_code_id uuid references public.activation_codes(id),
  unlocked_at timestamptz not null default now(),
  unique (user_id, product_slug)
);

-- 5. settings (small key/value store for site-wide numbers, e.g. bundle price)
create table if not exists public.settings (
  key text primary key,
  value jsonb not null
);

insert into public.settings (key, value)
values ('bundle_price', '990000')
on conflict (key) do nothing;

-- 6. orders (SePay bank-transfer checkout)
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  scope text not null, -- 'bundle' or an exact product slug
  amount integer not null,
  payment_code text unique not null,
  status text not null default 'pending' check (status in ('pending','paid','expired','cancelled')),
  sepay_transaction_id text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

-- Helper: is the current logged-in user an admin? (security definer avoids RLS recursion)
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.activation_codes enable row level security;
alter table public.unlocks enable row level security;
alter table public.settings enable row level security;
alter table public.orders enable row level security;

drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select" on public.profiles for select
  using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles_update" on public.profiles;
create policy "profiles_update" on public.profiles for update
  using (auth.uid() = id or public.is_admin());

drop policy if exists "products_select" on public.products;
create policy "products_select" on public.products for select
  using (is_active = true or public.is_admin());

drop policy if exists "products_insert" on public.products;
create policy "products_insert" on public.products for insert
  with check (public.is_admin());

drop policy if exists "products_update" on public.products;
create policy "products_update" on public.products for update
  using (public.is_admin());

drop policy if exists "products_delete" on public.products;
create policy "products_delete" on public.products for delete
  using (public.is_admin());

drop policy if exists "codes_all" on public.activation_codes;
create policy "codes_all" on public.activation_codes for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "unlocks_select" on public.unlocks;
create policy "unlocks_select" on public.unlocks for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "unlocks_insert" on public.unlocks;
create policy "unlocks_insert" on public.unlocks for insert
  with check (public.is_admin());

drop policy if exists "unlocks_update" on public.unlocks;
create policy "unlocks_update" on public.unlocks for update
  using (public.is_admin());

drop policy if exists "unlocks_delete" on public.unlocks;
create policy "unlocks_delete" on public.unlocks for delete
  using (public.is_admin());

drop policy if exists "settings_select" on public.settings;
create policy "settings_select" on public.settings for select
  using (true);

drop policy if exists "settings_write" on public.settings;
create policy "settings_write" on public.settings for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "orders_select" on public.orders;
create policy "orders_select" on public.orders for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "orders_insert" on public.orders;
create policy "orders_insert" on public.orders for insert
  with check (auth.uid() = user_id);

-- Only admins can change order status from the client (e.g. manual reconcile).
-- The SePay webhook itself runs with the service role key, which bypasses RLS.
drop policy if exists "orders_update_admin" on public.orders;
create policy "orders_update_admin" on public.orders for update
  using (public.is_admin());

-- Redeem an activation code as the logged-in user.
-- Runs as security definer so a normal user can redeem without needing
-- direct table access to activation_codes/unlocks (those stay admin-only).
create or replace function public.redeem_activation_code(p_code text)
returns table(unlocked_slug text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_row public.activation_codes%rowtype;
  v_slug text;
begin
  if v_user is null then
    raise exception 'not_authenticated';
  end if;

  select * into v_row from public.activation_codes
    where code = upper(trim(p_code))
    for update;

  if not found then
    raise exception 'invalid_code';
  end if;

  if not v_row.is_active then
    raise exception 'code_inactive';
  end if;

  if v_row.expires_at is not null and v_row.expires_at < now() then
    raise exception 'code_expired';
  end if;

  if v_row.uses_count >= v_row.max_uses then
    raise exception 'code_exhausted';
  end if;

  update public.activation_codes
    set uses_count = uses_count + 1
    where id = v_row.id;

  if v_row.scope = 'bundle' then
    for v_slug in select slug from public.products where is_active = true loop
      insert into public.unlocks (user_id, product_slug, source, activation_code_id)
      values (v_user, v_slug, 'code', v_row.id)
      on conflict (user_id, product_slug) do nothing;
      unlocked_slug := v_slug;
      return next;
    end loop;
  else
    insert into public.unlocks (user_id, product_slug, source, activation_code_id)
    values (v_user, v_row.scope, 'code', v_row.id)
    on conflict (user_id, product_slug) do nothing;
    unlocked_slug := v_row.scope;
    return next;
  end if;
end;
$$;

grant execute on function public.redeem_activation_code(text) to authenticated;

-- Seed products (same content already on the site)
insert into public.products (slug, title, tag, badge, kind, price, lessons_count, cover, description, outcomes, sort_order)
values
('ebook-kiem-tien-voi-ai', 'Ebook: Kiếm Tiền Với AI', 'Sách nền tảng', 'Khóa', 'ebook', 199000, 12, 'from-zinc-800 via-zinc-900 to-black',
 'Cuốn sách nền tảng giúp bạn hiểu đúng tư duy kiếm tiền với AI trước khi bắt tay xây trang bán hàng đầu tiên.',
 '["Tư duy đúng về AI trong kinh doanh online","Lộ trình 5 bước xây trang bán hàng bằng AI","20+ prompt mẫu dùng ngay"]', 0),
('tu-duy-ban-hang-x-ai', 'Tư Duy Bán Hàng x AI', 'Combo 1 · Nền tảng', 'Khóa', 'combo', 115000, 5, 'from-amber-900 via-zinc-900 to-black',
 'Xây nền tư duy: vì sao AI thay đổi cách bán hàng online, và cách bạn tận dụng nó để đi trước thị trường.',
 '["Hiểu bản chất phễu bán hàng hiện đại","Xác định sản phẩm/dịch vụ phù hợp để bán bằng AI","Đặt mục tiêu doanh số theo lộ trình 90 ngày"]', 1),
('ai-copywriting-ban-hang', 'AI Copywriting Bán Hàng', 'Combo 2 · Nội dung', 'Khóa', 'combo', 189000, 6, 'from-fuchsia-900 via-zinc-900 to-black',
 'Dùng AI viết tiêu đề, mô tả sản phẩm và kịch bản bán hàng có tỉ lệ chuyển đổi cao chỉ trong vài phút.',
 '["Bộ khung prompt viết copy bán hàng chuyển đổi cao","Viết tiêu đề, USP, CTA bằng AI trong 5 phút","Tối ưu giọng văn theo từng nhóm khách hàng"]', 2),
('thiet-ke-trang-ban-hang-ai', 'Thiết Kế Trang Bán Hàng Bằng AI', 'Combo 3 · Xây trang', 'Khóa', 'combo', 256000, 8, 'from-sky-900 via-zinc-900 to-black',
 'Dựng landing page bán hàng chuyên nghiệp bằng công cụ AI, không cần biết code, xong trong một buổi chiều.',
 '["Chọn đúng công cụ AI dựng trang cho từng ngân sách","Quy trình dựng landing page hoàn chỉnh từ A-Z","Checklist tối ưu tốc độ & giao diện chuyên nghiệp"]', 3),
('pheu-automation-ai', 'Phễu & Automation AI', 'Combo 4 · Tự động hoá', 'Khóa', 'combo', 279000, 7, 'from-orange-900 via-zinc-900 to-black',
 'Kết nối chatbot AI, email và trang bán hàng thành một phễu chạy tự động, chăm sóc khách 24/7.',
 '["Dựng chatbot AI tư vấn & chốt đơn tự động","Kết nối phễu: trang bán hàng → chăm sóc → chốt đơn","Tự động hoá follow-up khách hàng bằng AI"]', 4),
('toi-uu-scale-doanh-so', 'Tối Ưu & Scale Doanh Số', 'Combo 5 · Tăng trưởng', 'Khóa', 'combo', 350000, 9, 'from-emerald-900 via-zinc-900 to-black',
 'Đọc số liệu, tối ưu tỉ lệ chuyển đổi và nhân bản hệ thống bán hàng bằng AI sang nhiều sản phẩm khác.',
 '["Đọc và tối ưu chỉ số chuyển đổi trang bán hàng","Dùng AI phân tích & đề xuất cải tiến trang bán hàng","Nhân bản mô hình sang sản phẩm/thị trường mới"]', 5),
('ai-sales-system', 'AI SALES SYSTEM', 'Đặc biệt · Cộng đồng tinh hoa', 'Đặc biệt', 'special', 0, 0, 'from-violet-950 via-zinc-900 to-black',
 'Cộng đồng riêng dành cho học viên hoàn thành trọn bộ lộ trình: review trang bán hàng, cập nhật công cụ AI mới nhất, và tặng kèm ebook.',
 '["Review trang bán hàng 1-1 cùng mentor","Cập nhật công cụ & prompt AI mới nhất hàng tháng","Tặng kèm Ebook Kiếm Tiền Với AI bản in"]', 6)
on conflict (slug) do nothing;

-- Seed one demo activation code so you can test unlocking immediately.
-- Change or deactivate it from /admin/codes before going live.
insert into public.activation_codes (code, scope, max_uses, note)
values ('AISALES2026', 'bundle', 50, 'Mã demo ban đầu — nên vô hiệu hoá hoặc đổi sau khi ra mắt thật')
on conflict (code) do nothing;
