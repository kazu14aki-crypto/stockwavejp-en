export default function PrivacyPolicy() {
  const items = [
    {
      title: '1. Basic Policy',
      body: `StockWaveJP values the protection of user personal information and complies with applicable privacy laws. By using this service, you agree to the terms of this Privacy Policy.`,
    },
    {
      title: '2. Information We Collect',
      body: `We collect the following information:\n\n[Automatically collected]\n• Access logs (IP address, browser type/version, OS, referrer URL, access date/time)\n• Usage data via cookies and similar technologies\n• Page views, session duration, and behavior flow via Google Analytics\n\n[Voluntarily provided]\n• Email address and display name via Google account authentication (when using Custom Theme)\n• Custom theme names and constituent stock data (stored in browser localStorage or Supabase)\n\n[Not collected]\n• Credit card numbers or bank account information\n• Names, addresses, or phone numbers (except email from Google login)`,
    },
    {
      title: '3. Use of Information',
      body: `Collected information is used for the following purposes:\n• Providing, operating, and improving this service\n• User authentication and Custom Theme feature\n• Service usage analysis and statistics (Google Analytics)`,
    },
    {
      title: '4. Affiliate Advertising',
        body: `StockWaveJP participates in affiliate advertising programs (A8.net and similar). If you click a link and complete a purchase or registration, we may receive a commission. Revenue supports the operation of this service. We are not instructed by advertisers to recommend products. Ads do not influence investment recommendations.`,
      },{
        title: '5. Cookies',
      body: `This site uses cookies to improve user experience and analyze usage. Google Analytics uses cookies to collect traffic data. You can disable cookies in your browser settings, though some features may not function correctly.`,
    },
    {
      title: '5. Third-Party Services',
      body: `This site uses the following third-party services:\n• Google Analytics (usage analysis)\n• Google Firebase Authentication (user login)\n• Supabase (data storage)\n• Stripe (payment processing)\nPlease refer to each service\'s privacy policy for details.`,
    },
    {
      title: '6. Disclaimer',
      body: `Information on this site is prepared based on sources believed to be reliable, but we do not guarantee its accuracy or completeness. We are not liable for any damages arising from the use of this site.`,
    },
    {
      title: '7. Changes to This Policy',
      body: `The content of this policy may be changed without notice due to changes in laws or other circumstances. Updated policies take effect when posted on this page.`,
    },
    {
      title: '8. Contact',
      body: `For inquiries about this Privacy Policy, please contact us via X (formerly Twitter) DM (@StockWaveJP) or the contact form on this site.`,
    },
  ]
  return (
    <div style={{ padding: '24px 28px 60px', maxWidth: '760px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#e8f0ff', marginBottom: '4px' }}>Privacy Policy</h1>
      <p style={{ fontSize: '12px', color: 'var(--text3)', marginBottom: '24px' }}>Last updated: April 2026</p>
      {items.map((item, i) => (
        <div key={i} style={{
          background: 'var(--bg2)', border: '1px solid var(--border)',
          borderRadius: '8px', padding: '18px 22px', marginBottom: '12px'
        }}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>{item.title}</h2>
          <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{item.body}</p>
        </div>
      ))}
    </div>
  )
}
