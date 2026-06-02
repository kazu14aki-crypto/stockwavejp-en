import UpgradePlanButton from '../UpgradePlanButton'
import { useState, useEffect } from 'react'
import { useAuth }         from '../../hooks/useAuth.jsx'
import { useSubscription } from '../../hooks/useSubscription.jsx'

export default function Plan({ onNavigate }) {
  const [isMobile, setIsMobile] = useState(false)
  const { isLoggedIn, signIn }  = useAuth()
  const { plan: currentPlan, planLabel, isPro } = useSubscription()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const perDay = (monthly) => monthly / 30

  const PLANS = [
    {
      key: 'free',
      name: 'Free', color: '#4a9eff',
      badge: currentPlan === 'free' ? 'Current Plan' : null,
      monthly: { price: '$0', label: 'Forever Free', perDay: null },
      yearly:  null,
      features: [
        '67 themes real-time data',
        'Heatmap',
        'Market Ranking',
        'Stock Search',
        'Weekly Report (latest 1 month only)',
        'All Column Articles',
        'Custom Theme (Watchlist)',
      ],
    },
    {
      key: 'standard',
      name: 'Standard', color: '#ff8c42',
      badge: currentPlan === 'standard' ? 'Current Plan' : null,
      monthly: { price: '$20',  label: 'Monthly', perDay: perDay(20)  },
      yearly:  null,  // Annual plan temporarily paused
      features: [
        'All Free Plan Features',
        'Theme Detail & Market Ranking (All Periods)',
        'Custom Theme: 5 themes / 20 stocks per theme',
        'Weekly Report (Full Archive)',
        'Market Ranking Page',
      ],
    },
    {
      key: 'pro',
      name: 'Pro', color: '#aa77ff',
      badge: currentPlan === 'pro' ? 'Current Plan' : null,
      monthly: { price: '$30', label: 'Monthly', perDay: perDay(30) },
      yearly:  null,  // Annual plan temporarily paused
      features: [
        'All Standard Plan Features',
        'Custom Theme: 10 themes / 50 stocks per theme',
        'Institutional Holdings (EDINET data)',
        'Priority Support',
      ],
    },
  ]

  const FEATURES = [
    ['Theme List (67+ themes)',                   '✅','✅','✅'],
    ['Heatmap',                        '✅','✅','✅'],
    ['Theme Detail (longer periods only)',              '✅','✅','✅'],
    ['Theme Detail（All Periods）',                    '❌','✅','✅'],
    ['Stock Search',                                  '✅','✅','✅'],
    ['All Column Articles',                  '✅','✅','✅'],
    ['Custom Theme: 1 theme / 10 stocks',            '✅','❌','❌'],
    ['Custom Theme: 5 themes / 20 stocks per theme',    '❌','✅','❌'],
    ['Custom Theme: 10 themes / 50 stocks per theme',   '❌','❌','✅'],
    ['Weekly Report (older than 1 month only)',           '✅','✅','✅'],
    ['Weekly Report (Full Archive)',              '❌','✅','✅'],
    ['Market Ranking Page',                          '❌','✅','✅'],
    ['Institutional Holdings',                    '❌','❌','✅'],
    ['Priority Support',                              '❌','❌','✅'],
  ]

  const card = { background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'12px', padding:'20px', marginBottom:'16px' }

  return (
    <div style={{ padding:'16px 16px 60px', maxWidth:'860px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'22px', fontWeight:700, color:'var(--text)', marginBottom:'6px' }}>💰 Pricing Plans</h1>
      {currentPlan === 'pro_trial' && (
        <div style={{ padding:'12px 16px', background:'rgba(170,119,255,0.12)',
          border:'1px solid rgba(170,119,255,0.3)', borderRadius:'10px',
          fontSize:'13px', color:'#aa77ff', marginBottom:'16px', lineHeight:1.7 }}>
          🎉 You are on a <strong>Pro Plan free trial</strong>.<br/>
          <span style={{ fontSize:'11px', color:'var(--text2)' }}>For 14 days from your first login, all FeaturesをFreeでTrialいただけます。期間終了後は自動的にFree Planになります。</span>
        </div>
      )}
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'24px', lineHeight:1.7 }}>
        Current Plan: <strong style={{ color:'#4a9eff' }}>{planLabel}</strong>. To upgradeプグレードは下記ボタンから。
        {!isLoggedIn && (
          <span>To subscribe, <button onClick={signIn} style={{ background:'none', border:'none', color:'var(--accent)', cursor:'pointer', fontFamily:'var(--font)', fontSize:'12px', fontWeight:700, padding:'0 2px' }}>Googleログイン</button>が必要です。</span>
        )}
      </p>

      {/* プランカード */}
      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap:'14px', marginBottom:'28px' }}>
        {PLANS.map(p => (
          <div key={p.key} style={{ background:'var(--bg2)', border:`2px solid ${p.color}40`, borderRadius:'12px', padding:'18px 16px', borderTop:`4px solid ${p.color}`, display:'flex', flexDirection:'column' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'14px' }}>
              <span style={{ fontSize:'16px', fontWeight:800, color:p.color }}>{p.name}</span>
              {p.badge && (
                <span style={{ fontSize:'10px', fontWeight:700, padding:'3px 10px', borderRadius:'20px',
                  background: p.badge==='Current Plan' ? `${p.color}20` : 'rgba(255,255,255,0.05)',
                  color: p.badge==='Current Plan' ? p.color : 'var(--text3)',
                  border:`1px solid ${p.badge==='Current Plan' ? p.color+'50' : 'rgba(255,255,255,0.08)'}`
                }}>{p.badge}</span>
              )}
            </div>

            {/* 単月 */}
            <div style={{ padding:'12px', borderRadius:'8px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', marginBottom: p.yearly ? '10px' : '14px' }}>
              <div style={{ fontSize:'10px', color:'var(--text3)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'6px' }}>{p.monthly.label}</div>
              <div style={{ display:'flex', alignItems:'baseline', gap:'4px' }}>
                <span style={{ fontSize:'26px', fontWeight:800, color:'var(--text)', fontFamily:'var(--mono)' }}>{p.monthly.price}</span>
                {p.monthly.label !== 'Forever Free' && <span style={{ fontSize:'12px', color:'var(--text3)' }}>/月</span>}
              </div>
              {p.monthly.perDay && <div style={{ fontSize:'11px', color:p.color, fontWeight:600, marginTop:'4px' }}>一 daysあたり約${p.monthly.perDay.toFixed(2)}/day JPY！</div>}
              {p.monthly.label === 'Forever Free' && <div style={{ fontSize:'11px', color:'#4a9eff', fontWeight:600, marginTop:'4px' }}>ずっとFree</div>}
            </div>

            {/* per year */}
            {p.yearly && (
              <div style={{ padding:'12px', borderRadius:'8px', background:`${p.color}10`, border:`1px solid ${p.color}30`, marginBottom:'14px' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'4px' }}>
                  <span style={{ fontSize:'10px', color:'var(--text3)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em' }}>{p.yearly.label}</span>
                  <span style={{ fontSize:'10px', fontWeight:700, padding:'2px 7px', borderRadius:'10px', background:p.color, color:'#fff' }}>{p.yearly.discount}</span>
                </div>
                <div style={{ display:'flex', alignItems:'baseline', gap:'4px' }}>
                  <span style={{ fontSize:'22px', fontWeight:800, color:p.color, fontFamily:'var(--mono)' }}>{p.yearly.price}</span>
                  <span style={{ fontSize:'11px', color:'var(--text3)' }}>/year</span>
                </div>
                <div style={{ fontSize:'11px', color:p.color, fontWeight:600, marginTop:'4px' }}>一 daysあたり約{p.yearly.perDay} JPY！</div>
              </div>
            )}

            {/* Featureリスト */}
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'6px', flexGrow:1, marginBottom:'14px' }}>
              {p.features.map((f, i) => (
                <li key={i} style={{ fontSize:'12px', color:'var(--text2)', display:'flex', gap:'6px', lineHeight:1.5 }}>
                  <span style={{ color:p.color, flexShrink:0 }}>✓</span>{f}
                </li>
              ))}
            </ul>
            {/* 申し込みボタン */}
            {p.key !== 'free' && (
              <div style={{ display:'flex', flexDirection:'column', gap:'6px', marginTop:'auto' }}>
                <UpgradePlanButton priceKey={`${p.key}_monthly`} label={p.name} color={p.color} disabled={false}/>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Feature比較表 */}
      <div style={card}>
        <h2 style={{ fontSize:'14px', fontWeight:700, color:'var(--text)', marginBottom:'14px' }}>📊 Feature比較表</h2>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize: isMobile ? '11px' : '12px', minWidth:'300px' }}>
            <thead>
              <tr>
                {[['Feature','left','transparent','var(--text3)'],['Free','center','rgba(74,158,255,0.10)','#4a9eff'],['Standard','center','rgba(255,140,66,0.10)','#ff8c42'],['Pro','center','rgba(170,119,255,0.10)','#aa77ff']].map(([h,align,bg,color],i) => (
                  <th key={i} style={{ padding: isMobile?'8px 6px':'10px 12px', textAlign:align, background:bg, color, fontWeight:700, fontSize: isMobile?'10px':'11px', borderBottom:'2px solid var(--border)', borderRight:i<3?'1px solid var(--border)':'none' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((row, ri) => (
                <tr key={ri} style={{ borderBottom:'1px solid var(--border)' }}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{ padding: isMobile?'6px':'8px 12px', textAlign:ci===0?'left':'center', color: ci===0?'var(--text2)':cell==='✅'?'#00c48c':cell==='❌'?'rgba(255,255,255,0.2)':'var(--text)', background: ci===1?'rgba(74,158,255,0.03)':ci===2?'rgba(255,140,66,0.03)':ci===3?'rgba(170,119,255,0.03)':'transparent', borderRight:ci<3?'1px solid var(--border)':'none', fontSize:ci===0?(isMobile?'11px':'12px'):'13px', fontWeight:ci>0?700:400 }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize:'11px', color:'var(--text3)', marginTop:'12px' }}>
          * Prices include tax. Paid plans coming soon.
        </p>
      </div>
      {/* Free体験期間中の契約に関するNotes */}
      <div style={{ background:'rgba(255,200,50,0.08)', border:'1px solid rgba(255,200,50,0.3)',
        borderRadius:'12px', padding:'16px 20px', marginTop:'8px' }}>
        <div style={{ fontSize:'13px', fontWeight:700, color:'#ffd619', marginBottom:'8px' }}>
          ⚠️ Important Note on Subscribing During Free Trial
        </div>
        <div style={{ fontSize:'12px', color:'var(--text2)', lineHeight:1.8 }}>
          If you subscribe during the free trial period (14 days from first login),
          <strong>the free trial ends and paid subscription begins immediately</strong>.<br/>
          Your plan will be shown in Settings under "Current Plan". You can cancel from there.<br/>
          After cancellation, you can continue using the service <strong>until the end of your billing period</strong>.
        </div>
      </div>
    </div>
  )
}
