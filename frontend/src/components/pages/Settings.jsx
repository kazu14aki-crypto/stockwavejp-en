export default function Settings({ viewMode, onViewModeChange, colorTheme, onColorThemeChange }) {
  const Card = ({ children, style = {} }) => (
    <div style={{ background:'var(--bg2)', border:'1px solid var(--border)',
      borderRadius:'var(--radius)', padding:'20px 24px', marginBottom:'16px', ...style }}>{children}</div>
  )
  const SLabel = ({ children }) => (
    <div style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.1em', color:'#ffffff',
      textTransform:'uppercase', marginBottom:'14px' }}>{children}</div>
  )
  const COLOR_THEMES = [
    { key:'dark',  label:'🌑 Dark',  desc:'Dark mode (default)' },
    { key:'navy',  label:'🌊 Navy',  desc:'Deep blue dark theme' },
    { key:'light', label:'☀️ Light', desc:'Light mode'           },
  ]
  return (
    <div style={{ padding:'28px 32px 48px' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, letterSpacing:'-0.02em', color:'#ffffff', marginBottom:'4px' }}>Settings</h1>
      <p style={{ fontSize:'12px', color:'var(--text2)', marginBottom:'28px' }}>Customize display mode and theme.</p>

      <Card>
        <SLabel>Color Theme</SLabel>
        <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
          {COLOR_THEMES.map(({ key, label, desc }) => (
            <button key={key} onClick={() => onColorThemeChange(key)} style={{
              padding:'12px 20px', borderRadius:'8px', cursor:'pointer',
              border:`2px solid ${colorTheme===key ? 'var(--accent)' : 'var(--border)'}`,
              background: colorTheme===key ? 'rgba(74,158,255,0.1)' : 'var(--bg3)',
              fontFamily:'var(--font)', transition:'all 0.15s',
              display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'4px',
              minWidth:'140px',
            }}>
              <span style={{ fontSize:'14px', color:'#ffffff', fontWeight:600 }}>{label}</span>
              <span style={{ fontSize:'11px', color:'var(--text2)' }}>{desc}</span>
              {colorTheme===key && (
                <span style={{ fontSize:'10px', color:'var(--accent)', fontWeight:600, marginTop:'4px' }}>✓ Active</span>
              )}
            </button>
          ))}
        </div>
        <p style={{ fontSize:'11px', color:'var(--text3)', marginTop:'12px' }}>
          * Theme is saved instantly without page reload.
        </p>
      </Card>

      <Card>
        <SLabel>Display Mode</SLabel>
        <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
          {[
            { key:'auto',   label:'🔄 Auto'   },
            { key:'pc',     label:'🖥 PC'      },
            { key:'mobile', label:'📱 Mobile'  },
          ].map(({ key, label }) => (
            <button key={key} onClick={() => onViewModeChange(key)} style={{
              padding:'8px 20px', borderRadius:'6px', fontSize:'13px', cursor:'pointer',
              border:`1px solid ${viewMode===key ? 'var(--accent)' : 'var(--border)'}`,
              background: viewMode===key ? 'rgba(74,158,255,0.12)' : 'transparent',
              color: viewMode===key ? 'var(--accent)' : 'var(--text2)',
              fontFamily:'var(--font)', fontWeight: viewMode===key ? 600 : 400, transition:'all 0.15s',
            }}>{label}</button>
          ))}
        </div>
        <p style={{ fontSize:'11px', color:'var(--text3)', marginTop:'10px' }}>
          "Auto" detects your browser width and switches between PC and mobile layout automatically.
        </p>
      </Card>

      <Card>
        <SLabel>Connection Info</SLabel>
        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'8px' }}>
          <span style={{ fontSize:'12px', color:'var(--text2)' }}>Backend API:</span>
          <code style={{ fontSize:'12px', color:'var(--accent)', background:'rgba(74,158,255,0.08)',
            paddingpadding:'3px 8px', borderRadius:'4px', fontFamily:'var(--mono)',
            }}>
              {import.meta.env.VITE_API_URL || 'http://127.0.0.1:8001'}
            </code>
          </div>
        </Card>

        <Card>
          <SLabel>Version Info</SLabel>
          <div style={{ fontSize:'13px', color:'var(--text2)', lineHeight:2 }}>
            <div>StockWaveJP EN <span style={{ color:'var(--accent)', fontFamily:'var(--mono)' }}>v1.0.0</span></div>
            <div>Frontend: <span style={{ color:'var(--text3)' }}>React + Vite</span></div>
            <div>Backend: <span style={{ color:'var(--text3)' }}>FastAPI + yfinance</span></div>
          </div>
        </Card>
      </div>
    )
  }