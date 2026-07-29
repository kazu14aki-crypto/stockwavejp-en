import { useMemo, useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'
import { useSubscription } from '../hooks/useSubscription.jsx'
import { LEGAL_VERSIONS } from './LegalConsentGate.jsx'
import LegalDocumentReview from './LegalDocumentReview.jsx'
import TermsOfService from './pages/TermsOfService.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import Disclaimer from './pages/Disclaimer.jsx'
import LegalNotice from './pages/LegalNotice.jsx'
import { supabase } from '../lib/supabase'
const API = import.meta.env.VITE_API_URL || (
  typeof window !== 'undefined' && window.location.hostname.includes('stockwavejp')
    ? 'https://stockwavejp-en-api.onrender.com'
    : 'http://127.0.0.1:8000'
)

async function freshToken() {
  const current = await supabase.auth.getSession()
  if (current.error) throw current.error

  const session = current.data?.session
  const accessToken = session?.access_token
  if (!accessToken) throw new Error('Your sign-in session has expired. Sign out and sign in again.')

  // Use the current access token while it remains valid. Supabase refreshes sessions
  // automatically; forcing refreshSession here can fail when the refresh token has
  // already been rotated or removed from local storage.
  const expiresAtMs = Number(session.expires_at || 0) * 1000
  if (!expiresAtMs || expiresAtMs - Date.now() > 60_000) return accessToken

  const refreshed = await supabase.auth.refreshSession({ refresh_token: session.refresh_token })
  if (!refreshed.error && refreshed.data?.session?.access_token) {
    return refreshed.data.session.access_token
  }

  // The existing JWT may still be accepted during the final seconds; let the API
  // return a proper 401 rather than failing checkout with an opaque refresh error.
  return accessToken
}

async function warmupRequest() {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)
  try {
    await fetch(`${API}/api/ping`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-store',
      signal: controller.signal,
    })
  } catch {
    // Render may still be waking up. The checkout request retries once below.
  } finally {
    clearTimeout(timeout)
  }
}

export function warmupBackend() {
  warmupRequest()
}
export default function UpgradePlanButton({priceKey,label,color,disabled}){
 const {user,isLoggedIn,signIn}=useAuth();const {plan,status}=useSubscription();const [loading,setLoading]=useState(false);const [show,setShow]=useState(false);const [error,setError]=useState('')
 const documents=useMemo(()=>[
  {key:'terms',label:'Terms of Service',component:TermsOfService,scrollMessage:'Scroll to the end of this document.',readMessage:'You reached the end. Confirm that you reviewed this document.',checkLabel:'I reviewed this document',checkedLabel:'Reviewed'},
  {key:'privacy',label:'Privacy Policy',component:PrivacyPolicy,scrollMessage:'Scroll to the end of this document.',readMessage:'You reached the end. Confirm that you reviewed this document.',checkLabel:'I reviewed this document',checkedLabel:'Reviewed'},
  {key:'disclaimer',label:'Disclaimer',component:Disclaimer,scrollMessage:'Scroll to the end of this document.',readMessage:'You reached the end. Confirm that you reviewed this document.',checkLabel:'I reviewed this document',checkedLabel:'Reviewed'},
  {key:'commerce',label:'Commercial Disclosure',component:LegalNotice,scrollMessage:'Scroll to the end of this document.',readMessage:'You reached the end. Confirm that you reviewed this document.',checkLabel:'I reviewed this document',checkedLabel:'Reviewed'},
 ],[])
 const target=priceKey.includes('pro')?'pro':'standard';const isActive=plan===target;const paid=['standard','pro'].includes(plan)
 if(disabled)return <div style={{marginTop:'14px',padding:'12px',textAlign:'center',background:'var(--bg3)',borderRadius:'8px',fontSize:'12px',color:'var(--text3)'}}>Coming soon</div>
 const call=async(path,body={})=>{
  const requestOnce=async()=>{
   const controller=new AbortController()
   const timeout=setTimeout(()=>controller.abort(),45000)
   try{
    const accessToken=await freshToken()
    const response=await fetch(`${API}${path}`,{
     method:'POST',
     mode:'cors',
     cache:'no-store',
     headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${accessToken}`,
     },
     body:JSON.stringify(body),
     signal:controller.signal,
    })
    const raw=await response.text()
    let data={}
    try{data=raw?JSON.parse(raw):{}}catch{data={detail:raw}}
    if(!response.ok)throw new Error(data.detail||data.error||`The request failed (${response.status}).`)
    return data
   }finally{
    clearTimeout(timeout)
   }
  }
  try{
   return await requestOnce()
  }catch(firstError){
   const retryable=firstError?.name==='AbortError'||firstError instanceof TypeError||/Failed to fetch|NetworkError|Load failed/i.test(firstError?.message||'')
   if(!retryable)throw firstError
   await warmupRequest()
   await new Promise(resolve=>setTimeout(resolve,1200))
   try{
    return await requestOnce()
   }catch(secondError){
    if(secondError?.name==='AbortError')throw new Error('The connection to the server timed out. Please wait a moment and try again.')
    if(secondError instanceof TypeError||/Failed to fetch|NetworkError|Load failed/i.test(secondError?.message||'')){
     throw new Error('The Stripe checkout API could not be reached. Check your connection and try again shortly.')
    }
    throw secondError
   }
  }
 }
 const checkout=async()=>{
  setLoading(true);setError('')
  try{
   await warmupRequest()
   const d=await call('/api/stripe/create-checkout',{price_key:priceKey,user_id:user.id,email:user.email,success_url:location.origin,cancel_url:location.origin,legal_consent:true,terms_version:LEGAL_VERSIONS.terms,privacy_version:LEGAL_VERSIONS.privacy,disclaimer_version:LEGAL_VERSIONS.disclaimer})
   if(d.resumed){location.reload();return}
   location.assign(d.url)
  }catch(e){setError(e.message);setLoading(false)}
 }
 const click=async()=>{if(!isLoggedIn){signIn();return};if(isActive&&status==='canceling'){setLoading(true);try{await call('/api/stripe/resume-subscription');location.reload()}catch(e){alert(e.message)}finally{setLoading(false)};return};if(paid){setLoading(true);try{const d=await call('/api/stripe/create-portal');location.assign(d.url)}catch(e){alert(e.message)}finally{setLoading(false)};return};setShow(true)}
 if(isActive&&status!=='canceling')return <div style={{marginTop:'14px',padding:'10px',textAlign:'center',background:`${color}20`,border:`1px solid ${color}50`,borderRadius:'8px',fontSize:'12px',color,fontWeight:700}}>✅ Current plan</div>
 return <div>{show&&<LegalDocumentReview documents={documents} title="Confirm your paid subscription" description="Review the Terms, Privacy Policy, Disclaimer and commercial disclosure to the end." completeLabel="Accept and continue to Stripe" completingLabel="Saving…" cancelLabel="Back" onCancel={()=>{if(!loading){setShow(false);setError('')}}} onComplete={checkout} saving={loading} error={error}/>}<button onClick={click} onMouseEnter={warmupBackend} disabled={loading} style={{width:'100%',padding:'12px',marginTop:'14px',background:loading?'var(--bg3)':color,color:'#fff',border:'none',borderRadius:'8px',fontSize:'13px',fontWeight:700,cursor:loading?'wait':'pointer'}}>{loading?'Loading…':!isLoggedIn?'🔑 Sign in to subscribe':isActive&&status==='canceling'?'Resume subscription':paid?'Manage billing →':`${label} →`}</button></div>
}
