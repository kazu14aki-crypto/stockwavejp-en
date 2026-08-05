/**
 * useSubscription — subscription and explicit Pro trial state.
 * The 14-day Pro trial starts only after the user explicitly accepts it.
 */
import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const DEV_EMAILS = ['stockwavejp26@gmail.com']
const TRIAL_DAYS = 14
const DAY_MS = 24 * 60 * 60 * 1000
const SubscriptionContext = createContext(null)

function trialStateFromMetadata(metadata = {}) {
  // first_login_at is retained as a legacy marker so users who already consumed
  // the former automatic trial cannot claim a second trial.
  const startedAt = metadata.pro_trial_started_at || metadata.first_login_at || null
  const claimed = Boolean(metadata.pro_trial_claimed || metadata.first_login_at || startedAt)
  const startedDate = startedAt ? new Date(startedAt) : null
  const validStartedDate = startedDate && !Number.isNaN(startedDate.getTime()) ? startedDate : null
  const endsAt = validStartedDate ? new Date(validStartedDate.getTime() + TRIAL_DAYS * DAY_MS) : null
  const active = Boolean(endsAt && endsAt.getTime() > Date.now())
  return { claimed, startedAt: validStartedDate, endsAt, active }
}

export function SubscriptionProvider({ children }) {
  const [plan, setPlan] = useState('free')
  const [loading, setLoading] = useState(true)
  const [expiresAt, setExpiresAt] = useState(null)
  const [status, setStatus] = useState(null)
  const [trialEligible, setTrialEligible] = useState(false)
  const [trialUsed, setTrialUsed] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const refreshSubscription = useCallback(() => {
    setLoading(true)
    setRefreshKey(key => key + 1)
  }, [])

  const startTrial = useCallback(async (source = 'manual') => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError) throw sessionError
    if (!session?.user) throw new Error('Please sign in first.')

    const current = trialStateFromMetadata(session.user.user_metadata || {})
    if (current.claimed) throw new Error('This account has already used the free trial.')

    const startedAt = new Date()
    const { error } = await supabase.auth.updateUser({
      data: {
        pro_trial_started_at: startedAt.toISOString(),
        pro_trial_claimed: true,
        pro_trial_source: source,
      },
    })
    if (error) throw error

    setPlan('pro_trial')
    setStatus('trialing')
    setExpiresAt(new Date(startedAt.getTime() + TRIAL_DAYS * DAY_MS))
    setTrialEligible(false)
    setTrialUsed(true)
    setLoading(false)
    return true
  }, [])

  useEffect(() => {
    let cancelled = false

    const checkSubscription = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.user) {
          if (!cancelled) {
            setPlan('free'); setStatus(null); setExpiresAt(null)
            setTrialEligible(false); setTrialUsed(false); setLoading(false)
          }
          return
        }

        const email = (session.user.email || '').toLowerCase()
        if (DEV_EMAILS.includes(email)) {
          if (!cancelled) {
            setPlan('dev'); setStatus('active'); setExpiresAt(null)
            setTrialEligible(false); setTrialUsed(true); setLoading(false)
          }
          return
        }

        const { data: subData, error: subError } = await supabase
          .from('subscriptions')
          .select('plan, status, current_period_end, stripe_subscription_id')
          .eq('user_id', session.user.id)
          .in('status', ['active', 'canceling', 'trialing', 'past_due'])
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        if (!subError && subData) {
          const expiry = subData.current_period_end ? new Date(subData.current_period_end) : null
          const isValid = expiry ? expiry > new Date() : true
          if (isValid) {
            if (!cancelled) {
              setPlan(subData.plan || 'free')
              setStatus(subData.status || null)
              setExpiresAt(expiry)
              setTrialEligible(false)
              setTrialUsed(true)
              setLoading(false)
            }
            return
          }
        }

        const trial = trialStateFromMetadata(session.user.user_metadata || {})
        if (!cancelled) {
          setTrialUsed(trial.claimed)
          setTrialEligible(!trial.claimed)
          if (trial.active) {
            setPlan('pro_trial')
            setStatus('trialing')
            setExpiresAt(trial.endsAt)
          } else {
            setPlan('free')
            setStatus(null)
            setExpiresAt(null)
          }
          setLoading(false)
        }
      } catch (error) {
        console.error('[subscription]', error)
        if (!cancelled) {
          setPlan('free'); setStatus(null); setExpiresAt(null)
          setTrialEligible(false); setLoading(false)
        }
      }
    }

    checkSubscription()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      setLoading(true)
      checkSubscription()
    })
    return () => { cancelled = true; subscription.unsubscribe() }
  }, [refreshKey])

  const value = {
    plan, loading, expiresAt, status, trialEligible, trialUsed,
    startTrial, refreshSubscription,
    isFree: plan === 'free',
    isStandard: ['standard','pro','pro_trial','dev'].includes(plan),
    isPro: ['pro','pro_trial','dev'].includes(plan),
    isDev: plan === 'dev',
    canAccess: (feature) => {
      const rules = {
        weekly_archive: ['standard', 'pro', 'pro_trial', 'dev'],
        institutional: ['dev'],
        custom_theme_ai: ['pro', 'pro_trial', 'dev'],
        multiple_alerts: ['pro', 'pro_trial', 'dev'],
        portfolio_analysis: ['pro', 'pro_trial', 'dev'],
        short_period: ['standard', 'pro', 'pro_trial', 'dev'],
        stockwave_score: ['standard', 'pro', 'pro_trial', 'dev'],
        theme_trend_charts: ['standard', 'pro', 'pro_trial', 'dev'],
        market_detail: ['dev'],
      }
      return rules[feature]?.includes(plan) ?? true
    },
    canAccessPeriod: (period) => {
      const freePeriods = ['3mo', '6mo', '1y', '2y']
      return ['standard', 'pro', 'pro_trial', 'dev'].includes(plan) || freePeriods.includes(period)
    },
    maxThemes: { free:1, standard:5, pro:10, pro_trial:10, dev:999 }[plan] ?? 1,
    maxStocks: { free:10, standard:20, pro:50, pro_trial:50, dev:999 }[plan] ?? 10,
    planLabel: { free:'Free', standard:'Standard', pro:'Pro', pro_trial:'Pro Trial', dev:'Developer' }[plan] || 'Free',
  }

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext)
  if (!ctx) throw new Error('useSubscription must be used within SubscriptionProvider')
  return ctx
}
