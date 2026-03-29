import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Supabase env vars not set (VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY)')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export async function fetchAdminConfig() {
  const { data, error } = await supabase
    .from('admin_config')
    .select('config')
    .eq('id', 'singleton')
    .single()
  if (error) throw error
  return data?.config ?? null
}

export async function upsertAdminConfig(config) {
  const { data, error } = await supabase
    .from('admin_config')
    .upsert({ id: 'singleton', config }, { returning: 'representation' })
  if (error) throw error
  return data
}

export async function fetchPwHash() {
  const { data, error } = await supabase
    .from('admin_config')
    .select('pw_hash')
    .eq('id', 'singleton')
    .single()
  if (error) throw error
  return data?.pw_hash ?? null
}

export async function upsertPwHash(hash) {
  const { error } = await supabase
    .from('admin_config')
    .update({ pw_hash: hash })
    .eq('id', 'singleton')
  if (error) throw error
}
