export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Who We Are (Data Controller)",
      body: "StockWaveJP (the \"Service\") is operated as a sole proprietorship based in Osaka, Japan (the \"Operator\"). For the purposes of the EU/UK General Data Protection Regulation (GDPR), the Operator is the data controller. Contact: stockwavejp26@gmail.com.",
    },
    {
      title: "2. Data We Collect",
      body: "(a) Account data: email address and authentication credentials (via Supabase Auth).\n(b) Payment data: subscription plan and billing history. Payments are processed by Stripe; your full card number never reaches our servers.\n(c) Usage data: access logs, IP address, browser and device information, and identifiers stored in cookies/localStorage.\n(d) Communications: information you provide when contacting us.",
    },
    {
      title: "3. Purposes and Legal Bases",
      body: "We process personal data for the following purposes and, for GDPR purposes, on the following legal bases:\n- Providing and operating the Service, authentication, account management — performance of a contract (Art. 6(1)(b)).\n- Billing and payment management — performance of a contract (Art. 6(1)(b)) and legal obligation (Art. 6(1)(c)).\n- Security, fraud prevention, service improvement using aggregated statistics — legitimate interests (Art. 6(1)(f)).\n- Personalized advertising cookies — consent (Art. 6(1)(a)), where required.\n- Responding to inquiries and sending important notices — performance of a contract / legitimate interests.",
    },
    {
      title: "4. Processors and Recipients",
      body: "We use the following service providers as processors (primary data locations in parentheses): Supabase Inc. (authentication/database; US and other regions), Stripe, Inc. (payments; US), Render Services, Inc. (API hosting; US), GitHub, Inc. (site hosting; US), Cloudflare, Inc. (DNS/CDN; global), and Google LLC (advertising; US). We do not sell your personal data, and we do not share it with third parties for their own marketing purposes.",
    },
    {
      title: "5. International Transfers",
      body: "We are based in Japan, which has been granted an adequacy decision by the European Commission (and an equivalent finding by the UK), allowing personal data to flow from the EEA/UK to Japan. Transfers to processors in the United States and elsewhere are safeguarded through appropriate mechanisms such as Standard Contractual Clauses and, where applicable, the EU-U.S. Data Privacy Framework certifications of our providers.",
    },
    {
      title: "6. Cookies and Advertising",
      body: "We use strictly necessary cookies/localStorage to keep you signed in and to remember settings. Third-party vendors, including Google (AdSense), may use cookies to serve ads based on your prior visits. You can opt out of personalized advertising at adssettings.google.com or www.aboutads.info. Where required by law (e.g., in the EEA/UK), a consent mechanism will be presented before non-essential cookies are set.",
    },
    {
      title: "7. Retention",
      body: "We retain personal data for as long as your account is active and thereafter only as required for legitimate business or legal purposes (e.g., tax and accounting records), after which it is deleted or anonymized.",
    },
    {
      title: "8. Your Rights (GDPR/UK GDPR)",
      body: "If you are in the EEA or UK, you have the rights of access, rectification, erasure, restriction of processing, data portability, and objection, and the right to withdraw consent at any time (without affecting prior processing). You also have the right to lodge a complaint with your local supervisory authority. To exercise your rights, contact stockwavejp26@gmail.com; we will verify your identity and respond within the statutory period.",
    },
    {
      title: "9. California Residents (CCPA/CPRA)",
      body: "We do not \"sell\" or \"share\" personal information as defined by the CCPA/CPRA. California residents have the right to know, delete, and correct personal information we hold, and the right not to be discriminated against for exercising these rights. Submit requests to stockwavejp26@gmail.com. In the preceding 12 months, we have collected the categories of information described in Section 2 for the purposes in Section 3.",
    },
    {
      title: "10. Children",
      body: "The Service is not directed to individuals under 18. If we learn that we have collected personal data from a person under 18, we will delete it promptly.",
    },
    {
      title: "11. Security",
      body: "We implement appropriate technical and organizational measures, including TLS encryption in transit, access controls, and supervision of our processors, to protect personal data against unauthorized access, loss, or alteration.",
    },
    {
      title: "12. Changes to This Policy",
      body: "We may update this Privacy Policy from time to time. Material changes will be announced on the Service. The \"Last updated\" date above reflects the latest revision.",
    },
  ]
  return (
    <div style={{ padding:'28px 32px 60px', maxWidth:'760px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, color:'#e8f0ff', marginBottom:'4px' }}>Privacy Policy</h1>
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
