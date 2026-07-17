-- =====================================================
-- AlgoForce OS — Fix RLS INSERT policies
-- Run this in Supabase SQL Editor AFTER the workspace schema migration
-- https://supabase.com/dashboard/project/zgmsfesotcyrtfsvqmuz/sql/new
-- =====================================================

-- PostgreSQL "FOR ALL USING (...)" only implicitly applies USING as WITH CHECK
-- in some versions. This patch makes INSERT permissions explicit and correct.

-- ─── COMPANIES ───────────────────────────────────────────────────────────────
drop policy if exists "companies_access"  on public.companies;
drop policy if exists "companies_select"  on public.companies;
drop policy if exists "companies_insert"  on public.companies;
drop policy if exists "companies_update"  on public.companies;
drop policy if exists "companies_delete"  on public.companies;

-- Any authenticated user can create their own company
create policy "companies_insert"
  on public.companies for insert to authenticated
  with check (owner_id = auth.uid());

-- Members (or owner) can read their company
create policy "companies_select"
  on public.companies for select to authenticated
  using (owner_id = auth.uid() or public.is_company_member(id));

-- Owner and admin members can update
create policy "companies_update"
  on public.companies for update to authenticated
  using (owner_id = auth.uid() or public.is_company_member(id));

-- Only owner can delete
create policy "companies_delete"
  on public.companies for delete to authenticated
  using (owner_id = auth.uid());

-- ─── COMPANY MEMBERS ─────────────────────────────────────────────────────────
drop policy if exists "members_access"  on public.company_members;
drop policy if exists "members_select"  on public.company_members;
drop policy if exists "members_insert"  on public.company_members;
drop policy if exists "members_update"  on public.company_members;
drop policy if exists "members_delete"  on public.company_members;

-- Any authenticated user can add themselves as a member (needed for createCompany)
create policy "members_insert"
  on public.company_members for insert to authenticated
  with check (true);

-- Members can see other members of their company
create policy "members_select"
  on public.company_members for select to authenticated
  using (user_id = auth.uid() or public.is_company_member(company_id));

-- Members can update membership records in their company
create policy "members_update"
  on public.company_members for update to authenticated
  using (public.is_company_member(company_id));

-- Members can remove records from their company
create policy "members_delete"
  on public.company_members for delete to authenticated
  using (public.is_company_member(company_id));

-- ─── ALL WORKSPACE TABLES: explicit insert WITH CHECK ────────────────────────
-- documents
drop policy if exists "docs_access" on public.documents;
create policy "docs_select" on public.documents for select to authenticated using (public.is_company_member(company_id));
create policy "docs_insert" on public.documents for insert to authenticated with check (public.is_company_member(company_id));
create policy "docs_update" on public.documents for update to authenticated using (public.is_company_member(company_id));
create policy "docs_delete" on public.documents for delete to authenticated using (public.is_company_member(company_id));

-- generated_docs
drop policy if exists "gendocs_access" on public.generated_docs;
create policy "gendocs_select" on public.generated_docs for select to authenticated using (public.is_company_member(company_id));
create policy "gendocs_insert" on public.generated_docs for insert to authenticated with check (public.is_company_member(company_id));
create policy "gendocs_update" on public.generated_docs for update to authenticated using (public.is_company_member(company_id));
create policy "gendocs_delete" on public.generated_docs for delete to authenticated using (public.is_company_member(company_id));

-- tasks
drop policy if exists "tasks_access" on public.tasks;
create policy "tasks_select" on public.tasks for select to authenticated using (public.is_company_member(company_id));
create policy "tasks_insert" on public.tasks for insert to authenticated with check (public.is_company_member(company_id));
create policy "tasks_update" on public.tasks for update to authenticated using (public.is_company_member(company_id));
create policy "tasks_delete" on public.tasks for delete to authenticated using (public.is_company_member(company_id));

-- approvals
drop policy if exists "approvals_access" on public.approvals;
create policy "approvals_select" on public.approvals for select to authenticated using (public.is_company_member(company_id));
create policy "approvals_insert" on public.approvals for insert to authenticated with check (public.is_company_member(company_id));
create policy "approvals_update" on public.approvals for update to authenticated using (public.is_company_member(company_id));
create policy "approvals_delete" on public.approvals for delete to authenticated using (public.is_company_member(company_id));

-- workspace_projects
drop policy if exists "projects_access" on public.workspace_projects;
create policy "projects_select" on public.workspace_projects for select to authenticated using (public.is_company_member(company_id));
create policy "projects_insert" on public.workspace_projects for insert to authenticated with check (public.is_company_member(company_id));
create policy "projects_update" on public.workspace_projects for update to authenticated using (public.is_company_member(company_id));
create policy "projects_delete" on public.workspace_projects for delete to authenticated using (public.is_company_member(company_id));

-- crm_companies
drop policy if exists "crm_access" on public.crm_companies;
create policy "crm_select" on public.crm_companies for select to authenticated using (public.is_company_member(company_id));
create policy "crm_insert" on public.crm_companies for insert to authenticated with check (public.is_company_member(company_id));
create policy "crm_update" on public.crm_companies for update to authenticated using (public.is_company_member(company_id));
create policy "crm_delete" on public.crm_companies for delete to authenticated using (public.is_company_member(company_id));

-- integrations
drop policy if exists "integrations_access" on public.integrations;
create policy "integrations_select" on public.integrations for select to authenticated using (public.is_company_member(company_id));
create policy "integrations_insert" on public.integrations for insert to authenticated with check (public.is_company_member(company_id));
create policy "integrations_update" on public.integrations for update to authenticated using (public.is_company_member(company_id));
create policy "integrations_delete" on public.integrations for delete to authenticated using (public.is_company_member(company_id));

-- invoices
drop policy if exists "invoices_access" on public.invoices;
create policy "invoices_select" on public.invoices for select to authenticated using (public.is_company_member(company_id));
create policy "invoices_insert" on public.invoices for insert to authenticated with check (public.is_company_member(company_id));
create policy "invoices_update" on public.invoices for update to authenticated using (public.is_company_member(company_id));
create policy "invoices_delete" on public.invoices for delete to authenticated using (public.is_company_member(company_id));

-- activity_log
drop policy if exists "activity_access" on public.activity_log;
create policy "activity_select" on public.activity_log for select to authenticated using (public.is_company_member(company_id));
create policy "activity_insert" on public.activity_log for insert to authenticated with check (public.is_company_member(company_id));

-- assessments
drop policy if exists "assessments_access" on public.assessments;
create policy "assessments_select" on public.assessments for select to authenticated using (public.is_company_member(company_id));
create policy "assessments_insert" on public.assessments for insert to authenticated with check (public.is_company_member(company_id));
create policy "assessments_update" on public.assessments for update to authenticated using (public.is_company_member(company_id));

-- meetings
drop policy if exists "meetings_company" on public.meetings;
create policy "meetings_select" on public.meetings for select to authenticated using (public.is_company_member(company_id));
create policy "meetings_insert" on public.meetings for insert to authenticated with check (public.is_company_member(company_id));
create policy "meetings_update" on public.meetings for update to authenticated using (public.is_company_member(company_id));
create policy "meetings_delete" on public.meetings for delete to authenticated using (public.is_company_member(company_id));

-- client_messages
drop policy if exists "client_messages_access" on public.client_messages;
create policy "client_messages_select" on public.client_messages for select to authenticated
  using (client_user_id = auth.uid() or public.is_company_member(company_id));
create policy "client_messages_insert" on public.client_messages for insert to authenticated
  with check (client_user_id = auth.uid() or public.is_company_member(company_id));

-- notifications
drop policy if exists "notifications_access" on public.notifications;
create policy "notifications_select" on public.notifications for select to authenticated using (user_id = auth.uid());
create policy "notifications_insert" on public.notifications for insert to authenticated with check (user_id = auth.uid());
create policy "notifications_update" on public.notifications for update to authenticated using (user_id = auth.uid());
create policy "notifications_delete" on public.notifications for delete to authenticated using (user_id = auth.uid());
