import { useState } from 'react'
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
  'Optical Communication':            'optical-communication',
  'Telecom':              'telecom-theme',
  'Quantum Computing':'ai-cloud-theme',
  'SaaS':              'fintech-theme',
  'Wearables':  'game-entertainment-theme',
  '仮想通貨':          'fintech-theme',
  'ネット銀行':        'banking-finance-theme',
  'Steel & Materials':        'steel-materials-theme',
  'Chemicals':              'chemical-theme',
  '建築資材':          'construction-infra-theme',
  '塗料':              'chemical-theme',
  'Pharma & Biotech':    'pharma-bio-theme',
  'Healthcare & Nursing':  'healthcare-nursing-theme',
  '薬局・ドラッグストア': 'healthcare-nursing-theme',
  '銀行・金融':        'banking-finance-theme',
  '地方銀行':          'regional-bank-theme',
  'Insurance':              'insurance-theme',
  'Fintech':      'fintech-theme',
  'Real Estate':            'real-estate-theme',
  'Construction & Infra':    'construction-infra-theme',
  'National Resilience':    'national-resilience',
  '下水道':            'construction-infra-theme',
  'Food & Beverage':        'food-beverage-theme',
  'Agritech & Foodtech':'agritech-foodtech-theme',
  'Retail & E-Commerce':          'retail-ec-theme',
  '観光・ホテル・レジャー': 'tourism-hotel-theme',
  'インバウンド':      'inbound-theme',
  'リユース・中古品':  'retail-ec-theme',
  'Defense & Aerospace':        'defense-theme',
  '宇宙・衛星':        'space-satellite-theme',
  'Robotics & Automation':  'robot-automation-theme',
  'Rare Earth & Resources':  'rare-earth-resources-theme',
  'バフェットstocks':    'sogo-shosha-analysis',
  'サイバーセキュリティ': 'cybersecurity-theme',
  '警備':              'cybersecurity-theme',
  '脱炭素・ESG':       'ev-green-theme',
  'Education & HR':    'education-hr-theme',
  '人材派遣':          'education-hr-theme',
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
// 降順ソート・最新3件
const NEWS_LIST = [...ALL_NEWS].sort((a,b) => b.date.localeCompare(a.date)).slice(0,3)
const TAG_COLORS = {
  'NEW':    { bg:'rgba(255,83,112,0.15)', color:'var(--red)',    border:'rgba(255,83,112,0.3)' },
  'UPDATE': { bg:'rgba(91,156,246,0.12)', color:'var(--accent)', border:'rgba(91,156,246,0.25)' },
  'INFO':   { bg:'rgba(76,175,130,0.12)', color:'var(--green)',  border:'rgba(76,175,130,0.25)' },
}

// ── 市場コメント自動生成 ──
function AutoComment({ lines }) {
  // 防御的処理: null/undefined/空/文字列に対応
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
  const mktState = riseCount >= total*0.7 ? '広範なrising相場' :
                   riseCount >= total*0.55 ? 'rising優勢の相場' :
                   fallCount >= total*0.7  ? '広範なfalling相場' :
                   fallCount >= total*0.55 ? 'falling優勢の相場' : '方向感の定まらない相場'

  const top3 = [...t].sort((a,b)=>b.pct-a.pct).slice(0,3)
  const bot3 = [...t].sort((a,b)=>a.pct-b.pct).slice(0,3)
  const volUp = [...t].filter(x=>(x.volume_chg||0)>20).sort((a,b)=>(b.volume_chg||0)-(a.volume_chg||0)).slice(0,3)
  const hotThemes  = t.filter(x=>x.pct>=5)
  const coldThemes = t.filter(x=>x.pct<=-5)

  // マクロ情報
  const macroKeys = macro ? Object.keys(macro) : []
  const nikkei = macro?.['国内主要株(1321)'] || macro?.['日経225連動型(1321)']
  const topix  = macro?.['TOPIX連動型上場投信(1306)'] || macro?.['TOPIX指数'] || macro?.['TOPIX連動型(1306)'] || macro?.['1306.T']
  const sp500  = macro?.['S&P500 ETF(SPY)']
  const usdjpy = macro?.['ドル円']
  const lastNK = nikkei ? nikkei[nikkei.length-1]?.pct : null
  const lastTP = topix  ? topix[topix.length-1]?.pct  : null
  const lastSP = sp500  ? sp500[sp500.length-1]?.pct  : null
  const lastFX = usdjpy ? usdjpy[usdjpy.length-1]?.pct : null

  const lines = []

  // 全体概況
  lines.push(`【マーケット概況】現在の日本株Theme相場は${mktState}です。全${total}Theme中${riseCount}Themeがrising・${fallCount}Themeがfallingし、Theme平均Changeは${avg>=0?'+':''}${avg.toFixed(2)}%。${hotThemes.length>0?`+5%超のsurgingThemeが${hotThemes.length}個、`:''  }${coldThemes.length>0?`-5%超のplungingThemeが${coldThemes.length}個あります。`:''}`)

  // マクロ環境
  if (lastNK != null || lastSP != null) {
    const macroLine = [
      lastNK != null ? `日経225連動型${lastNK>=0?'+':''}${lastNK.toFixed(1)}%` : null,
      lastTP != null ? `TOPIX連動型${lastTP>=0?'+':''}${lastTP.toFixed(1)}%` : null,
      lastSP != null ? `S&P500 ${lastSP>=0?'+':''}${lastSP.toFixed(1)}%` : null,
      lastFX != null ? `ドル円${lastFX>=0?'+':''}${lastFX.toFixed(1)}%` : null,
    ].filter(Boolean).join(' / ')
    const riskMode = lastSP != null ? (lastSP > 1 ? 'リスクオン（米国株高）でTheme株にも追い風。' : lastSP < -1 ? 'リスクオフ（米国株安）で地合いは慎重。' : '米国株は横ばい。') : ''
    lines.push(`【マクロ指標（参照Period）】${macroLine}。${riskMode}${lastFX != null ? (lastFX > 1 ? '円安傾向で輸出・グローバルstocksに有利な環境。' : lastFX < -1 ? '円高傾向で内需・消費系に資金が向かいやすい局面。' : '') : ''}`)
  }

  // risingTheme
  if (top3.length && top3[0].pct > 0) {
    const upNames = top3.filter(x=>x.pct>0).map(x=>`「${x.theme}」(${x.pct>=0?'+':''}${x.pct.toFixed(1)}%)`).join('、')
    lines.push(`▲ risingが目立つTheme：${upNames}。${volUp.length>0&&top3.some(top=>volUp.some(v=>v.theme===top.theme))?`特に「${top3[0].theme}」はVolumeも急増しており、資金の本格流入が始まっている可能性がある。`:''}`)
  }

  // fallingTheme
  if (bot3.length && bot3[0].pct < 0) {
    const dnNames = bot3.filter(x=>x.pct<0).map(x=>`「${x.theme}」(${x.pct.toFixed(1)}%)`).join('、')
    lines.push(`▼ fallingが目立つTheme：${dnNames}。${coldThemes.length>3?'広範な売り圧力がかかっており、個別Themeの選別が重要。':'falling幅が大きく過熱感の解消や外部要因が影響している可能性がある。'}`)
  }

  // Volume増加Theme
  if (volUp.length > 0) {
    lines.push(`📊 Volumeが前期比+20%超で急増しているTheme：「${volUp.map(x=>x.theme).join('」「')}」。Volume増加は大口資金の動きを先行して示すことが多く、今後の株価動向を見極めるうえで重要なシグナル。`)
  }

  // Volume急増かつrisingTheme → 特に注目
  const hotWithVol = hotThemes.filter(h => volUp.some(v => v.theme === h.theme))
  if (hotWithVol.length > 0) {
    lines.push(`🔥 surgingかつVolume急増Theme：「${hotWithVol.map(t=>t.theme).join('」「')}」。価格risingとVolume増加が同時発生しており、強いトレンドの初期段階である可能性が高い。`)
  }

  // falling幅が大きいがVolumeも増加（底値模索か）
  const coldWithVolUp = coldThemes.filter(h => volUp.some(v => v.theme === h.theme))
  if (coldWithVolUp.length > 0) {
    lines.push(`📉 fallingThemeでもVolume増加：「${coldWithVolUp.map(t=>t.theme).join('」「')}」。売り圧力が強いがVolume増は底値模索の兆しの可能性もある。反転サインを確認してから判断したい。`)
  }

  lines.push(`💡 Todayのポイント：${avg >= 2 ? '全体的に強い相場環境。強気Themeへの集中投資が奏功しやすい局面。' : avg <= -2 ? '全体的に弱い地合い。守備的なTheme（通信・医薬品等）や現金比率を高める局面。' : '方向感が定まらないため、モメンタムの強いThemeに絞り込み、Volume増加を確認してから参入するのが有効。'}`)

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
        <p style={{ fontSize:'11px', color:'var(--text2)', lineHeight:1.7 }} className="hero-desc">
          日本株ThemeのChange・Volume・Trading Valueを定期取得し、資金の流れをTheme別に可視化。Period別Themeヒートマップや市場別詳細、解説コラムを組み合わせ、より実践的な投資分析をサポートします。
        </p>
      </div>

      {/* お知らせ（小見出しのみ・コンパクト） */}
      <SHead title="📣 News & Updates" />
      <div style={{ display:'flex', flexDirection:'column', gap:'4px', marginBottom:'4px' }}>
        {NEWS_LIST.map((n,i)=>{
          const tc = TAG_COLORS[n.tag]||TAG_COLORS['INFO']
          return (
            <div key={i} onClick={() => onNavigate?.('お知らせ')}
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
      <SHead title="📊 マーケットサマリー（1ヶ月）" />
      <div className="responsive-grid-4" style={{ marginBottom:'4px' }}>
        <KpiCard delay={0.05} loading={loading} label="risingTheme"
          value={<span>{s?s.rise:'-'}<span style={{ fontSize:'14px', color:'var(--text3)', fontWeight:400 }}>{s?` / ${s.total}`:''}</span></span>}
          valueColor="var(--red)"
          arrow={s ? (s.rise > s.fall ? 'up' : s.rise < s.fall ? 'down' : null) : null}
          sub="全Theme中"/>
        <KpiCard delay={0.1} loading={loading} label="平均Change"
          value={s?`${s.avg>=0?'+':''}${s.avg?.toFixed(2)}%`:'-'}
          valueColor={s?.avg>=0?'var(--red)':'var(--green)'}
          arrow={s ? (s.avg >= 0 ? 'up' : 'down') : null}
          sub="Period:1ヶ月"/>
        <KpiCard delay={0.15} loading={loading} label="capital inflowTOP"
          value={<span>{s?.top?.theme||'-'}</span>}
          valueColor="var(--red)"
          arrow="up"
          sub={s?.top?<span style={{ color:'var(--red)', fontWeight:600 }}>+{s.top.pct.toFixed(1)}%</span>:'-'}/>
        <KpiCard delay={0.2} loading={loading} label="capital outflowTOP"
          value={<span>{s?.bot?.theme||'-'}</span>}
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
            📝 Todayのマーケットコメント（自動生成・1ヶ月集計）
          </div>
          <AutoComment lines={generateMarketComment(themes, macro)} />

          {/* 注目Theme誘導ボタン */}
          {themes?.themes?.length > 0 && onNavigate && (() => {
            const top3 = [...(themes.themes||[])].sort((a,b)=>b.pct-a.pct).slice(0,3)
            return (
              <div style={{ marginTop:'14px' }}>
                <div style={{ fontSize:'11px', color:'var(--text3)', marginBottom:'10px',
                  fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase' }}>
                  🔎 注目Theme TOP3
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px', marginBottom:'12px' }} className="top3-grid">
                  {top3.map((t, i) => (
                    <div key={t.theme} style={{
                      background:'var(--bg2)', border:'1px solid var(--border)',
                      borderRadius:'8px', padding:'10px 14px',
                      borderTop:`3px solid ${i===0?'#ffd166':i===1?'rgba(192,192,192,0.6)':'rgba(205,127,50,0.6)'}`,
                    }}>
                      <div style={{ fontSize:'10px', color:'var(--text3)', marginBottom:'4px', fontWeight:600 }}>
                        {i===0?'🥇 注目Theme No.1':i===1?'🥈 注目Theme No.2':'🥉 注目Theme No.3'}
                      </div>
                      <div style={{ fontSize:'13px', fontWeight:700, color:'var(--text)', marginBottom:'8px' }}>
                        {t.theme}
                        <span style={{ marginLeft:'8px', fontSize:'12px', fontWeight:700,
                          color: t.pct >= 0 ? 'var(--red)' : 'var(--green)',
                          fontFamily:'var(--mono)' }}>
                          {t.pct >= 0 ? '+' : ''}{t.pct?.toFixed(1)}%
                        </span>
                      </div>
                      <div style={{ display:'flex', gap:'6px' }}>
                        <button onClick={() => onNavigate('Theme別詳細', t.theme)}
                          style={{ padding:'5px 12px', borderRadius:'5px', fontSize:'11px',
                            background:'rgba(170,119,255,0.1)', border:'1px solid rgba(170,119,255,0.3)',
                            color:'#aa77ff', cursor:'pointer', fontFamily:'var(--font)', fontWeight:600 }}>
                          📊 Theme詳細へ
                        </button>
                        {THEME_ARTICLE_MAP[t.theme] && (
                          <button onClick={() => onNavigate('コラム・解説', THEME_ARTICLE_MAP[t.theme])}
                            style={{ padding:'5px 12px', borderRadius:'5px', fontSize:'11px',
                              background:'rgba(74,158,255,0.07)', border:'1px solid rgba(74,158,255,0.2)',
                              color:'var(--accent)', cursor:'pointer', fontFamily:'var(--font)', fontWeight:600 }}>
                            📖 解説コラムへ
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => onNavigate('Weeklyレポート')}
                  style={{ padding:'6px 14px', borderRadius:'6px', fontSize:'11px',
                    background:'rgba(255,140,66,0.1)', border:'1px solid rgba(255,140,66,0.3)',
                    color:'#ff8c42', cursor:'pointer', fontFamily:'var(--font)', fontWeight:600 }}>
                  📰 最新Weeklyレポートを読む →
                </button>
              </div>
            )
          })()}
        </div>
      )}

      {/* マーケット指標（ミニカード＋比較グラフ統合）*/}
      <SHead title="📈 マーケット指標・比較（1ヶ月）" />
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
        .hero-desc { white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        @media (max-width:900px) {
          .hero-desc { white-space:normal !important; overflow:visible !important; text-overflow:unset !important; }
        }
      `}</style>
    </div>
  )
}
