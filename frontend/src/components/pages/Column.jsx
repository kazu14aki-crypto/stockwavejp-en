import { useState, useEffect } from 'react'

const THEME_ARTICLE_MAP = {
  'Semiconductor Equipment':    'semiconductor-theme',
  'Semiconductor Testing':    'semiconductor-theme',
  'Semiconductor Materials':        'semiconductor-theme',
  'Memory':            'semiconductor-theme',
  'Power Semiconductor':      'power-semiconductor',
  'Next-Gen Semiconductor':      'semiconductor-theme',
  'Generative AI':            'ai-cloud-theme',
  'AI Datacenter':  'ai-cloud-theme',
  'Physical AI / Edge AI':      'physical-ai-edge-ai',
  'AI Semiconductor':          'semiconductor-theme',
  'AI Talent':            'education-hr-theme',
  'Edge AI':                  'physical-ai-edge-ai',
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
  'Banking/Finance':        'banking-finance-theme',
  '地方銀行':          'regional-bank-theme',
  '保険':              'insurance-theme',
  'Fintech':      'fintech-theme',
  'Real Estate':            'real-estate-theme',
  'Construction & Infra':    'construction-infra-theme',
  'National Resilience':    'national-resilience',
  '下水道':            'construction-infra-theme',
  'Food & Beverage':        'food-beverage-theme',
  'Agritech & Foodtech':'agritech-foodtech-theme',
  'Retail & E-Commerce':          'retail-ec-theme',
  '観光・ホテル・レジャー': 'tourism-hotel-theme',
  'Inbound Tourism':      'inbound-theme',
  'リユース・中古品':  'retail-ec-theme',
  'Defense & Aerospace':        'defense-theme',
  'Space & Satellite':        'space-satellite-theme',
  'Robotics & Automation':  'robot-automation-theme',
  'Rare Earth & Resources':  'rare-earth-resources-theme',
  'Warren Buffett':    'sogo-shosha-analysis',
  'Cyber Security': 'cybersecurity-theme',
  '警備':              'cybersecurity-theme',
  '脱炭素・ESG':       'ev-green-theme',
  'Education & HR':    'education-hr-theme',
  '人材派遣':          'education-hr-theme',
  'Gaming & Entertainment':  'game-entertainment-theme',
}
import COLUMNS from './columnData.js'

const CATEGORIES = ['All', 'Theme', 'Basics', ' min析手法', 'Strategy', 'Glossary', 'Stock Analysis']

const CAT_COLORS = {
  'Basics':       { bg:'rgba(74,158,255,0.1)',  color:'#4a9eff',  border:'rgba(74,158,255,0.25)' },
  'Semiconductor':     { bg:'rgba(255,69,96,0.1)',   color:'#ff4560',  border:'rgba(255,69,96,0.25)' },
  'Generative AI':{ bg:'rgba(170,119,255,0.1)', color:'#aa77ff', border:'rgba(170,119,255,0.25)' },
  'Defense & Aerospace': { bg:'rgba(76,175,130,0.1)',  color:'#4caf82',  border:'rgba(76,175,130,0.25)' },
  'Inbound Tourism':{ bg:'rgba(255,140,66,0.1)',  color:'#ff8c42',  border:'rgba(255,140,66,0.25)' },
  'EV/Green': { bg:'rgba(6,214,160,0.1)',   color:'#06d6a0',  border:'rgba(6,214,160,0.25)' },
  'Analysis Methods':   { bg:'rgba(255,214,25,0.1)',  color:'#ffd619',  border:'rgba(255,214,25,0.25)' },
  'Shipbuilding':       { bg:'rgba(91,156,246,0.1)',  color:'#5b9cf6',  border:'rgba(91,156,246,0.25)' },
  'Corporate Governance':   { bg:'rgba(255,140,66,0.1)',  color:'#ff8c42',  border:'rgba(255,140,66,0.25)' },
  'Warren Buffett': { bg:'rgba(255,214,25,0.1)', color:'#ffd619', border:'rgba(255,214,25,0.25)' },
  'Physical AI / Edge AI': { bg:'rgba(170,119,255,0.1)', color:'#aa77ff', border:'rgba(170,119,255,0.25)' },
  'Renewable Energy': { bg:'rgba(6,214,160,0.12)', color:'#06d6a0', border:'rgba(6,214,160,0.3)' },

  'Power Semiconductor': { bg:'rgba(255,69,96,0.1)',  color:'#ff4560',  border:'rgba(255,69,96,0.25)' },
  'NISA':       { bg:'rgba(6,214,160,0.1)',   color:'#06d6a0',  border:'rgba(6,214,160,0.25)' },
  'Optical Communication':     { bg:'rgba(74,158,255,0.1)',  color:'#4a9eff',  border:'rgba(74,158,255,0.25)' },
  'National Resilience': { bg:'rgba(76,175,130,0.1)',  color:'#4caf82',  border:'rgba(76,175,130,0.25)' },
  'Geopolitics':     { bg:'rgba(180,120,80,0.1)',  color:'#b47850',  border:'rgba(180,120,80,0.25)' },
  'Gaming & Entertainment':    { bg:'rgba(170,119,255,0.1)', color:'#aa77ff', border:'rgba(170,119,255,0.25)' },
  'Banking/Finance':         { bg:'rgba(74,158,255,0.1)',  color:'#4a9eff', border:'rgba(74,158,255,0.25)' },
  '地方銀行':           { bg:'rgba(74,158,255,0.08)', color:'#4a9eff', border:'rgba(74,158,255,0.2)' },
  '保険':               { bg:'rgba(76,175,130,0.1)',  color:'#4caf82', border:'rgba(76,175,130,0.25)' },
  'Real Estate':             { bg:'rgba(255,140,66,0.1)',  color:'#ff8c42', border:'rgba(255,140,66,0.25)' },
  'Pharma & Biotech':     { bg:'rgba(255,69,96,0.1)',   color:'#ff4560', border:'rgba(255,69,96,0.25)' },
  'Healthcare & Nursing':   { bg:'rgba(6,214,160,0.1)',   color:'#06d6a0', border:'rgba(6,214,160,0.25)' },
  'Food & Beverage':         { bg:'rgba(255,214,25,0.1)',  color:'#ffd619', border:'rgba(255,214,25,0.25)' },
  'Retail & E-Commerce':           { bg:'rgba(255,140,66,0.1)',  color:'#ff8c42', border:'rgba(255,140,66,0.25)' },
  'Telecom':               { bg:'rgba(74,158,255,0.1)',  color:'#4a9eff', border:'rgba(74,158,255,0.25)' },
  'Steel & Materials':         { bg:'rgba(180,120,80,0.1)',  color:'#b47850', border:'rgba(180,120,80,0.25)' },
  'Chemicals':               { bg:'rgba(6,214,160,0.1)',   color:'#06d6a0', border:'rgba(6,214,160,0.25)' },
  'Construction & Infra':     { bg:'rgba(76,175,130,0.1)',  color:'#4caf82', border:'rgba(76,175,130,0.25)' },
  'Transport & Logistics':         { bg:'rgba(91,156,246,0.1)',  color:'#5b9cf6', border:'rgba(91,156,246,0.25)' },
  'Fintech':       { bg:'rgba(170,119,255,0.1)', color:'#aa77ff', border:'rgba(170,119,255,0.25)' },
  'Robotics & Automation':   { bg:'rgba(255,69,96,0.1)',   color:'#ff4560', border:'rgba(255,69,96,0.25)' },
  'Rare Earth & Resources':   { bg:'rgba(180,120,80,0.1)',  color:'#b47850', border:'rgba(180,120,80,0.25)' },
  'Cyber Security':{ bg:'rgba(74,158,255,0.1)', color:'#4a9eff', border:'rgba(74,158,255,0.25)' },
  'Drones':           { bg:'rgba(6,214,160,0.1)',   color:'#06d6a0', border:'rgba(6,214,160,0.25)' },
  '観光・ホテル・レジャー':{ bg:'rgba(255,214,25,0.1)',color:'#ffd619',border:'rgba(255,214,25,0.25)' },
  'Agritech & Foodtech': { bg:'rgba(76,175,130,0.1)',  color:'#4caf82', border:'rgba(76,175,130,0.25)' },
  'Education & HR':     { bg:'rgba(170,119,255,0.1)', color:'#aa77ff', border:'rgba(170,119,255,0.25)' },
  'Space & Satellite':         { bg:'rgba(74,158,255,0.1)',  color:'#4a9eff', border:'rgba(74,158,255,0.25)' },
  'Strategy':           { bg:'rgba(255,140,66,0.1)',  color:'#ff8c42', border:'rgba(255,140,66,0.25)' },
  'Glossary':           { bg:'rgba(170,119,255,0.1)', color:'#aa77ff', border:'rgba(170,119,255,0.25)' },
  'Stock Analysis':           { bg:'rgba(255,69,96,0.1)',   color:'#ff4560', border:'rgba(255,69,96,0.25)' },
}

// Markdown風テキストを簡易レンダリング
function RenderBody({ text }) {
  const lines = text.trim().split('\n')
  const elements = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i].trim()
    if (!line) { i++; continue }
    if (line.startsWith('H2: ')) {
      elements.push(
        <h2 key={i} style={{ fontSize:'16px', fontWeight:700, color:'#e8f0ff',
          margin:'24px 0 10px', borderBottom:'1px solid var(--border)', paddingBottom:'6px' }}>
          {line.slice(4)}
        </h2>
      )
    } else if (line.startsWith('H3: ')) {
      elements.push(
        <h3 key={i} style={{ fontSize:'14px', fontWeight:700, color:'var(--accent)', margin:'16px 0 6px' }}>
          {line.slice(4)}
        </h3>
      )
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} style={{ fontSize:'16px', fontWeight:700, color:'#e8f0ff',
          margin:'24px 0 10px', borderBottom:'1px solid var(--border)', paddingBottom:'6px' }}>
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p key={i} style={{ fontSize:'13px', fontWeight:700, color:'var(--accent)', margin:'14px 0 6px' }}>
          {line.slice(2, -2)}
        </p>
      )
    } else if (line.startsWith('- ')) {
      const items = []
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2))
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} style={{ margin:'6px 0 12px', paddingLeft:'20px' }}>
          {items.map((item, j) => (
            <li key={j} style={{ fontSize:'13px', color:'#e8f0ff', lineHeight:1.8, marginBottom:'2px' }}>
              {item.includes('（') ? (
                <>
                  <span style={{ color:'var(--text)', fontWeight:600 }}>{item.split('：')[0]}</span>
                  {item.includes('：') ? <span style={{ color:'var(--text2)' }}>：{item.split('：').slice(1).join('：')}</span> : null}
                </>
              ) : item}
            </li>
          ))}
        </ul>
      )
      continue
    } else if (line.startsWith('| ')) {
      const rows = []
      while (i < lines.length && lines[i].trim().startsWith('| ')) {
        if (!lines[i].includes('---')) {
          rows.push(lines[i].trim().split('|').filter(c => c.trim()).map(c => c.trim()))
        }
        i++
      }
      if (rows.length > 0) {
        elements.push(
          <div key={`table-${i}`} style={{ overflowX:'auto', margin:'12px 0 20px' }}>
            <table style={{ borderCollapse:'collapse', fontSize:'12px', width:'100%', minWidth:'400px' }}>
              <thead>
                <tr>
                  {rows[0].map((h, j) => (
                    <th key={j} style={{ padding:'8px 12px', textAlign:'left', borderBottom:'1px solid var(--border)',
                      color:'var(--text3)', fontWeight:600, background:'var(--bg3)', whiteSpace:'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(1).map((row, ri) => (
                  <tr key={ri} style={{ borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{ padding:'8px 12px', color:'#e8f0ff', lineHeight:1.6 }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
      continue
    } else {
      elements.push(
        <p key={i} style={{ fontSize:'13px', color:'#e8f0ff', lineHeight:1.9, margin:'0 0 12px' }}>
          {line}
        </p>
      )
    }
    i++
  }
  return <div>{elements}</div>
}

export default function Column({ initialArticleId = null, onNavigate }) {
  const [activeCat,  setActiveCat]  = useState('All')
  const [activeCol,  setActiveCol]  = useState(initialArticleId)
  const [searchQuery, setSearchQuery] = useState('')
  const [page,        setPage]        = useState(1)
  const ITEMS_PER_PAGE = 20

  // Theme List・Theme詳細から特定記事IDで来たときに追従
  useEffect(() => {
    if (initialArticleId) {
      setActiveCol(initialArticleId)
      window.history.replaceState(null, '', `#column/${initialArticleId}`)
    }
  }, [initialArticleId])

  const openArticle = (id) => {
    setActiveCol(id)
    window.history.replaceState(null, '', `#column/${id}`)
    window.scrollTo(0, 0)
  }
  const closeArticle = () => {
    setActiveCol(null)
    window.history.replaceState(null, '', window.location.pathname)
    window.scrollTo(0, 0)
  }

  const THEME_CATS = [
    'Semiconductor Equipment','Semiconductor Testing','Semiconductor Materials','Memory','Power Semiconductor','Next-Gen Semiconductor',
    'Generative AI','AI Datacenter','Physical AI / Edge AI','AI Semiconductor','AI Talent','Edge AI',
    'EV / Electric Vehicles','All-Solid-State Battery','Autonomous Driving','Drones','Transport & Logistics','Shipbuilding',
    'Renewable Energy','Solar Power','Nuclear Fusion','Nuclear Power','Electric Utilities',
    'LNG','Oil & Gas','Energy Storage','Resources (H2/Helium/Water)','IOWN','Optical Communication',
    'Telecom','Quantum Computing','SaaS','Wearables','仮想通貨','ネット銀行',
    'Steel & Materials','Chemicals','建築資材','塗料',
    'Pharma & Biotech','Healthcare & Nursing','薬局・ドラッグストア',
    'Banking/Finance','地方銀行','保険','Fintech',
    'Real Estate','Construction & Infra','National Resilience','下水道',
    'Food & Beverage','Agritech & Foodtech','Retail & E-Commerce','観光・ホテル・レジャー',
    'Inbound Tourism','リユース・中古品',
    'Defense & Aerospace','Space & Satellite','Robotics & Automation',
    'Rare Earth & Resources','Warren Buffett',
    'Cyber Security','警備','脱炭素・ESG',
    'Education & HR','人材派遣','Gaming & Entertainment',
  ]
  const _base = activeCat === 'All'
    ? COLUMNS
    : activeCat === 'Theme'
    ? COLUMNS.filter(c => THEME_CATS.includes(c.category))
    : COLUMNS.filter(c => c.category === activeCat)

  const filtered = [..._base]
    .filter(col => {
      if (!searchQuery.trim()) return true
      const q = searchQuery.trim().toLowerCase()
      return (
        col.title.toLowerCase().includes(q) ||
        col.summary.toLowerCase().includes(q) ||
        (col.keywords || []).some(k => k.toLowerCase().includes(q)) ||
        (col.themes || []).some(t => t.toLowerCase().includes(q))
      )
    })
    .sort((a, b) => b.date.localeCompare(a.date))

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const pagedItems = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  if (activeCol) {
    const col = COLUMNS.find(c => c.id === activeCol)
    if (!col) { setActiveCol(null); return null }
    const cat = CAT_COLORS[col.category] || { bg:'rgba(74,158,255,0.1)', color:'#4a9eff', border:'rgba(74,158,255,0.25)' }
    return (
      <div style={{ padding:'20px 32px 60px', maxWidth:'760px', margin:'0 auto' }}>
        <button onClick={() => closeArticle()} style={{
          display:'flex', alignItems:'center', gap:'6px',
          background:'transparent', border:'none', color:'var(--accent)',
          fontSize:'13px', cursor:'pointer', fontFamily:'var(--font)',
          padding:'0', marginBottom:'20px',
        }}>
          ← Back to column list
        </button>
        <span style={{ fontSize:'11px', fontWeight:600, padding:'3px 10px', borderRadius:'20px',
          background:cat.bg, color:cat.color, border:`1px solid ${cat.border}`,
          display:'inline-block', marginBottom:'12px' }}>
          {col.category}
        </span>
        <h1 style={{ fontSize:'20px', fontWeight:700, color:'#e8f0ff', lineHeight:1.5, marginBottom:'8px' }}>
          {col.title}
        </h1>
        <div style={{ fontSize:'11px', color:'var(--text3)', marginBottom:'24px' }}>
          {col.date}
        </div>
        <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'10px',
          padding:'6px 20px 20px', marginBottom:'28px' }}>
          <RenderBody text={col.body} />
        </div>
        <div style={{ background:'rgba(255,140,66,0.07)', border:'1px solid rgba(255,140,66,0.2)',
          borderRadius:'8px', padding:'14px 18px', fontSize:'12px', color:'#e8f0ff', lineHeight:1.8 }}>
          ⚠️ 本コラムは情報提供を目的としており、特定 of 銘柄・投資方法を推奨するも of ではありません。
          実際 of 投資判断はご自身 of 責任において行ってください。
        </div>

        {/* ⑤ 関連Themeセクション（col.themesフィールドベース） */}
        {col.themes && col.themes.length > 0 && onNavigate && (
          <div style={{ marginTop:'24px', padding:'16px 20px',
            background:'var(--bg2)', border:'1px solid var(--border)',
            borderRadius:'10px' }}>
            <div style={{ fontSize:'11px', fontWeight:600, color:'var(--text3)',
              letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'10px' }}>
              🔗 関連Theme
            </div>
            <p style={{ fontSize:'12px', color:'var(--text2)', lineHeight:1.8, marginBottom:'12px' }}>
              {'Related Themes: ' + col.themes.join('、')}
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              {col.themes.map(theme => (
                <div key={theme} style={{
                  background:'rgba(255,255,255,0.03)', borderRadius:'6px',
                  padding:'10px 12px', border:'1px solid rgba(255,255,255,0.06)',
                }}>
                  <div style={{ fontSize:'12px', fontWeight:700, color:'var(--text)',
                    marginBottom:'8px' }}>
                    {theme}
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                    <button
                      onClick={() => onNavigate('Theme Detail', theme)}
                      style={{ padding:'5px 12px', borderRadius:'5px', fontSize:'11px', fontWeight:600,
                        background:'rgba(170,119,255,0.1)', border:'1px solid rgba(170,119,255,0.3)',
                        color:'#aa77ff', cursor:'pointer', fontFamily:'var(--font)', transition:'all 0.15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background='rgba(170,119,255,0.2)'}
                      onMouseLeave={e => e.currentTarget.style.background='rgba(170,119,255,0.1)'}
                    >
                      📊 Theme詳細を見る
                    </button>
                    {THEME_ARTICLE_MAP[theme] && THEME_ARTICLE_MAP[theme] !== col.id && (
                      <button
                        onClick={() => onNavigate('Column', THEME_ARTICLE_MAP[theme])}
                        style={{ padding:'5px 12px', borderRadius:'5px', fontSize:'11px', fontWeight:600,
                          background:'rgba(74,158,255,0.07)', border:'1px solid rgba(74,158,255,0.2)',
                          color:'var(--accent)', cursor:'pointer', fontFamily:'var(--font)', transition:'all 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background='rgba(74,158,255,0.15)'}
                        onMouseLeave={e => e.currentTarget.style.background='rgba(74,158,255,0.07)'}
                      >
                        📖 関連コラムを読む
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Themeデータへ of リンクボタン */}
        {(() => {
          const CAT_TO_THEME = {
            'Semiconductor Equipment':'Semiconductor Equipment','Semiconductor Testing':'Semiconductor Testing',
            'Semiconductor Materials':'Semiconductor Materials','Memory':'Memory','Power Semiconductor':'Power Semiconductor',
            'Next-Gen Semiconductor':'Next-Gen Semiconductor','Generative AI':'Generative AI','AI Datacenter':'AI Datacenter',
            'Physical AI / Edge AI':'Edge AI','AI Semiconductor':'AI Semiconductor','AI Talent':'AI Talent','Edge AI':'Edge AI',
            'EV / Electric Vehicles':'EV / Electric Vehicles','All-Solid-State Battery':'All-Solid-State Battery','Autonomous Driving':'Autonomous Driving',
            'Drones':'Drones','Transport & Logistics':'Transport & Logistics','Shipbuilding':'Shipbuilding',
            'Renewable Energy':'Renewable Energy','Solar Power':'Solar Power',
            'Nuclear Fusion':'Nuclear Fusion','Nuclear Power':'Nuclear Power','Electric Utilities':'Electric Utilities',
            'LNG':'LNG','Oil & Gas':'Oil & Gas','Energy Storage':'Energy Storage',
            'Resources (H2/Helium/Water)':'Resources (H2/Helium/Water)',
            'IOWN':'IOWN','Optical Communication':'Optical Communication','Telecom':'Telecom',
            'Quantum Computing':'Quantum Computing','SaaS':'SaaS',
            'Wearables':'Wearables','仮想通貨':'仮想通貨','ネット銀行':'ネット銀行',
            'Steel & Materials':'Steel & Materials','Chemicals':'Chemicals','建築資材':'建築資材','塗料':'塗料',
            'Pharma & Biotech':'Pharma & Biotech','Healthcare & Nursing':'Healthcare & Nursing',
            '薬局・ドラッグストア':'薬局・ドラッグストア',
            'Banking/Finance':'Banking/Finance','地方銀行':'地方銀行','保険':'保険','Fintech':'Fintech',
            'Real Estate':'Real Estate','Construction & Infra':'Construction & Infra',
            'National Resilience':'National Resilience','下水道':'下水道',
            'Food & Beverage':'Food & Beverage','Agritech & Foodtech':'Agritech & Foodtech',
            'Retail & E-Commerce':'Retail & E-Commerce','観光・ホテル・レジャー':'観光・ホテル・レジャー',
            'Inbound Tourism':'Inbound Tourism','リユース・中古品':'リユース・中古品',
            'Defense & Aerospace':'Defense & Aerospace','Space & Satellite':'Space & Satellite','Robotics & Automation':'Robotics & Automation',
            'Rare Earth & Resources':'Rare Earth & Resources','Warren Buffett':'Warren Buffett',
            'Cyber Security':'Cyber Security','警備':'警備','脱炭素・ESG':'脱炭素・ESG',
            'Education & HR':'Education & HR','人材派遣':'人材派遣','Gaming & Entertainment':'Gaming & Entertainment',
          }
          const themeName = CAT_TO_THEME[col.category]
          if (!themeName || !onNavigate) return null
          return (
            <div style={{ marginTop:'20px', display:'flex', gap:'10px', flexWrap:'wrap' }}>
              <button
                onClick={() => onNavigate('Theme Detail', themeName)}
                style={{ display:'inline-flex', alignItems:'center', gap:'8px',
                  background:'rgba(74,158,255,0.1)', border:'1px solid rgba(74,158,255,0.3)',
                  borderRadius:'8px', color:'var(--accent)', cursor:'pointer',
                  fontFamily:'var(--font)', fontSize:'13px', fontWeight:600,
                  padding:'10px 20px', transition:'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(74,158,255,0.2)' }}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(74,158,255,0.1)' }}
              >
                📊 {themeName}Theme of データを見る
              </button>
              <button
                onClick={() => onNavigate('Theme List')}
                style={{ display:'inline-flex', alignItems:'center', gap:'8px',
                  background:'rgba(170,119,255,0.1)', border:'1px solid rgba(170,119,255,0.3)',
                  borderRadius:'8px', color:'#aa77ff', cursor:'pointer',
                  fontFamily:'var(--font)', fontSize:'13px', fontWeight:600,
                  padding:'10px 20px', transition:'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(170,119,255,0.2)' }}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(170,119,255,0.1)' }}
              >
                📈 全Theme Listを見る
              </button>
            </div>
          )
        })()}

        {/* 下部 of Backボタン */}
        <div style={{ marginTop:'32px', paddingTop:'24px', borderTop:'1px solid var(--border)', textAlign:'center' }}>
          <button onClick={() => closeArticle()} style={{
            display:'inline-flex', alignItems:'center', gap:'8px',
            background:'var(--bg2)', border:'1px solid var(--border)',
            borderRadius:'8px', color:'var(--text2)', cursor:'pointer',
            fontFamily:'var(--font)', fontSize:'13px', fontWeight:600,
            padding:'10px 28px', transition:'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text2)' }}
          >
            ← Back to column list
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding:'20px 32px 60px' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, letterSpacing:'-0.02em', color:'#e8f0ff', marginBottom:'4px' }}>
        Column
      </h1>
      <p style={{ fontSize:'13px', color:'var(--text3)', marginBottom:'24px' }}>
        Theme株投資 of 基礎から各Theme of 詳細解説まで、投資判断に役立つ情報を提供します。
      </p>

      {/* keyword・ThemeSearch */}
      <div style={{ position:'relative', marginBottom:'12px', maxWidth:'400px' }}>
        <input
          type="text"
          placeholder="keyword・Theme NameでSearch..."
          value={searchQuery}
          onChange={e => { setSearchQuery(e.target.value); setPage(1) }}
          style={{
            width:'100%', padding:'9px 36px 9px 14px',
            background:'var(--bg2)', border:'1px solid var(--border)',
            borderRadius:'8px', color:'var(--text)', fontSize:'13px',
            fontFamily:'var(--font)', outline:'none', boxSizing:'border-box',
          }}
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} style={{
            position:'absolute', right:'8px', top:'50%', transform:'translateY(-50%)',
            background:'none', border:'none', color:'var(--text3)', cursor:'pointer',
            fontSize:'14px', padding:'2px 4px',
          }}>✕</button>
        )}
      </div>

      {/* カテゴリフィルタ */}
      <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'24px' }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => { setActiveCat(cat); setPage(1) }} style={{
            padding:'5px 14px', borderRadius:'20px', fontSize:'12px', cursor:'pointer',
            fontFamily:'var(--font)', transition:'all 0.15s',
            border: activeCat === cat ? '1px solid var(--accent)' : '1px solid var(--border)',
            background: activeCat === cat ? 'rgba(74,158,255,0.12)' : 'transparent',
            color: activeCat === cat ? 'var(--accent)' : 'var(--text3)',
            fontWeight: activeCat === cat ? 600 : 400,
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Page情報 */}
      {filtered.length > 0 && (
        <div style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'12px' }}>
          {filtered.length} articles中 {(page-1)*ITEMS_PER_PAGE+1}〜{Math.min(page*ITEMS_PER_PAGE, filtered.length)} articles表示
        </div>
      )}

      {/* コラム一覧 */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:'14px' }} className="col-grid">
        {pagedItems.filter(Boolean).map((col, i) => {
          const cat = CAT_COLORS[col.category] || { bg:'rgba(74,158,255,0.1)', color:'#4a9eff', border:'rgba(74,158,255,0.25)' }
          return (
            <div key={col.id} onClick={() => openArticle(col.id)} style={{
              background:'var(--bg2)', border:'1px solid var(--border)',
              borderRadius:'10px', padding:'18px 20px', cursor:'pointer',
              animation:`fadeUp 0.3s ease ${i * 0.05}s both`,
              transition:'border-color 0.15s, transform 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(74,158,255,0.3)'; e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='translateY(0)' }}
            >
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}>
                <span style={{ fontSize:'20px' }}>{col.icon}</span>
                <span style={{ fontSize:'11px', fontWeight:600, padding:'2px 8px', borderRadius:'12px',
                  background:cat.bg, color:cat.color, border:`1px solid ${cat.border}` }}>
                  {col.category}
                </span>
                <span style={{ fontSize:'10px', color:'var(--text3)', marginLeft:'auto', fontFamily:'var(--mono)' }}>
                  {col.date}
                </span>
              </div>
              <h2 style={{ fontSize:'13px', fontWeight:700, color:'#e8f0ff', lineHeight:1.5, marginBottom:'8px' }}>
                {col.title}
              </h2>
              <p style={{ fontSize:'12px', color:'var(--text3)', lineHeight:1.7, margin:0,
                display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                {col.summary}
              </p>
              <div style={{ marginTop:'12px', fontSize:'11px', color:'var(--accent)', fontWeight:600 }}>
                続きを読む →
              </div>
            </div>
          )
        })}
      </div>

      {/* Pageネーション */}
      {totalPages > 1 && (
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center',
          gap:'8px', marginTop:'28px', flexWrap:'wrap' }}>
          <button onClick={() => { setPage(p => Math.max(1, p-1)); window.scrollTo(0,0) }}
            disabled={page === 1}
            style={{ padding:'6px 14px', borderRadius:'6px', border:'1px solid var(--border)',
              background: page === 1 ? 'transparent' : 'var(--bg2)',
              color: page === 1 ? 'var(--text3)' : 'var(--text)',
              cursor: page === 1 ? 'default' : 'pointer',
              fontFamily:'var(--font)', fontSize:'12px' }}>
            ← Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => { setPage(p); window.scrollTo(0,0) }}
              style={{ padding:'6px 12px', borderRadius:'6px', fontSize:'12px',
                fontFamily:'var(--font)', cursor:'pointer',
                border: p === page ? '1px solid var(--accent)' : '1px solid var(--border)',
                background: p === page ? 'rgba(74,158,255,0.15)' : 'var(--bg2)',
                color: p === page ? 'var(--accent)' : 'var(--text)',
                fontWeight: p === page ? 700 : 400 }}>
              {p}
            </button>
          ))}
          <button onClick={() => { setPage(p => Math.min(totalPages, p+1)); window.scrollTo(0,0) }}
            disabled={page === totalPages}
            style={{ padding:'6px 14px', borderRadius:'6px', border:'1px solid var(--border)',
              background: page === totalPages ? 'transparent' : 'var(--bg2)',
              color: page === totalPages ? 'var(--text3)' : 'var(--text)',
              cursor: page === totalPages ? 'default' : 'pointer',
              fontFamily:'var(--font)', fontSize:'12px' }}>
            Next →
          </button>
        </div>
      )}

      <style>{`
        @media (max-width:640px) { .col-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; } }
        @media (max-width:640px) { .col-grid > div { padding: 12px 12px !important; } }
      `}</style>
    </div>
  )
}
