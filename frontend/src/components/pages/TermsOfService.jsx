export default function TermsOfService() {
  const s={padding:'32px 28px 60px',maxWidth:'780px',margin:'0 auto',lineHeight:1.9,fontSize:'13px',color:'var(--text2)'}
  const h1={fontSize:'22px',fontWeight:700,color:'var(--text)',marginBottom:'8px'}
  const h2={fontSize:'14px',fontWeight:700,color:'var(--text)',margin:'24px 0 8px',paddingBottom:'6px',borderBottom:'1px solid var(--border)'}
  const p={marginBottom:'12px'}
  return (
    <div style={s}>
      <h1 style={h1}>Terms of Service</h1>
      <p style={{...p,fontSize:'12px',color:'var(--text3)'}}>Last updated: May 2026</p>
      <h2 style={h2}>1. Acceptance</h2>
      <p style={p}>By using StockWaveJP, you agree to these terms. If you do not agree, please discontinue use.</p>
      <h2 style={h2}>2. Service Description</h2>
      <p style={p}>StockWaveJP provides Japanese stock theme tracking and educational content for informational purposes only. Nothing constitutes investment advice.</p>
      <h2 style={h2}>3. No Investment Advice</h2>
      <p style={p}>All data, analysis, and content is for informational purposes only. All investment decisions are solely your responsibility.</p>
      <h2 style={h2}>4. User Accounts</h2>
      <p style={p}>You may sign in via Google OAuth. You are responsible for your account security. We reserve the right to suspend accounts that violate these terms.</p>
      <h2 style={h2}>5. Subscriptions & Cancellation</h2>
      <p style={p}>Paid plans (Standard and Pro) are billed monthly. You may cancel anytime from Settings → Current Plan → Cancel Subscription. Access continues until the end of your billing period. No refunds are provided for partial months as a general rule.</p>
      <h2 style={h2}>6. Prohibited Use</h2>
      <p style={p}>You may not: (a) use the service for unlawful purposes; (b) scrape or mass-download data; (c) redistribute our content commercially without permission.</p>
      <h2 style={h2}>7. Limitation of Liability</h2>
      <p style={p}>To the maximum extent permitted by law, StockWaveJP shall not be liable for any financial losses arising from use of this service.</p>
      <h2 style={h2}>8. Contact</h2>
      <p style={p}><a href="mailto:stockwavejp26@gmail.com" style={{color:'var(--accent)'}}>stockwavejp26@gmail.com</a></p>
    </div>
  )
}
