export default function SiteInfo() {
  const uniqueFeatures = [
    { icon:'📡', title:'Return Momentum', desc:'A StockWaveJP classification of Accelerating, Turning Up, Flat, Turning Down and Losing Momentum.' },
    { icon:'🗺️', title:'Theme × Period Heatmap', desc:'Compare returns across 72 themes over periods from one week to one year.' },
    { icon:'📊', title:'Three Ranking Metrics', desc:'Rank all 72 themes by return, volume or trading value from one unified control.' },
    { icon:'⚙️', title:'Custom Themes', desc:'Create your own theme and monitor a personally selected group of Japanese stocks.' },
    { icon:'📈', title:'Macro Comparison', desc:'Review theme movement together with the Nikkei 225, USD/JPY and other major indicators.' },
    { icon:'📰', title:'Reports', desc:'Use weekly, monthly and quarterly reports to review theme rotation and subsequent performance.' },
  ]

  const sections = [
    {
      icon:'🎯', title:'Purpose of This Site', color:'#4a9eff',
      content:`Japanese equity information is concentrated in brokerage tools and paid services. It can therefore be difficult for an individual investor to see, at no cost, which themes are currently attracting market attention.

StockWaveJP automatically aggregates return, volume and trading value across 72 investment themes, including semiconductors, AI, defense and inbound tourism. It was developed as a dashboard for visualizing capital flow across the Japanese equity market.

The site does not provide personalized investment advice or recommend individual stocks. Its primary purpose is to show, through objective data, which areas of the market are currently receiving attention.`,
    },
    {
      icon:'💡', title:'Why It Was Created', color:'#aa77ff',
      content:`Investment decisions require more than analysis of individual companies. Understanding which sectors and themes are attracting capital is also important, yet free tools combining theme returns, volume and trading value have been limited in Japan.

StockWaveJP was created for the moment when an investor knows that semiconductor shares rose, but still wants to compare them with banks, defense, infrastructure, retail and other themes using the same data framework.

The site also aims to make theme-based market analysis more accessible without turning rankings or signals into simplistic buy recommendations.`,
    },
  ]

  const operatorRows = [
    ['Site name','StockWaveJP'],
    ['URL','https://stockwavejp-en.com'],
    ['Operating since','March 2026'],
    ['Operator','StockWaveJP Editorial Team — part-time Japan and US equity investor'],
    ['Purpose','To visualize Japanese theme returns, volume and trading value according to plan-specific update frequencies and provide market-reference information'],
    ['Intended users','Individual investors and people beginning research on Japanese equities'],
  ]

  return (
    <div style={{ padding:'28px 32px 60px', maxWidth:'900px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, color:'#e8f0ff', marginBottom:'4px' }}>About StockWaveJP</h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'24px' }}>Purpose, background, distinctive functions and operator information</p>

      <div style={{ background:'linear-gradient(135deg,rgba(74,158,255,0.08),rgba(155,69,96,0.07))', border:'1px solid rgba(74,158,255,0.2)', borderRadius:'12px', padding:'28px 32px', marginBottom:'24px' }}>
        <div style={{ fontSize:'11px', fontWeight:600, color:'var(--accent)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'12px' }}>Mission</div>
        <div style={{ fontSize:'20px', fontWeight:700, color:'#e8f0ff', marginBottom:'20px', lineHeight:1.5 }}>Visualize the market without relying on subjective narratives</div>
        <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
          <p style={{ fontSize:'13px', color:'var(--text2)', lineHeight:2, margin:0 }}>Investors have limited time for research. StockWaveJP is designed to help users obtain a broad, objective view of the Japanese equity market before moving into company-level analysis.</p>
          <p style={{ fontSize:'13px', color:'var(--text2)', lineHeight:2, margin:0 }}>Its theme classification and aggregation process quantify market trends and display return, volume and trading-value changes in a form that can be compared across themes and periods.</p>
          <p style={{ fontSize:'13px', color:'var(--text2)', lineHeight:2, margin:0 }}>The objective is to reduce the effort required to understand market rotation while preserving the distinction between factual market data and an investment recommendation.</p>
        </div>
      </div>

      <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'12px', padding:'22px 26px', marginBottom:'16px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
          <span style={{ fontSize:'22px' }}>⚡</span>
          <h2 style={{ fontSize:'15px', fontWeight:700, color:'#e8f0ff', margin:0, borderLeft:'3px solid #ffd619', paddingLeft:'10px' }}>Functions Unique to StockWaveJP</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'10px' }}>
          {uniqueFeatures.map(({icon,title,desc}) => (
            <div key={title} style={{ background:'rgba(74,158,255,0.04)', border:'1px solid rgba(74,158,255,0.15)', borderRadius:'8px', padding:'12px 14px' }}>
              <div style={{ fontSize:'18px', marginBottom:'6px' }}>{icon}</div>
              <div style={{ fontSize:'12px', fontWeight:700, color:'var(--accent)', marginBottom:'4px' }}>{title}</div>
              <div style={{ fontSize:'11px', color:'var(--text3)', lineHeight:1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {sections.map((sec,index) => (
        <section key={sec.title} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'12px', padding:'22px 26px', marginBottom:'16px', animation:`fadeUp 0.3s ease ${index*0.08}s both` }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
            <span style={{ fontSize:'22px' }}>{sec.icon}</span>
            <h2 style={{ fontSize:'15px', fontWeight:700, color:'#e8f0ff', margin:0, borderLeft:`3px solid ${sec.color}`, paddingLeft:'10px' }}>{sec.title}</h2>
          </div>
          <div style={{ fontSize:'13px', color:'var(--text2)', lineHeight:2, whiteSpace:'pre-line' }}>{sec.content}</div>
        </section>
      ))}

      <section style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'12px', padding:'22px 26px', marginBottom:'16px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
          <span style={{ fontSize:'22px' }}>🏢</span>
          <h2 style={{ fontSize:'15px', fontWeight:700, color:'#e8f0ff', margin:0, borderLeft:'3px solid #4a9eff', paddingLeft:'10px' }}>Operator Information</h2>
        </div>
        <div className="operator-info-grid" style={{ display:'grid', gridTemplateColumns:'130px 1fr', gap:'12px 24px', fontSize:'13px', marginBottom:'14px' }}>
          {operatorRows.map(([label,value]) => (
            <div key={label} style={{ display:'contents' }}>
              <span style={{ color:'var(--text3)', fontWeight:600, letterSpacing:'0.05em', fontSize:'11px', textTransform:'uppercase', alignSelf:'start', paddingTop:'2px' }}>{label}</span>
              <span style={{ color:'var(--text2)', lineHeight:1.7 }}>{label === 'Operator' ? <a href="https://twitter.com/StockWaveJP" target="_blank" rel="noopener noreferrer" style={{ color:'var(--accent)', textDecoration:'none' }}>{value}</a> : value}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.9 }}>StockWaveJP is an information dashboard for understanding theme-level movement in Japanese equities. It does not provide personalized recommendations. Investment decisions remain the responsibility of each user.</div>
      </section>

      <section style={{ background:'var(--bg2)', border:'1px solid rgba(74,158,255,0.2)', borderRadius:'12px', padding:'22px 26px', marginBottom:'16px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
          <span style={{ fontSize:'22px' }}>👤</span>
          <h2 style={{ fontSize:'15px', fontWeight:700, color:'#e8f0ff', margin:0, borderLeft:'3px solid #aa77ff', paddingLeft:'10px' }}>Operator Profile</h2>
        </div>
        <div style={{ display:'flex', alignItems:'flex-start', gap:'20px', flexWrap:'wrap' }}>
          <div style={{ width:'64px', height:'64px', borderRadius:'50%', background:'linear-gradient(135deg,#4a9eff,#aa77ff)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', flexShrink:0 }}>📊</div>
          <div style={{ flex:1, minWidth:'200px' }}>
            <div style={{ fontSize:'16px', fontWeight:700, color:'#e8f0ff', marginBottom:'4px' }}>StockWaveJP Editorial Team</div>
            <div style={{ fontSize:'12px', color:'var(--accent)', marginBottom:'12px', fontWeight:600 }}>Part-time Japan and US equity investor</div>
            <div style={{ fontSize:'13px', color:'var(--text2)', lineHeight:2 }}>The operator follows capital flow across Japanese and US equities and developed StockWaveJP to make theme momentum easier to evaluate with objective data. The analytical framework combines return, volume, trading value and momentum while recognizing the Japanese market’s strong sensitivity to policy and concentrated theme rotation.</div>
            <div style={{ display:'flex', gap:'12px', marginTop:'14px', flexWrap:'wrap' }}>
              {[['Investment style','Theme momentum and long-term value'],['Markets','Japanese and US equities']].map(([label,value]) => (
                <div key={label} style={{ background:'rgba(74,158,255,0.07)', border:'1px solid rgba(74,158,255,0.15)', borderRadius:'6px', padding:'6px 12px', fontSize:'11px' }}><span style={{ color:'var(--text3)', marginRight:'6px' }}>{label}:</span><span style={{ color:'var(--accent)', fontWeight:600 }}>{value}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{ textAlign:'center', marginTop:'32px' }}>
        <a href="https://twitter.com/StockWaveJP" target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'rgba(91,156,246,0.1)', border:'1px solid rgba(91,156,246,0.25)', borderRadius:'8px', padding:'12px 24px', color:'var(--accent)', textDecoration:'none', fontWeight:600, fontSize:'14px' }}>X @StockWaveJP</a>
      </div>
      <style>{`@media(max-width:640px){.operator-info-grid{grid-template-columns:1fr!important;gap:4px!important}.operator-info-grid span:nth-child(even){margin-bottom:10px}}`}</style>
    </div>
  )
}
