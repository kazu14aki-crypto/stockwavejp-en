export default function Disclaimer() {
  const sections = [
    {
      title: "1. Scope",
      body: "This Disclaimer applies to all content, data, features, reports, and communications (collectively, the \"Content\") provided by StockWaveJP (the \"Service\"). By using the Service, you agree to this Disclaimer.",
    },
    {
      title: "2. Not Investment Advice",
      body: "The Content is provided for general informational purposes only. Nothing on the Service constitutes investment advice, a recommendation, an offer to sell, or a solicitation of an offer to buy any security or financial instrument, in any jurisdiction.\n\nThe operator of the Service is not registered as an investment adviser, broker-dealer, or financial advisor with the U.S. Securities and Exchange Commission, the Japanese Financial Services Agency (under the Financial Instruments and Exchange Act), or any other regulatory authority. Scores, rankings, signals, and similar features are statistical aggregations of publicly available data computed mechanically; they do not predict or guarantee future performance and do not constitute buy or sell recommendations.",
    },
    {
      title: "3. Investment Risk",
      body: "Investing in equities, ETFs, and other financial instruments involves substantial risk, including the possible loss of principal. Margin and leveraged trading can result in losses exceeding your deposited funds. Past performance, backtests, and statistical tendencies (including seasonal anomalies) are not indicative of future results. You are solely responsible for your investment decisions. Consider consulting a licensed financial professional before investing.",
    },
    {
      title: "4. Accuracy and Timeliness of Information",
      body: "The Content is based on sources believed to be reliable, including exchange data, public disclosures such as EDINET filings, and third-party data providers. However, we do not warrant its accuracy, completeness, or timeliness. Market data is not real-time and depends on update timing (several times per day); it may differ from actual market conditions. Fundamentals (P/E, P/B, etc.) and major-shareholder information reflect the filing date and may not represent current facts.",
    },
    {
      title: "5. Third-Party Data and Links",
      body: "The Service relies on third-party data providers and public sources. We are not responsible for errors, delays, omissions, or discontinuation attributable to such third parties. Links to external websites are provided for convenience only and do not imply endorsement.",
    },
    {
      title: "6. Advertising",
      body: "The Service may display third-party advertisements (e.g., Google AdSense). Advertised products and services are not endorsed by the Service, and any transactions are solely between you and the advertiser.",
    },
    {
      title: "7. Limitation of Liability",
      body: "To the maximum extent permitted by applicable law, the operator of the Service shall not be liable for any direct, indirect, incidental, consequential, or special damages (including lost profits or data loss) arising from your use of, or inability to use, the Service or the Content, or from any decision made in reliance on the Content, except in cases of willful misconduct or gross negligence. Where liability cannot be excluded under mandatory consumer-protection laws, our aggregate liability shall be limited to the total fees you paid to the Service during the twelve (12) months preceding the event giving rise to the claim. Some jurisdictions do not allow certain exclusions or limitations; in such jurisdictions, our liability is limited to the fullest extent permitted by law.",
    },
    {
      title: "8. Service Availability",
      body: "We may modify, suspend, or discontinue all or part of the Service at any time without prior notice, including due to maintenance, outages, or discontinuation of third-party services.",
    },
    {
      title: "9. Jurisdictional Notice",
      body: "The Service is operated from Japan. It is not directed to persons in any jurisdiction where such distribution or use would be contrary to local law or regulation. Users outside Japan are responsible for compliance with their local laws. Nothing in this Disclaimer limits mandatory rights granted to consumers under the laws of their country of residence, including within the EU/EEA and the United Kingdom.",
    },
    {
      title: "10. Governing Law and Venue",
      body: "This Disclaimer is governed by the laws of Japan. Any dispute arising in connection with the Service shall be subject to the exclusive jurisdiction of the Osaka District Court in the first instance, without prejudice to any mandatory consumer venue rights under applicable law.",
    },
    {
      title: "11. Changes",
      body: "We may revise this Disclaimer from time to time. Material changes will be announced on the Service. Continued use after changes take effect constitutes acceptance.",
    },
  ]
  return (
    <div style={{ padding:'28px 32px 60px', maxWidth:'760px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, color:'#e8f0ff', marginBottom:'4px' }}>Disclaimer</h1>
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
