export default function HowTo({ onNavigate }) {
  const card = { background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'12px', padding:'20px', marginBottom:'16px' }
  const h2 = { fontSize:'15px', fontWeight:700, color:'var(--text)', marginBottom:'12px' }
  const h3 = { fontSize:'13px', fontWeight:700, color:'var(--accent)', margin:'12px 0 6px' }
  const p  = { fontSize:'13px', color:'var(--text2)', lineHeight:1.8, marginBottom:'10px' }
  const li_style = { fontSize:'13px', color:'var(--text2)', lineHeight:1.8, marginBottom:'6px' }
  const badge = (text, color='var(--accent)') => (
    <span style={{ fontSize:'10px', fontWeight:700, padding:'2px 8px', borderRadius:'10px',
      background:`${color}20`, color, border:`1px solid ${color}50`, marginLeft:'8px', verticalAlign:'middle' }}>
      {text}
    </span>
  )

  const SECTIONS = [
    {
      icon: '📊', title: 'Theme List',
      desc: 'Compare 67+ Japanese stock themes by price change, volume, and trading value. Data sourced from Infoway (data.infoway.io).',
      items: [
        'Switch periods using the selector (1D / 1W / 1M / 3M / 6M / 1Y). Free plan: 3M / 6M / 1Y only.',
        'The ranking shows the top 4 themes by default. Click "Show Top 10" or "Show All" to expand.',
        'Click any theme name to go to Theme Detail and see individual stocks within that theme.',
        'The heatmap tab visualizes capital flows across all themes using bubble size and color.',
      ],
    },
    {
      icon: '🔍', title: 'Theme Detail',
      desc: 'Drill into individual stocks within a theme. View charts filtered by your selected period.',
      items: [
        'Free plan: 3M / 6M / 1Y periods only. Standard plan and above: all periods including 1D, 1W, and 1M.',
        'The volume and trading value chart updates to match your selected period.',
        'Click any stock name to search for it in Stock Search and see detailed charts.',
        'Use the "Add to Custom Theme" button to add any stock to your watchlist.',
      ],
    },
    {
      icon: '📋', title: 'Market Ranking',
      desc: <>Compares TSE Prime, Standard, and Growth market segments. {badge('Standard+', '#ff8c42')}</>,
      items: [
        'Shows average price change, rising/falling stock counts, and top movers for each market.',
        'Useful for understanding broad market direction before diving into specific themes.',
      ],
    },
    {
      icon: '🔎', title: 'Stock Search',
      desc: 'Search any Japanese stock by name or 4-digit ticker code.',
      items: [
        'View a price/volume chart for the stock (powered by Infoway).',
        'See which themes the stock belongs to and navigate directly to Theme Detail.',
        'Find related column articles for the stock or its sector.',
        'Add the stock directly to one of your Custom Themes.',
      ],
    },
    {
      icon: '🎨', title: 'Custom Themes',
      desc: 'Build your own watchlists. Synced to your account when signed in.',
      items: [
        <>Free plan: 1 theme / 10 stocks per theme. {badge('Free', '#4a9eff')}</>,
        <>Standard plan: 5 themes / 20 stocks per theme. {badge('Standard+', '#ff8c42')}</>,
        <>Pro plan: 30 themes / 50 stocks per theme. {badge('Pro', '#aa77ff')}</>,
        'Enter your purchase price to track unrealized P&L for each position.',
        'Export your theme as a URL to share with others.',
      ],
    },
    {
      icon: '📰', title: 'Weekly Report',
      desc: 'Weekly market recap published every Friday (JST), covering the top/bottom themes and notable stocks.',
      items: [
        <>Free plan: reports 1 month or older only. {badge('Free', '#4a9eff')}</>,
        <>Standard plan and above: full archive access. {badge('Standard+', '#ff8c42')}</>,
        'Each report includes a theme ranking, featured stocks table, and next-week watch points.',
      ],
    },
    {
      icon: '🏦', title: 'Institutional Holdings',
      desc: <>Major shareholder data from EDINET (Financial Services Agency). {badge('Pro only', '#aa77ff')}</>,
      items: [
        'Search by stock ticker or institution name to find 5%+ ownership filings.',
        'View ownership percentage, trend (↑ increasing / ↓ decreasing), and PDF report links.',
        'Multiple institutions filing new reports on the same stock is often a sign of increased interest.',
        'Data may be delayed up to 5 business days from EDINET filing. Holdings below 5% are not disclosed.',
      ],
    },
    {
      icon: '📝', title: 'Column & Analysis',
      desc: 'In-depth articles on themes and individual Japanese stocks. All articles available on all plans.',
      items: [
        '69 articles covering major themes (AI, Defense, MLCC, EV, Banking, etc.) and individual stocks.',
        'Theme articles explain the structural drivers, key stocks, and risk factors for each theme.',
        'Stock analysis articles cover business model, competitive advantages, financials, and risks.',
        'Click "View Theme Detail →" in any column to navigate directly to the related theme.',
      ],
    },
  ]

  const FAQ = [
    { q: 'Where does the stock data come from?',
      a: 'Price and volume data is sourced from Infoway (data.infoway.io), a licensed Japanese equity data provider. Institutional holdings data comes from EDINET (Financial Services Agency of Japan). Yahoo Finance is not used.' },
    { q: 'Do I need to log in?',
      a: 'Basic features (Theme List, Theme Detail, Column, Stock Search) are available without login. A Google account is required for cloud-synced Custom Themes and paid subscriptions. All new users get a free 30-day Pro trial upon first login.' },
    { q: 'What is the difference between Free and paid plans?',
      a: 'The Free plan gives access to core features with some period restrictions. Standard adds all periods and Market Ranking. Pro adds Custom Theme capacity and Institutional Holdings.' },
    { q: 'Is it mobile-friendly?',
      a: 'Yes. StockWaveJP is fully responsive and works on smartphones, tablets, and desktops.' },
    { q: 'How often is data updated?',
      a: 'Stock data is updated periodically during market hours (9:00–16:00 JST, weekdays). Institutional holdings data is updated daily via a scheduled EDINET fetch.' },
    { q: 'Are the column articles investment advice?',
      a: 'No. All column articles, AI-generated analysis, and weekly reports are for informational and educational purposes only. They do not constitute investment advice. All investment decisions are your own responsibility.' },
  ]

  return (
    <div style={{ padding:'16px 16px 60px', maxWidth:'860px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'22px', fontWeight:700, color:'var(--text)', marginBottom:'6px' }}>📖 How to Use StockWaveJP</h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'24px', lineHeight:1.7 }}>
        StockWaveJP tracks 67+ Japanese stock themes in real-time. Use it to spot capital flows, identify momentum, and research individual stocks.
      </p>

      {SECTIONS.map((sec, i) => (
        <div key={i} style={card}>
          <h2 style={h2}>{sec.icon} {sec.title}</h2>
          <p style={p}>{sec.desc}</p>
          <ul style={{ paddingLeft:'18px', margin:0 }}>
            {sec.items.map((item, j) => (
              <li key={j} style={li_style}>{item}</li>
            ))}
          </ul>
        </div>
      ))}

      <div style={card}>
        <h2 style={h2}>❓ Frequently Asked Questions</h2>
        {FAQ.map((faq, i) => (
          <div key={i} style={{ marginBottom:'14px', paddingBottom:'14px',
            borderBottom: i < FAQ.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <div style={{ fontSize:'13px', fontWeight:700, color:'var(--text)', marginBottom:'6px' }}>
              Q. {faq.q}
            </div>
            <div style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.7 }}>
              A. {faq.a}
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...card, background:'rgba(74,158,255,0.08)', border:'1px solid rgba(74,158,255,0.3)' }}>
        <h2 style={{ ...h2, color:'var(--accent)' }}>💰 Plan Overview</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'12px' }}>
          {[
            { name:'Free', color:'#4a9eff', features:['Theme List', 'Theme Detail (3M/6M/1Y)', 'Stock Search', 'Columns (all)', '1 Custom Theme / 10 stocks', 'Weekly Report (1mo+ old)'] },
            { name:'Standard', color:'#ff8c42', features:['Everything in Free', 'All periods (1D→1Y)', 'Market Ranking', '5 themes / 20 stocks', 'Full Weekly Report archive'] },
            { name:'Pro', color:'#aa77ff', features:['Everything in Standard', '30 themes / 50 stocks', 'Institutional Holdings', 'Priority support'] },
          ].map(plan => (
            <div key={plan.name} style={{ background:'var(--bg2)', borderRadius:'10px', padding:'14px',
              borderTop:`3px solid ${plan.color}` }}>
              <div style={{ fontWeight:800, color:plan.color, marginBottom:'10px', fontSize:'14px' }}>{plan.name}</div>
              {plan.features.map((f, i) => (
                <div key={i} style={{ fontSize:'11px', color:'var(--text2)', marginBottom:'4px', display:'flex', gap:'6px' }}>
                  <span style={{ color:plan.color }}>✓</span>{f}
                </div>
              ))}
            </div>
          ))}
        </div>
        <button onClick={() => onNavigate?.('Pricing')} style={{
          marginTop:'14px', padding:'10px 20px', background:'var(--accent)', color:'#fff',
          border:'none', borderRadius:'8px', cursor:'pointer', fontFamily:'var(--font)',
          fontSize:'13px', fontWeight:700 }}>
          View Pricing Details →
        </button>
      </div>
    </div>
  )
}
