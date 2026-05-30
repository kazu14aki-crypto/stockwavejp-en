export default function PrivacyPolicy() {
  const s={padding:'32px 28px 60px',maxWidth:'780px',margin:'0 auto',lineHeight:1.9,fontSize:'13px',color:'var(--text2)'}
  const h1={fontSize:'22px',fontWeight:700,color:'var(--text)',marginBottom:'8px'}
  const h2={fontSize:'14px',fontWeight:700,color:'var(--text)',margin:'24px 0 8px',paddingBottom:'6px',borderBottom:'1px solid var(--border)'}
  const p={marginBottom:'12px'}
  return (
    <div style={s}>
      <h1 style={h1}>Privacy Policy</h1>
      <p style={{...p,fontSize:'12px',color:'var(--text3)'}}>Last updated: May 2026</p>
      <h2 style={h2}>Information We Collect</h2>
      <p style={p}><strong>Account:</strong> Google OAuth provides your email, name, and profile photo. We never receive your Google password.</p>
      <p style={p}><strong>Usage Data:</strong> Anonymized analytics to improve the service.</p>
      <p style={p}><strong>Custom Themes:</strong> Stored in our database (Supabase) when you are signed in.</p>
      <h2 style={h2}>How We Use It</h2>
      <p style={p}>To provide and improve the service, manage subscriptions, and prevent abuse.</p>
      <h2 style={h2}>Third-Party Services</h2>
      <p style={p}>Google OAuth (auth), Supabase (database), Stripe (payments), GitHub Pages (hosting), Render.com (API), Infoway (market data). Each has its own privacy policy.</p>
      <h2 style={h2}>Data Retention</h2>
      <p style={p}>Your data is retained while your account is active. You may request deletion by contacting us.</p>
      <h2 style={h2}>Cookies</h2>
      <p style={p}>Essential cookies only (auth/session). No advertising cookies. We do not sell your data.</p>
      <h2 style={h2}>Contact</h2>
      <p style={p}><a href="mailto:stockwavejp26@gmail.com" style={{color:'var(--accent)'}}>stockwavejp26@gmail.com</a></p>
    </div>
  )
}
