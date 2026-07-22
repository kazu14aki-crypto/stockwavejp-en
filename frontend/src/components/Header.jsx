import AuthButton from './AuthButton'

const LogoSvg = () => (
  <svg width="28" height="28" viewBox="0 0 56 56" fill="none">
    <line x1="28" y1="4"  x2="28" y2="10" stroke="#e63030" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="42" y1="9"  x2="38" y2="14" stroke="#e63030" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="14" y1="9"  x2="18" y2="14" stroke="#e63030" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="50" y1="21" x2="45" y2="23" stroke="#e63030" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="6"  y1="21" x2="11" y2="23" stroke="#e63030" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M11,31 A17,17 0 0,1 45,31" fill="none" stroke="#e63030" strokeWidth="2.5"/>
    <circle cx="28" cy="31" r="5.5" fill="#e63030"/>
    <line x1="3"  y1="31" x2="11" y2="31" stroke="#e63030" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="45" y1="31" x2="53" y2="31" stroke="#e63030" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M3,43 Q9,36 15,43 Q21,50 27,43 Q33,36 39,43 Q45,50 51,43"
      stroke="var(--text)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
  </svg>
)

function formatDateTime(value, compact=false) {
  if (!value) return '—'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) {
    const text = String(value).replace('T',' ').replace(/\+09:00$/,'')
    return compact ? text.slice(5,16) : text.slice(0,16)
  }
  return new Intl.DateTimeFormat('en-US', {
    month:'2-digit', day:'2-digit',
    hour:'2-digit', minute:'2-digit',
    hour12:false, timeZone:'Asia/Tokyo',
  }).format(d)
}

export default function Header({ status={}, onMenuClick, sidebarOpen, viewMode, onViewModeChange, onLogoClick }) {
  const updatedAt = status.fetchedAt || status.updatedAt || status.updated_at
  const dataAsOf = status.dataAsOf || status.data_as_of || status.updatedAt || status.updated_at
  const nextUpdate = status.nextUpdate || status.next_update_at
  const errorColor = status.dataState === 'failed' ? '#ff8c42' : 'var(--text3)'

  return (
    <>
      <header style={{
        position:'fixed', top:0, left:0, right:0, height:'var(--header)',
        background:'var(--bg2)', borderBottom:'1px solid var(--border)',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0 12px', zIndex:1000, minWidth:0,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px', flexShrink:0 }}>
          <button onClick={onMenuClick} className="hamburger-btn" aria-label="Open navigation" style={{
            display:'none', background:'var(--bg3)', border:'1px solid var(--border)',
            borderRadius:'6px', color:'var(--text)', fontSize:'16px',
            width:'34px', height:'34px', padding:0, cursor:'pointer',
            fontFamily:'var(--font)', flexShrink:0, alignItems:'center', justifyContent:'center',
          }}>{sidebarOpen ? '✕' : '☰'}</button>

          <button onClick={onLogoClick} aria-label="Go to Home" style={{
            display:'flex', alignItems:'center', gap:'8px', background:'none',
            border:'none', cursor:'pointer', padding:0, flexShrink:0,
          }}>
            <LogoSvg />
            <div style={{ textAlign:'left' }} className="logo-text">
              <div className="logo-main" style={{ fontSize:'16px', fontWeight:700, lineHeight:1.1, color:'var(--text)' }}>
                <span style={{ color:'#e63030' }}>Stock</span>Wave
                <span style={{ color:'#e63030', fontSize:'10px', marginLeft:'2px' }}>JP</span>
              </div>
              <div className="logo-sub" style={{ fontSize:'7px', letterSpacing:'0.25em', color:'var(--text3)', fontWeight:600, marginTop:'1px' }}>
                JAPANESE EQUITY THEMES
              </div>
            </div>
          </button>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:'8px', flexShrink:0, minWidth:0 }}>
          <div className="market-status" style={{ display:'flex', alignItems:'center', gap:'6px', minWidth:0 }}>
            <span style={{
              width:'7px', height:'7px', borderRadius:'50%', display:'inline-block', flexShrink:0,
              background:status.is_open ? 'var(--green)' : 'var(--text3)',
              boxShadow:status.is_open ? '0 0 7px var(--green)' : 'none',
            }}/>
            <span className="status-label" style={{ fontSize:'11px', color:'var(--text2)', whiteSpace:'nowrap' }}>
              {status.label || 'Checking market status'}
            </span>
            <div className="data-time-desktop" title="Update time is when StockWaveJP fetched the file. Data as of is the timestamp represented by the market data." style={{ display:'flex', alignItems:'center', gap:'5px', whiteSpace:'nowrap' }}>
              <span style={{ fontSize:'9px', color:errorColor, padding:'2px 5px', borderRadius:'4px', background:'var(--bg3)', border:'1px solid var(--border)' }}>
                Updated {formatDateTime(updatedAt)}
              </span>
              <span style={{ fontSize:'9px', color:errorColor, padding:'2px 5px', borderRadius:'4px', background:'var(--bg3)', border:'1px solid var(--border)' }}>
                Data as of {formatDateTime(dataAsOf)}
              </span>
              <span style={{ fontSize:'9px', color:'var(--text3)', padding:'2px 5px', borderRadius:'4px', background:'var(--bg3)', border:'1px solid var(--border)' }}>
                Next {formatDateTime(nextUpdate)}
              </span>
            </div>
            <div className="data-time-mobile" title={`Updated: ${formatDateTime(updatedAt)} / Data as of: ${formatDateTime(dataAsOf)} / Next: ${formatDateTime(nextUpdate)}`} style={{ display:'none', flexDirection:'column', lineHeight:1.2, whiteSpace:'nowrap' }}>
              <span style={{ fontSize:'8px', color:errorColor }}>Up {formatDateTime(updatedAt, true)}</span>
              <span style={{ fontSize:'8px', color:errorColor }}>As {formatDateTime(dataAsOf, true)}</span>
              <span style={{ fontSize:'8px', color:'var(--text3)' }}>Nx {formatDateTime(nextUpdate, true)}</span>
            </div>
          </div>

          <div className="view-switcher" style={{
            display:'flex', gap:'2px', flexShrink:0, background:'var(--bg3)',
            border:'1px solid var(--border)', borderRadius:'6px', padding:'2px',
          }}>
            {[{ key:'pc', label:'🖥' }, { key:'mobile', label:'📱' }].map(({ key, label }) => (
              <button key={key} onClick={() => onViewModeChange(key)} aria-label={`${key} view`} style={{
                padding:'3px 9px', borderRadius:'4px', fontSize:'12px', border:'none',
                cursor:'pointer', fontFamily:'var(--font)',
                background:viewMode===key ? 'var(--accent)' : 'transparent',
                color:viewMode===key ? '#fff' : 'var(--text3)', flexShrink:0,
              }}>{label}</button>
            ))}
          </div>
          <AuthButton />
        </div>
      </header>
      <style>{`
        @media (max-width:1280px){.hamburger-btn{display:flex!important}}
        @media (max-width:980px){.status-label,.logo-sub{display:none!important}}
        @media (max-width:760px){
          .data-time-desktop{display:none!important}
          .data-time-mobile{display:flex!important}
          .auth-btn-label{display:none!important}
        }
        @media (max-width:540px){.view-switcher{display:none!important}.logo-text{display:none!important}}
      `}</style>
    </>
  )
}
