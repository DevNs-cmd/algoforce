import { createClient } from '@supabase/supabase-js'

const DEFAULT_SUPABASE_URL = 'https://zgmsfesotcyrtfsvqmuz.supabase.co'
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_tch_toYZYEkQ05zNEf_7EA_HHAEIy5C'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  DEFAULT_SUPABASE_PUBLISHABLE_KEY

export const isSupabaseClientConfigured = Boolean(supabaseUrl && supabasePublishableKey)

export const supabase = isSupabaseClientConfigured
  ? createClient(supabaseUrl, supabasePublishableKey)
  : null
