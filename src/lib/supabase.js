import { createClient } from '@supabase/supabase-js'

// Get these from https://app.supabase.com > Project Settings > API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase env variables. Add them to .env file")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)