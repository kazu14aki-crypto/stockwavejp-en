import { useState } from 'react'

export default function TermsOfService() {
  return (
    <div style={{ padding:'24px 32px 60px', maxWidth:'860px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'22px', fontWeight:700, color:'var(--text)',
        marginBottom:'6px', letterSpacing:'-0.02em' }}>Terms of Service</h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'32px' }}>
        Established: April 1, 2026　Last Revised: April 29, 2026
      </p>

      <Section title="第1条（本規約の適用）">
        <p>本Terms of Service（以下「本規約」）は、StockWaveJP（以下「the Site」）が提供するすべてのサービス（以下「本サービス」）の利用条件を定めるものです。Usersの皆様（以下「Users」）には、本規約に同意いただいた上で本サービスをご利用いただきます。the Siteにアクセスした時点で、本規約に同意したものとみなします。</p>
      </Section>

      <Section title="第2条（サービスの内容）">
        <p>the Siteは、日本株式市場におけるテーマ別騰落率・出来高・売買代金・モメンタム等の統計データ、およびテーマ株投資に関するコラム・解説記事を提供する情報サービスです。</p>
        <p style={{marginTop:'8px'}}>本サービスが提供する情報は以下を含みます。</p>
        <ul style={{paddingLeft:'20px',marginTop:'6px'}}>
          <li>テーマ別株価騰落率・出来高・売買代金の集計データ</li>
          <li>テーマ別騰落モメンタム分析</li>
          <li>市場ヒートマップおよびマクロ指標</li>
          <li>テーマ株投資に関するコラム・解説記事・用語解説</li>
          <li>カスタムテーマ作成機能（Users登録者向け）</li>
        </ul>
      </Section>

      <Section title="第3条（投資助言の禁止および免責）">
        <p>the Siteが提供するすべての情報は、<strong style={{color:'var(--red)'}}>投資に関する意思決定の参考情報として提供するものであり、特定の銘柄・投資商品・取引手法を推奨・勧誘するものではありません。</strong></p>
        <p style={{marginTop:'8px'}}>the Siteは金融商品取引法に基づく投資助言業者ではなく、いかなる投資助言も行いません。投資に関する最終的な判断はUsers自身の責任において行ってください。</p>
        <p style={{marginTop:'8px'}}>the Siteの情報を参考にした投資行動によって生じた損害（逸失利益・機会損失を含む）について、the Site運営者は一切の責任を負いません。</p>
      </Section>

      <Section title="第4条（情報の正確性・完全性・最新性）">
        <p>the Siteが提供するデータは、external data provider (Infoway)から自動取得した情報に基づきます。the Siteは情報の正確性・完全性・最新性について最善を尽くしますが、以下の事由により誤り・遅延・欠損が生じる場合があります。</p>
        <ul style={{paddingLeft:'20px',marginTop:'6px'}}>
          <li>データプロバイダー側の障害・仕様変更・配信遅延</li>
          <li>システムメンテナンスまたは障害</li>
          <li>ネットワーク障害その他の技術的要因</li>
          <li>市場の急激な変動に伴うデータ更新の遅延</li>
        </ul>
        <p style={{marginTop:'8px'}}>これらによって生じた損害について、the Site運営者は責任を負いません。重要な投資判断を行う際は、必ず公式の市場データおよび各証券会社の情報をご確認ください。</p>
      </Section>

      <Section title="第5条（禁止事項）">
        <p>Usersは本サービスの利用にあたり、以下の行為を行ってはなりません。</p>
        <ul style={{paddingLeft:'20px',marginTop:'6px'}}>
          <li>the Siteのコンテンツ（テキスト・データ・画像・ソースコード等）を無断で複製・転載・改変・販売・二次利用する行為</li>
          <li>the Siteへの過度なアクセス（クローリング・スクレイピングを含む）によりサーバーに負荷をかける行為</li>
          <li>the Siteを装った偽サイトの作成やフィッシング行為</li>
          <li>本サービスを利用した投資詐欺・不正勧誘その他の違法行為</li>
          <li>他のUsersまたは第三者の権利・利益を侵害する行為</li>
          <li>the Siteの運営を妨害する行為</li>
          <li>その他、the Site運営者が不適切と判断する行為</li>
        </ul>
      </Section>

      <Section title="第6条（知的財産権）">
        <p>the Siteに掲載されているコラム・解説記事・テキスト・デザイン・ロゴ・ソースコードその他のコンテンツに関する知的財産権は、the Site運営者または正当な権利者に帰属します。</p>
        <p style={{marginTop:'8px'}}>Usersは、個人的な参照・学習目的に限り本サービスのコンテンツを閲覧することができます。それ以外の目的での複製・転用・商業利用は、書面による事前の許可がない限り禁止します。</p>
        <p style={{marginTop:'8px'}}>the Siteが表示する株価・企業名・証券コードは、各証券取引所および企業の商標・情報であり、the Siteはこれらの権利を主張するものではありません。</p>
      </Section>

      <Section title="第7条（リンクおよび外部サービス）">
        <p>the Siteは第三者のウェブサイトへのリンクを含む場合があります。リンク先のサービス・コンテンツ・プライバシーポリシーについてはthe Siteは責任を負いません。リンク先のサービスを利用する際は、各サービスのTerms of Serviceをご確認ください。</p>
        <p style={{marginTop:'8px'}}>the Siteへのリンクは、非商業目的かつthe Siteの内容・品質を正確に伝える場合に限り原則として自由です。ただし、フレーム内への組み込み・誤解を招く形でのリンクは禁止します。</p>
      </Section>

      <Section title="第8条（広告について）">
        <p>the SiteはGoogle AdSense等の広告配信サービスを利用する場合があります。広告配信に際し、Usersの興味に合わせた広告を表示するためにCookieが使用されることがあります。Cookieの使用を望まない場合は、ブラウザの設定から無効にすることができます。</p>
        <p style={{marginTop:'8px'}}>広告主の商品・サービスに関するお問い合わせは、各広告主に直接お願いします。the Siteは広告主の行為について責任を負いません。</p>
      </Section>

      <Section title="第9条（個人情報の取り扱い）">
        <p>the Siteにおける個人情報の取り扱いは、別途定める「プライバシーポリシー」に従います。Usersは本サービスを利用することにより、プライバシーポリシーに同意したものとみなします。</p>
      </Section>

      <Section title="第10条（Users登録・アカウント）">
        <p>一部のサービス（カスタムテーマ機能等）はUsers登録が必要です。Usersは以下の事項を遵守してください。</p>
        <ul style={{paddingLeft:'20px',marginTop:'6px'}}>
          <li>正確な情報を登録すること</li>
          <li>アカウントのパスワードを厳重に管理し、第三者に提供しないこと</li>
          <li>アカウントが不正利用された場合、速やかにthe Siteに連絡すること</li>
        </ul>
        <p style={{marginTop:'8px'}}>アカウントの管理不備により生じた損害について、the Site運営者は責任を負いません。</p>
      </Section>

      <Section title="第11条（サービスの変更・中断・終了）">
        <p>the Site運営者は、以下の場合においてUsersへの事前通知なくサービスの全部または一部を変更・中断・終了することができます。</p>
        <ul style={{paddingLeft:'20px',marginTop:'6px'}}>
          <li>システムメンテナンス・障害対応</li>
          <li>外部データソースの仕様変更または提供停止</li>
          <li>運営上の都合</li>
          <li>天災・感染症拡大その他の不可抗力</li>
        </ul>
        <p style={{marginTop:'8px'}}>サービスの変更・中断・終了によってUsersに生じた損害について、the Site運営者は責任を負いません。</p>
      </Section>

      <Section title="第12条（準拠法・管轄裁判所）">
        <p>本規約の解釈および適用は日本法に準拠します。本サービスに関して紛争が生じた場合は、the Site運営者の所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。</p>
      </Section>

      <Section title="第13条（規約の変更）">
        <p>the Site運営者は、必要に応じて本規約を変更することができます。変更後の規約はthe Siteに掲載した時点から効力を生じます。重要な変更を行う場合は、the Site上にてお知らせします。変更後も本サービスを継続利用した場合、変更後の規約に同意したものとみなします。</p>
      </Section>

      <Section title="お問い合わせ">
        <p>本規約に関するお問い合わせは、サイト内のお問い合わせフォームよりご連絡ください。</p>
      </Section>

      <div style={{ marginTop:'40px', padding:'16px', background:'var(--bg2)',
        border:'1px solid var(--border)', borderRadius:'8px',
        fontSize:'12px', color:'var(--text3)' }}>
        <strong style={{color:'var(--text2)'}}>StockWaveJP 運営事務局</strong><br/>
        URL: stockwavejp.com<br/>
        お問い合わせ: サイト内お問い合わせフォームをご利用ください
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom:'28px' }}>
      <h2 style={{ fontSize:'14px', fontWeight:700, color:'var(--accent)',
        marginBottom:'10px', paddingBottom:'6px',
        borderBottom:'1px solid var(--border)' }}>
        {title}
      </h2>
      <div style={{ fontSize:'13px', color:'var(--text2)', lineHeight:'1.9' }}>
        {children}
      </div>
    </div>
  )
}
