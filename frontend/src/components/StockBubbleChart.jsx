import { useState } from 'react'

// Stock name translation (ticker-based, 400 stocks)
const TICKER_TO_EN_B = {'1379':'ホクト','1407':'ウエストHD','1414':'ショーボンドHD','1605':'INPEX','1662':'石油資源開発','166A':'アクセルスペースHD','1720':'東急建設','1801':'Taisei','1802':'Obayashi','1803':'Shimizu','1808':'長谷工コーポレーション','1812':'Kajima','1815':'鉄建建設','1820':'西松建設','1860':'戸田建設','1861':'熊谷組','186A':'Astroscale','1878':'大東建託','1893':'五洋建設','1911':'住友林業','1925':'Daiwa House','1928':'Sekisui House','2124':'ジェイエイシーリクルートメント','2146':'UTグループ','2181':'パーソルHD','2206':'Ezaki Glico','2212':'山崎製パン','2269':'Meiji HD','2270':'Megmilk Snow Brand','2282':'NH Foods','2326':'デジタルアーツ','2331':'綜合警備保障（ALSOK）','2393':'日本ケアサプライ','2413':'エムスリー','2432':'DeNA','2492':'インフォマート','2502':'Asahi Group HD','2503':'Kirin HD','2587':'サントリー食品','2593':'Ito En','2602':'日清オイリオグループ','2664':'カワチ薬品','2674':'ハードオフコーポレーション','2678':'アスクル','2681':'ゲオHD','2780':'コメ兵HD','278A':'テラドローン','2796':'ファルマライズHD','2802':'Ajinomoto','2810':'ハウス食品','2811':'Kagome','285A':'キオクシアHD','2871':'ニチレイ','2897':'Nissin Food HD','3003':'ヒューリック','3088':'Matsukiyo Kokkomin HD','3092':'ZOZO','3093':'トレジャー・ファクトリー','3099':'三越伊勢丹HD','3110':'日東紡績','3132':'Macnica Holdings','3148':'クリエイトSDホールディングス','3231':'野村不動産HD','3283':'日本プロロジスリート投資法人','3289':'東急不動産HD','3349':'コスモス薬品','3382':'Seven & i','3391':'Tsuruha HD','3402':'Toray','3407':'Asahi Kasei','3436':'SUMCO','3494':'ウルトラファブリクス','3549':'クスリのアオキHD','3626':'TIS','3632':'グリー','3635':'コーエーテクモ','3659':'ネクソン','3662':'エイチーム','3692':'FFRIセキュリティ','3765':'Gungho','3769':'GMO PG','3774':'インターネットイニシアティブ','3778':'さくらインターネット','3807':'フィスコ','3861':'王子HD','3880':'大王製紙','3923':'ラクス','3932':'アカツキ','3984':'ユーザーローカル','3993':'PKSHA Technology','3994':'Money Forward','4004':'レゾナック','4005':'住友化学','4023':'クレハ','4028':'石原産業','4042':'東ソー','4047':'関東電化工業','4053':'freee','4063':'Shin-Etsu Chem','4088':'エア・ウォーター','4091':'大陽日酸','4109':'ステラケミファ','4118':'カネカ','4165':'プレイド','4186':'東京応化工業','4187':'大阪有機化学工業','4188':'三菱ケミカルグループ','4202':'ダイセル','4204':'積水化学工業','4205':'日本ゼオン','4208':'宇部興産','4259':'エクサウィザーズ','4307':'野村総合研究所','4385':'Mercari','4417':'グローバルセキュリティエキスパート','4443':'Sansan','4448':'Chatwork','4452':'花王','4477':'BASE','4480':'メドレー','4483':'JMDC','4488':'AI inside','4493':'サイバーセキュリティクラウド','4502':'武田薬品','4503':'Astellas','4507':'Shionogi','4516':'日本新薬','4519':'Chugai','4523':'Eisai','4528':'小野薬品','4530':'Hisamitsu Pharma','4534':'Mochida Pharma','4536':'Santen Pharma','4540':'ツムラ','4543':'Terumo','4565':'そーせいグループ','4568':'Daiichi Sankyo','4571':'ナノキャリア','4578':'大塚HD','4587':'ペプチドリーム','4612':'日本ペイントHD','4613':'関西ペイント','4616':'神東塗料','4617':'中国塗料','4619':'日本特殊塗料','4631':'DIC','4634':'東洋インキSCHD','4661':'オリエンタルランド','4667':'アイサンテクノロジー','4681':'リゾートトラスト','4684':'オービック','4689':'LINE（LINEヤフー）','4704':'トレンドマイクロ','4751':'サイバーエージェント','4755':'楽天グループ','4819':'デジタルガレージ','4848':'フルキャストHD','4849':'エン・ジャパン','4884':'クリングルファーマ','4901':'Fujifilm HD','4996':'クミアイ化学工業','4997':'日本農薬','5019':'Idemitsu','5020':'ENEOS HD','5021':'コスモエネルギーHD','5076':'テス・エンジニアリング','5201':'AGC','5202':'日本板硝子','5214':'日本電気硝子','5232':'住友大阪セメント','5233':'太平洋セメント','5269':'日本コンクリート工業','5332':'TOTO','5384':'フジミインコーポレーテッド','5393':'ニチアス','5401':'Nippon Steel','5406':'神戸製鋼所','5411':'JFE Holdings','5423':'東京製鐵','5444':'大和工業','5480':'日本冶金工業','5703':'日本軽金属HD','5706':'三井金属','5713':'Sumitomo Metal Mining','5714':'DOWA HD','5726':'大阪チタニウムテクノロジーズ','5727':'東邦チタニウム','5741':'UACJ','5801':'Furukawa Electric','5802':'Sumitomo Electric','5803':'フジクラ','5938':'LIXIL','6016':'ジャパンエンジンコーポレーション','6098':'リクルートHD','6135':'牧野フライス製作所','6141':'DMG森精機','6146':'Disco','6197':'ソラスト','6201':'Toyota Industries','6203':'豊和工業','6232':'ACSL','6257':'栗田工業','6268':'ナブテスコ','6273':'SMC','6301':'Komatsu','6302':'Sumitomo Heavy','6310':'井関農機','6326':'クボタ','6332':'月島ホールディングス','6361':'荏原製作所','6367':'ダイキン工業','6460':'セガサミー','6473':'ジェイテクト','6474':'不二越','6481':'THK','6501':'Hitachi','6503':'Mitsubishi Elec','6504':'富士電機','6506':'Yaskawa','6526':'Socionext','6547':'PHCホールディングス','6590':'芝浦メカトロニクス','6622':'ダイヘン','6627':'テラプローブ','6645':'Omron','6656':'エスペック','6666':'リバーエレテック','6674':'GSユアサ','6701':'NEC','6702':'Fujitsu','6707':'サンケン電気','6723':'Renesas','6752':'パナソニック','6753':'シャープ','6758':'Sony Group','6762':'TDK','6770':'Alps Alpine','6810':'マクセル','6844':'新電元工業','6857':'Advantest','6861':'Keyence','6866':'ヒオキ電機','6869':'シスメックス','6871':'マイクロニクス','6890':'フェローテック','6902':'Denso','6920':'Lasertec','6941':'山一電機','6951':'日本電子','6952':'カシオ計算機','6954':'Fanuc','6963':'Rohm','6965':'浜松ホトニクス','6971':'Kyocera','6981':'Murata Mfg','6988':'日東電工','6996':'ニチコン','7003':'Mitsui E&S','7004':'日立造船','7011':'Mitsubishi Heavy','7012':'Kawasaki HI','7013':'IHI','7014':'名村造船所','7022':'サノヤスHD','7030':'新来島どっく','7181':'Japan Post Insurance','7182':'ゆうちょ銀行','7186':'コンコルディアFG','7201':'Nissan','7203':'Toyota Motor','7211':'三菱自動車','7259':'Aisin','7261':'Mazda Motor','7267':'本田技研工業','7270':'Subaru Corp','7272':'Yamaha Motor','7383':'ネットプロテクションHD','7459':'Medipal HD','7532':'ドン・キホーテ（PPIH）','7649':'スギHD','7701':'島津製作所','7729':'東京精密','7731':'Nikon','7733':'オリンパス','7735':'SCREEN HD','7739':'キヤノン電子','7746':'岡本硝子','7751':'Canon','7762':'シチズン時計','7832':'バンダイナムコ','7833':'GMOフィナンシャルHD','7974':'Nintendo','8001':'Itochu','8002':'Marubeni','8031':'Mitsui & Co','8035':'Tokyo Electron','8050':'セイコーグループ','8053':'Sumitomo Corp','8056':'BIPROGY','8058':'Mitsubishi Corp','8086':'ニプロ','8088':'岩谷産業','8233':'高島屋','8267':'イオン（イオン銀行）','8304':'あおぞら銀行','8306':'三菱UFJ','8308':'りそな','8309':'三井住友トラストHD','8316':'三井住友','8331':'Chiba Bank','8336':'武蔵野銀行','8341':'Shichijushichi Bank','8346':'東邦銀行','8354':'ふくおかFG','8359':'八十二銀行','8366':'滋賀銀行','8377':'北陸銀行','8387':'四国銀行','8410':'セブン銀行','8411':'みずほ','8418':'山口FG','8473':'SBI HD','8515':'アイフル','8522':'名古屋銀行','8524':'Hokuyoh Bank','8591':'オリックス','8601':'Daiwa Securities','8604':'野村HD','8628':'松井証券','8630':'SOMPO HD','8698':'マネックスグループ','8725':'MS&AD','8750':'第一生命','8766':'Tokio Marine','8795':'T&Dホールディングス','8801':'Mitsui Fudosan','8802':'Mitsubishi Estate','8803':'平和不動産','8804':'東京建物','8830':'住友不動産','8848':'レオパレス21','9001':'Tobu Railway','9005':'Tokyu Corp','9020':'JR East','9024':'Seibu HD','9041':'Kintetsu Group','9042':'阪急阪神HD','9045':'Keihan HD','9064':'ヤマトHD','9067':'Suzuken','9069':'センコーグループHD','9101':'Nippon Yusen','9104':'Mitsui OSK','9107':'K Line','9119':'飯野海運','9143':'SG Holdings','9147':'NIPPON EXPRESSホールディングス','9171':'栗林商船','9201':'JAL','9202':'ANA HD','9233':'朝日航洋','9278':'ブックオフグループHD','9308':'乾汽船','9412':'スカパーJSATHD','9424':'日本通信','9432':'NTT','9433':'KDDI','9434':'SoftBank','9449':'GMOインターネット','9470':'学研HD','9474':'ゼンリン','9501':'TEPCO','9502':'Chubu Electric','9503':'Kansai Electric','9504':'中国電力','9505':'北陸電力','9506':'東北電力','9507':'四国電力','9508':'九州電力','9509':'北海道電力','9511':'沖縄電力','9513':'Jパワー','9517':'エネコーポレーション','9519':'レノバ','9531':'Tokyo Gas','9532':'Osaka Gas','9551':'メタウォーター','9603':'エイチ・アイ・エス','9627':'アインホールディングス','9684':'スクウェア・エニックス','9686':'東洋テック','9697':'カプコン','9708':'帝国ホテル','9722':'藤田観光','9735':'セコム','9766':'コナミ','9843':'Nitori HD','9983':'Fast Retailing','9984':'SoftBank Group','9989':'Sundrug'}
const getBubbleName = (name, ticker) => {
  if (!ticker) return name || ''
  const code = String(ticker).replace('.T', '')
  return TICKER_TO_EN_B[code] || name || code
}

function StockBubbleChart({ stocks, themeName, onNavigate }) {
  const [hovered, setHovered] = useState(null)

  const filtered = (stocks || []).filter(s =>
    s.pct != null && !isNaN(s.pct)
  )
  if (filtered.length === 0) return (
    <div style={{ textAlign:'center', padding:'30px', color:'var(--text3)', fontSize:'13px' }}>
      Loading...
    </div>
  )

  const W = 760, H = 360
  const PL = 56, PR = 20, PT = 36, PB = 44
  const GW = W - PL - PR, GH = H - PT - PB

  const pcts    = filtered.map(d => d.pct)
  const volChgs = filtered.map(d => typeof d.volume_chg === 'number' ? d.volume_chg : 0)
  const tvs     = filtered.map(d => d.trade_value ?? 0)

  const hasVol = volChgs.some(v => v !== 0)
  const yVals  = hasVol ? volChgs : filtered.map(d => d.pct * 0.5)
  const yLabel = hasVol ? 'Volume急増率 (%)' : 'Price Change %の0.5倍（Volumeデータ準備中）'

  const rawXMin = Math.min(...pcts), rawXMax = Math.max(...pcts)
  const rawYMin = Math.min(...yVals), rawYMax = Math.max(...yVals)
  const xMargin = Math.max((rawXMax - rawXMin) * 0.15, 1.5)
  const yMargin = Math.max((rawYMax - rawYMin) * 0.15, 2)
  const xMin = rawXMin - xMargin, xMax = rawXMax + xMargin
  const yMin = rawYMin - yMargin, yMax = rawYMax + yMargin
  const xRange = (xMax - xMin) || 1, yRange = (yMax - yMin) || 1
  const tvMax = Math.max(...tvs.filter(v => v > 0), 1)

  const xS = v => PL + ((v - xMin) / xRange) * GW
  const yS = v => PT + GH - ((v - yMin) / yRange) * GH
  const rS = tv => tv > 0 ? 6 + (tv / tvMax) * 22 : 6

  const bColor = pct => {
    if (pct >= 8)   return '#ff2244'
    if (pct >= 4)   return '#ff5370'
    if (pct >= 1.5) return '#ff8c42'
    if (pct >= 0)   return '#e8a040'
    if (pct >= -1.5)return '#3db88a'
    if (pct >= -4)  return '#00c48c'
    return '#009966'
  }

  const x0 = xS(0), y0 = yS(0)
  const fmtL = tv => {
    if (!tv) return '-'
    if (tv >= 1e8) return (tv/1e8).toFixed(0) + '億'
    if (tv >= 1e4) return (tv/1e4).toFixed(0) + '万'
    return tv.toLocaleString()
  }

  // X軸目盛り
  const xTicks = []
  const xStep = Math.ceil((xMax - xMin) / 6) || 1
  for (let v = Math.ceil(xMin); v <= xMax; v += xStep) xTicks.push(v)
  const yTicks = []
  const yStep = Math.ceil((yMax - yMin) / 5) || 1
  for (let v = Math.ceil(yMin / yStep) * yStep; v <= yMax; v += yStep) yTicks.push(v)

  return (
    <div>
      <div style={{ fontSize:'10px', color:'var(--text3)', marginBottom:'6px' }}>
        X軸=Price Change %　Y軸={yLabel}　円サイズ=Trading Value　バブルをクリックで銘柄確認
      </div>
      <div style={{ width:'100%', overflowX:'auto', WebkitOverflowScrolling:'touch' }}>
        <svg viewBox={`0 0 ${W} ${H}`}
          style={{ width:'100%', minWidth:'360px', display:'block',
            background:'var(--bg2)', borderRadius:'10px', border:'1px solid var(--border)' }}
          onMouseLeave={() => setHovered(null)}
        >
          {/* ゾーン背景 */}
          <rect x={x0} y={PT} width={PL+GW-x0} height={y0-PT} fill="rgba(255,83,112,0.06)" />
          <rect x={PL} y={PT} width={x0-PL} height={y0-PT} fill="rgba(0,196,140,0.05)" />
          <rect x={x0} y={y0} width={PL+GW-x0} height={PT+GH-y0} fill="rgba(255,140,66,0.15)" />
          <rect x={PL} y={y0} width={x0-PL} height={PT+GH-y0} fill="rgba(74,158,255,0.03)" />

          {/* グリッド */}
          {xTicks.map(v => (
            <line key={v} x1={xS(v)} y1={PT} x2={xS(v)} y2={PT+GH}
              stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" strokeDasharray="3,4" />
          ))}
          {yTicks.map(v => (
            <line key={v} x1={PL} y1={yS(v)} x2={PL+GW} y2={yS(v)}
              stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" strokeDasharray="3,4" />
          ))}

          {/* ゼロライン */}
          <line x1={x0} y1={PT} x2={x0} y2={PT+GH}
            stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" strokeDasharray="5,3" />
          <line x1={PL} y1={y0} x2={PL+GW} y2={y0}
            stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" strokeDasharray="5,3" />

          {/* ゾーンラベル */}
          <text x={x0+6} y={PT+14} fontSize="9" fill="rgba(255,83,112,0.8)" fontWeight="700">🔥 注目</text>
          <text x={PL+4} y={PT+14} fontSize="9" fill="rgba(0,196,140,0.7)" fontWeight="700">⚠️ 売り</text>
          <text x={x0+6} y={PT+GH-6} fontSize="9" fill="rgba(255,140,66,0.6)" fontWeight="700">📈 上昇</text>
          <text x={PL+4} y={PT+GH-6} fontSize="9" fill="rgba(74,158,255,0.6)" fontWeight="700">❄️ 下落</text>

          {/* バブル（ホバー以外） */}
          {filtered.filter(s => s.ticker !== hovered?.ticker).map(s => {
            const cx = xS(s.pct)
            const cy = yS(hasVol ? (s.volume_chg ?? 0) : s.pct * 0.5)
            const r  = rS(s.trade_value)
            const col = bColor(s.pct)
            return (
              <g key={s.ticker} style={{ cursor:'pointer' }}
                onMouseEnter={() => setHovered(s)}>
                <circle cx={cx} cy={cy} r={r}
                  fill={col} fillOpacity="0.75" stroke={col} strokeWidth="1" />
                {r >= 14 && (
                  <text x={cx} y={cy+3} textAnchor="middle"
                    fontSize={Math.min(9, r*0.55)} fill="white" fontWeight="600"
                    style={{ pointerEvents:'none' }}>
                    {getBubbleName(s.name, s.ticker).slice(0,6)}
                  </text>
                )}
              </g>
            )
          })}

          {/* ホバー中のバブル（最前面） */}
          {hovered && (() => {
            const s = hovered
            const cx = xS(s.pct)
            const cy = yS(hasVol ? (s.volume_chg ?? 0) : s.pct * 0.5)
            const r  = rS(s.trade_value)
            const col = bColor(s.pct)
            const tx = Math.min(cx, W - 155)
            const ty = Math.max(PT + 4, cy - r - 68)
            return (
              <g key="hov" style={{ cursor:'pointer' }} onMouseEnter={() => setHovered(s)}>
                <circle cx={cx} cy={cy} r={r+3} fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.8" />
                <circle cx={cx} cy={cy} r={r} fill={col} fillOpacity="0.9" stroke={col} strokeWidth="1.5" />
                <text x={cx} y={cy+4} textAnchor="middle" fontSize="9" fill="white" fontWeight="700"
                  style={{ pointerEvents:'none' }}>
                  {getBubbleName(s.name, s.ticker).slice(0,8)}
                </text>
                <g style={{ pointerEvents:'none' }}>
                  <rect x={tx} y={ty} width="185" height="82"
                    rx="8" fill="#1a1f2e" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
                  <text x={tx+10} y={ty+18} fontSize="12" fill="#e8f0ff" fontWeight="700">
                    {getBubbleName(s.name, s.ticker).slice(0,16)}
                  </text>
                  <text x={tx+10} y={ty+36} fontSize="12" fill={col}>
                    {'Price Change %: ' + (s.pct >= 0 ? '+' : '') + (s.pct?.toFixed(2) ?? '-') + '%'}
                  </text>
                  {hasVol && (
                    <text x={tx+10} y={ty+53} fontSize="12" fill={(s.volume_chg??0)>=0?'#ff8c42':'#4a9eff'}>
                      {'Volume: ' + ((s.volume_chg??0)>=0?'+':'') + (s.volume_chg?.toFixed(1)??'-') + '%'}
                    </text>
                  )}
                  <text x={tx+10} y={ty+70} fontSize="12" fill="#8b949e">
                    {'Trading Value: ' + fmtL(s.trade_value)}
                  </text>
                </g>
              </g>
            )
          })()}

          {/* X軸ラベル */}
          {xTicks.map(v => (
            <text key={v} x={xS(v)} y={PT+GH+16} textAnchor="middle"
              fontSize="9" fill="rgba(255,255,255,0.4)">
              {v >= 0 ? '+' : ''}{v}%
            </text>
          ))}
          <text x={PL + GW/2} y={H-4} textAnchor="middle"
            fontSize="10" fill="rgba(255,255,255,0.35)">← 下落　　Price Change %　　上昇 →</text>

          {/* Y軸ラベル */}
          {yTicks.map(v => (
            <text key={v} x={PL-5} y={yS(v)+3} textAnchor="end"
              fontSize="9" fill="rgba(255,255,255,0.4)">
              {v >= 0 ? '+' : ''}{v}%
            </text>
          ))}
          <text x={14} y={PT + GH/2} textAnchor="middle"
            fontSize="9" fill="rgba(255,255,255,0.35)"
            transform={`rotate(-90, 14, ${PT + GH/2})`}>
            {hasVol ? 'Vol. Change Rate' : ''}
          </text>
        </svg>
      </div>
    </div>
  )
}

export default StockBubbleChart
