import { useState } from 'react'
import { tn } from '../../utils/themeNames'
import { useThemes, useMacro } from '../../hooks/useMarketData'
import MacroLineChart, { MacroCard, SHead } from '../MacroLineChart'

const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

const THEME_ARTICLE_MAP = {
  'Semiconductor Equipment':    'semiconductor-theme',
  'Semiconductor Testing':    'semiconductor-theme',
  'Semiconductor Materials':        'semiconductor-theme',
  'Memory':            'semiconductor-theme',
  'Power Semiconductor':      'power-semiconductor',
  'Next-Gen Semiconductor':      'semiconductor-theme',
  'Generative AI':            'ai-cloud-theme',
  'AI Datacenter':  'ai-cloud-theme',
  'Physical AI':      'physical-ai-edge-ai',
  'AI Semiconductor':          'semiconductor-theme',
  'AI Talent':            'education-hr-theme',
  'Edge AI':          'physical-ai-edge-ai',
  'EV / Electric Vehicles':    'ev-green-theme',
  'All-Solid-State Battery':        'ev-green-theme',
  'Autonomous Driving':          'ev-green-theme',
  'Drones':          'drone-theme',
  'Transport & Logistics':        'transport-logistics-theme',
  'Shipbuilding':              'shipbuilding-theme',
  'Renewable Energy':'renewable-energy-theme',
  'Solar Power':        'renewable-energy-theme',
  'Nuclear Fusion':        'renewable-energy-theme',
  'Nuclear Power':        'renewable-energy-theme',
  'Electric Utilities':          'renewable-energy-theme',
  'LNG':               'inpex-analysis',
  'Oil & Gas':              'inpex-analysis',
  'Energy Storage':            'ev-green-theme',
  'Resources (H2/Helium/Water)': 'rare-earth-resources-theme',
  'IOWN':              'optical-communication',
  'Optical Fiber & Components':            'optical-communication',
  'Telecom':              'telecom-theme',
  'Quantum Computing':'ai-cloud-theme',
  'SaaS':              'fintech-theme',
  'Wearables':  'game-entertainment-theme',
  'Crypto / Virtual Currency':          'fintech-theme',
  'Digital Banking':        'banking-finance-theme',
  'Steel & Materials':        'steel-materials-theme',
  'Chemicals':              'chemical-theme',
  'Building Materials':          'construction-infra-theme',
  'Paints & Coatings':              'chemical-theme',
  'Pharma & Biotech':    'pharma-bio-theme',
  'Healthcare & Nursing':  'healthcare-nursing-theme',
  'Pharmacy / Drug Store': 'healthcare-nursing-theme',
  'Banking / Finance':        'banking-finance-theme',
  'Regional Banks':          'regional-bank-theme',
  'Insurance':              'insurance-theme',
  'Fintech':      'fintech-theme',
  'Real Estate':            'real-estate-theme',
  'Construction & Infra':    'construction-infra-theme',
  'National Resilience':    'national-resilience',
  'Water Infrastructure':            'construction-infra-theme',
  'Food & Beverage':        'food-beverage-theme',
  'Agritech & Foodtech':'agritech-foodtech-theme',
  'Retail & E-Commerce':          'retail-ec-theme',
  'Tourism & Hotels': 'tourism-hotel-theme',
  'Inbound Tourism':      'inbound-theme',
  'Resale / Second-hand':  'retail-ec-theme',
  'Defense & Aerospace':        'defense-theme',
  'Space & Satellite':        'space-satellite-theme',
  'Robotics & Automation':  'robot-automation-theme',
  'Rare Earth & Resources':  'rare-earth-resources-theme',
  'Buffett Picks':    'sogo-shosha-analysis',
  'Cyber Security': 'cybersecurity-theme',
  'Security Services':              'cybersecurity-theme',
  'Decarbonization / ESG':       'ev-green-theme',
  'Education & HR':    'education-hr-theme',
  'Staffing / HR':          'education-hr-theme',
  'Gaming & Entertainment':  'game-entertainment-theme',
}

const ALL_NEWS = [
  { date:'2026/05/29', tag:'NEW',    title:'MLCC Theme Added & Murata/MLCC Column Articles Published' },
  { date:'2026/05/29', tag:'NEW',    title:'Weekly Report (May 25-29) Published' },
  { date:'2026/05/22', tag:'NEW',    title:'Weekly Report (May 18-22) Published' },
  { date:'2026/05/19', tag:'NEW',    title:'Institutional Holdings Page Added' },
  { date:'2026/05/18', tag:'UPDATE', title:'Custom Themes: Cost Basis & P&L Tracking Added' },
  { date:'2026/05/15', tag:'NEW',    title:'Weekly Report (May 11-15) Published' },
  { date:'2026/05/08', tag:'NEW',    title:'Weekly Report (May 4-8) Published' },
  { date:'2026/03/14', tag:'NEW',    title:'StockWaveJP React Version Launched' },
]
// Sort descending, show latest 3 items
const NEWS_LIST = [...ALL_NEWS].sort((a,b) => b.date.localeCompare(a.date)).slice(0,3)
const TAG_COLORS = {
  'NEW':    { bg:'rgba(255,83,112,0.15)', color:'var(--red)',    border:'rgba(255,83,112,0.3)' },
  'UPDATE': { bg:'rgba(91,156,246,0.12)', color:'var(--accent)', border:'rgba(91,156,246,0.25)' },
  'INFO':   { bg:'rgba(76,175,130,0.12)', color:'var(--green)',  border:'rgba(76,175,130,0.25)' },
}

// ── Auto-generate market commentary ──
function AutoComment({ lines }) {
  // Defensive: handle null/undefined/empty/string
  let safeLines = lines
  if (!safeLines) return null
  if (typeof safeLines === 'string') safeLines = safeLines.split('\n').filter(Boolean)
  if (!Array.isArray(safeLines) || !safeLines.length) return null

  const rendered = safeLines.map((line, i) => {
    if (typeof line !== 'string') return null
    if (line.startsWith('【')) {
      const e = line.indexOf('】')
      if (e < 0) return <div key={i} style={{ fontSize:'12px', color:'var(--text2)', lineHeight:'1.8', marginBottom:'4px', paddingLeft:'4px' }}>{line}</div>
      const h = line.slice(1, e), r = line.slice(e + 1).trim()
      return (
        <div key={i} style={{ marginBottom:'10px', marginTop: i > 0 ? '14px' : '0' }}>
          <div style={{ fontSize:'11px', fontWeight:700, color:'var(--accent)', letterSpacing:'0.04em', marginBottom:'4px', borderLeft:'3px solid var(--accent)', paddingLeft:'8px' }}>{h}</div>
          {r && <div style={{ fontSize:'12px', color:'var(--text2)', lineHeight:'1.8', paddingLeft:'11px' }}>{r}</div>}
        </div>
      )
    }
    const icons = ['▲','▼','📊','🔥','❄️','↗','↘','💡','✅','⚠️','📉']
    if (icons.some(ic => line.startsWith(ic))) {
      const si = line.indexOf(' '), icon = si > 0 ? line.slice(0, si) : line[0]
      const text = si > 0 ? line.slice(si + 1) : ''
      const ci = text.indexOf('：'), label = ci > 0 ? text.slice(0, ci) : null, body = ci > 0 ? text.slice(ci + 1).trim() : text
      return (
        <div key={i} style={{ display:'flex', gap:'8px', marginBottom:'7px', paddingLeft:'4px', alignItems:'flex-start' }}>
          <span style={{ fontSize:'13px', flexShrink:0, marginTop:'1px', lineHeight:1.5 }}>{icon}</span>
          <div style={{ fontSize:'12px', color:'var(--text2)', lineHeight:'1.8', flex:1 }}>
            {label && <span style={{ fontWeight:600, color:'var(--text)' }}>{label}：</span>}{body}
          </div>
        </div>
      )
    }
    return <div key={i} style={{ fontSize:'12px', color:'var(--text2)', lineHeight:'1.8', marginBottom:'4px', paddingLeft:'4px' }}>{line}</div>
  }).filter(Boolean)

  return (
    <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'10px', padding:'16px 18px', marginBottom:'20px' }}>
      {rendered}
    </div>
  )
}

function generateMarketComment(themeData, macro) {
  if (!themeData || !themeData.themes) return null
  const s = themeData.summary
  if (!s) return null
  const t = themeData.themes

  const riseCount = s.rise
  const fallCount = s.fall
  const total     = s.total
  const avg       = s.avg ?? 0

  // 市場全体の状態
  const mktState = riseCount >= total*0.7 ? 'broad rally' :
                   riseCount >= total*0.55 ? 'mostly rising' :
                   fallCount >= total*0.7  ? 'broad decline' :
                   fallCount >= total*0.55 ? 'mostly falling' : 'mixed market'

  const top3 = [...t].sort((a,b)=>b.pct-a.pct).slice(0,3)
  const bot3 = [...t].sort((a,b)=>a.pct-b.pct).slice(0,3)
  const volUp = [...t].filter(x=>(x.volume_chg||0)>20).sort((a,b)=>(b.volume_chg||0)-(a.volume_chg||0)).slice(0,3)
  const hotThemes  = t.filter(x=>x.pct>=5)
  const coldThemes = t.filter(x=>x.pct<=-5)

  // マクロ情報
  const macroKeys = macro ? Object.keys(macro) : []
  const nikkei = macro?.['国内主要株(1321)'] || macro?.['Nikkei225 ETF (1321)'] || macro?.['Nikkei225 ETF: (1321)']
  const topix  = macro?.['TOPIX連動型上場投信(1306)'] || macro?.['TOPIX ETF (1306)'] || macro?.['1306.T']
  const sp500  = macro?.['S&P500 ETF(SPY)']
  const usdjpy = macro?.['USD/JPY: ']
  const lastNK = nikkei ? nikkei[nikkei.length-1]?.pct : null
  const lastTP = topix  ? topix[topix.length-1]?.pct  : null
  const lastSP = sp500  ? sp500[sp500.length-1]?.pct  : null
  const lastFX = usdjpy ? usdjpy[usdjpy.length-1]?.pct : null

  const lines = []

  // 全体概況
  lines.push(`[Market Overview] Current Japanese theme market: ${mktState}. ${riseCount} Rising / ${fallCount} Falling (avg return ${avg>=0?'+':''}${avg.toFixed(2)}%).${hotThemes.length>0?` ${hotThemes.length} theme(s) surged 5%+.`:''}${coldThemes.length>0?` ${coldThemes.length} theme(s) fell 5%+.`:''}`)

  // マクロ環境
  if (lastNK != null || lastSP != null) {
    const macroLine = [
      lastNK != null ? `Nikkei225 ETF: ${lastNK>=0?'+':''}${lastNK.toFixed(1)}%` : null,
      lastTP != null ? `TOPIX ETF: ${lastTP>=0?'+':''}${lastTP.toFixed(1)}%` : null,
      lastSP != null ? `S&P500 ${lastSP>=0?'+':''}${lastSP.toFixed(1)}%` : null,
      lastFX != null ? `USD/JPY: ${lastFX>=0?'+':''}${lastFX.toFixed(1)}%` : null,
    ].filter(Boolean).join(' / ')
    const riskMode = lastSP != null ? (lastSP > 1 ? 'Risk-on (US stocks rising) — tailwind for theme stocks. ' : lastSP < -1 ? 'Risk-off (US stocks falling) — defensive positioning recommended. ' : 'Macro neutral — technical and theme factors likely dominate. ') : ''
    lines.push(`[Macro Indicators] ${macroLine}. ${riskMode}${lastFX != null ? (lastFX > 1 ? 'JPY weakening — tailwind for exporters. ' : lastFX < -1 ? 'JPY strengthening — focus on importers. ' : '') : ''}`)
  }

  // risingTheme
  if (top3.length && top3[0].pct > 0) {
    const upNames = top3.filter(x=>x.pct>0).map(x=>`'${tn(x.theme)}'(${x.pct>=0?'+':''}${x.pct.toFixed(1)}%)`).join('、')
    lines.push(`▲ Notable Rising themes: ${upNames}.${volUp.length>0&&top3.some(top=>volUp.some(v=>v.theme===top.theme)) ? ' Volume surge concurrent with rising — particularly noteworthy.' : ''}`)
  }

  // fallingTheme
  if (bot3.length && bot3[0].pct < 0) {
    const dnNames = bot3.filter(x=>x.pct<0).map(x=>`'${tn(x.theme)}'(${x.pct.toFixed(1)}%)`).join(", ")
    lines.push(`▼ Notable Falling themes: ${dnNames}. ${coldThemes.length>3?'Broad selling pressure — selective theme approach recommended.':'Sharp declines — possible overheating correction or external pressure.'}`)
  }

  // Volume増加Theme
  if (volUp.length > 0) {
    lines.push(`📊 Volume surging 20%+: ${volUp.map(x=>tn(x.theme)).join(', ')}. Rising volume often leads price moves — a key signal for tracking potential breakouts.`)
  }

  // Volume急増かつrisingTheme → 特に注目
  const hotWithVol = hotThemes.filter(h => volUp.some(v => v.theme === h.theme))
  if (hotWithVol.length > 0) {
    lines.push(`🔥 Surging + Volume spike: ${hotWithVol.map(t=>tn(t.theme)).join(', ')}. Price rise + volume surge simultaneously — possible early stage of a strong trend.`)
  }

  // falling幅が大きいがVolumeも増加（底値模索か）
  const coldWithVolUp = coldThemes.filter(h => volUp.some(v => v.theme === h.theme))
  if (coldWithVolUp.length > 0) {
    lines.push(`📉 Falling themes with rising volume: ${coldWithVolUp.map(t=>tn(t.theme)).join(', ')}. Strong selling pressure, but volume increase may signal potential bottom reversal.`)
  }

  lines.push(`💡 Today's point: ${avg >= 2 ? 'Strong broad environment — concentration in bullish themes tends to work well.' : avg <= -2 ? 'Weak broad environment — focus on defensive plays and higher cash levels.' : 'Mixed environment — theme rotation and stock selection are key.'}`)

  return lines
}


function Dots() {
  return (
    <span style={{ display:'inline-flex', gap:'3px', alignItems:'center' }}>
      {[0,0.15,0.3].map((d,i)=>(
        <span key={i} style={{ display:'inline-block', width:'5px', height:'5px', borderRadius:'50%',
          background:'var(--accent)', animation:`pulse 1.2s ease-in-out ${d}s infinite` }}/>
      ))}
    </span>
  )
}

function KpiCard({ label, value, valueColor, sub, delay=0, loading=false, arrow=null }) {
  const ArrowIcon = () => {
    if (!arrow) return null
    return (
      <span style={{
        fontSize:'18px', marginLeft:'4px', lineHeight:1,
        color: arrow === 'up' ? 'var(--red)' : 'var(--green)',
        display:'inline-block',
      }}>
        {arrow === 'up' ? '↗' : '↘'}
      </span>
    )
  }
  return (
    <div style={{
      background:'var(--bg2)', border:'1px solid var(--border)',
      borderRadius:'var(--radius)', padding:'16px 18px',
      animation:`fadeUp 0.4s ease ${delay}s both`,
      transition:'border-color 0.2s, transform 0.15s',
    }}
      onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(91,156,246,0.3)';e.currentTarget.style.transform='translateY(-2px)'}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='translateY(0)'}}
    >
      <div style={{ fontSize:'10px', fontWeight:600, letterSpacing:'0.1em', color:'var(--text3)', textTransform:'uppercase', marginBottom:'10px' }}>{label}</div>
      <div style={{ fontFamily:'var(--mono)', fontSize:'22px', fontWeight:700, letterSpacing:'-0.02em', lineHeight:1, marginBottom:'6px', color:valueColor||'var(--text)' }}>
        {loading ? <Dots /> : value}
      </div>
      <div style={{ fontSize:'11px', color:'var(--text3)' }}>{sub}</div>
    </div>
  )
}

export default function TopPage({ onNavigate }) {
  const { data: themes,  loading: loadingT } = useThemes('1mo')
  const { data: macroRaw, loading: loadingM } = useMacro('1mo')
  const macro   = macroRaw?.data || {}
  const loading = loadingT || loadingM

  const s = themes?.summary

  return (
    <div style={{ padding:'20px 24px 48px', maxWidth:'100%', overflowX:'hidden' }}>

      {/* ヒーロー */}
      <div style={{
        background:'linear-gradient(135deg,rgba(91,156,246,0.07) 0%,rgba(255,83,112,0.05) 100%)',
        border:'1px solid var(--border)', borderRadius:'var(--radius)',
        padding:'20px 24px', marginBottom:'16px', animation:'fadeUp 0.5s ease both',
      }}>
        <h1 style={{ fontSize:'22px', fontWeight:700, letterSpacing:'-0.02em', color:'var(--text)', marginBottom:'8px' }}>
          <span style={{ color:'var(--logo-red)' }}>Stock</span>Wave
          <span style={{ color:'var(--logo-red)', fontSize:'13px' }}>JP</span>
        </h1>
        {/* PC:1行 / SP:折り返し */}
        <p style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.9 }} className="hero-desc">
          Track Return, Volume, and Trading Value across 67+ Japanese stock themes in real-time. Visualize capital flows by theme using period-based Heatmaps, Market Rankings, and Analysis Columns to support more actionable investment decisions.
        </p>
      </div>

      {/* News（小見出しのみ・コンパクト） */}
      <SHead title="📣 News & Updates" />
      <div style={{ display:'flex', flexDirection:'column', gap:'4px', marginBottom:'4px' }}>
        {NEWS_LIST.map((n,i)=>{
          const tc = TAG_COLORS[n.tag]||TAG_COLORS['INFO']
          return (
            <div key={i} onClick={() => onNavigate?.('News')}
              style={{
              background:'var(--bg2)', border:'1px solid var(--border)',
              borderRadius:'6px', padding:'7px 12px',
              display:'flex', alignItems:'center', gap:'8px',
              animation:`fadeUp 0.25s ease ${i*0.05}s both`,
              minWidth:0, cursor:'pointer', transition:'border-color 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor='rgba(74,158,255,0.4)'}
              onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}
            >
              <span style={{ fontSize:'9px', fontWeight:700, padding:'1px 7px', borderRadius:'20px', flexShrink:0,
                background:tc.bg, color:tc.color, border:`1px solid ${tc.border}` }}>{n.tag}</span>
              <span style={{ fontSize:'12px', fontWeight:600, color:'var(--text)', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{n.title}</span>
              <span style={{ fontSize:'10px', color:'var(--text3)', fontFamily:'var(--mono)', whiteSpace:'nowrap', flexShrink:0 }}>{n.date}</span>
            </div>
          )
        })}
      </div>

      {/* KPIカード */}
      <SHead title="📊 Market Summary (1M)" />
      <div className="responsive-grid-4" style={{ marginBottom:'4px' }}>
        <KpiCard delay={0.05} loading={loading} label="risingTheme"
          value={<span>{s?s.rise:'-'}<span style={{ fontSize:'14px', color:'var(--text3)', fontWeight:400 }}>{s?` / ${s.total}`:''}</span></span>}
          valueColor="var(--red)"
          arrow={s ? (s.rise > s.fall ? 'up' : s.rise < s.fall ? 'down' : null) : null}
          sub="of All Themes"/>
        <KpiCard delay={0.1} loading={loading} label="Avg Change"
          value={s?`${s.avg>=0?'+':''}${s.avg?.toFixed(2)}%`:'-'}
          valueColor={s?.avg>=0?'var(--red)':'var(--green)'}
          arrow={s ? (s.avg >= 0 ? 'up' : 'down') : null}
          sub="Period: 1M"/>
        <KpiCard delay={0.15} loading={loading} label="capital inflowTOP"
          value={<span>{tn(s?.top?.theme)||'-'}</span>}
          valueColor="var(--red)"
          arrow="up"
          sub={s?.top?<span style={{ color:'var(--red)', fontWeight:600 }}>+{s.top.pct.toFixed(1)}%</span>:'-'}/>
        <KpiCard delay={0.2} loading={loading} label="capital outflowTOP"
          value={<span>{tn(s?.bot?.theme)||'-'}</span>}
          valueColor="var(--green)"
          arrow="down"
          sub={s?.bot?<span style={{ color:'var(--green)', fontWeight:600 }}>{s.bot.pct.toFixed(1)}%</span>:'-'}/>
      </div>

      {/* 市場コメント自動生成 */}
      {!loading && themes && (
        <div style={{
          background:'rgba(74,158,255,0.05)', border:'1px solid rgba(74,158,255,0.18)',
          borderRadius:'8px', padding:'12px 16px', marginBottom:'4px',
          animation:'fadeUp 0.4s ease 0.25s both',
        }}>
          <div style={{ fontSize:'10px', fontWeight:700, color:'var(--accent)',
            letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'6px' }}>
          📝 Today's Market Commentary (Auto-generated, 1M data)
          </div>
          <AutoComment lines={generateMarketComment(themes, macro)} />

          {/* 注目Theme誘導ボタン */}
          {themes?.themes?.length > 0 && onNavigate && (() => {
            const top3 = [...(themes.themes||[])].sort((a,b)=>b.pct-a.pct).slice(0,3)
            return (
              <div style={{ marginTop:'14px' }}>
                <div style={{ fontSize:'11px', color:'var(--text3)', marginBottom:'10px',
                  fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase' }}>
        🔎 Top 3 Themes
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px', marginBottom:'12px' }} className="top3-grid">
                  {top3.map((t, i) => (
                    <div key={t.theme} style={{
                      background:'var(--bg2)', border:'1px solid var(--border)',
                      borderRadius:'8px', padding:'10px 14px',
                      borderTop:`3px solid ${i===0?'#ffd166':i===1?'rgba(192,192,192,0.6)':'rgba(205,127,50,0.6)'}`,
                    }}>
                      <div style={{ fontSize:'10px', color:'var(--text3)', marginBottom:'4px', fontWeight:600 }}>
                        {i===0?'🥇 Top Theme #1':i===1?'🥈 Top Theme #2':'🥉 Top Theme #3'}
                      </div>
                      <div style={{ fontSize:'13px', fontWeight:700, color:'var(--text)', marginBottom:'8px' }}>
                        {tn(t.theme)}
                        <span style={{ marginLeft:'8px', fontSize:'12px', fontWeight:700,
                          color: t.pct >= 0 ? 'var(--red)' : 'var(--green)',
                          fontFamily:'var(--mono)' }}>
                          {t.pct >= 0 ? '+' : ''}{t.pct?.toFixed(1)}%
                        </span>
                      </div>
                      <div style={{ display:'flex', gap:'6px' }}>
                        <button onClick={() => onNavigate('Theme Detail', t.theme)}
                          style={{ padding:'5px 12px', borderRadius:'5px', fontSize:'11px',
                            background:'rgba(170,119,255,0.1)', border:'1px solid rgba(170,119,255,0.3)',
                            color:'#aa77ff', cursor:'pointer', fontFamily:'var(--font)', fontWeight:600 }}>
                          📊 Theme Detail
                        </button>
                        {THEME_ARTICLE_MAP[t.theme] && (
                          <button onClick={() => onNavigate('Column & Analysis', THEME_ARTICLE_MAP[t.theme])}
                            style={{ padding:'5px 12px', borderRadius:'5px', fontSize:'11px',
                              background:'rgba(74,158,255,0.07)', border:'1px solid rgba(74,158,255,0.2)',
                              color:'var(--accent)', cursor:'pointer', fontFamily:'var(--font)', fontWeight:600 }}>
                            📖 Read Column
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => onNavigate('Weekly Report')}
                  style={{ padding:'6px 14px', borderRadius:'6px', fontSize:'11px',
                    background:'rgba(255,140,66,0.1)', border:'1px solid rgba(255,140,66,0.3)',
                    color:'#ff8c42', cursor:'pointer', fontFamily:'var(--font)', fontWeight:600 }}>
                  📰 Read Latest Weekly Report →
                </button>
              </div>
            )
          })()}
        </div>
      )}

      {/* マーケット指標（ミニカード＋比較グラフ統合）*/}
      <SHead title="📈 Market Indicators & Comparison (1 Month)" />
      {loading ? (
        <div style={{ color:'var(--text3)', fontSize:'13px', padding:'12px 0' }}><Dots /></div>
      ) : (
        <MacroLineChart macro={macro} />
      )}

      <style>{`
        .col-quick-grid { grid-template-columns: 1fr 1fr 1fr; }
        .macro-mini-grid { grid-template-columns: repeat(3, 1fr) !important; }
        @media (max-width:640px) {
          .col-quick-grid { grid-template-columns: 1fr !important; }
          .macro-mini-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        .top3-grid { grid-template-columns: repeat(3,1fr) !important; }
        @media (max-width:640px) {
          .top3-grid { grid-template-columns: 1fr !important; }
        }
        .hero-desc { white-space:normal; overflow:visible; }
        @media (max-width:900px) {
          .hero-desc { white-space:normal !important; overflow:visible !important; text-overflow:unset !important; }
        }
      `}</style>
    </div>
  )
}
