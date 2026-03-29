/**
 * FlowMomentum.jsx — Fund Flow＋Momentum統合ページ
 */
import { useState, useEffect } from 'react'
import { useStaleData } from '../../hooks/useStaleData'
import { useMomentum } from '../../hooks/useMarketData'

const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'
const PERIODS = [
  { label: '1W', value: '5d'  },
  { label: '1M', value: '1mo' },
  { label: '3M', value: '3mo' },
  { label: '6M', value: '6mo' },
  { label: '1Y',   value: '1y'  },
]
const SORT_KEYS = ['Return (High→Low)', 'Return (Low→High)']
const STATE_COLORS = {
  '🔥Accel':  '#ff4560',
  '↗Rev↑': '#ff8c42',
  '→Flat': '#4a6080',
  '↘Rev↓': '#4a9eff',
  '❄️Decel':  '#00c48c',
}

function Loading() {
  return (
    <div style={{ textAlign:'center', padding:'40px', color:'var(--text3)' }}>
      {[0,0.2,0.4].map((d,i) => (
        <span key={i} style={{ display:'inline-block', width:'6px', height:'6px', borderRadius:'50%',
          background:'var(--accent)', margin:'0 3px', animation:`pulse 1.2s ease-in-out ${d}s infinite`}} />
      ))}
      <div style={{ marginTop:'12px', fontSize:'12px' }}>Loading......</div>
    </div>
  )
}

// ── 水平バー（Fund Flow用）──
function HBar({ item, maxAbs }) {
  const w = Math.round(Math.abs(item.pct) / maxAbs * 100)
  const c = item.pct >= 0 ? 'var(--red)' : 'var(--green)'
  return (
    <div style={{ display:'grid', gridTemplateColumns:'130px 1fr 70px',
      alignItems:'center', gap:'10px',
      background:'var(--bg2)', border:'1px solid var(--border)',
      borderRadius:'6px', padding:'7px 12px' }}>
      <span style={{ fontSize:'12px', color:'#c0d0e8', fontWeight:500,
        overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
        {item.theme}
      </span>
      <div style={{ height:'5px', background:'rgba(255,255,255,0.05)', borderRadius:'3px', overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${w}%`, background:c, borderRadius:'3px' }} />
      </div>
      <span style={{ fontFamily:'var(--mono)', fontSize:'12px', fontWeight:700, textAlign:'right', color:c }}>
        {item.pct >= 0 ? '+' : ''}{item.pct.toFixed(1)}%
      </span>
    </div>
  )
}

export default function FlowMomentum() {
  const [period,  setPeriod]  = useState('1mo')
  const [sortKey, setSortKey] = useState('Return (High→Low)')
  const [tab,     setTab]     = useState('flow')  // 'flow' | 'momentum'

  // Fund Flow
  const { data: flowData, loading: loadingF } = useStaleData(
    `${API}/api/fund-flow?period=${period}`,
    `fundflow_${period}`,
    null
  )

  // Momentum ★market.json優先（キャッシュ拡大後は即時表示）
  const { data: momentumRaw, loading: loadingM } = useMomentum(period)
  const momentumData = momentumRaw?.data || []

  const allItems = flowData?.all ?? []
  const maxAbs   = allItems.length ? Math.max(...allItems.map(t => Math.abs(t.pct))) : 1

  let sorted = [...momentumData]
  if (sortKey === 'Return (High→Low)') sorted.sort((a, b) => b.pct - a.pct)
  if (sortKey === 'Return (Low→High)') sorted.sort((a, b) => a.pct - b.pct)
  const pctColor = v => v >= 0 ? 'var(--red)' : 'var(--green)'
  const pctSign  = v => v >= 0 ? '+' : ''

  return (
    <div style={{ padding:'28px 32px 48px' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, letterSpacing:'-0.02em', color:'#e8f0ff', marginBottom:'4px' }}>
        Fund Flow・Momentum
      </h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'20px' }}>
        テーマへの資金集中度とReturnランキングを確認できます。
      </p>

      {/* コントロール */}
      <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'20px', alignItems:'center' }}>
        <select value={period} onChange={e => setPeriod(e.target.value)} style={selStyle}>
          {PERIODS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
        {tab === 'momentum' && (
          <select value={sortKey} onChange={e => setSortKey(e.target.value)} style={selStyle}>
            {SORT_KEYS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        )}
      </div>

      {/* タブ切替 */}
      <div style={{ display:'flex', gap:'4px', marginBottom:'24px',
        background:'var(--bg2)', border:'1px solid var(--border)',
        borderRadius:'8px', padding:'4px', width:'fit-content' }}>
        {[['flow','💹 Fund Flow'],['momentum','📡 Momentum']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{
            padding:'6px 16px', borderRadius:'6px', fontSize:'12px', fontWeight:600,
            cursor:'pointer', border:'none', fontFamily:'var(--font)',
            background: tab === key ? 'var(--accent)' : 'transparent',
            color: tab === key ? '#fff' : 'var(--text3)',
            transition:'all 0.15s',
          }}>
            {label}
          </button>
        ))}
      </div>

      {/* ── Fund Flow ── */}
      {tab === 'flow' && (
        loadingF ? <Loading /> : (
          <>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px' }} className="flow-grid">
              <div>
                <SectionHead title="🔥 資金流入 TOP10" />
                <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
                  {(flowData?.gainers ?? []).map(item => <HBar key={item.theme} item={item} maxAbs={maxAbs} />)}
                </div>
              </div>
              <div>
                <SectionHead title="❄️ 資金流出 TOP10" />
                <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
                  {(flowData?.losers ?? []).map(item => <HBar key={item.theme} item={item} maxAbs={maxAbs} />)}
                </div>
              </div>
            </div>
            <SectionHead title="全テーマ Return一覧" />
            <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
              {allItems.map(item => <HBar key={item.theme} item={item} maxAbs={maxAbs} />)}
            </div>
          </>
        )
      )}

      {/* ── Momentum ── */}
      {tab === 'momentum' && (
        loadingM ? <Loading /> : (
          <>
            {/* ヘッダー行 */}
            <div style={{ ...rowStyle, background:'transparent', border:'none',
              padding:'4px 16px', marginBottom:'4px' }}>
              <span style={hdrStyle}>Theme Name</span>
              <span style={{ ...hdrStyle, textAlign:'right' }}>Return</span>
              <span style={{ ...hdrStyle, textAlign:'right' }}>WoW</span>
              <span style={{ ...hdrStyle, textAlign:'center' }}>Status</span>
            </div>
            {sorted.map((d, i) => (
              <div key={d.theme} style={{
                ...rowStyle,
                animation:`fadeUp 0.3s cubic-bezier(0.22,1,0.36,1) ${i*0.02}s both`,
              }}
                onMouseEnter={e => { e.currentTarget.style.background='#0e1e32'; e.currentTarget.style.borderColor='rgba(74,158,255,0.18)' }}
                onMouseLeave={e => { e.currentTarget.style.background='var(--bg2)'; e.currentTarget.style.borderColor='var(--border)' }}
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
                <span style={{ fontSize:'12px', fontWeight:600, textAlign:'center',
                  color: STATE_COLORS[d.state] ?? 'var(--text2)' }}>
                  {d.state}
                </span>
              </div>
            ))}
            <p style={{ fontSize:'11px', color:'var(--text3)', marginTop:'12px' }}>
              💡 🔥Accel=Return↑&WoW↑ / ❄️Decel=両方↓ / ↗↘=どちらか転換
            </p>
          </>
        )
      )}

      <style>{`
        @media (max-width:768px) { .flow-grid { grid-template-columns:1fr !important; } }
      `}</style>
    </div>
  )
}

function SectionHead({ title }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'12px', margin:'20px 0 10px' }}>
      <span style={{ fontSize:'11px', fontWeight:600, color:'var(--text2)', letterSpacing:'0.1em', textTransform:'uppercase', whiteSpace:'nowrap' }}>{title}</span>
      <div style={{ flex:1, height:'1px', background:'var(--border)' }} />
    </div>
  )
}

const selStyle = {
  background:'var(--bg3)', color:'var(--text)',
  border:'1px solid rgba(74,120,200,0.2)', borderRadius:'6px',
  fontFamily:'var(--font)', fontSize:'13px',
  padding:'6px 12px', cursor:'pointer', outline:'none',
}
const rowStyle = {
  background:'var(--bg2)', border:'1px solid var(--border)',
  borderRadius:'6px', padding:'8px 12px', marginBottom:'2px',
  display:'grid', gridTemplateColumns:'1fr 74px 74px 86px',
  alignItems:'center', gap:'6px', transition:'background 0.12s, border-color 0.12s',
}
const hdrStyle = { fontSize:'10px', fontWeight:600, letterSpacing:'0.1em', color:'var(--text3)', textTransform:'uppercase' }
