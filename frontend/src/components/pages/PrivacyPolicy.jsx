export default function PrivacyPolicy() {
  const sections = [
    {
      title: '1. Introduction',
      body: `StockWaveJP ("we," "our," or "the Service") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information in compliance with applicable laws including Japan's Act on Protection of Personal Information (APPI), the EU General Data Protection Regulation (GDPR), and the California Consumer Privacy Act (CCPA).`,
    },
    {
      title: '2. Information We Collect',
      body: `Account Information: Email address (collected via Google OAuth), authentication tokens managed by Supabase.

Usage Data: IP address, browser type, OS, pages visited, time spent, and other access logs.

User-Generated Content: Custom theme settings and saved investment data.

Payment Information: Processed by Stripe. We do not store your credit card information.`,
    },
    {
      title: '3. How We Use Your Information',
      body: `We use collected information to:
• Provide, operate, and improve the Service
• Manage subscriptions and process payments
• Analyze usage patterns and improve user experience
• Detect and prevent fraud or abuse
• Comply with legal obligations
• Send service-related communications`,
    },
    {
      title: '4. Cookies and Tracking Technologies',
      body: `We use cookies and similar tracking technologies:

• Session cookies: To maintain login state
• Google Analytics: For anonymous traffic analysis
• Affiliate tracking (A8.net): For measuring advertising effectiveness

EU users will be presented with a cookie consent mechanism. You can disable cookies in your browser settings, though some features may be limited.`,
    },
    {
      title: '5. Third-Party Services',
      body: `We share data with the following third parties as necessary to operate the Service:

• Supabase (authentication and database, USA)
• Stripe (payment processing, USA)
• Google Analytics (USA) — anonymous usage analytics
• A8.net (Japan) — affiliate marketing tracking
• Render.com (USA) — API server hosting

All third parties are bound by data processing agreements and applicable privacy laws.`,
    },
    {
      title: '6. International Data Transfers (GDPR)',
      body: `If you are located in the EU/EEA, your personal data may be transferred to countries outside the EU, including the United States. Such transfers are governed by the European Commission's Standard Contractual Clauses (SCCs) or other appropriate safeguards as required by GDPR Chapter V.`,
    },
    {
      title: '7. Data Retention',
      body: `Account data: Retained until account deletion, then deleted within 30 days.
Usage logs: Retained for 26 months per Google Analytics defaults.
Payment records: Retained for 7 years as required by law.`,
    },
    {
      title: '8. Your Rights',
      body: `Depending on your jurisdiction, you may have the following rights:

• Right of Access: Request a copy of your personal data
• Right to Rectification: Correct inaccurate information
• Right to Erasure: Request deletion of your data
• Right to Restrict Processing: Limit how we use your data
• Right to Data Portability: Receive data in a machine-readable format
• Right to Object: Object to certain processing activities

California residents (CCPA): Right to Know, Right to Delete, Right to Opt-Out of Sale. We do not sell personal data.

To exercise any right, contact us via the methods listed in Section 13.`,
    },
    {
      title: '9. Affiliate Advertising Disclosure',
      body: `StockWaveJP participates in affiliate advertising programs, including A8.net. If you click a link on our site and complete a purchase or sign-up, we may receive a commission. This does not affect the price you pay or the objectivity of our content. We are never instructed by advertisers to recommend specific products or services.`,
    },
    {
      title: '10. Security',
      body: `We implement appropriate technical and organizational security measures including SSL/TLS encryption, access controls, and regular security assessments. However, no method of transmission over the Internet is 100% secure.`,
    },
    {
      title: "11. Children's Privacy",
      body: `The Service is not directed to individuals under 18 years of age. We do not knowingly collect personal information from minors. If we become aware that a minor has provided personal data, we will delete it promptly.`,
    },
    {
      title: '12. Changes to This Policy',
      body: `We may update this Privacy Policy periodically. Material changes will be notified via the Service or by email. Continued use of the Service after changes become effective constitutes your acceptance.`,
    },
    {
      title: '13. Contact Us',
      body: `For privacy-related inquiries or to exercise your rights, please contact us:

• X (Twitter): @StockWaveJP (DM)
• In-app contact form

We will respond within 30 days. EU users may also lodge a complaint with their national data protection authority.`,
    },
  ]
  return (
    <div style={{ padding:'28px 32px 60px', maxWidth:'760px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, color:'#e8f0ff', marginBottom:'4px' }}>Privacy Policy</h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'32px' }}>Last updated: June 1, 2026 | GDPR · APPI · CCPA Compliant</p>
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
