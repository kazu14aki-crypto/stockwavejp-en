import { useState } from 'react'
import { useSubscription } from '../../hooks/useSubscription.jsx'
import { useAuth }         from '../../hooks/useAuth.jsx'

export default function Settings({ viewMode, onViewModeChange, colorTheme, onColorThemeChange, isMobile, onNavigate }) {
  const { plan, planLabel, isPro, isStandard, expiresAt } = useSubscription()
  const { user } = useAuth()
  const { isLoggedIn, user } = useAuth()
  const [cancelling,  setCancelling]  = useState(false)
  const [cancelDone,  setCancelDone]  = useState(false)
  const [cancelError, setCancelError] = useState(null)

  const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

  const Card = ({ children, style = {} }) => (
    <div style={{ background:'var(--bg2)',border:'1px solid var(--border)',
      borderRadius:'var(--radius)',padding:'20px 24px',marginBottom:'16px', ...style }}>
      {children}
    </div>
  )
  const SLabel = ({ children }) => (
    <div style={{ fontSize:'11px',fontWeight:600,letterSpacing:'0.1em',color:'var(--text3)',
      textTransform:'uppercase',marginBottom:'14px' }}>{children}</div>
  )

  const COLOR_THEMES = [
    { key:'dark',  label:'🌑 Dark', desc:'Dark mode (default)' },
    { key:'light', label:'☀️ Light', desc:'Light mode' },
  ]

  const VIEW_MODES = [
    { key:'auto',   label:'🖥️ Auto',   desc:'Auto-detect by screen width' },
    { key:'mobile', label:'📱 Mobile', desc:'Force mobile layout' },
    { key:'pc',     label:'💻 Desktop',    desc:'Force desktop layout' },
  ]

  const COLOR_DIRS = [
    { key:'jp', label:'Japan Style', desc:'Rising=Red / Falling=Green (default)' },
    { key:'us', label:'US Style', desc:'Rising=Green / Falling=Red' },
  ]

  const [colorDir, setColorDirState] = useState(localStorage.getItem('swjp_color_dir') || 'jp')
  const setColorDir = (v) => {
    localStorage.setItem('swjp_color_dir', v)
    setColorDirState(v)
    // CSSカスタムプロパティを即時変更
    const root = document.documentElement
    if (v === 'us') {
      root.style.setProperty('--red',   '#1a9a50')  // US style: green=rising
      root.style.setProperty('--green', '#e63030')  // US style: red=falling
    } else {
      root.style.setProperty('--red',   '')          // Japan style: reset to default
      root.style.setProperty('--green', '')
    }
    window.dispatchEvent(new Event('storage'))
  }

  // Plan label color
  const planColor = { free:'#4a9eff', standard:'#ff8c42', pro:'#aa77ff', pro_trial:'#aa77ff', dev:'#00c48c' }[plan] || '#4a9eff'

  // Cancellation handler
  const handleCancel = async () => {
    if (!window.confirm('Cancel your subscription?\nYou can continue to use the service for the remainder of your current billing period.')) return
    setCancelling(true)
    setCancelError(null)
    try {
      const res = await fetch(`${API}/api/stripe/cancel-subscription`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user?.id }),
      })
      if (!res.ok) throw new Error((await res.json()).detail || 'Failed to cancel subscription')
      setCancelDone(true)
    } catch (e) {
      setCancelError(e.message)
    } finally {
      setCancelling(false)
    }
  }

  const btnBase = {
    padding:'10px 18px', borderRadius:'8px', cursor:'pointer',
    fontFamily:'var(--font)', fontSize:'13px', fontWeight:700,
    transition:'opacity 0.15s',
  }

  return (
    <div style={{ padding:'20px 16px 60px', maxWidth:'700px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'22px',fontWeight:700,color:'var(--text)',marginBottom:'20px' }}>⚙️ Settings</h1>

      {/* ── Current Plan ── */}
      <Card>
        <SLabel>💰 Current Plan</SLabel>
        {isLoggedIn ? (
          <>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px', flexWrap:'wrap' }}>
              <span style={{ fontSize:'20px', fontWeight:800, color:planColor }}>{planLabel}</span>
              {plan === 'pro_trial' && (
                <span style={{ fontSize:'11px', padding:'3px 10px', borderRadius:'20px',
                  background:'rgba(170,119,255,0.15)', color:'#aa77ff', border:'1px solid rgba(170,119,255,0.3)' }}>
                  30-day free trial{(() => {
                    const fl = user?.user_metadata?.first_login_at
                    if (!fl) return ''
                    const end = new Date(new Date(fl).getTime() + 30*24*60*60*1000)
                    const remaining = Math.max(0, Math.ceil((end - new Date()) / 86400000))
                    return ' — ends ' + end.toLocaleDateString('en-US', {month:'long',day:'numeric',year:'numeric'}) + ' (' + remaining + ' days remaining)'
                  })()}
                </span>
              )}
            </div>
            <div style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'14px' }}>
              {plan === 'free' && 'Free Plan: Access to basic features.'}
              {plan === 'standard' && 'Standard Plan: ¥980/month. Access to all periods and archives.'}
              {plan === 'pro' && 'Pro Plan: ¥1,980/month. Access to all features including institutional holdings.'}
              {plan === 'pro_trial' && 'Pro Plan 30-day free trial. Automatically switches to Free plan after the trial period ends ends.'}
              {plan === 'dev' && 'Developer account: All features available.'}
            </div>

            {/* Plan upgrade button */}
            {(plan === 'free' || plan === 'pro_trial') && (
              <button onClick={() => onNavigate?.('Plan & Pricing')}
                style={{ ...btnBase, background:'var(--accent)', color:'#fff', border:'none', marginBottom:'10px' }}>
                💰 Upgrade to Paid Plan
              </button>
            )}

            {/* Cancel subscription button */}
            {(plan === 'standard' || plan === 'pro' || plan === 'pro_trial') && !cancelDone && (
              <div style={{ marginTop:'8px', padding:'14px', background:'rgba(255,100,100,0.08)',
                border:'1px solid rgba(255,100,100,0.25)', borderRadius:'10px' }}>
                <div style={{ fontSize:'13px', fontWeight:600, color:'#ff6464', marginBottom:'8px' }}>
                  Cancel Subscription
                </div>
                <div style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'10px', lineHeight:1.7 }}>
                  You can continue using the service <strong>until the end of your billing period</strong>.<br/>
                  After the next renewal date, your plan will automatically revert to Free.
                </div>
                {cancelError && (
                  <div style={{ fontSize:'12px', color:'#ff4560', marginBottom:'8px' }}>
                    ⚠️ {cancelError}
                  </div>
                )}
                <button onClick={handleCancel} disabled={cancelling}
                  style={{ ...btnBase, background:'rgba(255,100,100,0.15)', color:'#ff6464',
                    border:'1px solid rgba(255,100,100,0.4)', opacity: cancelling ? 0.6 : 1 }}>
                  {cancelling ? 'Processing...' : '🔴 Cancel Subscription'}
                </button>
                <div style={{ fontSize:'11px', color:'var(--text3)', marginTop:'8px', lineHeight:1.7 }}>
                  * You can continue using the service until the end of your billing period.<br/>
                  * If you subscribed during a free trial, your paid plan started at the time of subscription.
                </div>
              </div>
            )}

            {cancelDone && (
              <div style={{ padding:'14px', background:'rgba(0,196,140,0.08)',
                border:'1px solid rgba(0,196,140,0.3)', borderRadius:'10px', fontSize:'13px', color:'#00c48c' }}>
                ✅ Cancellation complete. You can continue using the service until the end of your billing period.
              </div>
            )}
          </>
        ) : (
          <div style={{ fontSize:'13px', color:'var(--text3)', lineHeight:1.7 }}>
            Sign in with Google to manage your plan and sync Custom Themes across devices.<br/>
            <button onClick={() => onNavigate?.('Plan & Pricing')}
              style={{ marginTop:'10px', ...btnBase, background:'var(--accent)', color:'#fff', border:'none' }}>
              View Plans
            </button>
          </div>
        )}
      </Card>

      {/* ── Payment Method ── */}
      {(plan === 'standard' || plan === 'pro') && (
        <Card>
          <SLabel>💳 Payment & Billing</SLabel>
          <div style={{ fontSize:'13px', color:'var(--text3)', lineHeight:1.7, marginBottom:'12px' }}>
            To change your payment method or view billing history, please use the Stripe Customer Portal.
          </div>
          <button onClick={async () => {
            try {
              const res = await fetch(`${API}/api/stripe/create-portal`, {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({ user_id: user?.id })
              })
              const d = await res.json()
              if (d.url) window.open(d.url, '_blank')
              else alert('Failed to load the portal')
            } catch { alert('Failed to load the portal') }
          }}
            style={{ ...btnBase, background:'rgba(74,158,255,0.1)', color:'var(--accent)',
              border:'1px solid rgba(74,158,255,0.3)' }}>
            🔗 Open Billing Portal
          </button>
        </Card>
      )}

      {/* ── Color Theme ── */}
      <Card>
        <SLabel>🎨 Color Theme</SLabel>
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
          {COLOR_THEMES.map(t => (
            <button key={t.key} onClick={() => onColorThemeChange?.(t.key)}
              style={{ ...btnBase,
                background: colorTheme===t.key ? 'rgba(74,158,255,0.15)' : 'transparent',
                color: colorTheme===t.key ? 'var(--accent)' : 'var(--text2)',
                border: colorTheme===t.key ? '1px solid rgba(74,158,255,0.4)' : '1px solid var(--border)',
              }}>
              {t.label}
              {colorTheme===t.key && <span style={{ marginLeft:'6px', fontSize:'10px' }}>Active</span>}
            </button>
          ))}
        </div>
      </Card>

      {/* ── Rising/Falling Color ── */}
      <Card>
        <SLabel>📈 Rising/Falling Color</SLabel>
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', marginBottom:'12px' }}>
          {COLOR_DIRS.map(d => (
            <button key={d.key} onClick={() => setColorDir(d.key)}
              style={{ ...btnBase,
                background: colorDir===d.key ? 'rgba(74,158,255,0.15)' : 'transparent',
                color: colorDir===d.key ? 'var(--accent)' : 'var(--text2)',
                border: colorDir===d.key ? '1px solid rgba(74,158,255,0.4)' : '1px solid var(--border)',
              }}>
              {d.label}
              {colorDir===d.key && <span style={{ marginLeft:'6px', fontSize:'10px' }}>Active</span>}
            </button>
          ))}
        </div>
        {/* ── Color example ── */}
        <div style={{ display:'flex', gap:'10px', marginBottom:'10px' }}>
          <div style={{ fontSize:'12px', color:'var(--text3)', marginRight:'8px', lineHeight:'28px' }}>Example:</div>
          <div style={{ display:'flex', gap:'6px', alignItems:'center' }}>
            <span style={{
              padding:'3px 10px', borderRadius:'6px', fontSize:'12px', fontWeight:700,
              color: colorDir === 'us' ? '#4ade80' : '#f87171',
              background: colorDir === 'us' ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)',
            }}>▲ +2.5%</span>
            <span style={{ fontSize:'11px', color:'var(--text3)' }}>Rising</span>
          </div>
          <div style={{ display:'flex', gap:'6px', alignItems:'center' }}>
            <span style={{
              padding:'3px 10px', borderRadius:'6px', fontSize:'12px', fontWeight:700,
              color: colorDir === 'us' ? '#f87171' : '#4ade80',
              background: colorDir === 'us' ? 'rgba(248,113,113,0.12)' : 'rgba(74,222,128,0.12)',
            }}>▼ -1.8%</span>
            <span style={{ fontSize:'11px', color:'var(--text3)' }}>Falling</span>
          </div>
        </div>
        <div style={{ fontSize:'11px', color:'var(--text3)' }}>
          * Changes take effect immediately
        </div>
      </Card>

      {/* ── Display Mode ── */}
      <Card>
        <SLabel>🖥️ Display Mode</SLabel>
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
          {VIEW_MODES.map(m => (
            <button key={m.key} onClick={() => onViewModeChange?.(m.key)}
              style={{ ...btnBase,
                background: viewMode===m.key ? 'rgba(74,158,255,0.15)' : 'transparent',
                color: viewMode===m.key ? 'var(--accent)' : 'var(--text2)',
                border: viewMode===m.key ? '1px solid rgba(74,158,255,0.4)' : '1px solid var(--border)',
              }}>
              {m.label}
              {viewMode===m.key && <span style={{ marginLeft:'6px', fontSize:'10px' }}>Active</span>}
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}
