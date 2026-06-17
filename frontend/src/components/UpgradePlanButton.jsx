import { useState, useRef } from 'react'
import { useAuth }         from '../hooks/useAuth.jsx'
import { useSubscription } from '../hooks/useSubscription.jsx'

const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

// バックエンドをウォームアップ（コールドスタート対策）
let backendWarmed = false
export function warmupBackend() {
  if (backendWarmed) return
  backendWarmed = true
  fetch(`${API}/health`, { method:'GET' }).catch(() => {})
}

export default function UpgradePlanButton({ priceKey, label, color, disabled }) {
  const { user, isLoggedIn, signIn } = useAuth()
  const { plan: currentPlan }        = useSubscription()
  const [loading,      setLoading]      = useState(false)
  const [showOptions,  setShowOptions]  = useState(false)
  const prefetchedUrl = useRef(null)
  const prefetching   = useRef(false)

  const targetPlan  = priceKey.includes('pro') ? 'pro' : 'standard'
  const isDowngrade = currentPlan === 'pro' && targetPlan === 'standard'
  const isUpgrade   = currentPlan === 'standard' && targetPlan === 'pro'
  const isActive    = (currentPlan === targetPlan)

  if (disabled) return (
    <div style={{ marginTop:'14px', padding:'12px', textAlign:'center',
      background:'var(--bg3)', borderRadius:'8px', fontSize:'12px',
      color:'var(--text3)', fontFamily:'var(--font)' }}>
      Coming soon
    </div>
  )

  if (isActive) return (
    <div style={{ marginTop:'14px', padding:'10px', textAlign:'center',
      background:`${color}20`, border:`1px solid ${color}50`,
      borderRadius:'8px', fontSize:'12px', color, fontFamily:'var(--font)', fontWeight:700 }}>
      ✅ Current Plan
    </div>
  )

  // hoverでpre-fetch（新規加入のみ。アップグレードはタイミング選択後）
  const handleMouseEnter = async () => {
    if (!isLoggedIn || isUpgrade || prefetching.current || prefetchedUrl.current) return
    prefetching.current = true
    try {
      const res = await fetch(`${API}/api/stripe/create-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price_key:   priceKey,
          user_id:     user?.id || 'prefetch',
          email:       user?.email || '',
          success_url: window.location.origin,
          cancel_url:  window.location.origin,
          billing_timing: 'period_end',
        }),
      })
      const data = await res.json()
      if (data.url) prefetchedUrl.current = data.url
    } catch {}
    prefetching.current = false
  }

  const doCheckout = async (timing) => {
    setLoading(true)
    setShowOptions(false)
    try {
      // pre-fetchされたURLがあれば即使用
      if (prefetchedUrl.current && timing === 'period_end') {
        window.location.href = prefetchedUrl.current
        return
      }
      const res = await fetch(`${API}/api/stripe/create-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price_key:   priceKey,
          user_id:     user.id,
          email:       user.email,
          success_url: window.location.origin,
          cancel_url:  window.location.origin,
          billing_timing: timing,
        }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else throw new Error(data.error || 'エラー')
    } catch (e) {
      console.error('Checkout error:', e)
      alert('Failed to load checkout page. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleClick = async () => {
    if (!isLoggedIn) { signIn(); return }
    if (isUpgrade) { setShowOptions(true); return }
    doCheckout('period_end')
  }

  const btnStyle = {
    width:'100%', padding:'12px', marginTop:'14px',
    background: loading ? 'var(--bg3)' : color,
    color:'#fff', border:'none', borderRadius:'8px',
    fontFamily:'var(--font)', fontSize:'13px', fontWeight:700,
    cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1,
    transition:'opacity 0.15s',
  }

  return (
    <div>
      <button onClick={handleClick} onMouseEnter={handleMouseEnter}
        disabled={loading} style={btnStyle}>
        {loading ? 'Loading...' :
         isLoggedIn ? (
           isDowngrade ? `Downgrade to ${label} →` :
           isUpgrade   ? `Upgrade to ${label} →` :
           ` Subscribe to ${label} →`
         ) : '🔑 Sign In to Subscribe'}
      </button>

      {showOptions && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)',
          zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center',
          padding:'20px' }}>
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)',
            borderRadius:'16px', padding:'28px 24px', maxWidth:'400px', width:'100%' }}>
            <div style={{ fontSize:'16px', fontWeight:700, color:'var(--text)', marginBottom:'8px' }}>
              🔄 Upgrade to Pro Plan
            </div>
            <div style={{ fontSize:'13px', color:'var(--text3)', marginBottom:'20px', lineHeight:1.7 }}>
              Select when to apply the upgrade.
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'16px' }}>
              <button onClick={() => doCheckout('immediate')} style={{
                padding:'14px 16px', background:'rgba(170,119,255,0.1)',
                border:'1px solid rgba(170,119,255,0.4)', borderRadius:'10px',
                cursor:'pointer', fontFamily:'var(--font)', textAlign:'left',
              }}>
                <div style={{ fontSize:'13px', fontWeight:700, color:'#aa77ff', marginBottom:'4px' }}>
                  ⚡ Upgrade to Pro Now
                </div>
                <div style={{ fontSize:'11px', color:'var(--text3)', lineHeight:1.6 }}>
                  Switch to Pro immediately from today.<br/>
                  Remaining Standard period will be prorated as credit.
                </div>
              </button>
              <button onClick={() => doCheckout('period_end')} style={{
                padding:'14px 16px', background:'rgba(74,158,255,0.08)',
                border:'1px solid rgba(74,158,255,0.3)', borderRadius:'10px',
                cursor:'pointer', fontFamily:'var(--font)', textAlign:'left',
              }}>
                <div style={{ fontSize:'13px', fontWeight:700, color:'var(--accent)', marginBottom:'4px' }}>
                  📅 Switch to Pro at Period End
                </div>
                <div style={{ fontSize:'11px', color:'var(--text3)', lineHeight:1.6 }}>
                  After the current Standard period ends,<br/>
                  you will automatically switch to Pro.
                </div>
              </button>
            </div>
            <button onClick={() => setShowOptions(false)} style={{
              width:'100%', padding:'10px', background:'transparent',
              border:'1px solid var(--border)', borderRadius:'8px',
              cursor:'pointer', fontFamily:'var(--font)', fontSize:'13px', color:'var(--text3)',
            }}>Cancel</button>
          </div>
        </div>
      )}

      {isDowngrade && (
        <div style={{ fontSize:'11px', color:'var(--text3)', marginTop:'6px', lineHeight:1.6 }}>
          * Downgrade takes effect after the current Pro billing period ends.
        </div>
      )}
    </div>
  )
}
