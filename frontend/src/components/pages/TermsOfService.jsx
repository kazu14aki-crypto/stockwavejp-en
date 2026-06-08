export default function TermsOfService() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      body: `By accessing or using StockWaveJP ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please do not use the Service.`,
    },
    {
      title: '2. Eligibility',
      body: `You must be at least 18 years old to use the Service. By using the Service, you represent that you meet this requirement. The Service is not available to users previously suspended or terminated.`,
    },
    {
      title: '3. Account Registration',
      body: `You agree to provide accurate, current, and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us immediately of any unauthorized use.`,
    },
    {
      title: '4. Prohibited Conduct',
      body: `You agree not to:

• Use the Service for any unlawful purpose
• Infringe upon our intellectual property rights
• Attempt to gain unauthorized access (hacking, scraping, etc.)
• Overburden our servers with excessive requests
• Harass other users or engage in harmful conduct
• Use the Service for fraudulent financial activity
• Reproduce or redistribute content without permission
• Distribute malware or malicious code`,
    },
    {
      title: '5. Subscription and Billing',
      body: `Free Trial: New users may receive a free trial period. At the end of the trial, your subscription will automatically convert to a paid plan unless cancelled.

Billing Cycle: Monthly recurring charges processed via Stripe.

Cancellation: You may cancel at any time from your Settings page. Upon cancellation, you retain access to paid features until the end of the current billing period.

Refunds: Due to the digital nature of the Service, refunds are generally not provided. Exceptions may apply in cases of material service failure.

Price Changes: We will provide 30 days` notice of price changes to registered email addresses.',
    },
    {
      title: '6. Intellectual Property',
      body: `All content on the Service, including text, graphics, code, data, and user interface elements, is owned by StockWaveJP and protected by copyright, trademark, and other intellectual property laws. You may access the Service for personal, non-commercial use only. Reproduction, redistribution, or commercial exploitation is strictly prohibited without prior written consent.`,
    },
    {
      title: '7. Financial Information Disclaimer',
      body: `The Service provides market data and analytics tools for informational purposes only. Nothing on the Service constitutes financial, investment, tax, or legal advice. We are not registered as an investment advisor in Japan, the United States (SEC/FINRA), or any EU member state. Always conduct your own research and consult qualified professionals before making investment decisions.`,
    },
    {
      title: '8. Disclaimer of Warranties',
      body: `The Service is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.`,
    },
    {
      title: '9. Limitation of Liability',
      body: `To the maximum extent permitted by applicable law, StockWaveJP and its operators shall not be liable for any indirect, incidental, special, exemplary, or consequential damages, including loss of profits, data, or goodwill, even if advised of the possibility of such damages.

Our total liability shall not exceed the amount paid by you in the 12 months preceding the claim.`,
    },
    {
      title: '10. Indemnification',
      body: `You agree to indemnify and hold harmless StockWaveJP and its operators from any claims, damages, or expenses arising from your use of the Service, violation of these Terms, or infringement of any third-party rights.`,
    },
    {
      title: '11. Governing Law and Dispute Resolution',
      body: `These Terms are governed by the laws of Japan. Disputes shall be submitted to the exclusive jurisdiction of the Tokyo District Court as the court of first instance.

For EU consumers: Mandatory consumer protection laws of your home country may apply. You retain the right to bring disputes before an ADR (Alternative Dispute Resolution) body in your country.

For US users: Applicable state law may apply in cases where federal or state consumer protection laws provide greater protection.`,
    },
    {
      title: '12. Severability',
      body: `If any provision of these Terms is found invalid or unenforceable, the remaining provisions shall continue in full force and effect.`,
    },
    {
      title: '13. Modifications to Terms',
      body: `We reserve the right to modify these Terms at any time. Material changes will be communicated 30 days in advance. Your continued use of the Service after changes take effect constitutes acceptance of the revised Terms.`,
    },
    {
      title: '14. Contact',
      body: `For questions about these Terms, please contact us:

• X (Twitter): @StockWaveJP (DM)
• In-app contact form`,
    },
  ]
  return (
    <div style={{ padding:'28px 32px 60px', maxWidth:'760px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, color:'#e8f0ff', marginBottom:'4px' }}>Terms of Service</h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'32px' }}>Last updated: June 1, 2026 | Japan · EU · US Applicable</p>
      {sections.map((s, i) => (
        <div key={i} style={{ marginBottom:'28px' }}>
          <h2 style={{ fontSize:'15px', fontWeight:700, color:'#e8f0ff', marginBottom:'10px',
            borderLeft:'3px solid var(--accent)', paddingLeft:'12px' }}>{s.title}</h2>
          <div style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.9, whiteSpace:'pre-line' }}>{s.body}</div>
        </div>
      ))}
    </div>
  )
}