export default function PrivacyPolicy() {
  const s = { padding:'32px 28px 60px', maxWidth:'780px', margin:'0 auto', lineHeight:1.9, fontSize:'13px', color:'var(--text2)' }
  const h1 = { fontSize:'22px', fontWeight:700, color:'var(--text)', marginBottom:'8px' }
  const h2 = { fontSize:'14px', fontWeight:700, color:'var(--text)', margin:'24px 0 8px', paddingBottom:'6px', borderBottom:'1px solid var(--border)' }
  const p  = { marginBottom:'12px' }
  return (
    <div style={s}>
      <h1 style={h1}>Privacy Policy</h1>
      <p style={{ ...p, fontSize:'12px', color:'var(--text3)' }}>Last updated: May 2026</p>
      <h2 style={h2}>1. Information We Collect</h2>
      <p style={p}><strong>Account Information:</strong> When you sign in with Google, we receive your email address, name, and profile picture from Google OAuth. We do not receive your Google password.</p>
      <p style={p}><strong>Usage Data:</strong> We collect anonymized data on how you use the Service (pages visited, features used) to improve the platform.</p>
      <p style={p}><strong>Custom Themes:</strong> If you create custom watchlists while logged in, this data is stored in our database (Supabase) associated with your account.</p>
      <h2 style={h2}>2. How We Use Your Information</h2>
      <p style={p}>We use your information to: (a) provide and improve the Service; (b) manage your subscription; (c) send important service notifications; (d) prevent fraud and abuse.</p>
      <h2 style={h2}>3. Data Storage</h2>
      <p style={p}>User data is stored on Supabase (a PostgreSQL-based cloud database). Payment data is processed by Stripe — we never store your credit card information on our servers.</p>
      <h2 style={h2}>4. Third-Party Services</h2>
      <p style={p}>We use: Google OAuth (authentication), Supabase (database), Stripe (payments), GitHub Pages (hosting), Render.com (API server), Infoway (market data). Each third party has its own privacy policy.</p>
      <h2 style={h2}>5. Data Retention</h2>
      <p style={p}>We retain your data for as long as your account is active. You may request deletion of your account and associated data by contacting us.</p>
      <h2 style={h2}>6. Your Rights</h2>
      <p style={p}>You have the right to access, correct, or delete your personal data. Contact us at the email below to exercise these rights.</p>
      <h2 style={h2}>7. Cookies</h2>
      <p style={p}>We use essential cookies for authentication and session management. We do not use advertising cookies or sell your data to advertisers.</p>
      <h2 style={h2}>8. Contact</h2>
      <p style={p}><a href="mailto:stockwavejp26@gmail.com" style={{ color:'var(--accent)' }}>stockwavejp26@gmail.com</a></p>
    </div>
  )
}
