/**
 * PlanGate — Access control component for paid plan features
 */
import { useAuth }         from '../hooks/useAuth.jsx'
import { useSubscription } from '../hooks/useSubscription.jsx'

const FEATURE_LABELS = {
  institutional:   { name:'Institutional Holdings', status:'developer_only' },
  weekly_archive:  { name:'Weekly Report Archive',  requiredPlan:'Standard or above', requiredKey:'standard' },
  custom_theme_ai: { name:'Custom Theme AI Analysis', requiredPlan:'Pro', requiredKey:'pro' },
  market_detail:   { name:'Market Detail', status:'developer_only' },
}

export default function PlanGate({ feature, children, onNavigate }) {
  const { isLoggedIn, signIn } = useAuth()
  const { canAccess }          = useSubscription()

  if (canAccess(feature)) return children

  const info = FEATURE_LABELS[feature] || { name:'This feature', requiredPlan:'a higher plan' }

  if (info.status === 'developer_only') {
    return (
      <div style={{ padding:'60px 24px', textAlign:'center', maxWidth:'520px', margin:'0 auto' }}>
        <div style={{ fontSize:'52px', marginBottom:'14px' }}>🧪</div>
        <h2 style={{ fontSize:'20px', fontWeight:700, color:'var(--text)', marginBottom:'10px' }}>
          Developer Preview
        </h2>
        <p style={{ fontSize:'13px', color:'var(--text3)', lineHeight:1.8 }}>
          {info.name} is still under development and is visible only to the site developer.
        </p>
      </div>
    )
  }

  if (info.status === 'coming_soon') {
    return (
      <div style={{ padding:'60px 24px', textAlign:'center', maxWidth:'500px', margin:'0 auto' }}>
        <div style={{ fontSize:'56px', marginBottom:'16px' }}>🚧</div>
        <h2 style={{ fontSize:'22px', fontWeight:700, color:'var(--text)', marginBottom:'12px' }}>
          Coming Soon
        </h2>
        <p style={{ fontSize:'13px', color:'var(--text3)', lineHeight:1.9, marginBottom:'8px' }}>
          <strong style={{ color:'var(--text2)' }}>{info.name}</strong> is currently under development.
        </p>
        <p style={{ fontSize:'13px', color:'var(--text3)', lineHeight:1.9 }}>
          This feature will be available in a future update. Stay tuned!
        </p>
      </div>
    )
  }

  return (
    <div style={{ padding:'40px 24px', textAlign:'center', maxWidth:'500px', margin:'0 auto' }}>
      <div style={{ fontSize:'48px', marginBottom:'16px' }}>🔒</div>
      <h2 style={{ fontSize:'18px', fontWeight:700, color:'var(--text)', marginBottom:'8px' }}>
        {info.name}
      </h2>
      <p style={{ fontSize:'13px', color:'var(--text3)', lineHeight:1.8, marginBottom:'24px' }}>
        This feature is available on{' '}
        <strong style={{ color:'var(--accent)' }}>{info.requiredPlan}</strong> only.
        {!isLoggedIn && (
          <><br/>Please <strong>sign in with Google</strong> to use this feature.</>
        )}
      </p>
      {!isLoggedIn ? (
        <button onClick={signIn} style={{
          padding:'12px 28px', background:'var(--accent)', color:'#fff',
          border:'none', borderRadius:'10px', cursor:'pointer',
          fontFamily:'var(--font)', fontSize:'14px', fontWeight:700,
          display:'block', width:'100%', maxWidth:'280px', margin:'0 auto 12px',
        }}>
          🔑 Sign in with Google
        </button>
      ) : (
        <button onClick={() => onNavigate?.('Plan & Pricing')} style={{
          padding:'12px 28px', background:'var(--accent)', color:'#fff',
          border:'none', borderRadius:'10px', cursor:'pointer',
          fontFamily:'var(--font)', fontSize:'14px', fontWeight:700,
          display:'block', width:'100%', maxWidth:'280px', margin:'0 auto 12px',
        }}>
          💰 Upgrade Plan
        </button>
      )}
      <button onClick={() => onNavigate?.('Plan & Pricing')} style={{
        background:'none', border:'none', color:'var(--text3)', cursor:'pointer',
        fontFamily:'var(--font)', fontSize:'12px', textDecoration:'underline',
      }}>
        View Plan Details
      </button>
    </div>
  )
}
