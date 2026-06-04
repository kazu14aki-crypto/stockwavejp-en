/**
 * supabase.js — EN version client
 * redirectTo is hardcoded via vite.config.js define to ensure EN site URL
 */
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL      = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const REDIRECT_TO       = import.meta.env.VITE_SUPABASE_REDIRECT_TO || 'https://stockwavejp-en.com/'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession:     true,
    autoRefreshToken:   true,
    detectSessionInUrl: true,
    flowType:           'implicit',
  },
})

// Google Login — redirectTo is hardcoded to EN site URL via vite.config.js
export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: REDIRECT_TO,
    },
  })
  if (error) throw error
}

// Logout
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
