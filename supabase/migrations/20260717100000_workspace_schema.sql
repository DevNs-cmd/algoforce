-- =====================================================
-- AlgoForce OS — Workspace Schema
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/zgmsfesotcyrtfsvqmuz/sql
-- =====================================================

-- ─── COMPANIES ───────────────────────────────────────────────────────────────
create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid references auth.users(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── COMPANY MEMBERS ─────────────────────────────────────────────────────────
create table if not exists public.company_members (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text default 'member',          -- owner | admin | manager | employee | viewer | member
  department text,
  user_type text default 'staff',      -- staff | client
  created_at timestamptz default now(),
  unique(company_id, user_id)
);

-- ─── DOCUMENTS ───────────────────────────────────────────────────────────────
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  uploaded_by uuid references auth.users(id) on delete set null,
  name text not null,
  category text default 'general',
  file_path text,
  file_size bigint,
  file_type text,
  extracted_text text,
  created_at timestamptz default now()
);

-- ─── GENERATED DOCS (SOPs, Proposals, Reports) ───────────────────────────────
create table if not exists public.generated_docs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  created_by uuid references auth.users(id) on delete set null,
  type text not null,     -- sop | proposal | executive_report | document
  title text not null,
  content text,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

-- ─── TASKS ───────────────────────────────────────────────────────────────────
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  created_by uuid references auth.users(id) on delete set null,
  assigned_to uuid references auth.users(id) on delete set null,
  title text not null,
  description text,
  status text default 'open',          -- open | in_progress | done
  priority text default 'medium',      -- low | medium | high | urgent
  due_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── APPROVALS ───────────────────────────────────────────────────────────────
create table if not exists public.approvals (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  created_by uuid references auth.users(id) on delete set null,
  title text not null,
  description text,
  status text default 'pending',       -- pending | approved | rejected
  priority text default 'medium',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── PROJECTS ────────────────────────────────────────────────────────────────
create table if not exists public.workspace_projects (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  created_by uuid references auth.users(id) on delete set null,
  name text not null,
  description text,
  status text default 'active',        -- active | completed | on_hold | cancelled
  progress integer default 0,
  start_date date,
  end_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── CRM COMPANIES ───────────────────────────────────────────────────────────
create table if not exists public.crm_companies (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  name text not null,
  status text default 'prospect',      -- prospect | active | churned | on_hold
  value numeric default 0,
  industry text,
  contact_name text,
  contact_email text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── INTEGRATIONS ────────────────────────────────────────────────────────────
create table if not exists public.integrations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  name text not null,
  status text default 'disconnected',  -- connected | disconnected | error
  last_sync timestamptz,
  webhook_url text,
  oauth_connected boolean default false,
  sync_frequency text default 'manual',
  last_error text,
  created_at timestamptz default now()
);

-- ─── INVOICES / BILLING ───────────────────────────────────────────────────────
create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  client_name text,
  amount numeric default 0,
  status text default 'draft',         -- draft | sent | paid | overdue
  due_date date,
  issued_date date default current_date,
  description text,
  created_at timestamptz default now()
);

-- ─── ACTIVITY LOG ────────────────────────────────────────────────────────────
create table if not exists public.activity_log (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  action text not null,    -- task | approve | reject | upload | generate | deploy | search
  description text not null,
  created_at timestamptz default now()
);

-- ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  company_id uuid references public.companies(id) on delete cascade,
  title text not null,
  message text,
  type text default 'info',            -- info | success | warning | error
  is_read boolean default false,
  created_at timestamptz default now()
);

-- ─── BUSINESS ASSESSMENT ─────────────────────────────────────────────────────
create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  form_data jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── CLIENT MESSAGES (B2B Portal) ────────────────────────────────────────────
create table if not exists public.client_messages (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  client_user_id uuid references auth.users(id) on delete set null,
  message text not null,
  sender text default 'client',        -- client | staff
  created_at timestamptz default now()
);

-- ─── MEETINGS ────────────────────────────────────────────────────────────────
create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  title text not null,
  agenda text,
  attendees jsonb default '[]',
  date_time timestamptz,
  status text default 'scheduled',     -- scheduled | completed | cancelled
  notes text,
  ai_summary text,
  created_at timestamptz default now()
);

-- ─── INDEXES ─────────────────────────────────────────────────────────────────
create index if not exists idx_company_members_user   on public.company_members(user_id);
create index if not exists idx_company_members_company on public.company_members(company_id);
create index if not exists idx_documents_company      on public.documents(company_id);
create index if not exists idx_tasks_company          on public.tasks(company_id);
create index if not exists idx_activity_log_company   on public.activity_log(company_id);
create index if not exists idx_notifications_user     on public.notifications(user_id);
create index if not exists idx_invoices_company       on public.invoices(company_id);

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────────────────────
alter table public.companies          enable row level security;
alter table public.company_members    enable row level security;
alter table public.documents          enable row level security;
alter table public.generated_docs     enable row level security;
alter table public.tasks              enable row level security;
alter table public.approvals          enable row level security;
alter table public.workspace_projects enable row level security;
alter table public.crm_companies      enable row level security;
alter table public.integrations       enable row level security;
alter table public.invoices           enable row level security;
alter table public.activity_log       enable row level security;
alter table public.notifications      enable row level security;
alter table public.assessments        enable row level security;
alter table public.client_messages    enable row level security;
alter table public.meetings           enable row level security;

-- Helper: is user a member of this company?
create or replace function public.is_company_member(cid uuid)
returns boolean language sql stable security definer as $$
  select exists (
    select 1 from public.company_members
    where company_id = cid and user_id = auth.uid()
  )
$$;

-- Companies: owner or member can access
drop policy if exists "companies_access" on public.companies;
create policy "companies_access" on public.companies for all
  using (owner_id = auth.uid() or public.is_company_member(id));

-- Company members: members of same company
drop policy if exists "members_access" on public.company_members;
create policy "members_access" on public.company_members for all
  using (user_id = auth.uid() or public.is_company_member(company_id));

-- All workspace tables scoped to company membership
drop policy if exists "docs_access"       on public.documents;
drop policy if exists "gendocs_access"    on public.generated_docs;
drop policy if exists "tasks_access"      on public.tasks;
drop policy if exists "approvals_access"  on public.approvals;
drop policy if exists "projects_access"   on public.workspace_projects;
drop policy if exists "crm_access"        on public.crm_companies;
drop policy if exists "integrations_access" on public.integrations;
drop policy if exists "invoices_access"   on public.invoices;
drop policy if exists "activity_access"   on public.activity_log;
drop policy if exists "assessments_access" on public.assessments;
drop policy if exists "meetings_company"  on public.meetings;
drop policy if exists "client_messages_access" on public.client_messages;

create policy "docs_access"        on public.documents          for all using (public.is_company_member(company_id));
create policy "gendocs_access"     on public.generated_docs     for all using (public.is_company_member(company_id));
create policy "tasks_access"       on public.tasks              for all using (public.is_company_member(company_id));
create policy "approvals_access"   on public.approvals          for all using (public.is_company_member(company_id));
create policy "projects_access"    on public.workspace_projects for all using (public.is_company_member(company_id));
create policy "crm_access"         on public.crm_companies      for all using (public.is_company_member(company_id));
create policy "integrations_access" on public.integrations      for all using (public.is_company_member(company_id));
create policy "invoices_access"    on public.invoices           for all using (public.is_company_member(company_id));
create policy "activity_access"    on public.activity_log       for all using (public.is_company_member(company_id));
create policy "assessments_access" on public.assessments        for all using (public.is_company_member(company_id));
create policy "meetings_company"   on public.meetings           for all using (public.is_company_member(company_id));
create policy "client_messages_access" on public.client_messages for all
  using (client_user_id = auth.uid() or public.is_company_member(company_id));

-- Notifications: personal to user
drop policy if exists "notifications_access" on public.notifications;
create policy "notifications_access" on public.notifications for all
  using (user_id = auth.uid());

-- ─── REALTIME (idempotent — safe to re-run) ──────────────────────────────────
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'activity_log') THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_log';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'notifications') THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'client_messages') THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.client_messages';
  END IF;
END $$;
