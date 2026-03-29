import { useThemes, useMacro } from '../../hooks/useMarketData'

const MACRO_COLORS = ['#ff4560','#ff8c42','#ffd166','#06d6a0','#4a9eff','#aa77ff']

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

function KpiCard({ label, value, sub, arrow, delay=0, loading }) {
  return (
    <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'10px',
      padding:'14px 16px', animation:`fadeUp 0.4s ease ${delay}s both` }}>
      <div style={{ fontSize:'10px', color:'var(--text3)', fontWeight:600, letterSpacing:'0.1em',
        textTransform:'uppercase', marginBottom:'6px' }}>{label}</div>
      <div style={{ fontSize:'20px', fontWeight:700, color:'var(--text)', lineHeight:1.2, marginBottom:'4px' }}>
        {loading ? <Dots /> : value}
      </div>
      {sub && <div style={{ fontSize:'12px', color:'var(--text3)' }}>{sub}</div>}
    </div>
  )
}

function MacroCard({ name, data, color }) {
  if (!data||!data.length) return null
  const last     = data[data.length-1]
  const pctColor = last.pct>=0 ? 'var(--red)' : 'var(--green)'
  const lineColor = color || pctColor
  const vals  = data.map(d=>d.pct)
  const min   = Math.min(...vals), max = Math.max(...vals)
  const W=120, H=44
  const pts = vals.map((v,i)=>`${(i/Math.max(vals.length-1,1))*W},${H-((v-min)/(max-min||0.01))*H}`).join(' ')
  return (
    <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'8px',
      padding:'10px 12px', display:'flex', flexDirection:'column', gap:'6px', minWidth:0 }}>
      <div style={{ fontSize:'10px', color:'var(--text3)', fontWeight:600, letterSpacing:'0.05em',
        overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{name}</div>
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:'8px' }}>
        <div style={{ fontFamily:'var(--mono)', fontSize:'16px', fontWeight:700, color:pctColor, lineHeight:1 }}>
          {last.pct>=0?'+':''}{last.pct.toFixed(1)}%
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ flexShrink:0, display:'block' }}>
          <polyline points={pts} fill="none" stroke={lineColor} strokeWidth="1.8"
            strokeLinejoin="round" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  )
}

function niceScaleTop(yMin, yMax, count=5) {
  if (yMin === yMax) { yMin -= 1; yMax += 1 }
  const range = yMax - yMin
  const rawStep = range / count
  const mag = Math.pow(10, Math.floor(Math.log10(rawStep || 1)))
  const step = mag * ([1,2,2.5,5,10].find(c => c*mag >= rawStep) || 1)
  const nMin = Math.floor(yMin / step) * step
  const nMax = Math.ceil(yMax / step) * step
  const ticks = []
  for (let v = nMin; v <= nMax + step*0.01; v += step)
    ticks.push(Math.round(v*1000)/1000)
  return { ticks, nMin, nMax }
}

function MacroLineChart({ macro }) {
  const names = Object.keys(macro)
  if (!names.length) return null
  const allDates = new Set()
  names.forEach(n => (macro[n] || []).forEach(d => allDates.add(d.date)))
  const dates = [...allDates].sort()
  if (!dates.length) return null
  const W = 800, H = 220, PL = 46, PR = 16, PT = 16, PB = 32

  const scaledData = {}
  names.forEach(n => {
    const data = macro[n] || []
    if (!data.length) return
    const vals = data.map(d => d.pct)
    const dMin = Math.min(...vals), dMax = Math.max(...vals)
    const range = dMax - dMin || 0.01
    scaledData[n] = data.map(d => ({ date:d.date, pct:d.pct, scaled:((d.pct - dMin) / range) * 80 - 40 }))
  })
  const nMin = -45, nMax = 45
  const xS = i => PL + (i / Math.max(dates.length-1, 1)) * (W-PL-PR)
  const yS = v => PT + (1 - (v-nMin)/(nMax-nMin)) * (H-PT-PB)
  const ticks = [-40,-20,0,20,40]
  const xStep = Math.max(1, Math.floor(dates.length / 5))
  const xLabels = []
  for (let i = 0; i < dates.length; i += xStep) xLabels.push({ i, date:dates[i] })

  return (
    <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'14px', overflowX:'auto' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'8px', marginBottom:'14px' }} className="macro-mini-grid">
        {names.map((name, ti) => (
          <MacroCard key={name} name={name} data={macro[name] || []} color={MACRO_COLORS[ti % MACRO_COLORS.length]} />
        ))}
      </div>
      <div style={{ fontSize:'10px', color:'var(--text3)', marginBottom:'6px' }}>
        ▼ Relative trend (each indicator normalized independently)
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display:'block', minWidth:'320px' }}>
        {ticks.map(v => (
          <g key={v}>
            <line x1={PL} y1={yS(v)} x2={W-PR} y2={yS(v)} stroke="rgba(74,120,200,0.07)" strokeWidth="1"/>
            {v === 0 && <line x1={PL} y1={yS(0)} x2={W-PR} y2={yS(0)} stroke="rgba(74,120,200,0.25)" strokeWidth="1" strokeDasharray="4,4"/>}
            <text x={PL-4} y={yS(v)+3} textAnchor="end" fill="var(--text3)" fontSize="8" fontFamily="DM Mono">
              {v > 0 ? `+${v}` : v}
            </text>
          </g>
        ))}
        {xLabels.map(({i, date}) => (
          <text key={date} x={xS(i)} y={H-4} textAnchor="middle" fill="var(--text3)" fontSize="9" fontFamily="DM Sans">
            {date.slice(2,7)}
          </text>
        ))}
        {names.map((name, ti) => {
          const data = scaledData[name] || []
          if (!data.length) return null
          const color = MACRO_COLORS[ti % MACRO_COLORS.length]
          const pts = data.map(d => {
            const xi = dates.indexOf(d.date)
            return xi >= 0 ? `${xS(xi)},${yS(d.scaled)}` : null
          }).filter(Boolean)
          return pts.length ? (
            <polyline key={name} points={pts.join(' ')} fill="none"
              stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" opacity="0.85"/>
          ) : null
        })}
      </svg>
      <div style={{ display:'flex', flexWrap:'wrap', gap:'10px', marginTop:'8px' }}>
        {names.map((name, ti) => {
          const data = macro[name] || []
          const last = data[data.length-1]
          const color = MACRO_COLORS[ti % MACRO_COLORS.length]
          return (
            <div key={name} style={{ display:'flex', alignItems:'center', gap:'5px' }}>
              <div style={{ width:'14px', height:'2px', background:color, borderRadius:'1px' }} />
              <span style={{ fontSize:'11px', color:'var(--text2)' }}>{name}</span>
              {last && (
                <span style={{ fontSize:'11px', fontFamily:'var(--mono)', color, fontWeight:700 }}>
                  {last.pct >= 0 ? '+' : ''}{last.pct.toFixed(1)}%
                </span>
              )}
            </div>
          )
        })}
      </div>
      <div style={{ fontSize:'10px', color:'var(--text3)', marginTop:'6px' }}>
        ※ ETF-based indicators. Y-axis shows normalized relative values (see cards for actual % change)
      </div>
    </div>
  )
}

function SHead({ title }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'10px', margin:'20px 0 12px' }}>
      <span style={{ fontSize:'12px', fontWeight:700, color:'var(--text2)', letterSpacing:'0.06em',
        textTransform:'uppercase', whiteSpace:'nowrap' }}>{title}</span>
      <div style={{ flex:1, height:'1px', background:'var(--border)' }}/>
    </div>
  )
}

export default function TopPage({ onNavigate }) {
  const { data: themes,   loading: loadingT } = useThemes('1mo')
  const { data: macroRaw, loading: loadingM } = useMacro('1mo')
  const macro   = macroRaw?.data || {}
  const loading = loadingT || loadingM

  const summary = themes?.summary
  const s = summary

  return (
    <div style={{ padding:'20px 32px 48px' }}>
      {/* Hero */}
      <div style={{ marginBottom:'28px' }}>
        <h1 style={{ fontSize:'26px', fontWeight:700, color:'#ffffff', letterSpacing:'-0.02em', marginBottom:'6px', lineHeight:1.2 }}>
          <span style={{ color:'#e63030' }}>Stock</span>Wave<span style={{ color:'#e63030', fontSize:'18px' }}>JP</span>
        </h1>
        <p className="hero-desc" style={{ fontSize:'13px', color:'var(--text3)' }}>
          Japan Stock Theme Tracker — Real-time analysis of sector trends, fund flows & momentum
        </p>
      </div>

      {/* KPI */}
      <SHead title="📊 Market Summary (1 Month)" />
      {loading ? (
        <div style={{ color:'var(--text3)', fontSize:'13px', padding:'12px 0' }}><Dots /></div>
      ) : (
        <div className="responsive-grid-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'4px' }}>
          <KpiCard delay={0}   loading={loading} label="Rising Themes"
            value={<span style={{ color:'var(--red)',   fontWeight:700 }}>{s?.rise ?? '-'}<span style={{ fontSize:'14px' }}> themes</span></span>}
            sub={`${s?.total ?? '-'} total themes`}/>
          <KpiCard delay={0.1} loading={loading} label="Avg Return"
            value={<span style={{ color: (s?.avg??0)>=0?'var(--red)':'var(--green)', fontWeight:700 }}>
              {s?.avg!=null ? `${s.avg>=0?'+':''}${s.avg.toFixed(1)}%` : '-'}
            </span>}
            sub="All themes average"/>
          <KpiCard delay={0.15} loading={loading} label="Top Inflow"
            value={<span style={{ fontSize:'14px', color:'var(--red)', fontWeight:700 }}>{s?.top?.theme||'-'}</span>}
            arrow="up"
            sub={s?.top?<span style={{ color:'var(--red)', fontWeight:600 }}>+{s.top.pct.toFixed(1)}%</span>:'-'}/>
          <KpiCard delay={0.2} loading={loading} label="Top Outflow"
            value={<span style={{ fontSize:'14px', color:'var(--green)', fontWeight:700 }}>{s?.bot?.theme||'-'}</span>}
            arrow="down"
            sub={s?.bot?<span style={{ color:'var(--green)', fontWeight:600 }}>{s.bot.pct.toFixed(1)}%</span>:'-'}/>
        </div>
      )}

      {/* Market Indicators */}
      <SHead title="📈 Market Indicators & Comparison (1 Month)" />
      {loading ? (
        <div style={{ color:'var(--text3)', fontSize:'13px', padding:'12px 0' }}><Dots /></div>
      ) : (
        <MacroLineChart macro={macro} />
      )}

      <style>{`
        .hero-desc { white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .macro-mini-grid { grid-template-columns: repeat(3, 1fr) !important; }
        @media (max-width:900px) {
          .hero-desc { white-space:normal !important; overflow:visible !important; text-overflow:unset !important; }
        }
        @media (max-width:640px) {
          .responsive-grid-2 { grid-template-columns: 1fr !important; }
          .macro-mini-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}
