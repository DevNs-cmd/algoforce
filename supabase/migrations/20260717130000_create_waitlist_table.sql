-- =====================================================
-- AlgoForce OS — Create Waitlist Table
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/zgmsfesotcyrtfsvqmuz/sql/new
-- =====================================================

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  product_id text not null,
  name text not null,
  email text not null,
  company_name text,
  role text,
  use_case text,
  created_at timestamptz default now()
);

alter table public.waitlist enable row level security;

drop policy if exists "waitlist_insert" on public.waitlist;
drop policy if exists "waitlist_select" on public.waitlist;

create policy "waitlist_insert" on public.waitlist for insert to authenticated
  with check (true);

create policy "waitlist_select" on public.waitlist for select to authenticated
  using (true);
