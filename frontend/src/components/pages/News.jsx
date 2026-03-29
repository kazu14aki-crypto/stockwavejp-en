const NEWS = [
  { date:'2026/03/14', title:'React Version Released', body:'StockWaveJP has migrated to React + FastAPI. Design and mobile compatibility have been significantly improved.' },
  { date:'2026/03/01', title:'Volume & Trading Value Ranking Added', body:'Added volume and trading value ranking charts to the Theme List page.' },
  { date:'2026/02/15', title:'Fund Flow Momentum Feature Added', body:'Added a momentum page that shows accelerating, decelerating, and reversing themes at a glance.' },
]
export default function News() {
  return (
    <div style={{ padding:'28px 32px 48px' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, letterSpacing:'-0.02em', color:'#e8f0ff', marginBottom:'4px' }}>News</h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'28px' }}>Feature updates and announcements for StockWaveJP</p>
      {NEWS.map((n,i)=>(
        <div key={i} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'20px 24px', marginBottom:'12px', animation:`fadeUp 0.3s ease ${i*0.08}s both` }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'8px' }}>
            <span style={{ fontSize:'11px', color:'var(--text3)', fontFamily:'var(--mono)' }}>{n.date}</span>
            <span style={{ fontSize:'11px', padding:'2px 8px', borderRadius:'20px', background:'rgba(74,158,255,0.1)', color:'var(--accent)', border:'1px solid rgba(74,158,255,0.2)' }}>NEW</span>
          </div>
          <div style={{ fontSize:'15px', fontWeight:600, color:'#e8f0ff', marginBottom:'8px' }}>{n.title}</div>
          <div style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.7 }}>{n.body}</div>
        </div>
      ))}
    </div>
  )
}
