import { getSupabase } from '../config/database.js'

const toProject = (row) => {
  if (!row) return null

  return {
    _id: row.id,
    id: row.id,
    userId: row.user_id,
    sessionId: row.session_id,
    name: row.name,
    description: row.description,
    files: row.files || [],
    messages: row.messages || [],
    model: row.model,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

export const listProjects = async ({ userId, sessionId }) => {
  const supabase = getSupabase()
  let query = supabase
    .from('projects')
    .select('id,user_id,session_id,name,description,files,model,created_at,updated_at')
    .order('updated_at', { ascending: false })
    .limit(50)

  if (userId) query = query.eq('user_id', userId)
  else if (sessionId) query = query.eq('session_id', sessionId)
  else return []

  const { data, error } = await query
  if (error) throw error
  return (data || []).map(toProject)
}

export const getProjectById = async (id) => {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  return toProject(data)
}

export const createProject = async ({ userId, sessionId, name, description, files, messages, model }) => {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('projects')
    .insert({
      user_id: userId || null,
      session_id: sessionId || null,
      name: name || 'Untitled Project',
      description: description || '',
      files: files || [],
      messages: messages || [],
      model: model || 'openai/gpt-4o-mini',
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return toProject(data)
}

export const updateProject = async (id, updates) => {
  const supabase = getSupabase()
  const payload = { updated_at: new Date().toISOString() }

  if (updates.name !== undefined) payload.name = updates.name
  if (updates.description !== undefined) payload.description = updates.description
  if (updates.files !== undefined) payload.files = updates.files
  if (updates.messages !== undefined) payload.messages = updates.messages
  if (updates.model !== undefined) payload.model = updates.model

  const { data, error } = await supabase
    .from('projects')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return toProject(data)
}

export const deleteProject = async (id) => {
  const supabase = getSupabase()
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) throw error
}
