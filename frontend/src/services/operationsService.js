/**
 * operationsService.js
 * Supabase CRUD for the operational modules:
 * Tasks, Approvals, CRM, Deployments, Projects, Support Tickets, Invoices, Integrations, Notifications, and Health Score.
 */
import { supabase } from './supabase'
import { logActivity } from './activityService'

// ─── TASKS ───────────────────────────────────────────────────────────────────

export async function getTasks(companyId, filter = 'all') {
  let query = supabase
    .from('tasks')
    .select('*')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })

  if (filter === 'open')        query = query.eq('status', 'open')
  if (filter === 'in_progress') query = query.eq('status', 'in_progress')
  if (filter === 'done')        query = query.eq('status', 'done')
  if (filter === 'overdue') {
    query = query
      .neq('status', 'done')
      .lt('due_date', new Date().toISOString().split('T')[0])
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function createTask(companyId, userId, task) {
  const { data, error } = await supabase
    .from('tasks')
    .insert({
      company_id: companyId,
      created_by: userId,
      assigned_to: userId,
      title: task.title,
      description: task.description || '',
      status: 'open',
      priority: task.priority || 'medium',
      due_date: task.due_date || null,
      source: task.source || 'manual',
      source_id: task.source_id || null,
    })
    .select()
    .single()
  if (error) throw error

  // Log activity
  await logActivity(companyId, userId, 'task', `Created task: ${task.title}`, task.description)
  return data
}

export async function createTasksBatch(companyId, userId, tasks) {
  if (!tasks?.length) return []
  const rows = tasks.map(t => ({
    company_id: companyId,
    created_by: userId,
    assigned_to: userId,
    title: t.title,
    description: t.description || '',
    status: 'open',
    priority: t.priority || 'medium',
    due_date: t.due_date || null,
    source: t.source || 'ai',
    source_id: t.source_id || null,
  }))
  const { data, error } = await supabase.from('tasks').insert(rows).select()
  if (error) throw error

  // Log activity
  await logActivity(companyId, userId, 'task', `Created ${tasks.length} tasks via batch`)
  return data || []
}

export async function updateTaskStatus(taskId, status) {
  const { error } = await supabase
    .from('tasks')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', taskId)
  if (error) throw error
}

export async function updateTask(taskId, updates) {
  const { data, error } = await supabase
    .from('tasks')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', taskId)
    .select()
    .single()
  if (error) throw error

  // Log activity
  if (data) {
    await logActivity(data.company_id, data.assigned_to, 'task', `Updated task: ${data.title}`)
  }
  return data
}

export async function deleteTask(taskId) {
  // Fetch details first to log activity
  const { data: task } = await supabase.from('tasks').select('*').eq('id', taskId).single()
  
  const { error } = await supabase.from('tasks').delete().eq('id', taskId)
  if (error) throw error

  if (task) {
    await logActivity(task.company_id, task.assigned_to, 'task', `Deleted task: ${task.title}`)
  }
}

// ─── APPROVALS ───────────────────────────────────────────────────────────────

export async function getApprovals(companyId, status = null) {
  let query = supabase
    .from('approvals')
    .select('*, documents(name, file_path)')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })

  if (status) query = query.eq('status', status)
  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function createApproval(companyId, userId, approval) {
  const { data, error } = await supabase
    .from('approvals')
    .insert({
      company_id: companyId,
      requested_by: userId,
      title: approval.title,
      description: approval.description || '',
      document_id: approval.document_id || null,
      priority: approval.priority || 'medium',
      due_date: approval.due_date || null,
      status: 'pending',
    })
    .select()
    .single()
  if (error) throw error

  // Log activity & Notify
  await logActivity(companyId, userId, 'approve', `Requested approval: ${approval.title}`)
  await addNotification(companyId, userId, 'Approval Pending', `New approval request: "${approval.title}" requires review.`)
  return data
}

export async function respondToApproval(approvalId, userId, status, comments = '') {
  const { data, error } = await supabase
    .from('approvals')
    .update({
      status,
      approved_by: userId,
      comments,
      updated_at: new Date().toISOString(),
    })
    .eq('id', approvalId)
    .select()
    .single()
  if (error) throw error

  // Log activity & Notify
  const type = status === 'approved' ? 'approve' : 'reject'
  await logActivity(data.company_id, userId, type, `${status === 'approved' ? 'Approved' : 'Rejected'}: ${data.title}`, comments)
  await addNotification(data.company_id, data.requested_by, `Approval ${status}`, `Your approval request "${data.title}" was ${status}.`)
  return data
}

export async function deleteApproval(approvalId) {
  const { data: approval } = await supabase.from('approvals').select('*').eq('id', approvalId).single()
  const { error } = await supabase.from('approvals').delete().eq('id', approvalId)
  if (error) throw error

  if (approval) {
    await logActivity(approval.company_id, approval.requested_by, 'reject', `Deleted approval request: ${approval.title}`)
  }
}

// ─── CRM ─────────────────────────────────────────────────────────────────────

export async function getCRMCompanies(companyId) {
  const { data, error } = await supabase
    .from('crm_companies')
    .select('*, crm_contacts(count)')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function createCRMCompany(companyId, company) {
  const { data, error } = await supabase
    .from('crm_companies')
    .insert({
      company_id: companyId,
      name: company.name,
      industry: company.industry || '',
      status: company.status || 'prospect',
      value: company.value || null,
      notes: company.notes || '',
    })
    .select()
    .single()
  if (error) throw error

  // Log activity
  await logActivity(companyId, company.user_id || companyId, 'crm', `Added CRM lead: ${company.name}`)
  return data
}

export async function updateCRMCompany(id, updates) {
  const { data, error } = await supabase
    .from('crm_companies')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error

  // Log activity
  await logActivity(data.company_id, data.company_id, 'crm', `Updated CRM lead: ${data.name}`)
  return data
}

export async function deleteCRMCompany(id) {
  const { data: company } = await supabase.from('crm_companies').select('*').eq('id', id).single()
  const { error } = await supabase.from('crm_companies').delete().eq('id', id)
  if (error) throw error

  if (company) {
    await logActivity(company.company_id, company.company_id, 'crm', `Deleted CRM lead: ${company.name}`)
  }
}

export async function getCRMContacts(companyId, crmCompanyId = null) {
  let query = supabase
    .from('crm_contacts')
    .select('*, crm_companies(name)')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })

  if (crmCompanyId) query = query.eq('crm_company_id', crmCompanyId)
  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function createCRMContact(companyId, contact) {
  const { data, error } = await supabase
    .from('crm_contacts')
    .insert({
      company_id: companyId,
      crm_company_id: contact.crm_company_id || null,
      name: contact.name,
      email: contact.email || '',
      phone: contact.phone || '',
      role: contact.role || '',
      notes: contact.notes || '',
    })
    .select()
    .single()
  if (error) throw error

  // Log activity
  await logActivity(companyId, companyId, 'crm', `Created contact: ${contact.name}`)
  return data
}

export async function deleteCRMContact(id) {
  const { data: contact } = await supabase.from('crm_contacts').select('*').eq('id', id).single()
  const { error } = await supabase.from('crm_contacts').delete().eq('id', id)
  if (error) throw error

  if (contact) {
    await logActivity(contact.company_id, contact.company_id, 'crm', `Deleted contact: ${contact.name}`)
  }
}

// ─── DEPLOYMENTS (MARKETPLACE) ───────────────────────────────────────────────

export async function getDeployments(companyId) {
  const { data, error } = await supabase
    .from('deployments')
    .select('*')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function requestDeployment(companyId, userId, productName, productId, notes = '') {
  const { data, error } = await supabase
    .from('deployments')
    .insert({
      company_id: companyId,
      user_id: userId,
      product_name: productName,
      product_id: productId,
      notes,
      status: 'requested',
    })
    .select()
    .single()
  if (error) throw error

  // Log activity & Notify
  await logActivity(companyId, userId, 'deploy', `Requested deployment: ${productName}`)
  await addNotification(companyId, userId, 'Deployment Requested', `Deployment process for ${productName} initiated.`)
  return data
}

// ─── PROJECTS & LIFECYCLE ────────────────────────────────────────────────────

export async function getProjects(companyId) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function updateProjectMilestones(projectId, milestones, progress) {
  const { data, error } = await supabase
    .from('projects')
    .update({ milestones, progress, updated_at: new Date().toISOString() })
    .eq('id', projectId)
    .select()
    .single()
  if (error) throw error

  // Log activity & Notify
  await logActivity(data.company_id, data.company_id, 'deploy', `Project updated: ${data.name} to ${progress}%`)
  await addNotification(data.company_id, data.company_id, 'Project Milestone', `Project "${data.name}" updated to milestone. Progress: ${progress}%`)
  return data
}

// ─── SUPPORT TICKETS ──────────────────────────────────────────────────────────

export async function getTickets(companyId) {
  const { data, error } = await supabase
    .from('support_tickets')
    .select('*')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function createTicket(companyId, userId, ticket) {
  const { data, error } = await supabase
    .from('support_tickets')
    .insert({
      company_id: companyId,
      user_id: userId,
      title: ticket.title,
      description: ticket.description || '',
      category: ticket.category || 'question',
      priority: ticket.priority || 'medium',
      status: 'open'
    })
    .select()
    .single()
  if (error) throw error

  // Log activity
  await logActivity(companyId, userId, 'crm', `Opened support ticket: ${ticket.title}`)
  return data
}

// ─── INVOICES / BILLING ──────────────────────────────────────────────────────

export async function getInvoices(companyId) {
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

// ─── INTEGRATIONS ────────────────────────────────────────────────────────────

export async function getIntegrations(companyId) {
  const { data, error } = await supabase
    .from('integrations')
    .select('*')
    .eq('company_id', companyId)
    .order('name', { ascending: true })
  if (error) throw error
  return data || []
}

export async function updateIntegrationStatus(integrationId, status) {
  const { data, error } = await supabase
    .from('integrations')
    .update({ status, last_sync: status === 'connected' ? new Date().toISOString() : null, updated_at: new Date().toISOString() })
    .eq('id', integrationId)
    .select()
    .single()
  if (error) throw error

  if (data) {
    await logActivity(data.company_id, data.company_id, 'deploy', `${status === 'connected' ? 'Connected' : 'Disconnected'} integration: ${data.name}`)
  }
  return data
}

// ─── NOTIFICATIONS HUB ────────────────────────────────────────────────────────

export async function getNotifications(userId) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function addNotification(companyId, userId, title, message) {
  const { data, error } = await supabase
    .from('notifications')
    .insert({ company_id: companyId, user_id: userId, title, message, is_read: false })
    .select()
  if (error) throw error
  return data
}

export async function markNotificationRead(notifId) {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notifId)
  if (error) throw error
}

// ─── TEAM MEMBERS ────────────────────────────────────────────────────────────

export async function getTeamMembers(companyId) {
  const { data, error } = await supabase
    .from('company_members')
    .select('*')
    .eq('company_id', companyId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data || []
}

export async function inviteTeamMember(companyId, email, role = 'member', department = 'Operations') {
  const { data, error } = await supabase
    .from('company_members')
    .insert({
      company_id: companyId,
      role: role,
      department: department,
      user_type: 'staff'
    })
    .select()
  if (error) throw error

  await logActivity(companyId, companyId, 'crm', `Invited team member: ${email} to ${department}`)
  return data
}

// ─── COMMAND CENTER SUMMARY ───────────────────────────────────────────────────

export async function getCommandCenterData(companyId, userId) {
  const today = new Date().toISOString().split('T')[0]

  const [tasks, approvals, activity, documents, generated, projects, tickets, integrations, deployments, invoices, clientMessages] = await Promise.all([
    supabase.from('tasks').select('*').eq('company_id', companyId).neq('status', 'done').order('due_date', { ascending: true }).limit(10),
    supabase.from('approvals').select('*').eq('company_id', companyId).eq('status', 'pending').order('created_at', { ascending: false }).limit(5),
    supabase.from('activity_log').select('*').eq('company_id', companyId).order('created_at', { ascending: false }).limit(10),
    supabase.from('documents').select('id, name, category, created_at').eq('company_id', companyId).order('created_at', { ascending: false }).limit(5),
    supabase.from('generated_docs').select('id, type, title, created_at').eq('company_id', companyId).order('created_at', { ascending: false }).limit(5),
    supabase.from('projects').select('*').eq('company_id', companyId).order('updated_at', { ascending: false }).limit(3),
    supabase.from('support_tickets').select('*').eq('company_id', companyId).eq('status', 'open').limit(5),
    supabase.from('integrations').select('*').eq('company_id', companyId).eq('status', 'connected'),
    supabase.from('deployments').select('*').eq('company_id', companyId).eq('status', 'active'),
    supabase.from('invoices').select('*').eq('company_id', companyId),
    supabase.from('client_messages').select('*').eq('company_id', companyId),
  ])

  const overdue = (tasks.data || []).filter(t => t.due_date && t.due_date < today)
  const dueToday = (tasks.data || []).filter(t => t.due_date === today)

  // Sum active/unpaid invoices amount
  const unpaidInvoices = (invoices.data || []).filter(inv => inv.status !== 'paid')
  const activeInvoicesSum = unpaidInvoices.reduce((sum, inv) => sum + Number(inv.amount || 0), 0)

  // Check for overdue invoices and notify
  if (userId) {
    const overdueInvoices = unpaidInvoices.filter(inv => inv.due_date && inv.due_date < today)
    for (const inv of overdueInvoices) {
      try {
        await addNotification(companyId, userId, 'Invoice Overdue', `Invoice for ₹${inv.amount} due on ${inv.due_date} is overdue.`)
      } catch (_) {}
    }
  }

  return {
    tasks: tasks.data || [],
    overdueTasks: overdue,
    dueToday,
    pendingApprovals: approvals.data || [],
    recentActivity: activity.data || [],
    recentDocuments: documents.data || [],
    recentGeneratedDocs: generated.data || [],
    activeProjects: projects.data || [],
    activeTickets: tickets.data || [],
    connectedIntegrationsCount: (integrations.data || []).length,
    activeDeploymentsCount: (deployments.data || []).length,
    activeInvoicesSum,
    clientMessagesCount: (clientMessages.data || []).length
  }
}

// ─── HEALTH SCORE ─────────────────────────────────────────────────────────────

export async function computeHealthScore(companyId, assessmentData) {
  const [docs, generated, tasks, crm, deployments] = await Promise.all([
    supabase.from('documents').select('id', { count: 'exact' }).eq('company_id', companyId),
    supabase.from('generated_docs').select('id', { count: 'exact' }).eq('company_id', companyId),
    supabase.from('tasks').select('id, status', { count: 'exact' }).eq('company_id', companyId),
    supabase.from('crm_companies').select('id', { count: 'exact' }).eq('company_id', companyId),
    supabase.from('deployments').select('id, status').eq('company_id', companyId),
  ])

  const docCount    = docs.count || 0
  const genCount    = generated.count || 0
  const taskCount   = tasks.count || 0
  const crmCount    = crm.count || 0
  const deployCount = (deployments.data || []).filter(d => d.status === 'active').length
  const hasAssessment = assessmentData && Object.keys(assessmentData || {}).length > 5

  // Score each dimension 0-25
  const docScore        = Math.min(25, docCount * 5)
  const processScore    = Math.min(25, genCount * 4)
  const operationsScore = Math.min(25, (taskCount > 0 ? 10 : 0) + (crmCount > 0 ? 10 : 0) + (hasAssessment ? 5 : 0))
  const automationScore = Math.min(25, deployCount * 12 + (hasAssessment ? 5 : 0))

  const total = docScore + processScore + operationsScore + automationScore

  return {
    total,
    dimensions: {
      documentation: { score: docScore, max: 25, label: 'Documentation', tip: docCount === 0 ? 'Upload company documents to the Knowledge Base' : null },
      processes:     { score: processScore, max: 25, label: 'Process Digitisation', tip: genCount === 0 ? 'Generate SOPs and proposals using AI tools' : null },
      operations:    { score: operationsScore, max: 25, label: 'Operations', tip: !hasAssessment ? 'Complete your Business Assessment' : null },
      automation:    { score: automationScore, max: 25, label: 'Automation', tip: deployCount === 0 ? 'Request deployment of an AlgoForce product' : null },
    },
    grade: total >= 80 ? 'A' : total >= 60 ? 'B' : total >= 40 ? 'C' : total >= 20 ? 'D' : 'F',
  }
}
