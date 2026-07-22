import UpgradePlanButton from '../UpgradePlanButton'
import { useState, useEffect } from 'react'
import { useAuth }         from '../../hooks/useAuth.jsx'
import { useSubscription } from '../../hooks/useSubscription.jsx'

export default function Plan({ onNavigate }) {
  const [isMobile, setIsMobile] = useState(false)
  const { isLoggedIn, signIn } = useAuth()
  const { plan: currentPlan, planLabel } = useSubscription()
  const [portalBusy, setPortalBusy] = useState(false)
  const [portalError, setPortalError] = useState(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'
  const perDay = (monthly) => (monthly / 30).toFixed(2)

  const openPortal = async () => {
    setPortalBusy(true)
    setPortalError(null)
    try {
      const { supabase } = await import('../../lib/supabase')
      const { data:{ session } } = await supabase.auth.getSession()
      const res = await fetch(`${API}/api/stripe/create-portal`, {
        method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${session?.access_token || ''}`}, body:JSON.stringify({})
      })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.detail || 'Unable to open the billing portal')
      window.location.assign(data.url)
    } catch (error) {
      setPortalError(error.message)
    } finally {
      setPortalBusy(false)
    }
  }

  const PLANS = [
    {
      key: 'free',
      name: 'Free', color: '#4a9eff',
      badge: currentPlan === 'free' ? 'Current Plan' : null,
      monthly: { price: '$0', label: 'Forever Free', perDay: null },
      yearly:  null,
      features: [
        'Confirmed closing-price data for 72 themes',
        'Theme Heatmap',
        'Stock Search',
        'Reports within Free access',
        'All column articles',
        'Custom Themes / Watchlists',
      ],
    },
    {
      key: 'standard',
      name: 'Standard', color: '#ff8c42',
      badge: currentPlan === 'standard' ? 'Current Plan' : null,
      monthly: { price: '$9.90',  label: 'Monthly subscription', perDay: perDay(9.9)  },
      yearly:  null,  // 年額は一時停止中（半年後に復活予定）
      features: [
        'All Free features',
        'Market data updated about every 60 minutes',
        'Theme Detail for all periods',
        '5 custom themes, 20 stocks per theme',
        'Full weekly, monthly and quarterly report archive',
      ],
    },
    {
      key: 'pro',
      name: 'Pro', color: '#aa77ff',
      badge: currentPlan === 'pro' ? 'Current Plan' : null,
      monthly: { price: '$19.90', label: 'Monthly subscription', perDay: perDay(19.9) },
      yearly:  null,  // 年額は一時停止中（半年後に復活予定）
      features: [
        'All Standard features',
        'Market data updated about every 15 minutes',
        '10 custom themes, 50 stocks per theme',
        'Priority support',
      ],
    },
  ]

  const FEATURES = [
    ['Market Data Update Frequency', 'Confirmed close','About 60 min','About 15 min'],
    ['Theme List (72+ themes)',                   '✅','✅','✅'],
    ['Theme Heatmap',                        '✅','✅','✅'],
    ['Theme Detail for Free-eligible periods',             '✅','✅','✅'],
    ['Theme Detail for all periods',                    '❌','✅','✅'],
    ['Stock Search',                                  '✅','✅','✅'],
    ['All columns and analysis articles',                  '✅','✅','✅'],
    ['1 custom theme, 10 stocks',            '✅','❌','❌'],
    ['5 custom themes, 20 stocks per theme',    '❌','✅','❌'],
    ['10 custom themes, 50 stocks per theme',   '❌','❌','✅'],
    ['Reports within Free access',           '✅','✅','✅'],
    ['Full weekly, monthly and quarterly report archive',              '❌','✅','✅'],
    ['Priority support',                              '❌','❌','✅'],
  ]

  const card = { background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'12px', padding:'20px', marginBottom:'16px' }

  return (
    <div style={{ padding:'16px 16px 60px', maxWidth:'860px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'22px', fontWeight:700, color:'var(--text)', marginBottom:'6px' }}>💰 Plans & Pricing</h1>
      {currentPlan === 'pro_trial' && (
        <div style={{ padding:'12px 16px', background:'rgba(170,119,255,0.12)',
          border:'1px solid rgba(170,119,255,0.3)', borderRadius:'10px',
          fontSize:'13px', color:'#aa77ff', marginBottom:'16px', lineHeight:1.7 }}>
          🎉 <strong>Pro Trial</strong> is active.<br/>
          <span style={{ fontSize:'11px', color:'var(--text2)' }}>All features are available for 14 days after the first sign-in. The account automatically moves to Free when the trial ends.</span>
        </div>
      )}
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'24px', lineHeight:1.7 }}>
        Current plan: <strong style={{ color:'#4a9eff' }}>{planLabel}</strong>. Upgrade using the plan cards below.
        {!isLoggedIn && (
          <span>A <button onClick={signIn} style={{ background:'none', border:'none', color:'var(--accent)', cursor:'pointer', fontFamily:'var(--font)', fontSize:'12px', fontWeight:700, padding:'0 2px' }}>Google sign-in</button> is required to subscribe.</span>
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
                {p.monthly.label !== 'Forever Free' && <span style={{ fontSize:'12px', color:'var(--text3)' }}>/month</span>}
              </div>
              {p.monthly.perDay && <div style={{ fontSize:'11px', color:p.color, fontWeight:600, marginTop:'4px' }}>About ${p.monthly.perDay} per day</div>}
              {p.monthly.label === 'Forever Free' && <div style={{ fontSize:'11px', color:'#4a9eff', fontWeight:600, marginTop:'4px' }}>Forever free</div>}
            </div>

            {/* 年間 */}
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
                <div style={{ fontSize:'11px', color:p.color, fontWeight:600, marginTop:'4px' }}>About ${p.yearly.perDay} per day</div>
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
        <h2 style={{ fontSize:'14px', fontWeight:700, color:'var(--text)', marginBottom:'14px' }}>📊 Feature Comparison</h2>
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
          Prices include applicable taxes. Paid plans will be enabled at launch.
        </p>
      </div>
      {/* 無料体験期間中の契約に関する注意事項 */}
      <div style={{ background:'rgba(255,200,50,0.08)', border:'1px solid rgba(255,200,50,0.3)',
        borderRadius:'12px', padding:'16px 20px', marginTop:'8px' }}>
        <div style={{ fontSize:'13px', fontWeight:700, color:'#ffd619', marginBottom:'8px' }}>
          ⚠️ Subscribing during the free trial
        </div>
        <div style={{ fontSize:'12px', color:'var(--text2)', lineHeight:1.8 }}>
          When a subscription is purchased during the 14-day trial,
          <strong>the trial ends and the paid billing period begins immediately</strong> .<br/>
          Use the billing portal on Plans & Pricing to change plans, update payment methods or cancel.<br/>
          After cancellation, access continues <strong>until the end of the current billing period</strong>.
        </div>
      </div>

      {(currentPlan==='standard' || currentPlan==='pro') && (
        <div style={{...card,border:'1px solid rgba(74,158,255,.28)'}}>
          <h2 style={{fontSize:'14px',fontWeight:800,color:'var(--text)',marginBottom:'7px'}}>Manage Current Subscription</h2>
          <div style={{fontSize:'11px',color:'var(--text2)',lineHeight:1.8,marginBottom:'12px'}}>
            Use Stripe Customer Portal for plan changes and cancellation. This avoids creating a second checkout and reduces duplicate subscriptions. Cancellation takes effect at the end of the current billing period.
          </div>
          <button onClick={openPortal} disabled={portalBusy} style={{padding:'10px 15px',borderRadius:'8px',cursor:portalBusy?'wait':'pointer',background:'var(--accent)',color:'#fff',border:'none',fontFamily:'var(--font)',fontWeight:700,opacity:portalBusy ? .65 : 1}}>
            {portalBusy ? 'Loading...' : 'Manage subscription in Stripe'}
          </button>
          {portalError && <div style={{fontSize:'11px',color:'#ff647c',marginTop:'8px'}}>⚠️ {portalError}</div>}
        </div>
      )}

      {/* 契約・支払い・ログインに関するサポート */}
      <div style={{ ...card, marginTop:'18px' }}>
        <h2 style={{ fontSize:'15px', fontWeight:800, color:'var(--text)', marginBottom:'5px' }}>🧾 Subscription & Payment Support</h2>
        <p style={{ fontSize:'11px', color:'var(--text3)', lineHeight:1.7, marginBottom:'14px' }}>
          Guidance for plan changes, cancellation and payment issues.
        </p>
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'repeat(2,minmax(0,1fr))', gap:'10px' }}>
          {[
            ['Plan changes and cancellation','Manage an existing paid subscription in the Stripe billing portal. Plan changes follow the portal’s proration rules, and cancellation is scheduled for the end of the current billing period.'],
            ['Payment failure','Update your card in the billing portal. After Stripe retries the payment, sign out and back in to refresh subscription status.'],
            ['Duplicate charge','Check your billing history and contact support with the charge date, amount and registered email. Do not cancel every suspected duplicate subscription before the investigation.'],
            ['Trial ended','After the 14-day trial, the account moves to Free without automatic billing. A paid subscription starts when it is purchased during the trial.'],
            ['Paid features are not reflected','Sign out and back in after payment. If the problem remains, contact support with the payment confirmation and registered email.'],
            ['Account deletion','The account-deletion control is at the bottom of Settings and requires two confirmation prompts.'],
          ].map(([title,body]) => (
            <div key={title} style={{ padding:'12px 13px', border:'1px solid var(--border)', borderRadius:'9px', background:'var(--bg3)' }}>
              <div style={{ fontSize:'12px', fontWeight:700, color:'var(--text)', marginBottom:'5px' }}>{title}</div>
              <div style={{ fontSize:'11px', color:'var(--text2)', lineHeight:1.75 }}>{body}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={card}>
        <h2 style={{ fontSize:'15px', fontWeight:800, color:'var(--text)', marginBottom:'5px' }}>🔐 Sign-in & Data Update Problems</h2>
        <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginTop:'13px' }}>
          <div>
            <div style={{ fontSize:'12px', fontWeight:700, color:'var(--text)', marginBottom:'4px' }}>Unable to sign in with Google</div>
            <div style={{ fontSize:'11px', color:'var(--text2)', lineHeight:1.8 }}>
              Allow pop-ups and cookies, then retry in a private window or another browser. Temporarily disabling extensions or ad blockers may help. If the error persists, contact support with the device, browser, time and screenshot.
            </div>
          </div>
          <div>
            <div style={{ fontSize:'12px', fontWeight:700, color:'var(--text)', marginBottom:'4px' }}>Market data appears delayed</div>
            <div style={{ fontSize:'11px', color:'var(--text2)', lineHeight:1.8 }}>
              Check Update Time, Data Time and Next Update in the global header. The site distinguishes unavailable data, failed updates, delayed updates and market holidays instead of treating them as zero.
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
