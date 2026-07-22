import { useEffect, useState } from 'react'
import WeeklyReport from './WeeklyReport'
import { useI18n } from '../../i18n'

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
  const { t } = useI18n()
  const [tab,setTab]=useState('weekly')
  const tabs=[['weekly',t('reports.weekly')],['monthly',t('reports.monthly')],['quarterly',t('reports.quarterly')]]
  return <div>
    <div className="page-header-sticky report-hub-header">
      <h1 className="report-hub-title">📰 {t('reports.title')}</h1>
      <div className="report-period-tabs" role="tablist" aria-label="Report period">
        {tabs.map(([k,l])=>(
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={tab===k}
            className={tab===k ? 'report-period-tab active' : 'report-period-tab'}
            onClick={()=>setTab(k)}
          >{l}</button>
        ))}
      </div>
    </div>
    {tab==='weekly' && <WeeklyReport onNavigate={onNavigate}/>}
    {tab==='monthly' && <PeriodArchive type="monthly" title="📅 Monthly Reports" description="Monthly theme rankings, capital rotation and follow-up performance of the prior month's leaders."/>}
    {tab==='quarterly' && <PeriodArchive type="quarterly" title="📈 Quarterly Reports" description="Medium-term trend and theme-cycle reviews for each calendar quarter."/>}

    <style>{`
      .report-hub-header{display:grid!important;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:12px!important}
      .report-hub-title{margin:0;font-size:18px;font-weight:700;color:var(--text);white-space:nowrap}
      .report-period-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px;width:min(560px,100%)}
      .report-period-tab{appearance:none;min-width:0;min-height:36px;padding:7px 10px;border-radius:7px;border:1px solid var(--border);background:var(--bg2);color:var(--text3);cursor:pointer;font-family:var(--font);font-size:11px;font-weight:700;line-height:1.25;text-align:center;white-space:normal}
      .report-period-tab.active{border-color:var(--accent);background:rgba(74,158,255,.12);color:var(--accent)}
      @media(max-width:640px){.report-hub-header{grid-template-columns:1fr!important;gap:8px!important;padding-bottom:9px!important}.report-period-tabs{width:100%;gap:5px}.report-period-tab{min-height:42px;padding:6px 3px;font-size:10px}}
    `}</style>
  </div>
}
