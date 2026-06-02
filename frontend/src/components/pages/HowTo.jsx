import React, { useState } from 'react'

const SECTIONS = [
  {
    icon: '📊',
    title: 'Theme List',
    desc: 'Compare price change %, volume, and trading value across 67+ themes at a glance. Data is sourced from Infoway (Japanese stock API service).',
    items: [
      'Use the period selector at the top (1D / 1W / 1M / 3M / 6M / 1Y) to switch the display period. Note: Free plan users can only select 3M, 6M, and 1Y.',
      'The "Return Ranking TOP5" section shows 4 themes by default. Use "Top 10" or "All Themes" buttons to expand.',
      'Monthly charts (price change %, volume, trading value) at the bottom of the page can be clicked to enlarge on desktop. Mobile shows standard size.',
      'Monthly charts support multi-theme comparison. Click theme badges to deselect, or use the "+ Add Theme" button to add more.',
      'The Theme Heatmap (bottom right) can be expanded by clicking on desktop. When expanded, zone descriptions are shown. Hover over bubbles to see theme name, return, volume, and trading value as a tooltip.',
    ]
  },
  {
    icon: '🔥',
    title: 'Theme Heatmap',
    desc: 'Visualize capital flows across 67 themes using a scatter plot.',
    items: [
      'X-axis = price change % (right = more rising), Y-axis = volume surge rate (up = more volume), bubble size = trading value.',
      'Top-right "Hot Zone" = Rising + Volume spike = strongest signal. Top-left = selling pressure. Bottom-right = quiet rising. Bottom-left = quiet falling.',
      'Hover over bubbles to see theme name, price change %, volume surge rate, and trading value.',
      'Click a bubble to show a popup with that theme\'s return, volume, and trading value. Click "Theme Detail" in the popup to navigate to the detail page.',
      'Use the period selector at the top to switch between 1D / 1W / 1M / 3M.',
    ]
  },
  {
    icon: '🔍',
    title: 'Theme Detail',
    desc: 'Deep-dive analysis of constituent stocks within a single theme.',
    items: [
      'Select a theme from the dropdown at the top. Period can also be changed.',
      'Rising/Falling TOP5 and Featured Stocks pickup (note: not real-time, depends on data fetch timing) are displayed full-width.',
      'Bottom of page is 2-column layout (desktop): left column has volume chart, stock heatmap, and navigation buttons; right column has constituent stock table.',
      'The stock table can be sorted by price change %, volume, or trading value. Click headers to toggle ascending/descending.',
      'The table supports click-and-drag horizontal scrolling. A scrollbar is also shown at the top of the table.',
      'Each chart can be enlarged by clicking.',
      'Use the "+" button to add stocks to your Custom Theme.',
    ]
  },
  {
    icon: '📋',
    title: 'Market Ranking',
    desc: 'Compare and analyze stocks by market segment and industry sector.',
    items: [
      'Switch segments (Major Stocks, Technology, Financials, Prime Market, etc.) and periods using the tabs and selectors at the top.',
      'Bottom of page is 2-column layout (desktop): left column has the stock table; right column has a stock heatmap and volume/trading value charts.',
      'The stock table supports drag-scroll and sort buttons. A scrollbar is shown at the top.',
      'Hover over bubbles to see stock name, price change %, volume, and trading value.',
    ]
  },
  {
    icon: '🎨',
    title: 'Custom Theme',
    desc: 'Create your own themes and track stocks side by side.',
    items: [
      'Up to 3 custom themes, with a maximum of 10 stocks per theme.',
      'Search for Japanese stocks by name or 4-digit ticker code to add them.',
      'Sign in with Google to sync themes across devices. Without login, themes are saved in browser LocalStorage.',
      'Theme detail view shows a return chart, volume chart, stock heatmap, and stock table (2-column on desktop).',
      'Use "Copy URL" to share your custom theme with other users.',
    ]
  },
  {
    icon: '🏦',
    title: 'Institutional Holdings',
    desc: 'Check institutional investor holdings based on FSA EDINET large shareholding disclosure data.',
    items: [
      'Use the "Search by Stock (Recommended)" tab and enter a stock name or ticker code. Example: Toyota, 7203',
      'Click a stock in the search results to go to the detail page, which shows each institution\'s holding %, increase/decrease trend (↑ up ↓ down), and a link to the disclosure PDF.',
      'Use the "Search by Institution" tab to see all stocks held by a specific institutional investor.',
      'Holdings newly reported at 5–7% are notable signals. Over 10% may indicate management participation or activist interest. Consecutive increase reports signal active accumulation.',
      'Data is automatically updated daily. There is up to a 5-business-day delay from the EDINET report filing date. Holdings below 5% are not required to be disclosed, so coverage is not exhaustive.',
    ]
  },
  {
    icon: '📰',
    title: 'Weekly Report',
    desc: 'Market report updated every weekend.',
    items: [
      'Reports are displayed as cards. Click to view the full report.',
      '"Theme Detail" and "Read Column" buttons appear near theme names mentioned in the report.',
      'Click Rising/Falling TOP5 theme badges to navigate to that theme\'s detail page.',
      'Reports are manually written based on market data, not AI-generated.',
    ]
  },
  {
    icon: '📝',
    title: 'Column & Analysis',
    desc: 'In-depth analysis articles for each theme and key individual stocks.',
    items: [
      'All 67 themes have dedicated column articles, plus individual stock analysis for major names.',
      'You can also navigate directly from the Theme Detail page using the "Read Related Column" button.',
    ]
  },
  {
    icon: '⚙️',
    title: 'Settings',
    desc: 'Change color theme and display mode.',
    items: [
      'Color Theme: Choose between Dark (default) and Light (white).',
      'Rising/Falling Color: Switch between Japan style (up=red, down=green) and US style (up=green, down=red).',
      'Some chart elements may not change immediately on theme switch — improvements are ongoing.',
    ]
  },
]

const QA = [
  {
    q: 'Is the data real-time?',
    a: 'No. Data is automatically updated several times per day by GitHub Actions (weekdays at 7:00 / 9:00 / 12:00 / 15:30 / 23:30 UTC). Reflection of the latest data may take up to a few hours. Check the "Last Updated" timestamp in the top-right corner of the page.',
  },
  {
    q: 'How are the Featured Stocks picks selected?',
    a: 'Stocks are ranked mechanically using a proprietary composite score based on price change %, volume, price trend, and trading value. Since this is not real-time data and depends on the data fetch timing, it may differ from the latest market conditions. Please use it only as a reference for investment research.',
  },
  {
    q: 'What unit is Trading Value displayed in?',
    a: 'Trading value is displayed in hundreds of millions (100M) or trillions (T) of yen. Example: 2.4T = ¥2.4 trillion. Volume is in number of shares.',
  },
  {
    q: 'How many Custom Themes can I create?',
    a: 'Up to 3 themes, with a maximum of 10 stocks per theme. Signing in with Google syncs your data across devices. Without login, themes are stored in browser LocalStorage and will be lost if browser data is cleared.',
  },
  {
    q: 'What do the heatmap zones mean?',
    a: '🔥 Hot Zone (top-right): Rising + Volume surge = strongest bullish signal / ⚠️ Sell Pressure (top-left): Falling + Volume surge = strong selling / 📈 Quiet Rising (bottom-right): Rising + Low volume = gradual rise / ❄️ Quiet Falling (bottom-left): Weak but low conviction',
  },
  {
    q: 'How is the price change % calculated?',
    a: 'The theme price change % is the simple average of the price change % of all constituent stocks in that theme. Individual stock returns are based on closing prices.',
  },
  {
    q: 'The table is hard to read on mobile. What can I do?',
    a: 'The stock table supports horizontal scrolling — swipe left/right to navigate. On desktop, you can also click-and-drag horizontally. Charts are automatically scaled down on mobile.',
  },
  {
    q: 'Where does the data come from?',
    a: 'Stock data is sourced from Infoway (data.infoway.io), a commercial API providing daily OHLCV and real-time data for Japanese equities. Institutional holding data is sourced from FSA EDINET.',
  },
]

function Chevron({ open }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transition:'transform 0.2s', transform: open?'rotate(180deg)':'rotate(0deg)', flexShrink:0 }}>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function HowTo() {
  const [openQ, setOpenQ] = useState(null)
  const [openS, setOpenS] = useState(null)

  return (
    <div style={{ padding:'24px 28px 60px', maxWidth:'900px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'22px', fontWeight:700, color:'var(--text)', marginBottom:'6px' }}>📖 How to Use & FAQ</h1>
      <p style={{ fontSize:'13px', color:'var(--text3)', marginBottom:'28px' }}>
        A guide to each feature of StockWaveJP and answers to frequently asked questions.
      </p>

      {/* Feature Guide (accordion) */}
      <h2 style={{ fontSize:'16px', fontWeight:700, color:'var(--text)', marginBottom:'14px', borderBottom:'1px solid var(--border)', paddingBottom:'6px' }}>
        🗺️ Feature Guide
      </h2>
      <div style={{ display:'flex', flexDirection:'column', gap:'8px', marginBottom:'32px' }}>
        {SECTIONS.map((sec, si) => (
          <div key={si} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'8px', overflow:'hidden' }}>
            <button onClick={() => setOpenS(openS === si ? null : si)}
              style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
                gap:'12px', padding:'12px 16px', background:'transparent', border:'none',
                cursor:'pointer', textAlign:'left', fontFamily:'var(--font)', color:'var(--text)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                <span style={{ fontSize:'18px' }}>{sec.icon}</span>
                <div>
                  <div style={{ fontSize:'13px', fontWeight:700, color:'var(--text)' }}>{sec.title}</div>
                  <div style={{ fontSize:'11px', color:'var(--text3)', marginTop:'2px' }}>{sec.desc}</div>
                </div>
              </div>
              <Chevron open={openS === si} />
            </button>
            {openS === si && (
              <div style={{ padding:'0 16px 14px', borderTop:'1px solid var(--border)' }}>
                <ul style={{ margin:'10px 0 0', paddingLeft:'20px', display:'flex', flexDirection:'column', gap:'5px' }}>
                  {sec.items.map((item, ii) => (
                    <li key={ii} style={{ fontSize:'12px', color:'var(--text2)', lineHeight:1.7 }}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FAQ */}
      <h2 style={{ fontSize:'16px', fontWeight:700, color:'var(--text)', marginBottom:'14px', borderBottom:'1px solid var(--border)', paddingBottom:'6px' }}>
        ❓ Frequently Asked Questions
      </h2>
      <div style={{ display:'flex', flexDirection:'column', gap:'8px', marginBottom:'32px' }}>
        {QA.map((qa, i) => (
          <div key={i} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'8px', overflow:'hidden' }}>
            <button onClick={() => setOpenQ(openQ === i ? null : i)}
              style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
                gap:'12px', padding:'12px 16px', background:'transparent', border:'none',
                cursor:'pointer', textAlign:'left', fontFamily:'var(--font)', color:'var(--text)' }}>
              <span style={{ fontSize:'13px', fontWeight:600 }}>Q. {qa.q}</span>
              <Chevron open={openQ === i} />
            </button>
            {openQ === i && (
              <div style={{ padding:'0 16px 14px', fontSize:'12px', color:'var(--text2)', lineHeight:1.8,
                borderTop:'1px solid var(--border)' }}>
                <div style={{ paddingTop:'10px' }}>A. {qa.a}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div style={{ padding:'14px 18px', background:'rgba(255,193,7,0.05)',
        border:'1px solid rgba(255,193,7,0.2)', borderRadius:'8px', fontSize:'12px', color:'var(--text3)', lineHeight:1.8 }}>
        ⚠️ <strong style={{ color:'var(--text2)' }}>Disclaimer: </strong>
        All information on this site is for reference purposes only and does not constitute a recommendation
        to buy or sell any specific stock. All investment decisions are the sole responsibility of the user.
        We do not guarantee the accuracy or timeliness of the data provided.
      </div>
    </div>
  )
}
