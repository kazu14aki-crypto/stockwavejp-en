import React, { useState } from 'react'

const SECTIONS = [
  {
    icon: '📊',
    title: 'Theme List',
    desc: '67テーマのPerformance Rate・Trading Volume・Trade Valueを一覧比較できるページです。',
    items: [
      '上部の期間セレクター（1日/1週間/1ヶ月/3ヶ月/6ヶ月/1年）で表示期間を切り替えられます。',
      '「全テーマ Performance Rateランキング」はデフォルトで上位4件を表示。「トップ10を表示」「全67テーマを表示」ボタンで拡張できます。',
      'ページ下部の月次グラフ（Performance Rate・Trading Volume・Trade Value）はPC版ではクリックで拡大表示できます。スマホ版は通常表示です。',
      '月次グラフはテーマを複数選択して比較できます。テーマバッジをクリックで解除、「＋ テーマを追加する」ボタンで追加できます。',
      'テーマHeatmap（右下）はPC版でクリック拡大。拡大時に注目ゾーンの説明が表示されます。バブルにカーソルを当てるとテーマ名・Performance Rate・Trading Volume・Trade Valueがツールチップで表示されます。',
    ]
  },
  {
    icon: '🔥',
    title: 'テーマHeatmap',
    desc: '67テーマのFund Flowを散布図で可視化するページです。',
    items: [
      'X軸がPerformance Rate（右ほどRising）、Y軸がTrading Volume急増率（上ほどTrading Volume増）、バブルの大きさがTrade Valueを示します。',
      '右上の「注目ゾーン」はRising＋Trading Volume急増の最強シグナルエリアです。左上は売り圧力、右下は静かなRising、左下は静かなFallingを示します。',
      'バブルにカーソルを当てるとテーマ名・Performance Rate・Trading Volume急増率・Trade Valueが表示されます。',
      'バブルをクリックするとそのテーマの詳細ページに移動します。',
      '上部のセレクターで期間（1日/1週間/1ヶ月/3ヶ月）を切り替えられます。',
    ]
  },
  {
    icon: '🔍',
    title: 'Theme Detail',
    desc: '個別テーマの構成Stocksを詳細分析するページです。',
    items: [
      '上部ドロップダウンでテーマを選択。期間も切り替え可能です。',
      'Rising/FallingTOP5、注目Stocksピックアップ（※リアルタイムではなくdata update timingに依存）が全幅で表示されます。',
      'ページ下部は2カラム構成（PC版）。左カラムにTrading Volumeグラフ・Stocks別Heatmap・遷移ボタン、右カラムに構成Stocks表が配置されます。',
      'Stocks表はPerformance Rate・Trading Volume・Trade Valueでソート可能。ヘッダーのボタンで昇順/降順も切り替えられます。',
      '表はクリック&ドラッグで横移動できます。上部にもスクロールバーが表示されています。',
      '各グラフはクリックで拡大表示できます。',
      '「＋」ボタンでStocksをCustom Themeに追加できます。',
    ]
  },
  {
    icon: '📋',
    title: 'Market Ranking',
    desc: '市場区分・業種別セグメントのStocksを比較分析するページです。',
    items: [
      '上部でセグメント（国内主要株・テクノロジー・金融・プライム市場など）と期間を切り替えられます。',
      'ページ下部は2カラム構成（PC版）。左カラムにStocks表、右カラムにStocks別Heatmap・Trading Volume/Trade Valueグラフが配置されます。',
      'Stocks表はドラッグスクロール・ソートボタン対応。上部スクロールバーも表示されています。',
      'バブルにカーソルを当てるとStocks名・Performance Rate・Trading Volume・Trade Valueが表示されます。',
    ]
  },
  {
    icon: '🎨',
    title: 'Custom Theme',
    desc: '自分だけのテーマを作成してStocksを比較追跡できます。',
    items: [
      '最大3テーマ、1テーマあたり最大10Stocksまで作成できます。',
      'Stocks名または4桁証券コードでJapan stocksを検索して追加できます。',
      'Googleログインするとデバイスをまたいでテーマが同期されます。未ログインの場合はブラウザのLocalStorageに保存されます。',
      'テーマ詳細ではPerformance Rateグラフ・Trading Volumeグラフ・Stocks別Heatmap・構成Stocks表が表示されます（2カラム構成・PC版）。',
      '「URLをコピー」でテーマを他のユーザーと共有できます。',
    ]
  },
  {
    icon: '📰',
    title: '週次レポート',
    desc: '毎週末更新のマーケットレポートです。',
    items: [
      'レポートはカード形式で一覧表示されます。クリックするとレポート全文が表示されます。',
      'レポート内でテーマ名が登場する箇所の近くに「Theme Detail」「コラムを読む」ボタンが表示されます。',
      '週間Rising/FallingTOP5テーマのバッジをクリックするとそのテーマの詳細ページに移動できます。',
      'AIによる自動生成ではなく、市場データをもとに手動作成しています。',
    ]
  },
  {
    icon: '📝',
    title: 'コラム・解説',
    desc: '各テーマの詳細解説・関連Stocks分析記事を掲載しています。',
    items: [
      '67テーマすべての解説コラムと主要Stocksの個別分析記事があります。',
      'Theme Detailページからも「関連コラム記事を読む」ボタンで直接移動できます。',
    ]
  },
  {
    icon: '⚙️',
    title: '設定',
    desc: 'カラーテーマやグラフ表示モードを変更できます。',
    items: [
      'カラーテーマ: ダーク（デフォルト）・ライト（ホワイト）から選択できます。',
      '一部グラフ要素でカラーテーマ切替時に色が変わらない場合がありますが、順次改善中です。',
    ]
  },
]

const QA = [
  {
    q: 'データはリアルタイムですか？',
    a: 'リアルタイムではありません。GitHub Actionsにより1日数回（平日7:00/9:00/12:00/15:30/23:30 UTC）自動更新されます。最新データの反映には最大数時間かかる場合があります。ページ右上の「最終更新」時刻を確認してください。',
  },
  {
    q: '注目Stocksピックアップはどのように選ばれていますか？',
    a: 'Performance Rate・Trading Volume・価格推移・Trade Valueを独自スコアで機械的に集計しています。Data is not real-timedata update timing, so、最新の市場状況と乖離する場合があります。投資判断の参考程度としてご利用ください。',
  },
  {
    q: 'Trade Valueの単位は何ですか？',
    a: '億・兆単位で表示しています（例：2.4兆 = 2.4兆円）。Trading Volumeは株数です。',
  },
  {
    q: 'Custom Themeはいくつまで作れますか？',
    a: '最大3テーマ、1テーマあたり最大10Stocksまで作成できます。Googleログインするとデバイス間でデータが同期されます。未ログイン時はブラウザのLocalStorageに保存されるため、ブラウザのデータを削除すると失われます。',
  },
  {
    q: 'テーマHeatmapのゾーン分けはどういう意味ですか？',
    a: '🔥注目ゾーン（右上）：Rising+Trading Volume急増=最強シグナル / ⚠️売り圧力（左上）：Falling+Trading Volume急増=強い売り / 📈静かなRising（右下）：Rising+Trading Volume少=じわりRising / ❄️静かなFalling（左下）：弱含みだが動意なし',
  },
  {
    q: 'Performance Rateはどのように計算していますか？',
    a: 'テーマのPerformance Rateはそのテーマに属する構成StocksのPerformance Rateの単純平均値です。個別Stocksは終値ベースで計算しています。',
  },
  {
    q: 'スマホで表が見づらいのですが？',
    a: 'Stocks表は横スクロール対応です。表を左右にスワイプしてください。PC版ではクリック&ドラッグでも横移動できます。スマホではグラフが自動的に縮小表示されます。',
  },
  {
    q: 'データソースはどこですか？',
    a: '現在はyfinance（Yahoo Finance非公式API）を利用しています。将来的には商用APIへの移行を予定しています。データの正確性については保証できません。',
  },
]

function Chevron({ open }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transition:'transform 0.2s', transform: open?'rotate(180deg)':'rotate(0deg)', flexShrink:0 }}>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function HowTo() {
  const [openQ, setOpenQ] = useState(null)
  const [openS, setOpenS] = useState(null)

  return (
    <div style={{ padding:'24px 28px 60px', maxWidth:'900px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'22px', fontWeight:700, color:'var(--text)', marginBottom:'6px' }}>📖 How to Use・Q&A</h1>
      <p style={{ fontSize:'13px', color:'var(--text3)', marginBottom:'28px' }}>
        StockWaveJPの各機能のHow to Useと、よくある質問をまとめています。
      </p>

      {/* 機能ガイド（アコーディオン形式） */}
      <h2 style={{ fontSize:'16px', fontWeight:700, color:'var(--text)', marginBottom:'14px', borderBottom:'1px solid var(--border)', paddingBottom:'6px' }}>
        🗺️ 機能ガイド
      </h2>
      <div style={{ display:'flex', flexDirection:'column', gap:'8px', marginBottom:'32px' }}>
        {SECTIONS.map((sec, si) => (
          <div key={si} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'8px', overflow:'hidden' }}>
            <button onClick={() => setOpenS(openS === si ? null : si)}
              style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
                gap:'12px', padding:'12px 16px', background:'transparent', border:'none',
                cursor:'pointer', textAlign:'left', fontFamily:'var(--font)', color:'var(--text)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                <span style={{ fontSize:'18px' }}>{sec.icon}</span>
                <div>
                  <div style={{ fontSize:'13px', fontWeight:700, color:'var(--text)' }}>{sec.title}</div>
                  <div style={{ fontSize:'11px', color:'var(--text3)', marginTop:'2px' }}>{sec.desc}</div>
                </div>
              </div>
              <Chevron open={openS === si} />
            </button>
            {openS === si && (
              <div style={{ padding:'0 16px 14px', borderTop:'1px solid var(--border)' }}>
                <ul style={{ margin:'10px 0 0', paddingLeft:'20px', display:'flex', flexDirection:'column', gap:'5px' }}>
                  {sec.items.map((item, ii) => (
                    <li key={ii} style={{ fontSize:'12px', color:'var(--text2)', lineHeight:1.7 }}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Q&A */}
      <h2 style={{ fontSize:'16px', fontWeight:700, color:'var(--text)', marginBottom:'14px', borderBottom:'1px solid var(--border)', paddingBottom:'6px' }}>
        ❓ よくある質問
      </h2>
      <div style={{ display:'flex', flexDirection:'column', gap:'8px', marginBottom:'32px' }}>
        {QA.map((qa, i) => (
          <div key={i} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'8px', overflow:'hidden' }}>
            <button onClick={() => setOpenQ(openQ === i ? null : i)}
              style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
                gap:'12px', padding:'12px 16px', background:'transparent', border:'none',
                cursor:'pointer', textAlign:'left', fontFamily:'var(--font)', color:'var(--text)' }}>
              <span style={{ fontSize:'13px', fontWeight:600 }}>Q. {qa.q}</span>
              <Chevron open={openQ === i} />
            </button>
            {openQ === i && (
              <div style={{ padding:'0 16px 14px', fontSize:'12px', color:'var(--text2)', lineHeight:1.8,
                borderTop:'1px solid var(--border)' }}>
                <div style={{ paddingTop:'10px' }}>A. {qa.a}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div style={{ padding:'14px 18px', background:'rgba(255,193,7,0.05)',
        border:'1px solid rgba(255,193,7,0.2)', borderRadius:'8px', fontSize:'12px', color:'var(--text3)', lineHeight:1.8 }}>
        ⚠️ <strong style={{ color:'var(--text2)' }}>Disclaimer：</strong>
        this Siteに掲載されている情報は参考目的のみであり、特定のStocksの売買を推奨するものではありません。
        投資の最終判断はご自身の責任でお願いします。データの正確性・最新性について保証するものではありません。
      </div>
    </div>
  )
}
