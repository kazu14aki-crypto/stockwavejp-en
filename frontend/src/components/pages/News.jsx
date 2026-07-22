import { useEffect, useState } from 'react'

// 手動UpdatedのNewsリスト（新しい順）
const MANUAL_NEWS = [
  { date:'2026/07/22', title:'Japan’s Growth Strategy and current policy column published', body:'Covers proactive fiscal policy, 17 strategic fields, AI and semiconductors, defense, energy, shipbuilding, resilience, wages, regions and finance.' },
  { date:'2026/07/22', title:'NVIDIA and Japanese-company collaboration column published', body:'Reviews physical AI, Noetra, the Fujitsu/Fanuc/Yaskawa/Kawasaki platform, Toyota, SoftBank, Hitachi and the revenue opportunities and risks for Japanese companies.' },
  { date:'2026/07/22', title:'Eleven additional theme guides published', body:'Added guides for next-generation semiconductors, fusion, nuclear, quantum computing, wearables, coatings, security services, wires and copper, advanced packaging, data-center power and cooling, and M&A succession.' },
  { date:'2026/07/20', title:'Global selloff and KOSPI column published', body:'Analyzes the global selloff through KOSPI concentration, semiconductors, memory, leverage, rates and oil.' },
  { date:'2026/07/19', title:'Theme-selection criteria published', body:'Explains theme creation, constituent inclusion and removal, overlap and review policy.' },
  { date:'2026/05/29', title:'Weekly report published and MLCC theme added', body:'Published the May 25–29 report and added MLCC & Electronic Components.' },
  { date:'2026/05/22', title:'Weekly report for May 18–22 published', body:'Summarizes weekly moves in defense, space, cybersecurity and other themes.' },
]

const DATA_URL = '/data/market.json'

export default function News() {
  const [actions, setActions] = useState([])

  // market.jsonからStockAction（分割・廃止等）を取得
  useEffect(() => {
    fetch(`${DATA_URL}?t=${Date.now()}`)
      .then(r => r.json())
      .then(json => {
        const acts = json.corporate_actions || []
        setActions(acts)
      })
      .catch(() => {})
  }, [])

  // 最新日付を特定（NEWバッジ用）
  const allDates = MANUAL_NEWS.map(n => n.date)
  const latestDate = allDates.length > 0 ? allDates.reduce((a,b) => a > b ? a : b) : null

  return (
    <div style={{ padding:'28px 32px 48px' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, letterSpacing:'-0.02em', color:'#e8f0ff', marginBottom:'4px' }}>
        News
      </h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'28px' }}>
        StockWaveJP columns, reports and theme updates
      </p>

      {/* StockAction（自動取得） */}
      {actions.length > 0 && (
        <div style={{ marginBottom:'24px' }}>
          <div style={{ fontSize:'12px', fontWeight:700, color:'var(--text2)',
            letterSpacing:'0.06em', textTransform:'uppercase',
            marginBottom:'10px', display:'flex', alignItems:'center', gap:'8px' }}>
            <span>📢 Corporate Actions</span>
            <div style={{ flex:1, height:'1px', background:'var(--border)' }}/>
          </div>
          {actions.map((a, i) => (
            <div key={i} style={{
              background:'rgba(255,214,25,0.06)', border:'1px solid rgba(255,214,25,0.2)',
              borderRadius:'8px', padding:'12px 16px', marginBottom:'8px',
              display:'flex', alignItems:'flex-start', gap:'12px',
            }}>
              <span style={{ fontSize:'10px', fontWeight:700, padding:'2px 8px', borderRadius:'20px',
                background:'rgba(255,214,25,0.15)', color:'#ffd619',
                border:'1px solid rgba(255,214,25,0.3)', flexShrink:0, marginTop:'1px' }}>
                {a.type === 'split'  ? 'Stock split' :
                 a.type === 'merge'  ? 'Reverse split' :
                 a.type === 'delist' ? 'Delisting' :
                 a.type === 'rename' ? 'Company-name change' : 'Action'}
              </span>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:'13px', fontWeight:600, color:'var(--text)', marginBottom:'3px' }}>
                  {a.name}（{a.ticker?.replace('.T','')}）
                </div>
                <div style={{ fontSize:'12px', color:'var(--text2)', lineHeight:1.7 }}>
                  {a.detail}
                </div>
                <div style={{ fontSize:'10px', color:'var(--text3)', marginTop:'4px', fontFamily:'var(--mono)' }}>
                  Detected: {a.detected_at}
                  {a.effective_date && ` / Effective date: ${a.effective_date}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 手動News */}
      <div style={{ fontSize:'12px', fontWeight:700, color:'var(--text2)',
        letterSpacing:'0.06em', textTransform:'uppercase',
        marginBottom:'10px', display:'flex', alignItems:'center', gap:'8px' }}>
        <span>📋 Content updates</span>
        <div style={{ flex:1, height:'1px', background:'var(--border)' }}/>
      </div>
      {MANUAL_NEWS.map((n, i) => (
        <div key={i} style={{
          background:'var(--bg2)', border:'1px solid var(--border)',
          borderRadius:'var(--radius)', padding:'20px 24px', marginBottom:'12px',
          animation:`fadeUp 0.3s ease ${i*0.06}s both`,
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'8px' }}>
            <span style={{ fontSize:'11px', color:'var(--text3)', fontFamily:'var(--mono)' }}>
              {n.date}
            </span>
            {n.date === latestDate && (
              <span style={{ fontSize:'10px', padding:'2px 8px', borderRadius:'20px',
                background:'rgba(74,158,255,0.12)', color:'var(--accent)',
                border:'1px solid rgba(74,158,255,0.25)', fontWeight:700 }}>
                NEW
              </span>
            )}
          </div>
          <div style={{ fontSize:'15px', fontWeight:600, color:'#e8f0ff', marginBottom:'8px' }}>
            {n.title}
          </div>
          <div style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.7 }}>
            {n.body}
          </div>
        </div>
      ))}
    </div>
  )
}
