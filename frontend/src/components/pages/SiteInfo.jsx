export default function SiteInfo() {
  return (
    <div style={{ padding:'28px 32px 60px', maxWidth:'760px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, color:'#e8f0ff', marginBottom:'4px' }}>About</h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'32px' }}>About StockWaveJP — Purpose and Background</p>

      {/* Mission */}
      <div style={{ background:'linear-gradient(135deg, rgba(74,158,255,0.1), rgba(255,69,96,0.07))',
        border:'1px solid rgba(74,158,255,0.2)', borderRadius:'12px', padding:'28px 32px', marginBottom:'24px' }}>
        <div style={{ fontSize:'11px', fontWeight:600, color:'var(--accent)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'12px' }}>Mission</div>
        <div style={{ fontSize:'20px', fontWeight:700, color:'#e8f0ff', marginBottom:'20px', lineHeight:1.5 }}>
          What StockWaveJP Aims For: Objective Visualization of the Market
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
          {[
            "In the stock market, investors have limited time for analysis. StockWaveJP is an objective data platform designed to deliver maximum insight within that limited time.",
            "Using proprietary sector classification and aggregation algorithms, we quantify the rise and fall trends of major Japanese large-cap stocks. By completely eliminating individual news and subjective biases, we display only the 'facts' of capital inflows and outflows in an intuitive ranking format.",
            "Minimizing the effort required for complex analysis, so that anyone can instantly grasp the overall picture of the current market. We contribute to your unbiased investment decisions through a tool that balances 'speed' and 'objectivity'.",
          ].map((p, i) => (
            <p key={i} style={{ fontSize:'13px', color:'var(--text2)', lineHeight:2, margin:0 }}>{p}</p>
          ))}
        </div>
      </div>

      {[
        { icon:'🎯', title:'Purpose of This Site', color:'#4a9eff', content:"Investment information for Japanese stocks is concentrated in brokerage tools and paid services, and there are few places where beginners can freely understand 'which themes are moving now'. StockWaveJP was developed as a dashboard that automatically aggregates returns, volume, and trading value for 30 investment themes — including semiconductors, AI, defense, and inbound tourism — enabling visual understanding of 'capital flows'.\n\nOur primary purpose is to provide objective data showing 'what the market is focused on now', not investment advice or individual stock recommendations." },
        { icon:'💡', title:'Background & Reason for Creation', color:'#aa77ff', content:"In the stock market, a broad perspective of 'which themes and sectors capital is flowing into' is extremely important for investment decisions, in addition to analysis of individual stocks. However, free tools that can centrally manage sector-specific return rates, volume, and trading value were limited domestically.\n\nThis site was developed from the desire to create a place where investment beginners can freely access comparable data when they wonder 'I understand semiconductors are up today, but how are other themes doing?'" },
        { icon:'🏢', title:'Operator Information', color:'#06d6a0', content:null, isOperator: true },
      ].map((sec, i) => (
        <div key={i} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'12px', padding:'22px 26px', marginBottom:'16px', animation:`fadeUp 0.3s ease ${i*0.08}s both` }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
            <span style={{ fontSize:'22px' }}>{sec.icon}</span>
            <h2 style={{ fontSize:'15px', fontWeight:700, color:'#e8f0ff', margin:0, borderLeft:`3px solid ${sec.color}`, paddingLeft:'10px' }}>{sec.title}</h2>
          </div>
          {sec.isOperator ? (
            <div style={{ display:'grid', gridTemplateColumns:'140px 1fr', gap:'12px 24px', fontSize:'13px' }}>
              {[
                ['Site Name', 'StockWaveJP'],
                ['URL', 'https://stockwavejp-en.com'],
                ['Launched', 'March 2026'],
                ['Operator', 'X (formerly Twitter) @StockWaveJP'],
                ['Purpose', 'Provide reference information for individual investors by visualizing Japan stock theme-based return rates, volume, and trading value in real time'],
                ['Target Users', 'Individual investors and beginners interested in Japanese stocks'],
              ].map(([label, value], j) => (
                <div key={j} style={{ display:'contents' }}>
                  <span style={{ color:'var(--text3)', fontWeight:600, letterSpacing:'0.05em', fontSize:'11px', textTransform:'uppercase', alignSelf:'start', paddingTop:'2px' }}>{label}</span>
                  <span style={{ color:'var(--text2)', lineHeight:1.7 }}>
                    {label === 'Operator' ? (
                      <a href="https://twitter.com/StockWaveJP" target="_blank" rel="noopener noreferrer" style={{ color:'var(--accent)', textDecoration:'none' }}>{value}</a>
                    ) : value}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize:'13px', color:'var(--text2)', lineHeight:2, whiteSpace:'pre-line' }}>{sec.content}</div>
          )}
        </div>
      ))}

      <div style={{ textAlign:'center', marginTop:'32px' }}>
        <a href="https://twitter.com/StockWaveJP" target="_blank" rel="noopener noreferrer"
          style={{ display:'inline-flex', alignItems:'center', gap:'10px',
            background:'rgba(91,156,246,0.1)', border:'1px solid rgba(91,156,246,0.25)',
            borderRadius:'8px', padding:'12px 24px', color:'var(--accent)', textDecoration:'none',
            fontWeight:600, fontSize:'14px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          X (Twitter) @StockWaveJP
        </a>
      </div>
    </div>
  )
}
