import React from 'react'

export default class PageErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error:null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Page rendering failed:', error, info)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error:null })
    }
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div style={{
        margin:'24px auto', maxWidth:'680px', padding:'24px',
        background:'var(--bg2)', border:'1px solid rgba(255,83,112,.3)',
        borderRadius:'12px', color:'var(--text2)', textAlign:'center',
      }}>
        <div style={{fontSize:'34px',marginBottom:'10px'}}>⚠️</div>
        <h2 style={{fontSize:'18px',color:'var(--text)',margin:'0 0 8px'}}>
          This page could not be displayed
        </h2>
        <p style={{fontSize:'12px',lineHeight:1.8,color:'var(--text3)',margin:'0 0 14px'}}>
          Other pages remain available. Reload this section or return to Home.
        </p>
        <div style={{display:'flex',justifyContent:'center',gap:'8px',flexWrap:'wrap'}}>
          <button onClick={()=>this.setState({error:null})} style={{
            padding:'8px 12px',borderRadius:'7px',border:'1px solid var(--border)',
            background:'var(--bg3)',color:'var(--text2)',cursor:'pointer',
          }}>Retry</button>
          <button onClick={()=>this.props.onNavigate?.('Home')} style={{
            padding:'8px 12px',borderRadius:'7px',border:'1px solid var(--accent)',
            background:'rgba(74,158,255,.12)',color:'var(--accent)',cursor:'pointer',
          }}>Return to Home</button>
        </div>
      </div>
    )
  }
}
