import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabase'
import LegalDocumentReview from './LegalDocumentReview.jsx'
import TermsOfService from './pages/TermsOfService.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import Disclaimer from './pages/Disclaimer.jsx'

export const LEGAL_VERSIONS={terms:'2026-08-04',privacy:'2026-08-04',disclaimer:'2026-08-04'}
const storageKey=id=>`swjp_legal_consent_${id}_${LEGAL_VERSIONS.terms}_${LEGAL_VERSIONS.privacy}_${LEGAL_VERSIONS.disclaimer}`

export default function LegalConsentGate(){
  const {user,loading}=useAuth()
  const [acceptedRecord,setAcceptedRecord]=useState(false)
  const [saving,setSaving]=useState(false)
  const [error,setError]=useState('')
  const documents=useMemo(()=>[
    {key:'terms',label:'Terms of Service',component:TermsOfService,scrollMessage:'Scroll to the end of this document.',readMessage:'You reached the end. Confirm that you reviewed this document.',checkLabel:'I reviewed this document',checkedLabel:'Reviewed'},
    {key:'privacy',label:'Privacy Policy',component:PrivacyPolicy,scrollMessage:'Scroll to the end of this document.',readMessage:'You reached the end. Confirm that you reviewed this document.',checkLabel:'I reviewed this document',checkedLabel:'Reviewed'},
    {key:'disclaimer',label:'Disclaimer',component:Disclaimer,scrollMessage:'Scroll to the end of this document.',readMessage:'You reached the end. Confirm that you reviewed this document.',checkLabel:'I reviewed this document',checkedLabel:'Reviewed'},
  ],[])
  useEffect(()=>{
    let active=true
    const run=async()=>{
      if(!user)return
      if(localStorage.getItem(storageKey(user.id))==='accepted'){if(active)setAcceptedRecord(true);return}
      const {data,error}=await supabase.from('legal_consents').select('id').eq('user_id',user.id).eq('terms_version',LEGAL_VERSIONS.terms).eq('privacy_version',LEGAL_VERSIONS.privacy).eq('disclaimer_version',LEGAL_VERSIONS.disclaimer).limit(1)
      if(!active)return
      if(!error&&data?.length){localStorage.setItem(storageKey(user.id),'accepted');setAcceptedRecord(true)}
    }
    run().catch(()=>{})
    return()=>{active=false}
  },[user?.id])
  if(['#terms','#privacy','#disclaimer'].includes(location.hash))return null
  if(loading||!user||acceptedRecord)return null
  const save=async()=>{
    setSaving(true);setError('')
    const {error}=await supabase.from('legal_consents').insert({user_id:user.id,terms_version:LEGAL_VERSIONS.terms,privacy_version:LEGAL_VERSIONS.privacy,disclaimer_version:LEGAL_VERSIONS.disclaimer,locale:'en',source:'first_login',user_agent:navigator.userAgent})
    if(error){setSaving(false);setError('The consent record could not be saved. Check the Supabase configuration.');return}
    localStorage.setItem(storageKey(user.id),'accepted');setAcceptedRecord(true)
  }
  return <LegalDocumentReview documents={documents} title="Review and accept the legal terms" description="Scroll through each document to the end, then confirm each document in order." completeLabel="Accept and continue" completingLabel="Saving…" onComplete={save} saving={saving} error={error}/>
}
