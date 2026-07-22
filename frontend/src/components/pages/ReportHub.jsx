import { useEffect, useState } from 'react'
import WeeklyReport from './WeeklyReport'

function PeriodArchive({ type, title, description }) {
  const [items,setItems]=useState([])
  useEffect(()=>{fetch(`/data/${type}_reports/index.json?t=${Date.now()}`).then(r=>r.ok?r.json():[]).then(d=>setItems(Array.isArray(d)?d:(d?.reports||[]))).catch(()=>setItems([]))},[type])
  return <div style={{padding:'20px 24px 80px',maxWidth:'960px',margin:'0 auto'}}>
    <h1 style={{fontSize:'20px',fontWeight:700,color:'var(--text)',marginBottom:'6px'}}>{title}</h1>
    <p style={{fontSize:'12px',color:'var(--text3)',lineHeight:1.7,marginBottom:'18px'}}>{description}</p>
    {items.length ? <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'12px'}}>{items.map(x=><div key={x.id||x.period} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:'10px',padding:'16px'}}><div style={{fontSize:'14px',fontWeight:700,color:'var(--text)'}}>{x.title}</div><div style={{fontSize:'11px',color:'var(--text3)',marginTop:'5px'}}>{x.period}</div></div>)}</div> : <div style={{padding:'44px 20px',textAlign:'center',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:'12px',color:'var(--text3)',fontSize:'13px'}}>Reports will be published after sufficient data has accumulated.</div>}
  </div>
}

export default function ReportHub({onNavigate}) {
  const [tab,setTab]=useState('weekly')
  const tabs=[['weekly','Weekly Reports'],['monthly','Monthly Reports'],['quarterly','Quarterly Reports']]
  return <div>
    <div className="page-header-sticky" style={{gap:'8px',flexWrap:'wrap'}}><h1 style={{fontSize:'18px',fontWeight:700,color:'var(--text)',marginRight:'8px'}}>📰 Reports</h1>{tabs.map(([k,l])=><button key={k} onClick={()=>setTab(k)} style={{padding:'6px 12px',borderRadius:'7px',fontSize:'11px',fontWeight:700,cursor:'pointer',fontFamily:'var(--font)',border:tab===k?'1px solid var(--accent)':'1px solid var(--border)',background:tab===k?'rgba(74,158,255,0.12)':'var(--bg2)',color:tab===k?'var(--accent)':'var(--text3)'}}>{l}</button>)}</div>
    {tab==='weekly' && <WeeklyReport onNavigate={onNavigate}/>}
    {tab==='monthly' && <PeriodArchive type="monthly" title="📅 Monthly Reports" description="Monthly theme rankings, capital rotation and follow-up performance of the prior month's leaders."/>}
    {tab==='quarterly' && <PeriodArchive type="quarterly" title="📈 Quarterly Reports" description="Medium-term trend and theme-cycle reviews for each calendar quarter."/>}
  </div>
}
