function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>{title}</h2>
      <div style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}

export default function TermsOfService() {
  return (
    <div style={{ padding: '24px 28px 60px', maxWidth: '760px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#e8f0ff',
        marginBottom: '6px', letterSpacing: '-0.02em' }}>Terms of Service</h1>
      <p style={{ fontSize: '12px', color: 'var(--text3)', marginBottom: '28px' }}>
        Effective: April 1, 2026 — Last revised: April 29, 2026
      </p>

      <Section title="Article 1 (Scope of These Terms)">
        <p>These Terms of Service govern the use of all services ("the Service") provided by StockWaveJP ("the Site"). By using the Service, you agree to these Terms.</p>
      </Section>

      <Section title="Article 2 (Service Content)">
        <p>The Site provides an information service including theme-based price change %, volume, trading value, and momentum statistics for the Japanese stock market, as well as column articles on theme investing.</p>
        <p style={{marginTop:'8px'}}>The Service includes:</p>
        <ul style={{paddingLeft:'20px', marginTop:'6px'}}>
          <li>Theme-based aggregated price change %, volume, and trading value data</li>
          <li>Theme price momentum analysis</li>
          <li>Market heatmap and macro indicators</li>
          <li>Column and analysis articles on theme investing</li>
          <li>Custom Theme creation (for registered users)</li>
          <li>Institutional holdings data (for paid plan users)</li>
        </ul>
      </Section>

      <Section title="Article 3 (No Investment Advice / Disclaimer)">
        <p>All information provided by the Site is <strong style={{color:'var(--red)'}}>for reference purposes only and does not constitute investment advice or a recommendation to buy or sell any security.</strong></p>
        <p style={{marginTop:'8px'}}>The Site is not a licensed investment advisor under applicable financial regulations and provides no investment advice. All investment decisions are the sole responsibility of the user.</p>
        <p style={{marginTop:'8px'}}>The Site accepts no liability for any damages (including lost profits and opportunity costs) arising from investment actions based on information from the Site.</p>
      </Section>

      <Section title="Article 4 (Data Accuracy)">
        <p>Data is sourced from an external provider (Infoway) and updated automatically. We make every effort to ensure accuracy but cannot guarantee accuracy, completeness, or timeliness. We are not liable for damages arising from data provider failures, system maintenance, or network issues.</p>
      </Section>

      <Section title="Article 5 (Prohibited Uses)">
        <p>The following uses are prohibited:</p>
        <ul style={{paddingLeft:'20px', marginTop:'6px'}}>
          <li>Actions that violate laws or public order</li>
          <li>Unauthorized reproduction, commercial use, or redistribution of Site content</li>
          <li>Actions that interfere with the Site's operation</li>
          <li>Providing false information during registration</li>
          <li>Any other actions deemed inappropriate by the Site operator</li>
        </ul>
      </Section>

      <Section title="Article 6 (Paid Plans)">
        <p>Paid plans are processed via Stripe. Cancellation takes effect at the end of the current billing period. No refunds are issued for partial periods. Prices may change with prior notice.</p>
      </Section>

      <Section title="Article 7 (Changes and Termination)">
        <p>The Site operator may change or terminate the Service or these Terms without prior notice. We accept no liability for damages arising from such changes.</p>
      </Section>

      <Section title="Article 8 (Governing Law)">
        <p>These Terms are governed by Japanese law. Any disputes shall be subject to the exclusive jurisdiction of the Tokyo District Court as the court of first instance.</p>
      </Section>
    </div>
  )
}
