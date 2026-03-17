import { useState, useEffect, useRef } from 'react'
const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8001'
const PERIODS = [
  { label: '1 Week',   value: '5d'  },
  { label: '1 Month',  value: '1mo' },
  { label: '3 Months', value: '3mo' },
  { label: '6 Months', value: '6mo' },
  { label: '1 Year',   value: '1y'  },
]
const COLORS = ['#ff4560','#ff8c42','#ffd166','#06d6a0','#4a9eff','#aa77ff','#ff77aa','#44dddd','#aaddff','#ffaa77']
const MODES = [
  { label: 'Top & Bottom 5', value: 'top_bot' },
  { label: 'Custom Select',  value: 'custom'  },
  { label: 'All Themes',     value: 'all'     },
]
function Loading() {
  return (
    <div style={{ textAlign:'center', padding:'60px', color:'var(--text3)' }}>
      {[0,0.2,0.4].map((d,i)=>(
        <span key={i} style={{ display:'inline-block', width:'6px', height:'6px', borderRadius:'50%', background:'var(--accent)', margin:'0 3px', animation:`pulse 1.2s ease-in-out ${d}s infinite`}}/>
      ))}
      <div style={{ marginTop:'12px', fontSize:'12px' }}>Loading chart data...</div>
    </div>
  )
}
function LineChart({ trends, selected }) {
  if (!selected.length) return null
  const allDates = new Set()
  selected.forEach(theme => (trends[theme]??[]).forEach(d => allDates.add(d.date)))
  const dates = [...allDates].sort()
  if (!dates.length) return null
  const W=800, H=300, PL=50, PR=20, PT=20, PB=40
  let yMin=Infinity, yMax=-Infinity
  selected.forEach(theme => (trends[theme]??[]).forEach(d => { if(d.pct<yMin)yMin=d.pct; if(d.pct>yMax)yMax=d.pct }))
  const yPad = Math.max(Math.abs(yMax-yMin)*0.1, 1)
  yMin -= yPad; yMax += yPad
  const xS = (i) => PL+(i/(dates.length-1))*(W-PL-PR)
  const yS = (v) => PT+(1-(v-yMin)/(yMax-yMin))*(H-PT-PB)
  const xLabels = []
  const step = Math.max(1, Math.floor(dates.length/6))
  for (let i=0; i<dates.length; i+=step) xLabels.push({i, date:dates[i]})
  const yLabels = Array.from({length:5},(_,i)=>{ const v=yMin+(yMax-yMin)*(i/4); return {v, y:yS(v)} })
  return (
    <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'16px', overflowX:'auto' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display:'block', minWidth:'400px' }}>
        {yLabels.map(({v,y})=>(
          <g key={v}>
            <line x1={PL} y1={y} x2={W-PR} y2={y} stroke="rgba(74,120,200,0.08)" strokeWidth="1"/>
            <text x={PL-6} y={y+4} textAnchor="end" fill="var(--text3)" fontSize="10" fontFamily="DM Mono">{v.toFixed(1)}%</text>
          </g>
        ))}
        {yMin<0&&yMax>0&&<line x1={PL} y1={yS(0)} x2={W-PR} y2={yS(0)} stroke="rgba(74,120,200,0.3)" strokeWidth="1" strokeDasharray="4,4"/>}
        {xLabels.map(({i,date})=>(
          <text key={date} x={xS(i)} y={H-8} textAnchor="middle" fill="var(--text3)" fontSize="10" fontFamily="DM Sans">{date.slice(2,7)}</text>
        ))}
        {selected.map((theme,ti)=>{
          const data = trends[theme]??[]
          if (!data.length) return null
          const pts = data.map(d=>{ const xi=dates.indexOf(d.date); return xi>=0?`${xS(xi)},${yS(d.pct)}`:null }).filter(Boolean)
          if (!pts.length) return null
          const last = data[data.length-1]
          const lastXi = dates.indexOf(last.date)
          return (
            <g key={theme}>
              <polyline points={pts.join(' ')} fill="none" stroke={COLORS[ti%COLORS.length]} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
              <text x={xS(lastXi)+4} y={yS(last.pct)+4} fill={COLORS[ti%COLORS.length]} fontSize="10" fontFamily="DM Mono">{last.pct>=0?'+':''}{last.pct.toFixed(1)}%</text>
            </g>
          )
        })}
      </svg>
      <div style={{ display:'flex', flexWrap:'wrap', gap:'12px', marginTop:'12px' }}>
        {selected.map((theme,ti)=>{
          const data = trends[theme]??[]
          const last = data[data.length-1]
          const color = COLORS[ti%COLORS.length]
          return (
            <div key={theme} style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              <div style={{ width:'20px', height:'2px', background:color, borderRadius:'1px' }}/>
              <span style={{ fontSize:'12px', color:'var(--text2)' }}>{theme}</span>
              {last&&<span style={{ fontSize:'12px', fontFamily:'var(--mono)', color, fontWeight:600 }}>{last.pct>=0?'+':''}{last.pct.toFixed(1)}%</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default function Trend() {
  const [period,     setPeriod]     = useState('1y')
  const [mode,       setMode]       = useState('top_bot')
  const [trends,     setTrends]     = useState({})
  const [themeNames, setThemeNames] = useState([])
  const [selected,   setSelected]   = useState([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)
  useEffect(()=>{
    fetch(`${API}/api/theme-names`).then(r=>r.json()).then(d=>setThemeNames(d.themes)).catch(()=>{})
  },[])
  useEffect(()=>{
    if (!themeNames.length) return
    const fetch_ = async () => {
      setLoading(true); setError(null)
      try {
        const res  = await fetch(`${API}/api/trends?themes=${encodeURIComponent(themeNames.join(','))}&period=${period}`)
        const json = await res.json()
        const t = json.trends
        const sorted = Object.entries(t).map(([name,data])=>({name, last:data[data.length-1]?.pct??0})).sort((a,b)=>b.last-a.last)
        setTrends(t)
        const top5 = sorted.slice(0,5).map(x=>x.name)
        const bot5 = sorted.slice(-5).map(x=>x.name)
        setSelected([...new Set([...top5,...bot5])])
      } catch { setError('Failed to load data.') }
      finally { setLoading(false) }
    }
    fetch_()
  },[period, themeNames])
  useEffect(()=>{
    if (!Object.keys(trends).length) return
    const sorted = Object.entries(trends).map(([name,data])=>({name, last:data[data.length-1]?.pct??0})).sort((a,b)=>b.last-a.last)
    if (mode==='top_bot') {
      setSelected([...new Set([...sorted.slice(0,5).map(x=>x.name),...sorted.slice(-5).map(x=>x.name)])])
    } else if (mode==='all') {
      setSelected(Object.keys(trends))
    }
  },[mode])
  const toggleTheme = (t) => setSelected(s=>s.includes(t)?s.filter(x=>x!==t):[...s,t])
  return (
    <div style={{ padding:'28px 32px 48px' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, letterSpacing:'-0.02em', color:'#e8f0ff', marginBottom:'4px' }}>Trend</h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'20px' }}>Theme-level cumulative price change trends derived from daily yfinance data.</p>
      <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', marginBottom:'16px' }}>
        <select value={period} onChange={e=>setPeriod(e.target.value)} style={selStyle}>
          {PERIODS.map(p=><option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
        {MODES.map(m=>(
          <button key={m.value} onClick={()=>setMode(m.value)} style={{
            padding:'6px 14px', borderRadius:'6px', fontSize:'12px', cursor:'pointer',
            border:`1px solid ${mode===m.value?'var(--accent)':'var(--border)'}`,
            background:mode===m.value?'rgba(74,158,255,0.12)':'transparent',
            color:mode===m.value?'var(--accent)':'var(--text2)',
            fontFamily:'var(--font)', transition:'all 0.15s',
          }}>{m.label}</button>
        ))}
      </div>
      {mode==='custom'&&(
        <div style={{ display:'flex', flexWrap:'wrap', gap:'6px', marginBottom:'16px' }}>
          {themeNames.map(t=>(
            <button key={t} onClick={()=>toggleTheme(t)} style={{
              padding:'4px 10px', borderRadius:'20px', fontSize:'11px', cursor:'pointer',
              border:`1px solid ${selected.includes(t)?'var(--accent)':'var(--border)'}`,
              background:selected.includes(t)?'rgba(74,158,255,0.12)':'transparent',
              color:selected.includes(t)?'var(--accent)':'var(--text3)',
              fontFamily:'var(--font)', transition:'all 0.15s',
            }}>{t}</button>
          ))}
        </div>
      )}
      {loading?<Loading/>:error?<div style={{ color:'var(--red)', fontSize:'13px' }}>{error}</div>:<LineChart trends={trends} selected={selected}/>}
    </div>
  )
}
const selStyle = { background:'var(--bg3)', color:'var(--text)', border:'1px solid rgba(74,120,200,0.2)', borderRadius:'6px', fontFamily:'var(--font)', fontSize:'13px', padding:'6px 12px', cursor:'pointer', outline:'none' }