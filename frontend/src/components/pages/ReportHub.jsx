import { useEffect, useState } from 'react'
import WeeklyReport from './WeeklyReport'

function PeriodArchive({ type, title, description }) {
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(null)
  const [detail, setDetail] = useState(null)

  useEffect(() => {
    fetch(`/data/${type}_reports/index.json?t=${Date.now()}`)
      .then(r => r.ok ? r.json() : [])
      .then(setItems)
      .catch(() => setItems([]))
  }, [type])

  useEffect(() => {
    if (!selected) {
      setDetail(null)
      return
    }
    const file = selected.file || `${selected.id}.json`
    fetch(`/data/${type}_reports/${file}?t=${Date.now()}`)
      .then(r => r.ok ? r.json() : null)
      .then(setDetail)
      .catch(() => setDetail(null))
  }, [selected, type])

  if (detail) {
    return (
      <div style={{ padding:'20px 24px 80px', maxWidth:'960px', margin:'0 auto' }}>
        <button onClick={() => { setSelected(null); setDetail(null) }}
          style={{ marginBottom:'16px', background:'none', border:'none', color:'var(--accent)', cursor:'pointer', fontFamily:'var(--font)' }}>
          ← Back to archive
        </button>
        <h1 style={{ fontSize:'20px', color:'var(--text)' }}>{detail.title}</h1>
        {detail.metrics && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'10px', margin:'16px 0' }}>
            {detail.metrics.map(m => (
              <div key={m.label} style={{ padding:'14px', background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'9px' }}>
                <div style={{ fontSize:'10px', color:'var(--text3)' }}>{m.label}</div>
                <div style={{ fontSize:'13px', fontWeight:700, color:'var(--text)', marginTop:'5px' }}>{m.value}</div>
              </div>
            ))}
          </div>
        )}
        {detail.sections?.map(s => (
          <section key={s.heading} style={{ marginTop:'24px' }}>
            <h2 style={{ fontSize:'16px', color:'var(--text)' }}>{s.heading}</h2>
            {s.body?.map((p, i) => <p key={i} style={{ fontSize:'13px', lineHeight:1.9, color:'var(--text2)' }}>{p}</p>)}
          </section>
        ))}
        {detail.disclaimer && <p style={{ marginTop:'28px', fontSize:'11px', lineHeight:1.8, color:'var(--text3)' }}>{detail.disclaimer}</p>}
      </div>
    )
  }

  return (
    <div style={{ padding:'20px 24px 80px', maxWidth:'960px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'20px', fontWeight:700, color:'var(--text)', marginBottom:'6px' }}>{title}</h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', lineHeight:1.7, marginBottom:'18px' }}>{description}</p>
      {items.length ? (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'12px' }}>
          {items.map(x => (
            <button key={x.id || x.period} type="button" onClick={() => setSelected(x)}
              style={{ textAlign:'left', background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'10px', padding:'16px', cursor:'pointer', fontFamily:'var(--font)' }}>
              <div style={{ fontSize:'14px', fontWeight:700, color:'var(--text)' }}>{x.title}</div>
              <div style={{ fontSize:'11px', color:'var(--text3)', marginTop:'5px' }}>{x.period || x.date}</div>
            </button>
          ))}
        </div>
      ) : (
        <div style={{ padding:'44px 20px', textAlign:'center', background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'12px', color:'var(--text3)', fontSize:'13px' }}>
          Reports will appear here as data accumulates.
        </div>
      )}
    </div>
  )
}

export default function ReportHub({ onNavigate }) {
  const [tab, setTab] = useState('weekly')
  const tabs = [['weekly','Weekly'],['monthly','Monthly'],['quarterly','Quarterly']]
  return (
    <div>
      <div className="page-header-sticky" style={{ gap:'8px', flexWrap:'wrap' }}>
        <h1 style={{ fontSize:'18px', fontWeight:700, color:'var(--text)', marginRight:'8px' }}>📰 Reports</h1>
        {tabs.map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)}
            style={{ padding:'6px 12px', borderRadius:'7px', fontSize:'11px', fontWeight:700, cursor:'pointer', fontFamily:'var(--font)', border:tab===k?'1px solid var(--accent)':'1px solid var(--border)', background:tab===k?'rgba(74,158,255,0.12)':'var(--bg2)', color:tab===k?'var(--accent)':'var(--text3)' }}>
            {l}
          </button>
        ))}
      </div>
      {tab === 'weekly' && <WeeklyReport onNavigate={onNavigate}/>}
      {tab === 'monthly' && <PeriodArchive type="monthly" title="📅 Monthly Reports" description="Monthly theme rankings, capital rotation, and follow-up performance."/>}
      {tab === 'quarterly' && <PeriodArchive type="quarterly" title="📈 Quarterly Reports" description="Medium-term trends and theme rotation for each calendar quarter."/>}
    </div>
  )
}
