-- ============================================
-- 阿光选品 改版 v2 建表脚本
-- 在 Supabase Dashboard → SQL Editor 里整段执行
-- ============================================

-- 1. 每日新品表
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  cover_image text not null default '',
  category text not null default '未分类',
  price text default '',
  source text not null default 'manual',          -- fastmoss / kalodata / manual
  source_url text default '',
  sales_data jsonb default '{}'::jsonb,           -- 销量/增速/达人数等指标
  supplier_url text default '',                   -- 1688 货源链接
  note text default '',                           -- 阿光点评
  tags text[] default '{}',
  is_published boolean not null default false,
  sort_order int,
  created_at timestamptz not null default now()
);

-- 2. 用户资料表（关联 Supabase Auth）
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text default '',
  avatar_url text default '',
  wechat_openid text unique,                      -- 小程序端用
  created_at timestamptz not null default now()
);

-- 新用户注册时自动建 profile
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, nickname)
  values (new.id, coalesce(split_part(new.email, '@', 1), '用户'))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3. 收藏表
create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  target_type text not null check (target_type in ('video', 'product')),
  target_id uuid not null,
  created_at timestamptz not null default now(),
  unique (user_id, target_type, target_id)
);

create index if not exists favorites_user_idx on public.favorites (user_id);

-- ============================================
-- RLS 策略
-- ============================================

-- products：所有人可读已发布的，写入走后台（service role 或 anon+后台密码保护的 server action）
alter table public.products enable row level security;

drop policy if exists "products_public_read" on public.products;
create policy "products_public_read" on public.products
  for select using (true);

-- 注意：目前后台用 anon key 写入（与 videos 表现状一致），所以放开写权限。
-- 如果之后要收紧，把后台改成 service_role key 再删掉这条。
drop policy if exists "products_anon_write" on public.products;
create policy "products_anon_write" on public.products
  for all using (true) with check (true);

-- profiles：用户只能读写自己的
alter table public.profiles enable row level security;

drop policy if exists "profiles_own_read" on public.profiles;
create policy "profiles_own_read" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_own_update" on public.profiles;
create policy "profiles_own_update" on public.profiles
  for update using (auth.uid() = id);

-- favorites：用户只能读写自己的
alter table public.favorites enable row level security;

drop policy if exists "favorites_own_all" on public.favorites;
create policy "favorites_own_all" on public.favorites
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
