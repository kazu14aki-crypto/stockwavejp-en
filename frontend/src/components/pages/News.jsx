export default function News({ onNavigate }) {
  const UPDATES = [
    { date:'2026/05/29', title:'Column articles expanded to 69 total', body:'All 69 column articles have been fully translated to English with extended content.' },
    { date:'2026/04/01', title:'Added 8 column articles + improved descriptions', body:'Added column articles. Expanded descriptions and tips on each page.' },
    { date:'2026/03/31', title:'Custom Theme feature enhanced', body:'Multi-device sync via Google login. Up to 3 themes and 10 stocks per theme.' },
    { date:'2026/03/28', title:'Renamed Market Ranking page', body:'Renamed from Market Detail to Market Ranking to better reflect content.' },
    { date:'2026/03/14', title:'React version launched', body:'StockWaveJP migrated to React + FastAPI architecture.' },
    { date:'2026/03/01', title:'Added Volume & Trading Value Rankings', body:'Added Volume and Trading Value rankings to the Theme List page.' },
    { date:'2026/02/15', title:'New: Price Momentum feature', body:'Added momentum classification (Accel / Stall / Reversing) using WoW and MoM changes.' },
  ]

  const sectionTitle = { fontSize:'11px', fontWeight:700, color:'var(--text3)',
    letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'8px', display:'block' }

  return (
    <div style={{ padding:'24px 28px 60px', maxWidth:'760px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'20px', fontWeight:700, color:'var(--text)', marginBottom:'6px' }}>📢 News & Updates</h1>
      <p style={{ fontSize:'13px', color:'var(--text3)', marginBottom:'24px' }}>Feature updates, changes, and bug fixes for StockWaveJP.</p>

      <span style={sectionTitle}>📋 Release Notes</span>
      <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
        {UPDATES.map((u, i) => (
          <div key={i} style={{
            background:'var(--bg2)', border:'1px solid var(--border)',
            borderRadius:'8px', padding:'14px 18px',
          }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'6px' }}>
              <span style={{ fontSize:'13px', fontWeight:700, color:'var(--text)' }}>{u.title}</span>
              <span style={{ fontSize:'11px', color:'var(--text3)', whiteSpace:'nowrap', marginLeft:'12px' }}>{u.date}</span>
            </div>
            <p style={{ fontSize:'12px', color:'var(--text2)', lineHeight:1.7, margin:0 }}>{u.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
