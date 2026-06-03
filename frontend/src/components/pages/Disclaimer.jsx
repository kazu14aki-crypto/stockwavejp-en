export default function Disclaimer() {
  const items = [
    {
      title: 'Purpose of Information',
      body: 'StockWaveJP is an information service providing theme-based price change %, volume, and trading value statistics for the Japanese stock market, along with analysis articles. All information provided is for reference purposes only and does not constitute a solicitation, recommendation, or investment advice for any specific stock, investment product, or trading method.',
    },
    {
      title: 'About Our Proprietary Data Aggregation',
      body: 'The aggregated figures displayed on this site (average price change %, volume, trading value, etc.) are calculated using our own proprietary methodology based on market data of constituent stocks. These figures are not the same as officially published indices such as the Nikkei 225 or TOPIX. Our theme classifications and constituent stocks are independently defined by StockWaveJP and differ from any official financial institution classifications.',
    },
    {
      title: 'Data Accuracy and Sources',
      body: 'Our data is sourced from an external data provider (Infoway) and updated automatically. We make every effort to ensure accuracy, but cannot guarantee the accuracy, completeness, or timeliness of the information. Data is updated daily and is not real-time. For actual investment decisions, always verify with official sources such as your broker or the Tokyo Stock Exchange.',
    },
    {
      title: 'Limitation of Liability',
      body: 'StockWaveJP and its operators accept no liability for any damages (direct, indirect, lost profits, or opportunity costs) arising from investment actions taken based on information from this site. This service is provided "as is" and we are not liable for service interruptions, data errors, or system failures.',
    },
    {
      title: 'Copyright',
      body: 'The code, design, and data structure of this site are protected by copyright. Unauthorized reproduction, copying, or commercial use is prohibited.',
    },
  ]
  return (
    <div style={{ padding: '24px 28px 60px', maxWidth: '760px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#e8f0ff', marginBottom: '4px' }}>Disclaimer</h1>
      <p style={{ fontSize: '12px', color: 'var(--text3)', marginBottom: '24px' }}>StockWaveJP Disclaimer</p>
      {items.map((item, i) => (
        <div key={i} style={{
          background: 'var(--bg2)', border: '1px solid var(--border)',
          borderRadius: '8px', padding: '18px 22px', marginBottom: '12px'
        }}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>{item.title}</h2>
          <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.8 }}>{item.body}</p>
        </div>
      ))}
    </div>
  )
}
