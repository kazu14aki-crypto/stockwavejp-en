import { useState } from 'react'

const MANUAL_NEWS = [
  { date:'2026/05/29', title:'MLCC Theme Added + Murata & MLCC Column Articles Published', body:'New MLCC/Electronic Components theme (14 stocks incl. Murata 6981, TDK 6762, Taiyo Yuden 6976). Two in-depth English columns published: Murata Manufacturing analysis and MLCC industry overview.' },
  { date:'2026/05/29', title:'Weekly Report (May 25-29) Published', body:'MLCC/Electronic Components theme led all themes (+9.4%). Defense & Aerospace continued its 3-week winning streak. Avg theme change: +0.82%.' },
  { date:'2026/05/22', title:'Weekly Report (May 18-22) Published', body:'Defense & Aerospace topped again (+8.1%). Cyber Security and Next-Gen Semiconductor also strong. Avg theme change: +1.24%.' },
  { date:'2026/05/19', title:'Institutional Holdings Page Added', body:'New page showing major shareholders (5%+ ownership) from EDINET filings. Searchable by stock ticker or institution name. Pro plan only.' },
  { date:'2026/05/18', title:'Pricing Plans Launched — 30-Day Pro Trial for New Users', body:'Pricing page is now live. Standard ($20/mo) and Pro ($30/mo) plans coming soon. All new users automatically receive a free 30-day Pro trial upon first login.' },
  { date:'2026/05/15', title:'Weekly Report (May 11-15) Published', body:'Defense & Aerospace (+8.6%) led for the second consecutive week. Semiconductor equipment also surged.' },
  { date:'2026/05/08', title:'Weekly Report (May 4-8) Published', body:'Post-Golden Week surge. Semiconductor equipment (+12.4%) led all themes. Defense-related and optical communication themes also rose sharply.' },
  { date:'2026/03/14', title:'StockWaveJP English Version Launched', body:'StockWaveJP is now available in English. Track 67+ Japanese stock themes in real-time.' },
]

export default function News({ onNavigate }) {
  const [expanded, setExpanded] = useState(null)

  return (
    <div style={{ padding:'16px 16px 60px', maxWidth:'860px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'22px', fontWeight:700, color:'var(--text)', marginBottom:'6px' }}>📣 News & Updates</h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'20px' }}>Latest updates and announcements from StockWaveJP.</p>

      <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
        {MANUAL_NEWS.map((n, i) => (
          <div key={i} onClick={() => setExpanded(expanded === i ? null : i)}
            style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'10px',
              padding:'14px 16px', cursor:'pointer',
              borderLeft: i === 0 ? '3px solid var(--accent)' : '3px solid transparent' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'6px', flexWrap:'wrap' }}>
              <span style={{ fontSize:'11px', color:'var(--text3)', fontFamily:'var(--mono)' }}>{n.date}</span>
              {i === 0 && (
                <span style={{ fontSize:'10px', fontWeight:700, padding:'2px 8px', borderRadius:'10px',
                  background:'rgba(74,158,255,0.15)', color:'var(--accent)', border:'1px solid rgba(74,158,255,0.3)' }}>
                  NEW
                </span>
              )}
            </div>
            <div style={{ fontSize:'13px', fontWeight:600, color:'var(--text)', marginBottom: expanded === i ? '10px' : 0 }}>
              {n.title}
            </div>
            {expanded === i && n.body && (
              <div style={{ fontSize:'12px', color:'var(--text2)', lineHeight:1.7, marginTop:'8px',
                paddingTop:'8px', borderTop:'1px solid var(--border)' }}>
                {n.body}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
