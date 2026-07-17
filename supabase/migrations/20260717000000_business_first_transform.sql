-- Add role-based collaboration fields
alter table public.company_members add column if not exists department text;
alter table public.company_members add column if not exists user_type text default 'staff'; -- 'staff' | 'client'

-- Client portal support
create table if not exists public.client_messages (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id),
  client_user_id uuid references auth.users(id),
  message text not null,
  sender text default 'client', -- 'client' | 'staff'
  created_at timestamptz default now()
);

-- Meetings
create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id),
  title text not null,
  agenda text,
  attendees jsonb default '[]',
  date_time timestamptz,
  status text default 'scheduled', -- scheduled | completed | cancelled
  notes text,
  ai_summary text,
  created_at timestamptz default now()
);

-- Enhance integrations
alter table public.integrations add column if not exists webhook_url text;
alter table public.integrations add column if not exists oauth_connected boolean default false;
alter table public.integrations add column if not exists sync_frequency text default 'manual';
alter table public.integrations add column if not exists last_error text;

-- Enable RLS
alter table public.client_messages enable row level security;
alter table public.meetings enable row level security;

-- RLS policies
drop policy if exists "meetings_company" on public.meetings;
create policy "meetings_company" on public.meetings for all 
  using (company_id in (select company_id from public.company_members where user_id = auth.uid()));

drop policy if exists "client_messages_access" on public.client_messages;
create policy "client_messages_access" on public.client_messages for all 
  using (client_user_id = auth.uid() or company_id in (select company_id from public.company_members where user_id = auth.uid()));
