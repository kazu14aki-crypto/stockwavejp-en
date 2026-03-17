import { useState, useEffect } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8001'
const STORAGE_KEY = 'swjp_favorites'

function Loading() {
  return (
    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text3)' }}>
      {[0, 0.2, 0.4].map((d, i) => (
        <span key={i} style={{
          display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%',
          background: 'var(--accent)', margin: '0 3px',
          animation: `pulse 1.2s ease-in-out ${d}s infinite`,
        }} />
      ))}
      <div style={{ marginTop: '12px', fontSize: '12px' }}>Loading data...</div>
    </div>
  )
}

export default function Favorites() {
  const [themeNames, setThemeNames] = useState([])
  const [favorites,  setFavorites]  = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') } catch { return [] }
  })
  const [themeData,  setThemeData]  = useState([])
  const [period,     setPeriod]     = useState('1mo')
  const [loading,    setLoading]    = useState(false)

  const PERIODS = [
    { label: '1 Week',   value: '5d'  },
    { label: '1 Month',  value: '1mo' },
    { label: '3 Months', value: '3mo' },
    { label: '1 Year',   value: '1y'  },
  ]

  useEffect(() => {
    fetch(`${API}/api/theme-names`).then(r => r.json()).then(d => setThemeNames(d.themes)).catch(() => {})
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    if (!favorites.length) return
    setLoading(true)
    fetch(`${API}/api/themes?period=${period}`)
      .then(r => r.json())
      .then(d => {
        const filtered = d.themes.filter(t => favorites.includes(t.theme))
        setThemeData(filtered)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [favorites, period])

  const toggleFav = (t) =>
    setFavorites(f => f.includes(t) ? f.filter(x => x !== t) : [...f, t])

  return (
    <div style={{ padding: '28px 32px 48px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.02em', color: '#e8f0ff', marginBottom: '4px' }}>
        Favorites
      </h1>
      <p style={{ fontSize: '12px', color: 'var(--text3)', marginBottom: '20px' }}>
        Save themes you want to track and check them quickly.
      </p>

      <div style={sHead}>
        <span style={sTitle}>Select Themes</span>
        <div style={sLine} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
        {themeNames.map(t => (
          <button key={t} onClick={() => toggleFav(t)} style={{
            padding: '5px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer',
            border: `1px solid ${favorites.includes(t) ? 'var(--red)' : 'var(--border)'}`,
            background: favorites.includes(t) ? 'rgba(255,69,96,0.12)' : 'transparent',
            color: favorites.includes(t) ? 'var(--red)' : 'var(--text3)',
            fontFamily: 'var(--font)',