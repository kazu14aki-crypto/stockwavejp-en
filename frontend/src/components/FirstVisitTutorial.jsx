import { useEffect, useState } from 'react'

const STORAGE_KEY='swjp_first_visit_tutorial_v2'
const STEPS=[
  { icon:'①', title:'Find strong themes', text:'Open Theme List, choose a period and rank by Return or Market-Excess Return to identify themes outperforming the broader market.' },
  { icon:'②', title:'Test the breadth of the move', text:'Open Theme Detail and compare volume, the return distribution and constituent stocks. Check whether the average is being driven by only one or two companies.' },
  { icon:'③', title:'Compare individual stocks', text:'Use the constituent table and Stock Search to compare earnings, valuation, liquidity and company disclosures.' },
  { icon:'④', title:'Track persistence', text:'Use Weekly Report follow-up data to check whether prior leaders continued to outperform or began to reverse.' },
]
export default function FirstVisitTutorial({onNavigate}){
  const [open,setOpen]=useState(false)
  const [step,setStep]=useState(0)
  useEffect(()=>{ try{ if(!localStorage.getItem(STORAGE_KEY)) setOpen(true) }catch{} },[])
  const close=()=>{try{localStorage.setItem(STORAGE_KEY,'done')}catch{} setOpen(false)}
  if(!open)return null
  const current=STEPS[step]
  const buttonStyle=(bg,color)=>({padding:'9px 14px',borderRadius:'8px',border:'1px solid var(--border)',background:bg,color,cursor:'pointer',fontFamily:'var(--font)',fontSize:'11px',fontWeight:700})
  return <div role="dialog" aria-modal="true" aria-label="StockWaveJP first-time guide" style={{position:'fixed',inset:0,zIndex:3000,background:'rgba(4,8,16,.78)',display:'grid',placeItems:'center',padding:'16px'}}>
    <div style={{width:'min(520px,100%)',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:'14px',padding:'22px',boxShadow:'0 20px 60px rgba(0,0,0,.45)'}}>
      <div style={{fontSize:'10px',color:'var(--accent)',fontWeight:800,letterSpacing:'.12em'}}>FIRST-TIME GUIDE {step+1}/{STEPS.length}</div>
      <div style={{fontSize:'34px',margin:'14px 0 8px'}}>{current.icon}</div>
      <h2 style={{fontSize:'19px',color:'var(--text)',margin:'0 0 10px'}}>{current.title}</h2>
      <p style={{fontSize:'13px',color:'var(--text2)',lineHeight:1.85,margin:'0 0 20px'}}>{current.text}</p>
      <div style={{display:'flex',justifyContent:'space-between',gap:'8px',flexWrap:'wrap'}}>
        <button onClick={close} style={buttonStyle('transparent','var(--text3)')}>Skip</button>
        <div style={{display:'flex',gap:'8px',marginLeft:'auto'}}>
          {step>0&&<button onClick={()=>setStep(v=>v-1)} style={buttonStyle('var(--bg3)','var(--text2)')}>Back</button>}
          {step<STEPS.length-1
            ? <button onClick={()=>setStep(v=>v+1)} style={buttonStyle('var(--accent)','#fff')}>Next</button>
            : <button onClick={()=>{close();onNavigate?.('Theme List')}} style={buttonStyle('var(--accent)','#fff')}>Open Theme List</button>}
        </div>
      </div>
    </div>
  </div>
}
