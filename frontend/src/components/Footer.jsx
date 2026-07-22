export default function Footer({ onNavigate, contactUrl }) {
  const buttonStyle={background:'none',border:'none',color:'var(--text3)',cursor:'pointer',fontFamily:'var(--font)',fontSize:'11px',padding:0,textDecoration:'underline',textUnderlineOffset:'2px'}
  return <footer style={{borderTop:'1px solid var(--border)',padding:'18px 24px',textAlign:'center',color:'var(--text3)',fontSize:'11px'}}>
    <div style={{display:'flex',justifyContent:'center',gap:'18px',flexWrap:'wrap',marginBottom:'8px'}}>
      <button style={buttonStyle} onClick={()=>onNavigate?.('Disclaimer')}>Disclaimer</button>
      <button style={buttonStyle} onClick={()=>onNavigate?.('Privacy Policy')}>Privacy Policy</button>
      <button style={buttonStyle} onClick={()=>onNavigate?.('Terms of Service')}>Terms of Service</button>
      <a href={contactUrl} target="_blank" rel="noopener noreferrer" style={{...buttonStyle,display:'inline-block'}}>Contact</a>
    </div>
    <div><b style={{color:'#e63030'}}>Stock</b><b style={{color:'var(--text2)'}}>Wave</b><b style={{color:'#e63030',fontSize:'9px'}}>JP</b> — Japanese equity theme research — © 2026</div>
    <div style={{marginTop:'5px'}}>Information is provided for research purposes and is not investment advice.</div>
  </footer>
}
