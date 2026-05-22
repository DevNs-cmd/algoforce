import { createClient } from '@supabase/supabase-js'

let supabase = null

export const isSupabaseConfigured = () => {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}

export const connectDB = async () => {
  if (supabase) return supabase

  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY for persistent backend storage.')
    return null
  }

  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  const { error } = await supabase
    .from('contacts')
    .select('id', { count: 'exact', head: true })

  if (error) {
    console.error('Supabase connection error:', error.message)
    throw error
  }

  console.log('Supabase connected')
  return supabase
}

export const getSupabase = () => {
  if (!supabase && isSupabaseConfigured()) {
    supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
  }

  if (!supabase) {
    throw new Error('Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.')
  }

  return supabase
}

export const closeDB = async () => {}
