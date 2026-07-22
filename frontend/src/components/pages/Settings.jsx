import { useState } from 'react'
import { useSubscription } from '../../hooks/useSubscription.jsx'
import { useAuth }         from '../../hooks/useAuth.jsx'

export default function Settings({ viewMode, onViewModeChange, colorTheme, onColorThemeChange, isMobile, onNavigate }) {
  const { plan, planLabel } = useSubscription()
  const { isLoggedIn, user, signOut } = useAuth()
  const [accountBusy,setAccountBusy]=useState(false)
  const [accountError,setAccountError]=useState(null)

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
    { key:'auto',   label:'🖥️ Auto',   desc:'Detect from screen width' },
    { key:'mobile', label:'📱 Mobile', desc:'Force mobile layout' },
    { key:'pc',     label:'💻 PC',    desc:'Force desktop layout' },
  ]

  const COLOR_DIRS = [
    { key:'jp', label:'Japan style', desc:'Up = red / Down = green (default)' },
    { key:'us', label:'US style', desc:'Up = green / Down = red' },
  ]

  const colorDir = localStorage.getItem('swjp_color_dir') || 'jp'
  const setColorDir = (v) => {
    localStorage.setItem('swjp_color_dir', v)
    window.dispatchEvent(new Event('storage'))
  }

  // プランラベル色
  const planColor = { free:'#4a9eff', standard:'#ff8c42', pro:'#aa77ff', pro_trial:'#aa77ff', trial_expired:'#888', dev:'#00c48c' }[plan] || '#4a9eff'

  const deleteAccount = async () => {
    const first = window.confirm('Delete your account?\nSaved themes, settings and sign-in information cannot be restored.')
    if (!first) return
    const second = window.confirm('Final confirmation. Delete the account?\nThis action cannot be undone.')
    if (!second) return
    setAccountBusy(true)
    setAccountError(null)
    try {
      const { supabase } = await import('../../lib/supabase')
      const { data:{ session } } = await supabase.auth.getSession()
      const res = await fetch(`${API}/api/account/delete`, {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'Authorization':`Bearer ${session?.access_token || ''}` },
      })
      const d = await res.json()
      if (!res.ok) throw new Error(d.detail || 'Account deletion failed')
      await signOut()
      localStorage.clear()
      window.alert('Account deleted')
      window.location.reload()
    } catch (e) {
      setAccountError(e.message)
    } finally {
      setAccountBusy(false)
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

      {/* ── Current plan ── */}
      <Card>
        <SLabel>💰 Current plan</SLabel>
        {isLoggedIn ? (
          <>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px', flexWrap:'wrap' }}>
              <span style={{ fontSize:'20px', fontWeight:800, color:planColor }}>{planLabel}</span>
              {plan === 'pro_trial' && (
                <span style={{ fontSize:'11px', padding:'3px 10px', borderRadius:'20px',
                  background:'rgba(170,119,255,0.15)', color:'#aa77ff', border:'1px solid rgba(170,119,255,0.3)' }}>
                  14-day free trial active{(() => {
                    const fl = user?.user_metadata?.first_login_at
                    if (!fl) return ''
                    const end = new Date(new Date(fl).getTime() + 14*24*60*60*1000)
                    const rem = Math.max(0, Math.ceil((end - new Date()) / 86400000))
                    return ' End date: ' + end.toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'}) + ' (' + rem + ' days remaining)'
                  })()}
                </span>
              )}
            </div>
            <div style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'14px' }}>
              {plan === 'free' && 'Free: core features are available.'}
              {plan === 'standard' && 'Standard: $9.90/month with all periods and full report archives.'}
              {plan === 'pro' && 'Pro: $19.90/month with Pro features.'}
              {plan === 'trial_expired' && 'The 14-day trial has ended. Subscribe to continue using paid features.'}
            {plan === 'pro_trial' && '14-day Pro trial. The account automatically moves to Free when the trial ends.'}
              {plan === 'dev' && 'Developer account: all features enabled.'}
            </div>

            <button onClick={() => onNavigate?.('Plans & Pricing')}
              style={{ ...btnBase, background:'rgba(74,158,255,0.1)', color:'var(--accent)',
                border:'1px solid rgba(74,158,255,0.3)' }}>
              Open Plans & Billing
            </button>
          </>
        ) : (
          <div style={{ fontSize:'13px', color:'var(--text3)', lineHeight:1.7 }}>
            Sign in with Google to manage plans and synchronize custom themes.<br/>
            <button onClick={() => onNavigate?.('Plans & Pricing')}
              style={{ marginTop:'10px', ...btnBase, background:'var(--accent)', color:'#fff', border:'none' }}>
              View plans
            </button>
          </div>
        )}
      </Card>

      {/* ── Appearance ── */}
      <Card>
        <SLabel>🎨 Appearance</SLabel>
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

      {/* ── RisingFallingカラー ── */}
      <Card>
        <SLabel>📈 Rising / Falling Colors</SLabel>
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
        {/* ④ RisingFallingカラーの例 */}
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
      </Card>

      {/* ── Layout mode ── */}
      <Card>
        <SLabel>🖥️ Layout mode</SLabel>
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

      {/* ── Account Deletion（誤操作防止のため最下部） ── */}
      {isLoggedIn && (
        <Card style={{ marginTop:'34px', border:'1px solid rgba(255,100,100,.3)', background:'rgba(255,100,100,.045)' }}>
          <SLabel>Account management</SLabel>
          <div style={{ fontSize:'13px', fontWeight:700, color:'#ff647c', marginBottom:'7px' }}>Account Deletion</div>
          <div style={{ fontSize:'11px', color:'var(--text3)', lineHeight:1.8, marginBottom:'12px' }}>
            Deletes sign-in data, cloud-saved custom themes, favorites and user settings. The data cannot be restored.<br/>
            Check the subscription status before deletion if a paid plan is active.
          </div>
          {accountError && <div style={{ fontSize:'11px', color:'#ff647c', marginBottom:'8px' }}>⚠ {accountError}</div>}
          <button disabled={accountBusy} onClick={deleteAccount} style={{
            ...btnBase, background:'transparent', color:'#ff647c',
            border:'1px solid rgba(255,100,100,.45)', opacity:accountBusy ? .6 : 1,
          }}>
            {accountBusy ? 'Deleting...' : 'Delete account'}
          </button>
          <div style={{ fontSize:'10px', color:'var(--text3)', marginTop:'9px' }}>
            Two confirmation prompts appear after pressing the button.
          </div>
        </Card>
      )}
    </div>
  )
}
