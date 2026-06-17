import UpgradePlanButton, { warmupBackend } from '../UpgradePlanButton'
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

  const perDay = (monthly) => (monthly / 30).toFixed(2)

  const PLANS = [
    {
      key: 'free',
      name: 'Free', color: '#4a9eff',
      badge: currentPlan === 'free' ? 'Current Plan' : null,
      monthly: { price: '$0', label: 'Forever Free (with ads)', perDay: null },
      yearly:  null,
      features: [
        '67 themes real-time data',
        'Theme Heatmap',
        'Market Ranking',
        'Stock Search',
        'All Column Articles',
        'Custom Theme (1 theme / 10 stocks)',
        'Weekly Report (latest 1 month only)',
        'Theme Detail & Market Ranking (3M / 6M / 1Y only)',
      ],
    },
    {
      key: 'standard',
      name: 'Standard', color: '#00c48c',
      badge: currentPlan === 'standard' ? 'Current Plan' : 'Recommended',
      monthly: { price: '$15', label: 'Monthly', perDay: perDay(15) },
      yearly:  null,
      features: [
        'All Free Plan Features',
        'Theme Detail & Market Ranking (All Periods)',
        'Custom Theme (5 themes / 20 stocks per theme)',
        'Weekly Report (Full Archive)',
      ],
    },
    {
      key: 'pro',
      name: 'Pro', color: '#ff8c42',
      badge: currentPlan === 'pro' ? 'Current Plan' : null,
      monthly: { price: '$25', label: 'Monthly', perDay: perDay(25) },
      yearly:  null,
      features: [
        'All Standard Plan Features',
        'Custom Theme (10 themes / 50 stocks per theme)',
        'Institutional Holdings (EDINET data)',
        'Priority Support',
      ],
    },
  ]

  const card = {
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: '12px', padding: isMobile ? '20px 16px' : '24px 28px',
    display: 'flex', flexDirection: 'column',
  }

  return (
    <div style={{ padding: isMobile ? '20px 16px 60px' : '28px 32px 60px', maxWidth: '960px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>Plan & Pricing</h1>
      <p style={{ fontSize: '13px', color: 'var(--text3)', marginBottom: '24px' }}>
        14-day free trial available on first login. Cancel anytime.
      </p>

      {/* Current plan info */}
      {isLoggedIn && (
        <div style={{ padding: '12px 16px', background: 'rgba(74,158,255,0.08)', border: '1px solid rgba(74,158,255,0.2)', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', color: 'var(--text2)' }}>
          <span style={{ fontSize:'11px', color:'var(--text2)' }}>For 14 days from your first login, all Pro Plan features are available for free.</span>
          <br/>
          Current Plan: <strong style={{ color:'#4a9eff' }}>{planLabel}</strong>. To upgrade, select a plan below.
        </div>
      )}
      {!isLoggedIn && (
        <div style={{ padding: '12px 16px', background: 'rgba(74,158,255,0.05)', border: '1px solid rgba(74,158,255,0.15)', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', color: 'var(--text3)' }}>
          <span>To subscribe, </span>
          <button onClick={signIn} style={{ background:'none', border:'none', color:'var(--accent)', cursor:'pointer', fontFamily:'var(--font)', fontSize:'13px', fontWeight:600, padding:0 }}>
            sign in with Google
          </button>
          <span> first.</span>
        </div>
      )}

      {/* Plan cards */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '16px', marginBottom: '32px' }}>
        {PLANS.map(p => (
          <div key={p.key} style={{ ...card, borderColor: p.key === currentPlan ? p.color : 'var(--border)', position: 'relative' }}>
            {p.badge && (
              <div style={{ position:'absolute', top:'-10px', right:'16px', background:p.color, color:'#fff', fontSize:'10px', fontWeight:700, padding:'2px 10px', borderRadius:'20px' }}>
                {p.badge}
              </div>
            )}
            <div style={{ fontSize:'18px', fontWeight:700, color:p.color, marginBottom:'4px' }}>{p.name}</div>
            <div style={{ fontSize:'28px', fontWeight:800, color:'var(--text)', fontFamily:'var(--font-mono,monospace)', marginBottom:'2px' }}>{p.monthly.price}</div>
            {p.monthly.label !== 'Forever Free' && <span style={{ fontSize:'12px', color:'var(--text3)' }}>per month</span>}
            {p.monthly.perDay && <div style={{ fontSize:'11px', color:p.color, fontWeight:600, marginTop:'4px' }}>${p.monthly.perDay}/day</div>}
            {p.monthly.label === 'Forever Free' && <div style={{ fontSize:'11px', color:'#4a9eff', fontWeight:600, marginTop:'4px' }}>Always free</div>}

            <div style={{ borderTop:'1px solid var(--border)', margin:'16px 0 12px' }} />

            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'8px', flex:1 }}>
              {p.features.map((f,i) => (
                <li key={i} style={{ fontSize:'12px', color:'var(--text2)', display:'flex', gap:'8px', alignItems:'flex-start' }}>
                  <span style={{ color:p.color, flexShrink:0 }}>✓</span>{f}
                </li>
              ))}
            </ul>

            {p.key !== 'free' && (
              <div style={{ marginTop:'20px' }}>
                <UpgradePlanButton priceKey={`${p.key}_monthly`} label={p.name} color={p.color} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Feature comparison */}
      <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'12px', padding:'24px 28px', marginBottom:'24px' }}>
        <h2 style={{ fontSize:'14px', fontWeight:700, color:'var(--text)', marginBottom:'16px' }}>Compare Plans</h2>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'12px' }}>
            <thead>
              <tr>
                {['Feature','Free','Standard','Pro'].map(h => (
                  <th key={h} style={{ padding:'8px 12px', textAlign:h==='Feature'?'left':'center', color:'var(--text3)', fontWeight:600, borderBottom:'1px solid var(--border)', whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Theme List (67 themes)', '✓','✓','✓'],
                ['Theme Heatmap', '✓','✓','✓'],
                ['Column Articles', '✓','✓','✓'],
                ['Theme Detail / Market Ranking (short periods)', '✓','✓','✓'],
                ['Theme Detail / Market Ranking (all periods)', '–','✓','✓'],
                ['Weekly Report (latest 1 month)', '✓','✓','✓'],
                ['Weekly Report (full archive)', '–','✓','✓'],
                ['Custom Theme', '1 / 10 stocks','5 / 20 stocks','10 / 50 stocks'],
                ['Institutional Holdings', '–','–','✓'],
              ].map((row, i) => (
                <tr key={i} style={{ background: i%2===0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding:'8px 12px', textAlign:j===0?'left':'center', color:cell==='–'?'var(--text3)':cell==='✓'?'#00c48c':'var(--text2)', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p style={{ fontSize:'11px', color:'var(--text3)', textAlign:'center' }}>
        * Prices in USD. Paid plans billed monthly. Cancel anytime from Settings.
      </p>
    </div>
  )
}
