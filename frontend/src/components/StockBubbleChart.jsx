import { useState } from 'react'

// ── 銘柄版バブルチャート（テーマ詳細・Custom Theme共通） ──────────────────
// ── 銘柄版バブルチャート（テーマ詳細用） ─────────────────────────────

// Stock name translation for bubble chart
const STOCK_NAME_EN_BUBBLE = {
  '村田製作所':'Murata','アドバンテスト':'Advantest','東京エレクトロン':'Tokyo Electron',
  'レーザーテック':'Lasertec','ディスコ':'Disco','ルネサス':'Renesas','TDK':'TDK',
  'ソニーグループ':'Sony Group','日立製作所':'Hitachi','キーエンス':'Keyence',
  'ファナック':'Fanuc','パナソニックHD':'Panasonic','三菱電機':'Mitsubishi Elec',
  '富士通':'Fujitsu','NEC':'NEC','信越化学工業':'Shin-Etsu','SUMCO':'SUMCO',
  '太陽誘電':'Taiyo Yuden','京セラ':'Kyocera','ローム':'Rohm','テルモ':'Terumo',
  '武田薬品工業':'Takeda','アステラス製薬':'Astellas','中外製薬':'Chugai',
  '第一三共':'Daiichi Sankyo','安川電機':'Yaskawa','オムロン':'Omron','SMC':'SMC',
  '三菱重工業':'Mitsubishi HI','川崎重工業':'Kawasaki HI','IHI':'IHI',
  'INPEX':'INPEX','NTT':'NTT','KDDI':'KDDI','ソフトバンクグループ':'SoftBank G',
  'ソニー':'Sony','トヨタ自動車':'Toyota','ホンダ':'Honda','デンソー':'Denso',
  '三菱UFJフィナンシャル':'MUFG','三井住友フィナンシャル':'SMFG',
  'みずほフィナンシャル':'Mizuho','東京海上HD':'Tokio Marine',
  '三菱商事':'Mitsubishi Corp','三井物産':'Mitsui & Co','伊藤忠商事':'Itochu',
  '日本郵船':'Nippon Yusen','商船三井':'Mitsui OSK','ANAホールディングス':'ANA',
  'SCREENホールディングス':'SCREEN','ニコン':'Nikon','ソシオネクスト':'Socionext',
  '任天堂':'Nintendo','メルカリ':'Mercari','富士フイルムHD':'Fujifilm HD',
  'ニデック':'Nidec','コマツ':'Komatsu','中部電力':'Chubu Elec',
  '新日本製鐵':'Nippon Steel','JFEホールディングス':'JFE HD',
  'ファーストリテイリング':'Fast Retail','セブン&アイ':'Seven & i',
  'SBIホールディングス':'SBI HD','マネーフォワード':'Money Fwd',
  '三菱地所':'Mitsubishi Est','三井不動産':'Mitsui Fudo',
  '大成建設':'Taisei','鹿島建設':'Kajima',
}
const getStockNameBubble = (name) => STOCK_NAME_EN_BUBBLE[name] || name

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
                    {getStockNameBubble(s.name||s.ticker.replace('.T','')).slice(0,6)}
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
                  {getStockNameBubble(s.name||s.ticker.replace('.T','')).slice(0,8)}
                </text>
                <g style={{ pointerEvents:'none' }}>
                  <rect x={tx} y={ty} width="185" height="82"
                    rx="8" fill="#1a1f2e" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
                  <text x={tx+10} y={ty+18} fontSize="12" fill="#e8f0ff" fontWeight="700">
                    {getStockNameBubble(s.name||s.ticker.replace('.T','')).slice(0,16)}
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
