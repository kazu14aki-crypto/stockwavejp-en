export default function SiteInfo() {
  const sections = [
    {
      icon:'🎯',
      title:'Why StockWaveJP Exists',
      content:`Japanese equity research tools are often fragmented across brokerage platforms and paid services. StockWaveJP was created so investors can quickly see which themes are attracting or losing capital without relying on headlines or subjective recommendations.

The site aggregates return, volume and trading value across 72 Japanese equity themes, including semiconductors, AI, defense, inbound tourism, financials and infrastructure.`,
    },
    {
      icon:'💡',
      title:'The Problem It Solves',
      content:`Knowing that one semiconductor stock rose does not explain whether the entire semiconductor supply chain is strong, whether volume confirms the move or whether another theme is attracting more capital.

StockWaveJP places themes on the same scale and lets users compare multiple periods before researching individual companies.`,
    },
    {
      icon:'🧭',
      title:'Research, Not Investment Advice',
      content:`StockWaveJP provides market-reference information. Rankings, focus labels, signals and columns are not personalized investment advice and do not recommend buying, selling or holding any security.

Users should confirm company disclosures, liquidity, valuation, risk tolerance and tax consequences before making an investment decision.`,
    },
  ]

  return (
    <div style={{ padding:'28px 32px 60px', maxWidth:'900px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, color:'#e8f0ff', marginBottom:'4px' }}>About StockWaveJP</h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'24px' }}>
        Purpose, methodology and operating principles
      </p>

      <div style={{ padding:'20px', borderRadius:'12px', background:'linear-gradient(135deg,rgba(74,158,255,.09),rgba(170,119,255,.06))', border:'1px solid rgba(74,158,255,.2)', marginBottom:'20px' }}>
        <h2 style={{ fontSize:'18px', color:'var(--text)', margin:'0 0 9px' }}>
          Visualize Japanese equity capital flow without relying on narratives
        </h2>
        <p style={{ margin:0, fontSize:'13px', color:'var(--text2)', lineHeight:1.85 }}>
          StockWaveJP is a data dashboard designed to reduce the time required to understand broad market rotation. It combines theme returns, volume, trading value, momentum, market indicators, columns and follow-up reports.
        </p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))', gap:'9px', marginBottom:'24px' }}>
        {[
          ['📡','Return Momentum','Track acceleration, reversals and weakening trends.'],
          ['🗺️','Theme × Period Heatmap','Compare 72 themes from one week to one year.'],
          ['📊','Three Ranking Metrics','Rank return, volume and trading value in one control.'],
          ['⚙️','Custom Themes','Create and monitor your own stock groups.'],
          ['📈','Macro Context','View major equity, FX and market indicators.'],
          ['📰','Reports','Review theme rotation and subsequent performance.'],
        ].map(([icon,title,desc]) => (
          <div key={title} style={{ padding:'13px', borderRadius:'9px', background:'var(--bg2)', border:'1px solid var(--border)' }}>
            <div style={{ fontSize:'20px' }}>{icon}</div>
            <div style={{ fontSize:'12px', fontWeight:700, color:'var(--text)', margin:'7px 0 4px' }}>{title}</div>
            <div style={{ fontSize:'10px', lineHeight:1.65, color:'var(--text3)' }}>{desc}</div>
          </div>
        ))}
      </div>

      {sections.map(section => (
        <section key={section.title} style={{ marginBottom:'18px', padding:'16px 18px', borderRadius:'10px', background:'var(--bg2)', border:'1px solid var(--border)' }}>
          <h2 style={{ margin:'0 0 9px', fontSize:'15px', color:'var(--text)' }}>{section.icon} {section.title}</h2>
          <div style={{ whiteSpace:'pre-line', fontSize:'12px', lineHeight:1.85, color:'var(--text2)' }}>{section.content}</div>
        </section>
      ))}

      <section style={{ padding:'16px 18px', borderRadius:'10px', background:'var(--bg2)', border:'1px solid var(--border)' }}>
        <h2 style={{ margin:'0 0 10px', fontSize:'15px', color:'var(--text)' }}>Operator Information</h2>
        <div style={{ fontSize:'12px', lineHeight:1.9, color:'var(--text2)' }}>
          <div><strong>Service:</strong> StockWaveJP</div>
          <div><strong>Coverage:</strong> 72 Japanese equity themes</div>
          <div><strong>Purpose:</strong> Market research and theme-flow visualization</div>
          <div><strong>Contact:</strong> Use the Contact page or the contact form linked in the site navigation</div>
          <div><strong>X:</strong> @StockWaveJP</div>
        </div>
      </section>
    </div>
  )
}
