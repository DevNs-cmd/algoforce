/**
 * workspaceService.js
 * Real Supabase Database + Storage operations for the AlgoForce workspace.
 * All operations are scoped to the authenticated user's company.
 */

import { supabase } from './supabase'
import { extractTextFromFile } from './textExtractor'

const STORAGE_BUCKET = 'company-documents'

// ─────────────────────────────────────────────────────────────────────────────
// COMPANY SETUP
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Called after user signs up. Creates their company record and adds them as owner.
 */
export async function createCompany(userId, companyName) {
  const { data: company, error: compErr } = await supabase
    .from('companies')
    .insert({ name: companyName, owner_id: userId })
    .select()
    .single()

  if (compErr) throw compErr

  const { error: memberErr } = await supabase
    .from('company_members')
    .insert({ company_id: company.id, user_id: userId, role: 'owner' })

  if (memberErr) throw memberErr
  return company
}

/**
 * Get the company for the current user.
 * Uses maybeSingle() so 0 rows → null instead of 406 error.
 */
export async function getUserCompany(userId) {
  const { data, error } = await supabase
    .from('company_members')
    .select('companies(*), role, department, user_type')
    .eq('user_id', userId)
    .maybeSingle()

  if (error || !data || !data.companies) return null
  return {
    ...data.companies,
    memberRole: data.role,
    memberDepartment: data.department,
    memberUserType: data.user_type || 'staff',
  }
}

export async function saveCompanyProfile(companyId, profileData) {
  if (!companyId) return null

  const updateData = {
    name: profileData.companyName || undefined,
    industry: profileData.industry || null,
    employee_count: profileData.employees || null,
    annual_revenue: profileData.annualRevenue || null,
    current_erp: profileData.currentErp || null,
    current_crm: profileData.currentCrm || null,
    current_problems: profileData.currentProblems || null,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('companies')
    .update(updateData)
    .eq('id', companyId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateCompanyAssessmentInsights(companyId, insights) {
  if (!companyId) return null

  const updateData = {
    operational_score: insights.operationalScore ?? null,
    automation_score: insights.automationScore ?? null,
    risk_score: insights.riskScore ?? null,
    expected_roi: insights.expectedRoi || null,
    impl_time: insights.implTime || null,
    ai_opportunities: insights.aiOpportunities || [],
    rec_products: insights.recProducts || [],
    onboarding_completed: true,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('companies')
    .update(updateData)
    .eq('id', companyId)
    .select()
    .single()

  if (error) throw error
  return data
}

// ─────────────────────────────────────────────────────────────────────────────
// DOCUMENTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Upload a file to Supabase Storage, extract text, and save metadata to DB.
 * @param {File} file
 * @param {string} companyId
 * @param {string} userId
 * @param {string} category - 'knowledge', 'contract', 'meeting', 'sop', 'general'
 * @param {Function} onProgress - (percent) => void
 */
export async function uploadDocument(file, companyId, userId, category = 'general', onProgress) {
  // 1. Extract text from file client-side
  onProgress?.(10)
  const extractedText = await extractTextFromFile(file)
  onProgress?.(40)

  // 2. Upload raw file to Supabase Storage
  const filePath = `${companyId}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`

  const { error: storageErr } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file, { upsert: false })

  if (storageErr) throw storageErr
  onProgress?.(70)

  // 3. Save metadata + extracted text to DB
  const { data, error: dbErr } = await supabase
    .from('documents')
    .insert({
      company_id: companyId,
      uploaded_by: userId,
      name: file.name,
      file_path: filePath,
      file_type: file.type || getFileType(file.name),
      file_size: file.size,
      extracted_text: extractedText,
      category,
    })
    .select()
    .single()

  if (dbErr) throw dbErr
  onProgress?.(100)
  return { ...data, extractedText }
}

/**
 * Get all documents for a company, optionally filtered by category.
 */
export async function getDocuments(companyId, category = null) {
  let query = supabase
    .from('documents')
    .select('id, name, file_type, file_size, category, created_at, extracted_text, file_path')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })

  if (category) query = query.eq('category', category)

  const { data, error } = await query
  if (error) throw error
  return data || []
}

/**
 * Delete a document from Storage and DB.
 */
export async function deleteDocument(docId, filePath) {
  await supabase.storage.from(STORAGE_BUCKET).remove([filePath])
  const { error } = await supabase.from('documents').delete().eq('id', docId)
  if (error) throw error
}

/**
 * Get a signed download URL for a file (valid 60 minutes).
 */
export async function getDocumentUrl(filePath) {
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(filePath, 3600)
  if (error) throw error
  return data.signedUrl
}

// ─────────────────────────────────────────────────────────────────────────────
// AI CONVERSATIONS
// ─────────────────────────────────────────────────────────────────────────────

export async function saveConversation(companyId, userId, module, messages, documentId = null) {
  const { data, error } = await supabase
    .from('ai_conversations')
    .insert({
      company_id: companyId,
      user_id: userId,
      module,
      messages,
      document_id: documentId,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateConversation(conversationId, messages) {
  const { error } = await supabase
    .from('ai_conversations')
    .update({ messages, updated_at: new Date().toISOString() })
    .eq('id', conversationId)
  if (error) throw error
}

export async function getConversations(companyId, module = null) {
  let query = supabase
    .from('ai_conversations')
    .select('*')
    .eq('company_id', companyId)
    .order('updated_at', { ascending: false })
    .limit(20)

  if (module) query = query.eq('module', module)
  const { data, error } = await query
  if (error) throw error
  return data || []
}

// ─────────────────────────────────────────────────────────────────────────────
// ASSESSMENTS
// ─────────────────────────────────────────────────────────────────────────────

export async function saveAssessment(companyId, userId, formData, report = null, status = 'draft') {
  // Check if one already exists
  const { data: existing } = await supabase
    .from('assessments')
    .select('id')
    .eq('company_id', companyId)
    .limit(1)
    .single()

  if (existing) {
    const { data, error } = await supabase
      .from('assessments')
      .update({ form_data: formData, report: report ? { content: report } : undefined, status, updated_at: new Date().toISOString() })
      .eq('id', existing.id)
      .select()
      .single()
    if (error) throw error
    return data
  }

  const { data, error } = await supabase
    .from('assessments')
    .insert({ company_id: companyId, user_id: userId, form_data: formData, report: report ? { content: report } : {}, status })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getAssessment(companyId) {
  const { data, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
  if (error) return null
  return data
}

// ─────────────────────────────────────────────────────────────────────────────
// GENERATED DOCUMENTS
// ─────────────────────────────────────────────────────────────────────────────

export async function saveGeneratedDoc(companyId, userId, type, title, content, metadata = {}) {
  const { data, error } = await supabase
    .from('generated_docs')
    .insert({ company_id: companyId, user_id: userId, type, title, content, metadata })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getGeneratedDocs(companyId, type = null) {
  let query = supabase
    .from('generated_docs')
    .select('*')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })

  if (type) query = query.eq('type', type)
  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function deleteGeneratedDoc(docId) {
  const { error } = await supabase.from('generated_docs').delete().eq('id', docId)
  if (error) throw error
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

function getFileType(fileName) {
  const ext = fileName.split('.').pop()?.toLowerCase()
  const map = {
    pdf: 'application/pdf',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    doc: 'application/msword',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    xls: 'application/vnd.ms-excel',
    csv: 'text/csv',
    txt: 'text/plain',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
  }
  return map[ext] || 'application/octet-stream'
}

export function formatFileSize(bytes) {
  if (!bytes) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function getFileIcon(fileName) {
  const ext = fileName?.split('.').pop()?.toLowerCase()
  const icons = {
    pdf: '📄',
    docx: '📝',
    doc: '📝',
    xlsx: '📊',
    xls: '📊',
    csv: '📊',
    txt: '📃',
    png: '🖼️',
    jpg: '🖼️',
    jpeg: '🖼️',
    pptx: '📑',
    ppt: '📑',
  }
  return icons[ext] || '📎'
}

/**
 * Register a user on the product waitlist.
 */
export async function joinWaitlist(userId, companyId, waitlistData) {
  const { data, error } = await supabase
    .from('waitlist')
    .insert({
      company_id: companyId,
      user_id: userId,
      product_id: waitlistData.productId,
      name: waitlistData.name,
      email: waitlistData.email,
      company_name: waitlistData.companyName,
      role: waitlistData.role,
      use_case: waitlistData.useCase,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

