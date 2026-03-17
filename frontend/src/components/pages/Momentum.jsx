import { useState, useEffect } from 'react'
const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8001'
const PERIODS = [
  { label:'1 Week', value:'5d' },
  { label:'1 Month', value:'1mo' },
  { label:'3 Months', value:'3mo' },
  { label:'6 Months', value:'6mo' },
  { label:'1 Year', value:'1y' },
]
const SORT_KEYS = [
  { label:'Price Change (desc)', value:'pct' },
  { label:'1W Momentum (desc)', value:'week_diff' },
  { label:'1M Momentum (desc)', value:'month_diff' },
]
const STATES = ['Strong Up','Weak Up','Neutral','Weak Down','Strong Down']
const STATE_COLORS = {
  'Strong Up':'#ff4560',
  'Weak Up':'#ff8c42',
  'Neutral':'#4a6080',
  'Weak Down':'#4a9eff',
  'Strong Down':'#00c48c',
}
const STATE_MAP = {
  '\u5f37\u3044\u4e0a\u6607':'Strong Up',
  '\u5f31\u3044\u4e0a\u6607':'Weak Up',
  '\u6a2a\u3070\u3044':'Neutral',
  '\u5f31\u3044\u4e0b\u843d':'Weak Down',
  '\u5f37\u3044\u4e0b\u843d':'Strong Down',
}
function Loading() {
  return (
    <div style={{ textAlign:'center', padding:'60px', color:'var(--text3)' }}>
      {[0,0.2,0.4].map((d,i) => (
        <span key={i} style={{
          display:'inline-block', width:'6px', height:'6px', borderRadius:'50%',
          background:'var(--accent)', margin:'0 3px',
          animation:`pulse 1.2s ease-in-out ${d}s infinite`,
        }}/>
      ))}
      <div style={{ marginTop:'12px', fontSize:'12px' }}>Loading data...</div>
    </div>
  )
}
export default function Momentum() {
  const [period,  setPeriod]  = useState('1mo')
  const [sortKey, setSortKey] = useState('pct')
  const [filter,  setFilter]  = useState([])
  const [data,    setData]    = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  useEffect(() => {
    const fetch_ = async () => {
      setLoading(true)
      setError(null)
      try {
        const res  = await fetch(`${API}/api/momentum?period=${period}`)
        const json = await res.json()
        const translated = (json.data || []).map(d => ({
          ...d,
          state: STATE_MAP[d.state] || d.state,
        }))
        setData(translated)
      } catch {
        setError('Failed to load data.')
      } finally {
        setLoading(false)
      }
    }
    fetch_()
  }, [period])
  let sorted = [...data].sort((a, b) => b[sortKey] - a[sortKey])
  if (filter.length > 0) sorted = sorted.filter(d => filter.includes(d.state))
  const toggleFilter = (s) => setFilter(f => f.includes(s) ? f.filter(x => x !== s) : [...f, s])
  const pctColor = (v) => v >= 0 ? 'var(--red)' : 'var(--green)'
  const pctSign  = (v) => v >= 0 ? '+' : ''
  return (
    <div style={{ padding:'28px 32px 48px' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, letterSpacing:'-0.02em', color:'#e8f0ff', marginBottom:'4px' }}>
        Momentum
      </h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'20px' }}>
        Identify accelerating and decelerating themes by comparing current performance against 1W/1M changes.
      </p>
      <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', marginBottom:'20px' }}>
        <select value={period} onChange={e => setPeriod(e.target.value)} style={selStyle}>
          {PERIODS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
        <select value={sortKey} onChange={e => setSortKey(e.target.value)} style={selStyle}>
          {SORT_KEYS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>
      <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'20px' }}>
        {STATES.map(s => (
          <button key={s} onClick={() => toggleFilter(s)} style={{
            padding:'4px 12px', borderRadius:'20px', fontSize:'12px', cursor:'pointer',
            border:`1px solid ${filter.includes(s) ? STATE_COLORS[s] : 'var(--border)'}`,
            background:filter.includes(s) ? `${STATE_COLORS[s]}20` : 'transparent',
            color:filter.includes(s) ? STATE_COLORS[s] : 'var(--text2)',
            fontFamily:'var(--font)', transition:'all 0.15s',
          }}>
            {s}
          </button>
        ))}
        {filter.length > 0 && (
          <button onClick={() => setFilter([])} style={{
            padding:'4px 12px', borderRadius:'20px', fontSize:'12px', cursor:'pointer',
            border:'1px solid var(--border)', background:'transparent',
            color:'var(--text3)', fontFamily:'var(--font)',
          }}>
            Clear
          </button>
        )}
      </div>
      {loading ? <Loading /> : error ? (
        <div style={{ color:'var(--red)', fontSize:'13px' }}>{error}</div>
      ) : (
        <>
          <div style={{
            background:'transparent', border:'1px solid transparent',
            borderRadius:'8px', padding:'4px 16px', marginBottom:'4px',
            display:'grid', gridTemplateColumns:'1fr 80px 80px 80px 100px',
            alignItems:'center', gap:'12px',
          }}>
            <span style={hdrStyle}>Theme</span>
            <span style={{ ...hdrStyle, textAlign:'right' }}>Change</span>
            <span style={{ ...hdrStyle, textAlign:'right' }}>1W Diff</span>
            <span style={{ ...hdrStyle, textAlign:'right' }}>1M Diff</span>
            <span style={{ ...hdrStyle, textAlign:'center' }}>State</span>
          </div>
          {sorted.map((d, i) => (
            <div key={d.theme} style={{
              background:'var(--bg2)', border:'1px solid var(--border)',
              borderRadius:'8px', padding:'11px 16px', marginBottom:'3px',
              display:'grid', gridTemplateColumns:'1fr 80px 80px 80px 100px',
              alignItems:'center', gap:'12px',
              transition:'background 0.12s, border-color 0.12s',
              animation:`fadeUp 0.3s cubic-bezier(0.22,1,0.36,1) ${i * 0.02}s both`,
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#0e1e32'
                e.currentTarget.style.borderColor = 'rgba(74,158,255,0.18)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--bg2)'
                e.currentTarget.style.borderColor = 'var(--border)'
              }}
            >
              <span style={{ fontSize:'13px', color:'#c0d0e8', fontWeight:500 }}>
                <span style={{ fontSize:'11px', color:'var(--text3)', fontFamily:'var(--mono)', marginRight:'8px' }}>
                  {String(i+1).padStart(2,'0')}
                </span>
                {d.theme}
              </span>
              <span style={{ fontFamily:'var(--mono)', fontSize:'14px', fontWeight:700, textAlign:'right', color:pctColor(d.pct) }}>
                {pctSign(d.pct)}{d.pct.toFixed(1)}%
              </span>
              <span style={{ fontFamily:'var(--mono)', fontSize:'13px', textAlign:'right', color:pctColor(d.week_diff) }}>
                {pctSign(d.week_diff)}{d.week_diff.toFixed(1)}pt
              </span>
              <span style={{ fontFamily:'var(--mono)', fontSize:'13px', textAlign:'right', color:pctColor(d.month_diff) }}>
                {pctSign(d.month_diff)}{d.month_diff.toFixed(1)}pt
              </span>
              <span style={{ fontSize:'12px', fontWeight:600, textAlign:'center', color:STATE_COLORS[d.state] ?? 'var(--text2)' }}>
                {d.state}
              </span>
            </div>
          ))}
          <p style={{ fontSize:'11px', color:'var(--text3)', marginTop:'16px' }}>
            * Change: price change for selected period / 1W Diff and 1M Diff: change vs 1 week/1 month ago
          </p>
        </>
      )}
    </div>
  )
}
const selStyle = {
  background:'var(--bg3)', color:'var(--text)',
  border:'1px solid rgba(74,120,200,0.2)', borderRadius:'6px',
  fontFamily:'var(--font)', fontSize:'13px',
  padding:'6px 12px', cursor:'pointer', outline:'none',
}
const hdrStyle = {
  fontSize:'10px', fontWeight:600, letterSpacing:'0.1em',
  color:'var(--text3)', textTransform:'uppercase',
}