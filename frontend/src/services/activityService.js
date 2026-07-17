/**
 * activityService.js
 * Writes activity log entries to Supabase.
 * Called by every module after significant actions.
 */
import { supabase } from './supabase'

/**
 * Log an activity event.
 * @param {string} companyId
 * @param {string} userId
 * @param {string} type  - 'upload'|'generate'|'approve'|'reject'|'task'|'crm'|'assessment'|'deploy'|'search'
 * @param {string} title - Short human-readable title
 * @param {string} [description]
 * @param {object} [meta] - Extra JSON data
 */
export async function logActivity(companyId, userId, type, title, description = '', meta = {}) {
  if (!companyId || !userId) return
  try {
    await supabase.from('activity_log').insert({
      company_id: companyId,
      user_id: userId,
      type,
      title,
      description,
      meta,
    })
  } catch (e) {
    // Non-critical — never block main actions
    console.warn('Activity log failed:', e.message)
  }
}

/**
 * Get recent activity for a company.
 */
export async function getActivity(companyId, limit = 30) {
  const { data, error } = await supabase
    .from('activity_log')
    .select('*')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data || []
}

export const ACTIVITY_ICONS = {
  upload:     '📎',
  generate:   '✨',
  approve:    '✅',
  reject:     '❌',
  task:       '☑️',
  crm:        '🤝',
  assessment: '📊',
  deploy:     '🚀',
  search:     '🔍',
  meeting:    '🎙️',
  sop:        '📄',
  proposal:   '✍️',
  default:    '•',
}
