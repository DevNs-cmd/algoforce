-- =====================================================
-- AlgoForce OS — Add Onboarding & Assessment Fields
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/zgmsfesotcyrtfsvqmuz/sql/new
-- =====================================================

alter table public.companies add column if not exists industry text;
alter table public.companies add column if not exists employee_count text;
alter table public.companies add column if not exists annual_revenue text;
alter table public.companies add column if not exists current_erp text;
alter table public.companies add column if not exists current_crm text;
alter table public.companies add column if not exists current_problems text;
alter table public.companies add column if not exists onboarding_completed boolean default false;

-- Assessment scores & recommendations
alter table public.companies add column if not exists operational_score integer default 0;
alter table public.companies add column if not exists automation_score integer default 0;
alter table public.companies add column if not exists risk_score integer default 0;
alter table public.companies add column if not exists expected_roi text;
alter table public.companies add column if not exists impl_time text;
alter table public.companies add column if not exists ai_opportunities jsonb default '[]'::jsonb;
alter table public.companies add column if not exists rec_products jsonb default '[]'::jsonb;
