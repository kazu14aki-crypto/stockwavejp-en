import { useState } from 'react'

const COLUMNS = [
  { id:'theme-investing-basics', category:'Basics', icon:'📘', date:'2026/03/20',
    title:'What is Theme Investing? How It Differs from Individual Stocks & Index Funds',
    summary:'You may have heard news like "semiconductor stocks surged" or "capital concentrating in AI stocks." This article explains what theme investing is and its merits and risks from the ground up.',
    body:`## What is Theme Investing?

Theme investing is an investment style that groups multiple stocks related to specific social trends or technological innovations as a "theme" and analyzes the overall movement of that theme.

For example, for the "Semiconductors" theme, semiconductor equipment manufacturers, material manufacturers, and design companies are viewed as one group within the semiconductor industry.

## Difference from Individual Stock Investing

Individual stock investing involves deep analysis of a single company's performance and financials before trading. Theme investing, on the other hand, focuses on grasping the big picture of "which industries and technologies capital is flowing into."

The risk of large losses due to a single company's earnings miss can be mitigated by diversification across the entire theme.

## Difference from Index Investing

Index investing (e.g., tracking the Nikkei Average or S&P 500) invests in the entire market. Theme investing focuses on "specific high-growth areas" within that market.

While there is potential for higher returns than indices, there is also the risk of sharp declines if a theme becomes obsolete.

## Theme Stock Cycles

Theme stocks have a cycle of "attention phase → heating phase → correction phase → maturity phase." Large returns can be expected by entering early when attention begins, but entering after overheating risks buying at the peak.

Reading which phase you are in by combining return rates, volume, and trading value is the core of theme investing.`,
  },
  { id:'semiconductor-theme', category:'Semiconductors', icon:'⚡', date:'2026/03/18',
    title:'Semiconductors Deep Dive: Structural Growth Driven by AI Demand & Key Stock Relationships',
    summary:'Semiconductors are called the "rice of modern industry." AI, EVs, and smartphones all need them. We explain the structure of the semiconductor theme and the roles of major domestic stocks.',
    body:`## Why Semiconductors Are in Focus

Semiconductors are used in smartphones, computers, automobiles, home appliances, industrial equipment, and data centers running generative AI. Since the generative AI boom from 2023, demand for GPUs and HBM (High Bandwidth Memory) has exploded, making semiconductor-related stocks globally prominent.

## Semiconductor Value Chain & Japanese Companies

**Manufacturing Equipment (Core Strength)**
- Tokyo Electron (8035): World top share in etching equipment and coaters/developers
- Advantest (6857): World top in semiconductor test equipment
- Disco (6146): Dominant market share in dicing/grinding equipment
- Lasertec (6920): Near-monopoly in EUV mask defect inspection equipment

**Design/SoC**
- Renesas Electronics (6723): World top 3 in automotive microcontrollers
- Socionext (6526): Pure-play SoC design (fabless)

**Materials**
- SUMCO (3436): World #2 in silicon wafers

## Recent Topics

- Explosive growth in advanced semiconductor (2nm/3nm) equipment demand
- HBM (High Bandwidth Memory) inspection equipment demand increase
- Japan-US semiconductor supply chain reconstruction (TSMC Kumamoto, etc.)
- Export control developments (China restrictions affecting equipment makers)`,
  },
  { id:'how-to-read-data', category:'Analysis', icon:'📊', date:'2026/03/08',
    title:'How to Read Return Rate, Volume & Trading Value: 3 Key Indicators for Theme Analysis',
    summary:'This article explains what each of the 3 indicators on StockWaveJP (return rate, volume, trading value) means and how to use them in actual theme analysis.',
    body:`## The 3 Key Indicators

### 1. Return Rate (Price Change %)

Shows the rate of price change within the period. Represents "how much this theme rose (or fell) on average during the period."

A theme's return rate is calculated as the average of the return rates of stocks within the theme.

**How to Use**
- Compare all themes to see "which theme capital is entering right now"
- Change periods (1W, 1M, 3M, 1Y) to check "is it short-term movement or a long-term trend"

### 2. Volume (Trading Quantity)

The number of shares traded during the period. Higher volume indicates greater market participant interest in that theme.

**How to Use**
- High return rate but low volume → "A catalyst appeared but overall market interest is low"
- Rising return rate + increasing volume → "Possibility of serious capital inflow"

### 3. Trading Value (Transaction Amount)

An amount-based indicator calculated as volume × price. Themes with many high-priced stocks will have large trading values even with low volume.

**How to Use**
- Trading value is most appropriate for understanding actual "money movement" in themes
- Movements of institutional and large investors tend to be reflected in trading value

## Combined Analysis of 3 Indicators

| Return | Volume | Trading Value | Interpretation |
|---|---|---|---|
| Rise↑ | Increase↑ | Increase↑ | Strong uptrend, capital inflow accelerating |
| Rise↑ | Decrease↓ | Decrease↓ | Rise is temporary, momentum weakening |
| Fall↓ | Increase↑ | Increase↑ | Sharp drop/panic selling |
| Fall↓ | Decrease↓ | Decrease↓ | Quiet correction, waiting for bottom |

## Important Note

These indicators are "reference information" and do not guarantee future stock prices. Always consider company financials, macroeconomics, and your own risk tolerance comprehensively for actual investment decisions.`,
  },
]

const CATEGORIES = ['All', 'Theme', 'Basics', 'Analysis']
const CAT_COLORS = {
  'Basics':      { bg:'rgba(74,158,255,0.1)',  color:'#4a9eff',  border:'rgba(74,158,255,0.25)' },
  'Semiconductors':{ bg:'rgba(255,69,96,0.1)', color:'#ff4560',  border:'rgba(255,69,96,0.25)' },
  'AI/Cloud':    { bg:'rgba(170,119,255,0.1)', color:'#aa77ff',  border:'rgba(170,119,255,0.25)' },
  'Defense':     { bg:'rgba(76,175,130,0.1)',  color:'#4caf82',  border:'rgba(76,175,130,0.25)' },
  'Inbound':     { bg:'rgba(255,140,66,0.1)',  color:'#ff8c42',  border:'rgba(255,140,66,0.25)' },
  'EV/Green':    { bg:'rgba(6,214,160,0.1)',   color:'#06d6a0',  border:'rgba(6,214,160,0.25)' },
  'Analysis':    { bg:'rgba(255,214,25,0.1)',  color:'#ffd619',  border:'rgba(255,214,25,0.25)' },
}

function RenderBody({ text }) {
  const lines = text.trim().split('\n')
  const elements = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i].trim()
    if (!line) { i++; continue }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} style={{ fontSize:'16px', fontWeight:700, color:'#e8f0ff', margin:'24px 0 10px', borderBottom:'1px solid var(--border)', paddingBottom:'6px' }}>{line.slice(3)}</h2>)
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(<p key={i} style={{ fontSize:'13px', fontWeight:700, color:'var(--accent)', margin:'14px 0 6px' }}>{line.slice(2,-2)}</p>)
    } else if (line.startsWith('- ')) {
      const items = []
      while (i < lines.length && lines[i].trim().startsWith('- ')) { items.push(lines[i].trim().slice(2)); i++ }
      elements.push(<ul key={`ul-${i}`} style={{ margin:'6px 0 12px', paddingLeft:'20px' }}>{items.map((item,j)=><li key={j} style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.8, marginBottom:'2px' }}>{item}</li>)}</ul>)
      continue
    } else if (line.startsWith('| ')) {
      const rows = []
      while (i < lines.length && lines[i].trim().startsWith('| ')) { if (!lines[i].includes('---')) rows.push(lines[i].trim().split('|').filter(c=>c.trim()).map(c=>c.trim())); i++ }
      if (rows.length > 0) elements.push(<div key={`t-${i}`} style={{ overflowX:'auto', margin:'12px 0 20px' }}><table style={{ borderCollapse:'collapse', fontSize:'12px', width:'100%', minWidth:'400px' }}><thead><tr>{rows[0].map((h,j)=><th key={j} style={{ padding:'8px 12px', textAlign:'left', borderBottom:'1px solid var(--border)', color:'var(--text3)', fontWeight:600, background:'var(--bg3)', whiteSpace:'nowrap' }}>{h}</th>)}</tr></thead><tbody>{rows.slice(1).map((row,ri)=><tr key={ri} style={{ borderBottom:'1px solid rgba(255,255,255,0.04)' }}>{row.map((cell,ci)=><td key={ci} style={{ padding:'8px 12px', color:'var(--text2)', lineHeight:1.6 }}>{cell}</td>)}</tr>)}</tbody></table></div>)
      continue
    } else {
      elements.push(<p key={i} style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.9, margin:'0 0 12px' }}>{line}</p>)
    }
    i++
  }
  return <div>{elements}</div>
}

export default function Column() {
  const [activeCat, setActiveCat] = useState('All')
  const [activeCol, setActiveCol] = useState(null)
  const THEME_CATS = ['Semiconductors','AI/Cloud','Defense','Inbound','EV/Green']
  const filtered = activeCat === 'All' ? COLUMNS
    : activeCat === 'Theme' ? COLUMNS.filter(c => THEME_CATS.includes(c.category))
    : COLUMNS.filter(c => c.category === activeCat)

  if (activeCol) {
    const col = COLUMNS.find(c => c.id === activeCol)
    const cat = CAT_COLORS[col.category] || CAT_COLORS['Basics']
    return (
      <div style={{ padding:'20px 32px 60px', maxWidth:'760px', margin:'0 auto' }}>
        <button onClick={() => setActiveCol(null)} style={{ display:'flex', alignItems:'center', gap:'6px', background:'transparent', border:'none', color:'var(--accent)', fontSize:'13px', cursor:'pointer', fontFamily:'var(--font)', padding:'0', marginBottom:'20px' }}>← Back to Column List</button>
        <span style={{ fontSize:'11px', fontWeight:600, padding:'3px 10px', borderRadius:'20px', background:cat.bg, color:cat.color, border:`1px solid ${cat.border}`, display:'inline-block', marginBottom:'12px' }}>{col.category}</span>
        <h1 style={{ fontSize:'20px', fontWeight:700, color:'#e8f0ff', lineHeight:1.5, marginBottom:'8px' }}>{col.title}</h1>
        <div style={{ fontSize:'11px', color:'var(--text3)', marginBottom:'24px' }}>{col.date}</div>
        <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'10px', padding:'6px 20px 20px', marginBottom:'28px' }}>
          <RenderBody text={col.body} />
        </div>
        <div style={{ background:'rgba(255,140,66,0.07)', border:'1px solid rgba(255,140,66,0.2)', borderRadius:'8px', padding:'14px 18px', fontSize:'12px', color:'var(--text2)', lineHeight:1.8 }}>
          ⚠️ This column is for informational purposes only and does not recommend specific stocks or investment methods. Please make all investment decisions at your own risk and judgment.
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding:'20px 32px 60px' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, letterSpacing:'-0.02em', color:'#e8f0ff', marginBottom:'4px' }}>Column</h1>
      <p style={{ fontSize:'13px', color:'var(--text3)', marginBottom:'24px' }}>From investment basics to detailed theme analysis — information to support your investment decisions.</p>
      <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'24px' }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCat(cat)} style={{ padding:'5px 14px', borderRadius:'20px', fontSize:'12px', cursor:'pointer', fontFamily:'var(--font)', transition:'all 0.15s', border: activeCat===cat ? '1px solid var(--accent)' : '1px solid var(--border)', background: activeCat===cat ? 'rgba(74,158,255,0.12)' : 'transparent', color: activeCat===cat ? 'var(--accent)' : 'var(--text3)', fontWeight: activeCat===cat ? 600 : 400 }}>{cat}</button>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }} className="col-grid">
        {filtered.map((col, i) => {
          const cat = CAT_COLORS[col.category] || CAT_COLORS['Basics']
          return (
            <div key={col.id} onClick={() => setActiveCol(col.id)} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'10px', padding:'18px 20px', cursor:'pointer', animation:`fadeUp 0.3s ease ${i*0.05}s both`, transition:'border-color 0.15s, transform 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(74,158,255,0.3)'; e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='translateY(0)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}>
                <span style={{ fontSize:'20px' }}>{col.icon}</span>
                <span style={{ fontSize:'11px', fontWeight:600, padding:'2px 8px', borderRadius:'12px', background:cat.bg, color:cat.color, border:`1px solid ${cat.border}` }}>{col.category}</span>
                <span style={{ fontSize:'10px', color:'var(--text3)', marginLeft:'auto', fontFamily:'var(--mono)' }}>{col.date}</span>
              </div>
              <h2 style={{ fontSize:'13px', fontWeight:700, color:'#e8f0ff', lineHeight:1.5, marginBottom:'8px' }}>{col.title}</h2>
              <p style={{ fontSize:'12px', color:'var(--text3)', lineHeight:1.7, margin:0, display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{col.summary}</p>
              <div style={{ marginTop:'12px', fontSize:'11px', color:'var(--accent)', fontWeight:600 }}>Read more →</div>
            </div>
          )
        })}
      </div>
      <style>{`@media (max-width:640px) { .col-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}
