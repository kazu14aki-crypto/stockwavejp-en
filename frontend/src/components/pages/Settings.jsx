export default function Settings({ viewMode, onViewModeChange, colorTheme, onColorThemeChange }) {
  const themes = [
    { key:'dark',  label:'🌑 Black',  desc:'Dark mode — default' },
    { key:'navy',  label:'🌊 Navy',   desc:'Deep blue dark mode' },
    { key:'light', label:'☀️ White',  desc:'Light mode' },
  ]
  const modes = [
    { key:'auto',   label:'🔄 Auto',   desc:'Detect screen size automatically' },
    { key:'pc',     label:'🖥 Desktop', desc:'Always use desktop layout' },
    { key:'mobile', label:'📱 Mobile',  desc:'Always use mobile layout' },
  ]
  const Card = ({ active, onClick, label, desc }) => (
    <button onClick={onClick} style={{
      display:'flex', alignItems:'center', gap:'14px',
      background: active ? 'rgba(74,158,255,0.1)' : 'var(--bg2)',
      border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
      borderRadius:'10px', padding:'14px 18px', cursor:'pointer',
      fontFamily:'var(--font)', width:'100%', textAlign:'left', transition:'all 0.15s',
    }}>
      <div style={{ width:'18px', height:'18px', borderRadius:'50%', flexShrink:0,
        border: `2px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
        display:'flex', alignItems:'center', justifyContent:'center' }}>
        {active && <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'var(--accent)' }}/>}
      </div>
      <div>
        <div style={{ fontSize:'14px', fontWeight: active ? 700 : 400, color: active ? 'var(--accent)' : 'var(--text)' }}>{label}</div>
        <div style={{ fontSize:'12px', color:'var(--text3)', marginTop:'2px' }}>{desc}</div>
      </div>
    </button>
  )
  return (
    <div style={{ padding:'28px 32px 48px', maxWidth:'600px' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, color:'var(--text)', marginBottom:'4px' }}>Settings</h1>
      <p style={{ fontSize:'13px', color:'var(--text3)', marginBottom:'32px' }}>Customize your StockWaveJP experience</p>
      <div style={{ marginBottom:'32px' }}>
        <div style={{ fontSize:'13px', fontWeight:700, color:'var(--text)', marginBottom:'12px',
          display:'flex', alignItems:'center', gap:'8px' }}>
          <span>🎨 Color Theme</span>
          <div style={{ flex:1, height:'1px', background:'var(--border)' }}/>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
          {themes.map(t => <Card key={t.key} active={colorTheme===t.key} onClick={()=>onColorThemeChange(t.key)} label={t.label} desc={t.desc}/>)}
        </div>
      </div>
      <div>
        <div style={{ fontSize:'13px', fontWeight:700, color:'var(--text)', marginBottom:'12px',
          display:'flex', alignItems:'center', gap:'8px' }}>
          <span>📱 Display Mode</span>
          <div style={{ flex:1, height:'1px', background:'var(--border)' }}/>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
          {modes.map(m => <Card key={m.key} active={viewMode===m.key} onClick={()=>onViewModeChange(m.key)} label={m.label} desc={m.desc}/>)}
        </div>
      </div>
    </div>
  )
}
