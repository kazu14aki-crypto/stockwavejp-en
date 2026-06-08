export default function Disclaimer() {
  const sections = [
    {
      title: '1. Scope of Disclaimer',
      body: 'The information provided by StockWaveJP ("the Service") is for general informational purposes only and does not constitute investment advice, recommendations, or solicitation to buy or sell any financial instrument.',
    },
    {
      title: '2. Investment Risk Warning',
      body: 'Investing in securities involves substantial risk, including the possible loss of the principal amount invested. Past performance is not indicative of future results. The Service does not guarantee any specific outcome or profit.\n\nAll investment decisions should be made based on your own independent judgment, financial situation, and risk tolerance. We strongly recommend consulting a licensed financial advisor before making investment decisions.',
    },
    {
      title: '3. Not a Registered Financial Advisor',
      body: 'StockWaveJP is not registered as an investment advisor under the Financial Instruments and Exchange Act (Japan), the Investment Advisers Act (USA), or any equivalent legislation in the EU or other jurisdictions. The Service provides market data and analytics tools only.',
    },
    {
      title: '4. Accuracy of Information',
      body: 'While we strive to provide accurate and up-to-date information, we make no warranties regarding the accuracy, completeness, reliability, or timeliness of any information provided. Market data may be delayed and may differ from actual market conditions.',
    },
    {
      title: '5. No Liability for Losses',
      body: 'To the maximum extent permitted by applicable law, StockWaveJP and its operators shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, the Service or the information provided therein.',
    },
    {
      title: '6. Service Availability',
      body: 'The Service is provided "as is" without any warranty of availability or uptime. We reserve the right to modify, suspend, or terminate the Service at any time without notice.',
    },
    {
      title: '7. Third-Party Links',
      body: 'The Service may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of any linked sites.',
    },
    {
      title: '8. Intellectual Property',
      body: 'All content, designs, and code on the Service are protected by copyright and other intellectual property laws. Reproduction, redistribution, or commercial use without prior written permission is prohibited.',
    },
    {
      title: '9. Governing Law',
      body: 'This disclaimer is governed by the laws of Japan. For EU users, mandatory consumer protection laws of your country may apply in addition to or instead of these terms. For US users, applicable state consumer protection laws may also apply.',
    },
    {
      title: '10. Modifications',
      body: 'We reserve the right to modify this disclaimer at any time. Continued use of the Service after changes are posted constitutes acceptance of the modified disclaimer.',
    },
  ]
  return (
    <div style={{ padding:'28px 32px 60px', maxWidth:'760px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, color:'#e8f0ff', marginBottom:'4px' }}>Disclaimer</h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'32px' }}>Last updated: June 1, 2026</p>
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