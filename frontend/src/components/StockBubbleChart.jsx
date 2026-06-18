import { useState } from 'react'

// Stock name translation (ticker-based, 400 stocks)
const TICKER_TO_EN_B = {'1379':'Hokuto Corp','1407':'West Holdings','1414':'Shobond Holdings','1605':'INPEX Corp','1662':'Japan Petroleum Exploration','166A':'Axelspace Holdings','1720':'Tokyu Construction','1801':'Taisei Corp','1802':'Obayashi Corp','1803':'Shimizu Corp','1808':'Haseko Corp','1812':'Kajima Corp','1815':'Tekken Corp','1820':'Nishimatsu Construction','1860':'Toda Corp','1861':'Kumagai Gumi','186A':'Astroscale','1878':'Daito Trust Construction','1893':'Goyo Construction','1911':'Sumitomo Forestry','1925':'Daiwa House Industry','1928':'Sekisui House','2124':'JAC Recruitment','2146':'UT Group','2181':'Persol Holdings','2206':'Ezaki Glico','2212':'Yamazaki Baking','2269':'Meiji HD','2270':'Megmilk Snow Brand','2282':'NH Foods','2326':'Digital Arts','2331':'ALSOK (Sohgo Security)','2393':'Nihon Care Supply','2413':'M3 Inc','2432':'DeNA Co','2492':'Infomart Corp','2502':'Asahi Group HD','2503':'Kirin HD','2587':'Suntory BF','2593':'Ito En','2602':'Nisshin OilliO Group','2664':'Kawachi Pharmacy','2674':'Hard Off Corp','2678':'Askul Corp','2681':'Geo Holdings','2780':'Komehyo Holdings','278A':'Terra Drone','2796':'Pharmarise Holdings','2802':'Ajinomoto Co','2810':'House Foods Group','2811':'Kagome','285A':'Kioxia Holdings','2871':'Nichirei Corp','2897':'Nissin Foods Holdings','3003':'Hulic Co','3088':'Matsumoto Kiyoshi Holdings','3092':'ZOZO Inc','3093':'Treasure Factory','3099':'Isetan Mitsukoshi','3110':'Nitto Boseki','3132':'Macnica Holdings','3148':'Create SD Holdings','3231':'Nomura Real Estate Holdings','3283':'Nippon Prologis REIT','3289':'Tokyu Fudosan Holdings','3349':'COSMOS Pharmaceutical','3382':'Seven & i Holdings','3391':'Tsuruha Holdings','3402':'Toray Industries','3407':'Asahi Kasei','3436':'SUMCO Corp','3494':'Ultrafabrics Holdings','3549':'Kusuri no Aoki Holdings','3626':'TIS Inc','3632':'Gree Inc','3635':'Cygames (via DeNA)','3659':'Nexon Co','3662':'A-Team Inc','3692':'FFRI Security','3765':'Gungho','3769':'GMO Payment Gateway','3774':'Internet Initiative Japan','3778':'Sakura Internet','3807':'Fisco Ltd','3861':'Oji Holdings','3880':'Daio Paper Corp','3923':'Rakus Co','3932':'Akatsuki Inc','3984':'User Local Inc','3993':'PKSHA Technology','3994':'Money Forward','4004':'Showa Denko (Resonac)','4005':'Sumitomo Chemical','4023':'Kureha Corp','4028':'Ishihara Sangyo','4042':'Tosoh Corp','4047':'Kanto Denka Kogyo','4053':'freee','4063':'Shin-Etsu Chemical','4088':'Air Water','4091':'Nippon Sanso Holdings','4109':'Stella Chemifa','4118':'Kaneka Corp','4165':'Plaid Inc','4186':'Tokyo Ohka Kogyo','4187':'Osaka Organic Chemical','4188':'Mitsubishi Chemical Group','4202':'Daicel Corp','4204':'Sekisui Chemical','4205':'Zeon Corp','4208':'UBE Corp','4259':'ExaWizards Inc','4307':'Nomura Research Institute','4385':'Mercari Inc','4417':'Global Security Expert','4443':'Sansan','4448':'Chatwork','4452':'Kao Corp','4477':'BASE','4480':'Medley Inc','4483':'JMDC','4488':'AI inside','4493':'CyberSecurity Cloud','4502':'Takeda Pharmaceutical','4503':'Astellas Pharma','4507':'Shionogi & Co','4516':'Nippon Shinyaku','4519':'Chugai Pharmaceutical','4523':'Eisai Co','4528':'Ono Pharmaceutical','4530':'Hisamitsu Pharmaceutical','4534':'Mochida Pharma','4536':'Santen Pharma','4540':'Tsumura & Co','4543':'Terumo Corp','4565':'Sosei Group','4568':'Daiichi Sankyo','4571':'NanoCarrier Co','4578':'Otsuka Holdings','4587':'PeptiDream Inc','4612':'Nippon Paint Holdings','4613':'Kansai Paint','4616':'Shinto Paint','4617':'Chugoku Marine Paints','4619':'Nihon Tokushu Toryo','4631':'DIC Corp','4634':'Toyo Ink SC Holdings','4661':'Oriental Land (Disney)','4667':'Aisan Technology','4681':'Resort Trust','4684':'Obic Co','4689':'LY Corp (LINE Yahoo)','4704':'Trend Micro','4751':'CyberAgent','4755':'Rakuten Group','4819':'Digital Garage','4848':'Fullcast Holdings','4849':'en Japan Inc','4884':'Kringle Pharma','4901':'Fujifilm Holdings','4996':'Kumiai Chemical Industry','4997':'Nihon Nohyaku','5019':'Idemitsu Kosan','5020':'ENEOS Holdings','5021':'Cosmo Energy Holdings','5076':'Tes Engineering','5201':'AGC Inc','5202':'Nippon Sheet Glass','5214':'Nippon Electric Glass','5232':'Sumitomo Osaka Cement','5233':'Taiheiyo Cement','5269':'Nippon Concrete Industries','5332':'TOTO Ltd','5384':'Fujimi Inc','5393':'Nichias Corp','5401':'Nippon Steel','5406':'Kobe Steel','5411':'JFE Holdings','5423':'Tokyo Steel Manufacturing','5444':'Yamato Kogyo','5480':'Nihon Yakin Kogyo','5703':'Nippon Light Metal Holdings','5706':'Mitsui Mining & Smelting','5713':'Sumitomo Metal Mining','5714':'DOWA Holdings','5726':'Osaka Titanium Technologies','5727':'Toho Titanium','5741':'UACJ Corp','5801':'Furukawa Electric','5802':'Sumitomo Electric','5803':'Fujikura Ltd','5938':'LIXIL Group','6016':'Japan Engine Corp','6098':'Recruit Holdings','6135':'Makino Milling Machine','6141':'DMG Mori Co','6146':'DISCO Corp','6197':'Solasto Corp','6201':'Toyota Industries','6203':'Howa Machinery','6232':'ACSL','6257':'Kurita Water Industries','6268':'Nabtesco Corp','6273':'SMC Corp','6301':'Komatsu Ltd','6302':'Sumitomo Heavy Industries','6310':'Iseki & Co','6326':'Kubota Corp','6332':'Tsukishima Holdings','6361':'Ebara Corp','6367':'Daikin Industries','6460':'Sega Sammy Holdings','6473':'JTEKT Corp','6474':'Nachi-Fujikoshi','6481':'THK','6501':'Hitachi Ltd','6503':'Mitsubishi Electric','6504':'Fuji Electric','6506':'Yaskawa Electric','6526':'Socionext','6547':'PHC Holdings','6590':'Shibaura Mechatronics','6622':'Daihen Corp','6627':'TeraPower (TeraProbe)','6645':'Omron Corp','6656':'ESPEC Corp','6666':'River Eletec','6674':'GS Yuasa Corp','6701':'NEC Corp','6702':'Fujitsu Ltd','6707':'Sanken Electric','6723':'Renesas Electronics','6752':'Panasonic Holdings','6753':'Sharp Corp','6758':'Sony Group','6762':'TDK Corp','6770':'Alps Alpine','6810':'Maxell Ltd','6844':'Shindengen Electric','6857':'Advantest Corp','6861':'Keyence Corp','6866':'Hioki E.E.','6869':'Sysmex Corp','6871':'Micronics Japan','6890':'Ferrotec Holdings','6902':'Denso Corp','6920':'Lasertec Corp','6941':'Yamaichi Electronics','6951':'JEOL Ltd','6952':'Casio Computer','6954':'Fanuc Corp','6963':'Rohm Co','6965':'Hamamatsu Photonics','6971':'Kyocera Corp','6981':'Murata Manufacturing','6988':'Nitto Denko','6996':'Nichicon Corp','7003':'Mitsui E&S','7004':'Hitachi Zosen','7011':'Mitsubishi Heavy Industries','7012':'Kawasaki Heavy Industries','7013':'IHI Corp','7014':'Namura Shipbuilding','7022':'Sanoyas Holdings','7030':'Shin Kurushima Dockyard','7181':'Japan Post Insurance','7182':'Japan Post Bank','7186':'Concordia FG','7201':'Nissan Motor','7203':'Toyota Motor','7211':'Mitsubishi Motors','7259':'Aisin','7261':'Mazda Motor','7267':'Honda Motor','7270':'Subaru Corp','7272':'Yamaha Motor','7383':'Net Protections Holdings','7459':'MediaDo Holdings','7532':'Pan Pacific Intl (Don Quijote)','7649':'Sugi Holdings','7701':'Shimadzu Corp','7729':'Tokyo Seimitsu','7731':'Nikon','7733':'Olympus Corp','7735':'SCREEN HD','7739':'Canon Electronics','7746':'Okamoto Glass','7751':'Canon Inc','7762':'Citizen Watch','7832':'Bandai Namco','7833':'GMO Financial Holdings','7974':'Nintendo','8001':'Itochu Corp','8002':'Marubeni Corp','8031':'Mitsui & Co','8035':'Tokyo Electron','8050':'Seiko Group Corp','8053':'Sumitomo Corp','8056':'BIPROGY','8058':'Mitsubishi Corp','8086':'Nipro Corp','8088':'Iwatani Corp','8233':'Takashimaya Co','8267':'Aeon Co','8304':'Aozora Bank','8306':'MUFG','8308':'Resona Holdings','8309':'Sumitomo Mitsui Trust','8316':'SMFG','8331':'Chiba Bank','8336':'Musashino Bank','8341':'Shichijushichi Bank','8346':'Toho Bank','8354':'Fukuoka Financial Group','8359':'Hachijuni Bank','8366':'Shiga Bank','8377':'Hokuriku Financial Group','8387':'Shikoku Bank','8410':'Moneytree','8411':'Mizuho Financial Group','8418':'Yamaguchi Financial Group','8473':'SBI Holdings','8515':'Aiful Corp','8522':'Nagoya Bank','8524':'Hokuyoh Bank','8591':'Orix Corp','8601':'Daiwa Securities','8604':'Nomura Holdings','8628':'Matsui Securities','8630':'SOMPO Holdings','8698':'Monex Group','8725':'MS&AD Insurance','8750':'Dai-ichi Life Holdings','8766':'Tokio Marine Holdings','8795':'T&D Holdings','8801':'Mitsui Fudosan','8802':'Mitsubishi Estate','8803':'Heiwa Real Estate','8804':'Tokyo Tatemono','8830':'Sumitomo Realty & Development','8848':'Leopalace21','9001':'Tobu Railway','9005':'Tokyu Corp','9020':'JR East','9024':'Seibu Holdings','9041':'Kintetsu Group Holdings','9042':'Hankyu Hanshin Holdings','9045':'Keihan HD','9064':'Yamato Holdings','9067':'Suzuken','9069':'Senko Group Holdings','9101':'Nippon Yusen (NYK Line)','9104':'Mitsui O.S.K. Lines','9107':'Kawasaki Kisen (K Line)','9119':'Iino Kaiun Kaisha','9143':'SG Holdings','9147':'Nippon Express Holdings','9171':'Kuribayashi Steamship','9201':'Japan Airlines','9202':'ANA Holdings','9233':'Asahi Koyo','9278':'BookOff Group Holdings','9308':'Inui Steamship','9412':'SKY Perfect JSAT','9424':'Nihon Tsushin','9432':'NTT Corp','9433':'KDDI Corp','9434':'SoftBank (Telecom)','9449':'GMO Internet Group','9470':'Gakken Holdings','9474':'Zenrin Co','9501':'Tokyo Electric Power','9502':'Chubu Electric Power','9503':'Kansai Electric Power','9504':'Chugoku Electric Power','9505':'Hokuriku Electric Power','9506':'Tohoku Electric Power','9507':'Shikoku Electric Power','9508':'Kyushu Electric Power','9509':'Hokkaido Electric Power','9511':'Okinawa Electric Power','9513':'J-Power','9517':'Erex Co','9519':'Renova Inc','9531':'Tokyo Gas','9532':'Osaka Gas','9551':'MetaWater Co','9603':'H.I.S. Co','9627':'Ain Holdings','9684':'Square Enix','9686':'Toyo Tec','9697':'Capcom Co','9708':'Imperial Hotel','9722':'Fujita Kanko','9735':'Secom Co','9766':'Konami Group','9843':'Nitori Holdings','9983':'Fast Retailing (Uniqlo)','9984':'SoftBank Group','9989':'Sundrug'}
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
  const yLabel = hasVol ? 'Volume Change (%)' : 'Price Change % x0.5 (Volume data pending)'

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
    if (tv >= 1e8) return (tv/1e8).toFixed(0) + 'B'
    if (tv >= 1e4) return (tv/1e4).toFixed(0) + 'K'
    return tv.toLocaleString()
  }

  // X axis ticks
  const xTicks = []
  const xStep = Math.ceil((xMax - xMin) / 6) || 1
  for (let v = Math.ceil(xMin); v <= xMax; v += xStep) xTicks.push(v)
  const yTicks = []
  const yStep = Math.ceil((yMax - yMin) / 5) || 1
  for (let v = Math.ceil(yMin / yStep) * yStep; v <= yMax; v += yStep) yTicks.push(v)

  return (
    <div>
      <div style={{ fontSize:'10px', color:'var(--text3)', marginBottom:'6px' }}>
        X=Price Change % / Y={yLabel} / Bubble Size=Trade Value
      </div>
      <div style={{ width:'100%', overflowX:'auto', WebkitOverflowScrolling:'touch' }}>
        <svg viewBox={`0 0 ${W} ${H}`}
          style={{ width:'100%', minWidth:'360px', display:'block',
            background:'var(--bg2)', borderRadius:'10px', border:'1px solid var(--border)' }}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Zone backgrounds */}
          <rect x={x0} y={PT} width={PL+GW-x0} height={y0-PT} fill="rgba(255,83,112,0.06)" />
          <rect x={PL} y={PT} width={x0-PL} height={y0-PT} fill="rgba(0,196,140,0.05)" />
          <rect x={x0} y={y0} width={PL+GW-x0} height={PT+GH-y0} fill="rgba(255,140,66,0.15)" />
          <rect x={PL} y={y0} width={x0-PL} height={PT+GH-y0} fill="rgba(74,158,255,0.03)" />

          {/* Grid */}
          {xTicks.map(v => (
            <line key={v} x1={xS(v)} y1={PT} x2={xS(v)} y2={PT+GH}
              stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" strokeDasharray="3,4" />
          ))}
          {yTicks.map(v => (
            <line key={v} x1={PL} y1={yS(v)} x2={PL+GW} y2={yS(v)}
              stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" strokeDasharray="3,4" />
          ))}

          {/* Zero lines */}
          <line x1={x0} y1={PT} x2={x0} y2={PT+GH}
            stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" strokeDasharray="5,3" />
          <line x1={PL} y1={y0} x2={PL+GW} y2={y0}
            stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" strokeDasharray="5,3" />

          {/* Zone labels */}
          <text x={x0+6} y={PT+14} fontSize="9" fill="rgba(255,83,112,0.8)" fontWeight="700">🔥 Hot</text>
          <text x={PL+4} y={PT+14} fontSize="9" fill="rgba(0,196,140,0.7)" fontWeight="700">⚠️ Sell</text>
          <text x={x0+6} y={PT+GH-6} fontSize="9" fill="rgba(255,140,66,0.6)" fontWeight="700">📈 Rising</text>
          <text x={PL+4} y={PT+GH-6} fontSize="9" fill="rgba(74,158,255,0.6)" fontWeight="700">❄️ Falling</text>

          {/* Bubbles (non-hovered) */}
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

          {/* Hovered bubble (foreground) */}
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

          {/* X axis label */}
          {xTicks.map(v => (
            <text key={v} x={xS(v)} y={PT+GH+16} textAnchor="middle"
              fontSize="9" fill="rgba(255,255,255,0.4)">
              {v >= 0 ? '+' : ''}{v}%
            </text>
          ))}
          <text x={PL + GW/2} y={H-4} textAnchor="middle"
            fontSize="10" fill="rgba(255,255,255,0.35)">← Falling　　Price Change %　　Rising →</text>

          {/* Y axis label */}
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
