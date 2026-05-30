import { useState, useEffect } from 'react'
import { useAuth }         from '../../hooks/useAuth.jsx'
import { useSubscription } from '../../hooks/useSubscription.js'

export default function Plan({ onNavigate }) {
  const [isMobile, setIsMobile] = useState(false)
  const { isLoggedIn, signIn }  = useAuth()
  const { plan: currentPlan, planLabel } = useSubscription()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check(); window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const PLANS = [
    {
      key: 'free', name: 'Free', color: '#4a9eff',
      badge: currentPlan === 'free' ? 'Current Plan' : null,
      monthly: { price: '¥0', label: 'Forever free', perDay: null },
      features: [
        'All 67+ theme data (real-time)',
        'Theme Heatmap',
        'Stock Search',
        'Theme Detail (3M / 6M / 1Y periods only)',
        'Column articles (all)',
        'Custom Themes: 1 theme / 10 stocks',
        'Weekly Report (1 month+ old only)',
      ],
    },
    {
      key: 'standard', name: 'Standard', color: '#ff8c42',
      badge: currentPlan === 'standard' ? 'Current Plan' : null,
      monthly: { price: '¥980', label: 'Monthly', perDay: Math.ceil(980/30) },
      features: [
        'Everything in Free',
        'Theme Detail — all periods (1D/1W/1M/3M/6M/1Y)',
        'Market Ranking page',
        'Custom Themes: 5 themes / 20 stocks each',
        'Weekly Report — full archive',
      ],
    },
    {
      key: 'pro', name: 'Pro', color: '#aa77ff',
      badge: currentPlan === 'pro' ? 'Current Plan' : null,
      monthly: { price: '$30',   label: 'Monthly', perDay: null },
      features: [
        'Everything in Standard',
        'Custom Themes: 30 themes / 50 stocks each',
        'Institutional Holdings (EDINET)',
        'Priority support',
      ],
    },
  ]

  const FEATURES = [
    ['67+ Theme list',                    '✅','✅','✅'],
    ['Theme Heatmap',                     '✅','✅','✅'],
    ['Stock Search',                      '✅','✅','✅'],
    ['Column articles (all)',             '✅','✅','✅'],
    ['Theme Detail (long-term only)',     '✅','✅','✅'],
    ['Theme Detail (all periods)',        '❌','✅','✅'],
    ['Market Ranking page',               '❌','✅','✅'],
    ['Custom Themes 1 / 10 stocks',       '✅','❌','❌'],
    ['Custom Themes 5 / 20 stocks',       '❌','✅','❌'],
    ['Custom Themes 30 / 50 stocks',      '❌','❌','✅'],
    ['Weekly Report (1mo+ old only)',     '✅','✅','✅'],
    ['Weekly Report (full archive)',      '❌','✅','✅'],
    ['Institutional Holdings (EDINET)',   '❌','❌','✅'],
    ['Priority support',                  '❌','❌','✅'],
  ]

  const card = { background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'12px', padding:'20px', marginBottom:'16px' }

  return (
    <div style={{ padding:'16px 16px 60px', maxWidth:'860px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'22px', fontWeight:700, color:'var(--text)', marginBottom:'6px' }}>💰 Pricing Plans</h1>
      {currentPlan === 'pro_trial' && (
        <div style={{ padding:'12px 16px', background:'rgba(170,119,255,0.12)', border:'1px solid rgba(170,119,255,0.3)', borderRadius:'10px', fontSize:'13px', color:'#aa77ff', marginBottom:'16px', lineHeight:1.7 }}>
          🎉 <strong>Pro Trial (Free)</strong> — All Pro features free for 30 days from first login.<br/>
          <span style={{ fontSize:'11px', color:'var(--text2)' }}>Your account will automatically switch to Free after the trial period.</span>
        </div>
      )}
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'24px', lineHeight:1.7 }}>
        Current plan: <strong style={{ color:'#4a9eff' }}>{planLabel}</strong>.{' '}
        New users receive a free 30-day Pro trial upon first login.
        {!isLoggedIn && (
          <span> <button onClick={signIn} style={{ background:'none', border:'none', color:'var(--accent)', cursor:'pointer', fontFamily:'var(--font)', fontSize:'12px', fontWeight:700 }}>Sign in with Google</button> to subscribe.</span>
        )}
      </p>

      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap:'14px', marginBottom:'28px' }}>
        {PLANS.map(p => (
          <div key={p.key} style={{ background:'var(--bg2)', border:`2px solid ${p.color}40`, borderRadius:'12px', padding:'18px 16px', borderTop:`4px solid ${p.color}` }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'14px' }}>
              <span style={{ fontSize:'16px', fontWeight:800, color:p.color }}>{p.name}</span>
              {p.badge && <span style={{ fontSize:'10px', fontWeight:700, padding:'3px 10px', borderRadius:'20px', background:`${p.color}20`, color:p.color, border:`1px solid ${p.color}50` }}>{p.badge}</span>}
            </div>
            <div style={{ padding:'12px', borderRadius:'8px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', marginBottom:'14px' }}>
              <div style={{ fontSize:'10px', color:'var(--text3)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'6px' }}>{p.monthly.label}</div>
              <div style={{ display:'flex', alignItems:'baseline', gap:'4px' }}>
                <span style={{ fontSize:'26px', fontWeight:800, color:'var(--text)', fontFamily:'var(--mono)' }}>{p.monthly.price}</span>
                {p.monthly.label !== 'Forever free' && <span style={{ fontSize:'12px', color:'var(--text3)' }}>/mo</span>}
              </div>
              
              <div style={{ fontSize:'11px', color:'#4a9eff', fontWeight:600, marginTop:'4px' }}>Free forever</div>
            </div>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'6px', marginBottom:'8px' }}>
              {p.features.map((f, i) => (
                <li key={i} style={{ fontSize:'12px', color:'var(--text2)', display:'flex', gap:'6px', lineHeight:1.5 }}>
                  <span style={{ color:p.color, flexShrink:0 }}>✓</span>{f}
                </li>
              ))}
            </ul>
            
          </div>
        ))}
      </div>

      <div style={card}>
        <h2 style={{ fontSize:'14px', fontWeight:700, color:'var(--text)', marginBottom:'14px' }}>📊 Feature Comparison</h2>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize: isMobile?'11px':'12px', minWidth:'300px' }}>
            <thead>
              <tr>
                {[['Feature','left','transparent','var(--text3)'],['Free','center','rgba(74,158,255,0.10)','#4a9eff'],['Standard','center','rgba(255,140,66,0.10)','#ff8c42'],['Pro','center','rgba(170,119,255,0.10)','#aa77ff']].map(([h,align,bg,color],i) => (
                  <th key={i} style={{ padding: isMobile?'8px 6px':'10px 12px', textAlign:align, background:bg, color, fontWeight:700, fontSize:isMobile?'10px':'11px', borderBottom:'2px solid var(--border)', borderRight:i<3?'1px solid var(--border)':'none' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((row, ri) => (
                <tr key={ri} style={{ borderBottom:'1px solid var(--border)' }}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{ padding: isMobile?'6px':'8px 12px', textAlign:ci===0?'left':'center',
                      color: ci===0?'var(--text2)':cell==='✅'?'#00c48c':cell==='❌'?'rgba(255,255,255,0.2)':'var(--text)',
                      background: ci===1?'rgba(74,158,255,0.03)':ci===2?'rgba(255,140,66,0.03)':ci===3?'rgba(170,119,255,0.03)':'transparent',
                      borderRight:ci<3?'1px solid var(--border)':'none', fontSize:ci===0?(isMobile?'11px':'12px'):'13px', fontWeight:ci>0?700:400 }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize:'11px', color:'var(--text3)', marginTop:'12px' }}>
          ※ New users get a free 30-day Pro trial. Prices include tax.
        </p>
      </div>
    </div>
  )
}
