export default function Sidebar({ pages, pagesOther, currentPage, onPageChange, isOpen, isMobile }) {
  const NavBtn = ({ icon, label }) => {
    const active = currentPage === label
    return (
      <button onClick={() => onPageChange(label)} style={{
        display:'flex', alignItems:'center', gap:'10px',
        width:'100%', background: active ? 'rgba(74,158,255,0.12)' : 'transparent',
        border:'none', borderRadius:'8px',
        padding:'9px 14px', cursor:'pointer', fontFamily:'var(--font)',
        color: active ? 'var(--accent)' : 'var(--text2)',
        fontSize:'13px', fontWeight: active ? 700 : 400,
        transition:'all 0.15s', textAlign:'left',
        borderLeft: active ? '3px solid var(--accent)' : '3px solid transparent',
      }}
        onMouseEnter={e => !active && (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
        onMouseLeave={e => !active && (e.currentTarget.style.background = 'transparent')}
      >
        <span style={{ fontSize:'16px', flexShrink:0 }}>{icon}</span>
        <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{label}</span>
      </button>
    )
  }

  const sidebarStyle = {
    position:'fixed', top:'var(--header)', left:0, bottom:0,
    width:'var(--sidebar)', background:'var(--bg2)',
    borderRight:'1px solid var(--border)',
    overflowY:'auto', overflowX:'hidden',
    zIndex: isMobile ? 900 : 100,
    transform: isMobile && !isOpen ? 'translateX(-100%)' : 'translateX(0)',
    transition:'transform 0.25s',
    padding:'12px 8px 24px',
  }

  return (
    <nav style={sidebarStyle}>
      <div style={{ marginBottom:'8px' }}>
        <div style={{ fontSize:'9px', fontWeight:700, color:'var(--text3)', letterSpacing:'0.15em',
          textTransform:'uppercase', padding:'4px 14px 6px' }}>
          Main
        </div>
        {pages.map(p => <NavBtn key={p.label} icon={p.icon} label={p.label} />)}
      </div>
      <div style={{ borderTop:'1px solid var(--border)', paddingTop:'8px', marginTop:'4px' }}>
        <div style={{ fontSize:'9px', fontWeight:700, color:'var(--text3)', letterSpacing:'0.15em',
          textTransform:'uppercase', padding:'4px 14px 6px' }}>
          Info
        </div>
        {pagesOther.map(p => <NavBtn key={p.label} icon={p.icon} label={p.label} />)}
      </div>
    </nav>
  )
}
