import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Helper functions
export async function getProducts() {
  const { data, error } = await supabase.from('products').select('*, sellers(shop_name, slug)').order('created_at', { ascending: false }).limit(12)
  if (error) console.error(error)
  return data
}

export async function createProduct(product) {
  const { data, error } = await supabase.from('products').insert([product])
  if (error) console.error(error)
  return data
}