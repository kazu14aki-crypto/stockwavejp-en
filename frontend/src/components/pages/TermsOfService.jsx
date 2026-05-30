export default function TermsOfService() {
  const s = { padding:'32px 28px 60px', maxWidth:'780px', margin:'0 auto', lineHeight:1.9, fontSize:'13px', color:'var(--text2)' }
  const h1 = { fontSize:'22px', fontWeight:700, color:'var(--text)', marginBottom:'8px' }
  const h2 = { fontSize:'14px', fontWeight:700, color:'var(--text)', margin:'24px 0 8px', paddingBottom:'6px', borderBottom:'1px solid var(--border)' }
  const p  = { marginBottom:'12px' }
  return (
    <div style={s}>
      <h1 style={h1}>Terms of Service</h1>
      <p style={{ ...p, fontSize:'12px', color:'var(--text3)' }}>Last updated: May 2026</p>
      <h2 style={h2}>1. Acceptance of Terms</h2>
      <p style={p}>By using StockWaveJP ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>
      <h2 style={h2}>2. Service Description</h2>
      <p style={p}>StockWaveJP provides Japanese stock theme tracking, analysis tools, and educational content. The Service is for informational purposes only and does not constitute investment advice.</p>
      <h2 style={h2}>3. No Investment Advice</h2>
      <p style={p}>Nothing on this platform constitutes investment advice, a recommendation to buy or sell any security, or a solicitation of any investment. All investment decisions are solely your responsibility. Past performance is not indicative of future results.</p>
      <h2 style={h2}>4. User Accounts</h2>
      <p style={p}>You may create an account using Google OAuth. You are responsible for maintaining the security of your account. We reserve the right to suspend accounts that violate these terms.</p>
      <h2 style={h2}>5. Subscription Plans</h2>
      <p style={p}>Paid subscription plans (Standard and Pro) provide access to additional features. Subscriptions are billed monthly. As a general rule, no refunds are provided after a billing period begins.</p>
      <h2 style={h2}>6. Prohibited Activities</h2>
      <p style={p}>You may not: (a) use the Service for unlawful purposes; (b) attempt to gain unauthorized access to our systems; (c) scrape or mass-download data; (d) redistribute our content commercially without permission.</p>
      <h2 style={h2}>7. Intellectual Property</h2>
      <p style={p}>All content, data, and software on StockWaveJP is owned by StockWaveJP or its licensors. You may not reproduce or distribute our content without written permission.</p>
      <h2 style={h2}>8. Limitation of Liability</h2>
      <p style={p}>To the maximum extent permitted by law, StockWaveJP shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service.</p>
      <h2 style={h2}>9. Changes to Terms</h2>
      <p style={p}>We may update these terms at any time. Continued use of the Service after changes constitutes acceptance of the new terms.</p>
      <h2 style={h2}>10. Contact</h2>
      <p style={p}><a href="mailto:stockwavejp26@gmail.com" style={{ color:'var(--accent)' }}>stockwavejp26@gmail.com</a></p>
    </div>
  )
}
