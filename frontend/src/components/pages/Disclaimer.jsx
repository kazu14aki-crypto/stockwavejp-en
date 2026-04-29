export default function Disclaimer() {
  const sections = [
    { title: 'Article 1: Purpose of Information', body: 'StockWaveJP (hereinafter "the Site") is an information service that provides statistical data on theme-based performance rates, trading volume, and trade value in the Japanese equity market, along with column articles.\n\nAll information provided by the Site is offered as reference material for investment decision-making and does not constitute solicitation or recommendation to purchase or sell specific securities, investment products, or trading methods. The Site is not a registered investment advisor under the Financial Instruments and Exchange Act and does not provide any investment advice.' },
    { title: 'Article 2: Proprietary Aggregation of Data', body: 'The performance rates, trading volumes, and trade values displayed on the Site are calculated using the Site\'s own proprietary logic based on market data of constituent stocks.\n\n- These figures are not affiliated with the Nikkei Stock Average published by Nikkei Inc., TOPIX published by JPX Market Index, Inc., or any other official index.\n- The theme classifications and constituent stocks on the Site are defined independently and differ from classifications used by any public institution or financial organization.' },
    { title: 'Article 3: Data Sources and Accuracy', body: 'The Site\'s data is based on information automatically obtained from an external data provider (Infoway). While the Site strives for accuracy, errors, delays, or omissions may occur due to the following reasons:\n\n- Failures, specification changes, or delivery delays by the external data provider\n- System maintenance or failures\n- Network failures or other technical factors\n- Delays in data updates due to sudden market fluctuations\n\nData is updated daily and is not real-time. For actual investment decisions, always verify with official data from your securities broker or the Tokyo Stock Exchange.' },
    { title: 'Article 4: Limitation of Liability', body: 'The Site operator assumes no responsibility whatsoever for any damages (including direct damages, indirect damages, lost profits, or opportunity losses) arising from investment actions taken based on information from the Site.\n\nThis service is provided "as is," and the same applies to damages caused by service interruptions, suspensions, terminations, data errors or omissions, or system failures.' },
    { title: 'Article 5: Third-Party Services', body: 'The Site uses the following third-party services. Please refer to each company\'s website for their terms of service and privacy policies.\n\n- Google AdSense (advertising service) - Google LLC\n- Google Analytics (access analysis) - Google LLC\n- Supabase (user authentication and data storage) - Supabase Inc.\n- Infoway (stock data delivery)\n\nThe Site operator assumes no responsibility for damages arising from these third-party services.' },
    { title: 'Article 6: Copyright and Intellectual Property', body: 'Copyrights and intellectual property rights for columns, articles, text, designs, logos, source code, and other content posted on the Site belong to the Site operator or legitimate rights holders.\n\nReproduction, republication, modification, sale, or secondary use beyond personal reference and learning purposes is prohibited without prior written permission.\n\nStock prices, company names, security codes, trademarks, and similar information displayed on the Site are the property of respective exchanges and companies, and the Site does not claim these rights.' },
    { title: 'Article 7: Changes to This Disclaimer', body: 'The Site may change this disclaimer without notice due to legal revisions, changes to service content, or other circumstances. Changes take effect when posted on the Site. Significant changes will be announced on the Site.' },
    { title: 'Article 8: Governing Law and Jurisdiction', body: 'This disclaimer shall be interpreted and applied in accordance with the laws of Japan. In the event of a dispute regarding the Site\'s services, the court with jurisdiction over the location of the Site operator shall be the court of first instance with exclusive agreed jurisdiction.' },
  ]

  return (
    <div style={{ padding:'28px 32px 60px', maxWidth:'800px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'22px', fontWeight:700, color:'var(--text)', marginBottom:'4px' }}>
        Disclaimer
      </h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'8px' }}>
        Established: April 1, 2026　Last Revised: April 29, 2026
      </p>
      <div style={{ padding:'12px 16px', background:'rgba(255,193,7,0.07)', border:'1px solid rgba(255,193,7,0.25)',
        borderRadius:'8px', fontSize:'12px', color:'var(--text2)', lineHeight:1.8, marginBottom:'28px' }}>
        ⚠️ This Site is not a registered investment advisor. All information provided is for reference only. Investment decisions are made at your own risk.
      </div>
      {sections.map((s, i) => (
        <div key={i} style={{
          background:'var(--bg2)', border:'1px solid var(--border)',
          borderRadius:'10px', padding:'20px 24px', marginBottom:'12px',
        }}>
          <div style={{ fontSize:'14px', fontWeight:700, color:'var(--text)', marginBottom:'12px',
            borderLeft:'3px solid var(--accent)', paddingLeft:'10px' }}>
            {s.title}
          </div>
          <div style={{ fontSize:'13px', color:'var(--text2)', lineHeight:2.0, whiteSpace:'pre-line' }}>
            {s.body}
          </div>
        </div>
      ))}
      <div style={{ fontSize:'12px', color:'var(--text3)', marginTop:'24px', textAlign:'center' }}>
        © 2026 StockWaveJP. All rights reserved.
      </div>
    </div>
  )
}
