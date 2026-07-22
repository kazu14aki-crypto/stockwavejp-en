import { useEffect, useMemo, useState } from 'react'

const normalizeCode = value => String(value || '').replace('.T','').trim()

export function useEnglishCompanyNames() {
  const [index,setIndex]=useState({})

  useEffect(()=>{
    let active=true
    fetch(`/data/stock_index.json?t=${Date.now()}`)
      .then(response=>response.ok ? response.json() : {})
      .then(data=>{ if(active) setIndex(data || {}) })
      .catch(()=>{ if(active) setIndex({}) })
    return ()=>{ active=false }
  },[])

  return useMemo(() => {
    return (tickerOrCode, fallback='') => {
      const code=normalizeCode(tickerOrCode)
      return index?.[code]?.name || fallback || code
    }
  },[index])
}

export { normalizeCode }
