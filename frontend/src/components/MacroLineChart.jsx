// MacroLineChart.jsx - macro indicator chart
import { useState } from 'react'

// Japanese to English label translation
const MACRO_LABELS = {
  '国内主要株(1321)':           'Nikkei225 ETF (1321)',
  'TOPIX連動型上場投信(1306)':   'TOPIX ETF (1306)',
  'S&P500 ETF(SPY)':             'S&P500 ETF (SPY)',
  'ドル円':                       'USD/JPY',
  '米ドル円':                     'USD/JPY',
  '米国ハイテク株100(QQQ)':       'US Tech 100 (QQQ)',
  '日経225':                      'Nikkei 225',
  '日経平均':                     'Nikkei 225',
  'TOPIX':                        'TOPIX',
  'S&P500':                       'S&P500',
  'QQQ':                          'US Tech 100 (QQQ)',
  '金':                            'Gold',
  '金(1540)':                     'Gold ETF (1540)',
  'VIX':                          'VIX',
  'VIX(恐怖指数)':                'VIX (Fear Index)',
  '原油':                          'Crude Oil',
  '原油(1699)':                   'Crude Oil ETF (1699)',
  '長期国債':                     'JGB Long-term',
  '長期国債(2621)':               'JGB Long-term ETF (2621)',
  '長期国債ETF(2621)':            'JGB Long-term ETF (2621)',
  '米国株':                       'S&P500 ETF',
  '米国株(2558)':                 'S&P500 ETF (US)',
  '米国株ETF(2558)':              'S&P500 ETF (US)',
  '米国債(2647)':                 'US Treasury ETF (2647)',
  '東証REIT(1343)':               'J-REIT ETF (1343)',
}
const ml = (name) => MACRO_LABELS[name] || name

export const MACRO_COLORS = ['#ff4560','#ff8c42','#ffd166','#06d6a0','#4a9eff','#aa77ff']

// niceScale

export function MacroCard({ name, data, color }) {
  if (!data||!data.length) return null
  const last  = data[data.length-1]
  const pctColor = last.pct>=0 ? 'var(--red)' : 'var(--green)'
  const lineColor = color || pctColor
  const vals  = data.map(d=>d.pct)
  const min   = Math.min(...vals), max = Math.max(...vals)
  const W=120, H=44
  const pts = vals.map((v,i)=>`${2+(i/Math.max(vals.length-1,1))*(W-4)},${2+(1-((v-min)/(max-min||0.01)))*(H-4)}`).join(' ')
  return (
    <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'8px',
      padding:'10px 12px', display:'flex', flexDirection:'column', gap:'6px', minWidth:0 }}>
      <div style={{ fontSize:'10px', color:'var(--text3)', fontWeight:600, letterSpacing:'0.05em',
        overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{ml(name)}</div>
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:'8px' }}>
        <div style={{ fontFamily:'var(--mono)', fontSize:'16px', fontWeight:700, color:pctColor, lineHeight:1 }}>
          {last.pct>=0?'+':''}{last.pct.toFixed(1)}%
        </div>
        <div style={{ width:`${W}px`, height:`${H}px`, flexShrink:0, overflow:'hidden', maxWidth:'45%' }}>
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display:'block', overflow:'hidden' }}>
            <polyline points={pts} fill="none" stroke={lineColor} strokeWidth="1.8"
              strokeLinejoin="round" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export function niceScaleTop(yMin, yMax, count=5) {
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

export default function MacroLineChart({ macro }) {
  const names = Object.keys(macro)
  if (!names.length) return null

  const allDates = new Set()
  names.forEach(n => (macro[n] || []).forEach(d => allDates.add(d.date)))
  const dates = [...allDates].sort()
  if (!dates.length) return null

  const W = 800, H = 160, PL = 46, PR = 16, PT = 12, PB = 28

  // Normalize each metric independently（0基準→期間内の相対変化を均等表示）
  // Y-axis: relative return（各指標の期間内変化幅を揃える）」
  const scaledData = {}
  names.forEach(n => {
    const data = macro[n] || []
    if (!data.length) return
    const vals = data.map(d => d.pct)
    const dataMin = Math.min(...vals)
    const dataMax = Math.max(...vals)
    const range = dataMax - dataMin || 0.01
    // 各指標を-50〜+50の共通レンジに正規化して表示
    scaledData[n] = data.map(d => ({
      date: d.date,
      pct: d.pct,  // actual % for legend display
      scaled: ((d.pct - dataMin) / range) * 80 - 40  // normalize to -40 to +40
    }))
  })

  // 正規化後のスケール（固定 -50〜+50）
  const nMin = -45, nMax = 45
  const xS = i => PL + (i / Math.max(dates.length-1, 1)) * (W-PL-PR)
  const yS = v => PT + (1 - (v-nMin)/(nMax-nMin)) * (H-PT-PB)

  // Y軸ラベル（相対変化を示す）
  const ticks = [-40, -20, 0, 20, 40]

  const xStep = Math.max(1, Math.floor(dates.length / 5))
  const xLabels = []
  for (let i = 0; i < dates.length; i += xStep) xLabels.push({ i, date: dates[i] })

  return (
    <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'14px', overflowX:'auto' }}>
      {/* Mini chart cards (actual return per metric) */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'8px', marginBottom:'14px' }} className="macro-mini-grid">
        {names.map((name, ti) => (
          <MacroCard key={name} name={name} data={macro[name] || []} color={MACRO_COLORS[ti % MACRO_COLORS.length]} />
        ))}
      </div>

      {/* Line chart (relative change with equal scale) */}
      <div style={{ fontSize:'10px', color:'var(--text3)', marginBottom:'6px' }}>
        ▼ Relative trend over period (each metric normalized to equal amplitude)
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display:'block', minWidth:'320px' }}>
        {ticks.map(v => (
          <g key={v}>
            <line x1={PL} y1={yS(v)} x2={W-PR} y2={yS(v)} stroke="rgba(74,120,200,0.07)" strokeWidth="1"/>
            {v === 0 && (
              <line x1={PL} y1={yS(0)} x2={W-PR} y2={yS(0)} stroke="rgba(74,120,200,0.25)" strokeWidth="1" strokeDasharray="4,4"/>
            )}
            <text x={PL-4} y={yS(v)+3} textAnchor="end" fill="var(--text3)" fontSize="8" fontFamily="DM Mono">
              {v > 0 ? `+${v}` : v}
            </text>
          </g>
        ))}
        {xLabels.map(({i, date}) => (
          <text key={date} x={xS(i)} y={H-4} textAnchor="middle" fill="var(--text3)" fontSize="9" fontFamily="DM Sans">
            {fmtDate(date)}
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
              stroke={color} strokeWidth="2"
              strokeLinejoin="round" strokeLinecap="round" opacity="0.85"/>
          ) : null
        })}
      </svg>
      {/* Legend */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:'10px', marginTop:'8px' }}>
        {names.map((name, ti) => {
          const data = macro[name] || []
          const last = data[data.length-1]
          const color = MACRO_COLORS[ti % MACRO_COLORS.length]
          return (
            <div key={name} style={{ display:'flex', alignItems:'center', gap:'5px' }}>
              <div style={{ width:'14px', height:'2px', background:color, borderRadius:'1px' }} />
              <span style={{ fontSize:'11px', color:'var(--text2)' }}>{ml(name)}</span>
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
        * ETF-based proprietary index. Y-axis = normalized relative amplitude. Actual returns shown in cards above.
      </div>
    </div>
  )
}

export function SHead({ title }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'10px', margin:'20px 0 12px' }}>
      <span style={{ fontSize:'12px', fontWeight:700, color:'var(--text2)', letterSpacing:'0.06em', textTransform:'uppercase', whiteSpace:'nowrap' }}>{title}</span>
      <div style={{ flex:1, height:'1px', background:'var(--border)' }}/>
    </div>
  )
}

// 横軸日付フォーマット：日付の重複を避けるためユニーク表示
function fmtDate(dateStr) {
  if (!dateStr) return ''
  // 'YYYY-MM-DD' または 'YYYY/MM/DD' 形式に対応
  const sep = dateStr.includes('-') ? '-' : '/'
  const parts = dateStr.split(sep)
  if (parts.length < 3) return dateStr
  const y = parts[0].slice(2) // '26'
  const m = parts[1]          // '03'
  const d = parts[2]          // '28'
  return `${y}.${m}/${d}`
}
