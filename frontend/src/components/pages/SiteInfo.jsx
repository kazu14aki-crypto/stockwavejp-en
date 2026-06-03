export default function SiteInfo() {
  return (
    <div style={{ padding: '28px 32px 60px', maxWidth: '760px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#e8f0ff', marginBottom: '4px' }}>
        About StockWaveJP
      </h1>
      <p style={{ fontSize: '12px', color: 'var(--text3)', marginBottom: '32px' }}>
        Purpose and Background of StockWaveJP
      </p>

      {/* Main Vision */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(74,158,255,0.1), rgba(255,69,96,0.07))',
        border: '1px solid rgba(74,158,255,0.2)',
        borderRadius: '12px', padding: '28px 32px', marginBottom: '24px',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.15em',
          textTransform: 'uppercase', marginBottom: '12px' }}>
          Mission
        </div>
        <div style={{ fontSize: '20px', fontWeight: 700, color: '#e8f0ff', marginBottom: '20px', lineHeight: 1.5 }}>
          What StockWaveJP Aims For: Objective Visualization of Market Conditions
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 2, margin: 0 }}>
            Time for analysis is limited in stock markets. StockWaveJP is designed to deliver maximum insight within that limited time — an objective data platform.
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 2, margin: 0 }}>
            Using proprietary sector classification and aggregation algorithms, it quantifies the price trend of major Japanese large-cap stocks. By completely excluding individual news and subjective bias, it presents only the pure facts in an intuitive ranking format.
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 2, margin: 0 }}>
            Minimizing the effort of complex analysis so anyone can instantly grasp the current market overview. A tool combining speed and objectivity to support your unbiased investment decisions。
          </p>
        </div>
      </div>

      {/* Unique Feature Badges */}
      <div style={{ background:'var(--bg2)', border:'1px solid var(--border)',
        borderRadius:'12px', padding:'22px 26px', marginBottom:'16px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
          <span style={{ fontSize:'22px' }}>⚡</span>
          <h2 style={{ fontSize:'15px', fontWeight:700, color:'#e8f0ff', margin:0,
            borderLeft:'3px solid #ffd619', paddingLeft:'10px' }}>
            Features Unique to StockWaveJP
          </h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'10px' }}>
          {[
            { icon:'📡', title:'Price Momentum', desc:'5-state classification (🔥Accel / ↗Rev.↑ / →Flat / ↘Rev.↓ / ❄️Stall) is a unique indicator of this site' },
            { icon:'🗺️', title:'Theme × Period Heatmap', desc:'Compare price change % across 67 themes and multiple periods (1W to 1Y) simultaneously' },
            { icon:'📊', title:'3-Metric Simultaneous View', desc:'Price change %, volume, and trading value across all 67 themes ranked together' },
            { icon:'⚙️', title:'Custom Theme', desc:'Create your own theme and track a custom set of stocks' },
            { icon:'📈', title:'Macro Correlation View', desc:'Monitor Nikkei 225, USD/JPY, VIX, and other macro indicators alongside theme trends' },
            { icon:'📰', title:'Weekly Report', desc:'Weekly market recap and next-week highlights written by the editorial team' },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{ background:'rgba(74,158,255,0.04)',
              border:'1px solid rgba(74,158,255,0.15)', borderRadius:'8px',
              padding:'12px 14px' }}>
              <div style={{ fontSize:'18px', marginBottom:'6px' }}>{icon}</div>
              <div style={{ fontSize:'12px', fontWeight:700, color:'var(--accent)', marginBottom:'4px' }}>{title}</div>
              <div style={{ fontSize:'11px', color:'var(--text3)', lineHeight:1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {[
        {
          icon: '🎯',
          title: 'Purpose of This Site',
          color: '#4a9eff',
          content: `Japanese stock investment information is concentrated in brokerage tools and paid services, leaving beginners with few free ways to understand 'which themes are moving right now.'

StockWaveJP automatically aggregates price change %, volume, and trading value for 67 investment themes — including Semiconductors, AI, Defense, and Inbound Tourism — making capital flow visible as a free dashboard.

Our primary purpose is to provide objective data showing "what the market is focusing on now" — not investment advice or stock recommendations.`,
        },
        {
          icon: '💡',
          title: 'Background and Motivation',
          color: '#aa77ff',
          content: `In stock markets, understanding the broad picture — not just individual stock analysis, but "which themes or sectors capital is flowing into" — is crucial for investment decisions. However, free tools for tracking theme-specific price change %, volume, and trading value were scarce in Japan.

We wanted to build a place where, when a beginner wonders 'I see semiconductors are up today — but what about other themes?', they can freely access comparative data.

We also hope to share the enjoyment of "reading the flow" of theme investing with more people.`,
        },

      ].map((sec, i) => (
        <div key={i} style={{
          background: 'var(--bg2)', border: '1px solid var(--border)',
          borderRadius: '12px', padding: '22px 26px', marginBottom: '16px',
          animation: `fadeUp 0.3s ease ${i * 0.08}s both`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ fontSize: '22px' }}>{sec.icon}</span>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#e8f0ff', margin: 0,
              borderLeft: `3px solid ${sec.color}`, paddingLeft: '10px' }}>
              {sec.title}
            </h2>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 2, whiteSpace: 'pre-line' }}>
            {sec.content}
          </div>
        </div>
      ))}


      {/* Operator Information */}
      <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'12px', padding:'22px 26px', marginBottom:'16px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
          <span style={{ fontSize:'22px' }}>🏢</span>
          <h2 style={{ fontSize:'15px', fontWeight:700, color:'#e8f0ff', margin:0,
            borderLeft:'3px solid #4a9eff', paddingLeft:'10px' }}>
            Operator Information
          </h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'120px 1fr', gap:'12px 24px', fontSize:'13px', marginBottom:'14px' }}>
          {[
            ['Site Name', 'StockWaveJP'],
            ['URL', 'https://stockwavejp.com'],
            ['Launched', 'March 2026'],
            ['Operator', 'StockWaveJP Editorial Team (Part-time JP/US Stock Investor)'],
            ['Purpose', 'Visualize Japanese stock theme price change %, volume, and trading value in real time to provide reference information for investment decisions'],
            ['Target Users', 'Individual investors and beginners interested in Japanese equities'],
          ].map(([label, value], i) => (
            <div key={i} style={{ display:'contents' }}>
              <span style={{ color:'var(--text3)', fontWeight:600, letterSpacing:'0.05em', fontSize:'11px',
                textTransform:'uppercase', alignSelf:'start', paddingTop:'2px' }}>{label}</span>
              <span style={{ color:'var(--text2)', lineHeight:1.7 }}>
                {label === 'Operator' ? (
                  <a href="https://twitter.com/StockWaveJP" target="_blank" rel="noopener noreferrer"
                    style={{ color:'var(--accent)', textDecoration:'none' }}>
                    {value}
                  </a>
                ) : value}
              </span>
            </div>
          ))}
        </div>
        <div style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.9 }}>
          StockWaveJP is a dashboard for visually tracking Japanese stock theme trends.
          We do not recommend individual stocks or provide investment advice. This is purely an information tool
          for understanding capital flows across market themes. All investment decisions are your sole responsibility.
        </div>
      </div>

      {/* Operator Profile */}
      <div style={{ background:'var(--bg2)', border:'1px solid rgba(74,158,255,0.2)',
        borderRadius:'12px', padding:'22px 26px', marginBottom:'16px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
          <span style={{ fontSize:'22px' }}>👤</span>
          <h2 style={{ fontSize:'15px', fontWeight:700, color:'#e8f0ff', margin:0,
            borderLeft:'3px solid #aa77ff', paddingLeft:'10px' }}>
            Operator Profile
          </h2>
        </div>
        <div style={{ display:'flex', alignItems:'flex-start', gap:'20px', flexWrap:'wrap' }}>
          <div style={{ width:'64px', height:'64px', borderRadius:'50%',
            background:'linear-gradient(135deg,#4a9eff,#aa77ff)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'28px', flexShrink:0 }}>📊</div>
          <div style={{ flex:1, minWidth:'200px' }}>
            <div style={{ fontSize:'16px', fontWeight:700, color:'#e8f0ff', marginBottom:'4px' }}>
              StockWaveJP Editorial Team
            </div>
            <div style={{ fontSize:'12px', color:'var(--accent)', marginBottom:'12px', fontWeight:600 }}>
              Part-time JP/US Stock Investor
            </div>
            <div style={{ fontSize:'13px', color:'var(--text2)', lineHeight:2 }}>
              As an individual investor in both Japanese and US equities, we independently track and analyze capital flows in theme stocks.
              "Which themes are attracting capital?" and "How is momentum changing?" — we visualize these questions
              with objective data to support emotion-free investment decisions. This motivation led to the creation of StockWaveJP.
              <br /><br />
              We value an analytical perspective grounded in the differences between Japanese and US markets
              (Japan's high theme concentration and strong policy sensitivity). Through our 4-metric approach
              (price change %, volume, trading value, momentum), we aim to provide individual investors
              with the same market overview perspective as institutional investors.
            </div>
            <div style={{ display:'flex', gap:'12px', marginTop:'14px', flexWrap:'wrap' }}>
              {[
                { label:'Investment Style', value:'Theme Momentum Investing / Long-term Value Investing' },
                { label:'Markets',         value:'Japanese Equities / US Equities (both)' },
              ].map(({ label, value }) => (
                <div key={label} style={{ background:'rgba(74,158,255,0.07)',
                  border:'1px solid rgba(74,158,255,0.15)', borderRadius:'6px',
                  padding:'6px 12px', fontSize:'11px' }}>
                  <span style={{ color:'var(--text3)', marginRight:'6px' }}>{label}:</span>
                  <span style={{ color:'var(--accent)', fontWeight:600 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize:'15px', fontWeight:700, color:'var(--text)', marginBottom:'14px' }}>Contact & Feedback</h2>
        <p style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.8, marginBottom:'16px' }}>
          For bug reports, feature requests, or general feedback, please use the form below.
        </p>
        <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', alignItems:'center' }}>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSeHLMXrJAttWONfyfe94OSsiP039PX5xi918R3kuDHFJ0Aiow/viewform?usp=publish-editor" target="_blank" rel="noopener noreferrer"
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
