export default function Footer({ onPage }) {
  const links = [
    { label:'Disclaimer',      page:'Disclaimer'      },
    { label:'Privacy Policy',  page:'Privacy Policy'  },
    { label:'Terms of Service',page:'Terms of Service'},
    { label:'About',           page:'About'           },
    { label:'How to Use',      page:'How to Use'      },
  ]
  return (
    <footer style={{
      borderTop:'1px solid var(--border)',
      background:'var(--bg2)',
      padding:'24px 32px',
      marginTop:'40px',
    }}>
      <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'16px', marginBottom:'16px', justifyContent:'center' }}>
          {links.map(l => (
            <button key={l.label} onClick={() => onPage?.(l.page)} style={{
              background:'none', border:'none', color:'var(--text3)',
              fontSize:'12px', cursor:'pointer', padding:'0',
              textDecoration:'underline', fontFamily:'var(--font)',
            }}>
              {l.label}
            </button>
          ))}
        </div>
        <div style={{ textAlign:'center', fontSize:'11px', color:'var(--text3)', lineHeight:1.8 }}>
          <div style={{ marginBottom:'4px' }}>
            StockWaveJP tracks Japan equity themes including semiconductors, AI, defense, and more.
            Data provided by external provider (Infoway). Not financial advice.
          </div>
          <span>© 2026 StockWaveJP. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
