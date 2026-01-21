import { createClient } from '@supabase/supabase-js'

// CRITICAL: Backend MUST use SERVICE_ROLE_KEY for database operations
// The anon key has limited permissions and will fail with RLS policies
const supabaseUrl = 'https://nhuhltyaiwhooqzgcqiw.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured in environment variables')
}

// Create Supabase client with service role key (bypasses RLS for backend operations)
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})
