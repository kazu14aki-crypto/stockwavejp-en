const MAP = {
  unavailable: { icon:'◌', title:'Data unavailable', text:'データ提供元が未設定、または対象データがまだ生成されていません。0%としては扱いません。', color:'#ffb84d' },
  failed:      { icon:'⚠', title:'Data update failed', text:'最新データのFetchedに失敗しました。前回データがある場合は、その値を表示しています。', color:'#ff647c' },
  stale:       { icon:'◷', title:'Data update delayed', text:'予定時刻を過ぎています。表示値が通常より古い可能性があります。', color:'#ffb84d' },
  closed:      { icon:'■', title:'Market closed', text:'Market closed中のため、確定済みの直近データを表示しています。', color:'#8994a7' },
}

export function DataStateBanner({ state, reason, compact=false, onRetry }) {
  if (!state || state === 'ok' || state === 'loading') return null
  const x = MAP[state] || MAP.failed
  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap:'10px', padding:compact?'9px 11px':'12px 14px', marginBottom:'14px', borderRadius:'9px', background:`${x.color}10`, border:`1px solid ${x.color}40` }}>
      <span style={{ color:x.color, fontSize:'16px', lineHeight:1.3 }}>{x.icon}</span>
      <div style={{ flex:1 }}>
        <div style={{ color:x.color, fontSize:'12px', fontWeight:800 }}>{x.title}</div>
        <div style={{ color:'var(--text2)', fontSize:'11px', lineHeight:1.7, marginTop:'2px' }}>{reason || x.text}</div>
      </div>
      {onRetry && <button onClick={onRetry} style={{ border:'1px solid var(--border)', background:'var(--bg2)', color:'var(--text2)', borderRadius:'6px', padding:'5px 9px', cursor:'pointer', fontSize:'10px' }}>再Fetched</button>}
    </div>
  )
}

export function DataFreshness({ fetchedAt, dataAsOf, nextUpdate, planLabel, compact=false }) {
  const fmt = v => {
    if (!v) return '未Fetched'
    const d = new Date(v)
    if (Number.isNaN(d.getTime())) return String(v)
    return d.toLocaleString('ja-JP', { month:'numeric', day:'numeric', hour:'2-digit', minute:'2-digit' })
  }
  return (
    <div style={{ display:'flex', flexWrap:'wrap', gap:compact?'5px 10px':'7px 16px', color:'var(--text3)', fontSize:compact?'9px':'10px', lineHeight:1.6 }}>
      <span>Fetched：{fmt(fetchedAt)}</span>
      <span>Data time：{fmt(dataAsOf)}</span>
      {nextUpdate && <span>Next update：{fmt(nextUpdate)}</span>}
      {planLabel && <span>Update type：{planLabel}</span>}
    </div>
  )
}
