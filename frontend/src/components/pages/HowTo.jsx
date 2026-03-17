const SECTIONS = [
  { icon:'📊', title:'Theme List', body:'View Japanese stock theme performance rankings including price change, volume, and trade value. Select a period to see KPI cards and charts for all themes at a glance. Rising themes (red) and falling themes (green) are color-coded for quick scanning.' },
  { icon:'📡', title:'Momentum', body:'Displays current price change along with 1W and 1M momentum shifts. Use state filters like Strong Up or Strong Down to quickly narrow down themes worth watching.' },
  { icon:'💹', title:'Fund Flow', body:'Shows Top 10 Gainers, Top 10 Losers, and an overview of all themes by price change. Identify which themes are attracting or losing capital.' },
  { icon:'📈', title:'Trend', body:'Cumulative price change trend chart derived from daily yfinance data. Three modes available: Top and Bottom 5 (auto), Custom Select, and All Themes.' },
  { icon:'🔥', title:'Heatmap', body:'Two heatmap views: period-based (1W/1M/3M/6M/1Y) and monthly trend. Red = rising, Blue/Green = falling. Best for comparing performance across themes.' },
  { icon:'📊', title:'Compare', body:'Compare price changes across multiple themes simultaneously. Also supports comparison with macro indicators like Nikkei 225, S&P500, USD/JPY, and VIX.' },
  { icon:'📋', title:'Market Rank', body:'Price change rankings and stock details by Nikkei 225, TOPIX, and market segment. Includes a full stock table.' },
  { icon:'🔍', title:'Theme Detail', body:'Select a theme to see detailed data for constituent stocks including price change, contribution rank, volume, and trade value. Includes Top/Bottom 5 charts and a full stock table.' },
  { icon:'🎨', title:'Custom Theme', body:'Build your own themes by searching stocks by ticker (e.g. 6954.T) or name (e.g. Toyota). Create, edit, and delete your original theme watchlists.' },
  { icon:'⚙️', title:'Settings', body:'Switch between PC and mobile display modes. Toggle between Dark and Light (Navy) color themes.' },
]
export default function HowTo() {
  return (
    <div style={{ padding:'28px 32px 48px' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, letterSpacing:'-0.02em', color:'#ffffff', marginBottom:'4px' }}>How To Use</h1>
      <p style={{ fontSize:'13px', color:'var(--text2)', marginBottom:'28px' }}>Guide to each feature of StockWaveJP.</p>
      <div style={{ background:'linear-gradient(135deg,rgba(74,158,255,0.1),rgba(255,69,96,0.08))', border:'1px solid rgba(74,158,255,0.2)', borderRadius:'var(--radius)', padding:'20px 24px', marginBottom:'28px' }}>
        <div style={{ fontSize:'14px', fontWeight:700, color:'#ffffff', marginBottom:'8px' }}>What is StockWaveJP?</div>
        <div style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.8 }}>
          StockWaveJP is a dashboard that tracks Japanese stock themes in real time - price changes, volume, and fund flows.
          It uses daily yfinance data to help you visually identify which themes are gaining or losing momentum.
          Data is provided for reference purposes only and does not constitute investment advice.
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }} className="howto-grid">
        {SECTIONS.map((s,i)=>(
          <div key={i} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'18px 20px', animation:`fadeUp 0.3s ease ${i*0.04}s both`, transition:'border-color 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(74,158,255,0.25)'}
            onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'10px' }}>
              <span style={{ fontSize:'20px' }}>{s.icon}</span>
              <span style={{ fontSize:'14px', fontWeight:700, color:'#ffffff' }}>{s.title}</span>
            </div>
            <div style={{ fontSize:'12px', color:'var(--text2)', lineHeight:1.8 }}>{s.body}</div>
          </div>
        ))}
      </div>
      <div style={{ background:'rgba(255,140,66,0.08)', border:'1px solid rgba(255,140,66,0.2)', borderRadius:'var(--radius)', padding:'18px 20px', marginTop:'24px' }}>
        <div style={{ fontSize:'13px', fontWeight:700, color:'#ff8c42', marginBottom:'8px' }}>About Data</div>
        <div style={{ fontSize:'12px', color:'var(--text2)', lineHeight:1.8 }}>
          Data is retrieved via yfinance and is not real-time (typically delayed 5-20 minutes).
          Initial data loading may take several seconds. For actual trading decisions, always verify with official exchange data.
        </div>
      </div>
      <style>{`@media (max-width:768px){.howto-grid{grid-template-columns:1fr !important;}}`}</style>
    </div>
  )
}