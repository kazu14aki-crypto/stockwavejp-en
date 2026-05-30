export default function LegalNotice() {
  const s  = { padding:'32px 28px 60px', maxWidth:'780px', margin:'0 auto', lineHeight:1.9, fontSize:'13px', color:'var(--text2)' }
  const h1 = { fontSize:'22px', fontWeight:700, color:'var(--text)', marginBottom:'8px' }
  const h2 = { fontSize:'14px', fontWeight:700, color:'var(--text)', margin:'24px 0 8px', paddingBottom:'6px', borderBottom:'1px solid var(--border)' }
  const p  = { marginBottom:'12px' }
  const row = (label, value) => (
    <div key={label} style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:'8px 16px', padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,0.05)', fontSize:'13px' }}>
      <span style={{ color:'var(--text3)', fontWeight:600 }}>{label}</span>
      <span style={{ color:'var(--text2)' }}>{value}</span>
    </div>
  )
  return (
    <div style={s}>
      <h1 style={h1}>Legal Notice</h1>
      <p style={{ ...p, fontSize:'12px', color:'var(--text3)' }}>Disclosure required under the Japanese Act on Specified Commercial Transactions.</p>
      <h2 style={h2}>Operator</h2>
      <div>
        {row('Service Name', 'StockWaveJP')}
        {row('Operator', 'StockWaveJP Editorial Team')}
        {row('Address', 'Disclosed upon request.')}
        {row('Phone', 'Disclosed upon request.')}
        {row('Email', 'stockwavejp26@gmail.com')}
        {row('URL', 'https://stockwavejp-en.com')}
      </div>
      <h2 style={h2}>Pricing</h2>
      <div>
        {row('Free Plan', 'Free (permanent)')}
        {row('Standard Plan', '¥980/month')}
        {row('Pro Plan', '¥1,980/month')}
      </div>
      <h2 style={h2}>Payment</h2>
      <div>
        {row('Methods', 'Credit card (Visa, Mastercard, Amex, JCB) via Stripe')}
        {row('Billing', 'Monthly: charged automatically on the subscription date each month')}
      </div>
      <h2 style={h2}>Cancellation & Refunds</h2>
      <p style={p}>As a general rule, no refunds are provided. Exceptions may apply in cases of service outages lasting 7+ consecutive days, duplicate charges, or as required by applicable consumer protection laws.</p>
      <h2 style={h2}>Contact</h2>
      <p style={p}><a href="mailto:stockwavejp26@gmail.com" style={{ color:'var(--accent)' }}>stockwavejp26@gmail.com</a><br/>We respond within 5 business days.</p>
      <p style={{ fontSize:'11px', color:'var(--text3)', marginTop:'24px' }}>Last updated: May 2026</p>
    </div>
  )
}
