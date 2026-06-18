import React, { useState, useEffect, useRef } from 'react'
import AddToThemeModal from '../AddToThemeModal'
import StockBubbleChart from '../StockBubbleChart'
import { useSegmentDetail, useMarketRankList } from '../../hooks/useMarketData'

const SEG_NAME_EN = {
  '時価総額上位50':'Top 50 by Mkt Cap','上位51-100位':'Rank 51-100','上位101-150位':'Rank 101-150',
  '国内主要株（上位50）':'Major (Top 50)','国内主要株（51-100）':'Major (51-100)','国内主要株（101-150）':'Major (101-150)',
  'プライム市場':'Prime Market','プライム市場（大型株）':'Prime (Large)',
  'プライム市場（中型株）':'Prime (Mid)','プライム市場（小型株）':'Prime (Small)',
  'スタンダード市場':'Standard Market','グロース市場':'Growth Market',
  'プライム':'Prime','スタンダード':'Standard','グロース':'Growth',
  '大型株':'Large Cap','中型株':'Mid Cap','小型株':'Small Cap',
  '電機・精密':'Electronics','情報通信':'Info & Telecom','輸送用機器':'Transport Equip',
  '機械':'Machinery','医薬品':'Pharma','化学':'Chemicals','素材':'Materials','鉄鋼':'Steel',
  '食品':'Food','小売':'Retail','建設':'Construction','不動産':'Real Estate','金融':'Finance',
  '保険':'Insurance','銀行':'Banking','証券':'Securities','エネルギー':'Energy','サービス':'Services',
  '運輸':'Transportation','通信':'Telecom','技術':'Technology','消費':'Consumer',
  'ディフェンシブ':'Defensive','景気敏感':'Cyclical','国内主要株':'Major Stocks','国内全般':'Domestic All',
  '資本財・その他':'Capital Goods & Other',
  '運輸・公共':'Transport & Utilities',
  '素材・化学':'Materials & Chemicals',
  '金融・不動産':'Finance & Real Estate',
  '情報・通信':'Info & Communication',
  '消費財・サービス':'Consumer & Services',
  '電気機器':'Electrical Equipment',
  '精密機器':'Precision Instruments',
  'その他製品':'Other Products',
  'サービス業':'Services',
  '水産・農林業':'Fishery & Forestry',
  '鉱業':'Mining',
  '繊維製品':'Textiles',
  'パルプ・紙':'Pulp & Paper',
  'ゴム製品':'Rubber Products',
  'ガラス・土石製品':'Glass & Ceramics',
  '非鉄金属':'Non-ferrous Metals',
  '金属製品':'Metal Products',
  '電気・ガス業':'Electric & Gas Utilities',
  '倉庫・運輸関連業':'Warehouse & Transport',
  '卸売業':'Wholesale Trade',
  'その他金融業':'Other Finance',
  '石油・石炭製品':'Oil & Coal Products',
  '空運業':'Air Transport',
  '海運業':'Marine Transport',
  '陸運業':'Land Transport',
  '情報・通信業':'Info & Communication',
  '証券・商品先物取引業':'Securities & Commodities',
  '銀行業':'Banking Industry',
  '保険業':'Insurance Industry',
  '不動産業':'Real Estate Industry',
  '建設業':'Construction Industry',
  '食料品':'Foods',
  '小売業':'Retail Industry',
}
const strans = (name) => SEG_NAME_EN[name] || name
const GROUP_LABEL = {
  '国内主要株':'Major Stocks','国内全般':'Domestic All',
  '市場区分':'Market Segment','ETF':'ETF','ADR':'Japan ADR (US-Listed)',
}
const gl = (key) => GROUP_LABEL[key] || key
const TICKER_TO_EN = {'1379':'Hokuto Corp','1407':'West Holdings','1414':'Shobond Holdings','1605':'INPEX Corp','1662':'Japan Petroleum Exploration','166A':'Axelspace Holdings','1720':'Tokyu Construction','1801':'Taisei Corp','1802':'Obayashi Corp','1803':'Shimizu Corp','1808':'Haseko Corp','1812':'Kajima Corp','1815':'Tekken Corp','1820':'Nishimatsu Construction','1860':'Toda Corp','1861':'Kumagai Gumi','186A':'Astroscale','1878':'Daito Trust Construction','1893':'Goyo Construction','1911':'Sumitomo Forestry','1925':'Daiwa House Industry','1928':'Sekisui House','2124':'JAC Recruitment','2146':'UT Group','2181':'Persol Holdings','2206':'Ezaki Glico','2212':'Yamazaki Baking','2269':'Meiji HD','2270':'Megmilk Snow Brand','2282':'NH Foods','2326':'Digital Arts','2331':'ALSOK (Sohgo Security)','2393':'Nihon Care Supply','2413':'M3 Inc','2432':'DeNA Co','2492':'Infomart Corp','2502':'Asahi Group HD','2503':'Kirin HD','2587':'Suntory BF','2593':'Ito En','2602':'Nisshin OilliO Group','2664':'Kawachi Pharmacy','2674':'Hard Off Corp','2678':'Askul Corp','2681':'Geo Holdings','2780':'Komehyo Holdings','278A':'Terra Drone','2796':'Pharmarise Holdings','2802':'Ajinomoto Co','2810':'House Foods Group','2811':'Kagome','285A':'Kioxia Holdings','2871':'Nichirei Corp','2897':'Nissin Foods Holdings','3003':'Hulic Co','3088':'Matsumoto Kiyoshi Holdings','3092':'ZOZO Inc','3093':'Treasure Factory','3099':'Isetan Mitsukoshi','3110':'Nitto Boseki','3132':'Macnica Holdings','3148':'Create SD Holdings','3231':'Nomura Real Estate Holdings','3283':'Nippon Prologis REIT','3289':'Tokyu Fudosan Holdings','3349':'COSMOS Pharmaceutical','3382':'Seven & i Holdings','3391':'Tsuruha Holdings','3402':'Toray Industries','3407':'Asahi Kasei','3436':'SUMCO Corp','3494':'Ultrafabrics Holdings','3549':'Kusuri no Aoki Holdings','3626':'TIS Inc','3632':'Gree Inc','3635':'Cygames (via DeNA)','3659':'Nexon Co','3662':'A-Team Inc','3692':'FFRI Security','3765':'Gungho','3769':'GMO Payment Gateway','3774':'Internet Initiative Japan','3778':'Sakura Internet','3807':'Fisco Ltd','3861':'Oji Holdings','3880':'Daio Paper Corp','3923':'Rakus Co','3932':'Akatsuki Inc','3984':'User Local Inc','3993':'PKSHA Technology','3994':'Money Forward','4004':'Showa Denko (Resonac)','4005':'Sumitomo Chemical','4023':'Kureha Corp','4028':'Ishihara Sangyo','4042':'Tosoh Corp','4047':'Kanto Denka Kogyo','4053':'freee','4063':'Shin-Etsu Chemical','4088':'Air Water','4091':'Nippon Sanso Holdings','4109':'Stella Chemifa','4118':'Kaneka Corp','4165':'Plaid Inc','4186':'Tokyo Ohka Kogyo','4187':'Osaka Organic Chemical','4188':'Mitsubishi Chemical Group','4202':'Daicel Corp','4204':'Sekisui Chemical','4205':'Zeon Corp','4208':'UBE Corp','4259':'ExaWizards Inc','4307':'Nomura Research Institute','4385':'Mercari Inc','4417':'Global Security Expert','4443':'Sansan','4448':'Chatwork','4452':'Kao Corp','4477':'BASE','4480':'Medley Inc','4483':'JMDC','4488':'AI inside','4493':'CyberSecurity Cloud','4502':'Takeda Pharmaceutical','4503':'Astellas Pharma','4507':'Shionogi & Co','4516':'Nippon Shinyaku','4519':'Chugai Pharmaceutical','4523':'Eisai Co','4528':'Ono Pharmaceutical','4530':'Hisamitsu Pharmaceutical','4534':'Mochida Pharma','4536':'Santen Pharma','4540':'Tsumura & Co','4543':'Terumo Corp','4565':'Sosei Group','4568':'Daiichi Sankyo','4571':'NanoCarrier Co','4578':'Otsuka Holdings','4587':'PeptiDream Inc','4612':'Nippon Paint Holdings','4613':'Kansai Paint','4616':'Shinto Paint','4617':'Chugoku Marine Paints','4619':'Nihon Tokushu Toryo','4631':'DIC Corp','4634':'Toyo Ink SC Holdings','4661':'Oriental Land (Disney)','4667':'Aisan Technology','4681':'Resort Trust','4684':'Obic Co','4689':'LY Corp (LINE Yahoo)','4704':'Trend Micro','4751':'CyberAgent','4755':'Rakuten Group','4819':'Digital Garage','4848':'Fullcast Holdings','4849':'en Japan Inc','4884':'Kringle Pharma','4901':'Fujifilm Holdings','4996':'Kumiai Chemical Industry','4997':'Nihon Nohyaku','5019':'Idemitsu Kosan','5020':'ENEOS Holdings','5021':'Cosmo Energy Holdings','5076':'Tes Engineering','5201':'AGC Inc','5202':'Nippon Sheet Glass','5214':'Nippon Electric Glass','5232':'Sumitomo Osaka Cement','5233':'Taiheiyo Cement','5269':'Nippon Concrete Industries','5332':'TOTO Ltd','5384':'Fujimi Inc','5393':'Nichias Corp','5401':'Nippon Steel','5406':'Kobe Steel','5411':'JFE Holdings','5423':'Tokyo Steel Manufacturing','5444':'Yamato Kogyo','5480':'Nihon Yakin Kogyo','5703':'Nippon Light Metal Holdings','5706':'Mitsui Mining & Smelting','5713':'Sumitomo Metal Mining','5714':'DOWA Holdings','5726':'Osaka Titanium Technologies','5727':'Toho Titanium','5741':'UACJ Corp','5801':'Furukawa Electric','5802':'Sumitomo Electric','5803':'Fujikura Ltd','5938':'LIXIL Group','6016':'Japan Engine Corp','6098':'Recruit Holdings','6135':'Makino Milling Machine','6141':'DMG Mori Co','6146':'DISCO Corp','6197':'Solasto Corp','6201':'Toyota Industries','6203':'Howa Machinery','6232':'ACSL','6257':'Kurita Water Industries','6268':'Nabtesco Corp','6273':'SMC Corp','6301':'Komatsu Ltd','6302':'Sumitomo Heavy Industries','6310':'Iseki & Co','6326':'Kubota Corp','6332':'Tsukishima Holdings','6361':'Ebara Corp','6367':'Daikin Industries','6460':'Sega Sammy Holdings','6473':'JTEKT Corp','6474':'Nachi-Fujikoshi','6481':'THK','6501':'Hitachi Ltd','6503':'Mitsubishi Electric','6504':'Fuji Electric','6506':'Yaskawa Electric','6526':'Socionext','6547':'PHC Holdings','6590':'Shibaura Mechatronics','6622':'Daihen Corp','6627':'TeraPower (TeraProbe)','6645':'Omron Corp','6656':'ESPEC Corp','6666':'River Eletec','6674':'GS Yuasa Corp','6701':'NEC Corp','6702':'Fujitsu Ltd','6707':'Sanken Electric','6723':'Renesas Electronics','6752':'Panasonic Holdings','6753':'Sharp Corp','6758':'Sony Group','6762':'TDK Corp','6770':'Alps Alpine','6810':'Maxell Ltd','6844':'Shindengen Electric','6857':'Advantest Corp','6861':'Keyence Corp','6866':'Hioki E.E.','6869':'Sysmex Corp','6871':'Micronics Japan','6890':'Ferrotec Holdings','6902':'Denso Corp','6920':'Lasertec Corp','6941':'Yamaichi Electronics','6951':'JEOL Ltd','6952':'Casio Computer','6954':'Fanuc Corp','6963':'Rohm Co','6965':'Hamamatsu Photonics','6971':'Kyocera Corp','6981':'Murata Manufacturing','6988':'Nitto Denko','6996':'Nichicon Corp','7003':'Mitsui E&S','7004':'Hitachi Zosen','7011':'Mitsubishi Heavy Industries','7012':'Kawasaki Heavy Industries','7013':'IHI Corp','7014':'Namura Shipbuilding','7022':'Sanoyas Holdings','7030':'Shin Kurushima Dockyard','7181':'Japan Post Insurance','7182':'Japan Post Bank','7186':'Concordia FG','7201':'Nissan Motor','7203':'Toyota Motor','7211':'Mitsubishi Motors','7259':'Aisin','7261':'Mazda Motor','7267':'Honda Motor','7270':'Subaru Corp','7272':'Yamaha Motor','7383':'Net Protections Holdings','7459':'MediaDo Holdings','7532':'Pan Pacific Intl (Don Quijote)','7649':'Sugi Holdings','7701':'Shimadzu Corp','7729':'Tokyo Seimitsu','7731':'Nikon','7733':'Olympus Corp','7735':'SCREEN HD','7739':'Canon Electronics','7746':'Okamoto Glass','7751':'Canon Inc','7762':'Citizen Watch','7832':'Bandai Namco','7833':'GMO Financial Holdings','7974':'Nintendo','8001':'Itochu Corp','8002':'Marubeni Corp','8031':'Mitsui & Co','8035':'Tokyo Electron','8050':'Seiko Group Corp','8053':'Sumitomo Corp','8056':'BIPROGY','8058':'Mitsubishi Corp','8086':'Nipro Corp','8088':'Iwatani Corp','8233':'Takashimaya Co','8267':'Aeon Co','8304':'Aozora Bank','8306':'MUFG','8308':'Resona Holdings','8309':'Sumitomo Mitsui Trust','8316':'SMFG','8331':'Chiba Bank','8336':'Musashino Bank','8341':'Shichijushichi Bank','8346':'Toho Bank','8354':'Fukuoka Financial Group','8359':'Hachijuni Bank','8366':'Shiga Bank','8377':'Hokuriku Financial Group','8387':'Shikoku Bank','8410':'Moneytree','8411':'Mizuho Financial Group','8418':'Yamaguchi Financial Group','8473':'SBI Holdings','8515':'Aiful Corp','8522':'Nagoya Bank','8524':'Hokuyoh Bank','8591':'Orix Corp','8601':'Daiwa Securities','8604':'Nomura Holdings','8628':'Matsui Securities','8630':'SOMPO Holdings','8698':'Monex Group','8725':'MS&AD Insurance','8750':'Dai-ichi Life Holdings','8766':'Tokio Marine Holdings','8795':'T&D Holdings','8801':'Mitsui Fudosan','8802':'Mitsubishi Estate','8803':'Heiwa Real Estate','8804':'Tokyo Tatemono','8830':'Sumitomo Realty & Development','8848':'Leopalace21','9001':'Tobu Railway','9005':'Tokyu Corp','9020':'JR East','9024':'Seibu Holdings','9041':'Kintetsu Group Holdings','9042':'Hankyu Hanshin Holdings','9045':'Keihan HD','9064':'Yamato Holdings','9067':'Suzuken','9069':'Senko Group Holdings','9101':'Nippon Yusen (NYK Line)','9104':'Mitsui O.S.K. Lines','9107':'Kawasaki Kisen (K Line)','9119':'Iino Kaiun Kaisha','9143':'SG Holdings','9147':'Nippon Express Holdings','9171':'Kuribayashi Steamship','9201':'Japan Airlines','9202':'ANA Holdings','9233':'Asahi Koyo','9278':'BookOff Group Holdings','9308':'Inui Steamship','9412':'SKY Perfect JSAT','9424':'Nihon Tsushin','9432':'NTT Corp','9433':'KDDI Corp','9434':'SoftBank (Telecom)','9449':'GMO Internet Group','9470':'Gakken Holdings','9474':'Zenrin Co','9501':'Tokyo Electric Power','9502':'Chubu Electric Power','9503':'Kansai Electric Power','9504':'Chugoku Electric Power','9505':'Hokuriku Electric Power','9506':'Tohoku Electric Power','9507':'Shikoku Electric Power','9508':'Kyushu Electric Power','9509':'Hokkaido Electric Power','9511':'Okinawa Electric Power','9513':'J-Power','9517':'Erex Co','9519':'Renova Inc','9531':'Tokyo Gas','9532':'Osaka Gas','9551':'MetaWater Co','9603':'H.I.S. Co','9627':'Ain Holdings','9684':'Square Enix','9686':'Toyo Tec','9697':'Capcom Co','9708':'Imperial Hotel','9722':'Fujita Kanko','9735':'Secom Co','9766':'Konami Group','9843':'Nitori Holdings','9983':'Fast Retailing (Uniqlo)','9984':'SoftBank Group','9989':'Sundrug','8697':'Japan Exchange Group','5108':'Bridgestone Corp','6178':'Japan Post Holdings','83AT':'Japan Exchange Group','2801':'Kikkoman Corp','3863':'Nippon Paper Industries','4324':'Dentsu Group','7269':'Suzuki Motor','7276':'Koito Manufacturing','7911':'Toppan Holdings','7912':'Dai Nippon Printing','8252':'Marui Group','3288':'Open House Group','6370':'Kurita Water Industries','5631':'Japan Steel Works','4183':'Mitsui Chemicals','6103':'Okuma Corp','6113':'Amada Co','6305':'Hitachi Construction Machinery','6471':'NSK Ltd','6724':'Seiko Epson','6728':'ULVAC Inc','6966':'Mitsui High-tec','6967':'Shinko Electric Industries','6995':'Tokai Rika','7202':'Isuzu Motors','7752':'Ricoh Co','4021':'Nissan Chemical','4151':'Kyowa Kirin','3401':'Teijin Ltd','3405':'Kureha Corp','5101':'Yokohama Rubber','5301':'Tokai Carbon','5333':'NGK Insulators','5334':'Niterra (NGK Spark Plug)','5901':'Toyo Seikan','5929':'Sanwa Holdings','5947':'Rinnai Corp','6028':'TechnoPro Holdings','6136':'OSG Corp','6324':'Harmonic Drive Systems','6395':'Tadano Ltd','6432':'Takeuchi Mfg','6457':'Glory Ltd','6472':'NTN Corp','6502':'Toshiba Corp','6806':'Hirose Electric','6841':'Yokogawa Electric','6845':'Azbil Corp','6923':'Stanley Electric','6925':'Ushio Inc','7313':'TS Tech','8253':'Credit Saison','8270':'Uni-Charm','8303':'SBI Shinsei Bank','9021':'JR West','9022':'JR Central','9301':'Mitsubishi Logistics','9602':'Toho Co','9706':'Nihon Airport Building'}
const getStockName = (name, ticker) => {
  if (!ticker) return name || ''
  const code = String(ticker).replace('.T', '')
  if (TICKER_TO_EN[code]) return TICKER_TO_EN[code]
  // If name contains Japanese characters, show ticker code instead
  if (/[\u3040-\u9fff\u30a0-\u30ff]/.test(name || '')) return code
  return name || code
}


// 出来高・売買代金 棒グラフ（MarketRank用）
// ── 注目銘柄ピックアップ ──────────────────────────────
function PickupStocks({ stocks, period }) {
  if (!stocks || stocks.length === 0) return null

  const fmtL = (v) => {
    if (!v || v === 0) return '-'
    if (v >= 1e12) return (v / 1e12).toFixed(1) + 'T'
    if (v >= 1e8)  return (v / 1e8).toFixed(1) + 'B'
    if (v >= 1e4)  return (v / 1e4).toFixed(1) + 'K'
    return v.toLocaleString()
  }

  const scored = stocks.map(s => {
    const pct    = s.pct ?? 0
    const volChg = s.volume_chg ?? 0
    const tv     = s.trade_value ?? 0

    const pctScore = Math.min(40, Math.max(0, pct * 2))
    const volScore = Math.min(25, Math.max(0, volChg * 0.5))
    const tvScore  = tv > 0 ? Math.min(15, Math.log10(tv) * 1.5) : 0

    let sparkScore = 0
    let sparkAccel = 0
    if (s.spark && s.spark.length >= 6) {
      const sp = s.spark, n = sp.length
      const h  = Math.floor(n / 2)
      const avgFirst = sp.slice(0, h).reduce((a, b) => a + b, 0) / h
      const avgLast  = sp.slice(h).reduce((a, b) => a + b, 0) / (n - h)
      sparkAccel = avgLast - avgFirst
      sparkScore = Math.min(20, Math.max(0, sparkAccel * 3))
    }

    const totalScore = pctScore + volScore + sparkScore + tvScore

    const buildReason = () => {
      const parts = []
      if (pct >= 10)       parts.push('+' + pct.toFixed(1) + '% — strongly rising.')
      else if (pct >= 5)   parts.push('+' + pct.toFixed(1) + '% — solid performance.')
      else if (pct >= 2)   parts.push('+' + pct.toFixed(1) + '% — above segment average.')
      else if (pct > 0)    parts.push('+' + pct.toFixed(1) + '% — marginally positive.')

      if (volChg >= 50)      parts.push('Volume surged +' + volChg.toFixed(0) + '% — strong inflows.')
      else if (volChg >= 20) parts.push('Volume +' + volChg.toFixed(0) + '% — growing interest.')

      if (sparkAccel > 3)    parts.push('Price accelerating (+' + sparkAccel.toFixed(1) + '% back-half.)')
      else if (sparkAccel > 1) parts.push('Improving (+' + sparkAccel.toFixed(1) + '% back-half.)')

      if (tv >= 5e9)       parts.push('Trade Value ' + fmtL(tv) + ' — high liquidity blue-chip.')
      else if (tv >= 1e9)  parts.push('Trade Value ' + fmtL(tv) + ' — adequate liquidity.')

      if (parts.length === 0) parts.push('High composite score: Return, Volume, momentum, Trade Value.')
      return parts.join('。') + '。'
    }

    return { ...s, _score: totalScore, _reason: buildReason() }
  })
  .filter(s => (s.pct ?? 0) > 0 && s._score > 3)
  .sort((a, b) => b._score - a._score)
  .slice(0, 3)

  if (scored.length === 0) return null

  const medals      = ['🥇', '🥈', '🥉']
  const medalColors = ['#ffd166', 'rgba(192,192,192,0.7)', 'rgba(205,127,50,0.7)']

  return (
    <div style={{ marginBottom:'20px' }}>
      {/* PickupStocksヘッダー: スマホで1行目タイトル/2行目説明 */}
      <div style={{ marginBottom:'12px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px' }}>
          <span style={{ fontSize:'12px', fontWeight:700, color:'var(--text)', whiteSpace:'nowrap' }}>
            🔎 Featured Stock Picks
          </span>
          <div style={{ flex:1, height:'1px', background:'var(--border)' }} />
        </div>
        <span style={{ fontSize:'10px', color:'var(--text3)', display:'block', paddingLeft:'2px' }}>
          Scores auto-calculated from Return, Volume, momentum, and Trade Value. Picks update automatically with each data refresh.
        </span>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px' }}
        className="pickup-grid">
        {scored.map((s, i) => {
          const upColor   = (s.pct ?? 0) >= 0 ? '#ff5370' : '#00c48c'
          const scoreNum  = Math.min(100, Math.round(s._score))
          const scoreColor = scoreNum >= 60 ? '#ff5370' : scoreNum >= 35 ? '#ff8c42' : '#ffd166'
          return (
            <div key={s.ticker} style={{
              background:'var(--bg2)', borderRadius:'8px', padding:'12px 14px',
              border:'1px solid var(--border)',
              borderTop:'3px solid ' + medalColors[i],
              display:'flex', flexDirection:'column', gap:'6px',
            }}>
              {/* 順位 + ティッカー + 騰落率 */}
              <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                <span style={{ fontSize:'14px' }}>{medals[i]}</span>
                <span style={{ fontSize:'10px', color:'var(--text3)', fontFamily:'var(--mono)' }}>
                  {s.ticker.replace('.T', '')}
                </span>
                <span style={{ marginLeft:'auto', fontSize:'13px', fontWeight:700,
                  color:upColor, fontFamily:'var(--mono)' }}>
                  {(s.pct ?? 0) >= 0 ? '+' : ''}{s.pct?.toFixed(1)}%
                </span>
              </div>
              {/* 銘柄名（必ず表示） */}
              <div style={{ fontSize:'13px', fontWeight:700, color:'var(--text)',
                lineHeight:1.4 }}>
                {s.name || s.ticker.replace('.T', '')}
              </div>
              {/* スパークライン ④ 高さを拡大 */}
              {s.spark && s.spark.length >= 3 && (
                <span style={{ display:'block', width:'100%', height:'56px' }}>
                  <Sparkline data={s.spark} />
                </span>
              )}
              {/* 株価 + 売買代金 */}
              <div style={{ display:'flex', gap:'10px', fontSize:'10px',
                fontFamily:'var(--mono)', color:'var(--text3)' }}>
                {'¥' + (s.price?.toLocaleString() || '-')}
                {(s.trade_value ?? 0) > 0 && (
                  <span>{'Trade Value ' + fmtL(s.trade_value)}</span>
                )}
              </div>
              {/* Scoreスコア */}
              <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                <span style={{ fontSize:'9px', color:'var(--text3)', fontWeight:600,
                  textTransform:'uppercase', letterSpacing:'0.06em', flexShrink:0 }}>
                  Score
                </span>
                <span style={{ fontSize:'15px', fontWeight:800, fontFamily:'var(--mono)',
                  color:scoreColor, lineHeight:1 }}>
                  {scoreNum}
                </span>
                <span style={{ fontSize:'9px', color:'var(--text3)', marginRight:'4px' }}>/100</span>
                <div style={{ flex:1, height:'4px', background:'rgba(255,255,255,0.06)',
                  borderRadius:'2px', overflow:'hidden' }}>
                  <div style={{ width:scoreNum + '%', height:'100%',
                    background:scoreColor, borderRadius:'2px' }} />
                </div>
              </div>
              {/* 根拠文章 */}
              <p style={{ fontSize:'10px', color:'var(--text2)', lineHeight:1.75, margin:0 }}>
                {s._reason}
              </p>
            </div>
          )
        })}
      </div>
      <div style={{ marginTop:'8px', padding:'8px 12px',
        background:'rgba(255,193,7,0.05)', borderRadius:'5px',
        border:'1px solid rgba(255,193,7,0.15)', fontSize:'10px',
        color:'var(--text3)', lineHeight:1.8 }}>
        ⚠️ <strong style={{ color:'var(--text2)' }}>Note:</strong>
        Rankings are auto-calculated.
        <strong style={{ color:'var(--text2)' }}>Not real-time data</strong>;
        Results depend on data update timing.
        May differ from current market conditions.
        Not a recommendation to buy or sell.
        <strong style={{ color:'var(--text2)' }}>All investment decisions are your sole responsibility</strong>.
      </div>
    </div>
  )
}

function MrVolTvChart({ stocks }) {
  const [mode, setMode] = useState('tv') // 'tv' | 'vol'
  const [expanded, setExpanded] = useState(false)
  if (!stocks || stocks.length === 0) return (
    <div style={{ textAlign:'center', padding:'24px', color:'var(--text3)', fontSize:'12px',
      background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'10px' }}>
      Loading...
    </div>
  )
  const sorted = [...stocks].sort((a,b) => (b[mode==='tv'?'trade_value':'volume']||0)-(a[mode==='tv'?'trade_value':'volume']||0)).slice(0,15)
  const maxV = Math.max(...sorted.map(s => s[mode==='tv'?'trade_value':'volume']||0), 1)
  const fmtL = v => {
    if (!v) return '0'
    if (v >= 1e12) return (v/1e12).toFixed(1)+'T'
    if (v >= 1e8) return (v/1e8).toFixed(1)+'B'
    if (v >= 1e4) return (v/1e4).toFixed(1)+'K'
    return v.toLocaleString()
  }
  const chart = (
    <div>
      <div style={{ display:'flex', gap:'8px', marginBottom:'10px' }}>
        {[{v:'tv',l:'Trade Value'},{v:'vol',l:'Volume'}].map(m=>(
          <button key={m.v} onClick={()=>setMode(m.v)} style={{
            padding:'4px 12px', borderRadius:'6px', fontSize:'12px', fontWeight:600,
            cursor:'pointer', fontFamily:'var(--font)',
            background: mode===m.v?'rgba(74,158,255,0.15)':'transparent',
            border: mode===m.v?'1px solid rgba(74,158,255,0.4)':'1px solid var(--border)',
            color: mode===m.v?'var(--accent)':'var(--text3)',
          }}>{m.l}</button>
        ))}
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
        {sorted.map(s => {
          const v = s[mode==='tv'?'trade_value':'volume']||0
          const w = v/maxV*100
          const pc = s.pct>=0?'var(--red)':'var(--green)'
          return (
            <div key={s.ticker} style={{ display:'grid', gridTemplateColumns:'110px 1fr 70px 56px', gap:'6px', alignItems:'center' }}>
              <span style={{ fontSize:'11px', color:'var(--text2)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', textAlign:'right' }}>{s.name}</span>
              <div style={{ height:'12px', background:'rgba(255,255,255,0.04)', borderRadius:'3px', overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${w}%`, background:mode==='tv'?'#ff8c42':'#378ADD', borderRadius:'3px', opacity:0.85 }}/>
              </div>
              <span style={{ fontFamily:'var(--mono)', fontSize:'11px', color:'var(--text2)', textAlign:'right', whiteSpace:'nowrap' }}>{fmtL(v)}</span>
              <span style={{ fontFamily:'var(--mono)', fontSize:'11px', fontWeight:700, color:pc, textAlign:'right', whiteSpace:'nowrap' }}>{s.pct>=0?'+':''}{s.pct?.toFixed(1)}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
  return (
    <div>
      {chart}
      <button onClick={()=>setExpanded(true)} style={{
        display:'block', width:'100%', marginTop:'8px', padding:'5px 0',
        borderRadius:'6px', border:'1px solid var(--border)',
        background:'rgba(74,158,255,0.06)', color:'var(--accent)',
        fontSize:'11px', fontWeight:600, cursor:'pointer', fontFamily:'var(--font)',
      }}>🔍 Expand</button>
      {expanded && (
        <div onClick={()=>setExpanded(false)} style={{
          position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', zIndex:2000,
          display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', backdropFilter:'blur(4px)',
        }}>
          <div onClick={e=>e.stopPropagation()} style={{
            background:'var(--bg)', borderRadius:'12px', border:'1px solid var(--border)',
            padding:'20px', width:'min(92vw,900px)', maxHeight:'90vh', overflowY:'auto',
          }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px' }}>
              <span style={{ fontSize:'14px', fontWeight:700, color:'var(--text)' }}>Volume & Trade Value (expanded)</span>
              <button onClick={()=>setExpanded(false)} style={{
                background:'rgba(255,255,255,0.08)', border:'1px solid var(--border)',
                borderRadius:'6px', color:'var(--text2)', cursor:'pointer', fontSize:'13px', padding:'4px 12px', fontFamily:'var(--font)',
              }}>✕ Close</button>
            </div>
            {chart}
          </div>
        </div>
      )}
    </div>
  )
}

// 銘柄別ヒートマップ（MarketRank用・拡大機能付き）
function MrBubbleChart({ stocks }) {
  const [expanded, setExpanded] = useState(false)
  if (!stocks || !stocks.length) return (
    <div style={{ textAlign:'center', padding:'24px', color:'var(--text3)', fontSize:'12px',
      background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'10px' }}>
      Loading...
    </div>
  )
  const chart = <StockBubbleChart stocks={stocks} themeName="" onNavigate={null} />
  return (
    <div>
      {chart}
      <button onClick={()=>setExpanded(true)} style={{
        display:'block', width:'100%', marginTop:'8px', padding:'5px 0',
        borderRadius:'6px', border:'1px solid var(--border)',
        background:'rgba(74,158,255,0.06)', color:'var(--accent)',
        fontSize:'11px', fontWeight:600, cursor:'pointer', fontFamily:'var(--font)',
      }}>🔍 Expand</button>
      {expanded && (
        <div onClick={()=>setExpanded(false)} style={{
          position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', zIndex:2000,
          display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', backdropFilter:'blur(4px)',
        }}>
          <div onClick={e=>e.stopPropagation()} style={{
            background:'var(--bg)', borderRadius:'12px', border:'1px solid var(--border)',
            padding:'20px', width:'min(92vw,1000px)', maxHeight:'90vh', overflowY:'auto',
          }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px' }}>
              <span style={{ fontSize:'14px', fontWeight:700, color:'var(--text)' }}>Stock Heatmap (expanded)</span>
              <button onClick={()=>setExpanded(false)} style={{
                background:'rgba(255,255,255,0.08)', border:'1px solid var(--border)',
                borderRadius:'6px', color:'var(--text2)', cursor:'pointer', fontSize:'13px', padding:'4px 12px', fontFamily:'var(--font)',
              }}>✕ Close</button>
            </div>
            {chart}
          </div>
        </div>
      )}
    </div>
  )
}

const PERIODS = [
  {label:'1D',value:'1d'},{ label:'1W',value:'5d'},{label:'1M',value:'1mo'},
  { label:'3M',value:'3mo'},{label:'6M',value:'6mo'},{label:'1Y',value:'1y'},
]

function formatLarge(n) {
  if (!n) return '0'
  if (n >= 1e12) return (n/1e12).toFixed(1)+'T'
  if (n >= 1e8)  return (n/1e8).toFixed(1)+'B'
  if (n >= 1e4)  return (n/1e4).toFixed(1)+'K'
  return n.toLocaleString()
}

function Loading({ msg='Loading...' }) {
  return (
    <div style={{ textAlign:'center', padding:'40px', color:'var(--text3)' }}>
      {[0,0.2,0.4].map((d,i)=>(
        <span key={i} style={{ display:'inline-block', width:'6px', height:'6px', borderRadius:'50%',
          background:'var(--accent)', margin:'0 3px', animation:`pulse 1.2s ease-in-out ${d}s infinite`}}/>
      ))}
      <div style={{ marginTop:'12px', fontSize:'12px' }}>{msg}</div>
    </div>
  )
}

function Top5Bar({ items, title, colorFn, emptyMsg }) {
  if (!items||!items.length) return (
    <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'8px',
      padding:'12px', textAlign:'center', color:'var(--text3)', fontSize:'12px' }}>
      <div style={{ fontSize:'11px', fontWeight:700, color:'var(--text)', marginBottom:'8px' }}>{title}</div>
      {emptyMsg || 'No data'}
    </div>
  )
  const maxAbs = Math.max(...items.map(s=>Math.abs(s.pct)), 0.01)
  return (
    <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'8px', padding:'10px 12px' }}>
      <div style={{ fontSize:'11px', fontWeight:700, color:'var(--text)', marginBottom:'8px' }}>{title}</div>
      <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
        {items.map((s, i) => {
          const c = colorFn(s.pct)
          const w = Math.abs(s.pct) / maxAbs * 100
          return (
            <div key={s.ticker} style={{
              display:'grid', gridTemplateColumns:'90px 1fr 60px',
              alignItems:'center', gap:'6px',
            }}>
              <span style={{ fontSize:'11px', color:'var(--text2)', overflow:'hidden',
                textOverflow:'ellipsis', whiteSpace:'nowrap', textAlign:'right' }}>
                {s.name}
              </span>
              <div style={{ height:'12px', background:'rgba(255,255,255,0.04)', borderRadius:'3px', overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${w}%`, background:c, borderRadius:'3px', opacity:0.85 }} />
              </div>
              <span style={{ fontFamily:'var(--mono)', fontSize:'11px', fontWeight:700, textAlign:'right', color:c, whiteSpace:'nowrap' }}>
                {s.pct>=0?'+':''}{s.pct.toFixed(1)}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// スパークライン（銘柄の6ヶ月騰落率推移）
function Sparkline({ data }) {
  if (!data || data.length < 3) return null
  const W = 64, H = 24
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W
    const y = H - ((v - min) / range) * (H - 3) - 1.5
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
  const color = data[data.length - 1] >= data[0] ? 'var(--red)' : 'var(--green)'
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`}
      style={{ display:'block' }} preserveAspectRatio="xMidYMid meet">
      <polyline
        points={`0,${H} ${pts} ${W},${H}`}
        fill={color} fillOpacity="0.12" stroke="none" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5"
        strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

const thStyle = { padding:'6px 8px', textAlign:'right', fontSize:'10px', fontWeight:600, letterSpacing:'0.06em', color:'var(--text3)', textTransform:'uppercase', whiteSpace:'nowrap', background:'var(--bg3)' }
const tdC = { padding:'8px 10px', textAlign:'center', whiteSpace:'nowrap', color:'var(--text2)' }
const tdR = { padding:'8px 10px', textAlign:'right', whiteSpace:'nowrap' }
const tdL = { padding:'8px 12px', textAlign:'left' }

function StockTable({ stocks: rawStocks, onAddToTheme }) {
  if (!rawStocks||!rawStocks.length) return null
  const [sortKey, setSortKey] = useState('pct')
  const [sortAsc, setSortAsc] = useState(false)
  const tableRef = useRef(null)
  const topScrollRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  // ⑤ ソート
  const stocks = [...rawStocks].sort((a, b) => {
    const va = a[sortKey] ?? 0; const vb = b[sortKey] ?? 0
    return sortAsc ? va - vb : vb - va
  })

  // ① 上下スクロールバー同期 + table実幅をspacerに反映
  useEffect(() => {
    const table = tableRef.current
    const top = topScrollRef.current
    if (!table || !top) return
    const syncT = () => {
      top.scrollLeft = table.scrollLeft
      const bot = document.getElementById('mr-bottom-scroll')
      if (bot) bot.scrollLeft = table.scrollLeft
    }
    const syncH = () => { table.scrollLeft = top.scrollLeft }
    const syncBot = () => {
      const bot = document.getElementById('mr-bottom-scroll')
      if (bot) table.scrollLeft = bot.scrollLeft
    }
    table.addEventListener('scroll', syncT)
    top.addEventListener('scroll', syncH)
    document.getElementById('mr-bottom-scroll')?.addEventListener('scroll', syncBot)
    // table実際のscrollWidthをspacerに設定してスクロールバーを正確に表示
    const updateSpacer = () => {
      const w = table.scrollWidth + 'px'
      const spacer = document.getElementById('mr-scroll-spacer')
      if (spacer) spacer.style.width = w
      const botSpacer = document.getElementById('mr-bottom-spacer')
      if (botSpacer) botSpacer.style.width = w
    }
    updateSpacer()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateSpacer) : null
    ro?.observe(table)
    return () => {
      table.removeEventListener('scroll', syncT)
      top.removeEventListener('scroll', syncH)
      document.getElementById('mr-bottom-scroll')?.removeEventListener('scroll', syncBot)
      ro?.disconnect()
    }
  }, [])

  const onMouseDown = (e) => {
    isDragging.current = true; startX.current = e.pageX - tableRef.current.offsetLeft
    scrollLeft.current = tableRef.current.scrollLeft; tableRef.current.style.cursor = 'grabbing'
  }
  const onMouseMove = (e) => {
    if (!isDragging.current) return; e.preventDefault()
    tableRef.current.scrollLeft = scrollLeft.current - (e.pageX - tableRef.current.offsetLeft - startX.current) * 1.2
  }
  const onMouseUp = () => { isDragging.current = false; if (tableRef.current) tableRef.current.style.cursor = 'grab' }

  const headers = ['Chart','Price','Return','Mkt.Cap','Contrib.%','Vol.Chg','Volume','Vol.Rank','Trade Value','TV.Rank','Add']
  const sortBtns = [{key:'pct',label:'Return'},{key:'volume',label:'Volume'},{key:'trade_value',label:'Trade Value'}]

  return (
    <>
      {/* ⑤ ソートボタン */}
      <div style={{ display:'flex', gap:'6px', alignItems:'center', marginBottom:'8px', flexWrap:'wrap' }}>
        <span style={{ fontSize:'10px', color:'var(--text3)', fontWeight:600, whiteSpace:'nowrap' }}>Sort:</span>
        {sortBtns.map(b => (
          <button key={b.key} onClick={() => { if (sortKey===b.key) setSortAsc(a=>!a); else { setSortKey(b.key); setSortAsc(false) } }}
            style={{ padding:'3px 10px', borderRadius:'5px', fontSize:'11px', fontWeight:600, cursor:'pointer', fontFamily:'var(--font)',
              background: sortKey===b.key?'rgba(74,158,255,0.15)':'transparent',
              border: sortKey===b.key?'1px solid rgba(74,158,255,0.4)':'1px solid var(--border)',
              color: sortKey===b.key?'var(--accent)':'var(--text3)' }}>
            {b.label} {sortKey===b.key?(sortAsc?'↑':'↓'):''}
          </button>
        ))}
        <button onClick={()=>setSortAsc(a=>!a)} style={{ padding:'3px 10px', borderRadius:'5px', fontSize:'11px', fontWeight:600,
          cursor:'pointer', fontFamily:'var(--font)', background:'transparent', border:'1px solid var(--border)', color:'var(--text3)' }}>
          {sortAsc?'↑ Asc':'↓ Desc'}
        </button>
      </div>
      {/* ① 上部スクロールバー（table幅に合わせて動的同期） */}
      <div ref={topScrollRef} style={{ overflowX:'auto', overflowY:'hidden', height:'12px', marginBottom:'2px',
        background:'rgba(255,255,255,0.02)', borderRadius:'4px' }}>
        <div id="mr-scroll-spacer" style={{ height:'1px' }} />
      </div>
      <div ref={tableRef} className="sticky-table" style={{ cursor:'grab', userSelect:'none' }}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
        <table style={{ borderCollapse:'collapse', fontSize:'12px', fontFamily:'var(--font)', width:'100%' }}>
          <thead>
            <tr style={{ borderBottom:'1px solid var(--border)' }}>
              <th style={{ ...thStyle, textAlign:'center', width:'32px', minWidth:'32px', maxWidth:'32px', padding:'8px 4px', background:'var(--bg3)', position:'sticky', left:0, zIndex:3 }}>#</th>
              <th style={{ ...thStyle, textAlign:'left', minWidth:'120px', background:'var(--bg3)', position:'sticky', left:'32px', zIndex:3 }}>Stock Name</th>
              {headers.map(h => (
                <th key={h} style={{ ...thStyle, minWidth: h==='株価'||h==='騰落率'?'70px':'80px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stocks.map((s,i)=>{
              const pColor = s.pct>=0?'var(--red)':'var(--green)'
              return (
                <tr key={s.ticker} style={{ borderBottom:'1px solid var(--border)' }}>
                  <td style={{ ...tdC, fontFamily:'var(--mono)', fontSize:'11px', fontWeight:700, color:'var(--text3)',
                    background: i%2===0?'var(--bg2)':'var(--bg3)', position:'sticky', left:0, zIndex:2, width:'32px', minWidth:'32px', maxWidth:'32px', padding:'8px 4px' }}>
                    {i+1}
                  </td>
                  <td style={{ ...tdL, fontWeight:600, color:'var(--text)', minWidth:'120px', background: i%2===0?'var(--bg2)':'var(--bg3)', position:'sticky', left:'32px', zIndex:2 }}>
                    <div style={{ fontSize:'10px', color:'var(--text3)', fontFamily:'var(--mono)', marginBottom:'1px' }}>{s.ticker.replace('.T','')}</div>
                    <span style={{ fontSize:'13px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', display:'block' }}>{s.name}</span>
                  </td>
                  {/* ① ミニチャート列（固定なし・横スクロールで動く） */}
                  <td style={{ ...tdC, padding:'4px 8px', minWidth:'72px', width:'72px' }}>
                    <span style={{ display:'inline-block', width:'64px', height:'22px', verticalAlign:'middle' }}>
                      <Sparkline data={s.spark} />
                    </span>
                  </td>
                  <td style={tdR}><span style={{ fontFamily:'var(--mono)', color:'var(--text2)' }}>¥{s.price?.toLocaleString()}</span></td>
                  <td style={{ ...tdR, color:pColor, fontWeight:700, fontFamily:'var(--mono)' }}>{s.pct>=0?'+':''}{s.pct?.toFixed(1)}%</td>
                  <td style={{ ...tdR, fontFamily:'var(--mono)', color:'var(--text2)' }}>{s.market_cap > 0 ? formatLarge(s.market_cap) : '-'}</td>
                  <td style={{ ...tdR, fontFamily:'var(--mono)', color:(s.contribution??0)>=0.5?'#ff5370':(s.contribution??0)>=0.1?'#ff8c42':(s.contribution??0)>-0.1?'var(--text2)':'#4a9eff' }}
                    title="Contribution %">
                    {s.contribution != null ? (s.contribution>=0?'+':'')+s.contribution.toFixed(2)+'%' : '-'}
                  </td>
                  <td style={{ ...tdR, color:s.volume_chg>=0?'var(--red)':'var(--green)', fontFamily:'var(--mono)' }}>{s.volume_chg>=0?'+':''}{s.volume_chg?.toFixed(1)}%</td>
                  <td style={{ ...tdR, fontFamily:'var(--mono)', color:'var(--text2)' }}>{formatLarge(s.volume)}</td>
                  <td style={tdC}>{s.vol_rank}</td>
                  <td style={{ ...tdR, fontFamily:'var(--mono)', color:'var(--text2)' }}>{formatLarge(s.trade_value)}</td>
                  <td style={tdC}>{s.tv_rank}</td>
                  <td style={tdC}>
                    <button onClick={() => onAddToTheme && onAddToTheme({ ticker:s.ticker, name:s.name, price:s.price })}
                      title="Add to Custom Theme"
                      style={{ background:'rgba(74,158,255,0.1)', border:'1px solid rgba(74,158,255,0.25)',
                        borderRadius:'4px', color:'var(--accent)', cursor:'pointer', fontSize:'13px',
                        padding:'3px 7px', fontFamily:'var(--font)', lineHeight:1 }}>＋</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {/* ② 下部スクロールバー（上部と同期） */}
      <div id="mr-bottom-scroll" style={{ overflowX:'auto', overflowY:'hidden', height:'12px', marginTop:'2px',
        background:'rgba(255,255,255,0.02)', borderRadius:'4px' }}>
        <div id="mr-bottom-spacer" style={{ height:'1px' }} />
      </div>
    </>
  )
}

// ↓ StockTable前に定数定義



// ETFセグメント定義（market.jsonに未登録のためフロントエンドでハードコード）
const ETF_GROUPS = {
  'ETF | Domestic Index': {
    '1321': 'Nikkei225 ETF',
    '1306': 'TOPIX ETF',
    '1308': 'TOPIX ETF (NF)',
    '1330': 'Nikkei225 Index',
    '1346': 'MAXIS Nikkei225',
    '1329': 'iShares Nikkei225',
    '1348': 'MAXIS TOPIX',
    '1591': 'JPX-Nikkei400',
    '1577': 'Hi-Div 70 ETF',
    '1489': 'Nikkei Hi-Div 50',
    '1343': 'NF TSE REIT',
    '1597': 'MAXIS J-REIT',
    '1476': 'iShares J-REIT',
    '1488': 'iFree TSE REIT',
    '1478': 'iShares JP Hi-Div',
  },
  'ETF | Domestic Theme': {
    '2644': 'GlobalX Semiconductor',
    '1626': 'NF Info/Comm',
    '1625': 'NF Electronics',
    '1622': 'NF Transport',
    '1615': 'NF Banking',
    '1617': 'NF Securities',
    '1619': 'NF Insurance',
    '1631': 'NF Real Estate',
    '2085': 'MAXIS Hi-Div Active',
    '2868': 'GlobalX S&P500 Div',
  },
  'ETF | Global Developed': {
    '2558': 'NF S&P500',
    '1655': 'iShares S&P500',
    '2559': 'MAXIS All-World',
    '2631': 'NF NASDAQ100',
    '2841': 'iShares NASDAQ100',
    '1680': 'NF MSCI-KOKUSAI',
    '1554': 'iShares MSCI ACWI',
    '1546': 'NF Dow Jones',
    '1547': 'Listed US S&P500',
  },
  'ETF | Emerging & Asia': {
    '1678': 'NF India Nifty50',
    '2850': 'GlobalX India',
    '2854': 'GlobalX China EV',
    '1575': 'iShares China',
    '1495': 'Listed Asia REIT',
  },
  'ETF | Bond & Commodity': {
    '2510': 'NF Domestic Bond',
    '1487': 'iShares JGB',
    '1540': 'NF Gold',
    '1699': 'NF Crude Oil',
    '1482': 'iShares US Tsy 7-10Y',
    '2861': 'GlobalX Gold',
    '1671': 'WisdomTree WTI Oil',
  },
  'ETF | Leveraged & Inverse': {
    '1570': 'NF Nikkei Lev 2x',
    '1571': 'NF Nikkei Dbl Inv',
    '1568': 'NF TOPIX Lev 2x',
    '1569': 'NF TOPIX Inv -1x',
    '1365': 'Rakuten Nikkei Bull',
    '1580': 'Daiwa Nikkei Inv',
  },
}

// ─── Japan ADR (US-Listed Japanese Stocks) ──────────────────────────────────
const ADR_STOCKS = [
  { us:'MUFG',  jp:'8306', name:'MUFG',               sector:'Banking',       mktcap:'$88B',  note:'Mitsubishi UFJ Financial' },
  { us:'SMFG',  jp:'8316', name:'SMFG',               sector:'Banking',       mktcap:'$72B',  note:'Sumitomo Mitsui Financial' },
  { us:'MFG',   jp:'8411', name:'Mizuho Financial',   sector:'Banking',       mktcap:'$45B',  note:'Mizuho Financial Group' },
  { us:'OKTAY', jp:'8591', name:'Orix',               sector:'Finance',       mktcap:'$19B',  note:'Diversified financial' },
  { us:'TKOMY', jp:'8766', name:'Tokio Marine',       sector:'Insurance',     mktcap:'$58B',  note:'Non-life insurance leader' },
  { us:'SONY',  jp:'6758', name:'Sony Group',         sector:'Technology',    mktcap:'$97B',  note:'Electronics & Entertainment' },
  { us:'KYCCF', jp:'6971', name:'Kyocera',            sector:'Electronics',   mktcap:'$10B',  note:'Ceramics & components' },
  { us:'FANUY', jp:'6954', name:'Fanuc',              sector:'Machinery',     mktcap:'$28B',  note:'Industrial robots & CNC' },
  { us:'ATEYY', jp:'6857', name:'Advantest',          sector:'Semicon Test',  mktcap:'$32B',  note:'Semiconductor test equipment' },
  { us:'TOELY', jp:'8035', name:'Tokyo Electron',     sector:'Semicon Equip', mktcap:'$58B',  note:'Semiconductor mfg equipment' },
  { us:'SHECY', jp:'4063', name:'Shin-Etsu Chemical', sector:'Chemicals',     mktcap:'$55B',  note:'Silicon wafers & chemicals' },
  { us:'HTHIY', jp:'6501', name:'Hitachi',            sector:'Industrial',    mktcap:'$78B',  note:'Infrastructure & IT' },
  { us:'FJTSY', jp:'6702', name:'Fujitsu',            sector:'IT Services',   mktcap:'$25B',  note:'IT services & consulting' },
  { us:'TM',    jp:'7203', name:'Toyota Motor',       sector:'Auto',          mktcap:'$235B', note:'Worlds largest automaker' },
  { us:'HMC',   jp:'7267', name:'Honda Motor',        sector:'Auto',          mktcap:'$38B',  note:'Autos & motorcycles' },
  { us:'DSNKY', jp:'6902', name:'Denso',              sector:'Auto Parts',    mktcap:'$46B',  note:'Toyota group auto supplier' },
  { us:'NTTYY', jp:'9432', name:'NTT',                sector:'Telecom',       mktcap:'$55B',  note:'Japan largest telecom' },
  { us:'KDDIY', jp:'9433', name:'KDDI',               sector:'Telecom',       mktcap:'$33B',  note:'Mobile & broadband' },
  { us:'SFTBY', jp:'9984', name:'SoftBank Group',     sector:'Telecom/VC',    mktcap:'$62B',  note:'Telecom & global VC' },
  { us:'MITSY', jp:'8058', name:'Mitsubishi Corp',    sector:'Trading',       mktcap:'$62B',  note:'Diversified trading company' },
  { us:'ITOCY', jp:'8001', name:'Itochu',             sector:'Trading',       mktcap:'$68B',  note:'Diversified trading company' },
  { us:'RCRUY', jp:'6098', name:'Recruit Holdings',   sector:'HR/Tech',       mktcap:'$78B',  note:'HR services (Indeed parent)' },
  { us:'PCRFY', jp:'6752', name:'Panasonic',          sector:'Electronics',   mktcap:'$19B',  note:'Electronics & batteries' },
]

export default function MarketRank() {
  const [modalStock,  setModalStock]  = useState(null)
  const [period,      setPeriod]      = useState('1mo')
  const [summary,     setSummary]     = useState(null)
  const [groups,      setGroups]      = useState({})
  const [activeGroup, setActiveGroup] = useState('国内主要株')
  const [activeSeg,   setActiveSeg]   = useState(null)
  const [detail,      setDetail]      = useState(null)
  // ETF専用状態
  const [etfDetail,   setEtfDetail]   = useState(null)
  const [etfLoading,  setEtfLoading]  = useState(false)

  const { data: marketData, loading: loadingS } = useMarketRankList(period)

  useEffect(()=>{
    if (!marketData) return
    setSummary(marketData.data)
    // ①「ETF」グループをmarket.jsonの外でフロント側に追加
    const baseGroups = marketData.groups || {}
    
// ─── Japanese ADR Data (US-listed Japanese stocks) ───────────────────────────

const allGroups = {
    'ADR': ['Japan ADR (US-Listed)'],
      ...baseGroups,
      'ETF': Object.keys(ETF_GROUPS),
    }
    setGroups(allGroups)
    const firstSeg = (baseGroups['国内主要株'] || Object.values(baseGroups)[0] || [])[0]
    if (firstSeg && !activeSeg) setActiveSeg(firstSeg)
  },[marketData])

  // activeSeg変更時は即detailをリセット（古いデータ残存防止）
  useEffect(()=>{ setDetail(null); setEtfDetail(null) }, [activeSeg, period])

  // ── ADR: fetch real market data for ADR stocks ──
  useEffect(() => {
    if (activeGroup !== 'ADR' || !activeSeg) return
    setDetail(null)
    const adrCodes = new Set(ADR_STOCKS.map(s => s.jp))
    const fetchADR = async () => {
      try {
        const segs = ['国内主要株（上位50）','国内主要株（51-100）','国内主要株（101-150）']
        const results = await Promise.allSettled(
          segs.map(seg =>
            fetch(API_BASE + '/api/market-rank/' + encodeURIComponent(seg) + '?period=' + period)
              .then(r => r.json())
          )
        )
        let allStocks = []
        results.forEach(r => {
          if (r.status === 'fulfilled' && Array.isArray(r.value))
            allStocks = allStocks.concat(r.value)
        })
        const adrStocks = allStocks
          .filter(s => adrCodes.has(String(s.ticker||'').replace('.T','')))
          .map(s => ({
            ...s,
            name: getStockName(s.name, s.ticker) + (ADR_STOCKS.find(a=>a.jp===String(s.ticker||'').replace('.T',''))?` (${ADR_STOCKS.find(a=>a.jp===String(s.ticker||'').replace('.T','')).us})`:''),
            adr_us: (ADR_STOCKS.find(a => a.jp === String(s.ticker||'').replace('.T',''))||{}).us || '',
          }))
        const avg = adrStocks.length > 0
          ? adrStocks.reduce((sum,s) => sum + (s.pct||0), 0) / adrStocks.length : 0
        setDetail({ stocks: adrStocks, avg })
      } catch(e) {
        console.error('ADR fetch error:', e)
        setDetail({ stocks: [], avg: 0 })
      }
    }
    fetchADR()
  }, [activeGroup, activeSeg, period])


  // ETFグループ選択時はyfinanceからリアルタイム取得
  // ① ETFグループ選択時 → market.json → Render API → プレースホルダーの順でフォールバック
  useEffect(() => {
    if (activeGroup !== 'ETF' || !activeSeg) return
    const tickerMap = ETF_GROUPS[activeSeg]
    if (!tickerMap) return
    setEtfLoading(true)
    setEtfDetail(null)
    const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'
    ;(async () => {
      // Step1: market.jsonのseg_キーを確認（GitHub Actions実行後に反映）
      try {
        const mj = await fetch('/data/market.json?t=' + Date.now()).then(r=>r.json())
        const key = 'seg_' + activeSeg + '_' + period
        if (mj[key]) {
          const raw = mj[key]
          const ss = Array.isArray(raw) ? raw : (raw.stocks ?? [])
          if (ss.length > 0) {
            const avg = ss.reduce((s,x)=>s+(x.pct??0),0)/ss.length
            setEtfDetail({ stocks: ss.map(s=>({...s,name:getStockName(s.name,s.ticker)})), avg })
            setEtfLoading(false); return
          }
        }
      } catch {}
      // Step2: Render APIの /api/market-rank/{seg_name}
      try {
        const r = await fetch(API_BASE + '/api/market-rank/' + encodeURIComponent(activeSeg) + '?period=' + period)
        if (r.ok) {
          const json = await r.json()
          const ss = Array.isArray(json) ? json : (json.data ?? json.stocks ?? [])
          if (ss.length > 0) {
            const enriched = ss.map(s => ({
              ...s, name: tickerMap[s.ticker?.replace('.T','')] || s.name || s.ticker,
            }))
            setEtfDetail({ stocks: enriched, avg: enriched.reduce((s,x)=>s+(x.pct??0),0)/enriched.length })
            setEtfLoading(false); return
          }
        }
      } catch {}
      // Step3: APIも失敗 → 銘柄名だけ表示
      const placeholders = Object.entries(tickerMap).map(([code, name]) => ({
        ticker: code+'.T', name, price:0, pct:0, volume:0, trade_value:0,
        volume_chg:0, market_cap:0, spark:[], contribution:null, vol_rank:0, tv_rank:0, _noData:true,
      }))
      setEtfDetail({ stocks: placeholders, avg: 0, _noData: true })
      setEtfLoading(false)
    })()
  }, [activeSeg, activeGroup, period])

  // ETFグループ以外のセグメント詳細取得
  const segNameForHook = activeGroup !== 'ETF' ? activeSeg : null
  const { data: segDetailRaw, loading: loadingD } = useSegmentDetail(segNameForHook, period)
  useEffect(()=>{
    if (!segDetailRaw) { setDetail(null); return }
    if (Array.isArray(segDetailRaw)) {
      setDetail({ stocks: segDetailRaw.map(s=>({...s,name:getStockName(s.name,s.ticker)})), avg: segDetailRaw.length ? segDetailRaw.reduce((s,x)=>s+x.pct,0)/segDetailRaw.length : 0 })
    } else {
      setDetail(segDetailRaw)
    }
  },[segDetailRaw])

  const pctColor = (v) => v>=0 ? 'var(--red)' : 'var(--green)'
  // ETFグループ時はetfDetailを使用
  const currentDetail = activeGroup === 'ETF' ? etfDetail : detail
  const isLoading = activeGroup === 'ETF' ? etfLoading : loadingD
  const rawStocks = currentDetail?.stocks ?? []
  const volSorted = [...rawStocks].sort((a,b) => (b.volume||0)-(a.volume||0))
  const tvSorted  = [...rawStocks].sort((a,b) => (b.trade_value||0)-(a.trade_value||0))
  const volRankMap = new Map(volSorted.map((s,i) => [s.ticker, i+1]))
  const tvRankMap  = new Map(tvSorted.map((s,i) => [s.ticker, i+1]))
  // ①国内全般は時価総額降順、ETFは騰落率降順、その他は騰落率降順
  const mappedStocks = rawStocks.map(s => ({
    ...s,
    name: getStockName(s.name, s.ticker),
    vol_rank: volRankMap.get(s.ticker) ?? s.vol_rank,
    tv_rank:  tvRankMap.get(s.ticker)  ?? s.tv_rank,
  }))
  const stocks = activeGroup === '国内全般'
    ? [...mappedStocks].sort((a,b) => (b.market_cap||0) - (a.market_cap||0))
    : [...mappedStocks].sort((a,b) => b.pct - a.pct)
  const detailAvg = currentDetail?.avg ?? 0
  const top5      = stocks.filter(s => s.pct > 0).slice(0, 5)
  const bot5      = [...stocks].sort((a,b) => a.pct - b.pct).filter(s => s.pct < 0).slice(0, 5)

  return (
    <div>
      {modalStock && (
        <AddToThemeModal stock={modalStock} onClose={() => setModalStock(null)} />
      )}

      <div className="page-header-sticky">
        <h1 style={{ fontSize:'18px', fontWeight:700, color:'var(--text)', whiteSpace:'nowrap' }}>Market Detail</h1>
        <select value={period} onChange={e=>setPeriod(e.target.value)} style={selStyle}>
          {PERIODS.map(p=><option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
      </div>

      <div style={{ padding:'12px 12px 48px', maxWidth:'1280px', margin:'0 auto' }} className="mr-page-body">
        <div style={{ background:'rgba(6,214,160,0.05)', border:'1px solid rgba(6,214,160,0.15)',
          borderRadius:'8px', padding:'12px 16px', marginBottom:'16px', fontSize:'12px',
          color:'var(--text)', lineHeight:1.8 }}>
          <span style={{ fontWeight:700, color:'#06d6a0' }}>📋 About this page:</span>
          For Top 150 by Mkt Cap, Market Segments (Prime/Standard/Growth), and ETFs (6 categories):
          View constituent stock Return rankings and detailed data.
          Use the tabs above to switch groups, then select a segment.
          <br/>
          <span style={{ fontSize:'11px', color:'var(--text3)' }}>
            Tip: When Technology is strong, also check Semiconductor and AI themes
            in Theme List for better capital flow insights.
          </span>
        </div>

        <div style={{ display:'flex', gap:'4px', borderBottom:'1px solid var(--border)', marginBottom:'0' }}>
          {Object.keys(groups).map(g=>(
            <button key={g} onClick={()=>{ setActiveGroup(g); setActiveSeg(groups[g][0]) }} style={{
              padding:'8px 16px', fontSize:'13px', cursor:'pointer', border:'none', background:'transparent',
              color: activeGroup===g ? 'var(--text)' : 'var(--text3)',
              fontWeight: activeGroup===g ? 700 : 400,
              fontFamily:'var(--font)',
              borderBottom: activeGroup===g ? '2px solid var(--accent)' : '2px solid transparent',
              marginBottom:'-1px', transition:'all 0.15s',
            }}>{gl(g)}</button>
          ))}
        </div>

        {loadingS ? <Loading /> : (
          <div>
            <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', padding:'12px 0', borderBottom:'1px solid var(--border)', marginBottom:'20px' }}>
              {(groups[activeGroup]||[]).map(seg=>{
                const avg = summary?.[seg]?.pct
                const rawShort = seg.split('｜')[1] || seg.split('（')[0]
                const shortName = strans(rawShort) || strans(seg) || rawShort
                return (
                  <button key={seg} onClick={()=>setActiveSeg(seg)} style={{
                    padding:'6px 14px', borderRadius:'6px', fontSize:'12px', cursor:'pointer',
                    border:`1px solid ${activeSeg===seg?'var(--accent)':'var(--border)'}`,
                    background: activeSeg===seg?'rgba(91,156,246,0.12)':'transparent',
                    color: activeSeg===seg?'var(--accent)':'var(--text2)',
                    fontFamily:'var(--font)', transition:'all 0.15s', whiteSpace:'nowrap',
                  }}>
                    {shortName}
                    {avg!=null && (
                      <span style={{ marginLeft:'6px', fontSize:'11px', fontFamily:'var(--mono)',
                        color:avg>=0?'var(--red)':'var(--green)', fontWeight:700 }}>
                        {avg>=0?'+':''}{avg.toFixed(1)}%
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {isLoading ? (
              <Loading msg="Loading..." />
            ) : currentDetail ? (
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:'16px', marginBottom:'20px', flexWrap:'wrap' }}>
                  <span style={{ fontSize:'16px', fontWeight:700, color:'var(--text)' }}>{activeSeg ? strans(activeSeg.split('｜')[1] || activeSeg) : ''}</span>
                  <span style={{ fontSize:'15px', fontFamily:'var(--mono)', fontWeight:700,
                    color:detailAvg>=0?'var(--red)':'var(--green)' }}>
                    Avg {detailAvg>=0?'+':''}{detailAvg.toFixed(1)}%
                  </span>
                  <span style={{ fontSize:'12px', color:'var(--text3)' }}>{stocks.length} stocks</span>
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'20px' }} className="top5g">
                  <Top5Bar items={top5} title={`▲ Rising TOP5 (${stocks.filter(s=>s.pct>0).length} stocks)`} colorFn={pctColor} emptyMsg="No rising stocks"/>
                  <Top5Bar items={bot5} title={`▼ Falling TOP5 (${stocks.filter(s=>s.pct<0).length} stocks)`} colorFn={pctColor} emptyMsg="No falling stocks"/>
                </div>

                {/* ③ 注目銘柄ピックアップ */}
                <PickupStocks stocks={stocks} period={period} />

                {/* ① テーマ別詳細と同じレイアウト: 左=グラフ群 / 右=銘柄表 */}
                <div className="mr-bottom-grid">
                  {/* 左: 出来高グラフ → ヒートマップ */}
                  <div>
                    <div style={{ fontSize:'13px', fontWeight:700, color:'var(--text)', marginBottom:'10px' }}>
                      📊 Volume & Trade Value (Top 15)
                    </div>
                    <MrVolTvChart stocks={stocks} />
                    <div style={{ fontSize:'13px', fontWeight:700, color:'var(--text)', margin:'20px 0 10px' }}>
                      🔥 Stock Heatmap
                    </div>
                    <MrBubbleChart stocks={stocks} />
                  </div>
                  {/* 右: 銘柄詳細表 */}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.1em', color:'var(--text3)', textTransform:'uppercase', marginBottom:'8px' }}>
      
              {activeGroup === 'ADR' && (
                <div style={{ padding:'12px 16px', background:'rgba(74,158,255,0.06)',
                  border:'1px solid rgba(74,158,255,0.18)', borderRadius:'10px',
                  fontSize:'12px', color:'var(--text2)', lineHeight:1.8, marginBottom:'14px' }}>
                  <strong style={{ color:'var(--accent)' }}>💡 Japan ADR — US-Listed Japanese Stocks</strong><br/>
                  ADRs let you invest in major Japanese companies on NYSE/Nasdaq in USD.
                  This view shows real-time JP stock performance for ADR-available stocks.
                  Prices here are from Tokyo Stock Exchange; ADR prices in USD will differ due to FX conversion.
                </div>
              )}
                {activeGroup === 'ADR' ? 'Japan ADR Stocks' : 'Constituent Stocks'} <span style={{ color:'var(--text3)', fontSize:'10px', fontWeight:400 }}>← Swipe for details</span>
                    </div>
                    <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', overflow:'hidden' }}>
                      <StockTable stocks={stocks} onAddToTheme={setModalStock} />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width:640px){.top5g{grid-template-columns:1fr !important;}}
        /* Mobile padding */
        .mr-page-body { padding: 10px 12px 40px !important; }
        @media (min-width: 641px) {
          .mr-page-body { padding: 20px 32px 48px !important; }
        }
        .mr-bottom-grid {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 16px;
        }
        @media (min-width: 641px) {
          .mr-bottom-grid {
            grid-template-columns: 1fr 1fr !important;
            align-items: start !important;
          }
          .mr-bottom-grid > div {
            min-width: 0;
          }
        }
        /* Mobile align */
        @media (max-width: 640px) {
          .mr-bottom-grid { padding: 0 !important; }
        }
        /* Mobile overflow */
        @media (max-width: 640px) {
          .mr-page-body .sticky-table { max-width: calc(100vw - 20px); }
          .mr-page-body svg { max-width: 100%; }
        }
      `}</style>
    </div>
  )
}

const selStyle = {
  background:'var(--bg3)', color:'var(--text)',
  border:'1px solid var(--border)', borderRadius:'6px',
  fontFamily:'var(--font)', fontSize:'13px',
  padding:'6px 12px', cursor:'pointer', outline:'none',
}
