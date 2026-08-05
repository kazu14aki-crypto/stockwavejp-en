export default function TermsOfService() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      body: "These Terms of Service (\"Terms\") govern your use of StockWaveJP (the \"Service\"), operated as a sole proprietorship based in Japan (the \"Operator\"; contact: stockwavejp26@gmail.com). By creating an account or using the Service, you agree to these Terms, the Disclaimer, and the Privacy Policy, which are incorporated by reference. You must be at least 18 years old to use the Service.",
    },
    {
      title: "2. Plans and Fees",
      body: "The Service offers a Free plan and paid subscription plans (Standard: USD 9.9/month; Pro: USD 19.9/month, prices as displayed on the Plan & Pricing page, which prevails in case of discrepancy). Payments are processed by Stripe; we do not store your card number. We may change fees or plan features with prior notice; changes apply from your next renewal, and you may cancel before renewal if you do not agree.",
    },
    {
      title: "3. Free Trial",
      body: "New accounts receive a 14-day free trial with Pro-equivalent features, once per account. No credit card is required for the trial, and you will not be charged automatically when the trial ends; your account simply reverts to the Free plan. We may withhold the trial in cases of abuse (e.g., multiple accounts).",
    },
    {
      title: "4. Automatic Renewal and Cancellation",
      body: "IMPORTANT — AUTOMATIC RENEWAL: Paid subscriptions renew automatically each month, and your payment method will be charged at the then-current rate on each renewal date until you cancel. You can cancel at any time from the Settings page; cancellation takes effect at the end of the current billing period, and you retain access to paid features until then. No partial-month refunds are provided.",
    },
    {
      title: "5. EU/EEA and UK Consumers — Right of Withdrawal",
      body: "If you are a consumer in the EU/EEA or the UK, you generally have a 14-day right of withdrawal for online purchases. By subscribing, you expressly request immediate access to the digital service and acknowledge that, once performance has begun with your consent, you lose the right of withdrawal with respect to the service already supplied, to the extent permitted by Directive 2011/83/EU and implementing national laws. Your mandatory statutory rights remain unaffected.",
    },
    {
      title: "6. Refunds",
      body: "Except as stated in these Terms or required by mandatory law, all fees are non-refundable. We will provide a refund or credit in the event of (a) a material Service outage attributable to us lasting seven (7) consecutive days or more, or (b) duplicate or erroneous charges.",
    },
    {
      title: "7. Intellectual Property; Permitted Use",
      body: "All Content is owned by the Operator or its licensors and protected by applicable intellectual property laws. You may use the Content for your personal, non-commercial purposes only. You may not reproduce, redistribute, sell, or publicly transmit the Content beyond reasonable personal use. Brief screenshots shared on social media with attribution to StockWaveJP are permitted.",
    },
    {
      title: "8. Prohibited Conduct",
      body: "You must not: (a) scrape, crawl, or use bots or automated means to extract data without our express permission; (b) redistribute data or integrate it into third-party services or databases; (c) reverse engineer the Service, probe for vulnerabilities, or impose unreasonable load on our infrastructure; (d) share, lend, or sell account credentials; (e) use the Service for market manipulation, dissemination of false rumors, or other conduct violating securities laws; or (f) violate any applicable law or interfere with the operation of the Service.",
    },
    {
      title: "9. Suspension and Termination",
      body: "We may suspend or terminate your access, remove content, or delete your account without prior notice if you breach these Terms or if we reasonably suspect a breach. Fees already paid will not be refunded in such cases.",
    },
    {
      title: "10. Disclaimers; Limitation of Liability",
      body: "THE SERVICE AND THE CONTENT ARE PROVIDED \"AS IS\" AND \"AS AVAILABLE\", WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING ACCURACY, COMPLETENESS, MERCHANTABILITY, OR FITNESS FOR A PARTICULAR PURPOSE. THE SERVICE DOES NOT PROVIDE INVESTMENT ADVICE. TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO THE SERVICE SHALL NOT EXCEED THE FEES YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, EXCEPT IN CASES OF WILLFUL MISCONDUCT OR GROSS NEGLIGENCE. SOME JURISDICTIONS DO NOT ALLOW CERTAIN LIMITATIONS; IN SUCH CASES OUR LIABILITY IS LIMITED TO THE FULLEST EXTENT PERMITTED. NOTHING IN THESE TERMS AFFECTS NON-WAIVABLE CONSUMER RIGHTS.",
    },
    {
      title: "11. Changes to the Service and Terms",
      body: "We may modify or discontinue features at any time with reasonable notice where practicable. If we discontinue the entire Service, we will endeavor to give 30 days' notice and provide a pro-rated settlement of unused paid periods. We may amend these Terms; material changes will be announced in advance on the Service, and continued use after the effective date constitutes acceptance.",
    },
    {
      title: "12. Assignment; Severability; Entire Agreement",
      body: "You may not assign your rights or obligations under these Terms without our prior written consent. If any provision is held invalid or unenforceable, the remaining provisions remain in full force. These Terms, together with the documents incorporated by reference, constitute the entire agreement between you and the Operator regarding the Service.",
    },
    {
      title: "13. Governing Law and Venue",
      body: "These Terms are governed by the laws of Japan, excluding its conflict-of-law rules. Disputes shall be subject to the exclusive jurisdiction of the Osaka District Court in the first instance. If you are a consumer, this clause does not deprive you of the protection of mandatory provisions, or of the venue rights, of the law of your country of habitual residence.",
    },
    {
      title: "14. Contact",
      body: "Questions about these Terms: stockwavejp26@gmail.com. We aim to respond within five (5) business days.",
    },
  ]
  return (
    <div style={{ padding:'28px 32px 60px', maxWidth:'760px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, color:'#e8f0ff', marginBottom:'4px' }}>Terms of Service</h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'32px' }}>Last updated: July 5, 2026</p>
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
