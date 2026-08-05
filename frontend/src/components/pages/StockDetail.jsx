import { useEffect, useMemo, useState } from 'react'
import { useSubscription } from '../../hooks/useSubscription.jsx'
import { supabase } from '../../lib/supabase'

const API_BASE = import.meta.env.VITE_API_URL || (
  typeof window !== 'undefined' && !['localhost','127.0.0.1'].includes(window.location.hostname)
    ? 'https://stockwavejp-en-api.onrender.com'
    : 'http://127.0.0.1:8000'
)

function computeTech(hist) {
  if (!hist || hist.length < 30) return null
  const r = hist.map(d => 1 + Number(d.pct || 0) / 100)
  const last = r.at(-1)
  const ma = n => r.length < n ? null : (last / (r.slice(-n).reduce((a,b)=>a+b,0)/n)-1)*100
  const hi = Math.max(...r)
  let gain=0, loss=0
  const t=r.slice(-15)
  for(let i=1;i<t.length;i++){const d=t[i]-t[i-1]; if(d>=0) gain+=d; else loss-=d}
  return {ma25:ma(25),ma75:ma(75),off52w:(last/hi-1)*100,rsi:gain+loss===0?50:gain/(gain+loss)*100}
}

export default function StockDetail({ ticker, onNavigate, isMobile }) {
  const { isStandard } = useSubscription()
  const code=String(ticker||'').replace('.T','')
  const [info,setInfo]=useState(null), [hist,setHist]=useState(null), [val,setVal]=useState(null)
  const [indexEntry,setIndexEntry]=useState(null), [loading,setLoading]=useState(true)
  useEffect(()=>{
    if(!code)return
    let cancelled=false
    ;(async()=>{
      setLoading(true)
      let uid=null
      try{uid=(await supabase.auth.getSession())?.data?.session?.user?.id||null}catch{}
      const [i,h,v,idx]=await Promise.all([
        fetch(`${API_BASE}/api/stock-info/${code}.T`).then(r=>r.ok?r.json():null).catch(()=>null),
        fetch(`${API_BASE}/api/stock-history/${code}.T?period=1y`).then(r=>r.ok?r.json():null).catch(()=>null),
        fetch(`${API_BASE}/api/stock-valuation/${code}.T${uid?`?uid=${uid}`:''}`).then(r=>r.ok?r.json():null).catch(()=>null),
        fetch('/data/stock_index.json').then(r=>r.ok?r.json():null).catch(()=>null),
      ])
      if(cancelled)return
      setInfo(i);setHist(h?.data||null);setVal(v);setIndexEntry(idx?.[`${code}.T`]||null);setLoading(false)
    })()
    return()=>{cancelled=true}
  },[code])
  const tech=useMemo(()=>computeTech(hist),[hist])
  const chart=useMemo(()=>{
    if(!hist||hist.length<2)return null
    const W=640,H=180,P=6,vals=hist.map(d=>Number(d.pct||0)),min=Math.min(...vals,0),max=Math.max(...vals,0),range=max-min||1
    const x=i=>P+i/(hist.length-1)*(W-P*2), y=v=>P+(1-(v-min)/range)*(H-P*2)
    return {W,H,points:hist.map((d,i)=>`${x(i)},${y(Number(d.pct||0))}`).join(' '),zero:y(0),last:vals.at(-1)}
  },[hist])
  if(!code)return <div style={{padding:'60px',textAlign:'center',color:'var(--text3)'}}>Select a stock from Theme Detail, Market Detail, Heatmap, or Stock Search.</div>
  const card={background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:'10px',padding:'18px 20px',marginBottom:'16px'}
  return <div style={{padding:isMobile?'16px 12px':'24px 28px',maxWidth:'980px',margin:'0 auto'}}>
    <h1 style={{fontSize:'20px',color:'var(--text)'}}><span style={{fontFamily:'var(--mono)',fontSize:'12px',color:'var(--text3)',marginRight:'8px'}}>{code}</span>{info?.name||indexEntry?.name||code}</h1>
    {indexEntry?.themes?.length>0&&<div style={{display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'16px'}}>{indexEntry.themes.map(t=><button key={t} onClick={()=>onNavigate?.('Theme Detail',t)} style={{fontSize:'11px',padding:'4px 10px',borderRadius:'99px',border:'1px solid var(--border)',background:'var(--bg2)',color:'var(--text2)',cursor:'pointer'}}>{t}</button>)}</div>}
    <div style={card}><b>📈 One-year cumulative return {chart&&<span style={{marginLeft:'8px',color:chart.last>=0?'var(--red)':'var(--green)'}}>{chart.last>=0?'+':''}{chart.last.toFixed(1)}%</span>}</b>
      {chart?<svg viewBox={`0 0 ${chart.W} ${chart.H}`} style={{width:'100%',display:'block',marginTop:'12px'}}><line x1="0" x2={chart.W} y1={chart.zero} y2={chart.zero} stroke="var(--border)" strokeDasharray="4 4"/><polyline points={chart.points} fill="none" stroke={chart.last>=0?'var(--red)':'var(--green)'} strokeWidth="1.8"/></svg>:<p style={{color:'var(--text3)',fontSize:'11px'}}>{loading?'Loading…':'Chart data is unavailable.'}</p>}
    </div>
    <div style={card}><b>📐 Technical indicators</b><div style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:'8px',marginTop:'10px'}}>
      {[['25-day MA',tech?.ma25],['75-day MA',tech?.ma75],['From 1Y high',tech?.off52w],['RSI(14)',tech?.rsi]].map(([l,v])=><div key={l} style={{padding:'9px',border:'1px solid var(--border)',borderRadius:'6px'}}><small style={{color:'var(--text3)'}}>{l}</small><div style={{fontFamily:'var(--mono)',fontWeight:700}}>{v==null?'—':`${v.toFixed(1)}${l==='RSI(14)'?'':'%'}`}</div></div>)}
    </div></div>
    <div style={card}><b>💹 Valuation {!isStandard&&'🔒'}</b><div style={{display:'grid',gridTemplateColumns:'repeat(6,minmax(0,1fr))',gap:'8px',marginTop:'10px'}}>
      {[['PER',val?.per],['Forward PER',val?.per_fwd],['PBR',val?.pbr],['Forward PBR',val?.pbr_fwd],['PEG',val?.peg],['Forward PEG',val?.peg_fwd]].map(([l,v])=><div key={l} style={{padding:'9px',border:'1px solid var(--border)',borderRadius:'6px'}}><small style={{color:'var(--text3)'}}>{l}</small><div>{!isStandard?'🔒':v??'—'}</div></div>)}
    </div></div>
    <p style={{fontSize:'11px',color:'var(--text3)'}}>Information only. This is not investment advice.</p>
  </div>
}
