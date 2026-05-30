export default function Disclaimer() {
  const s = { padding:'32px 28px 60px', maxWidth:'780px', margin:'0 auto', lineHeight:1.9, fontSize:'13px', color:'var(--text2)' }
  const h1 = { fontSize:'22px', fontWeight:700, color:'var(--text)', marginBottom:'8px' }
  const h2 = { fontSize:'14px', fontWeight:700, color:'var(--text)', margin:'24px 0 8px', paddingBottom:'6px', borderBottom:'1px solid var(--border)' }
  const p  = { marginBottom:'12px' }
  return (
    <div style={s}>
      <h1 style={h1}>Disclaimer</h1>
      <h2 style={h2}>No Investment Advice</h2>
      <p style={p}>All content on StockWaveJP — including theme analysis, stock data, weekly reports, column articles, and AI-generated commentary — is provided for informational and educational purposes only. Nothing on this platform constitutes investment advice, a recommendation to buy or sell any security, or a solicitation of any investment.</p>
      <h2 style={h2}>Accuracy of Data</h2>
      <p style={p}>While we strive to provide accurate and up-to-date information, StockWaveJP makes no warranties regarding the completeness, accuracy, or timeliness of any data. Market data may be delayed and should not be used as the sole basis for investment decisions.</p>
      <h2 style={h2}>Investment Risk</h2>
      <p style={p}>Investing in stocks involves risk, including the possible loss of principal. Past performance is not indicative of future results. You should only invest money you can afford to lose.</p>
      <h2 style={h2}>Your Responsibility</h2>
      <p style={p}>All investment decisions are solely your responsibility. We strongly recommend consulting a licensed financial advisor before making investment decisions. StockWaveJP and its operators shall not be liable for any financial losses arising from the use of this Service.</p>
      <h2 style={h2}>Forward-Looking Statements</h2>
      <p style={p}>Any statements about future market conditions, company performance, or investment opportunities are forward-looking and inherently uncertain. Actual results may differ materially.</p>
    </div>
  )
}
