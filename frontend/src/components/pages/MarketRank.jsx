import { useState, useEffect } from 'react'
const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8001'
const PERIODS = [
  { label:'1 Week', value:'5d'  }, { label:'1 Month',  value:'1mo' },
  { label:'3 Months',value:'3mo'}, { label:'6 Months', value:'6mo' }, { label:'1 Year', value:'1y' },
]
function formatLarge(n) {
  if (!n) return '0'
  if (n >= 1e12) return (n/1e12).toFixed(1)+'T'
  if (n >= 1e8)  return (n/1e8).toFixed(1)+'B'
  if (n >= 1e4)  return (n/1e4).toFixed(1)+'M'
  return n.toLocaleString()
}
function Loading({ msg='Loading data...' }) {
  return (
    <div style={{ textAlign:'center', padding:'40px', color:'var(--text3)' }}>
      {[0,0.2,0.4].map((d,i)=>(
        <span key={i} style={{ display:'inline-block', width:'6px', height:'6px', borderRadius:'50%',
          background:'var(--accent)', margin:'0 3px', animation:`pulse 1.2s ease-in-out ${d}s infinite`}}/>
      ))}
      <div style={{ marginTop:'12px', fontSize:'12px' }}>{msg}</div>
    </div>
  )
}
function Top5Bar({ items, title, colorFn }) {
  if (!items||!items.length) return null
  const maxAbs = Math.max(...items.map(s=>Math.abs(s.pct)),1)
  const W=280, H=160, PL=8, PR=8, PT=24, PB=36
  const bW = (W-PL-PR)/items.length-4
  return (
    <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'8px', padding:'12px' }}>
      <div style={{ fontSize:'12px', fontWeight:700, color:'var(--text)', marginBottom:'8px' }}>{title}</div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display:'block' }}>
        {items.map((s,i)=>{
          const h = Math.max(2, Math.round(Math.abs(s.pct)/maxAbs*(H-PT-PB)))
          const x = PL+i*((W-PL-PR)/items.length)+2
          const y = H-PB-h
          const c = colorFn(s.pct)
          return (
            <g key={s.ticker}>
              <rect x={x} y={y} width={bW} height={h} rx="2" fill={c} opacity="0.85"/>
              <text x={x+bW/2} y={y-4} textAnchor="middle" fill={c} fontSize="9" fontFamily="DM Mono">{s.pct>=0?'+':''}{s.pct.toFixed(1)}%</text>
              <text x={x+bW/2} y={H-PB+14} textAnchor="middle" fill="var(--text3)" fontSize="9" fontFamily="DM Sans">{s.name.length>8?s.name.slice(0,8)+'…':s.name}</text>
            </g>
          )
        })}
        <line x1={PL} y1={H-PB} x2={W-PR} y2={H-PB} stroke="var(--border)" strokeWidth="1"/>
      </svg>
    </div>
  )
}
function StockTable({ stocks }) {
  if (!stocks||!stocks.length) return null
  const headers = ['Code','Price','Change','Contrib. Rank','Contrib.','Vol. Rank','Vol. Chg','Volume','TV Rank','Trade Value']
  return (
    <div className="sticky-table">
      <table style={{ borderCollapse:'collapse', fontSize:'12px', fontFamily:'var(--font)', width:'100%' }}>
        <thead>
          <tr style={{ borderBottom:'1px solid var(--border)' }}>
            <th style={{ ...thStyle, textAlign:'left', minWidth:'120px', background:'var(--bg3)' }}>Name</th>
            {headers.map(h => (
              <th key={h} style={{ ...thStyle, minWidth:'70px' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stocks.map((s,i)=>{
            const pColor = s.pct>=0?'var(--red)':'var(--green)'
            const cColor = s.contribution>=0?'var(--red)':'var(--green)'
            return (
              <tr key={s.ticker} style={{
                borderBottom:'1px solid rgba(255,255,255,0.04)',
                background: i%2===0?'transparent':'rgba(255,255,255,0.02)',
              }}>
                <td style={{ ...tdL, fontWeight:600, color:'var(--text)', minWidth:'120px', background: i%2===0?'var(--bg2)':'var(--bg3)' }}>
                  <div style={{ fontSize:'13px' }}>{s.name}</div>
                  <div style={{ fontSize:'10px', color:'var(--text3)', fontFamily:'var(--mono)' }}>{String(i+1).padStart(2,'0')}</div>
                </td>
                <td style={tdC}><code style={{ fontSize:'11px', color:'var(--text3)', fontFamily:'var(--mono)' }}>{s.ticker.replace('.T','')}</code></td>
                <td style={tdR}><span style={{ fontFamily:'var(--mono)', color:'var(--text2)' }}>¥{s.price?.toLocaleString()}</span></td>
                <td style={{ ...tdR, color:pColor, fontWeight:700, fontFamily:'var(--mono)' }}>{s.pct>=0?'+':''}{s.pct?.toFixed(1)}%</td>
                <td style={tdC}>{i+1}</td>
                <td style={{ ...tdR, color:cColor, fontFamily:'var(--mono)' }}>{s.contribution>=0?'+':''}{s.contribution?.toFixed(1)}%</td>
                <td style={{ ...tdR, color:s.volume_chg>=0?'var(--red)':'var(--green)', fontFamily:'var(--mono)' }}>{s.volume_chg>=0?'+':''}{s.volume_chg?.toFixed(1)}%</td>
                <td style={{ ...tdR, fontFamily:'var(--mono)', color:'var(--text2)' }}>{formatLarge(s.volume)}</td>
                <td style={tdC}>{s.vol_rank}</td>
                <td style={{ ...tdR, fontFamily:'var(--mono)', color:'var(--text2)' }}>{formatLarge(s.trade_value)}</td>
                <td style={tdC}>{s.tv_rank}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
const thStyle = { padding:'8px 10px', textAlign:'right', fontSize:'10px', fontWeight:600, letterSpacing:'0.06em', color:'var(--text3)', textTransform:'uppercase', whiteSpace:'nowrap', background:'var(--bg3)' }
const tdC = { padding:'8px 10px', textAlign:'center', whiteSpace:'nowrap', color:'var(--text2)' }
const tdR = { padding:'8px 10px', textAlign:'right', whiteSpace:'nowrap' }
const tdL = { padding:'8px 12px', textAlign:'left' }
export default function MarketRank() {
  const [period,      setPeriod]      = useState('1mo')
  const [summary,     setSummary]     = useState(null)
  const [groups,      setGroups]      = useState({})
  const [activeGroup, setActiveGroup] = useState('Nikkei 225')
  const [activeSeg,   setActiveSeg]   = useState(null)
  const [detail,      setDetail]      = useState(null)
  const [loadingS,    setLoadingS]    = useState(true)
  const [loadingD,    setLoadingD]    = useState(false)
  useEffect(()=>{
    setLoadingS(true)
    fetch(`${API}/api/market-rank?period=${period}`)
      .then(r=>r.json()).then(d=>{
        setSummary(d.data); setGroups(d.groups||{})
        const firstGroup = Object.keys(d.groups||{})[0]
        const firstSeg = firstGroup ? d.groups[firstGroup][0] : null
        if (firstSeg && !activeSeg) {
          setActiveGroup(firstGroup)
          setActiveSeg(firstSeg)
        }
      }).catch(()=>{}).finally(()=>setLoadingS(false))
  },[period])
  useEffect(()=>{
    if (!activeSeg) return
    setLoadingD(true); setDetail(null)
    fetch(`${API}/api/market-rank/${encodeURIComponent(activeSeg)}?period=${period}`)
      .then(r=>r.json()).then(d=>setDetail(d.data))
      .catch(()=>{}).finally(()=>setLoadingD(false))
  },[activeSeg, period])
  const pctColor = (v) => v>=0 ? 'var(--red)' : 'var(--green)'
  const stocks   = detail?.stocks ?? []
  const top5     = stocks.slice(0,5)
  const bot5     = [...stocks].sort((a,b)=>a.pct-b.pct).slice(0,5)
  return (
    <div>
      <div className="page-header-sticky">
        <h1 style={{ fontSize:'18px', fontWeight:700, color:'var(--text)', whiteSpace:'nowrap' }}>Market Rank</h1>
        <select value={period} onChange={e=>setPeriod(e.target.value)} style={selStyle}>
          {PERIODS.map(p=><option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
      </div>
      <div style={{ padding:'20px 32px 48px' }}>
        <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'16px' }}>
          Price change rankings and stock details by Nikkei 225, TOPIX, and Market segment.
        </p>
        <div style={{ display:'flex', gap:'4px', borderBottom:'1px solid var(--border)', marginBottom:'0' }}>
          {Object.keys(groups).map(g=>(
            <button key={g} onClick={()=>{ setActiveGroup(g); setActiveSeg(groups[g][0]) }} style={{
              padding:'8px 16px', fontSize:'13px', cursor:'pointer', border:'none', background:'transparent',
              color: activeGroup===g ? 'var(--text)' : 'var(--text3)',
              fontWeight: activeGroup===g ? 700 : 400, fontFamily:'var(--font)',
              borderBottom: activeGroup===g ? '2px solid var(--accent)' : '2px solid transparent',
              marginBottom:'-1px', transition:'all 0.15s',
            }}>{g}</button>
          ))}
        </div>
        {loadingS ? <Loading /> : (
          <>
            <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', padding:'12px 0', borderBottom:'1px solid var(--border)', marginBottom:'20px' }}>
              {(groups[activeGroup]||[]).map(seg=>{
                const avg = summary?.[seg]?.avg
                return (
                  <button key={seg} onClick={()=>setActiveSeg(seg)} style={{
                    padding:'6px 14px', borderRadius:'6px', fontSize:'12px', cursor:'pointer',
                    border:`1px solid ${activeSeg===seg?'var(--accent)':'var(--border)'}`,
                    background: activeSeg===seg?'rgba(91,156,246,0.12)':'transparent',
                    color: activeSeg===seg?'var(--accent)':'var(--text2)',
                    fontFamily:'var(--font)', transition:'all 0.15s', whiteSpace:'nowrap',
                  }}>
                    {seg}
                    {avg!=null && <span style={{ marginLeft:'6px', fontSize:'11px', fontFamily:'var(--mono)',
                      color:avg>=0?'var(--red)':'var(--green)', fontWeight:700 }}>
                      {avg>=0?'+':''}{avg.toFixed(1)}%
                    </span>}
                  </button>
                )
              })}
            </div>
            {loadingD ? <Loading msg="Loading segment data..." /> : detail && (
              <>
                <div style={{ display:'flex', alignItems:'center', gap:'16px', marginBottom:'20px', flexWrap:'wrap' }}>
                  <span style={{ fontSize:'16px', fontWeight:700, color:'var(--text)' }}>{activeSeg}</span>
                  <span style={{ fontSize:'15px', fontFamily:'var(--mono)', fontWeight:700,
                    color:detail.avg>=0?'var(--red)':'var(--green)' }}>
                    Avg. {detail.avg>=0?'+':''}{detail.avg.toFixed(1)}%
                  </span>
                  <span style={{ fontSize:'12px', color:'var(--text3)' }}>{stocks.length} stocks</span>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'24px' }} className="top5g">
                  <Top5Bar items={top5} title="🔺 Top Gainers TOP5" colorFn={pctColor}/>
                  <Top5Bar items={bot5} title="🔻 Top Losers TOP5" colorFn={pctColor}/>
                </div>
                <div style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.1em', color:'var(--text3)', textTransform:'uppercase', marginBottom:'8px' }}>
                  All Stocks <span style={{ color:'var(--text3)', fontSize:'10px', fontWeight:400 }}>— swipe horizontally for details</span>
                </div>
                <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', overflow:'hidden' }}>
                  <StockTable stocks={stocks}/>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <style>{`@media (max-width:640px){.top5g{grid-template-columns:1fr !important;}}`}</style>
    </div>
  )
}
const selStyle = {
  background:'var(--bg3)', color:'var(--text)',
  border:'1px solid var(--border)', borderRadius:'6px',
  fontFamily:'var(--font)', fontSize:'13px',
  padding:'6px 12px', cursor:'pointer', outline:'none',
}