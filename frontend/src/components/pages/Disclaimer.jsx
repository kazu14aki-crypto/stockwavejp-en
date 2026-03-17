const SECTIONS = [
  { title:'Disclaimer', body:'StockWaveJP is intended solely for reference purposes and does not constitute investment advice or recommendations. For any investment decisions, please consult a qualified financial professional.' },
  { title:'Data Accuracy', body:'Data provided by this tool is retrieved via yfinance and is not real-time (typically delayed 5-20 minutes). We make no guarantees regarding the accuracy, completeness, or timeliness of the data. For actual trading, always verify with official exchange data.' },
  { title:'Intellectual Property', body:'The code, design, and data structure of this tool are protected by copyright. Unauthorized reproduction, modification, or commercial use is strictly prohibited.' },
  { title:'Limitation of Liability', body:'We accept no responsibility for any damages arising from the use of this tool. This tool is provided as-is without any warranties of any kind.' },
  { title:'Contact', body:null, isContact:true },
]
export default function Disclaimer() {
  return (
    <div style={{ padding:'28px 32px 48px' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, letterSpacing:'-0.02em', color:'var(--text)', marginBottom:'4px' }}>Disclaimer</h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'28px' }}>Terms of use, disclaimer, and contact information for StockWaveJP.</p>
      {SECTIONS.map((s,i) => (
        <div key={i} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'20px 24px', marginBottom:'12px', animation:`fadeUp 0.3s ease ${i*0.06}s both` }}>
          <div style={{ fontSize:'14px', fontWeight:700, color:'var(--text)', marginBottom:'10px' }}>{s.title}</div>
          {s.isContact ? (
            <div style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.8 }}>
              <p style={{ marginBottom:'12px' }}>For bug reports, feature requests, or general inquiries, please contact us via X (Twitter) DM.</p>
              <a href="https://twitter.com/StockWaveJP" target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'rgba(91,156,246,0.1)', border:'1px solid rgba(91,156,246,0.25)', borderRadius:'8px', padding:'12px 20px', color:'var(--accent)', textDecoration:'none', fontWeight:600, fontSize:'14px', transition:'all 0.15s' }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(91,156,246,0.2)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(91,156,246,0.1)'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                <span>StockWaveJP @StockWaveJP</span>
              </a>
              <p style={{ marginTop:'12px', fontSize:'12px', color:'var(--text3)' }}>* Response may take some time. Thank you for your patience.</p>
            </div>
          ) : (
            <div style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.8 }}>{s.body}</div>
          )}
        </div>
      ))}
      <div style={{ fontSize:'12px', color:'var(--text3)', marginTop:'20px', textAlign:'center' }}>
        &copy; 2026 StockWaveJP. All rights reserved.
      </div>
    </div>
  )
}