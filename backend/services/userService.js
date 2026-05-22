import bcrypt from 'bcrypt'
import { getSupabase } from '../config/database.js'

const toUser = (row) => {
  if (!row) return null

  return {
    _id: row.id,
    id: row.id,
    name: row.name,
    email: row.email,
    password: row.password_hash,
    googleId: row.google_id,
    avatar: row.avatar,
    plan: row.plan || 'free',
    createdAt: row.created_at,
    lastLogin: row.last_login
  }
}

export const publicUser = (user) => {
  if (!user) return null
  const { password, ...safeUser } = user
  return safeUser
}

export const findUserByEmail = async (email) => {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('app_users')
    .select('*')
    .eq('email', email.toLowerCase().trim())
    .maybeSingle()

  if (error) throw error
  return toUser(data)
}

export const findUserById = async (id) => {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('app_users')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  return toUser(data)
}

export const findUserByGoogleOrEmail = async (googleId, email) => {
  const supabase = getSupabase()

  if (googleId) {
    const { data, error } = await supabase
      .from('app_users')
      .select('*')
      .eq('google_id', googleId)
      .maybeSingle()
    if (error) throw error
    if (data) return toUser(data)
  }

  return findUserByEmail(email)
}

export const createUser = async ({ name, email, password, googleId, avatar }) => {
  const supabase = getSupabase()
  const payload = {
    name,
    email: email.toLowerCase().trim(),
    password_hash: password ? await bcrypt.hash(password, 12) : null,
    google_id: googleId || null,
    avatar: avatar || null,
    plan: 'free',
    last_login: new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('app_users')
    .insert(payload)
    .select()
    .single()

  if (error) throw error
  return toUser(data)
}

export const updateUser = async (id, updates) => {
  const supabase = getSupabase()
  const payload = {}

  if (updates.name !== undefined) payload.name = updates.name
  if (updates.email !== undefined) payload.email = updates.email.toLowerCase().trim()
  if (updates.googleId !== undefined) payload.google_id = updates.googleId
  if (updates.avatar !== undefined) payload.avatar = updates.avatar
  if (updates.plan !== undefined) payload.plan = updates.plan
  if (updates.lastLogin !== undefined) payload.last_login = updates.lastLogin.toISOString ? updates.lastLogin.toISOString() : updates.lastLogin

  const { data, error } = await supabase
    .from('app_users')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return toUser(data)
}

export const comparePassword = async (user, candidatePassword) => {
  if (!user?.password) return false
  return bcrypt.compare(candidatePassword, user.password)
}
