import { createClient } from '@supabase/supabase-js'

// CRITICAL: Backend MUST use SERVICE_ROLE_KEY for database operations
// The anon key has limited permissions and will fail with RLS policies
const supabaseUrl = 'https://nhuhltyaiwhooqzgcqiw.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Create Supabase client only if key is available
export const supabase = supabaseKey ? createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
}) : null

export const isSupabaseAvailable = () => !!supabase
