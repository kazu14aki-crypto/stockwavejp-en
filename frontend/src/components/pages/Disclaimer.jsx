export default function Disclaimer() {
  const s={padding:'32px 28px 60px',maxWidth:'780px',margin:'0 auto',lineHeight:1.9,fontSize:'13px',color:'var(--text2)'}
  const h1={fontSize:'22px',fontWeight:700,color:'var(--text)',marginBottom:'8px'}
  const h2={fontSize:'14px',fontWeight:700,color:'var(--text)',margin:'24px 0 8px',paddingBottom:'6px',borderBottom:'1px solid var(--border)'}
  const p={marginBottom:'12px'}
  return (
    <div style={s}>
      <h1 style={h1}>Disclaimer</h1>
      <h2 style={h2}>No Investment Advice</h2>
      <p style={p}>All content on StockWaveJP is provided for informational and educational purposes only. Nothing constitutes investment advice, a recommendation to buy or sell any security, or a solicitation of any investment.</p>
      <h2 style={h2}>Accuracy of Data</h2>
      <p style={p}>Market data may be delayed. StockWaveJP makes no warranties regarding the accuracy or completeness of any data on this platform.</p>
      <h2 style={h2}>Investment Risk</h2>
      <p style={p}>Investing involves risk, including possible loss of principal. Past performance is not indicative of future results.</p>
      <h2 style={h2}>Your Responsibility</h2>
      <p style={p}>All investment decisions are solely your responsibility. We strongly recommend consulting a licensed financial advisor. StockWaveJP shall not be liable for any financial losses.</p>
    </div>
  )
}
