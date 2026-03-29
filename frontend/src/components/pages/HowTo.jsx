import { useState } from 'react'
import React from 'react'

const SECTIONS = [
  { icon:'🏠', title:'Home', color:'#4a9eff', summary:'Overview of the entire market at a glance',
    detail:{ overview:'The Home page is a dashboard where you can see the overall market situation. Use it as a starting point for daily investment decisions.',
      features:[
        { name:'Market Summary (KPI)', desc:'Displays the number of rising themes, average return of all themes, top inflow theme, and top outflow theme. Arrows (↗↘) show direction, and colors (red=rise, green=fall) allow intuitive understanding.' },
        { name:'Market Indicators (Mini Cards)', desc:'Shows 6 indicators as cards: Domestic ETF, Broad ETF, US ETF, USD/JPY, US Tech ETF, VIX Futures ETF. Each card displays the return rate and sparkline.' },
        { name:'Market Indicator Comparison Chart', desc:'Compares 6 indicators\' trends in one chart. Each indicator is independently scaled for normalization, so trends can be confirmed equally even for indicators with different fluctuation ranges.' },
      ],
      tips:['Check the "Rising Themes" count and "Top Inflow" every morning to get a sense of the overall market direction.','Simultaneously checking the US ETF and VIX Futures ETF provides material for judging risk-on/risk-off.'] } },
  { icon:'📊', title:'Theme List', color:'#ff5370', summary:'Compare return rates, volume & trading value for all 30 themes',
    detail:{ overview:'The Theme List page allows cross-comparison of Japan\'s major 30 themes. It\'s the core page for judging "which themes capital is flowing into right now".',
      features:[
        { name:'Period Selection', desc:'Switch between 5 periods: 1W, 1M, 3M, 6M, 1Y. Use short-term (1W) for recent capital movements, long-term (3M, 1Y) for trend sustainability.' },
        { name:'Top 5 Charts', desc:'Displays top 5 rising and falling themes as horizontal bar charts. Titles show how many themes are rising/falling.' },
        { name:'All Themes Ranking', desc:'Displays return rates, volume, and trading values for all 30 themes in descending order.' },
      ],
      tips:['Themes appearing in both "Top 5 Rising" and "Top Trading Value" may indicate serious capital inflows.','Themes consistently in the top positions across all periods likely have a strong sustained trend.'] } },
  { icon:'🔍', title:'Theme Detail', color:'#aa77ff', summary:'Deep analysis of constituent stocks, contribution & comparison charts',
    detail:{ overview:'Select a theme and dive deep into the details — from individual constituent stocks to overall comparisons.',
      features:[
        { name:'Theme Summary Card', desc:'Shows avg return, MoM change, and status (🔥Accel/❄️Decel/↗Rev↑/↘Rev↓/→Flat). Positive MoM + "Accel" status signals continued capital inflows.' },
        { name:'Constituent Stock Table', desc:'Lists ticker, stock name, price, return, contribution, vol change, volume, and trading value for each constituent stock.' },
        { name:'Theme Comparison Chart', desc:'Compare trend charts of multiple themes simultaneously. Select up to 5 themes.' },
        { name:'Macro Comparison Chart', desc:'Compare selected theme returns with macro indicators like domestic ETF and USD/JPY.' },
      ],
      tips:['Even if the overall theme is rising, if only 1-2 specific stocks are driving it, it may be an "apparent rise". Check contribution rates.','If MoM is negative but Status shows "↗Rev↑", a direction change may have begun.'] } },
  { icon:'📋', title:'Market Ranking', color:'#06d6a0', summary:'Constituent stocks by major indices, broad market & market segment',
    detail:{ overview:'View return rankings and constituent stock details for "Major Stocks", "Broad Market", and "Market Segment" groups.',
      features:[
        { name:'Major Stocks (Tech/Finance/Consumer/Materials/Capital Goods/Transport)', desc:'225 major domestic stocks classified into 6 categories. Average return for each category is shown on buttons.' },
        { name:'Broad Market (Core30/Large70)', desc:'Core30 consists of the 30 largest market-cap companies; Large70 is the next 70. Good for checking market leaders.' },
        { name:'Market Segment (Prime/Standard/Growth)', desc:'Classified by TSE market segment. Growth market tends to have higher return volatility.' },
      ],
      tips:['When "Tech" sector is particularly strong, also check "Semiconductors" and "AI/Cloud" in Theme List.','Core30\'s movement tends to reflect the overall market direction.'] } },
  { icon:'🔥', title:'Heatmap', color:'#ff8c42', summary:'Grasp theme performance at a glance through color coding',
    detail:{ overview:'Displays return rates of 30 themes through color (red=rise, green=fall). Visually understand "which themes were strong when".',
      features:[
        { name:'Period Heatmap (1W/1M/3M/6M/1Y)', desc:'Displays 5 periods\' return rates side by side. Themes consistently red across multiple periods are in long-term uptrends.' },
        { name:'Monthly Trend Heatmap', desc:'Displays monthly return rates for the past 12 months. Useful for discovering seasonal patterns.' },
        { name:'Color Intensity', desc:'Deeper colors indicate larger return rates. Dark red = large rise, light red = small rise.' },
      ],
      tips:['Themes that are red for 1W-1M but green for 3M-1Y may be in a "recent rebound phase".','If the entire heatmap is red, it indicates broad market strength; if green, broad weakness.'] } },
  { icon:'💹', title:'Fund Flow & Momentum', color:'#ffd166', summary:'Track capital flows and acceleration/deceleration status',
    detail:{ overview:'Two tabs: "Fund Flow" and "Momentum". Understand which themes capital is heading toward and whether the trend is strengthening or weakening.',
      features:[
        { name:'Fund Flow: Top 10 Inflow/Outflow', desc:'Displays top 10 themes by return rate (inflow) and bottom 10 (outflow) as horizontal bar charts.' },
        { name:'Momentum Tab', desc:'Shows "Return, WoW Change, Status" for each theme. Status: 🔥Accel (both up), ❄️Decel (both down), ↗Rev↑ (reversing up), ↘Rev↓ (reversing down), →Flat.' },
      ],
      tips:['Themes appearing in both Top 10 Inflow and 🔥Accel momentum indicate the strongest capital inflow acceleration.','↗Rev↑ themes have just reversed from falling to rising — potential early entry signals.'] } },
  { icon:'🎨', title:'Custom Theme', color:'#e63030', summary:'Create and track your own original themes',
    detail:{ overview:'Create themes with your own stock selections and track their returns. Perfect for grouping your own holdings or supply chain-related stocks.',
      features:[
        { name:'Theme Creation', desc:'Enter a theme name and search for stocks by ticker code (e.g. 6954) or stock name. Create original themes by combining multiple stocks.' },
        { name:'Trend Chart', desc:'Shows cumulative return chart for all constituent stocks with period switching (1W/1M/3M).' },
        { name:'Constituent Stock Table', desc:'Shows price, return, volume, and trading value for each stock.' },
        { name:'URL Export', desc:'Click "Copy URL" to encode the theme as a URL. Bookmarking that URL allows restoration from any device.' },
      ],
      tips:['Register your own holdings as a Custom Theme to check your "portfolio return rate".','Sign in with Google to sync themes across all devices automatically.'] } },
]

const QA_ITEMS = [
  { q:'How often is the data updated?', a:'Data is automatically updated 3 times on weekdays: after morning session open (approx. 9:35 AM JST), after morning session close (approx. 12:05 PM JST), and after afternoon session close (approx. 3:35 PM JST). No updates on weekends and holidays.' },
  { q:'Is the displayed data real-time?', a:'No. Data is obtained via a reliable data provider with approximately 15-20 minute delays. It is based on the day\'s or previous day\'s closing prices, not real-time prices during trading hours. Always verify official data from your broker for actual trades.' },
  { q:'How is the return rate calculated?', a:'The theme return rate is the average of each constituent stock\'s return rate (rate of change from the starting day\'s closing price). It is an independent aggregated value different from official indices (Nikkei Stock Average, TOPIX, etc.).' },
  { q:'What is "Contribution"?', a:'Contribution shows how much each stock contributes to the theme\'s overall average return rate. It is calculated as the theme\'s average return divided equally among constituent stocks.' },
  { q:'Where is Custom Theme data saved?', a:'When not signed in: saved in your browser\'s local storage (cleared with cache clear). When signed in with Google: saved in the cloud database and synced across all devices.' },
  { q:'Are US stocks supported?', a:'Currently only Japanese stocks listed on the Tokyo Stock Exchange are supported. US stock tracking is not available.' },
  { q:'How is the Status (Accel/Decel/Reversal) determined?', a:'🔥Accel: WoW change > +3pt AND MoM > +5pt. ❄️Decel: opposite. ↗Rev↑: WoW > +2pt. ↘Rev↓: WoW < -2pt. →Flat: everything else.' },
  { q:'What should I do if I think there is an error in the data?', a:'Please contact us via X (Twitter) @StockWaveJP DM. If the error is due to the data provider, correction may be difficult, but we will review the content and respond accordingly.' },
]

function QAItem({ q, a, delay=0 }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'8px', marginBottom:'6px', overflow:'hidden', animation:`fadeUp 0.3s ease ${delay}s both` }}>
      <button onClick={() => setOpen(o => !o)} style={{ width:'100%', background:'transparent', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'10px', padding:'12px 16px', fontFamily:'var(--font)', textAlign:'left' }}>
        <span style={{ fontSize:'13px', color:'var(--accent)', fontWeight:700, flexShrink:0 }}>Q</span>
        <span style={{ flex:1, fontSize:'13px', fontWeight:600, color:'var(--text)' }}>{q}</span>
        <span style={{ fontSize:'11px', color:'var(--text3)', flexShrink:0 }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div style={{ padding:'0 16px 14px', borderTop:'1px solid var(--border)' }}>
          <div style={{ display:'flex', gap:'10px', paddingTop:'12px' }}>
            <span style={{ fontSize:'13px', color:'var(--green)', fontWeight:700, flexShrink:0 }}>A</span>
            <span style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.9 }}>{a}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function HowTo() {
  const [activeSection, setActiveSection] = useState(null)
  return (
    <div style={{ padding:'28px 32px 48px' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, letterSpacing:'-0.02em', color:'#ffffff', marginBottom:'4px' }}>How to Use</h1>
      <p style={{ fontSize:'13px', color:'var(--text2)', marginBottom:'28px' }}>Guide to StockWaveJP features, usage tips, and data interpretation</p>

      <div style={{ background:'linear-gradient(135deg, rgba(74,158,255,0.1), rgba(255,69,96,0.08))', border:'1px solid rgba(74,158,255,0.2)', borderRadius:'var(--radius)', padding:'20px 24px', marginBottom:'24px' }}>
        <div style={{ fontSize:'14px', fontWeight:700, color:'#ffffff', marginBottom:'8px' }}>What is StockWaveJP?</div>
        <div style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.9 }}>
          A real-time dashboard tracking Japan stock theme-based returns, volume, and trading value. Updated automatically 3 times on weekdays. Uses ETF prices as proprietary indicators — not official index values. Provided for reference only, not investment advice.
        </div>
      </div>

      <div style={{ fontSize:'13px', fontWeight:700, color:'var(--text)', marginBottom:'12px', display:'flex', alignItems:'center', gap:'8px' }}>
        <span>📖 Page-by-Page Guide</span>
        <div style={{ flex:1, height:'1px', background:'var(--border)' }}/>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:'8px', marginBottom:'28px' }}>
        {SECTIONS.map((s, i) => {
          const isOpen = activeSection === i
          return (
            <div key={i} style={{ background:'var(--bg2)', border:`1px solid ${isOpen ? s.color+'55' : 'var(--border)'}`, borderRadius:'10px', overflow:'hidden', transition:'border-color 0.2s' }}>
              <button onClick={() => setActiveSection(isOpen ? null : i)} style={{ width:'100%', background:'transparent', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'12px', padding:'14px 18px', fontFamily:'var(--font)' }}>
                <span style={{ fontSize:'20px', flexShrink:0 }}>{s.icon}</span>
                <div style={{ flex:1, textAlign:'left' }}>
                  <div style={{ fontSize:'14px', fontWeight:700, color:'var(--text)', marginBottom:'2px' }}>{s.title}</div>
                  <div style={{ fontSize:'11px', color:'var(--text3)' }}>{s.summary}</div>
                </div>
                <span style={{ fontSize:'12px', color: isOpen ? s.color : 'var(--text3)', fontWeight:600, flexShrink:0 }}>{isOpen ? '▲ Close' : '▼ Details'}</span>
              </button>
              {isOpen && (
                <div style={{ padding:'0 18px 18px', borderTop:`1px solid ${s.color}33` }}>
                  <p style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.9, margin:'14px 0 16px' }}>{s.detail.overview}</p>
                  <div style={{ marginBottom:'16px' }}>
                    <div style={{ fontSize:'11px', fontWeight:600, color:s.color, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px' }}>Features</div>
                    <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                      {s.detail.features.map((f, fi) => (
                        <div key={fi} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)', borderRadius:'8px', padding:'10px 14px' }}>
                          <div style={{ fontSize:'12px', fontWeight:700, color:'var(--text)', marginBottom:'4px' }}>{f.name}</div>
                          <div style={{ fontSize:'12px', color:'var(--text2)', lineHeight:1.8 }}>{f.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ background:`${s.color}0e`, border:`1px solid ${s.color}33`, borderRadius:'8px', padding:'12px 14px' }}>
                    <div style={{ fontSize:'11px', fontWeight:600, color:s.color, letterSpacing:'0.1em', marginBottom:'8px' }}>💡 Tips</div>
                    <ul style={{ margin:0, paddingLeft:'16px' }}>
                      {s.detail.tips.map((t, ti) => (
                        <li key={ti} style={{ fontSize:'12px', color:'var(--text2)', lineHeight:1.9, marginBottom:'2px' }}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ fontSize:'13px', fontWeight:700, color:'var(--text)', margin:'28px 0 12px', display:'flex', alignItems:'center', gap:'8px' }}>
        <span>❓ FAQ</span>
        <div style={{ flex:1, height:'1px', background:'var(--border)' }}/>
      </div>
      {QA_ITEMS.map((item, i) => <QAItem key={i} q={item.q} a={item.a} delay={i*0.04} />)}
    </div>
  )
}
