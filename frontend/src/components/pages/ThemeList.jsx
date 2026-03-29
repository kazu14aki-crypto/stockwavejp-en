import { useState } from 'react'
import { useThemes } from '../../hooks/useMarketData'

const PERIODS = [
  { label:'1W', value:'5d' },{ label:'1M', value:'1mo' },
  { label:'3M', value:'3mo' },{ label:'6M', value:'6mo' },{ label:'1Y', value:'1y' },
]

function fmt(n) {
  if (!n) return '0'
  if (n >= 1e12) return (n/1e12).toFixed(1)+'T'
  if (n >= 1e9)  return (n/1e9).toFixed(1)+'B'
  if (n >= 1e6)  return (n/1e6).toFixed(1)+'M'
  if (n >= 1e3)  return (n/1e3).toFixed(1)+'K'
  return n.toLocaleString()
}

function Dots() {
  return (
    <span style={{ display:'inline-flex', gap:'4px', alignItems:'center' }}>
      {[0,0.15,0.3].map((d,i)=>(
        <span key={i} style={{ display:'inline-block', width:'5px', height:'5px', borderRadius:'50%',
          background:'var(--accent)', animation:`pulse 1.2s ease-in-out ${d}s infinite` }}/>
      ))}
    </span>
  )
}

function Top5Bar({ items, title, colorFn, emptyMsg }) {
  if (!items?.length) return (
    <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'8px',
      padding:'14px', textAlign:'center', color:'var(--text3)', fontSize:'12px' }}>
      <div style={{ fontSize:'11px', fontWeight:700, color:'var(--text)', marginBottom:'6px' }}>{title}</div>
      {emptyMsg}
    </div>
  )
  const maxAbs = Math.max(...items.map(s => Math.abs(s.pct)), 0.01)
  return (
    <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'8px', padding:'12px 14px' }}>
      <div style={{ fontSize:'11px', fontWeight:700, color:'var(--text)', marginBottom:'10px' }}>{title}</div>
      <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
        {items.map((s, i) => {
          const c = colorFn(s.pct)
          const w = Math.abs(s.pct) / maxAbs * 100
          return (
            <div key={s.theme} style={{ display:'grid', gridTemplateColumns:'120px 1fr 64px', alignItems:'center', gap:'8px' }}>
              <span style={{ fontSize:'11px', color:'var(--text2)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', textAlign:'right' }}>
                {s.theme}
              </span>
              <div style={{ height:'12px', background:'rgba(255,255,255,0.04)', borderRadius:'3px', overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${w}%`, background:c, borderRadius:'3px', opacity:0.85 }} />
              </div>
              <span style={{ fontFamily:'var(--mono)', fontSize:'11px', fontWeight:700, textAlign:'right', color:c, whiteSpace:'nowrap' }}>
                {s.pct>=0?'+':''}{s.pct.toFixed(1)}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function AllThemesBar({ themes }) {
  if (!themes?.length) return null
  const maxAbs = Math.max(...themes.map(t => Math.abs(t.pct)), 0.01)
  const pctColor = v => v >= 0 ? 'var(--red)' : 'var(--green)'
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
      {themes.map((t, i) => {
        const c = pctColor(t.pct)
        const w = Math.abs(t.pct) / maxAbs * 100
        return (
          <div key={t.theme} style={{ display:'grid', gridTemplateColumns:'130px 1fr 70px 80px 90px',
            alignItems:'center', gap:'8px', padding:'5px 0',
            borderBottom:'1px solid rgba(255,255,255,0.03)',
            animation:`fadeUp 0.3s ease ${i*0.02}s both` }}>
            <span style={{ fontSize:'12px', color:'var(--text2)', textAlign:'right',
              overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
              {i+1}. {t.theme}
            </span>
            <div style={{ height:'14px', background:'rgba(255,255,255,0.04)', borderRadius:'3px', overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${w}%`, background:c, borderRadius:'3px', opacity:0.8 }} />
            </div>
            <span style={{ fontFamily:'var(--mono)', fontSize:'12px', fontWeight:700, color:c, textAlign:'right', whiteSpace:'nowrap' }}>
              {t.pct>=0?'+':''}{t.pct.toFixed(1)}%
            </span>
            <span style={{ fontSize:'10px', color:'var(--text3)', textAlign:'right', fontFamily:'var(--mono)' }}>
              {fmt(t.volume)}
            </span>
            <span style={{ fontSize:'10px', color:'var(--text3)', textAlign:'right', fontFamily:'var(--mono)' }}>
              ¥{fmt(t.trade_value)}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default function ThemeList() {
  const [period,   setPeriod]   = useState('1mo')
  const [viewMode, setViewMode] = useState('return')
  const { data, loading } = useThemes(period)

  const themes  = data?.themes || []
  const summary = data?.summary
  const pctColor = v => v >= 0 ? 'var(--red)' : 'var(--green)'

  const top5 = [...themes].filter(t => t.pct > 0).slice(0, 5)
  const bot5 = [...themes].sort((a,b) => a.pct - b.pct).filter(t => t.pct < 0).slice(0, 5)
  const vol5 = [...themes].sort((a,b) => b.volume - a.volume).slice(0, 5)
  const tv5  = [...themes].sort((a,b) => b.trade_value - a.trade_value).slice(0, 5)

  return (
    <div style={{ padding:'20px 32px 48px' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px', flexWrap:'wrap', gap:'10px' }}>
        <div>
          <h1 style={{ fontSize:'22px', fontWeight:700, color:'var(--text)', marginBottom:'2px' }}>Theme List</h1>
          <p style={{ fontSize:'12px', color:'var(--text3)' }}>Japan stock themes — return rate, volume & trading value ranking</p>
        </div>
        <div style={{ display:'flex', gap:'4px' }}>
          {PERIODS.map(p => (
            <button key={p.value} onClick={() => setPeriod(p.value)} style={{
              padding:'5px 12px', borderRadius:'6px', fontSize:'12px', cursor:'pointer',
              fontFamily:'var(--font)', fontWeight: period===p.value ? 700 : 400,
              border: period===p.value ? '1px solid var(--accent)' : '1px solid var(--border)',
              background: period===p.value ? 'rgba(74,158,255,0.12)' : 'transparent',
              color: period===p.value ? 'var(--accent)' : 'var(--text2)',
            }}>{p.label}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ padding:'40px', textAlign:'center' }}><Dots /></div>
      ) : (
        <>
          {/* Summary KPI */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'10px', marginBottom:'24px' }} className="kpi-grid">
            {[
              { label:'Rising Themes', value:`${summary?.rise??'-'} / ${summary?.total??'-'}` },
              { label:'Avg Return',    value:`${(summary?.avg??0)>=0?'+':''}${summary?.avg?.toFixed(1)??'-'}%`, color:(summary?.avg??0)>=0?'var(--red)':'var(--green)' },
              { label:'Top Inflow',    value:summary?.top?.theme??'-', sub:`+${summary?.top?.pct?.toFixed(1)??0}%`, subColor:'var(--red)' },
              { label:'Top Outflow',   value:summary?.bot?.theme??'-', sub:`${summary?.bot?.pct?.toFixed(1)??0}%`,  subColor:'var(--green)' },
            ].map(({ label, value, color, sub, subColor }, i) => (
              <div key={i} style={{ background:'var(--bg2)', border:'1px solid var(--border)',
                borderRadius:'10px', padding:'12px 14px' }}>
                <div style={{ fontSize:'10px', color:'var(--text3)', fontWeight:600, letterSpacing:'0.1em',
                  textTransform:'uppercase', marginBottom:'6px' }}>{label}</div>
                <div style={{ fontSize:'15px', fontWeight:700, color: color||'var(--text)' }}>{value}</div>
                {sub && <div style={{ fontSize:'11px', color: subColor||'var(--text3)', marginTop:'2px' }}>{sub}</div>}
              </div>
            ))}
          </div>

          {/* TOP5 charts */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px', marginBottom:'24px' }} className="top5-grid">
            <Top5Bar items={top5} title={`▲ Top Rising (${themes.filter(t=>t.pct>0).length} rising)`} colorFn={pctColor} emptyMsg="No rising themes"/>
            <Top5Bar items={bot5} title={`▼ Top Falling (${themes.filter(t=>t.pct<0).length} falling)`} colorFn={pctColor} emptyMsg="No falling themes"/>
            <Top5Bar items={vol5.map(t=>({...t, pct:t.volume}))} title="🔊 Top Volume" colorFn={()=>'var(--accent)'} emptyMsg="No data"/>
            <Top5Bar items={tv5.map(t=>({...t, pct:t.trade_value}))} title="💴 Top Trading Value" colorFn={()=>'var(--accent)'} emptyMsg="No data"/>
          </div>

          {/* All Themes */}
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'10px', padding:'16px 20px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px' }}>
              <span style={{ fontSize:'13px', fontWeight:700, color:'var(--text)' }}>
                All Themes Ranking
              </span>
              <div style={{ fontSize:'10px', color:'var(--text3)', display:'flex', gap:'16px', fontFamily:'var(--mono)' }}>
                <span style={{ minWidth:'70px', textAlign:'right' }}>Return</span>
                <span style={{ minWidth:'80px', textAlign:'right' }}>Volume</span>
                <span style={{ minWidth:'90px', textAlign:'right' }}>Trading Value</span>
              </div>
            </div>
            <AllThemesBar themes={themes} />
          </div>
        </>
      )}
      <style>{`
        @media (max-width:768px) {
          .kpi-grid   { grid-template-columns: 1fr 1fr !important; }
          .top5-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
