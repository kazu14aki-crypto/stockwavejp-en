export default function SiteInfo({ onNavigate }) {
  const card = { background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'12px', padding:'20px', marginBottom:'16px' }
  const h2   = { fontSize:'14px', fontWeight:700, color:'var(--text)', marginBottom:'12px', paddingBottom:'6px', borderBottom:'1px solid var(--border)' }
  const row  = (label, value) => (
    <div key={label} style={{ display:'grid', gridTemplateColumns:'160px 1fr', gap:'8px 16px', padding:'8px 0',
      borderBottom:'1px solid rgba(255,255,255,0.05)', fontSize:'13px' }}>
      <span style={{ color:'var(--text3)', fontWeight:600 }}>{label}</span>
      <span style={{ color:'var(--text2)' }}>{value}</span>
    </div>
  )
  return (
    <div style={{ padding:'16px 16px 60px', maxWidth:'860px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'22px', fontWeight:700, color:'var(--text)', marginBottom:'6px' }}>🏢 About StockWaveJP</h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'24px' }}>
        StockWaveJP is a Japanese stock theme tracker for investors who want to ride macro trends — not just pick individual stocks.
      </p>

      <div style={card}>
        <h2 style={h2}>Site Information</h2>
        {row('Service Name', 'StockWaveJP (English Edition)')}
        {row('URL', 'https://stockwavejp-en.com')}
        {row('Launched', 'March 2026')}
        {row('Operator', 'StockWaveJP Editorial Team (Japan-based part-time investor in JP & US equities)')}
        {row('Contact', 'stockwavejp26@gmail.com')}
        {row('Language', 'English')}
      </div>

      <div style={card}>
        <h2 style={h2}>Key Features</h2>
        <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
          {[
            '📊 Track 67+ Japanese stock themes in real-time (price change, volume, trading value)',
            '🔥 Visualize capital flows with the Theme Heatmap',
            '🔍 Drill into individual stocks within any theme',
            '📰 Weekly market reports summarizing top/bottom themes',
            '🎨 Build your own watchlist with Custom Themes',
            '🏦 Access institutional holdings data from EDINET (Pro plan)',
            '📝 In-depth column articles on themes and individual Japanese stocks',
            '🔎 Stock Search with links to themes and related columns',
          ].map((f, i) => (
            <div key={i} style={{ fontSize:'13px', color:'var(--text2)', display:'flex', gap:'8px', alignItems:'flex-start' }}>
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={card}>
        <h2 style={h2}>Data Sources</h2>
        {row('Stock Price Data', 'Infoway (data.infoway.io) — Japan equity OHLCV data')}
        {row('Institutional Holdings', 'EDINET (Financial Services Agency of Japan)')}
        {row('Update Frequency', 'Periodically during market hours (9:00–16:00 JST, weekdays)')}
        {row('Note', 'Yahoo Finance is not used. All data is from licensed commercial sources.')}
      </div>

      <div style={card}>
        <h2 style={h2}>About the Operator</h2>
        <p style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.8, marginBottom:'12px' }}>
          The StockWaveJP team consists of part-time investors based in Japan with backgrounds in clinical engineering and software development. 
          We built StockWaveJP to solve our own problem: tracking thematic capital flows in Japanese equities without paying for expensive institutional tools.
        </p>
        <p style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.8 }}>
          Our investment style: swing-to-medium-term, combining theme momentum analysis with fundamental screening. 
          We invest in both Japanese and US equities.
        </p>
      </div>

      <div style={card}>
        <h2 style={h2}>Disclaimer</h2>
        <p style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.8 }}>
          StockWaveJP provides information for educational and informational purposes only. 
          Nothing on this site constitutes investment advice, a recommendation to buy or sell any security, or a solicitation of any investment. 
          Past performance is not indicative of future results. 
          All investment decisions are your own responsibility. Please consult a licensed financial advisor before making investment decisions.
        </p>
      </div>
    </div>
  )
}
