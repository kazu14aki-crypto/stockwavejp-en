/**
 * useMarketData — market.json優先取得フック（キャッシュ拡大版）
 *
 * 優先順位:
 *   1. public/data/market.json（GitHub Actionsが定時生成・即時）
 *   2. LocalStorageキャッシュ（有効期限3時間）
 *   3. Renderバックエンド（フォールバック）
 *
 * market.jsonに含まれるキー一覧（キャッシュ拡大後）:
 *   themes_{5d/1mo/3mo/6mo/1y}         theme list
 *   macro_{1mo/1y}                     macro indicators
 *   heatmap                            期間別ヒートマップ
 *   heatmap_monthly                    月次ヒートマップ
 *   momentum_{1mo/3mo}                 騰落モメンタム
 *   fund_flow_{period}                 資金フロー（gainers/losers/all）
 *   theme_detail_{Theme名}_{period}   theme detail★
 *   seg_{セグメント名}_{period}        market segment stock detail★
 *   market_rank_{period}               market ranking list★
 *   status / theme_names
 */
import { useState, useEffect, useCallback } from 'react'

const API          = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'
const DATA_URL     = '/data/market.json'
const CACHE_PREFIX = 'swjp_v4_'  // v4: セグメント定義修正によるcache reset
const CACHE_TTL = 12 * 60 * 60 * 1000  // 12時間

// ── LocalStorage ─────────────────────────────
function readCache(key) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key)
    if (!raw) return null
    const { data, ts } = JSON.parse(raw)
    if (Date.now() - ts > CACHE_TTL) return null
    return data
  } catch { return null }
}
function writeCache(key, data) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ data, ts: Date.now() }))
  } catch {}
}

// ── market.json シングルトン ──────────────────
let _marketJson      = null
let _marketJsonTs    = 0
let _fetchingPromise = null
const MARKET_JSON_TTL = 90 * 60 * 1000  // 90分

async function fetchMarketJson() {
  if (_marketJson && Date.now() - _marketJsonTs < MARKET_JSON_TTL) return _marketJson
  if (_fetchingPromise) return _fetchingPromise
  _fetchingPromise = fetch(`${DATA_URL}?t=${Date.now()}`)
    .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
    .then(json => { _marketJson = json; _marketJsonTs = Date.now(); _fetchingPromise = null; return json })
    .catch(e  => { _fetchingPromise = null; throw e })
  return _fetchingPromise
}


function detectDataState(result) {
  if (!result) return { state:'unavailable', reason:'The requested data has not been generated.' }
  if (result.status && result.status !== 'ok') return { state:result.status, reason:result.reason || result.message }
  const rows = result.themes || result.data
  if (Array.isArray(rows) && rows.length) {
    const numeric = rows.flatMap(x => [x?.pct, x?.volume, x?.trade_value]).filter(Number.isFinite)
    if (numeric.length && numeric.every(v => v === 0)) return { state:'unavailable', reason:'Aggregated values are unavailable because the data provider is not configured or the data has not been updated.' }
  }
  return { state:'ok', reason:null }
}
function freshnessMeta(result, fetchedAt=new Date().toISOString()) {
  return {
    fetchedAt,
    dataAsOf: result?.data_as_of || result?.as_of || result?.updated_at || null,
    nextUpdate: result?.next_update_at || null,
  }
}

// ── generic hook：market.json → LocalStorage → Render の順で取得 ──
function useMarketJsonKey(jsonKey, apiFallback, deps = []) {
  const cachedInitial = readCache(jsonKey)
  const [data,setData]=useState(cachedInitial)
  const [loading,setLoading]=useState(!cachedInitial)
  const [dataState,setDataState]=useState(cachedInitial ? detectDataState(cachedInitial).state : 'loading')
  const [reason,setReason]=useState(null)
  const [meta,setMeta]=useState(freshnessMeta(cachedInitial, null))

  useEffect(() => {
    let cancelled=false
    const cached=readCache(jsonKey)
    if(cached){ const ds=detectDataState(cached); setData(cached);setLoading(false);setDataState(ds.state);setReason(ds.reason);setMeta(freshnessMeta(cached,null)) }
    ;(async()=>{
      let lastError=null
      try {
        const json=await fetchMarketJson(); const result=json[jsonKey]
        if(result && !cancelled){ const ds=detectDataState(result);setData(result);writeCache(jsonKey,result);setDataState(ds.state);setReason(ds.reason);setMeta(freshnessMeta(result));setLoading(false);return }
      } catch(e){ lastError=e }
      if(apiFallback){
        try { const r=await fetch(apiFallback); if(!r.ok) throw new Error(`HTTP ${r.status}`); const result=await r.json(); if(!cancelled){const ds=detectDataState(result);setData(result);writeCache(jsonKey,result);setDataState(ds.state);setReason(ds.reason);setMeta(freshnessMeta(result));} }
        catch(e){ lastError=e; if(!cancelled){setDataState(cached?'stale':'failed');setReason(cached?'The latest update failed, so previously fetched values are being displayed.':`Data retrieval failed（${e.message}）`) } }
      } else if(!cancelled){setDataState(cached?'stale':'unavailable');setReason(cached?'Previously fetched values are being displayed.':'The requested data was not found.')}
      if(!cancelled)setLoading(false)
    })()
    return()=>{cancelled=true}
  },deps)
  return {data,loading,dataState,reason,...meta}
}


// ════════════════════════════════════════════════════════
//  public hooks
// ════════════════════════════════════════════════════════

/**
 * useThemes — theme list
 */
export function useThemes(period = '1mo') {
  const cacheKey=`themes_${period}`; const initial=readCache(cacheKey)
  const [data,setData]=useState(initial); const [loading,setLoading]=useState(!initial); const [refreshing,setRefreshing]=useState(false)
  const initialState=detectDataState(initial); const [dataState,setDataState]=useState(initial?initialState.state:'loading'); const [reason,setReason]=useState(initialState.reason)
  const [meta,setMeta]=useState(freshnessMeta(initial,null))
  const load=useCallback(async(bg=false)=>{ bg?setRefreshing(true):setLoading(true); let cached=readCache(cacheKey)
    try { const all=await fetchMarketJson(); const result=all[cacheKey]; if(!result) throw new Error('The selected period is not available in market.json'); const ds=detectDataState(result);setData(result);writeCache(cacheKey,result);setDataState(ds.state);setReason(ds.reason);setMeta(freshnessMeta(result));return }
    catch(first){ try { const r=await fetch(`${API}/api/themes?period=${period}`);if(!r.ok)throw new Error(`HTTP ${r.status}`);const result=await r.json();const ds=detectDataState(result);setData(result);writeCache(cacheKey,result);setDataState(ds.state);setReason(ds.reason);setMeta(freshnessMeta(result)); }
      catch(e){setData(cached||null);setDataState(cached?'stale':'failed');setReason(cached?'The latest update failed, so previously fetched values are being displayed.':`Data retrieval failed（${e.message}）`)} }
    finally{setLoading(false);setRefreshing(false)}
  },[period,cacheKey])
  useEffect(()=>{load(!!initial)},[period])
  return {data,loading,refreshing,dataState,reason,...meta,updatedAt:meta.dataAsOf,refresh:()=>load(false)}
}


/**
 * useMacro — macro indicators
 */
export function useMacro(period = '1mo') {
  return useMarketJsonKey(
    `macro_${period}`,
    `${API}/api/macro?period=${period}`,
    [period]
  )
}


/**
 * useStatus — market status
 */
export function useStatus() {
  const [status, setStatus] = useState({ time: '--:--', is_open: false, label: '...' })

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const json = await fetchMarketJson()
        if (json.status) {
          setStatus({ ...json.status, label: json.status.is_open ? 'Market Open' : 'Market Closed', updatedAt: json.status.updated_at || null, fetchedAt:new Date().toISOString(), dataAsOf:json.status.data_as_of || json.status.updated_at || null, nextUpdate:json.status.next_update_at || json.next_update_at || null, dataState:json.status.data_state || 'ok' })
          return
        }
      } catch {}
      try {
        const res  = await fetch(`${API}/api/status`)
        const data = await res.json()
        setStatus({ ...data, label: data.is_open ? 'Market Open' : 'Market Closed', fetchedAt:new Date().toISOString(), dataAsOf:data.data_as_of || data.updated_at || null, nextUpdate:data.next_update_at || null, dataState:'ok' })
      } catch {
        const now = new Date()
        const jst = new Date(now.getTime() + (now.getTimezoneOffset() + 540) * 60000)
        setStatus({
          time: `${String(jst.getHours()).padStart(2,'0')}:${String(jst.getMinutes()).padStart(2,'0')} JST`,
          is_open: false, label: 'Connection Error', dataState:'failed', fetchedAt:new Date().toISOString(), dataAsOf:null, nextUpdate:null,
        })
      }
    }
    fetch_()
    const id = setInterval(fetch_, 60000)
    return () => clearInterval(id)
  }, [])

  return status
}


/**
 * useTrends — theme comparison chart（Render fallback）
 */
export function useTrends(themes, period) {
  // trends_{period}キーからmarket.jsonを優先参照
  // themes引数は複数Themeのカンマ区切り文字列 or 配列
  const jsonKey  = `trends_${period}`
  const theList  = Array.isArray(themes)
    ? themes
    : (themes || '').split(',').map(t => t.trim()).filter(Boolean)
  const themeKey = theList.join(',')
  const cacheKey = `trends_${themeKey}_${period}`

  const [data,       setData]       = useState(() => readCache(cacheKey))
  const [loading,    setLoading]    = useState(!readCache(cacheKey))
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (!theList.length) { setLoading(false); return }
    let cancelled = false

    ;(async () => {
      try {
        // 1. market.jsonから取得
        const json      = await fetchMarketJson()
        const trendsObj = json[jsonKey]?.data || {}
        // 要求Themeが含まれているか確認
        const found = theList.some(t => trendsObj[t])
        if (found) {
          // 要求Themeのデータのみ返す
          const result = {}
          theList.forEach(t => { if (trendsObj[t]) result[t] = trendsObj[t] })
          if (!cancelled) {
            setData(result)
            writeCache(cacheKey, result)
            setLoading(false)
            return
          }
        }
      } catch {}

      // 2. フォールバック: Render API
      try {
        const url = `${API}/api/trends?themes=${encodeURIComponent(themeKey)}&period=${period}`
        const r   = await fetch(url)
        const json = await r.json()
        if (!cancelled) {
          setData(json)
          writeCache(cacheKey, json)
        }
      } catch {}
      if (!cancelled) setLoading(false)
    })()

    return () => { cancelled = true }
  }, [themeKey, period])

  return { data, loading, refreshing }
}


export function useThemeNames() {
  const cacheKey = 'theme_names'
  const [names, setNames] = useState(() => {
    const c = readCache(cacheKey)
    return c?.themes || []
  })

  useEffect(() => {
    fetchMarketJson()
      .then(json => {
        const fromNames  = json['theme_names']?.themes || []
        const fromThemes = json['themes_1mo']?.themes?.map(t => t.theme) || []
        const themes = fromNames.length > 0 ? fromNames : fromThemes
        if (themes.length > 0) { setNames(themes); writeCache(cacheKey, { themes }) }
      })
      .catch(() => {
        fetch(`${API}/api/theme-names`)
          .then(r => r.json())
          .then(d => { setNames(d.themes || []); writeCache(cacheKey, d) })
          .catch(() => {})
      })
  }, [])

  return names
}


/**
 * useHeatmap — 期間別ヒートマップ
 */
export function useHeatmap() {
  return useMarketJsonKey('heatmap', `${API}/api/heatmap`)
}


/**
 * useMonthlyHeatmap — 月次ヒートマップ ★market.json優先に変更
 */
export function useMonthlyHeatmap() {
  return useMarketJsonKey('heatmap_monthly', `${API}/api/heatmap/monthly`)
}


/**
 * useMomentum — 騰落モメンタム ★market.json優先に変更
 */
export function useMomentum(period = '1mo') {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    ;(async () => {
      // market.jsonを試みる
      let result = null
      try {
        const json = await fetchMarketJson()
        const raw  = json[`momentum_${period}`]
        if (raw) {
          const arr = raw?.data || raw || []
          // volume_chgが全て0またはnullの場合はAPIにフォールバック
          const hasVol = Array.isArray(arr) && arr.some(d => d.volume_chg && d.volume_chg !== 0)
          if (hasVol) result = raw
        }
      } catch {}

      // Render APIにフォールバック（volume_chgが取れない場合も含む）
      if (!result) {
        try {
          const r   = await fetch(`${API}/api/momentum?period=${period}`)
          const j   = await r.json()
          if (!cancelled) result = j
        } catch {}
      }

      if (!cancelled) { setData(result); setLoading(false) }
    })()
    return () => { cancelled = true }
  }, [period])

  return { data, loading }
}


/**
 * useSegmentDetail — market segment stock detail ★market.json優先に変更（最重要）
 */
export function useSegmentDetail(segName, period) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!segName) return
    let cancelled = false
    // セグメント変更時は必ずnullリセット（古いデータ残存防止）
    setData(null)
    setLoading(true)
    const jsonKey = `seg_${segName}_${period}`
    ;(async () => {
      // market.json を優先（キャッシュは使わず毎回取得）
      try {
        const json   = await fetchMarketJson()
        const result = json[jsonKey]
        if (result && !cancelled) {
          setData(result); setLoading(false); return
        }
      } catch {}
      // フォールバック: Render API
      try {
        const r    = await fetch(`${API}/api/market-rank/${encodeURIComponent(segName)}?period=${period}`)
        const json = await r.json()
        if (!cancelled) { setData(json) }
      } catch {}
      if (!cancelled) setLoading(false)
    })()
    return () => { cancelled = true }
  }, [segName, period])
  return { data, loading }
}


/**
 * useThemeDetail — theme detail ★market.json優先に変更（最重要）
 */
export function useThemeDetail(themeName, period) {
  const jsonKey = `theme_detail_${themeName}_${period}`
  const [data,    setData]    = useState(() => readCache(jsonKey))
  const [loading, setLoading] = useState(!readCache(jsonKey))

  useEffect(() => {
    if (!themeName) return
    let cancelled = false
    const cached = readCache(jsonKey)
    if (cached) { setData(cached); setLoading(false) }

    ;(async () => {
      try {
        const json   = await fetchMarketJson()
        const result = json[jsonKey]
        if (result && !cancelled) {
          setData(result); writeCache(jsonKey, result); setLoading(false); return
        }
      } catch {}
      // フォールバック: Render API
      try {
        const r    = await fetch(`${API}/api/theme-detail/${encodeURIComponent(themeName)}?period=${period}`)
        const json = await r.json()
        if (!cancelled) { setData(json); writeCache(jsonKey, json) }
      } catch {}
      if (!cancelled) setLoading(false)
    })()

    return () => { cancelled = true }
  }, [themeName, period])

  return { data, loading }
}


/**
 * useMarketRankList — market ranking list ★market.json優先に変更
 */
export function useMarketRankList(period = '1mo') {
  return useMarketJsonKey(
    `market_rank_${period}`,
    `${API}/api/market-rank-list?period=${period}`,
    [period]
  )
}


/**
 * useCustomThemeStats — Custom ThemeのReturn・VolumeをAPIで集計
 * ThemeList・ThemeDetailでCustom ThemeをノーマルThemeと同列に扱うため
 */
export function useCustomThemeStats(tickers, period) {
  const key = `custom_stats_${(tickers||[]).join(',')}_${period}`
  const [data,    setData]    = useState(() => readCache(key))
  const [loading, setLoading] = useState(!readCache(key))

  useEffect(() => {
    if (!tickers || tickers.length === 0) { setLoading(false); return }
    let cancelled = false
    const cached = readCache(key)
    if (cached) { setData(cached); setLoading(false) }

    ;(async () => {
      try {
        const r = await fetch(`${API}/api/custom-theme-stats`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tickers, period }),
        })
        const json = await r.json()
        if (!cancelled) { setData(json); writeCache(key, json) }
      } catch {}
      if (!cancelled) setLoading(false)
    })()

    return () => { cancelled = true }
  }, [tickers?.join(','), period])

  return { data, loading }
}

/**
 * useFundFlow — 資金フロー ★market.json優先（旧：API直接取得）
 */
export function useFundFlow(period) {
  const jsonKey     = `fund_flow_${period}`
  const apiFallback = `${API}/api/fund-flow?period=${period}`
  return useMarketJsonKey(jsonKey, apiFallback, [period])
}
