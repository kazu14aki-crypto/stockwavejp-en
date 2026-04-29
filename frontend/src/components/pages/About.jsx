export default function About() {
  return (
    <div style={{ padding:'28px 32px 60px', maxWidth:'760px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, color:'var(--text)', marginBottom:'4px' }}>運営者情報</h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'32px' }}>StockWaveJP について</p>

      <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'12px', padding:'28px 32px', marginBottom:'24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'120px 1fr', gap:'16px 24px', fontSize:'13px' }}>
          {[
            ['サイト名', 'StockWaveJP'],
            ['URL', 'https://stockwavejp.com'],
            ['運営開始', '2026年3月'],
            ['themes数', '67themes（半導体・AI・防衛・金融・エネルギー・インバウンドほか）'],
            ['目的', 'Japan equity themes別のperformance rate・trading volume・trade valueを可視化し、投資判断の参考情報を提供すること'],
            ['対象ユーザー', '日本株に興味を持つindividual investors・投資初心者'],
          ].map(([label, value], i) => (
            <div key={i} style={{ display:'contents' }}>
              <span style={{ color:'var(--text3)', fontWeight:600, letterSpacing:'0.05em', fontSize:'11px', textTransform:'uppercase', paddingTop:'2px' }}>{label}</span>
              <span style={{ color:'var(--text2)', lineHeight:1.7 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'12px', padding:'24px 28px', marginBottom:'24px' }}>
        <h2 style={{ fontSize:'15px', fontWeight:700, color:'var(--text)', marginBottom:'14px' }}>サイトについて</h2>
        <p style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.9, marginBottom:'12px' }}>
          StockWaveJPは、日本株のthemes別動向を視覚的に把握するためのダッシュボードです。
          半導体・AI・防衛・インバウンドなど<strong style={{ color:'var(--accent)' }}>67themes・約900stocks</strong>のperformance rate・trading volume・trade valueを自動集計し、
          どのthemesに資金が集まっているかを定期更新データで確認できます。
        </p>
        <p style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.9, marginBottom:'12px' }}>
          市場別詳細では国内主要株・時価総額別・市場区分（プライム/スタンダード/グロース）・
          <strong style={{ color:'var(--accent)' }}>ETF（6カテゴリ・53stocks）</strong>の分析も可能です。
        </p>
        <p style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.9, marginBottom:'0' }}>
          個別stocksの推奨や投資助言は行っておらず、あくまで「市場全体のthemesの流れを把握する」ための
          情報提供ツールです。実際の投資判断は、必ずご自身の責任において行ってください。
        </p>
      </div>

    </div>
  )
}
