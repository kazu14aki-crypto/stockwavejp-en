export default function About() {
  return (
    <div style={{ padding:'28px 32px 60px', maxWidth:'760px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, color:'#e8f0ff', marginBottom:'4px' }}>About StockWaveJP</h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'32px' }}>Operator Information</p>

      <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'12px', padding:'28px 32px', marginBottom:'24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'140px 1fr', gap:'16px 24px', fontSize:'13px' }}>
          {[
            ['Site Name', 'StockWaveJP'],
            ['URL', 'https://stockwavejp-en.com'],
            ['Launched', 'March 2026'],
            ['Purpose', 'Visualize Japanese stock theme price changes, volume, and trading value in real time, providing reference information for investment decisions.'],
            ['Target Users', 'Individual investors and beginners interested in Japanese equities'],
          ].map(([label, value], i) => (
            <div key={i} style={{ display:'contents' }}>
              <span style={{ color:'var(--text3)', fontWeight:600, letterSpacing:'0.05em', fontSize:'11px', textTransform:'uppercase', paddingTop:'2px' }}>{label}</span>
              <span style={{ color:'var(--text2)', lineHeight:1.7 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'12px', padding:'24px 28px', marginBottom:'24px' }}>
        <h2 style={{ fontSize:'15px', fontWeight:700, color:'#e8f0ff', marginBottom:'14px' }}>About This Site</h2>
        <p style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.9, marginBottom:'12px' }}>
          StockWaveJP is a dashboard for visually tracking Japanese stock theme trends.
          It automatically aggregates price change %, volume, and trading value across 72 themes —
          including Semiconductors, AI, Defense, and Inbound Tourism — letting you see in real time
          which themes are attracting capital.
        </p>
        <p style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.9, marginBottom:'0' }}>
          This site does not recommend individual stocks or provide investment advice.
          It is purely an information tool for understanding the flow of capital across market themes.
          All investment decisions are the sole responsibility of the user.
        </p>
      </div>

    </div>
  )
}
