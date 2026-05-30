/**
 * useCustomThemes — Custom Theme管理フック
 *
 * Sign In済み → Supabase DB にSave（マルチデバイス同期）
 * 未Sign In   → localStorage にSave（従来通り）
 *
 * 呼び出し側はSave先を意識せずに使える。
 */
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase.js'
import { useAuth } from './useAuth.jsx'

// ── localStorage（未Sign In時） ─────────────────
const LS_KEY = 'swjp_custom_themes_v2'

function lsLoad() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]') } catch { return [] }
}
function lsSave(themes) {
  localStorage.setItem(LS_KEY, JSON.stringify(themes))
  window.dispatchEvent(new CustomEvent('swjp_themes_updated'))
}

// ── Supabase CRUD（Sign In時） ───────────────────
async function dbLoad(userId) {
  const { data, error } = await supabase
    .from('custom_themes')
    .select('id, name, stocks, updated_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return (data || []).map(r => ({ id: r.id, name: r.name, stocks: r.stocks || [] }))
}

async function dbInsert(userId, theme) {
  const { data, error } = await supabase
    .from('custom_themes')
    .insert({ user_id: userId, name: theme.name, stocks: theme.stocks })
    .select('id')
    .single()
  if (error) throw error
  return data.id
}

async function dbUpdate(id, theme) {
  const { error } = await supabase
    .from('custom_themes')
    .update({ name: theme.name, stocks: theme.stocks })
    .eq('id', id)
  if (error) throw error
}

async function dbDelete(id) {
  const { error } = await supabase
    .from('custom_themes')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// ── メインフック ──────────────────────────────────
export function useCustomThemes({ maxThemes = 3, maxStocks = 10 } = {}) {
  const { user, isLoggedIn } = useAuth()
  const [themes,  setThemes]  = useState([])
  const [syncing, setSyncing] = useState(false)

  // テーマ読み込み（Sign In状態が変わるたびに実行）
  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setSyncing(true)
      try {
        if (isLoggedIn && user) {
          const remote = await dbLoad(user.id)
          if (!cancelled) setThemes(remote)
        } else {
          if (!cancelled) setThemes(lsLoad())
        }
      } catch (e) {
        console.error('テーマ読み込みError:', e)
        if (!cancelled) setThemes(lsLoad()) // フォールバック
      } finally {
        if (!cancelled) setSyncing(false)
      }
    }
    load()

    // Not logged in時はlocalStorageの変化も監視
    if (!isLoggedIn) {
      const handler = () => setThemes(lsLoad())
      window.addEventListener('swjp_themes_updated', handler)
      return () => { cancelled = true; window.removeEventListener('swjp_themes_updated', handler) }
    }
    return () => { cancelled = true }
  }, [isLoggedIn, user?.id])

  // Save theme (create/edit)
  // MAX_THEMES is dynamically obtained from useSubscription().maxThemes

  const saveTheme = useCallback(async (theme, editIndex = null) => {
    // Check limit for new additions
    if (editIndex === null && themes.length >= maxThemes) {
      alert(`You've reached the theme limit for your current plan (${maxThemes}). Please delete an existing theme or upgrade your plan.`)
      return false
    }
    if (isLoggedIn && user) {
      // Supabase
      if (editIndex !== null && themes[editIndex]?.id) {
        await dbUpdate(themes[editIndex].id, theme)
        setThemes(prev => prev.map((t, i) => i === editIndex ? { ...theme, id: t.id } : t))
      } else {
        const newId = await dbInsert(user.id, theme)
        setThemes(prev => [...prev, { ...theme, id: newId }])
      }
    } else {
      // localStorage
      const updated = editIndex !== null
        ? themes.map((t, i) => i === editIndex ? theme : t)
        : [...themes, theme]
      setThemes(updated)
      lsSave(updated)
    }
    return true
  }, [isLoggedIn, user, themes])

  // テーマDelete
  const deleteTheme = useCallback(async (index) => {
    const target = themes[index]
    if (isLoggedIn && user && target?.id) {
      await dbDelete(target.id)
      setThemes(prev => prev.filter((_, i) => i !== index))
    } else {
      const updated = themes.filter((_, i) => i !== index)
      setThemes(updated)
      lsSave(updated)
    }
  }, [isLoggedIn, user, themes])

  // 既存テーマへ銘柄Add
  const addStockToTheme = useCallback(async (themeIndex, stock) => {
    const target = themes[themeIndex]
    if (!target) return
    if (target.stocks?.find(s => s.ticker === stock.ticker)) return // 重複スキップ
    const updated = { ...target, stocks: [...(target.stocks || []), stock] }
    await saveTheme(updated, themeIndex)
  }, [themes, saveTheme])

  // 新規Create Themeして銘柄Add
  const createThemeWithStock = useCallback(async (themeName, stock) => {
    if (!themeName.trim()) return
    await saveTheme({ name: themeName.trim(), stocks: [stock] })
  }, [saveTheme])

  return { themes, syncing, saveTheme, deleteTheme, addStockToTheme, createThemeWithStock, maxThemes, maxStocks }
}

// ── URLエクスポート/インポート ───────────────────
export function themeToUrl(theme) {
  const data = { n: theme.name, s: theme.stocks.map(s => `${s.ticker}|${s.name}`) }
  return `?ct=${encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(data)))))}`
}
export function themeFromUrl(search) {
  try {
    const p  = new URLSearchParams(search)
    const ct = p.get('ct')
    if (!ct) return null
    const data = JSON.parse(decodeURIComponent(escape(atob(ct))))
    return {
      name:   data.n,
      stocks: data.s.map(s => {
        const [ticker, ...rest] = s.split('|')
        return { ticker, name: rest.join('|') }
      }),
    }
  } catch { return null }
}
