const SECTIONS = [
  { title:'Purpose & Responsibility', body:'StockWaveJP is designed to provide reference information for analyzing stock market trends. It does not constitute investment solicitation, recommendation of specific securities, or investment advice. All investment decisions are the sole responsibility of the user.' },
  { title:'Independent Data Aggregation', body:"The figures displayed on this site (average return rates and aggregated data for groups such as 'Major 225 stocks', 'Large-cap 70 companies', etc.) are independently calculated by this site based on the closing prices of individual constituent stocks. They are not the official index values published by Nikkei Inc. ('Nikkei Stock Average') or JPX Market Innovation & Research, Inc. ('TOPIX')." },
  { title:'Data Accuracy & Sources', body:'Information on this site is obtained from data providers believed to be reliable, but we do not guarantee the accuracy, completeness, or timeliness of the data. Provided data includes market-dependent delays (approximately 15–20 minutes, or daily updates). Please always verify official data from your broker before making actual investments.' },
  { title:'Liability for Damages', body:'The operator bears no responsibility for any damages (direct or indirect) arising from the use of this tool. This service is provided "as is", and the same applies to damages caused by maintenance, interruptions, or malfunctions.' },
  { title:'Copyright', body:'The code, design, and data structure of this tool are protected by copyright. Unauthorized reproduction, copying, or commercial use is prohibited.' },
]
export default function Disclaimer() {
  return (
    <div style={{ padding:'28px 32px 48px' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, color:'var(--text)', marginBottom:'4px' }}>Disclaimer</h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'28px' }}>StockWaveJP Disclaimer</p>
      {SECTIONS.map((s,i) => (
        <div key={i} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'20px 24px', marginBottom:'12px', animation:`fadeUp 0.3s ease ${i*0.06}s both` }}>
          <div style={{ fontSize:'14px', fontWeight:700, color:'var(--text)', marginBottom:'10px', borderLeft:'3px solid var(--accent)', paddingLeft:'10px' }}>{s.title}</div>
          <div style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.9 }}>{s.body}</div>
        </div>
      ))}
      <div style={{ fontSize:'12px', color:'var(--text3)', marginTop:'20px', textAlign:'center' }}>© 2026 StockWaveJP. All rights reserved.</div>
    </div>
  )
}
