import React, { useState, useEffect, useRef } from 'react'
import AddToThemeModal from '../AddToThemeModal.jsx'
import StockBubbleChart from '../StockBubbleChart.jsx'
import { useSegmentDetail, useMarketRankList } from '../../hooks/useMarketData.js'

// === Segment name translation ===
const SEG_NAME_EN = {
  // Market cap groups
  '時価総額上位50':'Top 50 by Mkt Cap','上位51-100位':'Rank 51-100','上位101-150位':'Rank 101-150',
  '国内主要株（上位50）':'Major (Top 50)','国内主要株（51-100）':'Major (51-100)',
  '国内主要株（101-150）':'Major (101-150)',
  // Market segments
  'プライム市場':'Prime Market','プライム市場（大型株）':'Prime (Large)',
  'プライム市場（中型株）':'Prime (Mid)','プライム市場（小型株）':'Prime (Small)',
  'スタンダード市場':'Standard Market','グロース市場':'Growth Market',
  'プライム':'Prime','スタンダード':'Standard','グロース':'Growth',
  '大型株':'Large Cap','中型株':'Mid Cap','小型株':'Small Cap',
  // Industry sectors
  '電機・精密':'Electronics','情報通信':'Info & Telecom','輸送用機器':'Transport Equip',
  '機械':'Machinery','医薬品':'Pharma','化学':'Chemicals','素材':'Materials',
  '鉄鋼':'Steel','食品':'Food','小売':'Retail','建設':'Construction',
  '不動産':'Real Estate','金融':'Finance','保険':'Insurance','銀行':'Banking',
  '証券':'Securities','エネルギー':'Energy','サービス':'Services',
  '運輸':'Transportation','通信':'Telecom','陸運':'Land Transport',
  '空運':'Air Transport','海運':'Shipping','倉庫':'Warehousing',
  '非鉄金属':'Nonferrous Metals','ガラス・土石':'Glass & Ceramics',
  'ゴム':'Rubber','繊維':'Textiles','パルプ・紙':'Pulp & Paper',
  '卸売':'Wholesale','水産・農林':'Fishery & Forestry','鉱業':'Mining',
  '石油・石炭':'Oil & Coal','電気・ガス':'Electric & Gas',
  '技術':'Technology','消費':'Consumer','ディフェンシブ':'Defensive',
  '景気敏感':'Cyclical','国内主要株':'Major Stocks','国内全般':'Domestic All',
  '市場区分':'Market Segment',
  // ETF
  'ETF｜国内株式インデックス':'ETF | Domestic Index',
  'ETF｜国内株式テーマ':'ETF | Domestic Theme',
  'ETF｜海外株式・先進国':'ETF | Global Developed',
  'ETF｜新興国・アジア':'ETF | Emerging & Asia',
  'ETF｜債券・コモディティ':'ETF | Bond & Commodity',
  'ETF｜レバレッジ・インバース':'ETF | Leveraged & Inverse',
}
const strans = (name) => SEG_NAME_EN[name] || name


// === Stock name translation (auto-generated from stock_index.json, 400 stocks) ===
const TICKER_TO_EN = {'1379':'ホクト','1407':'ウエストHD','1414':'ショーボンドHD','1605':'INPEX','1662':'石油資源開発','166A':'アクセルスペースHD','1720':'東急建設','1801':'Taisei','1802':'Obayashi','1803':'Shimizu','1808':'長谷工コーポレーション','1812':'Kajima','1815':'鉄建建設','1820':'西松建設','1860':'戸田建設','1861':'熊谷組','186A':'Astroscale','1878':'大東建託','1893':'五洋建設','1911':'住友林業','1925':'Daiwa House','1928':'Sekisui House','2124':'ジェイエイシーリクルートメント','2146':'UTグループ','2181':'パーソルHD','2206':'Ezaki Glico','2212':'山崎製パン','2269':'Meiji HD','2270':'Megmilk Snow Brand','2282':'NH Foods','2326':'デジタルアーツ','2331':'綜合警備保障（ALSOK）','2393':'日本ケアサプライ','2413':'エムスリー','2432':'DeNA','2492':'インフォマート','2502':'Asahi Group HD','2503':'Kirin HD','2587':'サントリー食品','2593':'Ito En','2602':'日清オイリオグループ','2664':'カワチ薬品','2674':'ハードオフコーポレーション','2678':'アスクル','2681':'ゲオHD','2780':'コメ兵HD','278A':'テラドローン','2796':'ファルマライズHD','2802':'Ajinomoto','2810':'ハウス食品','2811':'Kagome','285A':'キオクシアHD','2871':'ニチレイ','2897':'Nissin Food HD','3003':'ヒューリック','3088':'Matsukiyo Kokkomin HD','3092':'ZOZO','3093':'トレジャー・ファクトリー','3099':'三越伊勢丹HD','3110':'日東紡績','3132':'Macnica Holdings','3148':'クリエイトSDホールディングス','3231':'野村不動産HD','3283':'日本プロロジスリート投資法人','3289':'東急不動産HD','3349':'コスモス薬品','3382':'Seven & i','3391':'Tsuruha HD','3402':'Toray','3407':'Asahi Kasei','3436':'SUMCO','3494':'ウルトラファブリクス','3549':'クスリのアオキHD','3626':'TIS','3632':'グリー','3635':'コーエーテクモ','3659':'ネクソン','3662':'エイチーム','3692':'FFRIセキュリティ','3765':'Gungho','3769':'GMO PG','3774':'インターネットイニシアティブ','3778':'さくらインターネット','3807':'フィスコ','3861':'王子HD','3880':'大王製紙','3923':'ラクス','3932':'アカツキ','3984':'ユーザーローカル','3993':'PKSHA Technology','3994':'Money Forward','4004':'レゾナック','4005':'住友化学','4023':'クレハ','4028':'石原産業','4042':'東ソー','4047':'関東電化工業','4053':'freee','4063':'Shin-Etsu Chem','4088':'エア・ウォーター','4091':'大陽日酸','4109':'ステラケミファ','4118':'カネカ','4165':'プレイド','4186':'東京応化工業','4187':'大阪有機化学工業','4188':'三菱ケミカルグループ','4202':'ダイセル','4204':'積水化学工業','4205':'日本ゼオン','4208':'宇部興産','4259':'エクサウィザーズ','4307':'野村総合研究所','4385':'Mercari','4417':'グローバルセキュリティエキスパート','4443':'Sansan','4448':'Chatwork','4452':'花王','4477':'BASE','4480':'メドレー','4483':'JMDC','4488':'AI inside','4493':'サイバーセキュリティクラウド','4502':'武田薬品','4503':'Astellas','4507':'Shionogi','4516':'日本新薬','4519':'Chugai','4523':'Eisai','4528':'小野薬品','4530':'Hisamitsu Pharma','4534':'Mochida Pharma','4536':'Santen Pharma','4540':'ツムラ','4543':'Terumo','4565':'そーせいグループ','4568':'Daiichi Sankyo','4571':'ナノキャリア','4578':'大塚HD','4587':'ペプチドリーム','4612':'日本ペイントHD','4613':'関西ペイント','4616':'神東塗料','4617':'中国塗料','4619':'日本特殊塗料','4631':'DIC','4634':'東洋インキSCHD','4661':'オリエンタルランド','4667':'アイサンテクノロジー','4681':'リゾートトラスト','4684':'オービック','4689':'LINE（LINEヤフー）','4704':'トレンドマイクロ','4751':'サイバーエージェント','4755':'楽天グループ','4819':'デジタルガレージ','4848':'フルキャストHD','4849':'エン・ジャパン','4884':'クリングルファーマ','4901':'Fujifilm HD','4996':'クミアイ化学工業','4997':'日本農薬','5019':'Idemitsu','5020':'ENEOS HD','5021':'コスモエネルギーHD','5076':'テス・エンジニアリング','5201':'AGC','5202':'日本板硝子','5214':'日本電気硝子','5232':'住友大阪セメント','5233':'太平洋セメント','5269':'日本コンクリート工業','5332':'TOTO','5384':'フジミインコーポレーテッド','5393':'ニチアス','5401':'Nippon Steel','5406':'神戸製鋼所','5411':'JFE Holdings','5423':'東京製鐵','5444':'大和工業','5480':'日本冶金工業','5703':'日本軽金属HD','5706':'三井金属','5713':'Sumitomo Metal Mining','5714':'DOWA HD','5726':'大阪チタニウムテクノロジーズ','5727':'東邦チタニウム','5741':'UACJ','5801':'Furukawa Electric','5802':'Sumitomo Electric','5803':'フジクラ','5938':'LIXIL','6016':'ジャパンエンジンコーポレーション','6098':'リクルートHD','6135':'牧野フライス製作所','6141':'DMG森精機','6146':'Disco','6197':'ソラスト','6201':'Toyota Industries','6203':'豊和工業','6232':'ACSL','6257':'栗田工業','6268':'ナブテスコ','6273':'SMC','6301':'Komatsu','6302':'Sumitomo Heavy','6310':'井関農機','6326':'クボタ','6332':'月島ホールディングス','6361':'荏原製作所','6367':'ダイキン工業','6460':'セガサミー','6473':'ジェイテクト','6474':'不二越','6481':'THK','6501':'Hitachi','6503':'Mitsubishi Elec','6504':'富士電機','6506':'Yaskawa','6526':'Socionext','6547':'PHCホールディングス','6590':'芝浦メカトロニクス','6622':'ダイヘン','6627':'テラプローブ','6645':'Omron','6656':'エスペック','6666':'リバーエレテック','6674':'GSユアサ','6701':'NEC','6702':'Fujitsu','6707':'サンケン電気','6723':'Renesas','6752':'パナソニック','6753':'シャープ','6758':'Sony Group','6762':'TDK','6770':'Alps Alpine','6810':'マクセル','6844':'新電元工業','6857':'Advantest','6861':'Keyence','6866':'ヒオキ電機','6869':'シスメックス','6871':'マイクロニクス','6890':'フェローテック','6902':'Denso','6920':'Lasertec','6941':'山一電機','6951':'日本電子','6952':'カシオ計算機','6954':'Fanuc','6963':'Rohm','6965':'浜松ホトニクス','6971':'Kyocera','6981':'Murata Mfg','6988':'日東電工','6996':'ニチコン','7003':'Mitsui E&S','7004':'日立造船','7011':'Mitsubishi Heavy','7012':'Kawasaki HI','7013':'IHI','7014':'名村造船所','7022':'サノヤスHD','7030':'新来島どっく','7181':'Japan Post Insurance','7182':'ゆうちょ銀行','7186':'コンコルディアFG','7201':'Nissan','7203':'Toyota Motor','7211':'三菱自動車','7259':'Aisin','7261':'Mazda Motor','7267':'本田技研工業','7270':'Subaru Corp','7272':'Yamaha Motor','7383':'ネットプロテクションHD','7459':'Medipal HD','7532':'ドン・キホーテ（PPIH）','7649':'スギHD','7701':'島津製作所','7729':'東京精密','7731':'Nikon','7733':'オリンパス','7735':'SCREEN HD','7739':'キヤノン電子','7746':'岡本硝子','7751':'Canon','7762':'シチズン時計','7832':'バンダイナムコ','7833':'GMOフィナンシャルHD','7974':'Nintendo','8001':'Itochu','8002':'Marubeni','8031':'Mitsui & Co','8035':'Tokyo Electron','8050':'セイコーグループ','8053':'Sumitomo Corp','8056':'BIPROGY','8058':'Mitsubishi Corp','8086':'ニプロ','8088':'岩谷産業','8233':'高島屋','8267':'イオン（イオン銀行）','8304':'あおぞら銀行','8306':'三菱UFJ','8308':'りそな','8309':'三井住友トラストHD','8316':'三井住友','8331':'Chiba Bank','8336':'武蔵野銀行','8341':'Shichijushichi Bank','8346':'東邦銀行','8354':'ふくおかFG','8359':'八十二銀行','8366':'滋賀銀行','8377':'北陸銀行','8387':'四国銀行','8410':'セブン銀行','8411':'みずほ','8418':'山口FG','8473':'SBI HD','8515':'アイフル','8522':'名古屋銀行','8524':'Hokuyoh Bank','8591':'オリックス','8601':'Daiwa Securities','8604':'野村HD','8628':'松井証券','8630':'SOMPO HD','8698':'マネックスグループ','8725':'MS&AD','8750':'第一生命','8766':'Tokio Marine','8795':'T&Dホールディングス','8801':'Mitsui Fudosan','8802':'Mitsubishi Estate','8803':'平和不動産','8804':'東京建物','8830':'住友不動産','8848':'レオパレス21','9001':'Tobu Railway','9005':'Tokyu Corp','9020':'JR East','9024':'Seibu HD','9041':'Kintetsu Group','9042':'阪急阪神HD','9045':'Keihan HD','9064':'ヤマトHD','9067':'Suzuken','9069':'センコーグループHD','9101':'Nippon Yusen','9104':'Mitsui OSK','9107':'K Line','9119':'飯野海運','9143':'SG Holdings','9147':'NIPPON EXPRESSホールディングス','9171':'栗林商船','9201':'JAL','9202':'ANA HD','9233':'朝日航洋','9278':'ブックオフグループHD','9308':'乾汽船','9412':'スカパーJSATHD','9424':'日本通信','9432':'NTT','9433':'KDDI','9434':'SoftBank','9449':'GMOインターネット','9470':'学研HD','9474':'ゼンリン','9501':'TEPCO','9502':'Chubu Electric','9503':'Kansai Electric','9504':'中国電力','9505':'北陸電力','9506':'東北電力','9507':'四国電力','9508':'九州電力','9509':'北海道電力','9511':'沖縄電力','9513':'Jパワー','9517':'エネコーポレーション','9519':'レノバ','9531':'Tokyo Gas','9532':'Osaka Gas','9551':'メタウォーター','9603':'エイチ・アイ・エス','9627':'アインホールディングス','9684':'スクウェア・エニックス','9686':'東洋テック','9697':'カプコン','9708':'帝国ホテル','9722':'藤田観光','9735':'セコム','9766':'コナミ','9843':'Nitori HD','9983':'Fast Retailing','9984':'SoftBank Group','9989':'Sundrug'}
// Translate stock name by ticker code: "7203.T" → "Toyota Motor"
const getStockName = (name, ticker) => {
  if (!ticker) return name || ''
  const code = String(ticker).replace('.T', '')
  return TICKER_TO_EN[code] || name || code
}


export default function MarketRank({ onNavigate }) {
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
    // ①「ETF」グループをmarket.jsonの外でフロント側にAdd
    const baseGroups = marketData.groups || {}
    const allGroups = {
      ...baseGroups,
      'ETF': Object.keys(ETF_GROUPS),
    }
    setGroups(allGroups)
    const firstSeg = (baseGroups['国内主要株'] || Object.values(baseGroups)[0] || [])[0]
    if (firstSeg && !activeSeg) setActiveSeg(firstSeg)
  },[marketData])

  // activeSeg変更時は即detailをReset（古いデータ残存防止）
  useEffect(()=>{ setDetail(null); setEtfDetail(null) }, [activeSeg, period])

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
      // Step1: market.jsonのseg_キーをConfirm（GitHub Actions実行後に反映）
      try {
        const mj = await fetch('/data/market.json?t=' + Date.now()).then(r=>r.json())
        const key = 'seg_' + activeSeg + '_' + period
        if (mj[key]) {
          const raw = mj[key]
          const ss = Array.isArray(raw) ? raw : (raw.stocks ?? [])
          if (ss.length > 0) {
            const avg = ss.reduce((s,x)=>s+(x.pct??0),0)/ss.length
            setEtfDetail({ stocks: ss.map(s=>({...s, name: getStockName(s.name, s.ticker)})), avg })
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
              ...s, name: getStockName(s.name, s.ticker),
            }))
            setEtfDetail({ stocks: enriched, avg: enriched.reduce((s,x)=>s+(x.pct??0),0)/enriched.length })
            setEtfLoading(false); return
          }
        }
      } catch {}
      // Step3: APIも失敗 → Stock Nameだけ表示
      const placeholders = Object.entries(tickerMap).map(([code, rawName]) => ({
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
      const translated = segDetailRaw?.stocks ? {...segDetailRaw, stocks: segDetailRaw.stocks.map(s=>({...s,name:getStockName(s.name,s.ticker)}))} : segDetailRaw
      setDetail(translated)
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
  // ①国内全般はMarket CapDesc、ETFはReturnDesc、MoreはReturnDesc
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
        <h1 style={{ fontSize:'18px', fontWeight:700, color:'var(--text)', whiteSpace:'nowrap' }}>Market Ranking</h1>
        <select value={period} onChange={e=>setPeriod(e.target.value)} style={selStyle}>
          {PERIODS.map(p=><option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
      </div>

      <div style={{ padding:'12px 12px 48px', maxWidth:'1280px', margin:'0 auto' }} className="mr-page-body">
        <div style={{ background:'rgba(6,214,160,0.05)', border:'1px solid rgba(6,214,160,0.15)',
          borderRadius:'8px', padding:'12px 16px', marginBottom:'16px', fontSize:'12px',
          color:'var(--text)', lineHeight:1.8 }}>
          <span style={{ fontWeight:700, color:'#06d6a0' }}>📋 About This Page:</span>
            For Top 150 by Market Cap, Market Segments (Prime/Standard/Growth), and ETFs (6 categories):
            View constituent stock Return rankings and detailed data.
            Use the tabs above to switch between groups, then select a segment.
          <br/>
          <span style={{ fontSize:'11px', color:'var(--text3)' }}>
            💡 Tip: When 'Technology' is strong, also check Semiconductor and AI themes
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
              <Loading msg="Loading......" />
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
          <Top5Bar items={top5} title={`▲ Rising TOP5 (${stocks.filter(s=>s.pct>0).length} stocks)`} colorFn={pct => pct >= 0 ? 'var(--red)' : 'var(--green)'} />
          <Top5Bar items={bot5} title={`▼ Falling TOP5 (${stocks.filter(s=>s.pct<0).length} stocks)`} colorFn={pct => pct >= 0 ? 'var(--red)' : 'var(--green)'} />
                </div>

                {/* ③ Featured Stocks */}
                <PickupStocks stocks={stocks} period={period} />

                {/* ① Theme Detailと同じレイアウト: 左=グラフ群 / 右=銘柄表 */}
                <div className="mr-bottom-grid">
                  {/* 左: Volumeグラフ → Heatmap */}
                  <div>
                    <div style={{ fontSize:'13px', fontWeight:700, color:'var(--text)', marginBottom:'10px' }}>
                      📊 Volume & Trading Value (Top 15)
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
                      Constituent Stocks <span style={{ color:'var(--text3)', fontSize:'10px', fontWeight:400 }}>← Swipe for details</span>
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
        /* Mobile: align to TOP5 */
        @media (max-width: 640px) {
          .mr-bottom-grid { padding: 0 !important; }
        }
        /* Mobile: prevent overflow */
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
