const PAGE_LINKS = {
  'Home': [
    ['📊','Theme List','Find strong themes'],
    ['🔥','Heatmap','View capital flows'],
    ['🔎','Stock Search','Search by company or ticker'],
    ['📰','Weekly Report','Check continuation'],
  ],
  'Theme List': [
    ['🔥','Heatmap','Compare return and volume'],
    ['🔍','Theme Detail','Inspect constituents'],
    ['🔎','Stock Search','Research a company'],
    ['📰','Weekly Report','Review prior rankings'],
  ],
  'Heatmap': [
    ['📊','Theme List','Compare rankings'],
    ['🔍','Theme Detail','Inspect constituents'],
    ['🔎','Stock Search','Research a stock'],
  ],
  'Theme Detail': [
    ['📊','Theme List','Compare other themes'],
    ['🔥','Heatmap','Check capital flow'],
    ['🔎','Stock Search','Research constituents'],
    ['📰','Weekly Report','Check continuation'],
  ],
  'Stock Search': [
    ['📊','Theme List','Find candidates by theme'],
    ['🔍','Theme Detail','Compare theme membership'],
    ['🎨','Custom Theme','Build a watch group'],
    ['📰','Weekly Report','Return to market context'],
  ],
  'Custom Theme': [
    ['🔎','Stock Search','Add stocks'],
    ['📊','Theme List','Compare official themes'],
    ['📰','Weekly Report','Check market context'],
  ],
  'Weekly Report': [
    ['📊','Theme List','Check current rankings'],
    ['🔥','Heatmap','View capital flows'],
    ['🔎','Stock Search','Research mentioned stocks'],
  ],
  'Column': [
    ['📊','Theme List','Verify with data'],
    ['🔍','Theme Detail','Inspect constituents'],
    ['🔎','Stock Search','Research companies'],
  ],
  'Market Detail': [
    ['📊','Theme List','Return to theme analysis'],
    ['🔎','Stock Search','Research stocks'],
  ],
  'Institutional Holdings': [
    ['📊','Theme List','Return to theme analysis'],
    ['🔎','Stock Search','Research disclosed stocks'],
  ],
}

export function hasRelatedPageNav(currentPage) {
  return Boolean(PAGE_LINKS[currentPage]?.length)
}

export default function RelatedPageNav({ currentPage, onNavigate }) {
  const links = PAGE_LINKS[currentPage]
  if (!links?.length) return null
  return (
    <div className="related-page-nav" style={{
      position:'sticky', top:'var(--header)', zIndex:180,
      minHeight:'var(--related-nav-height)', boxSizing:'border-box',
      padding:'8px 12px', borderBottom:'1px solid var(--border)',
      background:'color-mix(in srgb, var(--bg2) 96%, transparent)',
      backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)',
      boxShadow:'0 4px 12px rgba(0,0,0,.12)',
    }}>
      <div className="related-page-nav-scroll" style={{ maxWidth:'1280px', margin:'0 auto', display:'flex', alignItems:'center', gap:'7px', overflowX:'auto', WebkitOverflowScrolling:'touch', scrollbarWidth:'thin' }}>
        <span className="related-page-nav-title" style={{ fontSize:'10px', color:'var(--text3)', fontWeight:700, whiteSpace:'nowrap', marginRight:'2px' }}>Related pages</span>
        {links.map(([icon,label,desc]) => (
          <button key={label} onClick={() => onNavigate?.(label)} title={desc} style={{
            display:'flex', alignItems:'center', gap:'5px', padding:'6px 10px', minHeight:'34px',
            border:'1px solid var(--border)', borderRadius:'8px', background:'var(--bg3)',
            color:'var(--text2)', cursor:'pointer', fontFamily:'var(--font)', flexShrink:0,
          }}>
            <span style={{ fontSize:'12px' }}>{icon}</span>
            <span style={{ fontSize:'11px', fontWeight:700, whiteSpace:'nowrap' }}>{label}</span>
            <span className="related-page-nav-desc" style={{ fontSize:'9px', color:'var(--text3)', whiteSpace:'nowrap' }}>{desc}</span>
          </button>
        ))}
      </div>
      <style>{`
        @media(max-width:640px){
          .related-page-nav{padding:6px 8px!important}
          .related-page-nav-title,.related-page-nav-desc{display:none!important}
          .related-page-nav-scroll{gap:5px!important}
          .related-page-nav button{min-height:36px!important;padding:6px 10px!important}
        }
      `}</style>
    </div>
  )
}
