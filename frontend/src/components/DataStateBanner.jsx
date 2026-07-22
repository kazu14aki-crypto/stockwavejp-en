const STATE_COPY = {
  unavailable:{icon:'◌',title:'Data unavailable',text:'The data provider is not configured or the requested data has not been generated. Missing data is not treated as 0%.',color:'#ffb84d'},
  failed:{icon:'⚠',title:'Data update failed',text:'The latest retrieval failed. Previously fetched values are shown when available.',color:'#ff647c'},
  stale:{icon:'◷',title:'Data update delayed',text:'The scheduled update time has passed. Displayed values may be older than usual.',color:'#ffb84d'},
  closed:{icon:'■',title:'Market closed',text:'The latest confirmed market data is displayed while the market is closed.',color:'#8994a7'},
}
export default function DataStateBanner({state,reason,onRetry}){
  if(!state||state==='ok'||state==='loading')return null
  const item=STATE_COPY[state]||STATE_COPY.unavailable
  return <div style={{margin:'8px 16px',padding:'10px 12px',borderRadius:'8px',border:`1px solid ${item.color}44`,background:`${item.color}0d`,display:'flex',gap:'9px',alignItems:'flex-start'}}>
    <span style={{color:item.color,fontSize:'13px'}}>{item.icon}</span>
    <div style={{minWidth:0,flex:1}}>
      <div style={{fontSize:'11px',fontWeight:700,color:item.color}}>{item.title}</div>
      <div style={{fontSize:'10px',lineHeight:1.65,color:'var(--text3)',marginTop:'2px'}}>{reason||item.text}</div>
    </div>
    {onRetry&&<button onClick={onRetry} style={{border:'1px solid var(--border)',background:'var(--bg2)',color:'var(--text2)',borderRadius:'6px',padding:'5px 9px',cursor:'pointer',fontSize:'10px'}}>Retry</button>}
  </div>
}
export function formatDataValue(value,formatter=v=>v){
  if(value===null||value===undefined||value==='')return 'Not retrieved'
  return formatter(value)
}
