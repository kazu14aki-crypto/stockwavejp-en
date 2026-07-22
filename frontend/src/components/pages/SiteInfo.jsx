export default function SiteInfo() {
  const features = [
    { icon:'📡', title:'Price Momentum', desc:'5-state classification (🔥Accel / ↗Rev.↑ / →Flat / ↘Rev.↓ / ❄️Stall) — a unique StockWaveJP indicator' },
    { icon:'🗺️', title:'Theme × Period Heatmap', desc:'Compare Return across 72 themes and multiple periods (1W to 1Y) simultaneously' },
    { icon:'📊', title:'3-Metric View', desc:'Price change %, Volume, and Trading Value ranked across all 72 themes at once' },
    { icon:'⚙️', title:'Custom Theme', desc:"Create your own theme and track a custom set of stocks" },
    { icon:'📈', title:'Macro Indicators', desc:'Monitor Nikkei 225, USD/JPY, VIX, and other macro indicators alongside theme trends' },
    { icon:'📰', title:'Weekly Report', desc:"Weekly market recap and next-week highlights written by the editorial team" },
  ]

  const siteInfo = [
    ['Site Name', 'StockWaveJP'],
    ['URL', 'https://stockwavejp-en.com'],
    ['Launched', 'March 2026'],
    ['Purpose', 'Visualize Japanese stock theme price change %, volume, and trading value in real time to support investment decisions'],
    ['Target Users', 'Individual investors and beginners interested in Japanese equities'],
    ['Data Source', 'Infoway API (Japanese stock data), FSA EDINET (large shareholding disclosures)'],
    ['Update Frequency', 'Several times daily (weekdays, automated via GitHub Actions)'],
  ]

  const qa = [
    {
      title: "Purpose of This Site",
      content: `Free tools for understanding which themes are moving in the Japanese stock market are scarce. StockWaveJP automatically aggregates price change %, volume, and trading value for 72 investment themes — including Semiconductors, AI, Defense, and Inbound Tourism — making capital flow visible as a free dashboard. Our primary purpose is to provide objective data showing "what the market is focusing on now" — not investment advice or stock recommendations.`
    },
    {
      title: "Background & Motivation",
      content: `In stock markets, understanding the broad picture — not just individual stock analysis, but "which themes or sectors capital is flowing into" — is crucial for investment decisions. We wanted to build a place where anyone can freely access comparative theme data, and share the enjoyment of "reading the flow" of theme investing with more people.`
    },
  ]

  return (
    <div style={{ padding: '28px 32px 60px', maxWidth: '760px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#e8f0ff', marginBottom: '4px' }}>
        About StockWaveJP
      </h1>
      <p style={{ fontSize: '12px', color: 'var(--text3)', marginBottom: '32px' }}>
        Purpose and Background of StockWaveJP
      </p>

      {/* Main Vision */}
      <div style={{ background: 'linear-gradient(135deg, rgba(74,158,255,0.1), rgba(25,35,60,0.3))',
        border: '1px solid rgba(74,158,255,0.2)', borderRadius: '12px', padding: '24px 28px', marginBottom: '24px' }}>
        <div style={{ fontSize: '18px', fontWeight: 700, color: '#4a9eff', marginBottom: '8px' }}>
          "Making invisible capital flows visible to everyone"
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.9 }}>
          StockWaveJP is designed to deliver maximum insight within limited analysis time — an objective data platform for Japanese stock theme investors.
        </p>
      </div>

      {/* Unique Features */}
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px 28px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)', marginBottom: '14px' }}>Features Unique to StockWaveJP</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '12px' }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: 'rgba(74,158,255,0.05)', border: '1px solid rgba(74,158,255,0.12)', borderRadius: '8px', padding: '12px 14px' }}>
              <div style={{ fontSize: '18px', marginBottom: '4px' }}>{f.icon}</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>{f.title}</div>
              <div style={{ fontSize: '11px', color: 'var(--text3)', lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Site Info */}
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px 28px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)', marginBottom: '14px' }}>Site Information</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '12px 20px', fontSize: '13px' }}>
          {siteInfo.map(([label, value], i) => (
            <div key={i} style={{ display: 'contents' }}>
              <span style={{ color: 'var(--text3)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', paddingTop: '2px' }}>{label}</span>
              <span style={{ color: 'var(--text2)', lineHeight: 1.7 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Q&A */}
      {qa.map((q, i) => (
        <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px 24px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '10px' }}>{q.title}</h2>
          <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.8 }}>{q.content}</p>
        </div>
      ))}

      {/* Disclaimer */}
      <div style={{ background: 'rgba(255,193,7,0.05)', border: '1px solid rgba(255,193,7,0.2)', borderRadius: '8px', padding: '14px 18px', marginBottom: '24px', fontSize: '12px', color: 'var(--text3)', lineHeight: 1.8 }}>
        ⚠️ All information on this site is for reference purposes only and does not constitute a recommendation to buy or sell any specific stock. All investment decisions are the sole responsibility of the user.
      </div>

      {/* Contact */}
      <div style={{ marginTop: '24px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)', marginBottom: '14px' }}>Contact & Feedback</h2>
        <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.8, marginBottom: '16px' }}>
          For bug reports, feature requests, or general feedback, please use the form below.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSeHLMXrJAttWONfyfe94OSsiP039PX5xi918R3kuDHFJ0Aiow/viewform?usp=dialog" target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(74,158,255,0.1)', border: '1px solid rgba(74,158,255,0.3)',
              borderRadius: '8px', padding: '12px 24px',
              color: 'var(--accent)', textDecoration: 'none', fontWeight: 600, fontSize: '14px',
            }}>
            📬 Open Contact Form
          </a>
          <a href="https://twitter.com/StockWaveJP" target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(91,156,246,0.1)', border: '1px solid rgba(91,156,246,0.25)',
              borderRadius: '8px', padding: '12px 24px',
              color: 'var(--accent)', textDecoration: 'none', fontWeight: 600, fontSize: '14px',
            }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            X (Twitter) @StockWaveJP
          </a>
        </div>
      </div>
    </div>
  )
}
